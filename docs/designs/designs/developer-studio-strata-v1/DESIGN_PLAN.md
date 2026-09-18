# UniERP Developer Studio — Strata concept v1

2026-09-07. R1: additive local image/design artifacts only. Knowledge delta: UPDATED (non-normative proposal and evidence). Existing designs are preserved.

## Outcome and scope

Design a project-first workspace unifying website and application composition, with standalone builders and an organization resource library. Deliver 16 dedicated desktop concept images covering projects, creation, project overview, website editor, app editor, standalone builders, library, component editor, linking, data, workflow, preview, releases, access, API/extensions, and navigation/recovery states.

This is an experience proposal, not an implementation or ownership decision. Developer Platform owns developer contracts, extensions and sandbox capabilities. Tenant Sites owns website composition/publishing/runtime. A unified workbench composes these surfaces without transferring authority. OCC owns organization policy; Identity owns account access; Strata owns common UI. Any implementation requires an R2 cross-platform change contract and owning requirements/contracts before code changes.

## Proposed interaction model

- Projects organize websites, applications, resource references and environment/release manifests.
- Standalone work is saved in the organization library with an explicit No project label; projects are optional at creation.
- Link a reviewed version by reference, or create an explicitly independent editable copy. Linking keeps source ownership; membership in the destination does not confer source editing rights.
- Draft resources require a version before a versioned link can complete. Dependencies, compatibility, permissions and destination are reviewed before confirmation. Updates are opt-in and reviewed, never silently propagated.
- Editors share navigation, scoped context, responsive preview and inspectors. Website editing prioritizes pages, layers, content and layout; application editing prioritizes screens, data and events.
- Browser-like document tabs retain per-document context and drafts. Unsaved-close, offline and conflict states are explicit.
- Release review separates draft saving, library versioning, staging deployment and public publishing. Pending checks block release actions. Backend authorization remains mandatory.

## Visual direction

Apply accepted ADR-0009 Strata light surfaces, cobalt active edges, navy text, compact rows and restrained radii. Use StudioShell, TabbedConsole, DataWorkspace and SettingsShell. Operational context is visible in a thin StrataBar. Avoid copying competitor layouts or branding.

## Behavioral references

- [Webflow Libraries](https://help.webflow.com/hc/en-us/articles/33961343551763-Libraries): reusable library resources and controlled reuse.
- [Webflow Shared Libraries](https://webflow.com/feature/shared-libraries): component properties and variants as reuse guardrails.
- [Framer components](https://www.framer.com/help/articles/using-components/): reusable visual components.
- [Framer workspace hierarchy](https://www.framer.com/help/articles/organizations-workspaces-and-folders/): organizational/project hierarchy and scoped collaboration.

These references inform interaction questions only. UniERP's project-first website/app workbench, explicit ownership/version linking, Strata context band and enterprise inspectors are this proposal's composition.

## Authorities and evidence

Reviewed project enterprise-brain, AI agent protocol, knowledge lifecycle, platform catalog, accepted Strata ADR and Developer Platform/Tenant Sites PRDs. Their documented lifecycle maturity remains unverified; concept screens are not evidence of feature availability.

## Verification and future implementation

Inspect every generated screen visually; verify PNG signatures/dimensions, complete 16-screen inventory and baseline hashes. Raster text and spacing remain approximate. No runtime, WCAG, role enforcement, synchronization, release or API correctness claim is made. Future UI must use approved UI components/tokens and prove loading, empty, error, forbidden, offline, keyboard and assistive-technology behavior. Future linking contracts need version compatibility, tenant authorization, immutable provenance, audit, rollback and revocation handling.

No production code, migrations, credentials, external messages, deployment or publication are in scope. Rollback is simply choosing not to adopt this separate proposal folder.
