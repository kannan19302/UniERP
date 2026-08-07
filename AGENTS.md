# AGENTS.md — unierp-platform

> **You are working on a production enterprise platform intended to run real businesses for a
> decade. Not a prototype.**

## Read this first, in `unierp-workspace`

This repository carries **no** PRD, TRD, architecture doc, plan, or changelog of its own. There is
one governing set for the whole platform and it lives in the **`unierp-workspace`** repository:

- **[`AGENTS.md`](https://github.com/kannan19302/unierp-workspace/blob/main/AGENTS.md)** — the operating contract for every coding agent, whichever vendor
- `docs/ai/` — the ten governance documents (product, technical, flow, design, schema, standards)
- `docs/programme/` — the 308-phase development plan

## Do not read the plan. Run start.

From a `unierp-workspace` checkout:

```bash
node scripts/start.mjs        # picks the next phase, CLAIMS it, prints the work order
node scripts/start.mjs --who  # what other agents are holding right now
```

The plan is 308 phases across 20 documents. An agent that reads it partially produces work that
contradicts a phase it never opened, which is worse than not reading it. `start.mjs` extracts
exactly one phase — and claims it with a pushed commit, so two agents never take the same work.

Before you stop, always one of:

```bash
node scripts/start.mjs --progress "what is done, what is next"
node scripts/start.mjs --finish --evidence-file ev.txt
node scripts/start.mjs --release "why blocked"
```

## First time here? Two commands

```bash
git clone https://github.com/kannan19302/unierp-workspace.git
cd unierp-workspace && node scripts/start.mjs
```

## Running alongside other agents

ADP's lock is a **pushed commit**, so it only works between agents that share one branch.
Two agents on two different feature branches cannot see each other's claims and will take
the same phase. That is a known limitation with a phase of its own (A27); until it lands:

- **One agent per working tree.** `node scripts/worktree.mjs new <slug>` gives you your own.
  Two agents in one tree overwrite each other's files no matter what ADP does.
- **All agents on the same branch**, so claims are mutually visible.
- `node scripts/start.mjs --who` before you begin. If someone holds the phase you wanted,
  pick another — do not work it anyway.

## The rule that matters more than any other

> **No claim without a mechanism that can fail.**

Do not report that something works. Show the command, its output, and its output when you break it
on purpose. This platform has three documented cases of a claim outliving its mechanism — 3,241
files silencing the type checker, a coverage gate with no threshold, and a CI step guarded by
`if: hashFiles(...)` on a script that exists in no repository.

**Making a gate pass by weakening the gate is the worst thing you can do here.** If a gate blocks
you and you believe it is wrong, say so and log it — do not defang it.

## Rejected on sight

1. A table without `tenantId` **and** an RLS policy in a migration.
2. An endpoint without `@Permissions(...)` in the same commit. Unauthorised → **403**.
3. `Float` anywhere near money. `Decimal(19,4)`, and keep the arithmetic in Decimal.
4. A hardcoded hex or `px` value. Design tokens only — 7 themes, orthogonal density.
5. A new document for notes or progress. Findings → `docs/programme/90-DEFECT-LOG.md`.
   Narrative → `docs/ai/CHANGELOG.md`. Nothing else.

## Build order, always

```
MODEL → DATABASE → API → AUTH → UI → TEST → SHIP
```

A layer does not start until the one above it passes its tests. A page written before its migration
exists is a mock, not a feature.

## Every change

Append **one line** to `docs/ai/CHANGELOG.md` in `unierp-workspace`. It is the only channel
between you and the next agent, who will have no memory of this session.

## Licence

AGPL-3.0. Every dependency you add must be open source.
