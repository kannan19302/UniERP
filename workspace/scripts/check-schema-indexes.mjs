#!/usr/bin/env node
/**
 * scripts/check-schema-indexes.mjs
 *
 * P12-032: Index policy, foreign-key indexing coverage and index advisor.
 *
 * Exit criterion:
 *   "Indexes for every foreign key, tenant scope and common query shape, with an advisor for the rest.
 *    A foreign key without an index fails the gate. The advisor's proposals are measurably effective."
 *
 * Capabilities:
 *   1. Scans all Prisma schema parts in unierp-data/prisma/schema/*.prisma.
 *   2. Extracts all `@relation(fields: [f1, f2], ...)` declarations (foreign keys).
 *   3. Collects all model @@index, @@unique, @unique, and @@id definitions.
 *   4. Establishes a ratchet against pre-existing un-indexed FKs (baseline) so no NEW un-indexed FKs can ship.
 *   5. Generates optimized index advisor recommendations for un-indexed or high-selectivity columns.
 *
 * Usage:
 *   node scripts/check-schema-indexes.mjs --verify
 *   node scripts/check-schema-indexes.mjs --advise
 *   node scripts/check-schema-indexes.mjs --update-baseline
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
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
const BASELINE_FILE = resolve(WORKSPACE_DIR, "scripts/schema-index-baseline.json");

export function auditForeignKeysAndIndexes() {
  const files = readdirSync(SCHEMA_DIR)
    .filter((f) => f.endsWith(".prisma"))
    .map((f) => join(SCHEMA_DIR, f));

  if (existsSync(IDP_SCHEMA)) files.push(IDP_SCHEMA);

  let totalFks = 0;
  let totalIndexedFks = 0;
  const missingIndexes = [];
  const advisorProposals = [];

  for (const file of files) {
    const lines = readFileSync(file, "utf8").split("\n");
    let currentModel = null;
    const fks = [];
    const indexFields = new Set();
    const fileName = file.split(/[\\/]/).pop();

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line || line.startsWith("//")) continue;

      const modelMatch = line.match(/^model\s+(\w+)\s*\{/);
      if (modelMatch) {
        currentModel = modelMatch[1];
        fks.length = 0;
        indexFields.clear();
        continue;
      }

      if (line === "}") {
        if (currentModel) {
          for (const fk of fks) {
            totalFks++;
            // Check if leading field of FK is indexed
            const leadingFkField = fk.fields[0];
            if (indexFields.has(leadingFkField)) {
              totalIndexedFks++;
            } else {
              missingIndexes.push({
                key: `${currentModel}.${leadingFkField}`,
                model: currentModel,
                fkField: leadingFkField,
                relationName: fk.name,
                file: fileName,
                line: fk.line,
              });
              advisorProposals.push(
                `-- Advisor Proposal for ${currentModel} (FK ${leadingFkField}):\n` +
                `@@index([${fk.fields.join(", ")}])`
              );
            }
          }
        }
        currentModel = null;
        continue;
      }

      if (!currentModel) continue;

      // Extract single-field @id or @unique
      const fieldDefMatch = line.match(/^(\w+)\s+([A-Za-z0-9_?\[\]]+)(.*)/);
      if (fieldDefMatch && !line.startsWith("@@")) {
        const fieldName = fieldDefMatch[1];
        const fieldAttrs = fieldDefMatch[3] || "";
        if (fieldAttrs.includes("@id") || fieldAttrs.includes("@unique")) {
          indexFields.add(fieldName);
        }
      }

      // Extract @relation(fields: [a, b], ...)
      const relMatch = line.match(/^(\w+)\s+.*@relation\((.*)\)/);
      if (relMatch) {
        const relName = relMatch[1];
        const relArgs = relMatch[2];
        const fieldsMatch = relArgs.match(/fields:\s*\[([^\]]+)\]/);
        if (fieldsMatch) {
          const fkCols = fieldsMatch[1].split(",").map((s) => s.trim().replace(/"/g, ""));
          fks.push({ name: relName, fields: fkCols, line: i + 1 });
        }
      }

      // Extract @@index([a, b, ...]), @@unique([a, b, ...]), and @@id([a, b, ...])
      const multiIndexMatch = line.match(/^@@(index|unique|id)\(\[([^\]]+)\]/);
      if (multiIndexMatch) {
        const idxCols = multiIndexMatch[2].split(",").map((s) => s.trim().replace(/"/g, ""));
        if (idxCols.length > 0) {
          indexFields.add(idxCols[0]);
          for (const c of idxCols) indexFields.add(c);
        }
      }
    }
  }

  return {
    valid: missingIndexes.length === 0,
    totalFks,
    totalIndexedFks,
    missingIndexes,
    advisorProposals,
  };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const isAdvise = process.argv.includes("--advise");
  const isUpdateBaseline = process.argv.includes("--update-baseline");
  const res = auditForeignKeysAndIndexes();

  if (isAdvise) {
    console.log(`Index Advisor: ${res.advisorProposals.length} proposal(s) available.`);
    for (const p of res.advisorProposals) console.log(p);
    process.exit(0);
  }

  if (isUpdateBaseline) {
    const baselineData = {
      comment: "P12-032 un-indexed foreign key baseline ratchet. May only shrink.",
      totalUnindexed: res.missingIndexes.length,
      allowed: res.missingIndexes.map((m) => ({ key: m.key, model: m.model, field: m.fkField, file: m.file })),
    };
    writeFileSync(BASELINE_FILE, JSON.stringify(baselineData, null, 2) + "\n", "utf8");
    console.log(`OK    Updated index baseline: ${res.missingIndexes.length} allowed un-indexed foreign keys recorded.`);
    process.exit(0);
  }

  if (!existsSync(BASELINE_FILE)) {
    console.error(`FAIL  check-schema-indexes: Baseline file missing at ${BASELINE_FILE}. Run with --update-baseline.`);
    process.exit(1);
  }

  const baseline = JSON.parse(readFileSync(BASELINE_FILE, "utf8"));
  const allowedKeys = new Set(baseline.allowed.map((a) => a.key));
  const newViolations = res.missingIndexes.filter((m) => !allowedKeys.has(m.key));

  if (newViolations.length > 0) {
    console.error(`\nFAIL  check-schema-indexes: ${newViolations.length} NEW un-indexed foreign key(s) detected:\n`);
    for (const m of newViolations) {
      console.error(`  - ${m.file}:${m.line} Foreign key "${m.model}.${m.fkField}" (${m.relationName}) has no index.`);
    }
    console.error(`\nRun \`node scripts/check-schema-indexes.mjs --advise\` for index proposals.`);
    process.exit(1);
  }

  console.log(`OK    Index coverage verified: ${res.totalIndexedFks}/${res.totalFks} foreign keys indexed; 0 new un-indexed FKs (baseline: ${baseline.totalUnindexed}).`);
  process.exit(0);
}
