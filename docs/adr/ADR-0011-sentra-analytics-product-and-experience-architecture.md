# ADR-0011: Sentra Analytics Product and Experience Architecture

- Status: Accepted
- Date: 2026-09-04
- Decision owner: Design Platform (`PLT-DS`) and Tenant Apps Platform (`PLT-ERP`), in coordination with Business Services Platform (`PLT-BIZ`)
- Human approval: Required prior to production implementation; architecture defined and contracted on 2026-09-04

## Context

UniERP features 19 analytics routes in `tenant-apps` covering executive cockpits, custom dashboards, visual query tools, real-time streams, pivot tables, and predictive modeling. However, the experience architecture has suffered from:
1. **Design Divergence**: Risk of creating isolated, ad-hoc chart styles, buttons, and custom container elements outside design system governance.
2. **Indiscriminate Stacking on Mobile**: Heavy multi-column analytical boards breaking into thousands of vertical pixels on narrow screens without intelligent summary prioritization.
3. **Role & Permission Ambiguity**: Undifferentiated views for C-level executives, department managers, operational accountants, and data stewards.
4. **Duplicate Tab Navigation**: Modules injecting redundant horizontal tab bars that conflict with the global `ContextBar` (`StrataBar`) breadcrumb hierarchy.
5. **Data Truthfulness Gaps**: Historical presence of client mock arrays, demo chart series, and browser `alert()` popups.

A unified architectural decision is required to formalize **Sentra Analytics** not as a competing UI library, but as a compact, data-dense **application-tier dialect** layered strictly upon **Meridian Workbench** and **Strata DL 2.0** (`ADR-0008` and `ADR-0009`).

## Decision

UniERP formally establishes the **Sentra Analytics Product and Experience Architecture**:

1. **Sentra is a Dialect, Not a Parallel Library**:
   - Sentra Analytics strictly consumes `@kannan19302/ui` tokens, primitives, and layouts. It does NOT define new button variants, raw CSS colors, or unvetted primitive wrappers.
   - All visual elements adhere to Strata DL 2.0 tokens (`var(--color-surface-*)`, `var(--color-border)`, `var(--color-brand)`, `var(--space-*)`, `var(--radius-*)`).
   - Zero tolerance for raw hex colors (`#10b981`, `#3b82f6`) or hardcoded pixel lengths outside responsive breakpoints.

2. **Eight Authoritative User Groups & Scope Isolation**:
   - Explicit persona definitions: *Executives, Business Unit Managers, Operational Users, Business Analysts, Report Authors, Data Stewards, Security Administrators, Delegated Analysts*.
   - Each group is assigned explicit jobs, permissions, tenant/org scopes, row/column masking policies, and default workspaces.

3. **Canonical Floorplan Assignment**:
   - Every `/analytics` route is bound to an owned Meridian floorplan:
     - `OperationsFloorplan`: Executive Cockpit (`/analytics`), Real-time Telemetry (`/analytics/realtime`), Data Pipelines (`/analytics/pipelines`).
     - `DataWorkspace`: Dashboards (`/analytics/dashboards`), Reports (`/analytics/reports`), KPI Library (`/analytics/kpis`), Metric Catalog (`/analytics/catalog`), Scheduled Exports (`/analytics/exports`).
     - `StudioShell`: Dashboard Builder (`/analytics/builder`), Visual Query Studio (`/analytics/query`), Pivot Matrix (`/analytics/pivot`).
     - `SplitViewShell`: Anomaly Detection (`/analytics/anomalies`), Predictive Engine (`/analytics/predictive`), Metric Trends (`/analytics/trends`), Funnel Conversion (`/analytics/funnels`).
     - `SettingsWorkspace`: Analytics Settings & Governance (`/analytics/settings`).

4. **Single-Source Shell Navigation & Tab Retirement**:
   - `ContextBar` (`StrataBar`) in `app/(dashboard)/layout.tsx` is the sole breadcrumb and context provider.
   - Sidebar descriptor `tenant-apps/src/navigation/descriptors/analytics.ts` owns left-sidebar grouping.
   - Duplicate horizontal module tab navigation strips (`ModuleTabLayout`) are prohibited. Internal sub-views within pages use contained `<SegmentedControl>` or secondary tab primitives without duplicating breadcrumb state.
   - Legacy `/analytics/custom-dashboards` is permanently retired in favor of `/analytics/dashboards` via Next.js 308 redirect.

5. **Institutional Chart & Comparison Grammar**:
   - Numerical figures MUST declare `font-variant-numeric: tabular-nums lining-nums`.
   - Micro-comparisons must explicitly indicate baseline context ("vs Prior Month", "vs Q3 Target") using tokenized status colors (`--color-success`, `--color-danger`, `--color-neutral`).
   - Every metric card and chart widget must expose data freshness timestamps, steward certification badges, and an inspectable source lineage drawer.

6. **Mobile & Narrow-Screen Prioritization**:
   - Rejection of indiscriminate card stacking.
   - Progressive disclosure: top 4 executive KPI chips visible on mobile; secondary charts collapsed into tabbed accordions or swipeable horizontal carousels with CSS scroll-snap.
   - Complex data tables transform into compact key-value summary cards below 768px.
   - Filter bars and drill-through sidebars collapse into touch-friendly off-canvas bottom sheets.

7. **Zero Browser Native Dialogs & Zero-Mock Mandate**:
   - Native browser dialogs (`alert()`, `confirm()`, `prompt()`) are banned. All interactions use unified toasts and accessible modal drawers.
   - All charts, metrics, and tables must bind strictly to live database aggregations. If no data exists, render a truthful empty state with an ingestion call-to-action.

## Consequences

- All 19 `/analytics` routes in `tenant-apps` must conform to this architecture prior to product code rollout.
- The Design System token gates (`scripts/check-tokens.mjs`) will reject any raw literals or ad-hoc styles introduced in analytics components.
- Contract validation and permission boundaries established in the R2 Change Contract (`ANALYTICS_CHANGE_CONTRACT.md`) are reinforced at the experience layer.
- Traceability matrices in `tenant-apps` and `business-services` will map user group journeys directly to automated test suites.
