# Tenant model to RLS migration linkage: prisma/schema/projects.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `Product` | `products` | yes | no | RLS LINK GAP |
| `Project` | `projects` | yes | no | RLS LINK GAP |
| `ProjectPortfolio` | `project_portfolios` | yes | no | RLS LINK GAP |
| `ProjectRisk` | `project_risks` | yes | no | RLS LINK GAP |
| `Task` | `tasks` | yes | no | RLS LINK GAP |
| `Milestone` | `milestones` | yes | no | RLS LINK GAP |
| `ProjectCostEntry` | `project_cost_entries` | yes | no | RLS LINK GAP |
| `ProductCategory` | `product_categories` | yes | no | RLS LINK GAP |
| `ProductVariant` | `product_variants` | yes | no | RLS LINK GAP |
| `ProductKit` | `product_kits` | yes | no | RLS LINK GAP |
| `ProductKitItem` | `product_kit_items` | yes | no | RLS LINK GAP |
| `ProductListing` | `product_listings` | yes | no | RLS LINK GAP |
| `ProductRecall` | `product_recalls` | yes | no | RLS LINK GAP |
| `ProductVelocitySnapshot` | `product_velocity_snapshots` | yes | no | RLS LINK GAP |
| `ProductBundle` | `product_bundles` | yes | no | RLS LINK GAP |
| `ProductBundleItem` | `product_bundle_items` | yes | no | RLS LINK GAP |
| `ProductConfigRule` | `product_config_rules` | yes | no | RLS LINK GAP |
| `ProcurementContract` | `procurement_contracts` | yes | no | RLS LINK GAP |
| `ProcurementContractPriceSchedule` | `procurement_contract_price_schedules` | yes | no | RLS LINK GAP |
| `ProcurementContractVolumeCommitment` | `procurement_contract_volume_commitments` | yes | no | RLS LINK GAP |
| `ProcurementContractSlaClause` | `procurement_contract_sla_clauses` | yes | no | RLS LINK GAP |
| `ProcurementIntelligence` | `procurement_intelligence` | yes | no | RLS LINK GAP |
| `ProjectPortfolioMember` | `project_portfolio_members` | yes | no | RLS LINK GAP |
| `ProjectRiskMitigation` | `project_risk_mitigations` | yes | no | RLS LINK GAP |
| `ProjectResourceAllocation` | `project_resource_allocations` | yes | no | RLS LINK GAP |
| `ProjectBudget` | `project_budgets` | yes | no | RLS LINK GAP |
| `ProjectDocument` | `project_documents` | yes | no | RLS LINK GAP |
| `ProjectActivity` | `project_activities` | yes | no | RLS LINK GAP |
| `Program` | `programs` | yes | no | RLS LINK GAP |
| `ProgramProject` | `program_projects` | yes | no | RLS LINK GAP |
| `ProgramBenefit` | `program_benefits` | yes | no | RLS LINK GAP |
| `ProgramFinancial` | `program_financials` | yes | no | RLS LINK GAP |
| `ProjectClaim` | `project_claims` | yes | no | RLS LINK GAP |
| `ProjectDiscussion` | `project_discussions` | yes | no | RLS LINK GAP |
| `ProjectWikiPage` | `project_wiki_pages` | yes | no | RLS LINK GAP |
| `ProjectFeedEvent` | `project_feed_events` | yes | no | RLS LINK GAP |
| `ProductionBatch` | `production_batches` | yes | no | RLS LINK GAP |
| `ProductionFormula` | `production_formulas` | yes | no | RLS LINK GAP |
| `ProductionShift` | `production_shifts` | yes | no | RLS LINK GAP |
| `ProductionAnalyticsSnapshot` | `production_analytics_snapshots` | yes | no | RLS LINK GAP |
| `ProjectIssueLog` | `project_issue_logs` | yes | no | RLS LINK GAP |
| `ProjectTemplate` | `project_templates` | yes | no | RLS LINK GAP |
| `ProjectStakeholder` | `project_stakeholders` | yes | no | RLS LINK GAP |
| `ProjectBenefit` | `project_benefits` | yes | no | RLS LINK GAP |
| `ProjectMeeting` | `project_meetings` | yes | no | RLS LINK GAP |
| `ProjectSubcontractor` | `project_subcontractors` | yes | no | RLS LINK GAP |

