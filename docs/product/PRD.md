# UniERP Product Requirements Document

## Product promise

UniERP shall provide tenant-isolated, auditable business systems and extensible workflows across web, mobile and
supported desktop/public experiences, with separate provider and tenant administration planes.

## Actors

Tenant business users and managers; tenant owners/admins; provider operators/SRE/security/support; developers
and publishers; public prospects/site visitors; human and machine principals.

## Business requirements

- `UNI-BR-001`: A tenant shall operate without any other tenant learning of its existence or data.
- `UNI-BR-002`: Provider authority, tenant administration and tenant business operations shall remain separate.
- `UNI-BR-003`: Financial, inventory and approval effects shall be correct, traceable and recoverable.
- `UNI-BR-004`: Every owned resource shall have one lifecycle and one accountable platform.
- `UNI-BR-005`: Extensions shall add capability without receiving undeclared authority or breaking platform upgrades.
- `UNI-BR-006`: Product claims and release status shall be backed by implementation and behavioral evidence.
- `UNI-BR-007`: Self-hosted and SaaS operation shall use documented deployment, security and recovery contracts.

## Scope

Provider operations, tenant administration, ERP/business services, identity, developer/extension ecosystem,
marketplace, design system, tenant sites/studio, mobile, desktop, marketing and runtime operations. A route,
module or schema is not automatically a committed capability until traced to requirements and tests.

## Success measures

Tenant-isolation escape rate zero; balanced/reconciled business transactions; critical-journey SLO attainment;
tested recovery targets; permission/audit coverage; supported-contract compatibility; accessibility evidence;
and requirement-to-test traceability coverage.
