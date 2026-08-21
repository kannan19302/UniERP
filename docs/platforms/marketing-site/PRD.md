# Marketing Site PRD

## Product outcome

Provide public product/company content, lead capture, support/contact intake, legal content, SEO, analytics consent and controlled publishing for prospects, customers, partners, applicants, content editors and marketing/support staff, with explicit tenant, provider and service boundaries.

## Business requirements

- `MAR-BR-001`: The platform shall expose one authoritative lifecycle for every owned resource.
- `MAR-BR-002`: Every tenant-owned operation shall preserve tenant isolation and attributable audit.
- `MAR-BR-003`: Contract compatibility and deprecation shall be explicit and measurable.
- `MAR-BR-004`: User-visible success shall represent durable system success, not route or request presence.
- `MAR-BR-005`: Capabilities without implementation and behavioral evidence shall remain UNVERIFIED.

## Scope and maturity

Primary implementation: `marketing-site`.

Inspected evidence: Marketing site has 222 implementation files/4 tests, 142 app files and a local Prisma schema with Tenant, Domain, Setting, User, Lead and Ticket models.

Current risk: The public site contains its own tenant/user/lead/ticket persistence, creating data ownership and IAM overlap; product claims may drift from verified capabilities.

Success measures are lifecycle completion, correctness, security, availability and evidence coverage. File, route or screen count is not a success measure.

