#!/usr/bin/env pwsh
<#
.SYNOPSIS
    UniERP Docker Compose Watch Helper
    Launches native docker compose watch with the active platform profile.
#>

param (
    [string]$Service = "idp",
    [string]$Profile = "full"
)

Write-Host "=== Starting Docker Compose Watch (Service: $Service, Profile: $Profile) ===" -ForegroundColor Cyan
docker compose -f docker-compose.dev.yml -f docker-compose.platform.yml --profile $Profile watch $Service
