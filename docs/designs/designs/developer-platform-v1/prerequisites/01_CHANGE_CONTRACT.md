# Developer Platform v1 — design and implementation handoff contract

Date: 2026-09-08. Package status is recorded in ../evidence/VERIFICATION.md. This is an R2 cross-platform design/planning handoff with R1 additive file effects, not authorization to implement or deploy all planned behavior.

## 1. Request and outcome

Consolidate the selected 76 designs, order them by user journey, close enterprise design gaps, and supply end-to-end product, architecture, security and delivery prerequisites. Deliver 108 selected screens: 76 consolidated plus 32 additions. Preserve the previous folders and selected source bytes. One design folder contains one selected PNG per screen, with explicit old-to-new IDs.

Acceptance: 108 selected images; all 76 earlier IDs mapped once; 32 gap treatments reviewed; complete prerequisite suite; screen/story/requirement traceability; actual repository/API/model observations; valid links and image files; preserved baseline; candid readiness decision. No product code, migration, remote message, commit, push, deployment or contract publication is in scope.

## 2. Authority and ownership

Accountable product: PLT-DEV; website lifecycle PLT-SITE; policy PLT-TAD; identity PLT-IAM; commercial marketplace PLT-MKT; domain data PLT-BIZ; UI PLT-DS; recovery/runtime PLT-OPS. Repositories are listed in 04_ARCHITECTURE.md. Applicable DEV/SITE FR/NFR, DEV-SEC/API/DATA/INT requirements and accepted ADR-0005/0006/0007/0009 are linked in 00_START_HERE.md.

Inspected: owning specifications, accepted portability matrix, canonical artifact contracts, builder definitions, Developer controllers, Prisma metadata models, sandbox boundary, package scripts and readiness records. Existing artifacts take precedence over invented replacements. The older raster handoff used frontend registry scopes as intended portability; that is corrected here: the accepted portability matrix is controlling, while registry mismatch is implementation drift.

## 3. Decisions and assumptions

The user authorized additive consolidation, additional raster designs and comprehensive prerequisite documents. Sources are copied, never moved or deleted. The name v1 is the version of this consolidated handoff, not a downgrade of source artwork. New capabilities outside owning requirements are explicit proposal requirements DP-RQ-* and cannot silently become accepted product scope.

Current DevProject identifies exactly one APP or SITE; a unified home and document tabs can span projects. Earlier multi-surface overview imagery is presentation grouping, not permission to remove the project-kind constraint. A durable multi-app solution container requires a separate accepted decision. Broad implementation and production remain NO-GO under the inspected prerequisite audit until their continuation gates pass.

## 4. Change design and invariants

No executable application changes. Proposed implementation retains immutable revisions, packages, installations and release locks; server tenant/record authorization; atomic state/outbox writes; append-only required audit; recoverable durable operations; optimistic concurrency and request idempotency. Library linking preserves source ownership; fork creates new ownership; overlays remain consumer-owned. Runtime serves verified local bundles independently of authoring availability, subject to security-policy freshness.

Failure behavior includes validation, forbidden, stale revision, duplicate intent, worker loss, partial deployment, revocation and offline conflict. Concrete test cases, contract fields and lifecycle transitions are in 05/06/10/11. No new schema or endpoint is published by this folder. Data classification, retention, residency, erasure and recovery must be closed per resource before implementation. No real secrets or business data are used in designs.

Strata light concepts use canonical floorplans, document tabs and contextual inspectors. Deterministic implementation must use approved UI tokens/components and pass keyboard, screen-reader, reflow, RTL and contrast proof. The static gallery is a local document viewer, not a shipped product shell. NFR targets are proposed qualification budgets, not measured achievements.

## 5. Delivery safety

Begin with authority/readiness closure and two isolated pilots, then migrate builders in controlled waves. No broad release until proof. Use immutable build artifacts and exact dependency locks; feature availability follows server capabilities. Compatibility windows require published owner decisions. Rollback only where data compatibility permits; otherwise forward recovery. Keep source revisions and independent library resources during archive/import/restore.

## 6. Verification plan

| Claim | Boundary | Expected proof |
| --- | --- | --- |
| Consolidation | Source/target SHA256 | 76 identical selected copies and complete old/new map |
| Enterprise additions | Generated PNG + visual review | 32 selected, readable and coherent screens |
| Coverage | Manifest/story/requirement graph | 108 unique contiguous IDs; no unmapped screen |
| Preservation | Initial baseline hashes | Zero modifications to previous design files |
| Handoff | Links, JSON/CSV, source inventory | No missing links, empty discovery or invented implementation evidence |
| Future runtime | Real API/DB/browser/workers | Tenant A/B/no-context, denied roles, duplicate/concurrent writes, timeout/recovery, migration and accessibility evidence |

## 7. Knowledge delta and completion

Knowledge delta UPDATED in this dated design proposal and planning evidence. Normative authorities remain at their owning paths and are linked rather than replaced. Publishing any new requirement or changing an accepted boundary is a future owner-governed change. Final outcome, acceptance counts and exact checks are in ../evidence/VERIFICATION.md. Development-readiness gates and decisions are in 15_DECISIONS_AND_READINESS.md.

The market runner was inspected but is unsuitable as this package's verification command: its direct execution commits/pushes all repositories and writes a ledger, and some market metrics are static claims. No such action is authorized here. Use scoped evidence checks; do not treat that runner's percentages as runtime proof.
