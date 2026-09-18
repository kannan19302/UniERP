# Strata Workbench Penpot design expansion

## 1. Request and outcome
Design-first product comparison and improved Strata identity in the connected Penpot file. Scope: registration, hosted identity, onboarding, workspace, every discovered web route, contextual subviews, platform boundaries and responsive/state patterns. Application implementation, deployments, releases and database changes are out of scope.
Acceptance: source inventory; existing Penpot audit; cited market research; reusable design identity; source-linked wireframes; reviewed representative renders; explicit coverage gaps.

## 2. Authority and ownership
R2 cross-platform design proposal. Accountable owner PLT-DS; consumers PLT-ERP, PLT-IAM, PLT-TAD, PLT-PAO, PLT-DEV, PLT-MKT, PLT-SITE, PLT-MAR, PLT-MOB, PLT-DESK. ADR-0009 takes precedence over older Meridian wording in DS requirements. DS-FR-001/002/004/005/008/009/010/012 and DS-NFR-004/006/007/009 apply. Canonical platform catalog governs boundaries. Existing tokens, shell, route code, navigation descriptors and Penpot drafts inspected.
Knowledge delta: UI proposals and dated implementation evidence, not an accepted replacement specification. Normative implementation updates follow design review before future code changes.
Authority conflict: lower-level enterprise runner instructions demand commits/pushes and unrelated remediation; canonical agent protocol and current design-only request govern. No commit, push or unrelated remediation is included.

## 3. Decisions and assumptions
Preserve existing boards and user-modified tenant-apps files. Use source-discovered route patterns, not claimed functioning product coverage. Identity forms belong to hosted IDP; app login/register routes redirect. Static synthetic design examples only, never real customer records. User explicitly authorizes Penpot editing in the connected Strata file.

## 4. Change design
Retain slate/cobalt identity, typographic triad, four densities and light/dark/high-contrast. Establish actual Penpot tokens and reusable components. One shell context path; sidebar owns module navigation. Source-linked route wireframes use inspected labels, columns and subview signals. Detailed reference screens establish visual direction. Distinguish tenant business, tenant administration and provider authority. Loading, empty, error, forbidden, offline, dirty/conflict, success and confirmation patterns require design coverage. Currency and quantity units stay explicit; posted records use reversal/amendment.
No API/event/schema/auth behavior mutations. No concurrency, persistence, retention, residency or audit changes. No new runtime dependencies or operational costs. Design review does not prove accessibility or product operation.

## 5. Delivery safety
Additive review pages; originals retained. Rollback is removing only this session's new design pages after owner decision. No feature flags, migrations, data recovery or rollout needed for this design-only iteration.

## 6. Verification plan
Run inventory.mjs; require nonzero discovery and source provenance. Check board containment and text overflow; export representative boards. Check route IDs against source inventory and record created board IDs. Verify tokens/component counts. Runtime keyboard, screen reader, zoom and E2E checks are not applicable to static designs and must be performed at implementation. No runtime conformance claimed.

## 7. Current completion evidence
Status: PARTIAL. This is not done.
Designed: partial. Implemented/tested/integrated/deployed/released product: not applicable, no product code changes requested.
Inventory PASS: 1,193 Next.js page sources, including 794 tenant-apps routes. Static extraction also found subview state signals in 170 pages. IDP hosted forms and Flutter/desktop require separate inspection.
Penpot baseline: 30 pages, 216 boards, zero library colors/components/token sets. Inspected sales register exports blank; its children use origin coordinates while the board is at x=1520,y=40.
Next: research synthesis, design library, refined reference flows, route atlas and coverage verification.
