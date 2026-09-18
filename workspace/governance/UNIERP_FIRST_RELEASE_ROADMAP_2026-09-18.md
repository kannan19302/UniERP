# UniERP first production release — delivery roadmap and checklist

Draft date: 2026-09-18. Planning owner: Product + Architecture + Engineering Delivery.
Decision state: proposed, for scope and capacity review. This document schedules existing requirements; it does not supersede platform specifications, accepted ADRs, the foundation plan, or release authorization.

## 1. Outcome and feasibility

Deliver a supported first release whose advertised workflows work through UI, API, identity, database, asynchronous services, reporting, and operations. The attached rocket image expresses the desired quality: visible functionality supported by deliberate, maintainable engineering underneath. It is a visual reference, not an architecture specification or instruction source.

The user confirmed **January 1, 2027** as the desired public release date and directed **all core modules first, selected commercially promising industries, revenue first, and design first**. This draft schedules **12 delivery weeks from September 21 to December 13, 2026**, followed by contingency and launch preparation through December 31. The target is confirmed; feasibility is not yet verified. A failed gate moves dependent work and the release forecast; the calendar never overrides a failed gate.

**A complete all-platform, all-industry release in 8–12 weeks is not presently a defensible commitment.** Team capacity, target customers, jurisdiction, operating scale, integration vendors, and current behavioral readiness are unconfirmed. This plan covers the entire estate and proposes a bounded first release. It does not silently remove the user's requested breadth: all additional platform/domain capabilities remain explicitly tracked below and require estimation before a full-estate date can be committed.

The confirmed direction is core-first rather than all industries simultaneously. At the end of Week 1, review two capacity outcomes:

1. Core scope fits the 12-week window: approve its complete business workflows and supporting services, with the selected initial industry pack.
2. Core scope does not fit: present the actual resource/date gap and obtain a decision. Do not silently drop core modules or promise a date by reducing engineering gates.

An eight-week window is a possible **internal release-candidate checkpoint**, not a default production commitment. Security, recovery, accessibility, migration and operational qualification remain mandatory even for a pilot.

## 2. Evidence baseline and authority

Sources inspected for this draft:

- [Product promise](../../unierp-platform/docs/product/PRD.md) and [system requirements](../../unierp-platform/docs/product/REQUIREMENTS.md).
- [Platform ownership](../../unierp-platform/docs/PLATFORM_CATALOG.md) and [ERP requirements](../../unierp-platform/docs/platforms/tenant-apps/REQUIREMENTS.md).
- [Foundation remediation plan](UNIERP_FOUNDATION_REMEDIATION_PLAN.md), including FND-P0 through FND-P4 and the feature-expansion gate.
- [September 3 audit](UNIERP_SAAS_READINESS_AUDIT_2026-09-03.md) and [owner decision](FND-PA-002_POST_REMEDIATION_OWNER_REVIEW.md).
- [Active repository inventory](active-estate.json), [domain catalog](../docs/architecture/canonical-domain-catalog.md), repository manifests, API module directory, and [governance runner](../scripts/run-enterprise-saas-engine.mjs).
- [Agent protocol](../../unierp-platform/docs/standards/AI_AGENT_DEVELOPMENT_PROTOCOL.md), [knowledge lifecycle](../../unierp-platform/docs/standards/AI_KNOWLEDGE_LIFECYCLE.md), enterprise-brain references and accepted ADR-0010.

Observed facts versus unverified claims:

| Observation | What it supports | What it does not support |
| --- | --- | --- |
| Active inventory declares 31 repositories | Planning coverage across the declared estate | Every service runs or every dependency is deployed |
| September 3 audit reports 42.3% across 237 prerequisites | A dated findings register and remediation baseline | Current completion or a percentage of remaining engineering effort |
| Owner record retains broad-development and production NO-GO | Foundation gates are predecessors to broad expansion | Permission to deploy based on this roadmap |
| September 8 execution ledger reports 100% | A structural scanner result recorded in a separate artifact | Business correctness, tenant isolation, UAT, recovery or production readiness |
| Runner accepts broad text patterns and awards full route scores on zero discovery | A concrete reason to distrust that score as a release gate | Proof that every implementation is defective |
| API directory contains 33 module directories | A useful discovery seed | 33 production-ready business services |

No live runtime, database, external IdP, cloud, load, recovery, or business workflow qualification was performed for this planning task. Refresh evidence against exact revisions in Week 1. Do not use either historic percentage as today's readiness figure.

Instruction conflict: ancillary `.agents` rules request automatic commit/push and continuous estate remediation; the canonical protocol restricts these actions and the current request is a roadmap draft. This task creates local planning artifacts only. Likewise, recipe examples do not override the atomic transaction and fail-closed evidence requirements. Owner review must resolve obsolete or conflicting guidance before execution relies on it.

## 3. Proposed release contract

**Candidate customer profile:** one agreed SMB/mid-market business segment using the common core. This is an assumption, not a customer decision. Select actual geography, accounting/tax obligations, currencies, languages, deployment mode and operating volumes in Week 1. Payroll, healthcare, banking and other jurisdiction-sensitive promises cannot be inferred from generic modules.

Proposed definition of **all core modules**: finance/accounting, CRM, sales, procurement, inventory, HR/leave, projects/time/expense, fixed assets, customer service, reporting/analytics, tenant/provider administration, and the shared platform/commercial services they consume. Core means complete agreed lifecycle depth, including corrections/reversals and reporting; it does not mean every advanced feature of every competing ERP. Confirm the module-to-workflow inventory in Week 1. Manufacturing and other industry-specific depth are added for the selected launch segment, not silently counted as generic core.

Proposed mandatory business journeys:

| ID | End-to-end outcome | Business acceptance evidence |
| --- | --- | --- |
| J01 | Provision tenant → configure legal entity → invite user → assign role → first login | Isolation, least privilege, lifecycle audit and provisioning retry/recovery |
| J02 | Lead/customer → quote → order → reserve → fulfill → invoice → collect → GL | Decimal totals; correct tax configuration; no double posting; receivables reconcile |
| J03 | Supplier → requisition → approval → purchase → receive → match invoice → pay → GL | Separation of duties, three-way matching, partial receipts, duplicate invoice denial |
| J04 | Item → location → opening stock → receipt → transfer → count → adjustment/return | Unit and valuation integrity; concurrent reservation; ledger balance and reconciliation |
| J05 | Journal → approve/post → trial balance → receivables/payables → close → reverse | Debits equal credits; period locks; subledgers reconcile; immutable posted records |
| J06 | Employee → organization assignment → leave request → approval → balance | Personal-data access restrictions, effective dates and concurrent balance changes |
| J07 | Case → assignment → SLA → escalation → resolution | Timer recovery, permission checks, notification delivery and durable history |
| J08 | Import master/opening data → validate/dry run → execute → reconcile/export | Versioned formats, duplicates, partial failure, row-level errors and tenant-safe exports |
| J09 | Plan/entitlement → tenant usage → subscription lifecycle → billing reconciliation | Server-side entitlements; webhook replay defense; no duplicate charges or grants |
| J10 | Failure → detect → alert → recover/restore → reconcile | Measured recovery, on-call response, no unexplained financial/stock discrepancy |
| J11 | Project → budget → assign → time/expense → approve → bill → profitability | Authorization, approved costs, billing idempotency and finance reconciliation |
| J12 | Acquire asset → capitalize → depreciate → transfer → dispose → GL | Accounting policy, decimal schedules, effective dates and reversals |

J06/J07/J11/J12 are part of the proposed core-first release, not automatically optional. Their lifecycle depth must be estimated alongside finance, sales and inventory. Paid self-service billing versus contracted invoicing is a commercial-model decision. A contracted, manually provisioned launch still needs entitlement enforcement, auditable commercial records and support procedures. Any scope reduction requires an explicit decision and corresponding changes to claims/navigation.

Every released journey must also prove: invalid input, wrong role, wrong record, tenant A/B/no context, duplicate delivery, retry, concurrent update, dependency outage, audit/outbox failure, migration compatibility, UI error/recovery states, accessibility and supportability. A successful administrator demo proves none of the negative cases.

### Complete estate disposition

All platforms remain in the product roadmap. “Candidate later” means a proposed first-release deferral requiring owner agreement, not removal from UniERP.

| Platform | Proposed first-release responsibility | Additional scope requiring qualification/estimate | Accountable role |
| --- | --- | --- | --- |
| PLT-IAM | Login, session/recovery, MFA for privileged users, memberships, permissions; contracted SSO | Additional federation providers and identity scenarios | IAM/security lead |
| PLT-PAO | Provision/suspend tenant, diagnose health, bounded support access, service operations | Advanced estate/cell automation | Provider platform lead |
| PLT-TAD | Organization, users/roles, settings, entitlements, audit, integration configuration | Advanced delegated governance | Tenant platform lead |
| PLT-ERP | J02–J08 plus J11/J12 as ratified; complete failure and reversal paths | Manufacturing, field service, POS, ecommerce and additional industry packs | ERP product/domain leads |
| PLT-BIZ | All domain APIs, master data and shared services consumed by the release | Remaining domain APIs and advanced analytics/AI | Business services/data leads |
| PLT-DS | Approved components/tokens, responsive navigation, required states, WCAG evidence | Further component breadth | Design/accessibility lead |
| PLT-OPS | Reproducible runtime, release train, telemetry, support, backups and recovery | Additional regions, air-gapped cells, extreme scale | SRE/release lead |
| PLT-DEV | Versioned contracts/SDK used by launched clients, safe required integrations | Public portal, public extensions, external developer lifecycle | Developer platform lead |
| PLT-MKT | Disable installation/commercial paths unless fully qualified | Discovery, review, purchase, install/upgrade/revoke/refund | Marketplace lead |
| PLT-SITE | Required public runtime only if included in signed scope | Studio, templates, custom domains, publishing rollback | Sites lead |
| PLT-MOB | Responsive web proposal; native release only with its own acceptance evidence | Native parity, synchronization, offline/conflict recovery, distribution | Mobile lead |
| PLT-DESK | Candidate later unless explicitly contracted | Packaging, signing/update chain, local storage and offline recovery | Desktop lead |
| PLT-MAR | Accurate product scope, onboarding/support entry, documentation | Marketing of unqualified modules prohibited | Product/marketing lead |

Do not deploy unused services merely to check a box. For each deployable record: owner, consumers, version, environment, dependencies, health/readiness, identity/secrets, capacity, telemetry, runbook, backup and recovery applicability, cost owner, release evidence, and supported/deferred state. Libraries need compatibility and consumer proof; they are not independent production services.

## 4. Product anatomy and delivery method

### Design-first execution strategy

Design means business processes, data, security, interaction and operability together. It is not limited to a screen redesign. W1–W2 establish the common product anatomy; each domain then passes its design gate before implementation. Keep design approximately one delivery increment ahead of engineering so customer feedback can still change the next increment without creating a twelve-week design waterfall.

For each module, produce: persona/jobs and workflow map; role/permission and tenant boundary matrix; entity/state diagram and invariants; information architecture/navigation; reusable Strata floorplan selection; clickable prototype covering normal/error/empty/forbidden/conflict/reversal states; API/event contract; accounting/stock side effects; accessibility notes; and acceptance scenarios. Review with the domain owner, developer, QA and representative customer. A new screen cannot enter implementation merely because it looks finished.

Design gates: **D0** common navigation, terminology and core design system agreed by end W2; **D1** module workflow/prototype and business rules reviewed before that module's implementation; **D2** actual UI compared with approved behavior and accessibility evidence before UAT. Design prototyping and foundation remediation can proceed together; broad feature implementation still waits for G2. Use existing `@kannan19302/ui` patterns before inventing new components.

### Revenue-first industry selection and customer acquisition

Initial hypotheses, based on reuse of the proposed core and integration burden, not a claim of proven demand:

| Priority hypothesis | Initial buyer/problem | Smallest sellable industry package | Selection condition |
| --- | --- | --- | --- |
| 1. Wholesale/distribution/trading | Owner/finance/operations losing visibility across orders, stock and collections | Core + bulk sales, purchasing, warehouse flows, returns and receivables | Reachable buyers and paid design-partner interest; limited bespoke integrations |
| 2. Professional services/agencies | Owner/project lead struggling with time, expenses, billing and margin | Core + projects, approved time/expense, milestone billing and profitability | Stronger warm pipeline than distribution or a second reusable pack after first acceptance |
| 3. Light manufacturing | Operations lead needing material/work-order/cost visibility | Core + BOM, simple routing, production issue/output and costing | Real paying design partner and sufficient manufacturing qualification capacity |
| Later, one at a time | Retail/POS, field services and other verticals | Add only validated missing workflows to the same core | Payment/offline/device or domain obligations funded and tested |

Start customer discovery in the first two hypotheses; **commit to one initial industry pack by end W2**. A second joins the January release only if its signed demand and estimated capacity fit without weakening core gates. Prefer the segment where the team already has access to decision makers. Do not assume any sector is easy to acquire without interviews and willingness-to-pay evidence.

Market context: Eurostat reports that 53% of EU enterprises used ERP, CRM and/or BI in 2025, with adoption varying by company size. This supports an established software category, not demand for UniERP or a ranking of its best industries. OECD identifies resource, skills and financing barriers in SME digital adoption, supporting a focus on migration, training and quick business value. These are general reference points; geography and actual customer access remain unconfirmed. Sources: [Eurostat, May 2026](https://ec.europa.eu/eurostat/en/web/products-eurostat-news/w/ddn-20260520-1), [OECD SME digital transformation](https://www.oecd.org/en/publications/the-digital-transformation-of-smes_bdb9256a-en/full-report.html).

Use a 0–5 score for each candidate after interviews: buyer access 25%, urgent recurring pain 20%, willingness to pay 20%, reuse of core 15%, onboarding speed 10%, and low integration/regulatory burden 10%. Weighted score = sum(weight × score/5). Do not assign invented scores now. Hard prerequisites: a reachable buyer, clear workflow, acceptable jurisdiction and a technically supportable migration.

Proposed commercial milestones, targets rather than forecasts:

- W1–W2: founder/product owner conducts 10–15 qualified interviews across the two leading hypotheses; obtains 3 design-partner commitments and selects one industry. Track present tools, monthly pain/cost, buying authority, migration needs, budget and objections.
- W3–W4: validate prototypes using realistic work; agree a paid pilot or written purchase intent with clear delivery conditions, scope, onboarding fee and support expectations. Owner handles any outreach/contracts; drafting this roadmap does not send messages or commit commercial terms.
- W5–W8: demonstrate actual integrated workflows to partners weekly; validate pricing and migration effort. Choose a simple base subscription plus bounded onboarding fee, with plan/usage structure validated against customer value and service costs. Set no unsupported currency or price.
- W9–W10: complete migration dry runs, training and pilot admission gates. Payment intent is not a reason to bypass qualification.
- W11–W12: run authorized pilot, seek 2–3 accepted paying customer conversions, and document recurring revenue, collection, activation, support burden and retention risks separately.
- Launch/first 30 days: measure days to first successful workflow, onboarding hours, active customer usage, conversion, collected recurring revenue, gross margin and incidents. Advance the next industry only after the first can be onboarded repeatably without custom forks.

Commercial dashboard: qualified leads → discovery → prototype validation → commercial agreement → qualified pilot → activated paying tenant → renewal. Recurring revenue target = paying tenants × contracted recurring price; report onboarding fees separately. Do not promise a revenue amount until price and conversions are evidenced.

Preserve the accepted layering: L0 contracts; L1 foundations; L2 runtime/data; L3 services; L4 presentation; L5 clients; L6 extensions; L7 operations. The active inventory maps all 31 repositories. Do not split or add microservices to make the architecture appear more sophisticated.

Each work packet follows this order:

1. Accepted outcome and invariant, platform owner, dependency and acceptance criteria.
2. Published contract and compatibility; authorization and tenant context; data lifecycle.
3. Immutable migration, constraints, indexes, service scoping and RLS.
4. Domain transaction, audit/outbox, concurrency, retry and reconciliation.
5. SDK/consumer integration and complete UI states using `@kannan19302/ui`.
6. Tests at real boundaries, accessible interaction and production-shaped performance.
7. Telemetry, runbook, recovery, release manifest and exact-build evidence.

For every ticket use the [change-contract template](../../unierp-platform/docs/standards/AI_CHANGE_CONTRACT_TEMPLATE.md) as applicable. Record accountable person, reviewer, requirement IDs, repositories/consumers, estimate range, dependencies, acceptance cases, evidence links, migration/rollback and status. Role labels below are placeholders until named people accept ownership.

## 5. Capacity and execution organization

Provisional staffing assumption: **12 full-time technical contributors**: one architecture/technical lead, five backend/domain engineers (including data and IAM expertise), three frontend/full-stack engineers, two quality/automation engineers and one SRE/release engineer. Also require one empowered product owner, one designer with accessibility capability, scheduled finance/accounting expertise, privacy/security review, and support/onboarding ownership. Security review should include someone independent of the implementing author. These roles may overlap only if their time is explicitly budgeted.

Illustrative capacity, not a completed estimate: 12 × 60 working days = 720 gross person-days; at 65% planned delivery availability, approximately 468 person-days. Reserve approximately 15% of that capacity for rework and surprises, leaving approximately 398 assignable person-days. Week 1 must replace this model with named availability, local holidays, measured baseline and bottom-up ticket estimates. Do not count AI output as autonomous review or unlimited capacity. Smaller teams must reduce first-release breadth or move the date; extra people do not remove sequential security/data dependencies.

Suggested workstreams after their prerequisites pass: foundations/security; finance and master data; sales/procurement/inventory; experience/shared services; release/quality. Keep a single integration backlog and limit each engineer to one primary implementation packet. Weekly integrated workflow demos are mandatory. Escalate blocked critical-path work within one working day.

## 6. Twelve-week schedule

Dates assume a Monday September 21 start. Parallel work is allowed only when its foundation dependencies are satisfied. Existing remediation can continue before broad feature expansion; the expansion gate cannot be waived by this schedule.

| Week / dates | Primary work | Required observable exit | Gate/decision |
| --- | --- | --- | --- |
| W1 Sep 21–27 | Rebaseline, inventory core workflows/services, customer interviews, process/UX design, define scope/team | Exact-build evidence, estimated core backlog, named owners, scope and NFR contract | G0: scope/capacity feasibility review |
| W2 Sep 28–Oct 4 | P0 remediation; common anatomy/prototypes; choose first industry and design partners | Adversarial tests, nonzero discovery, common design baseline and industry decision | G1 + D0; otherwise reforecast |
| W3 Oct 5–11 | P1 domain/master-data/contract convergence, migration discipline, shared capabilities and test environments | All foundation-plan expansion prerequisites accepted with evidence | G2: permission to expand product scope |
| W4 Oct 12–18 | Complete tenant onboarding, organization/master data, finance posting skeleton and shared workflow integration | J01/J08 and first balanced business posting on real boundaries | Integration checkpoint |
| W5 Oct 19–25 | Sales/CRM and inventory reservation/fulfillment | J02 through invoice/posting, partial fulfillment and failure compensation | Domain sign-off |
| W6 Oct 26–Nov 1 | Procurement/receipts/matching/payment; inventory count/returns | J03/J04 including race, duplicate and reversal evidence | Domain sign-off |
| W7 Nov 2–8 | Finance close; HR/service; projects/assets; reporting, entitlement and customer lifecycle | J05/J06/J07/J09/J11/J12; reconciled reports and role checks | Functional scope lock |
| W8 Nov 9–15 | Close integration gaps, rehearse imports, finish UX/a11y, internal UAT | Every committed journey complete end to end; no placeholder dependencies | G3: feature-complete internal candidate |
| W9 Nov 16–22 | Load, penetration/security review, dependency failures, privacy drills | Findings triaged; capacity and performance budgets measured | Quality qualification |
| W10 Nov 23–29 | Independent restore/PITR, migration rehearsal, signed release promotion/rollback, runbooks | Recovery and deployment rehearsal accepted on exact candidate | G4: pilot admission |
| W11 Nov 30–Dec 6 | Authorized limited pilot, customer UAT, support/onboarding rehearsal | Agreed representative users complete critical work; telemetry and reconciliation reviewed daily | Pilot acceptance |
| W12 Dec 7–13 | Fix release blockers, regression, final reconciliation, release dossier | Product, architecture, security, data, QA and operations sign-off | G5: release eligibility, not deployment authorization |
| Dec 14–31 | Contingency, eligible fixes, evidence refresh, launch preparation and on-call coverage | Same gates remain valid after fixes; final launch decision | Authorized rollout only |
| Jan 1, 2027 | Desired public release, if confirmed | Staffed controlled rollout, health/business checks, abort authority | Human release decision |

SRE work starts in W1 with topology/cost/design and moves into authorized environment execution as prerequisites permit; backup and deployability are not discovered in W10. If G1/G2 slip, consume explicit contingency or move dependent milestones. Do not compress the pilot or recovery tests to preserve a cosmetic launch date. Confirm holiday staffing before choosing January 1 for deployment; public availability and deployment timing can be separate decisions.

Critical path: scope/baseline → trusted gates → IAM/tenant/data integrity → domain/contracts/shared services → integrated business journeys → security/performance/recovery → pilot → release decision.

## 7. Executable to-do register

Every unchecked item is planned work, not a claim that its implementation is absent. First inspect and reuse existing mechanisms; qualify them or fix the gap. Each item becomes one or more estimated tickets. Foundation IDs remain the authoritative remediation identities.

### W1 — scope, truth and decisions (Product + Architecture + QA)

- [ ] R01 Confirm date, launch customer, geography, currencies, languages, SaaS/self-hosted model and deployment region.
- [ ] R02 Freeze first-release journeys, explicit exclusions and supported devices; decide whether “all services” means all current product capabilities or all dependencies of the selected release.
- [ ] R03 Assign named platform, domain, data, service, security, release and support owners with reviewers and availability.
- [ ] R04 Refresh the 237-item audit against current revisions; retain historic evidence as historic; reconcile contradictory ledgers.
- [ ] R05 Inventory routes, APIs, jobs, consumers, sockets, tables, contracts, integrations and deployables; map every release action to its implementation and proof.
- [ ] R06 Inventory every exposed button/action/report; replace fake success, dummy metrics and silent fallbacks with working behavior or approved unavailable states.
- [ ] R07 Estimate remaining work with low/likely/high ranges and dependencies; compare critical-path and team capacity before committing dates.
- [ ] R08 Agree tenant/user/record volumes, peak concurrency, availability, latency, queue lag, RPO/RTO and cost envelopes per journey.

### W1–W3 — foundation closure (IAM + Data + Architecture + SRE)

- [ ] R09 Close FND-P0-001/002: current estate, layer direction, reproducible toolchain, exact workflow pins, nonzero discovery and representative defect tests.
- [ ] R10 Replace structural-score release decisions with exact-build behavioral evidence; missing/skipped/stale prerequisites fail closed.
- [ ] R11 Close FND-P0-003: federation validation, session expiry/revocation, recovery, MFA, malicious issuer/redirect handling and key rotation rehearsal.
- [ ] R12 Close FND-P0-004: whole-schema application-role RLS plus service-level CRUD, relations, raw SQL, reports, export, cache and background-job isolation.
- [ ] R13 Prove tenant A, tenant B and no-context denial with NOBYPASSRLS; include pooled-connection context leakage and cross-tenant references.
- [ ] R14 Close FND-P0-005: all HTTP/non-HTTP entrypoints, record scope, unknown permissions, provider/tenant separation and privileged support access.
- [ ] R15 Close FND-P0-006: mandatory durable audit, database enforcement, atomic outbox, restart/replay/deduplication, dead letters and reconciliation.
- [ ] R16 Close FND-P0-007/008: protected delivery controls, complete release manifest, sensitive-data hygiene and secret scanning.
- [ ] R17 Close FND-P1-001/002/003: domain/aggregate owners, organization hierarchy, effective dates and canonical customer/vendor/item/worker/account masters.
- [ ] R18 Close FND-P1-004: all consumed API/event/webhook contracts, canonical errors, bounded pagination, version compatibility and generated consumer validation.
- [ ] R19 Close FND-P1-005: converge duplicate shared engines under one owner; migrate consumers with compatibility and retirement evidence.
- [ ] R20 Close FND-P1-006: constraints, indexes, decimal precision, units, immutable migrations, resumable backfills and mixed-version rehearsal.
- [ ] R21 Close FND-P1-007/008: real infrastructure test environments, mandatory adversarial suites, shared UI/tokens and accessibility baseline.
- [ ] R22 Obtain evidence-based continuation decision for all required P0/P1 items before broad feature expansion.

### W3–W8 — all shared services consumed by the release (Business Services + IAM + OPS)

- [ ] R23 Workflow and approvals: persisted states/timers, delegation, separation of duties, escalation, version migration, compensation and restart.
- [ ] R24 Notifications/communication: transactional dispatch, templates/localization, preferences/consent, delivery status, retry/provider failure and duplicates.
- [ ] R25 Files/documents: access control, malware quarantine, signed access expiry, versioning, lifecycle and restored-object integrity.
- [ ] R26 Search: tenant/record ACLs, index lag, deletion propagation, restartable reindex and reconciliation.
- [ ] R27 Reporting/analytics: governed metric meanings, row/field security, ledger reconciliation, bounded queries, exports and snapshot reproducibility.
- [ ] R28 Configuration/flags/entitlements: typed configuration, hierarchy, server-side enforcement, audit, safe defaults and rollback/expiry.
- [ ] R29 Jobs/scheduling: tenant context, durable leases/fencing, concurrency limits, idempotency, retry/backoff, dead letters and operator recovery.
- [ ] R30 Import/export: dry run, mapping/versioning, validation, resumable execution, sensitive-field handling and reconciliation.
- [ ] R31 Localization: decimal/currency/UOM/time-zone/fiscal semantics, supported languages, fallback and required RTL behavior.
- [ ] R32 Billing/usage: plan owner, immutable readings, callbacks, entitlement transitions, retries and finance reconciliation for selected commercial model.
- [ ] R33 Custom fields/objects and integrations: qualify only those exposed in release; validate schema, ACL, indexing, quotas, webhook signatures/replays and compatibility.
- [ ] R34 Shared-service outage tests: fail honestly, bound queues/retries, recover without lost or doubled business effects; record per-service runbooks.

### W4–W8 — business workflows (Domain leads + Full-stack + QA)

- [ ] R35 Finish J01 tenant lifecycle and tenant-admin/provider-admin boundaries, including suspension/reactivation and failed provisioning.
- [ ] R36 Finish J08 master/opening-data import; reconcile opening balances and stock before customer onboarding.
- [ ] R37 Finish CRM contacts/leads/opportunities, consent, ownership, conversion and quote lifecycle without duplicate customer masters.
- [ ] R38 Finish J02 sales order, pricing/tax/discount, credit checks, reservation, partial fulfillment, invoice/payment and posting.
- [ ] R39 Finish J03 purchasing approvals, PO, partial goods receipt, tolerances/three-way match, supplier invoice, payment and posting.
- [ ] R40 Finish J04 stock movements, lots/serials where promised, transfers, valuation, returns, counts and concurrent reservations.
- [ ] R41 Finish J05 journals, AR/AP, cash/bank reconciliation, reports, period locks, close and reversals; obtain accounting-owner sign-off.
- [ ] R42 Finish J06 HR/leave if approved; qualify sensitive-field access, joiner/mover/leaver and balance invariants. Do not imply payroll compliance.
- [ ] R43 Finish J07 service cases if approved; prove escalation, reassignment, timer recovery, notifications and permission history.
- [ ] R44 Finish J09 customer trial/activation, commercial state changes, quotas, cancellation/offboarding and export as promised.
- [ ] R45 Reconcile all operational reports to source transactions; remove hardcoded KPIs and impossible success states.
- [ ] R46 Finish accessible responsive states for every committed journey: loading, empty, error, forbidden, stale, offline, conflict and retry.
- [ ] R47 Complete role-specific UAT and actual browser journeys through API/database/queues; test restricted roles as well as the sanctioned administrator account.

### W1–W12 — production qualification (SRE + Security + QA + Support)

- [ ] R48 FND-P2-001: review and validate infrastructure, workload identity, network isolation, secrets/KMS, DNS/TLS, compute, database, queue/cache and storage.
- [ ] R49 Provision/recreate an authorized production-shaped environment; prove drift detection, health/readiness, quotas and resource limits.
- [ ] R50 FND-P2-002: build once, pin repository versions, SBOM/provenance/signature verification, scan artifacts and promote the same immutable build.
- [ ] R51 Rehearse expand/backfill/contract, compatibility, locks, duration, application rollback and database roll-forward on representative data.
- [ ] R52 FND-P2-003: trace browser/API/worker operations; implement safe logs, journey SLIs, actionable alerts, dashboards and on-call escalation.
- [ ] R53 Load test agreed workload and tenant skew; prove performance budgets, bounded exports/reports, query plans and noisy-neighbor protection.
- [ ] R54 Inject database, worker, queue/cache, object-storage and external-provider faults; verify graceful degradation and reconciliation.
- [ ] R55 FND-P2-004: independently restore off-site database/WAL, files, configuration and required keys; measure actual RPO/RTO and ledger integrity.
- [ ] R56 FND-P2-005: exercise retention, legal hold, export/erasure and access review with synthetic data; obtain jurisdiction-specific specialist review.
- [ ] R57 Complete independent security review, dependency/license checks and remediation of release-blocking findings.
- [ ] R58 Complete keyboard, screen reader, zoom/reflow, contrast, reduced-motion and supported-browser/device evidence.
- [ ] R59 FND-P2-006: publish service ownership, incident/change runbooks, customer support route, severity policy and evidence-expiry schedule.
- [ ] R60 Run release/incident game day, customer onboarding training, migration/import rehearsal and support escalation exercise.
- [ ] R61 Obtain exact pilot environment authorization; onboard agreed representative customers; record UAT acceptance and daily reconciliation.
- [ ] R62 Freeze candidate, rerun affected regression after fixes, review complete diffs and produce signed-off release dossier.
- [ ] R63 Obtain production action/target authorization; execute staged rollout with health/business checks, abort owner and tested recovery.
- [ ] R64 Provide staffed hypercare for at least the agreed launch support period, daily ledger/queue review, incident handling and follow-up release cadence.

### Design, core completion and revenue workstream

- [ ] R65 W1–W2, Product/Design: define common module anatomy, navigation, role journeys and reusable floorplans; pass D0 with domain/engineering/QA review.
- [ ] R66 W2–W7, Design/Domain leads: pass D1 per module with prototype, lifecycle, contracts, error/reversal states and customer usability review before implementation.
- [ ] R67 W5–W8, Projects/Finance leads: complete J11 project budgets, approved time/expenses, billing and margin reconciliation.
- [ ] R68 W5–W8, Finance lead: complete J12 capitalization, depreciation, transfer/disposal, reversal and GL reconciliation.
- [ ] R69 W1–W2, Product/Founder: interview 10–15 qualified buyers, score industry hypotheses, choose first pack and secure 3 design partners.
- [ ] R70 W3–W4, Product/Commercial owner: validate price, onboarding effort and paid-pilot/purchase intent; record delivery conditions and support costs.
- [ ] R71 W3–W8, Selected industry lead: design and complete first industry's additional workflows after G2; qualify them with core journeys and customer data-import scenarios.
- [ ] R72 W5–W12, Product/Support/QA: weekly customer validation, D2 implementation review, onboarding/training and measurable first-value acceptance.
- [ ] R73 W11–launch, Commercial/Support owner: seek 2–3 paying conversions; track actual collected recurring revenue, activation and support margin; no invented revenue claims.
- [ ] R74 Post-launch, Product/Architecture: select next industry from qualified demand after repeatable onboarding and stable core evidence; reuse contracts and avoid customer-specific forks.

### Full-product breadth register — estimate before promising inclusion

| Work packet | Minimum end-to-end qualification | Dependency / release decision |
| --- | --- | --- |
| Manufacturing | BOM/routing → plan → work order → issue → output/scrap → costing/GL | Item/stock/finance foundations; dedicated domain estimate |
| Fixed assets | Acquire → capitalize → depreciate → transfer → dispose → GL | Core release J12; advanced accounting depth requires separate estimate |
| Projects/professional services | Budget → resource/time/expense → approval → billing → profitability | Core release J11; additional industry specialization requires estimate |
| Field service | Dispatch → technician work → parts → completion → invoice | Inventory, service, mobile and offline decision |
| POS/ecommerce | Catalog → cart/till → payment → fulfill/return → settlement | Sales/stock/payment provider and outage behavior |
| Payroll | Approved time → calculation → deductions → payout → statutory output → GL | Jurisdiction rules, qualified specialist, sensitive-data controls |
| Healthcare/education/real estate | Actual role-specific lifecycle and jurisdiction/data obligations | Product discovery and qualified domain acceptance |
| Remaining industry clouds | Define distinct required workflows; reuse shared capabilities; prove industry invariants | A schema name or screen is not industry qualification |
| Advanced analytics/AI | Governed semantics → evaluation → authorized action → human review → audit/cost control | Data lineage, privacy, safety and actual customer need |
| Public developer/extensions | Credentials → signed extension → capability checks → sandbox → revoke/upgrade | Threat model, compatibility, quotas, egress and kill switch |
| Marketplace | Publish/review → buy → install → upgrade → uninstall/revoke/refund | Developer runtime, entitlements, billing and lifecycle recovery |
| Sites/studio | Edit → preview → publish → domain/TLS → rollback → recover | Content isolation, asset security and public runtime operations |
| Native mobile/desktop/PWA | Supported journeys → local state → network loss → conflict/sync → update/revoke | Device security, signing/distribution and explicit support matrix |
| Blockchain/advanced audit | Defined assurance need → append/prove/verify → recover | Avoid introducing a second authoritative business ledger |
| Multi-region/sovereign/global scale | Placement → residency → relocation/failover → reconcile | Measured need; FND-P3/P4 gates and funded operations |

Each row must be marked included, deferred with owner/date, or not applicable during scope review. If “all functionality” is mandatory, every row's accepted workflows joins the release denominator, and the schedule is re-estimated. No silent partial launch under a full-product claim.

## 8. Definition of production-grade and release gates

These are conjunctive gates: every applicable gate must pass. A high average score cannot compensate for a failed isolation or recovery control.

| Gate | Required evidence | Decision owner |
| --- | --- | --- |
| G0 Scope | Signed workflow/service inventory, named team, supported customers/devices, NFR/load envelope and capacity fit | Product + Engineering |
| G1 Critical foundation | All required P0 acceptance evidence, no unresolved critical integrity/security gaps | Architecture + Security + Data |
| G2 Expansion | Foundation plan's complete P0/P1 continuation checklist, including whole-estate scope where mandated | Product + Architecture + Security + Data |
| G3 Feature complete | Every committed journey and failure/reversal path works; consumers integrated; UAT scripts ready | Domain owners + QA |
| G4 Pilot eligible | Security, a11y, load, migration, backup/restore and release rehearsals pass; support ready | Security + QA + SRE |
| G5 Release eligible | Accepted pilot/UAT, exact-build regression, no release-blocking defects, current evidence and authorized release action | Accountable release owner + required approvers |

Acceptance rules:

- Zero known cross-tenant access, provider/tenant escalation, unexplained ledger imbalance, lost mandatory audit/outbox effects, or duplicate money/stock effects.
- No open critical/high security or data-integrity defect; no known defect that blocks a committed critical journey. Lower-severity exceptions require an owner, customer impact, mitigation and dated fix.
- Every tenant-owned table and affected access path has applicable positive/negative/no-context proof using the correct database role. Superuser tests do not count.
- All committed journeys have reproducible exact-build evidence. No required test is skipped, suppressed, or counted as passing because nothing was discovered.
- SLOs and volume envelopes are approved in W1. ADR-0010's sub-100ms P99 transaction target remains an authority to measure against; define operation/measurement boundary and load. Do not silently substitute a looser target. If infeasible, record evidence and seek an explicit ADR decision.
- Proposed availability planning target is 99.9% monthly for critical services, pending owner review; prelaunch tests cannot prove a month of production availability. Implement the measurement/error-budget mechanism and qualify failure behavior.
- Proposed recovery planning targets are RPO ≤15 minutes and RTO ≤4 hours for core business data, pending per-data-class owner agreement. These are proposals, not achieved claims; assess tighter financial/event requirements and reconciliation explicitly.
- Business UAT checks outcomes and balances, not merely route reachability. Performance checks publish dataset, tenant distribution, concurrency, duration, p50/p95/p99, error rate and resource cost.
- No certification claim is created by this plan. Any SOC/ISO or jurisdiction claim needs its own authorized scope and independent evidence.

## 9. Verification catalogue and evidence handling

Commands below were read from current package manifests or the canonical protocol. They are execution-plan entries, **not results from this drafting task**. Inspect configuration before running setup or integration helpers against any data. Use disposable environments and obtain required environment authorization.

| Working directory | Existing command examples | Proof / additional requirement |
| --- | --- | --- |
| unierp-workspace | `pnpm check:active-estate`; `pnpm check:repository-inventory`; `pnpm check:ai-agent-protocol`; `pnpm test:discovery-gates`; `pnpm test:layer` | Inventory/governance; representative broken discovery must fail |
| unierp-contracts | `pnpm typecheck`; `pnpm test`; `pnpm build`; `pnpm check:control-center-contracts` | Contract validation plus actual provider/consumer compatibility |
| api | `pnpm typecheck`; `pnpm lint`; `pnpm test`; `pnpm security:plane1`; `pnpm build` | Add/select actual domain, authorization and real integration suites per packet |
| data | `pnpm db:generate`; `pnpm typecheck`; `pnpm lint`; `pnpm test`; `pnpm build` | Also disposable-DB migrations, application-role RLS and recovery evidence |
| tenant-apps | `pnpm check:tokens`; `pnpm typecheck`; `pnpm lint`; `pnpm test`; `pnpm test:e2e:journeys`; `pnpm build` | Manifest test currently permits no tests: require independent nonzero discovery; browser plus manual accessibility |
| Other affected repositories | Select actual scripts from each repository manifest | No invented universal all-services test command |
| Operations/external integrations | Record actual approved rehearsal commands in the work packet | Real environment evidence, costs and exact action authorization |

Standard test identity comes from the workspace policy through secure test configuration; do not copy credentials into this roadmap or evidence. Permission-negative tests need sanctioned least-privilege test contexts and separate tenant fixtures; the universal administrator alone cannot prove authorization. Fixtures remain synthetic and controlled.

Evidence record fields: requirement/journey, ticket, repository SHAs, immutable artifact digest, environment/configuration identity, dataset/load envelope, exact command, discovered/executed/skipped counts, result, reviewer, timestamp/expiry, telemetry and recovery links. Redact sensitive information. Changes to relevant code/configuration invalidate affected evidence and require rerun.

Progress reporting: maintain separate counts for designed, implemented, integrated, tested, operationally qualified and released. Workflow completion = fully qualified committed journeys / total committed journeys. Service readiness = fully qualified required services / total required services. Every denominator is versioned with scope decisions. Do not publish an invented current percentage.

## 10. Risks and decision triggers

| Risk | Trigger | Required response |
| --- | --- | --- |
| Unbounded scope | Full-estate workflows exceed staffed capacity in W1 | Choose scope/date/resources explicitly; retain unselected work in backlog |
| False-green evidence | Zero-target/skipped/static-only gates or incompatible ledgers | Fix evidence mechanism before using it for release decisions |
| Foundation delay | G1/G2 fail | Continue remediation; move dependent milestones and forecast |
| Domain correctness | Stock/financial mismatch, replay/concurrency corruption | Stop qualification, repair/reconcile, rerun affected journeys |
| External dependencies | IdP/payment/email/cloud sandbox unavailable | Escalate to named owner in W1; do independent work; no fake qualification |
| Migration/data volume | Backfill exceeds budget or restore misses target | Rework design and rehearse; do not gamble on production |
| Lack of independent review | Same person authors and self-certifies a critical control | Schedule qualified reviewer before pilot admission |
| Holiday launch | No qualified on-call/incident response Jan 1 | Choose a staffed rollout window with product owner |

Daily: short dependency/blocker review and actual gate results. Weekly: integrated workflow demo, defect and evidence review, capacity forecast, burn-up against unchanged scope, and owner decisions. At W2/W3/W8/W10/W12 publish explicit gate outcome. At launch use health plus business reconciliation checks; abort/pause expansion on security leakage, incorrect postings, failing migrations, or breached agreed health thresholds.

## 11. First five working days

| Day | Deliverable |
| --- | --- |
| Monday | Confirm date/customer/release breadth; assign owners; record exact repository baseline |
| Tuesday | Walk J01–J10 and all service dependencies; classify existing implementation/proof gaps |
| Wednesday | Refresh foundation evidence, trace endpoints/data/permissions, identify false-green gates |
| Thursday | Estimate tickets, establish load/recovery/NFR contract, reserve real test/vendor environments |
| Friday | Review feasible scope and critical path; accept G0 or publish explicit reforecast; start highest-priority approved remediation |

## 12. Planning change contract and cycle record

Risk: R1 local documentation. Future cross-repository implementation is R2; restricted environment/release actions remain R3. Direct change: this roadmap and its machine-readable backlog in `unierp-workspace/governance`. Coordination: all catalog platforms; data/contracts remain with their existing owners. Requirement basis: UNI-BR-001–007, UNI-FR-001–008, UNI-NFR-001–010, ERP-FR-001–008 and applicable platform requirements; new analytics requirements remain subject to their owning specification.

Knowledge delta: UPDATED — adds dated operational sequencing and backlog, linking existing authority without changing product commitments or the accepted foundation plan. No schema, API, permission, runtime, dependency, UI or infrastructure mutation. No migration, deployment, commit/push or external publication. Compatibility impact: none. Rollback: remove only these new planning artifacts if rejected. Future execution must define migration, rollout/roll-forward, privacy, tenant, event, UX and operational proof per packet.

Draft acceptance criteria: (1) evidence-grounded baseline; (2) explicit timing/capacity assumptions; (3) complete estate/service disposition; (4) sequenced checklist with ownership/dependencies; (5) measurable release gates and risk actions; (6) durable reviewable planning artifacts. A completed draft does not mean the product is implemented, tested, deployed or released.

Machine-readable companion: [74-task backlog](UNIERP_FIRST_RELEASE_BACKLOG_2026-09-18.json). Generated from the R01–R74 checklist using PowerShell regex extraction on 2026-09-18; scheduling/role/dependency fields are proposed planning metadata, not implementation observations. Named people, estimates and evidence intentionally remain unassigned. Refine packet-level dependencies when decomposing tickets; scheduling metadata does not override the gates above. Edit this roadmap's tasks first, then synchronize the companion.

Cycle status: **DONE — roadmap drafting objective only**.

- Completed: all six draft acceptance criteria; incorporated the confirmed date, core-first/revenue-first direction and design-first strategy; reviewed both new artifacts and preserved existing work.
- Incomplete within drafting scope: none. Execution decisions still required: named staffing, definition/depth of each core module, jurisdiction, workload, first industry and customer commitments. These are explicit Week 1–2 tasks, not claimed approvals.
- Verification PASS: `node unierp-workspace/governance/skills/unierp-enterprise-brain/scripts/validate-brain.mjs` discovered 6 skill artifacts and 31 repositories; local-link validation; JSON parsing; 74 unique checklist/backlog IDs; dependency references and acyclic graph validation; new-file whitespace review and `git -C unierp-workspace diff --check`.
- Verification correction: initial backlog validation exposed PowerShell's serialization of empty/singleton dependencies as null/scalars. Normalized all dependency lists to arrays and reran successfully. No outstanding artifact-validation failure remains.
- Product verification NOT RUN: application tests, RLS, cloud, migration, performance, accessibility and recovery suites; this task changes planning documents only and makes no new product qualification claim.
- Designed: YES for roadmap. Implemented: YES for planning artifacts only. Tested: YES for artifact consistency, product testing not performed. Integrated: NO new product integration. Deployed: NO. Released: NO.
- Next required action: product/engineering owners allocate named capacity and execute R01–R08/R65/R69, then commit a feasible baseline at G0. No production authorization is implied.
