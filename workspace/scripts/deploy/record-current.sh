#!/usr/bin/env bash
# Records the currently-deployed SHA so a failed rollout can be reversed.
# docs/ai/TRD.md § 8 — "rollback is a redeploy of the previous SHA."
set -euo pipefail

ENVIRONMENT="${1:?usage: record-current.sh <environment>}"

# The running service reports the SHA it was built from. If it cannot be reached
# (first ever deploy, or the service is down) we record "none" and the caller
# treats rollback as unavailable rather than rolling back to something wrong.
case "$ENVIRONMENT" in
  production) BASE="${PRODUCTION_URL:-https://app.unierp.dev}" ;;
  staging)    BASE="${STAGING_URL:-https://staging.unierp.dev}" ;;
  *)          echo "::error::Unknown environment: $ENVIRONMENT"; exit 1 ;;
esac

SHA=$(curl -sS --max-time 10 "$BASE/health/live" 2>/dev/null \
      | grep -oE '"(sha|version|commit)"\s*:\s*"[a-f0-9]{7,40}"' \
      | grep -oE '[a-f0-9]{7,40}' | head -1 || true)

if [ -z "$SHA" ]; then
  echo "⚠ Could not determine the currently deployed SHA — rollback will be unavailable."
  SHA="none"
else
  echo "Current $ENVIRONMENT release: $SHA"
fi

if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "sha=$SHA" >> "$GITHUB_OUTPUT"
fi
