#!/usr/bin/env node
/**
 * Layer Rule Verification — docs/PLATFORM_ARCHITECTURE.md § 4.2.
 *
 * Asserts that a repository depends ONLY on strictly lower-layer published artifacts.
 * Sideways (same layer) and upward (higher layer) dependencies are strictly forbidden.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, basename } from 'node:path';

const LAYERS = {
  'unierp-contracts': 0,

  'unierp-kernel': 1,
  'unierp-design-system': 1,
  'unierp-sdk': 1,
  'unierp-shared': 1,
  'unierp-auth': 1,
  'unierp-service-kit': 1,
  'unierp-config': 1,

  'unierp-data': 2,
  'unierp-framework': 2,
  'unierp-extension-api': 2,
  'unierp-sandbox': 2,
  'unierp-blockchain': 2,

  'unierp-api': 3,
  'unierp-idp': 3,

  'unierp-web': 4,
  'unierp-console': 4,
  'unierp-developer': 4,
  'unierp-corporate-website': 4,
  'unierp-corporate-site-template': 4,
  'unierp-app-education': 4,
  'unierp-app-fieldservice': 4,
  'unierp-app-healthcare': 4,
  'unierp-app-realestate': 4,
  'unierp-storybook': 4,

  'unierp-mobile': 5,
  'unierp-extensions': 6,
  'unierp-infra': 7,
  'unierp-workspace': 7,
};

function pkgToRepo(pkgName) {
  if (pkgName.startsWith('@unerp/')) {
    return 'unierp-' + pkgName.slice(7);
  }
  return pkgName;
}

const cwd = process.cwd();
const repoName = basename(cwd);

const currentLayer = LAYERS[repoName];
if (currentLayer === undefined) {
  console.log(`  ℹ Layer check: ${repoName} is unmapped / root.`);
  process.exit(0);
}

const pkgPath = join(cwd, 'package.json');
if (!existsSync(pkgPath)) {
  console.log(`  ℹ Layer check: no package.json found in ${repoName}.`);
  process.exit(0);
}

const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const deps = {
  ...pkg.dependencies,
  ...pkg.devDependencies,
  ...pkg.peerDependencies,
};

const violations = [];

for (const depName of Object.keys(deps)) {
  if (!depName.startsWith('@unerp/')) continue;
  const targetRepo = pkgToRepo(depName);
  const targetLayer = LAYERS[targetRepo];

  if (targetLayer === undefined) continue;

  if (targetLayer >= currentLayer) {
    violations.push({
      dep: depName,
      targetRepo,
      targetLayer,
      currentLayer,
    });
  }
}

if (violations.length === 0) {
  console.log(`  ✅ Layer rule verified for ${repoName} (L${currentLayer}): all @unerp/* dependencies are strictly lower-layer.`);
  process.exit(0);
}

console.error(`
────────────────────────────────────────────────────────────────────────
  ❌ LAYER RULE VIOLATION IN ${repoName} (Layer ${currentLayer})
────────────────────────────────────────────────────────────────────────`);
for (const v of violations) {
  console.error(`   - Depends on ${v.dep} (${v.targetRepo}, Layer ${v.targetLayer}) — Layer ${v.targetLayer} >= Layer ${v.currentLayer}`);
}
console.error(`
  A repository may ONLY depend on strictly lower-layer packages.
  Sideways and upward dependencies violate PLATFORM_ARCHITECTURE.md § 4.2.
────────────────────────────────────────────────────────────────────────
`);
process.exit(1);
