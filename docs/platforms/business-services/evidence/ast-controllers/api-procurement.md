# AST controller summary: api/modules/procurement

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `contracts.controller.ts` | `"procurement/contracts"` | 3 | 3 | 0 | 0 | 0 | 6/6 | no | — |
| `procurement-enterprise.controller.ts` | `"procurement/enterprise"` | 12 | 12 | 0 | 0 | 0 | 33/33 | no | `AuthenticatedRequest` |
| `procurement-expansion.controller.ts` | `"procurement/expansion"` | 48 | 48 | 0 | 0 | 0 | 115/115 | no | `AuthRequest` |
| `procurement-intelligence.controller.ts` | `"procurement/intelligence"` | 33 | 33 | 0 | 0 | 0 | 66/66 | no | `AuthRequest` |
| `procurement-scheduling.controller.ts` | `"procurement/scheduling"` | 23 | 23 | 0 | 0 | 0 | 44/44 | no | `AuthRequest` |
| `procurement-sourcing.controller.ts` | `"procurement"` | 18 | 18 | 0 | 0 | 0 | 40/40 | no | `AuthRequest`, `z.infer<typeof createBidAnalysisSchema>`, `z.infer<typeof createContractSchema>`, `z.infer<typeof createEvaluationSchema>`, `z.infer<typeof createOnboardingSchema>`, `z.infer<typeof createSourcingProjectSchema>` |
| `procurement-supplier-performance.controller.ts` | `"procurement/supplier-performance"` | 12 | 12 | 0 | 0 | 0 | 27/27 | no | `AuthenticatedRequest` |
| `procurement.controller.ts` | `"procurement"` | 33 | 33 | 0 | 0 | 4 | 63/63 | no | `AuthenticatedRequest`, `CreateBlanketPurchaseAgreementInput`, `CreatePurchaseOrderInput`, `CreatePurchaseReceiptInput`, `CreatePurchaseRequisitionInput`, `CreatePurchaseReturnInput`, `CreateRFQInput`, `CreateSupplierQuotationInput` |
| `procurement.public.controller.ts` | `"procurement/public"` | 2 | 0 | 2 | 0 | 0 | 3/3 | no | `SubmitPublicBidInput` |
| `settings.controller.ts` | `"procurement/settings"` | 0 | 0 | 0 | 0 | 0 | 0/0 | no | — |

