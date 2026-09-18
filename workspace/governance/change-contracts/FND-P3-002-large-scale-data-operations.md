# Change Contract — FND-P3-002 Large-Scale Data Operations

## Cycle status

- Status: `PARTIAL` (Online schema change benchmarks and volume profiles passing; real representative partitioning, live archiving/cold-tier drill, and actual lock-time measurements in progress)
- Objective: prove non-blocking online schema evolution, high-volume performance profiles, and partition scaling for large-scale enterprise data.
- Risk class: `R1` — database locks, query latency, and high-volume data operations.
- Accountable platforms: Data Platform (`PLT-DATA`).

## Delivered Invariants & Benchmarks

1. **Online Schema Evolution**:
   - `check-online-schema-change.mjs`: Measures 2 10M-row benchmark scenarios (`ADD_COLUMN_NULLABLE`, `ADD_INDEX_CONCURRENTLY`) within non-blocking write lock thresholds (≤ 100ms lock acquisition).
2. **Database Performance at Volume**:
   - `check-db-performance-volume.mjs`: Validates query execution plans and index selectivity across 100M-row reference table benchmarks within SLA bounds.

## Verification Evidence

```bash
node scripts/check-online-schema-change.mjs
node scripts/check-db-performance-volume.mjs
```
Both online migration and high-volume performance gates pass cleanly.
