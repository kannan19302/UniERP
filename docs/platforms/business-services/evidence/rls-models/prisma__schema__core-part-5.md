# Tenant model to RLS migration linkage: prisma/schema/core-part-5.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `CustomerTag` | `customer_tags` | yes | no | RLS LINK GAP |
| `CustomerTagLink` | `customer_tag_links` | no | no | global/ownership review |
| `SalesTarget` | `sales_targets` | yes | no | RLS LINK GAP |
| `SavedReport` | `saved_reports` | yes | no | RLS LINK GAP |
| `EmailSequence` | `email_sequences` | yes | no | RLS LINK GAP |
| `EmailSequenceStep` | `email_sequence_steps` | no | no | global/ownership review |
| `EmailSequenceEnrollment` | `email_sequence_enrollments` | yes | no | RLS LINK GAP |
| `CadenceAutoEnrollRule` | `cadence_auto_enroll_rules` | yes | no | RLS LINK GAP |
| `CadenceStepTask` | `cadence_step_tasks` | yes | no | RLS LINK GAP |
| `SalesTerritory` | `sales_territories` | yes | no | RLS LINK GAP |
| `SalesTeamMember` | `sales_team_members` | yes | no | RLS LINK GAP |
| `TerritoryAssignmentRule` | `territory_assignment_rules` | yes | no | RLS LINK GAP |
| `TerritoryAssignmentLog` | `territory_assignment_logs` | yes | no | RLS LINK GAP |
| `TerritoryRoundRobinState` | `territory_round_robin_states` | yes | no | RLS LINK GAP |
| `CommissionRule` | `commission_rules` | yes | no | RLS LINK GAP |
| `CommissionEntry` | `commission_entries` | yes | no | RLS LINK GAP |
| `ApprovalProcess` | `crm_approval_processes` | yes | no | RLS LINK GAP |
| `ApprovalRequest` | `crm_approval_requests` | yes | no | RLS LINK GAP |
| `ApprovalAction` | `crm_approval_actions` | yes | no | RLS LINK GAP |
| `QuotationSection` | `quotation_sections` | yes | no | RLS LINK GAP |
| `QuotationVersion` | `quotation_versions` | yes | no | RLS LINK GAP |
| `QuotationTemplate` | `quotation_templates` | yes | no | RLS LINK GAP |
| `QuotationSignature` | `quotation_signatures` | yes | no | RLS LINK GAP |
| `QuotationSignatureCertificate` | `quotation_signature_certificates` | yes | no | RLS LINK GAP |
| `SalesPlaybook` | `sales_playbooks` | yes | no | RLS LINK GAP |
| `PlaybookStage` | `playbook_stages` | yes | no | RLS LINK GAP |
| `Battlecard` | `battlecards` | yes | no | RLS LINK GAP |
| `UoMConversion` | `uom_conversions` | yes | no | RLS LINK GAP |
| `ReorderRule` | `reorder_rules` | yes | no | RLS LINK GAP |
| `DemandForecastRun` | `demand_forecast_runs` | yes | no | RLS LINK GAP |
| `DemandForecastLine` | `demand_forecast_lines` | yes | no | RLS LINK GAP |
| `ReorderSuggestion` | `reorder_suggestions` | yes | no | RLS LINK GAP |
| `KitVersion` | `kit_versions` | yes | no | RLS LINK GAP |
| `PurchaseRequisition` | `purchase_requisitions` | yes | no | RLS LINK GAP |
| `PurchaseRequisitionItem` | `purchase_requisition_items` | yes | no | RLS LINK GAP |
| `BlanketPurchaseAgreement` | `blanket_purchase_agreements` | yes | no | RLS LINK GAP |
| `BlanketPurchaseAgreementItem` | `blanket_purchase_agreement_items` | yes | no | RLS LINK GAP |
| `ChangeHistory` | `change_history` | yes | no | RLS LINK GAP |
| `DemoDataRecord` | `demo_data_records` | yes | no | RLS LINK GAP |
| `Permission` | `permissions` | no | no | global/ownership review |
| `AccessPackage` | `access_packages` | yes | no | RLS LINK GAP |
| `RoleAccessPackage` | `role_access_packages` | no | no | global/ownership review |
| `SystemAnnouncement` | `system_announcements` | yes | no | RLS LINK GAP |
| `ScheduledReport` | `scheduled_reports` | yes | no | RLS LINK GAP |
| `DataRetentionPolicy` | `data_retention_policies` | yes | no | RLS LINK GAP |
| `DataErasureRequest` | `data_erasure_requests` | yes | no | RLS LINK GAP |
| `SubjectErasureKey` | `subject_erasure_keys` | yes | yes | STRUCTURAL LINK |
| `RecordLegalHold` | `record_legal_holds` | yes | yes | STRUCTURAL LINK |
| `SettingChangeApproval` | `setting_change_approvals` | yes | yes | STRUCTURAL LINK |
| `SsoConfig` | `sso_configs` | yes | no | RLS LINK GAP |
| `LoginHistory` | `login_histories` | yes | no | RLS LINK GAP |
| `IpRestriction` | `ip_restrictions` | yes | no | RLS LINK GAP |
| `BackgroundJob` | `background_jobs` | yes | no | RLS LINK GAP |
| `ScheduledTask` | `scheduled_tasks` | yes | no | RLS LINK GAP |
| `ErrorLog` | `error_logs` | yes | no | RLS LINK GAP |
| `MarketplaceApp` | `marketplace_apps` | no | no | global/ownership review |
| `AppVendorSigningKey` | `app_vendor_signing_keys` | no | no | global/ownership review |
| `AppVendor` | `app_vendors` | no | no | global/ownership review |
| `AppPackage` | `app_packages` | no | no | global/ownership review |
| `AppBundle` | `app_bundles` | no | no | global/ownership review |
| `MarketplaceAppVersion` | `marketplace_app_versions` | no | no | global/ownership review |
| `MarketplaceDeveloperSubmission` | `marketplace_developer_submissions` | yes | no | RLS LINK GAP |
| `MarketplaceAnalytics` | `marketplace_analytics` | no | no | global/ownership review |
| `AppReview` | `app_reviews` | yes | no | RLS LINK GAP |
| `AppChangelog` | `app_changelogs` | no | no | global/ownership review |
| `AppCollection` | `app_collections` | no | no | global/ownership review |
| `AppCollectionItem` | `app_collection_items` | no | no | global/ownership review |
| `AppFavorite` | `app_favorites` | yes | no | RLS LINK GAP |
| `AppSubmission` | `app_submissions` | yes | no | RLS LINK GAP |
| `CustomFieldDefinition` | `custom_field_definitions` | yes | no | RLS LINK GAP |
| `CustomFieldValue` | `custom_field_values` | yes | no | RLS LINK GAP |
| `AutomationRuleExecution` | `automation_rule_executions` | yes | no | RLS LINK GAP |
| `RecycleBinItem` | `recycle_bin` | yes | no | RLS LINK GAP |
| `AdminAlert` | `admin_alerts` | yes | no | RLS LINK GAP |
| `AlertThreshold` | `alert_thresholds` | yes | no | RLS LINK GAP |
| `BulkOperation` | `bulk_operations` | yes | no | RLS LINK GAP |
| `Delegation` | `delegations` | yes | no | RLS LINK GAP |
| `DuplicateSet` | `duplicate_sets` | yes | no | RLS LINK GAP |
| `BillingEvent` | `billing_events` | yes | no | RLS LINK GAP |
| `CustomWorkflow` | `custom_workflows` | yes | no | RLS LINK GAP |
| `CustomDashboard` | `custom_dashboards` | yes | no | RLS LINK GAP |
| `LogicScript` | `logic_scripts` | yes | no | RLS LINK GAP |
| `EnvVariable` | `env_variables` | yes | no | RLS LINK GAP |
| `RunLog` | `run_logs` | yes | no | RLS LINK GAP |
| `StudioPermission` | `studio_permissions` | yes | no | RLS LINK GAP |
| `ThirdPartyConnector` | `third_party_connectors` | yes | no | RLS LINK GAP |
| `CustomWidget` | `custom_widgets` | yes | no | RLS LINK GAP |
| `GitConfig` | `builder_git_configs` | yes | no | RLS LINK GAP |
| `NativeBuild` | `builder_native_builds` | yes | no | RLS LINK GAP |
| `Case` | `crm_cases` | yes | no | RLS LINK GAP |
| `CaseComment` | `crm_case_comments` | yes | no | RLS LINK GAP |
| `CustomerPortalUser` | `customer_portal_users` | yes | no | RLS LINK GAP |
| `Contract` | `crm_contracts` | yes | no | RLS LINK GAP |
| `ContractBillingMilestone` | `crm_contract_billing_milestones` | yes | no | RLS LINK GAP |
| `MailboxConnection` | `crm_mailbox_connections` | yes | no | RLS LINK GAP |
| `VendorPortalUser` | `vendor_portal_users` | yes | no | RLS LINK GAP |
| `RFQAuctionBid` | `rfq_auction_bids` | yes | no | RLS LINK GAP |
| `SalesChannel` | `sales_channels` | yes | no | RLS LINK GAP |
| `ChannelInventory` | `channel_inventory` | yes | no | RLS LINK GAP |
| `SalesPromotion` | `sales_promotions` | yes | no | RLS LINK GAP |
| `SalesCoupon` | `sales_coupons` | yes | no | RLS LINK GAP |
| `SalesPartnerTier` | `sales_partner_tiers` | yes | no | RLS LINK GAP |
| `SalesPartner` | `sales_partners` | yes | no | RLS LINK GAP |
| `StorefrontConfig` | `storefront_configs` | yes | no | RLS LINK GAP |
| `StorefrontCategory` | `storefront_categories` | yes | no | RLS LINK GAP |
| `Cart` | `carts` | yes | no | RLS LINK GAP |
| `CartItem` | `cart_items` | yes | no | RLS LINK GAP |
| `StorefrontOrderPayment` | `storefront_order_payments` | yes | no | RLS LINK GAP |
| `StorefrontCheckoutState` | `storefront_checkout_states` | yes | no | RLS LINK GAP |
| `FixedAssetCategory` | `fixed_asset_categories` | yes | no | RLS LINK GAP |
| `AssetTransferLog` | `asset_transfer_logs` | yes | no | RLS LINK GAP |
| `AssetMaintenanceLog` | `asset_maintenance_logs` | yes | no | RLS LINK GAP |
| `FixedAssetDisposal` | `fixed_asset_disposals` | yes | no | RLS LINK GAP |

