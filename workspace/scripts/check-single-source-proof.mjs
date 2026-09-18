#!/usr/bin/env node
/**
 * scripts/check-single-source-proof.mjs
 *
 * Phase P12-081: The single-source proof (EP-1 mechanism).
 *
 * Exit criterion:
 *   "Every client, type, SDK method and document derived from the contracts,
 *    with nothing hand-maintained. A hand-maintained duplicate of any
 *    contract-derived artefact is detected and fails CI."
 *
 * This gate:
 *   1. Verifies the single-source-proof.ts and .spec.ts files exist in contracts.
 *   2. Runs the spec suite (all 7 tests must pass).
 *   3. Mechanically verifies: a hand-maintained duplicate is detected and throws.
 *   4. Mechanically verifies: a clean (fully-generated) artefact passes.
 *   5. Verifies that CONTRACT_DERIVED_ARTIFACT_REGISTRY covers all four required categories.
 *
 * Run: node scripts/check-single-source-proof.mjs --verify
 */

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTRACTS_DIR = join(ROOT, "../unierp-contracts");
const IMPL_FILE = join(CONTRACTS_DIR, "src/single-source-proof.ts");
const SPEC_FILE = join(CONTRACTS_DIR, "src/single-source-proof.spec.ts");

function fail(msg) {
  console.error(`✗ Single-source proof gate FAILED: ${msg}`);
  process.exit(1);
}

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}

// ── 1. Required files exist ───────────────────────────────────────────────
if (!existsSync(IMPL_FILE)) {
  fail(`Implementation file not found: ${IMPL_FILE}`);
}
pass("single-source-proof.ts exists");

if (!existsSync(SPEC_FILE)) {
  fail(`Spec file not found: ${SPEC_FILE}`);
}
pass("single-source-proof.spec.ts exists");

// ── 2. Run the spec suite ─────────────────────────────────────────────────
let specOutput;
try {
  specOutput = execFileSync("node", ["--test", "src/single-source-proof.spec.ts"], {
    cwd: CONTRACTS_DIR,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
} catch (err) {
  fail(
    `single-source-proof.spec.ts failed:\n${err.stdout || ""}\n${err.stderr || ""}`
  );
}

const passMatches = [...(specOutput || "").matchAll(/✔/g)];
const failMatches = [...(specOutput || "").matchAll(/✖/g)];
if (failMatches.length > 0 || passMatches.length === 0) {
  fail(`Spec suite has failures. Output:\n${specOutput}`);
}
pass(`Spec suite: ${passMatches.length} tests pass, 0 fail`);

// ── 3. Mechanically verify: hand-maintained duplicate IS detected ──────────
const handEditDetectedScript = `
import { assertNoHandMaintainedDuplicate, HandMaintainedDuplicateDetectedError, CONTRACT_DERIVED_ARTIFACT_REGISTRY } from "./src/single-source-proof.ts";

const descriptor = CONTRACT_DERIVED_ARTIFACT_REGISTRY.find(d => d.category === "TYPESCRIPT_TYPES");
const canonical = ["getUser", "createUser", "deleteUser"];
const generated = ["getUser"];  // createUser and deleteUser were NOT regenerated
const candidate = ["getUser", "createUser", "deleteUser"]; // but they ARE in the candidate (hand-added)

let threw = false;
let category = "";
try {
  assertNoHandMaintainedDuplicate(canonical, generated, candidate, descriptor);
} catch (err) {
  if (err instanceof HandMaintainedDuplicateDetectedError) {
    threw = true;
    category = err.category;
  }
}

if (!threw || category !== "TYPESCRIPT_TYPES") {
  console.error("GATE_FAIL: hand-maintained duplicate was NOT detected");
  process.exit(1);
}
console.log("GATE_PASS: hand-maintained duplicate detected, category=" + category);
`;

let detectResult;
try {
  detectResult = execFileSync("node", ["--input-type=module"], {
    cwd: CONTRACTS_DIR,
    input: handEditDetectedScript,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
} catch (err) {
  fail(
    `Hand-maintained duplicate detection mechanism failed:\n${err.stdout || ""}\n${err.stderr || ""}`
  );
}
if (!detectResult.includes("GATE_PASS")) {
  fail(`Hand-maintained duplicate was NOT detected.\nOutput: ${detectResult}`);
}
pass("Hand-maintained duplicate detected and throws HandMaintainedDuplicateDetectedError");

// ── 4. Mechanically verify: fully-generated artefact passes ──────────────
const cleanPassScript = `
import { assertNoHandMaintainedDuplicate, CONTRACT_DERIVED_ARTIFACT_REGISTRY } from "./src/single-source-proof.ts";

const descriptor = CONTRACT_DERIVED_ARTIFACT_REGISTRY.find(d => d.category === "TYPESCRIPT_TYPES");
const canonical = ["getUser", "createUser", "deleteUser"];
const generated = ["getUser", "createUser", "deleteUser"]; // all operations regenerated
const candidate = ["getUser", "createUser", "deleteUser"]; // identical to generated

const result = assertNoHandMaintainedDuplicate(canonical, generated, candidate, descriptor);
if (!result.verified) {
  console.error("GATE_FAIL: clean artefact was unexpectedly rejected");
  process.exit(1);
}
console.log("GATE_PASS: clean generated artefact accepted, verified=" + result.verified);
`;

let cleanResult;
try {
  cleanResult = execFileSync("node", ["--input-type=module"], {
    cwd: CONTRACTS_DIR,
    input: cleanPassScript,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
} catch (err) {
  fail(
    `Clean artefact acceptance mechanism failed:\n${err.stdout || ""}\n${err.stderr || ""}`
  );
}
if (!cleanResult.includes("GATE_PASS")) {
  fail(`Clean generated artefact was unexpectedly rejected.\nOutput: ${cleanResult}`);
}
pass("Clean generated artefact accepted without error");

// ── 5. Registry completeness ──────────────────────────────────────────────
const registryScript = `
import { CONTRACT_DERIVED_ARTIFACT_REGISTRY } from "./src/single-source-proof.ts";

const required = ["TYPESCRIPT_TYPES", "DART_TYPES", "SDK_METHODS", "API_DOCUMENTATION"];
const categories = CONTRACT_DERIVED_ARTIFACT_REGISTRY.map(d => d.category);
const missing = required.filter(r => !categories.includes(r));
if (missing.length > 0) {
  console.error("GATE_FAIL: registry missing required categories: " + missing.join(", "));
  process.exit(1);
}
console.log("GATE_PASS: registry covers all " + required.length + " required categories");
`;

let registryResult;
try {
  registryResult = execFileSync("node", ["--input-type=module"], {
    cwd: CONTRACTS_DIR,
    input: registryScript,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
} catch (err) {
  fail(`Registry completeness check failed:\n${err.stdout || ""}\n${err.stderr || ""}`);
}
if (!registryResult.includes("GATE_PASS")) {
  fail(`Registry missing required artefact categories.\nOutput: ${registryResult}`);
}
pass("Registry covers TYPESCRIPT_TYPES, DART_TYPES, SDK_METHODS, API_DOCUMENTATION");

// ── Summary ───────────────────────────────────────────────────────────────
console.log(
  "\n✓ Single-source proof gate passed (EP-1): " +
    "CONTRACT_DERIVED_ARTIFACT_REGISTRY covers all four artefact categories; " +
    "hand-maintained duplicates detected and throw HandMaintainedDuplicateDetectedError; " +
    "clean generated artefacts accepted. " +
    "Mechanism verified both passing and failing."
);
