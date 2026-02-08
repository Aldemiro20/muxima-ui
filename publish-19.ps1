# Script para publicar os 19 novos componentes no NPM

$components = @(
    "avatar", "badge", "chip", "loading", "card",
    "toggle", "breadcrumb", "navbar", "sidebar", "tabs",
    "tooltip", "dropdown", "modal", "carousel", "datepicker",
    "slider", "timeline", "pagination", "progress"
)

Write-Host "Iniciando publicacao de $($components.Count) componentes..." -ForegroundColor Cyan

$success = 0
$failed = @()

foreach ($comp in $components) {
    $distPath = "packages\dist\libs\$comp"
    
    if (Test-Path $distPath) {
        Write-Host "`nPublicando: $comp" -ForegroundColor Yellow
        
        Push-Location $distPath
        $result = npm publish --access public 2>&1
        Pop-Location
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Publicado: $comp" -ForegroundColor Green
            $success++
        } else {
            Write-Host "Falha: $comp" -ForegroundColor Red
            $failed += $comp
        }
    } else {
        Write-Host "Nao encontrado: $distPath" -ForegroundColor Red
        $failed += $comp
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Publicados: $success de $($components.Count)" -ForegroundColor Green
if ($failed.Count -gt 0) {
    Write-Host "Falharam: $($failed -join ', ')" -ForegroundColor Red
}
