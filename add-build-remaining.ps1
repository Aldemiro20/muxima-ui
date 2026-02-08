# Script para adicionar build nos 3 componentes restantes

$components = @(
    @{name="date-range-picker"; path="packages/form/date-range-picker"},
    @{name="search-box"; path="packages/form/search-box"},
    @{name="slider-range"; path="packages/form/slider-range"}
)

$buildConfig = @'
,
    "build": {
      "executor": "@nx/angular:package",
      "outputs": ["{workspaceRoot}/dist/{projectRoot}"],
      "options": {
        "project": "PROJECT_PATH/ng-package.json"
      },
      "configurations": {
        "production": {
          "tsConfig": "PROJECT_PATH/tsconfig.lib.prod.json"
        },
        "development": {
          "tsConfig": "PROJECT_PATH/tsconfig.lib.json"
        }
      },
      "defaultConfiguration": "production"
    }
'@

$count = 0
foreach ($comp in $components) {
    $projectJsonPath = Join-Path $comp.path "project.json"
    
    if (Test-Path $projectJsonPath) {
        try {
            $content = Get-Content $projectJsonPath -Raw
            $buildToAdd = $buildConfig -replace "PROJECT_PATH", $comp.path
            
            # Adicionar antes do fechamento de targets
            $content = $content -replace '(\s*)"targets":\s*\{', "`$1`"targets`": {"
            $content = $content -replace '(\s*)\}(\s*)\}(\s*)$', "`$1$buildToAdd`n  }`$2}`$3"
            
            [System.IO.File]::WriteAllText($projectJsonPath, $content, [System.Text.UTF8Encoding]::new($false))
            
            Write-Host "Adicionado build em: $($comp.name)" -ForegroundColor Green
            $count++
        } catch {
            Write-Host "Erro em: $($comp.name) - $_" -ForegroundColor Red
        }
    }
}

Write-Host "`nTotal atualizado: $count" -ForegroundColor Cyan
