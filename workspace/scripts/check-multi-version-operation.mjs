#!/usr/bin/env node
/**
 * scripts/check-multi-version-operation.mjs
 *
 * Phase P12-087: Multi-version operation.
 *
 * Exit criterion:
 *   "Two API versions serve correctly from one implementation, proven by test"
 *
 * This tool & CI gate:
 *   1. Asserts MultiVersionRouter definitions in @kannan19302/contracts.
 *   2. Enforces the presence of multi-version testing in the specs.
 *
 * Usage:
 *   node scripts/check-multi-version-operation.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyMultiVersionOperation() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const multiVersionPath = join(PARENT_ROOT, "unierp-contracts", "src", "multi-version.ts");
  if (!existsSync(multiVersionPath)) {
    return { valid: false, reason: "multi-version.ts missing in unierp-contracts" };
  }

  const multiVersionSpecPath = join(PARENT_ROOT, "unierp-contracts", "src", "multi-version.spec.ts");
  if (!existsSync(multiVersionSpecPath)) {
    return { valid: false, reason: "multi-version.spec.ts missing in unierp-contracts" };
  }

  const code = readFileSync(multiVersionPath, "utf8");
  if (!code.includes("class MultiVersionRouter") || !code.includes("register<") || !code.includes("serve(")) {
    return { valid: false, reason: "MultiVersionRouter missing or incomplete in multi-version.ts" };
  }

  const specCode = readFileSync(multiVersionSpecPath, "utf8");
  if (!specCode.includes('router.serve("v1"') || !specCode.includes('router.serve("v2"')) {
    return { valid: false, reason: "multi-version.spec.ts does not prove serving two versions" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyMultiVersionOperation();
    if (!res.valid) {
      console.error(`\n❌ Multi-version operation gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Multi-version operation gate passed: Two API versions proven by test.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during Multi-version operation verification:`, err);
    process.exit(1);
  }
}
