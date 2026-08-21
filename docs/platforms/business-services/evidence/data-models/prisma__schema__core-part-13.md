# Models in prisma/schema/core-part-13.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `EmailInbox` | yes | no | 0 | 0 | 1 | tenant signal |
| `EmailMessage` | yes | no | 0 | 0 | 1 | tenant signal |
| `EmailRule` | yes | no | 0 | 0 | 1 | tenant signal |
| `VideoRoom` | yes | no | 0 | 0 | 1 | tenant signal |
| `VideoRoomParticipant` | yes | no | 0 | 0 | 1 | tenant signal |
| `VideoRecording` | yes | no | 0 | 0 | 1 | tenant signal |
| `WikiSpace` | yes | no | 0 | 0 | 2 | tenant signal |
| `WikiPage` | yes | no | 0 | 0 | 1 | tenant signal |
| `WikiPageVersion` | yes | no | 0 | 0 | 1 | tenant signal |
| `ChatChannel` | yes | no | 0 | 0 | 1 | tenant signal |
| `ChatChannelMember` | yes | no | 0 | 0 | 2 | tenant signal |
| `IntranetPost` | yes | no | 0 | 0 | 1 | tenant signal |
| `IntranetComment` | yes | no | 0 | 0 | 1 | tenant signal |
| `IntranetReaction` | yes | no | 0 | 0 | 2 | tenant signal |
| `InternalSurvey` | yes | no | 0 | 0 | 1 | tenant signal |
| `InternalSurveyAnswer` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `CompanyEvent` | yes | no | 0 | 0 | 1 | tenant signal |
| `EventRsvp` | yes | no | 0 | 0 | 2 | tenant signal |
| `CommRetentionPolicy` | yes | no | 0 | 0 | 1 | tenant signal |
| `LegalHold` | yes | no | 0 | 0 | 1 | tenant signal |
| `PhoneExtension` | yes | no | 0 | 0 | 1 | tenant signal |
| `PhoneCallLog` | yes | no | 0 | 0 | 1 | tenant signal |
| `CommWebhook` | yes | no | 0 | 0 | 1 | tenant signal |
| `CommAnalyticsReport` | yes | no | 0 | 0 | 1 | tenant signal |
| `BuilderDataModel` | yes | no | 0 | 0 | 1 | tenant signal |
| `BuilderDataField` | yes | no | 0 | 0 | 1 | tenant signal |
| `BuilderRelationship` | yes | no | 0 | 0 | 1 | tenant signal |
| `BuilderDataView` | yes | no | 0 | 0 | 1 | tenant signal |
| `BusinessRule` | yes | no | 0 | 0 | 1 | tenant signal |
| `BusinessRuleExecution` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `BuilderScript` | yes | no | 0 | 0 | 1 | tenant signal |
| `CalculatedField` | yes | no | 0 | 0 | 1 | tenant signal |
| `IntegrationConnector` | yes | no | 0 | 0 | 1 | tenant signal |
| `Integration` | yes | no | 0 | 0 | 1 | tenant signal |
| `IntegrationLog` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `BuilderTemplate` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `BuilderPermissionRule` | yes | no | 0 | 0 | 1 | tenant signal |
| `BuilderDocumentTemplate` | yes | no | 0 | 0 | 1 | tenant signal |
| `BuilderDocumentRender` | yes | no | 0 | 0 | 1 | tenant signal |
| `BuilderApi` | yes | no | 0 | 0 | 1 | tenant signal |
| `BuilderTheme` | yes | no | 0 | 0 | 1 | tenant signal |
| `MarketplacePackage` | yes | no | 1 | 1 | 1 | tenant signal; Float review |
| `BuilderAnalyticsEvent` | yes | no | 0 | 0 | 1 | tenant signal |
| `BuilderUsageMetric` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `ChatbotDefinition` | yes | no | 0 | 0 | 1 | tenant signal |
| `ChatbotIntent` | yes | no | 0 | 0 | 1 | tenant signal |
| `ChatbotConversation` | yes | no | 0 | 0 | 1 | tenant signal |
| `EventDefinition` | yes | no | 0 | 0 | 1 | tenant signal |
| `EventTrigger` | yes | no | 0 | 0 | 1 | tenant signal |
| `ScheduledJob` | yes | no | 0 | 0 | 1 | tenant signal |
| `ReportDefinition` | yes | no | 0 | 0 | 1 | tenant signal |
| `ReportRun` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `DashboardDefinition` | yes | no | 0 | 0 | 1 | tenant signal |
| `DashboardWidget` | yes | no | 0 | 0 | 1 | tenant signal |
| `CustomerSuccessPlan` | yes | no | 2 | 0 | 2 | tenant signal |
| `CustomerSuccessMilestone` | yes | no | 0 | 0 | 1 | tenant signal |
| `SalesPlaybookDeep` | yes | no | 0 | 0 | 1 | tenant signal |
| `SalesPlaybookStepDeep` | yes | no | 0 | 0 | 1 | tenant signal |
| `SalesIntelligenceSignal` | yes | no | 0 | 0 | 3 | tenant signal |
| `SalesDocumentTemplate` | yes | no | 0 | 0 | 1 | tenant signal |
| `SalesDocumentGeneration` | yes | no | 0 | 0 | 2 | tenant signal |
| `SalesReturnOrderDeep` | yes | no | 2 | 0 | 2 | tenant signal |
| `SalesGamificationDeep` | yes | no | 0 | 0 | 1 | tenant signal |
| `SalesQuotaAttainment` | yes | no | 4 | 0 | 1 | tenant signal |
| `SaasTenantTierConfig` | yes | no | 0 | 0 | 1 | tenant signal |
| `SaasTenantCustomQuota` | yes | no | 0 | 0 | 1 | tenant signal |
| `SaasMeteringRule` | yes | no | 1 | 0 | 0 | tenant signal |
| `SaasUsageEventBatch` | yes | no | 0 | 0 | 0 | tenant signal |
| `SaasMultiTenantCluster` | no | no | 0 | 0 | 0 | ownership review |
| `SaasTenantNodeRouting` | yes | no | 0 | 0 | 1 | tenant signal |
| `SaasWhiteLabelDomain` | yes | no | 0 | 0 | 0 | tenant signal |
| `SaasSslCertificate` | yes | no | 0 | 0 | 0 | tenant signal |
| `SaasPartnerResellerChannel` | no | no | 1 | 0 | 0 | ownership review |
| `SaasResellerCommission` | yes | no | 3 | 0 | 0 | tenant signal |
| `SaasPortalAccountProfile` | yes | no | 0 | 0 | 0 | tenant signal |
| `SaasPortalPaymentMethod` | yes | no | 0 | 0 | 0 | tenant signal |
| `SaasPortalSubscriptionUpgrade` | yes | no | 1 | 0 | 0 | tenant signal |
| `SaasPortalPlanDowngradeReason` | yes | no | 0 | 0 | 0 | tenant signal |
| `SaasPortalUsageDashboard` | yes | no | 1 | 0 | 1 | tenant signal |
| `SaasPortalInvoiceDownloadLog` | yes | no | 0 | 0 | 0 | tenant signal |
| `SaasPortalSupportTicketDeep` | yes | no | 0 | 0 | 0 | tenant signal |
| `SaasPortalTicketMessage` | yes | no | 0 | 0 | 0 | tenant signal |
| `SaasPortalFeatureRequest` | yes | no | 0 | 0 | 0 | tenant signal |
| `SaasPortalFeatureVote` | yes | no | 0 | 0 | 1 | tenant signal |
| `AnalyticsCustomDashboard` | yes | no | 0 | 0 | 0 | tenant signal |
| `AnalyticsDashboardWidgetDeep` | no | no | 0 | 0 | 0 | ownership review |
| `AnalyticsDataDataset` | yes | no | 0 | 0 | 0 | tenant signal |
| `AnalyticsDataPipeline` | yes | no | 0 | 0 | 0 | tenant signal |
| `AnalyticsPredictiveModel` | yes | no | 1 | 0 | 0 | tenant signal |
| `AnalyticsForecastRun` | yes | no | 0 | 0 | 0 | tenant signal |
| `AnalyticsCohortAnalysis` | yes | no | 0 | 0 | 0 | tenant signal |
| `AnalyticsCohortGroup` | yes | no | 0 | 0 | 0 | tenant signal |
| `AnalyticsFunnelStep` | yes | no | 0 | 0 | 0 | tenant signal |
| `AnalyticsFunnelConversion` | yes | no | 1 | 0 | 0 | tenant signal |
| `ReportingTemplateDeep` | yes | no | 0 | 0 | 0 | tenant signal |
| `ReportingTemplateSection` | no | no | 0 | 0 | 0 | ownership review |
| `ReportingScheduledJobDeep` | yes | no | 0 | 0 | 0 | tenant signal |
| `ReportingExecutionLog` | yes | no | 0 | 0 | 0 | tenant signal |
| `ReportingExportJob` | yes | no | 0 | 0 | 0 | tenant signal |
| `ReportingExportFile` | no | no | 0 | 0 | 0 | ownership review |
| `ReportingComplianceAudit` | yes | no | 0 | 0 | 0 | tenant signal |
| `ReportingSignoffHistory` | no | no | 0 | 0 | 0 | ownership review |
| `ReportingDistributionList` | yes | no | 0 | 0 | 0 | tenant signal |
| `ReportingDistributionRecipient` | no | no | 0 | 0 | 0 | ownership review |
| `AdvancedHrLearningPathDeep` | yes | no | 0 | 0 | 0 | tenant signal |
| `AdvancedHrLearningEnrollment` | yes | no | 1 | 0 | 0 | tenant signal |
| `AdvancedHrSuccessionPlan` | yes | no | 0 | 0 | 0 | tenant signal |
| `AdvancedHrSuccessionCandidate` | yes | no | 1 | 0 | 0 | tenant signal |
| `AdvancedHrWorkforceAnalyticsDeep` | yes | no | 3 | 0 | 0 | tenant signal |
| `AdvancedHrCompensationBandDeep` | yes | no | 3 | 0 | 0 | tenant signal |
| `AdvancedHrBenefitsPlanDeep` | yes | no | 2 | 0 | 0 | tenant signal |
| `AdvancedHrBenefitsEnrollment` | yes | no | 0 | 0 | 0 | tenant signal |
| `AdvancedHrOrgChartNodeDeep` | yes | no | 0 | 0 | 0 | tenant signal |
| `AdvancedHrExitInterviewDeep` | yes | no | 0 | 0 | 0 | tenant signal |
| `SearchIndex` | yes | no | 0 | 0 | 4 | tenant signal |
| `SearchIndexRule` | yes | no | 0 | 0 | 2 | tenant signal |
| `SearchQueryLog` | yes | no | 0 | 0 | 2 | tenant signal |
| `SearchAnalytics` | yes | no | 0 | 1 | 2 | tenant signal; Float review |
| `SavedViewLayout` | yes | no | 0 | 0 | 2 | tenant signal |
| `SavedViewFilter` | yes | no | 0 | 0 | 1 | tenant signal |
| `SavedViewColumnConfig` | yes | no | 0 | 0 | 2 | tenant signal |
| `SavedViewSharing` | yes | no | 0 | 0 | 2 | tenant signal |
| `NotificationTemplate` | yes | no | 0 | 0 | 2 | tenant signal |
| `NotificationBatch` | yes | no | 0 | 0 | 2 | tenant signal |
| `NotificationBatchItem` | yes | no | 0 | 0 | 2 | tenant signal |
| `NotificationDigest` | yes | no | 0 | 0 | 2 | tenant signal |
| `NotificationDeliveryLog` | yes | no | 0 | 0 | 2 | tenant signal |
| `Deployment` | yes | no | 0 | 0 | 4 | tenant signal |

