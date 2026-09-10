# Finance Asset Accounting Operations Change Contract

## Cycle status

- Status: `PARTIAL`
- Cycle objective: Align and integrate the 26 Asset Accounting lifecycle APIs across Contracts, API, and Strata.
- Completed this cycle: Published L0 request schemas, adopted them in the Finance controller, added a catalog-linked Asset Accounting Operations workspace, and integrated all 26 endpoints while preserving separate impairment finalization and GL-posting commands.
- Incomplete this cycle: Transactional outbox and journal proof, RLS execution evidence, idempotency, immutable lifecycle transition enforcement, live E2E, and production rollout.
- Verification evidence: Contract tests/build, API/UI typechecks, scoped lint, Strata interaction tests, and generated 26/26 integration inventory.
- Next required action: Harden asset lifecycle repositories and proceed through the next unresolved Finance route family.
- Required honesty statement: **This is not done.**

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | PARTIAL | This contract and `finance-asset-operations.ts` |
| Implemented | PARTIAL | Controller contract adoption and Asset Operations Strata workspace |
| Tested | PARTIAL | Focused contract/UI checks pass; DB, journal, security, and live E2E remain |
| Integrated | YES | Generated inventory reports 26/26 method-matched consumers |
| Deployed | NO | No deployment authorized |
| Released | NO | No release authorized |

## Architecture and invariants

This R3 change affects Contracts, Finance API, Data behavior, and Tenant Apps. Core asset registration remains in the existing Fixed Assets workspace. Asset Accounting Operations owns insurance, impairment testing/finalization, capital projects and costs, conversion to assets, bulk upload, revaluation, disposal, depreciation projections, net-book-value roll-forward, and audit evidence.

Published request contracts require finite nonnegative monetary values, ordered policy/project dates, at least one purchase value for bulk uploads, bounded batches, and unique asset IDs for bulk disposal. Impairment finalization and impairment GL posting remain distinct commands. Revaluation and disposal posting remain distinct from draft creation. These transitions must be deny-by-default and idempotent before production qualification.

Every asset mutation must eventually run with verified tenant context and commit its business change, journal effects where applicable, and versioned outbox event atomically. Posted/finalized accounting records require reversal or amendment instead of mutation or deletion. Concurrent capital-project conversion and posting need row/advisory locks. Bulk actions require per-record outcome evidence or atomic rollback semantics defined in L0.

The Strata workspace provides loading, empty, error, result, and keyboard-focusable detail states with direct navigation for all operations. Screen-reader, reflow/zoom, localization, offline, and degraded dependency evidence remain required. No migration or dependency change is part of this cycle.

## Evidence

| Result | Working directory | Command |
| --- | --- | --- |
| PASS | `unierp-contracts` | `pnpm build` |
| PASS | `unierp-contracts` | `pnpm vitest run src/finance-asset-operations.spec.ts` — 4 tests |
| PASS | `api` | `pnpm typecheck` |
| PASS | `api` | scoped ESLint for `advanced-finance.controller.ts` |
| PASS | `tenant-apps` | `pnpm typecheck` |
| PASS | `tenant-apps` | `pnpm vitest run src/components/finance/__tests__/finance-asset-operations-actions.test.tsx` — 2 tests |
| PASS | `tenant-apps` | Finance integration audit — Asset Accounting 26/26; 458 Finance method-matched consumers; 1,312 unresolved |

Checks ran under Node 24.14 while repositories require Node 22. Supported-runtime builds, PostgreSQL tenant A/B/no-context RLS tests, journal/outbox atomicity, production-volume bulk operations, and authenticated browser accessibility remain required. No database migration, deployment, or release was performed.
