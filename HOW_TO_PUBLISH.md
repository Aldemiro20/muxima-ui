# 📦 Como Publicar no NPM - Guia Completo

## 🎯 Resumo Executivo

Sua biblioteca **Muxima UI** já está quase pronta para ser publicada! Siga estes passos:

### ✅ O que já está feito:
- ✅ Estrutura de monorepo com Nx
- ✅ Componentes organizados em packages
- ✅ Documentação no Vercel
- ✅ Scripts de build configurados
- ✅ package.json básico criado para alguns componentes

### 🔨 O que falta fazer:

1. **Criar package.json para TODOS os componentes** (veja exemplos abaixo)
2. **Fazer login no NPM** (`npm login`)
3. **Build dos pacotes** (`npm run build:all`)
4. **Publicar** (usar script automático ou manual)

---

## 📝 Passo a Passo Detalhado

### 1️⃣ Criar Conta no NPM

```bash
# 1. Criar conta em: https://www.npmjs.com/signup
# 2. Verificar email
# 3. Fazer login no terminal:
npm login

# Digite:
# - Username
# - Password  
# - Email
# - OTP (código do autenticador, se ativado)

# Verificar se está logado:
npm whoami
```

---

### 2️⃣ Criar package.json para Cada Componente

Você precisa criar um `package.json` em cada pasta de componente.

#### 📂 Estrutura Necessária:

```
packages/
├── components/
│   ├── button/
│   │   ├── src/
│   │   ├── package.json          ← CRIAR
│   │   ├── ng-package.json
│   │   └── README.md             ← CRIAR
│   ├── alert/
│   │   ├── src/
│   │   ├── package.json          ← CRIAR
│   │   └── README.md             ← CRIAR
│   ├── progress/
│   │   ├── src/
│   │   ├── package.json          ✅ JÁ EXISTE
│   │   └── README.md             ← CRIAR
│   └── ...
├── form/
│   ├── radio-button/
│   │   ├── src/
│   │   ├── package.json          ✅ JÁ EXISTE
│   │   └── README.md             ← CRIAR
│   └── ...
└── data/
    ├── pagination/
    │   ├── src/
    │   ├── package.json          ✅ JÁ EXISTE
    │   └── README.md             ← CRIAR
    └── ...
```

#### 📄 Template de package.json:

Copie e adapte para cada componente:

```json
{
  "name": "@muxima-ui/[COMPONENT-NAME]",
  "version": "1.0.0",
  "description": "Descrição do componente",
  "author": "Aldemiro Valentim <seu-email@example.com>",
  "license": "MIT",
  "keywords": [
    "angular",
    "component",
    "[component-name]",
    "ui",
    "muxima-ui",
    "design-system"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/Aldemiro20/muxima-ui.git",
    "directory": "packages/[category]/[component-name]"
  },
  "bugs": {
    "url": "https://github.com/Aldemiro20/muxima-ui/issues"
  },
  "homepage": "https://muxima-ui.vercel.app/components/[component-name]",
  "peerDependencies": {
    "@angular/common": "^17.0.0 || ^18.0.0",
    "@angular/core": "^17.0.0 || ^18.0.0"
  },
  "publishConfig": {
    "access": "public"
  },
  "sideEffects": false
}
```

#### 📄 Template de README.md:

```markdown
# @muxima-ui/[component-name]

Descrição breve do componente.

## 📦 Installation

\`\`\`bash
npm install @muxima-ui/[component-name]
\`\`\`

## 🚀 Usage

\`\`\`typescript
import { Component } from '@angular/core';
import { [ComponentName]Component } from '@muxima-ui/[component-name]';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [[ComponentName]Component],
  template: \`
    <muxima-[component-name]>
      Content here
    </muxima-[component-name]>
  \`
})
export class AppComponent {}
\`\`\`

## 📚 Documentation

Full documentation: https://muxima-ui.vercel.app/components/[component-name]

## ✨ Features

- Feature 1
- Feature 2
- Feature 3

## 📄 License

MIT © Aldemiro Valentim
```

---

### 3️⃣ Build dos Pacotes

```bash
# Build TODOS os pacotes de uma vez
npm run build:all

# OU build individual
nx build progress
nx build radio-button
nx build pagination
```

Isso vai criar a pasta `dist/` com os pacotes compilados:

```
dist/
├── packages/
│   ├── components/
│   │   ├── progress/
│   │   │   ├── package.json
│   │   │   ├── README.md
│   │   │   └── ...
│   │   └── ...
│   ├── form/
│   │   ├── radio-button/
│   │   └── ...
│   └── data/
│       ├── pagination/
│       └── ...
```

---

### 4️⃣ Publicar no NPM

#### Opção A: Script Automático (Recomendado) 🚀

**Windows (PowerShell):**
```powershell
# Primeira vez - dar permissão
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Executar script que builda e publica tudo
.\tools\scripts\publish-all.ps1
```

**Linux/Mac (Bash):**
```bash
# Primeira vez - dar permissão
chmod +x tools/scripts/publish-all.sh

# Executar script que builda e publica tudo
./tools/scripts/publish-all.sh
```

#### Opção B: Comando NPM Único 🎯

```bash
# Build e publicar todos de uma vez (precisa criar os package.json primeiro!)
npm run build:all && for /d %i in (dist\packages\components\* dist\packages\form\* dist\packages\data\* dist\packages\navigation\* dist\packages\overlay\*) do (cd %i && npm publish --access public && cd ..)

# OU no PowerShell (mais legível):
npm run build:all; Get-ChildItem -Path "dist\packages" -Recurse -Directory -Depth 2 | Where-Object { Test-Path (Join-Path $_.FullName "package.json") } | ForEach-Object { Push-Location $_.FullName; npm publish --access public; Pop-Location }

# OU no Linux/Mac:
npm run build:all && find dist/packages -name "package.json" -maxdepth 3 -execdir npm publish --access public \;
```

#### Opção C: Publicação Manual por Pacote 📝

```bash
# 1. Build
npm run build:all

# 2. Publicar cada pacote individualmente
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

#### Opção D: Loop PowerShell (Publicar Múltiplos) 🔄

```powershell
# Build primeiro
npm run build:all

# Lista de pacotes para publicar
$packages = @(
    "dist/packages/components/progress",
    "dist/packages/form/radio-button",
    "dist/packages/data/pagination"
    # Adicione mais pacotes aqui conforme criar
)

# Publicar cada um
foreach ($pkg in $packages) {
    if (Test-Path $pkg) {
        Write-Host "Publishing $pkg..." -ForegroundColor Cyan
        Push-Location $pkg
        npm publish --access public
        Pop-Location
        Write-Host "✅ Published!" -ForegroundColor Green
    }
}
```

#### Opção E: Loop Bash (Linux/Mac) 🔄

```bash
# Build primeiro
npm run build:all

# Lista de pacotes para publicar
packages=(
    "dist/packages/components/progress"
    "dist/packages/form/radio-button"
    "dist/packages/data/pagination"
    # Adicione mais pacotes aqui conforme criar
)

# Publicar cada um
for pkg in "${packages[@]}"; do
    if [ -d "$pkg" ]; then
        echo "Publishing $pkg..."
        cd "$pkg"
        npm publish --access public
        cd -
        echo "✅ Published!"
    fi
done
```

---

### 5️⃣ Verificar Publicação

```bash
# Ver seu perfil no NPM
npm info @muxima-ui/progress

# Verificar se aparece nos seus packages
# Acessar: https://www.npmjs.com/~[seu-username]
```

---

## 🎯 Exemplo Prático

### Publicar o Progress Component

```bash
# 1. Verificar se package.json existe
cat packages/components/progress/package.json

# 2. Build
nx build progress

# 3. Verificar build
ls dist/packages/components/progress/

# 4. Publicar
cd dist/packages/components/progress
npm publish --access public

# Sucesso! 🎉
# Pacote disponível em:
# https://www.npmjs.com/package/@muxima-ui/progress
```

### Instalar o Componente Publicado

```bash
# Em qualquer projeto Angular
npm install @muxima-ui/progress

# Usar
import { ProgressComponent } from '@muxima-ui/progress';
```

---

## 📊 Ordem Recomendada de Publicação

### Fase 1: Componentes Principais (3 pacotes)
1. ✅ `@muxima-ui/progress` (já tem package.json)
2. ✅ `@muxima-ui/radio-button` (já tem package.json)
3. ✅ `@muxima-ui/pagination` (já tem package.json)

### Fase 2: Componentes Básicos (10 pacotes)
4. `@muxima-ui/button`
5. `@muxima-ui/alert`
6. `@muxima-ui/badge`
7. `@muxima-ui/card`
8. `@muxima-ui/avatar`
9. `@muxima-ui/chip`
10. `@muxima-ui/loading`
11. `@muxima-ui/skeleton`
12. `@muxima-ui/accordion`
13. `@muxima-ui/toggle`

### Fase 3: Componentes de Formulário (5 pacotes)
14. `@muxima-ui/input`
15. `@muxima-ui/select`
16. `@muxima-ui/checkbox`
17. `@muxima-ui/datepicker`
18. `@muxima-ui/slider`

### Fase 4: Componentes Avançados (5+ pacotes)
19. `@muxima-ui/table`
20. `@muxima-ui/tabs`
21. `@muxima-ui/modal`
22. `@muxima-ui/toast`
23. E mais...

---

## 🔄 Workflow Completo

```bash
# 1. Desenvolver componente
# 2. Testar localmente
# 3. Criar package.json
# 4. Criar README.md
# 5. Build
npm run build:all

# 6. Testar o build
cd dist/packages/components/progress
npm pack  # Cria arquivo .tgz

# 7. Testar instalação local
npm install /path/to/muxima-ui-progress-1.0.0.tgz

# 8. Se tudo OK, publicar
npm publish --access public

# 9. Verificar
npm info @muxima-ui/progress

# 10. Instalar em outro projeto
npm install @muxima-ui/progress
```

---

## ⚠️ Checklist Final

Antes de executar `npm publish`, verificar:

- [ ] ✅ Logado no NPM (`npm whoami`)
- [ ] ✅ package.json criado com nome correto
- [ ] ✅ README.md criado
- [ ] ✅ Build sem erros
- [ ] ✅ Versão correta (1.0.0 para primeira vez)
- [ ] ✅ `publishConfig.access` = "public"
- [ ] ✅ Documentação no Vercel atualizada

---

## 🎉 Próximos Passos Depois da Publicação

1. **Criar release no GitHub**
   - Tag: `v1.0.0`
   - Release notes com changelog

2. **Divulgar**
   - Twitter/X
   - LinkedIn
   - Dev.to
   - Medium
   - Reddit (r/angular)

3. **Adicionar badges no README**
   ```markdown
   [![NPM](https://img.shields.io/npm/v/@muxima-ui/progress.svg)](https://www.npmjs.com/package/@muxima-ui/progress)
   [![Downloads](https://img.shields.io/npm/dm/@muxima-ui/progress.svg)](https://npmcharts.com/compare/@muxima-ui/progress)
   ```

4. **Submeter para newsletters**
   - Angular Weekly
   - This Week in Angular

5. **Criar exemplos no StackBlitz**

---

## 📞 Suporte

- **Documentação**: https://muxima-ui.vercel.app
- **GitHub**: https://github.com/Aldemiro20/muxima-ui
- **NPM**: https://www.npmjs.com/~[seu-username]
- **Issues**: https://github.com/Aldemiro20/muxima-ui/issues

---

**Boa sorte com a publicação! 🚀**

Se tiver dúvidas, consulte os arquivos:
- `PUBLISH_NPM_GUIDE.md` - Guia completo
- `QUICK_PUBLISH.md` - Comandos rápidos
