# Models in prisma/schema/finance.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `AccountPlan` | yes | no | 0 | 0 | 1 | tenant signal |
| `Invoice` | yes | yes | 6 | 0 | 5 | tenant signal |
| `InvoiceLineItem` | yes | no | 5 | 0 | 2 | tenant signal |
| `Payment` | yes | no | 1 | 0 | 2 | tenant signal |
| `Account` | yes | no | 1 | 0 | 2 | tenant signal |
| `FinanceLease` | yes | no | 4 | 0 | 1 | tenant signal |
| `PaymentMethod` | yes | no | 0 | 0 | 0 | tenant signal |
| `PaymentTransaction` | yes | no | 3 | 0 | 2 | tenant signal |
| `FinanceAuditLog` | yes | no | 0 | 0 | 2 | tenant signal |
| `FinancialPeriod` | yes | no | 0 | 0 | 1 | tenant signal |
| `InvoiceDunningLog` | yes | no | 1 | 0 | 2 | tenant signal |
| `PaymentSchedule` | yes | no | 1 | 0 | 1 | tenant signal |
| `PaymentRun` | yes | no | 1 | 0 | 1 | tenant signal |
| `AccountingBook` | yes | no | 0 | 0 | 2 | tenant signal |
| `AccountingBookRule` | yes | no | 1 | 0 | 1 | tenant signal |
| `PaymentTermTemplate` | yes | no | 1 | 0 | 1 | tenant signal |
| `PaymentBatch` | yes | no | 1 | 0 | 2 | tenant signal |
| `PaymentBatchLine` | yes | no | 1 | 0 | 1 | tenant signal |
| `FinancialControl` | yes | no | 0 | 0 | 2 | tenant signal |
| `AccountTeam` | yes | no | 0 | 0 | 2 | tenant signal |
| `AccountTeamMember` | yes | no | 0 | 0 | 2 | tenant signal |
| `InvoiceFactoringFacility` | yes | no | 6 | 0 | 1 | tenant signal |
| `InvoiceFactoringAdvance` | yes | no | 5 | 0 | 2 | tenant signal |
| `InvoiceCaptureBatch` | yes | no | 0 | 0 | 1 | tenant signal |
| `InvoiceCaptureResult` | yes | no | 2 | 0 | 2 | tenant signal |
| `InvoiceMatchRule` | yes | no | 2 | 0 | 1 | tenant signal |
| `PaymentRailOptimization` | yes | no | 3 | 0 | 1 | tenant signal |
| `FinancialNlpQueryLog` | yes | no | 0 | 0 | 2 | tenant signal |
| `AccountScore` | yes | no | 0 | 0 | 2 | tenant signal |

