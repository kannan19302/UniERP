# AST controller summary: api/modules/finance

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `ap-deep.controller.ts` | `"finance/ap-deep"` | 12 | 12 | 0 | 0 | 0 | 23/23 | no | — |
| `ar-deep.controller.ts` | `"finance/ar-deep"` | 13 | 13 | 0 | 0 | 0 | 28/28 | no | — |
| `close-ops.controller.ts` | `"finance/close"` | 11 | 11 | 0 | 0 | 0 | 23/23 | no | — |
| `finance-enterprise.controller.ts` | `"finance/enterprise"` | 10 | 10 | 0 | 0 | 0 | 23/23 | no | — |
| `finance-expansion.controller.ts` | `"finance"` | 60 | 60 | 0 | 0 | 0 | 156/156 | no | `AuthenticatedRequest`, `CreateCreditNoteInput`, `CreateDebitNoteInput`, `CreateDunningLevelInput`, `CreateDunningRunInput`, `CreateExpenseCategoryInput`, `CreateExpenseReportInput`, `CreateRecurringInvoiceInput`, `CreateStatementTemplateInput`, `GenerateStatementInput`, `UpdateCreditNoteInput`, `UpdateDebitNoteInput`, `UpdateDunningLevelInput`, `UpdateExpenseReportInput`, `UpdateRecurringInvoiceInput` |
| `finance-operations.controller.ts` | `"finance"` | 125 | 125 | 0 | 0 | 0 | 309/309 | no | `AuthenticatedRequest`, `z.infer<typeof addBankTransactionSchema>`, `z.infer<typeof bulkApproveVendorBillsSchema>`, `z.infer<typeof bulkCreateBudgetsSchema>`, `z.infer<typeof bulkPayVendorBillsSchema>`, `z.infer<typeof bulkVerifyBankAccountsSchema>`, `z.infer<typeof copyBudgetSchema>`, `z.infer<typeof createTaxJurisdictionSchema>`, `z.infer<typeof payVendorBillSchema>`, `z.infer<typeof reconcileBankTransactionSchema>`, `z.infer<typeof saveReportConfigSchema>`, `z.infer<typeof syncExchangeRatesSchema>`, `z.infer<typeof updateCurrencySchema>`, `z.infer<typeof updateExchangeRateSchema>`, `z.infer<typeof updateTaxJurisdictionSchema>` |
| `finance.controller.ts` | `"finance"` | 16 | 16 | 0 | 0 | 0 | 38/38 | no | `AuthenticatedRequest`, `BulkActionInput`, `CreateInvoiceInput`, `CreatePaymentInput`, `UpdateInvoiceInput` |
| `leases.controller.ts` | `"finance/leases"` | 16 | 16 | 0 | 0 | 0 | 41/41 | no | `AuthRequest`, `z.infer<typeof BulkPostSchema>`, `z.infer<typeof CreateLeaseSchema>`, `z.infer<typeof PostMonthSchema>`, `z.infer<typeof RenewSchema>`, `z.infer<typeof StatusSchema>`, `z.infer<typeof TerminateSchema>`, `z.infer<typeof UpdateLeaseSchema>` |
| `project-accounting.controller.ts` | `"finance/project-accounting"` | 7 | 7 | 0 | 0 | 0 | 14/14 | no | — |
| `settings.controller.ts` | `` | 0 | 0 | 0 | 0 | 0 | 0/0 | no | — |

