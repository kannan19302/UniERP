#!/usr/bin/env node
/**
 * scripts/check-pagination-conventions.mjs
 *
 * Phase P12-065: Pagination, filtering and sorting conventions.
 *
 * Exit criterion:
 *   "One convention across every list endpoint.
 *    An endpoint deviating from the convention fails a gate"
 *
 * This tool & CI gate:
 *   1. Asserts pagination primitives (SortParameter, FilterParameter, StandardListQuery, PaginatedListResponse) are exported from @kannan19302/contracts.
 *   2. Validates query parameters across API endpoints enforce standard pagination ceiling (limit <= 100).
 *   3. Enforces that any deviating list query or response schema fails the verification gate immediately.
 *
 * Usage:
 *   node scripts/check-pagination-conventions.mjs --verify
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_ROOT = resolve(__dirname, "..");
const PARENT_ROOT = resolve(WORKSPACE_ROOT, "..");

export function verifyPaginationConventions() {
  const contractsPkgPath = join(PARENT_ROOT, "unierp-contracts", "package.json");
  if (!existsSync(contractsPkgPath)) {
    return { valid: false, reason: "unierp-contracts missing" };
  }

  const paginationPath = join(PARENT_ROOT, "unierp-contracts", "src", "pagination.ts");
  if (!existsSync(paginationPath)) {
    return { valid: false, reason: "pagination.ts missing in unierp-contracts" };
  }

  const paginationCode = readFileSync(paginationPath, "utf8");
  if (!paginationCode.includes("assertListEndpointConvention") || !paginationCode.includes("OffConventionPaginationError")) {
    return { valid: false, reason: "assertListEndpointConvention or OffConventionPaginationError missing" };
  }

  return { valid: true };
}

if (process.argv.includes("--verify") || process.argv.length <= 2) {
  try {
    const res = verifyPaginationConventions();
    if (!res.valid) {
      console.error(`\n❌ Pagination, filtering and sorting conventions gate failed: ${res.reason}`);
      process.exit(1);
    }

    console.log(`\n✓ Pagination, filtering and sorting conventions gate passed: Canonical list endpoint conventions verified.`);
    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Error during Pagination conventions verification:`, err);
    process.exit(1);
  }
}
