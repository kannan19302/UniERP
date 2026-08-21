# Tenant model to RLS migration linkage: prisma/schema/inventory.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `Warehouse` | `warehouses` | yes | no | RLS LINK GAP |
| `InventoryItem` | `inventory_items` | yes | no | RLS LINK GAP |
| `InventoryItemBin` | `inventory_item_bins` | yes | no | RLS LINK GAP |
| `StockReservation` | `stock_reservations` | yes | no | RLS LINK GAP |
| `StockTransferApproval` | `stock_transfer_approvals` | yes | no | RLS LINK GAP |
| `InvestmentPortfolio` | `investment_portfolios` | yes | no | RLS LINK GAP |
| `StockLedgerEntry` | `stock_ledger_entries` | yes | no | RLS LINK GAP |
| `StockEntry` | `stock_entries` | yes | no | RLS LINK GAP |
| `StockEntryItem` | `stock_entry_items` | yes | no | RLS LINK GAP |
| `InventoryValuation` | `inventory_valuations` | yes | no | RLS LINK GAP |
| `StockAlert` | `stock_alerts` | yes | no | RLS LINK GAP |
| `InvestmentHolding` | `investment_holdings` | yes | no | RLS LINK GAP |
| `WarehouseShiftTemplate` | `warehouse_shift_templates` | yes | no | RLS LINK GAP |
| `InventoryHold` | `inventory_holds` | yes | no | RLS LINK GAP |
| `WarehouseTask` | `warehouse_tasks` | yes | no | RLS LINK GAP |
| `StockoutPrediction` | `stockout_predictions` | yes | no | RLS LINK GAP |
| `StockValuationPolicy` | `stock_valuation_policies` | yes | no | RLS LINK GAP |
| `StockValuationLedger` | `stock_valuation_ledger` | yes | no | RLS LINK GAP |
| `StockRevaluation` | `stock_revaluations` | yes | no | RLS LINK GAP |
| `StockRevaluationLine` | `stock_revaluation_lines` | yes | no | RLS LINK GAP |
| `StockTake` | `stock_takes` | yes | no | RLS LINK GAP |
| `StockTakeVariance` | `stock_take_variances` | yes | no | RLS LINK GAP |
| `ItemBarcode` | `item_barcodes` | yes | no | RLS LINK GAP |
| `StockWriteDownRequest` | `stock_write_down_requests` | yes | no | RLS LINK GAP |
| `StockWriteOffRecord` | `stock_write_off_records` | yes | no | RLS LINK GAP |
| `InventoryCostProfile` | `inventory_cost_profiles` | yes | no | RLS LINK GAP |
| `InventoryCostLayer` | `inventory_cost_layers` | yes | no | RLS LINK GAP |
| `InventoryCostAdjustment` | `inventory_cost_adjustments` | yes | no | RLS LINK GAP |
| `WarehouseKpi` | `warehouse_kpis` | yes | no | RLS LINK GAP |
| `WarehouseNetworkDesign` | `warehouse_network_designs` | yes | no | RLS LINK GAP |
| `WarehouseNetworkNode` | `warehouse_network_nodes` | yes | no | RLS LINK GAP |

