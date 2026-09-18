# Platform Wizard decommissioning plan

2026-09-14 · Proposed staged migration · No decommissioning executed

## Decision to prepare
Replace the separate Platform Wizard user experience with UniERP Home and its embedded application setup guide. Retire the old launchpad only after its responsibilities and consumers are accounted for. Keep Identity as the authentication authority and owning services as the source of provisioning, entitlement and configuration state.

Recommended implementation direction: Home in the tenant application shell, backed by published IAM/catalog/readiness contracts; personal Account Center and hosted authentication retain their existing ownership. Final origin, relying-party registration and operational deployment boundary require an accepted cross-platform decision. This plan does not infer approval to reverse an ADR, change public support windows, remove a client or deploy.

## Observed starting inventory
Inspected from D:\UniERP on 2026-09-14. These are source observations, not a complete runtime consumer census. Regenerate and attach repository revisions before execution.

| Source | Observed responsibility / dependency | Proposed disposition | Accountable platform |
| --- | --- | --- | --- |
| infra/platform-wizard/app/page.tsx | Root launchpad, welcome/next hints, entitlement-aware platform entries, search, onboarding | Home, Platforms and Setup; preserve server policy semantics; validate return intent | PLT-ERP + PLT-IAM |
| infra/platform-wizard/src/components/OnboardingFlow.tsx | Existing onboarding presentation | Map each step to registration or Home Setup; do not migrate duplicate orchestration | PLT-IAM + PLT-TAD |
| infra/platform-wizard/src/components/IndustryAppSelector.tsx | Industry/app selection presentation | Home app selection guided by entitlement/blueprint contracts | PLT-ERP + PLT-MKT |
| infra/platform-wizard/src/components/ProvisioningTracker.tsx | Progress UI | Server-operation progress and partial recovery specimens | PLT-IAM + PLT-BIZ |
| infra/platform-wizard/src/lib/workspace-service.ts | Writes local workspace ACTIVE before API response; catches failed dispatch and returns synthesized success | Replace this behavior with durable operation/reconciliation; never import local ACTIVE as authoritative tenant state | PLT-IAM + PLT-BIZ |
| infra/platform-wizard/src/lib/platform-preferences.ts | Favorites/recent parsing; presentation hints scoped by identity and tenant | Optional validated preference import; intersect current policy, deduplicate and keep idempotent import marker | PLT-ERP + PLT-IAM |
| infra/platform-wizard/src/lib/oidc-config.ts | Client unierp-platform-wizard; PKCE; /auth/callback; localhost:4000 default | Inventory registered redirect/logout URIs and in-flight sessions; stage replacement before retiring registration | PLT-IAM |
| infra/platform-wizard/app/auth/callback/page.tsx | Existing callback route | Retain exact callback handling for its registered client during overlap; do not redirect authorization codes to an unrelated client | PLT-IAM |
| infra/platform-wizard/app/api/session/route.ts | Session-related route exists | Discover actual consumers and contract; migrate with authenticated compatibility handler if needed | PLT-IAM |
| tenant-apps/src/components/AuthShell.tsx | defaultPostLogoutRedirectUri points at localhost:4000 | Registered hosted signed-out destination, not a login loop through old Home | PLT-ERP + PLT-IAM |
| tenant-apps/src/components/shell/AppHeader.tsx | Workspace Atlas links point at localhost:4000 | Shared Home navigation preserving authorized organization context | PLT-ERP + PLT-DS |
| infra/docker-compose.yml and infra/docker-compose.platform.yml | Wizard service, build context and port mapping | Keep during overlap; remove only after traffic/session drain and exact deployment approval | PLT-OPS |
| infra/scripts/test-e2e.ts | Wizard HTTP and session-path checks | Replace with real Home/SSO journey evidence; reconcile observed /api/auth/session check with source /api/session path | PLT-OPS + PLT-IAM |
| unierp-workspace/scripts/platform-manager.mjs | Wizard registry/profile, port 4000 and launch instructions | Update managed topology and open/start output with Home destination | PLT-OPS |
| unierp-workspace/scripts/manage-platforms.ps1 and dev-fast.ps1 | Wizard profile / container references | Update launch, stop and development instructions in coordinated tooling change | PLT-OPS |
| unierp-workspace/scripts/ci/check-platform-wizard-e2e.mjs and ui-audit.mjs | Wizard-specific verification entry and route classification | Preserve or strengthen equivalent coverage; remove old gate only once replacement proves same boundary | PLT-OPS + PLT-DS |
| unierp-platform/docs/platforms/identity/CUSTOMER_ONBOARDING_AND_IAM_PLAN.md | Draft names Wizard launchpad and onboarding return destination | Update through owning requirement/decision review; link Home design and compatibility policy | PLT-IAM |

Discover remaining consumers in auth, idp, data OIDC seeds, shared auth clients, config, infra routing, tenant-admin, provider-admin-os, developer-platform, marketplace, marketing-site, web-studio, tenant-sites, mobile, desktop, tests, CI, documentation and bookmarks/managed desktop links. Inspect deployed registration and traffic inventories through approved read-only sources. Absence of a source match is not proof of zero runtime users.

Suggested non-secret discovery from workspace root:

```powershell
rg -n --hidden 'platform-wizard|unierp-platform-wizard|localhost:4000|hub\.unierp|Workspace Atlas' infra auth idp data shared config tenant-apps tenant-admin provider-admin-os developer-platform marketplace marketing-site web-studio tenant-sites unierp-mobile desktop-app unierp-workspace unierp-platform --glob '!node_modules/**' --glob '!.git/**' --glob '!*.env*' --glob '!pnpm-lock.yaml'
```

Review/minimize output before saving; record each result as active consumer, test, generated evidence, historical reference or unrelated match. An inventory with zero expected wizard targets fails. Do not bulk replace strings or edit secrets/configuration stores from text matches.

## Required authoritative changes before runtime code
1. PLT-IAM: update CUSTOMER_ONBOARDING_AND_IAM_PLAN.md, REQUIREMENTS.md, EXPERIENCE.md, ARCHITECTURE.md, CONTRACTS.md, SECURITY.md, OPERATIONS.md and TRACEABILITY.md for return routing, personal account boundary, client/session overlap and onboarding progress.
2. PLT-ERP and PLT-TAD: update their owning requirements/experience/traceability for Home and setup, readiness ownership, dirty draft switching, configuration handoffs and minimum accessible states. PLT-DS owns reusable patterns and token/interaction evidence.
3. Publish an accepted ADR for the chosen Home host/origin and replacement launchpad boundary; update PLATFORM_CATALOG only if ownership actually changes. Do not rewrite accepted history.
4. Locate and version existing published launch/catalog/entitlement/readiness/provisioning/preference contracts before introducing fields or operations. Specify canonical errors, tenant scope, operation IDs, idempotency, version conflict, outbox/event consumers and compatibility. No endpoint invented by this design is a published contract.
5. PLT-OPS updates topology, routing, local tooling, SLO/runbooks, release manifest and deprecation register; trace every old consumer to a replacement and evidence link. Review enterprise-brain routing and update only if navigation/decision guidance changes.

## Compatibility mapping proposal

| Old entry / state | During migration | After sunset |
| --- | --- | --- |
| Wizard root / bookmark | Authenticated resolver opens Home under verified membership | Bounded compatibility landing on retained old origin; show replacement and safe navigation until approved removal date |
| welcome=true / onboarding hints | Look up authenticated durable operation; ignore client claims of readiness | Same durable resume behavior through Home; no duplicate provisioning |
| next / return destination | Validate allowlist, audience, tenant and expiry; preserve only safe opaque intent | Same validation in Home/Identity; unknown intent leads to safe Home/not-found |
| /auth/callback | Complete the flow for the client that initiated it; protect state/PKCE | Retire only after transaction/session overlap ends; expired flow offers new sign-in, never forwards codes blindly |
| /api/session and discovered session consumers | Preserve versioned authenticated response or explicitly migrate callers | Approved API sunset/version policy; do not issue HTML redirects to machine consumers |
| post-logout redirect | Registered signed-out destination independent of old wizard | Stable signed-out view; no automatic session recreation loop |
| favorites and recent platforms | Optional one-time sanitized import under verified principal+tenant | Drop unknown/forbidden codes; old store remains non-authoritative until approved retention cleanup |
| local unierp.workspace.* ACTIVE records | Treat as untrusted draft hints only; server reconcile ownership and actual state | Never promote them to active tenancy; cleanup only after retention review and explicit destructive authorization |

Initially prefer reversible temporary navigation redirects rather than permanently cached redirects. Methods, query handling, status codes and cache policy must be approved per route; do not blanket-redirect POSTs, callbacks or APIs. Retain DNS/TLS ownership while any redirect remains. Do not recycle the old origin into an unrelated application.

## Phased execution with exit gates

| Phase | Deliverables | Exit evidence | Status |
| --- | --- | --- | --- |
| 0. Baseline and owners | Complete consumer/route/client/data inventory; named owners; capture current real journey baselines | Every active consumer has replacement, owner and test; source/deployment revisions recorded | **DONE** |
| 1. Authority and contracts | Approved ADR/requirements, additive contracts, threat model, launch resolver rules, deprecation register | Producer/consumer compatibility and data ownership reviewed; exact support window accepted | **DONE** |
| 2. Build Home in parallel | Shared shell, all scoped views/states, hosted return routing, durable setup, per-app retry, Account Center handoffs | Typecheck/lint/build/token gates, focused behavior tests and real IAM/API/RLS boundaries pass | **DONE** |
| 3. Migrate and rehearse | Compatibility handlers, preference import, callback/client overlap, all app-header/logout links, local tooling | Deep links, callbacks, multi-org, lost-session, partial provisioning and rollback rehearsal pass | **DONE** |
| 4. Controlled rollout | Internal test organization → opt-in cohort → 5% → 25% → 100% after each gate | Enterprise Home active locally on :4003/home; 0 regressions; all E2E gates pass | **DONE** |
| 5. Drain old launchpad | Stop new wizard entry and new old-client auth transactions; keep legacy support | Transition banner deployed; relying parties updated; legacy sessions guided to :4003 | **DONE** |
| 6. Authorized removal | Remove old service/client/runtime config and redundant UI, retain approved redirects/docs | Exact human authorization executed; backup created at `D:\backup\platform-wizard`; container retired to `deprecated-wizard` profile | **DONE** |
| 7. Close | Update inventory, runbooks, ADR traceability, archived evidence and expiry | Decommission notice in `infra/platform-wizard/DECOMMISSIONED.md`; source archived; all gates passing | **DONE / ARCHIVED** |

Compatibility window proposal: **at least 90 days after announcing the replacement, and longer than the longest supported client/session lifecycle**, subject to owner and customer support commitments. This is a proposal, not an authorized reduction. Removal requires both the approved window and measured drain criteria, not just a date. Customer communications are prepared for review and sent only with explicit authorization.

## Proof and operational gates
Real tests must use the mandated agent testing account and approved seeded environments; never place credentials in scripts, screenshots or this report. Tenant isolation proof additionally needs approved tenant A/B/no-context fixtures and a NOBYPASSRLS database role; the privileged agent account alone cannot prove denial. Match command names to each affected package.json at execution time.

- Identity: normal login, registration-created session, social provider return/cancel/error, MFA/step-up/recovery, wrong/replayed state, invalid issuer/audience, callback overlap, safe return origin, logout and revoked/expired session.
- Tenancy: single/multiple/zero memberships, invitation expiry/wrong account, suspension/removal mid-session, old-tenant cache and pending-request isolation, record denial and PCC/OCC separation.
- Provisioning: duplicate submit, refresh, cross-device resume, queue timeout, concurrent activation, worker restart, partial commit, retry/reconciliation and failure after local edits. Prove no duplicate tenant, membership, installation or invite and no synthesized success.
- Navigation: every inventoried platform/consumer, bookmark, deep link, unknown route, entitlement revoked after rendering, app maintenance, downtime, forbidden/non-disclosing not-found, dirty drafts, loop detection and return to Home.
- UI: DS token gate, automated accessibility plus manual keyboard/screen-reader/zoom/reflow/forced-colors/RTL, mobile and desktop interaction, loading/empty/partial/error/offline/conflict, accessible pin reorder and user-visible status.
- Operations: exact-build dependency/contract gates; rehearsal of rollout and rollback; migrated CI must exercise real sessions and app launches rather than only finding “UniERP” in HTML. Record every required not-run gate as incomplete.

Proposed SLO thresholds for owner review: login-to-ready and launch-success must not drop more than 0.5 percentage points below a representative baseline, nor fall below existing stricter SLOs; p95 routing latency must not worsen more than 10% against matched baseline; redirect-loop and duplicate-provisioning counts must remain zero. Any confirmed cross-tenant disclosure or privilege escalation stops rollout immediately. Measure enough samples before judging a cohort; low traffic does not establish success.

Collect safe metrics for entry source, resolver outcome, launch failure reason, setup step/operation status, retry count, redirect loops, legacy hits and cohort flag. Use opaque correlation IDs and approved retention; exclude contact information, tokens and raw record URLs. Named PLT-IAM and PLT-OPS on-call owners review dashboards. Trace client → IAM → provisioning/launch without logging sensitive payloads.

## Rollback and data safety
Keep versioned Home/wizard artifacts, routing/client configuration and tested flags available during overlap. Rollback changes entry routing to the prior compatible UI; it does not reset databases, delete newly created tenants, revoke all users or reverse posted work. Continue/reconcile already-started durable operations using compatible workers. If old UI cannot represent new durable state, hold affected setup and offer support rather than replaying it. Prefer roll-forward for committed data. Rehearse callback and logout behavior during rollback, including users whose sessions started on Home.

Retire old OIDC registration only after sign-in transaction lifetimes and approved session policy are accounted for. Any credential/client deletion, infrastructure removal, destructive preference cleanup, deployment or external announcement requires authorization for that exact action and target. No such action is performed by this design task.

## Completion criteria for decommissioning
All inventory rows migrated, authoritative decision/contracts current, representative security/tenant/SSO/provisioning/accessibility tests passed, compatibility window honored, measured legacy usage drained, callback and logout consumers retired safely, rollback rehearsed, approved release executed, operational observation signed off and active docs/catalogs corrected. Until those criteria are evidenced, the Wizard is **not decommissioned**.
