> **Migration status:** Operational runbook migrated from the retired workspace. Procedure requires environment-specific rehearsal evidence.

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

