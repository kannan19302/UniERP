# Shared state and interaction coverage

This matrix distinguishes dedicated screens from reused state patterns. It does not claim a separate image for every surface × state permutation. Screen 74 defines loading/empty/error/forbidden/not-found/offline; 73 defines hosted sign-in and callback recovery; v1 screen 16 defines unsaved-close and conflict states. Each surface applies these patterns with its own resource name, scoped return path and authorized recovery action.

| Surface | Scope | Main screens | Creation/detail | Shared states |
| --- | --- | --- | --- | --- |
| forms | app, library | 36, 37 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 13, 72 |
| advanced-forms | app, library | 38 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 13, 72 |
| workflows | app, library | 39, 11, 54 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 13, 72 |
| bpmn | app | 44 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 13, 72 |
| dashboards | app, library | 40, 41 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 13, 72 |
| data-objects | app | 42, 43 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 13, 72 |
| rules-engine | app, library | 45 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 13, 72 |
| api-builder | app | 46 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 13, 72 |
| logic | app | 47 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 13, 72 |
| mobile-builder | app | 48 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 13, 72 |
| site-pages | site | 23, 4 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 35, 13 |
| site-collections | site | 24, 25 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 35, 13 |
| site-blog | site | 26, 27 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 35, 13 |
| site-assets | site | 28 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 35, 13 |
| site-menus | site | 29 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 35, 13 |
| site-seo | site | 30 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 35, 13 |
| site-ab-testing | site | 31 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 35, 13 |
| site-orders | site | 32 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 35, 13 |
| site-submissions | site | 33 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 35, 13 |
| site-settings | site | 34, 35 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 35, 13 |
| manage-developer-governance | manage | 51 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-releases | manage | 52, 13, 35 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-environments | manage | 53 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-logs | manage | 54 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-access | manage | 55, 14 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-components | manage | 56, 7, 8 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-connectors | manage | 57, 10 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-marketplace | manage | 58 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-query-builder | manage | 59 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-widgets | manage | 60 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-etl | manage | 61 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-theme | manage | 62 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-git | manage | 63 | Not applicable: runtime/settings surface; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |
| manage-mobile-export | manage | 64 | Primary design inline form/wizard; draft only; Primary mapped split view/editor | 74; auth 73; review 52, 55, 72 |

## Behavior to preserve in implementation

- Loading announces progress without claiming saved or complete. Empty states offer only permitted creation actions. Errors expose safe correlation identifiers and retry paths without secrets.
- Forbidden states distinguish missing access from unavailable features. Not-found does not reveal cross-tenant resource existence. Recovery returns to a valid scoped project.
- Drafts saved locally remain explicitly unsynced; local persistence failure is an error. Reconnect revalidates access and resolves version conflicts. Shared offline artwork is a pattern, not offline capability for every endpoint.
- Create flows keep draft, version, link, approval and deployment distinct. Domain verification, credential rotation/revocation, archival and rollback require impact review. No destructive operation occurs from viewing these concepts.
- Portable app artifacts use app/library context variants; project-bound builders keep their registered boundaries. A version reference retains library ownership. Copying is explicitly independent. Link review and updates are screens 9/72.
- Search/filter/sort/selection/pagination use the common list pattern. Screen 76 covers command palette, notifications, profile and help. Keyboard traversal, focus restoration, accessible names, announcements, touch targets and actual contrast need executable UI evidence later.
- Modal/drawer escape and cancel return focus to the trigger; unsaved navigation prompts before dropping changes; role previews never substitute for server authorization.

## Detailed treatment versus route count

Catalog and editor routes sharing a feature map to the feature's dedicated list/editor or split-view screen. Dynamic route expansion follows the registry. Legacy path aliases receive their corresponding modern destination treatment. Runtime routes with no authoring use read-only records and links to the owning operational product.
