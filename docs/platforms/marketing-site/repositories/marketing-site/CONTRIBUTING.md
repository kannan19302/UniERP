> **Repository evidence:** Relocated from `marketing-site/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-corporate-website

This repository is **L4 — Presentation** in the UniERP layered architecture.
It may depend on **L1 (the design system) only**, and nothing else.

## The rule that matters most here

**This site must never be able to break a payroll release.** It ships daily and holds no tenant
data; the platform ships on a release train. That difference in cadence and blast radius is the
entire reason it is a separate repository (§ 4.2), so it takes no dependency on the API, the
kernel or the data layer — only on the design system.

## Before you push

```bash
npm install
npx tsc --noEmit
```

A dependency on a higher or sideways layer will fail CI. That is deliberate: the
whole reason this is a polyrepo rather than a monorepo is that the boundary
becomes impossible to cross rather than merely discouraged.

## Standards

See [`UniERP/CONTRIBUTING.md`](https://github.com/kannan19302/UniERP/blob/main/CONTRIBUTING.md)
for the platform-wide non-negotiables — tenant isolation, route guards, money as
`Decimal(19,4)`, and never suppressing a check to make it pass.

