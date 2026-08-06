# Governance

## Where the project stands today

UniERP has **one maintainer**, [@kannan19302](https://github.com/kannan19302),
who is also the original author. There are currently no other contributors with
commit rights, no formal committee, and no external sponsorship or corporate
backing.

That is stated plainly because you are entitled to know it before you invest
time. The practical consequences:

- **Bus factor is one.** If the maintainer stops, the project stalls. The
  AGPL-3.0 licence means you can always fork and continue, and everything needed
  to do so — architecture specification, migration history, runbooks — is public.
- **Review is a single queue.** Expect a first response within a week. A large
  or architecturally significant pull request may wait longer.
- **Decisions are made by one person.** They are, however, made in public and in
  writing.

## How decisions get made

Anything that changes a public contract, a layer boundary, or a security
guarantee is written down before it is merged, in
[`PLATFORM_ARCHITECTURE.md`](https://github.com/kannan19302/ERPSys/blob/main/docs/PLATFORM_ARCHITECTURE.md).
The rule the project holds itself to is that the document explains *why*,
including when the previous decision was wrong and what it cost.

Smaller changes are decided in the pull request. If a discussion needs more
room, it moves to an issue so it stays findable.

Disagreement is resolved by argument from consequences — what breaks, for whom,
and how it is detected — rather than by seniority. In a tie the maintainer
decides, and says so explicitly rather than letting the thread die.

## Becoming a maintainer

There is no committee to petition and no minimum contribution count. The path is:

1. **Land a few changes.** Anything real — a bug fix, a documentation
   correction, a gate that catches something.
2. **Review other people's changes.** Judgement about others' code is the scarce
   signal, and it is what the project most needs a second person for.
3. **Take ownership of an area.** A repository, a subsystem, a gate.

At that point the maintainer will offer commit rights. If you want them and have
not been asked, ask — it is more likely an oversight than a judgement.

Maintainers are expected to uphold the [non-negotiables](CONTRIBUTING.md#the-non-negotiables)
and the [Code of Conduct](CODE_OF_CONDUCT.md), and to say "I don't know" in
public when that is the true answer.

## Stepping back

Maintainers who go inactive keep their credit and lose their commit rights after
a reasonable, individually-agreed period. This is housekeeping, not a demotion,
and returning is a matter of asking.

## Changing this document

Open a pull request. Governance that cannot be renegotiated in public is not
governance.
