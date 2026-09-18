#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { loadActiveEstate } from "./lib/estate.mjs";

const estate = loadActiveEstate();
const workspaceRoot = estate.root;
const repositories = [...estate.repositories.values()];
const ignored = new Set([".git", ".quarantine", "node_modules", "dist", "build", ".next", "coverage", ".turbo", ".stryker-tmp"]);
const findings = [];
const rootArtifactName = /(token|secret|credential|cookie|csrf|session)/i;
const realSecretFile = /(^|\\|\/)(\.env(?:\.[^./]+)?|[^/\\]+\.(?:pem|key|p12|pfx))$/i;
const allowedExample = /\.env\.example$/i;
const signatures = [
  ["private-key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["github-token", /gh[pousr]_[A-Za-z0-9_]{20,}/],
  ["aws-access-key", /AKIA[0-9A-Z]{16}/],
];

function scanFile(file) {
  const rel = relative(workspaceRoot, file);
  if (file.endsWith(".gitleaks.toml")) return;
  if (allowedExample.test(file)) return;
  if (realSecretFile.test(file)) findings.push(`${rel}: unapproved secret-bearing filename`);
  const size = statSync(file).size;
  if (size > 1024 * 1024) return;
  const contents = readFileSync(file, "utf8");
  for (const [kind, pattern] of signatures) {
    if (pattern.test(contents)) findings.push(`${rel}: ${kind} signature`);
  }
}

function walk(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const target = join(directory, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (entry.isFile()) scanFile(target);
  }
}

for (const entry of readdirSync(workspaceRoot, { withFileTypes: true })) {
  if (entry.name === ".quarantine" || entry.name.startsWith(".")) continue;
  if (entry.isFile() && rootArtifactName.test(entry.name)) {
    findings.push(`${entry.name}: ungoverned root scratch artifact`);
  }
}
for (const repository of repositories) walk(join(workspaceRoot, repository.path));

if (findings.length) {
  console.error("Sensitive workspace hygiene failed; output contains paths and detection classes only:");
  for (const finding of findings) console.error(`  - ${finding}`);
  process.exit(1);
}
console.log(`Sensitive workspace hygiene verified across ${repositories.length} active repositories.`);
