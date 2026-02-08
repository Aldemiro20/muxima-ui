# Script para criar ng-package.json para todos os componentes

$componentsToCreate = @(
    @{name="avatar"; path="packages/components/avatar/avatar"; dest="../../../dist/libs/avatar"},
    @{name="badge"; path="packages/components/badge/badge"; dest="../../../dist/libs/badge"},
    @{name="chip"; path="packages/components/chip/chip"; dest="../../../dist/libs/chip"},
    @{name="loading"; path="packages/components/loading/loading"; dest="../../../dist/libs/loading"},
    @{name="card"; path="packages/components/card/card"; dest="../../../dist/libs/card"},
    @{name="toggle"; path="packages/form/toggle/toggle"; dest="../../../dist/libs/toggle"},
    @{name="breadcrumb"; path="packages/navigation/breadcrumb/breadcrumb"; dest="../../../dist/libs/breadcrumb"},
    @{name="navbar"; path="packages/navigation/navbar/navbar"; dest="../../../dist/libs/navbar"},
    @{name="sidebar"; path="packages/navigation/sidebar/sidebar"; dest="../../../dist/libs/sidebar"},
    @{name="tabs"; path="packages/navigation/tabs/tabs"; dest="../../../dist/libs/tabs"},
    @{name="tooltip"; path="packages/overlay/tooltip/tooltip"; dest="../../../dist/libs/tooltip"},
    @{name="dropdown"; path="packages/overlay/dropdown/dropdown"; dest="../../../dist/libs/dropdown"},
    @{name="modal"; path="packages/overlay/modal/modal"; dest="../../../dist/libs/modal"},
    @{name="carousel"; path="packages/media/carousel/carousel"; dest="../../../dist/libs/carousel"},
    @{name="datepicker"; path="packages/form/datepicker/datepicker"; dest="../../../dist/libs/datepicker"},
    @{name="slider"; path="packages/form/slider/slider"; dest="../../../dist/libs/slider"},
    @{name="timeline"; path="packages/data/timeline/timeline"; dest="../../../dist/libs/timeline"},
    @{name="pagination"; path="packages/data/pagination/pagination"; dest="../../../dist/libs/pagination"},
    @{name="progress"; path="packages/components/progress/progress"; dest="../../../dist/libs/progress"}
)

$template = @'
{
    "$schema": "../../../node_modules/ng-packagr/ng-package.schema.json",
    "dest": "{DEST}",
    "lib": {
        "entryFile": "src/index.ts"
    }
}
'@

$created = 0
foreach ($comp in $componentsToCreate) {
    $ngPackagePath = Join-Path $comp.path "ng-package.json"
    
    if (-not (Test-Path $ngPackagePath)) {
        $content = $template -replace '{DEST}', $comp.dest
        [System.IO.File]::WriteAllText($ngPackagePath, $content, [System.Text.UTF8Encoding]::new($false))
        Write-Host "Criado: $($comp.name)" -ForegroundColor Green
        $created++
    } else {
        Write-Host "Existe: $($comp.name)" -ForegroundColor Yellow
    }
}

Write-Host "`nTotal criado: $created" -ForegroundColor Cyan
