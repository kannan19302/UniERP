# Models in prisma/schema/field-service.prisma

Generated structural evidence.

| Model | tenantId | deletedAt | Decimal | Float | indexes/uniques | Review |
| --- | --- | --- | ---: | ---: | ---: | --- |
| `WorkOrder` | yes | no | 7 | 0 | 2 | tenant signal |
| `WorkOrderOperation` | yes | no | 0 | 0 | 2 | tenant signal |
| `WorkOrderComponentConsumption` | yes | no | 1 | 0 | 2 | tenant signal |
| `FieldSalesRoute` | yes | no | 1 | 0 | 2 | tenant signal |
| `FieldSalesRouteStop` | yes | no | 0 | 0 | 2 | tenant signal |
| `FieldSalesCheckin` | yes | no | 0 | 0 | 2 | tenant signal |
| `FieldSalesExpense` | yes | no | 1 | 0 | 2 | tenant signal |
| `FieldSalesMeetingReport` | yes | no | 0 | 0 | 3 | tenant signal |
| `FieldServiceSla` | yes | no | 0 | 0 | 2 | tenant signal |
| `FieldServiceTicket` | yes | no | 3 | 2 | 6 | tenant signal; Float review |
| `FieldServiceTechnician` | yes | no | 3 | 2 | 3 | tenant signal; Float review |
| `FieldServiceDispatch` | yes | no | 0 | 1 | 5 | tenant signal; Float review |
| `FieldServiceAppointment` | yes | no | 0 | 0 | 4 | tenant signal |
| `FieldServiceChecklist` | yes | no | 0 | 0 | 2 | tenant signal |
| `FieldServiceInventoryItem` | yes | no | 1 | 0 | 5 | tenant signal |
| `FieldServiceContract` | yes | no | 4 | 0 | 3 | tenant signal |
| `FieldServiceTimesheet` | yes | no | 8 | 0 | 5 | tenant signal |
| `FieldServicePartsUsage` | yes | no | 2 | 0 | 3 | tenant signal |
| `FieldServiceTechnicianDashboard` | yes | no | 6 | 0 | 4 | tenant signal |
| `FieldServiceSchedule` | yes | no | 0 | 2 | 5 | tenant signal; Float review |
| `FieldServiceCalendarEvent` | yes | no | 0 | 0 | 3 | tenant signal |
| `FieldServicePartRequest` | yes | no | 2 | 0 | 4 | tenant signal |
| `FieldServiceVanStock` | yes | no | 0 | 0 | 3 | tenant signal |
| `FieldServiceWarranty` | yes | no | 0 | 0 | 3 | tenant signal |
| `FieldServiceWorkOrderExpense` | yes | no | 1 | 0 | 2 | tenant signal |
| `FieldServiceInspectionChecklist` | yes | no | 0 | 0 | 2 | tenant signal |

