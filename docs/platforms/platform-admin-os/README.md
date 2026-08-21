# Platform Admin OS

Provider-facing control plane for operating the UniERP SaaS estate. It is not the tenant administration
console and must not grant provider-wide capabilities to tenant principals.

## Implementation evidence inspected

- `provider-admin-os/package.json`: Next.js 15/React 19 application, development port 4002.
- `provider-admin-os/app/(control-plane)/`: provider routes for tenants, access, security, infrastructure,
  operations, billing, support, integrations, marketplace, AI and analytics.
- `provider-admin-os/app/api/`: local session/provider-login/operations-dashboard routes.
- Four test files observed: two component/unit and two E2E files.
- Shared dependencies: auth, framework, SDK and design system packages.

## Maturity statement

The surface is `PARTIAL`: route breadth is substantial, but inspected test evidence is too narrow to assert
that every control-plane page performs a real, authorized provider operation.

## Suite

- [Product requirements](PRD.md)
- [System requirements](REQUIREMENTS.md)
- [Architecture and TRD](ARCHITECTURE.md)
- [Contracts](CONTRACTS.md)
- [Security and compliance](SECURITY.md)
- [Experience](EXPERIENCE.md)
- [Operations and QA](OPERATIONS.md)
- [Traceability](TRACEABILITY.md)
- [Implementation and legacy design evidence](evidence/README.md)
