# Script para criar ng-package.json e tsconfig.lib.prod.json para os 3 componentes

$components = @(
    @{name="date-range-picker"; path="packages/form/date-range-picker"},
    @{name="search-box"; path="packages/form/search-box"},
    @{name="slider-range"; path="packages/form/slider-range"}
)

$ngPackageTemplate = @'
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/libs/COMPONENT_NAME",
  "lib": {
    "entryFile": "src/index.ts"
  }
}
'@

$tsconfigProdTemplate = @'
{
  "extends": "./tsconfig.lib.json",
  "compilerOptions": {
    "declarationMap": false
  },
  "angularCompilerOptions": {
    "compilationMode": "partial"
  }
}
'@

$ngCount = 0
$tsCount = 0

foreach ($comp in $components) {
    # Criar ng-package.json
    $ngPackagePath = Join-Path $comp.path "ng-package.json"
    $ngContent = $ngPackageTemplate -replace "COMPONENT_NAME", $comp.name
    
    try {
        [System.IO.File]::WriteAllText($ngPackagePath, $ngContent, [System.Text.UTF8Encoding]::new($false))
        Write-Host "ng-package.json criado: $($comp.name)" -ForegroundColor Green
        $ngCount++
    } catch {
        Write-Host "Erro ng-package: $($comp.name) - $_" -ForegroundColor Red
    }
    
    # Criar tsconfig.lib.prod.json
    $tsconfigPath = Join-Path $comp.path "tsconfig.lib.prod.json"
    
    try {
        [System.IO.File]::WriteAllText($tsconfigPath, $tsconfigProdTemplate, [System.Text.UTF8Encoding]::new($false))
        Write-Host "tsconfig.lib.prod.json criado: $($comp.name)" -ForegroundColor Green
        $tsCount++
    } catch {
        Write-Host "Erro tsconfig: $($comp.name) - $_" -ForegroundColor Red
    }
}

Write-Host "`nng-package.json: $ngCount | tsconfig.lib.prod.json: $tsCount" -ForegroundColor Cyan
