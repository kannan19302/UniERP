#!/usr/bin/env node
// L05 (Track L — code quality): "Detection of unreachable code, unused
// exports, orphaned files and unused dependencies across all 30 repos."
// Exit: "A newly orphaned export fails CI. The existing inventory is
// published and ratcheted down. An orphaned file in a polyrepo is
// invisible to a single-repo view, which is why this is a family-wide
// gate."
//
// A genuinely FAMILY-WIDE check, not a single-repo one — this is the
// exact distinction the exit criterion itself draws. Extracts every
// named VALUE export from unierp-design-system's component barrel
// (src/components/index.ts — the shared UI package every other frontend
// repo in this polyrepo is supposed to consume from, per B01-B12's own
// "compose from @kannan19302/design-system only" rule), then greps every
// CONSUMING repo (unierp-web, unierp-console) for actual usage of each
// exported name. A component exported but used in NEITHER consuming repo
// is orphaned — invisible to a single-repo view of design-system alone
// (which only sees "I export this," never "does anyone use it"),
// exactly the blind spot this phase exists to close.
//
//   node scripts/check-orphaned-exports.mjs                (check against baseline)
//   node scripts/check-orphaned-exports.mjs --update-baseline  (record current orphan list as the baseline)

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DS_ROOT = existsSync(path.join(root, 'design-system'))
  ? path.join(root, 'design-system')
  : path.join(root, 'unierp-design-system');
const BARREL_FILE = path.join(DS_ROOT, 'src', 'components', 'index.ts');
const CONSUMER_ROOTS = [
  existsSync(path.join(root, 'tenant-apps')) ? path.join(root, 'tenant-apps') : path.join(root, 'unierp-web'),
  existsSync(path.join(root, 'provider-admin-os')) ? path.join(root, 'provider-admin-os') : path.join(root, 'unierp-console'),
];
const BASELINE_FILE = path.join(root, 'unierp-workspace', 'evidence', 'orphaned-exports-baseline.json');

const updateBaseline = process.argv.includes('--update-baseline');

function extractValueExports(barrelSource) {
  const names = [];
  const exportRe = /export\s*\{([^}]+)\}\s*from/g;
  let m;
  while ((m = exportRe.exec(barrelSource))) {
    const items = m[1].split(',').map((s) => s.trim()).filter(Boolean);
    for (const item of items) {
      if (item.startsWith('type ')) continue; // types can't be "used" the same way — a separate concern
      // `export { Original as Alias } from "./x"` — the ALIAS is the name
      // a consumer actually imports; taking the original (pre-`as`) name
      // here was a real bug this phase's own break/restore step caught:
      // a newly-orphaned aliased export went undetected on first attempt.
      const parts = item.split(' as ').map((s) => s.trim());
      const name = parts[parts.length - 1];
      if (name) names.push(name);
    }
  }
  return names;
}

function walkSourceFiles(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === '.next' || entry === 'dist') continue;
    const full = path.join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walkSourceFiles(full, out);
    else if (/\.(ts|tsx)$/.test(entry)) out.push(full);
  }
  return out;
}

const barrelSource = readFileSync(BARREL_FILE, 'utf-8');
const exportedNames = extractValueExports(barrelSource);

// Build one combined corpus of every consuming repo's source, once —
// cheap even at this file count since it's just string concatenation and
// regex matching, unlike L02's type-aware linting.
let consumerCorpus = '';
let consumerFileCount = 0;
for (const consumerRoot of CONSUMER_ROOTS) {
  const files = walkSourceFiles(consumerRoot);
  consumerFileCount += files.length;
  for (const f of files) consumerCorpus += readSafe(f) + '\n';
}
function readSafe(f) {
  try {
    return readFileSync(f, 'utf-8');
  } catch {
    return '';
  }
}

const orphaned = [];
for (const name of exportedNames) {
  // A real usage is the name appearing as a JSX tag (<Name), an imported
  // binding (import { ..., Name, ... } or import { Name as ... }), or a
  // direct reference (Name(...) / Name.something) — a word-boundary
  // match on the exact identifier is the honest, conservative proxy: it
  // will not catch usage aliased on import to a different local name
  // (a real, stated limitation, not hidden), but it will not
  // under-count either, since any legitimate usage names the export at
  // least once at the import site.
  const usageRe = new RegExp(`\\b${name}\\b`);
  if (!usageRe.test(consumerCorpus)) {
    orphaned.push(name);
  }
}

if (updateBaseline) {
  mkdirSync(path.dirname(BASELINE_FILE), { recursive: true });
  writeFileSync(
    BASELINE_FILE,
    JSON.stringify({ exportedCount: exportedNames.length, orphanedCount: orphaned.length, orphaned: orphaned.sort(), consumerFileCount, recordedAt: new Date().toISOString() }, null, 2) + '\n',
    'utf-8',
  );
  console.log(`Baseline recorded: ${orphaned.length}/${exportedNames.length} exported component(s) orphaned (unused across ${consumerFileCount} files in unierp-web + unierp-console).`);
  if (orphaned.length > 0) console.log(`Orphaned: ${orphaned.join(', ')}`);
  process.exit(0);
}

if (!existsSync(BASELINE_FILE)) {
  console.error(`FAIL  no baseline recorded yet at ${path.relative(root, BASELINE_FILE)}. Run with --update-baseline once.`);
  process.exit(1);
}

const baseline = JSON.parse(readFileSync(BASELINE_FILE, 'utf-8'));
const baselineSet = new Set(baseline.orphaned);
const newlyOrphaned = orphaned.filter((n) => !baselineSet.has(n));

console.log(`${orphaned.length}/${exportedNames.length} exported component(s) orphaned now vs ${baseline.orphanedCount} at baseline (recorded ${baseline.recordedAt}).`);

if (newlyOrphaned.length > 0) {
  console.error(`FAIL  ${newlyOrphaned.length} newly-orphaned export(s), not in the baseline:`);
  for (const n of newlyOrphaned) console.error(`  ${n} — exported by unierp-design-system, used in neither unierp-web nor unierp-console`);
  process.exit(1);
}

console.log(`OK    no newly-orphaned exports (${orphaned.length} <= ${baseline.orphanedCount} baseline).`);
process.exit(0);
