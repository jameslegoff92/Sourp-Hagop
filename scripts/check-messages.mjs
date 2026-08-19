// Compares the key sets of every file in messages/ and fails if any key is
// present in one file but missing from another.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const MESSAGES_DIR = path.join(REPO_ROOT, "messages");

function flattenKeys(obj, prefix = "") {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const keyPath = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      keys.push(...flattenKeys(value, keyPath));
    } else {
      keys.push(keyPath);
    }
  }
  return keys;
}

const files = fs
  .readdirSync(MESSAGES_DIR)
  .filter((f) => f.endsWith(".json"))
  .sort();

if (files.length < 2) {
  console.log(`Only ${files.length} message file(s) found in messages/ — nothing to compare.`);
  process.exit(0);
}

const keysByFile = new Map();
for (const file of files) {
  const content = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, file), "utf8"));
  keysByFile.set(file, new Set(flattenKeys(content)));
}

const allKeys = new Set();
for (const keys of keysByFile.values()) {
  for (const k of keys) allKeys.add(k);
}

let hasMismatch = false;
for (const key of [...allKeys].sort()) {
  const missingFrom = files.filter((file) => !keysByFile.get(file).has(key));
  if (missingFrom.length > 0) {
    hasMismatch = true;
    console.log(`"${key}" missing from: ${missingFrom.join(", ")}`);
  }
}

if (hasMismatch) {
  console.error("\nMessage key parity check FAILED.");
  process.exit(1);
} else {
  console.log(
    `Message key parity OK — ${allKeys.size} key(s) across ${files.length} file(s): ${files.join(", ")}`
  );
}
