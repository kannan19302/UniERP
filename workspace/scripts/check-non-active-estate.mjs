#!/usr/bin/env node
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { loadActiveEstate } from "./lib/estate.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const root = resolve(dirname(scriptPath), "..", "..");
const catalogFile = join(root, "unierp-workspace", "governance", "non-active-estate.json");
const allowedStatuses = new Set(["ARCHIVE", "GENERATED_OUTPUT", "RETIRED_BOOTSTRAP", "RETIRED_CHECKOUT", "SCRATCH"]);
const supportDirectories = new Set([".agents", ".claude", ".codex", ".vscode", "node_modules"]);

const estate = loadActiveEstate({ workspaceRoot: root });
const active = new Set(estate.names);
const catalog = JSON.parse(readFileSync(catalogFile, "utf8"));
const entries = Array.isArray(catalog.entries) ? catalog.entries : [];
const findings = [];
const seen = new Set();

for (const entry of entries) {
  if (!entry || typeof entry.path !== "string" || !entry.path || entry.path.includes("..")) {
    findings.push("catalog contains an unsafe or missing path");
    continue;
  }
  if (seen.has(entry.path)) findings.push(`catalog declares '${entry.path}' more than once`);
  seen.add(entry.path);
  if (active.has(entry.path)) findings.push(`'${entry.path}' is both active and non-active`);
  if (!allowedStatuses.has(entry.status)) findings.push(`'${entry.path}' has unsupported status '${entry.status}'`);
  if (!entry.owner || !entry.disposition) findings.push(`'${entry.path}' lacks owner or disposition`);
  if (entry.workspacePresent !== undefined && typeof entry.workspacePresent !== "boolean") {
    findings.push(`'${entry.path}' has non-boolean workspacePresent`);
  }
  const absolute = resolve(root, entry.path);
  if (!absolute.startsWith(`${root}${sep}`) || absolute === root) {
    findings.push(`classified non-active directory '${entry.path}' is outside the workspace root`);
  } else {
    const exists = existsSync(absolute);
    const workspacePresent = entry.workspacePresent !== false;
    if (workspacePresent && (!exists || !statSync(absolute).isDirectory())) {
      findings.push(`classified non-active directory '${entry.path}' is unavailable`);
    }
    if (!workspacePresent && exists) {
      findings.push(`externally retained directory '${entry.path}' has reappeared in the active workspace`);
    }
  }
  if (entry.replacement && !active.has(entry.replacement)) findings.push(`'${entry.path}' names non-active replacement '${entry.replacement}'`);
}

for (const entry of readdirSync(root, { withFileTypes: true })) {
  if (!entry.isDirectory() || active.has(entry.name) || supportDirectories.has(entry.name)) continue;
  const directory = join(root, entry.name);
  const repositoryLike = existsSync(join(directory, ".git")) || existsSync(join(directory, "package.json"));
  const operationalArea = ["archives", "release-artifacts", "UniERP_scratch"].includes(entry.name);
  if ((repositoryLike || operationalArea) && !seen.has(entry.name)) findings.push(`unclassified non-active workspace root '${entry.name}'`);
}

if (findings.length) {
  console.error(`Non-active estate policy failed with ${findings.length} finding(s):`);
  for (const finding of findings) console.error(`  - ${finding}`);
  process.exit(1);
}

const externallyRetained = entries.filter((entry) => entry.workspacePresent === false).length;
console.log(
  `Non-active estate verified: ${entries.length} classified roots excluded from ${active.size} active repositories; ${externallyRetained} retained outside the workspace.`,
);
