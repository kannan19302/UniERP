# Provider home experience change contract

Date: 2026-09-21

Risk: R2 — public provider-operator UI

Owner: PLT-PAO

Implementation: `provider-admin` (`@kannan19302/console`)

## Outcome and scope

Replace the template-like provider home launcher with a restrained operational directory. Preserve domain search,
cluster filtering and keyboard shortcuts. Do not change provider authority, routes, APIs, schemas or persistence.
Hard-coded health, uptime, isolation and tenant-count claims are removed because PAO-BR-005 requires measured and
unknown telemetry to remain distinguishable.

## Acceptance criteria

- AC-01: The page identifies provider-estate scope and avoids marketing/template treatments.
- AC-02: Search, cluster filters and existing keyboard shortcuts remain usable.
- AC-03: All registered PCC domains expose title, code, responsibility and cluster context.
- AC-04: The layout is responsive and supports keyboard focus and reduced-motion preferences.
- AC-05: Repository UI gates pass and the resulting page is visually reviewed at desktop and mobile widths.

## Impact and rollback

- Security/tenancy: no authority or enforcement change; provider scope becomes more explicit.
- Data/contracts: none.
- Compatibility: existing routes and registry entries remain unchanged.
- Knowledge delta: experience evidence updated by this contract; no normative product behavior changes.
- Rollback: revert the landing-page, tile, test and evidence commit. No migration or feature flag is required.
