#!/usr/bin/env node
// Track H.3: restore-verification — "a backup that has never been restored is
// not a backup." Restores a backup into a DISPOSABLE database inside the
// container and proves equality with the live source:
//   - pg_restore completes
//   - table count matches
//   - EXACT per-table row counts match
//   - _prisma_migrations entries match
// The disposable DB is dropped afterwards. Never touches the source DB.
//
// Usage: node scripts/verify-backup.mjs [--file <path>] [--database <sourceDb>] [--json]

import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const backupDir = path.join(root, 'var', 'backups');

const argv = process.argv.slice(2);
const argValue = (flag, fallback) => {
  const index = argv.indexOf(flag);
  return index !== -1 && argv[index + 1] ? argv[index + 1] : fallback;
};

const container = argValue('--container', process.env.DATABASE_CONTAINER || 'postgres');
const sourceDb = argValue('--database', 'unerp_dev');
const user = argValue('--user', 'unerp');
const verifyDb = 'unerp_restore_verify';
const asJson = argv.includes('--json');

const newestBackup = () => {
  const dumps = readdirSync(backupDir).filter((name) => name.endsWith('.dump')).sort();
  if (dumps.length === 0) throw new Error('no backups in var/backups — run scripts/backup-database.mjs first');
  return path.join(backupDir, dumps[dumps.length - 1]);
};

const backupFile = argValue('--file', null) ?? newestBackup();

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

const started = Date.now();
const containerDump = '/tmp/restore-verify.dump';

execFileSync('docker', ['cp', backupFile, `${container}:${containerDump}`], { stdio: 'inherit' });
psql('postgres', `DROP DATABASE IF EXISTS ${verifyDb}`);
psql('postgres', `CREATE DATABASE ${verifyDb}`);

let failures = [];
try {
  execFileSync('docker', ['exec', container, 'pg_restore', '-U', user, '-d', verifyDb, '--no-owner', '--role', user, containerDump], { stdio: 'pipe' });

  const sourceCounts = rowCounts(sourceDb);
  const restoredCounts = rowCounts(verifyDb);

  if (sourceCounts.size !== restoredCounts.size) {
    failures.push(`table count mismatch: source ${sourceCounts.size} vs restored ${restoredCounts.size}`);
  }
  for (const [table, count] of sourceCounts) {
    const restored = restoredCounts.get(table);
    if (restored === undefined) failures.push(`missing table after restore: ${table}`);
    else if (restored !== count) failures.push(`row-count mismatch ${table}: source ${count} vs restored ${restored}`);
  }

  const migrationsSource = Number(psql(sourceDb, 'SELECT count(*) FROM _prisma_migrations'));
  const migrationsRestored = Number(psql(verifyDb, 'SELECT count(*) FROM _prisma_migrations'));
  if (migrationsSource !== migrationsRestored) {
    failures.push(`_prisma_migrations mismatch: ${migrationsSource} vs ${migrationsRestored}`);
  }

  const summary = {
    backup: path.relative(root, backupFile),
    sourceDb,
    tables: sourceCounts.size,
    totalRows: [...sourceCounts.values()].reduce((sum, count) => sum + count, 0),
    migrations: migrationsSource,
    durationMs: Date.now() - started,
    verified: failures.length === 0,
    failures,
  };
  console.log(asJson ? JSON.stringify(summary) : JSON.stringify(summary, null, 2));
} finally {
  psql('postgres', `DROP DATABASE IF EXISTS ${verifyDb}`);
  execFileSync('docker', ['exec', container, 'rm', '-f', containerDump]);
}

if (failures.length > 0) process.exit(1);
console.log('RESTORE VERIFIED — backup is provably restorable.');
