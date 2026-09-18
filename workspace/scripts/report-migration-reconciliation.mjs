#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shadowDatabaseUrl = process.env.MIGRATION_SHADOW_DATABASE_URL;
const check = process.argv.includes('--check');

if (!shadowDatabaseUrl) {
  console.error('MIGRATION_SHADOW_DATABASE_URL must point to an isolated disposable database.');
  process.exit(2);
}

const prismaCli = path.join(root, 'node_modules', 'prisma', 'build', 'index.js');
const diff = spawnSync(
  process.execPath,
  [
    prismaCli, 'migrate', 'diff',
    '--from-migrations', 'prisma/migrations',
    '--to-schema-datamodel', 'prisma/schema.prisma',
    '--shadow-database-url', shadowDatabaseUrl,
    '--script',
  ],
  { cwd: path.join(root, 'packages', 'database'), encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 },
);

if (diff.error || diff.status !== 0) {
  console.error(diff.stderr || diff.error?.message || 'Prisma migration diff failed.');
  process.exit(diff.status || 1);
}

const tables = new Map();
const ensureTable = (table) => {
  if (!tables.has(table)) tables.set(table, { drops: [], adds: [] });
  return tables.get(table);
};

for (const statement of diff.stdout.matchAll(/ALTER TABLE "([^"]+)"\s+([\s\S]*?);/g)) {
  const [, table, body] = statement;
  const entry = ensureTable(table);
  for (const drop of body.matchAll(/DROP COLUMN\s+"([^"]+)"/g)) entry.drops.push(drop[1]);
  for (const add of body.matchAll(/ADD COLUMN\s+"([^"]+)"/g)) entry.adds.push(add[1]);
}

const normalise = (column) => column.replace(/[_-]/g, '').toLowerCase();
const candidates = [];
const unknown = [];

for (const [table, entry] of [...tables.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  const remainingAdds = [...entry.adds];
  for (const oldColumn of entry.drops) {
    const addIndex = remainingAdds.findIndex((newColumn) => normalise(newColumn) === normalise(oldColumn));
    if (addIndex === -1) {
      unknown.push({ table, operation: 'drop', column: oldColumn });
      continue;
    }
    const [newColumn] = remainingAdds.splice(addIndex, 1);
    candidates.push({ table, oldColumn, newColumn });
  }
  for (const newColumn of remainingAdds) unknown.push({ table, operation: 'add', column: newColumn });
}

const typeConversionCandidates = candidates.filter(({ oldColumn, newColumn }) => oldColumn === newColumn);
console.log(`Reconciliation rename candidates: ${candidates.length}`);
console.log(`Same-name candidates requiring type-conversion review: ${typeConversionCandidates.length}`);
console.log(`Unmatched destructive operations: ${unknown.length}`);

for (const candidate of candidates) {
  console.log(`CANDIDATE ${candidate.table}: ${candidate.oldColumn} -> ${candidate.newColumn}`);
}
for (const operation of unknown) {
  console.log(`UNMATCHED ${operation.table}: ${operation.operation} ${operation.column}`);
}

if (check && unknown.length > 0) {
  console.error('Reconciliation check failed: every destructive column operation needs an approved mapping or explicit retention decision.');
  process.exit(1);
}
