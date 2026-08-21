> **Repository evidence:** Relocated from `infra/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-infra

This repository is **L7 — Operations** in the UniERP layered architecture.
It may depend on **manifests only**, and nothing else.

## The rule that matters most here

An alert without a runbook fails CI. Environments are overlays, not repositories — splitting infrastructure from infrastructure is how the manifest and the app come to disagree.

## Before you push

```bash
npm install
node scripts/check-layer.mjs   # if present: asserts the layer rule
npx tsc --noEmit
```

A dependency on a higher or sideways layer will fail CI. That is deliberate: the
whole reason this is a polyrepo rather than a monorepo is that the boundary
becomes impossible to cross rather than merely discouraged.

## Standards

See `unierp-platform/CONTRIBUTING.md` (legacy reference: `../unierp-platform/CONTRIBUTING.md`) for
the platform-wide non-negotiables — tenant isolation, route guards, money as
Decimal, and never suppressing a check to make it pass.


