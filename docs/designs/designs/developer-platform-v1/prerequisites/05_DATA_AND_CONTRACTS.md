# Data, contracts and lifecycle prerequisites

## Existing sources of truth

- [Canonical artifact contracts](../../../../unierp-contracts/src/developer-artifacts.ts): ArtifactEnvelopeV1, kinds, interfaces, capabilities, tests and extensions.
- [Developer metadata schema](../../../../data/prisma/schema/developer-platform.prisma): inspect current model names/relations before changing DDL.
- [Artifact revision controller](../../../../api/src/modules/developer/controllers/artifact-revisions.controller.ts): observed numeric If-Match and idempotent revision commands.
- [Package controller](../../../../api/src/modules/developer/controllers/developer-packages.controller.ts): observed package editability, install modes, capability mappings and signing/revocation.
- [Release controller](../../../../api/src/modules/developer/controllers/project-releases.controller.ts): observed candidate/release/deployment schemas.
- [Extension bundle format](../../../../extension-api/src/bundle.ts): canonical serialization, manifest/file digest and Ed25519 signature.

No endpoints or tables in this handoff are newly published. The observed API inventory records controller-relative paths only; deployment prefixes and compatibility policy must be resolved from owning contracts.

## Resource design table

| Concept | Identity / invariant | Lifecycle and consistency |
| --- | --- | --- |
| DevProject | Tenant-scoped; exactly one APP or SITE target | Draft → active → archived; no implicit ownership transfer |
| BuilderArtifact | Stable discovery identity; source owner project or library | Discovery metadata is not release source |
| ArtifactRevision | Immutable versioned envelope and hash | Append revision under optimistic concurrency |
| Package / version | Namespace/name, semantic version and signed immutable composition | Draft validation → reviewed publication → deprecation/revocation |
| Installation | Consumer project + exact package and mappings | Proposed → validated → installed → upgrade/uninstall review |
| Overlay | Consumer-owned source targeting declared extension point | Rebase against new package; unresolved conflict blocks upgrade |
| Change set | Base candidate, proposed revisions and impact | Draft → validating → reviewable → accepted/rejected |
| Release | Exact dependency lock, signatures, policy and evidence | Prepared → approved → built; later changes create a new candidate |
| Deployment | Release + target environment + durable operation | Queued → applying → verifying → active, or failed/canceled/recovery |
| Environment binding | Stable non-secret key → managed reference/version | Pending mapping → validated → bound → rotation/revocation |
| Test run | Candidate hash, fixture, environment, principal policy | Queued/running → passed/failed/not-run/canceled; no zero-discovery pass |
| Audit event | Immutable actor, scope, action, target and causality | Append-only with policy-governed retention/export |
| Preview session | Tenant/principal/candidate-bound temporary runtime | Provisioning → ready → expired/revoked; synthetic fixture defaults |

Exact schema models remain in the source inventory. Extend matching models rather than creating synonyms.

## Canonical envelope and compatibility

Required envelope: apiVersion, kind, metadata identity, spec, typed interfaces, dependencies, capabilities, tests and extensions. Each builder provides a versioned schema and semantic diff. Unknown fields survive visual/source/visual and import/export round trips. Do not accidentally discard unsupported fields through schema parsing. Dependency aliases map to typed interfaces at install time; portable source must not embed destination row IDs or secret material.

Canonical export includes metadata, schemas, tests, manifests, exact dependency locks, source provenance and non-secret binding declarations. Import first validates format, signatures, size/path limits, schema compatibility and policy; then resolves mappings in a dry run. A clean-tenant round trip must reproduce equivalent normalized source and lock resolution.

## Command contract checklist

Every command must specify actor, tenant/project/library target, permission/capability, schema version, validation, expected revision, idempotency semantics, operation/result envelope, audit event and retry behavior. Use existing canonical errors: unauthenticated, forbidden, validation, conflict, rate limit, dependency unavailable and internal failure with safe correlation.

Observed example: POST under dev/library/artifacts/:artifactId/revisions requires builder.write, idempotency and numeric If-Match. Do not generalize this observation as proof that every route meets the same boundary. Existing HTTP status details must be verified against published errors; changing them is a compatibility change.

Idempotency keys scope to tenant/principal/operation and payload digest. Same key + different payload rejects; concurrent equal requests produce one durable result. Revision comparison happens in the write transaction. On timeout, read operation state rather than blindly repeating side effects. Approval records bind to candidate digest and environment/policy; they expire or invalidate on change.

## Transactions, events and reconciliation

Commit state, required audit intent and outbox atomically. Event envelope includes ID/type/version, aggregate, tenant, time, correlation and causation. Consumers keep durable deduplication, bounded retry/backoff, dead-letter state and authorized replay. Order only where the aggregate requires it; use version checks rather than relying on global FIFO.

Build/sign/store operations span systems: write an intent, use content-addressed storage, verify digest, then finalize metadata with reconciliation for orphaned bundles or interrupted uploads. Deployment uses a fenced state machine, not one transaction across all services. A database restore and runtime rollback are different operations.

## Data lifecycle and migration plan

| Data class | Default treatment | Required decision/proof |
| --- | --- | --- |
| Artifact source and package metadata | Tenant intellectual property; encrypt and authorize | Owner retention schedule; export and legal hold behavior |
| Business data bindings | References only in portable source | Domain owner controls record lifecycle and public projection |
| Secrets | Managed vault references only | Rotation, dual-version overlap, revocation and access audit |
| Test data | Synthetic/minimized; isolated fixtures | Fixture provenance, cleanup, expiry and no production cloning |
| Logs/audit/evidence | Redacted, scope-filtered and integrity-protected | Distinct retention/residency/legal hold per class |
| Backups | Encrypted recovery material | Region, retention, key access and restore rehearsal |
| Public site content | Explicit reviewed projection | Consent/versioned cache invalidation and unpublish propagation |

Do not adopt dates or budgets from raster sample content as policy. Choose retention/residency and erasure behavior with the owning authority before persisting each resource.

Migrations use expand → resumable backfill → reconcile → mixed-version proof → contract. Every new tenant model needs server filtering and ENABLE/FORCE RLS with NOBYPASSRLS positive/negative/no-context tests. Preserve immutable history. Archive must not cascade-delete independent library sources or business records. Recheck cascade relations in existing schema before implementing archive/uninstall.
