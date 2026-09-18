# UniERP Home + Account Center — v2

2026-09-14 · Strata light · Non-normative design proposal · Updated in the original v1 folder

## Open the v2 design

- [Interactive screen atlas](index.html) — 69 screens, desktop/mobile layouts, screen selector, eight shared state variants and linked journey previews.
- [All screens and PNG exports](SCREEN_INVENTORY_V2.md) — exact coverage and behavior notes.
- [V2 experience specification](UX_SPEC_V2.md) — registration, daily return routing, Home, application setup, navigation, Account Center, accessibility and recovery.
- [Platform Wizard decommissioning plan](PLATFORM_WIZARD_DECOMMISSION.md) — observed dependencies, replacement mapping, authority changes, migration phases, compatibility, rollout/rollback and removal gates.
- [Change contract](CHANGE_CONTRACT_V2.md) and [verification report](VERIFICATION_V2.md).

Open `index.html` in a browser; no server or installation is required to review it. Screen selection and primary links move between visual specimens. The state selector shows loading, empty, partial, offline, error, validation, stale and conflict layouts. The review toolbar and design notes are not part of the product UI. Fields and actions do not authenticate, send invitations, buy apps, save account details or provision organizations.

V2 includes 69 desktop PNG exports and four representative mobile exports, all prefixed `v2_`. All 17 existing PNG files are preserved byte-for-byte; their 14 original concepts remain below as historical v1 reference. No new folder was created. Platform Wizard remains operationally untouched.

The design covers the Home/account entry journey and destination handoffs, not the internal pages of every ERP app or platform. Future product implementation must use `@kannan19302/ui`, published contracts and the owning security/readiness requirements.

---

# Historical v1 reference

The following report describes the 2026-09-07 image delivery only. For current scope, limitations and evidence, use the v2 links above.

2026-09-07 • Strata light • Non-normative design proposal

## Start here

- [Daily workspace Home](02_daily_home.png)
- [First visit after registration](01_first_visit.png)
- [Account Center overview](07_account_overview.png)
- [Design and wizard-retirement plan](DESIGN_PLAN.md)

The proposed application entry experience replaces the user's need to visit a separate Platform Wizard. The existing wizard remains untouched. Completed registration reaches first-run Home; ordinary login reaches daily Home unless a valid protected deep link should be resumed.

## All 14 detailed views

- [01. Welcome to your workspace](01_first_visit.png)
- [02. Your workspace](02_daily_home.png)
- [03. Applications](03_application_library.png)
- [04. Explore UniERP](04_platform_directory.png)
- [05. Notifications](05_notifications_refined.png)
- [06. Profile and avatar](06_profile_menu.png)
- [07. Account Center](07_account_overview.png)
- [08. Personal information](08_personal_information.png)
- [09. Sign-in & recovery](09_signin_recovery.png)
- [10. Devices & activity](10_devices_activity.png)
- [11. Organizations and switching](11_organizations_refined.png)
- [12. Connected apps & privacy](12_connected_privacy_refined.png)
- [13. Preferences](13_preferences.png)
- [14. Global search and help](14_search_help.png)

Connected-app scope review is detailed within the Privacy & data view. Search and Help are shown as two component specimens on one sheet; availability and the avatar menu are likewise shown together. These are illustrative views, not a promise that every dialog, onboarding step or responsive state has been designed.

## Navigation and feature decisions

Home offers pinned apps, recent work and attention items, while the full application library supplies icon+name tiles, search, categories and pinning. Developer, Marketplace, OCC and Tenant Website are directly reachable. Account Center stays a personal destination; OCC handles organization policy. The platform directory distinguishes site authoring from the published website.

No extra platform-choice wizard is inserted before an app opens. Entitlement and SSO checks still apply. First-run setup is resumable; required setup limits affected business actions while optional tasks can wait. Valid deep links resume their original destination.

Notifications open the source record instead of approving business work in the notification itself. The personal menu separates availability from authentication and organization role. Security methods and recovery require verification for sensitive changes. Organization switching must preserve or resolve drafts before changing scope. Search results must be access-filtered server-side.

## Review and implementation notes

All 14 selected images and three refinement images were visually inspected for theme, hierarchy, legibility and requested elements. Refinements corrected notification filter state, organization-switch selection/invitation date and privacy labels/icons. Earlier explorations remain alongside refined selections.

Remaining image limitations for implementation:
- Some decorative footers, icon colors, sizing and spacing vary. Implement one shared shell using approved tokens rather than tracing every raster variation.
- First-visit checklist is a condensed entry view; legal/tax profile, security baseline, fiscal/chart-of-accounts readiness and other prerequisites remain governed by the owning onboarding requirements. A visual Complete badge is illustrative, not evidence of real completion.
- Permission-required destination styling on the directory is a state example. Only explicitly discoverable destinations should offer Request access; unavailable or unauthorized destinations must not leak private catalog data.
- Account Center's Acme Corp header/footer denotes current navigation context; the personal account must not become tenant-owned or lose access on organization switch.
- The overview's green verification marker should attach specifically to verified contact information, not imply universal account health.
- Device timestamps and relative times are illustrative and need consistent locale/time calculations from real session data.
- Privacy wording 'Always delivered' means those message categories are not optional; production copy should avoid guaranteeing delivery and use 'Required service messages'.
- Component sheets show multiple specimens simultaneously; only the appropriate overlay should be open during live interaction.
- Organization role labels are descriptive, never authorization proof. Tenant policies are read-only context here and edited only through OCC.
- Keyboard, screen-reader, zoom, mobile, loading/empty/error/offline, stale permissions, failed save, safe session revocation and onboarding retry states require executable design and test coverage.
- Synthetic profile data was used instead of reproducing the personal information in the supplied screenshots.

## Evidence and cycle report

Protocol 1.1.0. Status: DONE for the requested design proposal and image set.
Objective: redesign post-registration and daily landing experiences with detailed navigation and Account Center views.
Completed: 14/14 planned views, 3 retained refinements, written design/migration plan, [generation prompts](PROMPTS.md), visual review and artifact verification.
Incomplete within the design-delivery scope: none. Platform Wizard decommissioning and application implementation were not performed.
Designed YES. Implemented, integrated, deployed and released NOT APPLICABLE. Tested: visual/artifact checks only.
Knowledge delta UPDATED: local non-normative design artifacts; no accepted ADR, owning requirement, contract or product boundary changed.
Owners: Design Platform, Identity, Tenant Apps, Tenant Admin/OCC, Developer, Marketplace and Tenant Sites as described in the plan.
PASS: built-in image generation completed for all planned views; PNG headers show valid positive dimensions.
PASS: all 42 earlier design files retain their pre-task SHA256 hashes. New files were copied with overwrite disabled.
PASS: reviewed new artifacts for requested scope and minimized synthetic data.
FAIL: none in image-delivery checks.
NOT RUN: app typecheck/build/lint, token/contrast gates, authentication/SSO, onboarding, authorization, accessibility and E2E tests; no executable changes were made.
Database, migrations, public contracts, runtime operations and deployment impact: none.
Next required action: none for this design handoff. Before wizard retirement, follow the staged inventory, authority, migration, compatibility and verification steps in DESIGN_PLAN.md.
