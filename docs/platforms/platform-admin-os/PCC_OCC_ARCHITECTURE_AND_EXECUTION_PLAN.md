# UniERP PCC and OCC Architecture and Execution Plan

Status: target architecture and executable delivery backlog  
Baseline date: 2026-08-24  
Scope: UniERP Provider Control Center (PCC) and Organization Control Center (OCC) across the `D:/UniERP` polyrepo  
Plan authority: this file is the single execution-plan source. Normative product requirements remain in `unierp-platform/docs/` and must be updated before implementation, as required by `DOCUMENTATION_GOVERNANCE.md`.

## 1. Outcome and non-negotiable decisions

Build two separate administrative operating systems on shared contracts, never a single portal with role-hidden provider pages:

- **PCC** is the provider control plane. It manages the UniERP estate, organizations as customers, provider operators, global policy floors, commercial products, shared infrastructure, platform security, and cross-organization operations.
- **OCC** is the organization control plane. It manages one organization's structure, workforce, access, configuration, subscribed capabilities, data, automations, integrations, and experience within provider-defined ceilings and floors.
- **Tenant Apps ERP** owns business transactions. PCC and OCC may configure or observe ERP applications but must not own finance, sales, HR, inventory, manufacturing, project, healthcare, education, or other domain transactions.
- **Identity Platform** owns principals, credentials, federation protocols, authentication factors, tokens, and sessions. PCC and OCC are policy and administration clients of Identity; neither reimplements authentication.
- **Runtime and Operations** owns deploy/runtime mechanisms. PCC controls those mechanisms; it does not put cloud credentials or deployment logic in the browser.
- **Data and Business Services** owns persistent domain state. UI repositories contain presentation and BFF code only, never authoritative business records.
- One resource has one write authority, one canonical contract, and one event family. Other apps use read projections or commands to the owner.

### 1.1 Catalog changes justified by repository evidence

The requested 17 PCC apps omit five domains already visible as independent route groups and services in `provider-admin-os`, `api`, `infra`, and `data`. Add:

| ID | Added PCC application | Why it must be first-class |
| --- | --- | --- |
| PCC-18 | Tenant & Customer Lifecycle | `/tenants/*`, SaaS/provider registry schemas, provisioning, suspension, offboarding, and customer-360 are not generic platform operations. |
| PCC-19 | Cloud Infrastructure & Reliability | `/infrastructure/*`, `infra`, capacity, backup, DR, compute, network, database, Kubernetes, and regions form a separate high-risk trust domain. |
| PCC-20 | Integration & Connector Operations | `/integrations/*`, provider credential registries, connector certification, connection health, and provider adapters need provider ownership distinct from tenant connections. |
| PCC-21 | AI Platform & Model Governance | `/ai/*` and `ai-governance.prisma` cover providers, models, agents, evaluations, guardrails, knowledge, cost, and safety. |
| PCC-22 | Support & Service Operations | `/support/*`, incident/customer communication, SLA, escalation, and cross-tenant case handling are operational records, not merely knowledge content. |

The requested 20 OCC apps omit two tenant-scoped domains supported by the API/data/client estate. Add:

| ID | Added OCC application | Why it must be first-class |
| --- | --- | --- |
| OCC-21 | AI Governance & Agent Operations | Organizations need tenant-scoped model allowlists, AI budgets, agents, knowledge sources, evaluation, safety policy, and AI audit independent of provider model onboarding. |
| OCC-22 | Organization Intelligence & Insights | Existing tenant analytics, scheduled reports, analytics APIs, usage and adoption views need one tenant-scoped semantic and decision surface, distinct from provider-wide Platform Intelligence. |

Target catalog: **22 PCC applications and 22 OCC applications**.

## 2. Current-state evidence and required corrections

This plan is based on the live workspace rather than route names alone:

- `provider-admin-os` is the PCC Next.js shell. Its manifest currently registers broad groups such as Overview, Tenants, Users & Access, Billing, Marketplace, Developers, Integrations, Operations, Infrastructure, Security, Support, AI, Analytics, and Settings. These become shell applications, not separate sources of truth.
- `tenant-admin` is the OCC Next.js shell. It contains organization settings, access, SSO, APIs, workflows, privacy, domains, branding, automation, support, and subscription surfaces.
- `tenant-admin/app/(dashboard)/settings/super-admin/*` and `tenant-admin/src/modules/super-admin.ts` contain provider-only tenant, plan, metering, subscription, and administrator authority. **They must migrate to PCC and then be removed from OCC.** Hiding them in navigation is insufficient.
- `api` is presently a broad NestJS modular service with `admin`, `analytics`, `api-platform`, `communication`, `devops`, `extension-registry`, `marketplace`, `notifications`, `org-structure`, `saas`, `saas-portal`, `subscriptions`, `workflow`, and business-domain modules. It is the initial service implementation host; module ownership must be explicit before any extraction.
- `idp` and `auth` implement identity protocols, provider/tenant sessions, platform entitlements, and guards. All identity applications consume these contracts.
- `data` contains relevant schemas including `provider-registry`, `saas-portal`, `policy-engine`, `compliance`, `ai-governance`, `resource-model`, `runbooks`, `operation-pipeline`, `workflow-runtime`, `org-structure`, `marketplace-payouts`, and large legacy core parts. New models must have one bounded-context owner; do not add another generic core model.
- `unierp-contracts` is the L0 source for API/event/entity contracts. `kernel`, `shared`, `auth`, `framework`, and `design-system` are reusable mechanisms, not places for PCC/OCC business ownership.
- `infra` and `config` implement runtime mechanisms; `developer-platform`, `sdk`, `extension-api`, and `sandbox` implement developer capabilities; `marketplace` and `extensions` implement commercial distribution; `tenant-sites`, `tenant-site-template`, and the retired `web-studio` surface inform digital experience ownership; `unierp-mobile` and `desktop-app` inform edge-client operations.
- `tenant-apps` owns ERP workflows. PCC/OCC deep links may launch it, but must not copy its business pages or tables.

Route existence, local fixture data, and non-failing placeholder tests are not implementation evidence. Each phase below closes a contract-to-persistence-to-API-to-UI-to-test slice.

## 3. Target logical architecture

```text
Provider operators                              Organization administrators
       |                                                     |
       v                                                     v
PCC shell: provider-admin-os                    OCC shell: tenant-admin
       | provider session + BFF                              | tenant session + BFF
       +-----------------------+-----------------------------+
                               v
                    Contracted command/query APIs
       +-----------------------+-----------------------------+
       |                       |                             |
       v                       v                             v
Identity Platform      Control/domain services       Runtime control plane
 idp + auth             api modules initially         infra + config
       |                       |                             |
       +-----------------------+-----------------------------+
                               v
             data schemas + RLS + outbox + audit ledger
                               |
                               v
        events -> projections/search/analytics/notifications

Cross-cutting build surfaces:
unierp-contracts -> sdk/framework -> design-system -> web/mobile/desktop clients
developer-platform + extension-api + sandbox -> marketplace + extensions
```

### 3.1 Architectural layers

1. **Experience layer:** PCC and OCC shells, design-system components, accessibility, localization, navigation manifests, command palette, task inbox, and deep links.
2. **BFF layer:** session binding, anti-CSRF, response composition, feature/entitlement filtering, correlation, and safe download proxying. A BFF never becomes a second domain service.
3. **Domain API layer:** versioned command/query endpoints, authorization enforcement, lifecycle state machines, idempotency, optimistic concurrency, bulk-operation jobs, and approval orchestration.
4. **Authority layer:** bounded-context data models, RLS, policy decision points, secret custody, ledgers, outbox, immutable audit, and retention.
5. **Integration layer:** event bus, webhooks, connector adapters, payment/tax/email/DNS/cloud providers, telemetry ingestion, and search/analytics projections.
6. **Operations layer:** deployment, service catalog, SLOs, alerts, runbooks, backup/restore, feature rollout, capacity, and incident response.

### 3.2 Global platform services used by all 44 apps

Implement these once; applications declare dependencies and policies:

| Shared service | Canonical responsibility | Initial repositories |
| --- | --- | --- |
| Principal/session service | Human/machine identity, OIDC/OAuth/SAML, MFA, sessions, tokens, signing keys | `idp`, `auth` |
| Policy decision/enforcement | RBAC + ABAC/ReBAC, provider/tenant boundary, delegated scope, separation of duties | `idp`, `kernel`, `api` |
| Tenant context | Verified organization identity, isolation, regional cell, request propagation | `kernel`, `service-kit`, `api`, `data` |
| Contract registry | API schemas, commands, errors, events, compatibility and deprecation | `unierp-contracts`, `sdk` |
| Operation manager | Idempotent async commands, progress, cancel/retry, compensation, evidence | `api`, `data/operation-pipeline`, `kernel` |
| Approval service | Reusable approval definitions and decisions; domain owner retains final command | `api/workflow`, `data/workflow-runtime` |
| Audit service | Attributable, tamper-evident audit event ingestion/query/export | `kernel`, `api`, `data/compliance`, optional `blockchain` adapter |
| Notification delivery | Templates, preferences, routing, delivery attempts, provider adapters | `api/notifications`, `api/communication` |
| Metering/entitlement | Usage events, aggregation, limits, grants, enforcement decisions | `api/subscriptions`, `api/saas`, `data/saas-portal` |
| Search and projections | Read-only cross-domain projections with source links and freshness | `api/search`, `api/analytics` |
| File/export service | Malware scanning, encryption, signed download, retention, eDiscovery export | `api/storage`, `api/documents` |
| Design/runtime framework | Tokens, accessible components, schema-driven resources, consistent states | `design-system`, `storybook`, `framework` |

### 3.3 Mandatory resource contract

Every managed resource must declare:

- canonical owner application and service module;
- provider, organization, environment, and region scope as applicable;
- stable identifier, lifecycle states, version/ETag, timestamps, and actor attribution;
- create/read/update/archive/delete rules, including whether deletion is soft, delayed, or prohibited;
- permission names and ABAC conditions enforced server-side;
- approval/step-up requirements for high-risk transitions;
- request/response/error schema in `unierp-contracts`;
- idempotency behavior for commands and cursor semantics for lists;
- audit event and domain event families with schema versions;
- retention, residency, classification, encryption, and export behavior;
- SLO, telemetry, runbook, recovery owner, and failure/degraded UI behavior.

## 4. Capability ownership and duplication firewall

### 4.1 System-of-record matrix

| Concern | Canonical write owner | PCC responsibility | OCC responsibility | Forbidden duplication |
| --- | --- | --- | --- | --- |
| Organization/customer lifecycle | PCC-18 | create, provision, suspend, merge, migrate, terminate organization account | maintain own profile/structure in OCC-01 | OCC cannot create provider tenant records; PCC cannot edit ERP org transactions |
| Human/machine principals | Identity Platform | govern provider workforce through PCC-03 | administer organization workforce through OCC-02/OCC-04 | no user/password/session tables owned by either shell |
| Authorization | Policy service | provider roles and cross-org delegated support policy in PCC-03 | org roles, access reviews and SoD in OCC-03 | navigation visibility is never authorization |
| Authentication policy | Identity Platform | provider floors and emergency controls via PCC-02 | org SSO/MFA/session settings via OCC-04 within floors | no custom SAML/OIDC engines in PCC/OCC |
| Product catalog and prices | PCC-04/PCC-06 | offerings, versions, price books, taxes, contracts | select/renew/cancel eligible offers in OCC-06 | OCC cannot author global plans/prices |
| Entitlements and licenses | PCC-05 | define entitlement SKUs, rules, grants, revocations, license pools | assign granted capacity/apps in OCC-09 | subscriptions, entitlements, and app installs remain separate records |
| Usage and quotas | Metering service; policy authored by PCC-08 | define meter catalog, rating inputs, hard ceilings | observe consumption, allocate subquotas in OCC-08 | billing ledger is not the usage store |
| Billing | PCC-06 ledger | invoice, collect, refund, recognize, reconcile, payout | payment methods, invoice view, disputes in OCC-07 | OCC never edits provider ledger entries |
| Secrets and keys | PCC-07 custody service | provider/cloud/platform keys, HSM/KMS, signing and rotation | tenant credential references via OCC-11/OCC-12 | secret values never copied to UI DBs/logs/events |
| API traffic | PCC-08 gateway authority | global routes, WAF, rate ceilings, abuse response | clients, keys, scopes, webhooks and tenant budgets in OCC-12 | API keys are not marketplace install tokens |
| Compliance | PCC-09 | framework/control library, attestations, evidence policy | org applicability, evidence, legal holds and audits in OCC-14 | one control definition; separate provider/org evaluations |
| Threat intelligence | PCC-10 | global detections, SOC cases, cross-org campaigns | tenant posture/incidents in OCC-13 | OCC receives sanitized findings, never another tenant's telemetry |
| Global configuration | PCC-13 | schemas, defaults, floors, templates, staged rollouts | organization override values in owning OCC apps | no duplicate setting keys or generic JSON blobs without schema owner |
| Mobile/desktop | PCC-11/PCC-12 | signing, release channels, compatibility, telemetry, kill switches | channel/device policy and branded experience via OCC-18/OCC-13 | application business logic remains in tenant apps/shared APIs |
| Developer ecosystem | PCC-14 | global API products, SDK lifecycle, publisher governance, sandbox policy | organization developers, clients and quotas in OCC-12 | marketplace commerce remains PCC-17 |
| Knowledge/adoption | PCC-15 | provider docs, learning catalog, release education, adoption programs | org help surfaces and local guidance via OCC-20/OCC-18 | support cases remain PCC-22/OCC-20 |
| Platform intelligence | PCC-16 | cross-org operational/product/revenue insights | organization-only insights in OCC-22 | no raw cross-tenant analytics exposed to OCC |
| Marketplace | PCC-17 | catalog, review, certification, commercial terms and takedown | install/configure/upgrade approved items in OCC-10 | publisher artifact source remains Developer Platform |
| Cloud infrastructure | PCC-19 | compute/network/storage/database/cells/DR/capacity | see contracted health only through OCC-20 | no cloud provider credentials or Kubernetes control in OCC |
| Integrations | PCC-20 | connector definitions, adapters, certifications, provider accounts | connection instances, mappings and schedules in OCC-11 | one connector schema; many tenant connection instances |
| AI | PCC-21 | provider/model registry, platform safety floors, evaluation standards and aggregate spend | tenant agents, allowlists, knowledge and budgets in OCC-21 | prompts/knowledge and model catalog have different owners |
| Support | PCC-22 | global case system, SLAs, escalations, tenant support access | open/track org cases and service requests in OCC-20 | support is not incident authority; links to PCC-01 incidents |
| Notifications | delivery service + OCC-19 preferences | provider channel adapters/templates and emergency broadcasts via PCC-13/PCC-22 | org templates, routing, preferences and delivery logs in OCC-19 | domains emit events; they do not send email/SMS directly |

### 4.2 Naming rule

Use these terms consistently:

- **Organization** is the customer/tenant business account; `tenantId` remains the technical isolation key.
- **Provider operator** acts in PCC. **Organization administrator** acts in OCC.
- **Plan** is a commercial offer; **subscription** is an organization's agreement; **entitlement** is a granted capability; **license allocation** assigns entitlement capacity; **quota** constrains consumption; **usage** is measured consumption. Do not collapse these into one model.
- **Application** is a navigable PCC/OCC capability. **Module/extension** is an installable business capability. **Service** is a deployable/runtime implementation. These are not interchangeable.

## 5. Common six-phase delivery model

Every application has phases P0-P5. A later phase may start only when the prior phase exit is evidenced for that application and all declared dependencies are available.

| Phase | Name | Required result |
| --- | --- | --- |
| P0 | Boundary and contract baseline | Inventory existing routes/APIs/models/tests; name owner/non-owner; write requirements, resource state machines, permission matrix, contract/event drafts, migration/retirement map, threat model, UX journeys, and acceptance tests. No production feature coding. |
| P1 | Foundation and trustworthy read path | Register app manifest/navigation; establish permissions; implement canonical list/detail/read models from real services; loading/empty/error/stale/unknown states; audit read; telemetry; no fixture/local truth. |
| P2 | Core lifecycle commands | Implement create/change/archive and primary state transitions end to end with validation, idempotency, concurrency, audit, outbox, operation status, confirmations, and negative authorization/isolation tests. |
| P3 | Enterprise governance | Add bulk actions, approvals, SoD, effective dates, policy inheritance, delegated administration, import/export, retention, legal/audit evidence, accessibility and localization. |
| P4 | Automation, ecosystem and intelligence | Add workflows, connector/event integration, rules, recommendations/analytics, anomaly signals, public APIs/webhooks where allowed, and mobile/desktop parity where relevant. Human override and provenance are mandatory. |
| P5 | GA and resilience | Contract/CDC/E2E/performance/security/a11y tests; SLOs/alerts/runbooks; backup/restore or rebuild proof; DR/failover where applicable; migration/reconciliation; feature rollout and rollback; remove superseded routes/fixtures; traceability complete. |

### 5.1 Universal phase exit gate

A phase is complete only when all applicable checks are true:

1. Normative requirement, architecture/contract, security, and traceability documents in `unierp-platform/docs/` are updated first; execution status stays outside those documents.
2. `unierp-contracts` contains schemas before server/client implementations; compatibility and generated-client checks pass.
3. The database migration is reversible where safe, RLS/isolation is tested, and a data backfill/reconciliation plan exists.
4. Server permission checks, tenant/provider scope, validation, idempotency, concurrency, audit, event publication, and failure semantics are behaviorally tested.
5. UI uses live contracts and shows permission-aware, loading, empty, stale, partial, degraded, error, success, and operation-progress states.
6. Critical paths meet WCAG 2.2 AA keyboard/screen-reader requirements and localization rules.
7. Metrics, logs, traces, correlation IDs, alerts, dashboards, SLO and runbook are supplied in the owning operational repository.
8. Unit, contract, integration, negative-security, E2E and relevant performance/recovery tests pass in each changed repository.
9. No second source of truth, copied DTO/enum, provider route in OCC, direct DB access from UI, cross-domain table mutation, or secret exposure is introduced.
10. Git status was inspected before edits and unrelated user changes were preserved.

## 6. PCC application plans

Each capability list is the enterprise scope. Each phase line names the application-specific result in addition to the common phase gate.

### PCC-01 Platform Operations Center

**Owns:** service catalog, environment/cell inventory, health and dependency map, SLOs, incidents, changes, releases, maintenance, jobs/queues, capacity signals, operational command center, runbook execution, and operation timeline. It coordinates PCC-19 infrastructure but does not own cloud resources.

- **P0:** Map services, owners, telemetry sources, current ops/releases/incidents/jobs routes, operation states, SLO taxonomy, incident/change/release state machines, and command risk classes.
- **P1:** Deliver live estate/service topology, health, SLO/error-budget, job/queue and current incident/readiness views with freshness and unknown-state labeling.
- **P2:** Implement incident, maintenance, change, release, job retry/cancel and runbook-execution commands with approvals, step-up, durable operation IDs and audit.
- **P3:** Add major-incident roles, change advisory policy, freeze windows, postmortems, service ownership, on-call/escalation, bulk maintenance and evidence exports.
- **P4:** Add event correlation, safe remediation suggestions, automated rollback policies, ChatOps/webhooks, capacity forecasting and cross-app operational timelines.
- **P5:** Prove failure injection, release rollback, queue recovery, incident notification, SLO accuracy, 24x7 dashboards/runbooks and disaster-command continuity.

### PCC-02 Platform Security Center

**Owns:** provider security posture, security policy floors, vulnerability/exposure management, security exceptions, secure configuration posture, privileged access controls, break-glass governance, encryption posture, and security program dashboard. Threat detection cases belong to PCC-10.

- **P0:** Inventory security controls, provider permissions, break-glass paths, vulnerabilities, policy sources and security routes; define severity, exception and remediation lifecycles.
- **P1:** Provide live posture, exposure, vulnerability, privileged-access, encryption and exception read models with evidence freshness.
- **P2:** Implement remediation assignment, exception request/approval/expiry, policy-floor changes, privileged session termination and break-glass activation/review.
- **P3:** Add risk acceptance, compensating controls, control-to-asset mapping, continuous compliance, delegated security administration and board-ready reports.
- **P4:** Integrate scanners/cloud posture/CI supply-chain feeds; automate safe remediation and risk prioritization with explainable provenance.
- **P5:** Red-team authorization boundaries, exercise break-glass and exception expiry, verify security SLOs, evidence retention and recovery.

### PCC-03 Organization Identity Governance

**Owns:** provider workforce directory governance, provider roles/permissions, access packages, privileged access, joiner/mover/leaver, access reviews, SoD, delegated tenant-support access and provider service principals. Identity records/protocols remain in Identity Platform.

- **P0:** Separate provider from tenant roles; map Identity contracts, permission registry, support delegation and current `/access/*`; define SoD and access-review models.
- **P1:** Deliver provider principal, group, role, permission, service-principal, session and effective-access views sourced from Identity.
- **P2:** Implement provider invite/activate/suspend, role assignment, session revoke, access package and time-bound support delegation through Identity commands.
- **P3:** Add approvals, JIT/PIM, SoD checks, periodic certification, orphan account detection, recertification evidence and emergency access reviews.
- **P4:** Add HR/SCIM feeds, identity risk signals, automated deprovisioning and policy analytics without duplicating the Identity directory.
- **P5:** Prove provider/tenant isolation, privilege escalation resistance, revocation propagation, JML completeness and access-review evidence.

### PCC-04 Subscription Operations

**Owns:** commercial plan catalog, plan versions, offers, trials, subscription lifecycle, amendments, renewals, cancellations, migrations, discounts/coupons policy, contracts, reseller/channel subscriptions and dunning policy coordination. Entitlement definitions belong to PCC-05; money ledger belongs to PCC-06.

- **P0:** Define plan/offer/subscription/amendment state machines, price and entitlement references, effective dating, migration from OCC `super-admin` and existing subscription routes.
- **P1:** Deliver plan catalog/version, subscription/customer, renewal, trial, churn and migration read models.
- **P2:** Implement plan publish/archive, subscribe, amend, pause, resume, renew, cancel and migrate with proration preview and durable operations.
- **P3:** Add approval thresholds, enterprise contracts, reseller hierarchy, negotiated terms, grandfathering, scheduled changes, bulk migrations and audit exports.
- **P4:** Add lifecycle automation, renewal/churn signals, quote/CRM integration, webhooks and cohort intelligence.
- **P5:** Reconcile subscription-to-entitlement-to-billing consistency, test time boundaries/proration/rollback, and retire provider routes from OCC.

### PCC-05 Entitlement & License Authority

**Owns:** entitlement catalog, editions, feature/resource grants, license metrics/pools, dependencies/conflicts, policy evaluation, grant/revoke lifecycle, offline licenses, partner/reseller capacity and reconciliation.

- **P0:** Define entitlement versus subscription versus quota; inventory app/module flags and licenses; specify grant state, evaluation API, events and migration from ad hoc feature flags.
- **P1:** Deliver entitlement catalog, organization grants, license pools, utilization, dependency and reconciliation views.
- **P2:** Implement versioned entitlement definitions, grants/revocations, license allocation rules, grace periods and enforcement decisions.
- **P3:** Add approval, effective dating, delegation, offline license signing/revocation, over-allocation handling, evidence and emergency override expiry.
- **P4:** Integrate subscription/marketplace/application manifests; add automated reconciliation, optimization suggestions and public evaluation SDK.
- **P5:** Prove deterministic low-latency evaluation, fail-safe behavior, revocation propagation, cross-service CDC and ledger reconciliation.

### PCC-06 Revenue & Billing Operations

**Owns:** billing accounts, price books, rated charges, invoice/credit-note lifecycle, tax, payments, refunds, disputes, collections, revenue recognition, general-ledger export, marketplace payouts, reseller settlement and financial reconciliation.

- **P0:** Define immutable financial ledgers, currency/rounding/tax/time rules, billing state machines, segregation of duties, PCI scope and provider integrations.
- **P1:** Deliver customer balances, invoices, payments, revenue, aging, tax, payout and reconciliation read models with source lineage.
- **P2:** Implement invoice generation/finalization, payment capture, refund, credit note, write-off, dispute and collection commands with immutable entries.
- **P3:** Add approval thresholds, close periods, multi-entity/currency/tax, revenue schedules, dunning, payout controls, audit/eDiscovery export and finance SoD.
- **P4:** Integrate payment/tax/accounting/bank providers; add cash/revenue forecasts, anomaly detection and reconciliation automation.
- **P5:** Prove double-entry balance, idempotent provider callbacks, period close, disaster recovery, PCI controls and subscription/usage reconciliation.

### PCC-07 Key & Secrets Authority

**Owns:** KMS/HSM inventory, secret references, provider credentials, signing/encryption keys, certificates, rotation/revocation, escrow, access policy, lease/broker service, secret scanning response and cryptographic posture.

- **P0:** Locate credentials in repos/runtime, classify custody, define secret/key/certificate lifecycles, write-only contracts, rotation dependencies and zero-value logging rules.
- **P1:** Deliver metadata-only inventory, expiry/rotation posture, access-policy, dependency and cryptographic-health views.
- **P2:** Implement create/import/generate, lease, rotate, revoke, certificate renew and emergency lock commands through server-side custody providers.
- **P3:** Add dual control, HSM quorum, key ceremonies, escrow/recovery, scoped delegation, access review, evidence and automated expiry policy.
- **P4:** Integrate cloud vaults, CI/CD, connector credentials and secret scanners; automate rotation with dependency health and rollback.
- **P5:** Prove values never leave custody, rotation without outage, revoked-token failure, restore/escrow ceremony, audit completeness and crypto agility.

### PCC-08 API Traffic Control

**Owns:** API catalog/gateway routes, global policies, WAF/abuse protection, authentication methods, scopes, rate ceilings, quotas enforcement, routing, versions/deprecation, traffic shaping, caching, gateway analytics and emergency kill switches.

- **P0:** Inventory exposed routes and guards, define API product/route/policy models, permission/scope registry, rate hierarchy and version/deprecation rules.
- **P1:** Deliver API catalog, route health, traffic, latency/error, consumer, quota, threat and version adoption views.
- **P2:** Implement route/policy publication, rate/traffic changes, consumer blocking, key revocation and emergency kill switch with preview/rollback.
- **P3:** Add approval, staged rollout, mTLS, IP/network policies, data classification, residency routing, SLA tiers and evidence exports.
- **P4:** Add adaptive abuse controls, anomaly detection, developer notifications, gateway-as-code and provider integrations.
- **P5:** Load/chaos test enforcement, fail-closed behavior, backward compatibility, multi-region routing, WAF effectiveness and rollback.

### PCC-09 Governance & Compliance Center

**Owns:** regulatory/framework library, provider control definitions, policy hierarchy, control tests, evidence catalog, audits/assessments, risks/exceptions, attestations, privacy program oversight, legal requests and compliance reporting.

- **P0:** Define framework-control-policy-evidence-risk-audit relationships, map existing compliance models, retention/classification and accountable owners.
- **P1:** Deliver framework/control coverage, evidence freshness, risks, exceptions, audit and attestation dashboards with source lineage.
- **P2:** Implement framework/control versioning, evidence requests, test results, issues/remediation, risk treatment and attestation workflows.
- **P3:** Add multi-framework mapping, continuous controls, legal holds, auditor workspaces, e-signature, privacy impact assessment and board/regulator packs.
- **P4:** Integrate scanners/ticketing/cloud/IAM evidence; automate evidence collection and gap/risk analysis with human attestation.
- **P5:** Prove evidence integrity, access segregation, retention/legal hold, reproducible reports and audit-ready disaster recovery.

### PCC-10 Security Intelligence

**Owns:** security telemetry ingestion, detection rules, threat intelligence, alerts, SOC cases, investigations, indicators, hunting, UEBA, cross-organization campaigns, containment orchestration and post-incident learning.

- **P0:** Define telemetry/detection/alert/case/indicator schemas, severity and case state, privacy boundaries, cross-org sanitization and containment authority.
- **P1:** Deliver SOC queue, detections, cases, indicators, affected assets/orgs, timelines and telemetry-health views.
- **P2:** Implement triage, assign, investigate, evidence attach, indicator block, containment request and close/post-incident commands.
- **P3:** Add chain of custody, case collaboration, legal/privacy controls, playbooks, threat-hunt workspaces, SLA/escalation and executive reporting.
- **P4:** Integrate SIEM/EDR/cloud/email/intel feeds; add correlation, UEBA and automated containment with approval and rollback.
- **P5:** Purple-team detections and response, prove tenant data minimization, ingestion durability, case evidence integrity and containment recovery.

### PCC-11 Mobile Platform Operations

**Owns:** mobile app registrations, signing, builds, stores, release channels, minimum versions, compatibility, feature rollout, crash/performance telemetry, push provider operations, device-risk signals, remote configuration and kill switches. Tenant device policy belongs to OCC-13/OCC-18.

- **P0:** Inventory `unierp-mobile` capabilities, build/sign/store dependencies, contract parity and security/privacy requirements; define release state machine.
- **P1:** Deliver build/channel/version, adoption, compatibility, crash/performance, push and store-compliance views.
- **P2:** Implement build promotion, phased rollout, minimum-version, rollback, kill switch, signing rotation and push-provider configuration commands.
- **P3:** Add approval, ring/channel governance, device compatibility matrix, release notes/localization, privacy attestations and accessibility evidence.
- **P4:** Add automated quality gates, crash/regression detection, release recommendations, deep-link/app-config integration and remote diagnostics.
- **P5:** Prove reproducible signed builds, store rollback/expedite, offline upgrade behavior, telemetry privacy, push resilience and contract parity.

### PCC-12 Desktop Platform Operations

**Owns:** desktop packaging/signing/notarization, installers, update channels, minimum versions, OS compatibility, crash/performance, endpoint integration policy, extension/runtime compatibility, remote configuration and kill switches.

- **P0:** Make the greenfield `desktop-app` technology/security decision; define supported OS/architecture, packaging, sandboxing, update and release lifecycles.
- **P1:** Deliver build/version/channel, adoption, compatibility, crash/performance and certificate posture views.
- **P2:** Implement build promotion, staged updates, rollback, minimum version, kill switch, code-signing rotation and installer publication.
- **P3:** Add approvals, enterprise deployment packages, proxy/offline support, accessibility, localization, endpoint-policy and software-bill-of-materials evidence.
- **P4:** Add automated compatibility/security gates, regression detection, diagnostics bundles and managed deployment integration.
- **P5:** Prove signed/notarized reproducible builds, secure updater, rollback, offline operation, OS matrix and compromise response.

### PCC-13 Global Platform Configuration

**Owns:** configuration schema registry, platform defaults/floors/ceilings, environment/region overrides, feature rollout definitions, branding/localization defaults, provider templates, change history, validation, dependency graph and staged activation. Domain-owned values remain with their domain.

- **P0:** Inventory every setting/feature flag/env variable, name an owner and scope, eliminate duplicate keys, define typed schema/inheritance and migration from JSON/local env truth.
- **P1:** Deliver searchable schema/value/inheritance, drift, rollout and change-history views with secret-safe rendering.
- **P2:** Implement draft/validate/diff/approve/schedule/activate/rollback for typed configuration and feature rollout.
- **P3:** Add four-eyes controls, environment promotion, region/tenant targeting, policy floors, templates, bulk changes and signed exports.
- **P4:** Add configuration-as-code, drift remediation, impact analysis, dependency-aware rollout and experimentation integration.
- **P5:** Prove deterministic resolution, rollback under failure, propagation SLO, schema compatibility, audit and disaster reconstruction.

### PCC-14 Developer Ecosystem Operations

**Owns:** developer/publisher organizations, API products/documentation, SDK/CLI lifecycle, app registrations, sandbox policy/capacity, extension contract governance, certification tooling, developer support programs and ecosystem health. Artifact authoring stays in Developer Platform; commerce stays PCC-17.

- **P0:** Map `developer-platform`, `sdk`, `extension-api`, `sandbox`, API modules and publisher identities; define ownership, compatibility and certification lifecycles.
- **P1:** Deliver ecosystem, developer/publisher, API/SDK version, sandbox, app registration, compatibility and support-health views.
- **P2:** Implement publisher verification, API product publication, SDK promotion/deprecation, sandbox allocation, app suspension and certification-run commands.
- **P3:** Add approvals, partner tiers, certification evidence, quota/policy delegation, legal agreements, vulnerability disclosure and support SLA.
- **P4:** Add CI integrations, automated compatibility/security testing, ecosystem analytics, developer communications and migration tooling.
- **P5:** Prove artifact provenance, sandbox isolation, SDK/API compatibility, revocation, certification reproducibility and developer journey E2E.

### PCC-15 Knowledge & Adoption Operations

**Owns:** provider product documentation governance, help taxonomy, learning paths/certifications, release education, onboarding programs, contextual help registry, adoption campaigns, feedback/research and content effectiveness. Support cases belong PCC-22.

- **P0:** Inventory docs/help/training/onboarding/feedback across repos, define content ownership, review/version/localization and publication lifecycles.
- **P1:** Deliver knowledge catalog, content status, audience, localization, search quality, learning and adoption views.
- **P2:** Implement author/review/publish/archive, learning assignment/certification, onboarding program and feedback triage lifecycles.
- **P3:** Add legal/accessibility review, audience segmentation, version-to-release mapping, content retention, partner enablement and evidence.
- **P4:** Add contextual help APIs, search recommendations, adoption nudges/experiments, feedback-to-roadmap integration and content-gap analytics.
- **P5:** Prove content freshness against product versions, search relevance, localization/a11y, certification integrity and adoption measurement privacy.

### PCC-16 Platform Intelligence

**Owns:** provider-wide semantic metrics, cross-org privacy-safe product/operations/revenue/adoption analytics, executive scorecards, cohort/funnel, forecasting, anomaly detection, governed reports and data-product lineage. It does not own source transactions.

- **P0:** Define canonical metric/semantic catalog, source lineage, aggregation/privacy thresholds, freshness/SLA, access tiers and reconciliation rules.
- **P1:** Deliver governed operational, customer, product, financial, adoption and support scorecards with definitions and freshness.
- **P2:** Implement metric/report/dashboard lifecycle, filters/drill-through, scheduling/export and certified dataset publication.
- **P3:** Add row/column security, privacy budgets, approval, executive/regulatory packs, metric change governance and reproducibility.
- **P4:** Add forecasts, cohorts, anomaly/root-cause signals, experimentation analysis and action links with explainability.
- **P5:** Reconcile to sources/ledgers, test privacy leakage, freshness, query performance, failover, lineage and metric-version compatibility.

### PCC-17 Marketplace Operations

**Owns:** marketplace taxonomy/catalog, listings, publisher review, technical/security/compliance certification, versions, commercial terms, reviews/ratings moderation, discovery merchandising, purchase/install policy, payouts linkage, takedown/recall and marketplace analytics.

- **P0:** Unify split catalog authority across `marketplace`, API registry and local UI data; define listing/version/review/publish/takedown/install state machines.
- **P1:** Deliver catalog, publisher, submission, certification, version, installation, review, revenue and risk read models from registry truth.
- **P2:** Implement submit/review/approve/reject/publish/suspend/recall/version/promote and moderation commands.
- **P3:** Add multi-reviewer SoD, legal/commercial terms, regional availability, payout controls, appeals, disclosure, evidence and SLA.
- **P4:** Add automated artifact scanning/certification, merchandising, recommendations, publisher webhooks and upgrade-risk intelligence.
- **P5:** Prove signed artifact provenance, install/upgrade/uninstall/recall E2E, payout reconciliation, moderation/audit and catalog failover.

### PCC-18 Tenant & Customer Lifecycle

**Owns:** organization/customer master, legal/account contacts, onboarding/provisioning, environment/region/cell placement, trial conversion, suspension/restoration, migration, merge/split, offboarding/deletion, reseller relationship, customer 360 and lifecycle operations.

- **P0:** Map `/tenants/*`, provider registry and SaaS models; define lifecycle state machine, data ownership, deletion grace/holds, placement, provisioning saga and OCC super-admin migration.
- **P1:** Deliver organization registry, customer 360, lifecycle, placement, provisioning, health, subscription/entitlement/support summary and operation history.
- **P2:** Implement create/provision/activate/suspend/restore/migrate/terminate with validation, idempotent saga, compensation, approvals and progress.
- **P3:** Add enterprise/reseller hierarchies, merge/split, data/legal holds, delegated support, bulk lifecycle, onboarding checklists and compliance evidence.
- **P4:** Add CRM/contract/domain/payment integrations, lifecycle automation, health/risk scoring and capacity-aware placement recommendations.
- **P5:** Prove no cross-tenant access, retry/reconciliation, partial-failure recovery, migration/restore, deletion/legal hold and remove all provider authority from OCC.

### PCC-19 Cloud Infrastructure & Reliability

**Owns:** cloud accounts, regions/cells, clusters, compute, network, storage, databases, capacity, provisioning, backup/restore, replication, DR, cost allocation, infrastructure policy and reliability exercises.

- **P0:** Inventory `infra`, cloud/Kubernetes/database/storage routes and credentials; define resource graph, desired/actual state, drift, provisioning and recovery contracts.
- **P1:** Deliver estate topology, resource health/capacity/cost/drift, backup/replication and recovery-readiness views.
- **P2:** Implement provision/scale/patch/failover/backup/restore/retire commands through infrastructure controllers with plan/preview/approval/operation status.
- **P3:** Add policy-as-code, quotas, maintenance, capacity reservations, multi-region/cell governance, FinOps allocation, immutable backups and recovery evidence.
- **P4:** Add IaC/GitOps reconciliation, autoscaling, predictive capacity/cost, automated remediation and provider portability adapters.
- **P5:** Run destructive-safe restore/failover/region-loss exercises, prove RTO/RPO, drift convergence, credential isolation and infrastructure rollback.

### PCC-20 Integration & Connector Operations

**Owns:** connector definition registry, provider adapters/accounts, credential field schemas, capability/version certification, mappings/templates, rate/retry policies, runtime health, regional availability, deprecation and provider-wide incidents. Tenant connection instances belong OCC-11.

- **P0:** Inventory provider registry and `/integrations/*`; define connector/adapter/version/capability/health contracts and ownership boundary with marketplace and OCC.
- **P1:** Deliver connector catalog, adapter/provider account, certification, version adoption, health, error/rate and dependency views without secret values.
- **P2:** Implement connector/version publication, provider-account binding, certify/suspend/deprecate, retry/circuit policy and incident commands.
- **P3:** Add dual-control credentials, regional/compliance policy, data classification, SLA, compatibility matrix, audit and vendor-risk management.
- **P4:** Add automated certification, synthetic health tests, mapping/template distribution, anomaly detection and provider status integration.
- **P5:** Prove credential isolation, connector backward compatibility, outage/circuit behavior, replay/idempotency, failover and tenant-safe status propagation.

### PCC-21 AI Platform & Model Governance

**Owns:** AI provider/model registry, model versions/capabilities, platform safety and data-use floors, routing/fallback, evaluation standards/benchmarks, prompt/tool/agent platform policy, aggregate cost, knowledge infrastructure policy, red-team findings and AI incident controls.

- **P0:** Map `/ai/*`, AI APIs/schema and providers; define model/provider/evaluation/policy/incident contracts, risk classes, data boundaries and tenant override rules.
- **P1:** Deliver provider/model, capability, availability/latency, evaluation, safety, policy, usage/cost and incident views.
- **P2:** Implement onboard/evaluate/approve/route/suspend/retire models/providers; publish guardrail floors and emergency disable with approval/rollback.
- **P3:** Add AI risk assessments, human oversight, model cards, regional/data-use rules, red teaming, audit/explainability evidence and vendor governance.
- **P4:** Add continuous evaluation, drift/safety/cost anomaly detection, dynamic routing, policy simulation and automated containment with human control.
- **P5:** Prove prompt/data isolation, injection/exfiltration defenses, model failover, evaluation reproducibility, emergency disable and regulatory evidence.

### PCC-22 Support & Service Operations

**Owns:** provider case system, customer/service-request records, entitlements/SLA, queues, assignment, escalation, cross-org support delegation, incident/problem linkage, communications, remote diagnostics consent, knowledge linkage, CSAT and support analytics.

- **P0:** Map `/support/*`, communication/service modules and customer lifecycle; define case/request/SLA/escalation/consent contracts and data-access boundaries.
- **P1:** Deliver queues, cases, customers, SLA risk, communications, linked incidents/problems, knowledge and support-health views.
- **P2:** Implement create/assign/respond/escalate/resolve/reopen, entitlement validation, time-bound support access and consented diagnostics.
- **P3:** Add skill/region routing, major account plans, approvals, complaint/privacy handling, service credits linkage, QA, workforce and evidence exports.
- **P4:** Add omnichannel intake, safe triage/summarization, suggested knowledge, SLA prediction, customer health and automation with agent review.
- **P5:** Prove tenant isolation, support delegation expiry, communication delivery, SLA clocks, audit/eDiscovery, failover and full customer-support journey.

## 7. OCC application plans

### OCC-01 Organization Profile & Structure

**Owns:** organization profile, legal entities, business units, departments, locations, cost/profit centers, positions, reporting relationships, calendars, currencies, addresses, identifiers and organization hierarchy versions. Customer lifecycle belongs PCC-18.

- **P0:** Map org-structure schemas/APIs and profile routes; define hierarchy/version/effective-date rules, external IDs and business-domain references.
- **P1:** Deliver profile, legal entity, unit/location/position hierarchy, validation and change-history views.
- **P2:** Implement create/change/reorganize/archive, effective-dated hierarchy changes, imports and reference validation.
- **P3:** Add approvals, impact preview, SoD, delegated unit administration, bulk restructuring, localization, evidence and rollback/correction.
- **P4:** Integrate HR/finance/reference systems; add org-chart analytics, vacancy/span signals and workflow routing projections.
- **P5:** Prove hierarchy integrity/no cycles, effective dating, downstream compatibility, tenant isolation, import reconciliation and recovery.

### OCC-02 Workforce Directory

**Owns:** tenant workforce profiles and organization membership administration, workers/contractors/guests, groups/teams, lifecycle status, contact/manager/location references and SCIM provisioning policy. Identity owns principal credentials.

- **P0:** Define worker/member/principal relationship, JML states, source precedence, privacy fields, group model and identity commands.
- **P1:** Deliver workforce, group/team, manager, guest, status, source and license-assignment views.
- **P2:** Implement invite/provision/activate/update/suspend/terminate, group membership, bulk import and guest expiry via Identity contracts.
- **P3:** Add approvals, delegated unit admins, sensitive-field controls, data minimization, access handoff, certification and JML evidence.
- **P4:** Add HRIS/SCIM sync, lifecycle automation, duplicate/orphan detection, org-change triggers and workforce insights.
- **P5:** Prove identity linking, termination revocation, sync conflict resolution, privacy/export, tenant isolation and high-volume imports.

### OCC-03 Access Governance

**Owns:** tenant roles, permission bundles, resource scopes, access requests, assignments, effective-access view, SoD policy, access reviews, JIT/PIM, delegated administration and remediation. Authentication belongs OCC-04/Identity.

- **P0:** Inventory roles/permissions/packages/matrix, define resource scope and policy model, SoD conflicts, review cycles and migration from ad hoc roles.
- **P1:** Deliver roles, permissions, assignments, effective access, risky/orphan access and review views.
- **P2:** Implement role/package lifecycle, assignment/request/approve/revoke, scoped delegation and access-review decisions.
- **P3:** Add SoD prevention/detection, JIT/PIM, recertification, break-glass tenant policy, bulk remediation and auditor evidence.
- **P4:** Add policy simulation, identity-risk signals, automated birthright access/removal and analytics with explainable recommendations.
- **P5:** Prove privilege-escalation resistance, server enforcement, revocation SLO, SoD, review completeness and cross-tenant denial.

### OCC-04 Identity & Authentication

**Owns:** tenant configuration of domains, SSO/federation, MFA/passwordless/factor policy, password/session/IP/network policy, self-service recovery, device/session view and authentication branding within PCC floors. Protocol/runtime state belongs Identity Platform.

- **P0:** Map SSO/MFA/password/session/domain routes to Identity contracts; define floor/override resolution, validation and rollback.
- **P1:** Deliver domain verification, IdP/factor/session/device, policy inheritance and authentication-health views.
- **P2:** Implement verify domain, configure/test/activate/rollback federation, MFA/session/IP policy and session/device revoke.
- **P3:** Add multiple IdPs/routing, step-up rules, recovery/admin safeguards, delegated auth admins, emergency rollback and evidence.
- **P4:** Add SCIM/certificate rotation, risk-adaptive authentication, passwordless rollout and sign-in analytics.
- **P5:** Prove lockout avoidance, federation fallback, factor recovery, session revocation, protocol conformance and tenant isolation.

### OCC-05 Business Application Control

**Owns:** tenant business-application catalog, enable/disable, application settings entry points, module dependencies, environment availability, navigation exposure, business-role mapping and health/readiness. Business records remain in Tenant Apps/API domains.

- **P0:** Inventory all ERP/client modules, manifests, dependencies, routes and entitlements; define application activation state and ownership links.
- **P1:** Deliver application catalog, entitlement/readiness, dependency, configuration completeness, usage and health views.
- **P2:** Implement request/enable/disable, dependency validation, role exposure and configuration handoff without copying domain settings.
- **P3:** Add approvals, phased organizational rollout, maintenance windows, impact preview, attestations and change evidence.
- **P4:** Add adoption recommendations, health alerts, automation and deep links across web/mobile/desktop.
- **P5:** Prove entitlements/dependencies, no business data mutation, rollback, navigation parity and end-to-end app activation.

### OCC-06 Plan & Subscription Management

**Owns:** organization view/selection of eligible plans/add-ons, quotes, trials, renewals, cancellation requests, amendments, contract documents and subscription contacts. Provider plan/subscription authority remains PCC-04.

- **P0:** Define customer-safe subscription projection and allowed commands; map current subscription routes and remove plan-authoring/provider operations.
- **P1:** Deliver current plan/add-ons, terms, renewal, trial, eligibility, projected changes and subscription history.
- **P2:** Implement quote/request change/add-on/renew/cancel with preview, approval and PCC-04 command status.
- **P3:** Add internal org approvals, purchase-order/contract contacts, multi-year terms, scheduled changes, documents and audit.
- **P4:** Add renewal reminders, right-sizing suggestions, CRM/procurement hooks and subscription webhooks.
- **P5:** Prove price/entitlement consistency, proration previews, permission controls, rollback/failure and provider reconciliation.

### OCC-07 Billing & Payments

**Owns:** organization-facing billing profile, payment methods/tokens, invoices/credit notes/receipts, tax certificates, purchase orders, disputes, billing contacts, budgets and payment notifications. Provider ledger remains PCC-06.

- **P0:** Define customer-safe financial projection, PCI/token boundary, allowed payment/dispute commands and retention.
- **P1:** Deliver balances, invoices, credits, payments, receipts, tax/PO and billing-contact views.
- **P2:** Implement payment-method tokenization, pay invoice, download document, submit dispute, update billing/tax/PO details.
- **P3:** Add internal approvals, cost-center allocation, spending controls, multi-entity billing views, evidence and accessibility.
- **P4:** Add AP/accounting integrations, payment reminders, budget forecasts and anomaly notifications.
- **P5:** Prove no card secret storage, ledger reconciliation, idempotent payments, document integrity, permissions and outage behavior.

### OCC-08 Consumption & Quotas

**Owns:** organization consumption dashboards, quota/limit projections, department/project allocation, budgets, threshold alerts, usage export, forecast and quota-increase requests. Meter definitions and hard ceilings remain PCC-08/PCC-05.

- **P0:** Define meter catalog references, aggregation windows, dimensions, freshness, hard/soft limit resolution and billing distinction.
- **P1:** Deliver current/trending usage, quota, allocation, forecast, top consumer and anomaly views with metric definitions.
- **P2:** Implement subquota/budget allocation, alerts, export and provider quota-increase request.
- **P3:** Add delegated budget owners, approvals, showback/chargeback, policy enforcement, reservations and evidence.
- **P4:** Add optimization/forecast recommendations, automation on thresholds and analytics/API export.
- **P5:** Reconcile raw/aggregated/billed usage, load-test meters, prove limit enforcement, late-event correction and tenant isolation.

### OCC-09 Organization Entitlements

**Owns:** organization view of provider grants and allocation of licenses/capacity/features to users/groups/units, reclaim/reserve, assignment rules, expiration and utilization. Entitlement definitions/grants remain PCC-05.

- **P0:** Define grant projection versus allocation write model, license metrics, assignment targets, over-allocation and expiry behavior.
- **P1:** Deliver granted/allocated/available/expiring entitlements, assignments, utilization and conflicts.
- **P2:** Implement allocate/reassign/reclaim/reserve, group-based assignment and request-more flows.
- **P3:** Add approvals, delegated license managers, assignment policies, temporary licenses, audit, compliance and bulk operations.
- **P4:** Add automatic JML allocation/reclaim, utilization optimization and app/access integration.
- **P5:** Prove deterministic allocation, concurrency, overage/grace rules, provider reconciliation, revocation and tenant isolation.

### OCC-10 App & Extension Management

**Owns:** organization marketplace discovery, approval allowlist, purchase request, installation configuration, version pinning, upgrade rings, permissions/consent, suspension and uninstall. Catalog/review/artifacts belong PCC-17/Developer Platform.

- **P0:** Define install/upgrade/uninstall state, consent/permissions, data/export/deletion behavior and boundary with Business App Control.
- **P1:** Deliver available/approved/installed/update/risk/permission/license views from marketplace registry.
- **P2:** Implement request/approve/purchase/install/configure/update/rollback/suspend/uninstall with operation status.
- **P3:** Add app-owner delegation, rings, maintenance, data-processing agreements, evidence, vulnerability/recall response and bulk operations.
- **P4:** Add automated compatibility/security checks, update recommendations, webhooks and usage/adoption analytics.
- **P5:** Prove signed artifacts, consent enforcement, isolated install, rollback/uninstall cleanup, recall and entitlement/billing reconciliation.

### OCC-11 Integration Hub

**Owns:** organization connection instances, tenant credential references, mappings, synchronization jobs, schedules, conflict policy, retries/replay, integration logs, data classification/consent and connection health. Connector definitions/adapters belong PCC-20.

- **P0:** Inventory integrations/sync/webhooks/email/provider settings; define connection/mapping/run/error state, credential custody and connector compatibility.
- **P1:** Deliver connector discovery, connection, mapping, sync run, health, error/dead-letter and data-flow views.
- **P2:** Implement configure/test/activate/pause/rotate/delete connections, mappings, schedules, retry/replay and conflict resolution.
- **P3:** Add approvals, delegated integration owners, classification/residency/DLP policy, private networking, evidence and bulk migration.
- **P4:** Add workflow/event triggers, mapping suggestions, anomaly detection, self-healing policy and observability APIs.
- **P5:** Prove secret isolation, idempotent sync/replay, circuit breaking, schema evolution, outage recovery and tenant isolation.

### OCC-12 Developer & API Access

**Owns:** tenant developers/service principals, OAuth clients, API keys, scopes, webhooks, tenant API products, sandbox access, quotas, logs and credential rotation. Global APIs/gateway/SDKs belong PCC-08/PCC-14 and Identity.

- **P0:** Inventory API-key/OAuth/webhook/sandbox routes; define client/key/webhook lifecycle, scopes, quotas and credential display rules.
- **P1:** Deliver developer/client/key metadata, scopes, webhook, quota, traffic/error and deprecation views.
- **P2:** Implement client/key create-once display, rotate/revoke, scope assignment, webhook subscribe/test/replay and sandbox allocation.
- **P3:** Add approvals, delegated developer admins, mTLS, IP/network policy, service-account review, signed webhooks and evidence.
- **P4:** Add SDK/docs deep links, CI secret federation, anomaly alerts, usage automation and API explorer with safe test data.
- **P5:** Prove scope enforcement, secret non-disclosure, webhook authenticity/idempotency, revocation SLO, rate limits and tenant isolation.

### OCC-13 Organization Security

**Owns:** organization security posture, tenant security policy overrides, asset/session/device posture, vulnerabilities/findings received for the tenant, tenant incident response, DLP/security alerts, exceptions and remediation. Provider SOC/threat intelligence belongs PCC-10.

- **P0:** Define sanitized provider finding projection, tenant assets/policies/exceptions/incidents, severity and remediation authority.
- **P1:** Deliver posture, findings, vulnerable apps/integrations, identity/device/session risk, exceptions and incident views.
- **P2:** Implement assign/remediate/accept exception, revoke session/device, contain tenant resource and manage tenant incidents.
- **P3:** Add security roles/approvals, incident playbooks, DLP rules, risk register, evidence, cyber-insurance/regulatory export and table-top exercises.
- **P4:** Add SIEM/EDR integrations, posture automation, anomaly correlation and safe remediation recommendations.
- **P5:** Prove cross-tenant sanitization, containment/rollback, exception expiry, detection-to-notification, evidence and recovery.

### OCC-14 Audit & Regulatory Controls

**Owns:** tenant audit search/export, organization control applicability/implementation, evidence, audit engagements, risks/issues, attestations, legal holds and regulatory reports. Framework definitions and provider evidence remain PCC-09.

- **P0:** Map audit/GDPR/compliance routes; define provider-framework projection, org control/evidence/audit state and auditor permissions.
- **P1:** Deliver audit activity, control status, evidence freshness, risks/issues, holds and audit engagement views.
- **P2:** Implement evidence request/upload/link, control test, issue/remediation, risk treatment, attestation and legal-hold workflows.
- **P3:** Add independent auditor workspace, e-signature, SoD, multi-framework mapping, retention, scheduled packs and regulator-ready exports.
- **P4:** Add continuous evidence collection, ticket/scanner integration, gap analysis and compliance automation with attestable provenance.
- **P5:** Prove audit immutability/completeness, evidence chain, hold enforcement, privacy-safe export, reproducibility and recovery.

### OCC-15 Data Lifecycle Management

**Owns:** tenant data classification/catalog projection, retention schedules, archive, backup policy/requests, restore requests, export/portability, erasure, legal-hold enforcement, recycle bin, residency choices, data quality stewardship and deletion evidence. Infrastructure backup execution belongs PCC-19.

- **P0:** Inventory retention/GDPR/backup/import/export/recycle/data-quality routes; classify data owners and lifecycle state machines.
- **P1:** Deliver data inventory/classification, retention/residency, backup/restore readiness, holds, erasure/export and quality views.
- **P2:** Implement policy changes, archive/export/erasure/restore requests, recycle recovery and quality issue/steward workflows.
- **P3:** Add approvals, DSAR identity verification, legal holds, disposition review, data-owner delegation, lineage and compliance evidence.
- **P4:** Add storage/DLP/eDiscovery integrations, automated classification/quality/retention and impact estimates.
- **P5:** Prove hold-overrides-deletion, export completeness, restore/RTO, verified erasure, residency and tenant isolation.

### OCC-16 Domain & Communication Services

**Owns:** organization domains/DNS verification, sender identities, email/SMS/voice/push provider selection allowed by provider, communication branding, templates shared across domains, consent/suppression, deliverability and communication health. Delivery execution is shared; notification preferences belong OCC-19.

- **P0:** Inventory domain/email-config/templates/branding-communication routes; define verification, sender, consent and template ownership.
- **P1:** Deliver domain/DNS/TLS/sender, provider, deliverability, consent/suppression and shared-template views.
- **P2:** Implement verify/activate/renew domain, configure/test sender/provider, manage consent/suppression and shared template lifecycle.
- **P3:** Add approvals, delegated communication admins, regional consent policy, accessibility/localization, brand governance and evidence.
- **P4:** Add DNS/provider automation, deliverability anomaly/remediation, template APIs and channel failover.
- **P5:** Prove anti-spoofing, consent enforcement, provider failover, template safety, secret custody and tenant isolation.

### OCC-17 Automation Operations

**Owns:** tenant workflows, rules, approvals, routing, escalations, scheduled tasks, jobs, event triggers, templates, simulation, run history, dead letters, human tasks and automation analytics. Domain services own the final business command.

- **P0:** Inventory workflow/automation/scheduled-task/job routes and workflow-runtime schemas; define definition/version/run/task/error contracts and command delegation.
- **P1:** Deliver automation catalog, versions, dependencies, schedules, runs, tasks, errors/dead letters and performance views.
- **P2:** Implement draft/validate/simulate/publish/pause/execute/cancel/retry, approval/routing/escalation and schedule commands.
- **P3:** Add environment promotion, four-eyes approval, SoD, delegation, bulk operations, retention, evidence and compensation policies.
- **P4:** Add connector/domain events, reusable templates, optimization/failure suggestions and safe natural-language authoring with generated-diff review.
- **P5:** Prove determinism/idempotency, loop/limit safety, compensation, replay, load, version migration and tenant isolation.

### OCC-18 Digital Experience Management

**Owns:** organization branding/themes, navigation/workspace configuration, portal/login experience, localization, accessibility preferences, tenant site configuration, channel policies, content slots and experience rollout across web/mobile/desktop. Component internals belong Design Platform; site authoring stays Tenant Sites/Developer Platform.

- **P0:** Inventory branding/white-label/login/localization/site/client settings; define theme/content/channel schemas and ownership boundaries.
- **P1:** Deliver brand/theme, channel, navigation, site, localization and accessibility configuration with live preview.
- **P2:** Implement draft/preview/approve/publish/rollback themes, navigation, login/portal content, locale and channel configuration.
- **P3:** Add delegated brand admins, multi-brand/unit variants, scheduled campaigns, WCAG validation, legal review and evidence.
- **P4:** Integrate Sites/Developer Platform, experimentation, personalization under consent, asset pipelines and cross-client preview.
- **P5:** Prove token/component compatibility, rollback, localization/a11y, asset performance, channel parity and no custom code escape.

### OCC-19 Notification Center

**Owns:** tenant notification event subscriptions, recipient routing, user/admin preferences, quiet hours, escalation, tenant templates, digest policy, in-app inbox, delivery logs and retry/dead-letter administration. Domains emit events; shared delivery service sends.

- **P0:** Inventory notification/alert/announcement/email-template routes; define event/template/preference/delivery contracts and mandatory-notice rules.
- **P1:** Deliver event catalog, templates, preferences, routing, inbox, delivery health/log and suppression views.
- **P2:** Implement subscribe/route/template/preference/quiet-hour/digest changes, test send, retry/cancel and announcement lifecycle.
- **P3:** Add approvals, delegated communication admins, mandatory/security notice policy, localization/a11y, consent, retention and evidence.
- **P4:** Add multichannel orchestration, escalation rules, preference APIs, deliverability optimization and anomaly signals.
- **P5:** Prove at-least-once delivery with idempotent rendering, preference/mandatory rules, failover, privacy, scale and tenant isolation.

### OCC-20 Support & Service Center

**Owns:** organization self-service support, cases/requests, contracted service catalog/SLA view, case communications/attachments, approval, knowledge access, service health/maintenance view, consented diagnostics, feedback and CSAT. Provider case authority remains PCC-22; incidents remain PCC-01.

- **P0:** Define customer-safe case/service/health projections, commands, attachment classification, diagnostics consent and escalation boundary.
- **P1:** Deliver service catalog/status, knowledge, cases/requests, SLA, communications, maintenance/incidents and entitlement views.
- **P2:** Implement open/update/respond/attach/close/reopen/escalate cases, request services and grant/revoke diagnostic consent.
- **P3:** Add internal approvals, case watchers, priority policy, complaint/privacy flows, audit/eDiscovery and accessibility/localization.
- **P4:** Add omnichannel intake, contextual help, safe triage/knowledge suggestions, status subscriptions and support analytics.
- **P5:** Prove tenant-safe projections, attachment scanning, consent expiry, SLA behavior, communication delivery and full support journey.

### OCC-21 AI Governance & Agent Operations

**Owns:** tenant model allowlist within PCC policy, AI use cases, agents/copilots, prompt/tool policies, tenant knowledge sources, grounding/access, AI budgets/quotas, evaluation, human oversight, AI audit and tenant AI incidents. Provider/model onboarding and global floors belong PCC-21.

- **P0:** Define tenant AI resources, data/access boundaries, policy inheritance, risk classes, knowledge ingestion and budget/evaluation contracts.
- **P1:** Deliver allowed models, agents/use cases, knowledge sources, tools, policies, evaluations, usage/cost and audit views.
- **P2:** Implement create/test/approve/publish/suspend agents, attach knowledge/tools, configure allowlists/budgets/guardrails and run evaluations.
- **P3:** Add AI impact assessment, human approval, sensitive-data controls, delegated AI stewards, model/prompt cards, incident/evidence and retention.
- **P4:** Add continuous evaluation, RAG quality, cost/safety/drift signals, routing and automation with explainable human override.
- **P5:** Prove tenant/user authorization in retrieval/tools, injection/exfiltration defenses, budget enforcement, fallback, audit and deletion.

### OCC-22 Organization Intelligence & Insights

**Owns:** tenant semantic metrics, dashboards, reports, scheduled reports, cross-application organization analytics, operational/adoption/security/usage insights, forecasts and governed exports. Source transactions stay in their domains; provider aggregates stay PCC-16.

- **P0:** Inventory tenant analytics/reporting/scheduled-report routes; define metric catalog, source lineage, tenant row security, freshness and certification.
- **P1:** Deliver organization, workforce, app adoption, security, consumption, automation, integration and support scorecards with definitions.
- **P2:** Implement dashboard/report/metric views, drill-through, filters, sharing, scheduling and safe export.
- **P3:** Add row/column security, delegated analysts, certified datasets, privacy controls, metric/version governance and audit.
- **P4:** Add forecasts, anomaly/root-cause insights, natural-language query against the semantic layer and action links with provenance.
- **P5:** Reconcile metrics to sources, prove tenant isolation/privacy, query performance, freshness, reproducibility and failover.

## 8. Delivery waves and dependency graph

P0 work can run concurrently within a wave after its prerequisite gate. P1-P5 remain application-local and sequential unless a dependency explicitly allows a read-only slice.

| Wave | Goal | Applications | Entry gate | Exit gate |
| --- | --- | --- | --- | --- |
| W0 | Architecture and control foundations | shared services in §3.2; all app P0 inventories | plan accepted | canonical IDs/names, ownership, permissions, resource/event catalog, route retirement map and contract test harness exist |
| W1 | Trust, tenancy and runtime | PCC-01, 02, 03, 07, 13, 18, 19; OCC-01, 02, 03, 04, 13 | W0 | provider/tenant boundary, Identity contracts, tenant context, operations, config and infrastructure read/command paths are trustworthy |
| W2 | Commercial and application lifecycle | PCC-04, 05, 06, 17; OCC-05, 06, 07, 08, 09, 10 | W1 tenant/identity + operation manager | subscription-entitlement-metering-billing-marketplace reconciliation passes end to end |
| W3 | API, integration, governance and automation | PCC-08, 09, 10, 20, 21; OCC-11, 12, 14, 15, 16, 17, 21 | W1 security/config; W2 entitlements where applicable | credential custody, events, integration runtime, compliance, data lifecycle, workflow and AI controls pass |
| W4 | Edge experience, adoption and support | PCC-11, 12, 14, 15, 22; OCC-18, 19, 20 | W1 runtime + W3 delivery/integration | mobile/desktop/developer/knowledge/experience/notification/support journeys pass |
| W5 | Intelligence and GA | PCC-16, OCC-22, then every app P5 | source domain P2/P3 and governed event/projection pipelines | reconciled semantic layers plus all universal GA gates, migration and retirement complete |

### 8.1 Cross-app critical paths

1. **Customer creation:** PCC-18 organization -> Identity tenant realm -> PCC-04 subscription -> PCC-05 entitlement -> PCC-19 placement/provision -> OCC-01 onboarding -> audit/notification/operation completion.
2. **Employee onboarding:** OCC-02 member -> Identity principal -> OCC-03 access -> OCC-09 license allocation -> OCC-05 application visibility -> notification -> audit.
3. **Plan change:** OCC-06 request -> PCC-04 amendment -> PCC-06 billing/proration -> PCC-05 grant change -> OCC-09 allocation/reconciliation -> usage/quota update.
4. **Marketplace install:** OCC-10 request -> PCC-17 policy/artifact -> PCC-05 entitlement -> sandbox/security checks -> install operation -> OCC-05 activation -> audit/billing.
5. **Integration activation:** OCC-11 connection -> PCC-20 connector/version -> PCC-07 credential custody -> OCC-14/15 policy checks -> runtime health -> alerts/audit.
6. **Security incident:** PCC-10 detection -> PCC-02 posture/control -> OCC-13 sanitized finding -> PCC-01 incident if platform-wide -> PCC/OCC support communication -> evidence/postmortem.
7. **AI agent publication:** OCC-21 agent -> PCC-21 model/floor evaluation -> OCC-03 data/tool authorization -> OCC-08 budget -> continuous evaluation/audit -> emergency disable.
8. **Support case:** OCC-20 case -> PCC-22 queue/SLA -> time-bound PCC-03 support delegation -> consented diagnostics -> PCC-01 incident/problem link -> response/closure/CSAT.

### 8.2 Direct dependency and implementation index

Only direct dependencies are listed; shared services in §3.2 apply to every app. Paths are starting inspection points, not permission to bypass the owner or edit the whole repository.

| App | Direct upstream capabilities | Primary implementation touchpoints |
| --- | --- | --- |
| PCC-01 | Identity, tenant context, operation manager, runtime platform | `provider-admin-os/app/(control-plane)/ops`, `api` DevOps/operation modules, `data/operation-pipeline` and `runbooks`, `infra` |
| PCC-02 | PCC-01, PCC-07, PCC-09, PCC-10, Identity | PCC security routes, API policy/security facades, `data/policy-engine`, Identity guards |
| PCC-03 | Identity, PCC-18 | PCC access routes, `idp`, `auth`, API admin facade, policy models |
| PCC-04 | PCC-18, PCC-05, PCC-06 | PCC billing/subscription routes, API SaaS/subscription modules, SaaS schemas |
| PCC-05 | PCC-04, PCC-08, PCC-17 | entitlement/licensing APIs and schemas, application manifests, policy evaluator |
| PCC-06 | PCC-04, PCC-05, PCC-08, PCC-17 | PCC billing routes, billing/subscription APIs, finance/marketplace-payout schemas, payment/tax adapters |
| PCC-07 | Identity, PCC-01, cloud KMS/HSM | PCC secrets route, credential registry/broker, `infra`, connector and Identity signing-key integrations |
| PCC-08 | Identity, PCC-05, PCC-07 | PCC developer/API views, API gateway/admin modules, contracts/SDK, metering service |
| PCC-09 | PCC-02, PCC-07, audit service | PCC compliance/privacy routes, `data/compliance`, audit/evidence APIs |
| PCC-10 | PCC-01, PCC-02, PCC-07, PCC-09 | PCC threat/audit routes, telemetry/detection/case services, security integrations |
| PCC-11 | PCC-01, PCC-07, PCC-08, PCC-13 | `unierp-mobile`, mobile operations APIs, CI/signing/store adapters |
| PCC-12 | PCC-01, PCC-07, PCC-08, PCC-13 | `desktop-app`, desktop operations APIs, packaging/signing/update infrastructure |
| PCC-13 | PCC-01, PCC-07 | PCC settings routes, `config`, configuration APIs/schemas, feature rollout service |
| PCC-14 | PCC-03, PCC-07, PCC-08, PCC-13 | PCC developers routes, `developer-platform`, `sdk`, `extension-api`, `sandbox` |
| PCC-15 | PCC-13, PCC-14, PCC-22 | PCC knowledge/adoption surfaces, documentation/learning/search/content services |
| PCC-16 | governed event/projection pipeline and every source domain | PCC analytics/overview routes, API analytics/reporting/search, semantic projections |
| PCC-17 | PCC-05, PCC-06, PCC-07, PCC-14 | PCC marketplace routes, `marketplace`, API marketplace/extension-registry, `extensions` |
| PCC-18 | Identity, PCC-01, PCC-04, PCC-19 | PCC tenant routes, API SaaS/admin, `data/provider-registry`, provisioning orchestration |
| PCC-19 | PCC-01, PCC-07, PCC-13 | PCC infrastructure routes, `infra`, resource/reconciler/runbook schemas and controllers |
| PCC-20 | PCC-07, PCC-08, PCC-13 | PCC integration routes, credential provider registries, connector adapters/runtime health |
| PCC-21 | PCC-02, PCC-07, PCC-08, PCC-13 | PCC AI routes, AI APIs, `data/ai-governance`, provider/model adapters |
| PCC-22 | PCC-03, PCC-15, PCC-18 and PCC-01 incident links | PCC support routes, service-management/communication APIs, support data models |
| OCC-01 | PCC-18 organization identity | OCC profile/structure routes, API org-structure, `data/org-structure` |
| OCC-02 | OCC-01, Identity, OCC-09 | OCC user/group routes, people/admin APIs, Identity provisioning facade |
| OCC-03 | OCC-01, OCC-02, Identity | OCC roles/access-control routes, policy APIs/models, Identity authorization |
| OCC-04 | Identity, OCC-03, PCC-02 floors | OCC SSO/MFA/session/domain routes, `idp` tenant policy APIs |
| OCC-05 | PCC-05, OCC-03, OCC-09, Tenant Apps | OCC application-control shell, app/module manifests, entitlement projections |
| OCC-06 | PCC-04, OCC-03 | OCC subscriptions routes, customer-safe subscription API facade |
| OCC-07 | PCC-06, OCC-03 | OCC billing routes, customer-safe billing API facade, payment tokenization |
| OCC-08 | PCC-08 meter catalog, PCC-05 limits, OCC-03 | OCC usage routes, metering/quota API projections and allocation models |
| OCC-09 | PCC-05, OCC-02, OCC-03 | OCC entitlement allocation surfaces and allocation service/models |
| OCC-10 | PCC-17, PCC-05, OCC-03, OCC-05 | OCC/marketplace installed-app views, install orchestration and consent records |
| OCC-11 | PCC-20, PCC-07, OCC-03, OCC-15 | OCC integration/sync routes, connector runtime, mapping/run/dead-letter models |
| OCC-12 | PCC-08, PCC-14, Identity, OCC-03 | OCC API-key/API-platform/webhook routes, API admin facade and SDK links |
| OCC-13 | PCC-10 findings, OCC-03, OCC-04 | OCC security/alert/session views, tenant incident/posture services |
| OCC-14 | PCC-09 frameworks, audit service, OCC-03 | OCC audit/compliance routes, compliance/evidence models and APIs |
| OCC-15 | PCC-19 execution, OCC-14 holds, OCC-03 | OCC GDPR/retention/backup/export/recycle/quality routes and lifecycle services |
| OCC-16 | PCC-20 channel adapters, PCC-07, OCC-03 | OCC domain/email/template routes, communication APIs and provider registry |
| OCC-17 | OCC-03, OCC-11, domain command APIs | OCC workflow/automation/job routes, API workflow, `data/workflow-runtime` |
| OCC-18 | PCC-11/12 channel constraints, OCC-03, Design Platform, Tenant Sites | OCC branding/localization/white-label routes, `design-system`, sites/client config |
| OCC-19 | OCC-03, OCC-16, notification delivery service | OCC alerts/announcements/notification routes, notification/communication APIs |
| OCC-20 | PCC-22, PCC-15 and PCC-01 status projection | OCC support/feedback/health routes, customer case/knowledge/status APIs |
| OCC-21 | PCC-21, OCC-03, OCC-08, OCC-15 | OCC AI governance/agent UI, AI control APIs/schema, knowledge/tool authorization |
| OCC-22 | governed tenant projections and every OCC source domain | OCC tenant analytics/scheduled reports, API analytics/reporting and semantic layer |

## 9. Repository implementation map

| Repository | Role in this plan | Must not become |
| --- | --- | --- |
| `provider-admin-os` | PCC shell, BFF routes, manifests, pages, provider-session UX and PCC E2E tests | business authority, direct cloud/DB client, tenant admin shell |
| `tenant-admin` | OCC shell, BFF routes, manifests, pages, tenant-session UX and OCC E2E tests | provider super-admin, Identity implementation, ERP app |
| `api` | Initial modular domain/control services, commands/queries, policies, jobs, integrations and projections | one unbounded module with cross-domain table writes |
| `idp` | principal/session/token/federation/credential authority and protocol tests | organization profile or subscription database |
| `auth` | reusable auth client/guards/session types | a second Identity service or business permission catalog |
| `data` | bounded Prisma schemas/migrations/RLS/outbox/reconciliation | generic duplicate models in `core-part-*` when a named schema owns the context |
| `unierp-contracts` | canonical API/event/entity/error contracts and compatibility fixtures | implementation logic or client-specific view state |
| `kernel` | tenancy, policy, audit/outbox/idempotency/rate/observability primitives | domain-specific PCC/OCC service |
| `service-kit` | out-of-process service contract and tenant-context conventions | business SDK |
| `shared` | truly context-free types/validators/constants/utilities | dumping ground for domain DTOs or permission decisions |
| `framework` | schema-driven resource/application UI mechanisms | hard-coded PCC/OCC business rules |
| `design-system`, `storybook` | accessible components, tokens, patterns, visual/a11y evidence | product-specific workflows or copied components in shells |
| `infra`, `config` | runtime controllers, IaC, configuration mechanisms, SLO/alerts/runbooks | browser-facing authority or plaintext credential store |
| `developer-platform`, `sdk`, `extension-api`, `sandbox` | developer authoring, SDK/API contracts and isolated execution | marketplace commercial ledger or tenant administration copy |
| `marketplace`, `extensions` | buyer experience, registry client, extension bundles | local catalog source of truth or unsigned code path |
| `tenant-apps` | ERP/business workflows and transactions | OCC settings implementation or provider controls |
| `unierp-mobile`, `desktop-app` | mobile/desktop clients consuming the same contracts | separate business/domain APIs or authorization logic |
| `tenant-sites`, `tenant-site-template`, `web-studio` | tenant site runtime/template and migration evidence into Developer Platform | parallel configuration/marketplace authority |
| `blockchain` | optional append-only evidence/notarization adapter where justified | primary audit/compliance database or mandatory synchronous dependency |
| `marketing-site` | public claims and acquisition experience linked to verified capabilities | admin control plane |
| `create-unierp` | developer bootstrap/scaffolding CLI; eventually consume release manifests and supported local profiles | product authority, production provisioner or package named `test` |
| `unierp-platform` | normative documentation authority and evidence | phase tracker or implementation source |
| `unierp-workspace` | programme scripts/load tests/local orchestration where retained | second product-requirement authority |

`unierp-api` and `unierp-infra` are currently empty directory stubs and receive no ownership. `archives/` contains historical vertical snapshots, `UniERP_scratch/` is scratch material, and `release-artifacts/` contains generated packages; none is an authoritative implementation source. If any becomes active, first give it an explicit catalog role, repository metadata, owner and dependency boundary rather than copying live code into it.

### 9.1 Initial service boundaries inside `api`

Keep a modular monolith first, with enforceable module boundaries and separate schemas/outbox topics. Extract only when scale, isolation, availability or team cadence warrants it:

- Tenant Registry and Provisioning: PCC-18.
- Catalog/Subscription: PCC-04; Entitlement/License: PCC-05; Metering/Quota: PCC-08/OCC-08; Billing/Revenue: PCC-06.
- Identity Administration facade: PCC-03/OCC-02/03/04 delegating to `idp`.
- Operations/Resource/Configuration: PCC-01/13/19.
- Secrets broker: PCC-07 delegating to KMS/HSM.
- API Gateway administration: PCC-08/OCC-12.
- Compliance/Audit/Security: PCC-02/09/10 and OCC-13/14/15.
- Marketplace/Extension Registry: PCC-17/OCC-10.
- Connector Runtime: PCC-20/OCC-11.
- Workflow Runtime: OCC-17.
- Notification/Communication: OCC-16/19 plus provider adapters.
- AI Control Plane: PCC-21/OCC-21.
- Support/Service: PCC-22/OCC-20.
- Analytics Projection/Semantic: PCC-16/OCC-22.

No module may directly update another module's tables. Use its command API in-process behind an interface or publish/consume a versioned event; preserve the same boundary if later extracted.

## 10. Information architecture and shell rules

### 10.1 PCC navigation groups

Use app manifests as the only navigation registry. Group apps without changing ownership:

- **Operate:** PCC-01, PCC-18, PCC-19, PCC-20.
- **Secure & govern:** PCC-02, PCC-03, PCC-07, PCC-09, PCC-10, PCC-21.
- **Commercial:** PCC-04, PCC-05, PCC-06, PCC-17.
- **Build & deliver:** PCC-08, PCC-11, PCC-12, PCC-14.
- **Adopt & support:** PCC-15, PCC-22.
- **Configure & understand:** PCC-13, PCC-16.

### 10.2 OCC navigation groups

- **Organization & people:** OCC-01, OCC-02, OCC-03, OCC-04.
- **Apps & commercial:** OCC-05, OCC-06, OCC-07, OCC-08, OCC-09, OCC-10.
- **Build & automate:** OCC-11, OCC-12, OCC-17, OCC-21.
- **Secure & govern:** OCC-13, OCC-14, OCC-15.
- **Experience & service:** OCC-16, OCC-18, OCC-19, OCC-20.
- **Understand:** OCC-22.

Every app manifest declares ID, owner, route base, resource kinds, permission namespace, entitlements, dependencies, help topic, telemetry namespace, lifecycle hooks and mobile/desktop availability. Breadcrumbs, search, favorites, recent items, task inbox and command palette derive from manifests; applications do not maintain their own competing registries.

### 10.3 Existing-route migration map

This is the starting migration map, not permission to keep duplicate pages. A route moves to the named owner, becomes a read-only deep link to that owner, or is retired after traffic and test evidence show no remaining caller.

| Current PCC group/route | Target owner(s) | Migration rule |
| --- | --- | --- |
| `/overview/*` | PCC-01 for health/operations/security status; PCC-16 for business/usage analytics | Keep one role-aware PCC home composed from owner projections; retire duplicate analytics pages. |
| `/tenants/*` | PCC-18; summaries link to PCC-03/04/05/08/09/10/13/20/22 | Tenant directory/lifecycle stays PCC-18; users, subscriptions, quotas, security, config, integrations and support are projections/deep links, not duplicate editors. |
| `/access/*` | PCC-03; authentication/session implementation in Identity | Replace local identity mutations with Identity commands and effective-access projections. |
| `/billing/*` | PCC-04 subscriptions, PCC-05 entitlements, PCC-06 billing/revenue, PCC-08 usage definition | Split by resource authority; do not preserve a generic Billing service/table. |
| `/marketplace/*` | PCC-17 | Catalog registry becomes sole truth; remove UI-local catalogs. |
| `/developers/*` | PCC-14; gateway links to PCC-08; marketplace links to PCC-17 | Keep ecosystem governance here, not tenant clients/keys. |
| `/integrations/*` | PCC-20; credentials reference PCC-07 | Provider connectors/accounts only; tenant connection instances move to OCC-11. |
| `/ops/*` | PCC-01 | Jobs, queues, releases, incidents, maintenance and runbooks use durable operation resources. |
| `/infrastructure/*` | PCC-19 | Browser commands only through infrastructure control APIs; no cloud SDK/credential in the shell. |
| `/security/*` | PCC-02 posture/policy; PCC-07 secrets; PCC-09 compliance/privacy; PCC-10 threats/audit investigation | Split navigation while retaining canonical source links; do not clone findings/evidence. |
| `/support/*` | PCC-22 cases/SLA/communications; PCC-15 knowledge; PCC-01 incidents | Case, knowledge and incident are separate linked resources. |
| `/analytics/*` | PCC-16 | All metrics resolve to the semantic catalog and source lineage. |
| `/ai/*` | PCC-21 | Provider/model/guardrail/evaluation/cost control only; tenant agents belong OCC-21. |
| `/settings/*` | PCC-13 plus owning domain app | PCC-13 owns schema/inheritance/rollout; domain-specific values are edited in their owner. |
| `/profile` | Identity/PCC shell utility | Operator self-profile is a shell utility, not a 23rd application. |

| Current OCC route family | Target owner(s) | Migration rule |
| --- | --- | --- |
| `/users`, `/settings/users`, `/settings/groups` | OCC-02 | Consolidate duplicate workforce entry points and delegate credential changes to Identity. |
| `/roles`, `/settings/access-control/*`, `/settings/identity-access` | OCC-03 | One role/access-review/SoD authority and one effective-access view. |
| `/settings/sso*`, `/mfa`, `/password-policy`, `/sessions`, `/ip-restrictions`, `/login-history` | OCC-04 | Consume Identity contracts; consolidate `sso` and `sso-saas`. |
| `/subscriptions/*`, `/settings/subscription` | OCC-06; provider commands go to PCC-04 | Remove plan authoring/migration authority not granted to the organization. |
| `/billing`, `/settings/billing` | OCC-07 | One customer-facing projection; provider ledger mutations remain PCC-06. |
| `/usage` | OCC-08 | Use metering projections and link to entitlement allocation in OCC-09. |
| `/settings/api-keys`, `/api-platform/*`, `/webhooks*` | OCC-12 | One credential/client/webhook lifecycle; connection webhooks owned by OCC-11 reference it. |
| `/settings/integrations`, `/sync` | OCC-11 | Consolidate connection, mapping, run and health operations. |
| `/settings/audit-trail*`, `/compliance` | OCC-14 | Consolidate duplicate audit pages; audit events stay immutable. |
| `/settings/gdpr/*`, `/data-retention`, `/backups`, `/recycle-bin`, `/import-export`, `/data-quality` | OCC-15 | Separate policy/request UI from PCC-19 physical backup execution. |
| `/settings/domains`, `/email-config`, `/email-templates`, `/branding-communication` | OCC-16 | Domain/sender/shared-template authority; preferences and delivery logs move to OCC-19. |
| `/settings/workflows/*`, `/workflow-builder`, `/automation-rules`, `/scheduled-tasks`, `/jobs`, `/approval-operations` | OCC-17 | One versioned workflow/automation runtime and task inbox. |
| `/settings/branding*`, `/white-label`, `/login-customizer`, `/localization` | OCC-18 | One token/schema-based experience editor with cross-client preview. |
| `/settings/notifications`, `/alerts`, `/announcements` | OCC-19 | One event/preference/routing/template model; shared delivery remains a platform service. |
| `/settings/support`, `/feedback`, `/system-health`, `/maintenance`, `/updates` | OCC-20 | Customer-safe support/status surface only; no runtime control commands. |
| `/settings/tenant-analytics`, `/scheduled-reports` | OCC-22 | Move to the tenant semantic layer; reports reference certified metrics. |
| `/settings/feature-flags`, `/environments`, `/devops`, `/system-operations` | OCC-05/OCC-17/OCC-18 as tenant-safe configuration; PCC-01/13 retain provider controls | Review each action. Retire any provider runtime/config command rather than merely renaming it. |
| `/settings/super-admin/*` and `src/modules/super-admin.ts` | PCC-18/03/04/05/08 | Migrate provider resources and tests, deny tenant access, remove navigation/routes/module/permissions from OCC, and retain redirects only for authorized provider sessions during a bounded migration. |

## 11. Agent execution protocol

This section makes any `<APP-ID>-P<n>` independently executable without prior conversation.

### 11.1 Selecting a work package

1. Select exactly one phase ID, for example `OCC-11-P2`.
2. Read this file completely, then the application's normative `PRD.md`, `REQUIREMENTS.md`, `ARCHITECTURE.md`, `CONTRACTS.md`, `SECURITY.md`, `EXPERIENCE.md`, `OPERATIONS.md`, and `TRACEABILITY.md` under `unierp-platform/docs/platforms/`.
3. Read ADR-0001 through ADR-0007 and the standards for security, API compatibility, data lifecycle, quality/testing, reliability, accessibility and documentation governance.
4. Inspect the live routes, API modules, models, contracts, tests and git status named by the application and §9. Do not assume the 2026-08-24 baseline is still current.
5. Search for the resource/DTO/permission/event before creating it. If an owner already exists, extend the owner or consume its contract; do not clone it.
6. Write a short phase brief in the implementation PR/commit description using §11.2. Do not add progress state to normative product docs.

### 11.2 Required phase brief

```text
Phase: <APP-ID>-P<n>
Outcome: <one testable result from the app plan>
Owning application/service: <single owner>
Repositories and exact path scopes: <list>
Existing artifacts reused: <contracts/models/services/components>
Artifacts retired/migrated: <routes/models/fixtures or none>
Dependencies and verified versions: <list>
Requirements/contracts changed first: <IDs and files>
Security/tenant boundary: <provider or tenant scope; permissions; step-up/approval>
Data migration/reconciliation: <plan or not applicable with reason>
Tests to add: <unit/contract/integration/security/E2E/performance/a11y/recovery>
Telemetry/runbook: <signals and owner>
Rollback: <feature flag, schema/API compatibility and data rollback>
Exit evidence: <commands plus behavioral assertions>
```

### 11.3 Implementation order inside a phase

1. Update owning normative requirement/architecture/contracts/security/experience/operations/traceability rows, leaving status as GAP/UNVERIFIED until evidence exists.
2. Add or version canonical schemas/events/errors in `unierp-contracts`; add compatibility/CDC fixtures.
3. Add bounded schema/migration/RLS/indexes/outbox and migration/reconciliation tests in `data`.
4. Implement server commands/queries/policies/jobs/adapters with audit, telemetry and failure tests.
5. Regenerate/use SDK clients; never hand-copy DTOs into PCC/OCC/mobile/desktop.
6. Implement design-system pattern once if reusable, then app UI/BFF states and journeys.
7. Add integration/E2E/security/a11y/performance/recovery evidence and operational assets.
8. Inspect evidence, update traceability truthfully, remove superseded fixtures/routes only after traffic/data migration is proven.

### 11.4 Stop conditions

Stop and mark the phase blocked in the handoff—not complete—if:

- the canonical owner cannot be determined from this plan and normative docs;
- a required permission/contract conflicts with another application;
- another in-progress change touches the same model/migration/contract or dirty user changes cannot be safely preserved;
- a provider action would have to remain in OCC or a tenant action would require provider credentials;
- secrets, cross-tenant data, financial imbalance, irreversible deletion, or unavailable rollback would be accepted merely to make the UI work;
- the only evidence is a page, mock, fixture, snapshot, typecheck, or test that cannot fail behaviorally.

### 11.5 Required handoff

```text
Phase: <APP-ID>-P<n>
Result: COMPLETE | BLOCKED
Changed repositories/paths: <list>
Requirement and contract IDs: <list>
Migrations/backfills: <list and status>
Behavioral evidence: <commands, tests, dashboards, screenshots as applicable>
Security/isolation evidence: <negative cases>
Compatibility/rollback evidence: <result>
Known gaps: <explicit list; empty only if verified>
Next eligible phase: <APP-ID>-P<n+1> or dependency>
```

## 12. Program-level acceptance and release criteria

PCC/OCC v1 is releasable only when all of the following are evidenced:

- All 44 application manifests resolve to one owner and all exposed actions resolve to a versioned backend contract and server permission.
- `tenant-admin` contains no provider/super-admin route, module, credential or permission; automated tests deny tenant principals every provider endpoint.
- Provider support delegation is explicit, time-bound, consent/policy controlled, fully audited and cannot reveal an unrelated organization.
- Customer onboarding, employee onboarding, plan change, marketplace install, integration activation, security incident, AI agent publication and support journeys in §8.1 pass end to end.
- Subscription, entitlement, license allocation, usage, quota, invoice/payment and marketplace payout reconcile with no orphan or contradictory state.
- Every state-changing API is idempotent where retryable, concurrency-safe, auditable and observable; long-running work has durable operation status and compensation/recovery.
- RLS/tenant-isolation and provider-boundary tests run in CI against representative schemas and endpoints.
- Secrets are write-only after creation and absent from source, browser storage, logs, traces, analytics, exports and events.
- API/event compatibility, deprecation windows and generated clients pass across web, mobile, desktop, developer and extension consumers.
- Critical journeys meet WCAG 2.2 AA, localization, timezone/currency/number/date requirements and supported-browser/device/OS matrices.
- SLOs, dashboards, actionable alerts, runbooks, on-call ownership, backup/restore and declared RTO/RPO exercises exist for every authoritative service.
- No application relies on mock/local catalog data in production; read projections publish source, freshness and degraded/unknown state.
- Normative traceability contains behavioral evidence and no unsupported IMPLEMENTED claims; legacy routes/models/fixtures are retired only after reconciliation.

## 13. First executable backlog

Start in this order; each item is a bounded initial phase using the protocol above:

1. **W0-01 Ownership registry:** create canonical resource, permission, event and route-owner inventories for all 44 apps; flag duplicates and provider-in-OCC violations.
2. **W0-02 Contract harness:** establish schema compatibility, generated-client drift and consumer-driven contract gates across `unierp-contracts`, `api`, `idp`, PCC and OCC.
3. **W0-03 Shell manifest schema:** extend the existing PCC manifest approach into a shared manifest contract and adopt it in OCC without sharing business ownership.
4. **PCC-18-P0:** inventory tenant/provider registry and design the provider tenant lifecycle plus OCC super-admin migration.
5. **PCC-03-P0 + OCC-03-P0 + OCC-04-P0:** establish the provider/tenant identity, authorization and authentication matrix against `idp`.
6. **PCC-01-P0 + PCC-19-P0:** separate operational orchestration from infrastructure authority and define durable operation contracts.
7. **PCC-13-P0:** inventory all configuration/feature flags/credentials and assign typed owners/scopes.
8. **PCC-04-P0 + PCC-05-P0 + PCC-06-P0 + OCC-06-P0 + OCC-07-P0 + OCC-08-P0 + OCC-09-P0:** settle commercial terminology, ledgers and reconciliation before expanding billing UI.
9. **PCC-20-P0 + OCC-11-P0:** define connector-definition versus connection-instance authority and credential custody.
10. **PCC-21-P0 + OCC-21-P0:** define provider versus organization AI governance and retrieval/tool authorization before shipping agents.

Do not begin by creating the remaining menu pages. The first measurable result is authoritative contracts and verified vertical slices behind the routes that already exist.
