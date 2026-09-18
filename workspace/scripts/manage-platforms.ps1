# ============================================================
# UniERP Platform Manager — Windows PowerShell Helper
# ============================================================
# Usage:
#   .\scripts\manage-platforms.ps1 status
#   .\scripts\manage-platforms.ps1 validate
#   .\scripts\manage-platforms.ps1 start [-Profile full|customer|core|l4|l5|wizard]
#   .\scripts\manage-platforms.ps1 stop
#   .\scripts\manage-platforms.ps1 test
#   .\scripts\manage-platforms.ps1 open
# ============================================================

param(
    [Parameter(Position=0)]
    [string]$Command = "status",
    [string]$Profile = "full"
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ManagerScript = Join-Path $ScriptDir "platform-manager.mjs"

if ($Command -eq "start") {
    node $ManagerScript start --profile $Profile
} else {
    node $ManagerScript $Command
}
