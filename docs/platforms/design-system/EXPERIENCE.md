# Design Platform UX and Design Requirements

Experience scope: WCAG 2.2 AA, keyboard/focus semantics, theme and density compatibility, responsive/localized behavior.

- `DS-UX-001`: Interfaces shall make actor, tenant/environment scope and lifecycle state explicit.
- `DS-UX-002`: Loading, empty, stale, degraded, failed and successful states shall be distinct.
- `DS-UX-003`: Destructive or irreversible actions shall disclose target, impact and recovery.
- `DS-UX-004`: Shared patterns shall use the Design Platform and meet WCAG 2.2 AA.
- `DS-UX-005`: Localization, time, number, currency and unit semantics shall be unambiguous where applicable.
- `DS-UX-006`: Strata Workbench shall use operational context—not ornamental styling—as its recognizable
  signature, and shall expose actor, tenant, legal entity, organizational scope, period, object and lifecycle state
  where they affect meaning or authorization (with legacy `MeridianBar` preserved as a drop-in adapter).
- `DS-UX-007`: Independent cards shall represent independent summaries, comparisons or choices. Records, tables,
  forms and related panels shall otherwise use aligned, separator-led workspace surfaces.
- `DS-UX-008`: Density shall follow task, device and input mode across a 4-tier scale: Ultra-Compact (24px) for
  general ledgers, financial journals, stock balances; Compact (28px) for operational queues and incident triage;
  Standard (32px) for default enterprise workflows, CRM, HR, master records; and Comfortable (40px) for onboarding,
  touch-first POS terminals, and executive overviews.
- `DS-UX-009`: Status, selection, focus, validation and authorization state shall never rely on colour alone.
- `DS-UX-010`: Typography roles shall be stable across themes and import paths: Plus Jakarta Sans / Inter Display
  for clean structural hierarchy, Inter with tabular lining figures for body and business data, and JetBrains Mono /
  Geist Mono for identifiers, UUIDs, cryptographic hashes, and aligned code.

## Strata Workbench visual language

The canonical Strata light palette begins with tactile Slate 50 `#f8fafc` ground, elevated cards `#ffffff`, sunken wells `#f1f5f9`,
hairline 1px micro-borders `#e2e8f0`, and Strata Cobalt `#2563eb` interaction accent. Obsidian dark mode establishes `#09090b` ground,
`#18181b` card elevated, `#27272a` borders, and `#38bdf8` electric sky accent. High Contrast mode guarantees WCAG AAA 21:1 pure black/white
with 2px focus indicators. Legacy Meridian tokens (`#14191b`, `#0e6b75`, `#f7f6f4`) are preserved through backward-compatible aliases.

The single expressive element is the **Strata context boundary** (`<StrataBar>` / `<MeridianBar>`): a compact address-like band or rail that
locates the user in organizational and business state. Everything around it is disciplined—strong alignment,
short labels, tabular numerals, minimal shadow and motion only when it explains a state transition.

## Workspace floorplans

| Floorplan | Primary job | Typical structure | Recommended density |
| --- | --- | --- | --- |
| Data Workspace | scan, compare, filter and act on records | context boundary, command bar, filters, data surface, bounded status/pagination | compact or standard |
| Record Workspace | understand and progress one object | context boundary, object header, sections/tabs, related data, optional inspector | standard |
| Transaction Workspace | enter, validate, review and commit work | context boundary, persistent validation, grouped fields/lines, totals, actions | compact or standard |
| Operational Workspace | monitor work and resolve exceptions | context boundary, exception queue, trends, live/stale state, drill-down | compact |
| Planning Workspace | arrange time, capacity or sequence | context boundary, board/calendar/timeline, inspector and constraints | standard |
| Settings Workspace | configure policy safely | scoped navigation, configuration surface, dirty state and save/discard boundary | standard |
| Studio Workspace | build and preview composed artifacts | tool rail, canvas, properties, preview/publish state | standard |

## Responsive and accessibility behavior

- Complex grids preserve a semantic table/grid alternative and expose horizontal overflow as a labelled,
  keyboard-focusable region. Mobile may switch to prioritized records or detail views rather than compress every
  column into an unusable table.
- A density preference may alter visual spacing but does not change permission, record scope or available action.
- Focus order follows reading and task order; opened inspectors and dialogs restore focus to their invoker.
- Dynamic sorting, filtering, bulk selection, saves and long-running results use concise status announcements.
- Reduced-motion, forced-colour, long translated content and RTL are first-class matrix dimensions.

UI presence is DECLARED evidence only until backed by real contracts and workflow tests.
