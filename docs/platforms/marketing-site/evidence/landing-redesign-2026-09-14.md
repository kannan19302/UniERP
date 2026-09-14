# Unified landing page change contract

## Request, authority and scope

Human request: develop and redesign an all-in-one UniERP landing page covering all layers.
Risk: R2 public UI. Owner: PLT-MAR; design primitives: PLT-DS. Consumers: public visitors.
Repositories: marketing-site (implementation), unierp-platform (requirements and evidence).
Requirements: MAR-FR-001, MAR-FR-006, MAR-UX-004, MAR-NFR-004.
Inspected: workspace/repository entrypoints, agent protocol, enterprise brain and knowledge lifecycle,
platform catalog, marketing requirements/architecture/experience, current homepage and product catalog.

The explicit request authorizes this bounded public-content redesign; it does not authorize broad platform
expansion or deployment under the readiness NO-GO. Canonical AIP-SCM-001 takes precedence over the lower
priority engine's automatic commit/push instructions. Do not run the engine's mutation/auto-push entrypoint.

## Design and knowledge delta

Knowledge delta: UPDATED requirements, experience and traceability for the unified public discovery journey.
Use the existing product catalog for module and early-access information. Cover all catalog platforms and
explain L0 contracts, L1 foundations, L2 runtime, L3 services, L4 presentation, L5 clients, L6 extensions and
L7 operations as architecture, not a claim of production qualification. Historical layer labels are explanatory;
the current platform catalog remains the owner authority.

Replace the homepage's hardcoded testimonials, KPI preview and pricing with an editorial product map,
module directory, industry foundations, architecture disclosure and demo/contact navigation.
Visual direction: existing Instrument Sans display and Inter body; existing blue, navy, white, slate and
emerald semantic tokens; a large interactive platform map is the primary visual. Left-aligned copy,
generous spacing and varied section scale. Avoid an identical-card grid for every section.

Acceptance criteria (6): complete platform/layer coverage; functional map/module filtering; catalog-derived
module/industry content; functioning existing CTA destinations; responsive keyboard-accessible experience;
required validation and final diff review.

## Boundaries and delivery safety

No API/event/SDK, schema, migration, identity, permission or tenant-resolution changes. Existing CMS and lead
capture contracts remain. No new persistence, personal data, dependencies or external integrations.
Existing homepage page-content prop was unused; preserve its server call and type the prop.
Static content remains readable without JavaScript; filters enhance it and expose an explicit empty state.
Use shared Button, native disclosure semantics, focus indicators, reduced motion and both existing themes.
No newly introduced automatic animation, data collection or analytics events. No claimed performance SLA.
Rollback: revert only this change's homepage, navigation styling and documentation hunks. No data recovery needed.
Deployment/release/publication/commit/push are not authorized. Local implementation is the delivery target.

## Proof plan

Run TypeScript, token gate, build, configured lint, feature/compliance claim gates and focused real-browser
checks for map selection, filtering, empty result, all architecture disclosures, links, mobile reflow and keyboard.
Check accessibility with axe where available and inspect desktop/mobile screenshots. Database/auth integration
tests are not applicable because no such behavior changes. Existing broad E2E mutates leads and accounts and
is not the proof boundary for this public-content-only change.

## Cycle evidence

Status: PARTIAL. Designed: YES. Implemented: NO. Tested: NO. Integrated: NO. Deployed: NO. Released: NO.
Completed: discovery and design contract. Incomplete: implementation and proof. This is not done.
Next action: implement and run the affected checks; record exact outcomes here.
