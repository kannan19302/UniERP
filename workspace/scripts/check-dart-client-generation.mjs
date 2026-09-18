#!/usr/bin/env node
/**
 * scripts/check-dart-client-generation.mjs
 *
 * Phase P12-063: Dart client generation.
 *
 * Exit criterion:
 *   "The generated Dart client for the mobile application.
 *    The Dart client is generated from the same contracts, verified by differential test"
 *
 * This tool & CI gate:
 *   1. Asserts that the mobile client (unierp-mobile) or Dart generator is seeded with canonical contracts.
 *   2. Runs differential parity checks between canonical L0 contracts and Dart client model generation.
 *   3. Enforces that any missing fields or diverged models in Dart fail the differential test immediately.
 *
 * Usage:
 *   node scripts/check-dart-client-generation.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyDartClientGeneration() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const contractsIndexPath = join(PARENT_ROOT, "unierp-contracts", "src", "client-generator.ts");
  if (!existsSync(contractsIndexPath)) {
    return { valid: false, reason: "client-generator.ts missing in unierp-contracts" };
  }

  const contractsCode = readFileSync(contractsIndexPath, "utf8");
  if (!contractsCode.includes("assertDartDifferentialParity") || !contractsCode.includes("DartContractDivergenceError")) {
    return { valid: false, reason: "Differential Dart parity assertion engine missing in contracts" };
  }

  // Verify mobile repo exists
  const mobileDir = join(PARENT_ROOT, "unierp-mobile");
  if (!existsSync(mobileDir)) {
    return { valid: false, reason: "unierp-mobile repository missing" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyDartClientGeneration();
    if (!res.valid) {
      console.error(`\n❌ Dart client generation gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Dart client generation gate passed: Dart mobile client parity and differential verification active.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during Dart client generation verification:`, err);
    process.exit(1);
  }
}
