# ADR-0007: Developer platform compatibility and portability

Status: Accepted  
Date: 2026-08-21

## Decision

- All persisted metadata and published HTTP, event, SDK, builder and extension contracts are versioned.
- Additive changes preserve valid behavior within a major. Breaking changes require a new major, migrator, deprecation evidence and support window.
- Metadata migrations are deterministic, preserve historical revisions and carry golden fixtures.
- Persistent schema changes use expand, resumable backfill/reconciliation, mixed-version operation and contract.
- Canonical project export includes source metadata, manifests, schemas, tests, dependency locks and non-secret binding declarations.
- Clean-tenant import/export round trips are release-gated.
- Unknown extension fields survive every editor and API round trip.

## Consequences

Compatibility and export are continuously tested product behavior. They cannot be deferred to marketplace launch or compliance work.
