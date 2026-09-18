#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { dirname, resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const apiDir = resolve(scriptDir, "../../api");
const runnerScript = join(apiDir, "scripts/verify-node22-behavioral-isolation.cjs");

console.log("Delegating FND-P0-004 behavioral multi-tenant isolation suite to Node 22 api container...");

spawnSync("docker", ["cp", runnerScript, "api:/app/verify-node22-behavioral-isolation.cjs"], { stdio: "inherit" });
const r = spawnSync(
  "docker",
  [
    "exec",
    "-e", "DATABASE_APP_URL=postgresql://unerp_api:unerp_api_password@postgres:5432/unerp_dev",
    "api",
    "node",
    "/app/verify-node22-behavioral-isolation.cjs",
  ],
  { stdio: "inherit" },
);

if (r.status !== 0) {
  process.exit(r.status ?? 1);
}

console.log("✅ FND-P0-004 Behavioral Multi-Tenant Isolation Suite verified cleanly on Node 22.");
