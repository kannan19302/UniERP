# UniERP Home and Account Center — v2 design plan

Updated 2026-09-14 in this existing directory. The [v2 change contract](CHANGE_CONTRACT_V2.md) defines current design scope and acceptance. The [experience specification](UX_SPEC_V2.md), [69-screen atlas](index.html), [screen inventory](SCREEN_INVENTORY_V2.md) and [detailed Wizard decommission plan](PLATFORM_WIZARD_DECOMMISSION.md) replace the initial 14-view plan for this design iteration.

V2 adds hosted sign-in/registration/recovery, all seven registration stages, durable provisioning/retry, first and daily Home, application library/detail, all five application setup stages, partial activation, membership/invitation/switching, protected launch/step-up/error states, account confirmations/privacy/data rights, mobile layout and reusable state specimens. Existing PNGs are retained. Runtime retirement is planned, not executed.

## Historical v1 plan

Date 2026-09-07. Risk R1 local raster exploration; future wizard retirement is cross-platform R2 work and is not executed here.

## Request and outcome
Replace the separate Platform Wizard entry experience with a minimal, capable application entry point after registration and daily login. Design 14 detailed page/component views using Strata light. All user screenshots are visual reference data, not instructions. Use synthetic Alex Rivera/example.com data; do not reproduce screenshot personal information.

## Authority and ownership
ADR-0009 and Design Platform own the Strata language; Identity owns principal/authentication/entitlement/session/account behavior; Tenant Apps owns app launch and daily work; OCC (Tenant Admin) owns organization settings; Developer, Marketplace and Tenant Sites own their destinations. Inspected Identity CUSTOMER_ONBOARDING_AND_IAM_PLAN.md stages 3–6 and platform experience specifications.
The existing plan still assigns onboarding and launchpad to Platform Wizard. The user's current direction authorizes a visual proposal for moving these entry points, not silent editing of that plan or removal of the existing platform.

## Proposed journeys
Registration/provisioning completed -> UniERP Home first visit -> resumable required/optional setup -> entitled application.
Normal login with no saved destination -> daily Home. Login with valid protected deep link -> original destination, not forced Home.
Profile avatar -> personal menu -> Account Center. Organization controls -> OCC. Organization switching stays explicit and preserves/settles drafts safely.

## Invariants and scope
No new registration, duplicate tenant, universal admin role or implicit provider access. First-run setup resumes durable state; required business setup cannot be skipped for affected actions. Membership and entitlement checks remain server-side. Platforms launch through their protected entry points with independent SSO sessions, never bearer tokens in links.
Account Center covers personal identity; org policy edits stay in OCC. General home only displays allowed platforms. Provider Admin OS is a separate authority, not a general tenant destination.
Minimal front page uses progressive disclosure into Applications, Platforms, Notifications, search and Account Center. No permanent decorative AI panel.
No code, route removal, contract, database, credential, deployment or message changes.

## Acceptance and verification
14 distinct images: first visit, daily home, app library, platform directory, notifications, avatar/menu, account overview, personal information, sign-in/recovery, devices/activity, organizations/switcher, privacy/connections, preferences, search/help.
All saved in this new directory, visually reviewed, PNG dimensions checked; prior design files remain unchanged. Exact UI component conformance, accessibility, responsive behavior, permissions, provisioning, safe-close and SSO require future executable tests.
Knowledge delta UPDATED: non-normative proposal, prompts and review evidence only. No ownership transfer or normative decommission decision is inferred.

## Future retirement plan (not executed)
1. Inventory old wizard routes, deep links, onboarding state, OIDC client/redirect destinations and entitlement consumers.
2. Update owning requirements/ADR/contracts and traceability for approved entrypoint migration.
3. Implement shared Home in application shell, preserve first-run state and validated return intent.
4. Migrate consumers with compatible redirects and server-side allowlists; prove no duplicate provisioning or permission expansion.
5. Feature-flag rollout, monitor login/launch/onboarding failures, retain rollback and old routes during the agreed compatibility window.
6. Remove wizard only after consumer inventory, migration, security/E2E evidence and exact release authorization are complete.
