# AST controller summary: api/platform

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `v1/ai-governance.controller.ts` | `"platform/v1/ai"` | 22 | 22 | 0 | 0 | 0 | 19/19 | no | — |
| `v1/broadcast-maintenance.controller.ts` | `'platform/v1/broadcasts'` | 4 | 4 | 0 | 0 | 0 | 4/4 | no | — |
| `v1/budget.controller.ts` | `"platform/v1/budgets"` | 2 | 2 | 0 | 0 | 0 | 2/2 | no | — |
| `v1/capacity-forecast.controller.ts` | `"platform/v1/capacity"` | 4 | 4 | 0 | 0 | 0 | 10/10 | no | — |
| `v1/certificate-lifecycle.controller.ts` | `"platform/v1/certificates"` | 4 | 4 | 0 | 0 | 0 | 3/3 | no | — |
| `v1/cloud-accounts.controller.ts` | `"platform/v1/cloud-accounts"` | 2 | 2 | 0 | 0 | 0 | 1/1 | no | `OnboardCloudAccountInput` |
| `v1/cluster-routing.controller.ts` | `"platform/v1/cluster-routing-deep"` | 4 | 4 | 0 | 0 | 0 | 4/4 | no | — |
| `v1/compliance-control.controller.ts` | `"platform/v1/compliance-controls"` | 5 | 5 | 0 | 0 | 0 | 5/5 | no | — |
| `v1/control-plane-approvals.controller.ts` | `"platform/v1/approvals"` | 5 | 5 | 0 | 0 | 0 | 10/10 | no | `AuthenticatedRequest` |
| `v1/cost-allocation.controller.ts` | `"platform/v1/cost-allocation"` | 1 | 1 | 0 | 0 | 0 | 2/2 | yes | — |
| `v1/cost-ingestion.controller.ts` | `"platform/v1/cost"` | 2 | 2 | 0 | 0 | 0 | 3/3 | no | `IngestBillingExportInput` |
| `v1/customer-import.controller.ts` | `'platform/v1/imports'` | 3 | 3 | 0 | 0 | 0 | 5/5 | no | — |
| `v1/disaster-recovery.controller.ts` | `"platform/v1/disaster-recovery"` | 4 | 4 | 0 | 0 | 0 | 7/7 | no | — |
| `v1/dunning.controller.ts` | `'platform/v1/dunning'` | 3 | 3 | 0 | 0 | 0 | 5/5 | no | — |
| `v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | 38 | 38 | 0 | 0 | 0 | 75/75 | no | — |
| `v1/entitlement-quota-binding.controller.ts` | `"platform/v1/entitlement-quota"` | 2 | 2 | 0 | 0 | 0 | 2/2 | no | — |
| `v1/estate-abac.controller.ts` | `"platform/v1/estate-grants"` | 2 | 2 | 0 | 0 | 0 | 2/2 | no | — |
| `v1/estate.controller.ts` | `"platform/v1/estate"` | 5 | 5 | 0 | 0 | 0 | 12/12 | no | `Request & { user?: { userId?: string } }` |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | 22 | 22 | 0 | 0 | 0 | 45/45 | no | — |
| `v1/finops-recommendation.controller.ts` | `"platform/v1/finops"` | 3 | 3 | 0 | 0 | 0 | 4/4 | no | — |
| `v1/incident.controller.ts` | `"platform/v1/incidents"` | 1 | 1 | 0 | 0 | 0 | 1/1 | no | — |
| `v1/industry-suite-catalogue.controller.ts` | `"platform/v1/catalogue"` | 2 | 2 | 0 | 0 | 0 | 3/3 | no | — |
| `v1/infrastructure-resource.controller.ts` | `"platform/v1/infrastructure-resources"` | 4 | 4 | 0 | 0 | 0 | 7/7 | no | — |
| `v1/invoicing.controller.ts` | `'platform/v1/invoices'` | 4 | 4 | 0 | 0 | 0 | 6/6 | no | `AdjustInvoiceDto & { actorId?: string }`, `CreateCreditNoteDto & { actorId?: string }` |
| `v1/kubernetes-fleet.controller.ts` | `"platform/v1/kubernetes"` | 5 | 5 | 0 | 0 | 0 | 9/9 | no | `Request & { user?: { userId?: string } }` |
| `v1/live-tenant-upgrade.controller.ts` | `'platform/v1/tenant-upgrades'` | 4 | 4 | 0 | 0 | 0 | 7/7 | no | — |
| `v1/margin.controller.ts` | `"platform/v1/margin"` | 1 | 1 | 0 | 0 | 0 | 2/2 | no | — |
| `v1/marketplace/marketplace.controller.ts` | `'platform/v1/marketplace'` | 6 | 0 | 0 | 0 | 0 | 7/7 | no | — |
| `v1/metering.controller.ts` | `'platform/v1/metering'` | 6 | 6 | 0 | 0 | 0 | 18/18 | no | `RecordEventDto`, `Request` |
| `v1/observability-trace.controller.ts` | `"platform/v1/observability"` | 1 | 1 | 0 | 0 | 0 | 1/1 | no | — |
| `v1/operations.controller.ts` | `"platform/v1/operations"` | 11 | 11 | 0 | 3 | 0 | 12/12 | no | `AuthenticatedRequest` |
| `v1/plans.controller.ts` | `'platform/v1/plans'` | 5 | 5 | 0 | 0 | 0 | 10/10 | no | `CreatePlanDto`, `Request`, `{ data: UpdatePlanDto; reason: string }`, `{ prices: PriceDto[]; reason: string }` |
| `v1/privilege-elevation.controller.ts` | `"platform/v1/privilege-elevation"` | 2 | 2 | 0 | 0 | 0 | 3/3 | no | — |
| `v1/quota-admin.controller.ts` | `'platform/v1/quotas'` | 4 | 4 | 0 | 0 | 0 | 5/5 | no | — |
| `v1/release-control.controller.ts` | `'platform/v1/releases'` | 3 | 3 | 0 | 0 | 0 | 2/2 | no | — |
| `v1/reseller-channel.controller.ts` | `"platform/v1/reseller-channel-deep"` | 4 | 4 | 0 | 0 | 0 | 4/4 | no | — |
| `v1/retention-schedule.controller.ts` | `"platform/v1/retention-schedule"` | 2 | 2 | 0 | 0 | 0 | 1/1 | no | — |
| `v1/runbook.controller.ts` | `"platform/v1/runbooks"` | 4 | 4 | 0 | 0 | 0 | 6/6 | no | — |
| `v1/security-operations.controller.ts` | `'platform/v1/soc'` | 3 | 3 | 0 | 0 | 0 | 5/5 | no | — |
| `v1/staff-idp.controller.ts` | `"platform/v1/staff-idp"` | 1 | 1 | 0 | 0 | 0 | 1/1 | no | — |
| `v1/subscription-management.controller.ts` | `'platform/v1/subscriptions'` | 6 | 6 | 0 | 0 | 0 | 13/13 | no | `Request`, `SubscriptionTransitionDto` |
| `v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | 11 | 11 | 0 | 0 | 0 | 16/16 | no | `Request` |
| `v1/support-workspace.controller.ts` | `'platform/v1/support'` | 4 | 4 | 0 | 0 | 0 | 6/6 | no | — |
| `v1/telemetry.controller.ts` | `"platform/v1/telemetry"` | 3 | 3 | 0 | 0 | 0 | 10/10 | no | — |
| `v1/tenant-export-offboarding.controller.ts` | `'platform/v1/offboarding'` | 3 | 3 | 0 | 0 | 0 | 5/5 | no | — |
| `v1/tenant-lifecycle.controller.ts` | `"platform/v1/tenants"` | 8 | 8 | 0 | 0 | 0 | 16/16 | no | `AuthenticatedRequest` |
| `v1/tenant-migration.controller.ts` | `'platform/v1/migrations'` | 5 | 5 | 0 | 0 | 0 | 9/9 | no | — |
| `v1/webhook-integration.controller.ts` | `"platform/v1/integrations"` | 4 | 4 | 0 | 0 | 0 | 3/3 | no | — |
| `v1/white-label.controller.ts` | `"platform/v1/white-label-deep"` | 4 | 4 | 0 | 0 | 0 | 7/7 | no | — |

