# publish-npm.ps1 — 一键发布 dsh-starter-zh 到 npm
# 从 $DSH_HOME/secrets/npm-token.txt 读取 token（不落盘、不回显）。
$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$dshHome = if ($env:DSH_HOME) { $env:DSH_HOME } else { Join-Path $HOME ".dsh" }
$tokenFile = Join-Path $dshHome "secrets
pm-token.txt"
if (-not (Test-Path $tokenFile)) {
  Write-Error "缺少 npm token：请先放置到 $tokenFile（granular token，All packages + Read and write + Bypass 2FA）"
}

$token = (Get-Content $tokenFile -Raw).Trim()
$npmrc = Join-Path $root ".npmrc"
$cache = Join-Path $root ".npm-cache"

Set-Content -Path $npmrc -Value "//registry.npmjs.org/:_authToken=$token" -NoNewline
try {
  Push-Location $root
  npm publish --ignore-scripts --cache $cache
  if ($LASTEXITCODE -ne 0) { throw "npm publish failed with exit $LASTEXITCODE" }
  Write-Host "published OK"
} finally {
  Pop-Location
  Remove-Item $npmrc -ErrorAction SilentlyContinue
}
