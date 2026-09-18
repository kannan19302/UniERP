#!/usr/bin/env node
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const API_MODULES = resolve(ROOT, '../unierp-api/src/modules');

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules' || entry === 'dist' || entry === '.next') continue;
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, out);
    else if (entry.endsWith('.ts') && !entry.endsWith('.spec.ts')) out.push(full);
  }
  return out;
}

const files = walk(API_MODULES);
const typeMap = new Map();

for (const file of files) {
  const code = readFileSync(file, 'utf-8');
  // Match exported interfaces and types
  const regex = /export\s+(interface|type)\s+([A-Z][a-zA-Z0-9_]*)/g;
  let match;
  while ((match = regex.exec(code)) !== null) {
    const typeName = match[2];
    if (!typeMap.has(typeName)) typeMap.set(typeName, new Set());
    // Record the module it belongs to
    const rel = file.replace(API_MODULES, '').replace(/^[/\\]/, '');
    const mod = rel.split(/[/\\]/)[0];
    typeMap.get(typeName).add(mod);
  }
}

const duplicates = [];
for (const [typeName, modules] of typeMap.entries()) {
  if (modules.size > 1) {
    duplicates.push({ typeName, modules: Array.from(modules) });
  }
}

if (duplicates.length > 0) {
  console.error('FAIL: Redeclared shared types found across modules:');
  for (const dup of duplicates) {
    console.error(`  - ${dup.typeName} is declared in: ${dup.modules.join(', ')}`);
  }
  console.error('\\nPlatform Core P12-094: Domain types must be shared rather than redeclared per service.');
  process.exit(1);
}

console.log('OK: No redeclared shared types found across modules.');
process.exit(0);
