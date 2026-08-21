# Marketing Site

Platform for prospects, customers, partners, applicants, content editors and marketing/support staff. It owns public product/company content, lead capture, support/contact intake, legal content, SEO, analytics consent and controlled publishing.

Primary implementation: `marketing-site`.

Inspected evidence: Marketing site has 222 implementation files/4 tests, 142 app files and a local Prisma schema with Tenant, Domain, Setting, User, Lead and Ticket models.

Current risk: The public site contains its own tenant/user/lead/ticket persistence, creating data ownership and IAM overlap; product claims may drift from verified capabilities.

## Authoritative suite

- [PRD](PRD.md)
- [Requirements](REQUIREMENTS.md)
- [Architecture/TRD](ARCHITECTURE.md)
- [API, data and integration contracts](CONTRACTS.md)
- [Security/IAM/compliance](SECURITY.md)
- [UX/design requirements](EXPERIENCE.md)
- [Infrastructure, SRE, QA and operations](OPERATIONS.md)
- [Traceability](TRACEABILITY.md)

