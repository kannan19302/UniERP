# Identity Platform UX and Design Requirements

Experience scope: safe login/recovery, clear session/device management, accessible MFA and non-disclosing failures.

- `IAM-UX-001`: Interfaces shall make actor, tenant/environment scope and lifecycle state explicit.
- `IAM-UX-002`: Loading, empty, stale, degraded, failed and successful states shall be distinct.
- `IAM-UX-003`: Destructive or irreversible actions shall disclose target, impact and recovery.
- `IAM-UX-004`: Shared patterns shall use the Design Platform and meet WCAG 2.2 AA.
- `IAM-UX-005`: Localization, time, number, currency and unit semantics shall be unambiguous where applicable.
- `IAM-UX-006`: Hosted sign-in and registration shall use compact, responsive single-purpose cards. Sign-in shall
  not expose authority-scope or organization-slug controls; the server derives the realm from the validated OIDC
  destination and resolves tenant membership without trusting browser-submitted scope selectors.

UI presence is DECLARED evidence only until backed by real contracts and workflow tests.
