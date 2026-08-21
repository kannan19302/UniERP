# Provider Platform API routes — batch 6

Generated lexical route evidence.

| Controller | Prefix | Verb | Route | Permissions in file | Public | Skip tenant | Adjacent spec |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `v1/subscription-management.controller.ts` | `'platform/v1/subscriptions'` | GET | `':tenantId'` | 6 | 0 | 1 | no |
| `v1/subscription-management.controller.ts` | `'platform/v1/subscriptions'` | POST | `':tenantId'` | 6 | 0 | 1 | no |
| `v1/subscription-management.controller.ts` | `'platform/v1/subscriptions'` | PUT | `':tenantId/transition'` | 6 | 0 | 1 | no |
| `v1/subscription-management.controller.ts` | `'platform/v1/subscriptions'` | POST | `':tenantId/pause'` | 6 | 0 | 1 | no |
| `v1/subscription-management.controller.ts` | `'platform/v1/subscriptions'` | POST | `':tenantId/resume'` | 6 | 0 | 1 | no |
| `v1/subscription-management.controller.ts` | `'platform/v1/subscriptions'` | POST | `':tenantId/cancel'` | 6 | 0 | 1 | no |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | GET | `"tenants"` | 11 | 0 | 1 | no |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | GET | `"tenants/:id"` | 11 | 0 | 1 | no |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | POST | `"tenants/:id/impersonate"` | 11 | 0 | 1 | no |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | POST | `"tenants"` | 11 | 0 | 1 | no |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | PATCH | `"tenants/:id"` | 11 | 0 | 1 | no |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | GET | `"admins"` | 11 | 0 | 1 | no |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | GET | `"analytics"` | 11 | 0 | 1 | no |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | GET | `"health"` | 11 | 0 | 1 | no |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | GET | `"cross-tenant-search"` | 11 | 0 | 1 | no |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | GET | `"tenants/:id/audit-trail"` | 11 | 0 | 1 | no |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | GET | `"tenants/:id/audit-trail/export"` | 11 | 0 | 1 | no |
| `v1/support-workspace.controller.ts` | `'platform/v1/support'` | GET | `':tenantId/health'` | 4 | 0 | 1 | no |
| `v1/support-workspace.controller.ts` | `'platform/v1/support'` | GET | `':tenantId/tickets'` | 4 | 0 | 1 | no |
| `v1/support-workspace.controller.ts` | `'platform/v1/support'` | POST | `'tickets/:ticketId/resolve'` | 4 | 0 | 1 | no |
| `v1/support-workspace.controller.ts` | `'platform/v1/support'` | GET | `':tenantId/session-replay'` | 4 | 0 | 1 | no |
| `v1/telemetry.controller.ts` | `"platform/v1/telemetry"` | POST | `":resourceId/:metric"` | 3 | 0 | 1 | no |
| `v1/telemetry.controller.ts` | `"platform/v1/telemetry"` | GET | `":resourceId/:metric"` | 3 | 0 | 1 | no |
| `v1/telemetry.controller.ts` | `"platform/v1/telemetry"` | GET | `":resourceId/:metric/series"` | 3 | 0 | 1 | no |
| `v1/tenant-export-offboarding.controller.ts` | `'platform/v1/offboarding'` | GET | `':tenantId/exports'` | 3 | 0 | 2 | no |
| `v1/tenant-export-offboarding.controller.ts` | `'platform/v1/offboarding'` | POST | `':tenantId/export'` | 3 | 0 | 2 | no |
| `v1/tenant-export-offboarding.controller.ts` | `'platform/v1/offboarding'` | POST | `':tenantId/offboard'` | 3 | 0 | 2 | no |
| `v1/tenant-lifecycle.controller.ts` | `"platform/v1/tenants"` | GET | `":id/lifecycle"` | 8 | 0 | 1 | no |
| `v1/tenant-lifecycle.controller.ts` | `"platform/v1/tenants"` | POST | `":id/export"` | 8 | 0 | 1 | no |
| `v1/tenant-lifecycle.controller.ts` | `"platform/v1/tenants"` | POST | `":id/suspend"` | 8 | 0 | 1 | no |
| `v1/tenant-lifecycle.controller.ts` | `"platform/v1/tenants"` | POST | `":id/unsuspend"` | 8 | 0 | 1 | no |
| `v1/tenant-lifecycle.controller.ts` | `"platform/v1/tenants"` | POST | `":id/offboard"` | 8 | 0 | 1 | no |
| `v1/tenant-lifecycle.controller.ts` | `"platform/v1/tenants"` | POST | `":id/cancel-offboarding"` | 8 | 0 | 1 | no |
| `v1/tenant-lifecycle.controller.ts` | `"platform/v1/tenants"` | POST | `":id/purge"` | 8 | 0 | 1 | no |
| `v1/tenant-lifecycle.controller.ts` | `"platform/v1/tenants"` | GET | `"lifecycle/export-history"` | 8 | 0 | 1 | no |
| `v1/tenant-migration.controller.ts` | `'platform/v1/migrations'` | GET | `':tenantId/jobs'` | 5 | 0 | 1 | no |
| `v1/tenant-migration.controller.ts` | `'platform/v1/migrations'` | POST | `':tenantId/rehearse'` | 5 | 0 | 1 | no |
| `v1/tenant-migration.controller.ts` | `'platform/v1/migrations'` | POST | `':tenantId/start'` | 5 | 0 | 1 | no |
| `v1/tenant-migration.controller.ts` | `'platform/v1/migrations'` | POST | `'jobs/:jobId/complete'` | 5 | 0 | 1 | no |
| `v1/tenant-migration.controller.ts` | `'platform/v1/migrations'` | POST | `'jobs/:jobId/rollback'` | 5 | 0 | 1 | no |
| `v1/webhook-integration.controller.ts` | `"platform/v1/integrations"` | GET | `"events/catalog"` | 4 | 0 | 1 | no |
| `v1/webhook-integration.controller.ts` | `"platform/v1/integrations"` | GET | `"events/replay"` | 4 | 0 | 1 | no |
| `v1/webhook-integration.controller.ts` | `"platform/v1/integrations"` | POST | `"events/emit"` | 4 | 0 | 1 | no |
| `v1/webhook-integration.controller.ts` | `"platform/v1/integrations"` | POST | `"webhooks/deliver"` | 4 | 0 | 1 | no |

