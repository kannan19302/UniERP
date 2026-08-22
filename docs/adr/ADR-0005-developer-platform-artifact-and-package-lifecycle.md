# ADR-0005: Developer platform artifact and package lifecycle

Status: Accepted  
Date: 2026-08-21

## Context

The developer platform already has stable project and artifact identities, Library attachments and project releases. Mutable concrete builder rows and follow-head attachments cannot provide reproducible production releases, safe reuse or long-term schema evolution.

## Decision

- `BuilderArtifact` is stable identity and discovery metadata; `ArtifactRevision` is immutable canonical source.
- Canonical source uses the versioned `ArtifactEnvelopeV1` contract in `@kannan19302/contracts`.
- Artifact revisions are composed into immutable semantic `PackageVersion` records.
- Projects consume packages through installations. Production installations resolve to exact versions and content hashes.
- Package editability is `MANAGED`, `UNLOCKED` or `INTERNAL`. A fork creates new ownership; an overlay remains a distinct consumer-owned artifact.
- Releases reference only immutable revisions and package versions through `ReleaseManifestV1`.
- Concrete builder tables remain projections during incremental migration and are never the source of a production release after their builder migrates.
- Cross-artifact references use typed interfaces resolved at install time, not project-local row IDs embedded in portable source.

## Consequences

Publishing becomes a multi-stage operation rather than a status flag. The platform gains reproducibility, upgrade previews and rollback, at the cost of revision storage, projection reconciliation and compatibility tooling.

## Review triggers

Review if content-addressed storage changes, offline-first collaboration requires a different revision graph, or package federation crosses trust domains.
