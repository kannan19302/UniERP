# Provider Platform API routes — batch 2

Generated lexical route evidence.

| Controller | Prefix | Verb | Route | Permissions in file | Public | Skip tenant | Adjacent spec |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `v1/control-plane-approvals.controller.ts` | `"platform/v1/approvals"` | POST | `` | 5 | 0 | 1 | no |
| `v1/control-plane-approvals.controller.ts` | `"platform/v1/approvals"` | POST | `":id/approve"` | 5 | 0 | 1 | no |
| `v1/control-plane-approvals.controller.ts` | `"platform/v1/approvals"` | POST | `":id/reject"` | 5 | 0 | 1 | no |
| `v1/control-plane-approvals.controller.ts` | `"platform/v1/approvals"` | GET | `"review-tasks"` | 5 | 0 | 1 | no |
| `v1/control-plane-approvals.controller.ts` | `"platform/v1/approvals"` | POST | `"review-tasks/:id/review"` | 5 | 0 | 1 | no |
| `v1/cost-allocation.controller.ts` | `"platform/v1/cost-allocation"` | GET | `":providerId/:period"` | 1 | 0 | 1 | yes |
| `v1/cost-ingestion.controller.ts` | `"platform/v1/cost"` | POST | `"ingest"` | 2 | 0 | 1 | no |
| `v1/cost-ingestion.controller.ts` | `"platform/v1/cost"` | GET | `":providerId/:period"` | 2 | 0 | 1 | no |
| `v1/customer-import.controller.ts` | `'platform/v1/imports'` | GET | `':tenantId'` | 3 | 0 | 1 | no |
| `v1/customer-import.controller.ts` | `'platform/v1/imports'` | POST | `':tenantId/validate'` | 3 | 0 | 1 | no |
| `v1/customer-import.controller.ts` | `'platform/v1/imports'` | POST | `'jobs/:jobId/execute'` | 3 | 0 | 1 | no |
| `v1/disaster-recovery.controller.ts` | `"platform/v1/disaster-recovery"` | POST | `":resourceId/backup-policy"` | 4 | 0 | 1 | no |
| `v1/disaster-recovery.controller.ts` | `"platform/v1/disaster-recovery"` | POST | `":resourceId/rehearse-restore"` | 4 | 0 | 1 | no |
| `v1/disaster-recovery.controller.ts` | `"platform/v1/disaster-recovery"` | POST | `":resourceId/rehearse-failover"` | 4 | 0 | 1 | no |
| `v1/disaster-recovery.controller.ts` | `"platform/v1/disaster-recovery"` | POST | `"failover/:rehearsalId/failback"` | 4 | 0 | 1 | no |
| `v1/dunning.controller.ts` | `'platform/v1/dunning'` | GET | `'status/:tenantId'` | 3 | 0 | 1 | no |
| `v1/dunning.controller.ts` | `'platform/v1/dunning'` | POST | `':tenantId/execute'` | 3 | 0 | 1 | no |
| `v1/dunning.controller.ts` | `'platform/v1/dunning'` | POST | `':tenantId/recover'` | 3 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"sla-uptimes"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"sla-uptimes"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"sla-uptimes/:id"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | PATCH | `"sla-uptimes/:id"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | DELETE | `"sla-uptimes/:id"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"sla-uptimes/:id/recalculate"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"sla-uptimes/:id/certify"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"sla-uptimes/metrics/monthly"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"sla-uptimes/batch-audit"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"sla-uptimes/export/pdf"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"isolation-policies"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"isolation-policies"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"billing-automations"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"billing-automations"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"domain-routings"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"domain-routings"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"key-rotations"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"key-rotations"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"backup-retentions"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"backup-retentions"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"residency-governances"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"residency-governances"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"oauth-credentials"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"oauth-credentials"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"tier-overrides"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"tier-overrides"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"support-escalations"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"support-escalations"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"federation-mappings"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"federation-mappings"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"audit-streams"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"audit-streams"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"rate-limit-policies"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"rate-limit-policies"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"addon-catalogs"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"addon-catalogs"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | GET | `"offboarding-seals"` | 38 | 0 | 1 | no |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | POST | `"offboarding-seals"` | 38 | 0 | 1 | no |
| `v1/entitlement-quota-binding.controller.ts` | `"platform/v1/entitlement-quota"` | POST | `":tenantId/sync"` | 2 | 0 | 1 | no |
| `v1/entitlement-quota-binding.controller.ts` | `"platform/v1/entitlement-quota"` | GET | `":tenantId"` | 2 | 0 | 1 | no |

