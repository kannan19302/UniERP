# API and IDP Controller Inventory — Historical Snapshot

Generated from then-current Nest controller source on 2026-08-21. This retained snapshot is evidence only; it is
not the authorization source of truth and must not be used to claim current coverage. The active fail-closed
inventory is `unierp-workspace/scripts/check-http-authorization-inventory.mjs` under FND-P0-005. It derives routes
from the current workspace estate, requires either `@Public(reason)` or `@Permissions(...)`, and reports a
permission declaration without an RBAC guard as a blocking gap. HTTP and decorator counts below remain lexical
structural signals, not proof of record, tenant or runtime authorization.

## Summary

| Repository | Controllers | HTTP method decorators | Permission decorators | Public decorators | Skip-tenant decorators | Adjacent spec found |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `api` | 579 | 12832 | 12797 | 30 | 55 | 1 |
| `idp` | 20 | 99 | 55 | 0 | 1 | 0 |

## Controller evidence

| Repo | Controller file | Prefix declaration | HTTP methods | Permission decorators | Public | Skip tenant | Adjacent spec | Review signal |
| --- | --- | --- | ---: | ---: | ---: | ---: | --- | --- |
| api | `common/controllers/bulk-operations.controller.ts` | `"bulk"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `common/controllers/change-history.controller.ts` | `"change-history"` | 1 | 1 | 0 | 0 | no | no adjacent spec |
| api | `common/controllers/data-quality.controller.ts` | `"data-quality"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `common/controllers/enterprise-audit.controller.ts` | `"audit"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `common/controllers/export-v2.controller.ts` | `"export/v2"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `common/controllers/import.controller.ts` | `"import"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `common/platform-credentials/platform-credentials.controller.ts` | `"admin/platform-credentials"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/builder-enterprise.controller.ts` | `"builder/enterprise"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/builder-expansion.controller.ts` | `"builder"` | 21 | 21 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/builder.controller.ts` | `"builder"` | 143 | 143 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/controllers/ab-testing.controller.ts` | `"builder"` | 17 | 17 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/controllers/advanced-forms.controller.ts` | `"builder"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/controllers/api-builder.controller.ts` | `"builder"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/controllers/bpmn.controller.ts` | `"builder"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/controllers/builder-deep-expansion.controller.ts` | `"builder/deep-expansion"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/controllers/data-objects.controller.ts` | `"builder/data-objects"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/controllers/etl.controller.ts` | `"builder"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/controllers/mobile-builder.controller.ts` | `"builder"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/controllers/rules-engine.controller.ts` | `"builder"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/controllers/theme-manager.controller.ts` | `"builder"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/governance.controller.ts` | `"builder/governance"` | 20 | 20 | 0 | 0 | no | no adjacent spec |
| api | `developer/builder/web-public.controller.ts` | `"public/web"` | 7 | 0 | 7 | 0 | no | no adjacent spec |
| api | `developer/builder/web-studio.controller.ts` | `"builder/web-studio"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `developer/platform/dev-home.controller.ts` | `"dev"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `developer/platform/library.controller.ts` | `"library"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `developer/platform/project-artifacts.controller.ts` | `"dev"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `developer/platform/project-releases.controller.ts` | `"dev/projects"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `health.controller.ts` | `` | 2 | 0 | 2 | 0 | no | no adjacent spec |
| api | `metrics.controller.ts` | `` | 1 | 0 | 1 | 0 | no | no adjacent spec |
| api | `modules/admin/activity-feed.controller.ts` | `"admin/activity-feed"` | 1 | 1 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/admin.controller.ts` | `"admin"` | 35 | 35 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/alerts.controller.ts` | `"admin/alerts"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/announcements.controller.ts` | `"admin/announcements"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/automation-rules.controller.ts` | `"admin/automation-rules"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/bulk-operations.controller.ts` | `"admin/bulk-operations"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/custom-fields.controller.ts` | `"admin/custom-fields"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/data-quality.controller.ts` | `"admin/data-quality"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/error-reports.controller.ts` | `"public/error-reports"` | 1 | 0 | 1 | 0 | no | no adjacent spec |
| api | `modules/admin/import-export.controller.ts` | `"admin/imports"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/platform.controller.ts` | `"admin/platform"` | 24 | 24 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/recycle-bin.controller.ts` | `"admin/recycle-bin"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/subscription.controller.ts` | `"admin/subscription"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/admin/support-impersonation.controller.ts` | `"admin/support-impersonation"` | 3 | 3 | 0 | 2 | no | tenant bypass; no adjacent spec |
| api | `modules/advanced-finance/advanced-finance.controller.ts` | `"advanced-finance"` | 503 | 503 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/ai-analytics.controller.ts` | `"advanced-finance/ai-analytics"` | 33 | 33 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/ap-automation.controller.ts` | `"advanced-finance/ap-automation"` | 30 | 30 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/ar-credit-management.controller.ts` | `"advanced-finance/ar-credit"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/asc606-deep.controller.ts` | `"advanced-finance/asc606"` | 33 | 33 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/budget-deep.controller.ts` | `"advanced-finance/budget-deep"` | 31 | 31 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/close-management.controller.ts` | `"advanced-finance/close-management"` | 21 | 21 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/consolidation-v2.controller.ts` | `"advanced-finance/consolidation-v2"` | 26 | 26 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/e-invoice.controller.ts` | `"advanced-finance/e-invoice"` | 58 | 58 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/esg-accounting.controller.ts` | `"advanced-finance/esg"` | 41 | 41 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/finance-expansion-deep.controller.ts` | `"advanced-finance/expansion"` | 220 | 220 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/finance-more-deep.controller.ts` | `"advanced-finance/more-deep"` | 81 | 81 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/finance-tax-journal-deep.controller.ts` | `"advanced-finance"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/financial-instruments.controller.ts` | `"advanced-finance/financial-instruments"` | 24 | 24 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/fixed-asset-deep.controller.ts` | `"advanced-finance/fixed-assets"` | 55 | 55 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/global-tax-deep.controller.ts` | `"advanced-finance/global-tax"` | 29 | 29 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/netting-deep.controller.ts` | `"advanced-finance/netting"` | 32 | 32 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/opening-balance-migration.controller.ts` | `"advanced-finance/opening-balance-migration"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/risk-management.controller.ts` | `"advanced-finance/risk-management"` | 31 | 31 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/subscription-billing.controller.ts` | `"advanced-finance/subscriptions"` | 62 | 62 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/tax-provisioning.controller.ts` | `"advanced-finance/tax-provisioning"` | 36 | 36 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/treasury-deep.controller.ts` | `"advanced-finance/treasury-deep"` | 57 | 57 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-finance/working-capital.controller.ts` | `"advanced-finance/working-capital"` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-hr/advanced-hr-benefits-admin-deep.controller.ts` | `"advanced-hr/benefits-admin-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-hr/advanced-hr-compensation-bands-deep.controller.ts` | `"advanced-hr/compensation-bands-deep"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-hr/advanced-hr-exit-interview-deep.controller.ts` | `"advanced-hr/exit-interview-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-hr/advanced-hr-learning-paths-deep.controller.ts` | `"advanced-hr/learning-paths-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-hr/advanced-hr-org-chart-deep.controller.ts` | `"advanced-hr/org-chart-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-hr/advanced-hr-succession-planning-deep.controller.ts` | `"advanced-hr/succession-planning-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-hr/advanced-hr-workforce-analytics-deep.controller.ts` | `"advanced-hr/workforce-analytics-deep"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-hr/advanced-hr-workforce-deep.controller.ts` | `"advanced-hr/workforce-deep"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/advanced-hr/advanced-hr.controller.ts` | `"advanced-hr"` | 90 | 90 | 0 | 0 | no | no adjacent spec |
| api | `modules/ai/ai-admin.controller.ts` | `"admin/ai"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/ai/ai-deep.controller.ts` | `"ai"` | 17 | 17 | 0 | 0 | no | no adjacent spec |
| api | `modules/ai/ai-enterprise.controller.ts` | `"ai/enterprise"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/ai/ai-expansion.controller.ts` | `"ai"` | 25 | 25 | 0 | 0 | no | no adjacent spec |
| api | `modules/ai/ai.controller.ts` | `"ai"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/analytics-anomaly-detection-deep.controller.ts` | `"analytics/anomaly-detection-deep"` | 1 | 1 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/analytics-cohort-retention-deep.controller.ts` | `"analytics/cohort-retention-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/analytics-custom-dashboards-deep.controller.ts` | `"analytics/custom-dashboards-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/analytics-data-pipelines-deep.controller.ts` | `"analytics/data-pipelines-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/analytics-deep.controller.ts` | `"analytics"` | 21 | 21 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/analytics-enterprise.controller.ts` | `"analytics/enterprise"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/analytics-expansion.controller.ts` | `"analytics"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/analytics-funnel-conversion-deep.controller.ts` | `"analytics/funnel-conversion-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/analytics-predictive-engine-deep.controller.ts` | `"analytics/predictive-engine-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/analytics-realtime-stream-deep.controller.ts` | `"analytics/realtime-stream-deep"` | 1 | 1 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/analytics.controller.ts` | `"analytics"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/analytics/settings.controller.ts` | `"analytics/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/api-platform/api-platform-deep-v2.controller.ts` | `"api-platform"` | 48 | 48 | 0 | 0 | no | no adjacent spec |
| api | `modules/api-platform/api-platform-deep-v3.controller.ts` | `"api-platform"` | 25 | 25 | 0 | 0 | no | no adjacent spec |
| api | `modules/api-platform/api-platform-deep.controller.ts` | `"api-platform"` | 38 | 38 | 0 | 0 | no | no adjacent spec |
| api | `modules/api-platform/api-platform-generated.controller.ts` | `"api-platform"` | 70 | 70 | 0 | 0 | no | no adjacent spec |
| api | `modules/api-platform/api-platform.controller.ts` | `"admin/api-platform"` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/blockchain/blockchain-deep.controller.ts` | `"blockchain"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/blockchain/blockchain-generated.controller.ts` | `"blockchain"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/blockchain/blockchain.controller.ts` | `"blockchain"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/communication-enterprise.controller.ts` | `"communication/enterprise"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/communication-expansion.controller.ts` | `"communication"` | 21 | 21 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/communication.controller.ts` | `"communication"` | 102 | 102 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/controllers/comm-deep-expansion.controller.ts` | `"communication/deep-expansion"` | 21 | 21 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/controllers/helpdesk.controller.ts` | `"communication/helpdesk"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/controllers/knowledge-base.controller.ts` | `"communication/knowledge"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/controllers/omnichannel.controller.ts` | `"communication/omnichannel"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/controllers/real-time-collab.controller.ts` | `"communication/collab"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/controllers/search.controller.ts` | `"communication/enterprise-search"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/controllers/survey.controller.ts` | `"communication/surveys"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/controllers/video-deep.controller.ts` | `"communication/video"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/controllers/voip.controller.ts` | `"communication/voip"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/communication/settings.controller.ts` | `"communication/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-abm-orchestration.controller.ts` | `"crm/abm-orchestration"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-account-hierarchies-deep.controller.ts` | `"crm/account-hierarchies-deep"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-account-intelligence-deep.controller.ts` | `"crm/account-intelligence-deep"` | 26 | 26 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-activity-capture.controller.ts` | `"crm/activity-capture"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-ai-drafting.controller.ts` | `"crm/ai-drafting"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-ai-intelligence.controller.ts` | `"crm/ai-intelligence"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-cadences.controller.ts` | `"crm/cadences"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-coaching-deep.controller.ts` | `"crm/coaching-deep"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-coaching.controller.ts` | `"crm/coaching"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-commission-automation.controller.ts` | `"crm/commission-plans"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-communication-deep.controller.ts` | `"crm/communication-deep"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-communication.controller.ts` | `"crm/communication"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-competitor-intelligence.controller.ts` | `"crm/competitor-intelligence"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-content-management.controller.ts` | `"crm/content-management"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-contract-deep.controller.ts` | `"crm/contract-deep"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-contract-lifecycle.controller.ts` | `"crm/contract-lifecycle"` | 40 | 40 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-contracts.controller.ts` | `"crm/contracts"` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-conversation-intelligence.controller.ts` | `"crm/conversation-intelligence"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-conversion-analytics.controller.ts` | `"crm/conversion-analytics"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-cpq.controller.ts` | `"crm/cpq"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-customer-experience-deep.controller.ts` | `"crm/customer-experience-deep"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-customer-journey.controller.ts` | `"crm/customer-journey"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-customer-lifecycle-deep.controller.ts` | `"crm/customer-lifecycle-deep"` | 22 | 22 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-customer-success-deep.controller.ts` | `"crm/customer-success-deep"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-data-management.controller.ts` | `"crm/data-management"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-deal-analytics-deep.controller.ts` | `"crm/deal-analytics-deep"` | 35 | 35 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-deal-desk.controller.ts` | `"crm/deal-desk"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-deal-room.controller.ts` | `"crm/deal-rooms"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-deep-expansion-v2.controller.ts` | `"crm/relationships-deep"` | 70 | 70 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-duplicates.controller.ts` | `"crm"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-enterprise.controller.ts` | `"crm/enterprise"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-expansion-deep.controller.ts` | `"crm"` | 82 | 82 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-expansion-v1.controller.ts` | `"crm/expansion-v1"` | 31 | 31 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-expansion.controller.ts` | `"crm/expansion"` | 38 | 38 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-forecast-governance.controller.ts` | `"crm/forecast-governance"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-gamification-deep.controller.ts` | `"crm/gamification-deep"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-gamification.controller.ts` | `"crm/gamification"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-guided-selling.controller.ts` | `"crm/guided-selling"` | 24 | 24 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-integration-deep.controller.ts` | `"crm/integration-deep"` | 21 | 21 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-intelligence.controller.ts` | `"crm"` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-knowledge-base.controller.ts` | `"crm/knowledge-base"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-lead-enrichment.controller.ts` | `"crm/lead-enrichment"` | 30 | 30 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-lead-scoring.controller.ts` | `"crm"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-mailbox.controller.ts` | `"crm/mailbox-connections"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-marketing-deep.controller.ts` | `"crm/marketing-deep"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-marketing-roi-deep.controller.ts` | `"crm/marketing-roi-deep"` | 24 | 24 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-partner-deep-two.controller.ts` | `"crm/partner-deep-two"` | 21 | 21 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-partner-deep.controller.ts` | `"crm/partner-deep"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-pipeline-deep.controller.ts` | `"crm/pipeline-deep"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-pipeline-risk.controller.ts` | `"crm/pipeline-risk"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-pipeline-stages.controller.ts` | `"crm"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-portal-deep.controller.ts` | `"crm/portal-deep"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-quote-signature.controller.ts` | `"crm/quote-signature"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-reporting-deep.controller.ts` | `"crm/reporting"` | 24 | 24 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-revenue-intelligence.controller.ts` | `"crm/revenue-intelligence"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-revenue-optimization-deep.controller.ts` | `"crm/revenue-optimization-deep"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-sales-operations-deep.controller.ts` | `"crm/sales-operations-deep"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-segments.controller.ts` | `"crm"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-sla.controller.ts` | `"crm"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-support-deep.controller.ts` | `"crm/support-deep"` | 25 | 25 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-territory-deep.controller.ts` | `"crm/territory-deep"` | 20 | 20 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-territory-rules.controller.ts` | `"crm/territory-rules"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm-win-loss.controller.ts` | `"crm/win-loss"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/crm.controller.ts` | `"crm"` | 223 | 223 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/customer-portal-admin.controller.ts` | `"crm/customers/:customerId/portal-users"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/customer-portal.controller.ts` | `"portal"` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/crm/settings.controller.ts` | `"crm/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/devops/devops-deep-v2.controller.ts` | `"devops"` | 28 | 28 | 0 | 0 | no | no adjacent spec |
| api | `modules/devops/devops-deep-v3.controller.ts` | `"devops"` | 27 | 27 | 0 | 0 | no | no adjacent spec |
| api | `modules/devops/devops-deep.controller.ts` | `"devops"` | 58 | 58 | 0 | 0 | no | no adjacent spec |
| api | `modules/devops/devops-generated.controller.ts` | `"devops"` | 60 | 60 | 0 | 0 | no | no adjacent spec |
| api | `modules/devops/devops.controller.ts` | `` | 31 | 31 | 0 | 0 | no | no adjacent spec |
| api | `modules/documents/documents-advanced.controller.ts` | `"documents"` | 38 | 38 | 0 | 0 | no | no adjacent spec |
| api | `modules/documents/documents-deep.controller.ts` | `"documents"` | 20 | 20 | 0 | 0 | no | no adjacent spec |
| api | `modules/documents/documents-expansion.controller.ts` | `"documents"` | 71 | 71 | 0 | 0 | no | no adjacent spec |
| api | `modules/documents/documents-ext.controller.ts` | `"documents"` | 53 | 53 | 0 | 0 | no | no adjacent spec |
| api | `modules/documents/drive.controller.ts` | `"drive"` | 21 | 21 | 0 | 0 | no | no adjacent spec |
| api | `modules/documents/settings.controller.ts` | `"drive/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/drive/drive-deep.controller.ts` | `"drive"` | 20 | 20 | 0 | 0 | no | no adjacent spec |
| api | `modules/drive/drive-generated.controller.ts` | `"drive"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/drive/drive.controller.ts` | `"drive"` | 23 | 23 | 0 | 0 | no | no adjacent spec |
| api | `modules/drive/settings.controller.ts` | `"drive/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/ecommerce/ecommerce-admin.controller.ts` | `"ecommerce"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/ecommerce/ecommerce-enterprise.controller.ts` | `"ecommerce/enterprise"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/ecommerce/ecommerce-expansion.controller.ts` | `"ecommerce"` | 46 | 46 | 0 | 0 | no | no adjacent spec |
| api | `modules/ecommerce/ecommerce-public.controller.ts` | `"store/:tenantSlug"` | 12 | 2 | 12 | 0 | no | no adjacent spec |
| api | `modules/education/education-academic.controller.ts` | `"education"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/education/education-deep.controller.ts` | `"ext/education/deep"` | 71 | 71 | 0 | 0 | no | no adjacent spec |
| api | `modules/education/education-enterprise.controller.ts` | `"education/enterprise"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/education/education.controller.ts` | `"ext/education"` | 18 | 18 | 0 | 0 | no | no adjacent spec |
| api | `modules/ext-gateway/ext-callback.controller.ts` | `"ext-callback"` | 3 | 0 | 3 | 0 | no | no adjacent spec |
| api | `modules/ext-gateway/ext-gateway-deep.controller.ts` | `"ext-gateway"` | 27 | 27 | 0 | 0 | no | no adjacent spec |
| api | `modules/ext-gateway/ext-gateway-generated.controller.ts` | `"ext-gateway"` | 175 | 175 | 0 | 0 | no | no adjacent spec |
| api | `modules/ext-gateway/ext-gateway.controller.ts` | `"ext"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/extension-registry/extension-registry.controller.ts` | `"extensions"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/field-service/field-service-enterprise.controller.ts` | `"field-service/enterprise"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/field-service/field-service-operations.controller.ts` | `"field-service"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/field-service/field-service.controller.ts` | `"ext/field-service"` | 102 | 102 | 0 | 0 | no | no adjacent spec |
| api | `modules/finance/ap-deep.controller.ts` | `"finance/ap-deep"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/finance/ar-deep.controller.ts` | `"finance/ar-deep"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/finance/close-ops.controller.ts` | `"finance/close"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/finance/finance-enterprise.controller.ts` | `"finance/enterprise"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/finance/finance-expansion.controller.ts` | `"finance"` | 60 | 60 | 0 | 0 | no | no adjacent spec |
| api | `modules/finance/finance-operations.controller.ts` | `"finance"` | 125 | 125 | 0 | 0 | no | no adjacent spec |
| api | `modules/finance/finance.controller.ts` | `"finance"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/finance/leases.controller.ts` | `"finance/leases"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/finance/project-accounting.controller.ts` | `"finance/project-accounting"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/finance/settings.controller.ts` | `` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/fixed-assets/asset-operations.controller.ts` | `"fixed-assets"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/fixed-assets/fixed-assets-bulk.controller.ts` | `"fixed-assets-bulk"` | 18 | 18 | 0 | 0 | no | no adjacent spec |
| api | `modules/fixed-assets/fixed-assets-deep.controller.ts` | `"fixed-assets"` | 47 | 47 | 0 | 0 | no | no adjacent spec |
| api | `modules/fixed-assets/fixed-assets-generated.controller.ts` | `"fixed-assets"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/fixed-assets/fixed-assets.controller.ts` | `"fixed-assets"` | 18 | 18 | 0 | 0 | no | no adjacent spec |
| api | `modules/healthcare/healthcare-clinical.controller.ts` | `"healthcare"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/healthcare/healthcare-deep.controller.ts` | `"ext/healthcare/deep"` | 71 | 71 | 0 | 0 | no | no adjacent spec |
| api | `modules/healthcare/healthcare-enterprise.controller.ts` | `"healthcare/enterprise"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/healthcare/healthcare.controller.ts` | `"ext/healthcare"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-advanced.controller.ts` | `"hr-advanced"` | 117 | 117 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-benefits-administration-deep.controller.ts` | `"hr-advanced/benefits-administration-deep"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-compensation.controller.ts` | `"hr-advanced/compensation"` | 45 | 45 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-compliance-safety-deep.controller.ts` | `"hr-advanced/compliance-safety-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-experience.controller.ts` | `"hr-advanced/experience"` | 53 | 53 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-global-payroll-deep.controller.ts` | `"hr-advanced/global-payroll-deep"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-operations.controller.ts` | `"hr-advanced/operations"` | 54 | 54 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-org-chart-succession-deep.controller.ts` | `"hr-advanced/org-chart-succession-deep"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-performance-appraisals-deep.controller.ts` | `"hr-advanced/performance-appraisals-deep"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-talent-acquisition-deep.controller.ts` | `"hr-advanced/talent-acquisition-deep"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-talent.controller.ts` | `"hr-advanced/talent"` | 37 | 37 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-time-attendance-deep.controller.ts` | `"hr-advanced/time-attendance-deep"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr-advanced/hr-workforce-analytics-deep.controller.ts` | `"hr-advanced/workforce-analytics-deep"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr/hr-enterprise.controller.ts` | `"hr/enterprise"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr/hr.controller.ts` | `"hr"` | 144 | 144 | 0 | 0 | no | no adjacent spec |
| api | `modules/hr/settings.controller.ts` | `"hr/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/asl.controller.ts` | `"inventory/asl"` | 22 | 22 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/asn.controller.ts` | `"inventory/asn"` | 13 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/catch-weight-recall.controller.ts` | `"inventory/catch-weight-recall"` | 23 | 23 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/cold-chain-writeoff.controller.ts` | `"api/inventory/cold-chain-writeoff"` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/container-pallet.controller.ts` | `"inventory/container-pallet"` | 25 | 25 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/costing-methods.controller.ts` | `"inventory/costing"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/costing.controller.ts` | `"inventory/costing"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/cross-dock.controller.ts` | `"inventory/cross-dock"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/customer-returns.controller.ts` | `"api/inventory/customer-returns"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/demand-forecasting.controller.ts` | `"inventory/demand-forecasting"` | 28 | 28 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/freight-claims.controller.ts` | `"inventory/freight-claims"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/hazmat.controller.ts` | `"inventory/hazmat"` | 35 | 35 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-analytics.controller.ts` | `"inventory/analytics"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-atp-ctp.controller.ts` | `"inventory/atp-ctp"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-automation.controller.ts` | `"inventory/automation"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-customer-consignment.controller.ts` | `"inventory/customer-consignment"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-cycle-counting-deep.controller.ts` | `"inventory/cycle-counting-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-dropship.controller.ts` | `"inventory/drop-ship"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-drp.controller.ts` | `"inventory/drp"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-edi-inventory.controller.ts` | `"inventory/edi"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-enterprise.controller.ts` | `"inventory/enterprise"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-labor.controller.ts` | `"inventory/labor"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-logistics.controller.ts` | `"inventory/logistics"` | 25 | 25 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-lpn-tracking-deep.controller.ts` | `"inventory/lpn-tracking-deep"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-rfid.controller.ts` | `"inventory/rfid"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-rma.controller.ts` | `"inventory/rma"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-serial-batch-genealogy-deep.controller.ts` | `"inventory/serial-batch-genealogy-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-subinventory.controller.ts` | `"inventory/subinventory"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-warehouse-slotting-deep.controller.ts` | `"inventory/warehouse-slotting-deep"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory-wave-planning.controller.ts` | `"inventory"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/inventory.controller.ts` | `"inventory"` | 154 | 154 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/landed-cost.controller.ts` | `"inventory/landed-cost"` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/lot-expiry.controller.ts` | `"inventory/lot-expiry"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/lot-serial-tracking.controller.ts` | `"inventory/lot-serial"` | 28 | 28 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/minmax-replen.controller.ts` | `"api/inventory/minmax-replen"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/packaging-gs1.controller.ts` | `"inventory/packaging-gs1"` | 21 | 21 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/pick-waves.controller.ts` | `"inventory/pick-waves"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/quality-compliance.controller.ts` | `"inventory/quality-compliance"` | 31 | 31 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/rtv.controller.ts` | `"inventory/rtv"` | 18 | 18 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/settings.controller.ts` | `"inventory/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/shipment-tracking.controller.ts` | `"inventory/shipment-tracking"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/stock-take.controller.ts` | `"inventory/stock-takes"` | 20 | 20 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/stock-valuation.controller.ts` | `"inventory/stock-valuation"` | 22 | 22 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/supplier-quality.controller.ts` | `"inventory/supplier-quality"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/transfer-orders.controller.ts` | `"inventory/transfer-orders"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/velocity-abc-xyz.controller.ts` | `"api/inventory/velocity-abc-xyz"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/vmi.controller.ts` | `"inventory/vmi"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/warehouse-ops.controller.ts` | `"inventory/warehouse-ops"` | 30 | 30 | 0 | 0 | no | no adjacent spec |
| api | `modules/inventory/yard-management.controller.ts` | `"inventory/yard-management"` | 26 | 26 | 0 | 0 | no | no adjacent spec |
| api | `modules/localization/localization-bulk.controller.ts` | `"localization-bulk"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/localization/localization-deep.controller.ts` | `"admin/localization"` | 28 | 28 | 0 | 0 | no | no adjacent spec |
| api | `modules/localization/localization-generated.controller.ts` | `"localization"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/localization/localization.controller.ts` | `"admin/localization"` | 20 | 20 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/controllers/mfg-deep-expansion.controller.ts` | `"manufacturing/deep-expansion"` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-advanced-quality.controller.ts` | `"manufacturing/advanced-quality"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-aps.controller.ts` | `"manufacturing/aps"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-contract-mfg.controller.ts` | `"manufacturing/contract-mfg"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-ddmrp.controller.ts` | `"manufacturing/ddmrp"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-energy.controller.ts` | `"manufacturing/energy"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-enterprise.controller.ts` | `"manufacturing/enterprise"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-expansion.controller.ts` | `"manufacturing"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-job-cost.controller.ts` | `"manufacturing/job-cost"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-lean.controller.ts` | `"manufacturing/lean"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-mps.controller.ts` | `"manufacturing/mps"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-tooling.controller.ts` | `"manufacturing/tooling"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing-tpm.controller.ts` | `"manufacturing/tpm"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/manufacturing.controller.ts` | `"manufacturing"` | 46 | 46 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/scheduling.controller.ts` | `"manufacturing/scheduling"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/manufacturing/settings.controller.ts` | `"manufacturing/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/marketplace/developer.controller.ts` | `"developer"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/marketplace/marketplace-deep.controller.ts` | `"marketplace"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/marketplace/marketplace-enterprise.controller.ts` | `"marketplace/enterprise"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/marketplace/marketplace.controller.ts` | `"admin/marketplace"` | 35 | 35 | 0 | 0 | no | no adjacent spec |
| api | `modules/marketplace/storefront.controller.ts` | `"storefront"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/notifications/device-tokens.controller.ts` | `"notifications/devices"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/notifications/notification-preferences.controller.ts` | `"notifications"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/notifications/notifications-deep.controller.ts` | `"notifications"` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/notifications/notifications-generated.controller.ts` | `"notifications"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/notifications/notifications.controller.ts` | `"notifications-config"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/org-structure/org-structure.controller.ts` | `"org-structure"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/outbox/outbox-deep.controller.ts` | `"outbox"` | 18 | 18 | 0 | 0 | no | no adjacent spec |
| api | `modules/outbox/outbox-generated.controller.ts` | `"outbox"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/outbox/outbox.controller.ts` | `"outbox"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/people/people-generated.controller.ts` | `"people"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/people/people-operations.controller.ts` | `"people"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/people/people.controller.ts` | `"people"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/pos/pos-enterprise.controller.ts` | `"pos/enterprise"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/pos/pos-expansion.controller.ts` | `"pos"` | 42 | 42 | 0 | 0 | no | no adjacent spec |
| api | `modules/pos/pos.controller.ts` | `"pos"` | 73 | 73 | 0 | 0 | no | no adjacent spec |
| api | `modules/pos/settings.controller.ts` | `"pos/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/procurement/contracts.controller.ts` | `"procurement/contracts"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/procurement/procurement-enterprise.controller.ts` | `"procurement/enterprise"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/procurement/procurement-expansion.controller.ts` | `"procurement/expansion"` | 48 | 48 | 0 | 0 | no | no adjacent spec |
| api | `modules/procurement/procurement-intelligence.controller.ts` | `"procurement/intelligence"` | 33 | 33 | 0 | 0 | no | no adjacent spec |
| api | `modules/procurement/procurement-scheduling.controller.ts` | `"procurement/scheduling"` | 23 | 23 | 0 | 0 | no | no adjacent spec |
| api | `modules/procurement/procurement-sourcing.controller.ts` | `"procurement"` | 18 | 18 | 0 | 0 | no | no adjacent spec |
| api | `modules/procurement/procurement-supplier-performance.controller.ts` | `"procurement/supplier-performance"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/procurement/procurement.controller.ts` | `"procurement"` | 33 | 33 | 0 | 0 | no | no adjacent spec |
| api | `modules/procurement/procurement.public.controller.ts` | `"procurement/public"` | 2 | 0 | 2 | 0 | no | no adjacent spec |
| api | `modules/procurement/settings.controller.ts` | `"procurement/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/advanced-evm.controller.ts` | `"projects"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/agile.controller.ts` | `"projects"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/capex.controller.ts` | `"projects"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/claims.controller.ts` | `"projects"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/collaboration.controller.ts` | `"projects"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/pmo.controller.ts` | `"projects"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/ppm-deep-expansion.controller.ts` | `"projects/deep-expansion"` | 18 | 18 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/program-management.controller.ts` | `"projects"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/project-baseline.controller.ts` | `"projects"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/resource-skills.controller.ts` | `"projects"` | 11 | 11 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/risk-register.controller.ts` | `"projects"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/timesheet-approval.controller.ts` | `"projects"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/controllers/wbs.controller.ts` | `"projects"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/projects-enterprise.controller.ts` | `"projects/enterprise"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/projects-expansion.controller.ts` | `"projects"` | 17 | 17 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/projects.controller.ts` | `"projects"` | 25 | 25 | 0 | 0 | no | no adjacent spec |
| api | `modules/projects/settings.controller.ts` | `"projects/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/pwa/pwa-generated.controller.ts` | `"pwa"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/pwa/pwa.controller.ts` | `` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/real-estate/real-estate-enterprise.controller.ts` | `"real-estate/enterprise"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/real-estate/real-estate-property.controller.ts` | `"real-estate"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/real-estate/real-estate.controller.ts` | `"ext/real-estate"` | 112 | 112 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting-admin-deep.controller.ts` | `"admin/reporting"` | 31 | 31 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting-bulk.controller.ts` | `"reporting-bulk"` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting-compliance-signoff-deep.controller.ts` | `"reporting/compliance-signoff-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting-data-drilldown-deep.controller.ts` | `"reporting/data-drilldown-deep"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting-distribution-lists-deep.controller.ts` | `"reporting/distribution-lists-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting-engine.controller.ts` | `"reporting/engine"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting-exports-deep.controller.ts` | `"reporting/exports-deep"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting-generated.controller.ts` | `"reporting"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting-interactive-viewer-deep.controller.ts` | `"reporting/interactive-viewer-deep"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting-scheduled-jobs-deep.controller.ts` | `"reporting/scheduled-jobs-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting-templates-deep.controller.ts` | `"reporting/templates-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/reporting.controller.ts` | `"reporting"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/reporting/scheduled-reports.controller.ts` | `"reporting/scheduled"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/audit-trail.controller.ts` | `"saas-portal/audit-trail-deep"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/controllers/audit-log.controller.ts` | `"saas-portal/audit-log"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/controllers/billing.controller.ts` | `"saas-portal/billing"` | 32 | 32 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/controllers/delegation.controller.ts` | `"saas-portal/delegations"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/controllers/gdpr-compliance.controller.ts` | `"saas-portal/gdpr-compliance"` | 17 | 17 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/controllers/org-hierarchy.controller.ts` | `"saas-portal/org-hierarchy"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/controllers/security.controller.ts` | `"saas-portal/security"` | 22 | 22 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/controllers/subscription.controller.ts` | `"saas-portal/subscription"` | 18 | 18 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/saas-portal-billing-self-service.controller.ts` | `"saas-portal/billing-self-service"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/saas-portal-enterprise.controller.ts` | `"saas/enterprise"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/saas-portal-feedback-roadmap.controller.ts` | `"saas-portal/feedback-roadmap"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/saas-portal-subscription-tier-engine.controller.ts` | `"saas-portal/subscription-tier-engine"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/saas-portal-support-self-service.controller.ts` | `"saas-portal/support-self-service"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/saas-portal-usage-metrics-portal.controller.ts` | `"saas-portal/usage-metrics"` | 1 | 1 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/saas-portal.controller.ts` | `"saas-portal"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas-portal/sso-saml.controller.ts` | `"saas-portal/sso-saml-deep"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/activity-feed.controller.ts` | `"saas/activity"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/addon-admin.controller.ts` | `"saas/admin/addons"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/addons.controller.ts` | `"saas/addons"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/analytics-ext.controller.ts` | `"saas/analytics"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/announcements.controller.ts` | `"saas/announcements"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/api-keys.controller.ts` | `"saas/api-keys"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/billing-admin.controller.ts` | `"saas/admin/billing"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/billing-portal.controller.ts` | `"saas/billing"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/billing-webhook.controller.ts` | `"billing-webhooks"` | 2 | 0 | 2 | 0 | no | no adjacent spec |
| api | `modules/saas/billing.controller.ts` | `"billing"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/branding.controller.ts` | `"saas/branding"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/compliance.controller.ts` | `"saas/compliance"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/contracts.controller.ts` | `"saas/contracts"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/coupons-admin.controller.ts` | `"saas/admin/coupons"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/customer-billing.controller.ts` | `"saas/customer-billing"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/data-export.controller.ts` | `"saas/exports"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/domains.controller.ts` | `"saas/domains"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/feature-flags.controller.ts` | `"saas/feature-flags"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/health.controller.ts` | `"saas/health"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/integrations-compliance.controller.ts` | `"saas/integrations-compliance"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/integrations.controller.ts` | `"saas/integrations"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/invoice-engine.controller.ts` | `"saas/invoices"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/invoice-templates.controller.ts` | `"saas/invoice-templates"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/marketplace-lifecycle.controller.ts` | `"saas/marketplace-lifecycle"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/marketplace.controller.ts` | `"saas/marketplace"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/metering-engine.controller.ts` | `"saas/metering-engine-deep"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/migration.controller.ts` | `"saas/admin/migrations"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/notification-prefs.controller.ts` | `"saas/notifications"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/onboarding-flow.controller.ts` | `"saas/onboarding-flow-deep"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/onboarding.controller.ts` | `"saas/onboarding"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/payment-methods.controller.ts` | `"saas"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/payments-ext.controller.ts` | `"saas/payments"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/plan-engine.controller.ts` | `"saas/plans"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/profile.controller.ts` | `"saas/profile"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/quota-guard.controller.ts` | `"saas/quota-guard-deep"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/reports.controller.ts` | `"saas/reports"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/revenue-churn-health.controller.ts` | `"saas/revenue-churn-health"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/saas-expansion.controller.ts` | `"saas"` | 55 | 55 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/saas.controller.ts` | `"saas"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/security.controller.ts` | `"saas/security"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/sso-config.controller.ts` | `"saas/sso"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/subscription-lifecycle.controller.ts` | `"saas/subscription"` | 18 | 18 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/support-admin.controller.ts` | `"saas/support-admin"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/support-tickets.controller.ts` | `"saas/support"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/system-admin.controller.ts` | `"saas/admin/system"` | 18 | 18 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/tenant-admin.controller.ts` | `"saas/admin"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/tenant-provisioning.controller.ts` | `"saas/admin/provisioning"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/usage-alerts.controller.ts` | `"saas/alerts"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/usage-analytics.controller.ts` | `"saas/usage"` | 17 | 17 | 0 | 0 | no | no adjacent spec |
| api | `modules/saas/webhooks.controller.ts` | `"saas/webhooks"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/pricing.controller.ts` | `"sales/pricing"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-advanced-enterprise-core-deep.controller.ts` | `"sales/advanced-enterprise-deep"` | 120 | 120 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-advanced-pricing-deep.controller.ts` | `"sales/advanced-pricing-deep"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-advanced-pricing.controller.ts` | `"sales/pricing"` | 17 | 17 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-analytics.controller.ts` | `"sales/analytics"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-commissions.controller.ts` | `"sales/commissions"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-contracts.controller.ts` | `"sales/contracts"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-cpq.controller.ts` | `"sales/cpq"` | 22 | 22 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-customer-success.controller.ts` | `"sales/customer-success"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-documents-deep.controller.ts` | `"sales/documents-deep"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-enterprise-execution-deep.controller.ts` | `"sales/enterprise-execution"` | 100 | 100 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-enterprise.controller.ts` | `"sales/enterprise"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-expansion.controller.ts` | `"sales/expansion"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-forecasting.controller.ts` | `"sales/forecasting"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-gamification-deep.controller.ts` | `"sales/gamification"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-global-revenue-ops-deep.controller.ts` | `"sales/global-revenue-ops"` | 50 | 50 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-intelligence-signals.controller.ts` | `"sales/intelligence-signals"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-omnichannel-deals-deep.controller.ts` | `"sales/omnichannel-deals"` | 50 | 50 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-partners.controller.ts` | `"sales/partners"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-playbooks-deep.controller.ts` | `"sales/playbooks-deep"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-promotions.controller.ts` | `"sales/promotions"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-quote-cpq-master-deep.controller.ts` | `"sales/cpq-master"` | 40 | 40 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-returns-deep.controller.ts` | `"sales/returns-deep"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-returns.controller.ts` | `"sales/returns"` | 14 | 14 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-spiff.controller.ts` | `"sales/spiff"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-subscription.controller.ts` | `"sales/subscriptions"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales-territory.controller.ts` | `"sales/territories"` | 21 | 21 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/sales.controller.ts` | `"sales"` | 21 | 21 | 0 | 0 | no | no adjacent spec |
| api | `modules/sales/settings.controller.ts` | `"sales/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/saved-views/saved-views-generated.controller.ts` | `"saved-views"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/saved-views/saved-views.controller.ts` | `"saved-views"` | 19 | 19 | 0 | 0 | no | no adjacent spec |
| api | `modules/search/search-generated.controller.ts` | `"search"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/search/search.controller.ts` | `"search"` | 18 | 18 | 0 | 0 | no | no adjacent spec |
| api | `modules/service-management/controllers/ticket.controller.ts` | `"service-management/tickets"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| api | `modules/service-management/service-management-generated.controller.ts` | `"service-management"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/storage/storage-advanced.controller.ts` | `"storage"` | 40 | 40 | 0 | 0 | no | no adjacent spec |
| api | `modules/storage/storage-expansion.controller.ts` | `"storage"` | 65 | 65 | 0 | 0 | no | no adjacent spec |
| api | `modules/storage/storage-ext.controller.ts` | `"storage"` | 93 | 93 | 0 | 0 | no | no adjacent spec |
| api | `modules/storage/storage.controller.ts` | `"storage"` | 20 | 20 | 0 | 0 | no | no adjacent spec |
| api | `modules/subscriptions/subscriptions-bulk.controller.ts` | `"subscriptions-bulk"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/subscriptions/subscriptions-deep.controller.ts` | `"subscriptions"` | 27 | 27 | 0 | 0 | no | no adjacent spec |
| api | `modules/subscriptions/subscriptions-generated.controller.ts` | `"subscriptions"` | 200 | 200 | 0 | 0 | no | no adjacent spec |
| api | `modules/subscriptions/subscriptions.controller.ts` | `"subscriptions"` | 16 | 16 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/advanced-analytics.controller.ts` | `"supply-chain/advanced-analytics"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/analytics.controller.ts` | `"supply-chain/analytics"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/carrier-contract.controller.ts` | `"supply-chain/carrier-contracts"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/cold-chain.controller.ts` | `"supply-chain/cold-chain"` | 25 | 25 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/container-tracking.controller.ts` | `"supply-chain/containers"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/control-tower-advanced.controller.ts` | `"supply-chain"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/cross-dock.controller.ts` | `"supply-chain/cross-dock"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/customs-document.controller.ts` | `"supply-chain/customs"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/demand-planning.controller.ts` | `"supply-chain"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/digital-twin.controller.ts` | `"supply-chain/digital-twin"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/fleet-management.controller.ts` | `"supply-chain/fleet"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/global-trade.controller.ts` | `"supply-chain"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/lane-rate.controller.ts` | `"supply-chain/lane-rates"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/logistics-execution.controller.ts` | `"supply-chain"` | 15 | 15 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/meio.controller.ts` | `"supply-chain/meio"` | 8 | 8 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/route-optimization.controller.ts` | `"supply-chain/routes"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/scm-control-tower.controller.ts` | `"supply-chain"` | 3 | 3 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/scm-deep-expansion.controller.ts` | `"supply-chain/deep-expansion"` | 28 | 28 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/supplier-assessment.controller.ts` | `"supply-chain/supplier-assessments"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/supplier-certification.controller.ts` | `"supply-chain/supplier-certifications"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/supplier-contract.controller.ts` | `"supply-chain/contracts"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/supplier-performance.controller.ts` | `"supply-chain/supplier-performance"` | 7 | 7 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/supplier-portal.controller.ts` | `"supply-chain/supplier-portal"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/supplier-quality.controller.ts` | `"supply-chain/supplier-quality"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/supplier-risk.controller.ts` | `"supply-chain"` | 13 | 13 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/supply-chain-budget.controller.ts` | `"supply-chain/budgets"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/supply-chain-expansion.controller.ts` | `"supply-chain"` | 30 | 30 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/supply-chain-finance.controller.ts` | `"supply-chain/finance"` | 10 | 10 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/supply-planning.controller.ts` | `"supply-chain"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/sustainability.controller.ts` | `"supply-chain/sustainability"` | 9 | 9 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/controllers/vendor-returns.controller.ts` | `"supply-chain/vendor-returns"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/settings.controller.ts` | `"supply-chain/settings"` | 0 | 0 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/supply-chain-enterprise.controller.ts` | `"supply-chain/enterprise"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| api | `modules/supply-chain/supply-chain.controller.ts` | `"supply-chain"` | 28 | 28 | 0 | 0 | no | no adjacent spec |
| api | `modules/workflow/workflow-advanced.controller.ts` | `"workflow"` | 48 | 48 | 0 | 0 | no | no adjacent spec |
| api | `modules/workflow/workflow-engine.controller.ts` | `"workflows/engine"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| api | `modules/workflow/workflow-enterprise.controller.ts` | `"workflow/enterprise"` | 6 | 6 | 0 | 0 | no | no adjacent spec |
| api | `modules/workflow/workflow-expansion.controller.ts` | `"workflow"` | 57 | 57 | 0 | 0 | no | no adjacent spec |
| api | `modules/workflow/workflow-ext.controller.ts` | `"workflow"` | 68 | 68 | 0 | 0 | no | no adjacent spec |
| api | `modules/workflow/workflow.controller.ts` | `"workflow"` | 29 | 29 | 0 | 0 | no | no adjacent spec |
| api | `platform/v1/ai-governance.controller.ts` | `"platform/v1/ai"` | 22 | 22 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/broadcast-maintenance.controller.ts` | `'platform/v1/broadcasts'` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/budget.controller.ts` | `"platform/v1/budgets"` | 2 | 2 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/capacity-forecast.controller.ts` | `"platform/v1/capacity"` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/certificate-lifecycle.controller.ts` | `"platform/v1/certificates"` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/cloud-accounts.controller.ts` | `"platform/v1/cloud-accounts"` | 2 | 2 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/cluster-routing.controller.ts` | `"platform/v1/cluster-routing-deep"` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/compliance-control.controller.ts` | `"platform/v1/compliance-controls"` | 5 | 5 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/control-plane-approvals.controller.ts` | `"platform/v1/approvals"` | 5 | 5 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/cost-allocation.controller.ts` | `"platform/v1/cost-allocation"` | 1 | 1 | 0 | 1 | yes | tenant bypass |
| api | `platform/v1/cost-ingestion.controller.ts` | `"platform/v1/cost"` | 2 | 2 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/customer-import.controller.ts` | `'platform/v1/imports'` | 3 | 3 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/disaster-recovery.controller.ts` | `"platform/v1/disaster-recovery"` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/dunning.controller.ts` | `'platform/v1/dunning'` | 3 | 3 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/enterprise-scale.controller.ts` | `"platform/v1/enterprise-scale"` | 38 | 38 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/entitlement-quota-binding.controller.ts` | `"platform/v1/entitlement-quota"` | 2 | 2 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/estate-abac.controller.ts` | `"platform/v1/estate-grants"` | 2 | 2 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/estate.controller.ts` | `"platform/v1/estate"` | 5 | 5 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/feature-flags-metering.controller.ts` | `"platform/v1/flags-metering"` | 22 | 22 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/finops-recommendation.controller.ts` | `"platform/v1/finops"` | 3 | 3 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/incident.controller.ts` | `"platform/v1/incidents"` | 1 | 1 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/industry-suite-catalogue.controller.ts` | `"platform/v1/catalogue"` | 2 | 2 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/infrastructure-resource.controller.ts` | `"platform/v1/infrastructure-resources"` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/invoicing.controller.ts` | `'platform/v1/invoices'` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/kubernetes-fleet.controller.ts` | `"platform/v1/kubernetes"` | 5 | 5 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/live-tenant-upgrade.controller.ts` | `'platform/v1/tenant-upgrades'` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/margin.controller.ts` | `"platform/v1/margin"` | 1 | 1 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/marketplace/marketplace.controller.ts` | `'platform/v1/marketplace'` | 6 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| api | `platform/v1/metering.controller.ts` | `'platform/v1/metering'` | 6 | 6 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/observability-trace.controller.ts` | `"platform/v1/observability"` | 1 | 1 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/operations.controller.ts` | `"platform/v1/operations"` | 11 | 11 | 0 | 5 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/plans.controller.ts` | `'platform/v1/plans'` | 5 | 5 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/privilege-elevation.controller.ts` | `"platform/v1/privilege-elevation"` | 2 | 2 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/quota-admin.controller.ts` | `'platform/v1/quotas'` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/release-control.controller.ts` | `'platform/v1/releases'` | 3 | 3 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/reseller-channel.controller.ts` | `"platform/v1/reseller-channel-deep"` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/retention-schedule.controller.ts` | `"platform/v1/retention-schedule"` | 2 | 2 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/runbook.controller.ts` | `"platform/v1/runbooks"` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/security-operations.controller.ts` | `'platform/v1/soc'` | 3 | 3 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/staff-idp.controller.ts` | `"platform/v1/staff-idp"` | 1 | 1 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/subscription-management.controller.ts` | `'platform/v1/subscriptions'` | 6 | 6 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/super-admin.controller.ts` | `"platform/v1/super-admin"` | 11 | 11 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/support-workspace.controller.ts` | `'platform/v1/support'` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/telemetry.controller.ts` | `"platform/v1/telemetry"` | 3 | 3 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/tenant-export-offboarding.controller.ts` | `'platform/v1/offboarding'` | 3 | 3 | 0 | 2 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/tenant-lifecycle.controller.ts` | `"platform/v1/tenants"` | 8 | 8 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/tenant-migration.controller.ts` | `'platform/v1/migrations'` | 5 | 5 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/webhook-integration.controller.ts` | `"platform/v1/integrations"` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| api | `platform/v1/white-label.controller.ts` | `"platform/v1/white-label-deep"` | 4 | 4 | 0 | 1 | no | tenant bypass; no adjacent spec |
| idp | `common/controllers/bulk-operations.controller.ts` | `"bulk"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| idp | `common/controllers/change-history.controller.ts` | `"change-history"` | 1 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| idp | `common/controllers/data-quality.controller.ts` | `"data-quality"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| idp | `common/controllers/enterprise-audit.controller.ts` | `"audit"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| idp | `common/controllers/export-v2.controller.ts` | `"export/v2"` | 4 | 4 | 0 | 0 | no | no adjacent spec |
| idp | `common/controllers/import.controller.ts` | `"import"` | 5 | 5 | 0 | 0 | no | no adjacent spec |
| idp | `common/platform-credentials/platform-credentials.controller.ts` | `"admin/platform-credentials"` | 2 | 2 | 0 | 0 | no | no adjacent spec |
| idp | `health.controller.ts` | `` | 2 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| idp | `metrics.controller.ts` | `` | 1 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| idp | `modules/auth/auth-deep.controller.ts` | `"auth"` | 12 | 12 | 0 | 0 | no | no adjacent spec |
| idp | `modules/auth/auth.controller.ts` | `"auth"` | 33 | 17 | 0 | 1 | no | tenant bypass; no adjacent spec |
| idp | `modules/auth/oauth.controller.ts` | `"auth/oauth"` | 3 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| idp | `modules/auth/onboarding.controller.ts` | `"auth/onboarding"` | 2 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| idp | `modules/auth/sso.controller.ts` | `"auth/sso"` | 5 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| idp | `modules/oidc/controllers/authorize.controller.ts` | `"oidc"` | 1 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| idp | `modules/oidc/controllers/discovery.controller.ts` | `` | 2 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| idp | `modules/oidc/controllers/login.controller.ts` | `"oidc"` | 3 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| idp | `modules/oidc/controllers/platforms.controller.ts` | `"auth"` | 1 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| idp | `modules/oidc/controllers/session.controller.ts` | `"oidc"` | 6 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |
| idp | `modules/oidc/controllers/token.controller.ts` | `"oidc"` | 1 | 0 | 0 | 0 | no | authorization mapping; no adjacent spec |

## Required follow-up

Resolve composed/class-level guards, enumerate exact method routes and DTOs with an AST-aware generator, and link every endpoint to permission, tenant policy, contract schema and positive/negative tests. `@SkipTenantScope` requires provider/global ownership justification. The historical snapshot must be refreshed only by replacing it with generated evidence linked to the active checker; do not manually update its counts.
