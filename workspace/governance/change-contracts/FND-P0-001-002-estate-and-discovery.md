# Change Contract — FND-P0-001 and FND-P0-002

## Cycle status

- Status: `PARTIAL`
- Cycle objective: establish current estate discovery and repair the audited false-green architecture/governance
  gates that relied on retired repository topology.
- Completed this cycle: FND-P0-001 local acceptance is complete; FND-P0-002 discovery, immutable-reference and module
  boundary implementation is complete in the working tree with adversarial proof.
- Incomplete this cycle: downstream reusable-workflow callers are pinned to the latest committed workspace revision,
  not these uncommitted edits. Exact-commit integration requires a reviewed workspace commit followed by a coordinated
  pin refresh; committing or publishing was not authorized. Remaining P0 work is tracked separately.
- Verification evidence: 31 repositories/28 manifests reconcile; dependency graph has zero upward edges/cycles;
  workflow inventory has zero mutable/unregistered references; schema ownership scans 2,033 models; API boundary gate
  scans 1,788 files with zero violations; discovery fixtures reject zero/missing/rogue targets.
- Next required action: review and commit the workspace governance revision, refresh the registered workspace SHA in
  all callers, then run the same gates in CI on that exact revision.

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | `YES` | FND-P0-001/002 in the remediation plan; current workspace inventory and failed gate evidence inspected. |
| Implemented | `YES` | Shared estate resolver, toolchain/non-active estate catalogs, fail-closed discovery gates, immutable workflow pin manifest and zero-baseline API module boundary are present. |
| Tested | `YES` | Positive and adversarial local gates passed on 2026-08-29; exact commands are recorded below. |
| Integrated | `PARTIAL` | Local consumers use current paths and pins; remote callers cannot reference the uncommitted workspace revision yet. |
| Deployed | `NOT APPLICABLE` | Local governance/tooling change only. |
| Released | `NOT APPLICABLE` | No release requested. |

## 1. Request and outcome

- Human request: start and complete the P0–P3 foundation plan.
- User/business outcome: trustworthy, fail-closed engineering governance before broad feature expansion.
- In scope: FND-P0-001 estate truth and FND-P0-002 discovery/gate correction in the active workspace.
- Out of scope: production mutation, release, data migration, dependency upgrade, security-control weakening and
  unrelated user changes.
- Acceptance criteria:
  1. A single shared resolver derives active repositories from `UniERP.code-workspace`.
  2. Selected architecture/governance gates use current paths and fail on missing/zero discovery.
  3. API architecture checking has an executable boundary-gate entrypoint.
  4. Tests demonstrate real-estate success and malformed/missing-estate failure.
  5. No gate suppresses failed build/test commands as “no target.”

## 2. Authority and ownership

- Risk class: `R2`.
- Accountable platforms: PLT-OPS for delivery/governance; PLT-BIZ for API/data boundary gates.
- Contract/data owners: Runtime Operations and Data and Business Services.
- Applicable requirements: FND-P0-001, FND-P0-002; `STD-AIK-001` through `STD-AIK-007`.
- Applicable ADRs and standards: ADR-0001/0002/0003/0004, AI agent development protocol, AI knowledge lifecycle,
  documentation governance, quality/testing and reliability/operations standards.
- Repositories/consumers affected: `unierp-workspace`, `api`; all CI consumers of shared workspace gates.
- Existing artifacts searched: current workspace inventory, repository-platform map, audit/retention/schema/doc/module
  gates, reusable CI/application gate, API package scripts, previous audit evidence.
- Instruction or authority conflicts: existing scripts reference retired topology while the workspace inventory is
  authoritative. The current active estate wins; retired paths are treated as defects, not compatibility aliases.

## 3. Decisions and assumptions

- Inspected facts: active repository names are declared by `UniERP.code-workspace`; several gates scan zero files or
  fail because they use retired `unierp-*`/`apps/*` paths.
- Material assumptions: `api`, `data`, `framework`, `idp`, `shared`, `tenant-apps`, and `marketing-site` are the
  current delivery directories corresponding to legacy names observed in scripts.
- Human decisions received: proceed with P0–P3 foundation remediation.
- Restricted actions: no production/staging mutation, deployment, release, destructive cleanup, credential access or
  public contract break is authorized.

## 4. Change design

- Current behavior: each script reconstructs filesystem topology independently; missing roots often yield zero scans
  and green output.
- Intended behavior: shared resolver validates the canonical workspace inventory and each migrated gate explicitly
  requires its repositories and a nonzero discovery result.
- Invariants: workspace inventory is the only active repository list; no retired path silently maps to a live path;
  a missing required root or zero scanned source is a failure.
- Failure/degraded/retry/reconciliation behavior: commands return nonzero with the exact missing repository/path or
  discovery count; no automatic fallback to retired topology.
- Concurrency and idempotency: read-only checks; no shared state mutation.
- Contract/version/consumer impact: internal tooling contract only; existing command names are preserved where
  feasible and wrappers are added for API invocation.
- Schema/migration/backfill impact: none.
- Authentication/permission/tenant/record scope: none; subsequent P0 items depend on truthful discovery.
- Data classification/privacy/retention/audit: source paths only; no business data is read or emitted.
- UI/accessibility/localization: none.
- Observability/performance/capacity: commands report discovered repository/file/model counts; recursive scans skip
  generated/vendor directories.
- Dependencies/licenses/provenance: Node built-ins only; no dependency change.

## 5. Delivery safety

- Feature flag or staged rollout: commands are additive until callers are migrated; no CI workflow is changed to
  invoke an unproven command in this slice.
- Compatibility window: existing command names remain available; stale commands are corrected in place only when
  they are already false-green.
- Rollback: revert the tooling/docs changes; no data or deployed state is altered.
- Data recovery/reconciliation: not applicable.
- Owners/runbooks/dashboards: Runtime Operations owns shared scripts; Data and Business Services validates data/API
  gate semantics.

## 6. Verification plan

| Claim | Proof boundary | Test/check command | Expected result |
| --- | --- | --- | --- |
| Estate parses all active repositories | Shared resolver | `node scripts/test-estate.mjs` | 31 current repositories discovered; invalid/empty fixture rejected. |
| Audit and retention checks scan active source | Shared gates | `node scripts/check-audit-immutability.mjs --verify`; `node scripts/check-retention-architecture.mjs --verify` | Nonzero files scanned or real violations reported. |
| Schema ownership scans active estate | Shared gate | `node scripts/ci/check-schema-ownership.mjs --verify` | Nonzero models scanned; unauthorized models fail. |
| Documentation truth inspects authoritative docs | Shared gate | `node scripts/check-doc-truth.mjs` | Nonzero documents/references scanned or actionable failure. |
| Module boundaries use current API root | API command | `pnpm architecture:check` | Shared boundary check runs before dependency-cruiser. |

Required adversarial cases:

- malformed or empty workspace inventory;
- required repository absent;
- zero source discovery;
- a temporary unauthorized Prisma model fixture;
- a temporary forbidden audit/retention mutation fixture;
- a direct cross-module import not present in the legacy baseline.

## 7. Completion evidence

- `node scripts/check-non-active-estate.mjs` — PASS, six explicitly classified non-active roots excluded.
- `node scripts/check-repository-toolchain-policy.mjs` — PASS, 31 repositories and 28 manifests.
- `node scripts/generate-repository-inventory.mjs --check` — PASS, 61 internal dependencies, zero upward edges/cycles.
- `node scripts/test-discovery-gates.mjs` — PASS, zero/missing/rogue fixtures rejected.
- `node scripts/check-workflow-immutability.mjs --test` and default mode — PASS, zero mutable/unregistered references.
- `node scripts/ci/check-schema-ownership.mjs --verify` — PASS, 2,033 models across 46 Prisma files.
- `node ../api/scripts/check-module-boundaries.mjs` — PASS, 1,788 files and zero legacy/new violations.
- `node governance/skills/unierp-enterprise-brain/scripts/validate-brain.mjs` — PASS.

Knowledge delta: `UPDATED`. `STD-REP-001`, machine policy, active/non-active estate catalogs, generated dependency
inventory, workflow pin registry, API common/platform ownership and this change contract now describe current
behavior. The enterprise-brain routing itself did not change.

> **This is not done.** FND-P0-001 is locally complete; FND-P0-002 remains integration-partial until downstream
> callers pin a committed revision containing these changes and exact-commit CI passes.

## Amendment — workflow immutability inventory

P0-002 now includes an active-estate workflow reference inventory. The checker considers a GitHub action or reusable
workflow immutable only when it uses a full 40-character commit SHA; local actions and digest-qualified Docker
actions are outside this checker’s GitHub-reference scope. It fails on moving branches and version tags such as
`@main` and `@v4`, with no baseline. Synthetic pinned/mutable fixtures verify it. The inventory must be resolved
through an owner-approved pin manifest or independently verified upstream commit identities; local source revision
alone is not proof of a remote workflow reference. This addition remains read-only and does not publish, deploy or
change external workflow state.
