# Models in prisma/schema/real-estate.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `LeaseSchedule` | yes | no | 4 | 0 | 2 | tenant signal |
| `UnitOfMeasure` | yes | no | 0 | 0 | 2 | tenant signal |
| `ProposalDocument` | yes | no | 0 | 0 | 2 | tenant signal |
| `RealEstateProperty` | yes | no | 0 | 2 | 7 | tenant signal; Float review |
| `RealEstatePropertyPortfolio` | yes | no | 2 | 0 | 2 | tenant signal |
| `RealEstatePropertyBuilding` | yes | no | 0 | 0 | 1 | tenant signal |
| `RealEstatePropertyUnit` | yes | no | 3 | 0 | 3 | tenant signal |
| `RealEstateLease` | yes | no | 4 | 0 | 5 | tenant signal |
| `RealEstateLeasePayment` | yes | no | 4 | 0 | 4 | tenant signal |
| `RealEstateTenant` | yes | no | 2 | 0 | 3 | tenant signal |
| `RealEstateMaintenanceWorkOrder` | yes | no | 2 | 0 | 6 | tenant signal |
| `RealEstateMaintenanceVendor` | yes | no | 2 | 0 | 2 | tenant signal |
| `RealEstateCommissionPlan` | yes | no | 3 | 0 | 3 | tenant signal |
| `RealEstateCommissionPayout` | yes | no | 5 | 0 | 3 | tenant signal |
| `RealEstatePropertyValuation` | yes | no | 5 | 0 | 3 | tenant signal |
| `RealEstateMaintenanceRequest` | yes | no | 2 | 0 | 6 | tenant signal |
| `RealEstateLeaseRenewal` | yes | no | 5 | 0 | 4 | tenant signal |
| `RealEstateRentEscalation` | yes | no | 6 | 0 | 4 | tenant signal |
| `RealEstatePropertyFinancial` | yes | no | 22 | 0 | 3 | tenant signal |
| `RealEstateExpenseCategory` | yes | no | 0 | 0 | 2 | tenant signal |
| `RealEstatePropertyInspection` | yes | no | 0 | 0 | 2 | tenant signal |
| `RealEstateRentCollectionLog` | yes | no | 2 | 0 | 2 | tenant signal |
| `RealEstateListingSyndicate` | yes | no | 0 | 0 | 2 | tenant signal |

