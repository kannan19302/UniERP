# Tenant model to RLS migration linkage: prisma/schema/core-part-3.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `OnboardingChecklist` | `onboarding_checklists` | yes | no | RLS LINK GAP |
| `OnboardingItem` | `onboarding_items` | yes | no | RLS LINK GAP |
| `OffboardingChecklist` | `offboarding_checklists` | yes | no | RLS LINK GAP |
| `OffboardingItem` | `offboarding_items` | yes | no | RLS LINK GAP |
| `JobPosting` | `job_postings` | yes | no | RLS LINK GAP |
| `Applicant` | `applicants` | yes | no | RLS LINK GAP |
| `Interview` | `interviews` | yes | no | RLS LINK GAP |
| `Goal` | `goals` | yes | no | RLS LINK GAP |
| `GoalComment` | `goal_comments` | yes | no | RLS LINK GAP |
| `KeyResult` | `key_results` | yes | no | RLS LINK GAP |
| `Feedback360` | `feedback_360` | yes | no | RLS LINK GAP |
| `FeedbackResponse` | `feedback_responses` | yes | no | RLS LINK GAP |
| `SuccessionPlan` | `succession_plans` | yes | no | RLS LINK GAP |
| `HRTicket` | `hr_tickets` | yes | no | RLS LINK GAP |
| `EngagementSurvey` | `engagement_surveys` | yes | no | RLS LINK GAP |
| `SurveyQuestion` | `survey_questions` | yes | no | RLS LINK GAP |
| `SurveyResponse` | `survey_responses` | yes | no | RLS LINK GAP |
| `ShiftSchedule` | `shift_schedules` | yes | no | RLS LINK GAP |
| `Appraisal` | `appraisals` | yes | no | RLS LINK GAP |
| `Training` | `trainings` | yes | no | RLS LINK GAP |
| `TrainingEnrollment` | `training_enrollments` | yes | no | RLS LINK GAP |
| `OfferLetter` | `offer_letters` | yes | no | RLS LINK GAP |
| `BenefitScheme` | `benefit_schemes` | yes | no | RLS LINK GAP |
| `SkillRequirement` | `skill_requirements` | yes | no | RLS LINK GAP |
| `ComplianceCheck` | `compliance_checks` | yes | no | RLS LINK GAP |
| `TaxTable` | `tax_tables` | yes | no | RLS LINK GAP |
| `HolidayCalendar` | `holiday_calendars` | yes | no | RLS LINK GAP |
| `ExitInterview` | `exit_interviews` | yes | no | RLS LINK GAP |
| `RecruitmentAgency` | `recruitment_agencies` | yes | no | RLS LINK GAP |
| `OfferTemplate` | `offer_templates` | yes | no | RLS LINK GAP |
| `SalaryRevision` | `salary_revisions` | yes | no | RLS LINK GAP |
| `OvertimeRequest` | `overtime_requests` | yes | no | RLS LINK GAP |
| `AttendanceAdjustment` | `attendance_adjustments` | yes | no | RLS LINK GAP |
| `KpiTemplate` | `kpi_templates` | yes | no | RLS LINK GAP |
| `KpiEvaluation` | `kpi_evaluations` | yes | no | RLS LINK GAP |
| `LearningCourse` | `learning_courses` | yes | no | RLS LINK GAP |
| `LearningModule` | `learning_modules` | yes | no | RLS LINK GAP |
| `LearningEnrollment` | `learning_enrollments` | yes | no | RLS LINK GAP |
| `Certification` | `certifications` | yes | no | RLS LINK GAP |
| `SkillMatrix` | `skill_matrices` | yes | no | RLS LINK GAP |
| `SkillGapAnalysis` | `skill_gap_analyses` | yes | no | RLS LINK GAP |
| `CareerPath` | `career_paths` | yes | no | RLS LINK GAP |
| `CareerPathRequirement` | `career_path_requirements` | yes | no | RLS LINK GAP |
| `MentoringProgram` | `mentoring_programs` | yes | no | RLS LINK GAP |
| `MentoringSession` | `mentoring_sessions` | yes | no | RLS LINK GAP |
| `BonusPlan` | `bonus_plans` | yes | no | RLS LINK GAP |
| `BonusPayout` | `bonus_payouts` | yes | no | RLS LINK GAP |
| `EquityGrant` | `equity_grants` | yes | no | RLS LINK GAP |
| `EquityVestingSchedule` | `equity_vesting_schedules` | yes | no | RLS LINK GAP |
| `BenefitsEligibilityRule` | `benefits_eligibility_rules` | yes | no | RLS LINK GAP |
| `FlexibleBenefitCredit` | `flexible_benefit_credits` | yes | no | RLS LINK GAP |
| `CompensationReview` | `compensation_reviews` | yes | no | RLS LINK GAP |
| `CompensationBenchmark` | `compensation_benchmarks` | yes | no | RLS LINK GAP |
| `TotalRewardsStatement` | `total_rewards_statements` | yes | no | RLS LINK GAP |
| `DisputeResolution` | `dispute_resolutions` | yes | no | RLS LINK GAP |
| `BackgroundCheckRequest` | `background_check_requests` | yes | no | RLS LINK GAP |
| `VisaRecord` | `visa_records` | yes | no | RLS LINK GAP |
| `ImmigrationDocument` | `immigration_documents` | yes | no | RLS LINK GAP |
| `WellnessActivity` | `wellness_activities` | yes | no | RLS LINK GAP |
| `DEIMetric` | `dei_metrics` | yes | no | RLS LINK GAP |
| `DEIReport` | `dei_reports` | yes | no | RLS LINK GAP |
| `TurnoverPrediction` | `turnover_predictions` | yes | no | RLS LINK GAP |
| `ComplianceRequirement` | `compliance_requirements` | yes | no | RLS LINK GAP |
| `HRComplianceReport` | `hr_compliance_reports` | yes | no | RLS LINK GAP |
| `WellnessChallenge` | `wellness_challenges` | yes | no | RLS LINK GAP |
| `WellnessLeaderboard` | `wellness_leaderboards` | yes | no | RLS LINK GAP |
| `eNPSurvey` | `enp_surveys` | yes | no | RLS LINK GAP |
| `PulseSurvey` | `pulse_surveys` | yes | no | RLS LINK GAP |
| `AlumniRecord` | `alumni_records` | yes | no | RLS LINK GAP |
| `AlumniEvent` | `alumni_events` | yes | no | RLS LINK GAP |
| `AlumniEventAttendee` | `alumni_event_attendees` | yes | no | RLS LINK GAP |
| `Workflow` | `workflows` | yes | no | RLS LINK GAP |
| `WorkflowStep` | `workflow_steps` | yes | no | RLS LINK GAP |
| `ApprovalChain` | `approval_chains` | yes | no | RLS LINK GAP |
| `NotificationChannel` | `notification_channels` | yes | no | RLS LINK GAP |
| `NotificationPreference` | `notification_preferences` | yes | no | RLS LINK GAP |
| `GeneratedDocument` | `generated_documents` | yes | no | RLS LINK GAP |
| `StorageFolder` | `storage_folders` | yes | no | RLS LINK GAP |
| `StorageFileVersion` | `storage_file_versions` | yes | no | RLS LINK GAP |
| `StorageShareLink` | `storage_share_links` | yes | no | RLS LINK GAP |
| `StorageQuota` | `storage_quotas` | yes | no | RLS LINK GAP |
| `StoredFile` | `stored_files` | yes | no | RLS LINK GAP |
| `ReportWidget` | `report_widgets` | yes | no | RLS LINK GAP |
| `ReportView` | `report_views` | yes | no | RLS LINK GAP |
| `ApiKeyScope` | `api_key_scopes` | yes | no | RLS LINK GAP |
| `ApiUsageMetric` | `api_usage_metrics` | yes | no | RLS LINK GAP |
| `EndpointRegistry` | `endpoint_registries` | yes | no | RLS LINK GAP |
| `LanguageOverride` | `language_overrides` | yes | no | RLS LINK GAP |
| `Locale` | `locales` | yes | no | RLS LINK GAP |
| `TranslationKey` | `translation_keys` | yes | no | RLS LINK GAP |
| `TranslationEntry` | `translation_entries` | yes | no | RLS LINK GAP |
| `TranslationImport` | `translation_imports` | yes | no | RLS LINK GAP |
| `LocaleFormattingRule` | `locale_formatting_rules` | yes | no | RLS LINK GAP |
| `OfflineSyncQueue` | `offline_sync_queues` | yes | no | RLS LINK GAP |
| `SaaSPlan` | `saas_plans` | no | no | global/ownership review |
| `TenantSubscription` | `tenant_subscriptions` | yes | no | RLS LINK GAP |
| `UsageRecord` | `usage_records` | yes | no | RLS LINK GAP |
| `MeteringEvent` | `metering_events` | yes | yes | STRUCTURAL LINK |
| `SaaSCoupon` | `saas_coupons` | no | no | global/ownership review |
| `SaaSAddOn` | `saas_addons` | no | no | global/ownership review |
| `TenantAddOn` | `tenant_addons` | yes | no | RLS LINK GAP |
| `QuotaRule` | `quota_rules` | no | no | global/ownership review |
| `InstalledApp` | `installed_apps` | yes | no | RLS LINK GAP |
| `AppStorageUsage` | `app_storage_usage` | yes | no | RLS LINK GAP |
| `SaaSPlanPrice` | `saas_plan_prices` | no | no | global/ownership review |
| `SaaSPlanFeature` | `saas_plan_features` | no | no | global/ownership review |
| `SaaSInvoice` | `saas_invoices` | yes | no | RLS LINK GAP |
| `SaaSInvoiceLineItem` | `saas_invoice_line_items` | no | no | global/ownership review |
| `UsageAlertRule` | `usage_alert_rules` | yes | no | RLS LINK GAP |
| `UsageAlertLog` | `usage_alert_logs` | yes | no | RLS LINK GAP |
| `TenantApiKey` | `tenant_api_keys` | yes | no | RLS LINK GAP |
| `TenantAuditLog` | `tenant_audit_logs` | yes | no | RLS LINK GAP |
| `TenantSupportTicket` | `tenant_support_tickets` | yes | no | RLS LINK GAP |
| `TicketMessage` | `ticket_messages` | no | no | global/ownership review |
| `TenantDomain` | `tenant_domains` | yes | no | RLS LINK GAP |
| `TenantSsoConfig` | `tenant_sso_configs` | yes | no | RLS LINK GAP |
| `TenantBranding` | `tenant_branding` | yes | no | RLS LINK GAP |
| `DataExportJob` | `data_export_jobs` | yes | no | RLS LINK GAP |

