# Models in prisma/schema/crm.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `LeadSource` | yes | no | 0 | 0 | 2 | tenant signal |
| `Lead` | yes | yes | 1 | 0 | 4 | tenant signal |
| `Opportunity` | yes | yes | 2 | 0 | 4 | tenant signal |
| `CrmAiDraft` | yes | no | 0 | 0 | 3 | tenant signal |
| `OpportunityLineItem` | yes | no | 4 | 0 | 2 | tenant signal |
| `CrmWorkflowRule` | yes | yes | 0 | 0 | 2 | tenant signal |
| `CrmDocument` | yes | yes | 0 | 0 | 2 | tenant signal |
| `CrmCustomField` | yes | yes | 0 | 0 | 3 | tenant signal |
| `CrmCustomFieldValue` | yes | no | 0 | 0 | 3 | tenant signal |
| `CrmRecordType` | yes | yes | 0 | 0 | 2 | tenant signal |
| `CrmComment` | yes | yes | 0 | 0 | 2 | tenant signal |
| `CrmFollower` | yes | no | 0 | 0 | 3 | tenant signal |
| `CrmNote` | yes | yes | 0 | 0 | 2 | tenant signal |
| `OpportunityChecklist` | yes | no | 0 | 0 | 3 | tenant signal |
| `CrmDashboard` | yes | yes | 0 | 0 | 2 | tenant signal |
| `CrmDashboardWidget` | yes | no | 0 | 0 | 1 | tenant signal |
| `LeadScoringRule` | yes | no | 0 | 0 | 1 | tenant signal |
| `LeaderboardSnapshot` | yes | no | 1 | 0 | 3 | tenant signal |
| `CrmEnrichmentSource` | yes | yes | 0 | 0 | 1 | tenant signal |
| `CrmEnrichmentRule` | yes | yes | 0 | 0 | 1 | tenant signal |
| `CrmEnrichmentFieldMapping` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmEnrichmentLog` | yes | no | 0 | 0 | 3 | tenant signal |
| `CrmLeadEnrichmentData` | yes | no | 0 | 1 | 2 | tenant signal; Float review |
| `CrmEnrichmentSchedule` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmLeadRoutingRule` | yes | yes | 0 | 0 | 2 | tenant signal |
| `CrmLeadRoutingHistory` | yes | no | 0 | 0 | 3 | tenant signal |
| `CrmLeadRoundRobinState` | yes | no | 0 | 0 | 2 | tenant signal |
| `CrmEnrichmentProvider` | yes | yes | 0 | 0 | 1 | tenant signal |
| `CrmEnrichmentWorkflow` | yes | yes | 0 | 0 | 2 | tenant signal |
| `CrmEnrichmentJob` | yes | no | 0 | 0 | 4 | tenant signal |
| `CrmEnrichmentJobStep` | yes | no | 0 | 0 | 2 | tenant signal |
| `CrmEnrichmentCache` | yes | no | 0 | 1 | 3 | tenant signal; Float review |
| `CrmNextBestActionConfig` | yes | yes | 0 | 0 | 2 | tenant signal |
| `CrmActionSuggestion` | yes | no | 0 | 0 | 3 | tenant signal |
| `CrmGuidedSellingPlaybook` | yes | yes | 0 | 0 | 1 | tenant signal |
| `CrmDealReadinessScore` | yes | no | 0 | 0 | 2 | tenant signal |
| `CrmSalesPlaybook` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmPlaybookStage` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmPlaybookAction` | yes | no | 0 | 0 | 2 | tenant signal |
| `CrmDealGuidance` | yes | no | 1 | 0 | 1 | tenant signal |
| `CrmCompetitorBattlecard` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmObjectionHandler` | yes | no | 1 | 0 | 1 | tenant signal |
| `CrmOmnichannelCampaign` | yes | no | 2 | 0 | 1 | tenant signal |
| `CrmCampaignNode` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmAudienceSegmentRule` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmAttributionModel` | yes | no | 2 | 0 | 2 | tenant signal |
| `CrmMarketingAsset` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmEventWebinar` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmAbmAccountGroup` | yes | no | 1 | 0 | 1 | tenant signal |
| `CrmIntentSignal` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmBuyingCommitteeMember` | yes | no | 0 | 0 | 2 | tenant signal |
| `CrmAccountEngagementLog` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmHealthScoreConfig` | yes | no | 3 | 0 | 1 | tenant signal |
| `CrmAccountHealthRecord` | yes | no | 1 | 0 | 1 | tenant signal |
| `CrmRenewalPipeline` | yes | no | 2 | 0 | 1 | tenant signal |
| `CrmCustomerFeedbackSurvey` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmNpsResponse` | yes | no | 0 | 0 | 2 | tenant signal |
| `CrmFieldVisitSchedule` | yes | no | 2 | 0 | 2 | tenant signal |
| `CrmSalesRoutePlan` | yes | no | 1 | 0 | 1 | tenant signal |
| `CrmPartnerTierBenefit` | yes | no | 3 | 0 | 1 | tenant signal |
| `CrmPartnerCertification` | yes | no | 0 | 0 | 1 | tenant signal |
| `CrmSavedReport` | yes | yes | 0 | 0 | 3 | tenant signal |
| `CrmReportSchedule` | yes | no | 0 | 0 | 2 | tenant signal |
| `CrmReportShare` | yes | no | 0 | 0 | 2 | tenant signal |
| `CrmDashboardTemplate` | yes | yes | 0 | 0 | 2 | tenant signal |
| `CrmDashboardShare` | yes | no | 0 | 0 | 2 | tenant signal |

