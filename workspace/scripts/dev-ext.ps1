# Dev orchestration for the poly-repo constellation (#8).
# Brings up the core dev stack plus every sibling unierp-app-* service on a
# shared `unierp` docker network, so `/api/v1/ext/<slug>/*` resolves locally.
#
#   ./scripts/dev-ext.ps1              # start core + all sibling app services
#   ./scripts/dev-ext.ps1 -Pull        # git pull each sibling repo first
#   ./scripts/dev-ext.ps1 -Down        # stop the app services
#
param([switch]$Pull, [switch]$Down)

$ErrorActionPreference = 'Stop'
$core = Split-Path -Parent $PSScriptRoot
$parent = Split-Path -Parent $core

$apps = @(
  @{ dir = 'unierp-app-education';   svc = 'education-svc';   port = 4101 },
  @{ dir = 'unierp-app-realestate';  svc = 'realestate-svc';  port = 4102 },
  @{ dir = 'unierp-app-fieldservice';svc = 'fieldservice-svc';port = 4103 },
  @{ dir = 'unierp-app-healthcare';  svc = 'healthcare-svc';  port = 4104 }
)

if ($Down) {
  foreach ($a in $apps) {
    $p = Join-Path $parent $a.dir
    if (Test-Path $p) { Push-Location $p; docker compose down; Pop-Location }
  }
  exit 0
}

# 1) Shared network the app composes attach to (external: true).
if (-not (docker network ls --format '{{.Name}}' | Select-String -Quiet '^unierp$')) {
  docker network create unierp | Out-Null
  Write-Host 'created docker network "unierp"'
}

# 2) Core dev stack, then join its Postgres + API to the shared network.
Push-Location $core
docker compose -f docker-compose.dev.yml up -d
Pop-Location
foreach ($c in @('unerp-postgres', 'unerp-dev')) {
  docker network connect unierp $c 2>$null | Out-Null
}

# 3) Each sibling service.
foreach ($a in $apps) {
  $p = Join-Path $parent $a.dir
  if (-not (Test-Path $p)) { Write-Warning "skip $($a.dir) (not cloned next to core)"; continue }
  Push-Location $p
  if ($Pull -and (Test-Path (Join-Path $p '.git'))) { git pull --ff-only }
  docker compose up -d --build
  Pop-Location
  Write-Host "up: $($a.dir) on :$($a.port)"
}

Write-Host ''
Write-Host 'Core .env should point at the service containers, e.g.:'
Write-Host '  FIELD_SERVICE_SERVICE_URL=http://fieldservice-svc:4103'
Write-Host '  HEALTHCARE_SERVICE_URL=http://healthcare-svc:4104'
Write-Host 'and share EXT_SERVICE_JWT_SECRET across core + services.'
