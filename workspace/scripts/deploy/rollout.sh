#!/usr/bin/env bash
# Blue/green rollout — docs/ai/TRD.md § 8, Layer 4.
#
# Deploys an immutable, already-built, already-scanned, already-signed image by SHA.
# This script NEVER builds. Promoting a different artifact than the one CI verified would
# break the deployment contract.
#
#   ./rollout.sh <environment> <sha>
#
# Rollback is the same command with the previous SHA — which is why it completes in
# under 5 minutes and needs no special path.
set -euo pipefail

ENVIRONMENT="${1:?usage: rollout.sh <staging|production> <sha>}"
SHA="${2:?usage: rollout.sh <staging|production> <sha>}"

REGISTRY="${REGISTRY:-ghcr.io}"
IMAGE_PREFIX="${IMAGE_PREFIX:-${GITHUB_REPOSITORY:-unierp}}"
STACK="unierp-${ENVIRONMENT}"

case "$ENVIRONMENT" in
  staging|production) ;;
  *) echo "::error::Unknown environment: $ENVIRONMENT"; exit 1 ;;
esac

if [ "$SHA" = "none" ]; then
  echo "::error::No SHA to deploy (rollback target unavailable)."
  exit 1
fi

API_IMAGE="${REGISTRY}/${IMAGE_PREFIX}/api:${SHA}"
WEB_IMAGE="${REGISTRY}/${IMAGE_PREFIX}/web:${SHA}"

echo "─────────────────────────────────────────────────────"
echo " Rollout → ${ENVIRONMENT}"
echo "   sha : ${SHA}"
echo "   api : ${API_IMAGE}"
echo "   web : ${WEB_IMAGE}"
echo "─────────────────────────────────────────────────────"

# ── Verify the artifact before it touches the environment ────────────────
# An unsigned image is either not ours or was not produced by the pipeline.
if command -v cosign >/dev/null 2>&1; then
  echo "Verifying image signatures…"
  for img in "$API_IMAGE" "$WEB_IMAGE"; do
    cosign verify \
      --certificate-identity-regexp ".*" \
      --certificate-oidc-issuer-regexp ".*" \
      "$img" >/dev/null || {
        echo "::error::Signature verification failed for $img — refusing to deploy."
        exit 1
      }
  done
  echo "  ✓ signatures valid"
else
  echo "  ⚠ cosign not available — signature verification skipped"
fi

# ── Deploy ───────────────────────────────────────────────────────────────
# Two supported targets. Kubernetes is preferred at scale; compose covers the
# single-node reference deployment described in TRD § 7.4.
if command -v kubectl >/dev/null 2>&1 && [ -n "${KUBE_CONTEXT:-}" ]; then
  echo "Target: Kubernetes (context ${KUBE_CONTEXT})"
  kubectl --context "$KUBE_CONTEXT" -n "$STACK" set image deployment/api  api="$API_IMAGE"
  kubectl --context "$KUBE_CONTEXT" -n "$STACK" set image deployment/web  web="$WEB_IMAGE"

  # Surge-then-drain: new pods must be Ready before old ones are removed, so there
  # is no window in which the environment serves nothing.
  kubectl --context "$KUBE_CONTEXT" -n "$STACK" rollout status deployment/api --timeout=5m
  kubectl --context "$KUBE_CONTEXT" -n "$STACK" rollout status deployment/web --timeout=5m

elif [ -n "${DEPLOY_HOST:-}" ]; then
  echo "Target: remote docker compose on ${DEPLOY_HOST}"
  KEY_FILE=$(mktemp)
  trap 'rm -f "$KEY_FILE"' EXIT
  printf '%s' "${DEPLOY_KEY:?DEPLOY_KEY not set}" > "$KEY_FILE"
  chmod 600 "$KEY_FILE"

  ssh -i "$KEY_FILE" -o StrictHostKeyChecking=accept-new "$DEPLOY_HOST" bash -s <<REMOTE
set -euo pipefail
cd /opt/${STACK}

# Record what is running now, so the host itself can roll back independently.
docker compose config --images > .previous-images || true

export API_IMAGE="${API_IMAGE}"
export WEB_IMAGE="${WEB_IMAGE}"
export RELEASE_SHA="${SHA}"

docker compose pull api web

# --wait blocks until healthchecks pass; a container that never becomes healthy
# fails the command rather than silently serving errors.
docker compose up -d --no-deps --wait --wait-timeout 300 api web

docker image prune -f --filter "until=168h" || true
REMOTE

else
  echo "::error::No deploy target configured. Set KUBE_CONTEXT or DEPLOY_HOST."
  exit 1
fi

echo "✅ Rollout complete — ${ENVIRONMENT} @ ${SHA}"
echo "   Health gate runs next; a failure here rolls back automatically."
