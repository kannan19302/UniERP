# Tenant model to RLS migration linkage: prisma/schema/core-part-1.prisma

Lexical linkage compares effective Prisma table names with tables named by RLS ENABLE/FORCE/CREATE POLICY migration statements. A match is structural evidence, not a runtime policy test.

| Model | Effective table | tenantId | Named by RLS migration | Status |
| --- | --- | --- | --- | --- |
| `Tenant` | `tenants` | no | no | global/ownership review |
| `TenantLifecycleEvent` | `tenant_lifecycle_events` | yes | no | RLS LINK GAP |
| `SavedView` | `saved_views` | yes | no | RLS LINK GAP |
| `Passkey` | `passkeys` | no | no | global/ownership review |
| `Organization` | `organizations` | yes | no | RLS LINK GAP |
| `Department` | `departments` | yes | no | RLS LINK GAP |
| `Customer` | `customers` | yes | no | RLS LINK GAP |
| `Vendor` | `vendors` | yes | no | RLS LINK GAP |
| `Contact` | `contacts` | yes | no | RLS LINK GAP |
| `SalesPipeline` | `sales_pipelines` | yes | no | RLS LINK GAP |
| `ForecastSnapshot` | `forecast_snapshots` | yes | no | RLS LINK GAP |
| `Quota` | `quotas` | yes | no | RLS LINK GAP |
| `DealTag` | `deal_tags` | yes | no | RLS LINK GAP |
| `DealTeamMember` | `deal_team_members` | yes | no | RLS LINK GAP |
| `PipelineRiskAlert` | `pipeline_risk_alerts` | yes | no | RLS LINK GAP |
| `PortalPaymentIntent` | `portal_payment_intents` | yes | no | RLS LINK GAP |
| `ContactRole` | `contact_roles` | yes | no | RLS LINK GAP |
| `CustomerHealthLog` | `customer_health_logs` | yes | no | RLS LINK GAP |
| `Activity` | `activities` | yes | no | RLS LINK GAP |
| `CoachingRubric` | `coaching_rubrics` | yes | no | RLS LINK GAP |
| `CallScorecard` | `call_scorecards` | yes | no | RLS LINK GAP |
| `CoachingLibraryItem` | `coaching_library_items` | yes | no | RLS LINK GAP |
| `DealRoom` | `deal_rooms` | yes | no | RLS LINK GAP |
| `DealRoomMilestone` | `deal_room_milestones` | yes | no | RLS LINK GAP |
| `DealRoomStakeholder` | `deal_room_stakeholders` | yes | no | RLS LINK GAP |
| `DealRoomDocument` | `deal_room_documents` | yes | no | RLS LINK GAP |
| `DealRiskDigestRun` | `deal_risk_digest_runs` | yes | no | RLS LINK GAP |
| `EmailTemplate` | `email_templates` | yes | no | RLS LINK GAP |
| `AuditLog` | `audit_logs` | yes | no | RLS LINK GAP |
| `Setting` | `settings` | yes | no | RLS LINK GAP |
| `AppSettings` | `app_settings` | yes | yes | STRUCTURAL LINK |
| `PlatformCredential` | `platform_credentials` | no | no | global/ownership review |
| `PurchaseOrder` | `purchase_orders` | yes | no | RLS LINK GAP |
| `PurchaseOrderItem` | `purchase_order_items` | yes | no | RLS LINK GAP |
| `PurchaseReceipt` | `purchase_receipts` | yes | no | RLS LINK GAP |
| `PurchaseReceiptItem` | `purchase_receipt_items` | yes | no | RLS LINK GAP |
| `RFQ` | `rfqs` | yes | no | RLS LINK GAP |
| `RFQItem` | `rfq_items` | yes | no | RLS LINK GAP |
| `SupplierQuotation` | `supplier_quotations` | yes | no | RLS LINK GAP |
| `SupplierQuotationItem` | `supplier_quotation_items` | yes | no | RLS LINK GAP |
| `Quotation` | `quotations` | yes | no | RLS LINK GAP |
| `QuotationItem` | `quotation_items` | yes | no | RLS LINK GAP |
| `SalesOrder` | `sales_orders` | yes | no | RLS LINK GAP |
| `SalesOrderItem` | `sales_order_items` | yes | no | RLS LINK GAP |
| `DeliveryNote` | `delivery_notes` | yes | no | RLS LINK GAP |
| `DeliveryNoteItem` | `delivery_note_items` | yes | no | RLS LINK GAP |
| `Shipment` | `shipments` | yes | no | RLS LINK GAP |
| `ChangeRequest` | `change_requests` | yes | no | RLS LINK GAP |
| `Timesheet` | `timesheets` | yes | no | RLS LINK GAP |
| `BOM` | `boms` | yes | no | RLS LINK GAP |
| `BOMItem` | `bom_items` | yes | no | RLS LINK GAP |
| `Dashboard` | `dashboards` | yes | no | RLS LINK GAP |
| `Report` | `reports` | yes | no | RLS LINK GAP |
| `KPI` | `kpis` | yes | no | RLS LINK GAP |
| `Folder` | `folders` | yes | no | RLS LINK GAP |
| `Document` | `documents` | yes | no | RLS LINK GAP |
| `DocumentVersion` | `document_versions` | yes | no | RLS LINK GAP |
| `FolderShare` | `folder_shares` | yes | no | RLS LINK GAP |
| `DocumentShare` | `document_shares` | yes | no | RLS LINK GAP |
| `DocumentTemplate` | `document_templates` | yes | no | RLS LINK GAP |
| `DocumentCategory` | `document_categories` | yes | no | RLS LINK GAP |
| `DocumentApproval` | `document_approvals` | yes | no | RLS LINK GAP |
| `Signature` | `signatures` | yes | no | RLS LINK GAP |
| `Channel` | `channels` | yes | no | RLS LINK GAP |
| `Message` | `messages` | yes | no | RLS LINK GAP |
| `ConnectSpace` | `connect_spaces` | yes | no | RLS LINK GAP |
| `ChannelMember` | `channel_members` | yes | no | RLS LINK GAP |
| `ChannelRead` | `channel_reads` | yes | no | RLS LINK GAP |
| `MessageReaction` | `message_reactions` | yes | no | RLS LINK GAP |
| `MessageBookmark` | `message_bookmarks` | yes | no | RLS LINK GAP |
| `UserPresence` | `user_presence` | yes | no | RLS LINK GAP |
| `ConnectMeeting` | `connect_meetings` | yes | no | RLS LINK GAP |
| `CalendarEvent` | `calendar_events` | yes | no | RLS LINK GAP |
| `Notification` | `notifications` | yes | no | RLS LINK GAP |
| `PushDeviceToken` | `push_device_tokens` | yes | no | RLS LINK GAP |
| `ChannelTab` | `channel_tabs` | yes | no | RLS LINK GAP |
| `MessageEdit` | `message_edits` | yes | no | RLS LINK GAP |
| `MessageForward` | `message_forwards` | yes | no | RLS LINK GAP |
| `ChannelModeration` | `channel_moderation` | yes | no | RLS LINK GAP |
| `MeetingParticipant` | `meeting_participants` | yes | no | RLS LINK GAP |
| `MeetingChatMessage` | `meeting_chat_messages` | yes | no | RLS LINK GAP |
| `MeetingRecording` | `meeting_recordings` | yes | no | RLS LINK GAP |
| `ConnectBot` | `connect_bots` | yes | no | RLS LINK GAP |
| `UserStatusSchedule` | `user_status_schedules` | yes | no | RLS LINK GAP |
| `ChannelAnalytics` | `channel_analytics` | yes | no | RLS LINK GAP |
| `ConnectPoll` | `connect_polls` | yes | no | RLS LINK GAP |
| `ConnectPollOption` | `connect_poll_options` | no | no | global/ownership review |
| `ConnectPollVote` | `connect_poll_votes` | yes | no | RLS LINK GAP |
| `CustomEmoji` | `custom_emojis` | yes | no | RLS LINK GAP |
| `Reminder` | `reminders` | yes | no | RLS LINK GAP |
| `ChannelTemplate` | `channel_templates` | yes | no | RLS LINK GAP |
| `MeetingSummary` | `meeting_summaries` | yes | no | RLS LINK GAP |
| `KnowledgeArticle` | `knowledge_articles` | yes | no | RLS LINK GAP |
| `KnowledgeCategory` | `knowledge_categories` | yes | no | RLS LINK GAP |
| `KnowledgeArticleVersion` | `knowledge_article_versions` | yes | no | RLS LINK GAP |
| `KnowledgeArticleRating` | `knowledge_article_ratings` | yes | no | RLS LINK GAP |
| `HelpdeskTicket` | `helpdesk_tickets` | yes | no | RLS LINK GAP |

