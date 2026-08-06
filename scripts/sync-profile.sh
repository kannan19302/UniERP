#!/usr/bin/env bash
#
# Regenerate profile/ from the repository root.
#
# profile/ holds the copies of README.md and ARCHITECTURE.md that get published
# to the GitHub profile repository. They are *generated*, not edited: run this
# after changing either root file, then commit the result. CI regenerates and
# fails if the committed output differs.
#
# Why this is not a plain `cp`. The published copies end up in a different
# repository, where a relative link like [ROADMAP.md](ROADMAP.md) points at a
# file that is not there. Every relative link is therefore rewritten to an
# absolute URL into this repository. A byte copy looked correct and shipped
# seven dead links.

set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

repo="https://github.com/kannan19302/UniERP"
blob="$repo/blob/main"

# The documents that live at the repository root and may be linked relatively.
# Listing them explicitly keeps the rewrite auditable: a link to something not
# on this list is left alone and caught by the link checker.
targets='README\.md|ARCHITECTURE\.md|ROADMAP\.md|GOVERNANCE\.md|SUPPORT\.md|CONTRIBUTING\.md|CODE_OF_CONDUCT\.md|SECURITY\.md|CHANGELOG\.md|CITATION\.cff|LICENSE'

mkdir -p profile
for f in README.md ARCHITECTURE.md; do
  # A bare "#anchor" resolves against the containing document, so its absolute
  # form depends on which file we are rewriting.
  if [ "$f" = "README.md" ]; then
    self="$repo" # the repository front page renders README.md
  else
    self="$blob/$f"
  fi

  # Delimited with @ rather than |, because $targets is an alternation.
  sed -E \
    -e "s@\]\(#@](${self}#@g" \
    -e "s@\]\((${targets})@](${blob}/\1@g" \
    "$f" >"profile/$f"

  echo "synced profile/$f"
done
