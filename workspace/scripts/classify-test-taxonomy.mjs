#!/usr/bin/env node
/**
 * J01 (Track J — quality): produce `docs/test-taxonomy.json`, the machine-readable
 * side of the test taxonomy deliverable. Every test file in every sibling repo is
 * classified into exactly one type. The exit criterion — "every existing spec file
 * is classified" — is enforced by scripts/ci/check-test-taxonomy.mjs, which fails
 * when a test file on disk has no manifest entry.
 *
 * Classification is content- and path-based, in this precedence order:
 *   1. e2e        — under e2e/ or imports @playwright/test
 *   2. widget     — *.test.dart (Flutter)
 *   3. contract   — CDC consumer/provider expectations
 *   4. isolation  — two-tenant RLS proofs (tenant-isolation / escape-suite)
 *   5. property   — property-based / invariant tests
 *   6. migration  — migration forward/backward
 *   7. controller — HTTP boundary (*.controller.spec.ts)
 *   8. guard      — authorization / security guards
 *   9. integration— real database through RLS (runWithTenantSession / NOBYPASSRLS)
 *  10. unit       — a single unit in isolation, collaborators mocked
 *
 *   node scripts/classify-test-taxonomy.mjs             print the proposed manifest
 *   node scripts/classify-test-taxonomy.mjs --write      write docs/test-taxonomy.json
 *   node scripts/classify-test-taxonomy.mjs --list-other list files the heuristics did not match
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadActiveEstate } from "./lib/estate.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = join(HERE, "..");
const estate = loadActiveEstate();
const FAMILY = estate.root;
const MANIFEST = join(WORKSPACE, "docs", "test-taxonomy.json");
const WRITE = process.argv.includes("--write");
const LIST_OTHER = process.argv.includes("--list-other");

const TEST_RE = /\.(spec|test|e2e)\.ts$|_test\.dart$/;
const IGNORE = /node_modules|\.git\/|dist\/|build\/|coverage|\.next|\/load-tests\/|\.plugin_symlinks|ephemeral/;

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

function classify(repo, rel, source) {
  const relLower = rel.toLowerCase();
  if (relLower.startsWith("e2e") || /@playwright\/test/.test(source)) return "e2e";
  if (rel.endsWith("_test.dart")) return "widget";
  if (/cdc|contract/i.test(relLower) && !relLower.includes("contracts.service")) return "contract";
  if (/-isolation|escape-suite|tenant-isolation/i.test(relLower)) return "isolation";
  if (/\.property\./i.test(relLower)) return "property";
  if (/migration/i.test(relLower)) return "migration";
  if (/controller\.spec\.ts$/.test(relLower)) return "controller";
  if (/guards\/tests|\/guards\/|\.guard\.spec|policy-engine|permissions-drift|rbac|abac/i.test(relLower)) {
    return "guard";
  }
  if (/runWithTenantSession|NOBYPASSRLS/i.test(source)) return "integration";
  if (/vi\.mock\(["']@kannan19302\/database/.test(source)) return "unit";
  return "unit";
}

const family = [...estate.repositories.values()].map((r) => r.path);

const files = {};
const other = [];
let byType = {};
for (const repo of family) {
  for (const full of walk(join(FAMILY, repo))) {
    const rel = full.slice(FAMILY.length + 1).replace(/\\/g, "/");
    const source = readFileSync(full, "utf8");
    const type = classify(repo, rel, source);
    files[rel] = type;
    byType[type] = (byType[type] ?? 0) + 1;
    if (type === "unit" && !/\.spec\.ts$/.test(rel) && !/_test\.dart$/.test(rel)) other.push(rel);
  }
}

if (LIST_OTHER) {
  console.log(other.length ? other.join("\n") : "(none)");
  process.exit(0);
}

const manifest = {
  $schema: "https://unierp.io/schemas/test-taxonomy.json",
  description:
    "Test taxonomy manifest — every test file in the family classified into exactly one type. See docs/TEST_STRATEGY.md. Enforced by scripts/ci/check-test-taxonomy.mjs (J01).",
  types: [
    "unit", "integration", "controller", "guard", "isolation",
    "property", "migration", "contract", "e2e", "widget",
  ],
  files,
};

const out = JSON.stringify(manifest, null, 2) + "\n";
if (WRITE) writeFileSync(MANIFEST, out);
console.log(`classify-test-taxonomy: ${Object.keys(files).length} test file(s) across ${family.length} repo(s).`);
for (const [t, n] of Object.entries(byType).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${t}`);
}
console.log(WRITE ? `wrote ${MANIFEST}` : `(--write to persist)`);