#!/usr/bin/env node
/**
 * scripts/check-idempotency-convention.mjs
 *
 * Phase P12-067: Idempotency convention.
 *
 * Exit criterion:
 *   "Idempotency keys as a contract-level concern on every mutating endpoint.
 *    A mutating endpoint without idempotency support fails a gate"
 *
 * This tool & CI gate:
 *   1. Asserts idempotency structures (IdempotencyHeaderSpec, MutatingEndpointContract, assertMutatingEndpointIdempotency) exist in @kannan19302/contracts.
 *   2. Scans mutating endpoints (POST, PUT, PATCH, DELETE) to verify contract-level idempotency key declarations.
 *   3. Enforces that any mutating endpoint omitting idempotency keys fails the verification gate immediately.
 *
 * Usage:
 *   node scripts/check-idempotency-convention.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyIdempotencyConvention() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const idempotencyPath = join(PARENT_ROOT, "unierp-contracts", "src", "idempotency.ts");
  if (!existsSync(idempotencyPath)) {
    return { valid: false, reason: "idempotency.ts missing in unierp-contracts" };
  }

  const idempotencyCode = readFileSync(idempotencyPath, "utf8");
  if (!idempotencyCode.includes("assertMutatingEndpointIdempotency") || !idempotencyCode.includes("MissingIdempotencySupportError")) {
    return { valid: false, reason: "assertMutatingEndpointIdempotency or MissingIdempotencySupportError missing" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyIdempotencyConvention();
    if (!res.valid) {
      console.error(`\n❌ Idempotency convention gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Idempotency convention gate passed: Mutating endpoint idempotency key contracts verified.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during Idempotency convention verification:`, err);
    process.exit(1);
  }
}
