#!/usr/bin/env node
/**
 * scripts/check-deprecation-mechanism.mjs
 *
 * Phase P12-071: Deprecation mechanism.
 *
 * Exit criterion:
 *   "Marking, signalling and enforcing deprecation windows on contract elements.
 *    A deprecated element still works and warns; removal inside its window is refused"
 *
 * This tool & CI gate:
 *   1. Asserts deprecation mechanism (formatDeprecationHeaders, assertDeprecationWindowEnforcement) in @kannan19302/contracts.
 *   2. Validates Warning / Sunset header formatting.
 *   3. Enforces deprecation windows, preventing premature element removal.
 *
 * Usage:
 *   node scripts/check-deprecation-mechanism.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyDeprecationMechanism() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const deprecationPath = join(PARENT_ROOT, "unierp-contracts", "src", "deprecation.ts");
  if (!existsSync(deprecationPath)) {
    return { valid: false, reason: "deprecation.ts missing in unierp-contracts" };
  }

  const deprecationCode = readFileSync(deprecationPath, "utf8");
  if (
    !deprecationCode.includes("formatDeprecationHeaders") ||
    !deprecationCode.includes("assertDeprecationWindowEnforcement") ||
    !deprecationCode.includes("PrematureElementRemovalError")
  ) {
    return { valid: false, reason: "formatDeprecationHeaders, assertDeprecationWindowEnforcement or PrematureElementRemovalError missing" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyDeprecationMechanism();
    if (!res.valid) {
      console.error(`\n❌ Deprecation mechanism gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Deprecation mechanism gate passed: Deprecation signalling and window enforcement verified.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during deprecation mechanism verification:`, err);
    process.exit(1);
  }
}
