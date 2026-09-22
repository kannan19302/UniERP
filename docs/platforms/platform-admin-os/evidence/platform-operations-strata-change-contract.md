# Platform Operations Strata delivery

## Cycle status

Status: PARTIAL. This is not done.
Objective: adopt Strata for PCC-01 and prove working operations journeys.
Completed: inspected governing authorities, current UI/API and working diffs.
Incomplete: implementation, contracts and end-to-end verification.
Next action: correct false telemetry and query failure handling, then implement Strata workspaces and commands.
Designed: PARTIAL; implemented/tested/integrated: NO; deployed/released: NO.

## Request, ownership and authority

Risk: R2. PLT-PAO owns the operator experience and operations contracts; PLT-BIZ owns existing persistence, PLT-IAM authorization, PLT-DS Strata and PLT-OPS telemetry sources.
Requirements: PAO-FR-003, PAO-NFR-003, PAO-SEC-001 through PAO-SEC-003; ADR-0009; canonical agent protocol and knowledge lifecycle.
Scope: existing PCC-01 overview, services, environments, deployments, releases, incidents, maintenance, jobs, queues, workflows and automation, their existing service boundaries and meaningful proof.
Acceptance: truthful live data and unknown states; usable Strata navigation, grids and commands; server-side denial preserved; real persistence and command completion demonstrated; required gates pass.
Current user request authorizes local implementation of this capability. Historical broad-development NO-GO is not permission for production actions. Canonical AIP-SCM-001 overrides local automatic commit/push directions; no commit or push is authorized.

## Findings and design

Existing working changes in provider UI/API are preserved and extended only within this request. Console shims fabricate service, queue and automation records on failure; shared hooks suppress failures; overview treats queue summaries as individual jobs.
Presentation must forward authenticated backend responses, preserve denial/status codes, bound requests and disable caching. Missing telemetry must remain unknown; failed reads must expose retry and never imply health or zero work. Refresh completion reflects an awaited request. Strata uses canonical floorplans, tokens, compact density, searchable tables, keyboard controls and named status regions.
Existing backend authority remains authoritative. No new provider/tenant crossover, permission bypass, destructive operation, migration, dependency or publication is authorized. Existing contracts remain compatible; any new command/schema needs its owner contract before implementation. Mutations require existing approval, idempotency, audit and durable operation semantics; gaps remain explicit until implemented and proven.
No change to privacy, retention, residency, erasure or currency semantics is planned. Avoid logging payloads or credentials. Read requests use no-store and bounded timeouts; preserve concurrent request ordering.

## Delivery safety and knowledge delta

Local reversible changes only. Roll back task diff without touching pre-existing work. No migration/backfill. No external notification, deployment or release. Knowledge delta: REQUIRED-BUT-INCOMPLETE; update requirements and traceability with source-bound evidence as slices pass. Shared hooks have other provider consumers, requiring full provider tests.

## Verification plan

Provider: focused transport/hook and UI interaction tests, typecheck, lint, build, token checks, browser login/navigation, keyboard/reflow/accessibility, dependency failure and denied-role cases.
API when modified: focused service/controller tests, typecheck/lint/build, security:plane1, real storage/queue integration and tenant A/B/no-context isolation under NOBYPASSRLS.
Contracts when modified: build/typecheck/catalog checks and provider/consumer tests. Strata: contrast/density/token drift checks. Workspace: manifest/boundary and enterprise governance gates after inspecting runner behavior.
Tests using controlled network responses prove client behavior only; live integration proof is separately required. All checks initially NOT RUN.

## Evidence — 2026-09-15, first implementation cycle

Status: PARTIAL. This is not done.

Implemented: Strata DataWorkspace for overview queue summaries, Services and Queues; compact operations layout; refresh/error/unknown states; section navigation exact matching; authenticated no-store adapters with 15-second timeout; query hooks now expose failures and return awaited success booleans. Backend removes fabricated service records and automation defaults; unavailable queues retain UNKNOWN with absent counts, database-derived counts do not imply live worker health. Outbox lag cannot go negative; migration status is UNKNOWN. Overview links to jobs, incidents, maintenance and infrastructure backup instead of treating queue summaries as individual jobs or claiming a probe checks the whole platform. Existing authentication gate gained visible fallback content.

Designed: PARTIAL. Implemented: PARTIAL. Tested: PARTIAL. Integrated: NOT VERIFIED. Deployed: NO. Released: NO.
Knowledge delta: REQUIRED-BUT-INCOMPLETE. Requirements and traceability updated; machine-readable operations contracts and full command evidence remain outstanding.

| Result | Repository | Exact command | Evidence |
| --- | --- | --- | --- |
| PASS | provider-admin-os | `pnpm exec vitest run` | 25 passed, 1 pre-existing skipped test; before adding two workspace interaction tests |
| PASS | provider-admin-os | `pnpm exec vitest run __tests__/operations-workspaces.test.tsx __tests__/operations-data.test.tsx __tests__/operations-proxy.test.ts` | 9 passed; real UI components, controlled API responses; client proof only |
| PASS | provider-admin-os | `pnpm typecheck` | No compiler errors; latest run before adding sign-in fallback |
| PASS | provider-admin-os | `pnpm check:tokens` | No new violations; 60 existing baselined violations in 41 files |
| PASS | provider-admin-os | `pnpm exec eslint src/lib/data.ts src/lib/operations-proxy.ts src/components/domain-shell.tsx "app/(control-plane)/ops/page.tsx" "app/(control-plane)/ops/services/page.tsx" "app/(control-plane)/ops/queues/page.tsx" "app/(control-plane)/ops/layout.tsx"` | No findings |
| FAIL | provider-admin-os | `pnpm build` | Compiled, then missing generated chunks while development server shared .next output |
| PASS | provider-admin-os | `$env:NEXT_BUILD_DIR='.next/operations-verification'; pnpm build` | Isolated build completed 158 static pages; existing profile/socket/realtime lint warnings; before sign-in fallback |
| PASS | api | `pnpm exec vitest run src/platform/v1/operations.spec.ts` | 5 regression tests; controlled DB failures, not storage integration |
| PASS | api | `pnpm typecheck` | No compiler errors |
| PASS | api | `pnpm build` | Completed |
| PASS | api | `pnpm exec eslint src/platform/v1/operations.service.ts src/platform/v1/operations.spec.ts` | No findings |
| PASS | api | `pnpm security:plane1` | 50 mounted controllers, 285 endpoints, static guard/permission gate only |
| PASS | workspace | `node unierp-workspace/governance/skills/unierp-enterprise-brain/scripts/validate-brain.mjs` | 6 skill artifacts, 31 repositories, required authority discovered |
| NOT RUN | workspace | `node unierp-workspace/scripts/run-enterprise-saas-engine.mjs` | Inspection found unconditional staging/commit/push of all repositories, prohibited by canonical AIP-SCM-001 without exact authorization; also emits hardcoded VERIFIED metrics, so its score cannot prove this goal |
| NOT VERIFIED | browser | CUA local navigation on ports 4002 and 4012 | Initial dev navigation timed out; isolated production page loaded but showed blank session gate and /login remained at redirect text. Static JS, session (401) and issuer discovery (200) endpoints respond. Signed-in journey not proven. |

One initial workspace assertion counted breadcrumb links along with section navigation; corrected selector to the named section navigation, preserving the intended one-active-section assertion, and reran successfully. No tests were skipped or weakened. Existing skipped tenant test concerns linked React/auth provider setup.

## Remaining work and handoff

1. Resolve live sign-in/session initialization and verify with mandated test account, without weakening provider controls. The added fallback is not a fix for authentication initialization.
2. Publish machine-readable operations read and command schemas, map all 11 existing PCC-01 routes to registered providers and persistence, then finish Strata adoption across Jobs, Environments, Releases, Deployments, Workflows, Automation, Incidents and Maintenance.
3. Repair scheduled task dispatch (currently only creates a pending DB record), bounded/idempotent job retry with atomic outbox/audit, incident/log scope and resolution, and other command lifecycle gaps. Preserve approval and provider/tenant boundaries. No live commands executed this cycle.
4. Prove real UI/API/IAM/storage/queue journeys, negative provider/tenant access, NOBYPASSRLS isolation, recovery, keyboard/screen-reader/reflow and remaining Strata/manifest/boundary gates. Reverify latest sign-in fallback.
5. Complete final source-bound diff review and traceability. No schema/migration, dependency or deployment changes this cycle. Local rollback is reversal of task edits only; preserve pre-existing provider shell, middleware, navigation and API billing changes.

Build isolation uses optional NEXT_BUILD_DIR; default remains .next. TypeScript includes verification output types. Toolchain reports Node 24 while repositories request Node 22; record this environmental mismatch in qualification. Full provider diff check also finds an existing extra EOF blank line in src/middleware.ts, outside this task's edits.

## Evidence — 2026-09-21, operations overview experience cycle

Status: PARTIAL. This is not done.

Scope: presentation-only refinement of the PCC-01 operations landing and the shared provider page-header action breakpoint. No API, contract, permission, persistence, migration, infrastructure or command semantics changed. PLT-PAO remains the experience owner and the existing operations endpoints remain the data owners. Knowledge delta: UPDATED in this evidence record; no normative behavior changed beyond the already-owned PAO-FR-003 and PAO-UX requirements.

Acceptance criteria:

- AC-16: Health is presented as healthy only when the dashboard and health sources both affirm it. Missing percentages remain `Unknown`, not `Unknown%`.
- AC-17: The landing uses a status ledger, workload strip, service register, queue workspace and compact route index instead of decorative status animation, navigation pills and nested card grids.
- AC-18: Independent source errors remain visible. Refresh, retry and backup actions retain permission checks, explicit feedback and backup confirmation.
- AC-19: The page and header actions remain horizontally contained at desktop and 390-pixel widths with visible keyboard focus.
- AC-20: Focused component and browser tests, typecheck, lint, token policy, rendered review and repository baselines are recorded before handoff.

Rollback: revert the provider-admin implementation commit and this evidence update. No data or contract rollback is required.

Verification results:

| Result | Repository | Exact command | Evidence |
| --- | --- | --- | --- |
| PASS | provider-admin-os | `pnpm test` | 341 passed, 1 skipped across 89 files |
| PASS | provider-admin-os | `pnpm exec vitest run __tests__/operations-workspaces.test.tsx` | 4 focused component tests |
| PASS | provider-admin-os | `pnpm exec playwright test e2e/operations-overview.spec.ts --workers=1 --reporter=line` | authentication setup plus desktop truthfulness and 390-pixel containment tests passed |
| PASS | provider-admin-os | `pnpm typecheck` | no compiler errors |
| PASS | provider-admin-os | focused ESLint for the operations page and changed tests | no findings; an initial invocation incorrectly included CSS and produced a parser error, then the corrected source-only command passed |
| PASS | provider-admin-os | `pnpm check:tokens` | no new violations; 53 existing violations remain baselined in 40 files |
| PASS | provider-admin-os | `node ../platform/workspace/scripts/check-layer.mjs` | L4 package boundary verified |
| PASS | browser review | desktop and 390-pixel rendered captures | action hierarchy, data density and mobile containment reviewed; temporary captures removed after inspection |
| FAIL — PRE-EXISTING | provider-admin-os | `pnpm lint` | unrelated errors remain in the email provider selector and conditional tenant-provision hook, plus existing warnings |
| FAIL — PRE-EXISTING | provider-admin-os | isolated `next build --no-lint` | compilation and type validation passed; `/login` prerender still fails because `useSearchParams()` lacks a Suspense boundary |

The runtime used Node 24 while the package requests Node 22. This environmental warning did not prevent the passing focused gates.

## Evidence — 2026-09-22, operations record-workspace cycle

Status: PARTIAL. This is not done.

Scope: presentation and client-state correction for the Jobs, Environments, Deployments, Workflows and Maintenance routes. All five routes continue to consume their existing APIs and permission checks. No API, schema, persistence, authorization, command, migration or infrastructure boundary changed. PLT-PAO owns the experience; existing operations, release, workflow and broadcast services remain authoritative for returned data. Knowledge delta: UPDATED in this evidence record; the implementation applies existing PAO-FR-003 and PAO-UX requirements.

Acceptance criteria:

- AC-21: Missing queue counts remain `Unknown`; a queue is not labeled clear unless its failed count is measured as zero.
- AC-22: Environment and deployment targets come only from the release manifest; the client does not invent staging or production rows.
- AC-23: Workflow running and failure summaries use `lastStatus`, while `lastRun` is formatted only as time evidence.
- AC-24: Each route uses the shared searchable `DataWorkspace` floorplan, explicit source error/empty states and a compact measured summary.
- AC-25: Desktop and 390-pixel layouts remain contained, keyboard-searchable and source failures remain visible.

Rollback: revert the provider-admin implementation commit and this evidence update. No data, migration or contract rollback is required.

Verification results:

| Result | Repository | Exact command | Evidence |
| --- | --- | --- | --- |
| PASS | provider-admin-os | `pnpm test` | 346 passed, 1 skipped across 90 files |
| PASS | provider-admin-os | `pnpm exec vitest run __tests__/pages/ops-record-workspaces.test.tsx` | 5 focused truthfulness and state-semantics tests |
| PASS | provider-admin-os | `pnpm exec playwright test e2e/operations-record-workspaces.spec.ts --workers=1 --reporter=line` | authentication setup, five-route record-workspace traversal and 390-pixel containment passed |
| PASS | provider-admin-os | `pnpm typecheck` | no compiler errors |
| PASS | provider-admin-os | focused ESLint for five routes and changed tests | no findings |
| PASS | provider-admin-os | `pnpm check:tokens` | no new violations; 53 existing violations remain baselined in 40 files |
| PASS | provider-admin-os | `node ../platform/workspace/scripts/check-layer.mjs` | L4 package boundary verified |
| PASS | browser review | Jobs desktop and 390-pixel rendered captures | summary hierarchy, searchable tables, action placement and page containment reviewed; temporary captures removed |
| FAIL — PRE-EXISTING | provider-admin-os | `pnpm lint` | unrelated email-provider-selector and tenant-provision errors remain, plus existing warnings |
| FAIL — PRE-EXISTING | provider-admin-os | isolated `next build --no-lint` | compilation and type validation passed; `/login` prerender still fails because `useSearchParams()` lacks a Suspense boundary |

The isolated build added its temporary output path to `tsconfig.json`; that generated edit was removed before diff review. Node 24 remained active while the package requests Node 22.
