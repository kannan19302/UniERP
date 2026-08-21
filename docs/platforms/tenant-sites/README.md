# Tenant Sites and Studio

Platform for tenant site creators, content editors, commerce managers and site visitors. It owns site composition, templates, preview, domains, publishing, public runtime, content/commerce blocks and analytics consent.

Primary implementation: `tenant-sites`, `tenant-site-template`, `web-studio`.

Inspected evidence: Tenant sites has 18 implementation files/1 test; template 1/0; studio 8/1. Observed blocks include collections/cart and tenant header/home; overall maturity is low.

Current risk: Builder, template and runtime contracts are largely undocumented and thinly implemented; safe publication and tenant/domain isolation are not proven.

## Authoritative suite

- [PRD](PRD.md)
- [Requirements](REQUIREMENTS.md)
- [Architecture/TRD](ARCHITECTURE.md)
- [API, data and integration contracts](CONTRACTS.md)
- [Security/IAM/compliance](SECURITY.md)
- [UX/design requirements](EXPERIENCE.md)
- [Infrastructure, SRE, QA and operations](OPERATIONS.md)
- [Traceability](TRACEABILITY.md)

