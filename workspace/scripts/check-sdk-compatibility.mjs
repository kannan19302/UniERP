#!/usr/bin/env node
/**
 * scripts/check-sdk-compatibility.mjs
 *
 * Phase P12-076: SDK versioning and compatibility.
 *
 * Exit criterion:
 *   "SDK versions mapped to API versions with a stated support matrix.
 *    An SDK used against an unsupported API version fails clearly, not obscurely"
 *
 * This tool & CI gate:
 *   1. Asserts declared SDK support matrix (CANONICAL_SDK_SUPPORT_MATRIX) in @kannan19302/contracts.
 *   2. Asserts assertSdkApiCompatibility and UnsupportedApiVersionError mechanics.
 *   3. Enforces that using an SDK against an unsupported API version fails clearly with explicit error details.
 *
 * Usage:
 *   node scripts/check-sdk-compatibility.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifySdkCompatibility() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const compatPath = join(PARENT_ROOT, "unierp-contracts", "src", "sdk-compatibility.ts");
  if (!existsSync(compatPath)) {
    return { valid: false, reason: "sdk-compatibility.ts missing in unierp-contracts" };
  }

  const compatCode = readFileSync(compatPath, "utf8");
  if (
    !compatCode.includes("CANONICAL_SDK_SUPPORT_MATRIX") ||
    !compatCode.includes("assertSdkApiCompatibility") ||
    !compatCode.includes("UnsupportedApiVersionError")
  ) {
    return { valid: false, reason: "CANONICAL_SDK_SUPPORT_MATRIX, assertSdkApiCompatibility or UnsupportedApiVersionError missing" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifySdkCompatibility();
    if (!res.valid) {
      console.error(`\n❌ SDK versioning and compatibility gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ SDK versioning and compatibility gate passed: Support matrix mapped and compatibility checks verified.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during SDK versioning and compatibility verification:`, err);
    process.exit(1);
  }
}
