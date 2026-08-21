> **Migration status:** Legacy agent/governance rules retained for history; ADP and agent coordination rules are retired.

# UniERP Governance — The Master Document Set

> **Status:** ACTIVE · **Established:** 2026-07-30 · **Applies to:** every repository in the UniERP program
> **Audience:** every AI coding agent (Claude Code, Google Antigravity, DeepSeek, GitHub Copilot,
> Cursor, Windsurf, Gemini, Aider, and any tool that does not exist yet) and every human contributor.

---

## 0. THE LAW OF THIS FOLDER — read before you write anything

This folder (`docs/ai/`) holds **exactly ten files**. That number does not change until the
Goal in `PRD.md` is declared complete — even if that takes years.

| #   | File                                               | What it is                                                                     |
| :-- | :------------------------------------------------- | :----------------------------------------------------------------------------- |
| 1   | `PRD.md` (legacy reference: `PRD.md`)                                 | Product Requirements — the blueprint. What we are building and why.            |
| 2   | `TRD.md` (legacy reference: `TRD.md`)                                 | Technical Requirements — every technology from local build to production host. |
| 3   | `APP_FLOW.md` (legacy reference: `APP_FLOW.md`)                       | Architectural + user-journey flow. Every screen, action, button, state.        |
| 4   | `UI_UX_BRIEF.md` (legacy reference: `UI_UX_BRIEF.md`)                 | Design language — colour, type, spacing, motion, accessibility.                |
| 5   | `BACKEND_SCHEMA.md` (legacy reference: `BACKEND_SCHEMA.md`)           | Data model, relationships, auth, storage, encryption.                          |
| 6   | `IMPLEMENTATION_PLAN.md` (legacy reference: `IMPLEMENTATION_PLAN.md`) | Build order and the agent workflow: Model → DB → API → Auth → UI.              |
| 7   | `ARCHITECTURE_REVIEW.md` (legacy reference: `ARCHITECTURE_REVIEW.md`) | Honest scored review + the remediation programme.                              |
| 8   | `CODE_STANDARDS.md` (legacy reference: `CODE_STANDARDS.md`)           | Conduct, code quality, maintainability — **the standing review checklist**.    |
| 9   | `CHANGELOG.md` (legacy reference: `CHANGELOG.md`)                     | The single append-only log of every change, in every repo.                     |
| 10  | `README.md`                                        | This file. The law.                                                            |

### The five hard rules

1. **DO NOT CREATE NEW FILES IN `docs/ai/`.** Not a `PRD_v2.md`, not a `NOTES.md`, not a
   `PLAN_2026-08.md`, not a `SUMMARY.md`. If information belongs to this program, it belongs
   _inside_ one of the ten files above. Agents that spawn sidecar documents fragment the
   source of truth; that is how the previous documentation set grew to 30,000 lines and
   stopped being read. **Anything you add here that is not one of the ten files will be
   deleted without review.**

2. **DO NOT OVERWRITE OR REWRITE A MASTER FILE.** These are living documents, amended by
   surgical edit. You may _add_ a section, _refine_ a paragraph, _update_ a table row, or
   _mark_ an item done. You may not regenerate a file from scratch, reorder it wholesale,
   truncate it, or replace its content with a summary. Each master file is one file for the
   entire life of the Goal.

3. **EVERY CHANGE IS AMENDED, NOT ANNOUNCED.** When you change a master file, add one line to
   `CHANGELOG.md`. No exceptions for "small" edits, doc tweaks, or typo fixes.

4. **THE MASTER DOCS OUTRANK YOUR OWN JUDGEMENT.** If code contradicts `TRD.md`, the code
   is wrong or the TRD needs a logged amendment — decide which, deliberately, and write it
   down. Never let them drift silently.

5. **CONFLICTS BLOCK, THEY DO NOT MERGE.** If two agents need the same file, the second one
   stops and picks other work. Coordination happens through git and `CHANGELOG.md`, nothing else.

### Amending a master file — the only permitted procedure

```
1. git pull --rebase                     # never edit a stale tree
2. Read the ENTIRE target file           # partial reads cause contradictory edits
3. Make the smallest edit that is true   # surgical; preserve surrounding structure
4. Append one line to docs/ai/CHANGELOG.md
5. Commit with a message naming the file and the reason
```

---

## 1. The Goal (verbatim, non-negotiable)

> **Build the most advanced ERP platform in the world** — a composable, multi-tenant,
> AI-native, cross-platform enterprise resource planning system that a real business can run
> on for a decade. Built on 100% open-source, self-hostable technology with zero mandatory
> proprietary dependencies.

This is not a hobby project, a demo, or a portfolio piece. Every decision is made as if a
customer's payroll runs on it tomorrow — because the intent is that it will.

There is **one Goal**. There are no side quests. Work that does not advance the Goal is not
started.

---

## 2. Scope — the repositories under this governance

This document set governs all six repositories. They are separate git remotes but one program.

| Repository                 | Role                                                                                 | Governance                              |
| :------------------------- | :----------------------------------------------------------------------------------- | :-------------------------------------- |
| `ERPSys`                   | The platform core (web, API, mobile, 24 packages). **Canonical home of `docs/ai/`.** | This folder                             |
| `unierp-corporate-website` | Marketing + acquisition site                                                         | Mirrors this folder via `GOVERNANCE.md` |
| `unierp-app-healthcare`    | Vertical microservice                                                                | Mirrors this folder via `GOVERNANCE.md` |
| `unierp-app-education`     | Vertical microservice                                                                | Mirrors this folder via `GOVERNANCE.md` |
| `unierp-app-realestate`    | Vertical microservice                                                                | Mirrors this folder via `GOVERNANCE.md` |
| `unierp-app-fieldservice`  | Vertical microservice                                                                | Mirrors this folder via `GOVERNANCE.md` |

**`ERPSys/docs/ai/` is the single source of truth.** Satellite repos carry a `GOVERNANCE.md`
that points here and adds only repo-local specifics. A satellite repo never forks the master
docs; it never keeps its own PRD, TRD, or changelog.

---

## 3. The two agents

Beyond these documents, the program runs exactly **two specialist agents**. Both live in
`.claude/agents/` and are described in vendor-neutral terms so any tool can execute them.

| Agent                   | Mission                                                                                                                                                                            | Invoke when                                       |
| :---------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------ |
| **`feature-architect`** | Build new capability and scale the platform to the next level. Owns the DEV flow: DB → API → Auth → UI → tests, end to end, production quality.                                    | "build", "add", "scale", "next feature", "ship"   |
| **`security-sentinel`** | Find and eliminate bugs, vulnerabilities, security flaws, and architectural decay in code that already exists. Owns the QA flow: hunt → prove → file → fix at root cause → verify. | "audit", "harden", "find bugs", "security review" |

Neither agent may relax a gate, suppress a check, or ship around a failure. See
`IMPLEMENTATION_PLAN.md § 6` (legacy reference: `IMPLEMENTATION_PLAN.md`) for how they interlock.

---

## 4. Instructions to every AI vendor

**This section is addressed directly to you, whichever tool you are.**

You are working on a production enterprise system that is intended to be maintained for ten
or more years by agents and humans who will never speak to each other. Everything you leave
behind — code, comments, documents, commit messages — is the only thing they will have.

**You MUST:**

- Read `PRD.md`, `IMPLEMENTATION_PLAN.md`, and `CODE_STANDARDS.md` before your first edit of any session.
- Read the relevant master doc before touching its domain (schema work → `BACKEND_SCHEMA.md`;
  UI work → `UI_UX_BRIEF.md`; infra work → `TRD.md`).
- Build **end-to-end**. A feature is not done until the database migration, the API endpoint,
  the authorization rule, the UI, and the tests all exist and pass. Frontend mocks are not
  features.
- Run the `CODE_STANDARDS.md` § 9 review checklist against your own change before you push.
- Log every unit of work in `CHANGELOG.md`.
- Leave the tree green. If your change makes a gate fail, you fix the gate's cause — you do
  not disable the gate.

**You MUST NOT:**

- Create new files in `docs/ai/`. (Rule 1 above. This is the rule most often broken.)
- Overwrite, regenerate, or truncate a master document. (Rule 2.)
- Add `@ts-nocheck`, `@ts-ignore`, `eslint-disable`, `--no-verify`, `continue-on-error`,
  `|| true`, or any other suppression to make a check pass. This is treated as a
  **production incident**, not a shortcut. CI blocks it mechanically.
- Commit secrets, credentials, tokens, or real customer data — in code, tests, fixtures,
  seeds, or documentation.
- Push to `main` with a failing gate. Ever. Under any deadline.
- Introduce a proprietary, closed-source, or paid-tier-mandatory dependency without an
  Architecture Decision Record in `TRD.md § 9`. Open-source-first is a hard product
  requirement, not a preference.
- Leave one-off scripts, scratch files, debug logs, `test-*.mjs`, or temp artifacts in the
  repository. Use your sandbox/scratch directory.

**Vendor pointer files.** Each tool reads a different filename. All of them are thin pointers
to this folder and carry no independent rules:

| Tool                           | Entry point                        |
| :----------------------------- | :--------------------------------- |
| Any agent (universal standard) | `/AGENTS.md`                       |
| Claude Code / Claude Desktop   | `/CLAUDE.md`                       |
| Google Antigravity             | `/.antigravity/rules.md`           |
| DeepSeek                       | `/.deepseek/rules.md`              |
| GitHub Copilot                 | `/.github/copilot-instructions.md` |
| Cursor                         | `/.cursor/rules/unierp.mdc`        |
| Windsurf                       | `/.windsurfrules`                  |
| Gemini CLI                     | `/GEMINI.md`                       |

If your tool reads a file not listed here, create that one pointer file at the repo root
(**not** in `docs/ai/`), make it a five-line redirect to this README, and log it in
`CHANGELOG.md`.

---

## 5. Definition of Done — applies to every unit of work, forever

A change is done when **all** of the following are true. Not most. All.

- [ ] Database migration written, reviewed, and applied through `pnpm db:migrate` (never `db:push`)
- [ ] Every new table carries `tenant_id` and an RLS policy
- [ ] API endpoint implemented with Zod validation, RBAC permission, and tenant scoping
- [ ] Authorization proven by a test that asserts tenant A cannot read tenant B's row
- [ ] UI built from `@kannan19302/ui-*` design tokens — no hardcoded hex, no hardcoded pixels
- [ ] Unit tests for business logic; E2E test for any user-facing flow
- [ ] Zero new `@ts-nocheck` / `@ts-ignore` / `eslint-disable` (CI ratchet enforces this)
- [ ] `pnpm verify` passes locally before push
- [ ] One line appended to `docs/ai/CHANGELOG.md`
- [ ] Relevant master doc amended if the change alters an interface, schema, or flow

---

## 6. History

The previous governance set (`.ai/`, `AGENTS.md`, `CLAUDE.md`, 13 role agents, 3 skills —
approximately 30,000 lines across 18 files) was deleted on 2026-07-30 and replaced by this
nine-file set. It is preserved in git history at commit `a7a353b5` and may be consulted for
historical context, but it carries **no authority**. Nothing in it is binding. Do not restore
any part of it without an entry in `CHANGELOG.md` explaining why.


