# Finance Tax Provisioning Change Contract

## Cycle status

- Status: `PARTIAL`
- Cycle objective: Align the tax-provisioning HTTP contract, API validation, persisted model, and Strata UI.
- Completed this cycle: Canonical request schemas; controller adoption; all 36 controller operations have method-matched Strata navigation or actions; decimal reconciliation and schedule-item calculation repairs.
- Incomplete this cycle: Transactional outbox, RLS proof, journal posting, live E2E, and production rollout.
- Verification evidence: Contract build/tests and API/UI typechecks listed below.
- Next required action: Harden tax-provisioning write repositories and advance to the next unresolved Finance controller family.
- Required honesty statement: **This is not done.**

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | PARTIAL | This contract and `unierp-contracts/src/http/finance-tax-provisioning.ts` |
| Implemented | PARTIAL | API controller/service and Strata page changes |
| Tested | PARTIAL | Contract and controller boundary tests; live DB/E2E unavailable |
| Integrated | YES | Finance integration inventory reports 36 of 36 controller operations with method-matched UI consumers |
| Deployed | NO | No deployment authorized |
| Released | NO | No release authorized |

## Request, authority, and outcome

This R3 cross-repository change repairs Finance tax provisioning so the stored tax-provision models, public HTTP payloads, and Strata workflows describe the same business objects. Finance owns the API and data behavior; Contracts owns the published schemas; Tenant Apps owns the UI. Applicable authorities are the UniERP agent protocol, tenant-app platform specifications, PostgreSQL tenant-isolation rules, immutable posted-record rules, and WCAG 2.2 AA.

Searched artifacts include the TaxProvisioning controller/service, Prisma models, Finance HTTP contracts, Strata navigation/page, and Finance integration inventory. The persisted schema is treated as current model authority because no accepted ADR defines a conflicting model. Existing hard deletes and non-atomic posting conflict with enterprise Finance rules and must be replaced before release.

## Design

- A provision run is identified by tenant, fiscal year, and period. Fiscal year is an integer.
- Provision details, deferred-tax schedules, uncertain-tax positions, and valuation allowances must name their owning `runId` on creation. The server verifies that run in the authenticated tenant.
- Rates are finite percentages from 0 through 100. Monetary calculations remain decimal through the service boundary; reconciliation serializes decimal values as strings.
- Run state transitions are `DRAFT -> COMPUTED -> REVIEWED -> POSTED`. Posted records are immutable and corrected by reversal or amendment.
- Every write must execute with tenant context in one transaction and commit its versioned outbox event atomically. Idempotency is required for compute, review, post, evaluate, reserve, settle, and assess commands.
- Collection and item reads are tenant-scoped. UI visibility uses `finance.tax-provision.read`; mutations use `finance.tax-provision.manage`; server guards remain authoritative.
- Strata must expose loading, empty, error, forbidden, keyboard, reflow, and assistive-technology behavior for each workflow.

No schema migration is part of this cycle. Future tenant constraints/RLS fixes require immutable forward migrations and positive, cross-tenant, and no-context evidence with a `NOBYPASSRLS` role. No new dependency or license is introduced.

## Verification plan and evidence

| Status | Working directory | Command | Result |
| --- | --- | --- | --- |
| PASS | `unierp-contracts` | `pnpm build` | Shared contract compiled on Node 24; supported Node 22 proof remains required |
| PASS | `unierp-contracts` | `pnpm vitest run src/finance-tax-provisioning.spec.ts` | 3 boundary tests passed |
| PASS | `api` | `pnpm vitest run src/modules/finance/controllers/tax-provisioning.controller.spec.ts` | 3 controller boundary tests passed |
| PASS | `tenant-apps` | `pnpm typecheck` | Strata page compiled |
| PASS | `tenant-apps` | `pnpm vitest run src/components/finance/__tests__/finance-tax-provisioning-actions.test.tsx` | 2 Strata interaction tests passed |
| PASS | `api` | `pnpm vitest run src/modules/finance/services/tax-provisioning.service.spec.ts src/modules/finance/controllers/tax-provisioning.controller.spec.ts` | 6 service/controller tests passed |
| PARTIAL | `tenant-apps` | `node scripts/audit-finance-integration.cjs` | Tax Provisioning is 36/36; Finance method-matched consumers increased from 292 to 328; Finance-wide unresolved count is 1,442 |

Required remaining proof covers invalid inputs, auth denial, tenant A/B/no-context isolation, retries/concurrency, database failure rollback, journal/outbox atomicity, supported-runtime builds, and keyboard/screen-reader/zoom/reflow E2E. Roll forward with additive contracts and migrations; do not delete or mutate posted records. No deployment, migration application, or release is authorized.
