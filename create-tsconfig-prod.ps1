# Script para criar tsconfig.lib.prod.json em todos os 19 componentes

$components = @(
    @{path="packages/components/avatar/avatar"},
    @{path="packages/components/badge/badge"},
    @{path="packages/components/chip/chip"},
    @{path="packages/components/loading/loading"},
    @{path="packages/components/card/card"},
    @{path="packages/form/toggle/toggle"},
    @{path="packages/navigation/breadcrumb/breadcrumb"},
    @{path="packages/navigation/navbar/navbar"},
    @{path="packages/navigation/sidebar/sidebar"},
    @{path="packages/navigation/tabs/tabs"},
    @{path="packages/overlay/tooltip/tooltip"},
    @{path="packages/overlay/dropdown/dropdown"},
    @{path="packages/overlay/modal/modal"},
    @{path="packages/media/carousel/carousel"},
    @{path="packages/form/datepicker/datepicker"},
    @{path="packages/form/slider/slider"},
    @{path="packages/data/timeline/timeline"},
    @{path="packages/data/pagination/pagination"},
    @{path="packages/components/progress/progress"}
)

$template = @'
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

$count = 0
foreach ($comp in $components) {
    $filePath = Join-Path $comp.path "tsconfig.lib.prod.json"
    
    try {
        [System.IO.File]::WriteAllText($filePath, $template, [System.Text.UTF8Encoding]::new($false))
        Write-Host "Criado: $($comp.path)" -ForegroundColor Green
        $count++
    } catch {
        Write-Host "Erro em: $($comp.path) - $_" -ForegroundColor Red
    }
}

Write-Host "`nTotal criado: $count" -ForegroundColor Cyan
