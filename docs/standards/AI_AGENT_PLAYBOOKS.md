# AI Agent Development Playbooks

These playbooks operationalize the canonical protocol. They do not replace owning platform requirements or local
repository commands. Start with the common preflight, execute every triggered playbook, and publish the cycle
status from `AI_CYCLE_STATUS_TEMPLATE.md` after each iteration.

## Common preflight

1. Load the current protocol marker, canonical standard, repository/platform map, and local instructions.
2. Inspect status/diff and preserve existing work.
3. Classify risk and affected platforms/repositories/consumers.
4. Search existing catalogs and code before creating a resource, route, event, permission, schema, component, or job.
5. Create the change contract for R2/R3 work.
6. Record acceptance criteria, required gates, rollback, and human approvals before editing.

The cycle cannot be `DONE` if a triggered playbook has an unfinished step or required unrun gate.

## Database, Prisma, migration, or persistence

Trigger: Prisma schema, SQL migration, persistent model/field/index/constraint, data lifecycle, raw query, backfill,
or tenant-owned persistence changes.

1. Confirm PLT-BIZ/PLT-IAM/other authoritative owner and search for an existing model.
2. Document tenant scope, keys, constraints, access paths/indexes, concurrency, lifecycle, audit, privacy, and
   compatibility.
3. Update the owning Prisma schema and create a new immutable migration. Never edit applied migration history.
4. Use expand/backfill/contract. Make backfill resumable, bounded, idempotent, observable, and reconcilable.
5. Add `ENABLE` and `FORCE ROW LEVEL SECURITY`, restrictive `USING`/`WITH CHECK`, and application-role behavior for
   every tenant-owned table.
6. Prove create/read/update/delete, relation/include, raw SQL and affected search/export/report/job paths with tenant
   A, tenant B, and no context over a `NOBYPASSRLS` role.
7. Test disposable-database forward migration, production-shaped volume/locks, retry/recovery, and rollback or
   roll-forward. Run data generation/typecheck/build and affected API tests.

Exit blocker: missing RLS proof, destructive transition without preflight/recovery, or untested migration makes
`DONE` impossible.

## HTTP API, event, SDK, extension, or contract

Trigger: controller/route, DTO/schema, event, package export, public type, SDK, extension API, error or compatibility
semantics.

1. Identify contract owner, all providers/consumers, supported majors, and current compatibility promise.
2. Define identity, permission, tenant/record scope, validation, canonical output/errors, idempotency, concurrency,
   deterministic pagination/order, limits, audit, and telemetry.
3. Make changes additive within a major. Breaking behavior requires R3 authority, new major, migrator, deprecation,
   sunset, usage evidence, and support-window plan.
4. Events carry version, aggregate, tenant, actor, correlation, causation, trace, and schema; publish through outbox.
   Consumers deduplicate, tolerate additive fields, reject unsupported majors, retry/dead-letter, and reconcile.
5. Regenerate clients/fixtures and run provider plus every affected consumer contract test.
6. Update contract docs, compatibility ranges, change notes, migration guidance, and traceability.

Exit blocker: an unknown consumer, missing provider/consumer test, or breaking change without approval makes status
`PARTIAL` or `NOT VERIFIED`.

## Authentication, authorization, tenancy, security, or privacy

Trigger: login/token/session/cookie, guards, permission, tenant resolution, provider/tenant control plane, support
access, sensitive data, public route, secret, rate limit, or trust-boundary change.

1. Threat-model actors, assets, entry points, privilege boundaries, abuse paths, and failure behavior.
2. Authenticate and authorize platform, tenant, permission, and record scope server-side; deny by default.
3. Keep provider `pcc.*` and tenant authority separate. Public routes document necessity and prove no protected
   data/action exposure.
4. Validate tokens, cookies, CSRF/origin, rotation/revocation, step-up, approval, break-glass, rate/resource limits,
   audit, and redaction as applicable.
5. Add positive and negative permission tests, cross-tenant/IDOR tests, no-context RLS, input-abuse tests, audit
   attribution/tamper proof, and applicable scans/DAST.
6. Record classification, purpose/legal basis, minimization, residency, retention, export/erasure/legal hold,
   encryption, redaction, and synthetic test data.

Exit blocker: UI-only authorization, unproven tenant isolation, leaked sensitive data, or weakened security gate is
never `DONE`.

## UI, UX, accessibility, or localization

Trigger: route/page/component/style/token/form/navigation/user workflow or user-visible content.

1. Confirm actor and shell boundary; use owned `@kannan19302/ui` components and semantic tokens.
2. Design loading, empty/first-use, partial, success, validation, error/retry, forbidden, not-found, degraded/offline,
   conflict/rollback, and destructive-confirmation states as applicable.
3. Cover supported widths, zoom/reflow, long/localized text, touch, themes/density, reduced motion, slow/offline, and
   locale-aware date/number/currency/unit/direction.
4. Prove semantics, name/role/state, keyboard flow, focus/restoration, contrast/non-color cues, errors/status,
   alternatives, and screen-reader behavior to WCAG 2.2 AA.
5. Run token/type/lint/unit/interaction/build gates and a real E2E journey when the behavior crosses UI/API/IAM/data.

Exit blocker: fake controls, false success, missing critical state, token bypass, or automated-only accessibility
claim prevents `DONE`.

## Test, defect fix, verification, or completion claim

Trigger: behavior change, defect, test/snapshot/golden update, coverage/gate configuration, or completion report.

1. Write the claim and choose a proof boundary that can disprove it.
2. Reproduce the defect where possible; ensure the new/changed test fails for the representative defect.
3. Cover happy, invalid/boundary, unauthorized/record/tenant denial, concurrency/idempotency, dependency failure,
   retry/reconciliation, and recovery according to risk.
4. Never weaken assertions, update snapshots blindly, skip/quarantine/exclude tests, or add sleeps/retries to hide a
   race.
5. Run focused gates, then affected repository and consumer gates. Record exact working directory/command/result.
6. Apply every `DONE` predicate. A required failure or unrun check must appear under incomplete work.

Exit blocker: “should pass,” mocked-only proof for an integration claim, coverage percentage alone, or subagent
self-attestation is `NOT VERIFIED`, not `DONE`.

## Dependency or supply-chain change

Trigger: dependency/lockfile/container/base image/action/toolchain/plugin/extension addition or upgrade.

1. Prove the capability is not already available.
2. Inspect maintenance, license, provenance, known vulnerabilities, transitive tree, size/runtime impact,
   compatibility, install scripts, and operational cost.
3. Isolate the upgrade, preserve integrity/signature/scanning gates, and review lockfile/generated churn.
4. Run affected unit/integration/build/security/license/SBOM gates and document rollback.

Exit blocker: unknown license/provenance, unresolved critical vulnerability, or unexplained lockfile churn prevents
`DONE` and may require R3 approval.

## Cross-repository or multi-agent change

Trigger: two or more repositories, published contract consumers, or concurrent agents.

1. Name one coordinating owner, contract release order, repository work packets, file ownership, and dependency
   graph. Work packets must not overlap.
2. Land contract/schema expansion first, then providers and consumers, then migration/cleanup after compatibility
   evidence. Define mixed-version behavior and rollback for every step.
3. Agents communicate shared-contract changes before dependent edits and stop on an ownership collision.
4. The coordinator independently reviews all diffs, reruns gates, verifies consumers, and publishes the only final
   aggregate status.
5. A subagent’s `DONE` means only its explicitly bounded packet; it cannot make the parent task `DONE`.

Exit blocker: overlapping edits, unreviewed subagent output, unknown consumers, or unproven mixed-version operation
makes the aggregate status `PARTIAL` or `NOT VERIFIED`.

