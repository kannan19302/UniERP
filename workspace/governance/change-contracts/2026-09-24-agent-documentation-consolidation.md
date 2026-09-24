# Agent and documentation consolidation — change contract

Date: 2026-09-24
Status: PARTIAL
Risk: R2 coordinated governance change
Owner: Architecture and engineering governance; product and platform owners retain their own requirements.

## Outcome and acceptance

- AC-01: Every active Git root has one concise `AGENTS.md` identifying its layer, owned scope, coding rules, and executable checks, with no copy of the universal protocol.
- AC-02: The workspace entrypoint names the product outcome, authority order, layer boundaries, dependency workflow, safety controls, and evidence gate once. Its governance source remains byte-for-byte synchronized.
- AC-03: Product intent, accepted ADRs, platform specifications, contracts, operational procedures, and dated evidence retain distinct authoritative owners; duplicate or historical Markdown is classified before archival or removal.
- AC-04: Agent discovery, layer, estate, and knowledge-link validators pass on the current 14-root topology; any baseline failure is reported separately.
- AC-05: Existing uncommitted implementation and documentation edits are preserved.

## Knowledge and dependency impact

Knowledge delta: UPDATED for agent routing and repository coding instructions. The governing source is `platform/workspace/governance/AGENT_ENTRYPOINT_SOURCE.md`, distributed to the workspace root; repository entrypoints are consumers. The accepted ADR-0012 14-root topology and the canonical agent protocol remain authoritative. No runtime contract, schema, permission, or deployment changes are included. The product PRD is clarified for the requested first release.

Order: governing entrypoint → L0 contracts → L1 design/shared → L2 data → L3 API/identity → L4 products → L5 clients → L7 platform operations. Validate the source and each downstream entrypoint before claiming completion.

## Preservation and cleanup policy

Keep normative product requirements, accepted ADRs, published contracts, operations procedures, and dated proof in their owning locations. Consolidate duplicated agent instructions into the governing source and repo entrypoints. Historical or generated documents may be marked non-authoritative and archived only after backlinks, consumers, and ownership are checked. Do not bulk-delete Markdown or rewrite accepted decisions to match current code.

## Current iteration evidence

- The 14 active repository entrypoints now contain only their layer, owner, repository coding rules and applicable checks. The workspace entrypoint contains shared rules. The two nested Platform agent files were archived with non-authoritative banners; their unique infrastructure checks moved into the Platform entrypoint.
- The product PRD and documentation indexes state the three customer products, two internal surfaces, customer-problem selection rule, and January 1 target. The platform catalog now routes through the 14-root topology without stale file-count claims.
- The old repo-docs checker could report success after discovering zero repositories. It now discovers 14 current roots, checks one root agent file per repository, and rejects missing owners. The enterprise-brain validator was repaired to use current paths.
- Read-only inventory found 1,024 active Markdown paths, including 976 under `platform/`. The existing 2026-09-18 disposition ledger counts 1,072 and marks 42 files for archive; several of those are referenced by active audit gates. Its archive list is historical evidence, not safe move authorization. No broad evidence/ADR/contract archive was performed.
- Passed: agent protocol validation and adversarial tests, 14-root estate test, layer test, active-estate catalog, repo entrypoint check, documentation-truth gate, enterprise-brain validation, and JavaScript syntax check. Full Markdown semantic deduplication, all-link validation, and current-status reconciliation remain open.

## Remaining documentation sequence

1. Generate a fresh 14-root Markdown inventory with owner, authority class, inbound links and content hash. Preserve dated evidence and accepted decisions.
2. Review each candidate duplicate with its owner. Move only confirmed obsolete guidance into a clearly marked archive; update inbound links and the disposition ledger in the same change.
3. Reconcile stale operational plans and generated inventories against current requirements and evidence. Keep one authoritative fact per owner; do not collapse required PRD, contract, security, operations and traceability sources into an agent prompt.
4. Run full current-topology link and authority checks, review diffs across every affected repository, and record the owner decision on any remaining conflict.

## Iteration evidence report — agent entrypoints and product routing

STATUS: PARTIALLY COMPLETE

CHANGES: workspace source/entrypoint; 14 repository agent entrypoints; current product and platform indexes; protocol source map; repaired governance checks; two archived nested Platform instructions.

VALIDATION EXECUTED: `node platform/workspace/scripts/check-repo-skills-and-docs.mjs`; `node platform/workspace/scripts/check-ai-agent-protocol.mjs`; `node platform/workspace/scripts/test-ai-agent-protocol.mjs`; `node platform/workspace/scripts/test-estate.mjs`; `node platform/workspace/scripts/test-layer.mjs`; `node platform/workspace/scripts/check-active-estate-catalog.mjs`; `node platform/workspace/scripts/check-doc-truth.mjs`; `node platform/workspace/governance/skills/unierp-enterprise-brain/scripts/validate-brain.mjs --workspace-root .`; `node --check platform/workspace/scripts/check-repo-skills-and-docs.mjs`; relevant `git diff --check` in all 14 roots.

RESULTS: Listed checks passed on 2026-09-24. The repo-docs checker previously reported a false success after finding zero repositories; its current 14-root check passed. A whole-estate Markdown semantic and link review was NOT RUN because the 1,072-entry disposition ledger predates the 14-root consolidation and has archive candidates used by active gates.

ACCEPTANCE: AC-01 PASS; AC-02 PASS; AC-03 PARTIAL (preservation and initial classification complete, full candidate review pending); AC-04 PARTIAL (named gates pass, whole-estate link review pending); AC-05 PASS.

REMAINING WORK: Rebuild the Markdown disposition inventory, review candidates with owners, archive confirmed duplicates with inbound-link updates, and rerun full documentation checks. This is not done.

NEXT ACTION: Continue the documentation disposition sequence above without deleting normative sources.

## Verification and rollback

Run the protocol, estate, layer, link, and enterprise-brain checks applicable to documentation. Review all 14 repository diffs and the platform diff. Roll back by reverting this documentation-only change; no data migration is involved. No production action, release, publication, destructive cleanup, or security-control weakening is authorized.
