> **Repository evidence:** Relocated from `idp/CONTRIBUTING.md`. This file may describe local setup, contribution or history but cannot override the owning product/platform suite.

# Contributing to unierp-idp

This repository is **L3 — Service** in the UniERP layered architecture.
It may depend on **L0, L1, L2**, and nothing else.

## The rule that matters most here

**A separate identity realm is the point of this repository.** The control plane and the
tenant plane authenticate against different realms, so no customer identity can obtain a
control-plane token — the boundary is the realm, not a claim that some guard remembers to check
(`PLATFORM_ARCHITECTURE.md` § 5.2). A change that lets one realm mint a token the other accepts
is not a bug to be fixed later; it is the defect this repository exists to make impossible.

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

