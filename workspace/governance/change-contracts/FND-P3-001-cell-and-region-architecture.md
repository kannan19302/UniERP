# Change Contract — FND-P3-001 Cell and Region Architecture

## Cycle status

- Status: `PARTIAL` (Connection pool fairness verified; multi-cell tenant placement, cross-cell outbox, and regional failover in progress)
- Objective: establish cell taxonomy, tenant routing boundaries, connection fairness, and isolated cross-cell resiliency.
- Risk class: `R2` — multi-cell placement and tenant fairness.
- Accountable platforms: Architecture and Runtime Operations (`PLT-OPS`, `PLT-GOV`).

## Architectural Capabilities

1. **Connection Pool Fairness**:
   - `check-connection-fairness.mjs`: Proves that noisy/adversarial tenants cannot exhaust the connection pool. Capped at 20 connections per tenant (80 blocked); legitimate tenant connections preserved without starvation.
2. **Cell Routing Topology**:
   - Architecture defined in `docs/architecture/repo-layer-graph.md` and `docs/architecture/event-flow.md`.
   - Cell-level tenant partition routing ensures independent failure domains.
3. **Cell Routing Governor & Partition Isolation**:
   - `scripts/check-cell-routing-governor.mjs`: Proves deterministic tenant cell affinity, data sovereignty jurisdiction enforcement (`US`, `EU`), cross-cell query mismatch rejection, and failure blast-radius isolation.

## Verification Evidence

```bash
node scripts/check-connection-fairness.mjs
node scripts/check-cell-routing-governor.mjs
```
Connection pool fairness and cell governor gates pass cleanly.

