# Tenant model to RLS migration linkage: prisma/schema/resource-model.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `ResourceKind` | `resource_kinds` | no | no | global/ownership review |
| `Resource` | `resources` | no | no | global/ownership review |
| `DesiredState` | `desired_states` | no | no | global/ownership review |
| `DesiredStateVersion` | `desired_state_versions` | no | no | global/ownership review |
| `ObservedState` | `observed_states` | no | no | global/ownership review |
| `Dependency` | `dependencies` | no | no | global/ownership review |
| `DriftRecord` | `drift_records` | no | no | global/ownership review |
| `ResourceAttribution` | `resource_attributions` | yes | yes | STRUCTURAL LINK |
| `CapacityObservation` | `capacity_observations` | no | no | global/ownership review |
| `TelemetrySample` | `telemetry_samples` | no | no | global/ownership review |
| `EstateGrant` | `estate_grants` | yes | yes | STRUCTURAL LINK |
| `BackupPolicy` | `backup_policies` | no | no | global/ownership review |
| `RestoreRehearsal` | `restore_rehearsals` | no | no | global/ownership review |
| `FailoverRehearsal` | `failover_rehearsals` | no | no | global/ownership review |
| `RetentionCertificate` | `retention_certificates` | no | no | global/ownership review |

