// Rewrites upward (`../`) relative import/require/export/dynamic-import
// specifiers to the `@/` alias, resolved per-file against the repo root.
//
// Usage:
//   node scripts/codemod-imports.mjs            # dry run, report only
//   node scripts/codemod-imports.mjs --apply     # write changes to disk

import { Project, SyntaxKind, Node } from "ts-morph";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const APPLY = process.argv.includes("--apply");

const EXCLUDED_FILES = new Set(
  ["js/mongoose/testcrud.js", "js/axios/testAxios.js", "js/mongoose/testConnection.js"].map((p) =>
    path.resolve(REPO_ROOT, p)
  )
);

const RESOLVE_CANDIDATES = (base) => [
  base,
  `${base}.js`,
  `${base}.jsx`,
  `${base}.ts`,
  `${base}.tsx`,
  `${base}.mjs`,
  `${base}.cjs`,
  path.join(base, "index.js"),
  path.join(base, "index.jsx"),
  path.join(base, "index.ts"),
  path.join(base, "index.tsx"),
];

function resolveOnDisk(absNoExt) {
  for (const candidate of RESOLVE_CANDIDATES(absNoExt)) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

function toRepoRel(absPath) {
  return path.relative(REPO_ROOT, absPath).split(path.sep).join("/");
}

const project = new Project({
  tsConfigFilePath: path.join(REPO_ROOT, "tsconfig.json"),
  skipAddingFilesFromTsConfig: true,
});

project.addSourceFilesAtPaths([
  toGlob(path.join(REPO_ROOT, "**/*.{js,jsx,ts,tsx}")),
  "!" + toGlob(path.join(REPO_ROOT, "studio/**")),
  "!" + toGlob(path.join(REPO_ROOT, "node_modules/**")),
  "!" + toGlob(path.join(REPO_ROOT, ".next/**")),
  "!" + toGlob(path.join(REPO_ROOT, "coverage/**")),
  "!" + toGlob(path.join(REPO_ROOT, "test-results/**")),
  "!" + toGlob(path.join(REPO_ROOT, "playwright-report/**")),
]);

function toGlob(p) {
  return p.split(path.sep).join("/");
}

// Collect every string-literal specifier node that names a module, across
// static import/export, dynamic import(), require(), and jest.mock().
function collectSpecifierNodes(sourceFile) {
  const found = [];

  for (const decl of sourceFile.getImportDeclarations()) {
    found.push({ node: decl.getModuleSpecifier(), kind: "import" });
  }
  for (const decl of sourceFile.getExportDeclarations()) {
    const spec = decl.getModuleSpecifier();
    if (spec) found.push({ node: spec, kind: "export-from" });
  }

  for (const call of sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)) {
    const expr = call.getExpression();
    const args = call.getArguments();
    if (args.length === 0) continue;
    const firstArg = args[0];

    const isDynamicImport = expr.getKind() === SyntaxKind.ImportKeyword;
    const isRequire = Node.isIdentifier(expr) && expr.getText() === "require";
    const isJestMock =
      Node.isPropertyAccessExpression(expr) &&
      expr.getExpression().getText() === "jest" &&
      expr.getName() === "mock";

    if (!isDynamicImport && !isRequire && !isJestMock) continue;

    if (!Node.isStringLiteral(firstArg)) {
      found.push({ node: firstArg, kind: isDynamicImport ? "dynamic-import" : isRequire ? "require" : "jest.mock", unresolvableArg: true });
      continue;
    }

    found.push({
      node: firstArg,
      kind: isDynamicImport ? "dynamic-import" : isRequire ? "require" : "jest.mock",
    });
  }

  return found;
}

const rewrites = []; // { file, line, kind, before, after, climb }
const tsxUpward = []; // stop condition
const outsideRoot = []; // stop condition
const studioCrossings = []; // stop condition
const unresolved = []; // stop condition (can't confidently resolve)

for (const sourceFile of project.getSourceFiles()) {
  const absPath = path.resolve(sourceFile.getFilePath());
  if (EXCLUDED_FILES.has(absPath)) continue;

  const ext = path.extname(absPath);
  const isTsLike = ext === ".ts" || ext === ".tsx";
  const fileRel = toRepoRel(absPath);

  for (const { node, kind, unresolvableArg } of collectSpecifierNodes(sourceFile)) {
    const line = node.getStartLineNumber();

    if (unresolvableArg) {
      unresolved.push({ file: fileRel, line, kind, reason: "non-string-literal argument" });
      continue;
    }

    const value = node.getLiteralValue();
    if (!value.startsWith("../")) continue; // scope: upward only, leave './' alone

    if (isTsLike) {
      tsxUpward.push({ file: fileRel, line, kind, value });
      continue;
    }

    const fileDir = path.dirname(absPath);
    const resolvedNoExt = path.resolve(fileDir, value);
    const relFromRoot = path.relative(REPO_ROOT, resolvedNoExt);

    if (relFromRoot.startsWith("..") || path.isAbsolute(relFromRoot)) {
      outsideRoot.push({ file: fileRel, line, value, resolvedNoExt });
      continue;
    }

    const relFromRootPosix = relFromRoot.split(path.sep).join("/");

    if (relFromRootPosix === "studio" || relFromRootPosix.startsWith("studio/")) {
      studioCrossings.push({ file: fileRel, line, value, target: relFromRootPosix });
      continue;
    }

    if (!resolveOnDisk(resolvedNoExt)) {
      unresolved.push({ file: fileRel, line, kind, reason: `no file found for "${relFromRootPosix}"` });
      continue;
    }

    const after = "@/" + relFromRootPosix;
    const topFolder = fileRel.split("/")[0];
    const climb = value.startsWith(`../${topFolder}/`);

    rewrites.push({ file: fileRel, line, kind, before: value, after, climb });

    if (APPLY) node.setLiteralValue(after);
  }
}

// --- stop conditions -------------------------------------------------

const stopReasons = [];
if (tsxUpward.length) stopReasons.push(`${tsxUpward.length} upward import(s) found in .ts/.tsx files`);
if (outsideRoot.length) stopReasons.push(`${outsideRoot.length} import(s) resolve outside the repo root`);
if (studioCrossings.length) stopReasons.push(`${studioCrossings.length} import(s) cross into studio/`);
if (unresolved.length) stopReasons.push(`${unresolved.length} import(s) could not be confidently resolved`);

if (stopReasons.length) {
  console.log("STOP CONDITION TRIGGERED — no files were modified even if --apply was passed.\n");
  for (const reason of stopReasons) console.log("  - " + reason);
  console.log();
  for (const item of tsxUpward) console.log(`[ts/tsx upward] ${item.file}:${item.line} (${item.kind}) "${item.value}"`);
  for (const item of outsideRoot) console.log(`[outside root]  ${item.file}:${item.line} "${item.value}" -> ${item.resolvedNoExt}`);
  for (const item of studioCrossings) console.log(`[into studio/]  ${item.file}:${item.line} "${item.value}" -> ${item.target}`);
  for (const item of unresolved) console.log(`[unresolved]    ${item.file}:${item.line} (${item.kind}) ${item.reason}`);
  process.exit(1);
}

// --- report ------------------------------------------------------------

console.log(`Mode: ${APPLY ? "APPLY" : "DRY RUN"}`);
console.log(`Total rewrites: ${rewrites.length}\n`);

const byFolder = new Map();
for (const r of rewrites) {
  const top = r.file.split("/")[0];
  byFolder.set(top, (byFolder.get(top) ?? 0) + 1);
}
console.log("Per-folder breakdown:");
for (const [folder, count] of [...byFolder.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${folder.padEnd(20)} ${count}`);
}

const climbExamples = rewrites.filter((r) => r.climb).slice(0, 5);
console.log(`\nClimb-out-and-back-in examples (${rewrites.filter((r) => r.climb).length} total), showing up to 5:`);
for (const r of climbExamples) {
  console.log(`  ${r.file}:${r.line}`);
  console.log(`    before: "${r.before}"`);
  console.log(`    after:  "${r.after}"`);
}

if (APPLY) {
  project.saveSync();
  console.log("\nChanges written to disk.");
} else {
  console.log("\nDry run only — no files modified. Re-run with --apply to write changes.");
}
