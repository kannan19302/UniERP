# Models in prisma/schema/resource-model.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `ResourceKind` | no | no | 0 | 0 | 0 | ownership review |
| `Resource` | no | no | 0 | 0 | 0 | ownership review |
| `DesiredState` | no | no | 0 | 0 | 0 | ownership review |
| `DesiredStateVersion` | no | no | 0 | 0 | 2 | ownership review |
| `ObservedState` | no | no | 0 | 0 | 0 | ownership review |
| `Dependency` | no | no | 0 | 0 | 2 | ownership review |
| `DriftRecord` | no | no | 0 | 0 | 1 | ownership review |
| `ResourceAttribution` | yes | no | 0 | 0 | 0 | tenant signal |
| `CapacityObservation` | no | no | 0 | 2 | 1 | ownership review; Float review |
| `TelemetrySample` | no | no | 0 | 1 | 1 | ownership review; Float review |
| `EstateGrant` | yes | no | 0 | 0 | 1 | tenant signal |
| `BackupPolicy` | no | no | 0 | 0 | 0 | ownership review |
| `RestoreRehearsal` | no | no | 0 | 0 | 0 | ownership review |
| `FailoverRehearsal` | no | no | 0 | 0 | 0 | ownership review |
| `RetentionCertificate` | no | no | 0 | 0 | 0 | ownership review |

