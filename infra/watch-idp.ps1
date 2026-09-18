<#
.SYNOPSIS
    UniERP IdP Container Auto-Build File Watcher (PowerShell)
    Watches d:\UniERP\idp\src\ and rebuilds the idp container automatically on file changes.
#>

param (
    [string]$Path = "$PSScriptRoot\..\idp\src"
)

$srcPath = Resolve-Path $Path
$infraDir = $PSScriptRoot

Write-Host "=== UniERP IdP Container Auto-Build File Watcher ===" -ForegroundColor Cyan
Write-Host "Watching: $srcPath" -ForegroundColor Gray
Write-Host "Infra Dir: $infraDir" -ForegroundColor Gray
Write-Host "Waiting for file changes in idp/src/... Press Ctrl+C to stop.`n" -ForegroundColor Green

$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $srcPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]'FileName, LastWrite, Size'

$script:isBuilding = $false
$script:lastTrigger = [DateTime]::MinValue

$action = {
    param($source, $eventArgs)
    
    $name = $eventArgs.Name
    if ($name -match '(\.git|node_modules|\.tmp$)') { return }

    $now = [DateTime]::UtcNow
    if (($now - $script:lastTrigger).TotalMilliseconds -lt 1500) { return }
    $script:lastTrigger = $now

    if ($script:isBuilding) {
        Write-Host "[Watcher] Build already in progress, skipping event: $name" -ForegroundColor Yellow
        return
    }

    $script:isBuilding = $true
    Write-Host "`n[Watcher] File changed: $name. Rebuilding idp container..." -ForegroundColor Magenta
    $sw = [System.Diagnostics.Stopwatch]::StartNew()

    try {
        Push-Location $infraDir
        docker compose -f docker-compose.dev.yml -f docker-compose.platform.yml up -d --build --no-deps idp
        $sw.Stop()
        Write-Host "[Watcher] [OK] idp container rebuilt & restarted in $($sw.Elapsed.TotalSeconds.ToString('F1'))s!`n" -ForegroundColor Green
    } catch {
        Write-Host "[Watcher] [FAILED] Build error: $_" -ForegroundColor Red
    } finally {
        Pop-Location
        $script:isBuilding = $false
    }
}

Register-ObjectEvent $watcher 'Changed' -Action $action | Out-Null
Register-ObjectEvent $watcher 'Created' -Action $action | Out-Null
Register-ObjectEvent $watcher 'Deleted' -Action $action | Out-Null
Register-ObjectEvent $watcher 'Renamed' -Action $action | Out-Null

try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    Get-EventSubscriber | Where-Object { $_.SourceIdentifier -like "*FileSystemWatcher*" } | Unregister-Event
    Write-Host "`nWatcher stopped." -ForegroundColor Gray
}
