# Design interaction contract — non-normative implementation handoff

## Entry and scope

Projects open scoped app/site workspaces. Applications/Websites catalogs can filter all organization projects. The context band is generated from active scope and resource, never copied from the prior tab. Organization-wide Manage cannot silently become project administration. Cross-platform links preserve intended destination while rechecking access.

## Creation and editing

Create website/application selects project or organization-library draft explicitly. A blank required name disables creation. Other builders use the mapped inline form or setup panel. After durable creation, open the resource editor in a document tab. Autosave has saving/saved/error/unsynced states; keyboard navigation and unsaved close use screen 16/74 patterns. Duplicate creates an independent draft with provenance. Archive requires impact review; deletion is not a casual row action.

## Lists and inspection

Search, filters, sorting and pagination persist per tab. Selecting a row opens its inspector; opening the editor preserves list state. Bulk changes show selection count and scope, and require an operation-specific confirmation when destructive. Any generated count in artwork is sample copy; runtime counts come from one response and consistent filtering.

## Reuse

Library drafts and published versions coexist. Version references retain source ownership and pin compatibility. An update review shows changed inputs/events, dependencies, affected consumers, permissions and test evidence. Acceptance creates a new destination reference revision. Copying never implies later synchronization. Revocation/deprecation shows affected consumers, replacement and recovery options.

## Data and execution

Schema edits remain proposed until compatibility/migration review. Relationships connect actual foreign keys. API design publishes no contract until reviewed. Rule tests and sandbox runs are simulations with explicit inputs, capabilities and budgets. Runtime logs expose safe traces and errors; retries honor idempotency. Role preview changes simulated visibility only, not server permission.

## Delivery and operations

Library versioning, application packaging and website publishing are separate lifecycle actions. Environment promotion reviews full manifests, approvals, checks and affected targets. Failed and partial deployments cannot look successful. Restore/unpublish actions open impact review and require authorized confirmation. Tenant Sites owns website runtime and domains; Developer owns extension contracts/sandbox. Manage access inherits OCC policy without exposing provider authority.

## Credentials and privacy

Credential inventory exposes identifiers and managed references only. Creation, rotation and revocation require scoped review, dependent-consumer impact and audit. No secret belongs in screenshots or logs. Submissions and records respect retention, export/redaction permission and data minimization. Hosted Identity owns authentication; Developer renders handoff, return and safe error states only.

## Accessibility and recovery

Implement visible focus, logical keyboard order, accessible form errors, status announcements, Escape/cancel focus restoration, reduced motion and touch targets using approved UI components. Loading/empty/error/forbidden/not-found/offline/auth are reusable patterns, not six new routes per feature. Offline support must be explicitly implemented before any screen promises local persistence or replay.
