# Information architecture and screen sequence

The ordered catalog is ../design/SCREEN_MANIFEST.json. Stable references use DP-001..DP-108. Original IDs are retained as originId; old numbers must not be confused with new filenames. The design directory contains one selected image per stable screen ID. Do not implement the ordinal as a URL.

## Journey order

- 01 Start and navigate: 12 screens.
- 02 Compose and reuse: 14 screens.
- 03 Build websites: 16 screens.
- 04 Build applications: 18 screens.
- 05 Integrate and extend: 15 screens.
- 06 Validate and deliver: 16 screens.
- 07 Secure and operate: 17 screens.

Entry: hosted Identity handoff → Developer getting started or project home → project/library → artifact editor → validate/review → release → observe/recover. A returning user resumes authorized document tabs; a first-time user receives setup guidance. Lack of project access shows an empty/forbidden state rather than a broken canvas.

## Shell hierarchy

1. Global header: tenant context, global search, platform launcher, help, notifications and account.
2. Document tabs: resource title/type, dirty or sync status, close and overflow. Active tab owns its breadcrumb, authorization and query state.
3. Context navigation: project or library and active capability; settings and operations appear where entitled.
4. Page tools: primary action plus task-specific filters; no competing global primary actions.
5. Work area: canonical floorplan. Inspectors and drawers disclose advanced features without obscuring the primary task.
6. Status: actual save/validation/operation state with actionable detail.

Cross-platform destinations: Developer, Marketplace, OCC, tenant website and Account Center. Use each platform's published navigation/session contract. Do not embed provider authority or forge authentication through URL parameters.

## Tabs, search and navigation rules

A tab key includes tenant, scope, resource ID and mode; two records with equal display names remain separate. Opening an existing resource focuses its tab unless the user explicitly chooses a comparison. Reorder, pin, close others and reopen last closed preserve server authorization. Limit restored active editors with lazy mounting, and unload private state when tenant changes or access is revoked. Browser URL reflects the active resource; browser back/forward restores the corresponding state. Use roving tabindex and accessible tab/tabpanel relationships; never hijack browser-reserved shortcuts.

Search groups Projects, Resources, Actions and Help, filters server-side by access and shows why an action is unavailable when safe. Results open in a document tab or external platform according to destination ownership. Notifications preserve originating tenant/project; opening one rechecks access.

## Project versus organization library

Current domain: one DevProject is an APP or SITE. Organization catalogs and grouping views can show both. The older “Supplier experience” container in some images is a presentation label, not a new aggregate. A durable multi-project solution is decision D-02; do not change the existing XOR model implicitly.

The accepted portability matrix is the target authority. Frontend navigation scopes are observed current behavior and must converge with server capabilities. Show unsupported kinds as unavailable with reason until the adapter/service passes conformance, rather than pretending all library options work.

## Pattern mapping

Use DataWorkspace for catalogs/audit, RecordShell for version/package detail, SplitViewShell for delivery/error triage, SettingsShell for bindings/identity/consent, PlanningWorkspace for work and release planning, StudioShell for visual editors, and TabbedConsole for the containing shell. A page can compose these only through approved exports.

Repeatable states: skeleton loading, empty authorized catalog, retryable dependency error, forbidden, missing resource, stale revision, offline draft, operation pending/canceled/failed and partial recovery. Screens DP-001/025/026 and their mapped patterns are design references, not separate mandatory routes for every feature. Field-level validation and destructive-review details are specified by each story.

## Responsive behavior

At desktop width retain canvas and both docks. At intermediate width collapse the less-used dock with an accessible control. At narrow widths choose list/inspector or preview mode; complex authoring may be restricted only with an explicit product decision and useful alternative. All content must reflow and remain navigable at zoom. Render RTL using logical properties; code, URLs and opaque IDs remain directionally isolated.
