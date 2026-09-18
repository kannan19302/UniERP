# UniERP Strata — enterprise navigation v2

2026-09-07. Non-normative design proposal. Built-in image generation.

## Designs

- [Complete shell](01_complete_shell.png): app rail, grouped finance sidebar, command header, workspace tabs and contextual scope.
- [Sidebar states](02_sidebar_states.png): expanded, collapsed and workspace switching.
- [Tabs and navigation states](03_tabs_and_nav_states.png): multiple open records, open-tab search and unsaved-work protection.

## Proposed interaction rules

The sidebar opens destinations; the tab strip retains workspaces and records. They have distinct jobs. Keep one module navigation source and one document tab strip.

- Selecting an already-open destination focuses its tab. An explicit Open in new tab action creates another instance when useful.
- Each tab retains filters, scroll position and draft state. Switching modules keeps open tabs.
- Tabs can be reordered, pinned and closed. The plus button opens a destination picker; overflow search exposes all open tabs without shrinking titles into unreadability.
- Entity, currency, period and record context belong to each tab. Switching tabs updates the Strata scope band; changing one tab's context must not silently retarget another tab or its draft.
- Tenant switching must remain an explicit boundary: resolve dirty work and clear/re-authorize tenant-bound tabs. Browser history or restored tabs cannot bypass authorization.
- Distinguish document lifecycle Draft from unsaved edits: a draft can be saved. Use the dot with an accessible Unsaved changes label; Draft remains a separate state label.
- Closing unsaved work offers Keep editing, Discard changes, or Save draft & close. Save failure keeps the tab open with recoverable error feedback.
- Keyboard implementation requires named tabs, roving focus, arrow/Home/End navigation, focus restoration and a keyboard alternative for reordering. Do not hijack browser Ctrl+T/Ctrl+W.
- Restore saved session metadata only within authorized scope; do not persist sensitive draft payloads in unprotected browser storage.
- At narrow widths, collapse the finance pane and use searchable tab overflow; preserve usable titles and focus targets.

These are proposed requirements for future implementation, not claims about shipped behavior. Existing TabbedConsole source was inspected: it exposes active tabs, close callbacks and a dirty marker; this inspection does not establish pinning, reordering, draft preservation, overflow search or safe-close behavior.

## Design authority

- Accepted ADR-0009: Strata Workbench enterprise design language.
- Design Platform EXPERIENCE.md: operational context boundary, separator-led layouts and task-based density.
- Project unierp-strata-design skill: TabbedConsole and density/typography guidance.
- Existing design-system/src/shell/tabbed-console/tabbed-console.tsx and strata-bar/strata-bar.tsx as implementation evidence only.

Risk: R1 local raster exploration. Owners: PLT-DS and PLT-ERP. Knowledge delta UPDATED: this non-normative proposal and prompts. No owning specification or public contract changed.

## Review notes

All three output images were visually inspected. The intended light Strata palette, hierarchical navigation, tabs and requested state examples are present. Raster spacing and icons vary slightly between the full shell and component sheets. The tab-search popup extends into the adjacent specimen on the sheet; specimens illustrate separate states, not simultaneous live overlays. The collapsed expand control should point outward in implementation. Ledger data is illustrative; visible rows are not accounting proof.

## Cycle report

Status: DONE for image design delivery.
Objective: create dedicated enterprise sidebar/navbar concepts with multiple Chrome-style workspace tabs.
Completed: 3/3 images, visual review, interaction proposal and prompts saved in a new directory.
Incomplete in image scope: none.
Designed YES; implemented, integrated, deployed and released NOT APPLICABLE.
Tested: visual inspection and file existence/PNG header verification only.
PASS: all three generations succeeded; all three PNGs saved with overwrite disabled; dimensions verified. Earlier files preserved by additive-only operations.
FAIL: none for artifact checks.
NOT RUN: app build, typecheck, token gates, keyboard, accessibility and E2E tests; no executable UI changed.
No schema, contract, migration, authorization or production impact.
Next required action: none for image delivery. Implementation needs separate scoped design/contract and behavioral proof.

