# AST controller summary: api/modules/saas-portal

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `audit-trail.controller.ts` | `"saas-portal/audit-trail-deep"` | 2 | 2 | 0 | 0 | 0 | 15/15 | no | — |
| `controllers/audit-log.controller.ts` | `"saas-portal/audit-log"` | 4 | 4 | 0 | 0 | 0 | 14/14 | no | — |
| `controllers/billing.controller.ts` | `"saas-portal/billing"` | 32 | 32 | 0 | 0 | 0 | 41/41 | no | `AuthenticatedRequest`, `z.infer<typeof addFeatureSchema>`, `z.infer<typeof addPaymentMethodSchema>`, `z.infer<typeof bulkCreateCouponsSchema>`, `z.infer<typeof createCouponSchema>`, `z.infer<typeof createPlanSchema>`, `z.infer<typeof refundSchema>`, `z.infer<typeof setPriceSchema>`, `z.infer<typeof updateCouponSchema>`, `z.infer<typeof updateFeatureSchema>`, `z.infer<typeof updatePlanSchema>`, `z.infer<typeof updatePriceSchema>` |
| `controllers/delegation.controller.ts` | `"saas-portal/delegations"` | 4 | 4 | 0 | 0 | 0 | 8/8 | no | `AuthenticatedRequest`, `z.infer<typeof createDelegationSchema>`, `z.infer<typeof updateDelegationSchema>` |
| `controllers/gdpr-compliance.controller.ts` | `"saas-portal/gdpr-compliance"` | 17 | 17 | 0 | 0 | 0 | 15/15 | no | `AuthenticatedRequest`, `z.infer<typeof createErasureRequestSchema>`, `z.infer<typeof generateReportSchema>`, `z.infer<typeof requestCertificationSchema>`, `z.infer<typeof signDpaSchema>`, `z.infer<typeof upsertRetentionPolicySchema>` |
| `controllers/org-hierarchy.controller.ts` | `"saas-portal/org-hierarchy"` | 9 | 9 | 0 | 0 | 0 | 18/18 | no | `AuthenticatedRequest`, `z.infer<typeof createCostCenterSchema>`, `z.infer<typeof createDepartmentSchema>`, `z.infer<typeof updateCostCenterSchema>`, `z.infer<typeof updateDepartmentSchema>` |
| `controllers/security.controller.ts` | `"saas-portal/security"` | 22 | 22 | 0 | 0 | 0 | 38/38 | no | `AuthenticatedRequest`, `z.infer<typeof createApiKeySchema>`, `z.infer<typeof dataRetentionPolicySchema>`, `z.infer<typeof ipRestrictionSchema>`, `z.infer<typeof mfaSettingsSchema>`, `z.infer<typeof passwordPolicySchema>`, `z.infer<typeof ssoConfigSchema>` |
| `controllers/subscription.controller.ts` | `"saas-portal/subscription"` | 18 | 18 | 0 | 0 | 0 | 30/30 | no | `AuthenticatedRequest`, `z.infer<typeof changePlanSchema>`, `z.infer<typeof generateInvoiceSchema>`, `z.infer<typeof updateSeatsSchema>` |
| `saas-portal-billing-self-service.controller.ts` | `"saas-portal/billing-self-service"` | 5 | 5 | 0 | 0 | 0 | 8/8 | no | — |
| `saas-portal-enterprise.controller.ts` | `"saas/enterprise"` | 5 | 5 | 0 | 0 | 0 | 11/11 | no | `AuthenticatedRequest` |
| `saas-portal-feedback-roadmap.controller.ts` | `"saas-portal/feedback-roadmap"` | 3 | 3 | 0 | 0 | 0 | 4/4 | no | — |
| `saas-portal-subscription-tier-engine.controller.ts` | `"saas-portal/subscription-tier-engine"` | 3 | 3 | 0 | 0 | 0 | 5/5 | no | — |
| `saas-portal-support-self-service.controller.ts` | `"saas-portal/support-self-service"` | 3 | 3 | 0 | 0 | 0 | 6/6 | no | — |
| `saas-portal-usage-metrics-portal.controller.ts` | `"saas-portal/usage-metrics"` | 1 | 1 | 0 | 0 | 0 | 1/1 | no | — |
| `saas-portal.controller.ts` | `"saas-portal"` | 3 | 3 | 0 | 0 | 0 | 1/1 | no | `AuthenticatedRequest` |
| `sso-saml.controller.ts` | `"saas-portal/sso-saml-deep"` | 2 | 2 | 0 | 0 | 0 | 3/3 | no | — |

