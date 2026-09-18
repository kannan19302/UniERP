# ==============================================================================
# UniERP / Platform — Archive Retired Repositories on GitHub
# ==============================================================================
# This script sets remote repositories to read-only (Archived) on GitHub.
# All repositories have already been backed up byte-for-byte to D:\backup\
# and their code consolidated into the active brand-neutral pillars.
# ==============================================================================

param(
    [switch]$DryRun
)

$reposToArchive = @(
    "kannan19302/unierp-web-studio",
    "kannan19302/unierp-tenant-sites",
    "kannan19302/unierp-corporate-site-template",
    "kannan19302/unierp-blockchain",
    "kannan19302/unierp-sandbox",
    "kannan19302/unierp-kernel",
    "kannan19302/unierp-service-kit",
    "kannan19302/unierp-config",
    "kannan19302/unierp-auth",
    "kannan19302/unierp-sdk",
    "kannan19302/unierp-storybook"
)

Write-Host "=== GitHub Remote Archiving Tool ===" -ForegroundColor Cyan
Write-Host "Target Repositories to Archive: $($reposToArchive.Count)" -ForegroundColor Yellow

foreach ($repo in $reposToArchive) {
    if ($DryRun) {
        Write-Host "[DryRun] Would archive: $repo" -ForegroundColor Gray
    } else {
        Write-Host "Archiving GitHub repo: $repo ..." -ForegroundColor White
        gh repo archive $repo --yes
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  -> Successfully archived $repo" -ForegroundColor Green
        } else {
            Write-Host "  -> Warning/Skipped: $repo" -ForegroundColor Yellow
        }
    }
}

Write-Host "Remote archiving process completed." -ForegroundColor Cyan
