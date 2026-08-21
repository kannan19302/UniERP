# Models in prisma/schema/core-part-12.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `AnomalyDetectionResult` | yes | no | 1 | 0 | 3 | tenant signal |
| `SmartGlCodingSuggestion` | yes | no | 1 | 0 | 2 | tenant signal |
| `PricingRule` | yes | no | 0 | 0 | 1 | tenant signal |
| `QuoteVersion` | yes | no | 3 | 0 | 2 | tenant signal |
| `QuoteMargin` | yes | no | 4 | 0 | 2 | tenant signal |
| `DiscountApprovalMatrix` | yes | no | 4 | 0 | 1 | tenant signal |
| `TerritoryPlan` | yes | yes | 0 | 0 | 1 | tenant signal |
| `TerritoryPlanAssignment` | yes | no | 1 | 0 | 3 | tenant signal |
| `TerritoryRebalanceLog` | yes | no | 0 | 0 | 2 | tenant signal |
| `NamedAccount` | yes | yes | 1 | 0 | 2 | tenant signal |
| `ReportCategory` | yes | no | 0 | 0 | 1 | tenant signal |
| `SystemReport` | yes | no | 0 | 0 | 2 | tenant signal |
| `ContractTemplateCategory` | yes | yes | 0 | 0 | 2 | tenant signal |
| `ContractVersion` | yes | no | 0 | 0 | 3 | tenant signal |
| `ContractObligation` | yes | yes | 0 | 0 | 2 | tenant signal |
| `ContractComplianceStatus` | yes | no | 0 | 0 | 2 | tenant signal |
| `SocialMediaPost` | yes | yes | 0 | 0 | 2 | tenant signal |
| `CommunicationOptOut` | yes | no | 0 | 0 | 2 | tenant signal |
| `CommunicationPreference` | yes | no | 0 | 0 | 2 | tenant signal |
| `ShipmentEmissions` | yes | no | 5 | 0 | 2 | tenant signal |
| `CarbonOffset` | yes | no | 2 | 0 | 2 | tenant signal |
| `SupplierDocument` | yes | no | 0 | 0 | 2 | tenant signal |
| `PoCollaboration` | yes | no | 0 | 0 | 3 | tenant signal |
| `LetterOfCredit` | yes | no | 1 | 0 | 2 | tenant signal |
| `LcDocument` | yes | no | 0 | 0 | 1 | tenant signal |
| `LcAmendment` | yes | no | 0 | 0 | 1 | tenant signal |
| `LcPresentation` | yes | no | 2 | 0 | 1 | tenant signal |
| `BankGuarantee` | yes | no | 2 | 0 | 1 | tenant signal |
| `SopCycle` | yes | no | 0 | 0 | 1 | tenant signal |
| `SopDemandPlan` | yes | no | 1 | 6 | 1 | tenant signal; Float review |
| `SopSupplyPlan` | yes | no | 1 | 5 | 1 | tenant signal; Float review |
| `SopConsensusPlan` | yes | no | 2 | 1 | 1 | tenant signal; Float review |
| `LogisticsProvider` | yes | no | 1 | 1 | 1 | tenant signal; Float review |
| `LogisticsProviderInvoice` | yes | no | 1 | 0 | 1 | tenant signal |
| `LogisticsProviderPerformance` | yes | no | 1 | 7 | 1 | tenant signal; Float review |
| `ColdChainShipment` | yes | no | 0 | 3 | 1 | tenant signal; Float review |
| `ColdChainTemperatureLog` | yes | no | 0 | 2 | 1 | tenant signal; Float review |
| `ColdChainExcursion` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `ScemAlert` | yes | no | 0 | 0 | 2 | tenant signal |
| `ScemAlertRule` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `SupplyChainRiskEvent` | yes | no | 0 | 3 | 2 | tenant signal; Float review |
| `ScmRiskMitigation` | yes | no | 1 | 0 | 1 | tenant signal |
| `TradeComplianceCheck` | yes | no | 0 | 1 | 2 | tenant signal; Float review |
| `DeniedPartyEntry` | yes | no | 0 | 0 | 1 | tenant signal |
| `ExportLicense` | yes | no | 2 | 0 | 1 | tenant signal |
| `HsCodeClassification` | yes | no | 2 | 0 | 2 | tenant signal |
| `MultiModalTransportOrder` | yes | no | 1 | 2 | 2 | tenant signal; Float review |
| `MultiModalTransportLeg` | yes | no | 1 | 0 | 1 | tenant signal |
| `MultiModalTransportEvent` | yes | no | 0 | 0 | 1 | tenant signal |
| `ReverseLogisticsOrder` | yes | no | 1 | 0 | 2 | tenant signal |
| `ReverseLogisticsItem` | yes | no | 2 | 2 | 1 | tenant signal; Float review |
| `DeliveryZone` | yes | no | 2 | 1 | 1 | tenant signal; Float review |
| `DeliveryTimeSlot` | yes | no | 0 | 0 | 1 | tenant signal |
| `LastMileDelivery` | yes | no | 0 | 1 | 2 | tenant signal; Float review |
| `ScmIotDevice` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `ScmIotReading` | yes | no | 1 | 0 | 1 | tenant signal |
| `SmartReplenishmentOrder` | yes | no | 0 | 3 | 1 | tenant signal; Float review |
| `DynamicDiscountRequest` | yes | no | 4 | 0 | 1 | tenant signal |
| `ScmFinancingFacility` | yes | no | 3 | 0 | 1 | tenant signal |
| `ScmFinancingDrawdown` | yes | no | 2 | 0 | 1 | tenant signal |
| `SupplierDevelopmentPlan` | yes | no | 1 | 1 | 1 | tenant signal; Float review |
| `SupplierDevMilestone` | yes | no | 0 | 0 | 1 | tenant signal |
| `SupplierDevSurvey` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `PortTerminal` | yes | no | 0 | 2 | 1 | tenant signal; Float review |
| `BerthSlot` | yes | no | 0 | 0 | 1 | tenant signal |
| `ScmKpiSnapshot` | yes | no | 0 | 12 | 1 | tenant signal; Float review |
| `SupplierPortalSession` | yes | no | 0 | 0 | 1 | tenant signal |
| `SupplierAnnouncement` | yes | no | 0 | 0 | 1 | tenant signal |
| `MasterProductionSchedule` | yes | no | 0 | 0 | 1 | tenant signal |
| `MpsEntry` | yes | no | 0 | 6 | 1 | tenant signal; Float review |
| `FmeaRecord` | yes | no | 0 | 0 | 1 | tenant signal |
| `FmeaMode` | yes | no | 0 | 0 | 1 | tenant signal |
| `AqlSamplingPlan` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `JobCostSheet` | yes | no | 10 | 1 | 2 | tenant signal; Float review |
| `StandardCost` | yes | no | 4 | 0 | 1 | tenant signal |
| `FormulaIngredient` | yes | no | 0 | 2 | 1 | tenant signal; Float review |
| `CoProduct` | yes | no | 1 | 1 | 1 | tenant signal; Float review |
| `ManufacturingMachine` | yes | no | 1 | 4 | 1 | tenant signal; Float review |
| `MachineOeeRecord` | yes | no | 0 | 11 | 1 | tenant signal; Float review |
| `MachineMaintenanceLog` | yes | no | 1 | 1 | 1 | tenant signal; Float review |
| `MachineDowntime` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `MaintenanceSchedule` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `SparePart` | yes | no | 1 | 2 | 1 | tenant signal; Float review |
| `SixSigmaProject` | yes | no | 2 | 0 | 1 | tenant signal |
| `SixSigmaMetric` | yes | no | 0 | 3 | 1 | tenant signal; Float review |
| `SixSigmaTool` | yes | no | 0 | 0 | 1 | tenant signal |
| `ShopFloorTransaction` | yes | no | 0 | 3 | 2 | tenant signal; Float review |
| `QualityStandard` | yes | no | 0 | 0 | 1 | tenant signal |
| `ComplianceAudit` | yes | no | 0 | 0 | 1 | tenant signal |
| `GmpBatchRecord` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `HacppPlan` | yes | no | 0 | 0 | 1 | tenant signal |
| `PpmPortfolio` | yes | no | 1 | 0 | 1 | tenant signal |
| `PpmPortfolioProject` | yes | no | 0 | 2 | 1 | tenant signal; Float review |
| `PpmRiskRegister` | yes | no | 0 | 4 | 1 | tenant signal; Float review |
| `PpmRaidLog` | yes | no | 0 | 0 | 1 | tenant signal |
| `EvmBaseline` | yes | no | 1 | 0 | 1 | tenant signal |
| `EvmMeasurement` | yes | no | 4 | 7 | 1 | tenant signal; Float review |
| `PpmKanbanBoard` | yes | no | 0 | 0 | 1 | tenant signal |
| `PpmKanbanColumn` | yes | no | 0 | 0 | 1 | tenant signal |
| `PpmKanbanCard` | yes | no | 0 | 2 | 1 | tenant signal; Float review |
| `PpmChangeRequest` | yes | no | 1 | 0 | 1 | tenant signal |
| `PpmProcurementPlan` | yes | no | 1 | 0 | 1 | tenant signal |
| `PpmProcurementRequisition` | yes | no | 1 | 1 | 1 | tenant signal; Float review |
| `PpmClientPortal` | yes | no | 0 | 0 | 1 | tenant signal |
| `PpmClientApproval` | yes | no | 0 | 0 | 1 | tenant signal |
| `PpmTimesheet` | yes | no | 0 | 2 | 1 | tenant signal; Float review |
| `PpmTimesheetEntry` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `PpmQualityPlan` | yes | no | 0 | 0 | 1 | tenant signal |
| `PpmQualityInspection` | yes | no | 0 | 0 | 1 | tenant signal |
| `PpmDocument` | yes | no | 0 | 0 | 1 | tenant signal |
| `PpmDocumentVersion` | yes | no | 0 | 0 | 1 | tenant signal |
| `SubcontractorDeliverable` | yes | no | 0 | 0 | 1 | tenant signal |
| `SubcontractorPaymentMilestone` | yes | no | 1 | 0 | 1 | tenant signal |

