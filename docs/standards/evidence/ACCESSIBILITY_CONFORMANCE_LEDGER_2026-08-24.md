# Accessibility conformance ledger — 2026-08-24

This is scoped release-candidate evidence, not a VPAT/ACR and not a claim that automated testing proves WCAG conformance.

| Surface / state | Automated semantics | Keyboard / interaction | Reflow / themes | Console | Result and limitations |
| --- | --- | --- | --- | --- | --- |
| Hosted sign-in, unauthenticated | One H1, one main landmark, skip link, labelled visible controls, no positive tabindex, correct email/current-password autofill, provider and passkey choices have accessible names | Password reveal changes `password → text` and accessible name `Show password → Hide password`; tenant/provider scope change hides the organization field through a CSP-compatible listener | 390 × 844 has no horizontal overflow; Light → Dark → Light verified | No new warning/error after 2026-08-24 fixes | **Automated/browser pass.** Physical keyboard focus traversal and screen-reader announcement remain manual gates. |
| Hosted registration, email journey | One H1/main, skip link, zero visible unnamed controls, versioned Terms/Privacy link names, organization/given-name/family-name/email/new-password autocomplete | Password reveal and strength input use CSP-compatible listeners; native required checkbox | 390 × 844 has no horizontal overflow | No new warning/error | **Automated/browser pass.** Validation-error summary/focus and screen-reader evidence remain manual. |
| Hosted password recovery | One H1/main, skip link, labelled email and recovery action; response remains non-disclosing | Theme control operates without inline event handlers | 390 × 844 has no horizontal overflow; Light/Dark round trip passes | No new warning/error | **Automated/browser pass.** Live external inbox delivery is an operational/provider gate. |
| Hosted Account Center | Existing controller tests cover profile/security/contact/session/organization/appearance/privacy/billing/support destinations; main landmark has the shared target ID | CSRF-protected mutations and recent-auth controls have focused tests | Responsive rail collapses at 820 px and form grid at 520 px in shipped CSS | Not exercised in a clean authenticated browser in this ledger | **Partial.** Authenticated keyboard, reflow and assistive-technology evidence remain open. |
| Shared Design Platform | 26 test files / 219 tests pass, including axe assertions for populated/empty Wizard grids, launch/catalog/editorial/record/ops shells, overlays, buttons, forms and studio keyboard alternatives | Component tests cover keyboard insertion, dialog behavior, grid/button semantics and non-pointer alternatives | Meridian and Meridian Dark checked color pairs pass the WCAG 2.2 AA contrast script; token gate prevents new debt | jsdom reports known canvas and pseudo-element implementation warnings while tests pass | **Automated pass with declared engine limitations.** Real-browser visual/contrast and AT review remain open. |
| Platform Wizard unauthenticated entry | OIDC redirect preserves return intent and PKCE; shared Wizard grid axe tests pass | No authenticated tile-launch keyboard run in this ledger | Previous desktop and 390 × 844 render evidence exists; current auth redirect is healthy | No error in current auth destination | **Partial.** Authenticated catalog, forced-colors, zoom and screen-reader evidence remain open. |

## Defects found and closed during this run

1. The WebAuthn base64url helper emitted `/+/g` instead of `/\+/g` inside the generated browser script. The rendered page raised a syntax error and passkey behavior could not initialize. Escaping was corrected and a rendered-output regression assertion added.
2. Hosted authentication pages lacked a main landmark and skip link. `renderDocument` now provides both without nesting the Account Center's existing main landmark.
3. Helmet sends `script-src-attr 'none'`, while theme, password, scope and strength controls used inline event attributes. All such attributes were removed and replaced with script listeners. A regression assertion rejects future `onclick`, `onchange` or `oninput` attributes.
4. Registration name and organization inputs lacked autofill purpose tokens. `organization`, `given-name` and `family-name` are now emitted.

## Commands and evidence

- `design-system: pnpm test` → 26 files, 219 tests passed.
- `design-system: pnpm run check:contrast` → Meridian and Meridian Dark checked pairs passed.
- `design-system: pnpm run check:tokens` → no new token violations; 333 legacy findings remain baselined across 49 files and may only decrease.
- `idp: pnpm test` → 32 files, 319 tests passed after the rendered accessibility fixes.
- In-app Chromium browser, viewport 390 × 844: sign-in, registration and password-recovery semantic/reflow/interaction checks above.

## Remaining dated manual matrix

Release owners must attach date, build SHA/package version, tester and outcome for:

- Chromium, Firefox and WebKit/Safari at supported versions;
- Windows + NVDA and JAWS; macOS/iOS + VoiceOver; Android + TalkBack;
- keyboard-only completion of sign-in, registration, recovery, Wizard launch and Account Center security tasks;
- 200% text zoom, 400% browser zoom/320 CSS px reflow, forced colors, reduced motion and high contrast;
- localized long strings, bidirectional/RTL layout and locale-aware dates/numbers;
- native mobile/desktop focus, scaling, screen-reader and offline/clock-change behavior.

Any A0/A1 result blocks release. An exception requires an owner, user impact, workaround, expiry and approved remediation plan.
