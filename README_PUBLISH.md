# 📦 Publicar Muxima UI no NPM

## 🎯 Opções de Publicação (da mais rápida para a mais detalhada)

### ⚡ Opção 1: SUPER RÁPIDO (Recomendado)

```powershell
# Windows - Um comando faz tudo!
.\tools\scripts\quick-publish.ps1
```

```bash
# Linux/Mac - Um comando faz tudo!
./tools/scripts/quick-publish.sh
```

**O que faz:**
- ✅ Verifica login no NPM
- ✅ Builda todos os componentes
- ✅ Auto-detecta pacotes com package.json
- ✅ Publica todos automaticamente
- ✅ Mostra resumo no final

---

### 🔄 Opção 2: UMA LINHA (Para experts)

```powershell
# PowerShell - Copia e cola
npm run build:all; Get-ChildItem -Path "dist\packages" -Recurse -Filter "package.json" -Depth 2 | ForEach-Object { Push-Location $_.Directory.FullName; npm publish --access public; Pop-Location }
```

```bash
# Bash - Copia e cola
npm run build:all && find dist/packages -name "package.json" -maxdepth 3 -execdir npm publish --access public \;
```

---

### 🎯 Opção 3: LOOP SIMPLES (Controle manual)

```powershell
# PowerShell
npm run build:all
$packages = @(
    "dist/packages/components/progress",
    "dist/packages/form/radio-button",
    "dist/packages/data/pagination"
)
foreach ($pkg in $packages) {
    Push-Location $pkg
    npm publish --access public
    Pop-Location
}
```

```bash
# Bash
npm run build:all
packages=(
    "dist/packages/components/progress"
    "dist/packages/form/radio-button"
    "dist/packages/data/pagination"
)
for pkg in "${packages[@]}"; do
    cd "$pkg"
    npm publish --access public
    cd -
done
```

---

### 📝 Opção 4: MANUAL (Passo a passo)

```bash
# 1. Build
npm run build:all

# 2. Publicar um por um
cd dist/packages/components/progress
npm publish --access public
cd ../../../../

cd dist/packages/form/radio-button
npm publish --access public
cd ../../../../

cd dist/packages/data/pagination
npm publish --access public
cd ../../../../
```

---

### 🛠️ Opção 5: SCRIPT COMPLETO (Com validações)

```powershell
# Windows - Com menu interativo
.\tools\scripts\publish-all.ps1
```

```bash
# Linux/Mac - Com menu interativo
./tools/scripts/publish-all.sh
```

**O que tem a mais:**
- ✅ Menu de confirmação
- ✅ Validação de cada pacote
- ✅ Relatório detalhado
- ✅ Tratamento de erros completo

---

## 🚀 Exemplo Prático Completo

```powershell
# Passo 1: Login (uma vez apenas)
npm login
# Digite username, password, email

# Passo 2: Executar publicação
.\tools\scripts\quick-publish.ps1

# Saída esperada:
# 🚀 Muxima UI - Quick Publish
# ============================
# ✅ Logged in as: seu-username
# 🏗️  Building all packages...
# ✅ Build complete
# 📤 Publishing all packages...
# 
# Publishing @muxima-ui/progress...
#   ✅ Published successfully
# 
# Publishing @muxima-ui/radio-button...
#   ✅ Published successfully
# 
# Publishing @muxima-ui/pagination...
#   ✅ Published successfully
# 
# =============================
# 📊 Summary
# =============================
# ✅ Published: 3
# ⚠️  Skipped: 0
# ❌ Failed: 0
# 
# 🎉 Done!
# View at: https://www.npmjs.com/~seu-username

# Passo 3: Verificar
npm info @muxima-ui/progress
```

---

## 📊 Comparação de Métodos

| Método | Velocidade | Controle | Validações | Recomendado Para |
|--------|-----------|----------|------------|------------------|
| quick-publish.ps1 | ⚡⚡⚡⚡⚡ | ⭐⭐⭐ | ✅✅✅ | **Primeira vez e uso geral** |
| Uma linha | ⚡⚡⚡⚡ | ⭐⭐ | ❌ | Usuários avançados |
| Loop simples | ⚡⚡⚡ | ⭐⭐⭐⭐ | ⭐ | Customização rápida |
| Manual | ⚡ | ⭐⭐⭐⭐⭐ | ⭐ | Debug e testes |
| publish-all.ps1 | ⚡⚡⚡ | ⭐⭐⭐⭐ | ✅✅✅✅✅ | Publicação profissional |

---

## ✅ Checklist Rápido

Antes de rodar qualquer comando:

- [ ] `npm whoami` - Verificar se está logado
- [ ] Criar `package.json` para cada componente
- [ ] Verificar versões (começar com 1.0.0)
- [ ] Build sem erros (`npm run build:all`)

Depois de publicar:

- [ ] Verificar no NPM: https://www.npmjs.com/~seu-username
- [ ] Testar instalação: `npm install @muxima-ui/progress`
- [ ] Verificar docs: https://muxima-ui.vercel.app

---

## 🎯 Recomendação

**Use este comando:**
```powershell
.\tools\scripts\quick-publish.ps1
```

**Por quê?**
- ✅ Mais rápido
- ✅ Auto-detecta componentes
- ✅ Validações incluídas
- ✅ Feedback visual
- ✅ Tratamento de erros
- ✅ Resumo no final

---

## 📚 Documentação Completa

- **HOW_TO_PUBLISH.md** - Guia passo a passo detalhado
- **QUICK_PUBLISH.md** - Comandos rápidos
- **PUBLISH_COMMANDS.md** - Referência de todos os comandos
- **PUBLISH_NPM_GUIDE.md** - Guia técnico completo
- **PUBLISHING_CHECKLIST.md** - Checklist interativo

---

## 🆘 Problemas Comuns

### "Not logged in"
```bash
npm login
```

### "Permission denied" (Windows)
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Permission denied" (Linux/Mac)
```bash
chmod +x tools/scripts/*.sh
```

### "Package already exists"
- Normal se já publicou antes
- Aumente a versão no `package.json`

---

## 📞 Links Úteis

- **NPM Profile**: https://www.npmjs.com/~[seu-username]
- **Documentação**: https://muxima-ui.vercel.app
- **GitHub**: https://github.com/Aldemiro20/muxima-ui

---

**Comece agora:** `.\tools\scripts\quick-publish.ps1` 🚀
