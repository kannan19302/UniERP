# Tenant model to RLS migration linkage: prisma/schema/core-part-15.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `DocumentRecentItem` | `document_recent_items` | yes | no | RLS LINK GAP |
| `DocumentWatermark` | `document_watermarks` | yes | no | RLS LINK GAP |
| `StorageEncryption` | `storage_encryptions` | yes | no | RLS LINK GAP |
| `StorageReplication` | `storage_replications` | yes | no | RLS LINK GAP |
| `StorageBackup` | `storage_backups` | yes | no | RLS LINK GAP |
| `StorageAnalytic` | `storage_analytics` | yes | no | RLS LINK GAP |
| `StorageAlert` | `storage_alerts` | yes | no | RLS LINK GAP |
| `StorageMigration` | `storage_migrations` | yes | no | RLS LINK GAP |
| `StorageCompression` | `storage_compressions` | yes | no | RLS LINK GAP |
| `StorageDeduplication` | `storage_deduplications` | yes | no | RLS LINK GAP |
| `StorageSnapshot` | `storage_snapshots` | yes | no | RLS LINK GAP |
| `StorageRetentionPolicy` | `storage_retention_policies` | yes | no | RLS LINK GAP |
| `StorageComplianceLog` | `storage_compliance_logs` | yes | no | RLS LINK GAP |
| `StorageCache` | `storage_caches` | yes | no | RLS LINK GAP |
| `StorageSync` | `storage_syncs` | yes | no | RLS LINK GAP |
| `WorkflowTemplate` | `workflow_templates` | yes | no | RLS LINK GAP |
| `WorkflowCategory` | `workflow_categories` | yes | no | RLS LINK GAP |
| `WorkflowVersion` | `workflow_versions` | yes | no | RLS LINK GAP |
| `WorkflowCondition` | `workflow_conditions` | yes | no | RLS LINK GAP |
| `WorkflowLoop` | `workflow_loops` | yes | no | RLS LINK GAP |
| `WorkflowSubprocess` | `workflow_subprocesses` | yes | no | RLS LINK GAP |
| `WorkflowErrorHandler` | `workflow_error_handlers` | yes | no | RLS LINK GAP |
| `WorkflowNotification` | `workflow_notifications` | yes | no | RLS LINK GAP |
| `WorkflowWebhook` | `workflow_webhooks` | yes | no | RLS LINK GAP |
| `WorkflowMetric` | `workflow_metrics` | yes | no | RLS LINK GAP |
| `WorkflowTag` | `workflow_tags` | yes | no | RLS LINK GAP |
| `WorkflowTagAssignment` | `workflow_tag_assignments` | yes | no | RLS LINK GAP |

