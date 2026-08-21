# Tenant Admin Architecture and TRD

The Tenant Admin web app is a tenant-scoped client. Identity lifecycle and authentication protocols belong to
the Identity Platform; business configuration belongs to service APIs; persistent state belongs to the Data and
Business Services platform. Tenant context must be established from the authenticated session and verified by
every backend, never trusted from a client-supplied tenant identifier.

Required layers: Next.js presentation; server session/BFF boundary; IAM policy decision and enforcement;
tenant administration APIs; outbox/audit propagation; tenant-scoped persistence. Changes use optimistic
concurrency and explicit validation against provider policy floors.

Prohibited: provider-wide service credentials in the app, `super-admin` authority for tenant principals,
cross-tenant search, direct database calls from UI, and UI-only authorization.
