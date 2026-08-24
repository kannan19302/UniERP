# `@kannan19302/ui` 1.0.16 release candidate

**Built:** 2026-08-24  
**Artifact:** `D:\UniERP\release-artifacts\kannan19302-ui-1.0.16.tgz`  
**SHA-256:** `77c082def8a1e4559854fe7977483f82968feb84ee0eae9b0935b9f15a6eb288`  
**Size:** 328,605 bytes; 480 archive entries.

The tarball contains `package/package.json` and `package/dist/index.js`, contains no `package/src` tree and passed an import smoke test for `BrandMark`, `PlatformShell`, `PlatformWizardGrid`, `TrialCountdown` and `ThemeQuickToggle`.

## Build gates

- TypeScript/CSS package build passed.
- Meridian and Meridian Dark checked contrast pairs passed the WCAG 2.2 AA script.
- Mobile token output matches the Design Platform source.
- Token-debt gate introduced no new violations; the 333-item legacy baseline may only decrease.
- 26 test files / 219 tests passed, including axe and keyboard-alternative coverage.

## Consumer adoption map

| Consumer | Declared dependency | Current source adoption | Publication action |
| --- | --- | --- | --- |
| Platform Wizard | `^1.0.15` | Wizard grid, brand, theme and preference-safe catalog | Refresh lock to 1.0.16 after registry publish. |
| Tenant Applications | `^1.0.15` | shared shell, brand, countdown/theme and Account Center entry | Refresh lock after publish. |
| Provider Admin OS | `^1.0.15` | shared control-plane shell/account navigation | Refresh lock after publish. |
| Tenant Admin | `^1.0.15` | shared root/shell adoption | Refresh lock after publish. |
| Developer Platform | `^1.0.15` | shared platform layout/shell | Refresh lock after publish. |
| Marketplace | `^1.0.15` | shared root and catalog/onboarding surfaces | Refresh lock after publish. |
| Marketing site | `^1.0.15` | canonical header brand/account navigation | Refresh lock after publish. |
| Tenant sites | `^1.0.15` | tenant brand preserved with canonical UniERP attribution | Refresh lock after publish. |
| Framework | `^1.0.15` | shared package integration | Refresh lock after publish. |
| Storybook | exact `1.0.15` | component documentation host | Change to exact `1.0.16` and refresh lock after publish. |
| Web Studio | transitive lock entry | shared dependencies through current package graph | Refresh transitive lock through its owning direct dependency. |
| Desktop and mobile | native token/shell ports | canonical mark, policy launch states, theme and Account Center affordance | Cut signed native builds from the matching token version. |

Every caret declaration is semver-compatible with 1.0.16, but deterministic builds continue to resolve the existing 1.0.15 lock until the immutable package is published and lockfiles are deliberately refreshed. Consumer manifests are not pointed at an unpublished version because that would make clean installs fail. Registry publication and the resulting lockfile refresh are the only remaining package-distribution steps.
