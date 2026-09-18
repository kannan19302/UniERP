import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const classifier = resolve(scriptDir, "classify-ai-change.mjs");

const result = spawnSync(
  process.execPath,
  [
    classifier,
    "--json",
    "data/prisma/schema/core.prisma",
    "api/src/orders/orders.controller.ts",
    "tenant-apps/app/orders/page.tsx",
  ],
  { encoding: "utf8" },
);
assert.equal(result.status, 0, result.stderr);
const classification = JSON.parse(result.stdout);
assert.equal(classification.provisionalRiskClass, "R2");
assert.equal(classification.manualR3ReviewRequired, true);
assert.equal(classification.cycleStatus, "NOT STARTED");
assert.equal(classification.done, false);
assert.deepEqual(classification.affectedRepositories, ["data", "api", "tenant-apps"]);
assert(classification.triggeredPlaybooks.includes("Database, Prisma, migration, or persistence"));
assert(classification.triggeredPlaybooks.includes("HTTP API, event, SDK, extension, or contract"));
assert(classification.triggeredPlaybooks.includes("UI, UX, accessibility, or localization"));
assert(classification.triggeredPlaybooks.includes("Cross-repository or multi-agent change"));
assert(!classification.triggeredPlaybooks.includes("Authentication, authorization, tenancy, security, or privacy"));

const unknown = spawnSync(process.execPath, [classifier, "--json", "unknown-repository/file.ts"], {
  encoding: "utf8",
});
assert.notEqual(unknown.status, 0);
assert.match(unknown.stderr, /Unmapped workspace paths/);

console.log("AI change classifier tests passed: R2 cross-repository mapping and unknown-path rejection.");

