# AST controller summary: api/modules/inventory

Generated with the TypeScript compiler AST. Permission/public/skip counts are method-level literal decorator signals; composed guards and global policy still require runtime resolution.

| Controller file | Prefix | HTTP methods | Methods with Permissions | Public methods | Skip-tenant methods | Explicit return types | Typed params / total | Adjacent spec | DTO/type signals |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
| `asl.controller.ts` | `"inventory/asl"` | 22 | 22 | 0 | 0 | 0 | 53/53 | no | `AuthRequest` |
| `asn.controller.ts` | `"inventory/asn"` | 13 | 12 | 0 | 0 | 0 | 33/33 | no | `AuthRequest` |
| `catch-weight-recall.controller.ts` | `"inventory/catch-weight-recall"` | 23 | 23 | 0 | 0 | 0 | 51/51 | no | `AuthRequest` |
| `cold-chain-writeoff.controller.ts` | `"api/inventory/cold-chain-writeoff"` | 19 | 19 | 0 | 0 | 0 | 40/40 | no | `AuthRequest` |
| `container-pallet.controller.ts` | `"inventory/container-pallet"` | 25 | 25 | 0 | 0 | 0 | 59/59 | no | `AuthRequest` |
| `costing-methods.controller.ts` | `"inventory/costing"` | 10 | 10 | 0 | 0 | 0 | 22/22 | no | `AuthRequest` |
| `costing.controller.ts` | `"inventory/costing"` | 4 | 4 | 0 | 0 | 0 | 9/9 | no | — |
| `cross-dock.controller.ts` | `"inventory/cross-dock"` | 12 | 12 | 0 | 0 | 0 | 29/29 | no | `AuthRequest` |
| `customer-returns.controller.ts` | `"api/inventory/customer-returns"` | 14 | 14 | 0 | 0 | 0 | 33/33 | no | `AuthRequest` |
| `demand-forecasting.controller.ts` | `"inventory/demand-forecasting"` | 28 | 28 | 0 | 0 | 0 | 60/60 | no | — |
| `freight-claims.controller.ts` | `"inventory/freight-claims"` | 12 | 12 | 0 | 0 | 0 | 26/26 | no | `AuthRequest` |
| `hazmat.controller.ts` | `"inventory/hazmat"` | 35 | 35 | 0 | 0 | 0 | 79/79 | no | `AuthRequest` |
| `inventory-analytics.controller.ts` | `"inventory/analytics"` | 9 | 9 | 0 | 0 | 0 | 19/19 | no | — |
| `inventory-atp-ctp.controller.ts` | `"inventory/atp-ctp"` | 9 | 9 | 0 | 0 | 0 | 23/23 | no | — |
| `inventory-automation.controller.ts` | `"inventory/automation"` | 10 | 10 | 0 | 0 | 0 | 23/23 | no | — |
| `inventory-customer-consignment.controller.ts` | `"inventory/customer-consignment"` | 7 | 7 | 0 | 0 | 0 | 18/18 | no | — |
| `inventory-cycle-counting-deep.controller.ts` | `"inventory/cycle-counting-deep"` | 3 | 3 | 0 | 0 | 0 | 4/4 | no | `AuthenticatedRequest` |
| `inventory-dropship.controller.ts` | `"inventory/drop-ship"` | 10 | 10 | 0 | 0 | 0 | 26/26 | no | — |
| `inventory-drp.controller.ts` | `"inventory/drp"` | 6 | 6 | 0 | 0 | 0 | 20/20 | no | — |
| `inventory-edi-inventory.controller.ts` | `"inventory/edi"` | 5 | 5 | 0 | 0 | 0 | 14/14 | no | — |
| `inventory-enterprise.controller.ts` | `"inventory/enterprise"` | 9 | 9 | 0 | 0 | 0 | 20/20 | no | — |
| `inventory-labor.controller.ts` | `"inventory/labor"` | 12 | 12 | 0 | 0 | 0 | 31/31 | no | — |
| `inventory-logistics.controller.ts` | `"inventory/logistics"` | 25 | 25 | 0 | 0 | 0 | 63/63 | no | `typeof addTrackingEventSchema._type`, `typeof createAsnSchema._type`, `typeof createCarrierSchema._type`, `typeof createInboundShipmentSchema._type`, `typeof createOutboundShipmentSchema._type`, `typeof createServiceLevelSchema._type`, `typeof receiveAsnSchema._type` |
| `inventory-lpn-tracking-deep.controller.ts` | `"inventory/lpn-tracking-deep"` | 4 | 4 | 0 | 0 | 0 | 7/7 | no | `AuthenticatedRequest` |
| `inventory-rfid.controller.ts` | `"inventory/rfid"` | 12 | 12 | 0 | 0 | 0 | 34/34 | no | — |
| `inventory-rma.controller.ts` | `"inventory/rma"` | 7 | 7 | 0 | 0 | 0 | 19/19 | no | `AuthRequest`, `z.infer<typeof createRmaSchema>`, `z.infer<typeof inspectRmaSchema>`, `z.infer<typeof receiveRmaSchema>` |
| `inventory-serial-batch-genealogy-deep.controller.ts` | `"inventory/serial-batch-genealogy-deep"` | 3 | 3 | 0 | 0 | 0 | 6/6 | no | `AuthenticatedRequest` |
| `inventory-subinventory.controller.ts` | `"inventory/subinventory"` | 6 | 6 | 0 | 0 | 0 | 16/16 | no | — |
| `inventory-warehouse-slotting-deep.controller.ts` | `"inventory/warehouse-slotting-deep"` | 4 | 4 | 0 | 0 | 0 | 7/7 | no | `AuthenticatedRequest` |
| `inventory-wave-planning.controller.ts` | `"inventory"` | 12 | 12 | 0 | 0 | 0 | 30/30 | no | `AuthRequest`, `z.infer<typeof createWavePlanSchema>`, `z.infer<typeof optimizeSafetyStockSchema>`, `z.infer<typeof recordKpiSchema>` |
| `inventory.controller.ts` | `"inventory"` | 154 | 154 | 0 | 0 | 0 | 413/413 | no | `AddLicensePlateItemInput`, `AssembleKitInput`, `AuthenticatedRequest`, `BulkActionInput`, `CompletePutawayTaskInput`, `CreateBatchInput`, `CreateBinLocationInput`, `CreateCategoryInput`, `CreateConsignmentStockInput`, `CreateCycleCountInput`, `CreateCycleCountScheduleInput`, `CreateDockAppointmentInput`, `CreateKitInput`, `CreateKitVersionInput`, `CreateLicensePlateInput`, `CreatePickWaveInput`, `CreateProductInput`, `CreatePutawayTaskInput`, `CreateQAInspectionInput`, `CreateQAInspectionTemplateInput`, `CreateReorderRuleInput`, `CreateRequisitionFromReorderRuleInput`, `CreateSerialNumberInput`, `CreateStockEntryInput`, `CreateStockReservationInput`, `CreateTransferApprovalRuleInput`, `CreateVariantInput`, `CreateWarehouseInput`, `DisassembleKitInput`, `MoveLicensePlateInput`, `QuarantineBatchInput`, `ReceiveWithTraceabilityInput`, `RecordConsignmentConsumptionInput`, `RecordPickInput`, `RejectTransferInput`, `ReleaseBatchQuarantineInput`, `SubmitCycleCountInput`, `SubmitQAInspectionInput`, `TransferStockInput`, `UpdateBatchInput`, `UpdateCategoryInput`, `UpdateCycleCountScheduleInput`, `UpdateDockAppointmentInput`, `UpdateProductInput`, `UpdateQAInspectionTemplateInput`, `UpdateSerialNumberInput`, `UpdateTransferApprovalRuleInput`, `UpdateWarehouseInput` |
| `landed-cost.controller.ts` | `"inventory/landed-cost"` | 19 | 19 | 0 | 0 | 0 | 43/43 | no | `AuthRequest` |
| `lot-expiry.controller.ts` | `"inventory/lot-expiry"` | 13 | 13 | 0 | 0 | 0 | 27/27 | no | `AuthRequest` |
| `lot-serial-tracking.controller.ts` | `"inventory/lot-serial"` | 28 | 28 | 0 | 0 | 0 | 65/65 | no | `z.infer<typeof confirmPickSchema>`, `z.infer<typeof createBatchSchema>`, `z.infer<typeof createSerialSchema>`, `z.infer<typeof generateExpiryAlertsSchema>`, `z.infer<typeof generatePickSuggestionsSchema>`, `z.infer<typeof quarantineOrderSchema>`, `z.infer<typeof recordLotMovementSchema>`, `z.infer<typeof releaseQuarantineSchema>`, `z.infer<typeof scrapNotesSchema>`, `z.infer<typeof soldSchema>` |
| `minmax-replen.controller.ts` | `"api/inventory/minmax-replen"` | 11 | 11 | 0 | 0 | 0 | 22/22 | no | `AuthRequest` |
| `packaging-gs1.controller.ts` | `"inventory/packaging-gs1"` | 21 | 21 | 0 | 0 | 0 | 42/42 | no | `AuthRequest` |
| `pick-waves.controller.ts` | `"inventory/pick-waves"` | 14 | 14 | 0 | 0 | 0 | 33/33 | no | `AuthRequest` |
| `quality-compliance.controller.ts` | `"inventory/quality-compliance"` | 31 | 31 | 0 | 0 | 0 | 79/79 | no | `typeof addCapaActionSchema._type`, `typeof createCalibrationSchema._type`, `typeof createCapaSchema._type`, `typeof createDeviationSchema._type`, `typeof createSopSchema._type`, `typeof recordCalibrationResultSchema._type` |
| `rtv.controller.ts` | `"inventory/rtv"` | 18 | 18 | 0 | 0 | 0 | 45/45 | no | `CreateReasonCodeInput`, `CreateRmaRequestInput`, `CreateShipmentInput`, `RecordCreditMemoInput`, `RejectRmaInput`, `UpdateReasonCodeInput`, `UpdateRmaStatusInput` |
| `settings.controller.ts` | `"inventory/settings"` | 0 | 0 | 0 | 0 | 0 | 0/0 | no | — |
| `shipment-tracking.controller.ts` | `"inventory/shipment-tracking"` | 12 | 12 | 0 | 0 | 0 | 32/32 | no | `AuthRequest` |
| `stock-take.controller.ts` | `"inventory/stock-takes"` | 20 | 20 | 0 | 0 | 0 | 49/49 | no | `AuthRequest` |
| `stock-valuation.controller.ts` | `"inventory/stock-valuation"` | 22 | 22 | 0 | 0 | 0 | 43/43 | no | `AuthRequest` |
| `supplier-quality.controller.ts` | `"inventory/supplier-quality"` | 12 | 12 | 0 | 0 | 0 | 27/27 | no | — |
| `transfer-orders.controller.ts` | `"inventory/transfer-orders"` | 16 | 16 | 0 | 0 | 0 | 38/38 | no | `AuthRequest` |
| `velocity-abc-xyz.controller.ts` | `"api/inventory/velocity-abc-xyz"` | 14 | 14 | 0 | 0 | 0 | 30/30 | no | `AuthRequest` |
| `vmi.controller.ts` | `"inventory/vmi"` | 12 | 12 | 0 | 0 | 0 | 24/24 | no | `AuthRequest` |
| `warehouse-ops.controller.ts` | `"inventory/warehouse-ops"` | 30 | 30 | 0 | 0 | 0 | 66/66 | no | `z.infer<typeof addCartonSchema>`, `z.infer<typeof assignTaskSchema>`, `z.infer<typeof createBinTransferSchema>`, `z.infer<typeof createGrnSchema>`, `z.infer<typeof createPackingSessionSchema>`, `z.infer<typeof createWarehouseTaskSchema>`, `z.infer<typeof rejectGrnSchema>`, `z.infer<typeof rejectTransferSchema>`, `z.infer<typeof verifyGrnLinesSchema>` |
| `yard-management.controller.ts` | `"inventory/yard-management"` | 26 | 26 | 0 | 0 | 0 | 62/62 | no | `AuthRequest` |

