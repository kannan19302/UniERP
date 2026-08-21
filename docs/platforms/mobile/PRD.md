# Mobile Client PRD

## Product outcome

Provide mobile-appropriate ERP workflows, authentication, notifications, offline/cache behavior, device integration and secure local state for tenant employees, managers, field users and approvers on mobile devices, with explicit tenant, provider and service boundaries.

## Business requirements

- `MOB-BR-001`: The platform shall expose one authoritative lifecycle for every owned resource.
- `MOB-BR-002`: Every tenant-owned operation shall preserve tenant isolation and attributable audit.
- `MOB-BR-003`: Contract compatibility and deprecation shall be explicit and measurable.
- `MOB-BR-004`: User-visible success shall represent durable system success, not route or request presence.
- `MOB-BR-005`: Capabilities without implementation and behavioral evidence shall remain UNVERIFIED.

## Scope and maturity

Primary implementation: `unierp-mobile`.

Inspected evidence: Flutter client has 818 implementation files/29 tests and a large GoRouter configuration. Breadth is substantial but parity, offline and platform security evidence remain unmapped.

Current risk: Large route count can mask placeholder/parity gaps; offline conflicts, secure storage and device lifecycle require explicit proof.

Success measures are lifecycle completion, correctness, security, availability and evidence coverage. File, route or screen count is not a success measure.

