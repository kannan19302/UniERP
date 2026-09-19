<!-- UniERP-Strata-Design-System-Standards: 2.0.0 -->
# UniERP Strata Design Language: The 10 Pillars of Enterprise Design System Excellence

> **Status:** Authoritative Platform Standard  
> **Package Identity:** `@kannan19302/ui`  
> **Layer:** L1 (Foundation)  
> **Benchmark Parity:** Salesforce Lightning SLDS 2, IBM Carbon v11, Shopify Polaris, Adobe Spectrum, Microsoft Fluent 2, Palantir Blueprint 5.

This document defines the permanent, non-negotiable architectural standards, policies, and automated quality gates governing all components, tokens, stories, layouts, and consuming applications in the UniERP ecosystem.

---

## 🏛️ The 10 Inviolable Pillars

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        UNIERP STRATA DESIGN LANGUAGE (DL 2.0)                          │
├──────────────────────────┬───────────────────────────┬─────────────────────────────────┤
│ 1. Foundations & Tokens  │ 2. Component Architecture │ 3. Inclusive Design & a11y      │
│    - W3C DTCG 3-Tier     │    - Universal Ref Forward│    - WCAG 2.2 AA / AAA          │
│    - Contrast & Themes   │    - Polymorphic asChild  │    - W3C WAI-ARIA APG           │
│    - Tabular Typography  │    - Uniform 5-File Canon │    - Windows High Contrast     │
│    - 4-Tier Density      │    - Universal Prop Enum  │    - Vestibular Reduced Motion  │
├──────────────────────────┼───────────────────────────┼─────────────────────────────────┤
│ 4. BiDi & Localization   │ 5. The 5 Enterprise States│ 6. Lifecycle & Governance       │
│    - CSS Logical Props   │    - Default / Populated  │    - 4-Tier Maturity Model      │
│    - Directional Mirror  │    - Non-shifting Skeleton│    - SemVer & Deprecation Cycle │
│    - LTR Accounting Math │    - Actionable Empty     │    - Dev-Mode Console Warnings  │
│    - Zero Hardcoded Text │    - Diagnostic Error     │    - Migration Codemods         │
│                          │    - RBAC / FLS 403 Lock  │                                 │
├──────────────────────────┼───────────────────────────┼─────────────────────────────────┤
│ 7. Packaging & Hygiene   │ 8. Storybook Standards    │ 9. Automated CI Gate Fleet      │
│    - Strict sideEffects  │    - CSF 3.0 & Autodocs   │    - 10 Automated Linters       │
│    - Granular Subpaths   │    - Anatomy & Composition│    - Token Purity (0 debt)      │
│    - Bundle Size Budgets │    - All-States Gallery   │    - Ast-based Story Compile    │
│    - RSC / SSR Cleanliness│   - Interactive Simulators│   - vitest-axe 100% Pass Rate   │
├──────────────────────────┴───────────────────────────┴─────────────────────────────────┤
│ 10. Downstream Consuming Polyrepo Application Contract                                 │
│     - Single-Source ContextBar Breadcrumbs                                             │
│     - Zero-Mock Mandate (Production-Grade Telemetry Only)                             │
│     - Downstream Token Purity Enforcement                                              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Pillar 1: Design Tokens & Visual Foundations (W3C DTCG Standard)

1. **3-Tier Token Architecture (W3C DTCG Compliant)**:
   - *Tier 1 (Global / Primitives)*: Raw color palettes, base numeric scales (`blue-500`, `space-4`). Prohibited in component CSS modules.
   - *Tier 2 (Semantic / System)*: Contextual intent tokens (`var(--color-bg-elevated)`, `var(--color-text-primary)`, `var(--space-md)`). The mandatory baseline for all UI components.
   - *Tier 3 (Component-Scoped)*: Dedicated overrides for complex components (`var(--strata-datagrid-cell-padding-y)`).
2. **Accessible Contrast (WCAG 2.2 AA / AAA)**:
   - Normal text: $\ge$ 4.5:1; Large text & graphical UI boundaries: $\ge$ 3.0:1 across all 6 core themes (`strata`, `strata-dark`, `strata-high-contrast`, `midnight`, `emerald`, `sapphire`). Verified by `check-contrast.mjs`.
3. **Typography Triad & Tabular Numerics**:
   - `var(--font-display)`: `Inter` (Bold 700 / SemiBold 600) with `letter-spacing: -0.02em` for headers.
   - `var(--font-sans)`: `Inter` (Regular 400 / Medium 500) for labels, body, and controls.
   - `var(--font-mono)`: `IBM Plex Mono` for ISO IDs, hashes, code snippets, and financials.
   - **Tabular Numerics Rule**: Mandatory `font-variant-numeric: tabular-nums lining-nums;` on all monetary, currency, balance, inventory, and timestamp figures.
4. **Text Truncation & Zero Information Loss**:
   - Every single-line or multi-line truncated element (`truncate`, `line-clamp-*`) MUST provide a native `title="..."` attribute or wrap in `<Tooltip>` so users can read the complete un-truncated text on hover/focus.
5. **Ergonomic 4-Tier Density Scale**:
   - `ultra-compact` (24px row, $\ge$ 11px font): Financial ledgers, stock books, trading screens.
   - `compact` (28px row): Operational triage, CRM lead lists.
   - `standard` (32px row): Standard ERP forms, detail views, settings.
   - `comfortable` (40px row, $\ge$ 44px touch targets): Touch-first POS, mobile tablets, onboarding wizards.
6. **Z-Index System Scale**:
   - Strictly ban arbitrary `z-index: 9999`. Enforce canonical scale:
     `--z-hide: -1`, `--z-base: 0`, `--z-raised: 1`, `--z-dropdown: 1000`, `--z-sticky: 1100`, `--z-modal-backdrop: 1200`, `--z-modal: 1300`, `--z-popover: 1400`, `--z-tooltip: 1500`, `--z-toast: 1600`.
7. **Elevation & Dark Mode Surface Lightness**:
   - In dark themes, elevation must be conveyed via surface lightness tinting (`--color-bg-elevated`), not relying solely on drop shadows that are invisible on dark canvases.

---

## Pillar 2: Component Architecture & API Ergonomics

1. **Mandatory 5-File Uniform Anatomy**:
   - `<name>.tsx` — Component logic & TypeScript interface.
   - `<name>.module.css` — Scoped styling using tokens.
   - `<name>.stories.tsx` — Storybook CSF 3.0 story with Autodocs, Anatomy, and AllStatesGallery.
   - `<name>.test.tsx` — Vitest unit test + automated `vitest-axe` a11y audit.
   - `index.ts` — Clean barrel re-export.
2. **Universal Ref Forwarding**:
   - 100% of interactive, container, and visual primitive components MUST forward their DOM refs using `React.forwardRef<TElement, TProps>()`.
3. **Polymorphic Composition (`asChild`)**:
   - Interactive components (Button, Badge, Avatar, Tag, Card, Link) must support `asChild` (via `@radix-ui/react-slot`) or an `as` polymorphic prop, allowing seamless composition with Next.js `<Link>` or custom router tags without phantom wrapper `<div>`s that break flex/grid layouts.
4. **Universal Prop Grammar & Enums**:
   - `size`: strictly `'xs' | 'sm' | 'md' | 'lg' | 'xl'`.
   - `tone` / `variant`: strictly `'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'`.
   - Booleans: `disabled`, `readOnly`, `loading` / `busy`, `required`, `invalid`.
   - Content Slots: `leadingIcon`, `trailingIcon`, `header`, `footer`, `title`, `description`, `actions`, `children`.
   - Event Handlers: `on[Event]` with typed synthetic events (e.g. `onChange`, `onSelect`, `onDismiss`, `onOpenChange`).
5. **Controlled vs Uncontrolled Forms**:
   - Every input and selection component must support both controlled (`value` + `onChange`) and uncontrolled (`defaultValue`) operating modes.
6. **SSR & React Server Components (RSC)**:
   - Any component utilizing React hooks (`useState`, `useEffect`, `useCallback`, `useId`), browser APIs, or event handlers must declare `"use client"` as the very first line of code.
   - Pure presentational primitives without hooks/events must remain RSC-compatible to minimize client bundle overhead.
7. **Idempotent Unique DOM Identifiers**:
   - Always generate element IDs using `React.useId()` for accessibility bindings (`htmlFor`, `aria-describedby`, `aria-labelledby`, `aria-errormessage`). Never use hardcoded static string IDs.

---

## Pillar 3: Accessibility (a11y) & Inclusive Design (WCAG 2.2 AA & APG)

1. **W3C WAI-ARIA APG Conformance**:
   - Complex interactive patterns (Dialog, Menu, Accordion, Tabs, Popover, Combobox, DataGrid) must strictly follow W3C APG keyboard interaction models.
   - Composite widgets must implement roving `tabIndex` or `aria-activedescendant`.
   - Modals and drawers must trap keyboard focus (`focus-trap`) and return focus to the triggering element upon closure.
2. **Accessible Focus Ring Standard (WCAG 2.2 2.4.11 Focus Appearance)**:
   - All interactive elements must feature a 2px outline using `var(--color-border-focus)` with a 2px offset. Focus rings must not be clipped by parent `overflow: hidden` containers.
3. **Windows High Contrast Mode (WHCM / Forced Colors)**:
   - Mandatory `@media (forced-colors: active)` support on all interactive elements, badges, progress bars, and focus indicators using system color keywords (`Canvas`, `CanvasText`, `Highlight`, `ButtonText`, `LinkText`).
4. **Vestibular Safety & Reduced Motion**:
   - All animations and transitions must immediately collapse under `@media (prefers-reduced-motion: reduce)` to `0ms` duration or instant opacity fades.
5. **Color Independence (WCAG 1.4.1)**:
   - Never use color as the sole indicator of state, error, or priority. Every semantic tone must be paired with an icon, badge shape, or explicit text label.
6. **Automated Vitest-Axe Conformance**:
   - 100% of component test suites (`*.test.tsx`) must execute `const results = await axe(container); expect(results).toHaveNoViolations();`.

---

## Pillar 4: BiDi, RTL & Global Localization Standards

1. **Inviolable CSS Logical Properties Law**:
   - Physical directional CSS properties are strictly forbidden across all `.module.css` and styled files:
     - ❌ `margin-left` / `margin-right` $\rightarrow$ ✅ `margin-inline-start` / `margin-inline-end`
     - ❌ `padding-left` / `padding-right` $\rightarrow$ ✅ `padding-inline-start` / `padding-inline-end`
     - ❌ `left` / `right` $\rightarrow$ ✅ `inset-inline-start` / `inset-inline-end`
     - ❌ `border-left` / `border-right` $\rightarrow$ ✅ `border-inline-start` / `border-inline-end`
     - ❌ `text-align: left` / `right` $\rightarrow$ ✅ `text-align: start` / `end`
2. **Directional Icon Mirroring**:
   - Directional icons (arrows, chevrons, back/forward, undo/redo) must mirror under RTL (`transform: scaleX(-1)` via `[dir="rtl"]`).
   - Universal/non-directional icons (search, checkmark, lock, settings, clock, calendar) must NEVER mirror.
3. **Enterprise Tabular Numeric Formatting in RTL**:
   - Financial ledgers, currency amounts, and tabular numbers in Arabic/Hebrew locales must enforce `direction: ltr; unicode-bidi: isolate;` to preserve mathematical calculation integrity.
4. **Zero Hardcoded Strings (Localization Readiness)**:
   - Built-in UI strings ("Copy", "Copied", "Close", "Search", "Loading...", "Retry", "Page of", "Clear", "Filter", "More actions") must be configurable via props or i18n context with sensible English fallbacks.

---

## Pillar 5: The 5 Canonical Enterprise States (Zero Dead-Ends)

Every data-bearing or asynchronous component must explicitly implement, test, and document in Storybook the **5 Canonical Enterprise States**:
1. **Default / Populated**: Realistic business records rendering at designated density.
2. **Loading / Skeleton**: Non-shifting layout skeleton (`CLS < 0.05`) precisely matching the final content geometry.
3. **Empty State**: Contextual illustration/icon, clear explanation, and an actionable primary CTA (e.g. "Create Invoice") preventing user dead-ends.
4. **Error / Incident State**: ErrorBoundary or diagnostic card with incident tracking ID (`INC-...`), copyable diagnostic stack terminal, and self-healing retry action.
5. **Unauthorized / 403 (FLS) State**: AccessDeniedCard or inline lock indicator explaining required RBAC roles/permissions with elevation trigger.

---

## Pillar 6: Component Lifecycle, Maturity & Governance

1. **4-Tier Component Maturity Taxonomy**:
   - `Experimental / Alpha`: In development; API may change freely.
   - `Beta`: Feature-complete; active testing across pilot tenant apps.
   - `Stable`: Production-ready; locked SemVer contract; zero breaking changes without major bump.
   - `Deprecated`: Successor available; scheduled for removal in N+1 major.
2. **Deprecation Grace Period & Warnings**:
   - Minimum 1 major release grace period before physical deletion.
   - Mandatory console warning in non-production environments:
     ```ts
     if (process.env.NODE_ENV !== "production") {
       console.warn("[Strata Deprecation]: <OldComponent /> is deprecated. Use <NewComponent /> instead. See docs at ...");
     }
     ```
   - Accompanying migration codemod or step-by-step upgrade guide.
3. **SemVer Breaking Change Inviolable Rule**:
   - Renaming or deleting props, altering public exports, or modifying DOM structures in ways that break consumer styling constitutes a MAJOR breaking change.

---

## Pillar 7: Packaging, Performance & Bundle Hygiene

1. **Strict Tree-Shaking Configuration**:
   - Mandatory `"sideEffects": ["*.css", "**/*.css"]` in `package.json`.
2. **Granular Subpath Exports**:
   - Dedicated entrypoints: `@kannan19302/ui/primitives`, `@kannan19302/ui/inputs`, `@kannan19302/ui/data-display`, `@kannan19302/ui/data-grid`, `@kannan19302/ui/shell`, `@kannan19302/ui/charts`.
3. **Component Weight Budgets (Gzipped)**:
   - UI Primitives: $\le$ 5 KB.
   - Form Inputs: $\le$ 12 KB.
   - Layout & Shell: $\le$ 20 KB.
   - Data Grids: $\le$ 35 KB.
4. **Heavy Dependency Isolation**:
   - Heavy third-party dependencies (e.g. Recharts, heavy date parsers) MUST remain isolated inside dedicated subpath exports (`@kannan19302/ui/charts`) and NEVER leak into root or primitive barrels.
5. **Core Web Vitals Guarantees**:
   - `CLS < 0.05` guaranteed via exact-dimension skeleton states.
   - `INP < 200ms` guaranteed on high-density grids via virtualization.

---

## Pillar 8: Storybook Workshop Standards

1. **Mandatory CSF 3.0 & Autodocs**:
   - Every component story file must declare `tags: ["autodocs"]` with rich component overview, prop tables, and token references.
2. **Pre-Commit AST Compilation Gate**:
   - Every `*.stories.tsx` file must compile cleanly via `scripts/check-stories-compilation.mjs` before PR integration.
3. **Anatomy & Composition Story**:
   - Mandatory `AnatomyAndComposition` story breaking down sub-components, slots, and compound architecture.
4. **All States in One Place (Gallery)**:
   - Mandatory `AllStatesGallery` story rendering all lifecycle, tone, and density states side-by-side.
5. **Interactive Runtime Playground**:
   - Interactive simulator in `Default` story for realistic testing (e.g. crash simulator in ErrorBoundary, persona switcher in ProtectedComponent, filter/sort simulator in DataGrid).

---

## Pillar 9: Automated Quality Engineering CI Fleet

The following 10 automated verification gates govern every commit and PR:
1. `node scripts/check-tokens.mjs`: Zero raw hex colors, zero raw pixel dimensions outside tokens (100% token purity).
2. `node scripts/check-contrast.mjs`: WCAG 2.2 AA (4.5:1 / 3:1) verified across all 6 themes.
3. `node scripts/check-density.mjs`: 4-tier density compliance (Ultra-Compact $\ge$ 11px font, Standard 32px, Comfortable 40px).
4. `node scripts/check-logical-properties.mjs`: AST lint rule blocking physical directional CSS properties (`margin-left`, etc.).
5. `node scripts/check-stories-compilation.mjs`: AST compilation verification of 100% of story files.
6. `node scripts/check-storybook-standards.mjs`: Storybook standards and taxonomy gate.
7. `node scripts/generate-cross-platform-tokens.mjs --check`: Cross-platform mobile (Flutter) and desktop token drift gate.
8. `node scripts/check-platform-accents.mjs`: White-label platform accent token compliance.
9. `pnpm typecheck`: Strict TypeScript typechecking with zero compiler errors.
10. `pnpm test`: Vitest suite with 100% automated axe-core accessibility compliance (`expect(results).toHaveNoViolations()`).

---

## Pillar 10: Downstream Consuming Polyrepo Application Contract

1. **Single-Source Breadcrumb Navigation (ContextBar / StrataBar)**:
   - The shell's `ContextBar` (`StrataBar`) is the single authoritative source of breadcrumb navigation across the entire application. Page interiors must NEVER pass redundant breadcrumbs or duplicate top banners.
2. **Strict Zero-Mock Mandate (Production-Grade Telemetry Only)**:
   - Consuming pages must NEVER hardcode fake metrics or intercept errors with fictional mock registries. All data must bind to live backend endpoints (`useApiQuery`).
3. **Downstream Token Purity Gate**:
   - Consuming applications must execute `pnpm run check:tokens` in CI to prevent design token leakage in application-specific pages.
