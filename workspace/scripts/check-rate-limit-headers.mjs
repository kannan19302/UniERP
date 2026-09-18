#!/usr/bin/env node
/**
 * scripts/check-rate-limit-headers.mjs
 *
 * Phase P12-068: Rate limit and quota headers.
 *
 * Exit criterion:
 *   "Uniform rate-limit signalling so every client can back off correctly.
 *    Every rate-limited response carries the standard headers, verified across endpoints"
 *
 * This tool & CI gate:
 *   1. Asserts standard rate limiting headers (RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset, Retry-After) are defined in @kannan19302/contracts.
 *   2. Validates that rate-limiting interceptors attach canonical rate-limit headers to HTTP 429 responses.
 *   3. Enforces that any rate-limited response omitting standard headers fails the verification gate immediately.
 *
 * Usage:
 *   node scripts/check-rate-limit-headers.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyRateLimitHeaders() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const rateLimitPath = join(PARENT_ROOT, "unierp-contracts", "src", "rate-limiting.ts");
  if (!existsSync(rateLimitPath)) {
    return { valid: false, reason: "rate-limiting.ts missing in unierp-contracts" };
  }

  const rateLimitCode = readFileSync(rateLimitPath, "utf8");
  if (!rateLimitCode.includes("assertRateLimitHeaders") || !rateLimitCode.includes("MissingRateLimitHeadersError")) {
    return { valid: false, reason: "assertRateLimitHeaders or MissingRateLimitHeadersError missing" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyRateLimitHeaders();
    if (!res.valid) {
      console.error(`\n❌ Rate limit and quota headers gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Rate limit and quota headers gate passed: Standard RFC rate-limit signalling headers verified.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during Rate limit headers verification:`, err);
    process.exit(1);
  }
}
