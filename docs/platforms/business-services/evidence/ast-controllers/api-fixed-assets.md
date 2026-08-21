# AST controller summary: api/modules/fixed-assets

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `asset-operations.controller.ts` | `"fixed-assets"` | 6 | 6 | 0 | 0 | 0 | 12/12 | no | `AuthenticatedRequest` |
| `fixed-assets-bulk.controller.ts` | `"fixed-assets-bulk"` | 18 | 18 | 0 | 0 | 0 | 30/30 | no | `z.infer<typeof bulkCreateAssetsSchema>`, `z.infer<typeof bulkDepreciateSchema>`, `z.infer<typeof bulkDisposeSchema>`, `z.infer<typeof bulkTransferSchema>`, `z.infer<typeof createBudgetSchema>`, `z.infer<typeof createDocumentSchema>`, `z.infer<typeof updateBudgetSchema>` |
| `fixed-assets-deep.controller.ts` | `"fixed-assets"` | 47 | 47 | 0 | 0 | 0 | 103/103 | no | — |
| `fixed-assets-generated.controller.ts` | `"fixed-assets"` | 200 | 200 | 0 | 0 | 0 | 400/400 | no | `AuthenticatedRequest` |
| `fixed-assets.controller.ts` | `"fixed-assets"` | 18 | 18 | 0 | 0 | 0 | 40/40 | no | `AuthenticatedRequest`, `CreateFixedAssetCategoryInput`, `CreateFixedAssetInput`, `DisposeFixedAssetInput`, `LogFixedAssetMaintenanceInput`, `TransferFixedAssetInput`, `UpdateFixedAssetInput` |

