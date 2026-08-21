# Marketplace PRD

## Product outcome

Provide listing, review, approval, commercial terms, versioning, installation, upgrade, suspension and uninstall lifecycle for publishers, reviewers, tenant buyers and provider marketplace operators, with explicit tenant, provider and service boundaries.

## Business requirements

- `MKT-BR-001`: The platform shall expose one authoritative lifecycle for every owned resource.
- `MKT-BR-002`: Every tenant-owned operation shall preserve tenant isolation and attributable audit.
- `MKT-BR-003`: Contract compatibility and deprecation shall be explicit and measurable.
- `MKT-BR-004`: User-visible success shall represent durable system success, not route or request presence.
- `MKT-BR-005`: Capabilities without implementation and behavioral evidence shall remain UNVERIFIED.

## Scope and maturity

Primary implementation: `marketplace`, `extensions`, API marketplace/extension-registry modules.

Inspected evidence: Marketplace app has 34 implementation files/1 test; extensions have 36/5 across healthcare, education, field service and real estate. Catalog data appears local in the UI while registry/service modules also exist.

Current risk: Catalog authority is split and local UI data may not reflect registry truth; commercial and technical lifecycle evidence is sparse.

Success measures are lifecycle completion, correctness, security, availability and evidence coverage. File, route or screen count is not a success measure.

