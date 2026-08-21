> **Archive status:** Historical unierp-app-healthcare repository document. Non-authoritative; retained as Marketplace/extension provenance only.

# GOVERNANCE — this repository is part of the UniERP program

> **You are working on a production enterprise system intended to run real businesses for a
> decade. Not a prototype.**

## The master documents live in the `ERPSys` repository

This repository does **not** carry its own PRD, TRD, architecture docs, or changelog. There is
one governing document set for the entire program, and it lives at **`ERPSys/docs/ai/`**:

| File | What it governs |
|:--|:--|
| `docs/ai/README.md` | **THE LAW — read this first** |
| `docs/ai/PRD.md` | The Goal, scope, personas, requirements |
| `docs/ai/TRD.md` | Tech stack, hosting, CI/CD, the open-source mandate |
| `docs/ai/APP_FLOW.md` | User journeys, screens, actions, states |
| `docs/ai/UI_UX_BRIEF.md` | Colour, type, spacing, motion, accessibility |
| `docs/ai/BACKEND_SCHEMA.md` | Data model, auth, tenancy, encryption |
| `docs/ai/IMPLEMENTATION_PLAN.md` | Build order and the agent workflow |
| `docs/ai/ARCHITECTURE_REVIEW.md` | Honest state of the system + remediation |
| `docs/ai/CODE_STANDARDS.md` | **Conduct, code quality, maintainability — the review checklist** |
| `docs/ai/CHANGELOG.md` | **The one log — you append to it, from this repo too** |

If you do not have `ERPSys` checked out alongside this repository, clone it before starting
non-trivial work. Guessing at the conventions is how the program fragments.

## Rules that apply here, without exception

1. **NEVER create a new file in `ERPSys/docs/ai/`.** It holds exactly ten files, for the
   entire life of the project. **Never fork the master docs into this repo.**
2. **NEVER overwrite or regenerate a master document.** Amend surgically.
3. **NEVER suppress a check to make it pass.** No `@ts-nocheck`, `@ts-ignore`,
   `eslint-disable`, `continue-on-error`, `|| true`, `--no-verify`. A failing check means the
   code is wrong, not the check.
4. **ALWAYS build end-to-end**: Model → Database → API → Auth → UI → Test.
5. **ALWAYS log to `ERPSys/docs/ai/CHANGELOG.md`**, tagged with this repo's name. One log for
   the whole program — there is no local changelog.
6. **ALWAYS keep the shared contract**: this service talks to the core through the extension
   gateway with a declared `apiVersion`. Never bypass it, and never import core internals.

## Non-negotiables on every change

- Every table has `tenantId` + an RLS policy + a passing two-tenant isolation test
- Every endpoint has an explicit permission check and Zod validation
- Money is `Decimal(19,4)` — never `Float`
- No hardcoded hex colours or pixel values — design tokens only
- No secrets, credentials, or real customer data in the repo
- No one-off scripts, temp files, debug logs, or scratch directories left behind

## The two agents

- **`feature-architect`** — builds new capability and scales the platform (the DEV flow)
- **`security-sentinel`** — finds and fixes bugs, vulnerabilities, and decay (the QA flow)

Definitions: `ERPSys/.claude/agents/`. They are vendor-neutral — follow them whichever tool
you are (Claude, Antigravity, DeepSeek, Copilot, Cursor, Gemini, Windsurf, or any future one).

## Before you push (this repo has NO local git hook)

Unlike `ERPSys`, this repository has **no husky pre-push hook** — husky is not installed here,
so any hook file would be a dead file that silently does nothing. That is worse than none,
because it looks like protection. **CI is the real gate** (`.github/workflows/guard.yml` and
`ci.yml`), and it blocks the merge.

Run this locally before every push so CI never surprises you:

```bash
node scripts/ci/check-secrets.mjs --all && pnpm typecheck && pnpm build
```

If you want a real local hook here, install husky properly (`pnpm add -D husky`, add a
`prepare` script, regenerate the lockfile) — do not hand-create `.husky/` files, which do
nothing without the dependency.

---

## Current priority

**Phase 0 — foundation restoration.** Read `ERPSys/docs/ai/ARCHITECTURE_REVIEW.md`. The
platform scores 5.4/10. Foundation remediation outranks new features until Phase 0 completes.

