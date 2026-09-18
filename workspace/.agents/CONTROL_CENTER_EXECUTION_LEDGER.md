# PCC/OCC execution ledger

This ledger records implementation evidence for the canonical plan in `PCC_OCC_ARCHITECTURE_AND_EXECUTION_PLAN.md`. It is operational state, not normative product documentation. An agent can resume by selecting the first unchecked work packet whose dependencies are checked, reading the referenced requirement rows, and running every listed verification command before changing the packet state.

## Completed foundation

- [x] `W0-01` — canonical ownership catalog: 22 PCC apps, 22 OCC apps, 278 unique resource kinds, and 44 unique event families in `unierp-contracts/src/control-centers.ts`.
- [x] `W0-02` — endpoint/event/consumer/generated-client compatibility release contract in `unierp-contracts/src/control-center-contract-release.ts`.
- [x] `W0-03` — shared shell manifest contract, complete PCC/OCC manifests, provider command-palette adoption, OCC launcher adoption, and route ownership/boundary gates.
- [x] `PCC-18-P0/P1 safety slice` — provider-only tenant lifecycle routes removed from OCC; PCC uses real suspend/restore/offboard/cancel/purge APIs; purge enforces state, retention, legal holds, confirmation, and approval/break-glass controls.
- [x] `PCC-03/PCC-02 trust preflight` — retired local provider-login token minting route removed; hosted OIDC remains the only provider sign-in path; provider Next.js 15.3 line patched to 15.3.8; navigation permission hooks made rules-of-hooks safe.
- [x] `API compile/unit baseline` — local contracts/shared/auth/data dependencies are aligned; API type-check and build pass; 5,769 database-free tests pass; 13 real-Prisma specs are catalogued in the integration lane instead of failing without `DATABASE_URL`.

## Current packet: Wave 1 trust and tenancy

- [ ] `PCC-18-P2` — make tenant lifecycle operation history, legal-hold readiness, exports, and retry/recovery state observable in PCC.
- [ ] `PCC-03-P1` + `PCC-02-P1` — canonical provider identity/security permissions, operator session controls, and access-review workflow.
- [ ] `OCC-01-P1` + `OCC-02-P1` — organization graph and workforce directory contracts with tenant-isolation negative tests.
- [ ] `OCC-03-P1` + `OCC-04-P1` — effective-access preview, access reviews, SSO/MFA/session policy, and provider-minimum enforcement.
- [ ] `PCC-13-P1` — typed global configuration, inheritance, staged rollout, concurrency, approval, audit, and rollback.
- [ ] `PCC-01-P1` + `PCC-19-P1` — platform operations/infrastructure command models, SLOs, incidents, maintenance, durable jobs, and recovery evidence.

## Mandatory verification baseline

Run from the named repository; all commands must pass or the packet must record the exact pre-existing failure separately.

```text
unierp-contracts: npm run build && npm run check:control-centers && npm run check:control-center-contracts && npm run check:control-center-manifests
unierp-workspace: npm run check:control-center-boundaries && npm run check:control-center-manifests
provider-admin-os: npm run typecheck && npm test && npm run build
tenant-admin: npm run typecheck && npm test && npm run build
api: npm run security:plane1 && npm test -- <changed focused suites> && npm run typecheck
```

The API type-check and build are clean. `npm test` is the database-free unit lane; real-Prisma/DDL/RLS specs are centrally catalogued in `api/test/database-backed-specs.ts` and run through `npm run test:integration` against the disposable integration database.

## Evidence recorded 2026-08-24

- Contract catalog validation: 44 apps, 278 resource kinds, 44 event families.
- Workspace route boundary gate: 243 pages, 109 ownership rules, zero boundary violations after provider-only OCC removal.
- Provider shell: 22 PCC manifests (20 active, 2 planned); production build (144 static pages), type-check, and 8 runnable tests pass.
- OCC shell: 22 OCC manifests (19 active, 3 planned); production build, type-check, and 3 manifest tests pass.
- API tenant lifecycle: 25 focused tests pass; 252 platform endpoints retain explicit control-plane permissions and enforcing guard chains.

## Evidence recorded 2026-08-25

- API baseline: build and type-check pass; 586 test files and 5,769 tests pass in the database-free lane; the platform permission gate covers 48 controllers and 252 endpoints.
- Auth package: local CommonJS package metadata/output are aligned and 6 tests pass; API and IDP now consume the workspace package rather than the malformed published ESM metadata.
- Canonical permission foundation: all 44 `*.access` permissions are derived from the L0 control-center catalogue; `pcc.*` is reserved as provider-only while `occ.*` remains tenant-scoped; shared has 114 passing tests.
- Provider entitlement boundary: IDP recognizes canonical `pcc.*` authority, rejects tenant wildcard crossover through the shared namespace rule, and passes its focused entitlement suite, type-check, and build.
- AI delegation boundary: migration `20260825001000_reserve_pcc_permission_namespace` adds `pcc.*` to the database-enforced agent permission ceiling.
- OCC effective-access safety slice: `GET /admin/users/:id/effective-access` now resolves direct role and access-package grants with deterministic provenance under `occ.access-governance.access`; package-to-role mutations validate both records against the authenticated tenant across the main/Identity clients and assignment is idempotent. Six focused boundary tests, 24 admin RBAC sweep tests, 12 RBAC guard tests, API type-check, and the 252-endpoint plane-1 gate pass.
- Provider realm/PCC-03 safety slice: legacy seed duplication is consolidated behind one provider-realm helper; provider login only accepts a principal in that reserved system tenant; `ControlPlaneGuard` independently validates the provider-realm tenant on every platform request. PCC staff IdP now exposes RLS-scoped, secret-safe principal/group/role/package/service-credential/session/effective-access views. Focused API tests pass, and the full plane-1 route audit now covers 259 endpoints.
- Shared access-review foundation: IdP schema and migration `20260825002000_access_review_campaigns` add one RLS-protected campaign/item/append-only decision-history lifecycle, discriminated by `PROVIDER` versus `ORGANIZATION` scope rather than duplicating PCC/OCC review stores. Prisma generation, data type-check, and data build pass.
- Shared access-review delivery slice: both PCC Identity Governance and OCC Access Governance now use that single lifecycle to create, launch, review, revoke/except/certify, and complete campaigns. Grant snapshots are immutable, decisions retain append-only history, revoke decisions require outstanding remediation to close, and raw IDP transactions explicitly re-establish the tenant RLS setting. Thirteen focused workflow/identity tests, API build/type-check, the 265-endpoint plane-1 permission audit, the 259-endpoint tenant-realm 403 sweep, and the full 589-file/5,783-test database-free API suite pass.
- OCC organization/workforce boundary slice: Organization Profile & Structure now reads the existing canonical D04 `OrgUnit`/`OrgPosition` graph instead of adding a second hierarchy. Creation rejects cross-tenant parent, unit, manager-position, and workforce-principal references; graph/list reads are deterministic and tenant-scoped. Seven focused structure tests and API type-check pass.

## No-duplication rule

Before introducing an endpoint, event, data model, route, job type, permission, metric, or notification, search the canonical catalog and all repositories. Extend the existing owner when semantics match; create a new artifact only when the catalog assigns a distinct resource kind and event family. PCC owns provider policy and cross-tenant operations. OCC owns one-organization configuration and delegated administration. Shared contracts may describe both but never execute either plane's authorization decisions.
