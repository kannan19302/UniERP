# UniERP Product Architecture and TRD

## Platform topology

User-facing platforms consume Identity, Business Services, Design and Runtime Operations contracts. Provider
Admin OS is the provider control plane; Tenant Admin is tenant configuration; Tenant Apps is business execution.
Developer Platform and Marketplace mediate extension creation/distribution. Mobile, Desktop, Sites and Marketing
are distinct clients/surfaces, not alternative sources of business truth.

## Trust boundaries

Public network → client/BFF → identity/policy → authoritative API → tenant-isolated persistence; asynchronous
work crosses event/queue boundaries carrying tenant, correlation and causation. Infrastructure and secret-provider
boundaries are server-side only.

## Architecture requirements

- Published contracts, not repository imports, define cross-platform integration.
- Tenant context is verified server-side and enforced in persistence (ADR-0003).
- Business modules preserve local transactions and use an outbox for cross-module effects (ADR-0004).
- Identity owns principals, credentials, sessions, tokens and entitlement evaluation.
- Data and Business Services owns schemas and business invariants.
- Design Platform owns reusable UI behavior; clients own workflow composition.
- Runtime Operations owns deployment, telemetry, capacity and recovery standards.

## Current implementation shape

Inspected repositories include a 45-module API, extensive Prisma data package, versioned contracts, separate IDP,
three major Next.js control/application clients, Flutter mobile, extension/sandbox packages and infrastructure
assets. Platform traceability documents record where breadth is not yet proof of behavior.
