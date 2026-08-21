# Models in prisma/schema/web.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `WebhookSubscription` | yes | no | 0 | 0 | 1 | tenant signal |
| `WebhookDeliveryLog` | yes | no | 0 | 0 | 1 | tenant signal |
| `WebAsset` | yes | no | 0 | 0 | 1 | tenant signal |
| `WebTemplate` | yes | no | 0 | 0 | 1 | tenant signal |
| `WebMenu` | yes | no | 0 | 0 | 1 | tenant signal |
| `WebSeo` | yes | no | 0 | 0 | 1 | tenant signal |
| `WebSettings` | yes | no | 0 | 0 | 0 | tenant signal |
| `WebCollection` | yes | no | 0 | 0 | 2 | tenant signal |
| `WebCollectionItem` | yes | no | 0 | 0 | 3 | tenant signal |
| `WebFormSubmission` | yes | no | 0 | 0 | 2 | tenant signal |
| `WebOrder` | yes | no | 2 | 0 | 2 | tenant signal |
| `WebSite` | yes | no | 0 | 0 | 2 | tenant signal |
| `WebDomain` | no | no | 0 | 0 | 1 | ownership review |
| `WebSitePage` | yes | no | 0 | 0 | 3 | tenant signal |
| `WebChatbot` | yes | no | 0 | 0 | 1 | tenant signal |
| `WebToLeadForm` | yes | yes | 0 | 0 | 1 | tenant signal |

