# Tenant model to RLS migration linkage: prisma/schema/operation-pipeline.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `BlackoutPeriod` | `blackout_periods` | no | no | global/ownership review |
| `Job` | `jobs` | no | no | global/ownership review |
| `PlatformBulkOperation` | `platform_bulk_operations` | no | no | global/ownership review |
| `ScheduledOperation` | `scheduled_operations` | no | no | global/ownership review |
| `PlatformEventOutboxEntry` | `platform_event_outbox_entries` | no | no | global/ownership review |
| `WebhookEndpoint` | `webhook_endpoints` | no | no | global/ownership review |
| `WebhookDeliveryAttempt` | `webhook_delivery_attempts` | no | no | global/ownership review |

