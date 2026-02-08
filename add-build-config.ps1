# Script para adicionar configuracao de build aos componentes

$componentsToFix = @(
    @{name="avatar-avatar"; path="packages/components/avatar/avatar"},
    @{name="badge-badge"; path="packages/components/badge/badge"},
    @{name="chip-chip"; path="packages/components/chip/chip"},
    @{name="loading-loading"; path="packages/components/loading/loading"},
    @{name="card-card"; path="packages/components/card/card"},
    @{name="toggle-toggle"; path="packages/form/toggle/toggle"},
    @{name="breadcrumb-breadcrumb"; path="packages/navigation/breadcrumb/breadcrumb"},
    @{name="navbar-navbar"; path="packages/navigation/navbar/navbar"},
    @{name="sidebar-sidebar"; path="packages/navigation/sidebar/sidebar"},
    @{name="tabs-tabs"; path="packages/navigation/tabs/tabs"},
    @{name="tooltip-tooltip"; path="packages/overlay/tooltip/tooltip"},
    @{name="dropdown-dropdown"; path="packages/overlay/dropdown/dropdown"},
    @{name="modal-modal"; path="packages/overlay/modal/modal"},
    @{name="carousel-carousel"; path="packages/media/carousel/carousel"},
    @{name="datepicker-datepicker"; path="packages/form/datepicker/datepicker"},
    @{name="slider-slider"; path="packages/form/slider/slider"},
    @{name="timeline-timeline"; path="packages/data/timeline/timeline"},
    @{name="pagination-pagination"; path="packages/data/pagination/pagination"},
    @{name="progress-progress"; path="packages/components/progress/progress"}
)

$count = 0
foreach ($comp in $componentsToFix) {
    $projectJsonPath = Join-Path $comp.path "project.json"
    
    if (Test-Path $projectJsonPath) {
        try {
            $content = Get-Content $projectJsonPath -Raw | ConvertFrom-Json
            
            # Adicionar configuracao de build se nao existir
            if (-not $content.targets.build) {
                $content.targets | Add-Member -NotePropertyName "build" -NotePropertyValue @{
                    executor = "@nx/angular:package"
                    outputs = @("{workspaceRoot}/dist/{projectRoot}")
                    options = @{
                        project = "$($comp.path)/ng-package.json"
                    }
                    configurations = @{
                        production = @{
                            tsConfig = "$($comp.path)/tsconfig.lib.prod.json"
                        }
                        development = @{
                            tsConfig = "$($comp.path)/tsconfig.lib.json"
                        }
                    }
                    defaultConfiguration = "production"
                }
                
                # Salvar sem BOM
                $json = $content | ConvertTo-Json -Depth 10
                [System.IO.File]::WriteAllText($projectJsonPath, $json, [System.Text.UTF8Encoding]::new($false))
                
                Write-Host "Adicionado build em: $($comp.name)" -ForegroundColor Green
                $count++
            } else {
                Write-Host "Ja tem build: $($comp.name)" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "Erro em: $($comp.name) - $_" -ForegroundColor Red
        }
    } else {
        Write-Host "Nao encontrado: $projectJsonPath" -ForegroundColor Red
    }
}

Write-Host "`nTotal atualizado: $count" -ForegroundColor Cyan
