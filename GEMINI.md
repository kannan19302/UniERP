# GEMINI.md

See **[`AGENTS.md`](AGENTS.md)** in this repository, and the canonical
[`AGENTS.md`](https://github.com/kannan19302/unierp-workspace/blob/main/AGENTS.md) in `unierp-workspace`. One operating contract, kept in one place so the
instructions cannot drift between vendors.

```bash
# from a unierp-workspace checkout
node scripts/start.mjs        # picks the next phase, claims it, prints the work order
node scripts/start.mjs --who  # what other agents are holding right now
```

**No claim without a mechanism that can fail.**
