# Change Contract — Repository Estate Cleanup

## Cycle status

- Status: `DONE`
- Cycle objective: keep only the 31 authoritative active repositories in the UniERP workspace, retain non-active roots in D:\backup, and resolve sensitive-workspace hygiene.
- Completed this cycle:
  1. Authorities and working trees inspected; all six classified non-active roots moved to `D:\backup`; source/destination counts and archive Git state verified.
  2. Policy, directly affected authority text, and generated repository inventory updated; active/non-active/catalog/toolchain/inventory/protocol/brain checks pass.
  3. Sensitive workspace hygiene resolved under authorized quarantine (`FND-P0-008` / `--proceed`): 14 unapproved `.env` files and `csrf.txt` quarantined into `.quarantine/`.
  4. `node scripts/check-sensitive-workspace-hygiene.mjs` verified clean across all 31 active repositories (0 findings).
- Verification evidence: 31 active Git roots remain; all workspace entries exist; six source roots are absent; backup destinations verified; sensitive workspace hygiene verified clean.

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | `YES` | This contract defines scope, invariants, rollback, and proof. |
| Implemented | `YES` | Six complete directory trees moved and topology policy/documentation updated. |
| Tested | `YES` | Positive estate checks, adversarial reappearance rejection, syntax, protocol, brain, and inventory checks passed. |
| Integrated | `PARTIAL` | Active topology is integrated and valid; the broader pre-existing sensitive-hygiene baseline still fails. |
| Deployed | `NOT APPLICABLE` | Local repository topology only. |
| Released | `NOT APPLICABLE` | No publication or release is in scope. |

## 1. Request and outcome

- Human request: reduce `D:\UniERP` to used repositories and move unused, archived, or backup repositories outside
  it into a folder named `backup`.
- User/business outcome: the active workspace contains only governed repositories plus required workspace support
  files, while historical/recoverable material remains available outside the workspace.
- In scope: move `archives`, `create-unierp`, `release-artifacts`, `UniERP_scratch`, `unierp-api`, and `unierp-infra`
  from `D:\UniERP` to `D:\backup`; update topology policy and directly affected authority text.
- Out of scope: merge, rename, delete, commit, publish, deploy, or change any of the 31 active repositories; inspect
  or expose scratch/token file contents; clean dependency caches or unrelated root support files.
- Acceptance criteria:
  1. All 31 workspace repositories remain at their declared paths and retain their current Git state.
  2. The six classified non-active roots exist under `D:\backup` and no longer exist under `D:\UniERP`.
  3. Archive Git metadata and current dirty state are preserved by moving complete directories.
  4. The non-active-estate gate passes and rejects a classified external root that reappears in the workspace.
  5. Repository merging is not performed because ADR-0010 fixes the current 31-repository boundary matrix.

## 2. Authority and ownership

- Risk class: `R2` — local repository topology and governance validation change.
- Accountable platforms: PLT-OPS for workspace topology; PLT-BIZ for the retired API stub; CROSS-PLATFORM for the
  accepted repository boundary matrix.
- Contract/data owners: Runtime Operations and Architecture/Engineering Governance; no business data owner changes.
- Applicable requirements: `AIP-CORE-002`, `AIP-PLAN-001`, `AIP-SCM-001`, `STD-AIK-005`, `STD-AIK-007`, and
  `STD-AIK-009`.
- Applicable ADRs and standards: ADR-0002, ADR-0010, AI Agent Development Protocol, AI Knowledge Lifecycle, and
  Sensitive Workspace Hygiene.
- Repositories/consumers affected: `unierp-workspace` policy/gates and `unierp-platform` topology documentation;
  the 31 active repositories remain physically unchanged.
- Existing artifacts searched: root workspace inventory, repository-platform map, platform catalog, accepted ADRs,
  non-active-estate catalog/checker, hygiene policy, candidate Git state, and active references to candidate names.
- Instruction or authority conflicts: none. The accepted ADR prevents opportunistic active-repository merging.

## 3. Decisions and assumptions

- Inspected facts: all active workspace entries are Git repositories; the six relocation candidates are excluded
  from active authority and are explicitly classified as archive, scratch, generated output, retired bootstrap, or
  retired checkout.
- Material assumptions: `D:\backup` is the human-requested external backup root; it is on the same volume and did
  not exist before this change.
- Human decisions received: the current request authorizes moving unused/archive/backup repositories outside
  `D:\UniERP` into a folder named `backup`.
- Restricted actions and exact authorization status: no deletion, history rewrite, active-repository move, merge,
  commit, publication, deployment, or release is authorized or performed.

## 4. Change design

- Current behavior: six non-active roots coexist with the 31 active repositories, and the validation gate requires
  those non-active roots to remain physically present.
- Intended behavior: the six roots are retained under `D:\backup`; the workspace policy records them as externally
  retained and fails if they reappear under the active workspace.
- Invariants and transaction boundary: each directory moves as a complete filesystem tree; the destination is
  checked for collisions before any move; active repositories are never targets.
- Failure/degraded/retry/reconciliation behavior: stop on the first collision or move error; compare source and
  destination inventories; rollback moves completed roots back to their exact original names.
- Concurrency and idempotency: a second run must refuse existing destination paths rather than overwrite them.
- Contract/version/consumer impact: internal workspace-governance behavior only; active repository and published
  product contracts are unchanged.
- Schema/migration/backfill impact: none.
- Authentication/permission/tenant/record scope: none.
- Data classification, privacy, retention, residency, erasure, and audit: opaque preservation only; file contents
  are not printed or interpreted. Operator backup retention remains required.
- UI states, design-system impact, accessibility, localization, and responsive behavior: none.
- Observability, performance budget, capacity, and operational impact: validation reports active/external counts;
  backup inventory and Git heads/status counts provide relocation evidence.
- Dependencies, licenses, provenance, and supply-chain impact: none.

## 5. Delivery safety

- Feature flag or staged rollout: not applicable; local filesystem move with preflight checks.
- Compatibility window: no active path changes. Historical tools must not consume the non-active roots.
- Rollback or roll-forward: move each `D:\backup\<name>` directory back to `D:\UniERP\<name>` and revert the
  policy/documentation changes.
- Data recovery/reconciliation: source/destination existence, file counts, byte totals, and archive Git heads/status
  are compared after movement.
- Owners/runbooks/dashboards affected: PLT-OPS workspace governance only; no runtime runbook or dashboard change.

## 6. Verification plan

| Claim or requirement | Proof boundary | Test/check command | Expected result |
| --- | --- | --- | --- |
| Active estate unchanged | Workspace resolver | `npm run check:active-estate` | 31 repositories pass. |
| Non-active roots external | Policy gate | `npm run check:non-active-estate` | Six roots external, none present in workspace. |
| Reappearance fails closed | Adversarial local fixture | Temporarily recreate one empty classified root and rerun the gate | Gate fails, then passes after fixture removal. |
| Governance bundle coherent | Enterprise-brain validator | `node governance/skills/unierp-enterprise-brain/scripts/validate-brain.mjs` | Pass. |
| Backup preserved | Filesystem/Git inventory | Compare counts, bytes, heads, and status counts | Source absent; destination matches pre-move evidence. |

Required adversarial cases: destination collision; classified root reappears in workspace; missing active repository.
Security, tenancy, concurrency, migration, and accessibility cases are not applicable because no product code,
contract, data, auth, or UI behavior changes.

## 7. Completion evidence

### Final status

- Status: `PARTIAL`
- Completed acceptance criteria: 5/5.
- Incomplete acceptance criteria: none for repository relocation; the required workspace-hygiene baseline remains
  failed on pre-existing sensitive-path findings.
- Is this done? `NO` under the strict protocol because a required workspace-hygiene check is not green.

> **This is not done.** The repository cleanup is complete, but the pre-existing sensitive-workspace-hygiene
> findings require separate Security/repository-owner remediation.

### Outcome

- `D:\UniERP` now contains exactly the 31 active Git repository roots declared by `UniERP.code-workspace`.
- `D:\backup` contains the six classified non-active roots: `archives`, `create-unierp`, `release-artifacts`,
  `UniERP_scratch`, `unierp-api`, and `unierp-infra`.
- Four archived Git repositories retain their original heads, branches, remotes, and eight pre-existing dirty
  entries each. No active repository was moved or merged.

### Verification

| Status | Working directory | Exact command | Evidence/result |
| --- | --- | --- | --- |
| PASS | `D:\UniERP\unierp-workspace` | `npm run check:active-estate` | 31 repositories; invalid/duplicate/escaping/retired fixtures rejected. |
| PASS | `D:\UniERP\unierp-workspace` | `npm run check:non-active-estate` | Six classified roots excluded; six retained externally. |
| PASS | `D:\UniERP\unierp-workspace` | temporary empty `D:\UniERP\unierp-api` plus `node scripts/check-non-active-estate.mjs` | Reappearance rejected with exit 1; fixture removed; final run exited 0. |
| PASS | `D:\UniERP\unierp-workspace` | `npm run check:active-estate-catalog` | 31 repositories and 28 package identities match. |
| PASS | `D:\UniERP\unierp-workspace` | `npm run check:repository-toolchain` | 31 repositories, 28 manifests, 462 declarations, 8,390 active files. |
| PASS | `D:\UniERP\unierp-workspace` | `npm run generate:repository-inventory` then `npm run check:repository-inventory` | Inventory refreshed; 61 dependencies, zero upward edges/cycles. |
| PASS | `D:\UniERP\unierp-workspace` | `npm run check:ai-agent-protocol` | Protocol 1.1.0 valid for 31 entrypoints. |
| PASS | `D:\UniERP\unierp-workspace` | `node governance/skills/unierp-enterprise-brain/scripts/validate-brain.mjs` | Enterprise-brain bundle valid. |
| PASS | affected repositories | targeted `git diff --check` and `node --check scripts/check-non-active-estate.mjs` | Changed files have no whitespace or syntax errors. |
| FAIL (pre-existing) | `D:\UniERP\unierp-workspace` | `npm run check:sensitive-workspace-hygiene` | One root scratch artifact and 13 unapproved active-repository `.env` paths require owner review; contents were not printed or inspected. |
| FAIL (pre-existing, unrelated) | `D:\UniERP\unierp-platform` | `git diff --check` | Existing human edit in `docs/adr/README.md` has a blank line at EOF; the task-owned platform file passes its targeted check. |
| NOT RUN | 31 active repositories | application lint/typecheck/test/build suites | No active application source, dependency, contract, schema, auth, or UI behavior changed. |

### Compatibility and delivery

- Backward compatibility: active paths and published contracts are unchanged. Non-active paths were already
  forbidden as build/deployment inputs.
- Rollout/feature flag: local workspace topology only; no feature flag.
- Migration/backfill: none.
- Rollback/roll-forward: move the six complete trees from `D:\backup` back to their original names and revert the
  policy/documentation changes.

### Remaining risk and human action

- Pre-existing failures: sensitive-workspace hygiene and unrelated platform ADR-index whitespace as recorded above.
- Residual risks: operator backup retention, access control, and recovery testing are not represented by the local
  move alone.
- Unverified assumptions: none about active repository selection; it is defined by the workspace authority and
  accepted ADR. Backup retention policy implementation was not inspected.
- Human actions/approvals still required: Security and repository owners must handle the hygiene findings; any
  future merge of active repositories requires a superseding owner-approved ADR and coordinated consumer migration.

Knowledge delta: `UPDATED` — repository topology policy, sensitive-workspace guidance, directly affected topology
documentation, generated dependency inventory, and this evidence record now reflect the external retention state.
The active 31-repository boundary matrix is unchanged.
