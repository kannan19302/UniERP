# AST controller summary: api/modules/crm

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `crm-abm-orchestration.controller.ts` | `"crm/abm-orchestration"` | 9 | 9 | 0 | 0 | 0 | 15/15 | no | `AuthenticatedRequest` |
| `crm-account-hierarchies-deep.controller.ts` | `"crm/account-hierarchies-deep"` | 4 | 4 | 0 | 0 | 0 | 8/8 | no | `AuthenticatedRequest` |
| `crm-account-intelligence-deep.controller.ts` | `"crm/account-intelligence-deep"` | 26 | 26 | 0 | 0 | 0 | 29/29 | no | `AuthenticatedRequest` |
| `crm-activity-capture.controller.ts` | `"crm/activity-capture"` | 16 | 16 | 0 | 0 | 0 | 30/30 | no | `AuthenticatedRequest` |
| `crm-ai-drafting.controller.ts` | `"crm/ai-drafting"` | 9 | 9 | 0 | 0 | 0 | 24/24 | no | `AuthenticatedRequest`, `UpdateDraftInput` |
| `crm-ai-intelligence.controller.ts` | `"crm/ai-intelligence"` | 4 | 4 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-cadences.controller.ts` | `"crm/cadences"` | 10 | 10 | 0 | 0 | 0 | 21/21 | no | `AuthenticatedRequest`, `CompleteStepTaskInput`, `CreateAutoEnrollRuleInput`, `CreateCadenceInput`, `UpdateAutoEnrollRuleInput` |
| `crm-coaching-deep.controller.ts` | `"crm/coaching-deep"` | 4 | 4 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-coaching.controller.ts` | `"crm/coaching"` | 13 | 13 | 0 | 0 | 0 | 26/26 | no | `AuthenticatedRequest`, `CreateLibraryItemInput`, `CreateRubricInput`, `CreateScorecardInput`, `UpdateRubricInput` |
| `crm-commission-automation.controller.ts` | `"crm/commission-plans"` | 16 | 16 | 0 | 0 | 0 | 35/35 | no | `AuthenticatedRequest`, `CalculatePayoutsInput`, `CreatePlanInput`, `CreateSpiffInput`, `CreateTierInput`, `UpdatePlanInput`, `UpdateSpiffInput` |
| `crm-communication-deep.controller.ts` | `"crm/communication-deep"` | 5 | 5 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-communication.controller.ts` | `"crm/communication"` | 5 | 5 | 0 | 0 | 0 | 10/10 | no | `AuthenticatedRequest` |
| `crm-communication.controller.ts` | `"crm/communication"` | 6 | 6 | 0 | 0 | 0 | 14/14 | no | `AuthenticatedRequest` |
| `crm-communication.controller.ts` | `"crm/communication"` | 2 | 2 | 0 | 0 | 0 | 6/6 | no | `AuthenticatedRequest` |
| `crm-competitor-intelligence.controller.ts` | `"crm/competitor-intelligence"` | 4 | 4 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-content-management.controller.ts` | `"crm/content-management"` | 5 | 5 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-contract-deep.controller.ts` | `"crm/contract-deep"` | 5 | 5 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-contract-lifecycle.controller.ts` | `"crm/contract-lifecycle"` | 9 | 9 | 0 | 0 | 0 | 20/20 | no | `AuthRequest` |
| `crm-contract-lifecycle.controller.ts` | `"crm/contract-lifecycle"` | 7 | 7 | 0 | 0 | 0 | 16/16 | no | `AuthRequest` |
| `crm-contract-lifecycle.controller.ts` | `"crm/contract-lifecycle"` | 5 | 5 | 0 | 0 | 0 | 11/11 | no | `AuthRequest` |
| `crm-contract-lifecycle.controller.ts` | `"crm/contract-lifecycle"` | 6 | 6 | 0 | 0 | 0 | 13/13 | no | `AuthRequest` |
| `crm-contract-lifecycle.controller.ts` | `"crm/contract-lifecycle"` | 6 | 6 | 0 | 0 | 0 | 14/14 | no | `AuthRequest` |
| `crm-contract-lifecycle.controller.ts` | `"crm/contract-lifecycle"` | 5 | 5 | 0 | 0 | 0 | 11/11 | no | `AuthRequest` |
| `crm-contract-lifecycle.controller.ts` | `"crm/contract-lifecycle"` | 2 | 2 | 0 | 0 | 0 | 2/2 | no | `AuthRequest` |
| `crm-contracts.controller.ts` | `"crm/contracts"` | 19 | 19 | 0 | 0 | 0 | 51/51 | no | `AuthenticatedRequest`, `ContractStatusInput`, `CreateContractInput`, `InviteSignInput`, `RenewContractInput`, `UpdateContractInput` |
| `crm-conversation-intelligence.controller.ts` | `"crm/conversation-intelligence"` | 5 | 5 | 0 | 0 | 0 | 12/12 | no | `AuthenticatedRequest`, `LogCallInput` |
| `crm-conversion-analytics.controller.ts` | `"crm/conversion-analytics"` | 5 | 5 | 0 | 0 | 0 | 14/14 | no | `AuthenticatedRequest` |
| `crm-cpq.controller.ts` | `"crm/cpq"` | 5 | 5 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-customer-experience-deep.controller.ts` | `"crm/customer-experience-deep"` | 16 | 16 | 0 | 0 | 0 | 16/16 | no | `AuthenticatedRequest` |
| `crm-customer-journey.controller.ts` | `"crm/customer-journey"` | 4 | 4 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-customer-lifecycle-deep.controller.ts` | `"crm/customer-lifecycle-deep"` | 22 | 22 | 0 | 0 | 0 | 22/22 | no | `AuthenticatedRequest` |
| `crm-customer-success-deep.controller.ts` | `"crm/customer-success-deep"` | 13 | 13 | 0 | 0 | 0 | 30/30 | no | `AuthenticatedRequest` |
| `crm-data-management.controller.ts` | `"crm/data-management"` | 4 | 4 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-deal-analytics-deep.controller.ts` | `"crm/deal-analytics-deep"` | 35 | 35 | 0 | 0 | 0 | 35/35 | no | `AuthenticatedRequest` |
| `crm-deal-desk.controller.ts` | `"crm/deal-desk"` | 7 | 7 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-deal-room.controller.ts` | `"crm/deal-rooms"` | 12 | 12 | 0 | 0 | 0 | 27/27 | no | `AuthenticatedRequest`, `CreateDealRoomInput`, `CreateDocumentInput`, `CreateMilestoneInput`, `CreateStakeholderInput`, `UpdateMilestoneInput` |
| `crm-deal-room.controller.ts` | `"public/deal-rooms"` | 3 | 3 | 0 | 0 | 0 | 5/5 | no | — |
| `crm-deep-expansion-v2.controller.ts` | `"crm/relationships-deep"` | 21 | 21 | 0 | 0 | 0 | 21/21 | no | `AuthenticatedRequest` |
| `crm-deep-expansion-v2.controller.ts` | `"crm/pipeline-ops"` | 16 | 16 | 0 | 0 | 0 | 16/16 | no | `AuthenticatedRequest` |
| `crm-deep-expansion-v2.controller.ts` | `"crm/sales-forecasting-deep"` | 17 | 17 | 0 | 0 | 0 | 17/17 | no | `AuthenticatedRequest` |
| `crm-deep-expansion-v2.controller.ts` | `"crm/sales-analytics-expansion"` | 16 | 16 | 0 | 0 | 0 | 16/16 | no | `AuthenticatedRequest` |
| `crm-duplicates.controller.ts` | `"crm"` | 11 | 11 | 0 | 0 | 0 | 22/22 | no | `AuthenticatedRequest`, `CreateDuplicateRuleInput`, `FindDuplicatesInput`, `MergePairInput`, `UpdateDuplicateRuleInput` |
| `crm-enterprise.controller.ts` | `"crm/enterprise"` | 11 | 11 | 0 | 0 | 0 | 24/24 | no | — |
| `crm-expansion-deep.controller.ts` | `"crm"` | 82 | 82 | 0 | 0 | 0 | 165/165 | no | `AuthRequest` |
| `crm-expansion-v1.controller.ts` | `"crm/expansion-v1"` | 31 | 31 | 0 | 0 | 0 | 53/53 | no | `Request` |
| `crm-expansion.controller.ts` | `"crm/expansion"` | 38 | 38 | 0 | 0 | 0 | 70/70 | no | `AddDealTeamMemberInput`, `AssignContactRoleInput`, `AuthenticatedRequest`, `CreateAccountPlanInput`, `CreateForecastSnapshotInput`, `CreateQuotaInput`, `LogCustomerHealthInput`, `MergeAccountsInput` |
| `crm-forecast-governance.controller.ts` | `"crm/forecast-governance"` | 4 | 4 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-gamification-deep.controller.ts` | `"crm/gamification-deep"` | 7 | 7 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-gamification.controller.ts` | `"crm/gamification"` | 12 | 12 | 0 | 0 | 0 | 20/20 | no | `AuthenticatedRequest`, `CreateBadgeInput`, `UpdateBadgeInput` |
| `crm-guided-selling.controller.ts` | `"crm/guided-selling"` | 6 | 6 | 0 | 0 | 0 | 14/14 | no | `AuthRequest` |
| `crm-guided-selling.controller.ts` | `"crm/guided-selling"` | 7 | 7 | 0 | 0 | 0 | 16/16 | no | `AuthRequest` |
| `crm-guided-selling.controller.ts` | `"crm/guided-selling"` | 6 | 6 | 0 | 0 | 0 | 15/15 | no | `AuthRequest` |
| `crm-guided-selling.controller.ts` | `"crm/guided-selling"` | 3 | 3 | 0 | 0 | 0 | 6/6 | no | `AuthRequest` |
| `crm-guided-selling.controller.ts` | `"crm/guided-selling"` | 2 | 2 | 0 | 0 | 0 | 2/2 | no | `AuthRequest` |
| `crm-integration-deep.controller.ts` | `"crm/integration-deep"` | 21 | 21 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-intelligence.controller.ts` | `"crm"` | 19 | 19 | 0 | 0 | 0 | 37/37 | no | `AuthenticatedRequest`, `RegisterPartnerLeadInput` |
| `crm-knowledge-base.controller.ts` | `"crm/knowledge-base"` | 5 | 5 | 0 | 0 | 0 | 10/10 | no | `AuthenticatedRequest` |
| `crm-knowledge-base.controller.ts` | `"crm/knowledge-base"` | 10 | 10 | 0 | 0 | 0 | 27/27 | no | `AuthenticatedRequest` |
| `crm-lead-enrichment.controller.ts` | `"crm/lead-enrichment"` | 7 | 7 | 0 | 0 | 0 | 14/14 | no | `AuthRequest` |
| `crm-lead-enrichment.controller.ts` | `"crm/lead-enrichment"` | 6 | 6 | 0 | 0 | 0 | 13/13 | no | `AuthRequest` |
| `crm-lead-enrichment.controller.ts` | `"crm/lead-enrichment"` | 4 | 4 | 0 | 0 | 0 | 10/10 | no | `AuthRequest` |
| `crm-lead-enrichment.controller.ts` | `"crm/lead-enrichment"` | 5 | 5 | 0 | 0 | 0 | 13/13 | no | `AuthRequest` |
| `crm-lead-enrichment.controller.ts` | `"crm/lead-enrichment"` | 6 | 6 | 0 | 0 | 0 | 12/12 | no | `AuthRequest` |
| `crm-lead-enrichment.controller.ts` | `"crm/lead-enrichment"` | 2 | 2 | 0 | 0 | 0 | 2/2 | no | `AuthRequest` |
| `crm-lead-scoring.controller.ts` | `"crm"` | 7 | 7 | 0 | 0 | 0 | 13/13 | no | `AuthenticatedRequest`, `CreateLeadScoringRuleInput`, `UpdateLeadScoringRuleInput` |
| `crm-mailbox.controller.ts` | `"crm/mailbox-connections"` | 5 | 5 | 0 | 0 | 0 | 9/9 | no | `AuthenticatedRequest`, `ConnectMailboxInput`, `OauthCallbackInput` |
| `crm-marketing-deep.controller.ts` | `"crm/marketing-deep"` | 14 | 14 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-marketing-roi-deep.controller.ts` | `"crm/marketing-roi-deep"` | 24 | 24 | 0 | 0 | 0 | 24/24 | no | `AuthenticatedRequest` |
| `crm-partner-deep-two.controller.ts` | `"crm/partner-deep-two"` | 21 | 21 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-partner-deep.controller.ts` | `"crm/partner-deep"` | 6 | 6 | 0 | 0 | 0 | 13/13 | no | `AuthenticatedRequest` |
| `crm-partner-deep.controller.ts` | `"crm/partner-deep"` | 7 | 7 | 0 | 0 | 0 | 15/15 | no | `AuthenticatedRequest` |
| `crm-pipeline-deep.controller.ts` | `"crm/pipeline-deep"` | 16 | 16 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-pipeline-risk.controller.ts` | `"crm/pipeline-risk"` | 7 | 7 | 0 | 0 | 0 | 14/14 | no | `AuthenticatedRequest`, `SnoozeAlertInput` |
| `crm-pipeline-stages.controller.ts` | `"crm"` | 6 | 6 | 0 | 0 | 0 | 18/18 | no | `AuthenticatedRequest`, `CreatePipelineStageInput`, `ReorderStagesInput`, `UpdatePipelineStageInput` |
| `crm-portal-deep.controller.ts` | `"crm/portal-deep"` | 15 | 15 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-quote-signature.controller.ts` | `"crm/quote-signature"` | 4 | 4 | 0 | 0 | 0 | 8/8 | no | `AuthenticatedRequest`, `RequestSignatureInput` |
| `crm-quote-signature.controller.ts` | `"public/quote-signature"` | 3 | 3 | 0 | 0 | 0 | 4/4 | no | `Request`, `SignQuotationInput` |
| `crm-reporting-deep.controller.ts` | `"crm/reporting"` | 24 | 24 | 0 | 0 | 0 | 56/56 | no | `AuthenticatedRequest`, `CreateCrmSavedReportInput`, `CreateDashboardTemplateInput`, `CreateReportScheduleInput`, `UpdateCrmSavedReportInput`, `UpdateDashboardTemplateInput`, `UpdateReportScheduleInput` |
| `crm-revenue-intelligence.controller.ts` | `"crm/revenue-intelligence"` | 2 | 2 | 0 | 0 | 0 | 4/4 | no | `AuthenticatedRequest` |
| `crm-revenue-optimization-deep.controller.ts` | `"crm/revenue-optimization-deep"` | 14 | 14 | 0 | 0 | 0 | 14/14 | no | `AuthenticatedRequest` |
| `crm-sales-operations-deep.controller.ts` | `"crm/sales-operations-deep"` | 16 | 16 | 0 | 0 | 0 | 16/16 | no | `AuthenticatedRequest` |
| `crm-segments.controller.ts` | `"crm"` | 7 | 7 | 0 | 0 | 0 | 14/14 | no | `AuthenticatedRequest`, `CreateSegmentInput`, `UpdateSegmentInput` |
| `crm-sla.controller.ts` | `"crm"` | 7 | 7 | 0 | 0 | 0 | 12/12 | no | `AuthenticatedRequest`, `CreateSlaPolicyInput`, `UpdateSlaPolicyInput` |
| `crm-support-deep.controller.ts` | `"crm/support-deep"` | 25 | 25 | 0 | 0 | 0 | 0/0 | no | — |
| `crm-territory-deep.controller.ts` | `"crm/territory-deep"` | 20 | 20 | 0 | 0 | 0 | 39/39 | no | `AuthenticatedRequest`, `CreateAccountTeamMemberInput`, `CreateNamedAccountInput`, `CreateTerritoryPlanInput`, `UpdateAccountTeamMemberInput`, `UpdateNamedAccountInput`, `UpdateTerritoryPlanInput` |
| `crm-territory-rules.controller.ts` | `"crm/territory-rules"` | 8 | 8 | 0 | 0 | 0 | 17/17 | no | `AssignLeadInput`, `AuthenticatedRequest`, `CreateTerritoryRuleInput`, `UpdateTerritoryRuleInput` |
| `crm-win-loss.controller.ts` | `"crm/win-loss"` | 12 | 12 | 0 | 0 | 0 | 25/25 | no | `AuthenticatedRequest` |
| `crm.controller.ts` | `"crm"` | 223 | 223 | 0 | 0 | 0 | 531/531 | no | `AddTeamMemberInput`, `AuthenticatedRequest`, `CalculateCommissionsInput`, `CreateActivityInput`, `CreateApprovalProcessInput`, `CreateBattlecardInput`, `CreateCampaignInput`, `CreateCommissionRuleInput`, `CreateContactInput`, `CreateContactTagInput`, `CreateCrmCommentInput`, `CreateCrmDashboardInput`, `CreateCrmDocumentInput`, `CreateCrmNoteInput`, `CreateCrmWorkflowRuleInput`, `CreateCustomFieldInput`, `CreateCustomerInput`, `CreateCustomerTagInput`, `CreateDashboardWidgetInput`, `CreateEmailSequenceInput`, `CreateEmailTemplateInput`, `CreateLeadInput`, `CreateOpportunityInput`, `CreateOpportunityLineItemInput`, `CreatePlaybookInput`, `CreatePriceBookEntryInput`, `CreatePriceBookInput`, `CreateQuotationTemplateInput`, `CreateRecordTypeInput`, `CreateSalesPipelineInput`, `CreateSalesTargetInput`, `CreateSalesTerritoryInput`, `CreateSavedReportInput`, `CreateVendorInput`, `CreateWebToLeadFormInput`, `CustomerNoteInput`, `EnrollSequenceInput`, `Request`, `SubmitWebFormInput`, `UpdateApprovalProcessInput`, `UpdateBattlecardInput`, `UpdateCommissionRuleInput`, `UpdateContactInput`, `UpdateCrmDashboardInput`, `UpdateCrmNoteInput`, `UpdateCrmWorkflowRuleInput`, `UpdateCustomFieldInput`, `UpdateCustomerInput`, `UpdateDashboardWidgetInput`, `UpdateEmailTemplateInput`, `UpdateLeadInput`, `UpdateOpportunityInput`, `UpdateOpportunityLineItemInput`, `UpdatePlaybookInput`, `UpdatePriceBookInput`, `UpdateQuotationTemplateInput`, `UpdateRecordTypeInput`, `UpdateSalesTargetInput`, `UpdateSalesTerritoryInput`, `UpdateVendorInput`, `UpdateWebToLeadFormInput`, `VendorNoteInput` |
| `customer-portal-admin.controller.ts` | `"crm/customers/:customerId/portal-users"` | 4 | 4 | 0 | 0 | 0 | 9/9 | no | `AuthenticatedRequest`, `InviteCustomerPortalUserInput` |
| `customer-portal.controller.ts` | `"portal"` | 19 | 19 | 0 | 0 | 0 | 37/37 | no | `PortalCaseCommentInput`, `PortalConfirmPaymentInput`, `PortalCreateCaseInput`, `PortalInitiatePaymentInput`, `PortalLoginInput`, `PortalQuotationDecisionInput`, `PortalRequest` |
| `settings.controller.ts` | `"crm/settings"` | 0 | 0 | 0 | 0 | 0 | 0/0 | no | — |

