# UniERP Architecture Decision Records

ADRs record cross-platform decisions. Platform-local decisions live in that platform's `adr/` directory.
Accepted ADRs are immutable except for status and links; a later ADR supersedes an earlier decision.

| ADR | Decision | Status |
| --- | --- | --- |
| [ADR-0001](ADR-0001-platform-documentation-authority.md) | Platform-level documentation is authoritative | Accepted |
| [ADR-0002](ADR-0002-platform-boundaries.md) | Product platforms own requirements; repositories implement them | Accepted |
| [ADR-0003](ADR-0003-tenant-context-and-isolation.md) | Tenant context is verified server-side and enforced in persistence | Accepted |
| [ADR-0004](ADR-0004-modular-business-services-and-outbox.md) | Business services remain modular with transactional outbox effects | Accepted |
