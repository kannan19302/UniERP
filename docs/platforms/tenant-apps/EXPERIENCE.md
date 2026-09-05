# Tenant Apps ERP Experience

- `ERP-UX-001`: Users shall always see active tenant, legal entity, business unit and relevant period/context.
- `ERP-UX-002`: Lifecycle state, allowed next actions and validation failures shall be explicit.
- `ERP-UX-003`: Money, units, dates, tax and time zones shall be unambiguous and locale-aware.
- `ERP-UX-004`: High-volume grids shall support keyboard use, accessible labels, filtering and bounded export.
- `ERP-UX-005`: Long-running work shall show durable progress and partial failures.
- `ERP-UX-006`: Shared components and tokens shall come from the Design Platform.
- `ERP-UX-007`: Every tenant route shall declare a Meridian Workbench floorplan and default density appropriate to
  its task, device and input mode; page-local composition shall not fork shared accessibility behavior.
- `ERP-UX-008`: Tenant application shells shall expose the active Design Platform theme, `apps` platform identity,
  locale, direction and resolved density through the supported shell contract.
- `ERP-UX-009`: Finance, inventory, procurement, manufacturing and operational workspaces shall prioritize
  keyboard-first scanning, comparison, entry and exception handling while preserving readable text, focus and an
  accessible small-screen alternative.
- `ERP-UX-010`: Route migration shall include loading, empty, partial, stale, error, forbidden, offline and recovery
  states according to the workflow; a successful route render alone is not adoption evidence.
- `ERP-UX-011`: Analytics workspaces shall implement the Sentra Analytics dialect layered on Meridian Workbench
  floorplans and Strata DL 2.0 tokens; page composition shall not define parallel button, card or color primitives.
- `ERP-UX-012`: Numerical analytical data shall declare `font-variant-numeric: tabular-nums lining-nums`, and comparisons
  shall explicitly state baseline context with directional status indicators.
- `ERP-UX-013`: Every metric card, chart and analytical report shall expose data freshness timestamps, data steward
  certification badges, and an inspectable source lineage drawer.
- `ERP-UX-014`: Mobile and narrow-screen views (<768px) shall implement progressive disclosure (top KPI swipe decks,
  table-to-card conversions, and bottom sheet filter drawers) instead of indiscriminate card stacking.
- `ERP-UX-015`: Shell navigation shall be single-source via `ContextBar` (`StrataBar`); duplicate horizontal tab strips
  (`ModuleTabLayout`) are prohibited.

The route tree provides information-architecture evidence, not usability or accessibility proof.

## Detailed Module Experience Specifications
- [Sentra Analytics Product & Experience Architecture](ANALYTICS_EXPERIENCE_ARCHITECTURE.md)

