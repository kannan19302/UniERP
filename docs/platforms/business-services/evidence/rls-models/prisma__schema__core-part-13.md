# Tenant model to RLS migration linkage: prisma/schema/core-part-13.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `EmailInbox` | `email_inboxes` | yes | no | RLS LINK GAP |
| `EmailMessage` | `email_messages` | yes | no | RLS LINK GAP |
| `EmailRule` | `email_rules` | yes | no | RLS LINK GAP |
| `VideoRoom` | `video_rooms` | yes | no | RLS LINK GAP |
| `VideoRoomParticipant` | `video_room_participants` | yes | no | RLS LINK GAP |
| `VideoRecording` | `video_recordings` | yes | no | RLS LINK GAP |
| `WikiSpace` | `wiki_spaces` | yes | no | RLS LINK GAP |
| `WikiPage` | `wiki_pages` | yes | no | RLS LINK GAP |
| `WikiPageVersion` | `wiki_page_versions` | yes | no | RLS LINK GAP |
| `ChatChannel` | `chat_channels` | yes | no | RLS LINK GAP |
| `ChatChannelMember` | `chat_channel_members` | yes | no | RLS LINK GAP |
| `IntranetPost` | `intranet_posts` | yes | no | RLS LINK GAP |
| `IntranetComment` | `intranet_comments` | yes | no | RLS LINK GAP |
| `IntranetReaction` | `intranet_reactions` | yes | no | RLS LINK GAP |
| `InternalSurvey` | `internal_surveys` | yes | no | RLS LINK GAP |
| `InternalSurveyAnswer` | `internal_survey_answers` | yes | no | RLS LINK GAP |
| `CompanyEvent` | `company_events` | yes | no | RLS LINK GAP |
| `EventRsvp` | `event_rsvps` | yes | no | RLS LINK GAP |
| `CommRetentionPolicy` | `comm_retention_policies` | yes | no | RLS LINK GAP |
| `LegalHold` | `legal_holds` | yes | no | RLS LINK GAP |
| `PhoneExtension` | `phone_extensions` | yes | no | RLS LINK GAP |
| `PhoneCallLog` | `phone_call_logs` | yes | no | RLS LINK GAP |
| `CommWebhook` | `comm_webhooks` | yes | no | RLS LINK GAP |
| `CommAnalyticsReport` | `comm_analytics_reports` | yes | no | RLS LINK GAP |
| `BuilderDataModel` | `builder_data_models` | yes | no | RLS LINK GAP |
| `BuilderDataField` | `builder_data_fields` | yes | no | RLS LINK GAP |
| `BuilderRelationship` | `builder_relationships` | yes | no | RLS LINK GAP |
| `BuilderDataView` | `builder_data_views` | yes | no | RLS LINK GAP |
| `BusinessRule` | `business_rules` | yes | no | RLS LINK GAP |
| `BusinessRuleExecution` | `business_rule_executions` | yes | no | RLS LINK GAP |
| `BuilderScript` | `builder_scripts` | yes | no | RLS LINK GAP |
| `CalculatedField` | `calculated_fields` | yes | no | RLS LINK GAP |
| `IntegrationConnector` | `integration_connectors` | yes | no | RLS LINK GAP |
| `Integration` | `integrations` | yes | no | RLS LINK GAP |
| `IntegrationLog` | `integration_logs` | yes | no | RLS LINK GAP |
| `BuilderTemplate` | `builder_templates` | yes | no | RLS LINK GAP |
| `BuilderPermissionRule` | `builder_permission_rules` | yes | no | RLS LINK GAP |
| `BuilderDocumentTemplate` | `builder_document_templates` | yes | no | RLS LINK GAP |
| `BuilderDocumentRender` | `builder_document_renders` | yes | no | RLS LINK GAP |
| `BuilderApi` | `builder_apis` | yes | no | RLS LINK GAP |
| `BuilderTheme` | `builder_themes` | yes | no | RLS LINK GAP |
| `MarketplacePackage` | `marketplace_packages` | yes | no | RLS LINK GAP |
| `BuilderAnalyticsEvent` | `builder_analytics_events` | yes | no | RLS LINK GAP |
| `BuilderUsageMetric` | `builder_usage_metrics` | yes | no | RLS LINK GAP |
| `ChatbotDefinition` | `chatbot_definitions` | yes | no | RLS LINK GAP |
| `ChatbotIntent` | `chatbot_intents` | yes | no | RLS LINK GAP |
| `ChatbotConversation` | `chatbot_conversations` | yes | no | RLS LINK GAP |
| `EventDefinition` | `event_definitions` | yes | no | RLS LINK GAP |
| `EventTrigger` | `event_triggers` | yes | no | RLS LINK GAP |
| `ScheduledJob` | `scheduled_jobs` | yes | no | RLS LINK GAP |
| `ReportDefinition` | `report_definitions` | yes | no | RLS LINK GAP |
| `ReportRun` | `report_runs` | yes | no | RLS LINK GAP |
| `DashboardDefinition` | `dashboard_definitions` | yes | no | RLS LINK GAP |
| `DashboardWidget` | `dashboard_widgets` | yes | no | RLS LINK GAP |
| `CustomerSuccessPlan` | `customer_success_plans` | yes | no | RLS LINK GAP |
| `CustomerSuccessMilestone` | `customer_success_milestones` | yes | no | RLS LINK GAP |
| `SalesPlaybookDeep` | `sales_playbooks_deep` | yes | no | RLS LINK GAP |
| `SalesPlaybookStepDeep` | `sales_playbook_steps_deep` | yes | no | RLS LINK GAP |
| `SalesIntelligenceSignal` | `sales_intelligence_signals` | yes | no | RLS LINK GAP |
| `SalesDocumentTemplate` | `sales_document_templates` | yes | no | RLS LINK GAP |
| `SalesDocumentGeneration` | `sales_document_generations` | yes | no | RLS LINK GAP |
| `SalesReturnOrderDeep` | `sales_return_orders_deep` | yes | no | RLS LINK GAP |
| `SalesGamificationDeep` | `sales_gamification_deep` | yes | no | RLS LINK GAP |
| `SalesQuotaAttainment` | `sales_quota_attainments` | yes | no | RLS LINK GAP |
| `SaasTenantTierConfig` | `saas_tenant_tier_configs` | yes | no | RLS LINK GAP |
| `SaasTenantCustomQuota` | `saas_tenant_custom_quotas` | yes | no | RLS LINK GAP |
| `SaasMeteringRule` | `saas_metering_rules` | yes | no | RLS LINK GAP |
| `SaasUsageEventBatch` | `saas_usage_event_batches` | yes | no | RLS LINK GAP |
| `SaasMultiTenantCluster` | `saas_multi_tenant_clusters` | no | no | global/ownership review |
| `SaasTenantNodeRouting` | `saas_tenant_node_routings` | yes | no | RLS LINK GAP |
| `SaasWhiteLabelDomain` | `saas_white_label_domains` | yes | no | RLS LINK GAP |
| `SaasSslCertificate` | `saas_ssl_certificates` | yes | no | RLS LINK GAP |
| `SaasPartnerResellerChannel` | `saas_partner_reseller_channels` | no | no | global/ownership review |
| `SaasResellerCommission` | `saas_reseller_commissions` | yes | no | RLS LINK GAP |
| `SaasPortalAccountProfile` | `saas_portal_account_profiles` | yes | no | RLS LINK GAP |
| `SaasPortalPaymentMethod` | `saas_portal_payment_methods` | yes | no | RLS LINK GAP |
| `SaasPortalSubscriptionUpgrade` | `saas_portal_subscription_upgrades` | yes | no | RLS LINK GAP |
| `SaasPortalPlanDowngradeReason` | `saas_portal_plan_downgrade_reasons` | yes | no | RLS LINK GAP |
| `SaasPortalUsageDashboard` | `saas_portal_usage_dashboards` | yes | no | RLS LINK GAP |
| `SaasPortalInvoiceDownloadLog` | `saas_portal_invoice_download_logs` | yes | no | RLS LINK GAP |
| `SaasPortalSupportTicketDeep` | `saas_portal_support_tickets_deep` | yes | no | RLS LINK GAP |
| `SaasPortalTicketMessage` | `saas_portal_ticket_messages` | yes | no | RLS LINK GAP |
| `SaasPortalFeatureRequest` | `saas_portal_feature_requests` | yes | no | RLS LINK GAP |
| `SaasPortalFeatureVote` | `saas_portal_feature_votes` | yes | no | RLS LINK GAP |
| `AnalyticsCustomDashboard` | `analytics_custom_dashboards` | yes | no | RLS LINK GAP |
| `AnalyticsDashboardWidgetDeep` | `analytics_dashboard_widgets_deep` | no | no | global/ownership review |
| `AnalyticsDataDataset` | `analytics_data_datasets` | yes | no | RLS LINK GAP |
| `AnalyticsDataPipeline` | `analytics_data_pipelines` | yes | no | RLS LINK GAP |
| `AnalyticsPredictiveModel` | `analytics_predictive_models` | yes | no | RLS LINK GAP |
| `AnalyticsForecastRun` | `analytics_forecast_runs` | yes | no | RLS LINK GAP |
| `AnalyticsCohortAnalysis` | `analytics_cohort_analyses` | yes | no | RLS LINK GAP |
| `AnalyticsCohortGroup` | `analytics_cohort_groups` | yes | no | RLS LINK GAP |
| `AnalyticsFunnelStep` | `analytics_funnel_steps` | yes | no | RLS LINK GAP |
| `AnalyticsFunnelConversion` | `analytics_funnel_conversions` | yes | no | RLS LINK GAP |
| `ReportingTemplateDeep` | `reporting_templates_deep` | yes | no | RLS LINK GAP |
| `ReportingTemplateSection` | `reporting_template_sections` | no | no | global/ownership review |
| `ReportingScheduledJobDeep` | `reporting_scheduled_jobs_deep` | yes | no | RLS LINK GAP |
| `ReportingExecutionLog` | `reporting_execution_logs` | yes | no | RLS LINK GAP |
| `ReportingExportJob` | `reporting_export_jobs` | yes | no | RLS LINK GAP |
| `ReportingExportFile` | `reporting_export_files` | no | no | global/ownership review |
| `ReportingComplianceAudit` | `reporting_compliance_audits` | yes | no | RLS LINK GAP |
| `ReportingSignoffHistory` | `reporting_signoff_history` | no | no | global/ownership review |
| `ReportingDistributionList` | `reporting_distribution_lists` | yes | no | RLS LINK GAP |
| `ReportingDistributionRecipient` | `reporting_distribution_recipients` | no | no | global/ownership review |
| `AdvancedHrLearningPathDeep` | `advanced_hr_learning_paths_deep` | yes | no | RLS LINK GAP |
| `AdvancedHrLearningEnrollment` | `advanced_hr_learning_enrollments` | yes | no | RLS LINK GAP |
| `AdvancedHrSuccessionPlan` | `advanced_hr_succession_plans` | yes | no | RLS LINK GAP |
| `AdvancedHrSuccessionCandidate` | `advanced_hr_succession_candidates` | yes | no | RLS LINK GAP |
| `AdvancedHrWorkforceAnalyticsDeep` | `advanced_hr_workforce_analytics_deep` | yes | no | RLS LINK GAP |
| `AdvancedHrCompensationBandDeep` | `advanced_hr_compensation_bands_deep` | yes | no | RLS LINK GAP |
| `AdvancedHrBenefitsPlanDeep` | `advanced_hr_benefits_plans_deep` | yes | no | RLS LINK GAP |
| `AdvancedHrBenefitsEnrollment` | `advanced_hr_benefits_enrollments` | yes | no | RLS LINK GAP |
| `AdvancedHrOrgChartNodeDeep` | `advanced_hr_org_chart_nodes_deep` | yes | no | RLS LINK GAP |
| `AdvancedHrExitInterviewDeep` | `advanced_hr_exit_interviews_deep` | yes | no | RLS LINK GAP |
| `SearchIndex` | `search_indexes` | yes | no | RLS LINK GAP |
| `SearchIndexRule` | `search_index_rules` | yes | no | RLS LINK GAP |
| `SearchQueryLog` | `search_query_logs` | yes | no | RLS LINK GAP |
| `SearchAnalytics` | `search_analytics` | yes | no | RLS LINK GAP |
| `SavedViewLayout` | `saved_view_layouts` | yes | no | RLS LINK GAP |
| `SavedViewFilter` | `saved_view_filters` | yes | no | RLS LINK GAP |
| `SavedViewColumnConfig` | `saved_view_column_configs` | yes | no | RLS LINK GAP |
| `SavedViewSharing` | `saved_view_sharings` | yes | no | RLS LINK GAP |
| `NotificationTemplate` | `notification_templates` | yes | no | RLS LINK GAP |
| `NotificationBatch` | `notification_batches` | yes | no | RLS LINK GAP |
| `NotificationBatchItem` | `notification_batch_items` | yes | no | RLS LINK GAP |
| `NotificationDigest` | `notification_digests` | yes | no | RLS LINK GAP |
| `NotificationDeliveryLog` | `notification_delivery_logs` | yes | no | RLS LINK GAP |
| `Deployment` | `deployments` | yes | no | RLS LINK GAP |

