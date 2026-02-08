# Script para Publicar Componentes no NPM
# Uso: .\publish-components.ps1 -components "kanban,comments,shopping-cart"

param(
    [Parameter(Mandatory=$false)]
    [string]$components = "",
    
    [Parameter(Mandatory=$false)]
    [switch]$all,
    
    [Parameter(Mandatory=$false)]
    [switch]$dryRun
)

Write-Host "🚀 Muxima UI - NPM Publisher" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Componentes avançados disponíveis
$availableComponents = @(
    "kanban",
    "comments", 
    "shopping-cart",
    "quill-editor",
    "calendar",
    "chart",
    "code-diff-viewer",
    "file-manager",
    "gantt-chart",
    "rich-text-editor",
    "smart-form-builder"
)

# Verificar se está logado no NPM
Write-Host "🔐 Verificando autenticação NPM..." -ForegroundColor Yellow
$npmUser = npm whoami 2>&1

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Você não está logado no NPM!" -ForegroundColor Red
    Write-Host "   Execute: npm login" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Logado como: $npmUser" -ForegroundColor Green
Write-Host ""

# Determinar quais componentes publicar
$componentsToPublish = @()

if ($all) {
    Write-Host "📦 Modo: Publicar TODOS os componentes avançados" -ForegroundColor Cyan
    $componentsToPublish = $availableComponents
} elseif ($components) {
    Write-Host "📦 Modo: Publicar componentes selecionados" -ForegroundColor Cyan
    $componentsToPublish = $components -split ","
} else {
    Write-Host "📦 Modo: Publicar componentes já buildados" -ForegroundColor Cyan
    # Publicar apenas componentes já publicados (default)
    $componentsToPublish = @("kanban", "comments", "shopping-cart", "quill-editor")
}

Write-Host "Componentes a publicar: $($componentsToPublish -join ', ')" -ForegroundColor White
Write-Host ""

if ($dryRun) {
    Write-Host "⚠️  DRY RUN - Nenhuma ação será executada" -ForegroundColor Yellow
    Write-Host ""
}

# Contador de sucessos e falhas
$published = 0
$failed = 0
$skipped = 0
$results = @()

foreach ($component in $componentsToPublish) {
    $component = $component.Trim()
    
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host "📦 Processando: $component" -ForegroundColor Cyan
    Write-Host ""
    
    # Verificar se componente existe
    $sourcePath = "packages\advanced\$component"
    if (-not (Test-Path $sourcePath)) {
        Write-Host "⚠️  Componente não encontrado em: $sourcePath" -ForegroundColor Yellow
        $skipped++
        $results += [PSCustomObject]@{
            Component = $component
            Status = "SKIPPED"
            Message = "Source not found"
        }
        continue
    }
    
    # 1. Build do componente
    Write-Host "🔨 Step 1/3: Building $component..." -ForegroundColor Yellow
    
    if (-not $dryRun) {
        $buildOutput = nx build $component 2>&1
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Build falhou!" -ForegroundColor Red
            Write-Host $buildOutput -ForegroundColor Red
            $failed++
            $results += [PSCustomObject]@{
                Component = $component
                Status = "FAILED"
                Message = "Build error"
            }
            continue
        }
        
        Write-Host "✅ Build concluído" -ForegroundColor Green
    } else {
        Write-Host "⚠️  [DRY RUN] Pulando build" -ForegroundColor Yellow
    }
    
    # 2. Verificar dist
    $distPath = "packages\dist\libs\$component"
    if (-not (Test-Path $distPath)) {
        Write-Host "❌ Dist não encontrado em: $distPath" -ForegroundColor Red
        $failed++
        $results += [PSCustomObject]@{
            Component = $component
            Status = "FAILED"
            Message = "Dist not found"
        }
        continue
    }
    
    Write-Host "✅ Dist encontrado" -ForegroundColor Green
    
    # 3. Publicar no NPM
    Write-Host "📤 Step 2/3: Publishing to NPM..." -ForegroundColor Yellow
    
    if (-not $dryRun) {
        Push-Location $distPath
        
        $publishOutput = npm publish --access public 2>&1
        $publishExitCode = $LASTEXITCODE
        
        Pop-Location
        
        if ($publishExitCode -ne 0) {
            # Verificar se é erro de versão já publicada
            if ($publishOutput -match "cannot publish over") {
                Write-Host "⚠️  Versão já publicada - pulando" -ForegroundColor Yellow
                $skipped++
                $results += [PSCustomObject]@{
                    Component = $component
                    Status = "SKIPPED"
                    Message = "Already published"
                }
            } else {
                Write-Host "❌ Publicação falhou!" -ForegroundColor Red
                Write-Host $publishOutput -ForegroundColor Red
                $failed++
                $results += [PSCustomObject]@{
                    Component = $component
                    Status = "FAILED"
                    Message = "Publish error"
                }
            }
            continue
        }
        
        Write-Host "✅ Publicado com sucesso!" -ForegroundColor Green
        $published++
        $results += [PSCustomObject]@{
            Component = $component
            Status = "SUCCESS"
            Message = "Published to NPM"
        }
    } else {
        Write-Host "⚠️  [DRY RUN] Pulando publicação" -ForegroundColor Yellow
        $results += [PSCustomObject]@{
            Component = $component
            Status = "DRY RUN"
            Message = "Would be published"
        }
    }
    
    Write-Host ""
}

# Resumo final
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host "📊 RESUMO DA PUBLICAÇÃO" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

if (-not $dryRun) {
    Write-Host "✅ Publicados:  $published" -ForegroundColor Green
    Write-Host "❌ Falharam:    $failed" -ForegroundColor Red
    Write-Host "⚠️  Pulados:     $skipped" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  DRY RUN - Nenhuma ação executada" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Detalhes:" -ForegroundColor White
$results | Format-Table -AutoSize

Write-Host ""

if ($published -gt 0) {
    Write-Host "🎉 Pacotes disponíveis em: https://www.npmjs.com/~$npmUser" -ForegroundColor Green
    Write-Host ""
    Write-Host "📦 Para instalar:" -ForegroundColor Cyan
    foreach ($result in $results | Where-Object { $_.Status -eq "SUCCESS" }) {
        Write-Host "   npm install @jokerscript/$($result.Component)" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "✨ Concluído!" -ForegroundColor Green

# Exit code baseado em falhas
if ($failed -gt 0) {
    exit 1
} else {
    exit 0
}
