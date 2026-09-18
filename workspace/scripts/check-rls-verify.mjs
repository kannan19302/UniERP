#!/usr/bin/env node
// RLS verification — DELEGATED to unierp-data (D019: gates are shared, never copied).
//
// The authoritative check lives in the repository that owns the schema, the
// migrations and the live database proof: unierp-data/scripts/check-rls-verify.mjs.
// It is schema-derived (re-derives every tenant table from the Prisma schemas on
// every run), per-table (not a count — a count is how 16 camelCase tenantId tables
// shipped with zero RLS while the old gate reported green), and exits 1 if a policy
// is dropped from any single table.
//
// A previous copy of this file lived here with a count-based implementation that
// matched only `tenant_id` columns. Phase A05 (RLS coverage sweep) replaced it:
// copying a gate into the workspace is exactly the defect D019 names, because the
// two copies drift — the workspace copy can never run anyway (it has no
// @prisma/client), so it could only lie, not check.
//
// This delegation refuses to pass silently. If the sibling repo is not on disk,
// it fails: a gate that reports green while checking nothing is the exact defect
// this platform has been burned by three times.

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = join(HERE, "..");
const DATA_REPO = existsSync(join(WORKSPACE, "..", "data"))
  ? join(WORKSPACE, "..", "data")
  : join(WORKSPACE, "..", "unierp-data");
const DATA_GATE = join(DATA_REPO, "scripts", "check-rls-verify.mjs");

if (!existsSync(DATA_GATE)) {
  console.error(
    `[check-rls-verify] The authoritative RLS gate is not on disk.\n` +
      `  expected: ${DATA_GATE}\n` +
      `  RLS verification is delegated to unierp-data (D019 — gates are shared, never copied).\n` +
      `  Check out the sibling repository, or run the gate there directly:\n` +
      `    cd unierp-data && node scripts/check-rls-verify.mjs`,
  );
  process.exit(1);
}

const r = spawnSync(process.execPath, [DATA_GATE], {
  encoding: "utf8",
  stdio: "inherit",
  env: process.env,
});

process.exit(r.status === null ? 1 : r.status);
