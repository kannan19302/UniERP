import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const checker = resolve(scriptDir, "ci", "check-migration-safety.mjs");

const result = spawnSync(
  process.execPath,
  [checker, "--forbid-destructive", "--since", "20260909190000"],
  { encoding: "utf8" },
);

assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
assert.match(result.stdout, /RLS: 3 tenant tables .* 0 uncovered/);
assert.match(result.stdout, /No blocking issues/);

console.log("Migration safety tests passed: explicit ALTER/CREATE POLICY table names satisfy RLS coverage.");
