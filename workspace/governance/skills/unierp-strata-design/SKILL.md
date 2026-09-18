---
name: unierp-strata-design
description: Authoritative guide and standards for the UniERP Strata Design Language (Strata Workbench). Use when creating, modifying, styling, or testing UI components, forms, high-density data grids, and workspace floorplans across all UniERP frontend applications.
version: 1.0.0
author: UniERP Design Platform Architecture
---

# UniERP Strata Design Language & System (`@kannan19302/ui`)

**Strata** is the authoritative enterprise design language for UniERP — engineered for mission-critical, data-dense enterprise SaaS platforms. Inspired by market leaders (**Palantir Foundry / Blueprint 5**, **Salesforce Lightning SLDS**, **SAP Fiori Horizon**, and **Linear / Stripe**), Strata prioritizes information density, keyboard velocity, tabular numerical alignment, and zero cognitive fatigue.

---

## 🚫 The 5 Inviolable UI Laws (Instant CI Failure if Breached)

1. **Zero Raw Color Literals**: Hardcoded hex (`#ffffff`, `#1e293b`), rgb/hsl, or named colors in CSS modules or inline styles are prohibited. Always use Strata design tokens: `var(--color-*)` or `var(--strata-*)`. Verified by `check-tokens.mjs`.
2. **Zero Raw Dimension Literals**: Raw pixel spacing (`padding: 16px`, `margin: 24px`) is prohibited. Always use density and spacing tokens: `var(--density-*)` or `var(--space-*)`.
3. **Mandatory 5-File Uniform Anatomy**: Every UI component directory under `src/<category>/<component-name>/` MUST contain exactly 5 co-located files:
   - `<name>.tsx` — Component logic & TypeScript interface
   - `<name>.module.css` — Scoped styling using tokens
   - `<name>.stories.tsx` — Storybook CSF 3.0 story
   - `<name>.test.tsx` — Vitest unit test + automated `vitest-axe` a11y audit
   - `index.ts` — Encapsulated barrel re-export
4. **Accessible Contrast (WCAG 2.2 AA / AAA)**: All text and interactive surfaces must meet >= 4.5:1 contrast for normal text and >= 3.0:1 for large text across `strata` (light), `strata-dark`, and `strata-high-contrast`. Verified by `check-contrast.mjs`.
5. **No Broken Downstream Exports**: `@kannan19302/ui` is consumed by 10+ polyrepo packages. Public subpath exports must remain backward-compatible with legacy aliases preserved.

---

## 🎨 Token Quick-Reference Guide

### 1. Canvas & Surfaces
| Surface Token | Strata Light (`data-theme="strata"`) | Strata Dark (`data-theme="strata-dark"`) | Semantic Role |
| :--- | :--- | :--- | :--- |
| `var(--color-bg)` | `#f8fafc` (Slate 50) | `#09090b` (Obsidian / Zinc 950) | Main application canvas ground |
| `var(--color-bg-elevated)` | `#ffffff` (Pure White) | `#18181b` (Zinc 900) | Cards, modals, elevated surfaces |
| `var(--color-bg-sunken)` | `#f1f5f9` (Slate 100) | `#0f172a` (Slate 900) | Wells, table headers, filter bars |
| `var(--color-bg-hover)` | `#f1f5f9` | `#27272a` | Hover states on interactive rows |

### 2. Hairline Borders (Palantir Blueprint 5 inspired)
| Border Token | Light | Dark | Semantic Role |
| :--- | :--- | :--- | :--- |
| `var(--color-border)` | `#e2e8f0` (Slate 200) | `#27272a` (Zinc 800) | Table cell dividers, card borders |
| `var(--color-border-strong)` | `#94a3b8` (Slate 400) | `#3f3f46` (Zinc 700) | Input field outlines, focus boundaries |
| `var(--color-border-focus)` | `#3b82f6` (Cobalt 500) | `#38bdf8` (Sky 400) | 2px accessible focus rings |

### 3. Typography Triad
| Role | Font Family | Variable | Usage |
| :--- | :--- | :--- | :--- |
| **Display / Header** | `Plus Jakarta Sans` / `Inter Display` | `var(--font-display)` | Page titles, KPI numbers, wizard headers |
| **Body & Data** | `Inter` | `var(--font-sans)` | Form labels, table cells, paragraphs |
| **Monospace / Numeric** | `JetBrains Mono` / `Geist Mono` | `var(--font-mono)` | Ledger decimals, IDs, versions, code |

> **Crucial Rule:** Always apply `font-variant-numeric: tabular-nums lining-nums;` on monetary, inventory, and financial figures to ensure exact vertical column alignment.

### 4. 4-Tier Ergonomic Density Matrix
Applied via `[data-density]` attribute on `<html>` or container:
- **`ultra-compact` (24px row)**: General ledger, stock book, financial journals, trading matrices (50+ rows per 1080p screen). Text size = 11px minimum.
- **`compact` (28px row)**: Operational triage trays, CRM lead lists, inventory bin allocations.
- **`standard` (32px row — default)**: Standard ERP forms, detail views, settings, and tables.
- **`comfortable` (40px row)**: Touch-first POS registers, mobile tablets, onboarding wizards (>= 44px pointer targets).

---

## 🏛️ The 8 Core Enterprise Floorplans (`@kannan19302/ui/shell`)

When scaffolding an ERP page, NEVER build an ad-hoc layout. Select one of the 8 owned floorplans:

1. **`DataWorkspace`**: High-density data tables, search, faceted filter tray, batch actions, pagination, CSV export.
2. **`RecordShell`**: 3-column object detail page (Header, Anchor Nav, Section Blocks, Sticky Action Bar).
3. **`TransactionWorkspace`**: PO, Invoice, Sales Order layout (Header Card, Line Items DataGrid, Aggregate Totals, Action Bar).
4. **`TabbedConsole`**: Salesforce Console multi-record concurrent sessions with unsaved change indicators.
5. **`SplitViewShell`**: Master-detail triage (collapsible Left list queue + Right record inspector).
6. **`PlanningWorkspace`**: Gantt charts, production scheduling, timeline navigators, period switchers.
7. **`SettingsShell`**: Categorized administrative preferences, master toggles, search.
8. **`StudioShell`**: Visual builder canvas, left toolbox, right property inspector dock.

---

## 📋 Pre-Commit Verification Checklist

Before completing any UI change, execute:
```bash
# In d:\UniERP\design-system:
pnpm test                               # Vitest + Axe a11y (0 failures required)
node design-system/scripts/check-contrast.mjs         # Theme contrast gate (WCAG 2.2 AA)
node design-system/scripts/check-density.mjs          # Density constraints (Compact >= 11px)
node design-system/scripts/check-tokens.mjs           # Zero raw hex/pixel literals
node design-system/scripts/generate-cross-platform-tokens.mjs --check # Mobile/desktop token drift

# In consuming applications (e.g. tenant-apps):
pnpm typecheck                          # TypeScript compilation (0 errors)
pnpm run check:tokens                   # Downstream token gate
```
