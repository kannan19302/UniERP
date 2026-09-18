# Hosted auth compact UI change contract

## Request and outcome

- Human request: compact the hosted login and registration cards, make them professionally enterprise-oriented,
  and remove sign-in-scope and organization-slug controls from the login UI.
- Outcome: a focused, responsive identity card; server-derived authority realm; email-based tenant discovery.
- In scope: IdP hosted HTML/CSS, login routing enforcement, focused tests, owning Identity experience/traceability.
- Out of scope: schema changes, new identity model, deployment/release, production activation, provider setup.
- Acceptance: both cards are visibly denser; scope/slug fields are absent; hostile submitted values cannot steer
  realm or tenant selection; password/passkey/provider/legal/accessibility behavior is preserved.

## Authority and ownership

- Risk: R2 — public auth-adjacent UI and realm-selection behavior.
- Accountable platform: PLT-IAM. Participating owner: PLT-DS.
- Requirements: IAM-FR-001, IAM-SEC-001/002/004, IAM-NFR-004, IAM-UX-004/006, onboarding plan section 21.
- Repositories: `idp`, `unierp-platform`; clients remain backward compatible because request URLs/contracts do not change.
- Conflict: the earlier form exposed scope/slug controls despite the onboarding authority prohibiting pre-auth slug
  discovery. This change follows the higher platform authority and keeps realm selection fail closed.

## Design and security decisions

- The validated OIDC relying-party destination determines tenant versus provider realm. Email never grants
  provider authority, and browser fields named `login_scope` or `tenant_slug` are ignored.
- Tenant login continues to use the narrow server-side email-to-membership resolver. Ambiguous membership is not
  guessed. Provider login continues to require the reserved provider tenant plus explicit role and permission.
- Compact styling preserves persistent labels, 40–44 px controls, visible focus, reduced motion, responsive
  reflow, live status/error semantics, password-manager attributes, CSRF and honeypot controls.
- Contract/schema/data/privacy/operations/dependencies: none changed. No new package or external service.

## Delivery safety

- Rollout: normal IdP release; no data migration or feature flag.
- Rollback: revert the hosted template/CSS and server derivation patch together. No persisted data needs recovery.
- Compatibility: routes and request/response formats remain additive-compatible; formerly accepted scope/slug
  fields are ignored by the hosted endpoint because they were not a safe authorization contract.

## Verification plan

| Claim | Proof | Command |
| --- | --- | --- |
| scope/slug absent and compact markers present | hosted controller render assertions | `pnpm exec vitest run src/modules/oidc/controllers/login.controller.spec.ts` |
| submitted fields cannot steer authority | tenant/internal negative controller tests | same focused Vitest command |
| typed production code is valid | typecheck | `pnpm typecheck` |
| lint/build integration | lint, architecture, full tests and build | `pnpm lint`; `pnpm architecture:check`; `pnpm test`; `pnpm build` |
| final patch hygiene | diff review | `git diff --check`; `git diff` |

## Knowledge delta

- Classification: UPDATED — hosted-auth experience and scope-selection behavior.
- Owners updated: Identity onboarding plan, experience requirement and traceability.
- Enterprise brain: no update; agent routing/decision procedure did not change.

## Cycle handoff

- Status: PARTIAL.
- Designed: yes. Implemented: yes. Tested: partial. Integrated: local compiled renderer only. Deployed: no.
  Released: no.
- Completed: compact login/register presentation; scope/slug controls removed; server-owned realm/tenant routing;
  focused negative tests; typecheck; build; compiled desktop and 390 x 844 visual/reflow review; knowledge updates.
- Gate repair completed: ESLint now has its committed lockfile closure and reports zero findings. The architecture
  command invokes the IdP layer wrapper plus dependency-cruiser; nine exact pre-existing `auth`/`oidc` deep-import
  edges are recorded in dependency-cruiser's known-violations baseline, so any new boundary violation still fails.
  Two promise-executor callbacks were made non-returning and the safe-return URL fallback is now explicit.
- Verification completed: focused auth tests 7/7; full IdP suite 341/341; typecheck, lint, architecture, build,
  diff check and enterprise-brain validation passed. The production dependency audit remains failed on five
  pre-existing advisories, and all Node-based gates ran under Node 24 despite the repository requiring Node 22.
- Incomplete: the existing localhost:3005 service still runs a stale build; the normal local shell cannot boot a
  replacement because its database credentials are rejected. A real database-backed login/register journey is
  therefore not verified. Emails resolving to multiple tenant memberships still fail closed rather than guessing;
  a governed post-auth organization chooser remains separate follow-up work.
- Next action: provide governed local database credentials (or a healthy IdP integration environment), refresh the
  service, and repeat the real login and registration journey review under the repository's supported Node 22.
- **This is not done.**
