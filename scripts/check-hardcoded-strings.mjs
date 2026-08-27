// Coverage counter for phase 6B (extracting hardcoded UI chrome strings into
// messages/*.json). Unlike phase 6A's queries, a missed string here doesn't
// crash anything - it just silently stays French on the Armenian page - so
// npm run smoke gives zero protection for this work. This script is the
// actual safety net: it must be run after every extraction batch and its
// count must decrease monotonically.
//
// AST scan (ts-morph) of components/ and app/ for two kinds of user-facing
// literal: bare JSX text nodes, and string-literal values of the alt/
// aria-label/placeholder/title attributes. Anything already prop-driven,
// variable-driven, or replaced by a translation call ({t('key')}) is a
// JsxExpressionContainer, not a JsxText/StringLiteral, so it is invisible to
// this scan by construction - no special-casing needed for "already
// extracted".
//
// Deliberate exceptions (brand name, addresses, emails, phone numbers -
// things that are legitimately identical in both languages) live in
// scripts/hardcoded-strings-allowlist.json, matched by exact trimmed text.
// Every entry must carry a `reason` - the script refuses to run otherwise.
//
// Usage: node scripts/check-hardcoded-strings.mjs
// Exit code is non-zero if the remaining count exceeds MAX_ALLOWED below.
// Lower MAX_ALLOWED by hand as extraction batches land - it is not read
// from anywhere external, so lowering it is a deliberate, reviewable diff.

import { Project, SyntaxKind } from "ts-morph";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Lower this by hand as phase 6B batches land. 193 is today's true baseline:
// components/ + app/ (98 files), minus confidentialite/termes (excluded
// entirely, see EXCLUDED_FILES below), minus 14 allowlisted strings (15
// occurrences: 13 brand/address/phone/switcher strings, plus the
// comite-parents debug artifact "No data found - check console", which is
// deliberately never extracted - see docs/dettes-preexistantes.md item (u)).
// Not the same as phase 6A's 175, which only ever scanned components/ -
// seeing "193" here is not a regression, it's a wider, correct scope.
const MAX_ALLOWED = 193;

const ALLOWLIST_PATH = path.join(__dirname, "hardcoded-strings-allowlist.json");
const allowlistRaw = JSON.parse(readFileSync(ALLOWLIST_PATH, "utf8"));

for (const entry of allowlistRaw) {
  if (!entry.text || typeof entry.text !== "string") {
    console.error(`[check:strings] allowlist entry missing "text": ${JSON.stringify(entry)}`);
    process.exit(1);
  }
  if (!entry.reason || typeof entry.reason !== "string" || entry.reason.trim().length === 0) {
    console.error(`[check:strings] allowlist entry has no reason: ${JSON.stringify(entry)}`);
    process.exit(1);
  }
}
const allowlist = new Map(allowlistRaw.map((e) => [e.text.trim(), e.reason]));

// Excluded entirely, not via the string-level allowlist: these two pages are
// ~100% generic English legal boilerplate from a "Privacy Policy Generator"
// template (confirmed by reading them - "Last updated: August 27, 2024",
// definitions of "Interpretation", etc.) - never translated to French in the
// first place, let alone reviewed. That's a separate, serious, pre-existing
// content problem (see docs/dettes-preexistantes.md) needing the project
// owner's and likely legal counsel's attention, not a phase 6B UI-chrome
// extraction. The allowlist is for individual brand/contact strings with a
// reason each; listing ~196 boilerplate legal sentences one by one there
// would misrepresent them as reviewed, kept-as-is copy.
const EXCLUDED_FILES = [
  "app/[locale]/confidentialite/page.jsx",
  "app/[locale]/termes/page.jsx",
];

const project = new Project({
  compilerOptions: { allowJs: true, jsx: "preserve" },
});
project.addSourceFilesAtPaths("components/**/*.jsx");
project.addSourceFilesAtPaths("app/**/*.jsx");
for (const excluded of EXCLUDED_FILES) {
  const sf = project.getSourceFile((f) => f.getFilePath().replace(/\\/g, "/").endsWith(excluded));
  if (sf) project.removeSourceFile(sf);
}

const USER_FACING_ATTRS = new Set(["alt", "aria-label", "placeholder", "title"]);
const MIN_LEN = 2;

function isLikelyUserFacingText(text) {
  const t = text.trim();
  if (t.length < MIN_LEN) return false;
  if (/^[{}<>\/\\.,;:!?()[\]0-9%$#@*_=+-]+$/.test(t)) return false; // pure symbols/numbers
  return true;
}

let totalCount = 0;
let allowlistedCount = 0;
const perFile = new Map();
const allUsedAllowlistEntries = new Set();

for (const sourceFile of project.getSourceFiles()) {
  const filePath = path.relative(process.cwd(), sourceFile.getFilePath()).replace(/\\/g, "/");
  let fileCount = 0;
  const examples = [];

  function record(rawText, tag) {
    const text = rawText.trim();
    if (!isLikelyUserFacingText(text)) return;
    if (allowlist.has(text)) {
      allowlistedCount += 1;
      allUsedAllowlistEntries.add(text);
      return;
    }
    fileCount += 1;
    totalCount += 1;
    if (examples.length < 5) examples.push(`${tag} ${text.slice(0, 60)}`);
  }

  sourceFile.forEachDescendant((node) => {
    if (node.getKind() === SyntaxKind.JsxText) {
      record(node.getText(), "[text]");
    }
  });

  sourceFile.forEachDescendant((node) => {
    if (node.getKind() === SyntaxKind.JsxAttribute) {
      const nameNode = node.getFirstChild();
      const name = nameNode ? nameNode.getText() : "";
      if (!USER_FACING_ATTRS.has(name)) return;
      const init = node.getInitializer();
      if (init && init.getKind() === SyntaxKind.StringLiteral) {
        record(init.getLiteralText(), `[${name}]`);
      }
    }
  });

  if (fileCount > 0) {
    perFile.set(filePath, { count: fileCount, examples });
  }
}

const unusedAllowlistEntries = [...allowlist.keys()].filter((t) => !allUsedAllowlistEntries.has(t));

console.log(`[check:strings] scanned ${project.getSourceFiles().length} files (components/ + app/)`);
console.log(`[check:strings] allowlisted matches skipped: ${allowlistedCount} (${allowlist.size} distinct entries defined)`);
if (unusedAllowlistEntries.length > 0) {
  console.log(`[check:strings] WARNING: ${unusedAllowlistEntries.length} allowlist entries matched nothing in this scan (stale?):`);
  for (const t of unusedAllowlistEntries) console.log(`  - "${t}"`);
}

console.log(`\nTOTAL remaining hardcoded user-facing strings: ${totalCount}`);
console.log(`Files with at least one: ${perFile.size}`);
console.log("\nPer-file breakdown:");
const sorted = [...perFile.entries()].sort((a, b) => b[1].count - a[1].count);
for (const [file, { count, examples }] of sorted) {
  console.log(`  ${count.toString().padStart(4)}  ${file}`);
  if (process.env.VERBOSE) {
    for (const ex of examples) console.log(`          ${ex}`);
  }
}
if (EXCLUDED_FILES.length > 0) {
  console.log(`\n[check:strings] excluded entirely (not scanned): ${EXCLUDED_FILES.join(", ")}`);
}

console.log(`\n[check:strings] threshold: ${MAX_ALLOWED}`);
if (totalCount > MAX_ALLOWED) {
  console.error(`[check:strings] FAIL: ${totalCount} remaining exceeds threshold ${MAX_ALLOWED}`);
  process.exit(1);
} else {
  console.log(`[check:strings] OK: ${totalCount} <= ${MAX_ALLOWED}`);
  process.exit(0);
}
