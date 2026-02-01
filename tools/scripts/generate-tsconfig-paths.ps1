# Script para gerar os paths do tsconfig.base.json automaticamente

$packagesDir = "packages"
$paths = @{}

# Procurar todos os componentes nos subdiretorios categorizados
$categories = @("advanced", "components", "data", "form", "media", "navigation", "overlay", "utility")

foreach ($category in $categories) {
    $categoryPath = Join-Path $packagesDir $category
    if (Test-Path $categoryPath) {
        $components = Get-ChildItem -Path $categoryPath -Directory
        
        foreach ($component in $components) {
            $componentName = $component.Name
            $indexPath = Join-Path $component.FullName "src\index.ts"
            
            # Verificar se existe index.ts
            if (Test-Path $indexPath) {
                $relativePath = "packages/$category/$componentName/src/index.ts"
                $packageKey = "@muxima-ui/$componentName"
                
                Write-Host "[OK] $packageKey -> $relativePath"
                $paths[$packageKey] = @($relativePath)
            }
        }
    }
}

# Componentes na raiz de packages (como star-rating, storybook-host)
$rootComponents = Get-ChildItem -Path $packagesDir -Directory | Where-Object { 
    $_.Name -notin $categories -and $_.Name -ne "styles" -and $_.Name -ne "core"
}

foreach ($component in $rootComponents) {
    $componentName = $component.Name
    $indexPath = Join-Path $component.FullName "src\index.ts"
    
    if (Test-Path $indexPath) {
        $relativePath = "packages/$componentName/src/index.ts"
        $packageKey = "@muxima-ui/$componentName"
        
        Write-Host "[OK] $packageKey -> $relativePath"
        $paths[$packageKey] = @($relativePath)
    }
}

# Core package
if (Test-Path "packages\core\src\index.ts") {
    $paths["@muxima-ui/core"] = @("packages/core/src/index.ts")
    Write-Host "[OK] @muxima-ui/core -> packages/core/src/index.ts"
}

# Gerar JSON dos paths
Write-Host ""
Write-Host "=== Paths Gerados ==="
$pathsJson = $paths | ConvertTo-Json -Depth 10
Write-Host $pathsJson

Write-Host ""
Write-Host "Total de pacotes encontrados: $($paths.Count)"
