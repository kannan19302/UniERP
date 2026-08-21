# Tenant model to RLS migration linkage: prisma/schema/web.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `WebhookSubscription` | `webhook_subscriptions` | yes | no | RLS LINK GAP |
| `WebhookDeliveryLog` | `webhook_delivery_logs` | yes | no | RLS LINK GAP |
| `WebAsset` | `web_assets` | yes | no | RLS LINK GAP |
| `WebTemplate` | `web_templates` | yes | no | RLS LINK GAP |
| `WebMenu` | `web_menus` | yes | no | RLS LINK GAP |
| `WebSeo` | `web_seo` | yes | no | RLS LINK GAP |
| `WebSettings` | `web_settings` | yes | no | RLS LINK GAP |
| `WebCollection` | `web_collections` | yes | no | RLS LINK GAP |
| `WebCollectionItem` | `web_collection_items` | yes | no | RLS LINK GAP |
| `WebFormSubmission` | `web_form_submissions` | yes | no | RLS LINK GAP |
| `WebOrder` | `web_orders` | yes | no | RLS LINK GAP |
| `WebSite` | `web_sites` | yes | no | RLS LINK GAP |
| `WebDomain` | `web_domains` | no | no | global/ownership review |
| `WebSitePage` | `web_site_pages` | yes | no | RLS LINK GAP |
| `WebChatbot` | `web_chatbots` | yes | no | RLS LINK GAP |
| `WebToLeadForm` | `web_to_lead_forms` | yes | no | RLS LINK GAP |

