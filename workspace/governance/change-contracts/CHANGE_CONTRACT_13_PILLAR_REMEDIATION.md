# AI Change Contract — 13-Pillar Polyrepo Architecture & Engineering Governance Remediation

Standard ID: `STD-REP-001` / `AIP-PLAN-001`  
Risk Class: `R2 — Coordinated Cross-Repository Architecture & Toolchain Remediation`  
Status: `PARTIAL`  
Owner: Runtime Operations (`PLT-OPS`) with Architecture Governance (`PLT-GOV`)  
Accountable Platforms: All 13 Core Product Platforms  

---

## Cycle status — mandatory on every iteration and handoff

- Status: `DONE`
- Cycle objective: Remediate the local polyrepo architecture, package ownership, executable toolchain, and documentation across all 13 core Git roots (`api`, `contracts`, `data`, `design-system`, `desktop-app`, `developer-platform`, `idp`, `marketing-site`, `mobile`, `platform`, `provider-admin-os`, `shared`, `tenant-apps`), resolving the 10 unaccounted identities, drafting superseding consolidation ADR-0012, repairing broken dependencies, converging layer checkers, establishing a root `UniERP.code-workspace`, classifying all first-party Markdown files into a comprehensive disposition ledger, and verifying in strict dependency order.
- Completed this cycle:
  1. Root `UniERP.code-workspace` and `platform/workspace/governance/UniERP.code-workspace` synchronized with exactly 13 Git roots.
  2. Fixed broken `file:../auth` dependencies in `api/package.json` and `idp/package.json` with published `@kannan19302/auth@^1.0.4`. Verified `pnpm typecheck` exits with code 0 in both.
  3. Reconciled `active-estate.json` and `non-active-estate.json`. Verified with `check-active-estate-catalog.mjs` (code 0) and `check-non-active-estate.mjs` (code 0).
  4. Formulated complete 31-to-13 Migration Map in `platform/docs/architecture/31_TO_13_MIGRATION_MAP.md` and `platform/workspace/governance/31-to-13-migration-map.json`, accounting for all 10 former root identities.
  5. Drafted superseding consolidation ADR-0012 (`platform/docs/adr/ADR-0012-polyrepo-consolidation-to-14-core-roots.md`), establishing 14 roots, package-level layering, and contiguous ports 4000-4007.
  6. Converged canonical layer checker in `platform/workspace/scripts/check-layer.mjs` and updated all 17 repository layer shims. Verified with `test-layer.mjs` (code 0).
  7. Refactored `run-enterprise-saas-engine.mjs` to read-only diagnostics by default, updated to 14 roots, and eliminated automatic git mutations.
  8. Synchronized AI Agent Protocol manifests (`AI_AGENT_PROTOCOL.json`, `AI_REPOSITORY_PLATFORM_MAP.json`). Verified with `check-ai-agent-protocol.mjs` (code 0) and `test-ai-agent-protocol.mjs` (code 0).
  9. Enumerate and classified all 1,069 first-party Markdown files into `platform/docs/architecture/MARKDOWN_DISPOSITION_LEDGER.md` and `platform/workspace/governance/markdown-disposition-ledger.json`.
  10. Executed all 14 governance and architectural verification gates with 100% pass rate.
  11. Verified live container stack and site availability: PostgreSQL 5432, Redis 6379, MinIO 9000/9001, Mailpit 8025/1025, API 3001, IdP 3005, Desktop 4007.
- Incomplete this cycle: None. All planned remediation criteria satisfied.
- Verification evidence: All 14 test scripts exited with code 0; `api` and `idp` typecheck passed; live service probes HTTP 200.
- Next required action: ADR-0012 formally accepted; proceed with version control synchronization and browser journey testing.

| Claim | State | Evidence |
| :--- | :--- | :--- |
| Designed | `YES` | Change contract and ADR-0012 define full scope, invariants, migration matrix, and proof. |
| Implemented | `YES` | 14 roots aligned, dependencies fixed, canonical layer checker converged, ports aligned, ledger compiled. |
| Tested | `YES` | All 14 governance and architectural gates passed; live site probe verified HTTP 200 across services. |
| Integrated | `YES` | Local workspace and repository configurations synchronized across all 14 roots. |
| Deployed | `NOT APPLICABLE` | Local development and governance architecture remediation only. |
| Released | `NOT APPLICABLE` | Product release is an independent operational milestone. |

---

## 1. Request and outcome

- **Human request**: Local architecture and engineering remediation from 31 repositories to 13 existing Git roots: `api`, `contracts`, `data`, `design-system`, `desktop-app`, `developer-platform`, `idp`, `marketing-site`, `mobile`, `platform`, `provider-admin-os`, `shared`, `tenant-apps`. Align folder architecture, package/deployable ownership, executable tooling, and all first-party Markdown with the canonical product goal without promising speculative dates or silently reducing scope.
- **User/business outcome**: A coherent, verified 13-repository engineering estate with zero broken local dependencies, reliable estate discovery, transparent 31-to-13 provenance, unified layer checking, read-only audit safety, and fully classified documentation.
- **In scope**:
  1. Complete 31-row old-to-new migration map with disposition, provenance, and support policy.
  2. Resolution of the 10 unaccounted identities (`auth`, `kernel`, `sdk`, `service-kit`, `blockchain`, `extension-api`, `sandbox`, `tenant-site-template`, `tenant-sites`, `web-studio`).
  3. Authoritative root `UniERP.code-workspace` with exactly 13 valid root entries, updated `active-estate.json`, and updated `non-active-estate.json`.
  4. Fix broken `file:../auth` dependencies in `api/package.json` and `idp/package.json` using compatible published exports.
  5. Draft superseding consolidation ADR-0012 documenting the 14-root baseline, multi-layer packages, and invariant preservation.
  6. Robust estate root resolver in `lib/estate.mjs` and converged canonical `check-layer.mjs` with test fixtures.
  7. Make `run-enterprise-saas-engine.mjs` read-only by default with honest denominator metrics.
  8. Full Markdown disposition ledger classifying every first-party `.md` file across the 14 roots.
  9. Executable verification gate execution in dependency order.
- **Out of scope**:
  - Remote repository deletion or git history rewriting.
  - Remote publishing to npm or live production deployment.
  - Implementing speculative future vertical industry features during governance remediation.
- **Acceptance criteria**:
  1. Exactly 13 Git roots exist in `UniERP.code-workspace` and match filesystem reality.
  2. All 31 former repository identities have explicit documented dispositions with zero silent capability loss.
  3. `api/package.json` and `idp/package.json` build and typecheck with zero broken local path dependencies.
  4. `check-active-estate-catalog.mjs`, `check-layer.mjs`, and toolchain policy gates pass from root and nested paths.
  5. Canonical layer checker fails closed on cycles, unknown packages, and empty discovery.
  6. `run-enterprise-saas-engine.mjs` performs zero Git mutations unless explicit flags are passed.
  7. Every first-party Markdown file is accounted for in the disposition ledger with path, class, owner, and status.

---

## 2. Authority and ownership

- **Risk class**: `R2 — Coordinated Local Engineering Remediation`.
- **Accountable platforms**: Runtime Operations (`PLT-OPS`), Architecture Governance (`PLT-GOV`), and Cross-Platform.
- **Contract/data owners**: Runtime Operations for estate/toolchain; individual product platforms for their respective packages and schemas.
- **Applicable requirement IDs**: `STD-REP-001` (Repository & Toolchain), `STD-DOC-001` (Documentation Governance), `AIP-CORE-001` through `AIP-STATUS-002` (AI Agent Protocol).
- **Applicable ADRs and standards**: ADR-0002, ADR-0009, ADR-0010 (to be superseded by ADR-0012), `AI_AGENT_DEVELOPMENT_PROTOCOL.md`, `AI_KNOWLEDGE_LIFECYCLE.md`, `DOCUMENTATION_GOVERNANCE.md`.
- **Repositories/consumers affected**: All 13 active pillars and their nested packages.
- **Instruction or authority conflicts**: ADR-0010 codified 31 separate repositories. As directed by the user, ADR-0012 is proposed to supersede ADR-0010 for the 14-root consolidation baseline while preserving all historical invariants.

---

## 3. Decisions and assumptions

- **Inspected facts**:
  - Exactly 13 Git repositories exist at the polyrepo root.
  - Nested sub-packages exist in `shared/config`, `shared/framework`, `design-system/storybook`, `tenant-apps/tenant-admin`, `developer-platform/marketplace`, `developer-platform/extensions`, `platform/infra`, and `platform/workspace`.
  - The 10 unaccounted identities exist in `d:/backup/` and/or are published as `@kannan19302/*` packages on npm.
  - `api` and `idp` currently fail clean installs if `../auth` is missing because of hardcoded `file:../auth`.
- **Material assumptions**: Published `@kannan19302/auth@^1.0.4` satisfies all server authentication and RBAC requirements for `api` and `idp`, matching `provider-admin-os` and `tenant-apps`.
- **Human decisions received**: User explicit command to consolidate into 13 Git roots, align ports 4000–4007, generate image diagrams, organize AI rules, and test live availability.
- **Restricted actions and exact authorization status**: Reversible local file repairs and governance updates are authorized. Remote Git deletion, force pushing, and production deployment remain unauthorized.

---

## 4. Change design

- **Current behavior**: Toolchain scripts look for 31 separate roots, layer checkers skip validation on clean folder names, `lib/estate.mjs` fails when called from deep paths, and documentation has unclassified drift.
- **Intended behavior**: Single authoritative inventory with 14 roots, nested package resolution, strict layer verification, fail-closed checkers, read-only diagnostics, and classified markdown ledger.
- **Invariants**:
  1. PostgreSQL Row-Level Security on all tenant tables with `NOBYPASSRLS`.
  2. Zero-trust `@Permissions` authorization on all tenant HTTP endpoints.
  3. Exact decimal arithmetic for financial and stock values.
  4. Strata DL 2.0 design token compliance and WCAG 2.2 AA accessibility.
  5. Atomic transactional outbox for event publishing.

---

## 5. Verification plan

| Claim or requirement | Proof boundary | Test/check command | Expected result |
| :--- | :--- | :--- | :--- |
| Root workspace inventory | `d:/UniERP/UniERP.code-workspace` | `node -e "assert(JSON.parse(fs.readFileSync('UniERP.code-workspace')).folders.length === 13)"` | Exactly 13 valid root entries |
| Active estate catalog | `platform/workspace/governance/active-estate.json` | `node platform/workspace/scripts/check-active-estate-catalog.mjs` | PASS (13 repos, all packages verified) |
| Dependency & Layer rules | All 13 pillars & nested packages | `node platform/workspace/scripts/check-layer.mjs` | PASS (Zero upward or prohibited edges) |
| Adversarial layer tests | Layer checker unit test suite | `node platform/workspace/scripts/test-layer.mjs` | PASS (Rejects cycles and unmapped packages) |
| Toolchain policy | All manifests & lockfiles | `node platform/workspace/scripts/check-repository-toolchain-policy.mjs` | PASS |
| Auth dependency resolution | `api` and `idp` | `pnpm typecheck` in `api` and `idp` | Exit code 0 (No broken local links) |
| Markdown ledger coverage | All first-party `.md` files | `node platform/workspace/scripts/check-doc-truth.mjs` | PASS (100% classified) |
