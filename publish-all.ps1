$components = @(
    "button", "checkbox", "input", "select", "autocomplete",
    "dialog", "toast", "table", "radio-button", "multi-select",
    "otp-input", "color-picker", "drawer", "stepper", "confirmation-dialog",
    "command-palette", "notification-center", "copy-to-clipboard",
    "credit-card", "file-upload", "image-cropper", "video-player", "star-rating"
)

$baseDir = "C:\Users\aldemiro.valentim\Documents\Muxima\muxima-ui\packages\dist\libs"
$published = 0
$failed = 0

foreach ($component in $components) {
    $componentDir = Join-Path $baseDir $component
    if (Test-Path $componentDir) {
        Write-Host ""
        Write-Host "========================================"
        Write-Host "Publicando: $component"
        Write-Host "========================================"
        
        Push-Location $componentDir
        npm publish --access public
        $exitCode = $LASTEXITCODE
        Pop-Location
        
        if ($exitCode -eq 0) {
            Write-Host "OK: $component publicado com sucesso!"
            $published++
        } else {
            Write-Host "ERRO ao publicar $component"
            $failed++
        }
    } else {
        Write-Host "Diretorio nao encontrado: $componentDir"
    }
}

Write-Host ""
Write-Host "========================================"
Write-Host "RESUMO"
Write-Host "========================================"
Write-Host "Publicados: $published"
Write-Host "Falhas: $failed"
Write-Host "========================================"
