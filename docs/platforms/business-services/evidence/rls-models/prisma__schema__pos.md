# Tenant model to RLS migration linkage: prisma/schema/pos.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `Position` | `positions` | yes | no | RLS LINK GAP |
| `PosShiftCashDrawer` | `pos_shift_cash_drawers` | yes | no | RLS LINK GAP |
| `PosShiftTransaction` | `pos_shift_transactions` | yes | no | RLS LINK GAP |
| `PosRegister2` | `pos_registers_v2` | yes | no | RLS LINK GAP |
| `PosPaymentMethod` | `pos_payment_methods` | yes | no | RLS LINK GAP |
| `PosRefund` | `pos_refunds` | yes | no | RLS LINK GAP |
| `PosRefundItem` | `pos_refund_items` | yes | no | RLS LINK GAP |
| `PosGiftCard2` | `pos_gift_cards_v2` | yes | no | RLS LINK GAP |
| `PosGiftCardTransaction2` | `pos_gift_card_transactions_v2` | yes | no | RLS LINK GAP |
| `PosCustomerDisplay` | `pos_customer_displays` | yes | no | RLS LINK GAP |
| `PosOrderType` | `pos_order_types` | yes | no | RLS LINK GAP |
| `PosDiscountRule` | `pos_discount_rules` | yes | no | RLS LINK GAP |
| `PosTaxRule` | `pos_tax_rules` | yes | no | RLS LINK GAP |
| `PosKitchenDisplay` | `pos_kitchen_displays` | yes | no | RLS LINK GAP |
| `PosKitchenOrder` | `pos_kitchen_orders` | yes | no | RLS LINK GAP |
| `PosSplitPayment` | `pos_split_payments` | yes | no | RLS LINK GAP |

