#!/usr/bin/env node
// Track H.3 (FOUNDATION_HARDENING_ROADMAP § 11c): automated database backup.
//
// Runs pg_dump (custom format) inside the unerp-postgres container so no host
// Postgres tooling is required, writes a timestamped artifact into
// var/backups/ (gitignored), records its SHA-256, and prunes old backups.
//
// Usage:
//   node scripts/backup-database.mjs [--label <name>] [--keep <n>] [--database <db>]
//
// Verify a backup with: node scripts/verify-backup.mjs

import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
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
const database = argValue('--database', 'unerp_dev');
const user = argValue('--user', 'unerp');
const label = argValue('--label', 'scheduled');
const keep = Number(argValue('--keep', '14'));

mkdirSync(backupDir, { recursive: true });

const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const baseName = `${database}_${stamp}_${label}`;
const containerPath = `/tmp/${baseName}.dump`;
const hostPath = path.join(backupDir, `${baseName}.dump`);

const started = Date.now();
execFileSync('docker', ['exec', container, 'pg_dump', '-U', user, '-d', database, '-Fc', '-f', containerPath], { stdio: 'inherit' });
execFileSync('docker', ['cp', `${container}:${containerPath}`, hostPath], { stdio: 'inherit' });
execFileSync('docker', ['exec', container, 'rm', containerPath], { stdio: 'inherit' });

const bytes = statSync(hostPath).size;
const sha256 = createHash('sha256').update(readFileSync(hostPath)).digest('hex');
writeFileSync(`${hostPath}.sha256`, `${sha256}  ${path.basename(hostPath)}\n`);

// Retention: newest `keep` dumps survive.
const dumps = readdirSync(backupDir)
  .filter((name) => name.endsWith('.dump'))
  .sort()
  .reverse();
for (const stale of dumps.slice(keep)) {
  rmSync(path.join(backupDir, stale), { force: true });
  rmSync(path.join(backupDir, `${stale}.sha256`), { force: true });
  console.log(`pruned ${stale}`);
}

console.log(JSON.stringify({
  backup: path.relative(root, hostPath),
  database,
  bytes,
  sha256,
  durationMs: Date.now() - started,
  retained: Math.min(dumps.length, keep),
}, null, 2));
