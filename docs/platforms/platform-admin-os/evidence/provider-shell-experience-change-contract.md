# Provider shell experience change contract

Date: 2026-09-21

Risk: R2 — shared provider-operator navigation UI

Owner: PLT-PAO

Implementation: `provider-admin` (`@kannan19302/console`)

## Outcome and scope

Align the shared provider shell with the control-center landing page. Simplify the top bar, navigation rail and
workspace switcher; preserve navigation, command search, theme, locale, incident, profile and collapse behaviors.
Replace repeated decorative connectivity indicators and an unmeasured nominal-health statement with one truthful
connection state. No provider authority, routes, APIs, schemas or persistence change.

## Acceptance criteria

- AC-06: Desktop and mobile shell chrome have a coherent, restrained hierarchy.
- AC-07: Sidebar navigation stays dense, legible and keyboard-operable without template-style section labels.
- AC-08: Connection and incident state are explicit; unknown state is not presented as healthy.
- AC-09: Existing shell actions and destinations remain available.
- AC-10: Focused shell tests, typecheck, token checks, navigation E2E and rendered review pass.

## Impact and rollback

- Security/tenancy: no enforcement change; provider scope remains explicit.
- Data/contracts: none.
- Compatibility: navigation manifests, routes and command identifiers remain unchanged.
- Knowledge delta: this evidence records a shared experience-pattern change; normative requirements are unchanged.
- Rollback: revert the shell, switcher, test and evidence commits. No migration or feature flag is required.
