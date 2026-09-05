# Figma and Code Design-System Audit — 2026-09-05

## Scope and method

Sources inspected: workspace governance, Design Platform authorities, ADR-0008, ADR-0009, `design-system/src`,
package exports, stories, tests, route files, the new Figma file, subscribed Figma libraries and design-system
search results. Discovery used `rg`, PowerShell file enumeration and Figma metadata/library search tools.

## Code inventory

| Category | Component families |
| --- | ---: |
| Blocks | 7 |
| Charts | 3 |
| Dashboard | 5 |
| Data display | 12 |
| Data grid | 8 |
| Form engine | 4 |
| Forms | 3 |
| Inputs | 25 |
| Layout | 11 |
| Navigation | 9 |
| Notifications | 3 |
| Overlays | 12 |
| Primitives | 19 |
| Shell | 19 |
| Studio | 8 |
| Theme | 5 |
| Workflow | 4 |
| **Total** | **157** |

The package exposes explicit subpaths for tokens, themes, components, layout, charts, data grid, dashboard,
notifications, hooks, utilities, icons, form engine, workflow, shell, primitives, inputs, overlays, navigation,
data display, forms, blocks and studio.

## Application and route inventory

| Surface | Discovered pages |
| --- | ---: |
| Tenant Apps | 793 |
| Provider Admin OS | 142 |
| Tenant Admin | 105 |
| Developer Platform | 73 |
| Marketing Site | 56 |
| Marketplace | 17 |
| Tenant Sites | 2 |
| Infrastructure UI | 1 |
| **Total** | **1,189** |

These counts establish registry scope only. They do not prove that routes are implemented, usable, authorized or
conformant.

## Figma inventory

- File: `UniERP / Design System — Strata Workbench`
- File key: `GP7CXqUlrfHn04raf1Fa48`
- Initial local pages: one default page
- Local variables/components/styles at discovery: none
- Subscribed libraries: Material 3, Simple Design System and Apple platform kits
- Search for UniERP/Strata assets: no matching variables or styles
- Search for Button: generic Simple Design System components exist, but their ownership and token/API model do not
  match the UniERP source contract
- Code Connect mappings discovered in repositories: none

## Classification

| Area | Classification | Reason |
| --- | --- | --- |
| Existing `@kannan19302/ui` families | KEEP pending per-component audit | authoritative, public, tested implementation exists |
| Figma representation of code families | MISSING-IN-FIGMA | no local UniERP library assets exist |
| Code Connect | CREATE | no mappings were discovered |
| Generic subscribed-library components | DO NOT ADOPT as authority | incompatible ownership, identity and token model |
| Strata/Meridian naming and authority | MODIFY/RECONCILE | accepted ADR and owning suite disagree |
| Legacy aliases and themes | KEEP | additive compatibility is required by accepted decisions |

## Current blocker

The authenticated Figma plan is Starter and supports one variable mode per collection. The required Light, Dark
and High Contrast modes cannot be represented in one semantic collection on this plan. The attempted collection
creation failed atomically; no partial token state exists. The owner must either provide a multi-mode-capable plan
or explicitly accept a separate-collection compatibility architecture with weaker designer mode switching.

## Next verified batch

After the plan decision, create core primitives and semantic colors, dimensions, typography and elevation; then
document foundations and build Button, Form Control, Badge/Status, Skeleton/Loading, Platform Shell and Command
Palette one at a time with metadata and screenshot validation.
