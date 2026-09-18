# Observability, SLOs and capacity qualification

Targets below are proposed qualification starting points, not measured performance, contractual SLA or approved production policy. SRE and Product must approve workload, window, thresholds and exclusions before release. Screen sample metrics are illustrations only.

| Signal | Proposed qualification target | Measurement |
| --- | --- | --- |
| Authoring read/save API | p95 <= 500 ms excluding client network, under agreed pilot load | Trace boundary, payload size and dependency timing |
| Editor response | Common local property edit visible <= 100 ms on agreed reference device | Browser interaction trace, large document fixture |
| Authoring availability | 99.9% over approved monthly window | Valid eligible requests; distinguish user validation errors from service failure |
| Preview startup | p95 <= 10 seconds for a defined warm fixture | Queue, compile, binding and runtime stages separately |
| Event delivery | No lost committed events in fault-injection suite | Outbox-to-consumer reconciliation, retry/DLQ age |
| Tenant fairness | One saturated tenant cannot exhaust another's reserved service | Concurrent tenants, bounded queue/pool and cancellation proof |
| Recovery | RPO/RTO policy-defined, measured in rehearsal | Snapshot point, start/end, integrity and smoke evidence |

Record workload: tenant count, project count, nodes per document, graph edges, schema size, package size, concurrent editors/builds and cold/warm cache. Start with representative small/medium/large fixtures; agree numeric volumes using customer evidence before making capacity promises. Test slow network, interrupted save, large imports and long-running jobs.

Instrument request/command ID, trace/span ID, project/artifact/revision reference, environment, operation stage, outcome and safe error code. Keep tenant identifiers access-controlled and minimize high-cardinality metric labels. Never emit document contents, secrets, raw prompts or personal records into telemetry. Use Pino/Otel conventions from the owning API standards.

Dashboards should expose API latency/errors, compile queue age, save conflict rate, outbox lag, DLQ age, sandbox resource exhaustion, failed bindings, signature/revocation state, release health and quota consumption. Error budgets must use the same numerator/denominator/window as the SLO; a 24-hour sample is not a monthly budget calculation.

Alert on sustained multi-window burn, growing durable backlog, isolation violations, failed integrity checks and revocation lag. Each alert needs an owner, severity, safe diagnostics, runbook, escalation path and resolution condition. Route provider-wide incidents to PLT-OPS; tenant users receive scoped status without provider control privileges.

Quotas are enforced server-side before admission and during bounded execution. OCC owns commercial entitlements. Developer can expose scoped consumption and draft alerts, then hand off requests for increased limits. Hard-limit behavior must define queue/reject/cancel policies explicitly; never silently terminate protected running work. Show cost as unavailable until an authoritative tariff source is integrated.
