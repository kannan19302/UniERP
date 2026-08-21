# Models in prisma/schema/core-part-11.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `ValueStreamMapItem` | yes | no | 4 | 0 | 2 | tenant signal |
| `TpmPillar` | yes | no | 2 | 0 | 2 | tenant signal |
| `TpmPillarActivity` | yes | no | 1 | 0 | 2 | tenant signal |
| `TpmAudit5S` | yes | no | 0 | 0 | 2 | tenant signal |
| `TpmKpi` | yes | no | 2 | 0 | 3 | tenant signal |
| `ContractManufacturer` | yes | no | 1 | 0 | 2 | tenant signal |
| `OutsourcingPurchaseOrder` | yes | no | 1 | 0 | 3 | tenant signal |
| `OutsourcingPoItem` | yes | no | 4 | 0 | 3 | tenant signal |
| `SubcontractedReceipt` | yes | no | 0 | 0 | 4 | tenant signal |
| `DdmrpPart` | yes | no | 0 | 0 | 2 | tenant signal |
| `DdmrpBuffer` | yes | no | 11 | 0 | 2 | tenant signal |
| `DdmrpNetFlowStatus` | yes | no | 7 | 0 | 2 | tenant signal |
| `DdmrpRecommendation` | yes | no | 1 | 0 | 3 | tenant signal |
| `AnalyticsReportFilter` | yes | no | 0 | 0 | 2 | tenant signal |
| `AnalyticsDashboardWidget` | yes | no | 0 | 0 | 2 | tenant signal |
| `AnalyticsKpiValue` | yes | no | 1 | 0 | 3 | tenant signal |
| `AnalyticsScheduledExport` | yes | no | 0 | 0 | 2 | tenant signal |
| `FormTemplate` | yes | no | 0 | 0 | 2 | tenant signal |
| `FormField` | yes | no | 0 | 0 | 2 | tenant signal |
| `FormSubmission` | yes | no | 0 | 0 | 2 | tenant signal |
| `FormAnalytic` | yes | no | 0 | 1 | 2 | tenant signal; Float review |
| `PageTemplate` | yes | no | 0 | 0 | 2 | tenant signal |
| `PageSection` | yes | no | 0 | 0 | 2 | tenant signal |
| `WorkflowDefinition` | yes | no | 0 | 0 | 2 | tenant signal |
| `WorkflowDefinitionStep` | yes | no | 0 | 0 | 2 | tenant signal |
| `WorkflowExecution` | yes | no | 0 | 0 | 2 | tenant signal |
| `WorkflowTransition` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowTask` | yes | no | 0 | 0 | 3 | tenant signal |
| `WorkflowSlaRule` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowEscalationRule` | yes | no | 0 | 0 | 1 | tenant signal |
| `WorkflowAuditLog` | yes | no | 0 | 0 | 2 | tenant signal |
| `AiModel` | yes | no | 0 | 0 | 2 | tenant signal |
| `AiModelDeployment` | yes | no | 0 | 0 | 2 | tenant signal |
| `AiPrompt` | yes | no | 0 | 0 | 2 | tenant signal |
| `AiConversation` | yes | no | 0 | 0 | 2 | tenant signal |
| `AiConversationMessage` | yes | no | 0 | 0 | 2 | tenant signal |
| `AiDocument` | yes | no | 0 | 0 | 1 | tenant signal |
| `AiDocumentChunk` | yes | no | 0 | 0 | 2 | tenant signal |
| `AiEmbedding` | yes | no | 0 | 0 | 2 | tenant signal |
| `AiAgent` | yes | no | 0 | 0 | 2 | tenant signal |
| `AiAgentTool` | yes | no | 0 | 0 | 2 | tenant signal |
| `AiTrainingJob` | yes | no | 0 | 1 | 1 | tenant signal; Float review |
| `AiTrainingRun` | yes | no | 0 | 2 | 2 | tenant signal; Float review |
| `AiIntentTrainingExample` | yes | no | 0 | 1 | 2 | tenant signal; Float review |
| `AiNluEntity` | yes | no | 0 | 0 | 2 | tenant signal |
| `AiModelAccuracyMetric` | yes | no | 0 | 1 | 2 | tenant signal; Float review |
| `AnalyticsKpiDefinition` | yes | no | 0 | 1 | 3 | tenant signal; Float review |
| `AnalyticsTrendResult` | yes | no | 0 | 3 | 4 | tenant signal; Float review |
| `AnalyticsCrossFilterDashboard` | yes | no | 0 | 0 | 1 | tenant signal |
| `AnalyticsBiMetricDefinition` | yes | no | 0 | 0 | 3 | tenant signal |
| `ChatRoom` | yes | no | 0 | 0 | 2 | tenant signal |
| `ChatRoomMember` | yes | no | 0 | 0 | 3 | tenant signal |
| `ChatMessage` | yes | no | 0 | 0 | 3 | tenant signal |
| `ChatMessageReaction` | yes | no | 0 | 0 | 2 | tenant signal |
| `MessageReadReceipt` | yes | no | 0 | 0 | 3 | tenant signal |
| `VideoCallRoom` | yes | no | 0 | 0 | 1 | tenant signal |
| `VideoCallParticipant` | yes | no | 0 | 0 | 2 | tenant signal |
| `CommunicationFileShare` | yes | no | 0 | 0 | 2 | tenant signal |
| `Announcement` | yes | no | 0 | 0 | 1 | tenant signal |
| `AnnouncementTarget` | yes | no | 0 | 0 | 2 | tenant signal |
| `DriveFolder` | yes | yes | 0 | 0 | 4 | tenant signal |
| `DriveFolderPermission` | yes | no | 0 | 0 | 3 | tenant signal |
| `DriveFile` | yes | yes | 0 | 0 | 4 | tenant signal |
| `DriveFileVersion` | yes | no | 0 | 0 | 2 | tenant signal |
| `DriveFileComment` | yes | no | 0 | 0 | 3 | tenant signal |
| `DriveShareLink` | yes | no | 0 | 0 | 3 | tenant signal |
| `DriveStorageQuota` | yes | no | 0 | 0 | 0 | tenant signal |
| `DriveActivity` | yes | no | 0 | 0 | 3 | tenant signal |
| `DriveFolderShare` | yes | no | 0 | 0 | 3 | tenant signal |
| `DriveFileTag` | yes | no | 0 | 0 | 1 | tenant signal |
| `DriveFileTagMapping` | no | no | 0 | 0 | 3 | ownership review |
| `DriveTrashItem` | yes | yes | 0 | 0 | 2 | tenant signal |
| `DynamicDiscountOffer` | yes | no | 2 | 0 | 2 | tenant signal |
| `SupplyChainFinanceProgram` | yes | no | 3 | 0 | 2 | tenant signal |
| `CloseTaskDependency` | yes | no | 0 | 0 | 2 | tenant signal |
| `CloseTaskSla` | yes | no | 0 | 0 | 2 | tenant signal |
| `CloseCalendarEvent` | yes | no | 0 | 0 | 2 | tenant signal |
| `CloseEscalationRule` | yes | no | 0 | 0 | 1 | tenant signal |
| `CloseAnalyticsSnapshot` | yes | no | 2 | 0 | 1 | tenant signal |
| `ConsolidationGroup` | yes | no | 1 | 0 | 1 | tenant signal |
| `ConsolidationGroupMember` | yes | no | 1 | 0 | 1 | tenant signal |
| `ConsolidationExecution` | yes | no | 4 | 0 | 2 | tenant signal |
| `ConsolidationEliminationRule` | yes | no | 1 | 0 | 1 | tenant signal |
| `ConsolidationEliminationEntry` | yes | no | 1 | 0 | 1 | tenant signal |
| `ConsolidationTranslationAdjustment` | yes | no | 4 | 0 | 1 | tenant signal |
| `MinorityInterestSchedule` | yes | no | 5 | 0 | 1 | tenant signal |
| `CustomerCreditScorecard` | yes | no | 5 | 0 | 1 | tenant signal |
| `CustomerCreditScore` | yes | no | 6 | 0 | 2 | tenant signal |
| `VendorRiskAssessment` | yes | no | 1 | 0 | 2 | tenant signal |
| `MarketRiskExposure` | yes | no | 2 | 0 | 1 | tenant signal |
| `OperationalRiskEvent` | yes | no | 2 | 0 | 2 | tenant signal |
| `RiskControlMeasure` | yes | no | 0 | 0 | 1 | tenant signal |
| `EmissionSourceRecord` | yes | no | 3 | 0 | 2 | tenant signal |
| `EmissionOffsetCredit` | yes | no | 3 | 0 | 1 | tenant signal |
| `EsgKpiDefinition` | yes | no | 0 | 0 | 2 | tenant signal |
| `EsgKpiActualValue` | yes | no | 4 | 0 | 1 | tenant signal |
| `EsgReportTemplate` | yes | no | 0 | 0 | 1 | tenant signal |
| `EsgDisclosureMapping` | yes | no | 0 | 0 | 1 | tenant signal |
| `SustainabilityTarget` | yes | no | 4 | 0 | 1 | tenant signal |
| `TaxProvisionRun` | yes | no | 6 | 0 | 1 | tenant signal |
| `TaxProvisionDetail` | yes | no | 7 | 0 | 1 | tenant signal |
| `DeferredTaxSchedule` | yes | no | 4 | 0 | 1 | tenant signal |
| `UncertainTaxPosition` | yes | no | 4 | 0 | 1 | tenant signal |
| `ValuationAllowanceAssessment` | yes | no | 1 | 0 | 1 | tenant signal |
| `ApprovalRoutingRule` | yes | no | 0 | 0 | 1 | tenant signal |
| `AiForecastScenario` | yes | no | 1 | 0 | 1 | tenant signal |
| `AiForecastScenarioLine` | yes | no | 5 | 0 | 1 | tenant signal |
| `AnomalyDetectionRun` | yes | no | 1 | 0 | 1 | tenant signal |

