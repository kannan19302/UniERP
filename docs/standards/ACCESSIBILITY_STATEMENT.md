# UniERP accessibility statement

**Status:** release-candidate statement; publish after the feedback-channel and representative assistive-technology gates are signed.  
**Last technical review:** 2026-08-24  
**Target:** WCAG 2.2 Level AA for supported customer workflows.

UniERP is being designed so people can register, sign in, recover access, launch an entitled platform and manage their account without depending on a particular pointer, color perception or animation setting. Shared web surfaces include semantic headings and landmarks, visible keyboard focus, labelled form controls, a skip link, reduced-motion handling, responsive reflow, Light/Dark appearance controls and text alternatives for meaningful non-text content.

The current dated evidence is recorded in [the accessibility conformance ledger](./evidence/ACCESSIBILITY_CONFORMANCE_LEDGER_2026-08-24.md). Automated checks are only one part of conformance and this statement does not claim full WCAG conformance while the listed manual evidence remains open.

## Current known limitations

- Representative NVDA/JAWS, VoiceOver and TalkBack journeys have not yet been recorded against the release candidate.
- 200% text zoom, 400% browser zoom/reflow, Windows forced-colors and RTL/localized expansion still need dated route-level evidence.
- The shared axe suite runs in jsdom. Its canvas and pseudo-element limitations mean real-browser color and visual-state review remains required.
- The token-debt gate still contains baselined legacy findings outside the newly enforced Meridian Light/Dark contrast pairs. The baseline may only decrease, but it is not a conformance claim.

## Feedback and assistance

Public feedback is accepted through the UniERP marketing-site **Contact** journey (`/contact`); signed-in customers can also use **Account Center → Help & support**. Before publication, the release owner must verify an assisted alternative channel, name its response owner and publish the response-time commitment. Accessibility barriers that block authentication, recovery, platform launch or account security are release blockers and are triaged at the highest severity.

When reporting a barrier, include the page/workflow, device, browser or app version, assistive technology and the result you expected. Do not include passwords, recovery codes, authentication tokens or other secrets.
