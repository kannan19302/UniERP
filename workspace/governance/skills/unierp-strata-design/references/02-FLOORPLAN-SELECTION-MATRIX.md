# 02 — Floorplan Selection Matrix & Decision Tree

When building or refactoring any page in UniERP (e.g. across the 810 pages of `tenant-apps`), select the floorplan that strictly matches the user's primary mental model and data intensity:

```
                                  USER GOAL
                                      │
         ┌────────────────────────────┼────────────────────────────┐
         ▼                            ▼                            ▼
  BROWSING & FILTERING       SINGLE OBJECT WORK            HIGH-VELOCITY TRIAGE
         │                            │                            │
   DataWorkspace               RecordShell                   SplitViewShell
 (Ledger, List, Grid)      (Detail, Tabs, Summary)       (Queue Left + Inspector Right)
         │                            │
         ▼                            ▼
  MULTI-RECORD TASKS          LINE-ITEM ENTRY
         │                            │
   TabbedConsole            TransactionWorkspace
(Concurrent Records)       (Header + Line Items Grid)
```

## Floorplan Specification & When to Use

| Floorplan Component | Best Suited Modules / Pages | Core UX Anatomy |
| :--- | :--- | :--- |
| **`<DataWorkspace>`** | `finance` (General Ledger, Invoices), `inventory` (Stock Balance), `procurement` (RFQ list) | Filter tray, search bar, batch operations ribbon, 24px/28px virtualized table, pagination bar. |
| **`<RecordShell>`** | `crm` (Account/Contact Detail), `hr` (Employee Profile), `fixed-assets` (Asset Card) | Sticky header, anchor section navigator, KPI summary cards, field sets, audit timeline. |
| **`<TransactionWorkspace>`** | `sales` (Sales Order, Quotation), `procurement` (Purchase Order), `finance` (AP Bill) | Transaction header, editable line-items grid, tax & discount summary card, workflow action bar. |
| **`<TabbedConsole>`** | Operations, Dispatch, Support, Complex Multi-Entity Accounting | Persistent tab strip with dirty state dot (`•`), tab reordering, keyboard tab switching (`Ctrl+Tab`). |
| **`<SplitViewShell>`** | `crm` (Lead Triage Queue), `field-service` (Dispatch Queue), `support` (Ticket Inbox) | Collapsible 300px list queue on Left, active record inspection and quick edit on Right. |
| **`<PlanningWorkspace>`** | `projects` (Gantt Chart), `manufacturing` (Production Scheduling) | Period switcher (Day/Week/Month/Qtr), timeline ruler, interactive task bars, dependency arrows. |
| **`<SettingsShell>`** | Tenant Config, Billing, User Permissions, Integration Settings | Left category list, search, preference cards, dirty change tracker bar at bottom. |
| **`<StudioShell>`** | `workflow` (BPMN Designer), `web-studio` (Page Builder) | Canvas, Left toolbox, Right properties inspector panel, zoom & pan controls. |
