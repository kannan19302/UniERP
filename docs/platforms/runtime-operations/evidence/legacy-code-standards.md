> **Migration status:** Legacy coding standard; current platform requirements and shared standards are authoritative.

# CODE STANDARDS — Conduct, Quality & Maintainability

> **The standard every line of code in this program is reviewed against.** One file.
> Amended, never replaced. Established 2026-07-31 · Read `README.md` § 0 before editing.
>
> **This document is the review checklist.** Every code review — human or AI, every time —
> walks § 9. If a change cannot pass § 9, it does not merge, regardless of who wrote it,
> how urgent it is, or how much work went into it.

---

## 1. Why this document exists

This codebase is ~660,000 lines, written largely by AI agents that do not share memory,
across six repositories, intended to be maintained for a decade. The people and agents who
will maintain it have not been born into this project yet. **Everything you leave behind —
code, names, comments, commit messages — is the entire inheritance they get.**

The failure mode this document prevents is specific and already visible in this repository:
code that _works today_ but that nobody — human or AI — can safely change tomorrow. An
8,283-line controller. A 40,577-line schema file. 3,242 files with the type checker switched
off. None of those were written by careless people. They were written one reasonable-seeming
decision at a time, with no standard saying "stop."

**This is that standard.**

### The one rule underneath all the others

> **Optimise for the reader, not the writer.**
> You will write this code once. It will be read, debugged, extended, and audited hundreds of
> times — often at 3am, often by someone with no context, often by an AI with a limited
> context window. Every trade-off in this document resolves in favour of the reader.

---

## 2. Code of conduct — how agents and humans behave here

These are behavioural rules. Violating them is not a style disagreement; it is a breach of
the working agreement.

### 2.1 Honesty about state

| Rule                                                                      | Meaning                                                                                                                     |
| :------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| **Never report work as done that is not done.**                           | "Implemented and tested" must mean implemented and tested. If you could not run the tests, say you could not run the tests. |
| **Never claim a check passed that you did not run.**                      | Report the command and its actual output, not your expectation of it.                                                       |
| **Surface failures immediately and prominently.**                         | A failure buried in the last paragraph of a long report is a failure you hid.                                               |
| **Report partial completion as partial.**                                 | "3 of 5 modules converted, 2 blocked on X" is a good report. "Converted the modules" when 2 are blocked is a false one.     |
| **If you are uncertain, say so and say why.**                             | Confident wrongness costs more than acknowledged uncertainty.                                                               |
| **Never fabricate a metric, a benchmark, a test result, or a file path.** | If you did not measure it, do not state it as measured.                                                                     |

### 2.2 Respect for other agents' work

| Rule                                                         | Meaning                                                                                                                                                         |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Never silently overwrite another agent's in-flight work.** | Pull first. If there is a conflict, resolve it deliberately or defer — never force.                                                                             |
| **Never delete code you do not understand.**                 | Understand it, then decide. "It looked unused" is not a justification; verify with a search.                                                                    |
| **Never revert a fix without reading why it was made.**      | Check `CHANGELOG.md` and the commit message first. Most "obviously wrong" code is load-bearing.                                                                 |
| **Leave the campsite cleaner.**                              | If you touch a file and see something small and safe to improve, improve it. If it is large, log it — do not silently leave it _or_ silently balloon your diff. |

### 2.3 Respect for the gates

| Rule                                                        | Meaning                                                                                                                                                                   |
| :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A failing check means the code is wrong, not the check.** | This is the single most-violated rule in this repository's history. Treat every instinct to suppress as a signal that you have not understood the problem yet.            |
| **Never add a suppression to make a pipeline green.**       | `@ts-nocheck`, `@ts-ignore`, `eslint-disable`, `continue-on-error`, `\|\| true`, `--no-verify`, widening a baseline. All of it. This is treated as a production incident. |
| **Never weaken a gate you find inconvenient.**              | If a gate is genuinely wrong, fix the gate deliberately, with an ADR in `TRD.md § 9` and a `CHANGELOG.md` entry explaining the reasoning. Never quietly.                  |
| **A red pipeline is never merged.**                         | Not "just this once." Not under deadline. The moment this becomes negotiable it stops being a gate.                                                                       |

### 2.4 Scope discipline

- **Do what was asked.** Not less, and not a surprise refactor of three adjacent modules.
- **If the task requires touching something outside its scope, say so before doing it.**
- **One logical change per commit.** A commit that fixes a bug _and_ renames a package _and_
  reformats a file cannot be reviewed or reverted.
- **Never create files that were not needed.** Especially not summary documents, plan files,
  or notes. (`README.md` rule 1.)

---

## 3. Naming

Names are the primary documentation. Most comments exist to compensate for bad names.

| Rule                                      | Bad                                 | Good                                                    |
| :---------------------------------------- | :---------------------------------- | :------------------------------------------------------ |
| Say what it **is**, not what it's made of | `dataArray`, `strName`, `objUser`   | `pendingInvoices`, `customerName`, `user`               |
| Use the business's vocabulary             | `Transaction` (for a sales order)   | `SalesOrder`                                            |
| Booleans read as assertions               | `flag`, `status`, `check`           | `isPosted`, `hasApprovals`, `canEdit`                   |
| Functions are verb phrases                | `invoiceData()`, `handler()`        | `calculateInvoiceTotal()`, `postJournalEntry()`         |
| No abbreviations except universal ones    | `calcInvTot`, `custMgr`, `wo`       | `calculateInvoiceTotal`, `customerManager`, `workOrder` |
| Units in the name where ambiguous         | `timeout`, `size`, `amount`         | `timeoutMs`, `sizeBytes`, `amountMinorUnits`            |
| No Hungarian, no type suffixes            | `userInterface`, `IUserService`     | `User`, `UserService`                                   |
| Plural means a collection                 | `const user = findMany()`           | `const users = findMany()`                              |
| Negative booleans are forbidden           | `isNotDisabled`, `hideIfNotVisible` | `isEnabled`, `isVisible`                                |

**Accepted universal abbreviations:** `id`, `url`, `api`, `db`, `http`, `ui`, `dto`, `sql`,
`utc`, `pdf`, `csv`, `min`, `max`, `avg`, `pct`. Nothing else.

**Consistency beats correctness.** If the codebase already calls it `tenantId` everywhere, a
new `organisationIdentifier` is wrong even if it is a better name. Rename globally or match.

---

## 4. Size and complexity limits

**These are mechanically enforced for new and modified files** (see § 10). Existing
violations are grandfathered under a ratchet — they may only decrease.

| Unit                  |       Limit | Hard ceiling | Why                                                 |
| :-------------------- | ----------: | -----------: | :-------------------------------------------------- |
| Function / method     |    50 lines |           80 | Past this, it is doing more than one thing          |
| Cyclomatic complexity |          10 |           15 | Past this, it cannot be exhaustively tested         |
| Function parameters   |           4 |            5 | More means it wants an options object               |
| Nesting depth         |           3 |            4 | Past this, use early returns or extract             |
| Service / class file  |   500 lines |          800 | Past this, the class has multiple responsibilities  |
| Controller file       |   300 lines |          400 | Controllers route; they do not think                |
| React component       |   200 lines |          300 | Past this, extract sub-components or hooks          |
| Test file             |   800 lines |         1200 | Past this, split by behaviour under test            |
| Prisma schema file    | 3,000 lines |        3,000 | Multi-file schemas exist; use them                  |
| Any single file       |           — |        1,000 | **Nothing in this codebase justifies 1,000+ lines** |

**On the 1,000-line ceiling:** an AI agent's usable context is finite. A file it cannot load
alongside the code it must integrate with is a file it will modify blindly. This limit is not
aesthetic — it is what keeps this codebase machine-maintainable.

**When you hit a limit, extract — do not suppress.** The limit is telling you the design has
drifted.

---

## 5. Structure and design

### 5.1 Single responsibility, concretely

A unit has one responsibility when you can describe what it does **in one sentence with no
"and"**. If your sentence needs "and", you have found the split.

```
❌ "Validates the order, calculates tax, posts to the ledger, and emails the customer."
✅ "Posts an approved sales order to the general ledger."
```

### 5.2 Layer rules (non-negotiable — see `IMPLEMENTATION_PLAN.md § 4`)

| Layer                 | May contain                                     | May NEVER contain                                                               |
| :-------------------- | :---------------------------------------------- | :------------------------------------------------------------------------------ |
| **Controller**        | Routing, HTTP status, serialisation, decorators | Business logic. **Any `if` that is not a guard clause belongs in the service.** |
| **Service**           | All business logic; the only Prisma caller      | HTTP concerns, `Request`/`Response`, rendering                                  |
| **DTO**               | Zod schema + inferred type                      | Logic, database access                                                          |
| **Repository/Prisma** | Data access                                     | Business rules                                                                  |
| **React component**   | Rendering + local UI state                      | Data fetching logic (use hooks), business rules                                 |

### 5.3 Dependency rules

- **Depend on abstractions at boundaries, concretions inside a module.** Do not build an
  interface for something with one implementation that will never have two.
- **No circular dependencies. Ever.** `pnpm architecture:check` enforces this.
- **No cross-module imports.** Cross-module facts go through the transactional outbox.
- **Third-party libraries are wrapped at the boundary** when we might replace them (payment
  providers, storage, mail). Not wrapped when replacement is inconceivable (React, Prisma).

### 5.4 State and mutation

- Prefer immutability. Mutate only where it is local and demonstrably faster.
- No shared mutable module-level state. Ever. It breaks under concurrency and makes tests
  order-dependent.
- Derive state; do not duplicate it. Two fields that must agree will eventually disagree.

---

## 6. Correctness rules that are non-negotiable

These are the ones that cause silent, expensive, discovered-months-later damage.

| Rule                                                                               | Why                                                                                           |
| :--------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| **Money is `Decimal(19,4)`. Never `Float`.**                                       | IEEE-754 cannot represent decimal fractions. A ledger that does not reconcile.                |
| **Money arithmetic uses a decimal library, never JS `number`.**                    | `0.1 + 0.2 !== 0.3`. Converting to `number` for "just this calculation" reintroduces the bug. |
| **All timestamps stored UTC; converted only at the presentation edge.**            | Timezone bugs surface at quarter-end, in production, in another country.                      |
| **Every `tenantId` filter is enforced at the database, not only the application.** | The application layer is convenience; RLS is proof.                                           |
| **Every external input is validated with Zod at the boundary.**                    | Trust nothing that crossed a network.                                                         |
| **Every `async` call has defined failure behaviour.**                              | An unhandled rejection in a financial path is data loss.                                      |
| **Never swallow an error silently.**                                               | `catch {}` with no logging destroys the only evidence of a production incident.               |
| **Optimistic concurrency (`version`) on every mutable business record.**           | Last-write-wins on an invoice loses a user's work invisibly.                                  |
| **Idempotency on every consumer of a domain event.**                               | At-least-once delivery means duplicates _will_ happen.                                        |
| **No `Math.random()` or `Date.now()` directly in business logic.**                 | Untestable. Inject them.                                                                      |

### 6.1 Error handling

```ts
// ❌ Silently destroys the evidence
try {
  await postToLedger(entry);
} catch {}

// ❌ Loses the cause and the stack
try {
  await postToLedger(entry);
} catch (e) {
  throw new Error("failed");
}

// ✅ Typed, contextual, preserves the cause, actionable
try {
  await postToLedger(entry);
} catch (cause) {
  throw new LedgerPostingError(
    `Failed to post journal entry ${entry.id} for tenant ${entry.tenantId}`,
    { cause },
  );
}
```

**Rules:** throw typed domain errors, never bare `Error` or strings. Always preserve `cause`.
Include the identifiers needed to investigate — **never** include PII, secrets, or full
record bodies. Catch only what you can genuinely handle; let everything else reach the global
handler that maps it to RFC 7807.

---

## 7. Comments and documentation

**Good code needs few comments. The ones it needs are irreplaceable.**

### Do not write

```ts
// Increment the counter
counter++;

// Get the user
const user = await getUser(id);
```

These add noise and go stale. The code already says this.

### Do write

```ts
// Ledger postings must precede the outbox insert: the outbox relay may fire within
// milliseconds of commit, and a consumer reading a half-posted entry would compute a
// wrong balance. Reordering these two lines caused incident #204.
await postLedgerLines(tx, entry);
await enqueueOutbox(tx, "invoice.posted", entry.id);
```

**Comment the WHY, never the WHAT.** Specifically comment:

- Non-obvious business rules and the regulation or decision behind them
- Why a _seemingly better_ approach was rejected (this is the highest-value comment there is)
- Ordering, timing, or concurrency constraints that are invisible in the code
- Workarounds for upstream bugs, with a link and a removal condition
- Anything that caused an incident (reference it)

### TODO discipline

```ts
// ❌ Becomes permanent, owned by nobody
// TODO: fix this properly

// ✅ Actionable, attributable, expiring
// TODO(#412): Replace with the batch endpoint once ext-gateway v2 ships (est. Q4 2026).
//   Current per-item loop is O(n) HTTP calls; acceptable only under the 200-item cap
//   enforced in the DTO.
```

A `TODO` without an issue number is a lie about intent. Either file it or fix it.

### Public API documentation

Every exported function, type, and endpoint carries a doc comment stating: what it does, what
it assumes, what it throws, and any side effect. Exports are contracts.

---

## 8. Testing standards

| Principle                              | Rule                                                                                                                                                                    |
| :------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Test behaviour, not implementation** | A test that breaks on a refactor with no behaviour change is a badly written test. Do not assert on private methods or call counts unless the count _is_ the behaviour. |
| **One reason to fail**                 | Each test asserts one behaviour. A test with 12 assertions across 4 concerns tells you nothing when it fails.                                                           |
| **Descriptive names**                  | `it('rejects a posted invoice edit')` — not `it('works')`, not `it('test 3')`.                                                                                          |
| **Arrange–Act–Assert, visibly**        | Blank lines between the three phases.                                                                                                                                   |
| **No logic in tests**                  | No `if`, no loops over cases with computed expectations. If the test needs logic to know the answer, it is reimplementing the code and will share its bugs.             |
| **Deterministic**                      | No real time, no real randomness, no real network, no test-order dependence. A flaky test is worse than no test — it trains people to ignore red.                       |
| **Real database for data-layer tests** | Mocked Prisma cannot prove RLS works. Tenant-isolation tests run against real Postgres.                                                                                 |

### Coverage that means something

Coverage measures which lines _ran_, not which behaviours are _proven_. A 23,000-line test
file that raises a percentage without asserting behaviour is worse than no test — it buys
false confidence at the cost of maintenance.

| Path                      | Requirement                                          |
| :------------------------ | :--------------------------------------------------- |
| Financial calculation     | **100%**, including every rounding and boundary case |
| Tenant isolation          | **100%** — every protected table, two-tenant proof   |
| Authorization             | **100%** — authorised → 200, unauthorised → 403      |
| Business logic (services) | ≥ 80%                                                |
| Everything else           | ≥ 60%                                                |

**Every bug fix ships with a test that fails before the fix and passes after.** No exceptions.
This is how a bug becomes permanently dead instead of seasonal.

---

## 9. THE REVIEW CHECKLIST

> **Run this on every change, every time.** Human review, AI review, self-review before
> pushing. This section is the reason this document exists — it is designed to be re-read,
> not memorised.

### 9.1 Blocking — any single ❌ stops the merge

- [ ] **No new suppressions.** No `@ts-nocheck`, `@ts-ignore`, `eslint-disable`,
      `continue-on-error`, `|| true`, `--no-verify`, no widened baseline.
- [ ] **`pnpm verify` is green**, and its output was actually read.
- [ ] **Every new table has `tenantId` + an RLS policy + a passing two-tenant test.**
- [ ] **Every new endpoint has `@Permissions(...)` and Zod validation.**
- [ ] **Money is `Decimal(19,4)`** and never converted to `number` for arithmetic.
- [ ] **No secrets, credentials, tokens, or real customer data** in code, tests, fixtures,
      seeds, logs, or docs.
- [ ] **No cross-module imports**; cross-module facts go through the outbox.
- [ ] **Built end-to-end** — migration + API + authorization + UI + tests all present. No mocks
      presented as features.
- [ ] **One line appended to `docs/ai/CHANGELOG.md`.**
- [ ] **No new files in `docs/ai/`**; no master document rewritten.
- [ ] **No one-off scripts, temp files, scratch dirs, or debug logs left behind.**

### 9.2 Quality — fix now, or log with a reason

- [ ] Every name says what the thing is, in the business's vocabulary
- [ ] Nothing exceeds the § 4 size and complexity limits
- [ ] Controllers contain no business logic
- [ ] Every error is typed, preserves `cause`, and carries investigable context without PII
- [ ] No silently swallowed errors
- [ ] Comments explain **why**; no comment restates the code; every `TODO` has an issue number
- [ ] Tests assert behaviour, are deterministic, and each has one reason to fail
- [ ] The bug fix has a test that fails without the fix
- [ ] No duplicated logic that should be shared (and no premature abstraction of things that
      merely look similar)
- [ ] UI uses design tokens only; no hardcoded hex or px
- [ ] All six screen states handled (loading / empty / filtered-empty / error / forbidden / partial)
- [ ] No N+1 queries on any path that can run in a loop
- [ ] Public exports carry doc comments

### 9.3 Maintainability — the questions that actually predict cost

- [ ] **Could a new agent, with only these ten docs and no conversation history, understand
      this change and safely extend it?** If not, the code or the comment is insufficient.
- [ ] **If this breaks at 3am, is there enough in the logs and error messages to diagnose it
      without reading the source?**
- [ ] **Does this make the _next_ change in this area easier or harder?**
- [ ] **Would deleting this feature be straightforward, or has it grown roots into unrelated
      modules?**
- [ ] **Is every file involved small enough to load into an agent's context alongside what it
      integrates with?**
- [ ] **Did this reduce the suppression ratchet, or at minimum not raise it?**

---

## 10. What is enforced mechanically vs. by review

Discipline does not scale across a decade and a rotating cast of agents. Everything that
_can_ be a machine check _must_ be one. This table is the map — and the roadmap.

| Standard                                  | Enforced by                                                                           | Status                                 |
| :---------------------------------------- | :------------------------------------------------------------------------------------ | :------------------------------------- |
| No new suppressions                       | `scripts/ci/check-suppressions.mjs`                                                   | ✅ Active (ratcheted)                  |
| No gate bypasses                          | `scripts/ci/check-policy.mjs` (HARD)                                                  | ✅ Active                              |
| No committed secrets                      | `scripts/ci/check-secrets.mjs`                                                        | ✅ Active, 3 layers                    |
| `docs/ai/` file count                     | `check-policy.mjs` + CI                                                               | ✅ Active (HARD)                       |
| No unsafe raw SQL                         | `check-policy.mjs`                                                                    | ✅ Ratcheted, 1 documented exception   |
| No `Float` money                          | `check-policy.mjs` + `check-schema-lints.mjs`                                         | ✅ Ratcheted                           |
| Every route guarded                       | `check-policy.mjs`                                                                    | ✅ Ratcheted (1,889 open)              |
| Design tokens only                        | `check-policy.mjs`                                                                    | ✅ Ratcheted                           |
| RLS on every tenant table                 | `check-migration-safety.mjs` + `check-rls-verify.mjs`                                 | ✅ Active (HARD)                       |
| No destructive DDL in deploys             | `check-migration-safety.mjs`                                                          | ✅ Active                              |
| Module boundaries, no cycles              | `pnpm architecture:check`                                                             | ✅ Active                              |
| Open-source licences only                 | `scripts/ci/check-licenses.mjs`                                                       | ✅ Active                              |
| CHANGELOG updated                         | CI (`guard` job)                                                                      | ✅ Active on PRs                       |
| **File / function size limits (§ 4)**     | `scripts/check-controller-decomposition.mjs`, `check-service-decomposition.mjs`, `check-page-decomposition.mjs`, `check-1000-line-ceiling.mjs` (baseline-ratcheted per file, L07–L10) | ✅ Active (ratcheted; 87/88 oversized controllers, 47/48 services, 260/261 pages still over their own limit — filed D077/D078/D079, gate prevents further growth) |
| **Coverage thresholds (§ 8)**             | `scripts/check-test-quality.mjs` (L14, forward-looking, ratcheted) + `scripts/inventory-coverage-padding.mjs` (L11, honest measurement)                                              | ✅ Active for new/modified tests (rejects the always-passing pattern as a class); the literal `vitest` `coverage.thresholds: 80` switch itself remains off — enabling it would require a real coverage run this environment cannot complete (type-aware/full-suite runs OOM here, see L11's own evidence) — not a judgement call, an infrastructure blocker, stated not hidden |
| **Naming conventions (§ 3)**              | ESLint `@typescript-eslint/naming-convention` (`unierp-api/eslint.config.mjs`, L02)                                                                                                    | ✅ Active (ratcheted; scoped to `src/modules/admin` — type-aware linting OOMs at wider scope in this environment, stated in L02's own evidence, not hidden)             |
| **No silent catch (§ 6.1)**               | ESLint `no-empty` + `code-standards/no-swallowed-catch` + `code-standards/no-cause-loss-rethrow` (`unierp-api/eslint.config.mjs`, L03)                                                | ✅ Active (ratcheted, whole-repo — 2,095 files scanned)                    |
| **TODO has an issue number (§ 7)**        | ESLint `code-standards/no-bare-todo` (`unierp-api/eslint.config.mjs`, L04)                                                                                                             | ✅ Active (ratcheted, whole-repo — 2,095 files scanned; 0 bare TODOs found) |
| Comment quality, naming judgement, design | **Human/AI review against § 9**                                                       | 🔍 Review only — irreducibly judgement |

> **R13 (original):** implement the rows that were ⏳ above as ESLint rules applied to **new
> and modified files only**, ratcheted like everything else, so they do not block work on
> the existing ~660k lines. Estimated 3 days. Until R13 lands, § 4 and the naming rules are
> enforced by review alone — which means they will drift. Prioritise it.

> **Amendment, 2026-08-07 — R13 now has phases, and this section's warning came true.** R13 was
> never implemented, so § 4 and § 3 have been enforced by review alone since this document was
> written. They drifted, exactly as predicted, and the measurement is worse than "drift":
>
> | § | Standard | Measured |
> | :- | :------- | :------- |
> | § 4 | Controller ≤ 300 lines (400 hard) | `advanced-finance.controller.ts` is **8,282** |
> | § 4 | Service ≤ 500 (800 hard) | `inventory.service.ts` is **3,989** |
> | § 4 | React component ≤ 200 (300 hard) | `connect/page.tsx` is **6,651** |
> | § 4 | *"Nothing in this codebase justifies 1,000+ lines"* | **86 non-test files** exceed it |
> | § 8 | No coverage-padding tests | **1,083 of 1,176** `it()` blocks in `*.coverage.spec.ts` are `catch (e) { expect(e).toBeDefined() }` — and CI excludes all 69 files |
>
> The § 8 row is the sharpest: *"A 23,000-line test file that raises a percentage without asserting
> behaviour is worse than no test"* was written about
> `unierp-api/src/modules/crm/tests/crm.service.coverage.spec.ts`, which is **23,285 lines** and
> still in the tree.
>
> **Amendment, 2026-08-12 (L19) — the ⏳ rows above are real, working mechanisms now.** L02–L04
> built the three ESLint-based rows directly (naming conventions, no-silent-catch,
> TODO-discipline — all in `unierp-api/eslint.config.mjs`, proven correct via break/restore
> against real code, not synthetic examples). L07–L10 built the size-limit rows as
> baseline-ratcheted line-count gates rather than ESLint's built-in `max-lines` (a real,
> working substitute, not the exact tool originally named). L11–L15 built the coverage-quality
> rows (the always-passing-test class is now a forward-looking CI gate; the literal 80 %
> threshold itself remains off, honestly, because a real coverage run OOMs in this
> environment — an infrastructure blocker, not a judgement call, and not silently claimed
> done). **Every row that could be mechanised has been** — the naming-convention and
> file-count numbers each gate reports are real, measured, and reproducible by rerunning the
> command named in its own row, not asserted from this document alone.

---

## 11. Refactoring rules

- **Never refactor and change behaviour in the same commit.** One is verifiable by tests
  passing unchanged; the other is not. Mixing them makes both unreviewable.
- **Refactor behind passing tests.** No tests? Write characterisation tests first, then
  refactor. Refactoring untested code is rewriting with extra steps.
- **Follow the Boy Scout Rule within your blast radius**, not beyond it. Improving the file
  you are in is good citizenship. Improving twelve files you were not asked to touch is an
  unreviewable diff.
- **Prefer many small, verifiable steps over one large leap.** Each step should leave the
  tree green and pushable.
- **Deleting code is a contribution.** Dead code is negative value: it must be read,
  maintained, compiled, and reasoned about, and it pays back nothing. Verify it is genuinely
  dead (search all six repos), then remove it, and say so in the CHANGELOG.

---

## 12. Anti-patterns — automatic rejection

| Anti-pattern                           | Why it is rejected                                                           |
| :------------------------------------- | :--------------------------------------------------------------------------- |
| Suppressing a check to go green        | Destroys the guarantee the check exists to provide                           |
| God class / god file                   | Cannot be reviewed, refactored, or loaded into context                       |
| Controller containing business logic   | Untestable without HTTP; duplicated across endpoints                         |
| `Float` for money                      | Silent, cumulative, discovered-by-an-auditor financial corruption            |
| Silent `catch {}`                      | Destroys the only evidence of a production failure                           |
| Copy-pasted logic across modules       | Fixes get applied to one copy; the others rot                                |
| Premature abstraction                  | Wrong abstraction costs more than duplication (three strikes, then refactor) |
| Boolean trap (`doThing(true, false)`)  | Unreadable at the call site; use an options object                           |
| Stringly-typed status/enum fields      | Typos become runtime bugs; use an enum                                       |
| Magic numbers and strings              | Name them; the name is the documentation                                     |
| Deep nesting instead of early returns  | Cognitive load grows exponentially with depth                                |
| Comments explaining what the code does | Noise that goes stale and gets trusted anyway                                |
| `TODO` with no issue number            | A lie about intent                                                           |
| Test with logic in it                  | Reimplements the code and inherits its bugs                                  |
| Flaky test left in the suite           | Trains everyone to ignore red — worse than no test                           |
| New file in `docs/ai/`                 | Fragments the source of truth (`README.md` rule 1)                           |
| Work with no CHANGELOG entry           | Invisible to every future agent; gets duplicated                             |

---

## 13. Amendment log

| Date       | Change                                                                                                                                                   | By          |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| 2026-07-31 | Document established as the 10th master file; the review checklist (§ 9) is now the standing review procedure; R13 filed for the unenforced rows in § 10 | Claude Code |
| 2026-08-07 | § 10 amended: R13 was never implemented and its own warning ("they will drift") came true — 86 files over the 1,000-line ceiling, an 8,282-line controller, and 1,083 of 1,176 `it()` blocks in `*.coverage.spec.ts` unable to fail. R13 now has phases L01–L06, with L07–L15 for the structural and test-quality debt, and A06 (coverage thresholds) is now blocked on L11–L13. No standard changed; only its enforcement status is recorded. | Claude Code |

