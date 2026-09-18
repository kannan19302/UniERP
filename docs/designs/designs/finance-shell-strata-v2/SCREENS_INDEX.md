# Finance screens — Strata v2

2026-09-07 • Non-normative raster design concepts • Built-in image generation

All ten screen categories from the v1 set now have v2 counterparts. Nine were newly generated; General ledger reuses the existing v2 complete-shell image without altering it. This scope covers the ten v1 concepts, not every route or state in the implemented finance module.

## Screen index

- [Finance overview](screens/01_executive_dashboard.png)
- [General ledger](screens/02_general_ledger.png) — existing v2 ledger, copied into the complete set
- [Accounts receivable](screens/03_accounts_receivable.png)
- [Accounts payable](screens/04_accounts_payable.png)
- [Banking & treasury](screens/05_banking_treasury.png)
- [Fixed assets](screens/06_fixed_assets.png)
- [Tax & compliance](screens/07_tax_compliance.png)
- [Budget & planning](screens/08_budget_planning.png)
- [Financial reports](screens/09_financial_reports.png)
- [Finance settings](screens/10_financial_settings.png)

## Suggested next priorities

These are design proposals, not claims of existing capability or changes to approved product authority.

1. **Month-end close workspace.** Bring task owners, dependencies, reconciliations, blockers, evidence and sign-off together. Let a blocked task open the relevant journal or reconciliation in another workspace tab.
2. **Saved finance views.** Persist columns, sort, filters and density per named view. Provide My work, Needs review and All records as clearly scoped entry points. Keep selection totals and currency visible during bulk review.
3. **A consistent record inspector.** Standardize summary, source documents, approval history and next action. Make the panel collapsible and resizable so it supports investigation without crowding a full-width ledger. This follows the useful list-detail principle documented in [SAP Fiori page layouts](https://www.sap.com/design-system/fiori-design-web/v1-120/page-types/floorplan-overview), expressed through UniERP's own Strata floorplans.
4. **Reliable tab behavior.** Preserve each tab's scope, filters and draft; distinguish a saved Draft from unsaved edits; offer search and pinning; prevent accidental draft loss. Implement and test [WAI tab keyboard semantics](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) rather than treating a visual strip as finished tab support.
5. **A shared state library.** Design loading, empty, stale, partial, offline, failed-save and forbidden states together with normal states. Reuse clear recovery actions and consistent focus behavior across finance.
6. **Traceable analytics.** A metric should expose period, currency, freshness, calculation meaning and source records. Use explicit favorable/unfavorable variance semantics; an expense increase is not automatically green.
7. **Freeze the shell as reusable components.** Define one canonical spacing, icon, active-state and tab anatomy in the owning design system. Raster concepts vary; shared components should remove that variation.
8. **AI assistance only where it explains work.** A future suggestion panel could explain a match or variance with source records and confidence, requiring review before business changes. Avoid a permanent decorative AI panel that reduces table space.

Prioritize 1–4 before adding more dashboard cards or decoration.

## Visual review

Each selected output was inspected. All show the v2 app rail, grouped Finance navigation, document tabs and Strata context band, with the intended current destination/tab active. Improvements include an amber payable match-review state, an explicit future forecast interval, shorter asset depreciation schedule, neutral report variance values and no report/overview pagination.

Remaining raster limitations:
- Sidebar icon treatment, group capitalization, expansion and spacing vary; the report image omits the local Find in Finance control. Use the original v2 shell as the component source of truth.
- The overview's Current aging label includes a range overlapping its 1–30 overdue bucket. Final UI should label it Current / Not yet due. Its exception subset is not reconciled to every summary on another screen.
- Some receivables rows still say Due soon despite dates before the selected invoice's as-of date; invoice activity dates also require domain validation.
- Payables places New bill in the inspector header; implementation should position it at workspace scope.
- Asset chart ticks have generation errors; use the corrected numerical depreciation schedule as the illustration and recompute charts from authoritative data.
- Currency prefixes, timestamps and synthetic data are not fully harmonized across images.
- Exact contrast, density, typography, keyboard behavior and financial correctness cannot be certified from generated images.

## Scope and evidence

Risk R1: additive local image concept work. Owners PLT-ERP and PLT-DS. Knowledge delta UPDATED: this non-normative screen index, recommendations and [generation prompts](SCREENS_PROMPTS.md). No authoritative requirement, code, schema, public contract or deployment changed.

Authorities: accepted ADR-0009, Design Platform EXPERIENCE.md, Tenant Apps EXPERIENCE.md, project enterprise-brain and Strata skills (read earlier in this task). Existing v2 shell is the visual reference, while v1 supplies workflow content.

Protocol 1.1.0 cycle status: DONE for the ten-screen v1-to-v2 concept adaptation.
Objective: complete the pending v1 image categories in the v2 shell and provide design suggestions.
Completed: 10/10 counterpart images, visual inspection, file integrity checks, index and suggestions.
Incomplete within image-delivery scope: none.
Designed YES; implemented/integrated/deployed/released NOT APPLICABLE.
Tested: visual and artifact checks only, not application testing.
PASS: nine image generations succeeded; existing v2 ledger copied; all ten PNGs have positive dimensions (nine 1608x978, report 1609x978).
PASS: Get-FileHash before/after comparison confirmed all 20 pre-existing v1/v2 files unchanged. New files were copied with overwrite disabled.
PASS: final additions reviewed for scope. Only new screen artifacts and documentation added.
FAIL: none in artifact checks.
NOT RUN: app build/typecheck/lint, token, accessibility and E2E gates; no executable UI was changed.
No migration, contract, authorization, tenant-isolation or runtime impact. Synthetic data only.
Next required action: none for image delivery. Any implementation needs a separately scoped change contract, canonical component alignment and behavioral verification.

