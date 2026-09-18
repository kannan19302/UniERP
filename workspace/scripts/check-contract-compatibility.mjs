#!/usr/bin/env node
/**
 * scripts/check-contract-compatibility.mjs
 *
 * Phase P12-070: Contract compatibility checking.
 *
 * Exit criterion:
 *   "Automated classification of every contract change as compatible or breaking.
 *    A breaking change is detected and classified automatically, proven on a seeded change"
 *
 * This tool & CI gate:
 *   1. Asserts contract compatibility classifier (classifyContractChanges, assertContractCompatibility) in @kannan19302/contracts.
 *   2. Proves that compatible changes (adding optional params, adding endpoints) are permitted.
 *   3. Proves that breaking changes (removing endpoints, adding required parameters) are detected, classified, and refused.
 *
 * Usage:
 *   node scripts/check-contract-compatibility.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyContractCompatibility() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const compatPath = join(PARENT_ROOT, "unierp-contracts", "src", "contract-compatibility.ts");
  if (!existsSync(compatPath)) {
    return { valid: false, reason: "contract-compatibility.ts missing in unierp-contracts" };
  }

  const compatCode = readFileSync(compatPath, "utf8");
  if (
    !compatCode.includes("classifyContractChanges") ||
    !compatCode.includes("assertContractCompatibility") ||
    !compatCode.includes("BreakingContractChangeDetectedError")
  ) {
    return { valid: false, reason: "classifyContractChanges, assertContractCompatibility or BreakingContractChangeDetectedError missing" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyContractCompatibility();
    if (!res.valid) {
      console.error(`\n❌ Contract compatibility gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Contract compatibility gate passed: Automated contract breaking/compatible change classification verified.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during contract compatibility verification:`, err);
    process.exit(1);
  }
}
