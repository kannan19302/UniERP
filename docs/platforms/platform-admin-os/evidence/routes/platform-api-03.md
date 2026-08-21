# Provider Platform API routes — batch 3

Generated lexical route evidence.

| Controller | Prefix | Verb | Route | Permissions in file | Public | Skip tenant | Adjacent spec |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
| `v1/estate-abac.controller.ts` | `"platform/v1/estate-grants"` | POST | `` | 2 | 0 | 1 | no |
| `v1/estate-abac.controller.ts` | `"platform/v1/estate-grants"` | GET | `":id/authorize-plan"` | 2 | 0 | 1 | no |
| `v1/estate.controller.ts` | `"platform/v1/estate"` | GET | `"resources"` | 5 | 0 | 1 | no |
| `v1/estate.controller.ts` | `"platform/v1/estate"` | POST | `"bulk"` | 5 | 0 | 1 | no |
| `v1/estate.controller.ts` | `"platform/v1/estate"` | POST | `"bulk/:id/resume"` | 5 | 0 | 1 | no |
| `v1/estate.controller.ts` | `"platform/v1/estate"` | GET | `"unattributed"` | 5 | 0 | 1 | no |
| `v1/estate.controller.ts` | `"platform/v1/estate"` | POST | `"resources/:id/attribution"` | 5 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | POST | `"feature-flags/rules"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | GET | `"feature-flags/rules"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | GET | `"feature-flags/rules/:id"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | PATCH | `"feature-flags/rules/:id"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | DELETE | `"feature-flags/rules/:id"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | POST | `"feature-flags/evaluate/:flagKey"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | POST | `"feature-flags/bulk-evaluate"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | GET | `"feature-flags/audit-logs/:flagKey"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | POST | `"feature-flags/overrides"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | DELETE | `"feature-flags/overrides/:flagKey/:targetTenantId"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | GET | `"feature-flags/overrides/:targetTenantId"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | GET | `"feature-flags/export"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | POST | `"feature-flags/import"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | POST | `"metering/record"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | POST | `"metering/batch-record"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | GET | `"metering/usage-summary"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | GET | `"metering/quota-breach/:meterKey"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | POST | `"metering/quota-limits"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | GET | `"metering/quota-limits"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | POST | `"metering/reset/:meterKey"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | GET | `"metering/billing-breakdown/:billingCycleId"` | 22 | 0 | 1 | no |
| `v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | GET | `"metering/export-report"` | 22 | 0 | 1 | no |
| `v1/finops-recommendation.controller.ts` | `"platform/v1/finops"` | POST | `"recommendations"` | 3 | 0 | 1 | no |
| `v1/finops-recommendation.controller.ts` | `"platform/v1/finops"` | POST | `"recommendations/:id/execute"` | 3 | 0 | 1 | no |
| `v1/finops-recommendation.controller.ts` | `"platform/v1/finops"` | POST | `"recommendations/:id/measure"` | 3 | 0 | 1 | no |
| `v1/incident.controller.ts` | `"platform/v1/incidents"` | POST | `"simulate-breach"` | 1 | 0 | 1 | no |
| `v1/industry-suite-catalogue.controller.ts` | `"platform/v1/catalogue"` | GET | `"suites/:suiteId/compose"` | 2 | 0 | 1 | no |
| `v1/industry-suite-catalogue.controller.ts` | `"platform/v1/catalogue"` | POST | `"suites/:suiteId/provision"` | 2 | 0 | 1 | no |
| `v1/infrastructure-resource.controller.ts` | `"platform/v1/infrastructure-resources"` | POST | `` | 4 | 0 | 1 | no |
| `v1/infrastructure-resource.controller.ts` | `"platform/v1/infrastructure-resources"` | POST | `":id/change"` | 4 | 0 | 1 | no |
| `v1/infrastructure-resource.controller.ts` | `"platform/v1/infrastructure-resources"` | DELETE | `":id"` | 4 | 0 | 1 | no |
| `v1/infrastructure-resource.controller.ts` | `"platform/v1/infrastructure-resources"` | POST | `":id/observed-state"` | 4 | 0 | 1 | no |
| `v1/invoicing.controller.ts` | `'platform/v1/invoices'` | GET | `` | 4 | 0 | 1 | no |
| `v1/invoicing.controller.ts` | `'platform/v1/invoices'` | GET | `':id'` | 4 | 0 | 1 | no |
| `v1/invoicing.controller.ts` | `'platform/v1/invoices'` | POST | `'credit-notes'` | 4 | 0 | 1 | no |
| `v1/invoicing.controller.ts` | `'platform/v1/invoices'` | POST | `':id/adjust'` | 4 | 0 | 1 | no |

