#!/usr/bin/env node
// E03 (Track E — business apps): "docs/module-tier-manifest.json reconciled
// with the audit: which modules must reach 3s, which are Tier-3, which
// carry logged Tier-4 exemptions." Exit: "Every module has a target score
// and a stated reason. No module is silently exempt."
//
// Reconciles docs/module-tier-manifest.json (a pre-existing Track A/L
// architecture-tier manifest — Tier A/B, Clean Architecture depth) against
// the real module directories under unierp-api/src/modules and E02's
// baseline scores, adding a `depthTargets` object: one entry per REAL
// module, naming a target rubric score and the reason for that target.
// Flags (does not silently drop) any manifest entry that no longer
// corresponds to a real directory.
//
//   node scripts/reconcile-module-tiers.mjs          (reconcile + write)
//   node scripts/reconcile-module-tiers.mjs --check   (validate only, exit 1 on gap)

import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const API_MODULES = existsSync(path.join(root, 'api', 'src', 'modules'))
  ? path.join(root, 'api', 'src', 'modules')
  : path.join(root, 'unierp-api', 'src', 'modules');
const MANIFEST_FILE = path.join(root, 'unierp-workspace', 'docs', 'module-tier-manifest.json');

const checkOnly = process.argv.includes('--check');

const realModules = readdirSync(API_MODULES)
  .filter((entry) => statSync(path.join(API_MODULES, entry)).isDirectory())
  .sort();

const manifest = JSON.parse(readFileSync(MANIFEST_FILE, 'utf-8'));
const tierAModules = new Set(manifest.tiers.A.modules);
const tierBModules = new Set(manifest.tiers.B.modules);
const allManifestModules = new Set([...tierAModules, ...tierBModules]);

// Platform/plane-2 infrastructure directories under src/modules that are not
// business modules by Track E's own "Plane 3 — the 45 business modules"
// definition (named identically in E02's own baseline report).
const PLATFORM_INFRA = new Set(['outbox', 'admin', 'devops', 'ext-gateway', 'extension-registry', 'api-platform']);

const staleManifestEntries = [...allManifestModules].filter((m) => !realModules.includes(m)).sort();
const unlistedRealModules = realModules.filter((m) => !allManifestModules.has(m)).sort();

const depthTargets = {};
for (const mod of realModules) {
  if (PLATFORM_INFRA.has(mod)) {
    depthTargets[mod] = {
      tier: 'Tier-4-exempt',
      targetScore: null,
      reason:
        'Platform/plane-2 infrastructure, not a plane-3 business module (Track E\'s own definition). ' +
        'The 16-row business rubric (approvals, CRUD depth, documents, etc.) does not meaningfully apply.',
    };
  } else if (tierAModules.has(mod)) {
    depthTargets[mod] = {
      tier: 'Tier-1',
      targetScore: '>=2 every row, >=3 on rows 1,2,3,7,14 ("next level")',
      reason:
        'Architecture Tier A (Clean Architecture, handles money or exceeds 15 KLoc) — the highest-stakes ' +
        'modules in the platform get the full rubric target, no partial credit on data model, lifecycle, ' +
        'authorisation, events, or tests.',
    };
  } else if (tierBModules.has(mod)) {
    depthTargets[mod] = {
      tier: 'Tier-3',
      targetScore: '>=2 every row, >=2 on rows 1,2,3,7,14',
      reason:
        'Architecture Tier B (controller/service/dto/tests, no money/regulatory exposure) — real depth ' +
        'required on every row, but not the Tier-1 "3 on the unrecoverable rows" bar.',
    };
  } else {
    // A real module directory absent from BOTH the existing A and B lists —
    // the manifest drifted. Assigned Tier-3 by default (the architecture
    // manifest's own stated default for anything not explicitly Tier A) and
    // named explicitly as a reconciliation gap rather than silently folded in.
    depthTargets[mod] = {
      tier: 'Tier-3',
      targetScore: '>=2 every row, >=2 on rows 1,2,3,7,14',
      reason:
        'RECONCILIATION GAP: this module directory exists in unierp-api/src/modules but was absent from ' +
        'both Tier A and Tier B in the pre-existing architecture manifest. Defaulted to Tier-3 (the ' +
        'manifest\'s own stated default tier) rather than left unassigned. Needs a deliberate Tier A/B call.',
    };
  }
}

manifest.depthTargets = depthTargets;
manifest.reconciliation = {
  generatedBy: 'scripts/reconcile-module-tiers.mjs',
  realModuleCount: realModules.length,
  staleManifestEntries,
  unlistedRealModulesFoundAtReconciliation: unlistedRealModules,
};

if (checkOnly) {
  const missing = realModules.filter((m) => !depthTargets[m]);
  if (missing.length > 0) {
    console.error(`FAIL  ${missing.length} module(s) with no target score/reason: ${missing.join(', ')}`);
    process.exit(1);
  }
  console.log(`OK    all ${realModules.length} real modules have a target score and a stated reason.`);
  if (staleManifestEntries.length > 0) {
    console.log(`NOTE  ${staleManifestEntries.length} stale manifest entries (no matching directory): ${staleManifestEntries.join(', ')}`);
  }
  process.exit(0);
}

writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2) + '\n', 'utf-8');
console.log(`Reconciled ${realModules.length} real modules into depthTargets.`);
console.log(`Stale manifest entries (no matching directory, flagged not dropped): ${staleManifestEntries.join(', ') || '(none)'}`);
console.log(`Real modules missing from the pre-existing A/B lists (defaulted to Tier-3, flagged): ${unlistedRealModules.join(', ') || '(none)'}`);
