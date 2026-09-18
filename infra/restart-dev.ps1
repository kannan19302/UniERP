#!/usr/bin/env pwsh
# UniERP dev platform restart script
# Run from: d:\UniERP\infra\
#   .\restart-dev.ps1 [-Profile full|customer|core|l4|l5|wizard]

param(
    [string]$Profile = "full"
)

Write-Host "=== UniERP Dev Restart (Profile: $Profile) ===" -ForegroundColor Cyan

Write-Host ""
Write-Host "[1/4] Stopping all existing containers..." -ForegroundColor Yellow
docker compose -f docker-compose.dev.yml -f docker-compose.platform.yml down --remove-orphans

Write-Host ""
Write-Host "[2/4] Removing stale images..." -ForegroundColor Yellow
$images = @(
  "unierp-infra-api", "unierp-infra-idp", "unierp-infra-tenant-apps",
  "unierp-infra-provider-admin-os", "unierp-infra-marketing-site",
  "unierp-infra-tenant-sites", "unierp-infra-web-studio", "unierp-infra-tenant-admin",
  "unierp-infra-marketplace", "unierp-infra-developer-platform",
  "unierp-infra-unierp-mobile", "unierp-infra-desktop-app",
  "unierp-infra-platform-wizard", "unierp-infra-storybook"
)
foreach ($img in $images) {
  docker image rm $img 2>$null
}

Write-Host ""
Write-Host "[3/4] Building and starting services with profile '$Profile'..." -ForegroundColor Yellow
docker compose -f docker-compose.dev.yml -f docker-compose.platform.yml --profile $Profile up -d --build

Write-Host ""
Write-Host "[4/4] Waiting 30s for services to initialise..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host ""
Write-Host "=== Platform Health Check ===" -ForegroundColor Cyan

$services = @(
  [pscustomobject]@{ Name = "platform-wizard   (:4000)"; Url = "http://localhost:4000" },
  [pscustomobject]@{ Name = "marketing-site    (:4001)"; Url = "http://localhost:4001" },
  [pscustomobject]@{ Name = "provider-admin-os (:4002)"; Url = "http://localhost:4002" },
  [pscustomobject]@{ Name = "tenant-apps       (:4003)"; Url = "http://localhost:4003" },
  [pscustomobject]@{ Name = "tenant-sites      (:4004)"; Url = "http://localhost:4004" },
  [pscustomobject]@{ Name = "web-studio        (:4005)"; Url = "http://localhost:4005" },
  [pscustomobject]@{ Name = "tenant-admin      (:4006)"; Url = "http://localhost:4006" },
  [pscustomobject]@{ Name = "marketplace       (:4007)"; Url = "http://localhost:4007" },
  [pscustomobject]@{ Name = "developer-platform(:4008)"; Url = "http://localhost:4008" },
  [pscustomobject]@{ Name = "unierp-mobile     (:4009)"; Url = "http://localhost:4009" },
  [pscustomobject]@{ Name = "desktop-app       (:4010)"; Url = "http://localhost:4010/health" },
  [pscustomobject]@{ Name = "api               (:3001)"; Url = "http://localhost:3001/api/v1/health" },
  [pscustomobject]@{ Name = "idp               (:3005)"; Url = "http://localhost:3005/api/v1/auth/check-email?email=probe@health.invalid" },
  [pscustomobject]@{ Name = "storybook         (:6006)"; Url = "http://localhost:6006" }
)

foreach ($svc in $services) {
  try {
    $resp = Invoke-WebRequest -Uri $svc.Url -TimeoutSec 5 -UseBasicParsing -ErrorAction Stop
    $code = $resp.StatusCode
    Write-Host "  [OK] $($svc.Name) - HTTP $code" -ForegroundColor Green
  } catch {
    $code = $_.Exception.Response.StatusCode.value__
    if ($null -eq $code) { $code = "UNREACHABLE" }
    Write-Host "  [!!] $($svc.Name) - $code" -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "Master SSO Platform Wizard is live at: http://localhost:4000" -ForegroundColor Cyan
