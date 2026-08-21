# AST controller summary: api/modules/ecommerce

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `ecommerce-admin.controller.ts` | `"ecommerce"` | 12 | 12 | 0 | 0 | 0 | 23/23 | no | `AuthenticatedRequest`, `CreateProductListingDto`, `CreateStorefrontCategoryDto`, `UpdateProductListingDto`, `UpdateStorefrontCategoryDto`, `UpsertStorefrontConfigDto` |
| `ecommerce-enterprise.controller.ts` | `"ecommerce/enterprise"` | 9 | 9 | 0 | 0 | 0 | 20/20 | no | `AuthenticatedRequest` |
| `ecommerce-expansion.controller.ts` | `"ecommerce"` | 46 | 46 | 0 | 0 | 0 | 121/121 | no | `AuthenticatedRequest` |
| `ecommerce-public.controller.ts` | `"store/:tenantSlug"` | 12 | 0 | 12 | 0 | 0 | 28/28 | no | `AddCartItemDto`, `CheckoutDto`, `CreateCartDto`, `Request & StorefrontRequest`, `Request & StorefrontRequest & { rawBody?: Buffer }`, `UpdateCartItemDto` |

