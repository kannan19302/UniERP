# Marketplace

Platform for publishers, reviewers, tenant buyers and provider marketplace operators. It owns listing, review, approval, commercial terms, versioning, installation, upgrade, suspension and uninstall lifecycle.

Primary implementation: `marketplace`, `extensions`, API marketplace/extension-registry modules.

Inspected evidence: Marketplace app has 34 implementation files/1 test; extensions have 36/5 across healthcare, education, field service and real estate. Catalog data appears local in the UI while registry/service modules also exist.

Current risk: Catalog authority is split and local UI data may not reflect registry truth; commercial and technical lifecycle evidence is sparse.

## Authoritative suite

- [PRD](PRD.md)
- [Requirements](REQUIREMENTS.md)
- [Architecture/TRD](ARCHITECTURE.md)
- [API, data and integration contracts](CONTRACTS.md)
- [Security/IAM/compliance](SECURITY.md)
- [UX/design requirements](EXPERIENCE.md)
- [Infrastructure, SRE, QA and operations](OPERATIONS.md)
- [Traceability](TRACEABILITY.md)
- [Archived vertical-extension provenance](evidence/archived-verticals/README.md)
