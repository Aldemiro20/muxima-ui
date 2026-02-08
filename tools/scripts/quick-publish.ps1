# ========================================
# Muxima UI - Quick Publish All (Simple)
# Publica todos os pacotes que têm package.json
# ========================================

$ErrorActionPreference = "Stop"

Write-Host "`n🚀 Muxima UI - Quick Publish" -ForegroundColor Cyan
Write-Host "============================`n" -ForegroundColor Cyan

# Check NPM login
Write-Host "Checking NPM login..." -ForegroundColor Blue
try {
    $npmUser = npm whoami 2>&1
    if ($LASTEXITCODE -ne 0) { throw "Not logged in" }
    Write-Host "✅ Logged in as: $npmUser`n" -ForegroundColor Green
} catch {
    Write-Host "❌ Not logged in to NPM" -ForegroundColor Red
    Write-Host "Please run: npm login`n" -ForegroundColor Yellow
    exit 1
}

# Build all
Write-Host "🏗️  Building all packages..." -ForegroundColor Blue
npm run build:all
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed`n" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build complete`n" -ForegroundColor Green

# Find and publish all packages
Write-Host "📤 Publishing all packages...`n" -ForegroundColor Blue

$published = 0
$failed = 0
$skipped = 0

Get-ChildItem -Path "dist\packages" -Recurse -Filter "package.json" -Depth 2 | ForEach-Object {
    $dir = $_.Directory.FullName
    $packageName = (Get-Content $_.FullName | ConvertFrom-Json).name
    
    Write-Host "Publishing $packageName..." -ForegroundColor Cyan
    
    Push-Location $dir
    try {
        npm publish --access public 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ Published successfully" -ForegroundColor Green
            $published++
        } else {
            Write-Host "  ⚠️  Skipped (may already exist)" -ForegroundColor Yellow
            $skipped++
        }
    } catch {
        Write-Host "  ❌ Failed" -ForegroundColor Red
        $failed++
    }
    Pop-Location
    Write-Host ""
}

# Summary
Write-Host "=============================" -ForegroundColor Cyan
Write-Host "📊 Summary" -ForegroundColor Blue
Write-Host "=============================" -ForegroundColor Cyan
Write-Host "✅ Published: $published" -ForegroundColor Green
Write-Host "⚠️  Skipped: $skipped" -ForegroundColor Yellow
Write-Host "❌ Failed: $failed" -ForegroundColor Red
Write-Host ""

if ($failed -eq 0) {
    Write-Host "🎉 Done!" -ForegroundColor Green
    Write-Host "View at: https://www.npmjs.com/~$npmUser`n" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  Some packages failed`n" -ForegroundColor Red
    exit 1
}
