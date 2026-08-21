# AST controller summary: api/modules/sales

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `pricing.controller.ts` | `"sales/pricing"` | 2 | 2 | 0 | 0 | 0 | 6/6 | no | `CalculatePriceDto` |
| `sales-advanced-enterprise-core-deep.controller.ts` | `"sales/advanced-enterprise-deep"` | 120 | 120 | 0 | 0 | 0 | 216/216 | no | — |
| `sales-advanced-pricing-deep.controller.ts` | `"sales/advanced-pricing-deep"` | 3 | 3 | 0 | 0 | 0 | 4/4 | no | — |
| `sales-advanced-pricing.controller.ts` | `"sales/pricing"` | 17 | 17 | 0 | 0 | 0 | 38/38 | no | `AddPriceListItemDto`, `ApproveFloorPriceDto`, `CalculateTieredPriceDto`, `CreateContractPricingDto`, `CreateCustomerPriceListDto`, `CreateFloorPriceDto`, `UpdateContractPricingDto`, `UpdateCustomerPriceListDto`, `UpdateFloorPriceDto` |
| `sales-analytics.controller.ts` | `"sales/analytics"` | 8 | 8 | 0 | 0 | 0 | 17/17 | no | `AuthenticatedRequest` |
| `sales-commissions.controller.ts` | `"sales/commissions"` | 10 | 10 | 0 | 0 | 0 | 22/22 | no | `AuthenticatedRequest`, `CreateCommissionPayoutApprovalDto` |
| `sales-contracts.controller.ts` | `"sales/contracts"` | 10 | 10 | 0 | 0 | 0 | 22/22 | no | `AuthenticatedRequest`, `CreateSalesContractDto`, `UpdateSalesContractStatusDto` |
| `sales-cpq.controller.ts` | `"sales/cpq"` | 22 | 22 | 0 | 0 | 0 | 43/43 | no | `CreateCrossSellRuleDto`, `CreateProductBundleDto`, `CreateUpsellRuleDto`, `UpdateProductBundleDto`, `ValidateConfigurationDto` |
| `sales-customer-success.controller.ts` | `"sales/customer-success"` | 7 | 7 | 0 | 0 | 0 | 16/16 | no | — |
| `sales-documents-deep.controller.ts` | `"sales/documents-deep"` | 6 | 6 | 0 | 0 | 0 | 14/14 | no | — |
| `sales-enterprise-execution-deep.controller.ts` | `"sales/enterprise-execution"` | 100 | 100 | 0 | 0 | 0 | 186/186 | no | — |
| `sales-enterprise.controller.ts` | `"sales/enterprise"` | 13 | 13 | 0 | 0 | 0 | 38/38 | no | `AuthenticatedRequest` |
| `sales-expansion.controller.ts` | `"sales/expansion"` | 6 | 6 | 0 | 0 | 0 | 8/8 | no | `AuthenticatedRequest` |
| `sales-forecasting.controller.ts` | `"sales/forecasting"` | 5 | 5 | 0 | 0 | 0 | 8/8 | no | `AuthenticatedRequest` |
| `sales-gamification-deep.controller.ts` | `"sales/gamification"` | 4 | 4 | 0 | 0 | 0 | 10/10 | no | — |
| `sales-global-revenue-ops-deep.controller.ts` | `"sales/global-revenue-ops"` | 50 | 50 | 0 | 0 | 0 | 107/107 | no | — |
| `sales-intelligence-signals.controller.ts` | `"sales/intelligence-signals"` | 5 | 5 | 0 | 0 | 0 | 11/11 | no | — |
| `sales-omnichannel-deals-deep.controller.ts` | `"sales/omnichannel-deals"` | 50 | 50 | 0 | 0 | 0 | 109/109 | no | — |
| `sales-partners.controller.ts` | `"sales/partners"` | 10 | 10 | 0 | 0 | 0 | 20/20 | no | `AuthenticatedRequest`, `CreatePartnerDto`, `CreatePartnerTierDto`, `UpdatePartnerDto`, `UpdatePartnerTierDto` |
| `sales-playbooks-deep.controller.ts` | `"sales/playbooks-deep"` | 6 | 6 | 0 | 0 | 0 | 14/14 | no | — |
| `sales-promotions.controller.ts` | `"sales/promotions"` | 10 | 10 | 0 | 0 | 0 | 22/22 | no | `ApplyCouponDto`, `AuthenticatedRequest`, `CreateCouponDto`, `CreatePromotionDto`, `UpdatePromotionDto` |
| `sales-quote-cpq-master-deep.controller.ts` | `"sales/cpq-master"` | 40 | 40 | 0 | 0 | 0 | 86/86 | no | — |
| `sales-returns-deep.controller.ts` | `"sales/returns-deep"` | 5 | 5 | 0 | 0 | 0 | 10/10 | no | — |
| `sales-returns.controller.ts` | `"sales/returns"` | 14 | 14 | 0 | 0 | 0 | 33/33 | no | `AuthenticatedRequest` |
| `sales-spiff.controller.ts` | `"sales/spiff"` | 13 | 13 | 0 | 0 | 0 | 26/26 | no | `CreateSpiffCampaignDto`, `CreateTeamSplitDto`, `ProcessClawbackDto`, `UpdateSpiffCampaignDto`, `UpdateTeamSplitDto` |
| `sales-subscription.controller.ts` | `"sales/subscriptions"` | 12 | 12 | 0 | 0 | 0 | 27/27 | no | `CreateSubscriptionDto`, `RecordSubscriptionUsageDto`, `SendDunningDto`, `UpdateSubscriptionDto` |
| `sales-territory.controller.ts` | `"sales/territories"` | 21 | 21 | 0 | 0 | 0 | 47/47 | no | `AddTerritoryMemberDto`, `AssignEntityDto`, `CreateTerritoryDto`, `CreateTerritoryForecastDto`, `CreateTerritoryRuleDto`, `RealignTerritoryDto`, `UpdateTerritoryDto`, `UpdateTerritoryForecastDto`, `UpdateTerritoryRuleDto` |
| `sales.controller.ts` | `"sales"` | 21 | 21 | 0 | 0 | 9 | 46/46 | no | `AuthenticatedRequest`, `CreateDeliveryNoteInput`, `CreateQuotationInput`, `CreateSalesOrderInput`, `CreateSalesReturnInput`, `MarkDeliveryShippedDto`, `ProcessReturnDto`, `RecordOrderPaymentDto`, `UpdateQuotationStatusDto`, `UpdateSalesOrderStatusInput` |
| `settings.controller.ts` | `"sales/settings"` | 0 | 0 | 0 | 0 | 0 | 0/0 | no | — |

