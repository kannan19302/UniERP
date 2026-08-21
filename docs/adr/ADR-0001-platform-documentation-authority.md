# ADR-0001: Platform-level documentation is authoritative

- Status: Accepted
- Date: 2026-08-21

## Context

The polyrepo contained 191 Markdown files spread across repositories, a large central workspace set, duplicate
accessibility documents, and platforms with no documentation. Repository boundaries do not match product
boundaries, so requirements and controls were duplicated or absent.

## Decision

`D:/UniERP/docs/platforms/` owns normative platform requirements, architecture, contracts, security,
experience, operations and traceability. `docs/standards/` owns cross-platform rules. Repository Markdown is
limited to installation, development, contribution and security-contact information. Historical material is
non-normative.

## Consequences

Every requirement has a platform identifier and evidence status. Existing Markdown must be classified and
migrated before deletion. Product changes update the platform source first. Phase/agent state is excluded.
