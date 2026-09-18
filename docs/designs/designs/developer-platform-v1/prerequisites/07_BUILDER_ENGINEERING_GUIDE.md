# Shared builder engineering guide

This is proposed implementation guidance subordinate to the accepted portability matrix and ADRs 0005–0007. The editor registry is discovery evidence, not an ownership contract. A registered route does not establish save, compile, preview, export or runtime support.

## One lifecycle, several authoring experiences

Use the existing BuilderArtifact, ArtifactRevision, package, installation and release services. Editors must not introduce their own project identity, release tables or secret storage. DevProject remains exactly one APP or SITE; Library is an independent owner scope. A project-group view may filter related projects without becoming a new persistence aggregate.

Every builder adapter must expose the following behavior through versioned contracts. Names below describe responsibilities, not new API names to implement blindly.

| Responsibility | Required behavior | Proof |
| --- | --- | --- |
| Discover | Advertise supported artifact kind, subtype, schema versions, permitted owner scopes and runtime trust class | Registry matches accepted matrix; unsupported combination denied server-side |
| Load | Fetch an authorized revision, preserve unknown fields, distinguish missing from inaccessible safely | Foreign tenant, stale revision and deleted reference cases |
| Edit | Typed commands over a normalized document; semantic undo/redo; bounded history | Undo/redo retains stable node IDs and dependency references |
| Validate | Schema, semantic, dependency and policy diagnostics with node/field pointers | Invalid graph cycle, type mismatch and unsafe expression cases |
| Save | Optimistic concurrency and command idempotency; immutable saved revision | Two editors start at r12; second writer receives conflict and keeps local edits |
| Compile | Deterministic output from exact revisions, compiler version and dependency lock | Same inputs produce same digest in clean runs |
| Preview | Isolated runtime with explicit environment, principal, bindings and synthetic fixtures | Preview cannot escalate to production data or author credentials |
| Package | Dependencies, capabilities, tests, migrations and nonsecret schemas | Missing transitive dependency prevents package validation |
| Export/import | Canonical portable representation, mapping dry run and version adapters | Export to clean tenant, rebind, import and semantic roundtrip |
| Run | Use signed local bundles and bounded host capabilities | Control-plane outage does not require synchronous authoring-plane lookup |
| Retire | Impact inspection, consumer remapping and audit | Cannot remove a referenced installation or silently delete business records |

## Artifact families and design entry points

These are coverage anchors. A screen can author several kinds; the mapping does not create new enum members. Exact scope/portability conditions remain in ARTIFACT-PORTABILITY-MATRIX.md.

| Accepted kind(s) | Design area | Additional engineering obligations |
| --- | --- | --- |
| FORM, ADVANCED_FORM | Application form and advanced form editors, DP-043–060 | Accessible controls, validation summary, conditional visibility, server validation |
| WORKFLOW, BPMN_PROCESS | Workflow/process editors and DP-060 | Deterministic state transitions, timers, retry, compensation, independent approval |
| DASHBOARD, DASHBOARD_WIDGET | Dashboard/widget builders and DP-058 | Governed metric units, aggregation, row policy, accessible tabular equivalent |
| DATA_OBJECT | Data model builder | Tenant ownership, safe schema evolution, references and decimal/unit types |
| RULE_SET | Rule and policy builders | Typed expression AST, bounded execution, explainable simulation |
| API_ENDPOINT, SAVED_QUERY | API/query builders and DP-069 | Parameterization, schema compatibility, permission and row/field policy |
| SCRIPT | Script/extension authoring | Sandbox only, no ambient filesystem/network/DB or raw secrets |
| MOBILE_APP | Mobile builder | Project-only ownership; adaptive layout, device permissions and offline conflict policy |
| ETL_PIPELINE | Data pipeline builder, DP-075 and DP-082 | Checkpoints, rejected-row reconciliation, idempotent sink and compensation |
| THEME | Theme/token authoring | Approved tokens, contrast, platform accent and density validation |
| PAGE, PAGE_SECTION, COMPONENT | Website canvas/component editor, DP-027–042 | Semantic DOM, stable nodes, responsive rules and dependency extraction |
| COLLECTION, BLOG_POST, MENU | CMS/content/navigation editors | Content versions, reference integrity, locale fallback; BLOG_POST stays project content |
| ASSET | Asset library | Content scanning, metadata minimization, size/type limits and safe delivery |
| SEO_PROFILE, AB_TEST | Website SEO/experiments | Canonical URLs, locale relationships, consent; AB_TEST remains project content |
| TEST_SUITE | DP-077–078 | Reproducible assertions, immutable run evidence and explicit Not run |
| CONNECTOR_DEFINITION | Connector library, DP-074 | Schema/capability declaration only; credentials supplied through bindings |
| DATA_MIGRATION | DP-082 | Expand/backfill/verify/contract, checkpoints and mixed-version compatibility |
| POLICY | DP-097 and DP-060 | Server-enforced rules, simulation parity, deny overrides and audit |
| SECRET_REFERENCE | DP-098 | References only, managed vault resolution, version/rotation/revocation |

Notification/document templates (DP-059) and semantic reports (DP-058) must reuse an accepted kind/subtype if semantics fit. Otherwise request a reviewed contract addition; do not invent TEMPLATE or REPORT enum values in the frontend.

## Two mandatory vertical pilots

**App pilot:** create an APP project; define a synthetic supplier object; author a form with required name and optional region; attach independent approval; save r1; create a managed library form component; install it pinned; test validation and tenant denial; package, preview, approve and promote in an isolated environment; export and import to a clean tenant. Negative proof includes stale save, missing binding, self-approval, cross-tenant query and revoked dependency.

**Site pilot:** create a SITE project; author Home and authenticated Supplier pages; bind only an explicit anonymous field allowlist; add a reusable section, locale and consent policy; preview anonymous and signed-in principals separately; publish through Tenant Sites ownership; verify canonical URLs and cache invalidation; export/import with clean bindings. Negative proof includes anonymous private fields, draft-content exposure, unverified domain and unsafe embedded script.

Do not spread implementation over all 108 screens before both lifecycle pilots pass. Then add adapters in families, keeping the same conformance suite. Third-party builders remain unavailable until the conformance, supply-chain and runtime trust gates pass.
