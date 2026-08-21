# AST Controller Contract Coverage

Generated from current TypeScript AST on 2026-08-21. It measures method-level typing/decorator signals without claiming effective authorization or response-schema correctness.

| Source group | Controllers | HTTP methods | Permission methods | Public | Skip tenant | Explicit returns | Typed params / total | Adjacent specs | Detail |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `idp/root` | 2 | 3 | 0 | 0 | 0 | 0 | 1/1 | 0 | [AST detail](ast-controllers/idp-root.md) |
| `idp/common` | 7 | 27 | 26 | 0 | 0 | 0 | 90/90 | 0 | [AST detail](ast-controllers/idp-common.md) |
| `idp/modules/auth` | 5 | 55 | 29 | 0 | 1 | 4 | 107/107 | 0 | [AST detail](ast-controllers/idp-auth.md) |
| `idp/modules/oidc` | 7 | 14 | 0 | 0 | 0 | 7 | 27/27 | 0 | [AST detail](ast-controllers/idp-oidc.md) |

A method without a literal `@Permissions`, `@Public` or explicit return type is a review candidate. Global/class/composed decorators must be resolved before any vulnerability or completeness claim.

