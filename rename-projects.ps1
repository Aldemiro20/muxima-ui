# Script para remover duplicacao de nomes nos project.json

$componentsToRename = @(
    @{oldName="avatar-avatar"; newName="avatar"; path="packages/components/avatar/avatar"},
    @{oldName="badge-badge"; newName="badge"; path="packages/components/badge/badge"},
    @{oldName="chip-chip"; newName="chip"; path="packages/components/chip/chip"},
    @{oldName="loading-loading"; newName="loading"; path="packages/components/loading/loading"},
    @{oldName="card-card"; newName="card"; path="packages/components/card/card"},
    @{oldName="toggle-toggle"; newName="toggle"; path="packages/form/toggle/toggle"},
    @{oldName="breadcrumb-breadcrumb"; newName="breadcrumb"; path="packages/navigation/breadcrumb/breadcrumb"},
    @{oldName="navbar-navbar"; newName="navbar"; path="packages/navigation/navbar/navbar"},
    @{oldName="sidebar-sidebar"; newName="sidebar"; path="packages/navigation/sidebar/sidebar"},
    @{oldName="tabs-tabs"; newName="tabs"; path="packages/navigation/tabs/tabs"},
    @{oldName="tooltip-tooltip"; newName="tooltip"; path="packages/overlay/tooltip/tooltip"},
    @{oldName="dropdown-dropdown"; newName="dropdown"; path="packages/overlay/dropdown/dropdown"},
    @{oldName="modal-modal"; newName="modal"; path="packages/overlay/modal/modal"},
    @{oldName="carousel-carousel"; newName="carousel"; path="packages/media/carousel/carousel"},
    @{oldName="datepicker-datepicker"; newName="datepicker"; path="packages/form/datepicker/datepicker"},
    @{oldName="slider-slider"; newName="slider"; path="packages/form/slider/slider"},
    @{oldName="timeline-timeline"; newName="timeline"; path="packages/data/timeline/timeline"},
    @{oldName="pagination-pagination"; newName="pagination"; path="packages/data/pagination/pagination"},
    @{oldName="progress-progress"; newName="progress"; path="packages/components/progress/progress"}
)

$count = 0
foreach ($comp in $componentsToRename) {
    $projectJsonPath = Join-Path $comp.path "project.json"
    
    if (Test-Path $projectJsonPath) {
        try {
            $content = Get-Content $projectJsonPath -Raw
            $content = $content -replace "`"name`":  `"$($comp.oldName)`"", "`"name`":  `"$($comp.newName)`""
            
            # Salvar sem BOM
            [System.IO.File]::WriteAllText($projectJsonPath, $content, [System.Text.UTF8Encoding]::new($false))
            
            Write-Host "Renomeado: $($comp.oldName) -> $($comp.newName)" -ForegroundColor Green
            $count++
        } catch {
            Write-Host "Erro em: $($comp.oldName) - $_" -ForegroundColor Red
        }
    }
}

Write-Host "`nTotal renomeado: $count" -ForegroundColor Cyan
