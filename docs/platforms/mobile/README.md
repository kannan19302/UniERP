# Mobile Client

Platform for tenant employees, managers, field users and approvers on mobile devices. It owns mobile-appropriate ERP workflows, authentication, notifications, offline/cache behavior, device integration and secure local state.

Primary implementation: `unierp-mobile`.

Inspected evidence: Flutter client has 818 implementation files/29 tests and a large GoRouter configuration. Breadth is substantial but parity, offline and platform security evidence remain unmapped.

Current risk: Large route count can mask placeholder/parity gaps; offline conflicts, secure storage and device lifecycle require explicit proof.

## Authoritative suite

- [PRD](PRD.md)
- [Requirements](REQUIREMENTS.md)
- [Architecture/TRD](ARCHITECTURE.md)
- [API, data and integration contracts](CONTRACTS.md)
- [Security/IAM/compliance](SECURITY.md)
- [UX/design requirements](EXPERIENCE.md)
- [Infrastructure, SRE, QA and operations](OPERATIONS.md)
- [Traceability](TRACEABILITY.md)

