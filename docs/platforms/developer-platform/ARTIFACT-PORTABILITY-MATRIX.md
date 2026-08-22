# Artifact Portability Matrix v1

Status: Accepted baseline for Phase 1  
Authority: server builder manifest and `@kannan19302/contracts` must converge on this matrix

No portable artifact may contain secret material. `SECRET_REFERENCE` contains a stable binding key and required capability only.

| Kind | Owner scopes | Consumers | Portability | Install modes | Runtime | Package |
|---|---|---|---|---|---|---|
| FORM | Project, Library | App, Site | Conditional on typed data/action mappings | Linked, pinned, forked, embedded | Trusted metadata | Yes |
| ADVANCED_FORM | Project, Library | App, Site | Conditional | Linked, pinned, forked | Trusted metadata | Yes |
| WORKFLOW | Project, Library | App, Site | Conditional on events/actions | Linked, pinned, forked, embedded | Trusted metadata | Yes |
| BPMN_PROCESS | Project, Library | App | Conditional | Pinned, forked, embedded | Trusted metadata | Yes |
| DASHBOARD | Project, Library | App, Site | Conditional on metrics/data | Linked, pinned, forked, embedded | Trusted metadata | Yes |
| DASHBOARD_WIDGET | Project, Library, Manage | App, Site | Portable | Linked, pinned, forked | Browser | Yes |
| DATA_OBJECT | Project, Library | App | Conditional on namespace/migrations | Pinned, forked, embedded | Trusted metadata | Yes |
| RULE_SET | Project, Library | App, Site | Conditional on input interface | Linked, pinned, forked, embedded | Trusted metadata | Yes |
| API_ENDPOINT | Project, Library | App, Site | Conditional on auth/data bindings | Pinned, forked, embedded | Trusted metadata | Yes |
| SAVED_QUERY | Project, Library, Manage | App, Site | Conditional on data interfaces | Linked, pinned, forked | Trusted metadata | Yes |
| SCRIPT | Project, Library | App, Site | Conditional on capabilities | Pinned, forked, embedded | Sandbox | Yes |
| MOBILE_APP | Project | App | Project-only composition | Embedded | Browser | No |
| ETL_PIPELINE | Project, Library, Manage | App, Site | Conditional on connectors | Pinned, forked, embedded | Isolated worker | Yes |
| THEME | Project, Library, Manage | App, Site | Portable token contract | Linked, pinned, forked, embedded | Browser | Yes |
| PAGE | Project, Library | App, Site | Conditional on components/data | Linked, pinned, forked, embedded | Browser | Yes |
| PAGE_SECTION | Project, Library | App, Site | Portable with declared bindings | Linked, pinned, forked | Browser | Yes |
| COMPONENT | Project, Library, Manage | App, Site | Conditional on UI slots/capabilities | Linked, pinned, forked | Browser or Sandbox | Yes |
| COLLECTION | Project, Library | Site | Conditional on schema | Pinned, forked, embedded | Trusted metadata | Yes |
| BLOG_POST | Project | Site | Project content | Embedded | Trusted metadata | No |
| MENU | Project, Library | App, Site | Conditional on route mappings | Linked, pinned, forked, embedded | Trusted metadata | Yes |
| ASSET | Project, Library | App, Site | Portable subject to license/policy | Linked, pinned, forked, embedded | Browser | Yes |
| SEO_PROFILE | Project, Library | Site | Portable | Linked, pinned, forked, embedded | Trusted metadata | Yes |
| AB_TEST | Project | Site | Project/environment-specific | Embedded | Trusted metadata | No |
| TEST_SUITE | Project, Library | App, Site | Conditional on target interfaces | Linked, pinned, forked, embedded | Isolated worker | Yes |
| CONNECTOR_DEFINITION | Library, Manage | App, Site | Portable schema; no credentials | Pinned | Isolated worker | Yes |
| DATA_MIGRATION | Project, Library | App, Site | Conditional and version-bound | Pinned, embedded | Isolated worker | Yes |
| POLICY | Project, Library, Manage | App, Site | Conditional on resource contract | Pinned, forked, embedded | Trusted metadata | Yes |
| SECRET_REFERENCE | Project, Library | App, Site | Binding key only | Pinned, embedded | Trusted metadata | Yes |

Every row requires schema validation, unknown-field preservation, deterministic dependency extraction, permission enforcement, preview isolation, installation/removal tests, upgrade classification, tenant-isolation tests and deterministic release compilation. Browser and executable kinds additionally require accessibility or sandbox/egress conformance as applicable.
