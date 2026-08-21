# Tenant Admin

Tenant-scoped administration for organization owners and delegated administrators. Provider estate operations
are explicitly outside this boundary.

Inspected evidence: `tenant-admin` is a Next.js 15/React 19 app on port 4006 with shared auth, framework, SDK
and UI dependencies. Its route tree includes access control, users, groups, SSO/MFA, security, branding,
localization, integrations, workflows, retention, audit and subscription configuration. Routes under
`settings/super-admin` contradict the intended tenant boundary and are treated as a gap pending authorization
and ownership inspection.

Documents: [PRD](PRD.md), [requirements](REQUIREMENTS.md), [architecture](ARCHITECTURE.md),
[contracts](CONTRACTS.md), [security](SECURITY.md), [experience](EXPERIENCE.md),
[operations](OPERATIONS.md), [traceability](TRACEABILITY.md).
