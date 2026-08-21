# Developer Platform PRD

## Product outcome

Provide developer portal, API discovery, credentials, SDKs, extension packaging, capability declaration, sandbox execution and diagnostics for extension developers, integration engineers and tenant technical administrators, with explicit tenant, provider and service boundaries.

## Business requirements

- `DEV-BR-001`: The platform shall expose one authoritative lifecycle for every owned resource.
- `DEV-BR-002`: Every tenant-owned operation shall preserve tenant isolation and attributable audit.
- `DEV-BR-003`: Contract compatibility and deprecation shall be explicit and measurable.
- `DEV-BR-004`: User-visible success shall represent durable system success, not route or request presence.
- `DEV-BR-005`: Capabilities without implementation and behavioral evidence shall remain UNVERIFIED.

## Scope and maturity

Primary implementation: `developer-platform`, `sdk`, `extension-api`, `sandbox`.

Inspected evidence: 164 portal implementation files/2 tests; SDK 5/1; extension API 8/1; sandbox 8/5. Extension API exposes signed-bundle, scope, budget and egress schemas; sandbox uses isolated execution and host-side capability checks.

Current risk: The portal is much broader than the small public SDK/API surface; compatibility, publishing and revocation lifecycles are not yet proven end to end.

Success measures are lifecycle completion, correctness, security, availability and evidence coverage. File, route or screen count is not a success measure.

