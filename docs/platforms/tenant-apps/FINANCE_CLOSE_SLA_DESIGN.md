# Finance close SLA policies and task deadlines

Status: implemented locally; not production qualified. Owner decision: support both reusable policies and
task-specific deadlines. This specification extends ERP-FR-001 and ERP-NFR-001/002/003; it is not the final
Finance Golden Standard. Execution and verification remain in
[the Finance change contract](evidence/finance-v1-change-contract.md).

## Ownership and intent

PLT-ERP owns the close-management experience and requirements; PLT-BIZ owns Finance domain behavior.
L0 publishes HTTP and event contracts, and the data platform owns schema/migration enforcement.
CRM case SLA policies and workflow-node SLA rules retain their existing ownership and semantics.

A reusable policy defines response and resolution durations, task category, priority and escalation policy.
A task SLA records the actual obligation for one tenant-owned close task. Operators must be able to inspect
both the policy and the deadlines it produced. A later policy revision must never rewrite an existing task
obligation silently.

## Required state and invariants

- Policy identity is stable; published revisions are immutable and have an explicit version. Retiring a
  policy prevents new assignment while preserving historical references and audit evidence.
- Each task instance records its task ID, optional source policy revision, assignment/start instant,
  response deadline where applicable, resolution deadline, duration and unit, status and audit metadata.
  Existing `CloseTaskSla` rows retain their task-specific meaning and original deadlines. Historical rows
  without policy provenance must remain explicitly unlinked; migration must not fabricate a policy.
- Manual task deadlines remain supported independently of a reusable policy. Assignment from a policy
  snapshots the applied terms. Reapplication/amendment is an explicit, audited command with concurrency
  protection rather than an incidental effect of editing the policy.
- Durations retain the configured value and unit. Conversion to deadlines must validate representability,
  overflow and invalid timestamps without silent rounding. Calendar/business-hour behavior must be explicit
  in the published contract; a task's due date is not evidence of an SLA start instant.
- All references require the authenticated tenant in service logic and composite tenant foreign keys where
  applicable, plus FORCE RLS. Cross-tenant and no-context tests run with a NOBYPASSRLS role.
- State changes and versioned outbox events commit atomically. Assignment retries must not create duplicate
  obligations or events. Consumers use durable receipts, retries and reconciliation.

## HTTP compatibility and UI

The existing POST `/advanced-finance/close-management/slas` accepts policy-shaped fields (`name`, `taskType`,
`responseTimeHours`, `resolutionTimeHours`) but currently forwards them to a task-instance insert requiring
`taskId`, `deadlineAt` and `slaMinutes`. It cannot satisfy both contracts through field renaming.

Publish distinct, additive policy and task-instance contracts before implementation. Preserve accepted
policy request fields through an explicit compatibility adapter; do not infer an arbitrary task from
`taskType`. Existing task-list/status/breach endpoints retain their task-instance meaning. New canonical
paths, response schemas, revision semantics and compatibility tests must be specified together in L0.
No existing public operation may be silently repurposed or removed.

Persistence expansion uses separate policy identities and immutable policy-version rows. Version-to-rule
links carry tenant scope. Existing task SLA rows gain nullable provenance, start/response instants, exact
duration snapshots and idempotency metadata; no historical values are backfilled by inference. Composite
reference indexes on existing task/rule tables must be created concurrently in separate migration steps.
The task-reference foreign key is initially NOT VALID to preserve diagnosable legacy orphan records while
enforcing new writes; validation remains a required later gate after the orphan audit.
The expand migration also enables and forces the canonical tenant policy on the existing close tables created
after the last applicable bulk sweep. This repairs a migration-corpus isolation gap; it still requires the
generated NOBYPASSRLS positive, negative and no-context integration gate before qualification.

Close Management must provide separate policy and task-SLA views, with a policy-to-instance link and a
task selector scoped to the chosen financial period. Creation and amendment require `finance.close.manage`;
reading requires `finance.close.read`, and task/period selectors respect their own read permissions.
Loading, empty, unavailable-reference, failed-request, forbidden and offline behavior must be explicit.
The breached-SLA view reads actual stored records; an empty result must not claim the entire close is healthy.

## Delivery sequence and proof

1. Publish the policy/revision and task-instance HTTP/event schemas with compatibility examples and tests.
2. Add immutable expand migrations for policy identity/revisions and nullable instance provenance. Validate
   existing reference integrity before adding constraints; never guess or discard invalid historical rows.
3. Implement repository transactions, authorization, revision/assignment concurrency and atomic outbox.
4. Connect policy creation, inspection, revision/retirement and task assignment/amendment to Strata actions.
5. Prove two-tenant/no-context isolation, duplicate concurrent assignment, policy-edit isolation from existing
   tasks, outbox rollback, consumer replay and migration compatibility against real PostgreSQL.
6. Run supported-runtime typecheck, lint/build, focused tests, token/accessibility and authenticated E2E gates.

Outstanding: detailed L0 schemas, migration precision/compatibility decisions, implementation, runtime proof,
deployment and release. The owner's product choice authorizes design and local implementation; it does not
authorize a shared-database migration, publication, deployment or release.

## Canonical contract decisions

Canonical durations use positive safe-integer milliseconds and explicit `ELAPSED` time. This avoids implicit
business calendars and silent rounding. Legacy hour-based inputs remain a separate compatibility schema;
their adapter must reject unrepresentable conversions explicitly, and preserve rather than execute unknown
legacy escalation configuration. The new policy contract references existing tenant-owned escalation-rule
IDs, whose authorization and existence must be checked on assignment.

Policy creation defines revision 1. Revision creation requires `expectedVersion`; stale concurrent updates
fail. Policy assignment names an immutable policy-version ID, a real task ID, an offset-qualified start
instant and an idempotency key. Manual assignment names an explicit resolution deadline and optional
response deadline instead. Mixing manual deadlines with policy assignment is invalid. Deadlines must be
after the start instant, and a response deadline cannot follow the resolution deadline.

The additive policy and assignment contracts are mounted locally. Existing `/slas` request fields remain
available through an explicit compatibility adapter. Policy create/list/revise/retire and manual or
policy-derived task assignment return persisted identities and snapshots; client-provided durations never
override an identified policy revision. Policy retirement is expected-version guarded, emits a versioned
outbox event in the transaction and blocks new assignment without rewriting historical task deadlines.
