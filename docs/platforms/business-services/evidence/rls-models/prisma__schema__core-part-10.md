# Tenant model to RLS migration linkage: prisma/schema/core-part-10.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `EcommerceProductVariant` | `ecommerce_product_variants` | yes | no | RLS LINK GAP |
| `EcommerceInventory` | `ecommerce_inventory` | yes | no | RLS LINK GAP |
| `EcommerceCart` | `ecommerce_carts` | yes | no | RLS LINK GAP |
| `EcommerceCartItem` | `ecommerce_cart_items` | yes | no | RLS LINK GAP |
| `EcommerceOrder` | `ecommerce_orders` | yes | no | RLS LINK GAP |
| `EcommerceOrderItem` | `ecommerce_order_items` | yes | no | RLS LINK GAP |
| `EcommercePayment` | `ecommerce_payments` | yes | no | RLS LINK GAP |
| `EcommerceShipment` | `ecommerce_shipments` | yes | no | RLS LINK GAP |
| `EcommerceReturn` | `ecommerce_returns` | yes | no | RLS LINK GAP |
| `EcommerceReview` | `ecommerce_reviews` | yes | no | RLS LINK GAP |
| `EcommerceReviewMedia` | `ecommerce_review_media` | yes | no | RLS LINK GAP |
| `EcommerceCoupon` | `ecommerce_coupons` | yes | no | RLS LINK GAP |
| `EcommerceCouponUsage` | `ecommerce_coupon_usage` | yes | no | RLS LINK GAP |
| `EcommerceShippingZone` | `ecommerce_shipping_zones` | yes | no | RLS LINK GAP |
| `EcommerceShippingRate` | `ecommerce_shipping_rates` | yes | no | RLS LINK GAP |
| `EcommerceTaxClass` | `ecommerce_tax_classes` | yes | no | RLS LINK GAP |
| `EcommerceTaxRate` | `ecommerce_tax_rates` | yes | no | RLS LINK GAP |
| `EcommerceStoreSetting` | `ecommerce_store_settings` | yes | no | RLS LINK GAP |
| `EcommerceStoreTheme` | `ecommerce_store_themes` | yes | no | RLS LINK GAP |
| `EcommerceAbandonedCart` | `ecommerce_abandoned_carts` | yes | no | RLS LINK GAP |
| `EcommerceWishlist` | `ecommerce_wishlists` | yes | no | RLS LINK GAP |
| `EcommerceWishlistItem` | `ecommerce_wishlist_items` | yes | no | RLS LINK GAP |
| `SaasApp` | `saas_apps` | yes | no | RLS LINK GAP |
| `SaasAppVersion` | `saas_app_versions` | yes | no | RLS LINK GAP |
| `SaasAppInstallation` | `saas_app_installations` | yes | no | RLS LINK GAP |
| `SaasAppPermission` | `saas_app_permissions` | yes | no | RLS LINK GAP |
| `SaasSubscriptionPlan` | `saas_subscription_plans` | yes | no | RLS LINK GAP |
| `SaasSubscription` | `saas_subscriptions` | yes | no | RLS LINK GAP |
| `SaasSubscriptionLineItem` | `saas_subscription_line_items` | yes | no | RLS LINK GAP |
| `SaasUsageRecord` | `saas_usage_records` | yes | no | RLS LINK GAP |
| `SaasUsageMeter` | `saas_usage_meters` | yes | no | RLS LINK GAP |
| `SaasInvoice2` | `saas_invoices_v2` | yes | no | RLS LINK GAP |
| `SaasInvoice2LineItem` | `saas_invoice_line_items_v2` | yes | no | RLS LINK GAP |
| `SaasPayment2` | `saas_payments_v2` | yes | no | RLS LINK GAP |
| `SaasPaymentMethod2` | `saas_payment_methods_v2` | yes | no | RLS LINK GAP |
| `SaasCoupon2` | `saas_coupons_v2` | yes | no | RLS LINK GAP |
| `SaasCoupon2Redemption` | `saas_coupon_redemptions` | yes | no | RLS LINK GAP |
| `SaasFeatureFlag` | `saas_feature_flags` | yes | no | RLS LINK GAP |
| `TenantFeatureOverride` | `tenant_feature_overrides` | yes | yes | STRUCTURAL LINK |
| `SaasTenantSetting` | `saas_tenant_settings` | yes | no | RLS LINK GAP |
| `SaasTenantDomain` | `saas_tenant_domains` | yes | no | RLS LINK GAP |
| `SaasAuditLog` | `saas_audit_logs` | yes | no | RLS LINK GAP |
| `ControlPlaneAuditLog` | `control_plane_audit_logs` | no | no | global/ownership review |
| `ControlPlaneApproval` | `control_plane_approvals` | no | no | global/ownership review |
| `ControlPlaneReviewTask` | `control_plane_review_tasks` | no | no | global/ownership review |
| `TenantConsent` | `tenant_consents` | yes | yes | STRUCTURAL LINK |
| `ImpersonationSession` | `impersonation_sessions` | yes | yes | STRUCTURAL LINK |
| `SaasWebhookEndpoint` | `saas_webhook_endpoints` | yes | no | RLS LINK GAP |
| `SaasWebhookDelivery` | `saas_webhook_deliveries` | yes | no | RLS LINK GAP |
| `SaasApiKey` | `saas_api_keys` | yes | no | RLS LINK GAP |
| `SaasApiKeyScope` | `saas_api_key_scopes` | yes | no | RLS LINK GAP |
| `SaasSupportTicket` | `saas_support_tickets` | yes | no | RLS LINK GAP |
| `SaasSupportTicketMessage` | `saas_support_ticket_messages` | yes | no | RLS LINK GAP |
| `SaasSupportTicketAttachment` | `saas_support_ticket_attachments` | yes | no | RLS LINK GAP |
| `SaasAnnouncement` | `saas_announcements` | yes | no | RLS LINK GAP |
| `SaasMaintenanceWindow` | `saas_maintenance_windows` | yes | no | RLS LINK GAP |
| `AgileSprint` | `agile_sprints` | yes | no | RLS LINK GAP |
| `AgileBacklogItem` | `agile_backlog_items` | yes | no | RLS LINK GAP |
| `AgileSprintItem` | `agile_sprint_items` | yes | no | RLS LINK GAP |
| `AgileRetrospective` | `agile_retrospectives` | yes | no | RLS LINK GAP |
| `SkillCatalog` | `skill_catalog` | yes | no | RLS LINK GAP |
| `EvmForecast` | `evm_forecasts` | yes | no | RLS LINK GAP |
| `EvmKpiTarget` | `evm_kpi_targets` | yes | no | RLS LINK GAP |
| `EvmSnapshot` | `evm_snapshots` | yes | no | RLS LINK GAP |
| `CapexProject` | `capex_projects` | yes | no | RLS LINK GAP |
| `CapexBudgetLine` | `capex_budget_lines` | yes | no | RLS LINK GAP |
| `CapexGateReview` | `capex_gate_reviews` | yes | no | RLS LINK GAP |
| `CapexCapitalization` | `capex_capitalizations` | yes | no | RLS LINK GAP |
| `VariationOrder` | `variation_orders` | yes | no | RLS LINK GAP |
| `ClaimDocument` | `claim_documents` | yes | no | RLS LINK GAP |
| `PmoScorecard` | `pmo_scorecards` | yes | no | RLS LINK GAP |
| `PmoScorecardDimension` | `pmo_scorecard_dimensions` | yes | no | RLS LINK GAP |
| `StageGate` | `stage_gates` | yes | no | RLS LINK GAP |
| `GateChecklist` | `gate_checklists` | yes | no | RLS LINK GAP |
| `DiscussionReply` | `discussion_replies` | yes | no | RLS LINK GAP |
| `DocumentReview` | `document_reviews` | yes | no | RLS LINK GAP |
| `ManufacturingRoute` | `manufacturing_routes` | yes | no | RLS LINK GAP |
| `ManufacturingRouteOperation` | `manufacturing_route_operations` | yes | no | RLS LINK GAP |
| `ManufacturingQualityCheckTemplate` | `manufacturing_quality_check_templates` | yes | no | RLS LINK GAP |
| `ManufacturingQualityCheck` | `manufacturing_quality_checks` | yes | no | RLS LINK GAP |
| `ManufacturingScrapRecord` | `manufacturing_scrap_records` | yes | no | RLS LINK GAP |
| `ManufacturingTimeEntry` | `manufacturing_time_entries` | yes | no | RLS LINK GAP |
| `SpcChart` | `spc_charts` | yes | no | RLS LINK GAP |
| `SpcSample` | `spc_samples` | yes | no | RLS LINK GAP |
| `FmeaWorksheet` | `fmea_worksheets` | yes | no | RLS LINK GAP |
| `FmeaItem` | `fmea_items` | yes | no | RLS LINK GAP |
| `ApqpProject` | `apqp_projects` | yes | no | RLS LINK GAP |
| `ApqpPhase` | `apqp_phases` | yes | no | RLS LINK GAP |
| `PpapSubmission` | `ppap_submissions` | yes | no | RLS LINK GAP |
| `ToolingMaster` | `tooling_masters` | yes | no | RLS LINK GAP |
| `ToolingCalibration` | `tooling_calibrations` | yes | no | RLS LINK GAP |
| `ToolingUsageLog` | `tooling_usage_logs` | yes | no | RLS LINK GAP |
| `GageRrStudy` | `gage_rr_studies` | yes | no | RLS LINK GAP |
| `GageRrSample` | `gage_rr_samples` | yes | no | RLS LINK GAP |
| `ApsSchedule` | `aps_schedules` | yes | no | RLS LINK GAP |
| `ApsJob` | `aps_jobs` | yes | no | RLS LINK GAP |
| `ApsConstraint` | `aps_constraints` | yes | no | RLS LINK GAP |
| `ApsSimulationScenario` | `aps_simulation_scenarios` | yes | no | RLS LINK GAP |
| `EnergyMeter` | `energy_meters` | yes | no | RLS LINK GAP |
| `EnergyReading` | `energy_readings` | yes | no | RLS LINK GAP |
| `EnergyKpiTarget` | `energy_kpi_targets` | yes | no | RLS LINK GAP |
| `EnergyCostAllocation` | `energy_cost_allocations` | yes | no | RLS LINK GAP |
| `KanbanBoard` | `kanban_boards` | yes | no | RLS LINK GAP |
| `KanbanCard` | `kanban_cards` | yes | no | RLS LINK GAP |
| `LeanImprovement` | `lean_improvements` | yes | no | RLS LINK GAP |
| `WasteLog` | `waste_logs` | yes | no | RLS LINK GAP |

