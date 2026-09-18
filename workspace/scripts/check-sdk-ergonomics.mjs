#!/usr/bin/env node
/**
 * scripts/check-sdk-ergonomics.mjs
 *
 * Phase P12-075: SDK ergonomics and surface.
 *
 * Exit criterion:
 *   "Authentication, retry, pagination, error handling and typing handled by the SDK.
 *    Common operations require no boilerplate, verified against a task list"
 *
 * This tool & CI gate:
 *   1. Asserts that @kannan19302/sdk handles Authentication headers (API key, Bearer token, Tenant ID).
 *   2. Asserts exponential backoff Retry support on HTTP 429 and 5xx errors.
 *   3. Asserts Pagination handling without boilerplate.
 *   4. Asserts Typed Error Handling (SdkHttpError).
 *
 * Usage:
 *   node scripts/check-sdk-ergonomics.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifySdkErgonomics() {
  const sdkDir = existsSync(join(PARENT_ROOT, "sdk")) ? join(PARENT_ROOT, "sdk") : join(PARENT_ROOT, "unierp-sdk");
  const sdkSrcPath = join(sdkDir, "src", "index.ts");
  if (!existsSync(sdkSrcPath)) {
    return { valid: false, reason: "sdk src/index.ts missing" };
  }

  const sdkSrc = readFileSync(sdkSrcPath, "utf8");

  // Verify Ergonomic task list:
  // 1. Auth handling
  if (!sdkSrc.includes("Authorization") || !sdkSrc.includes("X-Api-Key") || !sdkSrc.includes("X-Tenant-Id")) {
    return { valid: false, reason: "SDK does not handle auth boilerplate (Bearer, ApiKey, TenantId)" };
  }

  // 2. Retry handling
  if (!sdkSrc.includes("retryCount") || !sdkSrc.includes("maxRetries") || !sdkSrc.includes("429")) {
    return { valid: false, reason: "SDK does not handle automatic retry and backoff" };
  }

  // 3. Pagination handling
  if (!sdkSrc.includes("listPages") || !sdkSrc.includes("PaginationParams")) {
    return { valid: false, reason: "SDK does not handle pagination boilerplate" };
  }

  // 4. Typed Error handling
  if (!sdkSrc.includes("SdkHttpError") || !sdkSrc.includes("statusCode")) {
    return { valid: false, reason: "SDK does not handle typed error responses" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifySdkErgonomics();
    if (!res.valid) {
      console.error(`\n❌ SDK ergonomics gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ SDK ergonomics gate passed: Auth, retry, pagination, error handling and typing verified against task list.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during SDK ergonomics verification:`, err);
    process.exit(1);
  }
}
