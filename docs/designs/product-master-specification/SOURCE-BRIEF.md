# MASTER PROMPT — UNIERP PRODUCT MASTER SPECIFICATION

## Role

Act as a combined:

* Chief Product Officer
* Enterprise Architect
* Principal Software Architect
* SaaS Architect
* ERP Domain Architect
* Solution Architect
* Data Architect
* Security Architect
* Cloud/DevOps Architect
* Integration Architect
* AI Architect
* UX/Design-System Architect
* Product Manager
* Business Analyst
* Finance/Revenue Strategist
* Compliance Architect
* QA/Test Architect
* SRE/Observability Architect
* Technical Program Manager

Your responsibility is to create the definitive **UniERP Product Master Specification (PMS)**.

This is not a summary, proposal, overview, pitch deck, or ordinary PRD.

It must become the **single source of truth for building, operating, securing, monetizing, scaling, testing, releasing, and evolving the complete UniERP platform**.

There is NO page limit.

The completed specification may exceed **1,000 pages** if necessary.

Never reduce implementation detail merely to keep the document short.

---

# 1. DOCUMENT TITLE

**UniERP Product Master Specification (PMS)**

Subtitle:

**Business, Product, Functional, Experience, Data, Security, Technical, Architecture, Infrastructure, Operations & Commercial Blueprint**

Document type:

**Authoritative Product Single Source of Truth**

---

# 2. PRIMARY OBJECTIVE

Create one comprehensive master specification from which engineering, product, design, QA, DevOps, security, finance, sales, support, operations, compliance, and leadership teams could build and operate UniERP without relying on undocumented assumptions.

The specification must answer:

1. Why does this product exist?
2. Who is it for?
3. What does it provide?
4. How does every product work?
5. How does every application work?
6. How does every feature work?
7. What are the business rules?
8. What data is involved?
9. How do users interact with it?
10. How do applications interact?
11. How do APIs and events work?
12. How is it secured?
13. How is multi-tenancy enforced?
14. How is it deployed?
15. How is it monitored?
16. How does it scale?
17. How is it monetized?
18. How is it administered?
19. How are failures handled?
20. How is it tested?
21. How is it extended?
22. How does the ecosystem work?
23. How is the platform operated commercially?
24. What must engineering actually implement?

Do not stop at high-level descriptions.

Continue down to **implementation-ready functional specification level**.

---

# 3. CANONICAL UNIERP PRODUCT PORTFOLIO

UniERP contains exactly **six top-level products**.

Do NOT introduce Tenant Apps, Tenant Website, Tenant Web Studio, Tenant Admin Console, PAC, TAC, or Provider Admin OS as separate products.

The canonical portfolio is:

## Product 1 — Marketing Site

Public-facing UniERP digital presence.

Cover:

* Corporate website
* Product pages
* Solution pages
* Industry pages
* Pricing
* Documentation discovery
* Marketplace discovery
* Developer discovery
* Customer stories
* Resources
* SEO
* Lead generation
* Contact/sales flows
* Trial/signup
* Authentication entry points
* Localization
* Content management
* Analytics
* Consent management
* Campaigns
* Legal pages

Define every major page, workflow, integration, data requirement, administrative capability and conversion journey.

---

## Product 2 — Provider Control Center (PCC)

The internal control plane used by the UniERP provider/operator to manage the complete SaaS platform.

Cover at minimum:

* Platform overview
* Global operations
* Organization management
* Tenant lifecycle
* IAM administration
* Subscription management
* Plans
* Entitlements
* Licensing
* Billing
* Invoicing
* Payments
* Usage metering
* Quotas
* Resource allocation
* Infrastructure management
* Cloud-provider management
* Deployment management
* Service health
* Observability
* Incident management
* Security operations
* Security analytics
* Audit
* Compliance
* Risk management
* Secrets/KMS
* Certificates
* API gateway
* Rate limits
* Global configuration
* Feature flags
* Marketplace administration
* Application governance
* Developer ecosystem administration
* Mobile administration
* Desktop administration
* Notification administration
* Communication management
* Support operations
* Data governance
* Backup and disaster recovery
* Telemetry
* Analytics
* Cost management
* FinOps
* Release management

Determine the complete PCC application/module inventory rather than limiting it to this initial list.

---

## Product 3 — Business Applications

The business operating layer of UniERP.

Include the complete application portfolio required for a serious enterprise business platform.

At minimum investigate and specify:

* Finance

* Accounting

* General Ledger

* Accounts Payable

* Accounts Receivable

* Cash Management

* Fixed Assets

* Expense Management

* Budgeting

* Financial Planning

* Tax

* Consolidation

* Revenue Management

* Sales

* CRM

* Leads

* Opportunities

* Accounts

* Contacts

* Quotes

* Orders

* Contracts

* Sales Forecasting

* Customer Service

* Support

* Human Resources

* Core HR

* Employee Management

* Organization Management

* Recruitment

* Onboarding

* Attendance

* Leave

* Payroll

* Performance

* Learning

* Compensation

* Benefits

* Workforce Planning

* Inventory

* Warehouse Management

* Procurement

* Purchasing

* Supplier Management

* Supply Chain

* Logistics

* Transportation

* Demand Planning

* Manufacturing

* BOM

* Routing

* MRP

* Production Planning

* Shop Floor

* Work Orders

* Quality

* Maintenance

* Projects

* Timesheets

* Resource Management

* Professional Services

* POS

* Commerce

* Orders

* Payments

* Customer operations

Determine additional applications necessary for a competitive enterprise platform.

For EACH application, drill down to modules → capabilities → features → workflows → screens → actions → entities → business rules → permissions → APIs → events → reports → analytics → configuration → integrations → edge cases → testing requirements.

---

## Product 4 — Developer Platform

This is one unified product.

It includes BOTH:

### Application / Full-Stack Builder

and

### Website Builder

They are capabilities inside Developer Platform and MUST NOT be represented as independent UniERP products.

Cover:

* Developer workspace
* Application builder
* Full-stack application builder
* Website builder
* Page builder
* UI builder
* Form builder
* Data model builder
* Query builder
* API builder
* Workflow builder
* Automation builder
* Integration builder
* Connector builder
* Extension development
* Plugin development
* Theme development
* Template development
* Component development
* Function/server-side logic
* Event handling
* Scheduled jobs
* Secrets
* Environment variables
* Database integration
* Storage
* Authentication
* Authorization
* Testing
* Debugging
* Preview
* Local development
* Sandbox
* Deployment
* Versioning
* Rollback
* Source control
* CI/CD
* Logs
* Monitoring
* Developer analytics
* SDK
* CLI
* APIs
* Webhooks
* Documentation
* Publishing
* Marketplace submission

### Website Builder

Cover:

* Multi-site management
* Visual page editing
* Responsive design
* Themes
* Components
* Sections
* Navigation
* Forms
* CMS
* Blog
* Media
* SEO
* Domains
* SSL
* Localization
* Analytics
* E-commerce integration
* Dynamic data
* Business Application integration
* Custom code
* Deployment
* Version history
* Preview/staging/production

Specify both no-code/low-code and professional full-code workflows.

---

## Product 5 — Organization Control Center (OCC)

OCC is the administration and control plane for each customer organization/tenant.

It replaces all references to Tenant Admin Console/Tenant Admin/TAC.

Cover:

* Organization profile
* Organization hierarchy
* Users
* Teams
* Groups
* Roles
* Permissions
* RBAC
* ABAC where applicable
* SSO
* MFA
* Passkeys
* Identity providers
* Domains
* Applications
* Application access
* Application configuration
* Marketplace installations
* Extensions
* Integrations
* Subscription
* Plan
* Billing
* Invoices
* Payments
* Usage
* Quotas
* Storage
* Compute
* Audit logs
* Security
* Compliance
* Policies
* Data management
* Import/export
* Backup/restore
* Notifications
* Branding
* Localization
* Developer settings
* API credentials
* Webhooks
* Environments
* Support
* Service status
* Organization analytics

Determine the complete OCC capability inventory.

---

## Product 6 — Marketplace

Unified ecosystem distribution platform.

Cover:

* Business applications
* Extensions
* Plugins
* Connectors
* Integrations
* Templates
* Website templates
* Application templates
* Components
* Themes
* Workflows
* Automation packages
* Industry solutions
* Developer products

Specify:

* Discovery
* Search
* Categories
* Ranking
* Recommendations
* Product pages
* Reviews
* Ratings
* Installation
* Uninstallation
* Updates
* Version compatibility
* Dependencies
* Licensing
* Pricing
* Trials
* Purchases
* Subscriptions
* Billing
* Revenue sharing
* Publisher onboarding
* Verification
* Submission
* Review
* Security scanning
* Certification
* Publishing
* Versioning
* Deprecation
* Suspension
* Refunds
* Disputes
* Analytics
* Developer earnings
* Marketplace governance

---

# 4. BUSINESS FOUNDATION

Create detailed chapters for:

## Vision and Strategy

Define:

* Vision
* Mission
* Product principles
* Strategic objectives
* Value proposition
* Differentiation
* Long-term platform strategy
* Ecosystem strategy
* Competitive moat

## Market

Analyze:

* TAM
* SAM
* SOM
* Target geographies
* Industries
* Organization sizes
* Personas
* Buyers
* Decision makers
* Administrators
* End users
* Developers
* Partners

## Competitive Architecture

Compare relevant concepts and capabilities against major enterprise/business platforms such as:

* SAP
* Salesforce
* Microsoft Dynamics 365
* Oracle
* NetSuite
* ServiceNow
* Workday
* Zoho
* Odoo
* Atlassian
* Shopify
* HubSpot

Do not blindly clone competitors.

Identify industry patterns, gaps and opportunities for UniERP differentiation.

---

# 5. BUSINESS MODEL

Create the complete UniERP business model.

Cover:

* SaaS model
* Platform model
* Marketplace model
* Developer ecosystem
* Partner ecosystem
* Enterprise contracts
* Self-service customers
* Industry solutions
* Add-ons
* Premium services
* Support plans
* Implementation services where appropriate

Include Business Model Canvas.

---

# 6. REVENUE MODEL

Design a detailed revenue architecture.

Consider UniERP's preference for:

**usage-based + fixed/prepaid monthly capacity rather than traditional mandatory per-user licensing.**

Cover:

* Subscription revenue
* Usage revenue
* Compute
* Storage
* API usage
* AI usage
* GPU usage
* Data transfer
* Premium applications
* Marketplace commissions
* Developer revenue share
* Add-ons
* Support
* Professional services
* Enterprise contracts

Specify:

* Metering units
* Rating
* Pricing engine
* Entitlements
* Quotas
* Credits
* Prepaid balances
* Overage
* Discounts
* Coupons
* Trials
* Taxes
* Currency
* Invoicing
* Payments
* Refunds
* Dunning
* Revenue recognition considerations

Create example unit economics and SaaS metrics.

---

# 7. PRODUCT REQUIREMENTS

Create:

* Business requirements
* Product requirements
* Functional requirements
* Non-functional requirements
* System requirements
* User requirements
* Operational requirements
* Regulatory requirements

Assign requirement IDs.

Example:

BUS-001
PRD-001
FUN-FIN-001
NFR-PERF-001
SEC-IAM-001
DATA-001
API-001

Requirements must be traceable.

---

# 8. FUNCTIONAL DECOMPOSITION STANDARD

For EVERY product/application/module/capability, use the hierarchy:

**Product**
→ Application
→ Module
→ Capability
→ Feature
→ Sub-feature
→ Workflow
→ Screen/View
→ Component
→ User Action
→ Business Rule
→ Data Entity
→ Permission
→ API
→ Event
→ Integration
→ Notification
→ Audit Event
→ Report/Analytics
→ Test Requirement

Do not stop at feature names.

---

# 9. FEATURE SPECIFICATION TEMPLATE

For every significant feature document:

* Feature ID
* Name
* Product
* Application
* Module
* Purpose
* Business value
* Actors
* Personas
* Preconditions
* Trigger
* Main workflow
* Alternate workflows
* Exception workflows
* Postconditions
* UI behavior
* Inputs
* Outputs
* Validation
* Business rules
* Data entities
* State transitions
* Permissions
* APIs
* Events
* Integrations
* Notifications
* Audit requirements
* Security requirements
* Privacy requirements
* Performance requirements
* Accessibility requirements
* Localization
* Configuration
* Error handling
* Edge cases
* Dependencies
* Acceptance criteria
* Test scenarios

---

# 10. USER JOURNEYS

Document end-to-end journeys including:

* Visitor → signup
* Trial creation
* Organization creation
* First administrator
* User invitation
* SSO configuration
* Business Application activation
* Marketplace installation
* Developer Platform usage
* Application creation
* Website creation
* Deployment
* Upgrade
* Billing
* Suspension
* Reactivation
* Cancellation
* Organization deletion
* Data export

Include happy paths and failure paths.

---

# 11. PERSONAS AND IAM

Define:

* Provider users
* Provider super administrators
* Provider operators
* Security teams
* Support
* Finance
* Marketplace reviewers
* Organization owners
* Organization admins
* Department admins
* Managers
* Employees
* Finance users
* HR users
* Sales users
* Developers
* Marketplace publishers
* External users
* Customers
* Suppliers
* Partners

Create complete permissions matrices.

---

# 12. MULTI-TENANCY ARCHITECTURE

Specify:

* Organization/tenant model
* Tenant provisioning
* Tenant identification
* Request context
* Data isolation
* Storage isolation
* Cache isolation
* Queue isolation
* Search isolation
* Secrets isolation
* Encryption
* Domain mapping
* Tenant-specific configuration
* Feature flags
* Plans/entitlements
* Resource quotas
* Tenant lifecycle
* Tenant migration
* Tenant backup
* Tenant restore
* Tenant deletion
* Data residency

Clearly define isolation boundaries.

---

# 13. SYSTEM ARCHITECTURE

Produce complete architecture chapters covering:

* System context
* Logical architecture
* Physical architecture
* Application architecture
* Service architecture
* Domain architecture
* Integration architecture
* Data architecture
* Security architecture
* Deployment architecture
* Network architecture
* Runtime architecture
* Extension architecture
* Developer architecture
* Marketplace architecture

Use C4-style representations:

* System Context
* Containers
* Components
* Code-level boundaries where useful

Provide diagrams using Mermaid where appropriate.

---

# 14. TECHNOLOGY BASELINE

Use the current UniERP direction as the starting baseline:

Frontend:
**Next.js**

Backend:
**NestJS**

Primary database:
**PostgreSQL**

Identity:
**Keycloak**

Cache:
**Redis**

Object storage:
**S3-compatible storage / MinIO**

Mobile/Desktop:
**Flutter**

Containerization:
**Docker**

Orchestration:
**Kubernetes where justified**

Do NOT force a technology merely because it is listed.

For each technology decision explain:

* Purpose
* Ownership
* Boundary
* Alternatives
* Tradeoffs
* Scalability
* Failure modes
* Security implications

Create ADRs for major architectural decisions.

---

# 15. REPOSITORY ARCHITECTURE

UniERP uses a polyrepo/hybrid repository strategy.

Define:

* Repository boundaries
* Ownership
* Dependency rules
* Package boundaries
* Contracts
* Shared libraries
* Design system
* SDK
* Service kit
* Authentication
* Data
* API
* Web
* Mobile
* Desktop
* Infrastructure
* Developer Platform
* Marketplace
* Extensions
* CI/CD
* Release orchestration

Prevent uncontrolled cross-repository coupling.

Create dependency diagrams and repository governance.

---

# 16. DOMAIN-DRIVEN DESIGN

Identify bounded contexts.

For every domain specify:

* Domain
* Subdomain
* Bounded context
* Aggregate
* Aggregate root
* Entity
* Value object
* Domain service
* Repository
* Command
* Query
* Domain event
* Invariant

Create a context map.

---

# 17. DATABASE & DATA ARCHITECTURE

Define:

* Conceptual model
* Logical model
* Physical model
* Schemas
* Tables
* Keys
* Relationships
* Indexes
* Constraints
* Partitioning
* Tenant keys
* Audit columns
* Soft deletion
* Temporal data
* Versioning
* Retention
* Archiving
* Data classification
* Encryption
* Backup
* Restore
* Migration

For important entities provide example schemas.

Define master-data management.

---

# 18. API ARCHITECTURE

Define API standards for:

* REST
* GraphQL if justified
* Internal APIs
* Public APIs
* Partner APIs
* Marketplace APIs
* Developer APIs

Specify:

* URI conventions
* Methods
* Request schemas
* Response schemas
* Pagination
* Filtering
* Sorting
* Search
* Validation
* Authentication
* Authorization
* Idempotency
* Rate limiting
* Error format
* Versioning
* Deprecation
* Observability

Create representative OpenAPI-style contracts.

---

# 19. EVENT ARCHITECTURE

Define:

* Domain events
* Integration events
* Event envelope
* Event naming
* Producers
* Consumers
* Schema versioning
* Ordering
* Deduplication
* Idempotency
* Retry
* DLQ
* Replay
* Event auditing

Create an event catalog.

---

# 20. INTEGRATION ARCHITECTURE

Cover:

* APIs
* Webhooks
* Connectors
* ETL
* Import/export
* File exchange
* Event integration
* Third-party identity
* Payments
* Tax
* Email
* SMS
* Storage
* Analytics
* AI providers
* External ERP/CRM systems

Define connector lifecycle.

---

# 21. WORKFLOW & AUTOMATION ENGINE

Specify:

* Workflow definitions
* Triggers
* Conditions
* Actions
* Branches
* Loops
* Approvals
* Human tasks
* Timers
* Schedules
* Events
* Retry
* Failure handling
* Versioning
* Execution history
* Debugging
* Permissions

---

# 22. SECURITY ARCHITECTURE

Use zero-trust and defense-in-depth principles.

Cover:

* Authentication
* Authorization
* OAuth 2.x
* OIDC
* SSO
* MFA
* TOTP
* Email/SMS OTP
* Passkeys/WebAuthn
* Session management
* Service identities
* RBAC
* ABAC
* Secrets
* KMS
* Encryption
* TLS
* Key rotation
* API security
* Network security
* CSP
* CSRF
* XSS
* SQL injection
* SSRF
* Supply-chain security
* Dependency security
* Container security
* Kubernetes security
* Malware scanning
* Marketplace package scanning
* Vulnerability management
* SIEM
* Audit
* Incident response

Include threat models.

---

# 23. PRIVACY & COMPLIANCE

Architect for relevant obligations and extensibility toward:

* GDPR
* India DPDP
* SOC 2
* ISO 27001
* PCI DSS where payment data is involved
* HIPAA when healthcare deployments require it
* Regional tax/data rules

Do not claim certification unless actually obtained.

Define:

* Data subject rights
* Consent
* Retention
* Deletion
* Export
* Data residency
* Legal hold
* Auditability

---

# 24. DESIGN LANGUAGE & UX ARCHITECTURE

Specify the UniERP design system.

Cover:

* Design principles
* Tokens
* Typography
* Color
* Spacing
* Grid
* Elevation
* Icons
* Motion
* Components
* Forms
* Tables
* Data grids
* Charts
* Dashboards
* Navigation
* Sidebars
* Command systems
* Search
* Workspaces
* Responsive behavior
* Dark/light modes
* Accessibility
* Localization
* Keyboard navigation
* Density modes

Define UX patterns for:

* Executive dashboards
* Dense data workspaces
* Object workspaces
* Transaction workspaces
* Three-pane workbenches
* Administration
* Builders
* Marketplace

---

# 25. SCREEN INVENTORY

Generate a screen registry.

For every screen specify:

* Screen ID
* Product
* Application
* Module
* Route
* Purpose
* Personas
* Permissions
* Layout
* Components
* Data
* Actions
* States
* Empty state
* Loading state
* Error state
* Validation
* Responsive behavior
* Accessibility
* APIs
* Analytics events

Do not artificially limit the number of screens.

---

# 26. SEARCH ARCHITECTURE

Define:

* Global search
* Application search
* Full-text search
* Facets
* Permissions-aware results
* Indexing
* Reindexing
* Tenant isolation
* Ranking
* Suggestions
* Recent searches

---

# 27. NOTIFICATION ARCHITECTURE

Cover:

* In-app
* Email
* SMS
* Push
* Mobile
* Desktop
* Webhooks

Define:

* Templates
* Preferences
* Routing
* Localization
* Retry
* Delivery tracking
* Suppression
* Rate controls

---

# 28. REPORTING, BI & ANALYTICS

Specify:

* Operational reports
* Financial reports
* Dashboards
* KPIs
* Custom reporting
* Report builder
* Scheduled reports
* Export
* Data visualization
* Embedded analytics
* Provider analytics
* Organization analytics
* Marketplace analytics
* Developer analytics
* Product analytics

---

# 29. AI ARCHITECTURE

Define a provider-neutral AI layer.

Consider:

* AI assistant
* Natural-language search
* ERP copilot
* Document intelligence
* Forecasting
* Recommendations
* Workflow generation
* Application generation
* Website generation
* Code assistance
* Data analysis
* Anomaly detection

Specify:

* Model gateway
* Provider abstraction
* Model routing
* Prompt management
* Tool calling
* Retrieval
* Vector storage where justified
* Context isolation
* Tenant isolation
* Guardrails
* Cost controls
* Token metering
* Audit
* Privacy
* Evaluation
* Human approval

Do not make core ERP correctness dependent on probabilistic AI.

---

# 30. PERFORMANCE & SCALABILITY

Establish measurable targets for:

* Response time
* Throughput
* Concurrent users
* Organizations
* Database size
* API traffic
* Events
* Background jobs
* File storage
* Marketplace scale

Describe:

* Horizontal scaling
* Vertical scaling
* Caching
* CDN
* Database scaling
* Read replicas
* Partitioning
* Queueing
* Backpressure

Do not invent unrealistic targets without marking them as proposed targets requiring validation.

---

# 31. RELIABILITY

Define:

* Availability targets
* SLI
* SLO
* SLA
* Error budgets
* Health checks
* Circuit breakers
* Retry
* Timeouts
* Bulkheads
* Graceful degradation
* Failover
* Disaster recovery

Define RPO and RTO by system criticality.

---

# 32. OBSERVABILITY

Cover:

* Logs
* Metrics
* Traces
* OpenTelemetry
* Dashboards
* Alerts
* Audit events
* Business telemetry
* Synthetics
* Error tracking
* Performance monitoring

Define correlation IDs across distributed operations.

---

# 33. INFRASTRUCTURE

Create architecture for:

* Development
* Local
* Testing
* QA
* Staging
* Production
* Disaster recovery

Cover:

* Compute
* Kubernetes
* Containers
* Database
* Redis
* Storage
* CDN
* DNS
* Load balancers
* WAF
* API gateways
* Queues
* Secrets
* Certificates
* Monitoring
* Backup

Design for an inexpensive initial deployment while retaining a credible path to enterprise scale.

---

# 34. CI/CD & DEVSECOPS

Define:

* Branch strategy
* Build
* Lint
* Unit testing
* Integration testing
* Security scanning
* SAST
* DAST
* Dependency scanning
* SBOM
* Container scanning
* Artifact signing
* Deployment
* Migration
* Canary
* Blue/green
* Rollback
* Release approvals

---

# 35. TESTING MASTER STRATEGY

Cover:

* Unit
* Component
* Contract
* API
* Integration
* Database
* End-to-end
* UI
* Visual regression
* Accessibility
* Performance
* Load
* Stress
* Soak
* Chaos
* Security
* Penetration
* Multi-tenancy isolation
* Backup/restore
* Disaster recovery
* Upgrade
* Migration
* Marketplace packages

Trace tests back to requirements.

---

# 36. MOBILE & DESKTOP

Define the Flutter architecture for:

* iOS
* Android
* Windows
* macOS
* Linux

Determine which capabilities belong on each platform.

Cover:

* Authentication
* Offline support
* Sync
* Notifications
* Secure storage
* Updates
* Deep links
* Device management
* Telemetry

---

# 37. INTERNATIONALIZATION

Cover:

* Languages
* Locales
* Time zones
* Date/time
* Number formats
* Currency
* Taxes
* Addresses
* RTL
* Translation lifecycle
* Regional compliance

---

# 38. FINANCIAL ARCHITECTURE

Because UniERP includes Finance/Accounting, specify enterprise accounting foundations:

* Chart of accounts
* Journal
* Ledger
* Subledgers
* Fiscal periods
* Posting
* Reconciliation
* Multi-currency
* Exchange rates
* Tax
* Intercompany
* Consolidation
* Financial statements
* Audit trails
* Period close

Financial transactions must prioritize deterministic correctness, auditability, immutability where appropriate, and reconciliation.

---

# 39. CONFIGURATION ARCHITECTURE

Define configuration hierarchy:

Global Provider
→ Region
→ Plan
→ Organization
→ Business Application
→ Module
→ User

Define inheritance and overrides.

---

# 40. EXTENSIBILITY

Define safe extension points:

* Public APIs
* Events
* Webhooks
* Plugins
* Extensions
* Connectors
* UI extensions
* Workflow extensions
* Custom fields
* Custom objects
* Scripts/functions

Core code must not require modification for normal extensions.

---

# 41. MARKETPLACE TECHNICAL ARCHITECTURE

Define:

* Package format
* Manifest
* Permissions
* Capabilities
* Dependencies
* Signing
* Verification
* Sandbox
* Security scanning
* Installation
* Upgrade
* Migration
* Rollback
* Uninstallation
* Data ownership

---

# 42. BILLING SYSTEM ARCHITECTURE

Create the complete architecture:

Usage Event
→ Meter
→ Aggregation
→ Rating
→ Entitlement
→ Pricing
→ Invoice
→ Payment
→ Accounting/Reconciliation.

Specify idempotency and auditability.

---

# 43. AUDIT ARCHITECTURE

For sensitive operations capture:

* Actor
* Organization
* Action
* Resource
* Previous state
* New state
* Timestamp
* Request ID
* IP/device where legally appropriate
* Result
* Reason

Protect audit records from unauthorized alteration.

---

# 44. IMPORT / EXPORT / MIGRATION

Cover:

* CSV
* Excel
* APIs
* Bulk imports
* Legacy ERP migration
* Validation
* Mapping
* Dry runs
* Error reports
* Rollback
* Reconciliation

---

# 45. BACKUP & DISASTER RECOVERY

Specify:

* Database backups
* PITR
* Object storage
* Configuration
* Secrets
* Cross-region options
* Restore testing
* Tenant-level restore where feasible
* Full disaster recovery

---

# 46. OPERATIONS

Define:

* Runbooks
* Incident response
* Severity levels
* Escalation
* On-call
* Maintenance
* Status communication
* Root-cause analysis
* Problem management

---

# 47. CUSTOMER SUPPORT

Specify:

* Support portal
* Tickets
* SLAs
* Knowledge base
* Chat
* Diagnostics
* Secure support access
* Escalation
* Customer communication

---

# 48. DOCUMENTATION SYSTEM

Define documentation for:

* Users
* Administrators
* Developers
* API consumers
* Marketplace publishers
* Internal engineering
* Operations
* Support

---

# 49. PRODUCT TELEMETRY

Define events for:

* Acquisition
* Activation
* Adoption
* Engagement
* Retention
* Conversion
* Churn
* Feature usage
* Errors
* Performance

Respect privacy requirements.

---

# 50. ROADMAP

Create:

* Foundation
* MVP
* Alpha
* Beta
* GA / v1.0
* Post-GA
* Enterprise maturity

Map dependencies.

Do not confuse long-term architecture with features that must ship in v1.

Classify capabilities as:

* Foundation
* MVP
* v1.0
* v1.x
* v2+
* Future/Research

---

# 51. REQUIREMENT TRACEABILITY MATRIX

Create traceability:

Business Goal
→ Business Requirement
→ Product Requirement
→ Functional Requirement
→ Architecture Component
→ API/Event
→ Screen
→ Test
→ Release

---

# 52. RISK REGISTER

Cover:

* Product
* Business
* Financial
* Architecture
* Security
* Privacy
* Compliance
* Scalability
* Operational
* Vendor
* AI
* Marketplace
* Data
* Schedule

For each define:

* Probability
* Impact
* Mitigation
* Contingency
* Owner type

---

# 53. DECISION LOG

Create ADRs for important decisions.

Format:

ADR-ID
Context
Problem
Options
Decision
Rationale
Consequences
Risks
Revisit conditions

---

# 54. GLOSSARY

Maintain an authoritative terminology dictionary.

Use canonical terminology consistently:

* UniERP
* Marketing Site
* Provider Control Center (PCC)
* Business Applications
* Developer Platform
* Organization Control Center (OCC)
* Marketplace
* Organization
* Tenant
* Application
* Extension
* Plugin
* Connector
* Marketplace Package

Explain when "tenant" is a technical concept versus "organization" as a user-facing concept.

---

# 55. CROSS-PRODUCT INTERACTIONS

Do not document the six products as isolated systems.

Explicitly document interactions such as:

Marketing Site
→ Signup
→ Organization provisioning
→ OCC

OCC
→ Business Applications

OCC
→ Marketplace

Marketplace
→ Business Applications

Developer Platform
→ Marketplace

Developer Platform
→ Business Applications

PCC
→ All products

Billing
→ PCC + OCC + Marketplace + Business Applications + Developer Platform.

Provide sequence diagrams for major interactions.

---

# 56. END-TO-END FUNCTIONAL DEPTH REQUIREMENT

This is one of the most important instructions.

For each major capability, continue decomposing until engineering can understand:

**what screen exists → what the user does → what validation occurs → what API is invoked → what authorization is evaluated → what business service executes → what database entities change → what event is generated → what downstream processes execute → what audit record is produced → what notification is sent → what telemetry is captured → what happens if any step fails.**

Example depth:

User creates Sales Order

→ Sales Orders screen
→ Create action
→ Customer selection
→ Product selection
→ Pricing
→ Tax
→ Inventory availability
→ Credit check
→ Approval if required
→ Validation
→ Authorization
→ API request
→ Transaction
→ Order creation
→ Order lines
→ Inventory reservation
→ Accounting implications
→ Event emission
→ Workflow execution
→ Notification
→ Audit
→ Analytics
→ Error handling.

Apply equivalent depth across the platform.

---

# 57. FAILURE-FIRST DOCUMENTATION

For critical workflows explicitly document:

* Invalid input
* Unauthorized user
* Permission changes during operation
* Duplicate requests
* Network failure
* Database failure
* Cache failure
* Queue failure
* Third-party outage
* Timeout
* Partial completion
* Concurrency
* Race conditions
* Retry
* Compensation
* Recovery

---

# 58. DIAGRAM REQUIREMENTS

Create diagrams wherever useful.

Use Mermaid for:

* System context
* Container architecture
* Service architecture
* Repository architecture
* Data flows
* ER diagrams
* Sequences
* State machines
* Workflows
* Deployment
* IAM
* Billing
* Marketplace lifecycle
* Organization provisioning
* CI/CD
* Disaster recovery

Every diagram must have accompanying textual explanation.

---

# 59. TABLE REQUIREMENTS

Use structured tables for:

* Requirements
* Applications
* Features
* Permissions
* APIs
* Events
* Entities
* Integrations
* Screens
* Reports
* KPIs
* Risks
* ADRs
* Tests
* Dependencies
* Roadmap

---

# 60. ASSUMPTION MANAGEMENT

Do NOT silently invent business decisions.

Classify information as:

**CONFIRMED** — supplied/approved UniERP decision.

**PROPOSED** — recommended architecture or product decision.

**TBD** — decision still required.

**ASSUMPTION** — temporarily assumed to allow specification work to continue.

Maintain an Assumption & Decision Register.

---

# 61. QUALITY RULES

The final document must be:

* Enterprise-grade
* Technically coherent
* Implementation-oriented
* Traceable
* Modular
* Extensible
* Secure-by-design
* Multi-tenant-by-design
* API-first
* Automation-ready
* Observable
* Testable
* Accessible
* Internationalizable
* Cloud-ready
* Vendor-neutral where practical

Avoid generic statements such as:

"Implement proper security."

Instead specify what security controls are required.

Avoid:

"The system should be scalable."

Instead define the architecture, scaling dimensions, bottlenecks and measurable proposed targets.

---

# 62. NO-SUMMARIZATION RULE

Do NOT compress a module because the document is becoming long.

Do NOT say:

* "and so on"
* "etc." as a substitute for required specification
* "similar to above"
* "standard ERP functionality"
* "implement industry best practices"

Explicitly enumerate important functionality.

There is no maximum page count.

Depth and completeness are more important than brevity.

---

# 63. DOCUMENT STRUCTURE

Generate the master specification hierarchically.

Use:

# Part

## Chapter

### Section

#### Subsection

##### Requirement/Specification

Number everything.

Example:

Part VII — Business Applications

7.1 Finance
7.1.1 General Ledger
7.1.1.1 Chart of Accounts
7.1.1.2 Journals
7.1.1.3 Posting
7.1.1.4 Period Close

Continue as deeply as necessary.

---

# 64. MASTER REGISTRIES

Maintain centralized registries within the document:

1. Product Registry
2. Application Registry
3. Module Registry
4. Feature Registry
5. Screen Registry
6. Role Registry
7. Permission Registry
8. Entity Registry
9. API Registry
10. Event Registry
11. Integration Registry
12. Workflow Registry
13. Notification Registry
14. Report Registry
15. KPI Registry
16. Requirement Registry
17. Test Registry
18. Risk Registry
19. ADR Registry
20. Dependency Registry

IDs must remain stable throughout the specification.

---

# 65. CHANGE MANAGEMENT

Include:

* Document version
* Product version
* Status
* Owner
* Contributors
* Last update
* Change log
* Decision history
* Deprecated requirements
* Superseded architecture
* Migration impact

The PMS must operate as a living specification rather than a one-time document.

---

# 66. GENERATION STRATEGY FOR VERY LARGE OUTPUT

Do NOT attempt to generate 1,000+ pages in one model response.

Generate the specification incrementally while maintaining one master hierarchy.

### Phase 1

Create the complete Table of Contents and all registries.

### Phase 2

Create Business, Market, Product Strategy, Business Model, Revenue Model and Pricing.

### Phase 3

Create global Product and Functional Architecture.

### Phase 4

Fully specify Marketing Site.

### Phase 5

Fully specify Provider Control Center.

### Phase 6

Fully specify Business Applications.

Business Applications will likely require many generation cycles. Process one application/domain at a time.

### Phase 7

Fully specify Developer Platform.

### Phase 8

Fully specify Organization Control Center.

### Phase 9

Fully specify Marketplace.

### Phase 10

Create Data, API, Event, Integration and Workflow architecture.

### Phase 11

Create Security, IAM, Privacy and Compliance architecture.

### Phase 12

Create Infrastructure, DevOps, Reliability, Observability and DR architecture.

### Phase 13

Create Design System, UX, Accessibility, Mobile and Desktop architecture.

### Phase 14

Create QA, testing and release architecture.

### Phase 15

Create Operations, Support, Documentation and Governance.

### Phase 16

Create Roadmap, risks, ADRs and traceability.

### Phase 17

Perform cross-product consistency review.

### Phase 18

Perform architecture gap analysis.

### Phase 19

Perform requirement gap analysis.

### Phase 20

Generate final indexes and consolidated registries.

After every generation cycle:

1. Preserve previous IDs.
2. Update the master TOC.
3. Update affected registries.
4. Record assumptions.
5. Record decisions.
6. Identify unresolved TBDs.
7. Check cross-product dependencies.
8. Check terminology consistency.
9. Check requirement traceability.
10. State exactly which section should be generated next.

Never restart the specification from scratch unless explicitly instructed.

---

# 67. COMPLETENESS AUDIT

Before considering any product complete, verify:

Business requirements ✓
Personas ✓
Applications ✓
Modules ✓
Features ✓
Screens ✓
Workflows ✓
Business rules ✓
Permissions ✓
Data ✓
APIs ✓
Events ✓
Integrations ✓
Notifications ✓
Reports ✓
Analytics ✓
Audit ✓
Security ✓
Privacy ✓
Performance ✓
Reliability ✓
Accessibility ✓
Localization ✓
Configuration ✓
Testing ✓
Deployment ✓
Operations ✓
Failure scenarios ✓
Documentation ✓

A product is not "fully specified" until these dimensions are addressed.

---

# 68. FINAL VALIDATION

At the end of the complete PMS perform:

### Product Gap Analysis

Identify missing capabilities.

### Architecture Gap Analysis

Identify missing components or unclear boundaries.

### Functional Gap Analysis

Identify incomplete workflows.

### Security Gap Analysis

Identify attack surfaces and missing controls.

### Data Gap Analysis

Identify undefined entities, ownership or lifecycle.

### Integration Gap Analysis

Identify missing interfaces.

### UX Gap Analysis

Identify missing screens/states.

### Operational Gap Analysis

Identify systems that cannot yet be reliably operated.

### Commercial Gap Analysis

Identify missing billing/revenue mechanisms.

### Compliance Gap Analysis

Identify unsupported obligations.

### Traceability Audit

Find requirements without implementation/test coverage.

Resolve gaps or explicitly mark them TBD.

---

# 69. FINAL SUCCESS CRITERION

The final UniERP PMS should be detailed enough that a new engineering/product/design team can enter the project and determine:

**WHAT to build**

**WHY it exists**

**WHO uses it**

**HOW it behaves**

**HOW it is architected**

**HOW data moves**

**HOW it is secured**

**HOW it integrates**

**HOW it is tested**

**HOW it is deployed**

**HOW it is operated**

**HOW it makes money**

**HOW the six products work together**

without relying primarily on undocumented tribal knowledge.

The master specification is the authoritative root.

Detailed source code, generated API schemas, database migration files, UI design files and operational configurations may live outside the PMS, but they must be traceable from it.

---

# 70. STARTING INSTRUCTION

Begin by generating:

**UniERP Product Master Specification — Volume 0: Master Index & Governance**

Produce:

1. Document control
2. Executive definition
3. Canonical terminology
4. Six-product portfolio
5. Complete multi-level Table of Contents for the entire PMS
6. Product Registry
7. Initial Application Registry
8. Requirement ID system
9. Architecture artifact registry
10. Screen ID convention
11. API ID convention
12. Event ID convention
13. Data Entity ID convention
14. Test ID convention
15. ADR convention
16. Assumption/Decision/TBD register
17. Cross-product dependency map
18. PMS generation roadmap

The Table of Contents must anticipate the complete specification and may itself contain hundreds or thousands of entries.

Do not begin writing detailed product chapters until the master hierarchy, identifiers, terminology and registries have been established.

After Volume 0, proceed sequentially through the specification while preserving all identifiers and decisions.
