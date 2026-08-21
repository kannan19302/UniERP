# Tenant model to RLS migration linkage: prisma/schema/core-part-8.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `VmiAgreement` | `vmi_agreements` | yes | no | RLS LINK GAP |
| `VmiStockSnapshot` | `vmi_stock_snapshots` | yes | no | RLS LINK GAP |
| `VmiOrder` | `vmi_orders` | yes | no | RLS LINK GAP |
| `LotExpiryRecord` | `lot_expiry_records` | yes | no | RLS LINK GAP |
| `LotExpiryAlert` | `lot_expiry_alerts` | yes | no | RLS LINK GAP |
| `LotDisposalRecord` | `lot_disposal_records` | yes | no | RLS LINK GAP |
| `CrossDockStation` | `cross_dock_stations` | yes | no | RLS LINK GAP |
| `CrossDockOrder` | `cross_dock_orders` | yes | no | RLS LINK GAP |
| `CrossDockEvent` | `cross_dock_events` | yes | no | RLS LINK GAP |
| `PickTask` | `pick_tasks` | yes | no | RLS LINK GAP |
| `AsnDiscrepancy` | `asn_discrepancies` | yes | no | RLS LINK GAP |
| `ShipmentException` | `shipment_exceptions` | yes | no | RLS LINK GAP |
| `SupplierContract` | `supplier_contracts` | yes | no | RLS LINK GAP |
| `SupplierContractLineItem` | `supplier_contract_line_items` | yes | no | RLS LINK GAP |
| `SupplierPerformanceKpi` | `supplier_performance_kpis` | yes | no | RLS LINK GAP |
| `SupplierAssessment` | `supplier_assessments` | yes | no | RLS LINK GAP |
| `SupplyChainBudget` | `supply_chain_budgets` | yes | no | RLS LINK GAP |
| `SupplyChainBudgetLine` | `supply_chain_budget_lines` | yes | no | RLS LINK GAP |
| `ContainerTracking` | `container_tracking` | yes | no | RLS LINK GAP |
| `ContainerTrackingEvent` | `container_tracking_events` | yes | no | RLS LINK GAP |
| `CustomsDocument` | `customs_documents` | yes | no | RLS LINK GAP |
| `SupplierNonConformance` | `supplier_non_conformances` | yes | no | RLS LINK GAP |
| `LaneRate` | `lane_rates` | yes | no | RLS LINK GAP |
| `SupplierCertification` | `supplier_certifications` | yes | no | RLS LINK GAP |
| `BlockchainTransaction` | `blockchain_transactions` | yes | no | RLS LINK GAP |
| `BlockchainVerification` | `blockchain_verifications` | yes | no | RLS LINK GAP |
| `BlockchainSyncCheckpoint` | `blockchain_sync_checkpoints` | no | no | global/ownership review |
| `BlockchainSmartContract` | `blockchain_smart_contracts` | yes | no | RLS LINK GAP |
| `BlockchainAuditTrail` | `blockchain_audit_trails` | yes | no | RLS LINK GAP |
| `BlockchainNetworkHealth` | `blockchain_network_health` | no | no | global/ownership review |
| `BlockchainTransactionExplorer` | `blockchain_transaction_explorers` | yes | no | RLS LINK GAP |
| `OutboxEvent` | `outbox_events` | yes | no | RLS LINK GAP |
| `OutboxDelivery` | `outbox_deliveries` | yes | no | RLS LINK GAP |
| `OutboxConsumerReceipt` | `outbox_consumer_receipts` | yes | no | RLS LINK GAP |
| `DocumentSequence` | `document_sequences` | yes | no | RLS LINK GAP |
| `KnowledgeBaseCategory` | `knowledge_base_categories` | yes | no | RLS LINK GAP |
| `KnowledgeBaseArticle` | `knowledge_base_articles` | yes | no | RLS LINK GAP |
| `KnowledgeBaseArticleVersion` | `knowledge_base_article_versions` | yes | no | RLS LINK GAP |
| `WinLossReason` | `win_loss_reasons` | yes | no | RLS LINK GAP |
| `Competitor` | `competitors` | yes | no | RLS LINK GAP |
| `SalesPartnerDealRegistration` | `sales_partner_deal_registrations` | yes | no | RLS LINK GAP |
| `SalesPartnerMdfFund` | `sales_partner_mdf_funds` | yes | no | RLS LINK GAP |
| `CustomerPriceList` | `customer_price_lists` | yes | no | RLS LINK GAP |
| `CustomerPriceListItem` | `customer_price_list_items` | yes | no | RLS LINK GAP |
| `FloorPriceOverride` | `floor_price_overrides` | yes | no | RLS LINK GAP |
| `CrossSellRule` | `cross_sell_rules` | yes | no | RLS LINK GAP |
| `UpsellRule` | `upsell_rules` | yes | no | RLS LINK GAP |
| `TeamSplit` | `team_splits` | yes | no | RLS LINK GAP |
| `TeamSplitMember` | `team_split_members` | yes | no | RLS LINK GAP |
| `SalesTerritoryForecast` | `sales_territory_forecasts` | yes | no | RLS LINK GAP |
| `SalesTerritoryRealignment` | `sales_territory_realignments` | yes | no | RLS LINK GAP |
| `CommunicationChannel` | `communication_channels` | yes | no | RLS LINK GAP |
| `CommunicationTemplate` | `communication_templates` | yes | no | RLS LINK GAP |
| `CommunicationLog` | `communication_logs` | yes | no | RLS LINK GAP |
| `ContractAmendment` | `crm_contract_amendments` | yes | no | RLS LINK GAP |
| `ContractPriceEscalationRule` | `crm_contract_price_escalation_rules` | yes | no | RLS LINK GAP |
| `ContractAutoRenewalLog` | `crm_contract_auto_renewal_logs` | yes | no | RLS LINK GAP |
| `ContractExpirationPipelineItem` | `crm_contract_expiration_pipeline_items` | yes | no | RLS LINK GAP |
| `ContractTemplate` | `crm_contract_templates` | yes | no | RLS LINK GAP |
| `ContractClause` | `crm_contract_clauses` | yes | no | RLS LINK GAP |
| `PerformanceObligation` | `performance_obligations` | yes | no | RLS LINK GAP |
| `Asc606ContractModification` | `asc606_contract_modifications` | yes | no | RLS LINK GAP |
| `Asc606DeferredRevenueRollForward` | `asc606_deferred_revenue_roll_forwards` | yes | no | RLS LINK GAP |
| `TransferPricingPolicy` | `transfer_pricing_policies` | yes | no | RLS LINK GAP |
| `TransferPricingAdjustment` | `transfer_pricing_adjustments` | yes | no | RLS LINK GAP |
| `ApportionmentFactor` | `apportionment_factors` | yes | no | RLS LINK GAP |
| `FairValueMeasurement` | `fair_value_measurements` | yes | no | RLS LINK GAP |
| `ExpectedCreditLossProvision` | `expected_credit_loss_provisions` | yes | no | RLS LINK GAP |
| `BudgetTemplate` | `budget_templates` | yes | no | RLS LINK GAP |
| `BudgetCommitment` | `budget_commitments` | yes | no | RLS LINK GAP |
| `BudgetCarryForwardRule` | `budget_carry_forward_rules` | yes | no | RLS LINK GAP |
| `BudgetRevision` | `budget_revisions` | yes | no | RLS LINK GAP |
| `NettingGroup` | `netting_groups` | yes | no | RLS LINK GAP |
| `NettingGroupMember` | `netting_group_members` | yes | no | RLS LINK GAP |
| `NettingRun` | `netting_runs` | yes | no | RLS LINK GAP |
| `NettingRunDetail` | `netting_run_details` | yes | no | RLS LINK GAP |
| `SettlementInstruction` | `settlement_instructions` | yes | no | RLS LINK GAP |
| `CustomerPortalMessage` | `customer_portal_messages` | yes | no | RLS LINK GAP |
| `PortalDocumentAccess` | `portal_document_access` | yes | no | RLS LINK GAP |
| `PortalActivityLog` | `portal_activity_logs` | yes | no | RLS LINK GAP |
| `CampaignWorkflow` | `campaign_workflows` | yes | no | RLS LINK GAP |
| `CampaignWorkflowStep` | `campaign_workflow_steps` | yes | no | RLS LINK GAP |
| `CampaignWorkflowStat` | `campaign_workflow_stats` | yes | no | RLS LINK GAP |
| `ABTestCampaign` | `ab_test_campaigns` | yes | no | RLS LINK GAP |
| `ABTestResult` | `ab_test_results` | yes | no | RLS LINK GAP |
| `CampaignROI` | `campaign_rois` | yes | no | RLS LINK GAP |
| `RenewalRiskPrediction` | `renewal_risk_predictions` | yes | no | RLS LINK GAP |
| `ChurnAnalysis` | `churn_analyses` | yes | no | RLS LINK GAP |
| `ExpansionRevenue` | `expansion_revenues` | yes | no | RLS LINK GAP |

