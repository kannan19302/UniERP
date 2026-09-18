#!/usr/bin/env bash
# Post-deploy health gate — docs/ai/TRD.md § 8, Layer 4.
#
# A deploy is not "done" when the container starts; it is done when the service is proven
# healthy. This gate is what makes automatic rollback possible.
#
#   ./health-gate.sh https://app.unierp.dev [--strict]
set -euo pipefail

BASE="${1:?usage: health-gate.sh <base-url> [--strict]}"
STRICT="${2:-}"

ATTEMPTS=30          # 30 × 10s = 5 minutes to become ready
INTERVAL=10
ERROR_RATE_MAX=1.0   # percent, --strict only
P95_MAX_MS=800       # --strict only

echo "Health gate → $BASE ${STRICT}"

# ── 1. Readiness ─────────────────────────────────────────────────────────
ready=0
for i in $(seq 1 "$ATTEMPTS"); do
  code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 10 "$BASE/health/ready" || echo 000)
  if [ "$code" = "200" ]; then
    echo "  ✓ ready after $((i * INTERVAL))s"
    ready=1
    break
  fi
  echo "  … not ready (HTTP $code), attempt $i/$ATTEMPTS"
  sleep "$INTERVAL"
done

if [ "$ready" -ne 1 ]; then
  echo "::error::Service never became ready within $((ATTEMPTS * INTERVAL))s."
  exit 1
fi

# ── 2. Liveness + a real request path ────────────────────────────────────
for path in /health/live /api/v1/health; do
  code=$(curl -sS -o /dev/null -w '%{http_code}' --max-time 10 "$BASE$path" || echo 000)
  case "$code" in
    200|204) echo "  ✓ $path → $code" ;;
    404)     echo "  · $path not present (skipped)" ;;
    *)       echo "::error::$path returned $code"; exit 1 ;;
  esac
done

# ── 3. Strict mode: soak and check the error budget ──────────────────────
if [ "$STRICT" = "--strict" ]; then
  echo "  soaking for 60s before evaluating error rate…"
  sleep 60

  metrics=$(curl -sS --max-time 15 "$BASE/metrics" || true)

  if [ -n "$metrics" ]; then
    total=$(echo "$metrics" | awk '/^http_requests_total/ {s+=$NF} END {print s+0}')
    errors=$(echo "$metrics" | awk '/^http_requests_total.*status="5/ {s+=$NF} END {print s+0}')
    if [ "${total%.*}" -gt 0 ] 2>/dev/null; then
      rate=$(awk -v e="$errors" -v t="$total" 'BEGIN { printf "%.3f", (e/t)*100 }')
      echo "  error rate: ${rate}% (budget ${ERROR_RATE_MAX}%)"
      if awk -v r="$rate" -v m="$ERROR_RATE_MAX" 'BEGIN { exit !(r > m) }'; then
        echo "::error::Error rate ${rate}% exceeds the ${ERROR_RATE_MAX}% budget — rolling back."
        exit 1
      fi
    fi
  else
    echo "  ⚠ /metrics unavailable — readiness checks only"
  fi
fi

echo "✅ Health gate passed"
