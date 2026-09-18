# Enterprise foundation criteria

Use this reference for architecture, foundation, audit, roadmap, cross-domain, and production-readiness work.
For each applicable area, inspect intent, implementation, integration proof, operations and ownership. Classify the
result using the canonical evidence vocabulary; file presence alone is insufficient.

## Product and governance

### Vision and value

- Define target customers, actors, problems, differentiators, business model, measurable outcomes and explicit
  non-goals.
- Keep provider administration, tenant administration, tenant business applications, developer platform,
  marketplace, sites, identity, design platform, clients and operations as explicit product surfaces.
- Trace roadmap work to an accepted outcome and requirement. Reject feature breadth without a clear owner and
  outcome.

### Requirements and decisions

- Requirements state actors, preconditions, behavior, invariants, failure/degraded behavior, measurable NFRs and
  acceptance evidence.
- Durable, disputed, cross-platform, costly or compatibility-sensitive choices use ADRs.
- Architecture documents define runtime boundaries, trust zones, dependency direction, data flows, failure modes,
  scaling, security and operations—not merely component lists.

### Ownership and governance

- Every platform, domain, aggregate, master-data set, public contract, shared capability, service, datastore,
  repository, package, pipeline, SLO, runbook and compliance control has one accountable owner.
- Decision rights, code review, release approval, incident escalation, evidence expiry, deprecation and archival
  are explicit.
- Provider authority and tenant authority never cross implicitly.

## Enterprise domain and data

### Canonical domain model

- Maintain a versioned catalog of bounded contexts, ubiquitous terms, aggregates, entities, values, identifiers,
  lifecycle/state machines, invariants, commands, events and integrations.
- Define system-of-record ownership and translation at boundaries. Avoid shared-database semantics that bypass
  published contracts.
- Money is decimal amount plus currency; quantities carry units; time carries zone/calendar semantics; posted or
  approved records use reversal/amendment.

### Organization and master data

- Model tenant, legal entity, business unit, branch/location, cost center, department/team and position/reporting
  hierarchy with referential integrity, effective dating and hierarchy versions.
- Define consolidation, fiscal, currency, jurisdiction and intercompany relationships separately from reporting
  hierarchy.
- Establish authoritative owners, keys, stewardship, merge/deduplication, quality, lineage and lifecycle for party,
  customer, vendor, worker, product/item/service, UOM, currency, tax, location, account and other reference data.

### Persistence and lifecycle

- Tenant-owned paths enforce tenant scope in service logic and PostgreSQL ENABLE+FORCE RLS. Prove tenant A,
  tenant B and no-context behavior using a `NOBYPASSRLS` application role.
- Schemas use immutable migrations and expand/backfill/contract. Test compatibility, backfill restartability,
  production-shaped volume, forward recovery and application-version overlap.
- Define classification, lawful purpose/consent, minimization, encryption, residency, retention, export, erasure,
  legal hold, lineage, backup and restoration per data class.

## Identity, security and audit

- Separate workforce/customer identities, provider realm and tenant realm. Define identity lifecycle, invitation,
  federation, MFA/passkeys, session/token/key rotation, recovery and deprovisioning.
- Validate OIDC/SAML using standards-compliant libraries and issuer metadata; enforce signature, issuer, audience,
  expiry, nonce/state/PKCE, redirect and SSRF-safe egress controls.
- RBAC grants capabilities; ABAC/record policy handles tenant, organization, ownership, sensitivity, purpose and
  context. Server-side policy denies missing/unknown authority.
- Privileged/support access is approved, time-, purpose- and target-bound, visible, revocable and durably audited.
- Threat-model trust boundaries. Define secure defaults, secret/KMS lifecycle, encryption, supply-chain controls,
  vulnerability management, rate/abuse limits and incident response.
- Security-significant and business-significant audit is append-only, attributable, tamper-evident, queryable and
  retention/legal-hold aware. Audit failure cannot silently turn a required record into best effort.

## Shared platform capabilities

Each reusable capability has one owner, versioned contract, tenant/security model, lifecycle, idempotency,
observability, recovery, compatibility and client integration:

- workflow/state machines, timers, compensation and definition migration;
- approvals, delegation, escalation, hierarchy versioning and separation of duties;
- notifications, templates, preferences/consent, localization, provider failover and delivery receipts;
- files/documents, scanning, encryption, ACLs, versions, signed access, retention/legal hold and backup;
- search, indexing, ACL filters, deletion propagation, reindex/reconciliation and SLOs;
- reporting/analytics, governed semantics, lineage, row/field security, reproducibility and exports;
- hierarchical typed configuration and secrets separation;
- feature flags, entitlements, rollout, expiry, audit and offline/degraded evaluation;
- custom fields/objects, validation, indexing, migration, authorization and reporting;
- scheduler/jobs, tenant context, lease/fencing, retry/DLQ, concurrency and reconciliation;
- import/export, versioned formats, dry run, validation, idempotency, atomicity and privacy controls;
- localization, time zones, calendars, numbers, money, messages, fallback, RTL and jurisdiction versions;
- billing/subscriptions/usage, immutable readings, decimal units, entitlements, provider callbacks,
  reconciliation, invoicing and disputes.

Business domains consume these capabilities through contracts; they do not implement parallel engines.

## Integration and extensibility

- Publish authoritative HTTP, event, webhook, SDK and extension schemas with owner, version, compatibility policy,
  canonical errors, pagination, concurrency, idempotency and deprecation metadata.
- Business state and its event commit atomically through the outbox. Consumers are version-aware, idempotent,
  retryable, dead-lettered, replayable and reconcilable.
- Webhooks are signed, timestamped, replay-resistant, retryable and observable. Extensions have manifest,
  permission, resource, network, secret, quota, compatibility, review and kill-switch controls.
- Generate server/client validation and consumer compatibility evidence from contracts. Never use cross-repository
  source imports as an integration contract.

## Experience and clients

- Use `@kannan19302/ui` and approved cross-platform tokens. Define information architecture, navigation,
  terminology, responsiveness and coherent interaction patterns across provider, tenant, mobile and desktop.
- Implement loading, empty, error, forbidden, offline, stale, conflict and recovery states as relevant.
- Meet WCAG 2.2 AA with automated and manual keyboard, screen-reader, zoom/reflow, contrast, forced-colors,
  reduced-motion, localization and RTL evidence.
- Protect sensitive values and high-impact actions with clear context, confirmation, recent authentication and
  reversible/amendment flows.

## Engineering system

### Repositories and dependencies

- Use one current repository inventory, package namespace, package manager/version policy, runtime engines and
  dependency/release manifest.
- Enforce platform/module dependency direction, public package exports, license/provenance, vulnerability policy,
  reproducible locks, generated dependency graphs and compatibility windows.
- Archives, generated artifacts, experiments and active products are clearly separated and governed.

### Testing and evidence

- Test domain invariants, contracts/consumers, authorization negatives, tenant isolation, migrations, integration,
  critical journeys, accessibility, performance, resilience, security and recovery according to risk.
- Use realistic infrastructure at the boundary. A mock proves collaboration logic, not database, network,
  browser, provider or recovery behavior.
- Gates fail on zero discovery, skipped required assertions, stale baselines, absent environments and expired
  evidence. Ratchets may preserve debt temporarily but must block increases and name owners/retirement targets.

### CI/CD and release

- Required gates run on the exact commit and repository topology. Shared workflows/actions are immutably pinned.
- Build once; produce signed artifacts, provenance and SBOM; scan dependencies/images; promote without rebuild.
- Coordinate polyrepo versions with a release manifest and contract-consumer evidence.
- Rehearse migrations, staging, health/SLO gates, rollback/roll-forward and post-deploy reconciliation. Production
  release requires explicit human approval and observable evidence.

## Runtime, reliability and compliance

- Define infrastructure as code for networks, compute, database, cache/queues, object storage, IAM, secrets/KMS,
  DNS/TLS, observability, scaling, backup, recovery and policy.
- Propagate structured logs, metrics, traces and correlation across synchronous and asynchronous boundaries without
  leaking sensitive data. Every critical journey has SLI/SLO, error budget, actionable alerts, dashboard, owner and
  runbook.
- Back up every system of record with encryption, immutability, off-site retention and integrity. Prove PITR,
  files/object data, secrets/configuration and regional/cell recovery against per-class RPO/RTO.
- Maintain data/control inventories, control mappings, risk register, threat models, vendor/dependency review,
  privacy rights, retention/erasure/legal hold, incident evidence and license approval. Do not claim certification
  or compliance from controls-in-code alone.

## Enterprise-ready decision test

A prerequisite is complete only when:

1. intended behavior and owner are authoritative;
2. contracts and compatibility are published;
3. implementation covers all in-scope entry points and data paths;
4. adversarial and boundary evidence passes in a representative environment;
5. telemetry, operations, recovery and security are usable by named owners;
6. traceability links the exact requirement, implementation, proof and current revision;
7. no unresolved high-severity conflict, duplicate owner, required migration, consumer, approval or check remains.
