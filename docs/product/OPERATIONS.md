# UniERP Delivery, DevOps, SRE, Observability and QA

- `UNI-OPS-001`: Every deployable shall define owner, build artifact, dependencies, health and rollback.
- `UNI-OPS-002`: CI shall run boundary-appropriate tests and prove critical gates can fail.
- `UNI-OPS-003`: Production telemetry shall correlate request/command/event/job without exposing secrets or PII.
- `UNI-OPS-004`: Critical journeys shall have SLOs, alerting, dashboards and error-budget policy.
- `UNI-OPS-005`: Database/schema releases shall be backward-compatible or explicitly coordinated and recoverable.
- `UNI-OPS-006`: Backups, failover and restore shall be rehearsed against production-equivalent topology.
- `UNI-OPS-007`: Security, isolation, reconciliation and privacy incidents shall preserve evidence and notify owners.
- `UNI-OPS-008`: Capacity/load tests shall use critical journeys and reviewed thresholds.

Required QA portfolio: unit, policy/guard, controller, integration, isolation, property/invariant, migration,
contract, E2E, accessibility, visual, performance, security, resilience and recovery. Platform Operations files
map these to actual commands and evidence.
