# Finance Economic Nexus Change Contract

## Cycle status

- Status: `PARTIAL`
- Cycle objective: Prove and complete API-to-Strata coverage for the Finance economic-nexus family.
- Completed this cycle: The integration auditor recognizes standard function-style API helpers; all 14 Nexus endpoints have method-matched UI consumers; threshold create/edit/retire, state history, and registration view/deregister actions were added; business records are retired or deregistered rather than physically deleted.
- Incomplete this cycle: Atomic outbox publication, explicit state-transition contracts, PostgreSQL RLS execution evidence, live E2E, and production rollout.
- Verification evidence: Audit regression, 21 service tests, 2 Strata interaction tests, and API/UI typechecks pass.
- Next required action: Add L0 Nexus command contracts and transactional persistence/outbox, then continue the Finance-wide inventory.
- Required honesty statement: **This is not done.**

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | PARTIAL | This change contract and existing controller schemas |
| Implemented | PARTIAL | Nexus service and Strata page changes |
| Tested | PARTIAL | Focused service/UI tests and typechecks; DB/live proof remains |
| Integrated | YES | Generated inventory shows 14/14 Nexus endpoints with method-matched consumers |
| Deployed | NO | No deployment authorized |
| Released | NO | No release authorized |

## Authority, design, and safety

This is an R3 Finance, Contracts, Data, and Tenant Apps change. The Finance API owns nexus calculation and records; Tenant Apps owns the Strata workflow. Applicable rules include tenant scoping and PostgreSQL RLS, immutable/auditable Finance history, atomic outbox publication, zero-trust permissions, WCAG 2.2 AA, and the UniERP agent protocol.

The existing `EconomicNexusThreshold`, `NexusMonitoringSnapshot`, and `NexusRegistration` models are the current data authority. Tenant/state uniqueness means a retired threshold is reactivated and updated rather than duplicated. DELETE routes retain backward compatibility while performing business-safe retirement: thresholds set `isActive=false`; registrations transition to `DEREGISTERED` with `deregisteredAt`. Monitoring history remains bounded to 24 snapshots per state in the current read contract.

The UI exposes standard Strata loading, empty, error, protected-action, detail, and keyboard-focusable history states. Threshold limits remain numeric, state codes remain two characters, and destructive-looking actions state their actual retirement semantics.

No migration or dependency change is introduced. Remaining repository work must set tenant context, lock competing updates, validate transitions, and persist the business mutation plus a versioned outbox event in one transaction. Retry/idempotency behavior is still undefined and must be published in L0 before production qualification.

## Evidence

| Result | Working directory | Command |
| --- | --- | --- |
| PASS | `tenant-apps` | `node scripts/test-finance-integration-audit.cjs` |
| PASS | `tenant-apps` | `node scripts/audit-finance-integration.cjs` — 385 method-matched Finance consumers, 1,385 unresolved; Nexus 14/14 |
| PASS | `tenant-apps` | `pnpm vitest run src/components/finance/__tests__/finance-tax-nexus-actions.test.tsx` — 2 tests |
| PASS | `api` | `pnpm vitest run src/modules/finance/tests/economic-nexus.service.spec.ts` — 21 tests |
| PASS | `api` | `pnpm typecheck` |
| PASS | `tenant-apps` | `pnpm typecheck` |

All checks ran under Node 24.14 while repositories require Node 22, so supported-runtime proof remains required. Live authentication, cross-tenant/no-context RLS, browser accessibility, and production-shaped monitoring-volume tests remain required. No deployment, shared-database mutation, or release is authorized.
