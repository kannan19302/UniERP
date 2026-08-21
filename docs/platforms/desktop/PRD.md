# Desktop Client PRD

## Product outcome

Provide desktop shell, secure authentication handoff, updates, deep links and explicitly supported device capabilities for tenant users requiring desktop packaging or managed-device integration, with explicit tenant, provider and service boundaries.

## Business requirements

- `DESK-BR-001`: The platform shall expose one authoritative lifecycle for every owned resource.
- `DESK-BR-002`: Every tenant-owned operation shall preserve tenant isolation and attributable audit.
- `DESK-BR-003`: Contract compatibility and deprecation shall be explicit and measurable.
- `DESK-BR-004`: User-visible success shall represent durable system success, not route or request presence.
- `DESK-BR-005`: Capabilities without implementation and behavioral evidence shall remain UNVERIFIED.

## Scope and maturity

Primary implementation: `desktop-app`.

Inspected evidence: Desktop repository has only 5 implementation files/1 test and mostly server/public shell files. It is not evidence of a production ERP desktop application.

Current risk: Current maturity is DECLARED/minimal; technology, trust boundary, feature parity and update mechanism are not proven.

Success measures are lifecycle completion, correctness, security, availability and evidence coverage. File, route or screen count is not a success measure.

