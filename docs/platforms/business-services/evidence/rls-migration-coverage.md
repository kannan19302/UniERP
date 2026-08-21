# RLS Migration and Tenant-model Coverage

Generated from current Prisma schemas and migration SQL on 2026-08-21. This is lexical linkage only; runtime PostgreSQL catalogs, FORCE status, application role attributes and two-tenant behavior remain required.

## Summary

- Tenant models: 1865
- Tenant models whose effective table appears in an RLS migration statement: 55
- Unlinked tenant models: 1810
- Distinct tables named by RLS statements: 53

| Schema file | Tenant models | RLS-linked | Unlinked | Detail |
| --- | ---: | ---: | ---: | --- |
| `dist/idp-client/schema.prisma` | 18 | 7 | 11 | [models](rls-models/dist__idp-client__schema.md) |
| `prisma/idp-schema.prisma` | 18 | 7 | 11 | [models](rls-models/prisma__idp-schema.md) |
| `prisma/schema/ai-governance.prisma` | 0 | 0 | 0 | [models](rls-models/prisma__schema__ai-governance.md) |
| `prisma/schema/catalogue.prisma` | 1 | 1 | 0 | [models](rls-models/prisma__schema__catalogue.md) |
| `prisma/schema/compliance.prisma` | 0 | 0 | 0 | [models](rls-models/prisma__schema__compliance.md) |
| `prisma/schema/config.prisma` | 0 | 0 | 0 | [models](rls-models/prisma__schema__config.md) |
| `prisma/schema/core-part-1.prisma` | 93 | 1 | 92 | [models](rls-models/prisma__schema__core-part-1.md) |
| `prisma/schema/core-part-10.prisma` | 103 | 3 | 100 | [models](rls-models/prisma__schema__core-part-10.md) |
| `prisma/schema/core-part-11.prisma` | 107 | 0 | 107 | [models](rls-models/prisma__schema__core-part-11.md) |
| `prisma/schema/core-part-12.prisma` | 113 | 0 | 113 | [models](rls-models/prisma__schema__core-part-12.md) |
| `prisma/schema/core-part-13.prisma` | 121 | 0 | 121 | [models](rls-models/prisma__schema__core-part-13.md) |
| `prisma/schema/core-part-14.prisma` | 112 | 0 | 112 | [models](rls-models/prisma__schema__core-part-14.md) |
| `prisma/schema/core-part-15.prisma` | 27 | 0 | 27 | [models](rls-models/prisma__schema__core-part-15.md) |
| `prisma/schema/core-part-2.prisma` | 104 | 0 | 104 | [models](rls-models/prisma__schema__core-part-2.md) |
| `prisma/schema/core-part-3.prisma` | 110 | 1 | 109 | [models](rls-models/prisma__schema__core-part-3.md) |
| `prisma/schema/core-part-4.prisma` | 105 | 0 | 105 | [models](rls-models/prisma__schema__core-part-4.md) |
| `prisma/schema/core-part-5.prisma` | 99 | 3 | 96 | [models](rls-models/prisma__schema__core-part-5.md) |
| `prisma/schema/core-part-6.prisma` | 101 | 0 | 101 | [models](rls-models/prisma__schema__core-part-6.md) |
| `prisma/schema/core-part-7.prisma` | 79 | 0 | 79 | [models](rls-models/prisma__schema__core-part-7.md) |
| `prisma/schema/core-part-8.prisma` | 87 | 0 | 87 | [models](rls-models/prisma__schema__core-part-8.md) |
| `prisma/schema/core-part-9.prisma` | 82 | 0 | 82 | [models](rls-models/prisma__schema__core-part-9.md) |
| `prisma/schema/crm.prisma` | 66 | 0 | 66 | [models](rls-models/prisma__schema__crm.md) |
| `prisma/schema/custom-objects.prisma` | 2 | 2 | 0 | [models](rls-models/prisma__schema__custom-objects.md) |
| `prisma/schema/developer-platform.prisma` | 7 | 7 | 0 | [models](rls-models/prisma__schema__developer-platform.md) |
| `prisma/schema/education.prisma` | 22 | 0 | 22 | [models](rls-models/prisma__schema__education.md) |
| `prisma/schema/extensions.prisma` | 2 | 2 | 0 | [models](rls-models/prisma__schema__extensions.md) |
| `prisma/schema/field-service.prisma` | 26 | 0 | 26 | [models](rls-models/prisma__schema__field-service.md) |
| `prisma/schema/finance.prisma` | 29 | 0 | 29 | [models](rls-models/prisma__schema__finance.md) |
| `prisma/schema/healthcare.prisma` | 24 | 0 | 24 | [models](rls-models/prisma__schema__healthcare.md) |
| `prisma/schema/hr.prisma` | 36 | 0 | 36 | [models](rls-models/prisma__schema__hr.md) |
| `prisma/schema/inventory.prisma` | 31 | 0 | 31 | [models](rls-models/prisma__schema__inventory.md) |
| `prisma/schema/manufacturing.prisma` | 8 | 0 | 8 | [models](rls-models/prisma__schema__manufacturing.md) |
| `prisma/schema/marketplace-payouts.prisma` | 0 | 0 | 0 | [models](rls-models/prisma__schema__marketplace-payouts.md) |
| `prisma/schema/operation-pipeline.prisma` | 0 | 0 | 0 | [models](rls-models/prisma__schema__operation-pipeline.md) |
| `prisma/schema/org-structure.prisma` | 3 | 3 | 0 | [models](rls-models/prisma__schema__org-structure.md) |
| `prisma/schema/policy-engine.prisma` | 0 | 0 | 0 | [models](rls-models/prisma__schema__policy-engine.md) |
| `prisma/schema/pos.prisma` | 16 | 0 | 16 | [models](rls-models/prisma__schema__pos.md) |
| `prisma/schema/projects.prisma` | 46 | 0 | 46 | [models](rls-models/prisma__schema__projects.md) |
| `prisma/schema/provider-registry.prisma` | 6 | 6 | 0 | [models](rls-models/prisma__schema__provider-registry.md) |
| `prisma/schema/real-estate.prisma` | 23 | 0 | 23 | [models](rls-models/prisma__schema__real-estate.md) |
| `prisma/schema/reconciler.prisma` | 0 | 0 | 0 | [models](rls-models/prisma__schema__reconciler.md) |
| `prisma/schema/resource-model.prisma` | 2 | 2 | 0 | [models](rls-models/prisma__schema__resource-model.md) |
| `prisma/schema/runbooks.prisma` | 0 | 0 | 0 | [models](rls-models/prisma__schema__runbooks.md) |
| `prisma/schema/saas-portal.prisma` | 1 | 1 | 0 | [models](rls-models/prisma__schema__saas-portal.md) |
| `prisma/schema/web.prisma` | 15 | 0 | 15 | [models](rls-models/prisma__schema__web.md) |
| `prisma/schema/workflow-runtime.prisma` | 2 | 2 | 0 | [models](rls-models/prisma__schema__workflow-runtime.md) |
| `src/idp-client/schema.prisma` | 18 | 7 | 11 | [models](rls-models/src__idp-client__schema.md) |

## Migration SQL inventory

| Migration file | CREATE TABLE | ALTER TABLE | DROP TABLE | ENABLE RLS | FORCE RLS | CREATE POLICY |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `prisma/migrations/20260610153046_initial/migration.sql` | 17 | 17 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260611090910_phase2_procurement_sales_supply/migration.sql` | 11 | 12 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260611120903_phase3_models/migration.sql` | 7 | 5 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260611122131_phase4_5_initial/migration.sql` | 21 | 11 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260611123302_phase6_10_initial/migration.sql` | 22 | 8 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260611125635_phase_11_to_15_initial/migration.sql` | 23 | 17 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260611132415_phase_16_to_20_initial/migration.sql` | 8 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260611144302_add_installed_apps/migration.sql` | 1 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260612103025_finance_advanced_core_n/migration.sql` | 1 | 5 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260612153403_test/migration.sql` | 19 | 31 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260613055425_user_preferences/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260613105535_advanced_finance_tiers2_5/migration.sql` | 6 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260613111352_advanced_hr_tiers_all/migration.sql` | 21 | 9 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260613120455_add_goal_comments_and_checklist_status/migration.sql` | 1 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260613124320_add_training_enrollments/migration.sql` | 1 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260613150301_dev_init/migration.sql` | 6 | 10 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260613151320_add_stock_ledger_and_qc/migration.sql` | 4 | 5 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260613151639_add_cycle_count_item_relation/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260613160530_add_procurement_rfq_quotation/migration.sql` | 4 | 11 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260613163008_add_sales_channels/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260613221508_add_campaigns_and_returns/migration.sql` | 5 | 13 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260614043658_add_advanced_fields/migration.sql` | 0 | 6 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260617135916_builder_studio/migration.sql` | 27 | 24 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260617141732_web_builder_models/migration.sql` | 4 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260618132649_builder_registry_initial/migration.sql` | 3 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260618135939_phase_19_add_page_registry_history/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260619143534_web_builder_settings/migration.sql` | 1 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260620041001_add_module_to_builder_form/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260620042309_add_scope_to_builder_module/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260620050000_add_app_releases_and_store_listing/migration.sql` | 1 | 12 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260620120000_add_web_cms_collections/migration.sql` | 3 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260620140000_add_web_orders/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260621053718_rename_to_drive/migration.sql` | 2 | 6 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260621083803_pos_retail_overhaul/migration.sql` | 40 | 64 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260621100000_connect_teams_gchat/migration.sql` | 6 | 15 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260621103503_add_requisition_and_blanket_agreement/migration.sql` | 4 | 11 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260621115408_admin/migration.sql` | 5 | 5 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260621121853_admin_features/migration.sql` | 4 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260621140000_connect_read_state/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260621160000_connect_advanced_features/migration.sql` | 1 | 9 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260621200000_crm_all_phases/migration.sql` | 17 | 15 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260621210000_crm_phases_7_12/migration.sql` | 19 | 15 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260622090000_currency_revaluation/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260622100000_einvoice_and_po_fx/migration.sql` | 1 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260625120000_marketplace_bundles_vendors/migration.sql` | 5 | 8 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260626120000_rls_policies/migration.sql` | 0 | 2 | 0 | 1 | 1 | 1 |
| `prisma/migrations/20260627120000_schema_drift_catchup/migration.sql` | 24 | 18 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260627130000_app_nav_overlays/migration.sql` | 1 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260627140000_web_studio_multisite/migration.sql` | 4 | 6 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260701220000_pm_gap_closure_cases_portal_auction_omnichannel_multibook/migration.sql` | 7 | 14 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260702002940_communication_channel_archived/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260702120000_connect_roles_notify_search/migration.sql` | 0 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260702130000_admin_background_job_bull_correlation/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260703193251_ecommerce_storefront_initial/migration.sql` | 6 | 5 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260704045305_add_fixed_assets/migration.sql` | 14 | 20 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260704120000_crm_advanced_features/migration.sql` | 7 | 6 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260704120500_crm_advanced_rls/migration.sql` | 0 | 4 | 0 | 2 | 2 | 3 |
| `prisma/migrations/20260704130000_crm_customer_tags/migration.sql` | 2 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260704180000_crm_add_contract/migration.sql` | 1 | 4 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260704200000_crm_mailbox_connections/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260708183425_add_subscriptions/migration.sql` | 23 | 34 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260708223552_expense_management_deepening/migration.sql` | 5 | 20 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709030800_dynamic_allocation_engine/migration.sql` | 2 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709040000_intercompany_elimination_rules/migration.sql` | 3 | 6 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709090000_installed_app_service_config/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709100000_archive_field_service_tables/migration.sql` | 0 | 4 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709110000_archive_education_realestate_tables/migration.sql` | 0 | 11 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709120000_ap_matching_payment_batches/migration.sql` | 4 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709120000_archive_healthcare_tables/migration.sql` | 0 | 6 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709143000_fpa_close_budget_scenarios/migration.sql` | 4 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709153000_ap_invoice_capture/migration.sql` | 2 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709153531_add_budget_control_and_reallocation/migration.sql` | 4 | 20 | 21 | 0 | 0 | 0 |
| `prisma/migrations/20260709160000_spend_management/migration.sql` | 4 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709170000_add_accounting_book_rules/migration.sql` | 1 | 6 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709171443_finance_big_phase_batch_all/migration.sql` | 35 | 5 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709181546_finance_advanced_hardening_all/migration.sql` | 9 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709182239_finance_consolidation_run_fields/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709185000_add_project_cost_entry_and_poc_fields/migration.sql` | 1 | 4 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260709200000_drop_archived_industry_tables/migration.sql` | 0 | 0 | 21 | 0 | 0 | 0 |
| `prisma/migrations/20260711041855_finance_1099_vendor_tax_reporting/migration.sql` | 3 | 4 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260711044719_finance_economic_nexus_monitoring/migration.sql` | 3 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260711095434_crm_customer_portal/migration.sql` | 1 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260711101654_crm_sales_ops_automation/migration.sql` | 6 | 7 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260711105245_crm_pipeline_risk_portal_payment/migration.sql` | 2 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260711111133_crm_conversation_intelligence_and_risk_digest/migration.sql` | 1 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260711113359_crm_ai_drafts/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260711143449_crm_gamification_commission_automation/migration.sql` | 9 | 6 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260711145751_crm_coaching_dealroom_hierarchy/migration.sql` | 7 | 8 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712014515_inventory_putaway_license_plates/migration.sql` | 4 | 14 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712015953_inventory_quarantine_stock_reservations/migration.sql` | 2 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712023732_inventory_transfer_approval/migration.sql` | 2 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712025022_inventory_wave_pick_consignment/migration.sql` | 5 | 8 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712025813_inventory_qa_templates/migration.sql` | 1 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712031329_inventory_kit_versioning/migration.sql` | 1 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712035133_inventory_dock_scheduling/migration.sql` | 1 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712064837_inventory_demand_forecasting/migration.sql` | 3 | 8 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712074500_inventory_rtv_workflow/migration.sql` | 3 | 5 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712090000_inventory_cycle15_labor_quality_automation/migration.sql` | 8 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712110000_inventory_cycle16_asn_carrier_logistics/migration.sql` | 7 | 6 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712150000_inventory_cycle17_quality_compliance/migration.sql` | 6 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712170000_inventory_cycle18_warehouse_ops/migration.sql` | 6 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712190000_inventory_cycle19_lot_serial_tracking/migration.sql` | 4 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260712200000_inventory_cycle20_demand_forecasting/migration.sql` | 5 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713040000_inventory_cycle21_landed_cost/migration.sql` | 4 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713050000_inventory_cycle22_stock_valuation/migration.sql` | 5 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713060000_inventory_cycle23_transfer_orders/migration.sql` | 4 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713070000_inventory_cycle24_yard_management/migration.sql` | 5 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713080000_inventory_cycle25_stock_take/migration.sql` | 4 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713090000_inventory_cycle26_hazmat/migration.sql` | 6 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713100000_inventory_cycle27_asl/migration.sql` | 5 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713110000_inventory_cycle28_container_pallet/migration.sql` | 8 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713120000_inventory_cycle29_catch_weight_recall/migration.sql` | 7 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713130000_inventory_cycle30_packaging_gs1/migration.sql` | 6 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713140000_inventory_cycle31_cold_chain_writeoff/migration.sql` | 4 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713150000_inventory_cycle32_velocity_abc_xyz/migration.sql` | 4 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713160000_inventory_cycle33_customer_returns/migration.sql` | 4 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713170000_inventory_cycle34_minmax_replen/migration.sql` | 3 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713180000_inventory_cycle35_freight_claims/migration.sql` | 3 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713190000_inventory_cycle36_vmi/migration.sql` | 3 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713200000_inventory_cycle37_costing/migration.sql` | 3 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713210000_inventory_cycle38_lot_expiry/migration.sql` | 3 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713230000_inventory_cycle39_cross_dock/migration.sql` | 3 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713240000_inventory_cycle40_pick_waves/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713250000_inventory_cycle41_asn/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260713260000_inventory_cycle42_shipment_tracking/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260717000000_connect_extensions_phase2/migration.sql` | 7 | 10 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260717010000_auth_hardening/migration.sql` | 1 | 6 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260717180000_add_blockchain_models/migration.sql` | 2 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260718063351_track_g5_b_h2_foundation_models/migration.sql` | 5 | 5 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260718063443_track_g5_b_h2_foundation_models/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260718065259_track_d_storefront_checkout_state/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260718065352_track_d_storefront_checkout_state/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260718065502_track_d_noop/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260718093000_track_a_reconciliation/migration.sql` | 11 | 575 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260718100000_create_unerp_api_role/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260718101000_rls_all_tables/migration.sql` | 0 | 3 | 0 | 1 | 1 | 2 |
| `prisma/migrations/20260718110000_add_blockchain_sync_checkpoint/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260718154634_add_login_history/migration.sql` | 1 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260718160813_add_billing_and_coupon_models/migration.sql` | 5 | 5 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260719000000_add_lead_scoring_nurture/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260719000000_rls_new_models/migration.sql` | 0 | 2 | 0 | 1 | 1 | 1 |
| `prisma/migrations/20260719010000_auth_login_lookup_fn/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260719020000_add_presence_visibility/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260719030000_add_mfa_push_approval/migration.sql` | 2 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260719030100_rls_mfa_push_approval/migration.sql` | 0 | 2 | 0 | 1 | 1 | 1 |
| `prisma/migrations/20260719040000_email_verification/migration.sql` | 1 | 4 | 0 | 1 | 1 | 1 |
| `prisma/migrations/20260719050000_refresh_tokens/migration.sql` | 0 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260719060000_oauth_identities/migration.sql` | 1 | 3 | 0 | 1 | 1 | 1 |
| `prisma/migrations/20260719070000_rls_login_history_billing/migration.sql` | 0 | 2 | 0 | 1 | 1 | 1 |
| `prisma/migrations/20260719080000_billing_money_fields_decimal/migration.sql` | 0 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260719090000_add_user_profile_directory/migration.sql` | 1 | 6 | 0 | 1 | 1 | 1 |
| `prisma/migrations/20260719121915_saas_portal_700_features/migration.sql` | 19 | 28 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260719145229_gate_builder_studio_module/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260719150300_ungate_business_module_catalog_flags/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260720160000_add_installed_apps/migration.sql` | 2 | 4 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260721000000_finance_production_grade_persistence/migration.sql` | 7 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260721090000_drop_unused_app_installation_settings/migration.sql` | 0 | 3 | 2 | 0 | 0 | 0 |
| `prisma/migrations/20260722000000_supply_chain_cycle35/migration.sql` | 12 | 10 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260722094230_crm_kb_winloss_prm_channels/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260722100000_recreate_app_settings/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260722100100_rls_app_settings/migration.sql` | 0 | 2 | 0 | 1 | 1 | 1 |
| `prisma/migrations/20260722110000_add_platform_credentials/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260722120000_inventory_deepening_cycle35/migration.sql` | 27 | 29 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260723223000_baseline_schema_sync/migration.sql` | 302 | 228 | 2 | 0 | 0 | 0 |
| `prisma/migrations/20260724000000_add_bank_account_gl_link/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260724000001_add_finance_missing_models/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260725000000_add_hr_advanced_22_models/migration.sql` | 23 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260728000000_add_user_session_device_fields/migration.sql` | 0 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260728000100_add_push_device_tokens/migration.sql` | 1 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260730000000_convert_float_money_to_decimal/migration.sql` | 1 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260730000100_rls_catchup_all_gaps/migration.sql` | 0 | 2 | 0 | 1 | 1 | 2 |
| `prisma/migrations/20260804000000_normalise_tenant_isolation_policy_names/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260804010000_create_unmigrated_schema_tables/migration.sql` | 764 | 332 | 0 | 1 | 1 | 1 |
| `prisma/migrations/20260804020000_add_missing_schema_columns/migration.sql` | 0 | 46 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260805120000_float_money_to_decimal_r11/migration.sql` | 0 | 7 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260805130000_extension_installations/migration.sql` | 2 | 4 | 0 | 2 | 2 | 2 |
| `prisma/migrations/20260805150000_bundle_signing/migration.sql` | 1 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260805160000_marketplace_payouts/migration.sql` | 2 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260808010000_rls_camelcase_tenant_tables/migration.sql` | 0 | 2 | 0 | 1 | 1 | 2 |
| `prisma/migrations/20260808020000_create_auth_api_tokens/migration.sql` | 1 | 3 | 0 | 1 | 1 | 1 |
| `prisma/migrations/20260808030000_add_residency_region/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260808040000_add_saas_plan_version/migration.sql` | 0 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260812210000_rls_web_studio_sites/migration.sql` | 0 | 2 | 0 | 2 | 1 | 3 |
| `prisma/migrations/20260813000000_g09_custom_object_definitions/migration.sql` | 2 | 5 | 0 | 2 | 2 | 2 |
| `prisma/migrations/20260813010000_g10_builder_form_pages_conditions/migration.sql` | 0 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260813020000_g11_workflow_runtime/migration.sql` | 2 | 6 | 0 | 2 | 2 | 2 |
| `prisma/migrations/20260814000000_g13_rules_engine_rls/migration.sql` | 0 | 3 | 0 | 1 | 1 | 2 |
| `prisma/migrations/20260818000000_w1_oidc_provider/migration.sql` | 6 | 5 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260818010000_w2_platform_entitlement/migration.sql` | 4 | 11 | 0 | 2 | 2 | 2 |
| `prisma/migrations/20260818020000_w9_support_impersonation/migration.sql` | 2 | 6 | 0 | 2 | 2 | 2 |
| `prisma/migrations/20260819000000_rls_for_untracked_tables/migration.sql` | 0 | 36 | 0 | 18 | 18 | 18 |
| `prisma/migrations/20260820000000_public_site_tenant_resolver/migration.sql` | 0 | 0 | 0 | 0 | 1 | 0 |
| `prisma/migrations/20260820010000_devplatform_expand/migration.sql` | 2 | 4 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260820020000_rls_devplatform/migration.sql` | 0 | 4 | 0 | 2 | 2 | 2 |
| `prisma/migrations/20260820030000_rls_idp_gap/migration.sql` | 0 | 8 | 0 | 4 | 4 | 4 |
| `prisma/migrations/20260820040000_devplatform_backfill/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260820050000_rls_idp_preauth_fix/migration.sql` | 0 | 0 | 0 | 0 | 0 | 3 |
| `prisma/migrations/20260820060000_artifact_registry_expand/migration.sql` | 2 | 3 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260820070000_rls_artifact_registry/migration.sql` | 0 | 4 | 0 | 2 | 2 | 2 |
| `prisma/migrations/20260820080000_artifact_registry_backfill/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260820090000_p6_project_release_and_deployment_fk/migration.sql` | 1 | 10 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260820100000_rls_project_releases/migration.sql` | 0 | 2 | 0 | 1 | 1 | 1 |
| `prisma/migrations/20260820110000_p7_web_pages_to_site_pages/migration.sql` | 1 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260820120000_p7_conflict_report_fix/migration.sql` | 0 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260820130000_p7_purge_self_conflicts/migration.sql` | 0 | 0 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260820140000_p8_contract/migration.sql` | 5 | 5 | 4 | 0 | 0 | 0 |
| `prisma/migrations/20260820150000_p8_revert/migration.sql` | 4 | 8 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260820160000_rls_restored_and_archives/migration.sql` | 1 | 20 | 0 | 10 | 10 | 10 |
| `prisma/migrations/20260820170000_module_pages_datamodels/migration.sql` | 2 | 2 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260820180000_rls_module_pages_datamodels/migration.sql` | 0 | 4 | 0 | 2 | 2 | 2 |
| `prisma/migrations/20260820190000_module_page_layout/migration.sql` | 0 | 1 | 0 | 0 | 0 | 0 |
| `prisma/migrations/20260820200000_p8_contract_v2/migration.sql` | 1 | 5 | 4 | 0 | 0 | 0 |

An unlinked tenant model is a release-review candidate. A linked model is not proven isolated until policy predicates and non-bypass two-tenant tests are verified.

