# Release, migration and recovery runbook

This is a proposed engineering runbook, not execution authorization. Production/staging changes, publication and restoration require explicit target-specific approval under existing governance.

## Candidate and promotion

1. Freeze exact ArtifactRevision IDs, dependency lock, compiler version and migration references into an immutable candidate.
2. Produce reproducible output; record digest, SBOM, license review, vulnerability results, signing identity and provenance. Pending signature or revoked key blocks use.
3. Resolve environment bindings independently; packages contain references, not credentials. Recheck entitlements and tenant policy at execution.
4. Run required functional, isolation, accessibility and performance gates against the exact candidate. Failed and Not run are blocking when required.
5. Obtain an independent approval with scope, environment, hash, expiry and reason. Changes invalidate prior approval; the requester cannot approve their own release.
6. Promote the same immutable bundle through approved stages. Do not rebuild different bytes silently in production.
7. Execute safe migrations and health probes before activation. Record the currently serving version separately from the candidate.
8. Activate only after all required checks pass; monitor defined burn-rate and business smoke signals. Record release outcome and atomic audit/outbox events.

## Schema and metadata change

Expand with additive compatible fields; backfill in bounded idempotent batches; reconcile rejected records; verify both old/new readers and writers; contract only after the approved compatibility window and consumer evidence. Keep immutable revisions. A UI metadata migration and a physical database migration may have different owners and execution gates; don't combine them through a client button that bypasses Data governance.

Paused backfill must report attempted/accepted/rejected/remaining with explicit definitions. A rejected record is not silently counted as successful. Resume uses checkpoint plus idempotency; changing transformation logic creates a reviewed new migration plan. Never use a destructive down migration as automatic recovery.

## Failure decision table

| Failure | Safe response | Proof before continuing |
| --- | --- | --- |
| Build or signature validation | Reject candidate; keep serving version | Corrected candidate digest and fresh security evidence |
| Binding unavailable | Hold activation; repair reference through owner | Capability and connection check, no credential copied |
| Migration partially applied | Pause; reconcile; prefer compatible roll forward | Checkpoint, rejected-row review, mixed-version proof |
| Health probe fails before activation | Keep prior serving bundle | Safe logs/trace, corrected probe or candidate, new evidence |
| Health degrades after activation | Incident and approved compatible recovery | Data compatibility review; do not roll back schema blindly |
| Signing key/extension revoked | Stop new execution per approved scope; propagate signed revocation | Affected consumers, active-run decision and containment evidence |
| Snapshot corruption/missing object | Fail rehearsal and preserve evidence | Alternate verified snapshot and manifest reconciliation |

## Restore rehearsal

Select a snapshot at or before the requested recovery point and verify metadata signature plus object digests. Restore to a new isolated environment; reconcile artifact store, packages, installations and release manifests. Rebind secret references separately with authorization. Run both runtime and authoring smoke tests and verify audit continuity. Measure achieved recovery point and elapsed recovery time against owner-approved policy. Snapshot presence is not restore success.

Production restore is a separate approved operation owned with PLT-OPS. Record exact target, impact, maintenance communication owner, data-loss expectation, decision authority, rollback/roll-forward options and post-restore reconciliation. This design package performs no restore or deployment.
