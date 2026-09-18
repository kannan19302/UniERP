#!/usr/bin/env node
/**
 * One-time RLS catch-up migration generator — ARCHITECTURE_REVIEW.md § F5 / R3.
 *
 * Uses the same corpus analysis as check-migration-safety.mjs to find every tenant table
 * with no RLS policy anywhere in the migration history, and emits ONE new migration that
 * closes every gap with a dynamic catalogue loop — the same idempotent pattern already used
 * by the repository's own bulk RLS migrations (DROP POLICY IF EXISTS + CREATE POLICY, so it
 * is safe to run even if a handful of the 364 already have a policy applied out of band).
 *
 *   node scripts/ci/generate-rls-catchup-migration.mjs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
const DIR = join(ROOT, 'packages', 'database', 'prisma', 'migrations');

/**
 * Identical to analyseRlsCoverage() in check-migration-safety.mjs — deliberately duplicated
 * rather than imported (that file is a CLI script, not a module export) but kept byte-for-byte
 * equivalent so the two tools can never silently disagree on the count. If you change one,
 * change both, and re-verify: this script's count must equal
 * `node scripts/ci/check-migration-safety.mjs` § "RLS: ... uncovered".
 */
function analyse() {
  const dirs = readdirSync(DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const migrations = dirs.map((name) => {
    const file = join(DIR, name, 'migration.sql');
    const code = existsSync(file)
      ? readFileSync(file, 'utf8').replace(/--[^\n]*/g, '').replace(/\/\*[\s\S]*?\*\//g, '')
      : '';
    return { name, code };
  });

  const created = new Map();
  const explicit = new Set();
  let newestLoop = null;

  for (const { name, code } of migrations) {
    for (const m of code.matchAll(/CREATE TABLE\s+(?:IF NOT EXISTS\s+)?"?([\w.]+)"?\s*\(/gi)) {
      const table = m[1].replace(/.*\./, '');
      const body = code.slice(m.index, m.index + 8000);
      const end = body.indexOf(');');
      if (!/tenant_id/i.test(end === -1 ? body : body.slice(0, end))) continue;
      if (!created.has(table)) created.set(table, name);
    }
    for (const m of code.matchAll(/(?:CREATE POLICY|ENABLE ROW LEVEL SECURITY)[^;]{0,200}?"?(\w+)"?/gi)) {
      explicit.add(m[1]);
    }
    for (const m of code.matchAll(/enable_tenant_rls\s*\(\s*'(\w+)'/gi)) explicit.add(m[1]);
    if (/(information_schema|pg_tables|pg_class)[\s\S]{0,600}?(ENABLE ROW LEVEL SECURITY|CREATE POLICY)/i.test(code)) {
      newestLoop = name;
    }
  }

  const uncovered = [];
  for (const [table, createdIn] of created) {
    if (explicit.has(table)) continue;
    if (newestLoop && createdIn <= newestLoop) continue; // swept up by the bulk loop
    uncovered.push(table);
  }
  return uncovered.sort();
}

const uncovered = analyse();
console.log(`Found ${uncovered.length} tenant tables with no RLS policy in any migration.`);

const sql = `-- RLS catch-up — closes the drift gap documented in docs/ai/ARCHITECTURE_REVIEW.md § F5.
--
-- The repository's earlier bulk-RLS migrations loop over the catalogue at the moment they
-- run, so they only ever covered tables that existed then. This migration re-runs that same
-- idempotent loop — DROP POLICY IF EXISTS + CREATE POLICY — restricted to the ${uncovered.length} tables
-- that a full migration-corpus analysis found were never swept, so it is safe to apply
-- even if a handful already picked up a policy out of band.
--
-- To PREVENT this recurring: every migration that creates a table with tenant_id must add
-- its own policy in the SAME migration (scripts/ci/check-migration-safety.mjs now enforces
-- this — see docs/ai/IMPLEMENTATION_PLAN.md § 3).

DO $$
DECLARE
  t text;
  tables_to_isolate text[] := ARRAY[
${uncovered.map((t) => `    '${t}'`).join(',\n')}
  ];
BEGIN
  FOREACH t IN ARRAY tables_to_isolate LOOP
    IF EXISTS (
      SELECT 1 FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = t
    ) THEN
      EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY', t);
      EXECUTE format('ALTER TABLE %I FORCE ROW LEVEL SECURITY', t);
      EXECUTE format('DROP POLICY IF EXISTS tenant_isolation_%I ON %I', t, t);
      EXECUTE format(
        'CREATE POLICY tenant_isolation_%I ON %I USING (tenant_id = current_tenant_id()) WITH CHECK (tenant_id = current_tenant_id())',
        t, t
      );
    ELSE
      RAISE NOTICE 'RLS catch-up: table % not found — schema drift since analysis, skipping', t;
    END IF;
  END LOOP;
END $$;
`;

const dir = join(DIR, '20260730000100_rls_catchup_all_gaps');
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'migration.sql'), sql);
console.log(`\n✅ Migration written: ${dir.replace(ROOT, '.')}/migration.sql`);
console.log(`   Closes RLS coverage for all ${uncovered.length} previously uncovered tenant tables in one pass.`);
console.log('\n⚠ Review by hand, then apply via `pnpm db:deploy` against a real database.');
console.log('   Verify afterwards with: node scripts/check-rls-verify.mjs');
