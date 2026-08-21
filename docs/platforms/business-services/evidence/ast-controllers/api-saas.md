# AST controller summary: api/modules/saas

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `activity-feed.controller.ts` | `"saas/activity"` | 10 | 10 | 0 | 0 | 0 | 17/17 | no | `z.infer<typeof recordEventSchema>` |
| `addon-admin.controller.ts` | `"saas/admin/addons"` | 12 | 12 | 0 | 0 | 0 | 19/19 | no | `z.infer<typeof createAddonSchema>`, `z.infer<typeof updateAddonSchema>` |
| `addons.controller.ts` | `"saas/addons"` | 4 | 4 | 0 | 0 | 0 | 6/6 | no | `z.infer<typeof purchaseAddonSchema>` |
| `analytics-ext.controller.ts` | `"saas/analytics"` | 15 | 15 | 0 | 0 | 0 | 6/6 | no | `z.infer<typeof customAnalyticsSchema>` |
| `announcements.controller.ts` | `"saas/announcements"` | 4 | 4 | 0 | 0 | 0 | 7/7 | no | `z.infer<typeof createAnnouncementSchema>` |
| `api-keys.controller.ts` | `"saas/api-keys"` | 8 | 8 | 0 | 0 | 0 | 17/17 | no | `z.infer<typeof createApiKeySchema>`, `z.infer<typeof setExpirySchema>`, `z.infer<typeof updateApiKeySchema>` |
| `billing-admin.controller.ts` | `"saas/admin/billing"` | 16 | 16 | 0 | 0 | 0 | 20/20 | no | `z.infer<typeof adjustInvoiceSchema>`, `z.infer<typeof processRefundSchema>` |
| `billing-portal.controller.ts` | `"saas/billing"` | 15 | 15 | 0 | 0 | 0 | 24/24 | no | `z.infer<typeof updateBillingAddressSchema>`, `z.infer<typeof updateTaxDetailsSchema>` |
| `billing-webhook.controller.ts` | `"billing-webhooks"` | 2 | 0 | 2 | 0 | 0 | 4/4 | no | — |
| `billing.controller.ts` | `"billing"` | 6 | 6 | 0 | 0 | 0 | 7/7 | no | — |
| `branding.controller.ts` | `"saas/branding"` | 6 | 6 | 0 | 0 | 0 | 9/9 | no | `z.infer<typeof updateBrandingSchema>` |
| `compliance.controller.ts` | `"saas/compliance"` | 14 | 14 | 0 | 0 | 0 | 20/20 | no | `z.infer<typeof generateReportSchema>`, `z.infer<typeof requestCertificationSchema>`, `z.infer<typeof requestDataErasureSchema>`, `z.infer<typeof requestGdprExportSchema>`, `z.infer<typeof signDpaSchema>` |
| `contracts.controller.ts` | `"saas/contracts"` | 12 | 12 | 0 | 0 | 0 | 23/23 | no | `z.infer<typeof createContractSchema>`, `z.infer<typeof createTemplateSchema>`, `z.infer<typeof updateContractSchema>` |
| `coupons-admin.controller.ts` | `"saas/admin/coupons"` | 12 | 12 | 0 | 0 | 0 | 23/23 | no | `z.infer<typeof bulkCreateCouponsSchema>`, `z.infer<typeof createCouponSchema>`, `z.infer<typeof updateCouponSchema>` |
| `customer-billing.controller.ts` | `"saas/customer-billing"` | 16 | 16 | 0 | 0 | 0 | 24/24 | no | `z.infer<typeof applyCreditBalanceSchema>`, `z.infer<typeof applyDiscountCodeSchema>`, `z.infer<typeof resolveDunningSchema>`, `z.infer<typeof setBillingCurrencySchema>`, `z.infer<typeof updateBillingCommPrefsSchema>`, `z.infer<typeof updateCustomerProfileSchema>` |
| `data-export.controller.ts` | `"saas/exports"` | 7 | 7 | 0 | 0 | 0 | 10/10 | no | `z.infer<typeof requestExportSchema>` |
| `domains.controller.ts` | `"saas/domains"` | 8 | 8 | 0 | 0 | 0 | 15/15 | no | `z.infer<typeof addDomainSchema>` |
| `feature-flags.controller.ts` | `"saas/feature-flags"` | 14 | 14 | 0 | 0 | 0 | 28/28 | no | `z.infer<typeof assignFeatureSchema>`, `z.infer<typeof createFeatureFlagSchema>`, `z.infer<typeof createGateSchema>`, `z.infer<typeof evaluateAccessSchema>`, `z.infer<typeof updateFeatureFlagSchema>`, `z.infer<typeof updateGateSchema>` |
| `health.controller.ts` | `"saas/health"` | 8 | 8 | 0 | 0 | 0 | 2/2 | no | — |
| `integrations-compliance.controller.ts` | `"saas/integrations-compliance"` | 16 | 16 | 0 | 0 | 0 | 31/31 | no | — |
| `integrations.controller.ts` | `"saas/integrations"` | 14 | 14 | 0 | 0 | 0 | 20/20 | no | `z.infer<typeof createIntegrationSchema>`, `z.infer<typeof updateIntegrationSchema>` |
| `invoice-engine.controller.ts` | `"saas/invoices"` | 9 | 9 | 0 | 0 | 0 | 18/18 | no | `z.infer<typeof generateInvoiceSchema>` |
| `invoice-templates.controller.ts` | `"saas/invoice-templates"` | 12 | 12 | 0 | 0 | 0 | 22/22 | no | `z.infer<typeof createInvoiceTemplateSchema>`, `z.infer<typeof previewInvoiceSchema>`, `z.infer<typeof testGenerateSchema>`, `z.infer<typeof updateInvoiceTemplateSchema>`, `z.infer<typeof uploadLogoSchema>` |
| `marketplace-lifecycle.controller.ts` | `"saas/marketplace-lifecycle"` | 16 | 16 | 0 | 0 | 0 | 34/34 | no | — |
| `marketplace.controller.ts` | `"saas/marketplace"` | 15 | 15 | 0 | 0 | 0 | 26/26 | no | `z.infer<typeof configureAppSchema>`, `z.infer<typeof submitAppReviewSchema>` |
| `metering-engine.controller.ts` | `"saas/metering-engine-deep"` | 4 | 4 | 0 | 0 | 0 | 6/6 | no | — |
| `migration.controller.ts` | `"saas/admin/migrations"` | 10 | 10 | 0 | 0 | 0 | 16/16 | no | `z.infer<typeof createMigrationTemplateSchema>`, `z.infer<typeof startMigrationSchema>`, `z.infer<typeof validateMigrationSchema>` |
| `notification-prefs.controller.ts` | `"saas/notifications"` | 12 | 12 | 0 | 0 | 0 | 19/19 | no | `z.infer<typeof scheduleNotificationSchema>`, `z.infer<typeof sendTestNotificationSchema>`, `z.infer<typeof updateDigestSettingsSchema>`, `z.infer<typeof updateNotificationChannelsSchema>`, `z.infer<typeof updateNotificationPrefsSchema>`, `z.infer<typeof verifyChannelSchema>` |
| `onboarding-flow.controller.ts` | `"saas/onboarding-flow-deep"` | 2 | 2 | 0 | 0 | 0 | 3/3 | no | — |
| `onboarding.controller.ts` | `"saas/onboarding"` | 15 | 15 | 0 | 0 | 0 | 13/13 | no | — |
| `payment-methods.controller.ts` | `"saas"` | 8 | 8 | 0 | 0 | 0 | 14/14 | no | `z.infer<typeof addPaymentMethodSchema>`, `z.infer<typeof refundSchema>` |
| `payments-ext.controller.ts` | `"saas/payments"` | 12 | 12 | 0 | 0 | 0 | 21/21 | no | `z.infer<typeof addPaymentMethodSchema>`, `z.infer<typeof makePaymentSchema>` |
| `plan-engine.controller.ts` | `"saas/plans"` | 15 | 15 | 0 | 0 | 0 | 33/33 | no | `z.infer<typeof addFeatureSchema>`, `z.infer<typeof createPlanSchema>`, `z.infer<typeof setPriceSchema>`, `z.infer<typeof updateFeatureSchema>`, `z.infer<typeof updatePlanSchema>`, `z.infer<typeof updatePriceSchema>` |
| `profile.controller.ts` | `"saas/profile"` | 12 | 12 | 0 | 0 | 0 | 18/18 | no | `z.infer<typeof updateCompanySchema>`, `z.infer<typeof updateIndustrySchema>`, `z.infer<typeof updateLocaleSchema>`, `z.infer<typeof updateProfileSchema>`, `z.infer<typeof updateRetentionSchema>`, `z.infer<typeof updateTimezoneSchema>` |
| `quota-guard.controller.ts` | `"saas/quota-guard-deep"` | 4 | 4 | 0 | 0 | 0 | 6/6 | no | — |
| `reports.controller.ts` | `"saas/reports"` | 15 | 15 | 0 | 0 | 0 | 19/19 | no | `z.infer<typeof generateReportSchema>`, `z.infer<typeof scheduleReportSchema>` |
| `revenue-churn-health.controller.ts` | `"saas/revenue-churn-health"` | 12 | 12 | 0 | 0 | 0 | 17/17 | no | — |
| `saas-expansion.controller.ts` | `"saas"` | 55 | 55 | 0 | 0 | 0 | 112/112 | no | `AuthenticatedRequest` |
| `saas.controller.ts` | `"saas"` | 13 | 13 | 0 | 0 | 0 | 13/13 | no | `AuthenticatedRequest`, `Request` |
| `security.controller.ts` | `"saas/security"` | 16 | 16 | 0 | 0 | 0 | 21/21 | no | `z.infer<typeof createApiKeySchema>`, `z.infer<typeof updateIpRestrictionsSchema>`, `z.infer<typeof updatePasswordPolicySchema>` |
| `sso-config.controller.ts` | `"saas/sso"` | 8 | 8 | 0 | 0 | 0 | 9/9 | no | `z.infer<typeof createSsoConfigSchema>`, `z.infer<typeof updateSsoConfigSchema>` |
| `subscription-lifecycle.controller.ts` | `"saas/subscription"` | 18 | 18 | 0 | 0 | 0 | 24/24 | no | `z.infer<typeof addCreditsSchema>`, `z.infer<typeof changeBillingPeriodSchema>`, `z.infer<typeof changePlanSchema>`, `z.infer<typeof extendTrialSchema>`, `z.infer<typeof redeemCouponSchema>` |
| `support-admin.controller.ts` | `"saas/support-admin"` | 16 | 16 | 0 | 0 | 0 | 31/31 | no | `z.infer<typeof addStaffMessageSchema>`, `z.infer<typeof assignTicketSchema>`, `z.infer<typeof configureAutoResponderSchema>`, `z.infer<typeof updateTicketPrioritySchema>`, `z.infer<typeof updateTicketStatusSchema>` |
| `support-tickets.controller.ts` | `"saas/support"` | 10 | 10 | 0 | 0 | 0 | 25/25 | no | `z.infer<typeof addMessageSchema>`, `z.infer<typeof assignTicketSchema>`, `z.infer<typeof createTicketSchema>`, `z.infer<typeof updateTicketSchema>` |
| `system-admin.controller.ts` | `"saas/admin/system"` | 18 | 18 | 0 | 0 | 0 | 22/22 | no | `z.infer<typeof toggleMaintenanceModeSchema>`, `z.infer<typeof updateSystemConfigSchema>` |
| `tenant-admin.controller.ts` | `"saas/admin"` | 12 | 12 | 0 | 0 | 0 | 10/10 | no | — |
| `tenant-provisioning.controller.ts` | `"saas/admin/provisioning"` | 14 | 14 | 0 | 0 | 0 | 26/26 | no | `z.infer<typeof bulkProvisionSchema>`, `z.infer<typeof createProvisioningTemplateSchema>`, `z.infer<typeof downgradeTenantPlanSchema>`, `z.infer<typeof provisionTenantSchema>`, `z.infer<typeof upgradeTenantPlanSchema>` |
| `usage-alerts.controller.ts` | `"saas/alerts"` | 9 | 9 | 0 | 0 | 0 | 15/15 | no | `z.infer<typeof bulkUpdateRulesSchema>`, `z.infer<typeof createAlertRuleSchema>`, `z.infer<typeof updateAlertRuleSchema>` |
| `usage-analytics.controller.ts` | `"saas/usage"` | 17 | 17 | 0 | 0 | 0 | 23/23 | no | `z.infer<typeof exportUsageSchema>` |
| `webhooks.controller.ts` | `"saas/webhooks"` | 14 | 14 | 0 | 0 | 0 | 26/26 | no | `z.infer<typeof createEndpointSchema>`, `z.infer<typeof updateEndpointSchema>` |

