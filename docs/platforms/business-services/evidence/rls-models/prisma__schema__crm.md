# Tenant model to RLS migration linkage: prisma/schema/crm.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `LeadSource` | `lead_sources` | yes | no | RLS LINK GAP |
| `Lead` | `leads` | yes | no | RLS LINK GAP |
| `Opportunity` | `opportunities` | yes | no | RLS LINK GAP |
| `CrmAiDraft` | `crm_ai_drafts` | yes | no | RLS LINK GAP |
| `OpportunityLineItem` | `opportunity_line_items` | yes | no | RLS LINK GAP |
| `CrmWorkflowRule` | `crm_workflow_rules` | yes | no | RLS LINK GAP |
| `CrmDocument` | `crm_documents` | yes | no | RLS LINK GAP |
| `CrmCustomField` | `crm_custom_fields` | yes | no | RLS LINK GAP |
| `CrmCustomFieldValue` | `crm_custom_field_values` | yes | no | RLS LINK GAP |
| `CrmRecordType` | `crm_record_types` | yes | no | RLS LINK GAP |
| `CrmComment` | `crm_comments` | yes | no | RLS LINK GAP |
| `CrmFollower` | `crm_followers` | yes | no | RLS LINK GAP |
| `CrmNote` | `crm_notes` | yes | no | RLS LINK GAP |
| `OpportunityChecklist` | `opportunity_checklists` | yes | no | RLS LINK GAP |
| `CrmDashboard` | `crm_dashboards` | yes | no | RLS LINK GAP |
| `CrmDashboardWidget` | `crm_dashboard_widgets` | yes | no | RLS LINK GAP |
| `LeadScoringRule` | `crm_lead_scoring_rules` | yes | no | RLS LINK GAP |
| `LeaderboardSnapshot` | `leaderboard_snapshots` | yes | no | RLS LINK GAP |
| `CrmEnrichmentSource` | `crm_enrichment_sources` | yes | no | RLS LINK GAP |
| `CrmEnrichmentRule` | `crm_enrichment_rules` | yes | no | RLS LINK GAP |
| `CrmEnrichmentFieldMapping` | `crm_enrichment_field_mappings` | yes | no | RLS LINK GAP |
| `CrmEnrichmentLog` | `crm_enrichment_logs` | yes | no | RLS LINK GAP |
| `CrmLeadEnrichmentData` | `crm_lead_enrichment_data` | yes | no | RLS LINK GAP |
| `CrmEnrichmentSchedule` | `crm_enrichment_schedules` | yes | no | RLS LINK GAP |
| `CrmLeadRoutingRule` | `crm_lead_routing_rules` | yes | no | RLS LINK GAP |
| `CrmLeadRoutingHistory` | `crm_lead_routing_history` | yes | no | RLS LINK GAP |
| `CrmLeadRoundRobinState` | `crm_lead_round_robin_states` | yes | no | RLS LINK GAP |
| `CrmEnrichmentProvider` | `crm_enrichment_providers` | yes | no | RLS LINK GAP |
| `CrmEnrichmentWorkflow` | `crm_enrichment_workflows` | yes | no | RLS LINK GAP |
| `CrmEnrichmentJob` | `crm_enrichment_jobs` | yes | no | RLS LINK GAP |
| `CrmEnrichmentJobStep` | `crm_enrichment_job_steps` | yes | no | RLS LINK GAP |
| `CrmEnrichmentCache` | `crm_enrichment_cache` | yes | no | RLS LINK GAP |
| `CrmNextBestActionConfig` | `crm_next_best_action_configs` | yes | no | RLS LINK GAP |
| `CrmActionSuggestion` | `crm_action_suggestions` | yes | no | RLS LINK GAP |
| `CrmGuidedSellingPlaybook` | `crm_guided_selling_playbooks` | yes | no | RLS LINK GAP |
| `CrmDealReadinessScore` | `crm_deal_readiness_scores` | yes | no | RLS LINK GAP |
| `CrmSalesPlaybook` | `crm_sales_playbooks` | yes | no | RLS LINK GAP |
| `CrmPlaybookStage` | `crm_playbook_stages` | yes | no | RLS LINK GAP |
| `CrmPlaybookAction` | `crm_playbook_actions` | yes | no | RLS LINK GAP |
| `CrmDealGuidance` | `crm_deal_guidances` | yes | no | RLS LINK GAP |
| `CrmCompetitorBattlecard` | `crm_competitor_battlecards` | yes | no | RLS LINK GAP |
| `CrmObjectionHandler` | `crm_objection_handlers` | yes | no | RLS LINK GAP |
| `CrmOmnichannelCampaign` | `crm_omnichannel_campaigns` | yes | no | RLS LINK GAP |
| `CrmCampaignNode` | `crm_campaign_nodes` | yes | no | RLS LINK GAP |
| `CrmAudienceSegmentRule` | `crm_audience_segment_rules` | yes | no | RLS LINK GAP |
| `CrmAttributionModel` | `crm_attribution_models` | yes | no | RLS LINK GAP |
| `CrmMarketingAsset` | `crm_marketing_assets` | yes | no | RLS LINK GAP |
| `CrmEventWebinar` | `crm_event_webinars` | yes | no | RLS LINK GAP |
| `CrmAbmAccountGroup` | `crm_abm_account_groups` | yes | no | RLS LINK GAP |
| `CrmIntentSignal` | `crm_intent_signals` | yes | no | RLS LINK GAP |
| `CrmBuyingCommitteeMember` | `crm_buying_committee_members` | yes | no | RLS LINK GAP |
| `CrmAccountEngagementLog` | `crm_account_engagement_logs` | yes | no | RLS LINK GAP |
| `CrmHealthScoreConfig` | `crm_health_score_configs` | yes | no | RLS LINK GAP |
| `CrmAccountHealthRecord` | `crm_account_health_records` | yes | no | RLS LINK GAP |
| `CrmRenewalPipeline` | `crm_renewal_pipelines` | yes | no | RLS LINK GAP |
| `CrmCustomerFeedbackSurvey` | `crm_customer_feedback_surveys` | yes | no | RLS LINK GAP |
| `CrmNpsResponse` | `crm_nps_responses` | yes | no | RLS LINK GAP |
| `CrmFieldVisitSchedule` | `crm_field_visit_schedules` | yes | no | RLS LINK GAP |
| `CrmSalesRoutePlan` | `crm_sales_route_plans` | yes | no | RLS LINK GAP |
| `CrmPartnerTierBenefit` | `crm_partner_tier_benefits` | yes | no | RLS LINK GAP |
| `CrmPartnerCertification` | `crm_partner_certifications` | yes | no | RLS LINK GAP |
| `CrmSavedReport` | `crm_saved_reports` | yes | no | RLS LINK GAP |
| `CrmReportSchedule` | `crm_report_schedules` | yes | no | RLS LINK GAP |
| `CrmReportShare` | `crm_report_shares` | yes | no | RLS LINK GAP |
| `CrmDashboardTemplate` | `crm_dashboard_templates` | yes | no | RLS LINK GAP |
| `CrmDashboardShare` | `crm_dashboard_shares` | yes | no | RLS LINK GAP |

