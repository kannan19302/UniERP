# Tenant model to RLS migration linkage: prisma/schema/field-service.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `WorkOrder` | `work_orders` | yes | no | RLS LINK GAP |
| `WorkOrderOperation` | `work_order_operations` | yes | no | RLS LINK GAP |
| `WorkOrderComponentConsumption` | `work_order_component_consumptions` | yes | no | RLS LINK GAP |
| `FieldSalesRoute` | `field_sales_routes` | yes | no | RLS LINK GAP |
| `FieldSalesRouteStop` | `field_sales_route_stops` | yes | no | RLS LINK GAP |
| `FieldSalesCheckin` | `field_sales_checkins` | yes | no | RLS LINK GAP |
| `FieldSalesExpense` | `field_sales_expenses` | yes | no | RLS LINK GAP |
| `FieldSalesMeetingReport` | `field_sales_meeting_reports` | yes | no | RLS LINK GAP |
| `FieldServiceSla` | `field_service_slas` | yes | no | RLS LINK GAP |
| `FieldServiceTicket` | `field_service_tickets` | yes | no | RLS LINK GAP |
| `FieldServiceTechnician` | `field_service_technicians` | yes | no | RLS LINK GAP |
| `FieldServiceDispatch` | `field_service_dispatches` | yes | no | RLS LINK GAP |
| `FieldServiceAppointment` | `field_service_appointments` | yes | no | RLS LINK GAP |
| `FieldServiceChecklist` | `field_service_checklists` | yes | no | RLS LINK GAP |
| `FieldServiceInventoryItem` | `field_service_inventory_items` | yes | no | RLS LINK GAP |
| `FieldServiceContract` | `field_service_contracts` | yes | no | RLS LINK GAP |
| `FieldServiceTimesheet` | `field_service_timesheets` | yes | no | RLS LINK GAP |
| `FieldServicePartsUsage` | `field_service_parts_usage` | yes | no | RLS LINK GAP |
| `FieldServiceTechnicianDashboard` | `field_service_technician_dashboards` | yes | no | RLS LINK GAP |
| `FieldServiceSchedule` | `field_service_schedules` | yes | no | RLS LINK GAP |
| `FieldServiceCalendarEvent` | `field_service_calendar_events` | yes | no | RLS LINK GAP |
| `FieldServicePartRequest` | `field_service_part_requests` | yes | no | RLS LINK GAP |
| `FieldServiceVanStock` | `field_service_van_stock` | yes | no | RLS LINK GAP |
| `FieldServiceWarranty` | `field_service_warranties` | yes | no | RLS LINK GAP |
| `FieldServiceWorkOrderExpense` | `field_service_work_order_expenses` | yes | no | RLS LINK GAP |
| `FieldServiceInspectionChecklist` | `field_service_inspection_checklists` | yes | no | RLS LINK GAP |

