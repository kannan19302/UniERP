# UniERP Product Requirements Document

## Product promise

UniERP helps an organization run connected, tenant-isolated and auditable business
workflows from customer demand through delivery, payment and reconciliation. The
customer products are the Business Suite, Tenant Admin and Developer Platform.
Marketing Site and Provider Admin support acquisition, onboarding and safe operation.
Mobile, desktop, marketplace and other capabilities remain part of the wider product;
their presence in source does not make them part of a release.

The first working release targets January 1, 2027. The date is conditional on the
foundation continuation gate, named customer journeys, representative customer
acceptance and production readiness. It is not a release authorization.

## First-release decision rule

Select initial industries from observed customer problems, buyer access, willingness
to pay and the ability to onboard repeatably. A sector page or code module is not
evidence of a sellable industry product. Every advertised industry must have a
complete, supported journey through configuration, transactions, exceptions,
reporting, reconciliation and support. Keep unsupported industries in discovery or
pilot status with truthful claims.

Within the Business Suite, finish the connected Finance spine of controlled
journals, ledgers, receivables, payables, cash and close before expanding advanced
Finance breadth. Tenant Admin must let an owner configure and govern their tenant.
Developer Platform must complete at least one supported external integration
lifecycle through published contracts and scoped credentials. Provider Admin must
support tenant lifecycle and operations without tenant-business authority. Marketing
must hand a prospect into usable onboarding and make only verified claims.

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

The full product spans provider operations, tenant administration, ERP/business
services, identity, developer and extension ecosystems, marketplace, design system,
tenant sites/studio, mobile, desktop, marketing and runtime operations. The exact
first-release subset is decided through the owned requirements and release manifest.
A route, module or schema is not automatically a committed capability until traced
to requirements and behavioral evidence.

## Success measures

Tenant-isolation escape rate zero; balanced/reconciled business transactions; critical-journey SLO attainment;
tested recovery targets; permission/audit coverage; supported-contract compatibility; accessibility evidence;
and requirement-to-test traceability coverage.
