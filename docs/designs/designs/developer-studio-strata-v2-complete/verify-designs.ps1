$ErrorActionPreference = 'Stop'
$designDir = $PSScriptRoot
$workspaceDir = 'D:/UniERP'
$inventory = Get-Content -Raw -LiteralPath "$designDir/SCREEN_INVENTORY.json" | ConvertFrom-Json
$sourceInventory = Get-Content -Raw -LiteralPath "$designDir/SOURCE_INVENTORY.json" | ConvertFrom-Json
$coverage = Get-Content -Raw -LiteralPath "$designDir/COVERAGE.json" | ConvertFrom-Json
$baseline = Get-Content -Raw -LiteralPath "$designDir/BASELINE_HASHES.json" | ConvertFrom-Json
$provenance = Get-Content -Raw -LiteralPath "$designDir/GENERATION_PROVENANCE.json" | ConvertFrom-Json
$failures = [System.Collections.Generic.List[string]]::new()
$hashChanges = @($baseline | Where-Object { !(Test-Path -LiteralPath $_.Path) -or (Get-FileHash -LiteralPath $_.Path -Algorithm SHA256).Hash -ne $_.Hash })
if ($hashChanges.Count) { $failures.Add('Baseline files changed or missing') }
$pngs = @(Get-ChildItem -LiteralPath $designDir -Filter '*.png' -File)
$dimensions = @()
foreach ($png in $pngs) {
  $bytes = [IO.File]::ReadAllBytes($png.FullName)
  $signature = [BitConverter]::ToString($bytes[0..7])
  $width = [int]$bytes[16]*16777216 + [int]$bytes[17]*65536 + [int]$bytes[18]*256 + [int]$bytes[19]
  $height = [int]$bytes[20]*16777216 + [int]$bytes[21]*65536 + [int]$bytes[22]*256 + [int]$bytes[23]
  if ($signature -ne '89-50-4E-47-0D-0A-1A-0A' -or $width -ne 1536 -or $height -ne 1024) { $failures.Add("Invalid PNG: $($png.Name)") }
  $dimensions += [pscustomobject]@{ file=$png.Name; width=$width; height=$height; sha256=(Get-FileHash -LiteralPath $png.FullName -Algorithm SHA256).Hash }
}
if ($inventory.screens.Count -ne 60 -or $pngs.Count -ne 85) { $failures.Add('Wrong design/variant count') }
foreach ($screen in $inventory.screens) {
  if (!(Test-Path -LiteralPath "$designDir/$($screen.file)") -or !$screen.visuallyReviewed) { $failures.Add("Missing/unreviewed screen $($screen.id)") }
}
$gallery = Get-Content -Raw -LiteralPath "$designDir/gallery.html"
$links = @([regex]::Matches($gallery, '(?:src|href)="([^"]+)"') | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique)
foreach ($link in $links) { if (!(Test-Path -LiteralPath (Join-Path $designDir $link))) { $failures.Add("Missing gallery link: $link") } }
$galleryCount = [regex]::Matches($gallery,'<article ').Count
if ($galleryCount -ne 76) { $failures.Add('Gallery must contain 76 screens') }
foreach ($row in @($coverage.routeMap) + @($coverage.registry)) {
  if (!$row.screens.Count) { $failures.Add('Empty coverage mapping') }
  foreach ($id in $row.screens) { if ($id -lt 1 -or $id -gt 76) { $failures.Add("Invalid mapped ID: $id") } }
}
foreach ($req in $coverage.requirements.PSObject.Properties) {
  if (!$req.Value.Count) { $failures.Add("Empty requirement: $($req.Name)") }
  foreach ($id in $req.Value) { if ($id -lt 1 -or $id -gt 76) { $failures.Add("Invalid requirement ID: $id") } }
}
$normalize = { param($p) $p.Replace('\','/').ToLowerInvariant() }
$currentPages = @(rg --files "$workspaceDir/developer-platform/src/app" -g page.tsx | ForEach-Object { & $normalize $_.Replace('D:/UniERP/','') } | Sort-Object)
$auditedPages = @($sourceInventory.pages | ForEach-Object { & $normalize $_ } | Sort-Object)
$mappedPages = @($coverage.routeMap.source | ForEach-Object { & $normalize $_ } | Sort-Object)
if (@(Compare-Object $currentPages $auditedPages).Count -or @(Compare-Object $auditedPages $mappedPages).Count) { $failures.Add('Route inventory mismatch') }
$currentIds = @()
foreach ($owner in @('app','site','manage')) {
  $definition = Get-Content -Raw -LiteralPath "$workspaceDir/developer-platform/src/platform/builders/definitions/$owner.ts"
  $currentIds += @([regex]::Matches($definition, '\bid:\s*"([^"]+)"') | ForEach-Object { $_.Groups[1].Value })
}
if (@(Compare-Object ($currentIds | Sort-Object) ($coverage.registry.id | Sort-Object)).Count) { $failures.Add('Registry mismatch') }
if ($coverage.routeMap.Count -ne 73 -or $coverage.registry.Count -ne 34 -or @($coverage.requirements.PSObject.Properties).Count -ne 10) { $failures.Add('Wrong coverage counts') }
$copiedSources = 0
foreach ($entry in $provenance) {
  if ([string]::IsNullOrWhiteSpace($entry.initial.prompt)) { $failures.Add("Missing prompt $($entry.id)") }
  $pairs = @([pscustomobject]@{source=$entry.initial.source; file=$entry.initial.file})
  $pairs += @($entry.refinements | ForEach-Object { [pscustomobject]@{source=$_.resultPath; file=$_.file} })
  foreach ($pair in $pairs) {
    if ((Get-FileHash -LiteralPath $pair.source).Hash -ne (Get-FileHash -LiteralPath "$designDir/$($pair.file)").Hash) { $failures.Add("Copy differs: $($pair.file)") }
    $copiedSources++
  }
}
$gitStatus = @(git -C "$workspaceDir/developer-platform" status --short)
$report = [pscustomobject]@{
  checkedAt=(Get-Date).ToString('o'); selectedNewScreens=$inventory.screens.Count; galleryScreens=$galleryCount;
  generatedPngs=$pngs.Count; refinementIterations=25; selectedRefinedScreens=@($inventory.screens | Where-Object file -Match '_refined').Count;
  routeFiles=$currentPages.Count; registeredSurfaces=$currentIds.Count; requirements=@($coverage.requirements.PSObject.Properties).Count;
  preservedBaselineFiles=$baseline.Count; baselineChanges=$hashChanges.Count; resolvedGalleryTargets=$links.Count;
  verifiedSourceCopies=$copiedSources; developerGitStatus=$gitStatus; failures=@($failures); imageEvidence=$dimensions
}
$report | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath "$designDir/VERIFICATION_DATA.json" -Encoding utf8
$report | Select-Object * -ExcludeProperty imageEvidence | ConvertTo-Json -Depth 6
if ($failures.Count) { exit 1 }
