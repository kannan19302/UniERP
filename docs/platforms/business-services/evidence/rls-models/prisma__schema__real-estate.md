# Tenant model to RLS migration linkage: prisma/schema/real-estate.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `LeaseSchedule` | `lease_schedules` | yes | no | RLS LINK GAP |
| `UnitOfMeasure` | `units_of_measure` | yes | no | RLS LINK GAP |
| `ProposalDocument` | `proposal_documents` | yes | no | RLS LINK GAP |
| `RealEstateProperty` | `real_estate_properties` | yes | no | RLS LINK GAP |
| `RealEstatePropertyPortfolio` | `real_estate_portfolios` | yes | no | RLS LINK GAP |
| `RealEstatePropertyBuilding` | `real_estate_buildings` | yes | no | RLS LINK GAP |
| `RealEstatePropertyUnit` | `real_estate_units` | yes | no | RLS LINK GAP |
| `RealEstateLease` | `real_estate_leases` | yes | no | RLS LINK GAP |
| `RealEstateLeasePayment` | `real_estate_lease_payments` | yes | no | RLS LINK GAP |
| `RealEstateTenant` | `real_estate_tenants` | yes | no | RLS LINK GAP |
| `RealEstateMaintenanceWorkOrder` | `real_estate_maintenance_work_orders` | yes | no | RLS LINK GAP |
| `RealEstateMaintenanceVendor` | `real_estate_maintenance_vendors` | yes | no | RLS LINK GAP |
| `RealEstateCommissionPlan` | `real_estate_commission_plans` | yes | no | RLS LINK GAP |
| `RealEstateCommissionPayout` | `real_estate_commission_payouts` | yes | no | RLS LINK GAP |
| `RealEstatePropertyValuation` | `real_estate_valuations` | yes | no | RLS LINK GAP |
| `RealEstateMaintenanceRequest` | `real_estate_maintenance_requests` | yes | no | RLS LINK GAP |
| `RealEstateLeaseRenewal` | `real_estate_lease_renewals` | yes | no | RLS LINK GAP |
| `RealEstateRentEscalation` | `real_estate_rent_escalations` | yes | no | RLS LINK GAP |
| `RealEstatePropertyFinancial` | `real_estate_property_financials` | yes | no | RLS LINK GAP |
| `RealEstateExpenseCategory` | `real_estate_expense_categories` | yes | no | RLS LINK GAP |
| `RealEstatePropertyInspection` | `real_estate_property_inspections` | yes | no | RLS LINK GAP |
| `RealEstateRentCollectionLog` | `real_estate_rent_collection_logs` | yes | no | RLS LINK GAP |
| `RealEstateListingSyndicate` | `real_estate_listing_syndicates` | yes | no | RLS LINK GAP |

