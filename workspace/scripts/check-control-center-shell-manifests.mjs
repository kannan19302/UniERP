#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const estateRoot = resolve(scriptDirectory, "../..");
const require = createRequire(import.meta.url);
const {
  assertValidControlCenterManifestSet,
} = require(join(estateRoot, "unierp-contracts", "dist", "control-center-manifest.js"));

const surfaces = [
  {
    center: "PCC",
    repository: "provider-admin-os",
    appDirectory: "app",
    manifest: "src/manifests/pcc-apps.json",
  },
  {
    center: "OCC",
    repository: "tenant-admin",
    appDirectory: "app",
    manifest: "src/manifests/occ-apps.json",
  },
];

function walkPages(directory, files = []) {
  for (const entry of readdirSync(directory)) {
    if (["node_modules", ".next", ".git", "coverage"].includes(entry)) continue;
    const fullPath = join(directory, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) walkPages(fullPath, files);
    else if (/^page\.(ts|tsx|js|jsx)$/.test(entry)) files.push(fullPath);
  }
  return files;
}

function fileToRoute(appDirectory, file) {
  const segments = relative(appDirectory, dirname(file))
    .split(sep)
    .filter((segment) => segment && !(segment.startsWith("(") && segment.endsWith(")")))
    .map((segment) => (/^\[.+\]$/.test(segment) ? `:${segment.replace(/^\[|\]$/g, "")}` : segment));
  return segments.length === 0 ? "/" : `/${segments.join("/")}`;
}

const errors = [];
for (const surface of surfaces) {
  const repositoryRoot = join(estateRoot, surface.repository);
  const manifestPath = join(repositoryRoot, surface.manifest);
  const appDirectory = join(repositoryRoot, surface.appDirectory);
  if (!existsSync(manifestPath)) {
    errors.push(`${surface.center} manifest file is missing: ${manifestPath}`);
    continue;
  }
  const manifests = JSON.parse(readFileSync(manifestPath, "utf8"));
  try {
    assertValidControlCenterManifestSet(manifests, surface.center);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
    continue;
  }

  const actualRoutes = new Set(walkPages(appDirectory).map((file) => fileToRoute(appDirectory, file)));
  for (const manifest of manifests) {
    if (manifest.availability === "ACTIVE" && !actualRoutes.has(manifest.entryPath)) {
      errors.push(`${manifest.appId} is ACTIVE but entryPath ${manifest.entryPath} has no page`);
    }
    for (const node of manifest.navigation) {
      if (!actualRoutes.has(node.path)) errors.push(`${manifest.appId} navigation path ${node.path} has no page`);
    }
  }
  const activeCount = manifests.filter((manifest) => manifest.availability === "ACTIVE").length;
  const plannedCount = manifests.filter((manifest) => manifest.availability === "PLANNED").length;
  console.log(`${surface.center} shell manifest verified: ${manifests.length} apps (${activeCount} active, ${plannedCount} planned).`);
}

if (errors.length > 0) {
  console.error(`\nShell manifest errors (${errors.length}):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log("PCC/OCC shell manifests conform to the shared L0 contract and all active entries resolve to pages.");
