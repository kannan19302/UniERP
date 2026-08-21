# ADR-0002: Product platforms own requirements; repositories implement them

- Status: Accepted
- Date: 2026-08-21

## Context

UniERP is a polyrepo with shared identity, APIs, data, contracts and design/runtime libraries. Treating each
repository as a product caused provider, tenant and business responsibilities to overlap.

## Decision

The platform catalog defines 13 product/runtime platforms. A platform may map to multiple repositories and a
shared repository may implement contracts for several platforms. Ownership follows business capability and
trust boundary, not directory location. Platform Admin OS owns provider authority; Tenant Admin owns tenant
configuration; Tenant Apps owns business workflows; Identity owns principals/sessions/tokens.

## Consequences

Cross-platform behavior requires published contracts and traceability. The `tenant-admin/settings/super-admin`
surface is a boundary gap until moved, removed or proven tenant-safe. Direct imports do not establish ownership.
