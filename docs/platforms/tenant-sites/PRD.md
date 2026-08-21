# Tenant Sites and Studio PRD

## Product outcome

Provide site composition, templates, preview, domains, publishing, public runtime, content/commerce blocks and analytics consent for tenant site creators, content editors, commerce managers and site visitors, with explicit tenant, provider and service boundaries.

## Business requirements

- `SITE-BR-001`: The platform shall expose one authoritative lifecycle for every owned resource.
- `SITE-BR-002`: Every tenant-owned operation shall preserve tenant isolation and attributable audit.
- `SITE-BR-003`: Contract compatibility and deprecation shall be explicit and measurable.
- `SITE-BR-004`: User-visible success shall represent durable system success, not route or request presence.
- `SITE-BR-005`: Capabilities without implementation and behavioral evidence shall remain UNVERIFIED.

## Scope and maturity

Primary implementation: `tenant-sites`, `tenant-site-template`, `web-studio`.

Inspected evidence: Tenant sites has 18 implementation files/1 test; template 1/0; studio 8/1. Observed blocks include collections/cart and tenant header/home; overall maturity is low.

Current risk: Builder, template and runtime contracts are largely undocumented and thinly implemented; safe publication and tenant/domain isolation are not proven.

Success measures are lifecycle completion, correctness, security, availability and evidence coverage. File, route or screen count is not a success measure.

