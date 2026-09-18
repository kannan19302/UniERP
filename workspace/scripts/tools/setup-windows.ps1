# UniERP Windows Developer Setup
# Per PLATFORM_ARCHITECTURE.md § 12.2 (Windows-specific measures)
# Run this script ONCE after cloning. It configures the native Windows development environment.
# No WSL required for building, testing, or verifying.
#
# Prerequisites: Node 22 LTS, pnpm 9.15.4, Flutter (optional), Git

param(
    [switch]$SkipDefenderExclusions,
    [switch]$SkipLongPaths,
    [string]$WorkspaceRoot = (Get-Location).Path
)

$ErrorActionPreference = "Stop"

Write-Host "UniERP Windows Developer Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host "Workspace: $WorkspaceRoot"
Write-Host ""

# ─── 1. Enable long-path support (§ 12.2 #6) ─────────────────────────────────
if (-not $SkipLongPaths) {
    Write-Host "[1/5] Enabling long-path support..." -ForegroundColor Yellow
    $regPath = "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem"
    $current = Get-ItemProperty -Path $regPath -Name LongPathsEnabled -ErrorAction SilentlyContinue
    if ($current.LongPathsEnabled -ne 1) {
        try {
            Set-ItemProperty -Path $regPath -Name LongPathsEnabled -Value 1 -Type DWord
            # Also set Git to handle long paths
            git config --global core.longpaths true
            Write-Host "  ✓ Long paths enabled (registry + git)" -ForegroundColor Green
        } catch {
            Write-Host "  ⚠ Could not set registry (requires admin). Run as Administrator to enable." -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ✓ Long paths already enabled" -ForegroundColor Green
    }
}

# ─── 2. Windows Defender exclusions (§ 12.2 #3) ──────────────────────────────
if (-not $SkipDefenderExclusions) {
    Write-Host "[2/5] Adding Windows Defender exclusions..." -ForegroundColor Yellow
    Write-Host "  (Prevents real-time scanning of node_modules writes — avoids large invisible tax)"
    
    $exclusions = @(
        $WorkspaceRoot,                           # workspace root
        "$env:APPDATA\pnpm",                      # pnpm store (default location)
        "$env:LOCALAPPDATA\pnpm",                 # pnpm cache
        "$WorkspaceRoot\node_modules",            # monorepo root node_modules
        "$WorkspaceRoot\apps\api\node_modules",   # api node_modules
        "$WorkspaceRoot\apps\web\node_modules",   # web node_modules
        "$WorkspaceRoot\.turbo"                   # Turborepo cache
    )
    
    foreach ($path in $exclusions) {
        try {
            Add-MpPreference -ExclusionPath $path -ErrorAction Stop
            Write-Host "  ✓ Excluded: $path" -ForegroundColor Green
        } catch {
            Write-Host "  ⚠ Could not exclude $path (requires admin or Defender not active)" -ForegroundColor Yellow
        }
    }
}

# ─── 3. Configure pnpm store on same NTFS volume (§ 12.2 #1) ─────────────────
Write-Host "[3/5] Configuring pnpm store location..." -ForegroundColor Yellow
$storeDir = "$WorkspaceRoot\.pnpm-store"
if (-not (Test-Path $storeDir)) {
    New-Item -ItemType Directory -Path $storeDir -Force | Out-Null
}
pnpm config set store-dir $storeDir
Write-Host "  ✓ pnpm store set to: $storeDir" -ForegroundColor Green
Write-Host "  (Same NTFS volume as checkout avoids cross-volume linking, the main Windows slowness)"

# ─── 4. NODE_OPTIONS per task (§ 12.2 #4) ────────────────────────────────────
Write-Host "[4/5] Setting task-specific NODE_OPTIONS..." -ForegroundColor Yellow
Write-Host "  (Not global — avoids masking the root cause of high memory)"
Write-Host "  ✓ web typecheck: NODE_OPTIONS=--max-old-space-size=4096 (already in package.json)" -ForegroundColor Green
Write-Host "  ✓ api typecheck: NODE_OPTIONS=--max-old-space-size=8192 (already in package.json)" -ForegroundColor Green

# ─── 5. Verify no bash-only scripts (§ 12.2 #5 / ADR-010) ───────────────────
Write-Host "[5/5] Verifying no bash-only build scripts..." -ForegroundColor Yellow
$bashScripts = Get-ChildItem -Path $WorkspaceRoot -Include "*.sh" -Recurse -ErrorAction SilentlyContinue |
    Where-Object { $_.FullName -notlike "*scripts\deploy*" -and $_.FullName -notlike "*scripts\ci*" }
if ($bashScripts.Count -eq 0) {
    Write-Host "  ✓ No .sh scripts outside scripts/deploy and scripts/ci" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Found .sh scripts that may require WSL:" -ForegroundColor Yellow
    $bashScripts | ForEach-Object { Write-Host "    - $($_.FullName)" -ForegroundColor Yellow }
    Write-Host "  ADR-010: These must be converted to .mjs or .ps1" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  pnpm install                    # Install all dependencies"
Write-Host "  pnpm run --filter @kannan19302/api dev # Start API (native Node, no WSL)"
Write-Host "  pnpm run --filter @kannan19302/web dev # Start web (native Next.js, port 3000)"
Write-Host "  cd apps\console && pnpm dev      # Start console (port 3001)"
Write-Host ""
Write-Host "DataStores (Docker Desktop required for these only):"
Write-Host "  docker compose -f docker-compose.dev.yml up -d db redis minio pgbouncer ollama"
Write-Host ""
Write-Host "Verify your setup:"
Write-Host "  node scripts\ci\verify.mjs       # Runs the same gates as CI"
