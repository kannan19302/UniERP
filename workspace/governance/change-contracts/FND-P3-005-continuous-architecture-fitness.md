# Change Contract — FND-P3-005 Continuous Architecture Fitness

## Cycle status

- Status: `PARTIAL`
- Objective: automated fitness functions, dependency/contract drift detection, knowledge freshness, technical-debt budgets, and release-train architecture review.
- Risk class: `R2` — architectural erosion, drift prevention, and dependency governance.
- Accountable platforms: Platform Governance (`PLT-GOV`).

## Architecture Fitness Functions

1. **Dependency & Layer Boundary Fitness**:
   - `scripts/check-layer.mjs`: Asserts layer boundary hierarchy (L0–L7) preventing upward or illegal sideways coupling.
   - `scripts/generate-repository-inventory.mjs --check`: Verifies zero upward dependency edges and zero circular cycles.
2. **Contract & Schema Drift Fitness**:
   - `scripts/check-contract-compatibility.mjs`: Enforces backward compatibility across published contract versions.
   - `scripts/check-schema-impact-analysis.mjs`: Flags breaking database changes before merge.
3. **Documentation & Knowledge Truth Fitness**:
   - `scripts/check-doc-truth.mjs`: Ensures all executable script references in active governance documents resolve to existing files.
   - `scripts/ci/check-test-taxonomy.mjs`: Ensures all test files are strictly classified with zero unclassified drift.
4. **Technical Debt Ratchets**:
   - `scripts/check-schema-lints-p043.mjs`: Enforces non-increasing baseline for schema lint findings.
   - `scripts/check-context-budget.mjs`: Enforces working-context budgets across modules.

## Verification

```bash
node scripts/generate-repository-inventory.mjs --check
node scripts/check-doc-truth.mjs
node scripts/ci/check-test-taxonomy.mjs
node scripts/check-layer.mjs
```
Automated fitness functions execute as continuous release-train gates.
