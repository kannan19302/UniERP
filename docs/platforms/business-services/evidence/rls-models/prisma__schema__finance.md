# Tenant model to RLS migration linkage: prisma/schema/finance.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `AccountPlan` | `account_plans` | yes | no | RLS LINK GAP |
| `Invoice` | `invoices` | yes | no | RLS LINK GAP |
| `InvoiceLineItem` | `invoice_line_items` | yes | no | RLS LINK GAP |
| `Payment` | `payments` | yes | no | RLS LINK GAP |
| `Account` | `accounts` | yes | no | RLS LINK GAP |
| `FinanceLease` | `finance_leases` | yes | no | RLS LINK GAP |
| `PaymentMethod` | `payment_methods` | yes | no | RLS LINK GAP |
| `PaymentTransaction` | `payment_transactions` | yes | no | RLS LINK GAP |
| `FinanceAuditLog` | `finance_audit_logs` | yes | no | RLS LINK GAP |
| `FinancialPeriod` | `financial_periods` | yes | no | RLS LINK GAP |
| `InvoiceDunningLog` | `invoice_dunning_logs` | yes | no | RLS LINK GAP |
| `PaymentSchedule` | `payment_schedules` | yes | no | RLS LINK GAP |
| `PaymentRun` | `payment_runs` | yes | no | RLS LINK GAP |
| `AccountingBook` | `accounting_books` | yes | no | RLS LINK GAP |
| `AccountingBookRule` | `accounting_book_rules` | yes | no | RLS LINK GAP |
| `PaymentTermTemplate` | `payment_term_templates` | yes | no | RLS LINK GAP |
| `PaymentBatch` | `payment_batches` | yes | no | RLS LINK GAP |
| `PaymentBatchLine` | `payment_batch_lines` | yes | no | RLS LINK GAP |
| `FinancialControl` | `financial_controls` | yes | no | RLS LINK GAP |
| `AccountTeam` | `account_teams` | yes | no | RLS LINK GAP |
| `AccountTeamMember` | `account_team_members` | yes | no | RLS LINK GAP |
| `InvoiceFactoringFacility` | `invoice_factoring_facilities` | yes | no | RLS LINK GAP |
| `InvoiceFactoringAdvance` | `invoice_factoring_advances` | yes | no | RLS LINK GAP |
| `InvoiceCaptureBatch` | `invoice_capture_batches` | yes | no | RLS LINK GAP |
| `InvoiceCaptureResult` | `invoice_capture_results` | yes | no | RLS LINK GAP |
| `InvoiceMatchRule` | `invoice_match_rules` | yes | no | RLS LINK GAP |
| `PaymentRailOptimization` | `payment_rail_optimizations` | yes | no | RLS LINK GAP |
| `FinancialNlpQueryLog` | `financial_nlp_query_logs` | yes | no | RLS LINK GAP |
| `AccountScore` | `account_scores` | yes | no | RLS LINK GAP |

