# ADR-0009: Strata Workbench is the Authoritative UniERP Enterprise Design Language

- Status: Accepted
- Date: 2026-09-03
- Decision owner: Design Platform, with Tenant Apps as the primary consuming platform
- Human approval: The project owner approved the Strata Workbench design language, unique proprietary identity, AI skill integration, and multi-phase polyrepo rollout on 2026-09-03

## Context

UniERP previously utilized Meridian Workbench as its transitional design language. While effective for basic UI consistency, enterprise workloads (such as General Ledger, Stock Balances, Bill of Materials, and High-Throughput Incident Triage) demand an institutional-grade, data-dense design system comparable to industry benchmarks (Palantir Foundry, Salesforce Lightning SLDS, SAP Fiori Horizon, and Linear).

Key enterprise requirements include:
1. Four-tier density scaling, introducing a 24px Ultra-Compact row mode for financial ledgers and large datasets.
2. Distinct visual hierarchy: tactile Slate 50 (`#f8fafc`) ground, `#ffffff` elevated workspace cards, hairline 1px micro-borders (`#e2e8f0`), and Strata Cobalt (`#2563eb`) interaction accent.
3. Multi-tab operational shell (`<TabbedConsole>`), triage split views (`<SplitViewShell>`), and chevron lifecycle paths (`<StrataBar>`).
4. Dual global and workspace AI skills (`unierp-strata-design`) to enforce fail-closed design governance across all 31 repositories.

## Decision

UniERP formally adopts **Strata Workbench** (UniERP Strata) as its flagship, authoritative enterprise design language.

1. **Unique Proprietary Identity**:
   - The name *Strata Workbench* reflects structural crystalline layers, directly mirroring UniERP's 8-layer polyrepo architecture (L0-L7) and data-dense tabular strata.
   - Flagship light ground: `#f8fafc` (Slate 50), elevated cards `#ffffff`, sunken wells `#f1f5f9`.
   - Obsidian dark mode: `#09090b` ground, `#18181b` card elevated, `#27272a` borders, `#38bdf8` electric sky accent.
   - High Contrast mode: WCAG AAA 21:1 pure black/white theme with 2px borders.

2. **4-Tier Density Scale**:
   - **Ultra-Compact (24px)**: General ledger, journal entries, inventory balance matrix, bill of materials. Minimum font size strictly clamped to 11px (WCAG 2.2 AA compliant).
   - **Compact (28px)**: Operational queues, incident triage, approval tables.
   - **Standard (32px)**: Default enterprise experience, master records, standard forms.
   - **Comfortable (40px)**: Onboarding, POS touch terminals, executive dashboards.

3. **Typography Triad**:
   - Display: Plus Jakarta Sans / Inter Display / Instrument Sans for clean structural geometry.
   - Body & Data: Inter (tabular lining figures for financial alignment).
   - Monospace: JetBrains Mono / Geist Mono for identifiers, UUIDs, cryptographic hashes, and code.

4. **Component Anatomy & Architecture**:
   - Strict 5-file uniform anatomy (`.tsx`, `.module.css`, `.stories.tsx`, `.test.tsx`, `index.ts`).
   - Zero raw literals outside token source files enforced by CI token gate (`scripts/check-tokens.mjs`).
   - Backward compatibility: `MeridianBar` and legacy token aliases preserved via drop-in re-export stubs.

5. **AI Skill Governance**:
   - Global Skill registered at `~/.gemini/config/skills/unierp-strata-design/`.
   - Project skills mirrored across `design-system`, `tenant-apps`, and `unierp-workspace`.

## Consequences

- All 810 pages across 40+ modules in `tenant-apps` inherit the Strata design language immediately via `app/layout.tsx` (`data-theme="strata"`).
- Storybook defaults to `strata` and indexes all 149 components under CSF 3.0.
- Cross-platform tokens are generated for Flutter mobile (`tokens.g.dart`) and Tauri desktop (`tokens.g.css`).
- Future module migrations adhere to the multi-phase roadmap outlined in `FND-P1-009`.
