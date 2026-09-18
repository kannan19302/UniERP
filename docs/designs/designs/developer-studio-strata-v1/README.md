# UniERP Developer Studio — Strata v1

16 dedicated light-mode concept screens. Project-first website and app builders, standalone resources, versioned project linking, and enterprise review workflows.

## Screen index

| # | Screen | Image |
| --- | --- | --- |
| 1 | Projects workspace | [Open](01_projects.png) |
| 2 | Create project | [Open](02_create_project.png) |
| 3 | Project overview | [Open](03_project_overview.png) |
| 4 | Website visual builder | [Open](04_website_builder.png) |
| 5 | Application visual builder | [Open](05_app_builder.png) |
| 6 | Standalone builders | [Open](06_standalone_builders.png) |
| 7 | Organization library | [Open](07_resource_library.png) |
| 8 | Reusable component builder | [Open](08_component_builder.png) |
| 9 | Link library resource to project | [Open](09_link_to_project.png) |
| 10 | Data and integrations | [Open](10_data_integrations.png) |
| 11 | Workflow and interaction builder | [Open](11_workflow_builder.png) |
| 12 | Preview and quality | [Open](12_responsive_preview.png) |
| 13 | Release review | [Open](13_releases.png) |
| 14 | Project settings and access | [Open](14_project_settings.png) |
| 15 | API and extensions | [Open](15_api_extensions.png) |
| 16 | Navigation and recovery states | [Open](16_navigation_states.png) |

## Read the proposal

[Design plan and research](DESIGN_PLAN.md) · [Exact generation prompts](PROMPTS.md) · [Verification](VERIFICATION.md)

Start with Projects, then Project overview, Website builder and Application builder. Standalone builders → Organization library → Link to project shows the alternate entry path. The component editor demonstrates reusable contracts and version history.

## Interpretation notes

These are raster concepts, not implemented screens or tested product features. All people, data, dates, endpoint examples and status readings are illustrative. Small labels, icon selection, navigation widths and active-tab treatments vary between generations; implementation must normalize them using approved Strata components.

- The Library screen's 'Global library' label means the current organization's library, never cross-tenant scope. Use 'Library' consistently in implementation. The component's website publishing field is irrelevant and should be omitted in implementation.
- 'No project' means library-owned, not unused: published versions may already be referenced by projects while the current draft remains library-owned.
- Link review may be entered to inspect impact, but confirmation remains blocked until the source version and permissions are ready. The destination is the combined Supplier experience project, despite the image's narrower 'Website project' caption.
- Website hero landmark selection is illustrative; use correct header/main/section semantics rather than assigning banner to arbitrary hero sections. Accessibility findings require human validation, including whether imagery is decorative.
- The release manifest is a visual excerpt. A real release must enumerate every included artifact, including the workflow shown in its change summary. Restore opens a reviewed rollback flow rather than immediately deploying.
- Workflow error and success edges need explicit port labels in implementation. The diagram represents the intended flow, not an executable workflow contract.
- API/data scopes, token names, URLs and quota values are illustrative, not newly published contracts. Data classification, residency and server-verification badges require actual evidence. Use reserved example domains in implementation fixtures.
- Offline synchronization wording describes intended behavior; local persistence failure, reconnect conflicts and revoked access must be handled before promising synchronization.

## Delivery boundary

Designed: yes, 16-view concept set. Implemented/integrated/deployed/released: no, outside this artifact task. Runtime tests and WCAG certification do not apply to PNGs; future UI implementation requires those checks. Existing designs preserved.
