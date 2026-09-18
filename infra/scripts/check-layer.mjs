#!/usr/bin/env node
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");

function findCanonicalGate(start) {
  let cur = start;
  while (cur) {
    const candidate = resolve(cur, "platform", "workspace", "scripts", "check-layer.mjs");
    if (existsSync(candidate)) return candidate;
    const parent = dirname(cur);
    if (parent === cur) break;
    cur = parent;
  }
  return null;
}

const gate = findCanonicalGate(scriptDir);
if (!gate) {
  console.error("❌ Canonical layer gate is unavailable at platform/workspace/scripts/check-layer.mjs.");
  process.exit(1);
}

const result = spawnSync(process.execPath, [gate, "--repo-root", repoRoot], { stdio: "inherit" });
process.exit(result.status ?? 1);
