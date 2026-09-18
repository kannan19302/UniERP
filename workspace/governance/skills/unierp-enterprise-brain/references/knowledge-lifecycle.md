# Knowledge lifecycle

Read this reference whenever a task can change what future agents need to know.

The normative policy is
`unierp-platform/docs/standards/AI_KNOWLEDGE_LIFECYCLE.md`. This reference explains its working procedure.

## Classify the knowledge delta

Before implementation and again during final diff review, classify the change:

| Delta | Required update |
| --- | --- |
| Product outcome, user, scope, business rule or success measure | Owning product/platform PRD and traceability |
| Functional or non-functional behavior | Owning requirements and traceability |
| Platform boundary, ownership or trust-zone decision | Platform catalog/specification and ADR when durable or cross-platform |
| Domain concept, aggregate, lifecycle, invariant or master-data owner | Owning architecture/data documentation and published contract |
| HTTP/event/webhook/SDK/extension behavior | Canonical contract and compatibility evidence before implementation |
| Schema, migration, retention, residency, erasure or lineage | Data architecture, migration plan, lifecycle policy and evidence |
| Authentication, permission, tenant/record scope or support access | Security specification, permission catalog, threat model and negative proof |
| UI pattern, state, token, interaction or accessibility behavior | Experience/design-system authority and relevant evidence |
| Infrastructure, SLO, alert, backup, recovery or runbook behavior | Operations authority, IaC/runbook and dated rehearsal evidence |
| Repository, package, workflow, toolchain or release topology | Repository/platform map, dependency/release manifest and validation tooling |
| Reusable agent decision procedure | This skill or its focused references |
| Implementation-only detail with no durable decision impact | Local code/tests; do not add durable brain content |

## Update order

1. Inspect current authority, evidence, consumers and diffs.
2. Record the change contract for R2/R3 work.
3. Update the owning requirement or propose/accept the necessary ADR.
4. Update published contracts and migration/compatibility expectations.
5. Implement the smallest coherent slice.
6. Add proof at the boundary that can fail for the behavior.
7. Update traceability and generated catalogs from inspected evidence.
8. Update this skill only when agent routing or reusable decision guidance changed.
9. Run the enterprise-brain validator and affected repository gates.
10. Report exact status, residual risk, expiry and the next required action.

## Anti-staleness rules

- Store each fact once at its owner and link to it elsewhere.
- Prefer generated repository, route, model, permission, dependency and test inventories over copied counts.
- Every generated artifact records source, command, timestamp/build revision and scope.
- Dated evidence cannot silently become normative intent.
- Deprecation retains owner, replacement, consumer migration, compatibility window and removal criterion.
- Renames update workspace inventory, entrypoints, scripts, workflows, contracts, docs and evidence atomically.
- Validation fails when expected discovery returns zero, an authority link is broken, a repository lacks an
  entrypoint, or a generated inventory no longer matches its source.
- Review the brain at every cross-platform change and at least once per release train. Record the review even when
  no brain update is necessary.

## Handoff checklist

State:

- knowledge delta: `NONE`, `UPDATED`, or `REQUIRED-BUT-INCOMPLETE`;
- authoritative files changed and why;
- generated evidence refreshed and its source revision;
- conflicts or duplications retired, retained, or awaiting an owner decision;
- validator and affected checks with pass/fail/not-run status.

If a required knowledge update is incomplete, the overall change cannot be `DONE`.
