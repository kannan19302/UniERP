# Change Contract — FND-P1-006 Database Quality and Migration Discipline

## Cycle status

- Status: `PARTIAL` (Schema structure, canonical client distribution, and lint/index ratchets enforced; resolving duplicated schema concepts, reducing quality ratchets, and production-volume expand/backfill/contract drills in progress)
- Objective: enforce schema size limits, naming conventions, foreign key indexing ratchets, schema impact analysis, migration discipline, and deterministic seeding.
- Risk class: `R2` — database schema stability, data integrity, and migration reversibility.
- Accountable platforms: Data Platform and Business Services (`PLT-DATA`, `PLT-BIZ`).

## Architecture & Data Invariants

1. **Schema Structure & Distribution**:
   - 44 schema files under 3,000 lines in `data/prisma/schema/*.prisma` (1,938 total models).
   - Single canonical database client distribution (`@kannan19302/database@1.0.14`).
   - Strict naming conventions: PascalCase for models/enums, camelCase for fields, snake_case for table/column mappings.

2. **Quality & Index Ratchets**:
   - `check-schema-indexes.mjs`: 0 new un-indexed foreign keys.
   - `check-schema-lints-p043.mjs`: 0 new lint regressions against baseline.
   - `check-schema-size.mjs`: Max 3,000 lines per schema file.

3. **Migration & Seeding Discipline**:
   - Forward-only, expand/backfill/contract migrations.
   - `check-schema-impact-analysis.mjs`: Automated detection of breaking schema changes and consumer dependencies.
   - `check-seed-determinism.mjs`: 100% deterministic fixture generation for integration test suites.

## Verification

```bash
node scripts/check-schema-size.mjs
node scripts/check-schema-indexes.mjs
node scripts/check-schema-naming-conventions.mjs
node scripts/check-schema-lints-p043.mjs
node scripts/check-schema-impact-analysis.mjs
node scripts/check-seed-determinism.mjs
node scripts/check-prisma-distribution.mjs
```
All 7 database quality checks pass cleanly with 0 regressions.
