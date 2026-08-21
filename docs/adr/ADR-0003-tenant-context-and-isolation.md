# ADR-0003: Tenant context is verified server-side and enforced in persistence

- Status: Accepted
- Date: 2026-08-21

## Context

The system serves provider operators and many tenants through web, mobile, APIs, background jobs, reports and
extensions. Client-supplied tenant identifiers or application filters alone cannot establish isolation.

## Decision

Authenticated session/token claims establish candidate tenant context; the authoritative service validates
membership, entitlement, permission and record scope. Tenant-owned persistence carries tenant ownership and a
database isolation policy. Jobs/events propagate immutable tenant and correlation context. Provider support
access is explicit, time/purpose-bound and audited.

## Consequences

Every tenant path needs positive and negative two-tenant evidence, including search, export, reporting, cache,
jobs and extensions. UI navigation is never authorization. Missing persistence enforcement is a release blocker
for the affected resource.
