# Provider overview experience change contract

- Date: 2026-09-21
- Risk class: R2
- Owning platform: PLT-PAO (Platform Admin OS)
- Implementation repository: `provider-admin`

## Scope

Replace the provider overview's decorative dashboard presentation with a compact operational briefing. The change is limited to the overview route and its shared page-header action placement. It does not change public APIs, authorization rules, persistence, events, migrations, or package contracts.

## Acceptance criteria

- AC-11: Every metric is derived from a named API response; unavailable telemetry is shown as unavailable rather than replaced with a fabricated value.
- AC-12: Operational incidents are requested from the incident collection and rendered from returned records; an all-clear message is shown only for a confirmed empty collection.
- AC-13: Loading, error, and empty states remain useful and do not overstate platform health.
- AC-14: The overview remains readable, keyboard-operable, and horizontally contained at desktop and mobile widths.
- AC-15: Focused tests, typecheck, lint, token checks, and a rendered browser review provide implementation evidence. Repository-wide gates are reported separately when blocked by pre-existing failures.

## Change and dependency analysis

The provider-admin presentation layer remains a consumer of existing platform endpoints. No upstream contract is mutated. The page now consumes the existing `/platform/v1/operations/incidents` collection instead of treating the dashboard health endpoint as an incident source. The dashboard summary and tenant list response shapes remain unchanged.

## Rollback

Revert the provider-admin implementation commit and this evidence record. No data rollback or consumer migration is required.
