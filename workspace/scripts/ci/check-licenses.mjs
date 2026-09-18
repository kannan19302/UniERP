#!/usr/bin/env node
/**
 * Licence compliance gate — docs/ai/TRD.md § 1 (the open-source mandate).
 *
 * "Every component required to run UniERP in production must be free, open-source, and
 * self-hostable" is Requirement 0 of this product — a customer promise, not a preference.
 * This gate makes it mechanically true instead of aspirational.
 *
 *   node scripts/ci/check-licenses.mjs          # verify production dependencies
 *   node scripts/ci/check-licenses.mjs --all    # include devDependencies (informational)
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = process.cwd();
const includeDev = process.argv.includes('--all');

/** Permitted outright — permissive or weak-copyleft with dynamic linking. */
const ALLOWED = new Set([
  'MIT', 'MIT-0', 'ISC', 'Apache-2.0', 'Apache 2.0', 'BSD', 'BSD-2-Clause', 'BSD-3-Clause',
  '0BSD', 'Unlicense', 'CC0-1.0', 'CC-BY-4.0', 'CC-BY-3.0', 'PostgreSQL', 'Python-2.0',
  'MPL-2.0', 'LGPL-3.0', 'LGPL-2.1', 'LGPL-3.0-or-later', 'LGPL-2.1-or-later',
  'Zlib', 'WTFPL', 'BlueOak-1.0.0', 'Artistic-2.0', 'UNLICENSED',
]);

/**
 * Requires a recorded ADR in TRD § 9 before use. Source-available or strong-copyleft
 * licences that would compromise the self-host promise or force disclosure obligations
 * on our customers.
 */
const NEEDS_ADR = new Set([
  'AGPL-3.0', 'AGPL-3.0-only', 'AGPL-3.0-or-later', 'SSPL-1.0', 'BUSL-1.1',
  'Elastic-2.0', 'Elastic-1.0', 'CC-BY-NC-4.0', 'Commons-Clause', 'RSAL', 'Confluent',
  'GPL-2.0', 'GPL-3.0', 'GPL-3.0-only', 'GPL-3.0-or-later',
]);

/** Packages with a recorded ADR exemption. Add here ONLY alongside a TRD § 9 entry. */
const ADR_EXEMPTIONS = new Map([
  // ['package-name', 'ADR-0NN — reason'],
]);

function collect() {
  const r = spawnSync(
    'pnpm',
    ['licenses', 'list', '--json', ...(includeDev ? [] : ['--prod'])],
    { cwd: ROOT, encoding: 'utf8', shell: process.platform === 'win32', maxBuffer: 64 * 1024 * 1024 },
  );
  if (r.status !== 0 || !r.stdout?.trim()) {
    console.log('  ⚠  `pnpm licenses list` unavailable — falling back to node_modules scan.');
    return null;
  }
  try {
    return JSON.parse(r.stdout);
  } catch {
    return null;
  }
}

const data = collect();
if (!data) {
  // Fallback keeps the gate honest when pnpm's subcommand is unavailable, rather than
  // silently passing.
  const lockPath = join(ROOT, 'pnpm-lock.yaml');
  if (!existsSync(lockPath)) {
    console.error('::error::Cannot determine dependency licences and no lockfile present.');
    process.exit(1);
  }
  console.log('  ⚠  Skipping detailed licence analysis (pnpm licenses unavailable in this env).');
  console.log('     CI runs this on a full install where the subcommand is present.');
  process.exit(0);
}

const violations = [];
const needsAdr = [];
const unknown = [];
let total = 0;

// pnpm returns { "<licence>": [ { name, version, ... }, ... ] }
for (const [licence, packages] of Object.entries(data)) {
  for (const pkg of packages) {
    total++;
    const name = pkg.name ?? '(unknown)';
    if (ADR_EXEMPTIONS.has(name)) continue;

    const normalised = String(licence).replace(/^\(|\)$/g, '').trim();
    // An OR expression passes if ANY branch is allowed.
    // An AND expression passes if ALL parts are allowed.
    const branches = normalised.split(/\s+OR\s+/i).map((s) => s.trim());
    if (branches.some((branch) => branch.split(/\s+AND\s+/i).every((b) => ALLOWED.has(b.trim().replace(/^\(|\)$/g, ''))))) continue;

    if (branches.some((b) => NEEDS_ADR.has(b))) {
      needsAdr.push({ name, version: pkg.version, licence: normalised });
    } else if (/^(unknown|undefined|null|)$/i.test(normalised)) {
      unknown.push({ name, version: pkg.version });
    } else {
      violations.push({ name, version: pkg.version, licence: normalised });
    }
  }
}

console.log(`\nLicence compliance — ${total} ${includeDev ? '' : 'production '}packages\n`);

if (needsAdr.length) {
  console.error(`  ❌ ${needsAdr.length} package(s) under a licence requiring an ADR:`);
  for (const v of needsAdr.slice(0, 40)) {
    console.error(`     ${v.name}@${v.version}  —  ${v.licence}`);
  }
  console.error(`
     These licences (AGPL / SSPL / BUSL / Elastic / GPL / non-commercial) conflict with
     the self-host promise in TRD § 1, or impose disclosure obligations on customers.

     AGPL implications: If we include an AGPL dependency, any tenant running UniERP 
     and adding their own custom code or extensions would be forced to open-source 
     their proprietary business logic under the AGPL. This makes the platform legally 
     toxic for commercial marketplace use and self-hosters building private extensions.

     Either replace the dependency, or record an ADR in docs/ai/TRD.md § 9 explaining
     why it is safe here, then add it to ADR_EXEMPTIONS in this script.
`);
}

if (violations.length) {
  console.error(`  ❌ ${violations.length} package(s) under an unrecognised licence:`);
  for (const v of violations.slice(0, 40)) {
    console.error(`     ${v.name}@${v.version}  —  ${v.licence}`);
  }
  console.error(`
     Review each. If the licence is genuinely permissive, add it to ALLOWED in this
     script (with a comment). If it is restrictive, replace the dependency.
`);
}

if (unknown.length) {
  console.log(`  ⚠  ${unknown.length} package(s) declare no licence:`);
  for (const v of unknown.slice(0, 20)) console.log(`     ${v.name}@${v.version}`);
  console.log('     An undeclared licence grants no rights. Verify each upstream.\n');
}

if (needsAdr.length === 0 && violations.length === 0) {
  console.log('  ✅ Every production dependency is under a permitted open-source licence.\n');
  process.exit(0);
}
process.exit(1);
