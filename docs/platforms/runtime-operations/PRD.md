# Runtime and Operations Platform PRD

## Product outcome

Provide environments, deployment, configuration, tenancy runtime context, policy/governor primitives, observability, SRE, backup/recovery and service conventions for SRE, platform engineers, service owners, security and release managers, with explicit tenant, provider and service boundaries.

## Business requirements

- `OPS-BR-001`: The platform shall expose one authoritative lifecycle for every owned resource.
- `OPS-BR-002`: Every tenant-owned operation shall preserve tenant isolation and attributable audit.
- `OPS-BR-003`: Contract compatibility and deprecation shall be explicit and measurable.
- `OPS-BR-004`: User-visible success shall represent durable system success, not route or request presence.
- `OPS-BR-005`: Capabilities without implementation and behavioral evidence shall remain UNVERIFIED.

## Scope and maturity

Primary implementation: `infra`, `config`, `kernel`, `shared`, `service-kit`.

Inspected evidence: Infra has 38 implementation files/13 tests with load tests, platform wizard and control-plane assets; kernel 10/5 exposes tenant governor/policy; shared 56/13; service-kit 5/2; config has almost no source implementation.

Current risk: Operational mechanisms are dispersed; config package appears nearly empty; deployment topology and tested recovery evidence are not centrally authoritative.

Success measures are lifecycle completion, correctness, security, availability and evidence coverage. File, route or screen count is not a success measure.

