# Script para build dos 19 componentes recem configurados

$components = @(
    "avatar", "badge", "chip", "loading", "card",
    "toggle", "breadcrumb", "navbar", "sidebar", "tabs",
    "tooltip", "dropdown", "modal", "carousel", "datepicker",
    "slider", "timeline", "pagination", "progress"
)

Write-Host "Iniciando build de $($components.Count) componentes..." -ForegroundColor Cyan

$success = 0
$failed = @()

foreach ($comp in $components) {
    Write-Host "`nBuildando: $comp" -ForegroundColor Yellow
    
    $result = nx build $comp 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Build de $comp com sucesso" -ForegroundColor Green
        $success++
    } else {
        Write-Host "Falha no build de $comp" -ForegroundColor Red
        $failed += $comp
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Sucesso: $success de $($components.Count)" -ForegroundColor Green
if ($failed.Count -gt 0) {
    Write-Host "Falhou em: $failed" -ForegroundColor Red
}
