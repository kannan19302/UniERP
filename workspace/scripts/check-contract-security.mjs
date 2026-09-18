#!/usr/bin/env node
/**
 * scripts/check-contract-security.mjs
 *
 * Phase P12-083: Contract security review.
 * 
 * Enforces that no contract exposes a field its permission model does not cover.
 */

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CONTRACTS_DIR = join(ROOT, "../unierp-contracts");
const SPEC_FILE = join(CONTRACTS_DIR, "src/contract-security.spec.ts");
const IMPL_FILE = join(CONTRACTS_DIR, "src/contract-security.ts");

function fail(msg) {
  console.error(`✗ Contract security gate FAILED: ${msg}`);
  process.exit(1);
}

function pass(msg) {
  console.log(`  ✓ ${msg}`);
}

// ── 1. Required files exist ───────────────────────────────────────────────
if (!existsSync(IMPL_FILE)) {
  fail(`Implementation file not found: ${IMPL_FILE}`);
}
pass("contract-security.ts exists");

if (!existsSync(SPEC_FILE)) {
  fail(`Spec file not found: ${SPEC_FILE}`);
}
pass("contract-security.spec.ts exists");

// ── 2. Run the spec suite ─────────────────────────────────────────────────
let specOutput;
try {
  specOutput = execFileSync("node", ["--test", "src/contract-security.spec.ts"], {
    cwd: CONTRACTS_DIR,
    encoding: "utf8",
    stdio: ["pipe", "pipe", "pipe"],
  });
} catch (err) {
  fail(
    `contract-security.spec.ts failed:\n${err.stdout || ""}\n${err.stderr || ""}`
  );
}

const passMatches = [...(specOutput || "").matchAll(/✔/g)];
const failMatches = [...(specOutput || "").matchAll(/✖/g)];
if (failMatches.length > 0 || passMatches.length === 0) {
  fail(`Spec suite has failures. Output:\n${specOutput}`);
}
pass(`Spec suite: ${passMatches.length} tests pass, 0 fail`);

// ── 3. Mechanically verify: violating contract is blocked ──
const checkBlockedScript = `
import { assertContractSecurity } from "./dist/contract-security.js";
const contract = {
  contractId: "test.fail",
  description: "Test",
  specification: {
    method: "GET",
    path: "/test",
    permissionsRequired: [],
    responseSchema: {
      type: "object",
      properties: {
        passwordHash: { type: "string" }
      }
    }
  },
  tags: [],
  version: "1.0.0"
};

const violations = assertContractSecurity(contract);
if (violations.length === 0) {
  console.error("GATE_FAIL: contract with forbidden field was NOT blocked");
  process.exit(1);
}
console.log("GATE_PASS: contract correctly blocked");
`;

let blockResult;
try {
  blockResult = execFileSync(
    "node",
    ["--input-type=module"],
    { cwd: CONTRACTS_DIR, input: checkBlockedScript, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }
  );
} catch (err) {
  fail(
    `Security block mechanism failed:\n${err.stdout || ""}\n${err.stderr || ""}`
  );
}
if (!blockResult.includes("GATE_PASS")) {
  fail(`Contract with forbidden field was NOT blocked.\nOutput: ${blockResult}`);
}
pass("Contract exposing forbidden field correctly blocked");

console.log(
  "\n✓ Contract security gate passed: over-exposure and mass assignment mechanisms are enforced."
);
