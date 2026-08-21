# Tenant model to RLS migration linkage: prisma/schema/marketplace-payouts.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `MarketplaceEarning` | `marketplace_earnings` | no | no | global/ownership review |
| `MarketplacePayoutBatch` | `marketplace_payout_batches` | no | no | global/ownership review |

