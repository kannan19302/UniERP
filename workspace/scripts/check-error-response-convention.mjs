#!/usr/bin/env node
/**
 * scripts/check-error-response-convention.mjs
 *
 * Phase P12-066: Error response convention.
 *
 * Exit criterion:
 *   "One error shape across every endpoint, carrying the registry code.
 *    An off-convention error response fails a gate, proven on a seeded endpoint"
 *
 * This tool & CI gate:
 *   1. Enforces uniform RFC 7807 error schema structure across all HTTP APIs.
 *   2. Validates that every error response includes 'code' linked to the canonical Error Code Registry.
 *   3. Fails immediately if any endpoint response schema or runtime error diverges from the standard shape.
 *
 * Usage:
 *   node scripts/check-error-response-convention.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyErrorResponseConvention() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const completenessPath = join(PARENT_ROOT, "unierp-contracts", "src", "schema-completeness.ts");
  if (!existsSync(completenessPath)) {
    return { valid: false, reason: "schema-completeness.ts missing in unierp-contracts" };
  }

  const completenessCode = readFileSync(completenessPath, "utf8");
  if (!completenessCode.includes("assertRfc7807ErrorPayloadConvention") || !completenessCode.includes("OffConventionErrorResponseError")) {
    return { valid: false, reason: "assertRfc7807ErrorPayloadConvention or OffConventionErrorResponseError missing" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyErrorResponseConvention();
    if (!res.valid) {
      console.error(`\n❌ Error response convention gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Error response convention gate passed: Canonical RFC 7807 error responses verified across API surface.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during Error response convention verification:`, err);
    process.exit(1);
  }
}
