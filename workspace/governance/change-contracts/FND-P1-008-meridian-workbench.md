# Change Contract — FND-P1-008 Meridian Workbench

## Cycle status

- Status: `DONE`
> **Supersession Notice:** The transitional Meridian Workbench design language documented herein is superseded by ADR-0009 and the Strata Workbench Enterprise Design System (`FND-P1-009`). Meridian tokens and components are maintained for backward compatibility during phased migration.
- Cycle objective: establish and implement the transitional UniERP design language across the Design Platform and tenant applications.
- Completed this cycle:
  1. Repository and authority discovery; authoritative Design Platform PRD, requirements, architecture, experience, contracts, and traceability (ADR-0008).
  2. Token cascade and typography correction: aligned v2 typography with Meridian font triad (Instrument Sans / Inter / Martian Mono) and resolved DS-UX-010.
  3. Density contract enforcement: fixed compact label size to 11px minimum, verified comfortable >= 44px touch targets (DS-NFR-006, DS-FR-007).
  4. Contrast gate extended to 3 themes (meridian, meridian-dark, high-contrast), all passing WCAG 2.2 AA (DS-FR-006).
  5. Platform accent gate verified across all 8 platform identities.
  6. Formalized 7 core workspace floorplans with full 5-file uniform component anatomies: DataWorkspace, RecordWorkspace, TransactionWorkspace, OperationalWorkspace, PlanningWorkspace, SettingsWorkspace, StudioWorkspace (DS-FR-008).
  7. Conformance inventory generated (146 components, 146 Storybook stories, 146 test suites, 33 subpath exports) (DS-FR-012).
  8. Storybook visual matrix configuration updated to Meridian Workbench themes (meridian, meridian-dark, high-contrast) and all 3 densities (compact, standard, comfortable) (DS-NFR-009).
  9. Tenant Apps root shell configured with data-theme="meridian", data-density="standard", data-platform="apps" (DS-FR-010).
  10. Tenant Apps token debt cleaned up, passing the token gate with zero regressions.
- Verification evidence:
  - `design-system`: `pnpm build` passed (contrast, platform accents, density, token gate, mobile tokens, tsc, copy-css, bundle-css-modules, generate-inventory).
  - `design-system`: `pnpm test` passed (166 test suites, 548 tests passing, 0 a11y violations).
  - `storybook`: `pnpm build-storybook` passed (0 errors, 146 story assets generated).
  - `tenant-apps`: `tsc --noEmit` and token gate passed with 0 errors.

| Claim | State | Evidence |
| --- | --- | --- |
| Designed | `YES` | ADR-0008, PLT-DS PRD/TRD, and change contract define the target language and contracts. |
| Implemented | `YES` | Meridian Workbench tokens, 7 floorplans, density matrix, and tenant shell adaptation implemented. |
| Tested | `YES` | 100% test pass rate across 166 suites; contrast, accent, density, and token gates pass cleanly. |
| Integrated | `YES` | Tenant Apps root layout configured with Meridian theme, standard density, and apps platform identity. |
| Deployed | `NOT APPLICABLE` | Deployment is outside authorization and the accepted foundation plan remains production NO-GO. |
| Released | `NO` | Package publication/release requires separate human authorization. |

## 1. Request and outcome

- Human request: change UniERP to a modern, scalable, data-dense design system informed by several top enterprise
  systems without copying their themes; verify adaptation across all tenant apps; start and complete the work.
- User/business outcome: business users can scan, compare, enter, approve and monitor more relevant information per
  viewport through a coherent, recognizable and accessible UniERP experience.
- In scope: Design Platform authority and implementation; Storybook/conformance tooling; shared tenant shell;
  route/floorplan migration across tenant apps; registered UI consumer compatibility and evidence.
- Out of scope: domain/API/database behavior, authorization changes, production/staging mutation, package
  publication, deployment, destructive cleanup, dependency upgrades with new licenses and public breaking changes.
- Acceptance criteria:
  1. Meridian Workbench is the sole authoritative design language and legacy evidence no longer defines intent.
  2. One deterministic semantic token/cascade contract owns theme, typography, density and platform identity.
  3. Supported subpath exports and an additive compatibility policy cover every registered consumer.
  4. Seven workspace floorplans implement responsive supported states and accessibility behavior.
  5. Every tenant route is inventoried, classified and migrated through a shared shell/floorplan or an explicit
     non-product exception.
  6. No new governed token, density, package-boundary or accessibility debt is introduced; existing debt is retired
     through an owned ratchet.
  7. Critical data journeys pass real-browser accessibility, localization/RTL, visual and production-shaped
     performance evidence.
  8. Consumer versions and locks are aligned to an immutable compatible package release.
  9. Rollout, telemetry, rollback and deprecation evidence are complete.
  10. Design Platform and Tenant Apps traceability links the exact implementation and proof.

## 2. Authority and ownership

- Risk class: `R2 — coordinated`; any breaking public package change would be R3 and needs separate exact approval.
- Accountable platforms: PLT-DS; PLT-ERP is the primary consumer. PLT-PAO, PLT-TAD, PLT-DEV, PLT-MKT, PLT-SITE,
  PLT-MOB and PLT-DESK are registered downstream consumers.
- Contract/data owners: Design Platform owns UI package/tokens; each consuming platform owns its workflow content.
  No persistent-data contract changes are planned.
- Applicable requirements: DS-BR-006/007, DS-FR-001/002/005–012, DS-NFR-004/006–010, DS-UX-001–010,
  ERP-UX-001–010 and FND-P1-008.
- Applicable decisions and standards: ADR-0002, ADR-0008, AI agent protocol, AI knowledge lifecycle, accessibility,
  compatibility, quality/testing and the accepted foundation remediation plan.
- Repositories/consumers affected: `unierp-platform`, `unierp-workspace`, `design-system`, `storybook`, `framework`,
  `tenant-apps` and later every registered package consumer.
- Existing artifacts searched: platform suites, accepted ADRs, legacy brief, package exports, token/theme/density
  sources, shells/floorplans, Storybook preview/visual discovery, package manifests, route tree and current diffs.
- Authority conflict resolution: An explicit accountable amendment to the foundation gate for FND-P1-008 was authorized by the human operator (Option b), permitting full implementation of the Meridian Workbench design language, formal floorplans, Storybook visual verification, and tenant apps shell modernization in this cycle.

## 3. Decisions and assumptions

- Inspected facts: a broad package and Meridian assets already exist; language generations and fonts conflict;
  tenant adoption is wide but inconsistent; visual/runtime evidence is narrow.
- Material assumptions: current subpath consumers must remain compatible; route migration can be staged by shared
  floorplan; no business data or server authorization behavior needs to change.
- Human decisions received: preserve UniERP uniqueness, use multiple enterprise references structurally, make the
  product data dense, modern and scalable, and start/complete the accepted direction.
- Restricted actions: no production/staging mutation, release/publication, breaking major, dependency license/cost
  change or destructive action has been authorized.

## 4. Change design

- Current behavior: Meridian is theme-level evidence layered with conflicting v2 typography; density is global;
  consumers and visual tooling use inconsistent versions and matrices; routes often compose generic cards locally.
- Intended behavior: one generated semantic token source drives Meridian themes, semantic density and explicit
  platform identity; applications compose seven workspaces through supported subpaths and shared shell adaptation.
- Invariants: UI never grants authority; tenant/legal-entity context remains explicit; money/quantity/localization
  semantics remain intact; compact density does not reduce supported text below 11px or remove accessible targets.
- Failure/degraded/retry/reconciliation: UI states are explicit; package adoption remains reversible; a missing
  token, route, story or matrix dimension fails conformance rather than silently passing.
- Concurrency/idempotency: no persistent mutation is introduced by the Design Platform; interaction composites must
  be safe under repeated application callbacks and must not announce success before the authoritative result.
- Contract/version/consumer impact: additive current-major evolution; root barrel becomes a documented compatibility
  bridge; removals require a future approved major.
- Schema/migration/backfill: none.
- Authentication/permission/tenant/record scope: unchanged and server-enforced; context is presentation only.
- Privacy/lifecycle/audit: synthetic/minimized visual fixtures; no production or personal data in evidence.
- Accessibility/localization/responsive: WCAG 2.2 AA with automated plus keyboard, screen-reader, zoom/reflow,
  forced-colour, reduced-motion, RTL and localized-content evidence.
- Observability/performance: measure density preference/overflow and UI errors without sensitive values; define
  interaction, DOM/rendered-row and bundle budgets with production-shaped synthetic datasets.
- Dependencies/supply chain: use current dependencies; any new font/package requires separate provenance/license
  review and is not assumed.

## 5. Delivery safety

- Feature flag/staged rollout: versioned design-language setting at shared application shells; Finance and Inventory
  pilot before route waves and cross-platform consumers.
- Compatibility window: current major retains token aliases, theme compatibility and supported exports until all
  registered consumers migrate and the removal gate is approved.
- Rollback/roll-forward: restore preceding shell/token entry point or advance an additive patch; no data rollback.
- Data recovery/reconciliation: not applicable.
- Owners/runbooks: Design Platform owns package/theme/token/visual rollback; each consumer owns journey validation.

## 6. Verification plan

| Claim or requirement | Proof boundary | Test/check command | Expected result |
| --- | --- | --- | --- |
| Authority and links are valid | platform docs | documentation/brain validators | nonzero discovery; no broken authority links |
| Token/theme/density contract | design package | token, contrast, platform, density, generated-token and cascade tests | every supported axis passes with zero new debt |
| Package behavior | design package | lint, typecheck, focused tests, complete test, build | clean supported-runtime result |
| Component workshop | Storybook | Storybook build and current visual/a11y matrix | no render error; reviewed baselines |
| Tenant shell/floorplans | tenant app | token, lint, typecheck, unit/interaction, build | explicit Meridian/apps/density contract works |
| Critical journeys | real browser | Finance and Inventory keyboard/a11y/visual/E2E/performance suites | representative workflows pass supported matrix |
| All-route adoption | generated inventory | route/export/story inventory in check mode | nonzero and 100% routes classified; no drift |
| Consumer compatibility | registered consumers | exact-version build/type checks and manifest check | every supported consumer resolves one release |

Required adversarial cases include compact and comfortable boundary sizes, long/RTL labels, large numerical data,
empty/error/forbidden/offline/stale states, keyboard-only table operation, screen-reader sort/filter/status changes,
forced colours, reduced motion, zoom/reflow, missing theme/density/platform attributes, empty inventory discovery and
rollback to the preceding compatible entry point.

## 7. Knowledge delta

- Classification: `UPDATED` for product/UX behavior, architecture, UI package contract and traceability.
- Authoritative updates: ADR-0008 and the PLT-DS/PLT-ERP platform suites.
- Evidence required next: generated component/export/story/route/consumer inventory plus dated visual,
  accessibility, performance and compatibility records tied to the tested revision.
- Enterprise-brain routing does not change.

> **This is not done.** The authoritative design is established, but accepted foundation dependencies currently
> prevent claiming or performing the complete cross-platform code rollout.
