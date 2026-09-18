# Part IV — Provider Control Center

Document PMS-VOL-004 · Version 0.1.0 · 2026-09-14 · DRAFT. Product PMS-PRD-PCC; experience owner PLT-PAO. This volume specifies provider administration, not customer business transactions. Canonical application ownership is incorporated from [the PCC mapping](PCC-APPLICATION-CATALOG.md) and its source contract. New detailed behavior is PROPOSED unless it restates accepted platform requirements.

## 4.1 Authority, scope and corrected portfolio

[PAO requirements](../../unierp-platform/docs/platforms/platform-admin-os/REQUIREMENTS.md) require 22 distinct PCC applications with stable IDs, routes, permission namespaces, resource owners, events, help and telemetry/channel metadata. The original seven PMS groupings were not canonical applications. They remain as historical IDs; PMS-APP-PCC-008–029 now map to PCC-01–22. This correction does not rename a product, repository or runtime contract. The 59 initial PCC module IDs retain their meaning and are mapped to canonical parents.

The [runtime manifest](../../provider-admin-os/src/manifests/pcc-apps.json) contains legacy-migration paths and availability declarations. For example, canonical `/subscription-operations` is represented by a legacy `/billing/subscriptions` entry in the inspected manifest. Such declarations are not proof of route, API, permission or persistence behavior. Implementation must reconcile migration paths using the owning manifest rather than add a parallel navigation list. Shared [manifest schema](../../unierp-contracts/src/control-center-manifest.ts) is authoritative for metadata fields.

PCC users include provider operators, incident commanders, SREs, security staff, identity administrators, billing staff, compliance reviewers, release engineers, ecosystem reviewers, adoption staff and support agents. Organization administrators never gain PCC access from an OCC role or tenant wildcard. Every protected operation authenticates provider identity and authorizes application, action, target, environment and required assurance.

## 4.2 Common provider workbench and action contract

### 4.2.1 Screen composition

Use Strata Workbench and owned `@kannan19302/ui` components. The shell displays Provider Control Center, active provider principal, environment, region/cell filter, target context and assurance/session expiry where relevant. The application entry shows purpose, actual availability, applicable help topic and current telemetry freshness. Search results respect provider permissions and target scope before returning names/counts.

List views expose stable filtering/sorting, bounded cursor pagination, selection scope and export policy. Record views show authoritative revision, related operation/audit/history, dependencies and actual state. Bulk operations display the exact selected target set and selection snapshot; “all results” is not silently expanded after approval. Progress separates queued, running, waiting, partially completed, failed and succeeded effects. Unknown or stale telemetry is displayed as unknown/stale, never healthy or zero.

Required UI states: initial loading, empty first use, filtered empty, forbidden, missing resource, dependency unavailable, stale telemetry, stale version/conflict, queued operation, cancellation requested, partial completion, terminal failure and verified result. Errors preserve safe input and operation identity. A missing backend capability produces unavailable/planned state, not an enabled fake control.

### 4.2.2 Privileged command sequence

1. Authoritative service resolves target by ID and verifies provider permission, environment and record scope.
2. Client requests a preview where impact is material. The preview contains target IDs/versions, intended changes, expected interruptions, dependencies, cost/data impact, recovery path and validity period.
3. Operator supplies reason and required approval reference. High-risk actions require recent step-up and independent approval under the owning policy.
4. Approval binds to command type, exact target set, input hash, environment, source versions, expiry and approver identity. It is not reusable for a different amount, region, tenant or plan.
5. Execute re-evaluates authority and prerequisites. Changed plan/target/policy or expired approval invalidates the preview; the service returns conflict/reapproval-required.
6. Commit operation, required audit intent and outbox atomically. Return `202` with operation ID for asynchronous work, not success for final effect.
7. Worker claims a lease with fencing and revalidates delegated/system execution policy before protected effects. Each remote step has idempotent identity or a reconcile-before-retry strategy.
8. Record actual result, reconciliation evidence and residual restrictions. Required audit failure blocks privileged acceptance or retains a failed/recoverable operation; it cannot silently become best effort.

Preview is not permission and approval is not proof of execution. Typed confirmation alone is insufficient for dual control. Provider UI cannot issue direct database/cloud/secret-manager commands from the browser.

### 4.2.3 Common operation record

Logical entity PMS-ENT-PCC-000101, ProviderOperation: opaque ID, canonical application ID, operation type, target type/IDs/version snapshot, actor/effective actor/service principal, purpose, request and input hashes, idempotency identity, policy/approval references, created/started/finished time, state, step plan, current step, lease/fence, heartbeat, attempts, result references, safe error/correlation, reconciliation state and cancellation intent. Sensitive parameters remain encrypted or referenced, never included in status/log payloads.

State machine: requested → validated → awaiting approval → queued → running → waiting/reconciling → succeeded/failed/partially completed. Cancellation has requested/cancelling/cancelled outcomes; completed irreversible effects remain in the record with required compensation. A timed-out observation does not mean the remote operation stopped.

Proposed control APIs PMS-API-PCC-000101–000104: create scoped preview, submit command with preview/input hash and idempotency, read scoped operation, request cancellation with expected version. Routes are reconciled with existing provider contract catalog before publication; this common interface does not replace specific domain commands. Canonical error classes: unauthenticated, forbidden, validation, stale version, approval required/expired, rate/resource limited, dependency unavailable, operation failed and internal error, all with safe correlation identifiers.

## 4.3 Permission and role design

Application access permission is the canonical namespace plus `.access`; action permissions append canonical resource and action names as the catalog requires. The following is an authorization design, not a new global wildcard. Concrete permission strings must be registered at the owning contract. Granting application access alone never authorizes mutations.

| Role ID | Persona | Scope and allowed work | Excluded authority |
| --- | --- | --- | --- |
| PMS-ROL-PCC-000101 | Estate observer | Read authorized health/operations/placement metadata | Business records, secret values, mutations |
| PMS-ROL-PCC-000102 | Lifecycle operator | Preview/request/reconcile approved tenant lifecycle targets | Self-approve purge, implicit tenant business access |
| PMS-ROL-PCC-000103 | Independent lifecycle approver | Review exact impact and approve bounded high-risk commands | Execute a materially changed plan using prior approval |
| PMS-ROL-PCC-000104 | Incident commander | Assign incident, approve scoped containment/runbook under policy | Arbitrary shell or permanent privilege |
| PMS-ROL-PCC-000105 | Identity administrator | Provider membership/roles/access review via IAM | Tenant user impersonation without explicit delegation |
| PMS-ROL-PCC-000106 | Commercial operator | Offer/subscription/billing workflows within authority and amount thresholds | Editing finalized ledger effects or approving own exceptional refund |
| PMS-ROL-PCC-000107 | Security analyst | Detection/case evidence and proposed containment | Unbounded production mutation or raw tenant-data search |
| PMS-ROL-PCC-000108 | Compliance reviewer | Control/evidence/risk/hold review and authorized export | Claim certification from unreviewed evidence |
| PMS-ROL-PCC-000109 | Release engineer | Signed manifest promotion through approved gates | Rebuild during promotion, bypass test/approval gates |
| PMS-ROL-PCC-000110 | Support agent | Assigned support case and consented diagnostics | Broad data access, password retrieval, permanent support session |
| PMS-ROL-PCC-000111 | Ecosystem reviewer | Publisher/package/connector/model review within assigned scope | Install into customer organization or grant undeclared capability |
| PMS-ROL-PCC-000112 | Knowledge/adoption operator | Approved knowledge, training and aggregate adoption workflows | Provider security policy or unrestricted employee analytics |

Provider super administrator is a governed privileged assignment, not a tenant wildcard or hidden audit bypass. Break-glass records purpose, incident, target, justification, expiry and retrospective review; its availability and exact exception policy are owner decisions. It cannot bypass legal holds or erase audit evidence merely because it is privileged.

## 4.4 Canonical application functional boundaries

Each entry below establishes distinct workflows and invariants. Detailed module feature records are authored in companion files, retaining the IDs mapped in the catalog. No application is declared complete from this boundary overview alone.

### 4.4.1 PCC-01 — Platform Operations Center

Owns platform services, incidents, changes, releases, maintenance windows, runbook executions, jobs and queues. Overview queries region/cell/service scope and shows measured health with last observation and source. Incident creation correlates alerts, assigns severity/commander, records timeline and impact, invokes approved runbooks and closes only after recovery checks. Duplicate alert correlation must not spawn independent incidents without reason.

Change/release workflows bind exact signed manifest, compatibility/migration evidence, impact preview, approval, rollout stages and rollback/forward plan. Deployment starts with a canary and pauses when health gates fail; no global success while cells remain failed or unknown. Queue tools permit scoped inspect/retry/dead-letter reconciliation through owning commands, not arbitrary message edit or tenant-context substitution. Maintenance suppression distinguishes planned notice from actual outage and never deletes telemetry.

### 4.4.2 PCC-02 — Platform Security Center

Owns provider security policy, vulnerabilities, exceptions, privileged reviews, break-glass and encryption posture. A policy revision is evaluated against affected systems, reviewed, activated by scope and reconciled; widening access or disabling controls requires the applicable explicit authority. A vulnerability record includes affected artifact/version, exploitability/severity evidence, owner, remediation deadline, compensating controls and verification. Exception expiry automatically reopens required remediation or blocks incompatible promotion; it does not silently extend itself.

Encryption posture reports key references and enforcement evidence, never key material. High-risk containment calls the owning operation contract and records outcome. Security readiness is not derived solely from a scanner's green summary.

### 4.4.3 PCC-03 — Organization Identity Governance

Despite its name, canonical owned resources include provider workforce members, roles, service principals, access packages/reviews and support delegation. IAM owns credential/session mechanisms. Invite → verify → assign reviewed role → activate → periodic review → revoke is explicit. Reviewers see exact effective access including inherited grants; removal propagates to current policy/session enforcement under declared bounds.

Support delegation requires organization/target, purpose, requested permissions, case reference, expiry and applicable approval/consent. UI shows effective actor and delegation banner. Revocation invalidates further protected actions; queued work rechecks policy. No provider role automatically becomes a tenant business role.

### 4.4.4 PCC-04 — Subscription Operations

Owns plans, offers, subscriptions, amendments, renewals, migrations and commercial contracts. Operators author immutable commercial versions, preview customer impact, approve publication and bind new subscriptions to accepted version/effective date. Changing a plan does not reprice historical usage. Renewal notices, trial expiry and downgrade consequences are explicit and driven by contract version.

Subscription amendment distinguishes requested, quoted, approved, effective and failed states. Upgrade/downgrade checks capacity, installed entitlements, committed term and migration compatibility. Downgrading below storage use blocks new allocation and provides remediation; it never deletes data to meet a quota. Volume 1 owns proposed pricing/rating arithmetic and commercial policy assumptions.

### 4.4.5 PCC-05 — Entitlement & License Authority

Owns entitlement definitions/grants, license pools/policies, offline licenses and reconciliation under PLT-BIZ in the canonical catalog. IAM remains the evaluator of effective access under the accepted architecture. Commercial grant authority and request-time authorization are distinct responsibilities; neither substitutes for the other.

Grant creation requires source subscription/contract, eligible organization, capability/version, limits, effective interval and revocation. Reconciliation compares expected commercial grants with effective projections and repairs through versioned commands. Offline licenses are signed, bounded to declared identity/device/environment and expiry; no indefinite offline bypass. Pool exhaustion returns explicit unavailable state. Participant count cannot become a hidden mandatory core seat charge contrary to the confirmed pricing preference.

### 4.4.6 PCC-06 — Revenue & Billing Operations

Owns billing accounts, price books, rated charges, provider invoices/payments, credit notes, revenue schedules, marketplace payouts and financial reconciliation. Operators freeze input/rate versions, review anomalies, finalize invoices, reconcile verified payment outcomes and issue linked corrections. Unknown remote payment status is reconciled before retrying a charge.

Credit/reservation ledgers prevent concurrent overspend; refunds cannot exceed settled refundable balance after prior adjustments/disputes. Dunning restriction reasons remain independent of security restrictions. Marketplace payout statements reconcile gross consideration, tax, refunds, fees, commission, reserves and payable; customer refund is not rewritten when publisher recovery fails. Accounting export uses idempotent source references and preserves posted records.

### 4.4.7 PCC-07 — Key & Secrets Authority

Owns references to provider secrets, cryptographic/signing keys, certificates, leases and key ceremonies. Operators create a binding through approved secret-manager workflow, review scope, issue short-lived leases, rotate via staged consumer compatibility, verify adoption and retire old versions after safe window. Browser receives metadata/status only, never plaintext keys or retrievable secret values.

Certificate renewal validates domain/control and chain before activation, monitors expiry and retains recovery version. Rotation failure keeps old usable credentials only under approved overlap, reports affected consumers and never claims success from key creation alone. Revocation is distinct from deletion; legal/audit records remain. Compromised keys trigger incident-scoped emergency response and downstream invalidation evidence.

### 4.4.8 PCC-08 — API Traffic Control

Owns API products/routes/policies, traffic rules, meter definitions, abuse cases and API deprecation. A route change references published contract/version, authentication/authorization policy, request bounds, rate dimensions and target service. Preview validates routing loops, unknown upstreams, tenant/authority separation and compatibility before scoped rollout.

Rate policy distinguishes principal/tenant/service budgets, burst versus sustained limits, failover behavior and reserved critical recovery traffic. Meter definition version controls what is billable; API errors/replays cannot be counted by guesswork. Deprecation lists replacement, notice/sunset, affected clients and usage evidence before removal. Traffic dashboards use bounded aggregates, not sensitive payload replay.

### 4.4.9 PCC-09 — Governance & Compliance Center

Owns frameworks, controls, evidence, audit engagements, risks, attestations and privacy impact assessments. A control maps requirement → owner → mechanism → evidence/build/environment → review/expiry. Evidence upload is scanned, classified and immutable after attestation; newer evidence supersedes, not silently replaces. Auditors receive scoped time-bound access/export with redaction and traceable downloads.

Risks require probability, impact, treatment, owner, due date, acceptance authority and residual exposure. Legal holds and data lifecycle controls must gate relevant deletion/export commands in their owning service. A dashboard cannot claim certification without the actual scoped issuer evidence and approval. Framework/version changes trigger mapped-control impact review.

### 4.4.10 PCC-10 — Security Intelligence

Owns telemetry sources, detection rules, alerts, SOC cases, threat indicators/hunts and containment actions. Onboarding a source validates identity, schema, timestamp, retention and coverage; missing telemetry is a visible gap. Detection rule changes replay against labeled samples before rollout, track false positives/negatives and preserve rule version for every alert.

Alert → triage → correlated case → approved containment → verification → closure records evidence provenance. Containment is a scoped privileged operation, not arbitrary AI-issued commands. Replayed alerts deduplicate by event/rule identity. Analysts cannot query tenant payloads merely by having a provider SOC role.

### 4.4.11 PCC-11 — Mobile Platform Operations

Owns builds, release channels/version policy, signing profiles, store releases and push-provider bindings. Build ingestion verifies source/provenance/signature and compatibility matrix. Promotion binds store artifact/hash, audience/channel, minimum supported version and rollback/roll-forward constraints. Store submission/publishing remains an externally authorized release action.

A forced-upgrade policy requires support-window decision and recovery path for offline/critical users. Push bindings contain secret references only; test delivery uses approved synthetic endpoints. Download count is not installation success. App-store acceptance, device adoption, crash health and service compatibility remain separate states.

### 4.4.12 PCC-12 — Desktop Platform Operations

Owns desktop builds/channels/version policies, signing profiles, installers and update policy. Verify platform/architecture, signing/notarization where applicable, artifact hash, installer behavior, compatibility and staged update health. Failed installation rolls back only where tested; otherwise provide explicit repair/forward path and preserve local user data.

Do not infer supported packaging from Flutter direction: existing desktop runtime/packaging ownership must be reconciled. Update service prevents downgrade/replay attacks according to approved policy while retaining legitimate recovery. Offline clients reconcile version entitlement and configuration on reconnect without discarding unsynchronized business work.

### 4.4.13 PCC-13 — Global Platform Configuration

Owns schemas, values/templates, feature rollouts, promotions and drift. Every setting has type, allowed scope, default, sensitivity, precedence, validation, owner and expiry where temporary. Preview resolves effective values across exact target set; promotion binds version and validates consumer compatibility. Secret values are references, not config text.

Feature flags have bounded audience, hypothesis, owner, rollout/kill switch and removal date. Flags never replace authorization or paid entitlement. Drift identifies desired versus observed revision and reconciliation owner; auto-remediation is permitted only for explicitly approved safe changes. Control-plane outage uses approved signed/local cache behavior, not unbounded stale permissions.

### 4.4.14 PCC-14 — Developer Ecosystem Operations

Owns publisher organizations/programs, SDK releases, app registrations, sandbox allocations and certification runs. Publisher verification is scoped and time-bound; changes to ownership or signing identity trigger review. SDK publication requires contract/golden fixture/consumer compatibility evidence and exact version; it cannot silently reduce support windows.

Sandbox allocation reserves resource budget and isolated placement, limits lifetime/egress, binds explicit capabilities and reconciles cleanup. App registration grants only declared client/redirect/scopes through IAM contracts. Certification run records artifact hashes, test suite/version, environment, evidence and result; a failed/expired run cannot mark a package certified.

### 4.4.15 PCC-15 — Knowledge & Adoption Operations

Owns provider knowledge articles, learning paths, product certifications, onboarding programs, adoption campaigns and product feedback. Article/learning release references supported product version, exact revision, review and audience. Training certification is clearly distinct from security/regulatory certification.

Onboarding programs define stages, prerequisites, owner, customer consent, completion evidence and exception recovery. Adoption campaigns respect communication preferences and never expose individual employee behavior beyond authorized purpose. Feedback captures minimal data, classification, linked requirement/decision and response state; duplicate feedback may be related without deleting original provenance.

### 4.4.16 PCC-16 — Platform Intelligence

Owns semantic metrics, datasets, dashboards, reports, forecasts and anomalies. Metric definitions specify source lineage, numerator/denominator, units, currency/timezone, aggregation, freshness, privacy filters and owner. Definition changes version historical interpretation rather than rewrite prior reports.

Dataset access is policy-filtered; exports are bounded and auditable. Small cohorts/sensitive dimensions are suppressed under approved policy. Forecasts expose horizon, model/data version, confidence/error measures and baseline comparison; they do not directly execute financial or operational changes. Missing/stale telemetry yields unknown, not zero cost or perfect availability.

### 4.4.17 PCC-17 — Marketplace Operations

Owns listing/submission/certification/version/review/recall governance. Submit immutable package → verify publisher/provenance → scan/test compatibility → review permissions/license/content → approve or reject exact version → publish under policy. New permissions require new review and customer consent at installation; provider publication does not grant installation into a tenant.

Recall defines affected version range, severity, host constraints, notification, containment and upgrade/removal guidance. Installed state and customer data remain host-owned. Commercial disputes/payouts call PCC-06/Marketplace contracts. Review moderation retains reason and appeal history; fabricated ratings or hidden adverse findings are prohibited.

### 4.4.18 PCC-18 — Tenant & Customer Lifecycle

Owns organization/customer accounts, provisioning operations, placement, migration and offboarding. Account metadata is not a right to inspect business records. The [lifecycle feature specification](VOLUME-04-PCC-LIFECYCLE.md) defines organizations, provisioning, suspension, reactivation, cancellation, relocation and deletion using the seven existing stable lifecycle module IDs.

Required invariants: one authoritative writer placement; verified first owner; every active restriction retains reason/source; cancellation is not purge; offboarding/export/retention/holds precede permanent erasure; retries never create duplicate tenant resources or remove another tenant's data.

### 4.4.19 PCC-19 — Cloud Infrastructure & Reliability

Owns cloud accounts, regions/cells, compute/network/storage/database resources, backup sets and recovery plans. Cloud-account registration verifies scoped server-side credential reference and read-only discovery before enabling changes. Capacity allocation reserves measured limits in the chosen cell and reconciles requested/actual resources/cost; resource creation alone is not tenant-ready.

Backup completion requires manifest, encryption, integrity, retention and immutable/offsite policy evidence, not job exit alone. Restore targets an isolated staging destination first, reconciles data and holds, and uses explicit cutover approval. DR rehearsal measures actual RPO/RTO and dependencies including objects/configuration/secrets. FinOps allocates costs by source/method, distinguishes shared/unallocated costs, exposes forecast assumptions and requires approval before shutting down resources used by customers.

### 4.4.20 PCC-20 — Integration & Connector Operations

Owns connector definitions/adapter versions, provider connection accounts, certification, health policy and deprecation. Registration defines authentication reference, allowed egress, schema/version, scopes, rate limits, retry/idempotency and data classification. Certification uses synthetic provider sandbox data and failure/renewal/replay tests.

Rollout pins adapter version per binding, checks compatibility and retains safe rollback/forward path. Rotating credentials invokes PCC-07 with consumer verification. Outage shows delayed/unknown external outcome; replays use canonical remote identity. Deprecation includes active binding inventory, migrator, notice and evidence before removing an adapter.

### 4.4.21 PCC-21 — AI Platform & Model Governance

Owns provider/model/version registry, AI policies, evaluation standards, routing policies and incidents. Onboard provider only after data-use/residency/retention/security/cost review. Model version records capabilities, context/tool limits, evaluation evidence, allowed data classes and retirement status. Route changes compare quality/safety/cost evidence before scoped activation.

Global policy caps budgets and forbids undeclared tool authority; tenant policy may further restrict. Retrieval enforces tenant/record policy before model context. Prompt/model output is untrusted and cannot authorize a tool. Dangerous financial, credential, deployment or deletion actions require deterministic validation and the same explicit approval path as manual actions. Incident response can disable a model/route while preserving safe fallback or explicit unavailable state; fallback cannot violate residency or data-use constraints.

### 4.4.22 PCC-22 — Support & Service Operations

Owns provider cases, service request definitions, SLAs, queues, diagnostic consent and quality reviews. Intake validates customer relationship without granting business-record access, assigns queue/priority, computes contract-defined clocks and escalates breaches. Case closure records resolution/evidence/customer communication and reopen policy.

Diagnostics request declares target, fields, purpose, expiry, operator and permitted actions; PCC-03 provides delegation. Data is minimized/redacted, encrypted and retained by case policy. Communications use approved templates and channels, deduplicate delivery and distinguish queued/sent/delivered/bounced. Service outage notices are not marketing messages; neither notification success nor a closed ticket proves the underlying service recovered.

## 4.5 Global events, telemetry, notifications and reports

Each canonical application owns the event family in the source catalog. Event names/schema majors are allocated at its contract, not guessed from UI routes. All provider mutations record actor/effective actor, target scope, reason, decision, exact inputs/version references, operation/correlation, time and actual outcome. Sensitive inputs are minimized or referenced.

ProviderOperation events distinguish requested, step-completed, waiting/reconciling, failed and completed; duplicate delivery never repeats the command. Audit consumers and notification consumers have separate delivery state. Required audit persistence cannot be disabled because notification is unavailable. Logs/metrics/traces propagate safe correlation across API/worker/remote provider; bounded labels avoid tenant/user IDs as unrestricted metric dimensions.

Reports include estate freshness and incidents; provisioning success/duration and orphan resources; active restrictions and offboarding age; billed-versus-metered reconciliation; expired grants/licenses; key/certificate adoption and expiry; release health; evidence expiry and residual risk; connector/model/version exposure; support SLA/diagnostic access; cost allocation and recovery readiness. Each report declares lineage, filter scope, definition/version, as-of watermark, exclusions and privacy policy. No report can turn missing data into 100% readiness.

Notifications identify target class, operation/state, safe action link and owner. Customer-impacting changes require approved recipient selection and communication authorization; this specification does not authorize sending real messages. Retries are deduplicated, escalation bounded, locale/template version recorded and secrets/tenant business data excluded.

## 4.6 Reliability, accessibility and failure-first proof

Proposed command-acceptance target P95 ≤1s for bounded validation with dependencies available; long-running effect durations have operation-specific budgets, not a universal request timeout. Operator dashboards expose observation freshness and unavailable sources. Availability/latency/SLO/RPO/RTO are published per critical operation after measured workload agreement; no numeric claim is inferred from the North Star ADR.

PCC loss must not unnecessarily stop healthy tenant runtime under accepted cell independence. New privileged changes fail closed when required policy/approval/audit service is unavailable. Read-only views may use bounded stale snapshots with conspicuous timestamps. A worker never assumes approval remains valid indefinitely because it was valid at queue time.

Keyboard/screen-reader acceptance covers target selection, filters, risk preview, confirmation/approval, operation progress, error recovery and audit inspection. Charts have text/table equivalents; dense tables preserve focus and headers; multi-target destructive actions require clear target count/names and consequences. Reduced motion, zoom/reflow, contrast and locale/timezone correctness remain required.

| Failure | Required behavior | Required boundary test |
| --- | --- | --- |
| Tenant token on PCC endpoint | Deny without protected details | Cross-plane token/permission negatives |
| Revoked role or changed target during approval | Reject execution or reapprove current plan | Approval TOCTOU and policy-version test |
| Duplicate command / lost response | Same operation/effect | Concurrent idempotency and post-commit disconnect |
| Expired worker lease | Stale worker cannot mutate | Fencing token race against replacement worker |
| Database failure | Atomic operation/audit/outbox rollback or durable acceptance | Crash injection at commit boundaries |
| Queue outage | Durable outbox backlog; honest pending state | Publish/replay/reconciliation after outage |
| Remote provider timeout | Unknown/reconciling; query remote identity before retry | One remote resource/payment despite response loss |
| Partial multi-target action | Per-target results and recovery; no blanket success | One failing cell/tenant within selected set |
| Secret/audit service unavailable | Block required privileged action; no secret exposure | Dependency loss and log/capture redaction |
| Legal hold appears during erasure | Stop before further destructive steps; retain evidence | Hold-version race and purge fence |
| Stale telemetry | Unknown/stale, not healthy | Missing/delayed/forged observation test |
| Approval attempts self-approval | Deny where policy requires independent actors | Same principal/effective principal test |

## 4.7 Architecture gaps and continuation

PMS-TBD-0020: reconcile provider action permission names and concrete API/schema catalogs with canonical resource owners; PLT-PAO/contracts/security. PMS-TBD-0021: set approval thresholds, assurance windows, break-glass and customer-notice policies by operation; security/legal/operations. PMS-TBD-0022: define specific command budgets, RPO/RTO and workload profiles; SRE. PMS-TBD-0023: confirm historical-grouping retirement and canonical app/module navigation in PMS; architecture—mapping established from source, not a runtime change. PMS-TBD-0024: reconcile desktop packaging direction with existing client architecture before claiming Flutter desktop parity; PLT-DESK.

This core establishes all 22 application boundaries and shared execution requirements. Full module-level feature, schema, screen, API and test detail is still being authored in companions. The full PCC product is not complete merely because its canonical catalog is now represented. Continue with lifecycle, commercial operations, then the remaining PCC applications before proceeding to Business Applications.
