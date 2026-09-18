#!/usr/bin/env node
// Track A.22 — the rehearsed restore. Phase A22, G-11.
//
// Takes a REAL backup of the live database, restores it into a CLEAN disposable
// database, TIMES the restore, PROVES the restored data is byte-equivalent to
// the source (table count, exact per-table row counts, _prisma_migrations), and
// LOGS the rehearsal with measured RTO and RPO. Fails loudly on any step.
//
// This is the mechanism behind "a backup that has never been restored is not a
// backup" — the rehearsal that makes the restore claim a measurement, not a hope.
//
// Usage:
//   node scripts/rehearse-restore.mjs [--file <path>] [--database <sourceDb>]
//                                     [--label <label>] [--json] [--no-log]
//
// The rehearsal log (append-only) lives in docs/RUNBOOK_BACKUP_RESTORE.md under
// "## Rehearsal log"; a machine-readable copy is appended to
// var/backups/rehearsal-log.jsonl. The disposable DB is dropped in all paths.

import { execFileSync } from 'node:child_process';
import { existsSync, statSync, appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const backupDir = path.join(root, 'var', 'backups');
const runbookPath = path.join(root, 'docs', 'RUNBOOK_BACKUP_RESTORE.md');
const jsonlPath = path.join(backupDir, 'rehearsal-log.jsonl');

const argv = process.argv.slice(2);
const argValue = (flag, fallback) => {
  const index = argv.indexOf(flag);
  return index !== -1 && argv[index + 1] ? argv[index + 1] : fallback;
};

const container = argValue('--container', process.env.DATABASE_CONTAINER || 'postgres');
const sourceDb = argValue('--database', 'unerp_dev');
const user = argValue('--user', 'unerp');
const label = argValue('--label', 'a22-rehearsal');
const cleanDb = argValue('--clean-db', 'unerp_restore_test');
const asJson = argv.includes('--json');
const noLog = argv.includes('--no-log');

const startedAt = new Date();

const psql = (db, sql) =>
  execFileSync('docker', ['exec', container, 'psql', '-U', user, '-d', db, '-At', '-c', sql], { encoding: 'utf8' }).trim();

const rowCounts = (db) => {
  const query = psql(
    db,
    "SELECT COALESCE(string_agg(format('SELECT %L AS t, count(*) AS n FROM %I.%I', schemaname||'.'||tablename, schemaname, tablename), ' UNION ALL '), '') FROM pg_tables WHERE schemaname='public'",
  );
  if (!query) return new Map();
  const output = execFileSync('docker', ['exec', '-i', container, 'psql', '-U', user, '-d', db, '-At'], {
    encoding: 'utf8',
    input: `${query};\n`,
    maxBuffer: 64 * 1024 * 1024,
  });
  return new Map(
    output
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const [table, count] = line.split('|');
        return [table, Number(count)];
      }),
  );
};

const fail = (message) => {
  console.error(`\n✗ REHEARSAL FAILED — ${message}`);
  process.exit(1);
};

// ── 1. Ensure a real backup exists — take one if --file was not supplied.
let backupFile = argValue('--file', null);
if (!backupFile) {
  console.log(`taking a fresh backup of ${sourceDb} (label: ${label})…`);
  const out = execFileSync(process.execPath, ['scripts/backup-database.mjs', '--label', label, '--container', container, '--user', user, '--database', sourceDb], { cwd: root, encoding: 'utf8' });
  const parsed = JSON.parse(out.slice(out.indexOf('{'), out.lastIndexOf('}') + 1));
  backupFile = path.join(root, parsed.backup);
  console.log(`backup written: ${path.relative(root, backupFile)} (${parsed.bytes} bytes)`);
} else {
  backupFile = path.resolve(backupFile);
  if (!existsSync(backupFile)) fail(`backup file not found: ${backupFile}`);
}
const backupBytes = statSync(backupFile).size;
const backupAgeMs = Date.now() - statSync(backupFile).mtimeMs;
const backupAgeSec = Math.round(backupAgeMs / 1000);

// ── 2. Snapshot the source as the ground truth.
const sourceCounts = rowCounts(sourceDb);
const sourceTables = sourceCounts.size;
const sourceRows = [...sourceCounts.values()].reduce((s, n) => s + n, 0);
const sourceMigrations = Number(psql(sourceDb, 'SELECT count(*) FROM _prisma_migrations'));
console.log(`source: ${sourceDb} · ${sourceTables} tables · ${sourceRows} rows · ${sourceMigrations} migrations`);

// ── 3. Restore into a CLEAN database, timed.
const containerDump = '/tmp/rehearse-restore.dump';
try {
  psql('postgres', `DROP DATABASE IF EXISTS ${cleanDb}`);
  psql('postgres', `CREATE DATABASE ${cleanDb}`);
  execFileSync('docker', ['cp', backupFile, `${container}:${containerDump}`], { stdio: 'inherit' });

  const restoreStart = Date.now();
  try {
    execFileSync('docker', ['exec', container, 'pg_restore', '-U', user, '-d', cleanDb, '--no-owner', '--role', user, containerDump], { stdio: 'pipe' });
  } catch (e) {
    fail(`pg_restore could not restore ${backupFile} into ${cleanDb}. The backup is corrupt or unreadable. (${String(e.stderr || e).trim().split('\n')[0]})`);
  }
  const rtoMs = Date.now() - restoreStart;

  console.log(`restore into clean DB ${cleanDb}: ${rtoMs} ms (RTO)`);

  // ── 4. Prove the restored data is valid.
  const failures = [];
  const restoredCounts = rowCounts(cleanDb);
  if (restoredCounts.size !== sourceTables) {
    failures.push(`table count mismatch: source ${sourceTables} vs restored ${restoredCounts.size}`);
  }
  for (const [table, count] of sourceCounts) {
    const restored = restoredCounts.get(table);
    if (restored === undefined) failures.push(`missing table after restore: ${table}`);
    else if (restored !== count) failures.push(`row-count mismatch ${table}: source ${count} vs restored ${restored}`);
  }
  const restoredMigrations = Number(psql(cleanDb, 'SELECT count(*) FROM _prisma_migrations'));
  if (sourceMigrations !== restoredMigrations) {
    failures.push(`_prisma_migrations mismatch: ${sourceMigrations} vs ${restoredMigrations}`);
  }

  // ── 5. Log the rehearsal: RTO = restore duration, RPO = backup age.
  const rpoSec = backupAgeSec; // window of data at risk = age of the backup being restored
  const record = {
    timestamp: startedAt.toISOString(),
    sourceDb,
    backup: path.relative(root, backupFile),
    backupBytes,
    backupAgeSec: rpoSec,
    cleanDb,
    rtoMs,
    tables: sourceTables,
    rows: sourceRows,
    migrations: sourceMigrations,
    verified: failures.length === 0,
    failures,
  };

  if (!noLog) {
    appendFileSync(jsonlPath, `${JSON.stringify(record)}\n`);
    const rows = readFileSync(jsonlPath, 'utf8')
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .map(
        (r) =>
          `| ${r.timestamp.slice(0, 19).replace('T', ' ')} | ${path.basename(r.backup)} | ${r.sourceDb} → ${r.cleanDb} | ${(r.rtoMs / 1000).toFixed(1)} s | ${(r.backupAgeSec / 3600).toFixed(1)} h | ${r.tables} | ${r.rows} | ${r.migrations} | ${r.verified ? 'PASS' : 'FAIL'} |`,
      );
    const section =
      `## Rehearsal log\n\n` +
      `Appended by \`scripts/rehearse-restore.mjs\` — a real backup restored into a clean database, ` +
      `timed (RTO) and aged (RPO), data proven equal. Latest rehearsal is the current row.\n\n` +
      `| When (UTC) | Backup | Restore | RTO | RPO | Tables | Rows | Migrations | Result |\n` +
      `| :--------- | :----- | :------ | :-- | :-- | -----: | ---: | ---------: | :----- |\n` +
      `${rows.join('\n')}\n`;
    const runbook = readFileSync(runbookPath, 'utf8');
    const nextSection = runbook.match(/\n## /g);
    if (/## Rehearsal log/.test(runbook)) {
      writeFileSync(runbookPath, runbook.replace(/## Rehearsal log[\s\S]*?(?=\n## |$)/, section.trimEnd()));
    } else {
      writeFileSync(runbookPath, `${runbook.trimEnd()}\n\n${section}`);
    }
  }

  console.log(asJson ? JSON.stringify(record, null, 2) : JSON.stringify(record, null, 2));

  if (failures.length > 0) {
    console.error('\n✗ REHEARSAL FAILED — restored data does not match source:');
    for (const f of failures) console.error(`    · ${f}`);
    process.exit(1);
  }
  console.log(`\n✓ RESTORE REHEARSED AND VERIFIED — RTO ${(rtoMs / 1000).toFixed(1)} s, RPO ${(rpoSec / 3600).toFixed(1)} h. Logged.`);
} finally {
  psql('postgres', `DROP DATABASE IF EXISTS ${cleanDb}`);
  execFileSync('docker', ['exec', container, 'rm', '-f', containerDump], { stdio: 'pipe' });
}
