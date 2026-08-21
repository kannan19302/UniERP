# Provider Platform API routes — batch 4

Generated lexical route evidence.

| Controller | Prefix | Verb | Route | Permissions in file | Public | Skip tenant | Adjacent spec |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `v1/kubernetes-fleet.controller.ts` | `"platform/v1/kubernetes"` | GET | `"routing"` | 5 | 0 | 1 | no |
| `v1/kubernetes-fleet.controller.ts` | `"platform/v1/kubernetes"` | GET | `"routing/:id"` | 5 | 0 | 1 | no |
| `v1/kubernetes-fleet.controller.ts` | `"platform/v1/kubernetes"` | POST | `"routing/propose"` | 5 | 0 | 1 | no |
| `v1/kubernetes-fleet.controller.ts` | `"platform/v1/kubernetes"` | POST | `"routing/apply"` | 5 | 0 | 1 | no |
| `v1/kubernetes-fleet.controller.ts` | `"platform/v1/kubernetes"` | POST | `"routing/:resourceId/rollback"` | 5 | 0 | 1 | no |
| `v1/live-tenant-upgrade.controller.ts` | `'platform/v1/tenant-upgrades'` | GET | `':tenantId/status'` | 4 | 0 | 1 | no |
| `v1/live-tenant-upgrade.controller.ts` | `'platform/v1/tenant-upgrades'` | POST | `':tenantId/compatibility'` | 4 | 0 | 1 | no |
| `v1/live-tenant-upgrade.controller.ts` | `'platform/v1/tenant-upgrades'` | POST | `':tenantId/upgrade'` | 4 | 0 | 1 | no |
| `v1/live-tenant-upgrade.controller.ts` | `'platform/v1/tenant-upgrades'` | POST | `':tenantId/rollback'` | 4 | 0 | 1 | no |
| `v1/margin.controller.ts` | `"platform/v1/margin"` | GET | `":tenantId/:period"` | 1 | 0 | 1 | no |
| `v1/marketplace/marketplace.controller.ts` | `'platform/v1/marketplace'` | GET | `'extensions'` | 0 | 0 | 0 | no |
| `v1/marketplace/marketplace.controller.ts` | `'platform/v1/marketplace'` | GET | `'submissions'` | 0 | 0 | 0 | no |
| `v1/marketplace/marketplace.controller.ts` | `'platform/v1/marketplace'` | GET | `'extensions/:appSlug/installations'` | 0 | 0 | 0 | no |
| `v1/marketplace/marketplace.controller.ts` | `'platform/v1/marketplace'` | POST | `':id/approve'` | 0 | 0 | 0 | no |
| `v1/marketplace/marketplace.controller.ts` | `'platform/v1/marketplace'` | POST | `':id/reject'` | 0 | 0 | 0 | no |
| `v1/marketplace/marketplace.controller.ts` | `'platform/v1/marketplace'` | POST | `'extensions/:appSlug/emergency-revoke'` | 0 | 0 | 0 | no |
| `v1/metering.controller.ts` | `'platform/v1/metering'` | GET | `':tenantId/usage'` | 6 | 0 | 1 | no |
| `v1/metering.controller.ts` | `'platform/v1/metering'` | GET | `':tenantId/events/:metric'` | 6 | 0 | 1 | no |
| `v1/metering.controller.ts` | `'platform/v1/metering'` | POST | `':tenantId/events'` | 6 | 0 | 1 | no |
| `v1/metering.controller.ts` | `'platform/v1/metering'` | POST | `':tenantId/reconcile/:metric'` | 6 | 0 | 1 | no |
| `v1/metering.controller.ts` | `'platform/v1/metering'` | POST | `':tenantId/provider-consumption/:providerId/:metric/:period'` | 6 | 0 | 1 | no |
| `v1/metering.controller.ts` | `'platform/v1/metering'` | GET | `':tenantId/provider-reconcile/:providerId/:metric/:period'` | 6 | 0 | 1 | no |
| `v1/observability-trace.controller.ts` | `"platform/v1/observability"` | GET | `"trace/:correlationId"` | 1 | 0 | 1 | no |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | GET | `"health"` | 11 | 0 | 5 | no |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | GET | `"dashboard"` | 11 | 0 | 5 | no |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | GET | `"jobs"` | 11 | 0 | 5 | no |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | POST | `"jobs/retry"` | 11 | 0 | 5 | no |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | GET | `"tasks"` | 11 | 0 | 5 | no |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | POST | `"tasks/:id/trigger"` | 11 | 0 | 5 | no |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | GET | `"logs"` | 11 | 0 | 5 | no |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | POST | `"logs/:id/resolve"` | 11 | 0 | 5 | no |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | GET | `"backups"` | 11 | 0 | 5 | no |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | POST | `"backups/create"` | 11 | 0 | 5 | no |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | GET | `"db-schema"` | 11 | 0 | 5 | no |
| `v1/plans.controller.ts` | `'platform/v1/plans'` | GET | `` | 5 | 0 | 1 | no |
| `v1/plans.controller.ts` | `'platform/v1/plans'` | GET | `':id'` | 5 | 0 | 1 | no |
| `v1/plans.controller.ts` | `'platform/v1/plans'` | POST | `` | 5 | 0 | 1 | no |
| `v1/plans.controller.ts` | `'platform/v1/plans'` | PUT | `':id'` | 5 | 0 | 1 | no |
| `v1/plans.controller.ts` | `'platform/v1/plans'` | POST | `':id/prices'` | 5 | 0 | 1 | no |

