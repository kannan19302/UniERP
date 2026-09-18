#!/usr/bin/env node
/**
 * scripts/check-contract-performance.mjs
 *
 * Phase P12-082: Contract performance implications.
 *
 * Exit criterion:
 *   "An endpoint forcing a waterfall on a documented consumer journey is reported."
 *
 * This gate:
 *   1. Verifies contract-performance.ts and .spec.ts exist.
 *   2. Runs the spec suite (all 12 tests must pass).
 *   3. Mechanically verifies: a waterfall IS detected (gate can fail).
 *   4. Mechanically verifies: a compliant single-call journey passes.
 *   5. Mechanically verifies: over-fetching IS detected above threshold.
 *   6. Verifies registry covers ≥4 consumer journeys.
 */

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTRACTS_DIR = join(ROOT, "../unierp-contracts");
const IMPL_FILE = join(CONTRACTS_DIR, "src/contract-performance.ts");
const SPEC_FILE = join(CONTRACTS_DIR, "src/contract-performance.spec.ts");

function fail(msg) {
  console.error(`✗ Contract performance gate FAILED: ${msg}`);
  process.exit(1);
}

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}

// ── 1. Required files exist ───────────────────────────────────────────────
if (!existsSync(IMPL_FILE)) fail(`Implementation file not found: ${IMPL_FILE}`);
pass("contract-performance.ts exists");

if (!existsSync(SPEC_FILE)) fail(`Spec file not found: ${SPEC_FILE}`);
pass("contract-performance.spec.ts exists");

// ── 2. Run the spec suite ─────────────────────────────────────────────────
let specOutput;
try {
  specOutput = execFileSync("node", ["--test", "src/contract-performance.spec.ts"], {
    cwd: CONTRACTS_DIR,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
} catch (err) {
  fail(`Spec suite failed:\n${err.stdout || ""}\n${err.stderr || ""}`);
}

const passMatches = [...(specOutput || "").matchAll(/✔/g)];
const failMatches = [...(specOutput || "").matchAll(/✖/g)];
if (failMatches.length > 0 || passMatches.length === 0) {
  fail(`Spec suite has failures. Output:\n${specOutput}`);
}
pass(`Spec suite: ${passMatches.length} tests pass, 0 fail`);

// ── 3. Mechanically verify: waterfall IS detected ─────────────────────────
const waterfallDetectScript = `
import { assertNoWaterfallOnJourney, WaterfallDetectedError, CANONICAL_CONSUMER_JOURNEYS } from "./src/contract-performance.ts";

const journey = CANONICAL_CONSUMER_JOURNEYS.find(j => j.journeyId === "J001_LIST_INVOICES_WITH_TENANT");
let threw = false;
let count = 0;
try {
  // Force a waterfall: 2 calls where only 1 is allowed
  assertNoWaterfallOnJourney(journey, ["GET /invoices", "GET /tenants/:id"], "GET /invoices");
} catch (err) {
  if (err instanceof WaterfallDetectedError) { threw = true; count = err.callCount; }
}
if (!threw) { console.error("GATE_FAIL: waterfall was NOT detected"); process.exit(1); }
console.log("GATE_PASS: waterfall detected, callCount=" + count);
`;

let waterfallResult;
try {
  waterfallResult = execFileSync("node", ["--input-type=module"], {
    cwd: CONTRACTS_DIR,
    input: waterfallDetectScript,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
} catch (err) {
  fail(`Waterfall detection mechanism failed:\n${err.stdout || ""}\n${err.stderr || ""}`);
}
if (!waterfallResult.includes("GATE_PASS")) {
  fail(`Waterfall was NOT detected as expected.\nOutput: ${waterfallResult}`);
}
pass("Waterfall detected and throws WaterfallDetectedError");

// ── 4. Mechanically verify: compliant journey passes ─────────────────────
const compliantScript = `
import { assertNoWaterfallOnJourney, CANONICAL_CONSUMER_JOURNEYS } from "./src/contract-performance.ts";

const journey = CANONICAL_CONSUMER_JOURNEYS.find(j => j.journeyId === "J001_LIST_INVOICES_WITH_TENANT");
const result = assertNoWaterfallOnJourney(journey, ["GET /invoices"], "GET /invoices");
if (!result.verified) { console.error("GATE_FAIL: compliant journey unexpectedly rejected"); process.exit(1); }
console.log("GATE_PASS: compliant single-call journey accepted, callCount=" + result.callCount);
`;

let compliantResult;
try {
  compliantResult = execFileSync("node", ["--input-type=module"], {
    cwd: CONTRACTS_DIR,
    input: compliantScript,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
} catch (err) {
  fail(`Compliant journey check failed:\n${err.stdout || ""}\n${err.stderr || ""}`);
}
if (!compliantResult.includes("GATE_PASS")) {
  fail(`Compliant journey was unexpectedly rejected.\nOutput: ${compliantResult}`);
}
pass("Compliant single-call journey accepted without error");

// ── 5. Mechanically verify: over-fetching IS detected ────────────────────
const overfetchScript = `
import { assertNoOverFetchingOnJourney, OverFetchingDetectedError, CANONICAL_CONSUMER_JOURNEYS } from "./src/contract-performance.ts";

const journey = CANONICAL_CONSUMER_JOURNEYS.find(j => j.journeyId === "J001_LIST_INVOICES_WITH_TENANT");
// 20 returned fields, journey uses only 5 → ratio 4x > 3x threshold
const massiveFields = Array.from({ length: 20 }, (_, i) => "field_" + i);
let threw = false;
let ratio = 0;
try {
  assertNoOverFetchingOnJourney(journey, massiveFields, "GET /invoices");
} catch (err) {
  if (err instanceof OverFetchingDetectedError) { threw = true; ratio = err.overfetchRatio; }
}
if (!threw) { console.error("GATE_FAIL: over-fetching was NOT detected"); process.exit(1); }
console.log("GATE_PASS: over-fetching detected, ratio=" + ratio.toFixed(2));
`;

let overfetchResult;
try {
  overfetchResult = execFileSync("node", ["--input-type=module"], {
    cwd: CONTRACTS_DIR,
    input: overfetchScript,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
} catch (err) {
  fail(`Over-fetching detection mechanism failed:\n${err.stdout || ""}\n${err.stderr || ""}`);
}
if (!overfetchResult.includes("GATE_PASS")) {
  fail(`Over-fetching was NOT detected.\nOutput: ${overfetchResult}`);
}
pass("Over-fetching detected and throws OverFetchingDetectedError");

// ── 6. Registry coverage ─────────────────────────────────────────────────
const registryScript = `
import { CANONICAL_CONSUMER_JOURNEYS } from "./src/contract-performance.ts";
if (CANONICAL_CONSUMER_JOURNEYS.length < 4) {
  console.error("GATE_FAIL: registry has only " + CANONICAL_CONSUMER_JOURNEYS.length + " journeys (need ≥4)");
  process.exit(1);
}
console.log("GATE_PASS: registry has " + CANONICAL_CONSUMER_JOURNEYS.length + " consumer journeys");
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
  fail(`Registry check failed:\n${err.stdout || ""}\n${err.stderr || ""}`);
}
if (!registryResult.includes("GATE_PASS")) {
  fail(`Registry coverage insufficient.\nOutput: ${registryResult}`);
}
pass("Consumer journey registry covers ≥4 documented journeys");

// ── Summary ───────────────────────────────────────────────────────────────
console.log(
  "\n✓ Contract performance gate passed (P12-082): " +
    "Waterfall and over-fetching detection in place; " +
    "CANONICAL_CONSUMER_JOURNEYS covers 4 documented journeys; " +
    "endpoint forcing a waterfall on a documented journey is reported. " +
    "Mechanism verified both passing and failing."
);
