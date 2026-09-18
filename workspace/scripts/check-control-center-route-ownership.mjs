#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRepository = resolve(scriptDirectory, "..");
const estateRoot = resolve(workspaceRepository, "..");
const require = createRequire(import.meta.url);
const inventory = JSON.parse(readFileSync(join(scriptDirectory, "control-center-route-ownership.json"), "utf8"));

const contractsPath = join(estateRoot, "unierp-contracts", "dist", "control-centers.js");
if (!existsSync(contractsPath)) {
  console.error("unierp-contracts/dist/control-centers.js is missing; run npm run build in unierp-contracts first");
  process.exit(1);
}

const { CONTROL_CENTER_APPS, assertValidControlCenterCatalog } = require(contractsPath);
assertValidControlCenterCatalog();

function walk(directory, files = []) {
  for (const entry of readdirSync(directory)) {
    if (["node_modules", ".next", ".git", "coverage"].includes(entry)) continue;
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) walk(fullPath, files);
    else if (entry === "page.tsx" || entry === "page.ts" || entry === "page.jsx" || entry === "page.js") files.push(fullPath);
  }
  return files;
}

function fileToRoute(appDirectory, file) {
  const segments = relative(appDirectory, dirname(file))
    .split(sep)
    .filter((segment) => segment && !(segment.startsWith("(") && segment.endsWith(")")))
    .map((segment) => {
      if (/^\[\.\.\..+\]$/.test(segment)) return `:${segment.slice(4, -1)}*`;
      if (/^\[\[\.\.\..+\]\]$/.test(segment)) return `:${segment.slice(5, -2)}*?`;
      if (/^\[.+\]$/.test(segment)) return `:${segment.slice(1, -1)}`;
      return segment;
    });
  return segments.length === 0 ? "/" : `/${segments.join("/")}`;
}

function matchesRule(route, rule) {
  if (rule.match === "exact") return route === rule.path;
  if (rule.match === "prefix") return route === rule.path || route.startsWith(`${rule.path}/`);
  return false;
}

const errors = [];
const warnings = [];
const discovered = [];
const knownAppIds = new Set(CONTROL_CENTER_APPS.map((app) => app.id));
const utilityOwners = new Set(inventory.utilityOwners);

if (inventory.version !== 1) errors.push(`unsupported inventory version ${inventory.version}`);

const ruleKeys = new Set();
for (const rule of inventory.rules) {
  const key = `${rule.surface}:${rule.match}:${rule.path}`;
  if (ruleKeys.has(key)) errors.push(`duplicate route rule ${key}`);
  ruleKeys.add(key);
  if (!knownAppIds.has(rule.owner) && !utilityOwners.has(rule.owner)) errors.push(`${key} has unknown owner ${rule.owner}`);
}

for (const [surface, surfaceDefinition] of Object.entries(inventory.surfaces)) {
  const appDirectory = join(estateRoot, surfaceDefinition.repository, surfaceDefinition.appDirectory);
  if (!existsSync(appDirectory)) {
    errors.push(`${surface} app directory does not exist: ${appDirectory}`);
    continue;
  }
  for (const file of walk(appDirectory)) {
    const route = fileToRoute(appDirectory, file);
    const candidates = inventory.rules
      .filter((rule) => rule.surface === surface && matchesRule(route, rule))
      .sort((left, right) => right.path.length - left.path.length);
    if (candidates.length === 0) {
      errors.push(`${surface} route ${route} has no ownership rule (${relative(estateRoot, file)})`);
      continue;
    }
    const mostSpecific = candidates.filter((rule) => rule.path.length === candidates[0].path.length);
    if (mostSpecific.length !== 1) {
      errors.push(`${surface} route ${route} has ambiguous rules: ${mostSpecific.map((rule) => rule.path).join(", ")}`);
      continue;
    }
    const rule = mostSpecific[0];
    const boundaryViolation =
      (surface === "PCC" && rule.owner.startsWith("OCC-")) ||
      (surface === "OCC" && rule.owner.startsWith("PCC-"));
    discovered.push({ surface, route, file: relative(estateRoot, file), ...rule, boundaryViolation });
    if (boundaryViolation) {
      warnings.push(`${surface} route ${route} is owned by ${rule.owner} and must ${rule.disposition}`);
    }
  }
}

const usedRuleKeys = new Set(discovered.map((entry) => `${entry.surface}:${entry.match}:${entry.path}`));
for (const rule of inventory.rules) {
  const key = `${rule.surface}:${rule.match}:${rule.path}`;
  if (!usedRuleKeys.has(key)) warnings.push(`route rule currently matches no page: ${key}`);
}

const counts = new Map();
for (const route of discovered) counts.set(route.owner, (counts.get(route.owner) ?? 0) + 1);

console.log(`PCC/OCC route inventory: ${discovered.length} pages, ${inventory.rules.length} ownership rules.`);
for (const [owner, count] of [...counts.entries()].sort(([left], [right]) => left.localeCompare(right))) {
  console.log(`  ${owner}: ${count}`);
}

if (warnings.length > 0) {
  console.log(`\nMigration findings (${warnings.length}):`);
  for (const warning of warnings) console.log(`  - ${warning}`);
}

if (errors.length > 0) {
  console.error(`\nRoute ownership errors (${errors.length}):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

const boundaryViolations = discovered.filter((route) => route.boundaryViolation);
if (process.argv.includes("--verify-boundaries") && boundaryViolations.length > 0) {
  console.error(`\nBoundary gate failed: ${boundaryViolations.length} provider-owned page(s) remain in OCC.`);
  process.exit(1);
}

console.log(`\nRoute ownership inventory is complete. Boundary violations: ${boundaryViolations.length}.`);
