// Compares the key sets of every file in messages/ and fails if any key is
// present in one file but missing from another. Also fails if any key in
// messages/hy.json holds an empty string or whitespace-only value: key
// parity alone doesn't catch this, and next-intl renders an empty string as
// blank rather than falling back to French, unlike a genuinely missing key.

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

function findEmptyStringValues(obj, prefix = "") {
  const empties = [];
  for (const [key, value] of Object.entries(obj)) {
    const keyPath = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      empties.push(...findEmptyStringValues(value, keyPath));
    } else if (typeof value === "string" && value.trim() === "") {
      empties.push(keyPath);
    }
  }
  return empties;
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

const HY_FILE = "hy.json";
let emptyKeys = [];
if (files.includes(HY_FILE)) {
  const hyContent = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, HY_FILE), "utf8"));
  emptyKeys = findEmptyStringValues(hyContent).sort();
  if (emptyKeys.length > 0) {
    console.log(`\n${emptyKeys.length} key(s) in ${HY_FILE} have an empty or whitespace-only value:`);
    for (const key of emptyKeys) {
      console.log(`  "${key}"`);
    }
  }
}

if (hasMismatch || emptyKeys.length > 0) {
  if (hasMismatch) console.error("\nMessage key parity check FAILED.");
  if (emptyKeys.length > 0) console.error(`${HY_FILE} empty-value check FAILED.`);
  process.exit(1);
} else {
  console.log(
    `Message key parity OK — ${allKeys.size} key(s) across ${files.length} file(s): ${files.join(", ")}`
  );
  console.log(`${HY_FILE} empty-value check OK — no empty or whitespace-only values.`);
}
