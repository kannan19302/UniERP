#!/usr/bin/env node
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TF_DIR = path.join(root, 'terraform');

if (!existsSync(TF_DIR)) {
  console.error('FAIL  infra/terraform directory does not exist.');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith('.tf')) out.push(full);
  }
  return out;
}

const tfFiles = walk(TF_DIR);
if (tfFiles.length < 8) {
  console.error(`FAIL  Found only ${tfFiles.length} .tf files, expected comprehensive modular architecture.`);
  process.exit(1);
}

const requiredModules = ['network', 'database', 'cache', 'storage', 'kms', 'compute'];
for (const mod of requiredModules) {
  const modFile = path.join(TF_DIR, 'modules', mod, 'main.tf');
  if (!existsSync(modFile)) {
    console.error(`FAIL  Missing required terraform module: ${mod}`);
    process.exit(1);
  }
}

const allTfContent = tfFiles.map(f => readFileSync(f, 'utf8')).join('\n');

const checks = [
  { name: 'Aurora PostgreSQL 16 cluster', pattern: /engine\s*=\s*"aurora-postgresql"/ },
  { name: 'Storage encryption with KMS', pattern: /storage_encrypted\s*=\s*true/ },
  { name: 'Multi-AZ Redis in-transit encryption', pattern: /transit_encryption_enabled\s*=\s*true/ },
  { name: 'Multi-AZ Redis at-rest encryption', pattern: /at_rest_encryption_enabled\s*=\s*true/ },
  { name: 'S3 public access block', pattern: /restrict_public_buckets\s*=\s*true/ },
  { name: 'S3 KMS server-side encryption', pattern: /sse_algorithm\s*=\s*"aws:kms"/ },
  { name: 'KMS automated key rotation', pattern: /enable_key_rotation\s*=\s*true/ },
  { name: 'RDS deletion protection', pattern: /deletion_protection\s*=\s*true/ },
];

for (const check of checks) {
  if (!check.pattern.test(allTfContent)) {
    console.error(`FAIL  Missing required IaC standard: ${check.name}`);
    process.exit(1);
  }
}

console.log(`✅ Terraform IaC standards verified across ${tfFiles.length} files and ${requiredModules.length} core modules.`);
