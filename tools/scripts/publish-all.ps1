# ========================================
# Muxima UI - NPM Publishing Script (PowerShell)
# ========================================

$ErrorActionPreference = "Stop"

Write-Host "🚀 Muxima UI - NPM Publishing Tool" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if logged in to NPM
Write-Host "Checking NPM authentication..." -ForegroundColor Blue
try {
    $npmUser = npm whoami 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "Not logged in"
    }
    Write-Host "✅ Logged in as: $npmUser" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ You are not logged in to NPM" -ForegroundColor Red
    Write-Host "Please run: npm login" -ForegroundColor Yellow
    exit 1
}

# Ask for confirmation
$response = Read-Host "Do you want to continue with the publishing process? (y/n)"
if ($response -ne "y" -and $response -ne "Y") {
    Write-Host "Publishing cancelled."
    exit 0
}

# Step 1: Clean previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Blue
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
}
Write-Host "✅ Clean complete" -ForegroundColor Green
Write-Host ""

# Step 2: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Blue
npm ci
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Step 3: Build all packages
Write-Host "🏗️  Building all packages..." -ForegroundColor Blue
npm run build:all
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build complete" -ForegroundColor Green
Write-Host ""

# Step 4: List packages to publish
Write-Host "📋 Packages to publish:" -ForegroundColor Blue

$packages = @(
    "packages/components/button",
    "packages/components/alert",
    "packages/components/avatar",
    "packages/components/badge",
    "packages/components/card",
    "packages/components/chip",
    "packages/components/loading",
    "packages/components/progress",
    "packages/components/skeleton",
    "packages/components/accordion",
    "packages/form/input",
    "packages/form/checkbox",
    "packages/form/radio-button",
    "packages/form/select",
    "packages/form/toggle",
    "packages/data/pagination",
    "packages/data/table",
    "packages/navigation/tabs",
    "packages/overlay/modal",
    "packages/overlay/toast"
)

foreach ($package in $packages) {
    Write-Host "  - $package"
}
Write-Host ""

# Confirm publishing
$response = Read-Host "Proceed with publishing these packages? (y/n)"
if ($response -ne "y" -and $response -ne "Y") {
    Write-Host "Publishing cancelled."
    exit 0
}

# Step 5: Publish each package
Write-Host "📤 Publishing packages to NPM..." -ForegroundColor Blue
Write-Host ""

$published = 0
$failed = 0
$skipped = 0

foreach ($package in $packages) {
    $packageName = Split-Path $package -Leaf
    $distPath = "dist/$package"
    
    Write-Host "Publishing @muxima-ui/$packageName..." -ForegroundColor Blue
    
    if (-not (Test-Path $distPath)) {
        Write-Host "⚠️  Package not found in dist: $distPath" -ForegroundColor Yellow
        $skipped++
        continue
    }
    
    Push-Location $distPath
    
    try {
        npm publish --access public 2>&1 | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ @muxima-ui/$packageName published successfully" -ForegroundColor Green
            $published++
        } else {
            Write-Host "❌ Failed to publish @muxima-ui/$packageName" -ForegroundColor Red
            $failed++
        }
    } catch {
        Write-Host "❌ Error publishing @muxima-ui/$packageName" -ForegroundColor Red
        $failed++
    }
    
    Pop-Location
    Write-Host ""
}

# Step 6: Summary
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "📊 Publishing Summary" -ForegroundColor Blue
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "✅ Published: $published" -ForegroundColor Green
Write-Host "❌ Failed: $failed" -ForegroundColor Red
Write-Host "⚠️  Skipped: $skipped" -ForegroundColor Yellow
Write-Host ""

if ($failed -eq 0) {
    Write-Host "🎉 All packages published successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📚 View your packages at:"
    Write-Host "https://www.npmjs.com/~$npmUser"
    Write-Host ""
    Write-Host "📖 Documentation available at:"
    Write-Host "https://muxima-ui.vercel.app"
} else {
    Write-Host "⚠️  Some packages failed to publish. Please check the errors above." -ForegroundColor Red
    exit 1
}
