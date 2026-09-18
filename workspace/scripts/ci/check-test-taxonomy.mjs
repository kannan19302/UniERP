#!/usr/bin/env node
/**
 * J01 (Track J — quality) exit criterion: "Every existing spec file is classified.
 * An unclassifiable test is either reclassified or deleted with a reason."
 *
 * This is the gate. It scans every test file on disk in every sibling repo and fails
 * when one has no entry in docs/test-taxonomy.json, or when the manifest names a file
 * that no longer exists, or uses a type outside the declared taxonomy.
 *
 *   node scripts/ci/check-test-taxonomy.mjs
 *
 * Proven able to fail (the point of the whole track): adding a new *.spec.ts without a
 * manifest entry makes this exit 1, and so does deleting a file the manifest still names.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadActiveEstate } from "../lib/estate.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = join(HERE, "..", "..");
const estate = loadActiveEstate();
const FAMILY = estate.root;
const MANIFEST_FILE = join(WORKSPACE, "docs", "test-taxonomy.json");

const TEST_RE = /\.(spec|test|e2e)\.ts$|_test\.dart$/;
const IGNORE = /node_modules|\.git\/|dist\/|build\/|coverage|\.next|\/load-tests\/|\.plugin_symlinks|ephemeral/;

const TAXONOMY = new Set([
  "unit", "integration", "controller", "guard", "isolation",
  "property", "migration", "contract", "e2e", "widget",
]);

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (IGNORE.test(entry)) continue;
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, out);
    else if (TEST_RE.test(entry)) out.push(full);
  }
  return out;
}

const manifest = JSON.parse(readFileSync(MANIFEST_FILE, "utf8"));
const declared = manifest.files ?? {};
const problems = [];

const family = [...estate.repositories.values()].map((r) => r.path);

let scanned = 0;
const onDisk = new Set();
for (const repo of family) {
  for (const full of walk(join(FAMILY, repo))) {
    const rel = full.slice(FAMILY.length + 1).replace(/\\/g, "/");
    onDisk.add(rel);
    scanned++;
    const type = declared[rel];
    if (type === undefined) {
      problems.push(`unclassified: ${rel} — add a type to docs/test-taxonomy.json (run scripts/classify-test-taxonomy.mjs) or delete the test with a reason`);
    } else if (!TAXONOMY.has(type)) {
      problems.push(`invalid type "${type}" for ${rel} — must be one of ${[...TAXONOMY].join(", ")}`);
    }
  }
}

for (const rel of Object.keys(declared)) {
  if (!onDisk.has(rel)) {
    problems.push(`stale manifest entry: ${rel} (type ${declared[rel]}) — the file no longer exists; remove the entry`);
  }
}

if (problems.length) {
  console.error(`check-test-taxonomy: ${problems.length} problem(s)\n`);
  for (const p of problems) console.error(`FAIL  ${p}`);
  console.error(
    `\nJ01 exit criterion: every existing spec file is classified; an unclassifiable test is\n` +
      `either reclassified or deleted with a reason. docs/test-taxonomy.json is the manifest;\n` +
      `regenerate it with scripts/classify-test-taxonomy.mjs --write and commit the change.\n`,
  );
  process.exit(1);
}

console.log(
  `OK    ${scanned} test file(s) scanned across ${family.length} repo(s); every one classified, ` +
    `${Object.keys(declared).length} manifest entries, no stale entries, all types valid.`,
);