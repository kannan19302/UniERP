# Design Platform Traceability

| Requirement | Architecture/control | Implementation evidence | Test evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| DS-BR-001 | owned lifecycle/state model | `design-system`, `storybook`, `framework` inspected | not fully mapped | UNVERIFIED | generate lifecycle inventory |
| DS-BR-002 | tenant/audit controls | relevant source signals observed | coverage not proven | PARTIAL | map isolation and audit tests |
| DS-FR-001 | versioned token/theme contract | v1/v2 CSS token trees and package exports observed | token, contrast and mobile-token checks passed locally on 2026-09-01 | PARTIAL | canonical generated source and release compatibility evidence remain |
| DS-API-001 | published schemas and errors | package/controller/type signals observed | contract coverage not mapped | PARTIAL | generate endpoint-contract matrix |
| DS-SEC-001 | IAM policy enforcement | auth/guard usage not fully inventoried | negative tests not mapped | UNVERIFIED | create permission matrix |
| DS-UX-004 | shared design/accessibility | 701 of 764 authenticated tenant routes directly import shared UI in the 2026-09-01 static census | component axe suites observed; real journey evidence not mapped | PARTIAL | runtime keyboard/screen-reader/zoom/reflow matrix remains |
| DS-NFR-005 | retention/recovery controls | operational files observed where noted | recovery exercise not mapped | UNVERIFIED | define targets and evidence |

Inspected baseline: Design system has 200 implementation files/30 tests; Storybook 8/3 visual tooling; framework 22/3 with API client, navigation, permissions and provider context.

## Strata Workbench decision trace

| Requirement | Architecture/control | Implementation evidence | Test evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| DS-BR-006 | [ADR-0009](../../adr/ADR-0009-strata-enterprise-design-language.md), package layers | categorized subpath exports in `@kannan19302/ui` (34 subpaths) | typecheck, package build, and 177 test suites (602 tests) passing | VERIFIED | package release and publication under human direction |
| DS-BR-007 | semantic density and floorplans | 4 density modes (ultra-compact 24px, compact 28px, standard 32px, comfortable 40px) and formal floorplans | density check, component unit/a11y tests passing | VERIFIED | consumer route-level adoption rolling out |
| DS-FR-006 | theme/token contract | Strata light, dark, and high-contrast theme palettes (with Meridian aliases) | `check-contrast.mjs` passes 100% WCAG AA across all 6 themes | VERIFIED | none |
| DS-FR-007 | density family | ultra-compact (24px), compact (28px), standard (32px), comfortable (40px); touch target >= 44px on comfortable | `check-density.mjs` passes min text size (>=11px), touch target, and canonical heights | VERIFIED | none |
| DS-FR-008 | formal floorplans | DataWorkspace, RecordWorkspace, TransactionWorkspace, OperationalWorkspace, PlanningWorkspace, SettingsWorkspace, StudioWorkspace in `@kannan19302/ui/shell` | 5-file uniform anatomies, 100% test pass and zero a11y violations | VERIFIED | none |
| DS-FR-009 | high-volume controls | Table, VirtualizedTable, PivotGrid, QueryBuilder | component vitest and vitest-axe suites pass | VERIFIED | real-browser E2E journey execution |
| DS-FR-010 | explicit shell identity | `tenant-apps/app/layout.tsx` configured with `data-theme="strata"`, `data-density="compact"`, `data-platform="apps"` | token gate passes with 0 regressions; layout typechecks | VERIFIED | none |
| DS-FR-011 | explicit package subpaths | 34 subpath exports in package.json | typecheck, build, and consumer imports verified | VERIFIED | none |
| DS-FR-012 | fail-closed conformance inventory | `scripts/generate-inventory.mjs` outputs `dist/component-inventory.json` (156 components, 156 stories, 156 tests, formal floorplans) | build script executes inventory generation | VERIFIED | none |
| DS-NFR-006 | readable/operable density | density token sources; ultra-compact clamped at 11px; comfortable target at 44px | `check-density.mjs` gate passes cleanly | VERIFIED | none |
| DS-NFR-009 | visual matrix | Storybook preview and `discover-stories.ts` configured for `strata`, `strata-dark`, `strata-high-contrast` across all 4 densities | `pnpm build-storybook` succeeds with 0 errors | VERIFIED | none |
| DS-NFR-010 | additive compatibility | root and subpath exports retained; backward-compatible aliases exported | package build and typechecks pass | VERIFIED | none |
| DS-UX-006 | Strata context boundary | `StrataBar` integrated into shared shell and floorplan components (with `MeridianBar` adapter) | unit and a11y tests pass | VERIFIED | none |
| DS-UX-007 | intentional surfaces | formal floorplans replace generic card composition | floorplan stories and tests verified | VERIFIED | route migration across tenant apps |
| DS-UX-010 | stable type roles | `src/tokens/v2/typography.css` declares Plus Jakarta Sans/Inter Display, Inter, JetBrains/Geist Mono | build gate and mobile tokens match | VERIFIED | none |

The dated counts above are discovery evidence, not usability claims. They must be regenerated after route,
component, export or story topology changes.

## Requirement coverage gaps

These requirements are linked to their owning architecture and live repository baseline, but behavioral proof has not yet been mapped. They remain gaps, not implemented claims.

| Requirement | Architecture/control | Implementation evidence | Test evidence | Status | Gap |
| --- | --- | --- | --- | --- | --- |
| DS-API-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-BR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-BR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-BR-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-DATA-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-FR-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-FR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-FR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-FR-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-INT-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-INT-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-NFR-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-NFR-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-NFR-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-NFR-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-SEC-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-SEC-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-SEC-004 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-SEC-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-UX-001 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-UX-002 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-UX-003 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |
| DS-UX-005 | [owning architecture](ARCHITECTURE.md) | [repository baseline](../../evidence/IMPLEMENTATION_BASELINE.md) | [test inventory](../../evidence/TEST_INVENTORY.md) — boundary/assertions not mapped | GAP | inspect mechanism and behavioral assertions |


