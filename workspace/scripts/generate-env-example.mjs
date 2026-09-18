#!/usr/bin/env node
// Track G.6: generate .env.example from the API's Zod env schema so the two
// can never drift. Usage:
//   node scripts/generate-env-example.mjs           # (re)write .env.example
//   node scripts/generate-env-example.mjs --check   # CI: fail if out of sync
//
// Relies on Node >= 22 TypeScript type-stripping to import the .ts schema.

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const schemaPath = path.join(root, 'apps', 'api', 'src', 'common', 'config', 'env.schema.ts');
const examplePath = path.join(root, '.env.example');
const check = process.argv.includes('--check');

const { envSchema } = await import(pathToFileURL(schemaPath).href);

const lines = [
  '# Environment Variables — Universal ERP System',
  '# GENERATED from apps/api/src/common/config/env.schema.ts (Track G.6).',
  '# Do not edit by hand: change the schema, then run',
  '#   node scripts/generate-env-example.mjs',
  '# Copy to .env (repo root) and fill in the values.',
  '',
];

for (const [key, type] of Object.entries(envSchema.shape)) {
  let inner = type;
  let defaultValue;
  let optional = false;
  // Unwrap ZodDefault / ZodOptional / ZodEffects wrappers to reach metadata.
  for (;;) {
    if (inner._def?.typeName === 'ZodDefault') {
      defaultValue = inner._def.defaultValue();
      inner = inner._def.innerType;
    } else if (inner._def?.typeName === 'ZodOptional' || inner._def?.typeName === 'ZodNullable') {
      optional = true;
      inner = inner._def.innerType;
    } else if (inner._def?.typeName === 'ZodEffects') {
      inner = inner._def.schema;
    } else {
      break;
    }
  }
  const description = type.description ?? inner.description ?? '';
  const requirement = defaultValue !== undefined
    ? `default: ${JSON.stringify(defaultValue)}`
    : optional
      ? 'optional'
      : 'REQUIRED';
  lines.push(`# ${description} [${requirement}]`);
  const exampleValue = defaultValue !== undefined ? String(defaultValue) : '';
  lines.push(`${key}=${JSON.stringify(exampleValue) === `"${exampleValue}"` && !/[\s#"]/.test(exampleValue) ? exampleValue : JSON.stringify(exampleValue)}`);
  lines.push('');
}

const generated = `${lines.join('\n').trimEnd()}\n`;

if (check) {
  let current = '';
  try {
    current = readFileSync(examplePath, 'utf8');
  } catch {
    // missing file counts as drift
  }
  if (current.replace(/\r\n/g, '\n') !== generated) {
    console.error('.env.example is out of sync with env.schema.ts — run: node scripts/generate-env-example.mjs');
    process.exit(1);
  }
  console.log('.env.example is in sync with env.schema.ts');
} else {
  writeFileSync(examplePath, generated);
  console.log(`Wrote ${path.relative(root, examplePath)} (${Object.keys(envSchema.shape).length} variables).`);
}
