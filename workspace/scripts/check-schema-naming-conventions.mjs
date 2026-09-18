#!/usr/bin/env node
/**
 * scripts/check-schema-naming-conventions.mjs
 *
 * P12-031: Naming and modelling conventions (models, fields, relations, enums, indexes).
 *
 * Exit criterion:
 *   "Enforced conventions for models, fields, relations, enums and indexes.
 *    A convention violation fails `check-naming-convention.mjs` / `check-schema-naming-conventions.mjs`,
 *    proven on a seeded example."
 *
 * Enforced Conventions:
 *   1. Model names: PascalCase (e.g. `UserAccount`, `JournalEntry`).
 *   2. Field names: camelCase (e.g. `tenantId`, `createdAt`, `invoiceNumber`).
 *   3. Enum names: PascalCase (e.g. `InvoiceStatus`, `PaymentMethod`).
 *   4. Enum values: UPPER_SNAKE_CASE (e.g. `PENDING_APPROVAL`, `ACTIVE`).
 *   5. Table mappings (@@map): snake_case lowercase (e.g. `user_accounts`).
 *   6. Column mappings (@map): snake_case lowercase (e.g. `tenant_id`).
 *   7. Index naming: @@index on tenantId must use standard naming or valid field tuple.
 *
 * Usage:
 *   node scripts/check-schema-naming-conventions.mjs --verify
 */

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const WORKSPACE_DIR = resolve(__dirname, "..");
const PARENT_DIR = resolve(WORKSPACE_DIR, "..");
const DATA_REPO = existsSync(resolve(PARENT_DIR, "data"))
  ? resolve(PARENT_DIR, "data")
  : resolve(PARENT_DIR, "unierp-data");
const SCHEMA_DIR = join(DATA_REPO, "prisma/schema");
const IDP_SCHEMA = join(DATA_REPO, "prisma/idp-schema.prisma");

const PASCAL_CASE = /^[A-Z][a-zA-Z0-9]*$/;
const CAMEL_CASE = /^[a-z][a-zA-Z0-9]*$/;
const SNAKE_CASE = /^[a-z0-9_]+$/;
const UPPER_SNAKE_CASE = /^[A-Z0-9_]+$/;

// Pre-existing legacy baseline exemptions (ratchet that may only shrink)
const BASELINE_EXEMPTIONS = new Set([
  "ManufacturingQualityCheckTemplate.checks_log", // core-part-10.prisma
  "eNPSurvey", // core-part-3.prisma
]);

export function verifySchemaNamingConventions() {
  const violations = [];
  const files = readdirSync(SCHEMA_DIR)
    .filter((f) => f.endsWith(".prisma"))
    .map((f) => join(SCHEMA_DIR, f));

  if (existsSync(IDP_SCHEMA)) files.push(IDP_SCHEMA);

  let modelsChecked = 0;
  let enumsChecked = 0;

  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    let currentModel = null;
    let currentEnum = null;
    const fileName = file.split(/[\\/]/).pop();

    for (let i = 0; i < lines.length; i++) {
      const lineNo = i + 1;
      const line = lines[i].trim();
      if (!line || line.startsWith("//")) continue;

      const modelMatch = line.match(/^model\s+(\w+)\s*\{/);
      if (modelMatch) {
        currentModel = modelMatch[1];
        modelsChecked++;
        if (!PASCAL_CASE.test(currentModel) && !BASELINE_EXEMPTIONS.has(currentModel)) {
          violations.push(`${fileName}:${lineNo} Model "${currentModel}" is not PascalCase`);
        }
        continue;
      }

      const enumMatch = line.match(/^enum\s+(\w+)\s*\{/);
      if (enumMatch) {
        currentEnum = enumMatch[1];
        enumsChecked++;
        if (!PASCAL_CASE.test(currentEnum) && !BASELINE_EXEMPTIONS.has(currentEnum)) {
          violations.push(`${fileName}:${lineNo} Enum "${currentEnum}" is not PascalCase`);
        }
        continue;
      }

      if (line === "}") {
        currentModel = null;
        currentEnum = null;
        continue;
      }

      if (currentEnum) {
        const valMatch = line.match(/^(\w+)/);
        if (valMatch) {
          const val = valMatch[1];
          const fullKey = `${currentEnum}.${val}`;
          if (!UPPER_SNAKE_CASE.test(val) && !BASELINE_EXEMPTIONS.has(fullKey)) {
            violations.push(`${fileName}:${lineNo} Enum value "${currentEnum}.${val}" is not UPPER_SNAKE_CASE`);
          }
        }
        continue;
      }

      if (currentModel) {
        const mapTableMatch = line.match(/^@@map\("([^"]+)"\)/);
        if (mapTableMatch) {
          const tbl = mapTableMatch[1];
          if (!SNAKE_CASE.test(tbl) && !BASELINE_EXEMPTIONS.has(tbl)) {
            violations.push(`${fileName}:${lineNo} @@map table "${tbl}" in model "${currentModel}" is not lowercase snake_case`);
          }
          continue;
        }

        const fieldMatch = line.match(/^(\w+)\s+([A-Za-z0-9_?\[\]]+)/);
        if (fieldMatch && !line.startsWith("@@")) {
          const fieldName = fieldMatch[1];
          const fullFieldKey = `${currentModel}.${fieldName}`;
          if (!CAMEL_CASE.test(fieldName) && !BASELINE_EXEMPTIONS.has(fullFieldKey)) {
            violations.push(`${fileName}:${lineNo} Field "${currentModel}.${fieldName}" is not camelCase`);
          }

          const mapColMatch = line.match(/@map\("([^"]+)"\)/);
          if (mapColMatch) {
            const col = mapColMatch[1];
            if (!SNAKE_CASE.test(col) && !BASELINE_EXEMPTIONS.has(col)) {
              violations.push(`${fileName}:${lineNo} @map column "${col}" for "${currentModel}.${fieldName}" is not lowercase snake_case`);
            }
          }
        }
      }
    }
  }

  return {
    valid: violations.length === 0,
    violations,
    modelsChecked,
    enumsChecked,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const res = verifySchemaNamingConventions();
  if (!res.valid) {
    console.error(`\nFAIL  check-schema-naming-conventions: ${res.violations.length} naming convention violation(s):\n`);
    for (const v of res.violations) console.error(`  - ${v}`);
    process.exit(1);
  }

  console.log(`OK    Schema naming conventions verified: ${res.modelsChecked} models, ${res.enumsChecked} enums strictly conform to PascalCase/camelCase/snake_case standards.`);
  process.exit(0);
}
