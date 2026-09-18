[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateSet(
        "GOOGLE_OAUTH_CLIENT_ID",
        "GOOGLE_OAUTH_CLIENT_SECRET",
        "GOOGLE_OAUTH_ENABLED",
        "GITHUB_OAUTH_CLIENT_ID",
        "GITHUB_OAUTH_CLIENT_SECRET",
        "GITHUB_OAUTH_ENABLED",
        "MICROSOFT_OAUTH_CLIENT_ID",
        "MICROSOFT_OAUTH_CLIENT_SECRET",
        "MICROSOFT_OAUTH_ENABLED"
    )]
    [string] $Key,

    [string] $EnvPath = (Join-Path $PSScriptRoot "..\.env")
)

$value = Get-Clipboard -Raw
if ([string]::IsNullOrWhiteSpace($value)) {
    throw "The clipboard is empty. Copy the OAuth value and try again."
}

$value = $value.Trim()
if ($value.Contains("`r") -or $value.Contains("`n")) {
    throw "The OAuth value must be a single line."
}

$resolvedPath = [System.IO.Path]::GetFullPath($EnvPath)
$expectedRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot ".."))
if (-not $resolvedPath.StartsWith($expectedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "The environment file must remain inside the infra repository."
}

$lines = [System.Collections.Generic.List[string]]::new()
if (Test-Path -LiteralPath $resolvedPath) {
    foreach ($line in Get-Content -LiteralPath $resolvedPath) {
        $lines.Add($line)
    }
}

$replacement = "$Key=$value"
$found = $false
for ($index = 0; $index -lt $lines.Count; $index++) {
    if ($lines[$index] -match ("^\s*" + [regex]::Escape($Key) + "\s*=")) {
        $lines[$index] = $replacement
        $found = $true
        break
    }
}

if (-not $found) {
    $lines.Add($replacement)
}

[System.IO.File]::WriteAllLines(
    $resolvedPath,
    $lines,
    [System.Text.UTF8Encoding]::new($false)
)

Set-Clipboard -Value ""
Write-Output "$Key configured in the local ignored environment file; clipboard cleared."
