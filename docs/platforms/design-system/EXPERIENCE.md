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
- `DS-UX-010`: Typography roles shall be stable across themes and import paths: Inter for headings,
  body and business data, with tabular lining figures for aligned numbers. IBM Plex Mono with
  system monospace fallback is reserved for identifiers, UUIDs, hashes and code. Theme changes
  shall not change the typography family. Load Inter rather than relying only on a family declaration.

## Business foundation decisions

These choices implement the user's 2026-09-22 foundation direction. The
[change contract](FOUNDATION_CHANGE_CONTRACT.md) tracks proof; this section states intent.

| Axis | Strata choice | Application rule |
| --- | --- | --- |
| Style | Restrained operational workbench; shadcn Nova is a polish reference | Aligned data surfaces, clear hierarchy, no decorative gradients or card around every section |
| Base colour | Slate light, zinc/obsidian dark | Light canvas `#f8fafc`, surface `#ffffff`, sunken `#f1f5f9`; dark canvas `#09090b`, surface `#18181b` |
| Text | Slate ink / near-white | Light primary `#0f172a`, secondary `#334155`; dark primary `#fafafa`; use semantic roles |
| Action colour | Strata cobalt / accessible sky in dark | Light primary action `#1d4ed8`, identity/focus `#2563eb`; dark primary `#38bdf8` with dark foreground |
| Status colour | Emerald success, amber warning, crimson danger, blue information | Pair colour with text or icon; validate foreground/background pairs in each theme |
| Charts | Existing categorical semantic ramp | Legends, labels and non-colour distinctions; never imply missing data is zero |
| Body and headings | Inter | Body 400, labels/actions 500, headings 600, emphasis 700; sentence case |
| Type hierarchy | Existing enterprise semantic scale | Body 13px standard / 14px comfortable, section 16px, workspace 18–20px, page 22–24px, major metric 28–32px; minimum 11px |
| Numbers and code | Inter tabular lining figures for business numbers; IBM Plex Mono for code | Do not turn financial tables or ordinary labels into monospace text |
| Icons | Lucide through `@kannan19302/ui/icons` | Existing density sizes 14/16/18/20px; default stroke 1.75, compact 1.5; label icon-only actions, hide decorative icons from assistive technology |
| Radius | Default graduated scale | xs 4px, sm 6px, md 8px, lg 10px, xl 12px, 2xl 16px; pills only for intentionally pill-shaped elements; consistent across themes |
| Spacing | Existing 4px rhythm, documented 2px optical half-step | Controls 8–12px internal spacing, groups 16px, sections 24px through tokens |
| Density | Standard by default; compact for operational tables | Keep all four supported modes; touch targets at least 44px even where visual rows are 40px |
| Borders | Quiet separators, stronger control boundaries | 1px default, 2px focus; decorative separators are not evidence of accessible control contrast |
| Elevation | Flat workspace, subtle summaries, elevated overlays | No shadow for ordinary sections; use existing elevation roles for cards, menus and dialogs; high contrast uses explicit borders |
| Menus | Solid surfaces, subtle highlights | Clear focus, selected state and keyboard navigation; no glass/translucent text surfaces |
| Layout | Context boundary + page header + task surface + bounded actions | Preserve seven existing workspace floorplans and provider/tenant separation |
| Motion | Feedback to user actions | Existing 100/200/300ms durations; no ornamental looping motion; honour reduced motion |
| States | Explicit and actionable | Default, hover, focus, pressed, selected, disabled, read-only, pending, validation, empty, error, forbidden, offline and stale where relevant |
| Responsive and language | Task-first reflow, logical properties | Test narrow screens, zoom, long translations, RTL, keyboard, screen readers and forced colours |
| Ownership | Design-system owns presentation | Consumers pass data/actions and compose published components; no local visual forks |

The radius values are UniERP's documented default scale, not an assertion that every shadcn
style resolves “Default” to the same numbers. Retain public token names and APIs. Any new
component family must adopt these decisions before defining additional variants.

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
