#!/usr/bin/env node
/**
 * Whole-schema tenant isolation gate.
 *
 * This is deliberately an orchestration wrapper, not a simulation. The prior
 * implementation created an in-memory array for each Prisma model and then
 * filtered that array by a different tenant; it could only prove JavaScript's
 * Array#filter, while reporting every database table isolated. The data-owned
 * verifier interrogates the current PostgreSQL schema, policies and runtime
 * application role instead.
 */
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_FILE = fileURLToPath(import.meta.url);
const WORKSPACE_ROOT = resolve(dirname(SCRIPT_FILE), "..");
const DATA_VERIFIER = resolve(WORKSPACE_ROOT, "..", "data", "scripts", "check-rls-verify.mjs");

if (!existsSync(DATA_VERIFIER)) {
  throw new Error(`Authoritative data RLS verifier is missing: ${DATA_VERIFIER}`);
}
if (!process.env.DATABASE_APP_URL) {
  throw new Error(
    "DATABASE_APP_URL is required for whole-schema tenant isolation verification; it must use a NOBYPASSRLS application role and a simulated proof is not valid evidence.",
  );
}

const result = spawnSync(process.execPath, [DATA_VERIFIER], {
  cwd: resolve(WORKSPACE_ROOT, "..", "data"),
  env: process.env,
  stdio: "inherit",
});
if (result.error) throw result.error;
if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
