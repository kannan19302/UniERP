# Advanced Developer Platform — Target Architecture and Delivery Plan

Status: Draft for architecture review  
Date: 2026-08-21  
Scope: Full-stack App Studio, Web Studio, reusable Library, all current and future builders

## 1. Executive decision

UniERP should become a metadata-driven application platform with two equal authoring modes:

1. **Project mode:** one `DevProject` is one deployable application. An App project or Site project opens a complete workspace containing every compatible builder needed to deliver a working application.
2. **Library mode:** an artifact, component, connector, workflow, schema, theme, test, or package can be created independently, versioned independently, and later installed or linked into one or many projects.

The same builder implementation must run in both modes. Project and Library are ownership and composition scopes, not separate products or duplicated editors.

The long-term unit of reuse and deployment is a **versioned package**, not a mutable database row. A project release is an immutable, dependency-locked composition of package versions, configuration, policies, and environment bindings.

The implementation must begin with two end-to-end vertical slices, not with a broad generic framework or additional disconnected builder screens:

1. **App pilot:** Library Form → install into App project → bind to a project Data Object → apply permissions → test → release to preview → promote → upgrade or roll back.
2. **Site pilot:** Library Page/Section → install into Site project → bind to CMS data → preview → publish → upgrade or roll back.

These pilots are the acceptance harness for every shared platform abstraction. A generic service is complete only when both pilots use it successfully.

## 2. Outcomes and non-goals

### Outcomes

- A maker can build UI, schema, logic, APIs, identity policy, integrations, tests, and deployment from one project window.
- A specialist can author the same asset independently in Library and publish it to existing projects.
- Low-code and pro-code edit the same canonical intermediate representation (IR), with round-trip-safe source export.
- Every customization is tenant-isolated, permissioned, auditable, testable, versioned, promotable, and reversible.
- App Studio and Web Studio share one platform kernel while retaining purpose-built experiences and runtimes.
- Partners can publish governed packages to a private or public marketplace without gaining direct access to a tenant's core.

### Non-goals

- Replacing all concrete builder tables in one migration.
- Making every artifact portable. Data-bound or project-secret-bearing artifacts may remain project-only.
- Allowing arbitrary server code in the control plane or database process.
- Treating visual editing as a substitute for source control, tests, or release governance.
- Copying Salesforce or SAP product structure. Their durable architectural patterns are the benchmark, not their UI or terminology.
- Increasing the number of builder screens before the revision, dependency, permission, test and release lifecycle is proven end to end.

### Long-horizon architecture posture

No architecture can freeze technology choices for decades. The durable objective is **controlled replaceability**: stable contracts and identifiers around components that can be migrated, reimplemented or relocated without rewriting customer applications.

The following invariants outrank framework, database and cloud-vendor choices:

1. Published content is immutable; change creates a new version.
2. Every external or cross-service boundary is contract-first and versioned.
3. Tenant, project, environment and principal context are explicit and server-verified.
4. Control-plane availability is not required to serve an already deployed application.
5. Runtime data is owned by domain services; builders compose through contracts rather than their databases.
6. Secrets, regional bindings and operational configuration never enter portable metadata.
7. All stored metadata has a schema version, migration path and lossless export representation.
8. Every derived runtime artifact is reproducible from immutable source, toolchain identity and lockfile.
9. Extensions receive capabilities, quotas and stable interfaces rather than ambient platform access.
10. Every irreversible operation has preview, impact analysis, authorization and evidence.
11. Platform evolution uses expand/migrate/contract transitions; fleet-wide flag-day migrations are prohibited.
12. A tenant can export its projects, packages, metadata, audit evidence and permitted business data in documented formats.

## 3. Research-derived principles

The target incorporates these verified patterns:

- Salesforce describes its platform as multitenant and metadata-driven: schema, UI, security, declarative logic, and programmatic logic are metadata materialized by the runtime. This validates a canonical metadata/IR layer rather than builder-specific runtime code generation alone. [Salesforce Platform Multitenant Architecture](https://architect.salesforce.com/docs/architect/fundamentals/guide/platform-multitenant-architecture.html)
- Salesforce's package development model treats applications and libraries as self-contained, source-controlled, versioned, installable units and distinguishes it from monolithic org development. This validates UniERP packages above individual artifacts. [Salesforce Development Models](https://developer.salesforce.com/docs/platform/code-builder/guide/codebuilder-dev-models.html)
- Salesforce package types explicitly define developer/subscriber editability and upgrade behavior. UniERP therefore needs explicit ownership, overlay, lock, and upgrade policies rather than a generic “published” flag. [Salesforce CLI package create](https://developer.salesforce.com/docs/platform/salesforce-cli-reference/guide/cli_reference_package_create.html)
- SAP distinguishes in-app and side-by-side extensions and recommends stable public APIs/events to preserve a clean core. UniERP should separate safe metadata overlays from isolated extension workloads. [SAP Extension Architecture Guide](https://help.sap.com/docs/sap-btp-guidance-framework/extension-architecture-guide/getting-started-with-extensibility)
- SAP models extensibility across presentation, application, and data tiers. UniERP's compatibility and test model must likewise evaluate UI, logic/API, and schema impacts together. [SAP Application Extension Methodology](https://help.sap.com/docs/sap-btp-guidance-framework/sap-application-extension-methodology/step-1-extension-styles)
- SAP Destinations centralize endpoint and credential configuration and bind it to projects/environments. UniERP connectors must reference vault-backed environment bindings, never embed secrets in artifacts. [SAP Build — Manage Destinations](https://help.sap.com/docs/build-service/build-service-guide/manage-destinations)

## 4. Current baseline and gap assessment

### Assets to retain

- `DevProject` already provides one identity space for App and Site projects.
- `BuilderArtifact` already represents cross-builder ownership; `ownerProjectId = null` correctly represents Library scope.
- `BuilderArtifactAttachment` already supports many-to-many project composition and reserves `pinnedReleaseId`.
- `ProjectRelease` already provides immutable project snapshots for App and Site.
- The frontend builder registry already drives routes, navigation, permissions, scope compatibility, creation flow, and editor loading from one definition.
- `extension-api`, `sdk`, `sandbox`, marketplace, identity, contracts, and test-governance packages provide useful platform boundaries.

### Critical gaps

| Area | Current shape | Required advanced-platform capability |
|---|---|---|
| Artifact source | Registry points to heterogeneous mutable rows | Canonical versioned artifact revisions with typed IR and migration chain |
| Library sharing | Attachment follows mutable head; pin reserved | Semantic versions, dependency lockfile, install/link/fork modes, upgrade diff |
| Composition | Artifact-level attachment | Package manifests, dependency graph, compatibility solver, namespaces |
| Runtime | Builder-specific behavior | Compiler/materializer services and versioned runtime contracts |
| Environments | UI surface exists | Isolated DEV/TEST/STAGE/PROD state, bindings, data policy, promotion gates |
| Auth | Broad `builder.read/write` pattern | Resource-scoped RBAC/ABAC, maker/runtime identities, end-user policy designer |
| API | Legacy `/builder/*` plus partial `/dev/*` | Project/library/package APIs, generated OpenAPI/GraphQL/events, lifecycle policy |
| Testing | Repository tests and builder tests | Per-artifact simulation, dependency tests, release validation, seeded test data |
| Collaboration | Mutable editor state | Draft revisions, optimistic concurrency, branches, comments, presence, merge |
| Operations | Logs/release screens | Unified build/deploy/run telemetry, quotas, rollback, reconciliation, provenance |
| Extensibility | Bundle and sandbox primitives | Signed package lifecycle, capability grants, isolated compute, certification |

## 5. Product information architecture

### Global developer platform

```text
Home
├── Projects
│   ├── Applications
│   └── Websites
├── Library
│   ├── Artifacts
│   ├── Components
│   ├── Packages
│   ├── Connectors
│   └── Templates
├── Marketplace
└── Manage
    ├── Environments and releases
    ├── Identity, access and policies
    ├── Connections, secrets and certificates
    ├── Source control and pipelines
    ├── Observability and audit
    └── Limits, usage and billing
```

### One project equals one application

Every project window uses the same durable shell:

```text
Overview | Build | Data | Automate | Integrate | Secure | Test | Release | Operate | Settings
```

- **Build:** pages, forms, components, navigation, themes, responsive/mobile experiences.
- **Data:** objects, fields, relations, validation, migrations, seed data, retention and access policies.
- **Automate:** workflow, BPMN, rules, approvals, schedules, jobs and event handlers.
- **Integrate:** API builder, webhooks, events, connectors, ETL and generated SDK contracts.
- **Secure:** app roles, permission sets, record/field rules, authentication flows and service identities.
- **Test:** unit, component, API, workflow, security, accessibility, performance and end-to-end suites.
- **Release:** changeset, dependency graph, validation results, approvals, environments, deployment and rollback.
- **Operate:** logs, traces, metrics, workflow runs, jobs, errors, audit and feature flags.

App Studio and Web Studio declare capability profiles against this shell. For example, Web Studio emphasizes pages, CMS, assets, domains, SEO, forms, commerce, analytics, experiments, localization and consent; App Studio emphasizes objects, record experiences, workflow, business rules, APIs, permissions, reports, mobile/offline and business-module navigation.

### Library workflow

1. Create an artifact or package without a project owner.
2. Select a compatible builder; the same editor opens with `scope.kind = library`.
3. Define explicit inputs, outputs, configuration schema, required capabilities and dependencies.
4. Test in an ephemeral preview environment.
5. Publish an immutable semantic version.
6. Install into a project as **linked**, **pinned**, or **forked**.
7. Preview upgrade changes and run compatibility tests before accepting a new version.

Definitions:

- **Linked:** follows an allowed version range and receives governed upgrades.
- **Pinned:** stays on one immutable version until explicitly upgraded.
- **Forked:** copies source and changes ownership; no automatic upstream upgrade.
- **Embedded:** project-owned artifact that is not independently reusable.

Production must never follow a mutable artifact head. Installation resolution follows these defaults:

| Environment | Allowed dependency behavior |
|---|---|
| Development | Pinned version or approved linked semantic-version range |
| Test | Fully resolved and pinned before validation |
| Staging | Same immutable lockfile proposed for Production |
| Production | Immutable exact versions and content hashes only |

An upgrade is always an explicit changeset with dependency diff, breaking-change analysis, validation evidence and approval. “Linked” means eligible for a governed update proposal; it never means silently replacing code in a running production release.

### Ownership, editability and overlays

Every package declares one editability class:

- **Managed:** consumers cannot edit package source; customization is limited to declared configuration and extension points.
- **Unlocked:** consumers may apply project-owned overlays to declared overlay points while the installed source remains immutable.
- **Internal:** organization-controlled source may be edited by authorized makers, but releases still consume immutable versions.
- **Forked:** source is copied into the project, ownership transfers, and upstream provenance is retained without automatic upgrades.

An installed revision is never edited in place. Consumer changes are stored as separately owned overlay artifacts with a target package/version, declared patch surface and conflict policy. Upgrade preview rebases and validates overlays against the proposed version.

## 6. Canonical platform model

Add a stable metadata kernel above concrete builder storage:

```text
Tenant
 ├── DevProject (APP | SITE | future project kinds)
 │    ├── ProjectBranch
 │    ├── ProjectInstallation ────── PackageVersion
 │    ├── EnvironmentBinding
 │    └── ProjectRelease ─────────── ReleaseManifest + lockfile
 └── Library
      ├── Artifact ─ ArtifactRevision ─ ArtifactDependency
      └── Package ─ PackageVersion ─── PackageItem
```

### Core entities

- `Artifact`: stable identity, kind, namespace, owner scope, visibility and lifecycle.
- `ArtifactRevision`: immutable source IR, monotonic revision number, parent revision, schema version, content hash, author, provenance, validation state and dependency snapshot.
- `ArtifactDependency`: typed reference with version constraint, optionality and usage surface.
- `Package`: stable distributable identity and ownership/editability policy.
- `PackageVersion`: immutable semantic version, signed manifest, dependency constraints, required capabilities and compatibility range.
- `PackageItem`: artifact revision included in a package and its exported interface.
- `ProjectInstallation`: package version/range installed in a project, installation mode and approved capabilities.
- `ProjectBranch`: mutable composition pointer for maker collaboration; releases never point to mutable heads.
- `ReleaseManifest`: resolved artifact/package hashes, migrations, environment requirements and test evidence.
- `Environment`: logical DEV/TEST/STAGE/PROD target with isolation class and promotion policy.
- `EnvironmentBinding`: non-secret reference from connector/config key to vault version or platform service.
- `Deployment`: state machine for validating, building, applying, verifying, activating and rolling back a release.

The lifecycle and identity boundaries are mandatory:

```text
Artifact draft
  -> immutable ArtifactRevision
  -> immutable PackageVersion
  -> ProjectInstallation with resolved lock
  -> immutable ProjectRelease
  -> environment Deployment
```

`BuilderArtifact` remains the stable identity and denormalized discovery record. Concrete builder tables remain temporary authoring/runtime projections while each builder migrates to canonical revisions. Neither a mutable concrete row nor a mutable Library head may be referenced by a release.

### Artifact IR contract

Every artifact revision uses a common envelope and a kind-specific payload:

```json
{
  "apiVersion": "unierp.dev/v1",
  "kind": "Form",
  "metadata": { "id": "...", "namespace": "acme.sales", "name": "LeadForm" },
  "spec": {},
  "interfaces": { "inputs": [], "outputs": [], "events": [] },
  "dependencies": [],
  "capabilities": [],
  "tests": [],
  "extensions": {}
}
```

The envelope is shared; each builder owns a versioned schema, validator, compiler, preview adapter, diff adapter, migration adapter and test adapter for its `kind`. Unknown fields survive read/write cycles so visual and source editors do not destroy each other's data.

Artifacts must reference other resources through typed interfaces rather than copied project-specific IDs. A portable form, for example, declares that it requires a data source implementing a `CustomerRecord` interface with specified fields and permissions. Project installation maps that requirement to a concrete Data Object. The installer rejects missing or incompatible mappings before attaching the artifact.

### Artifact portability matrix

Before any builder is migrated, publish a server-authoritative matrix for every artifact kind with:

| Property | Purpose |
|---|---|
| Valid owner scopes | App, Site, Library or Manage |
| Valid consumer project kinds | App, Site or both |
| Portability | Portable, project-only or conditional |
| Declared inputs/outputs | Stable install-time resource contracts |
| Dependency kinds | Types and allowed version constraints |
| Installation modes | Linked, pinned, forked and/or embedded |
| Runtime class | Trusted metadata, browser, sandbox or isolated worker |
| Package eligibility | Whether the artifact may be distributed |
| Required capabilities | Data, event, egress, secret, storage and compute grants |
| Required conformance tests | Security, round trip, schema, UI and integration |

The frontend `scopes` field becomes a presentation projection of this contract. Server-side validation remains authoritative.

### Canonical artifact kinds

Do not reuse a broad artifact type for a concept with a different schema, lifecycle or compiler. Before packaging, add distinct kinds for at least `SAVED_QUERY`, `DASHBOARD_WIDGET`, `COMPONENT`, `TEST_SUITE`, `CONNECTOR_DEFINITION`, `DATA_MIGRATION`, `POLICY` and `SECRET_REFERENCE`. Existing mappings such as Query → `API_ENDPOINT` and Widget → `DASHBOARD` must be migrated or explicitly modeled as subtypes with independent schemas.

## 7. Builder platform contract

Evolve `BuilderDefinition` from a frontend navigation registry into a signed, platform-wide builder plugin contract:

- identity: id, version, artifact kinds, compatibility and status;
- placement: supported project kinds and Library portability rules;
- authoring: list/editor/wizard contribution points and commands;
- metadata: JSON Schema, defaults, migrations and canonical serializers;
- compilation: validation, dependency extraction, build output and runtime adapter;
- preview: sandbox requirements, device modes and fixture providers;
- testing: assertion types, generators and release-gate contribution;
- security: required authoring/runtime capabilities and data classifications;
- distribution: package eligibility, editability, export and import behavior;
- observability: telemetry schema, health checks and runtime diagnostics;
- UX: icons, help, empty states, keyboard commands and accessibility declaration.

Register builders on the server and expose a capability-filtered registry to the client. The frontend must never be the authority for artifact compatibility or permissions.

Every new builder must pass a Builder Conformance Kit before registration at Beta or GA. The kit validates metadata schema round trips, revision migrations, dependency extraction, portability rules, capability declarations, preview isolation, package install/remove/upgrade, tenant isolation and release compilation.

### Initial builder families

- Experience: page, form, record page, navigation, component, theme, email/document, mobile/offline.
- Data: object/schema, relationship, query/view, validation, migration, seed/fixture.
- Logic: workflow, BPMN, rule/decision table, function/script, approval, schedule.
- Integration: REST/GraphQL API, webhook, event, connector, ETL/sync, agent/tool.
- Insight: report, dashboard, metric/semantic model, experiment.
- Content/web: collection/CMS, blog, menu, asset, SEO, localization, commerce.
- Quality: test suite, test data factory, monitor/SLO, policy-as-code.

## 8. Runtime and compilation architecture

Use a control-plane/data-plane split:

```text
Studio clients
  -> Developer Platform API / BFF
  -> Metadata, Package, Policy, Environment and Release services
  -> Build queue -> validators -> dependency solver -> compilers -> signed bundle registry
  -> Deployment controller -> runtime targets

Runtime request
  -> edge/app gateway -> auth/policy enforcement -> metadata runtime or isolated extension runtime
  -> tenant data services / connector proxy / event bus
  -> logs, traces, audit and usage
```

- Metadata-native artifacts run through trusted interpreters/materializers.
- Custom functions and third-party extensions run in the existing hardened sandbox boundary or isolated workloads with CPU, memory, time, network and data budgets.
- Runtime bundles are content-addressed and signed. Deployments activate a manifest atomically; mutable drafts never execute in production.
- Schema changes compile into explicit expand/migrate/contract plans with compatibility classification and rollback limitations shown before deployment.
- Events use versioned schemas, outbox delivery, idempotency keys, replay controls and dead-letter handling.

### Scale topology and failure containment

Design the runtime as cells, not one indefinitely growing shared deployment:

```text
Global directory and routing plane
  -> Regional control-plane cell
       -> Tenant runtime cells / shards
            -> metadata runtime
            -> isolated extension workers
            -> tenant/domain data partitions
            -> regional event and observability pipelines
```

- The global plane stores tenant placement and public routing metadata only; it must not become a synchronous dependency for ordinary application requests.
- Each cell has bounded tenant count, independent capacity, deployment, failure domain and recovery procedure. New capacity is added by creating cells rather than vertically enlarging one cluster forever.
- Tenant placement is represented by opaque logical IDs and a directory service, never inferred from database names, URLs or regions.
- Support online tenant relocation between cells and regions through dual-read/controlled-write migration protocols with reconciliation and verifiable cutover.
- Partition high-cardinality metadata, audit and runtime data by tenant and time. Do not require cross-tenant transactional queries in serving paths.
- Separate interactive, build, workflow, integration and analytics workloads with independent queues, quotas, concurrency pools and autoscaling.
- Apply backpressure at admission. Per-tenant governors cover requests, build minutes, storage, events, workflow steps, connector calls, concurrent functions and expensive queries.
- Use asynchronous job state machines for builds, deployments, migrations, imports and exports. Every step is resumable, idempotent and reconciled after worker failure.
- Deployed runtime bundles and required policy caches remain locally available during control-plane degradation. Authoring and release may pause; healthy production applications continue serving.

### Storage and technology replaceability

- Use globally unique, opaque identifiers; names, slugs, regions and storage locations are mutable attributes.
- Keep canonical metadata in documented vendor-neutral JSON/JSON Schema form, content-addressed in durable object storage with indexed relational catalogs.
- Store query-critical relationships relationally; do not encode the entire platform graph only inside JSON documents.
- Derived search indexes, caches, compiled bundles and analytics stores are rebuildable and never authoritative.
- Introduce database, queue, object-store and compiler adapters behind owned contracts only where a genuine replacement boundary exists; avoid speculative generic abstractions inside a domain.
- Record the compiler/runtime version in every build. Retain or reproducibly rebuild supported historical toolchains for rollback and long-lived package support.

## 9. API and integration architecture

### Management API

Standardize under `/api/v1/dev`:

```text
/projects, /projects/{id}/branches, /projects/{id}/artifacts
/library/artifacts, /library/packages
/packages/{id}/versions, /projects/{id}/installations
/environments, /projects/{id}/releases, /deployments
/builders, /validation-runs, /test-runs, /audit-events
```

All mutation endpoints require idempotency, optimistic concurrency (`ETag`/revision), RFC 7807 errors, audit metadata and tenant context established from verified identity rather than request payload.

### Generated application interfaces

- REST and optional GraphQL from object/API metadata.
- OpenAPI, AsyncAPI and JSON Schema generated from the canonical IR.
- Webhooks and event subscriptions with signing, retry and replay.
- TypeScript/Dart client generation through the existing contracts/SDK governance.
- Connector proxy equivalent to a destination service: artifacts store connection references; secrets and tokens remain in the vault.
- Stable extension points: UI slots, lifecycle hooks, domain events, functions, data views and policy hooks. Direct imports into business-service internals are forbidden.

Project and Library routes must use the same application services with an explicit scope value; do not implement separate business rules in controllers:

```ts
type ArtifactScope =
  | { kind: "PROJECT"; projectId: string }
  | { kind: "LIBRARY" };
```

All reads and writes resolve ownership, compatibility and authorization against this scope on the server. Revision-changing requests supply an `If-Match` ETag or expected revision number so concurrent edits fail visibly rather than overwrite silently.

Packages contain connector configuration schemas and stable connection references only. URLs, credentials, tokens and certificates are supplied through `EnvironmentBinding` records backed by the vault. Release validation fails when a required binding is absent, invalid, over-privileged or incompatible with the target environment.

### Compatibility and evolution policy

- HTTP, GraphQL, event, SDK, extension and metadata contracts follow explicit compatibility policies; “internal” does not mean unversioned when persisted artifacts depend on the boundary.
- Additive changes preserve existing valid behavior within a major version. Breaking changes require a new major, migration tooling, published replacement and measured consumer-usage evidence before retirement.
- Event consumers ignore unknown additive fields and explicitly reject unsupported major versions. Event schemas are registered and compatibility-checked before publication.
- Package manifests declare minimum/maximum platform contracts and builder/runtime requirements. Installation and promotion solve compatibility against the target environment.
- Every metadata kind maintains pure, deterministic `vN → vN+1` migrators, golden fixtures and downgrade/rollback classification. Never mutate historical revisions during migration.
- Read old/write new is the normal application transition. Database changes use expand → backfill/reconcile → switch reads → contract, with safe mixed-version operation across rolling deployments.
- Deprecation telemetry identifies affected packages/projects without exposing tenant data. Removal is gated on support policy, usage evidence and migration readiness.
- Preserve unknown extension fields through all supported editors, APIs and export/import cycles.

### Source portability and disaster recovery

- Define a canonical project export containing manifests, artifact revisions, schemas, dependency lock, tests and non-secret binding declarations.
- Export/import is continuously tested between supported platform versions and into a clean tenant; it is not merely a compliance endpoint.
- Backup coverage includes metadata, package registry, signatures, environment mappings, audit trails and required runtime data. Scheduled restore exercises prove stated RPO/RTO.
- Signing keys, encryption keys and algorithms are versioned with rotation, compromise and cryptographic-agility procedures. Historical signatures retain verifiable trust metadata.
- Object deletion, package revocation and tenant erasure propagate to replicas, caches, search indexes, exports and backup-expiry evidence according to declared retention policy.

## 10. Identity, authorization and tenant safety

Use separate identities and policies for four actors: platform maker, release approver, application end user, and runtime/service principal.

- OIDC/OAuth 2.1 with short-lived tokens; workload identity for deployments and functions.
- RBAC for coarse roles plus ABAC/ReBAC for tenant, project, environment, artifact, branch and operation.
- Permission sets and project roles (`Viewer`, `Maker`, `Tester`, `Release Manager`, `Owner`) with separation of duties.
- Replace broad `builder.read`/`builder.write` checks incrementally with lifecycle permissions including `artifact.read`, `artifact.create`, `artifact.edit`, `artifact.publish`, `package.install`, `package.upgrade`, `release.create`, `release.approve`, `deployment.promote` and `secret.bind`, constrained by tenant/project/environment attributes.
- End-user policy builder for object, record, field, action and API access; enforcement occurs in authoritative services and generated APIs, never only in UI.
- Capability grants per installed package: data objects/fields, outbound hosts, events, secrets, storage, compute and UI slots.
- Tenant-scoped queries plus database RLS where supported; automated cross-tenant negative tests.
- Secrets are vault references bound per environment; previews receive disposable scoped credentials.
- Signed packages, provenance/SBOM, dependency scanning, revocation, kill switch and marketplace certification.
- Use policy decision and policy enforcement points with versioned decision inputs. A release records the policy bundle version under which it was validated.
- Support regional identity/data residency, customer-managed keys where required, and auditable break-glass access without embedding region/provider assumptions into artifact identifiers.
- Treat build pipelines, preview environments, importers, compilers and AI assistants as hostile-input boundaries subject to sandboxing, content limits and supply-chain controls.

## 11. UX architecture

### Shared studio anatomy

- Top bar: scope breadcrumb, branch/environment, save state, preview, validate and release.
- Left rail: project domains and builder navigation generated from the registry.
- Explorer: artifact tree, dependencies, package origin and change state.
- Canvas/editor: visual, schema and source views over one IR.
- Inspector: properties, data binding, events, access, responsive states and diagnostics.
- Bottom panel: problems, tests, console, network, audit diff and runtime logs.
- Command palette: create, navigate, attach, validate, test, compare and publish.

### Required interaction rules

- Autosave creates draft revisions; named checkpoints and package versions are explicit.
- Show origin and editability everywhere: project-owned, linked, pinned, forked, marketplace-managed.
- Cross-builder references use a typed resource picker, not copied IDs.
- Every compatible builder exposes **Add from Library** inside the project. Library editors expose **Use in project…** with compatibility filtering and an installation preview.
- Project lists distinguish owned and installed artifacts and show origin, package/version, editability, dependency health, available upgrades and environment deployment state.
- Breaking changes show affected projects/artifacts and suggested migrations before save/publish.
- Preview can switch identity, role, locale, device, data fixture and environment without editing source.
- Disable unavailable actions with a reason and remediation; never silently hide lifecycle constraints.
- Meet WCAG 2.2 AA, complete keyboard operation, undo/redo, crash recovery and large-project virtualization.

## 12. Testing and quality gates

### Test pyramid

- Builder SDK conformance: schema round trip, migrations, dependency extraction, permission declarations.
- Unit: validators, expressions, rules, functions and generated clients.
- Component: visual states, accessibility, responsive breakpoints and design-token compliance.
- Contract: REST/GraphQL/events/connectors and consumer-driven compatibility.
- Integration: workflows, data policies, queues, connector mocks and migration rehearsal.
- Security: tenant isolation, privilege escalation, secret leakage, egress, sandbox escape and package tampering.
- End-to-end: maker creates/installs/builds/tests/releases; end user exercises the deployed application.
- Non-functional: performance budgets, load, resilience, accessibility, backup/restore and rollback.

### Release gates

A release is promotable only when it has a resolved lockfile, signed provenance, no dependency cycles, compatible schema plan, passing required tests, policy approval, vulnerability/license result, and environment binding completeness. Production additionally requires separation-of-duty approval and post-deploy smoke verification.

`ProjectRelease.snapshot` may remain JSONB, but it must conform to a versioned `ReleaseManifest` contract owned by `unierp-contracts` and validated at write and read boundaries. The manifest contains:

- project and source revision;
- exact installed package lockfile;
- artifact revision and compiled-output hashes;
- schema migration plan and rollback classification;
- required environment bindings without secret material;
- test, security and compatibility evidence references;
- policy decisions and approval identities;
- build provenance, SBOM and signature.

### Builder Conformance Kit

The platform must provide a reusable suite that every builder runs in CI:

1. Schema validation and unknown-field preservation.
2. Lossless visual → source → visual round trip.
3. Revision migration from every supported schema version.
4. Deterministic dependency and capability extraction.
5. Project/Library portability and resource-mapping validation.
6. Authoring and runtime permission enforcement.
7. Preview and tenant isolation.
8. Package installation, removal and orphan prevention.
9. Compatible and breaking upgrade classification.
10. Deterministic release compilation and content hashes.

## 13. Operability, economics and governance

Long-lived extensibility platforms fail when runtime limits, ownership and migration obligations are implicit. These are product contracts from the first release.

### Service objectives and recovery

- Define SLOs for authoring save, preview startup, build completion, deployment, metadata/runtime reads, workflow execution and public application availability.
- Define RTO/RPO per data class and environment; production metadata and application data need different recovery policies from preview caches and logs.
- Every deployable names an owner, health/readiness semantics, dependencies, capacity model, rollback method and runbooks.
- Run game days for cell loss, region loss, control-plane loss, event backlog, signing-key compromise, bad package rollout, schema migration failure and tenant relocation.
- Use correlation/causation IDs across authoring, build, deployment and runtime without leaking secrets or unnecessary personal data.

### Cost and noisy-neighbor control

- Attribute storage, builds, functions, workflows, events, API calls, connector traffic and observability volume to tenant/project/environment/package.
- Enforce soft warnings, hard limits and purchased capacity through the same governor contract used by runtimes and builders.
- Package install preview includes estimated recurring resource impact and exceptional permissions.
- Platform operators can quarantine one tenant, package, connector or workload class without disabling unrelated tenants.
- Capacity models and load tests cover tenant count, artifact count, dependency-graph size, release size, event fan-out and long-running migrations—not only HTTP request throughput.

### Decision and ownership governance

- Every canonical artifact kind, builder contract and runtime service has a named owning team and support lifecycle.
- Architecture decisions are captured as ADRs with context, alternatives, consequences, review trigger and superseding decision.
- Maintain a machine-readable capability registry and dependency graph; repository proximity never grants access or ownership.
- Experimental features use explicit compatibility tiers (`experimental`, `beta`, `stable`, `deprecated`) with stated data durability and support promises.
- Maintain migration budgets: each release train reserves capacity to retire compatibility shims, reconcile projections and reduce unsupported schema versions.
- Measure platform health through adoption, reliability, upgrade success and recoverability—not the number of builders or configuration switches.

## 14. Delivery roadmap

Sequence by platform capability, not by adding more disconnected builder screens.

### Phase 0 — Baseline and decisions (2–3 weeks)

- Inventory every builder, concrete artifact table, API, runtime and test.
- Classify portability and runtime criticality for each artifact kind.
- Ratify ADRs for IR, package semantics, namespaces, install modes, environment isolation and extension execution.
- Add measurable maturity scorecard and target SLOs.
- Exit: complete artifact matrix; no unknown authoring paths; approved target contracts.

### Phase 1 — Platform proof through vertical slices (6–8 weeks)

- Approve ADRs for canonical IR, package/editability semantics, namespaces, installation modes, environment isolation, overlays and extension execution.
- Publish the complete artifact portability matrix.
- Define `ArtifactEnvelopeV1` plus Form, Workflow and Page/Section schemas in `unierp-contracts`.
- Add `ArtifactRevision`, dependency edges, schemas, hashes, parent revisions and migration registry.
- Make pilot create/update flows write immutable revisions through `ArtifactRegistryService` with ETags, drafts, checkpoints, diff and crash recovery.
- Add the minimum package version, pinned installation and dependency-lock models needed by the pilots.
- Deliver the App pilot: Library Form → App Data Object binding → permission → test → preview → promotion → upgrade/rollback.
- Deliver the Site pilot: Library Page/Section → Site CMS binding → preview → publish → upgrade/rollback.
- Produce a signed, validated `ReleaseManifest` for both pilots and deploy it to an isolated preview runtime. A hardened local runtime boundary is available at `http://localhost:4018` (`infra/docker-compose.preview.yml`); it provides health checking, authenticated size-bounded plan resolution, and versioned App/Form and Site/Page rendering without storing credentials. Persistent typed Data Object submission and deployment/rollback browser journeys remain the next pilot milestones.
- Keep concrete builder tables as projections during migration.
- Exit: both pilots complete their full lifecycle; visual/source round trips lose no data; upgrades and rollback are proven. No additional production builder kind starts before this exit.

### Phase 2 — True Library and packages (5–7 weeks)

- Add package/version/item/installation models, namespaces and dependency solver.
- Complete managed, unlocked, internal and forked ownership policies plus linked, pinned, forked and embedded installation modes; replace mutable-head following with resolved package locks.
- Add consumer overlays, declared overlay points and upgrade rebase/conflict UX.
- Build publish, install, upgrade preview, uninstall impact and provenance UX/API.
- Exit: one library package is installed into an App and a Site, upgraded safely, and rolled back.

### Phase 3 — Unified project studio UX (5–8 weeks)

- Replace flat builder grouping with Build/Data/Automate/Integrate/Secure/Test/Release/Operate.
- Deliver shared editor chrome, resource picker, dependency graph, problem panel and multi-mode preview.
- Extend registry into server-authoritative builder manifests.
- Exit: a maker can complete a small working app without leaving its project window.

### Phase 4 — Data, API and automation runtime (8–12 weeks)

- Compile object metadata into governed data services and migrations.
- Generate OpenAPI/GraphQL/events/SDKs; add policy enforcement and quotas.
- Unify workflow/rules/functions on versioned events and isolated execution.
- Add connector proxy and environment-scoped vault bindings.
- Exit: UI-to-data-to-workflow-to-external-API scenario passes transactional, security and replay tests.

### Phase 5 — Environments, testing and releases (6–9 weeks)

- Implement isolated environments, preview deployments, seeded fixtures and promotion policies.
- Make `ProjectRelease.snapshot` a signed resolved manifest with lockfile and evidence references.
- Add pipeline gates, approvals, atomic activation, rollback and deployment reconciliation.
- Exit: the identical artifact promoted from TEST to PROD is hash-verifiable; rollback is rehearsed.

### Phase 6 — Pro-code and collaboration (6–10 weeks)

- Canonical source format, CLI, local dev server, Git mapping and CI actions.
- Branching, merge/conflict model, comments, presence and review changesets.
- Builder SDK and scaffolding for first-party/partner builders.
- Exit: visual and source workflows round-trip; CI can validate/package/deploy without the browser.

### Phase 7 — Marketplace and enterprise governance (8–12 weeks)

- Private/public catalogs, publisher identity, signing, certification and license policy.
- Capability consent, install-time risk review, revocation and emergency disable.
- Usage metering, dependency fleet view, upgrade campaigns and deprecation windows.
- Exit: certified third-party package installs with least privilege and can be safely upgraded/revoked.

### Phase 8 — Scale and intelligence (continuous)

- Large-project indexing, incremental builds, artifact caching and regional runtime placement.
- AI assistance grounded in registry/schema/policy with proposed diffs, test generation and mandatory human approval for privileged changes.
- Fleet analytics, automated compatibility remediation and builder ecosystem expansion.

## 15. First implementation backlog

Execute this as one 6–8 week platform-proof milestone, with deployable checkpoints rather than independent infrastructure projects:

1. Ratify the core ADRs and publish the portability matrix for all current and proposed artifact kinds.
2. Correct ambiguous artifact kinds and define `ArtifactEnvelopeV1` plus Form, Workflow and Page/Section contracts in `unierp-contracts`.
3. Add immutable artifact revisions, dependency edges, overlays and migration registry to the Prisma schema.
4. Add server-side builder manifest, portability and compatibility endpoints; make the client registry their projection.
5. Route pilot writes through one scope-aware revision service and expose revision APIs with ETags and idempotency.
6. Add package, package version, installation and dependency-lock models with pinned-by-default semantics.
7. Build the typed resource picker, install-time mapping, dependency-impact and breaking-change panels.
8. Implement **Add from Library** and **Use in project…** for the pilot builders.
9. Implement the complete App Form vertical slice, including permissions, tests, preview, promotion, upgrade and rollback.
10. Implement the complete Site Page/Section vertical slice, including CMS binding, preview, publish, upgrade and rollback.
11. Create the Builder Conformance Kit and pass both pilots through cross-tenant, capability, round-trip, upgrade and deterministic-build suites.
12. Convert `ProjectRelease.snapshot` to validated `ReleaseManifestV1`, sign its provenance, deploy to an isolated preview target and verify rollback.

Do not add another production builder kind until both vertical slices and all twelve checkpoints pass. Lifecycle completeness is the milestone; builder count is not.

## 16. Success metrics

- Time from blank project to deployed CRUD/workflow application.
- Percentage of builder kinds on canonical revisioned IR.
- Percentage of releases reproducible byte-for-byte from manifest and lockfile.
- Library reuse rate and average consuming projects per package.
- Upgrade success, rollback success and mean upgrade lead time.
- Escaped breaking-change rate and cross-tenant/security regression rate.
- Visual/source round-trip fidelity.
- Preview startup, incremental validation and deployment lead-time percentiles.
- Builder conformance pass rate and marketplace certification lead time.
- Percentage of serving paths independent of global/control-plane availability.
- Tenant relocation success rate and reconciliation duration.
- Cell saturation headroom and noisy-neighbor incidents.
- Percentage of persistent metadata on supported schema versions and age of remaining compatibility shims.
- Restore-test success against declared RPO/RTO and time since last regional/cell game day.
- Export/import round-trip fidelity and reproducible historical-build success.
- Unit economics per tenant/project/runtime workload with unallocated cost percentage.

## 17. Architecture decisions required before Phase 1

1. Canonical IR storage: JSONB documents with schema registry is recommended; use relational projections for query-heavy operational views.
2. Package policy: support `managed`, `unlocked`, and `internal` editability classes.
3. Versioning: immutable semantic package versions; artifact revisions use content hashes and monotonic revision numbers.
4. Installation: default Library installs to pinned; linked ranges require explicit tenant policy.
5. Namespaces: mandatory for published packages and stable exported interfaces.
6. Environment topology: logical isolation for DEV/TEST, stronger database/compute isolation for PROD based on tenant tier.
7. Custom compute: WebAssembly or hardened process/container workers behind the existing sandbox capability broker; never execute in API workers.
8. Collaboration: Git-backed canonical export plus platform-native draft branches; releases resolve both to immutable content hashes.
9. Ownership: packages declare managed, unlocked or internal editability; forks transfer ownership and overlays remain separate artifacts.
10. References: portable artifacts depend on typed resource interfaces resolved at installation, never project-specific IDs embedded in package source.
11. Concurrency: all mutable draft writes require expected revision/ETag and produce immutable checkpoints.
12. Release contract: `ReleaseManifestV1` is defined in `unierp-contracts`; JSONB is storage, not an untyped contract.
13. Scale unit: adopt bounded regional cells and define initial placement, shard key and tenant-relocation protocol before production data volume grows.
14. Availability boundary: deployed applications read locally cached signed bundles and policies; routine serving does not synchronously depend on the control plane.
15. Compatibility: approve support windows for metadata, API, SDK, builder and runtime contracts plus removal criteria based on telemetry.
16. Data evolution: require expand/migrate/contract, resumable backfills and mixed-version tests for every persistent-schema change.
17. Portability: approve canonical project/package export format and make clean-tenant import a release-gated test.
18. Resource governance: define governor dimensions, default quotas, attribution keys and workload-isolation classes before enabling arbitrary extensions.
19. Residency and recovery: define data classes, permitted regions, RPO/RTO, backup scope, relocation constraints and erasure propagation.
20. Cryptographic agility: version signing/encryption algorithms and establish rotation, compromise, re-signing and historical-verification procedures.

## 18. Build readiness decision

Implementation may start after Phase 0 produces and architecture owners approve decisions 1–20 above, the artifact portability matrix, the two pilot acceptance journeys, and initial threat/data-flow models. Work that is safe to begin immediately is limited to those Phase 0 artifacts, contract prototypes, migration spikes and the Builder Conformance Kit harness.

Production schema and API implementation should begin only after those decisions are recorded, because identifiers, revision immutability, package ownership, cell placement and compatibility policy are expensive to reverse. Once approved, proceed with the 6–8 week Phase 1 platform proof; do not begin parallel builder expansion until both pilots meet their exit criteria.

Build readiness is therefore **conditional GO**: start Phase 0 now, review its evidence, then authorize Phase 1. This is a deliberate gate, not a request for a larger speculative design phase.

## 19. Definition of “Salesforce/SAP-level” for UniERP

The platform reaches the intended level when customization is not measured by the number of visible builders, but by whether every extension is discoverable, composable, source-representable, permissioned, testable, upgrade-safe, deployable across environments, observable, reversible, and governed for multiple tenants and partners. The project/library split is the entry point; metadata, packages, environments, clean extension boundaries and lifecycle governance are the platform.

## 20. Implementation checkpoint — 2026-08-22

The following platform foundations are implemented in the current workspace and have focused automated coverage. This is an implementation checkpoint, not a completion claim for the multi-phase programme.

- Canonical `ArtifactEnvelopeV1`, server-authoritative builder manifests, immutable artifact revisions, content hashes, dependency records and optimistic concurrency.
- Project/Library package architecture with signed semantic versions, lockfiles, scoped installations, compatibility checks, upgrade impact and orphan-safe removal.
- Exact-composition validation, deterministic build evidence, test-suite execution, dependency-cycle prevention and hard resource-governor gates.
- Environment bindings that accept only non-secret vault/service/connector locators; verified bindings are required for deployment.
- Signed, environment-independent `ReleaseManifestV1`; signed release history, server-recorded approvals, production separation-of-duty, atomic activation and forward rollback. Environment activation is serialized with a tenant/environment advisory lock. Rollback is accepted only for the currently active deployment and only to an earlier published release; concurrent or stale rollback attempts fail rather than overwriting a newer activation. Successful deploy/rollback evicts tenant runtime-plan caches and records append-only lifecycle evidence.
- Tenant-scoped runtime resolver that revalidates active manifest integrity and signing before returning only verified non-secret binding references. Renderable source is hydrated only from the exact artifact ID/revision pairs pinned by the signed manifest; the resolver verifies the immutable source hash and recomputes the compiler output hash before returning canonical source, and fails closed for a missing or altered revision.
- Runtime resolution retains a short-lived, previously verified signed non-secret plan per tenant/project/environment to bridge transient control-plane failures; explicit integrity, policy, or availability-state failures never use the cache. Emergency package suspension and signing-key revocation evict that tenant's local plans immediately and publish a tenant-only Redis invalidation event consumed by every subscribed runtime cell. Local eviction succeeds even when the broadcast transport is degraded.
- Project-scoped ABAC overlay for author, release and deploy actions, layered over existing tenant RBAC.
- Project-scoped ABAC is enforced on package installation/upgrade/removal, artifact inventory and revision paths, preview and test-run evidence listing, and environment-binding lifecycle actions; binding verification requires release authority.
- Reusable Builder Conformance Kit contract, canonical source export, tamper-detecting source-import planning, transactional multi-artifact revision application, and transactional add-only canonical artifact imports; Studio panels expose the safe import paths alongside validation, tests, bindings, approvals and deployment.
- Marketplace certification evidence and catalog status, with an emergency package suspension/reinstatement kill switch enforced at install, release-validation and runtime-resolution boundaries.
- Marketplace certification requires immutable license expression, SHA-256 SBOM digest, and `CLEAN` vulnerability disposition in the signed package manifest, alongside signed provenance and validated deployable builders.
- Durable validation-build admission backed by the shared tracked BullMQ job spine, with retryable worker execution, build status APIs and Studio release-panel visibility. The compiler remains deterministic and records immutable build evidence.
- Preview creation persists a hash-only `PENDING` session and submits a tracked, retry-aware preparation job; the worker rechecks the fingerprint and package state before activating the token. Failed terminal preparation marks the session unusable, while cancellation works during preparation. A separate, hardened local runtime now resolves the authenticated plan and renders the canonical App/Form and Site/Page pilots through a versioned renderer adapter. The runtime is non-root, read-only, capability-free and resource bounded; regional orchestration and durable preview data writes remain future adapters.
- Preview lifecycle events (`PREVIEW_REQUESTED`, `PREVIEW_ACTIVATED`, `PREVIEW_FAILED`, `PREVIEW_REVOKED`) are append-only project audit evidence containing only IDs, fingerprints and quota facts—never preview tokens or source payloads.
- Preview Form submission now uses an explicit portable binding (`FORM.spec.submit.targetArtifactId`, with optional `fieldMap`) to a canonical `DATA_OBJECT` in the same pinned composition. The control plane rechecks preview freshness/package validity, Form field membership, target presence, generated-object tenant/status, required fields and the closed Data Object type system before issuing parameterized SQL against the forced-RLS generated table. Submission writes require idempotency keys and append metadata-only audit evidence.
- Preview activation and successful validation-build completion now write idempotent workload events into the platform-wide `MeteringEvent`/`UsageRecord` ledger (`DEVELOPER_PREVIEW_SESSION`, `DEVELOPER_VALIDATION_BUILD`). Retries share a workload identity and cannot double count; transient metering failure does not undo a completed workload.
- Tenant-scoped developer entitlements provide validated, RLS-protected governor overrides; release validation uses those limits through the same artifact/package/binding/source-size enforcement contract. Preview admission additionally has a transaction-serialized, tenant-scoped concurrent-session limit (`previewSessions`) so parallel preview requests cannot bypass a hard quota.
- The tenant-wide **Developer Governance** Studio surface exposes authorized governor-limit editing and tenant-scoped workload-ledger projections. It uses the shared API client’s automatic idempotency key for mutations; the display is operational evidence, not a replacement for billing reconciliation or capacity placement.
- Persisted tenant runtime-cell assignments bootstrap from deterministic routing, converge safely under concurrent control-plane writes, and support explicit relocation without changing the runtime-plan contract. Relocation is a `builder.manage`-guarded, idempotent control-plane API with append-only assignment evidence.
- Platform-native source changesets provide hash-pinned canonical bundles, author-owned draft submission, independent review, release-authorized merge, stale-base protection, an atomic merge-claim/retry boundary, project audit evidence, and a Studio review surface. Git-provider synchronization remains a separate adapter concern.
- Legacy App-module and Web-Studio site creation routes now atomically create their `DevProject` identities as compatibility bridges, preventing newly authored legacy records from entering the project/library/release platform without a project scope. Historical backfill and the remaining direct artifact writers still require migration work.
- Legacy Form and Workflow CRUD now dual-writes stable `BuilderArtifact` Library identities through `ArtifactRegistryService`, refreshes their names/status on update, and tombstones the registry identity on deletion. Create/update also project the concrete form fields/pages/conditions and workflow trigger graph into idempotent, content-addressed canonical Library revisions. This closes two high-volume direct-write paths while preserving compatibility for historical rows that have not yet been backfilled; historical backfill and full visual/source round-trip work remain.
- Advanced Form create/update, calculated-field and page mutations now follow the same `ADVANCED_FORM` Library identity and immutable revision path. Conditions, calculated fields, multi-page field assignments and settings remain preserved under the canonical envelope’s extension payload while the portable form shape remains available to the release compiler.
- Rules Engine evaluation no longer uses `new Function` on tenant-authored rule text. The compatibility evaluator accepts only data-only field comparisons joined by `&&`/`||`, resolves literals or input fields, and fails closed on any executable or unsupported syntax. Existing richer rules require migration to the typed rule-expression path rather than execution in an API worker.
- BPMN gateway-condition execution now applies the same fail-closed data-only expression boundary for `${...}` expressions. Existing simple conditions (for example `${approved == true}` and numeric comparisons) remain supported; arbitrary JavaScript and `with`-scope evaluation have been removed from the API worker.
- Web Studio page upserts now register project-owned `PAGE` artifacts using the site’s `DevProject` identity and persist a content-addressed canonical `ArtifactRevision` from the page blocks/SEO projection; page deletion retires the registry identity. The route now verifies that an explicit page id belongs to the tenant and site before updating it, closing a cross-site direct-update weakness in the legacy path. The generic legacy-projection revision adapter is idempotent for an unchanged envelope, retries a concurrent unique-index winner once to converge, and deliberately uses the same immutable hash/revision contract as normal authoring.
- Dashboard CRUD now mirrors `DASHBOARD` Library artifacts and idempotent content-addressed dashboard revisions. The Deep Expansion Data Model create route mirrors `DATA_OBJECT` identities with a stable table-name slug, draft/published registry state, and canonical data-field payload. Follow-up field changes remain part of each data object’s revision payload rather than separate artifacts.
- The stricter generated-table Data Object Builder now also mirrors `DATA_OBJECT` Library identities and immutable revisions on object creation and additive field changes. Its canonical source records the stable definition identity and typed fields but not physical SQL; storage remains an internal forced-RLS adapter. The Form Studio discovers these objects through the Library surface and persists the selected canonical artifact binding in Form source.
- BPMN process create, update and delete now mirror `BPMN_PROCESS` Library identities and content-addressed canonical revisions, including graph, XML, SLA and settings payloads; deletion retires rather than erases the canonical identity.
- Rule-set creation, rule additions and version increments now mirror a `RULE_SET` Library identity and revisions that include the ordered decision rules, conditions, actions, settings and version. Rule evaluation remains data-only and fail-closed.
- API endpoint creation, updates, mapping changes and deletion now mirror `API_ENDPOINT` Library identities and revisions containing the request/response contracts, transformation mappings, middleware and operational policy; deletion retires the identity.
- Theme creation, updates, deletion and design-token edits now mirror `THEME` Library revisions so tokens, variables, typography, layout attributes and default selection travel with a versioned artifact.
- Mobile apps now mirror `MOBILE_APP` Library revisions on app, screen and notification-configuration changes. The canonical source retains only notification configuration metadata—never provider credentials—alongside ordered screens and application capabilities.
- ETL pipeline creation, updates and deletion now mirror `ETL_PIPELINE` Library revisions containing source reference, schedule, mappings, transforms, target and settings; deletion retires the identity.
- A/B test creation, updates, launch state and variant changes now mirror `AB_TEST` Library revisions with the reproducible targeting, allocation, goal and variant definitions. Runtime analytics remain operational output rather than release source.
- Web collection creation, updates, preset seeding and item changes now mirror `COLLECTION` Library revisions that capture the CMS schema, presentation settings and ordered item content. This closes a key Site-pilot CMS release gap while leaving public read/submission paths RLS-scoped.
- Blog post creation, updates, publish state and deletion now mirror `BLOG_POST` Library revisions containing portable content, taxonomy and SEO metadata; deletion retires the canonical identity.
- Web asset creation, updates and deletion now mirror `ASSET` Library revisions containing the stable URL, media type and size metadata; deletion retires the identity.
- Web menu creation, updates and deletion now mirror `MENU` Library revisions containing location and nested navigation items; deletion retires the identity.
- Route-level SEO creation, updates and deletion now mirror `SEO_PROFILE` Library revisions containing path, metadata, keywords and social image; deletion retires the identity.
- Integration connector and integration creation now mirror `CONNECTOR_DEFINITION` Library revisions containing connection metadata, header policy and integration mappings while deliberately excluding connector credentials from canonical source.
- Audit of the 21 reconcilable legacy projections confirms active canonical write bridges for 19 kinds. `SCRIPT` and `POLICY` have registry drift visibility but no current authoring CRUD writer (they are read/executed or analyzed through other services), so they remain explicitly outside the write-bridge completion claim until an authoring boundary exists.
- Project source import now recomputes and verifies every artifact `contentHash` from its canonical envelope after verifying the outer bundle hash. A bundle can no longer use a valid outer hash to disguise source changes behind a stale per-artifact hash and evade the import change plan.
- Project source import now also requires the bundle `sourceFingerprint` to equal the current project composition. This provides stale-base protection for CLI/Git imports: authors must re-export and resolve conflicts instead of silently applying a stale bundle over newer revisions.
- Package-lock and required-binding drift now appears as typed `PACKAGE_LOCK` / `REQUIRED_BINDING` conflicts in the source-import plan rather than an opaque rejection. Duplicate or malformed dependency sections are rejected before planning; Studio requires an explicit resolution for every conflict, and successful imports audit only conflict IDs/resolutions and hashes—not source payloads or binding references. `KEEP_CURRENT` is implemented. `APPLY_INCOMING` remains fail-closed until the caller supplies governed resource mappings, capability grants, upgrade-impact approval, and per-environment non-secret references through the dedicated APIs; the platform never guesses those values.
- The legacy Git-config read surface now redacts persisted access-token material and exposes only `hasAccessToken`; this is a compatibility hardening measure, not a replacement for the required project-scoped provider credential-reference model.
- Registry drift diagnostics now cover 21 concrete legacy projections across App and Web Studio (forms, workflows, pages/content, integrations, data, automation and experience builders). Canonical-only kinds are intentionally excluded until they gain a one-row-per-artifact projection; the diagnostic does not pretend those have been migrated.
- The shared release validator has explicit canonical pilot coverage for `APP` + `FORM` and `SITE` + `PAGE`: both produce deterministic build evidence and a passing release validation through the same project kernel. The isolated runtime additionally has real headless-browser proof for authenticated App/Form rendering and preview submission, responsive Site/Page rendering, source-HTML escaping and fail-closed authentication. Preview submission is intentionally non-persistent until typed Data Object mapping is attached.
- The isolated integration harness now locates the workspace `data` package and ignores generated Stryker sandboxes. A clean `unerp_test` migration deployment reaches the full migration set; an optional-table RLS migration was made conditional so historical snapshot differences do not block clean installs. Full platform E2E coverage remains outstanding.
- The clean integration workflow has now been exercised end-to-end: all 213 schema migrations applied to a fresh `unerp_test`, the complete demo seed ran successfully, the real PostgreSQL tenant-isolation integration suite and pilot suite passed (4/4), and teardown removed the disposable database. The seed’s stale `webPage` write was migrated to the current default `webSite`/`webSitePage` schema.
- Refreshing the API’s file-linked `@kannan19302/database` dependency after regenerating/rebuilding the data package restored the runtime `devProject` and `webSite` delegates. The real PostgreSQL App/Form and Site/Page pilot test creates each project’s legacy identity and canonical project-owned artifact through the normal services, passes exact-composition release validation, prepares an externally signable manifest, verifies an Ed25519 signature, publishes an immutable release, and promotes it to a staging environment (2/2). The publish protocol exposes `POST /dev/projects/:projectId/releases/prepare`, returning the precise manifest/hash and release ID that an external trusted signer must sign. The local preview runtime and its independent browser test now close the first isolated rendering proof; persistent mapped form submission, full release rollback and production-like orchestration remain separate pilot evidence.

The following requirements remain delivery work and must not be represented as complete until supported by production-grade implementation and broad verification:

- Git-provider synchronization and fully automated incoming package-lock reconciliation remain delivery work. Canonical artifact source import atomically creates identities, advances project-owned revisions, and soft-deletes isolated project-owned artifacts after inbound-dependency and package-reference checks; package/binding conflicts are now reviewable, explicitly resolvable with `KEEP_CURRENT`, and auditable. Applying incoming locks still requires the governed mappings/grants/impact workflow described above; release history remains immutable.
- Durable asynchronous preview and workload execution across regional cells; sandbox/resource-meter integration, full observability and policy-cache availability during control-plane loss. Validation-build admission/worker execution and stable tenant placement are in place, but they are not yet a complete distributed compiler/runtime service.
- Full builder migration from legacy tables/editors to canonical IR projections, including rich visual/source round trips for every builder kind.
- Vulnerability/license lifecycle, publisher workflows, revocation propagation/notifications and cross-tenant public distribution beyond the tenant-local certification and kill-switch foundation.
- Tenant entitlement overrides for governor limits, billing attribution, capacity placement, SLOs, disaster recovery, residency/relocation and game-day verification.
- Full end-to-end, security, accessibility, load, migration and restore matrices across the two pilot applications. The first isolated authenticated render/submit/responsive browser path now passes, but it is not yet the full matrix.

Current focused verification checkpoint: the developer-platform API suite contains 25 passing specification files / 109 tests covering canonical revisions/imports, legacy-projection revision idempotency/concurrency convergence, hash-verified, stale-base-protected and typed package/binding-conflict source imports, App/Form and Site/Page release validation, packages, signed release/runtime source hydration, serialized active-only rollback, Redis-backed runtime-plan cache invalidation, typed preview/runtime submissions, durable preview preparation, quota admission and workload metering, registry drift across supported concrete projections, project ABAC, bindings, tests, durable builds, changesets, cell placement and governor entitlements. The Studio typecheck passes. This is not a substitute for the full end-to-end and operational matrices above.

Latest combined migration verification: 33 passing specification files / 258 tests cover the complete platform suite plus the migrated legacy builder compatibility services (App, BPMN, rules, APIs, themes, mobile, ETL, A/B tests and CMS collections). The legacy generic test harness was updated for the current `web_site_pages` storage and required module-composition dependency rather than diluting production behavior to accommodate obsolete fixtures.

Local isolated-runtime verification: 4 renderer contract tests pass, and a Puppeteer browser journey passes authenticated preview rendering, runtime-to-control-plane persistent submission with deterministic secret-free idempotency, responsive Site/Page rendering, project identity propagation, unauthenticated denial, active App/Site release rendering, and immutable rollback from v2 to v1 at the same runtime URLs. Twenty-four focused release/runtime/submission tests cover hash-verified source hydration, active-only prior-release rollback, cache invalidation and failure boundaries. Nine real PostgreSQL generated-object tests pass, including canonical mirroring, transactional DDL, typed preview persistence, decimal correctness, forced RLS and cross-tenant invisibility. The previously running Docker boundary reported healthy with a non-root user, read-only filesystem, all Linux capabilities dropped, localhost-only exposure, and explicit CPU/memory/PID limits; the new image rebuild must be reverified after the currently unresponsive local Docker engine recovers.
