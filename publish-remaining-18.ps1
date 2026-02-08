# Script para publicar os 18 componentes restantes (avatar ja foi publicado)

$components = @(
    "badge", "chip", "loading", "card",
    "toggle", "breadcrumb", "navbar", "sidebar", "tabs",
    "tooltip", "dropdown", "modal", "carousel", "datepicker",
    "slider", "timeline", "pagination", "progress"
)

Write-Host "Publicando $($components.Count) componentes restantes..." -ForegroundColor Cyan
Write-Host "Pressione ENTER em cada prompt de autenticacao se necessario`n" -ForegroundColor Yellow

foreach ($comp in $components) {
    $distPath = "packages\dist\libs\$comp"
    
    Write-Host "`n[$($components.IndexOf($comp) + 1)/$($components.Count)] Publicando: $comp" -ForegroundColor Cyan
    
    if (Test-Path $distPath) {
        Push-Location $distPath
        npm publish --access public
        Pop-Location
    } else {
        Write-Host "Nao encontrado: $distPath" -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Processo concluido!" -ForegroundColor Green
Write-Host "Verifique em: https://www.npmjs.com/org/muxima-ui" -ForegroundColor Cyan
