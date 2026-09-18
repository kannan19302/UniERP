param(
    [string]$Mode = 'auth',
    [string]$Profile = 'core',
    [string]$App = 'tenant-apps',
    [switch]$Down
)

$ErrorActionPreference = 'Stop'

# Find workspace root by walking up until infra\docker-compose.dev.yml is found
$searchDir = $PSScriptRoot
if (-not $searchDir) { $searchDir = (Get-Location).Path }
$WorkspaceRoot = $null

$curr = $searchDir
while ($curr) {
    if (Test-Path "$curr\infra\docker-compose.dev.yml") {
        $WorkspaceRoot = $curr
        break
    }
    $parent = Split-Path $curr -Parent
    if ($parent -eq $curr) { break }
    $curr = $parent
}

if (-not $WorkspaceRoot) {
    $WorkspaceRoot = (Resolve-Path "$PSScriptRoot\..\..").Path
}
$InfraDir = "$WorkspaceRoot\infra"

if ($Down) {
    Write-Host 'Stopping all Docker services...' -ForegroundColor Yellow
    Push-Location $InfraDir
    try {
        docker compose -f docker-compose.dev.yml -f docker-compose.platform.yml --profile full down
    } finally {
        Pop-Location
    }
    Write-Host 'Services stopped cleanly.' -ForegroundColor Green
    return
}

Write-Host '============================================================' -ForegroundColor Cyan
Write-Host "  UniERP Fast Dev Engine  |  Mode: $Mode  |  Profile: $Profile" -ForegroundColor Cyan
Write-Host '============================================================' -ForegroundColor Cyan
Write-Host ''

if ($Mode -in @('auth', 'backend', 'bundle')) {
    Write-Host '[1/3] Starting Backend & Auth Bundle in Docker (PostgreSQL, Redis, Mailpit, MinIO, API, IdP)...' -ForegroundColor Yellow
    Push-Location $InfraDir
    try {
        # Stop frontend containers that might hold ports or consume host CPU
        docker stop platform-wizard tenant-apps tenant-admin provider-admin-os 2>$null | Out-Null
        docker compose -f docker-compose.dev.yml -f docker-compose.platform.yml --profile auth up -d
    } finally {
        Pop-Location
    }

    Write-Host ''
    Write-Host '[2/3] Waiting for Backend & Datastores healthcheck...' -ForegroundColor Yellow
    $retries = 20
    while ($retries -gt 0) {
        $pg = docker inspect --format='{{.State.Health.Status}}' postgres 2>$null
        $idpStatus = docker inspect --format='{{.State.Status}}' idp 2>$null
        if ($pg -eq 'healthy' -and $idpStatus -eq 'running') {
            Write-Host '  [OK] PostgreSQL and IdP Auth are healthy and ready!' -ForegroundColor Green
            break
        }
        Start-Sleep -Seconds 2
        $retries--
    }

    Write-Host ''
    Write-Host '[3/3] Backend & Auth Bundle Active (Full Auth/Login Ready!)' -ForegroundColor Green
    Write-Host ''
    Write-Host '  Active Services:' -ForegroundColor Cyan
    Write-Host '    - IdP Auth Server: http://localhost:3005 (OIDC Login / Tokens)'
    Write-Host '    - API Monolith:    http://localhost:3001 (REST / Outbox)'
    Write-Host '    - PostgreSQL 16:   postgresql://unerp:unerp_password@localhost:5432/unerp_dev'
    Write-Host '    - Redis 7:         redis://localhost:6379'
    Write-Host '    - Mailpit Inbox:   http://localhost:8025'
    Write-Host '    - MinIO Console:   http://localhost:9001'
    Write-Host ''
    Write-Host '  Universal Testing Credentials:' -ForegroundColor Magenta
    Write-Host '    Email:    test.agent@unierp.com'
    Write-Host '    Password: TestAgent123!'
    Write-Host ''
    Write-Host '  Now simply launch Tenant Apps natively (sub-second HMR & 0ms lag):' -ForegroundColor Cyan
    Write-Host '    cd tenant-apps; pnpm dev    -> http://localhost:4003'
    Write-Host ''
} elseif ($Mode -eq 'hybrid') {
    Write-Host '[1/3] Starting Core Datastores in Docker (PostgreSQL, Redis, Mailpit, MinIO)...' -ForegroundColor Yellow
    Push-Location $InfraDir
    try {
        docker stop api idp platform-wizard tenant-apps tenant-admin provider-admin-os 2>$null | Out-Null
        docker compose -f docker-compose.dev.yml up -d postgres redis mailpit minio
    } finally {
        Pop-Location
    }

    Write-Host ''
    Write-Host '[2/3] Waiting for PostgreSQL and Redis healthcheck...' -ForegroundColor Yellow
    $retries = 15
    while ($retries -gt 0) {
        $status = docker inspect --format='{{.State.Health.Status}}' postgres 2>$null
        if ($status -eq 'healthy') {
            Write-Host '  [OK] PostgreSQL is healthy!' -ForegroundColor Green
            break
        }
        Start-Sleep -Seconds 2
        $retries--
    }

    Write-Host ''
    Write-Host '[3/3] Ready for Native Development (Sub-second HMR, 0ms polling delay)' -ForegroundColor Green
    Write-Host ''
    Write-Host '  Datastores Active:' -ForegroundColor Cyan
    Write-Host '    - PostgreSQL 16:  postgresql://unerp:unerp_password@localhost:5432/unerp_dev'
    Write-Host '    - Redis 7:        redis://localhost:6379'
    Write-Host '    - Mailpit Inbox:  http://localhost:8025'
    Write-Host '    - MinIO Console:  http://localhost:9001 (minioadmin / minioadmin)'
    Write-Host ''
    Write-Host '  To launch target apps natively on Windows (no WSL/Docker bridge overhead):' -ForegroundColor Cyan
    Write-Host '    API Backend:       cd api; pnpm dev'
    Write-Host '    IdP Auth:          cd idp; pnpm dev'
    Write-Host '    Tenant Apps (ERP): cd tenant-apps; pnpm dev    -> http://localhost:4003'
    Write-Host '    Tenant Admin:      cd tenant-admin; pnpm dev   -> http://localhost:4006'
    Write-Host '    Marketing Site:    cd marketing-site; pnpm dev -> http://localhost:4001'
    Write-Host ''
} elseif ($Mode -eq 'docker') {
    Write-Host "[1/2] Starting Scoped Docker Stack (Profile: $Profile)..." -ForegroundColor Yellow
    Push-Location $InfraDir
    try {
        docker compose -f docker-compose.dev.yml -f docker-compose.platform.yml --profile $Profile up -d
    } finally {
        Pop-Location
    }

    Write-Host ''
    Write-Host "[2/2] Launching Docker Compose Watch Sync for $App..." -ForegroundColor Yellow
    Push-Location $InfraDir
    try {
        docker compose -f docker-compose.dev.yml -f docker-compose.platform.yml --profile $Profile watch $App
    } finally {
        Pop-Location
    }
}
