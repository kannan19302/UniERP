#!/usr/bin/env node
/**
 * scripts/check-deprecation-window-proof.mjs
 *
 * Phase P12-088: The deprecation-window proof
 *
 * Exit criterion:
 *   "Removing an element inside its window fails CI, proven on a seeded removal"
 *
 * This script proves that a premature element removal will fail the build.
 */

import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export async function verifyDeprecationWindowProof() {
  const contractsEntry = join(PARENT_ROOT, "unierp-contracts", "dist", "index.js");
  if (!existsSync(contractsEntry)) {
    return { valid: false, reason: "unierp-contracts is not built" };
  }

  // Load dynamically using pathToFileURL to handle Windows paths safely
  const { assertDeprecationWindowEnforcement, PrematureElementRemovalError } = await import(pathToFileURL(contractsEntry).href);
  
  if (!assertDeprecationWindowEnforcement || !PrematureElementRemovalError) {
    return { valid: false, reason: "assertDeprecationWindowEnforcement or PrematureElementRemovalError missing in dist" };
  }

  const futureSunsetDate = new Date();
  futureSunsetDate.setFullYear(futureSunsetDate.getFullYear() + 1);

  const activeDeprecatedElements = [
    {
      elementId: "test-deprecated-element",
      elementKind: "ENDPOINT",
      deprecation: {
        deprecated: true,
        deprecatedSince: new Date().toISOString(),
        sunsetDate: futureSunsetDate.toISOString(),
      }
    }
  ];

  // The element is absent from candidateElements, meaning it was removed
  const candidateElements = [];

  let threwExpectedError = false;
  try {
    assertDeprecationWindowEnforcement(activeDeprecatedElements, candidateElements);
  } catch (err) {
    if (err instanceof PrematureElementRemovalError || err.name === "PrematureElementRemovalError") {
      threwExpectedError = true;
    } else {
      return { valid: false, reason: `Threw unexpected error: ${err.message}` };
    }
  }

  if (!threwExpectedError) {
    return { valid: false, reason: "Did not throw PrematureElementRemovalError when removing an element inside its window" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  verifyDeprecationWindowProof().then(res => {
    if (!res.valid) {
      console.error(`\n❌ Deprecation window proof gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Deprecation window proof gate passed: Removing an element inside its window throws PrematureElementRemovalError.`);
    process.exit(0);
  }).catch(err => {
    console.error(`\n❌ Error during deprecation window proof verification:`, err);
    process.exit(1);
  });
}
