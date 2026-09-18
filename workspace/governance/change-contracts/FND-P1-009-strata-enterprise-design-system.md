# Change Contract FND-P1-009: Strata Workbench Enterprise Design System

**Status**: `PARTIAL` (Core tokens and workbench shell primitives delivered; full route-level adoption across 1,198 routes and cross-platform clients in progress)  
**Date**: 2026-09-03  
**Target Delivery Unit**: `design-system` (`@kannan19302/ui`), `tenant-apps` (`@kannan19302/web`), `storybook`, `unierp-platform`, `unierp-workspace`  
**Governing Standard**: `ADR-0009`, `AI_AGENT_DEVELOPMENT_PROTOCOL.md`  

---

## 1. Scope and Objective

Transition UniERP's design system from transitional Meridian to **Strata Workbench** (UniERP Strata) — a proprietary, high-density enterprise design language engineered for mission-critical SaaS workflows.

Deliverables:
1. **Core Token Suite**: `strata.css` (Slate 50 light), `strata-dark.css` (Obsidian tactical dark), `strata-high-contrast.css` (WCAG AAA 21:1), and `strata-chrome.css`.
2. **4-Tier Density Scaling**: 24px Ultra-Compact (financial ledgers), 28px Compact, 32px Standard, 40px Comfortable. Minimum 11px font constraint enforced.
3. **Enterprise Shell Components**:
   - `<StrataBar>`: Context bar with lifecycle chevron path, active viewer avatars, and single next verb.
   - `<TabbedConsole>`: Multi-tab workspace shell with dirty indicators and close handlers.
   - `<SplitViewShell>`: Master-detail triage split pane with responsive width.
   - `<CommandPalette>`: Cmd+K global navigation.
4. **Dual AI Skills**: Registered globally at `~/.gemini/config/skills/unierp-strata-design/` and mirrored in workspace directories.
5. **Quality Gates**: Contrast gate (6 themes pass), platform accents (8 platforms pass), density gate, token gate (0 new violations), mobile sync, Storybook build (0 errors), tenant-apps typecheck (810 routes pass).

---

## 2. Multi-Phase Adoption Roadmap

| Wave | Module Scope | Target Page Count | Floorplan / Density | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Wave 0** | Root Shell (`app/layout.tsx`) | 810 pages | Universal inheritance (`data-theme="strata"`) | **Complete (100%)** |
| **Wave 1** | Finance, Inventory, Sales, Procurement | 202 pages | Ultra-Compact (24px) Virtualized Grid + `<StrataBar>` | **Tokens & Shell Ready** |
| **Wave 2** | CRM, Projects, Manufacturing | 247 pages | `<TabbedConsole>` + `<SplitViewShell>` | **Shell Ready** |
| **Wave 3** | Supply Chain, HR, POS, Analytics, Verticals | 139 pages | Standard (32px) DataWorkspace | **Tokens Ready** |
| **Wave 4** | Workflow, Drive, AI, Auth, Admin OS | 222 pages | Comfortable (40px) SettingsShell | **Tokens Ready** |

---

## 3. Verification Evidence

- `check-contrast.mjs`: All 6 themes pass WCAG 2.2 AA.
- `check-density.mjs`: Text size constraint strictly >= 11px. Comfortable touch target >= 44px.
- `check-tokens.mjs`: Zero un-baselined raw literals.
- `generate-cross-platform-tokens.mjs --check`: Mobile Dart tokens and desktop CSS tokens in sync.
- `pnpm typecheck` in `design-system`: 0 errors.
- `pnpm test` in `design-system`: 169 test suites, 555 tests passing.
- `pnpm build-storybook` in `storybook`: 149 components built cleanly into `storybook-static/`.
- `pnpm typecheck` in `tenant-apps`: 810 routes compile cleanly with zero errors.
