> **Migration status:** Distinct legacy infrastructure variant retained for reconciliation with the main migrated failover runbook.

# Database Failover Runbook

## Overview

This runbook describes the procedure to promote a Postgres read replica to the primary master in the event of an availability zone failure.

## Procedure

1. **Verify Outage**: Ensure the primary database is truly unreachable (check Datadog/CloudWatch).
2. **Halt Traffic**: Update PgBouncer configuration to block new incoming transactions.
3. **Promote Replica**:
   \`\`\`bash
   # Example command to promote via cloud provider CLI
   aws rds promote-read-replica --db-instance-identifier unierp-db-replica
   \`\`\`
4. **Update Connection Strings**: Point `DB_HOST` in production configuration to the new primary endpoint.
5. **Resume Traffic**: Unpause PgBouncer.
6. **Rebuild Replica**: Provision a new read replica from the new primary to restore redundancy.

## Backup & restore rehearsal (A22 / G-11)

Full database recovery is rehearsed, not assumed. The workspace runbook
`docs/RUNBOOK_BACKUP_RESTORE.md` owns the procedure; the nightly workflow
`.github/workflows/backup-restore.yml` (03:10 UTC) takes a backup and restores
it into a disposable database, proving restorability and **failing loudly** if
verification fails.

Measured 2026-08-08 against the full 1,845-table database: **RTO 30.9 s**
(restore + verify of a 6.3 MB dump into a clean database), **RPO 0.0 h** at
rehearsal start (fresh backup). Both inside the targets in the runbook (§ 4).
Run a manual rehearsal any time with `node scripts/rehearse-restore.mjs`.

