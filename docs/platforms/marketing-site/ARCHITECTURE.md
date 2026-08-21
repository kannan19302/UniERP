# Marketing Site Architecture and TRD

## Boundary

This platform owns public product/company content, lead capture, support/contact intake, legal content, SEO, analytics consent and controlled publishing. It consumes other platforms only through published contracts; repository proximity or direct imports do not transfer ownership.

## Required design views

- actor, tenant and provider trust zones;
- owned resources and lifecycle state machines;
- synchronous APIs, events and integration dependencies;
- persistent data ownership and retention;
- failure, retry, idempotency and reconciliation paths;
- deployment topology, scaling and recovery;
- implementation-to-test evidence.

## Architecture rules

Business invariants execute in authoritative services, authorization is server-side, tenant context is verified rather than client-trusted, and asynchronous effects carry correlation/causation. Shared behavior is consumed from its owning platform rather than copied.

Primary implementation: `marketing-site`.

Inspected evidence: Marketing site has 222 implementation files/4 tests, 142 app files and a local Prisma schema with Tenant, Domain, Setting, User, Lead and Ticket models.

Current risk: The public site contains its own tenant/user/lead/ticket persistence, creating data ownership and IAM overlap; product claims may drift from verified capabilities.

