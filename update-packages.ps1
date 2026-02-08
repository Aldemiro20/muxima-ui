# Atualizar package.json de TODOS os componentes para @muxima-ui

$folders = @(
    "packages/components/*",
    "packages/form/*",
    "packages/navigation/*",
    "packages/overlay/*",
    "packages/data/*",
    "packages/media/*",
    "packages/utility/*"
)

$updated = 0

Write-Host "Atualizando package.json para @muxima-ui..." -ForegroundColor Cyan

foreach ($folder in $folders) {
    $packageFiles = Get-ChildItem -Path $folder -Filter "package.json" -Recurse -ErrorAction SilentlyContinue
    
    foreach ($file in $packageFiles) {
        $content = Get-Content $file.FullName -Raw
        
        # Verificar se precisa atualizar
        if ($content -match '@agt-ui/' -or $content -match '@jokerscript/') {
            $componentName = $file.Directory.Name
            
            # Extrair descrição atual se existir
            $desc = ""
            if ($content -match '"description":\s*"([^"]*)"') {
                $desc = $matches[1]
            } else {
                $desc = "$componentName component for Angular 18+"
            }
            
            # Criar novo package.json
            $newContent = @"
{
  "name": "@muxima-ui/$componentName",
  "version": "1.0.1",
  "description": "$desc - Muxima UI",
  "keywords": [
    "angular",
    "$componentName",
    "component",
    "muxima-ui"
  ],
  "author": "Muxima UI Team (jokerscript)",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/Aldemiro20/muxima-ui.git"
  },
  "homepage": "https://muxima-ui.vercel.app/components/$componentName",
  "bugs": {
    "url": "https://github.com/Aldemiro20/muxima-ui/issues"
  },
  "documentation": "https://muxima-ui.vercel.app",
  "publishConfig": {
    "access": "public"
  },
  "peerDependencies": {
    "@angular/common": "^18.0.0",
    "@angular/core": "^18.0.0",
    "@angular/forms": "^18.0.0"
  },
  "sideEffects": false
}
"@
            
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
            Write-Host "  Atualizado: $componentName" -ForegroundColor Green
            $updated++
        }
    }
}

Write-Host ""
Write-Host "Total atualizado: $updated" -ForegroundColor Cyan
