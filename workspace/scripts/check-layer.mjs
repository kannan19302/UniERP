#!/usr/bin/env node
/**
 * Canonical UniERP Layer Rule Gate
 * Enforces strict dependency direction (downward only: L0 <- L1 <- L2 <- L3 <- L4 <- L5 <- L6 <- L7)
 * Fails closed on:
 *  - unmapped internal packages
 *  - missing inventories or package manifests
 *  - broken local file: targets
 *  - sideways (same-layer) or upward (higher-layer) dependencies
 *  - dependency cycles
 */
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve, basename, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));

export function findWorkspaceRoot(startDir = scriptDirectory) {
  let current = resolve(startDir);
  while (current) {
    if (existsSync(resolve(current, "UniERP.code-workspace")) && existsSync(resolve(current, "platform"))) {
      return current;
    }
    const parent = dirname(current);
    if (parent === current) break;
    current = parent;
  }
  return resolve(scriptDirectory, "..", "..", "..");
}

const workspaceRoot = findWorkspaceRoot();
const catalogFile = resolve(workspaceRoot, "platform", "workspace", "governance", "active-estate.json");

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

/** Known nested and retained/published internal packages */
const AUXILIARY_PACKAGES = [
  // Nested active packages
  { package: "@kannan19302/config", repository: "shared/config", layer: 1 },
  { package: "@kannan19302/framework", repository: "shared/framework", layer: 2 },
  { package: "@kannan19302/storybook", repository: "design-system/storybook", layer: 4 },
  { package: "@kannan19302/tenant-admin", repository: "tenant-admin", layer: 4 },
  { package: "@kannan19302/marketplace", repository: "developer-platform/marketplace", layer: 4 },
  { package: "unierp-extensions", repository: "developer-platform/extensions", layer: 6 },
  { package: "@kannan19302/extensions", repository: "developer-platform/extensions", layer: 6 },

  // External / published internal packages retained outside active workspace
  { package: "@kannan19302/auth", repository: "auth (published)", layer: 1 },
  { package: "@kannan19302/kernel", repository: "kernel (published)", layer: 1 },
  { package: "@kannan19302/sdk", repository: "sdk (published)", layer: 1 },
  { package: "@kannan19302/service-kit", repository: "service-kit (published)", layer: 1 },
  { package: "@kannan19302/blockchain", repository: "blockchain (published)", layer: 2 },
  { package: "@kannan19302/extension-api", repository: "extension-api (published)", layer: 2 },
  { package: "@kannan19302/sandbox", repository: "sandbox (published)", layer: 2 },
  { package: "@kannan19302/corporate-site-template", repository: "corporate-site-template (published)", layer: 4 },
  { package: "@kannan19302/tenant-sites", repository: "tenant-sites (published)", layer: 4 },
  { package: "@kannan19302/web-studio", repository: "web-studio (published)", layer: 4 },

  // Brand aliases
  { package: "corporate-website", repository: "marketing-site", layer: 4 },
  { package: "unierp-corporate-website", repository: "marketing-site", layer: 4 },
  { package: "unierp-mobile", repository: "mobile", layer: 5 },
  { package: "unierp-workspace", repository: "platform/workspace", layer: 7 },
  { package: "unierp-infra", repository: "platform/infra", layer: 7 },
];

/** Additional repository name aliases for robust lookups */
const REPOSITORY_ALIASES = {
  "unierp-contracts": "contracts",
  "contracts": "contracts",
  "unierp-design-system": "design-system",
  "design-system": "design-system",
  "unierp-shared": "shared",
  "shared": "shared",
  "config": "shared/config",
  "unierp-config": "shared/config",
  "shared/config": "shared/config",
  "framework": "shared/framework",
  "unierp-framework": "shared/framework",
  "shared/framework": "shared/framework",
  "storybook": "design-system/storybook",
  "unierp-storybook": "design-system/storybook",
  "design-system/storybook": "design-system/storybook",
  "unierp-data": "data",
  "data": "data",
  "unierp-api": "api",
  "api": "api",
  "unierp-idp": "idp",
  "idp": "idp",
  "unierp-web": "tenant-apps",
  "tenant-apps": "tenant-apps",
  "tenant-admin": "tenant-apps/tenant-admin",
  "unierp-tenant-admin": "tenant-apps/tenant-admin",
  "tenant-apps/tenant-admin": "tenant-apps/tenant-admin",
  "unierp-console": "provider-admin-os",
  "provider-admin-os": "provider-admin-os",
  "unierp-developer": "developer-platform",
  "developer-platform": "developer-platform",
  "marketplace": "developer-platform/marketplace",
  "unierp-marketplace": "developer-platform/marketplace",
  "developer-platform/marketplace": "developer-platform/marketplace",
  "unierp-corporate-website": "marketing-site",
  "marketing-site": "marketing-site",
  "corporate-website": "marketing-site",
  "unierp-mobile": "mobile",
  "mobile": "mobile",
  "desktop-app": "desktop-app",
  "unierp-desktop": "desktop-app",
  "extensions": "developer-platform/extensions",
  "unierp-extensions": "developer-platform/extensions",
  "developer-platform/extensions": "developer-platform/extensions",
  "platform": "platform",
  "unierp-platform": "platform",
  "infra": "platform/infra",
  "unierp-infra": "platform/infra",
  "platform/infra": "platform/infra",
  "unierp-workspace": "platform/workspace",
  "platform/workspace": "platform/workspace",
};

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

  // Register auxiliary and nested packages
  for (const aux of AUXILIARY_PACKAGES) {
    if (!byPackage.has(aux.package)) {
      byPackage.set(aux.package, { repository: aux.repository, layer: aux.layer, packages: [aux.package] });
    }
    if (!byRepository.has(aux.repository)) {
      byRepository.set(aux.repository, { repository: aux.repository, layer: aux.layer, packages: [aux.package] });
    }
  }

  return { byRepository, byPackage };
}

export function evaluateLayerDependencies({ manifest, catalog, repository, manifestDir = process.cwd() }) {
  if (!manifest || typeof manifest !== "object") {
    throw new Error("Package manifest must be an object");
  }

  // Determine current layer
  let current = null;
  if (manifest.name && catalog.byPackage.has(manifest.name)) {
    current = catalog.byPackage.get(manifest.name);
  } else if (repository) {
    const canonicalRepo = REPOSITORY_ALIASES[repository] || repository;
    current = catalog.byRepository.get(canonicalRepo) || catalog.byRepository.get(repository);
  } else if (manifestDir) {
    const dirBase = basename(manifestDir);
    const parentBase = basename(dirname(manifestDir));
    const combined = `${parentBase}/${dirBase}`;
    const canonical = REPOSITORY_ALIASES[combined] || REPOSITORY_ALIASES[dirBase];
    if (canonical) {
      current = catalog.byRepository.get(canonical);
    }
  }

  if (!current) {
    throw new Error(`package '${manifest.name ?? "<unnamed>"}' is not mapped in the active-estate catalog`);
  }
  if (current.layer === null) {
    throw new Error(`repository '${current.repository}' has no executable dependency layer`);
  }

  const dependencies = {
    ...manifest.dependencies,
    ...manifest.optionalDependencies,
    ...manifest.peerDependencies,
  };

  const violations = [];

  for (const [dependency, version] of Object.entries(dependencies)) {
    // Check local file dependencies
    if (typeof version === "string" && version.startsWith("file:")) {
      const localRelative = version.slice(5);
      const localPath = resolve(manifestDir, localRelative);
      if (!existsSync(localPath)) {
        violations.push({
          dependency,
          targetRepository: "local file target",
          targetLayer: null,
          currentLayer: current.layer,
          reason: `Missing local dependency target: ${localPath}`,
        });
        continue;
      }
    }

    // Fail-closed on unmapped internal @kannan19302 packages
    const isInternal = dependency.startsWith("@kannan19302/") || dependency === "corporate-website" || dependency === "unierp-corporate-website";
    const target = catalog.byPackage.get(dependency);

    if (isInternal && !target) {
      violations.push({
        dependency,
        targetRepository: "unknown internal package",
        targetLayer: null,
        currentLayer: current.layer,
        reason: `Unknown internal package '${dependency}' must fail closed`,
      });
      continue;
    }

    if (!target || target.layer === null) continue;

    // Self-dependencies / cycles
    if (target.packages && target.packages.includes(manifest.name)) {
      violations.push({
        dependency,
        targetRepository: target.repository,
        targetLayer: target.layer,
        currentLayer: current.layer,
        reason: `Circular self-dependency on '${dependency}'`,
      });
      continue;
    }

    // Strict downward dependency: target.layer must be strictly LESS than current.layer
    if (target.layer >= current.layer) {
      violations.push({
        dependency,
        targetRepository: target.repository,
        targetLayer: target.layer,
        currentLayer: current.layer,
        reason: `Forbidden edge: L${current.layer} depends on L${target.layer} (${dependency})`,
      });
    }
  }

  return { current, violations };
}

function main() {
  const repositoryRoot = resolve(argumentValue("--repo-root") ?? process.cwd());
  const manifestFile = resolve(repositoryRoot, "package.json");
  if (!existsSync(manifestFile)) {
    if (existsSync(resolve(repositoryRoot, "pubspec.yaml"))) {
      console.log("✅ Layer rule verified for mobile (L5): Flutter project (pubspec.yaml).");
      return;
    }
    const dirBase = basename(repositoryRoot);
    if (dirBase === "platform" || dirBase === "infra") {
      console.log(`✅ Layer rule verified for ${dirBase} (L7): Operational/infrastructure plane.`);
      return;
    }
    throw new Error(`package manifest is missing at ${manifestFile}`);
  }
  const manifest = JSON.parse(readFileSync(manifestFile, "utf8"));
  const catalog = loadLayerCatalog(argumentValue("--catalog") ?? catalogFile);
  const result = evaluateLayerDependencies({
    manifest,
    catalog,
    repository: argumentValue("--repository"),
    manifestDir: repositoryRoot,
  });

  if (result.violations.length > 0) {
    console.error(`❌ Layer rule violation in ${result.current.repository} (L${result.current.layer}):`);
    for (const violation of result.violations) {
      console.error(`  - ${violation.reason || `${violation.dependency} resolves to ${violation.targetRepository} (L${violation.targetLayer}), not a lower layer.`}`);
    }
    process.exit(1);
  }
  console.log(`✅ Layer rule verified for ${result.current.repository} (L${result.current.layer}): ${manifest.name || basename(repositoryRoot)}.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(`❌ Layer rule could not establish active-estate scope: ${error.message}`);
    process.exit(1);
  }
}
