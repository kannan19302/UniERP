# ADR-0006: Developer platform cells and runtime independence

Status: Accepted  
Date: 2026-08-21

## Context

A single shared control plane and database eventually create global failure, scaling and residency constraints. Already-deployed applications must not fail because authoring or release management is unavailable.

## Decision

- Scale through bounded regional cells with independent capacity and recovery.
- Tenant placement uses opaque logical identifiers resolved through a directory; identifiers do not encode region, shard or provider.
- Normal application serving reads locally available signed runtime bundles and policy caches and has no synchronous dependency on the global/control plane.
- Builds, deployments, workflows, integrations and analytics use isolated workload pools and per-tenant governors.
- Tenant relocation is an explicit online, reconciled state machine.
- Global services contain routing and placement metadata only, not normal tenant serving data.

## Consequences

The first deployment may use one cell, but placement, APIs and schemas must not assume there will only be one. Operations must test cell loss, control-plane loss and tenant relocation before multi-region GA.

## Review triggers

Review when introducing a new residency regime, storage engine, global consistency requirement or runtime class.
