# 🚀 Comandos de Publicação - Referência Rápida

## ⚡ Mais Rápido (Recomendado)

### Windows (PowerShell):
```powershell
# Script automático que faz tudo
.\tools\scripts\quick-publish.ps1
```

### Linux/Mac (Bash):
```bash
# Script automático que faz tudo
chmod +x tools/scripts/quick-publish.sh
./tools/scripts/quick-publish.sh
```

---

## 🔄 Uma Linha - Publicar Todos

### PowerShell (Windows):
```powershell
npm run build:all; Get-ChildItem -Path "dist\packages" -Recurse -Filter "package.json" -Depth 2 | ForEach-Object { Push-Location $_.Directory.FullName; npm publish --access public; Pop-Location }
```

### Bash (Linux/Mac):
```bash
npm run build:all && find dist/packages -name "package.json" -maxdepth 3 -execdir npm publish --access public \;
```

---

## 📦 Loop Simples - Publicar Múltiplos

### PowerShell:
```powershell
npm run build:all
$pkgs = @("dist/packages/components/progress", "dist/packages/form/radio-button", "dist/packages/data/pagination")
foreach ($p in $pkgs) { Push-Location $p; npm publish --access public; Pop-Location }
```

### Bash:
```bash
npm run build:all
for p in dist/packages/components/progress dist/packages/form/radio-button dist/packages/data/pagination; do
    cd "$p" && npm publish --access public && cd -
done
```

---

## 🎯 Comando Individual

```bash
# Build
npm run build:all

# Publicar um por um
cd dist/packages/components/progress && npm publish --access public && cd ../../../..
cd dist/packages/form/radio-button && npm publish --access public && cd ../../../..
cd dist/packages/data/pagination && npm publish --access public && cd ../../../..
```

---

## 🛠️ Scripts Disponíveis

### Script Completo (com validações):
```powershell
# Windows
.\tools\scripts\publish-all.ps1

# Linux/Mac
./tools/scripts/publish-all.sh
```

### Script Rápido (auto-detecta pacotes):
```powershell
# Windows
.\tools\scripts\quick-publish.ps1

# Linux/Mac
./tools/scripts/quick-publish.sh
```

---

## 🔍 Comandos Úteis

### Verificar Login:
```bash
npm whoami
```

### Ver Pacotes Publicados:
```bash
npm info @muxima-ui/progress
npm info @muxima-ui/radio-button
npm info @muxima-ui/pagination
```

### Testar Build Local:
```bash
npm run build:all
cd dist/packages/components/progress
npm pack  # Cria .tgz para testar
```

### Despublicar (cuidado!):
```bash
# Só funciona nas primeiras 72h
npm unpublish @muxima-ui/progress@1.0.0
```

---

## 📊 Workflow Completo

```bash
# 1. Login (uma vez)
npm login

# 2. Criar package.json para cada componente

# 3. Build tudo
npm run build:all

# 4. Publicar (escolha uma opção acima)

# 5. Verificar
npm info @muxima-ui/progress
```

---

## ⚠️ Troubleshooting

### "Not logged in":
```bash
npm login
```

### "Already exists":
```bash
# Atualizar versão no package.json
# Depois buildar e publicar novamente
```

### "Permission denied":
```bash
# Windows
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Linux/Mac
chmod +x tools/scripts/*.sh
```

---

## 🎯 Ordem de Execução

```
1. npm login
   ↓
2. npm run build:all
   ↓
3. .\tools\scripts\quick-publish.ps1
   ↓
4. Verificar no NPM
   ↓
5. Testar instalação
```

---

## 📝 Notas

- ✅ Use `quick-publish.ps1/sh` para publicar tudo automaticamente
- ✅ Scripts detectam automaticamente pacotes com package.json
- ✅ Versão inicial sempre 1.0.0
- ✅ Sempre `--access public` para packages scoped gratuitos
- ⚠️ Build antes de publicar (`npm run build:all`)
- ⚠️ Não é possível despublicar após 72h

---

**Comando mais usado:**
```powershell
# Windows
.\tools\scripts\quick-publish.ps1

# Linux/Mac
./tools/scripts/quick-publish.sh
```
