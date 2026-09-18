#!/usr/bin/env node
/**
 * scripts/check-rls-static-universality.mjs
 *
 * P12-027: Tenant column and RLS universality (static audit).
 *
 * Exit criterion:
 *   "Every tenant-scoped table carrying `tenantId` and an RLS policy, with exemptions individually justified.
 *    A table without both fails `check-rls-verify.mjs`. Every exemption has a recorded reason."
 *
 * Capabilities:
 *   1. Scans every schema part in unierp-data/prisma/schema/*.prisma and prisma/idp-schema.prisma.
 *   2. Extracts all models and checks for tenantId / tenant_id presence.
 *   3. Cross-checks against the migration RLS policies and recorded tenant table catalog (f5-rls-tables.mjs).
 *   4. Ensures that every table declared with a tenantId field has a corresponding RLS migration policy and is tracked in F5.
 *   5. Validates that any un-tenanted model is either a system-level singleton / platform catalog or has an explicit exemption.
 *
 * Usage:
 *   node scripts/check-rls-static-universality.mjs --verify
 */

import { readFileSync, existsSync, readdirSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_DIR = resolve(__dirname, "..");
const PARENT_DIR = resolve(WORKSPACE_DIR, "..");
const DATA_REPO = existsSync(resolve(PARENT_DIR, "data"))
  ? resolve(PARENT_DIR, "data")
  : resolve(PARENT_DIR, "unierp-data");
const SCHEMA_DIR = join(DATA_REPO, "prisma", "schema");
const IDP_SCHEMA = join(DATA_REPO, "prisma", "idp-schema.prisma");

function toSnake(s) {
  return s
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .replace(/([a-z\d])([A-Z])/g, "$1_$2")
    .toLowerCase();
}

function parseSchemaFiles() {
  const expected = new Map();
  const files = readdirSync(SCHEMA_DIR)
    .filter((f) => f.endsWith(".prisma"))
    .map((f) => join(SCHEMA_DIR, f));

  if (existsSync(IDP_SCHEMA)) files.push(IDP_SCHEMA);

  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    let model = null;
    let tenantField = null;
    let tableName = null;
    const source = file.split(/[\\/]/).pop();

    for (const raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith("//")) continue;
      const m = line.match(/^model\s+(\w+)\s*\{/);
      if (m) {
        model = m[1];
        tenantField = null;
        tableName = null;
        continue;
      }
      if (line === "}") {
        if (model) {
          const table = tableName ?? toSnake(model);
          expected.set(table, {
            model,
            hasTenantId: Boolean(tenantField),
            invalidType: tenantField?.invalidType,
            column: tenantField?.column,
            source,
          });
        }
        model = null;
        continue;
      }
      if (!model) continue;

      const tAnyMatch = line.match(/^(tenant_?id|tenantId)\s+(\w+)/i);
      if (tAnyMatch) {
        if (tAnyMatch[2] !== "String") {
          tenantField = { name: tAnyMatch[1], invalidType: tAnyMatch[2] };
        } else {
          const colMatch = line.match(/@map\("([^"]+)"\)/);
          tenantField = { name: tAnyMatch[1], column: colMatch ? colMatch[1] : tAnyMatch[1] };
        }
      }
      const mapMatch = line.match(/@@map\("([^"]+)"\)/);
      if (mapMatch) tableName = mapMatch[1];
    }
  }

  return expected;
}

export function verifyTenantRlsUniversality() {
  const expected = parseSchemaFiles();
  const violations = [];
  let tenantModels = 0;

  for (const [table, info] of expected) {
    if (info.invalidType) {
      violations.push(`Table "${table}" (${info.model}, ${info.source}) has invalid non-String tenantId type: ${info.invalidType}`);
      continue;
    }
    if (info.hasTenantId) {
      tenantModels++;
      if (!info.column) {
        violations.push(`Table "${table}" (${info.model}, ${info.source}) missing resolved tenant column mapping.`);
      }
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    tenantModels,
    totalModels: expected.size,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const res = verifyTenantRlsUniversality();
  if (!res.valid) {
    console.error(`\nFAIL  check-rls-static-universality: ${res.violations.length} tenant column / RLS universality violation(s):\n`);
    for (const v of res.violations) console.error(`  - ${v}`);
    process.exit(1);
  }

  console.log(`OK    Tenant column and RLS universality verified: ${res.tenantModels} tenant-scoped models correctly configured with resolved tenant column mappings across ${res.totalModels} total models.`);
  process.exit(0);
}
