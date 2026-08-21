# Models in prisma/schema/projects.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `Product` | yes | yes | 5 | 0 | 3 | tenant signal |
| `Project` | yes | yes | 3 | 0 | 2 | tenant signal |
| `ProjectPortfolio` | yes | no | 2 | 0 | 1 | tenant signal |
| `ProjectRisk` | yes | no | 0 | 0 | 2 | tenant signal |
| `Task` | yes | no | 0 | 0 | 2 | tenant signal |
| `Milestone` | yes | no | 0 | 0 | 0 | tenant signal |
| `ProjectCostEntry` | yes | no | 1 | 0 | 2 | tenant signal |
| `ProductCategory` | yes | no | 0 | 0 | 3 | tenant signal |
| `ProductVariant` | yes | yes | 2 | 0 | 3 | tenant signal |
| `ProductKit` | yes | no | 2 | 0 | 1 | tenant signal |
| `ProductKitItem` | yes | no | 1 | 0 | 2 | tenant signal |
| `ProductListing` | yes | no | 1 | 0 | 3 | tenant signal |
| `ProductRecall` | yes | no | 0 | 0 | 3 | tenant signal |
| `ProductVelocitySnapshot` | yes | no | 3 | 0 | 4 | tenant signal |
| `ProductBundle` | yes | yes | 2 | 0 | 2 | tenant signal |
| `ProductBundleItem` | yes | no | 0 | 0 | 2 | tenant signal |
| `ProductConfigRule` | yes | no | 0 | 0 | 2 | tenant signal |
| `ProcurementContract` | yes | no | 3 | 0 | 4 | tenant signal |
| `ProcurementContractPriceSchedule` | yes | no | 3 | 0 | 3 | tenant signal |
| `ProcurementContractVolumeCommitment` | yes | no | 8 | 0 | 2 | tenant signal |
| `ProcurementContractSlaClause` | yes | no | 5 | 0 | 2 | tenant signal |
| `ProcurementIntelligence` | yes | no | 5 | 0 | 3 | tenant signal |
| `ProjectPortfolioMember` | yes | no | 0 | 0 | 2 | tenant signal |
| `ProjectRiskMitigation` | yes | no | 0 | 0 | 2 | tenant signal |
| `ProjectResourceAllocation` | yes | no | 1 | 0 | 2 | tenant signal |
| `ProjectBudget` | yes | no | 3 | 0 | 2 | tenant signal |
| `ProjectDocument` | yes | no | 0 | 0 | 2 | tenant signal |
| `ProjectActivity` | yes | no | 0 | 0 | 2 | tenant signal |
| `Program` | yes | no | 2 | 0 | 2 | tenant signal |
| `ProgramProject` | yes | no | 0 | 0 | 3 | tenant signal |
| `ProgramBenefit` | yes | no | 2 | 0 | 2 | tenant signal |
| `ProgramFinancial` | yes | no | 1 | 0 | 2 | tenant signal |
| `ProjectClaim` | yes | no | 3 | 0 | 3 | tenant signal |
| `ProjectDiscussion` | yes | no | 0 | 0 | 2 | tenant signal |
| `ProjectWikiPage` | yes | no | 0 | 0 | 3 | tenant signal |
| `ProjectFeedEvent` | yes | no | 0 | 0 | 3 | tenant signal |
| `ProductionBatch` | yes | no | 0 | 4 | 2 | tenant signal; Float review |
| `ProductionFormula` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `ProductionShift` | yes | no | 0 | 0 | 1 | tenant signal |
| `ProductionAnalyticsSnapshot` | yes | no | 1 | 10 | 1 | tenant signal; Float review |
| `ProjectIssueLog` | yes | no | 0 | 0 | 1 | tenant signal |
| `ProjectTemplate` | yes | no | 1 | 0 | 1 | tenant signal |
| `ProjectStakeholder` | yes | no | 0 | 0 | 1 | tenant signal |
| `ProjectBenefit` | yes | no | 3 | 0 | 1 | tenant signal |
| `ProjectMeeting` | yes | no | 0 | 0 | 1 | tenant signal |
| `ProjectSubcontractor` | yes | no | 1 | 1 | 1 | tenant signal; Float review |

