[CmdletBinding()]
param(
    [string] $BaseUrl = "http://localhost:3005",
    [string[]] $ExpectedProviders = @("google", "github")
)

$ErrorActionPreference = "Stop"

# Windows PowerShell 5.1 does not preload the assemblies that expose
# HttpClient or HttpUtility. Load them explicitly so this check behaves the
# same way in the developer shell and in newer PowerShell runtimes.
Add-Type -AssemblyName System.Net.Http
Add-Type -AssemblyName System.Web

function Assert-Condition {
    param(
        [bool] $Condition,
        [string] $Message
    )

    if (-not $Condition) {
        throw $Message
    }
}

$providerConfig = @{
    google = @{
        Host = "accounts.google.com"
        RequiresNonce = $true
        Scopes = @("openid", "email", "profile")
    }
    github = @{
        Host = "github.com"
        RequiresNonce = $false
        Scopes = @("read:user", "user:email")
    }
}

$discoveryUrl = "$($BaseUrl.TrimEnd('/'))/api/v1/auth/oauth/providers?journey=login"
$discovery = Invoke-RestMethod -Uri $discoveryUrl -TimeoutSec 10
$actualProviders = @($discovery.providers | Sort-Object)
$expected = @($ExpectedProviders | Sort-Object)

Assert-Condition ($actualProviders.Count -eq $expected.Count) `
    "Provider discovery returned $($actualProviders.Count) provider(s); expected $($expected.Count)."
Assert-Condition (($actualProviders -join ",") -eq ($expected -join ",")) `
    "Provider discovery returned an unexpected provider set."

$handler = [System.Net.Http.HttpClientHandler]::new()
$handler.AllowAutoRedirect = $false
$client = [System.Net.Http.HttpClient]::new($handler)

try {
    foreach ($provider in $expected) {
        Assert-Condition $providerConfig.ContainsKey($provider) `
            "No readiness policy is defined for provider '$provider'."

        $startUrl = "$($BaseUrl.TrimEnd('/'))/api/v1/auth/oauth/$provider/start?journey=login&return_to=%2Foidc%2Faccount"
        $response = $client.GetAsync($startUrl).GetAwaiter().GetResult()
        Assert-Condition ([int]$response.StatusCode -eq 302) `
            "$provider did not return an authorization redirect."

        $location = $response.Headers.Location
        Assert-Condition ($null -ne $location) "$provider returned no Location header."
        Assert-Condition ($location.Scheme -eq "https") "$provider authorization URL is not HTTPS."
        Assert-Condition ($location.Host -eq $providerConfig[$provider].Host) `
            "$provider redirected to an unexpected authorization host."

        $query = [System.Web.HttpUtility]::ParseQueryString($location.Query)
        Assert-Condition (-not [string]::IsNullOrWhiteSpace($query["client_id"])) `
            "$provider authorization request is missing client_id."
        Assert-Condition (-not [string]::IsNullOrWhiteSpace($query["state"])) `
            "$provider authorization request is missing state."
        Assert-Condition (-not [string]::IsNullOrWhiteSpace($query["code_challenge"])) `
            "$provider authorization request is missing PKCE."
        Assert-Condition ($query["code_challenge_method"] -eq "S256") `
            "$provider authorization request is not using PKCE S256."
        Assert-Condition ($query["response_type"] -eq "code") `
            "$provider authorization request is not using the authorization-code flow."

        if ($providerConfig[$provider].RequiresNonce) {
            Assert-Condition (-not [string]::IsNullOrWhiteSpace($query["nonce"])) `
                "$provider OIDC request is missing nonce."
        }

        $scopeSet = @($query["scope"] -split "[ +]" | Where-Object { $_ })
        foreach ($scope in $providerConfig[$provider].Scopes) {
            Assert-Condition ($scopeSet -contains $scope) `
                "$provider authorization request is missing scope '$scope'."
        }

        [pscustomobject]@{
            Provider = $provider
            Discovery = "visible"
            Redirect = "valid"
            PKCE = "S256"
            Nonce = if ($providerConfig[$provider].RequiresNonce) { "present" } else { "n/a" }
        }
    }
} finally {
    $client.Dispose()
    $handler.Dispose()
}
