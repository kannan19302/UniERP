#!/usr/bin/env node
/**
 * scripts/check-stage-c-contract-proof.mjs
 *
 * Phase P12-090: Stage C contract proof.
 *
 * Exit criterion:
 *   "A suite asserting generation determinism, compatibility classification, consumer enumeration and deprecation enforcement
 *    All four hold, and each fails when its mechanism is deliberately removed"
 *
 * This tool & CI gate:
 *   Runs the four foundational verification gates for Stage C:
 *   1. Generation determinism -> check-client-generation-determinism.mjs
 *   2. Compatibility classification -> check-contract-compatibility.mjs
 *   3. Consumer enumeration -> check-consumer-registry.mjs
 *   4. Deprecation enforcement -> check-deprecation-mechanism.mjs
 *
 * Usage:
 *   node scripts/check-stage-c-contract-proof.mjs --verify
 */

import { execSync } from "node:child_process";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function verifyStageCContractProof() {
  const scripts = [
    "check-client-generation-determinism.mjs",
    "check-contract-compatibility.mjs",
    "check-consumer-registry.mjs",
    "check-deprecation-mechanism.mjs",
  ];

  let passed = true;
  for (const script of scripts) {
    const scriptPath = join(__dirname, script);
    try {
      console.log(`\n▶️ Running ${script}...`);
      execSync(`node "${scriptPath}" --verify`, { stdio: "inherit" });
    } catch (error) {
      console.error(`\n❌ Failed: ${script}`);
      passed = false;
    }
  }

  return { valid: passed };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyStageCContractProof();
    if (!res.valid) {
      console.error(`\n❌ Stage C contract proof gate failed: One or more assertions did not hold.`);
      process.exit(1);
    }

    console.log(`\n✓ Stage C contract proof gate passed: Generation determinism, compatibility classification, consumer enumeration, and deprecation enforcement verified.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during Stage C contract proof verification:`, err);
    process.exit(1);
  }
}
