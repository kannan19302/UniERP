# Home v2 design change contract

2026-09-14 • Protocol 1.1.0 • Non-normative proposal

## 1. Request and outcome
Extend this existing folder with a complete Home/account journey design and a concrete Platform Wizard retirement plan. Preserve every v1 PNG. Deliver a linked, responsive screen atlas, screen/state inventory, migration plan and local verification evidence. Scope ends at design artifacts; production implementation, removal, deployment and publication are excluded.

## 2. Authority and ownership
R1 local design artifacts; proposed implementation is R2 coordinated work and eventual removal/release is R3. PLT-DS owns visual patterns; PLT-IAM owns hosted identity, principal, membership resolution, sessions and entitlement; PLT-ERP owns daily work and proposed Home client; PLT-TAD owns organization configuration; PLT-MKT owns installations; PLT-DEV and PLT-SITE own destination experiences; PLT-OPS owns runtime retirement. Named accountable people must be assigned before execution.

Inspected: workspace AGENTS, AI_AGENT_DEVELOPMENT_PROTOCOL, AI_KNOWLEDGE_LIFECYCLE, enterprise-brain references, PLATFORM_CATALOG, ADR-0009, identity EXPERIENCE (IAM-UX-001–006), CUSTOMER_ONBOARDING_AND_IAM_PLAN stages 0–7, existing folder README/plan/images, wizard page, workspace-service, preferences, OIDC config, consuming app header/auth shell and infrastructure/tooling references.

Conflict: the IAM target-state draft still names Platform Wizard as launchpad. This proposal explicitly proposes its replacement; it does not silently supersede authority. The lower-level market rules request broad remediation and automatic push; the canonical protocol and this request limit work to local design, with publication requiring exact authorization. No publication is attempted. D:\UniERP is not a Git repository; preserve artifacts and use a hash manifest rather than claim a clean Git diff.

## 3. Decisions and assumptions
Keep Strata light and the existing information architecture. Interpret “application wizard” as guided selection/configuration of entitled business apps within Home, not a new platform-choice gateway. Home, Applications, Setup, Platforms and Account are one discoverable experience; identity remains hosted. Daily sign-in means returning-user authentication and landing, not employee attendance tracking. External platform destination internals and ERP transaction screens are outside this Home scope.

## 4. Change design
The v1 set has 14 happy-path concepts. V2 adds hosted identity, every registration step, resumable setup, provisioning recovery, application activation, handoffs and exceptional states. Invariants: server-verified membership, no implicit PCC access, no token URLs, no local-success provisioning, no duplicate tenant/installation on retry. Personal account persists independently of tenant access. Durable writes and events retain owning transaction/outbox semantics.

The atlas is a local visual specimen with synthetic content, native HTML and semantic token mappings, not a production component implementation. Production must compose @kannan19302/ui. No endpoints, contracts, schemas, permissions or packages are introduced. No customer data, credentials or authentication are used. Form entries are not persisted or transmitted. Network, retention, residency and audit changes: none in this artifact; owning requirements govern implementation.

States: loading, empty, partial, stale, validation, conflict, forbidden, not found, offline, retry and confirmation. Responsive shell changes to a compact header/menu at narrow widths; labels remain visible; focus styles, native controls and status announcements are specified. Screen-reader and real backend evidence remain future implementation gates. No new dependencies/licenses/costs. Runtime performance and telemetry targets are proposals in the retirement plan.

## 5. Delivery safety
All writes stay in the requested folder. Original PNG hashes are retained. Future rollout, compatibility, rollback, data reconciliation, owners and gate criteria are in PLATFORM_WIZARD_DECOMMISSION.md. No release authorization inferred.

## 6. Verification plan
Validate unique screen IDs, all navigation targets and local links, nonzero coverage, JavaScript syntax, all screens at desktop/mobile widths, no horizontal overflow/browser errors, selected navigation/form/state interactions, representative screenshots and unchanged v1 PNG hashes. Inspect final added files and changed Markdown. Exact commands/results go in VERIFICATION_V2.md.

Production typecheck/lint/build, token package gate, IAM/API/RLS/SSO, live provisioning, assistive-technology, integration and deployment checks are not applicable to static design acceptance and are mandatory before runtime rollout. Do not label prototype navigation as real workflow verification.

## 7. Knowledge delta
UPDATED: design-only proposal, coverage matrix, decommission plan and evidence in this folder. No normative owner transfer or accepted ADR change. Brain routing is unchanged; validator is not required by its trigger list. Before implementation update owning IAM/ERP/TAD/DS requirements and traceability, accepted decision and public contracts as listed in the retirement plan. No global ledger percentage is claimed.
