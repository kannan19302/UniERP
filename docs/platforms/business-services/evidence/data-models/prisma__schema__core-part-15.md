# Models in prisma/schema/core-part-15.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `DocumentRecentItem` | yes | no | 0 | 0 | 2 | tenant signal |
| `DocumentWatermark` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `StorageEncryption` | yes | no | 0 | 0 | 1 | tenant signal |
| `StorageReplication` | yes | no | 0 | 0 | 1 | tenant signal |
| `StorageBackup` | yes | no | 0 | 0 | 1 | tenant signal |
| `StorageAnalytic` | yes | no | 0 | 0 | 1 | tenant signal |
| `StorageAlert` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `StorageMigration` | yes | no | 0 | 0 | 1 | tenant signal |
| `StorageCompression` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `StorageDeduplication` | yes | no | 0 | 0 | 1 | tenant signal |
| `StorageSnapshot` | yes | no | 0 | 0 | 1 | tenant signal |
| `StorageRetentionPolicy` | yes | no | 0 | 0 | 1 | tenant signal |
| `StorageComplianceLog` | yes | no | 0 | 0 | 2 | tenant signal |
| `StorageCache` | yes | no | 0 | 0 | 2 | tenant signal |
| `StorageSync` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowTemplate` | yes | no | 0 | 0 | 2 | tenant signal |
| `WorkflowCategory` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowVersion` | yes | no | 0 | 0 | 2 | tenant signal |
| `WorkflowCondition` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowLoop` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowSubprocess` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowErrorHandler` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowNotification` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowWebhook` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowMetric` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `WorkflowTag` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowTagAssignment` | yes | no | 0 | 0 | 2 | tenant signal |

