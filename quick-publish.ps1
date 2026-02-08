# Publicar componentes já buildados
$components = @(
    "accordion", "alert", "autocomplete", "button", "checkbox",
    "color-picker", "command-palette", "confirmation-dialog", 
    "copy-to-clipboard", "credit-card", "dialog", "drawer",
    "file-upload", "image-cropper", "input", "multi-select",
    "notification-center", "otp-input", "radio-button", "select",
    "star-rating", "stepper", "table", "toast", "video-player"
)

$published = 0
$skipped = 0
$failed = 0

Write-Host "🚀 Publicando componentes Muxima UI..." -ForegroundColor Cyan
Write-Host ""

foreach ($comp in $components) {
    Write-Host "📦 $comp" -ForegroundColor White -NoNewline
    
    $distPath = "c:\Users\aldemiro.valentim\Documents\Muxima\muxima-ui\packages\dist\libs\$comp"
    
    if (Test-Path $distPath) {
        Push-Location $distPath
        $output = npm publish --access public 2>&1
        Pop-Location
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host " ✅" -ForegroundColor Green
            $published++
        } else {
            if ($output -match "already published|cannot publish over") {
                Write-Host " ⚠️  (já publicado)" -ForegroundColor Yellow
                $skipped++
            } else {
                Write-Host " ❌" -ForegroundColor Red
                $failed++
            }
        }
    } else {
        Write-Host " ⚠️  (não encontrado)" -ForegroundColor Yellow
        $skipped++
    }
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host "✅ Publicados: $published" -ForegroundColor Green
Write-Host "⚠️  Pulados:    $skipped" -ForegroundColor Yellow
Write-Host "❌ Falharam:   $failed" -ForegroundColor Red
