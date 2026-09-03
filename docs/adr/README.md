# UniERP Architecture Decision Records

ADRs record cross-platform decisions. Platform-local decisions live in that platform's `adr/` directory.
Accepted ADRs are immutable except for status and links; a later ADR supersedes an earlier decision.

| ADR | Decision | Status |
| --- | --- | --- |
| [ADR-0001](ADR-0001-platform-documentation-authority.md) | Platform-level documentation is authoritative | Accepted |
| [ADR-0002](ADR-0002-platform-boundaries.md) | Product platforms own requirements; repositories implement them | Accepted |
| [ADR-0003](ADR-0003-tenant-context-and-isolation.md) | Tenant context is verified server-side and enforced in persistence | Accepted |
| [ADR-0004](ADR-0004-modular-business-services-and-outbox.md) | Business services remain modular with transactional outbox effects | Accepted |
| [ADR-0005](ADR-0005-developer-platform-artifact-and-package-lifecycle.md) | Developer artifacts and packages use an owned lifecycle | Accepted |
| [ADR-0006](ADR-0006-developer-platform-cells-and-runtime-independence.md) | Developer runtime cells preserve isolation and portability | Accepted |
| [ADR-0007](ADR-0007-developer-platform-compatibility-and-portability.md) | Developer contracts preserve compatibility and portability | Accepted |
| [ADR-0008](ADR-0008-meridian-workbench-design-language.md) | Meridian Workbench is the UniERP design language | Superseded by ADR-0009 |
| [ADR-0009](ADR-0009-strata-enterprise-design-language.md) | Strata Workbench is the Authoritative UniERP Enterprise Design Language | Accepted |
| [ADR-0010](ADR-0010-platform-north-star-and-polyrepo-boundaries.md) | UniERP Master Platform Goal and Polyrepo Architecture Boundaries | Accepted |


