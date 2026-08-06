#!/usr/bin/env bash
#
# Regenerate profile/ from the repository root.
#
# profile/ holds the copies of README.md and ARCHITECTURE.md that get published
# to the GitHub profile repository. They must be byte-identical to the root
# files, and CI enforces that. Keeping them in sync by hand does not work: the
# "Run it locally" section was added to README.md and not to profile/README.md,
# and main went red.
#
# Run this after editing README.md or ARCHITECTURE.md, then commit both.

set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

mkdir -p profile
for f in README.md ARCHITECTURE.md; do
  cp "$f" "profile/$f"
  echo "synced profile/$f"
done
