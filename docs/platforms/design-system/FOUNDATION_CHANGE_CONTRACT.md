# Strata business foundations change contract

Status: IMPLEMENTED — final source-control handoff pending.

## Request and authority

The user requested that Strata first settle and fix its business-platform foundations using
the shadcn create preview as a UI/UX reference: Inter body and headings, Lucide icons,
default radius, and a complete choice of style, colour and related foundations.
This is an R2 shared UI change owned by PLT-DS. The explicit Inter choice supersedes
the previous mixed heading-family wording in DS-UX-010. No accepted ADR is reversed.
The work repairs existing presentation foundations; it does not authorize feature expansion,
deployment, package release, security changes or changes to business rules.

Reference inspected: <https://ui.shadcn.com/create?item=preview>, 2026-09-22.
The live preview exposed Nova, Neutral base/theme/chart colour, Inter heading/body,
Lucide, Radius Default, solid menus and subtle menu accents. These are reference settings,
not a requirement to replace Strata's palette or component implementation.

## Scope and decisions

Authoritative choices are in [EXPERIENCE.md](EXPERIENCE.md). Preserve all public package
exports, token names, component APIs, themes, density modes and native generation contracts.
Correct the Inter inconsistency in high contrast, reconcile default corner geometry, and
ensure Strata surface roles resolve from its active semantic theme rather than legacy colours.
Do not rename the package or claim a new released design-language major.

## Dependency order and consumers

1. `platform`: PLT-DS intent and this change contract (documentation authority only).
2. `design-system`: core tokens/styles/icons and focused proof; existing components consume tokens.
3. Generated native outputs in `mobile` and `desktop-app`, after upstream validation;
   inspect their instructions and diffs before mutation.
4. Registered web consumers and Storybook: verify the actual changed artifact, then report
   adoption separately from source implementation. No release is implied.

The current shared package uses CSS Modules, a core/platform tree, Lucide re-exports and
CSS token generation. Core must not acquire business logic or consumer imports.

## Acceptance ledger

| ID | Requirement | State | Evidence needed |
| --- | --- | --- | --- |
| FND-01 | All foundation choices documented, including colour, type, icons, geometry, density, layout, motion, states and accessibility | PASS | Owning experience spec and source-linked reference comparison |
| FND-02 | Inter headings and body consistent across Strata themes and supported stylesheet entrypoints | PASS | Regression gate plus loaded/computed browser font evidence in three themes |
| FND-03 | Default radius scale consistent across Strata themes and aliases | PASS | Computed 4/6/8/10/12/16px browser scale and generated Flutter parity |
| FND-04 | Surface/text/selection roles resolve to the active Strata theme | PASS | Theme-bound semantic aliases and six-theme contrast assertions |
| FND-05 | Lucide remains the single icon API, with documented sizing and stroke rules | PASS | Public icon export regression assertion and rendered examples |
| FND-06 | Compatibility and relevant quality gates pass | PASS | Node 22 lint/build/tests, Storybook build, Flutter analyze/tests |
| FND-07 | Visual examples and evidence reflect the changed implementation | PASS | Storybook foundation sample reviewed in Strata light/dark/high contrast and keyboard focus |
| FND-08 | Knowledge, diff review, iteration reporting and authorized commit/push complete | NOT VERIFIED | Traceability updated; final diff review and authorized source-control publication remain |

## Risks, rollback and knowledge delta

Radius changes affect every component that consumes those tokens; typography can change wrapping.
Theme changes must retain usable text, control boundaries, focus and status contrast. Native outputs
must be regenerated rather than edited by hand. Test root and nested theme contexts, aggregate and
token entrypoints, legacy aliases, reduced motion and high contrast.

Rollback is a normal revert of the coordinated foundation change and regenerated artifacts;
no data migration or history rewrite. No API, persistence, auth, tenant or permission changes.
Knowledge delta: UPDATED in the owning experience, change contract and traceability documents.
Prior gate failures must be reproduced and reported without weakening checks or growing baselines.
