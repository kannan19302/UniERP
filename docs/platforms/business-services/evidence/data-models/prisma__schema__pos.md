# Models in prisma/schema/pos.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `Position` | yes | no | 1 | 0 | 2 | tenant signal |
| `PosShiftCashDrawer` | yes | no | 1 | 0 | 2 | tenant signal |
| `PosShiftTransaction` | yes | no | 1 | 0 | 2 | tenant signal |
| `PosRegister2` | yes | no | 8 | 0 | 3 | tenant signal |
| `PosPaymentMethod` | yes | no | 0 | 0 | 1 | tenant signal |
| `PosRefund` | yes | no | 2 | 0 | 3 | tenant signal |
| `PosRefundItem` | yes | no | 3 | 0 | 2 | tenant signal |
| `PosGiftCard2` | yes | no | 2 | 0 | 2 | tenant signal |
| `PosGiftCardTransaction2` | yes | no | 2 | 0 | 2 | tenant signal |
| `PosCustomerDisplay` | yes | no | 0 | 0 | 2 | tenant signal |
| `PosOrderType` | yes | no | 0 | 0 | 1 | tenant signal |
| `PosDiscountRule` | yes | no | 3 | 0 | 2 | tenant signal |
| `PosTaxRule` | yes | no | 1 | 0 | 1 | tenant signal |
| `PosKitchenDisplay` | yes | no | 0 | 0 | 1 | tenant signal |
| `PosKitchenOrder` | yes | no | 0 | 0 | 4 | tenant signal |
| `PosSplitPayment` | yes | no | 1 | 0 | 2 | tenant signal |

