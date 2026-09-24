#!/usr/bin/env node
/**
 * Verify the 14 active repository agent entrypoints against the current product
 * authority. Repository architecture and product intent live in platform/docs,
 * not duplicate repository Markdown.
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { findWorkspaceRoot } from "./lib/estate.mjs";

const root = findWorkspaceRoot();
const estate = JSON.parse(
  readFileSync(resolve(root, "platform/workspace/governance/active-estate.json"), "utf8"),
);
const workspace = JSON.parse(readFileSync(resolve(root, "UniERP.code-workspace"), "utf8"));
const catalog = readFileSync(resolve(root, "platform/docs/PLATFORM_CATALOG.md"), "utf8");
const map = JSON.parse(
  readFileSync(resolve(root, "platform/docs/standards/AI_REPOSITORY_PLATFORM_MAP.json"), "utf8"),
);
const failures = [];
const repositories = estate.repositories ?? [];
const workspacePaths = new Set((workspace.folders ?? []).map((entry) => entry.path));
const ignoredDirectories = new Set([".git", "node_modules", ".next", ".pnpm-store", "dist", "build", "coverage"]);

function findAgentFiles(directory) {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && !ignoredDirectories.has(entry.name)) {
      found.push(...findAgentFiles(resolve(directory, entry.name)));
    } else if (entry.isFile() && entry.name === "AGENTS.md") {
      found.push(resolve(directory, entry.name));
    }
  }
  return found;
}

if (repositories.length !== 14 || workspacePaths.size !== 14) {
  failures.push(`expected 14 active roots; found ${repositories.length} estate entries and ${workspacePaths.size} workspace folders`);
}

for (const entry of repositories) {
  const repo = entry.repository;
  if (!workspacePaths.has(repo)) failures.push(`${repo}: missing from workspace`);
  const dir = resolve(root, repo);
  if (!existsSync(dir)) {
    failures.push(`${repo}: repository root missing`);
    continue;
  }
  const path = resolve(dir, "AGENTS.md");
  const agentFiles = findAgentFiles(dir);
  if (agentFiles.length !== 1 || agentFiles[0] !== path) {
    failures.push(`${repo}: expected one root AGENTS.md; found ${agentFiles.length}`);
  }
  if (!existsSync(path)) {
    failures.push(`${repo}: AGENTS.md missing`);
    continue;
  }
  const agent = readFileSync(path, "utf8");
  for (const required of [
    "UniERP-Agent-Protocol: 1.1.0",
    "../AGENTS.md",
    "platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md",
    "## Repository rules",
    "## Verification",
  ]) {
    if (!agent.includes(required)) failures.push(`${repo}: missing ${required}`);
  }
  const owner = map.repositories?.[repo]?.primaryPlatform;
  if (!owner || !catalog.includes(`| ${owner} |`)) {
    failures.push(`${repo}: unmapped or undocumented platform owner ${owner ?? ""}`);
  }
}

if (failures.length) {
  console.error("Repository agent/documentation check failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`Repository agent/documentation check passed: ${repositories.length} current roots and platform owners; no zero-target success.`);
