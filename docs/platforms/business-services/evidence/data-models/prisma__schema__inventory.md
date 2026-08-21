# Models in prisma/schema/inventory.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `Warehouse` | yes | no | 1 | 0 | 2 | tenant signal |
| `InventoryItem` | yes | no | 7 | 0 | 2 | tenant signal |
| `InventoryItemBin` | yes | no | 1 | 0 | 3 | tenant signal |
| `StockReservation` | yes | no | 1 | 0 | 4 | tenant signal |
| `StockTransferApproval` | yes | no | 2 | 0 | 2 | tenant signal |
| `InvestmentPortfolio` | yes | no | 2 | 0 | 1 | tenant signal |
| `StockLedgerEntry` | yes | no | 7 | 0 | 6 | tenant signal |
| `StockEntry` | yes | no | 1 | 0 | 4 | tenant signal |
| `StockEntryItem` | yes | no | 5 | 0 | 3 | tenant signal |
| `InventoryValuation` | yes | no | 3 | 0 | 3 | tenant signal |
| `StockAlert` | yes | no | 2 | 0 | 3 | tenant signal |
| `InvestmentHolding` | yes | no | 5 | 0 | 1 | tenant signal |
| `WarehouseShiftTemplate` | yes | no | 0 | 0 | 2 | tenant signal |
| `InventoryHold` | yes | no | 1 | 0 | 3 | tenant signal |
| `WarehouseTask` | yes | no | 1 | 0 | 5 | tenant signal |
| `StockoutPrediction` | yes | no | 3 | 0 | 3 | tenant signal |
| `StockValuationPolicy` | yes | no | 1 | 0 | 3 | tenant signal |
| `StockValuationLedger` | yes | no | 6 | 0 | 4 | tenant signal |
| `StockRevaluation` | yes | no | 1 | 0 | 2 | tenant signal |
| `StockRevaluationLine` | yes | no | 4 | 0 | 2 | tenant signal |
| `StockTake` | yes | no | 0 | 0 | 4 | tenant signal |
| `StockTakeVariance` | yes | no | 6 | 0 | 3 | tenant signal |
| `ItemBarcode` | yes | no | 0 | 0 | 3 | tenant signal |
| `StockWriteDownRequest` | yes | no | 3 | 0 | 3 | tenant signal |
| `StockWriteOffRecord` | yes | no | 3 | 0 | 3 | tenant signal |
| `InventoryCostProfile` | yes | no | 1 | 0 | 3 | tenant signal |
| `InventoryCostLayer` | yes | no | 3 | 0 | 3 | tenant signal |
| `InventoryCostAdjustment` | yes | no | 1 | 0 | 3 | tenant signal |
| `WarehouseKpi` | yes | no | 12 | 0 | 4 | tenant signal |
| `WarehouseNetworkDesign` | yes | no | 4 | 2 | 1 | tenant signal; Float review |
| `WarehouseNetworkNode` | yes | no | 2 | 3 | 1 | tenant signal; Float review |

