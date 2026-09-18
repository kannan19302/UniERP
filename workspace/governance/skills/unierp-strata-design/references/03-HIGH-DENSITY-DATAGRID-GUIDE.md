# 03 — High-Density Spreadsheet & DataGrid Guide

Enterprise ERP users spend 70% of their workday inside tables and ledgers. UniERP Strata establishes a spreadsheet-grade data grid engine.

## 🚀 Key Grid Capabilities

1. **Ultra-Compact (24px) & Compact (28px) Row Heights**:
   - Reduces padding to `2px 6px`
   - Enforces font size `11px` / line height `1.3`
   - Fits 50+ rows on a standard 1080p display
2. **Pinned Frozen Columns**:
   - Freeze ID or Description on the Left (`position: sticky; left: 0; z-index: 2;`)
   - Freeze Actions or Total on the Right (`position: sticky; right: 0; z-index: 2;`)
3. **Tabular Numeric Currency Alignment**:
   - Always right-aligned: `text-align: right;`
   - Monospace font: `font-family: var(--font-mono);`
   - Numeric variant: `font-variant-numeric: tabular-nums lining-nums;`
4. **Excel-Style Keyboard Navigation**:
   - `ArrowUp` / `ArrowDown`: Move active cell focus vertically
   - `ArrowLeft` / `ArrowRight`: Move active cell focus horizontally
   - `Enter`: Trigger inline cell edit
   - `Escape`: Cancel edit and restore original value
   - `Tab`: Commit edit and advance to next right cell

## 💡 Implementation Pattern

```tsx
import { VirtualizedTable, type ColumnDef } from "@kannan19302/ui/data-grid";

interface LedgerRow {
  id: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  balance: number;
}

const columns: ColumnDef<LedgerRow>[] = [
  {
    id: "accountCode",
    header: "Account",
    accessorKey: "accountCode",
    width: 110,
    pinned: "left",
    align: "left",
  },
  {
    id: "accountName",
    header: "Description",
    accessorKey: "accountName",
    width: 260,
  },
  {
    id: "debit",
    header: "Debit (USD)",
    accessorKey: "debit",
    width: 140,
    align: "right",
    isNumeric: true,
  },
  {
    id: "credit",
    header: "Credit (USD)",
    accessorKey: "credit",
    width: 140,
    align: "right",
    isNumeric: true,
  },
  {
    id: "balance",
    header: "Ending Balance",
    accessorKey: "balance",
    width: 150,
    pinned: "right",
    align: "right",
    isNumeric: true,
  },
];

export function GeneralLedgerGrid({ data }: { data: LedgerRow[] }) {
  return (
    <div data-density="ultra-compact" style={{ height: "calc(100vh - 180px)", width: "100%" }}>
      <VirtualizedTable
        data={data}
        columns={columns}
        enableKeyboardNav
        summaryRow={{
          debit: data.reduce((acc, r) => acc + r.debit, 0),
          credit: data.reduce((acc, r) => acc + r.credit, 0),
        }}
      />
    </div>
  );
}
```
