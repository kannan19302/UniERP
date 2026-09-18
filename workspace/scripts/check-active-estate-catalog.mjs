#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadActiveEstate } from "./lib/estate.mjs";

const workspaceRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const catalogFile = resolve(workspaceRoot, "unierp-workspace", "governance", "active-estate.json");

function expectedEntries(estate) {
  return estate.names.map((repository) => {
    const folder = estate.repositories.get(repository);
    const layerMatch = folder.name.match(/^L(\d+)\b/);
    const packageFile = resolve(estate.root, repository, "package.json");
    const packageNames = existsSync(packageFile)
      ? [JSON.parse(readFileSync(packageFile, "utf8")).name].filter(Boolean)
      : [];
    return { repository, layer: layerMatch ? Number(layerMatch[1]) : null, packages: packageNames };
  });
}

function normalized(value) {
  return JSON.stringify(value);
}

const estate = loadActiveEstate({ workspaceRoot });
if (!existsSync(catalogFile)) {
  console.error(`❌ Active-estate catalog is missing at ${catalogFile}`);
  process.exit(1);
}
const catalog = JSON.parse(readFileSync(catalogFile, "utf8"));
const expected = expectedEntries(estate);
if (!Array.isArray(catalog.repositories) || normalized(catalog.repositories) !== normalized(expected)) {
  console.error("❌ Active-estate catalog drift detected. Regenerate its repository, layer, and package entries from UniERP.code-workspace and active package manifests.");
  console.error(`Expected ${expected.length} active repository entries; found ${Array.isArray(catalog.repositories) ? catalog.repositories.length : 0}.`);
  process.exit(1);
}

console.log(`✅ Active-estate catalog verified: ${expected.length} repositories and ${expected.reduce((count, entry) => count + entry.packages.length, 0)} package identities match the workspace inventory.`);
