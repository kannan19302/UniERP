# Runtime and Operations Platform

Platform for SRE, platform engineers, service owners, security and release managers. It owns environments, deployment, configuration, tenancy runtime context, policy/governor primitives, observability, SRE, backup/recovery and service conventions.

Primary implementation: `infra`, `config`, `kernel`, `shared`, `service-kit`.

Inspected evidence: Infra has 38 implementation files/13 tests with load tests, platform wizard and control-plane assets; kernel 10/5 exposes tenant governor/policy; shared 56/13; service-kit 5/2; config has almost no source implementation.

Current risk: Operational mechanisms are dispersed; config package appears nearly empty; deployment topology and tested recovery evidence are not centrally authoritative.

## Authoritative suite

- [PRD](PRD.md)
- [Requirements](REQUIREMENTS.md)
- [Architecture/TRD](ARCHITECTURE.md)
- [API, data and integration contracts](CONTRACTS.md)
- [Security/IAM/compliance](SECURITY.md)
- [UX/design requirements](EXPERIENCE.md)
- [Infrastructure, SRE, QA and operations](OPERATIONS.md)
- [Traceability](TRACEABILITY.md)
- [Generated repository dependency graph](evidence/repository-dependency-graph.md)
- [Legacy platform target architecture](evidence/legacy-platform-architecture-target.md)
- [Historical umbrella-platform changelog](evidence/legacy-unierp-platform-changelog.md)
- [Legacy test taxonomy](evidence/legacy-test-taxonomy.md)
- [Legacy secrets-custody evidence](evidence/legacy-secrets-custody.md)
- [Operational runbooks](runbooks/README.md)
