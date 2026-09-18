#!/usr/bin/env node
/**
 * Migration safety gate — docs/ai/BACKEND_SCHEMA.md § 9, docs/ai/TRD.md § 8 Layer 4.
 *
 * A migration that is safe on a laptop can take a production database offline. This gate
 * inspects pending migration SQL for the patterns that cause outages and data loss.
 *
 *   node scripts/ci/check-migration-safety.mjs                      # warn on risky patterns
 *   node scripts/ci/check-migration-safety.mjs --forbid-destructive # production: hard fail
 *   node scripts/ci/check-migration-safety.mjs --since <dir-name>   # only newer migrations
 */
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
const DATA_MIGRATIONS = join(ROOT, '..', 'data', 'prisma', 'migrations');
const DIR = existsSync(DATA_MIGRATIONS) ? DATA_MIGRATIONS : join(ROOT, 'packages', 'database', 'prisma', 'migrations');
const args = process.argv.slice(2);
const FORBID_DESTRUCTIVE = args.includes('--forbid-destructive');
const since = args.includes('--since') ? args[args.indexOf('--since') + 1] : null;

/**
 * DESTRUCTIVE — irreversible data loss. Forbidden in an automated production deploy;
 * they require a separate, manually approved release (BACKEND_SCHEMA § 9 rule 4).
 */
const DESTRUCTIVE = [
  { re: /\bDROP\s+TABLE\b/i, what: 'DROP TABLE' },
  { re: /\bDROP\s+COLUMN\b/i, what: 'DROP COLUMN' },
  { re: /\bDROP\s+DATABASE\b/i, what: 'DROP DATABASE' },
  { re: /\bDROP\s+SCHEMA\b/i, what: 'DROP SCHEMA' },
  { re: /\bTRUNCATE\b/i, what: 'TRUNCATE' },
  { re: /\bDELETE\s+FROM\b(?![^;]*WHERE)/i, what: 'unqualified DELETE' },
  { re: /\bCASCADE\b/i, what: 'CASCADE (can cascade far beyond the intended target)' },
];

/**
 * LOCKING — correct, but takes a lock that stalls every writer on a large table.
 * Rewrite using CONCURRENTLY / NOT VALID + VALIDATE / batched backfill.
 */
const LOCKING = [
  {
    re: /\bCREATE\s+(UNIQUE\s+)?INDEX\b(?!\s+CONCURRENTLY)/i,
    what: 'CREATE INDEX without CONCURRENTLY',
    fix: 'Use CREATE INDEX CONCURRENTLY (and run it outside a transaction).',
  },
  {
    re: /\bALTER\s+TABLE\b[^;]*\bADD\s+COLUMN\b[^;]*\bNOT\s+NULL\b(?![^;]*DEFAULT)/i,
    what: 'ADD COLUMN NOT NULL without a DEFAULT',
    fix: 'Add nullable → backfill in batches → SET NOT NULL. Otherwise it rewrites the table.',
  },
  {
    re: /\bALTER\s+TABLE\b[^;]*\bADD\s+CONSTRAINT\b[^;]*\b(FOREIGN\s+KEY|CHECK)\b(?![^;]*NOT\s+VALID)/i,
    what: 'ADD CONSTRAINT without NOT VALID',
    fix: 'ADD CONSTRAINT ... NOT VALID, then ALTER TABLE ... VALIDATE CONSTRAINT separately.',
  },
  {
    re: /\bALTER\s+(TABLE|COLUMN)\b[^;]*\bTYPE\b/i,
    what: 'column type change',
    fix: 'Rewrites the whole table and blocks writers. Use expand→backfill→contract instead.',
  },
];

/**
 * RLS coverage is evaluated across the WHOLE migration corpus, not per migration — a policy
 * is legitimately added by a later migration than the CREATE TABLE.
 *
 * A tenant table counts as covered when any migration either names it in a policy, or runs a
 * dynamic loop over every table carrying tenant_id. The loop form is the drift risk described
 * in BACKEND_SCHEMA § 4.4: it covers only tables that exist when it runs, so we record the
 * newest loop migration and flag tenant tables created after it.
 */
function analyseRlsCoverage(migrations) {
  const created = new Map(); // table -> migration that created it
  const explicit = new Set(); // tables named in an explicit policy
  let newestLoop = null;

  for (const { name, code } of migrations) {
    for (const m of code.matchAll(/CREATE TABLE\s+(?:IF NOT EXISTS\s+)?"?([\w.]+)"?\s*\(/gi)) {
      const table = m[1].replace(/.*\./, '');
      const body = code.slice(m.index, m.index + 8000);
      const end = body.indexOf(');');
      if (!/tenant_id/i.test(end === -1 ? body : body.slice(0, end))) continue;
      if (!created.has(table)) created.set(table, name);
    }
    for (const m of code.matchAll(/ALTER\s+TABLE\s+(?:IF\s+EXISTS\s+)?"?([\w.]+)"?\s+(?:ENABLE|FORCE)\s+ROW\s+LEVEL\s+SECURITY/gi)) {
      explicit.add(m[1].replace(/.*\./, ''));
    }
    for (const m of code.matchAll(/CREATE\s+POLICY\s+"?[\w.]+"?\s+ON\s+"?([\w.]+)"?/gi)) {
      explicit.add(m[1].replace(/.*\./, ''));
    }
    for (const m of code.matchAll(/enable_tenant_rls\s*\(\s*'(\w+)'/gi)) explicit.add(m[1]);
    // A dynamic loop: iterates the catalogue rather than naming tables.
    if (/(information_schema|pg_tables|pg_class)[\s\S]{0,600}?(ENABLE ROW LEVEL SECURITY|CREATE POLICY)/i.test(code)) {
      newestLoop = name;
    }
  }

  const uncovered = [];
  for (const [table, createdIn] of created) {
    if (explicit.has(table)) continue;
    if (newestLoop && createdIn <= newestLoop) continue; // swept up by the bulk loop
    uncovered.push({ table, createdIn });
  }
  return { uncovered, newestLoop, totalTenantTables: created.size };
}

if (!existsSync(DIR)) {
  console.log('  ⚠  No migrations directory found — nothing to check.');
  process.exit(0);
}

let dirs = readdirSync(DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

if (since) dirs = dirs.filter((d) => d > since);

const findings = [];
const corpus = [];

for (const name of dirs) {
  const file = join(DIR, name, 'migration.sql');
  if (!existsSync(file)) continue;
  const sql = readFileSync(file, 'utf8');
  // Strip comments so a mention in prose does not trip the scanner.
  const code = sql.replace(/--[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '');
  corpus.push({ name, code });

  for (const rule of DESTRUCTIVE) {
    if (rule.re.test(code)) {
      findings.push({
        migration: name,
        level: FORBID_DESTRUCTIVE ? 'error' : 'warn',
        what: `Destructive: ${rule.what}`,
        fix: 'Destructive DDL requires a separate, manually approved release. BACKEND_SCHEMA § 9 rule 4.',
      });
    }
  }
  for (const rule of LOCKING) {
    if (rule.re.test(code)) {
      findings.push({ migration: name, level: 'warn', what: `Locking: ${rule.what}`, fix: rule.fix });
    }
  }
}

const rls = analyseRlsCoverage(corpus);
for (const { table, createdIn } of rls.uncovered) {
  findings.push({
    migration: createdIn,
    level: 'error',
    what: `TENANT ISOLATION: table "${table}" has tenant_id but no RLS policy in any migration`,
    fix:
      `It was created after the last bulk-RLS migration (${rls.newestLoop ?? 'none'}), so the ` +
      'catalogue loop never covered it. Add ENABLE ROW LEVEL SECURITY + CREATE POLICY. BACKEND_SCHEMA § 4.4.',
  });
}

console.log(`\nMigration safety — ${dirs.length} migration(s) inspected`);
console.log(
  `  RLS: ${rls.totalTenantTables} tenant tables · last bulk pass ${rls.newestLoop ?? 'none'} · ` +
    `${rls.uncovered.length} uncovered`,
);
console.log(FORBID_DESTRUCTIVE ? '  mode: PRODUCTION (destructive DDL is a hard failure)\n' : '  mode: advisory\n');

if (findings.length === 0) {
  console.log('  ✅ No unsafe migration patterns found.\n');
  process.exit(0);
}

const errors = findings.filter((f) => f.level === 'error');
const warns = findings.filter((f) => f.level === 'warn');

for (const f of errors) {
  console.error(`  ❌ ${f.migration}\n     ${f.what}\n     → ${f.fix}`);
}
for (const f of warns.slice(0, 30)) {
  console.log(`  ⚠  ${f.migration}\n     ${f.what}\n     → ${f.fix}`);
}
if (warns.length > 30) console.log(`  … ${warns.length - 30} more warnings`);

if (errors.length) {
  console.error(`\n  ${errors.length} blocking issue(s). This migration may not deploy as-is.\n`);
  process.exit(1);
}
console.log(`\n  ✅ No blocking issues (${warns.length} warning(s) to review).\n`);
process.exit(0);
