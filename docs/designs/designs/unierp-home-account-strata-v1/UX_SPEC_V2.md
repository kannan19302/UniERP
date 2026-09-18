# UniERP Home v2 — experience specification

2026-09-14 · Proposed design · Same delivery folder as v1

## Outcome and scope
One predictable entry experience from registration through daily work. Home is a workspace, Applications is a library, Application setup is a resumable task, and Platforms is a directory. A platform selection step is never inserted before every app launch. The hosted Identity UI and personal Account Center remain owned by Identity; their inclusion in this atlas unifies the journey without combining trust boundaries.

“All screens” covers this bounded Home, authentication, onboarding, application setup, navigation and personal account journey. It does not mean all ERP business records, Marketplace checkout, Developer tools, OCC settings or website-editor screens. Their handoffs are designed here and their internals remain with the owning platform. “Daily sign-in” means repeat authentication and return routing, not attendance or payroll clock-in.

## Visual direction and v1 → v2 changes
Preserve the v1 Strata light identity: Slate 50 canvas, white workspace surfaces, cobalt actions, slate text, restrained borders, geometric headings and comfortable onboarding density. Token snapshot is in v2-tokens.css, mapped to ADR-0009 and the Strata token catalogue. The standalone artifact uses system font fallbacks if Inter / Plus Jakarta Sans are not installed; production loads the approved fonts and @kannan19302/ui components.

Layout: fixed-height global header, stable left navigation, left-aligned page title and primary content. The daily workspace prioritizes pinned apps, recent work and attention, with cross-platform destinations below. Identity uses a centered, single-purpose card width and no tenant/realm selector. Setup keeps context visible and places a sequential progress indicator above its form. No decorative AI panel or repeated statistics tiles are added.

```text
Daily / Account / Setup             Hosted Identity
┌ brand · org · search · profile ┐  ┌          UniERP           ┐
├ nav ┬ title / scope ───────────┤  │    title + explanation    │
│     │ primary workspace       │  │    step / form / action   │
│     │ secondary work / help   │  │    alternate safe path    │
└─────┴─────────────────────────┘  └───────────────────────────┘
```

The review toolbar and bottom behavior notes belong to the design atlas, not the product. They provide direct screen/state access. Actions navigate specimens; form values, personal preferences, invitations, account changes and provisioning are neither persisted nor transmitted. Placeholder field text illustrates content and is not a saved value. The trial offer is deliberately a data slot rather than invented pricing.

The first 14 v1 themes are retained and refreshed: first visit, daily Home, applications, directory, notifications, profile, account overview, personal information, security, devices, organizations, privacy, preferences, and search/help. Missing flows are added as individual screen specimens, including every registration step and every application setup stage. See the generated [screen inventory](SCREEN_INVENTORY_V2.md) for the exact denominator and exports.

## Journey and routing contract proposal

| Entry | Required decision | Destination | Failure / alternative |
| --- | --- | --- | --- |
| Marketing registration intent | Validate signed offer and return intent | Hosted account → verification → security → organization → defaults → trial/apps → review | Invalid offer uses a safe re-selection; do not silently accept changed commercial terms |
| Registration submitted | Durable idempotent provisioning | Pending → first-run Home only on confirmed completion | Saved operation → retry incomplete steps → support reference |
| Ordinary sign-in | Verify identity and required assurance | Resolve memberships → daily Home | No membership, multiple memberships, federation failure, recovery |
| Protected deep link | Validate destination and tenant; reauthorize record | Resume original permitted destination | Organization choice, step-up, forbidden/not-found or maintenance |
| Returning user with incomplete setup | Load durable readiness | Daily Home with resumable task | Only affected transactions restricted; no repeated forced tour |
| Accepted invitation | Verify invited identity, expiry and offered membership | Target organization Home | Wrong account → sign in safely; expired/revoked → request a fresh invitation |
| App selection | Check discovery, entitlement, lifecycle, permission, assurance | Launch handoff → destination | Setup required, forbidden, step-up, outage or maintenance |
| Organization switch | Resolve drafts and verify target membership | Target Home with fresh caches and permissions | Failed switch retains prior organization; no mixed-context records |
| Expired session | Reauthenticate with bounded saved intent | Revalidate and resume | Never automatically repeat a non-idempotent write |
| Logout | Confirm scope and resolve unsaved work | Registered signed-out destination | Disclose partial logout; do not imply all providers/devices are signed out |

First-run status comes from durable state, not `welcome=true`, the calendar day or a local flag. Keep return intent short-lived, opaque and server validated. Never place contact information, bearer tokens or raw business context in a URL. A post-login tenant chooser is permitted; an untrusted tenant/authority input on hosted sign-in is not.

## Application setup, not a platform gate
Five stages: choose entitled apps → evaluate readiness → configure through owning domains → review team access → review and activate. Setup saves acknowledged progress and resumes across devices. Each readiness item identifies its owner, effect, required/optional status and next action. Finance requires its approved fiscal/calendar/chart setup; Inventory requires approved locations and unit semantics. Actual predicate IDs and contracts must be confirmed with owners before implementation.

Selections are preferences until the backend authorizes activation. Dependencies, prerequisites, limits and installation status must come from contracts. No duplicate entitlement or provisioning store in Home. Commercial purchases and paid consent go to Marketplace; organization policies and role assignments go to OCC. Invites remain optional, with explicit review before messages are sent. Non-admin users receive an administrator handoff instead of an editable policy form.

Activation uses one durable operation; repeated submits and resume requests cannot duplicate installations or invitations. A partial failure keeps completed apps visible, identifies unfinished steps and retries those steps only. Never treat local storage, an HTTP dispatch, a timer, or a successful animation as readiness evidence.

## Screen states and recovery
The toolbar’s shared state variants are reusable layout specimens. Dedicated screens handle provisioning failure, activation failure, session expiry, invitation, switching, forbidden, maintenance, not found and confirmations. Implementations must use contextual copy and transitions below, not mechanically show all states on every screen.

| Family | Loading / empty | Validation / conflict | Failure / offline / stale | Success and recovery |
| --- | --- | --- | --- | --- |
| Identity | Busy submit with one live status; no personal data before session resolution | Field + summary errors; invalid/expired/replayed code; generic discovery | Provider cancelled/unavailable; throttle cooldown; offline blocks credential submission | Server verifies, restores safe intent; alternative permitted factor; never fake success |
| Registration | Persisted step loading; empty fields on first visit | Country-specific required fields, terms acceptance, existing-account ownership verification | Failed save retains safe edits; interrupted provisioning resumes the same operation | Verified operation leads to first Home; no second tenant creation |
| Home / notifications | Skeleton then permitted data; first-use empty invites exploration | Preferences version conflict preserves edits | Partial source failure labels missing sections; stale counts dated; offline avoids stale sensitive caches | Refresh latest sections, retry failed source; counts never infer absence from timeout |
| Applications / platforms | Empty entitled catalog differs from zero search results | Invalid filter or selection is explained | Revoked entitlement, maintenance and permission denial have different copy | App launch rechecks access; no direct navigation around a restriction |
| Setup | Durable readiness loading; no selected apps prompts selection | Missing prerequisite, changed version or invalid role blocks affected activation | Saved vs unsaved explicit; partial per-app failure; offline cannot mark ACTIVE | Retry same operation; completed steps remain complete; reconcile before recovery |
| Account forms | Principal data loading even without membership | Field + summary errors; concurrent edit offers reload/review, no blind overwrite | Save failure retains typed data; sensitive changes require recent verification | Acknowledged save only; email replacement verified before old contact is retired |
| Devices / connections | No other sessions or no connections has useful guidance | Confirm target and revocation scope | Failed revocation retains row with retry; stale session details rechecked | Server acknowledgement then remove/update row; current session revocation exits safely |
| Data rights | Export queued/processing; no requests yet | Ownership transfer and legal hold may prevent closure | Export failed or expired offers authorized re-request | Ready download is short-lived; closure eligibility and consequences reviewed separately |
| Navigation / switch | Resolve destination and membership before rendering | Dirty drafts require explicit resolution; malformed next rejected | Timeout, expired auth, revoked membership, unknown route, service outage | Preserve target only when safe; clear old-tenant state; restore focus after navigation |

Mutation controls in the product are disabled while offline or pending and return only after reconciliation. The atlas action links stay available because they navigate design specimens. Do not confuse this review behavior with the proposed product behavior.

## Account and navigation detail
- Account overview: verification badge attaches to a verified contact, not universal account health. Personal identity remains available with zero memberships.
- Security: passkeys, authenticator, recovery and password settings reflect policy. Removing the last method requires a verified replacement. Recovery codes are never included in artifacts.
- Devices: current session identified; revoke one vs all is explicit. Show locale-aware activity and approximate device context without unnecessary sensitive details.
- Privacy: personal consent separated from tenant-installed apps; disconnect explains future access and prior data retention. Export and closure require verification and retention/ownership review.
- Preferences: appearance, density, language and time zone are personal. They cannot change business currency/fiscal settings. Optional marketing consent starts unchecked; required service messages are clearly labeled.
- Search: keyboard shortcut, accessible result roles and tenant scope; records and snippets access-filtered server-side. Search/help and account are distinct destinations even when opened from overlays.
- Platform directory: permitted tenant applications, OCC, Developer, Marketplace, Web Studio and published website. Provider controls stay in a separate provider realm. Links do not turn tenant administrators into provider operators.

## Accessibility, responsiveness and implementation mapping
At desktop width use the stable sidebar and two-column secondary content. Below 1050px, stack detail columns and use three app tiles per row. At 650px and below, expose a labeled Menu button, stacked actions and full-width forms. At 390px, all screens must reflow without horizontal scrolling. At 200–400% zoom, use the same content order and avoid clipped sticky chrome. No information exists only on hover or by color.

| Design construct | Production responsibility |
| --- | --- |
| Global shell, app header, organization switch | Existing @kannan19302/ui shell primitives with explicit tenant/environment context |
| Form fields, selectors, checkbox, buttons | Owned DS primitives, persistent labels, required state, inline/summary errors, native autofill semantics |
| Stepper / setup panel | Owned guided-setup pattern with aria-current, acknowledged state and safe back/resume |
| Status, progress, error and empty panels | DS semantic tokens; polite progress announcements, assertive validation summary only when needed |
| Confirmation / profile / command menu | Dialog/menu roles where appropriate, focus trap for modal dialogs, Escape and focus restoration |
| App tiles, rows and badges | Text alternatives, keyboard activation, meaningful status labels and access-aware content |
| Pin/reorder controls | Accessible Move up/Move down equivalent, announced position and recoverable persistence |

Product forms require required-field indicators, input purpose/autocomplete, password-manager support, code paste and appropriate inputmode. Focus moves to an error summary on failed submit and back to the triggering control when a dialog closes. Target at least 44px comfortable controls; verify WCAG 2.2 AA contrast from actual computed tokens (do not inherit unverified ratio claims from docs). Test screen reader, keyboard, reduced motion, forced colors, long translations and RTL separately. Static screenshots and overflow checks are not accessibility certification.

## Acceptance before application implementation is called complete
Production evidence must cover the routing table, all mandatory registration steps, interrupted/duplicate provisioning, tenant A/B/no-context isolation, hidden vs discoverable apps, stale/revoked entitlements, dirty draft switching, factor failures, logout scope, partial sources, configuration conflict, activation retries, account revocation, keyboard and assistive technology. Exact tests and commands belong in the coordinated implementation contract after owners publish the affected interfaces.
