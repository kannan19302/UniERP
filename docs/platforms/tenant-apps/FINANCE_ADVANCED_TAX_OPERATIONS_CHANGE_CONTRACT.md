# Finance Advanced Tax Operations Change Contract

## Cycle status

- Status: `PARTIAL`
- Cycle objective: Align and integrate the 26 non-Nexus advanced tax APIs across Contracts, API, and Strata.
- Completed this cycle: Published bounded L0 command schemas, adopted them in the API controller, added the Advanced Tax Operations workspace and Finance catalog navigation, integrated all 26 endpoints, and changed jurisdiction deletion to effective-dated retirement.
- Incomplete this cycle: Transactional outbox, idempotent commands, database RLS execution proof, service-wide decimal review, live E2E, and production rollout.
- Verification evidence: 26/26 method-matched consumers, contract/API/UI builds and typechecks, focused contract/service/UI tests.
- Next required action: Implement atomic tax-operation repositories and continue the next unresolved Finance family.
- Required honesty statement: **This is not done.**

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | PARTIAL | This change contract and `finance-tax-operations.ts` |
| Implemented | PARTIAL | Controller, tax service, Strata workspace, and navigation |
| Tested | PARTIAL | Focused boundary tests pass; live DB/security/E2E proof remains |
| Integrated | YES | Generated inventory reports 26/26 non-Nexus tax endpoints with method-matched consumers |
| Deployed | NO | No deployment authorized |
| Released | NO | No release authorized |

## Architecture and behavior

This R3 change affects Contracts, Finance API, Data behavior, and Tenant Apps. The Advanced Tax Operations workspace owns jurisdiction rate versions, exemption certificates, VAT previews and reconciliations, withholding certificates, amended filings, and dashboard visibility. It is linked from the Finance TAX catalog and protected by the existing server-authoritative Finance tax permissions.

Published request schemas enforce finite rates and monetary inputs, ordered reconciliation periods, withholding not exceeding gross amount, bounded dates/years, and mutually exclusive amendment refund/additional-tax outcomes. Jurisdiction rate changes remain effective-dated. The compatibility DELETE route now retires a jurisdiction by setting `isActive=false` and closing its effective window, preserving historical tax evidence.

Existing services still write directly through Prisma. Production qualification requires tenant context, locks where transitions compete, idempotency keys for commands, and mutation plus versioned outbox event in a single transaction. Exemption revocation, certificate issuance/filing, reconciliation closure, and amended-filing decisions need explicit transition matrices and immutable history. No schema migration or dependency change is included.

The Strata workspace includes loading, empty, error, status, keyboard-focusable detail output, and direct navigation for every API operation. Detailed screen-reader, zoom/reflow, localization, live auth, and offline/degraded behavior remain to be proven.

## Evidence

| Result | Working directory | Command |
| --- | --- | --- |
| PASS | `unierp-contracts` | `pnpm build` |
| PASS | `unierp-contracts` | `pnpm vitest run src/finance-tax-operations.spec.ts` — 4 tests |
| PASS | `api` | `pnpm typecheck` |
| PASS | `api` | `pnpm build` |
| PASS | `api` | `pnpm vitest run src/modules/finance/tests/tax-engine-deep-rate-versioning.service.spec.ts` — 3 tests |
| PASS | `api` | scoped ESLint for controller and service |
| PASS | `tenant-apps` | `pnpm typecheck` |
| PASS | `tenant-apps` | `pnpm build` |
| PASS | `tenant-apps` | `pnpm vitest run src/components/finance/__tests__/finance-tax-operations-actions.test.tsx` — 2 tests |
| PASS | `tenant-apps` | Finance integration audit — 26/26 family coverage; 432 Finance method-matched consumers; 1,338 unresolved |

Checks ran under Node 24.14 while the repositories require Node 22. Supported-runtime builds, PostgreSQL tenant A/B/no-context RLS evidence, production-shaped calculations, and live browser accessibility remain required. No database migration, deployment, or release was performed.
