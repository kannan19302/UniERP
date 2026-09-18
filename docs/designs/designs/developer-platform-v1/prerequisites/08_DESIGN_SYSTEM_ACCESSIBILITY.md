# Strata UI and accessibility implementation contract

The PNGs communicate layout and interaction intent. Production must use @kannan19302/ui, approved semantic tokens and accepted Strata floorplans. Do not sample colors, reconstruct icons from pixels or treat generated text, sample scores, dates and counts as authoritative product values.

## Visual identity

Use a quiet light surface, dark ink, a restrained Developer platform accent, compact outlined icons and the UniERP layered mark. Favor a stable work area over dashboard decoration. The global bar contains organization context, search, platform launcher, help, notifications and profile. Below it, document tabs retain the user's working set. Contextual navigation changes with project or library scope; the inspector is progressive detail, not another permanent dashboard column.

Use existing typography and spacing tokens. A proposed desktop layout budget is a 224–256 px navigation rail and 320–400 px optional inspector; validate these against the library's floorplans before implementation. Canvas width takes priority. Use compact and comfortable density through approved tokens, never locally scattered numeric overrides. Status always has text plus an icon, not color alone.

## Component behavior

| Element | Interaction and acceptance |
| --- | --- |
| Document tabs | Stable tenant/project/artifact identity; dirty indicator; close, pin, reorder and reopen; overflow list; keyboard operation; closing dirty content offers Save/Discard/Cancel |
| Organization switch | Reauthorize destination, cancel pending requests, clear scoped caches and preview principals; don't restore foreign-tenant tab contents |
| Platform launcher | Icon plus name, current platform, permission-aware destinations to Developer, Marketplace, OCC and tenant website; explicit handoff without privilege inference |
| Notification center | Read/unread, category and scope; details preserve linked target; failed target access gives a safe explanation; bulk mark-read is scoped |
| Avatar/account | Identity-owned profile, active organization, account center, session/sign-out; no duplicate credentials implementation |
| Object lists | Search/filter/sort persisted by scope; pagination or bounded virtualization; selected count reflects current result selection; bulk actions show exact scope |
| Builder canvas | DOM/layer-tree alternative to drag-and-drop; keyboard insert/move/resize; inspector labels; zoom does not change saved geometry |
| Inspector | Selected node name and type, grouped properties, dirty state and validation; changes announce without stealing focus |
| Diff/review | Semantic changes first, raw source optional; Base/Server/Local are distinct; resolved thread does not automatically resolve document conflict |
| Destructive review | Exact resource, environment, consumer impact, retention and recovery; required reason; server permission checked again at execution |

## State contract for every screen

Loading uses bounded skeletons with a programmatic busy state. Empty distinguishes no resources from no search results and offers a permitted next action. Error includes a safe correlation ID and recoverable retry. Forbidden hides data and offers the owning access-request handoff. Offline preserves eligible local edits without claiming server save; secrets and sensitive payloads never enter local persistence. Stale data shows timestamp and explicit refresh. Conflict retains all versions. Partial completion shows per-item outcomes and resumes idempotently. Not run, pending, failed and passed are different states.

Drawers/dialogs return focus to their trigger, support Escape when safe and explain blocked close when unsaved. Persistent diagnostics link to the affected field/node. Toasts supplement durable status rather than being the only record. Confirmation is for consequential execution; ordinary draft editing should remain direct.

## WCAG 2.2 AA proof plan

Implement semantic landmarks, headings, labeled controls, visible focus, skip links and correct tab/tree/grid/dialog patterns. Verify text contrast and nontext controls using design-system checks. Test 200% zoom and reflow at 320 CSS px; a genuinely two-dimensional canvas may scroll, but its controls and alternative tree must remain usable. Provide at least the WCAG minimum target size or a valid exception; aim for comfortable larger hit regions.

Perform keyboard-only completion of both pilots, including tab overflow, canvas insertion, conflict resolution and release review. Run automated accessibility checks, then NVDA with Edge/Chrome and a supported screen-reader/browser pair selected by QA. Record focus order, announced name/role/state, validation announcements and focus return. Respect reduced motion and forced colors. Test English expansion, Tamil strings and Arabic RTL with human language review; language selection must not be represented by country flags.

The static gallery and PNG review are not accessibility certification. Production DOM, token checks, assistive-technology evidence and responsive testing remain implementation gates.
