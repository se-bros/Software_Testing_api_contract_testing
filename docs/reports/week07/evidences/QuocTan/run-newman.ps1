# =============================================================================
# run-newman.ps1 — Generic Automated API Test Runner (Newman / Postman CLI)
# Project  : API & Contract Testing — Nhóm 3 (SEBros)
# Author   : Mạch Quốc Tấn (23127115)
# OS       : Windows (PowerShell 5.1+)
# =============================================================================

param(
    [string]$Cli                 = "newman",
    [string]$Collection          = "",
    [string]$Environment         = "",
    [string]$Data                = "",
    [string]$Folder              = "",
    [string]$Url                 = "http://localhost:8080",
    [string]$OutputBase          = "",
    [switch]$NoHtml,
    [switch]$NoJson,
    [switch]$NoCli,
    [switch]$SkipProviderCheck,
    [switch]$Help
)

$ErrorActionPreference = "Continue"

function Write-Info  { param($msg) Write-Host "[INFO]  $msg" }
function Write-Ok    { param($msg) Write-Host "[OK]    $msg" }
function Write-Warn  { param($msg) Write-Host "[WARN]  $msg" }
function Write-Err   { param($msg) Write-Host "[ERROR] $msg" }
function Write-Title {
    param($msg)
    Write-Host ""
    Write-Host "========================================"
    Write-Host "  $msg"
    Write-Host "========================================"
}

$ScriptDir = $PSScriptRoot
if (-not $ScriptDir) { $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path }
$RepoRoot = Split-Path -Parent (Split-Path -Parent $ScriptDir)
if (-not (Test-Path (Join-Path $RepoRoot "src\postman"))) { $RepoRoot = (Get-Location).Path }

$postmanDir = Join-Path $RepoRoot "src\postman"
$targetDir  = Join-Path $postmanDir "collections"
if ($Environment -eq "") { $Environment = Join-Path $postmanDir "environments\local.postman_environment.json" }
if ($OutputBase -eq "")  { $OutputBase = Join-Path $ScriptDir "output\reports" }

$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$reportDir = Join-Path $OutputBase $timestamp

if ($Help) {
    Get-Content $MyInvocation.MyCommand.Path | Where-Object { $_ -match "^#" } | ForEach-Object { $_ -replace "^# ?", "" }
    exit 0
}

function Test-Requirements {
    Write-Title "Kiem tra yeu cau he thong"
    try {
        $ver = & newman --version 2>&1
        Write-Ok "newman CLI  : v$ver"
    } catch {
        Write-Err "newman chua duoc cai dat. Cai dat: npm install -g newman"
        exit 1
    }
}

function Test-Provider {
    Write-Title "Kiem tra Provider API"
    Write-Info "Dang ket noi: $Url/products ..."
    $token = [System.DateTime]::UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    try {
        $resp = Invoke-WebRequest -Uri "$Url/products" -Headers @{Authorization="Bearer $token"} -UseBasicParsing -TimeoutSec 5
        Write-Ok "Provider API dang hoat dong tai $Url (HTTP $($resp.StatusCode))"
    } catch {
        Write-Err "Khong the ket noi den Provider API tai $Url"
        exit 1
    }
}

function Invoke-SingleRun {
    param([string]$ColPath)

    $colName = [System.IO.Path]::GetFileNameWithoutExtension($ColPath) -replace '\.postman_collection$', ''
    $label = $colName
    if ($Folder -ne "") {
        $safeFolder = ($Folder -replace '[^a-zA-Z0-9._-]', '_').ToLower()
        $label = "${colName}_${safeFolder}"
    }

    $htmlReport = Join-Path $reportDir "$label-report.html"
    $jsonReport = Join-Path $reportDir "$label-report.json"

    Write-Info "Dang thuc thi: $colName"

    $reporters = @()
    if (-not $NoCli)  { $reporters += "cli" }
    if (-not $NoHtml) { $reporters += "htmlextra" }
    if (-not $NoJson) { $reporters += "json" }
    if ($reporters.Count -eq 0) { $reporters = @("cli") }

    $args = @("run", $ColPath, "-e", $Environment, "--reporters", ($reporters -join ","), "--bail", "false")
    if (-not $NoHtml) { $args += @("--reporter-htmlextra-export", $htmlReport, "--reporter-htmlextra-title", $label) }
    if (-not $NoJson) { $args += @("--reporter-json-export", $jsonReport) }
    if ($Data -ne "") { $args += @("--iteration-data", $Data) }
    if ($Folder -ne "") { $args += @("--folder", $Folder) }

    & newman @args
    $rc = $LASTEXITCODE
    if ($rc -eq 0) { Write-Ok "PASSED -- $colName" }
    else { Write-Warn "FAILED (exit $rc) -- $colName" }
    return $rc
}

# Main Execution
Write-Title "Newman Automated Test Runner"
Write-Info "Timestamp : $timestamp"
Write-Info "Engine    : $Cli"
Write-Info "Output    : $reportDir"

Test-Requirements
if (-not $SkipProviderCheck) { Test-Provider }

New-Item -ItemType Directory -Force -Path $reportDir | Out-Null

$collections = @()
if ($Collection -ne "" -and (Test-Path $Collection -PathType Leaf)) {
    $collections += Get-Item $Collection
} elseif (Test-Path $targetDir) {
    $collections = Get-ChildItem -Path $targetDir -Filter "*.json"
}

if ($collections.Count -eq 0) {
    Write-Err "Khong tim thay collection nao."
    exit 1
}

Write-Title "Bat dau chay kiem thu ($($collections.Count) collection)"
$total = 0; $failed = 0

foreach ($col in $collections) {
    $total++
    $rc = Invoke-SingleRun $col.FullName
    if ($rc[-1] -ne 0) { $failed++ }
}

Write-Title "Tong ket"
Write-Info "Tong so Collections : $total"
Write-Info "Thanh cong (PASSED)  : $($total - $failed)/$total"
if ($failed -gt 0) {
    Write-Warn "That bai (FAILED)    : $failed/$total"
} else {
    Write-Ok "Tat ca bo kiem thu deu PASSED!"
}

Write-Info "Bao cao xuat tai: $reportDir"
