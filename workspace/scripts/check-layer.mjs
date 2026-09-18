#!/usr/bin/env node
/** Enforce dependency direction using the versioned active-estate package catalog. */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const catalogFile = resolve(scriptDirectory, "..", "governance", "active-estate.json");

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

export function loadLayerCatalog(file = catalogFile) {
  if (!existsSync(file)) throw new Error(`active-estate catalog is missing at ${file}`);
  const catalog = JSON.parse(readFileSync(file, "utf8"));
  if (!Array.isArray(catalog.repositories) || catalog.repositories.length === 0) {
    throw new Error(`active-estate catalog at ${file} has zero repositories`);
  }
  const byRepository = new Map();
  const byPackage = new Map();
  for (const entry of catalog.repositories) {
    if (typeof entry.repository !== "string" || (!Number.isInteger(entry.layer) && entry.layer !== null) || !Array.isArray(entry.packages)) {
      throw new Error(`active-estate catalog has an invalid entry: ${JSON.stringify(entry)}`);
    }
    if (byRepository.has(entry.repository)) throw new Error(`active-estate catalog duplicates repository ${entry.repository}`);
    byRepository.set(entry.repository, entry);
    for (const packageName of entry.packages) {
      if (byPackage.has(packageName)) throw new Error(`active-estate catalog maps package ${packageName} more than once`);
      byPackage.set(packageName, entry);
    }
  }
  return { byRepository, byPackage };
}

export function evaluateLayerDependencies({ manifest, catalog, repository }) {
  const current = repository ? catalog.byRepository.get(repository) : catalog.byPackage.get(manifest.name);
  if (!current) throw new Error(`package '${manifest.name ?? "<unnamed>"}' is not mapped in the active-estate catalog`);
  if (current.layer === null) throw new Error(`repository '${current.repository}' has no executable dependency layer`);
  const dependencies = {
    ...manifest.dependencies,
    ...manifest.optionalDependencies,
    ...manifest.peerDependencies,
    ...manifest.devDependencies,
  };
  const violations = [];
  for (const dependency of Object.keys(dependencies)) {
    const target = catalog.byPackage.get(dependency);
    if (!target || target.layer === null) continue;
    if (target.layer >= current.layer) {
      violations.push({ dependency, targetRepository: target.repository, targetLayer: target.layer, currentLayer: current.layer });
    }
  }
  return { current, violations };
}

function main() {
  const repositoryRoot = resolve(argumentValue("--repo-root") ?? process.cwd());
  const manifestFile = resolve(repositoryRoot, "package.json");
  if (!existsSync(manifestFile)) throw new Error(`package manifest is missing at ${manifestFile}`);
  const manifest = JSON.parse(readFileSync(manifestFile, "utf8"));
  const catalog = loadLayerCatalog(argumentValue("--catalog") ?? catalogFile);
  const result = evaluateLayerDependencies({ manifest, catalog, repository: argumentValue("--repository") });
  if (result.violations.length > 0) {
    console.error(`❌ Layer rule violation in ${result.current.repository} (L${result.current.layer}):`);
    for (const violation of result.violations) {
      console.error(`  - ${violation.dependency} resolves to ${violation.targetRepository} (L${violation.targetLayer}), not a lower layer.`);
    }
    process.exit(1);
  }
  console.log(`✅ Layer rule verified for ${result.current.repository} (L${result.current.layer}): ${manifest.name}.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(`❌ Layer rule could not establish active-estate scope: ${error.message}`);
    process.exit(1);
  }
}
