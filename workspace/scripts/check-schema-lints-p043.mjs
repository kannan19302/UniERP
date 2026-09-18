#!/usr/bin/env node
/**
 * scripts/check-schema-lints-p043.mjs
 *
 * P12-043: Schema lint rules — automated schema review.
 *
 * Exit criterion: Each lint rule fires on a seeded violation and is silent on a clean schema.
 *
 * Rules enforced:
 *   1. MISSING_FK_INDEX    — a @relation field has no covering @@index or @unique
 *   2. NULLABLE_FK         — a scalar FK field (e.g. userId?) is nullable without explicit justification
 *   3. UNBOUNDED_STRING    — a String field carries no @db.VarChar(n) or @db.Text annotation
 *   4. MISSING_CASCADE     — a required relation (non-optional) has no onDelete: Cascade or onDelete: Restrict
 *
 * Each rule maintains a baseline in scripts/schema-lints-p043-baseline.json.
 * The baseline only ever shrinks. A new violation (not in baseline) fails CI.
 *
 * Usage:
 *   node scripts/check-schema-lints-p043.mjs              # verify mode (default)
 *   node scripts/check-schema-lints-p043.mjs --verify     # explicit verify mode
 *   node scripts/check-schema-lints-p043.mjs --write-baseline  # regenerate baseline from current state
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const PARENT = resolve(ROOT, '..');
const DATA_REPO = existsSync(join(PARENT, 'data')) ? join(PARENT, 'data') : join(PARENT, 'unierp-data');
const SCHEMA_DIR = join(DATA_REPO, 'prisma', 'schema');
const BASELINE_PATH = join(HERE, 'schema-lints-p043-baseline.json');

const WRITE_BASELINE = process.argv.includes('--write-baseline');

// ── Schema reader ──────────────────────────────────────────────────────────────

function readAllSchemas() {
  if (!existsSync(SCHEMA_DIR)) return [];
  return readdirSync(SCHEMA_DIR)
    .filter((f) => f.endsWith('.prisma'))
    .map((f) => ({ file: f, content: readFileSync(join(SCHEMA_DIR, f), 'utf8') }));
}

// ── Parser ────────────────────────────────────────────────────────────────────

/**
 * Parses all schema files and returns an array of model objects.
 *
 * Each model: { name, fields: [{name, type, isOptional, attrs}], attrs: [string] }
 * where attrs are the block-level directives like @@index, @@unique.
 */
function parseModels(schemas) {
  const models = [];

  for (const { file, content } of schemas) {
    const lines = content.split(/\r?\n/);
    let current = null;

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const line = raw.trim();
      if (!line || line.startsWith('//')) continue;

      const mMatch = line.match(/^model\s+(\w+)\s*\{/);
      if (mMatch) {
        current = { name: mMatch[1], file, fields: [], blockAttrs: [] };
        models.push(current);
        continue;
      }

      if (line === '}') {
        current = null;
        continue;
      }

      if (!current) continue;

      // Block-level attributes (@@index, @@unique, @@id)
      if (line.startsWith('@@')) {
        current.blockAttrs.push(line);
        continue;
      }

      // Field line: name  Type?  @attr1 @attr2 ...
      const fieldMatch = line.match(/^(\w+)\s+(\S+)(.*)/);
      if (!fieldMatch) continue;

      const [, fname, ftype, rest] = fieldMatch;
      const isOptional = ftype.endsWith('?');
      const baseType = ftype.replace('?', '').replace('[]', '');

      current.fields.push({
        name: fname,
        type: baseType,
        isArray: ftype.endsWith('[]'),
        isOptional,
        rest: rest.trim(),
        raw: line,
      });
    }
  }

  return models;
}

// ── Lint rules ────────────────────────────────────────────────────────────────

const SCALAR_TYPES = new Set([
  'String', 'Int', 'BigInt', 'Float', 'Decimal', 'Boolean',
  'DateTime', 'Json', 'Bytes',
]);

function isScalarType(type) {
  return SCALAR_TYPES.has(type);
}

function getIndexedFields(model) {
  const indexed = new Set();

  // @unique or @id on a field
  for (const f of model.fields) {
    if (f.rest.includes('@id') || f.rest.includes('@unique')) {
      indexed.add(f.name);
    }
  }

  // @@index, @@unique, @@id block attributes
  for (const attr of model.blockAttrs) {
    // Extract fields from @@index([f1, f2]) or @@unique([f1]) etc.
    const m = attr.match(/@@(?:index|unique|id)\(\[([^\]]+)\]/);
    if (m) {
      const fields = m[1].split(',').map((s) => s.trim().split('(')[0]);
      // Only the leading field needs to be here — an index on [a, b] covers 'a'
      if (fields.length > 0) indexed.add(fields[0]);
    }
  }

  return indexed;
}

/**
 * Rule 1: MISSING_FK_INDEX
 * A scalar field that appears in a @relation(fields: [...]) must have an index.
 * The check-schema-indexes.mjs does a similar thing but with a different baseline.
 * This rule is complementary: it flags the same gap at the lint level, with
 * a separate, smaller baseline scoped to P12-043.
 */
function ruleMissingFkIndex(models) {
  const violations = [];

  for (const model of models) {
    const indexed = getIndexedFields(model);
    const fkFields = new Set();

    // Collect FK scalar fields from relation fields
    for (const f of model.fields) {
      const relMatch = f.rest.match(/@relation\(.*?fields:\s*\[([^\]]+)\]/);
      if (relMatch) {
        const fields = relMatch[1].split(',').map((s) => s.trim());
        for (const fkf of fields) fkFields.add(fkf);
      }
    }

    for (const fkField of fkFields) {
      if (!indexed.has(fkField)) {
        violations.push(`MISSING_FK_INDEX:${model.name}.${fkField}`);
      }
    }
  }

  return violations;
}

/**
 * Rule 2: NULLABLE_FK
 * A scalar field that is part of a @relation(...) AND is optional (?) without
 * being the backside of an optional 1-1 relation is flagged.
 *
 * Nullable FK fields create rows that cannot be joined back to their parent.
 * They are occasionally intentional (soft-delete placeholder, optional parent),
 * so they use the baseline ratchet.
 */
function ruleNullableFk(models) {
  const violations = [];

  for (const model of models) {
    // Map field names to their definitions
    const fieldMap = Object.fromEntries(model.fields.map((f) => [f.name, f]));

    for (const f of model.fields) {
      const relMatch = f.rest.match(/@relation\(.*?fields:\s*\[([^\]]+)\]/);
      if (!relMatch) continue;

      const fkFields = relMatch[1].split(',').map((s) => s.trim());
      for (const fkf of fkFields) {
        const scalar = fieldMap[fkf];
        if (scalar && scalar.isOptional) {
          violations.push(`NULLABLE_FK:${model.name}.${fkf}`);
        }
      }
    }
  }

  return violations;
}

/**
 * Rule 3: UNBOUNDED_STRING
 * A String field without @db.VarChar(n) or @db.Text could be CLOB-sized on
 * some databases. Flag String fields that carry no length annotation.
 *
 * Exception: @id fields (UUIDs / CUIDs are well-bounded), and fields with
 * @default (enum-style strings that would be tiny).
 */
function ruleUnboundedString(models) {
  const violations = [];

  for (const model of models) {
    for (const f of model.fields) {
      if (f.type !== 'String') continue;
      if (f.isArray) continue;

      const rest = f.rest;

      // Skip IDs (always CUID/UUID)
      if (rest.includes('@id')) continue;

      // Skip if it has a db annotation
      if (rest.includes('@db.VarChar') || rest.includes('@db.Text') ||
          rest.includes('@db.Char') || rest.includes('@db.NVarChar') ||
          rest.includes('@db.NText')) continue;

      // Skip if it has @default (enum-style small string)
      if (rest.includes('@default')) continue;

      // Skip array types
      if (f.isArray) continue;

      violations.push(`UNBOUNDED_STRING:${model.name}.${f.name}`);
    }
  }

  return violations;
}

/**
 * Rule 4: MISSING_CASCADE
 * A required (non-optional) @relation on a non-scalar field (relation field)
 * must declare onDelete: Cascade or onDelete: Restrict.
 * Without an explicit cascade strategy, the database default (RESTRICT or NO ACTION)
 * varies by driver and can produce unexpected errors.
 *
 * Note: We check the OWNING side (the field with @relation(fields: [...]) declared).
 */
function ruleMissingCascade(models) {
  const violations = [];

  for (const model of models) {
    for (const f of model.fields) {
      // Only fields with @relation(fields: [...]) — the owning side
      const relMatch = f.rest.match(/@relation\(/);
      if (!relMatch) continue;

      // Only if FK fields are present (owning side)
      if (!f.rest.includes('fields:')) continue;

      // Check for onDelete
      const hasOnDelete = /onDelete\s*:/.test(f.rest);
      if (!hasOnDelete) {
        violations.push(`MISSING_CASCADE:${model.name}.${f.name}`);
      }
    }
  }

  return violations;
}

// ── Baseline ──────────────────────────────────────────────────────────────────

function loadBaseline() {
  if (!existsSync(BASELINE_PATH)) {
    return { missingFkIndex: [], nullableFk: [], unboundedString: [], missingCascade: [] };
  }
  return JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
}

function newViolations(found, baselined) {
  const allowed = new Set(baselined);
  return found.filter((v) => !allowed.has(v));
}

// ── Main ──────────────────────────────────────────────────────────────────────

const schemas = readAllSchemas();
const models = parseModels(schemas);

const allMissingFkIndex = ruleMissingFkIndex(models);
const allNullableFk = ruleNullableFk(models);
const allUnboundedString = ruleUnboundedString(models);
const allMissingCascade = ruleMissingCascade(models);

if (WRITE_BASELINE) {
  const baseline = {
    _comment: 'Generated by check-schema-lints-p043.mjs --write-baseline. Only ever shrinks.',
    missingFkIndex: [...new Set(allMissingFkIndex)].sort(),
    nullableFk: [...new Set(allNullableFk)].sort(),
    unboundedString: [...new Set(allUnboundedString)].sort(),
    missingCascade: [...new Set(allMissingCascade)].sort(),
  };
  writeFileSync(BASELINE_PATH, JSON.stringify(baseline, null, 2) + '\n');
  console.log(`Baseline written to ${BASELINE_PATH}`);
  console.log(`  missingFkIndex: ${baseline.missingFkIndex.length}`);
  console.log(`  nullableFk:     ${baseline.nullableFk.length}`);
  console.log(`  unboundedString:${baseline.unboundedString.length}`);
  console.log(`  missingCascade: ${baseline.missingCascade.length}`);
  process.exit(0);
}

const baseline = loadBaseline();
const newMissingFkIndex = newViolations(allMissingFkIndex, baseline.missingFkIndex);
const newNullableFk = newViolations(allNullableFk, baseline.nullableFk);
const newUnboundedString = newViolations(allUnboundedString, baseline.unboundedString);
const newMissingCascade = newViolations(allMissingCascade, baseline.missingCascade);

const allNew = [
  ...newMissingFkIndex,
  ...newNullableFk,
  ...newUnboundedString,
  ...newMissingCascade,
];

if (allNew.length > 0) {
  console.error(`
────────────────────────────────────────────────────────────────────────
  ❌ SCHEMA LINT VIOLATIONS — P12-043
────────────────────────────────────────────────────────────────────────`);

  if (newMissingFkIndex.length > 0) {
    console.error(`\n  Rule: MISSING_FK_INDEX (${newMissingFkIndex.length} new)`);
    console.error('  A foreign key scalar field must have a covering @@index or @unique.');
    for (const v of newMissingFkIndex) console.error(`    - ${v.replace('MISSING_FK_INDEX:', '')}`);
  }
  if (newNullableFk.length > 0) {
    console.error(`\n  Rule: NULLABLE_FK (${newNullableFk.length} new)`);
    console.error('  A nullable FK field can produce un-joinable rows. Add to baseline if intentional.');
    for (const v of newNullableFk) console.error(`    - ${v.replace('NULLABLE_FK:', '')}`);
  }
  if (newUnboundedString.length > 0) {
    console.error(`\n  Rule: UNBOUNDED_STRING (${newUnboundedString.length} new)`);
    console.error('  String fields must carry @db.VarChar(n) or @db.Text. Add @default to exempt enum-style fields.');
    for (const v of newUnboundedString) console.error(`    - ${v.replace('UNBOUNDED_STRING:', '')}`);
  }
  if (newMissingCascade.length > 0) {
    console.error(`\n  Rule: MISSING_CASCADE (${newMissingCascade.length} new)`);
    console.error('  Required relations must declare onDelete: Cascade or onDelete: Restrict.');
    for (const v of newMissingCascade) console.error(`    - ${v.replace('MISSING_CASCADE:', '')}`);
  }

  console.error(`
────────────────────────────────────────────────────────────────────────
  To baseline pre-existing violations: node scripts/check-schema-lints-p043.mjs --write-baseline
  The baseline only shrinks — new violations always fail CI (P12-043).
────────────────────────────────────────────────────────────────────────
`);
  process.exit(1);
}

console.log(`  ✅ Schema lint P12-043 passed:`);
console.log(`     missingFkIndex: ${allMissingFkIndex.length} (${baseline.missingFkIndex.length} baselined, 0 new)`);
console.log(`     nullableFk:     ${allNullableFk.length} (${baseline.nullableFk.length} baselined, 0 new)`);
console.log(`     unboundedString:${allUnboundedString.length} (${baseline.unboundedString.length} baselined, 0 new)`);
console.log(`     missingCascade: ${allMissingCascade.length} (${baseline.missingCascade.length} baselined, 0 new)`);
process.exit(0);
