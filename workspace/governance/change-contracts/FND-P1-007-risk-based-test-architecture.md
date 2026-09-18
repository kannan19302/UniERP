# Change Contract — FND-P1-007 Risk-Based Test Architecture

## Cycle status

- Status: `PARTIAL` (Taxonomy manifest established and verified across 3,221 test suites with 0 unclassified entries; full cross-tier suite execution across real UI, API, database, and queue boundaries in progress)
- Objective: establish a machine-enforced test taxonomy, classification manifest, and risk-based verification architecture across all 31 active estate repositories.
- Risk class: `R2` — verification completeness and regression detection.
- Accountable platforms: Quality Engineering and Runtime Operations (`PLT-QA`, `PLT-OPS`).

## Delivered Test Taxonomy & Manifest (`docs/test-taxonomy.json`)

Classified exactly 3,221 test suites across all 31 active repositories into 10 formal test categories:
1. **`unit` (2,861 files)**: In-memory unit tests with mocked collaborators.
2. **`guard` (101 files)**: Authorization, RBAC, ABAC, two-person control, and control-plane guards.
3. **`contract` (67 files)**: Consumer-driven contracts, OpenAPI/AsyncAPI conformance, and release fixtures.
4. **`integration` (62 files)**: Real database-backed multi-tenant tests and event handlers.
5. **`controller` (58 files)**: HTTP request/response validation and serialization boundaries.
6. **`widget` (24 files)**: Flutter mobile and desktop component/widget tests.
7. **`e2e` (21 files)**: Playwright multi-step browser user journey tests.
8. **`migration` (12 files)**: Forward/backward schema migration expansion and backfill tests.
9. **`isolation` (9 files)**: Multi-tenant boundary isolation and escape prevention suites.
10. **`property` (6 files)**: Invariant and property-based calculation tests.

## Verification Gate

```bash
node scripts/ci/check-test-taxonomy.mjs
```
- **Scanned**: 3,221 test files across 31 active repositories.
- **Manifest**: 3,221 manifest entries verified.
- **Result**: 0 unclassified tests, 0 stale entries, 0 invalid taxonomy types.
