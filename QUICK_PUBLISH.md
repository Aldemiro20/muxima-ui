# 🚀 Quick Start - Publicar no NPM

## Comandos Rápidos

### 1️⃣ Preparação (Uma vez)
```bash
# Fazer login no NPM
npm login

# Verificar se está logado
npm whoami
```

### 2️⃣ Build (Toda vez)
```bash
# Build todos os componentes
npm run build:all
```

### 3️⃣ Publicar (Toda vez)

#### Windows (PowerShell):
```powershell
# Dar permissão de execução (primeira vez)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Opção 1: Executar script completo (build + publish)
.\tools\scripts\publish-all.ps1

# Opção 2: Comando único (PowerShell)
npm run build:all; Get-ChildItem -Path "dist\packages" -Recurse -Directory -Depth 2 | Where-Object { Test-Path (Join-Path $_.FullName "package.json") } | ForEach-Object { Push-Location $_.FullName; npm publish --access public; Pop-Location }

# Opção 3: Loop manual
npm run build:all
$packages = @("dist/packages/components/progress", "dist/packages/form/radio-button", "dist/packages/data/pagination")
foreach ($pkg in $packages) { Push-Location $pkg; npm publish --access public; Pop-Location }
```

#### Linux/Mac (Bash):
```bash
# Dar permissão de execução (primeira vez)
chmod +x tools/scripts/publish-all.sh

# Opção 1: Executar script completo (build + publish)
./tools/scripts/publish-all.sh

# Opção 2: Comando único (find)
npm run build:all && find dist/packages -name "package.json" -maxdepth 3 -execdir npm publish --access public \;

# Opção 3: Loop manual
npm run build:all
packages=("dist/packages/components/progress" "dist/packages/form/radio-button" "dist/packages/data/pagination")
for pkg in "${packages[@]}"; do cd "$pkg" && npm publish --access public && cd -; done
```

#### Manual (Qualquer plataforma):
```bash
# Build
npm run build:all

# Publicar componente por componente
cd dist/packages/components/progress && npm publish --access public && cd ../../../..
cd dist/packages/form/radio-button && npm publish --access public && cd ../../../..
cd dist/packages/data/pagination && npm publish --access public && cd ../../../..
```

#### Publicar TODOS os pacotes automaticamente (PowerShell):
```powershell
# Publica automaticamente todos os pacotes que têm package.json
npm run build:all
Get-ChildItem -Path "dist\packages" -Recurse -Filter "package.json" -Depth 2 | ForEach-Object {
    $dir = $_.Directory.FullName
    Write-Host "📦 Publishing: $dir" -ForegroundColor Cyan
    Push-Location $dir
    npm publish --access public
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Published successfully!" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to publish" -ForegroundColor Red
    }
    Pop-Location
}
```

#### Publicar TODOS os pacotes automaticamente (Bash):
```bash
# Publica automaticamente todos os pacotes que têm package.json
npm run build:all
find dist/packages -name "package.json" -maxdepth 3 | while read pkg; do
    dir=$(dirname "$pkg")
    echo "📦 Publishing: $dir"
    cd "$dir"
    if npm publish --access public; then
        echo "✅ Published successfully!"
    else
        echo "❌ Failed to publish"
    fi
    cd -
done
```

---

## 📋 Checklist Antes de Publicar

- [ ] ✅ Código testado e funcionando
- [ ] ✅ Versões atualizadas nos package.json
- [ ] ✅ CHANGELOG.md atualizado
- [ ] ✅ Logado no NPM (`npm whoami`)
- [ ] ✅ Build sem erros
- [ ] ✅ README.md criado para cada componente

---

## 🔄 Atualizar Versão

### Atualizar versão de um componente:
```bash
# Patch (1.0.0 → 1.0.1) - Bug fixes
cd packages/components/progress
npm version patch

# Minor (1.0.0 → 1.1.0) - Novos features
npm version minor

# Major (1.0.0 → 2.0.0) - Breaking changes
npm version major
```

### Atualizar todos de uma vez:
```bash
# Criar script update-versions.sh
for dir in packages/components/* packages/form/* packages/data/*; do
    if [ -f "$dir/package.json" ]; then
        cd "$dir"
        npm version patch
        cd -
    fi
done
```

---

## 📦 Instalação pelos Usuários

Depois de publicado:

```bash
# Instalar componente específico
npm install @muxima-ui/progress
npm install @muxima-ui/radio-button
npm install @muxima-ui/pagination

# Instalar múltiplos
npm install @muxima-ui/progress @muxima-ui/radio-button @muxima-ui/pagination
```

---

## 🔍 Verificar Publicação

```bash
# Ver informações do pacote
npm info @muxima-ui/progress

# Ver todas as versões
npm view @muxima-ui/progress versions

# Ver detalhes
npm view @muxima-ui/progress
```

---

## 🌐 Links Úteis

- **NPM Profile**: https://www.npmjs.com/~[seu-username]
- **Documentação**: https://muxima-ui.vercel.app
- **GitHub**: https://github.com/Aldemiro20/muxima-ui
- **NPM Package**: https://www.npmjs.com/package/@muxima-ui/progress

---

## ⚠️ Troubleshooting

### Erro: "You do not have permission to publish"
```bash
# Fazer login novamente
npm logout
npm login
```

### Erro: "Package name already exists"
```bash
# Usar scope
# Trocar "name": "progress" 
# Por: "name": "@muxima-ui/progress"
```

### Erro: "401 Unauthorized"
```bash
# Verificar token
npm token list

# Criar novo token
npm token create
```

### Erro: "403 Forbidden"
```bash
# Verificar se o package.json tem:
"publishConfig": {
  "access": "public"
}
```

---

## 📊 Monitorar Downloads

Depois de publicar, acompanhe em:
- https://npm-stat.com/charts.html?package=@muxima-ui/progress
- https://www.npmjs.com/package/@muxima-ui/progress

---

## 🎯 Próximos Passos

1. ✅ Publicar no NPM
2. 📝 Criar artigo no Medium/Dev.to
3. 📱 Compartilhar no Twitter/LinkedIn
4. 📧 Submeter para Angular Weekly
5. 🎥 Criar tutorial no YouTube
6. 📦 Adicionar badges no README
7. 🌟 Pedir stars no GitHub

---

**Boa sorte com a publicação! 🚀**
