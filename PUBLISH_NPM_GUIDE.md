# 📦 Guia de Publicação da Muxima UI no NPM

## 🎯 Visão Geral

Este guia explica como publicar os componentes da Muxima UI no NPM para que qualquer desenvolvedor possa instalá-los via `npm install`.

---

## 📋 Pré-requisitos

### 1. Conta no NPM
```bash
# Criar conta em: https://www.npmjs.com/signup

# Fazer login no NPM via terminal
npm login

# Verificar se está logado
npm whoami
```

### 2. Estrutura do Projeto
Seu projeto já está configurado como monorepo com Nx. A estrutura atual é:
```
muxima-ui/
├── packages/
│   ├── components/      # Componentes básicos (Button, Alert, etc)
│   ├── form/           # Componentes de formulário
│   ├── data/           # Componentes de dados
│   ├── navigation/     # Componentes de navegação
│   ├── overlay/        # Componentes overlay
│   └── ...
└── apps/
    └── docs/           # Documentação
```

---

## 🔧 Passo 1: Configurar package.json de cada pacote

Cada componente precisa ter seu próprio `package.json` configurado corretamente.

### Exemplo: packages/components/button/package.json

```json
{
  "name": "@muxima-ui/button",
  "version": "1.0.0",
  "description": "Modern and accessible button component for Angular",
  "author": "Aldemiro Valentim <seu-email@example.com>",
  "license": "MIT",
  "keywords": [
    "angular",
    "component",
    "button",
    "ui",
    "muxima",
    "design-system"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/Aldemiro20/muxima-ui.git",
    "directory": "packages/components/button"
  },
  "bugs": {
    "url": "https://github.com/Aldemiro20/muxima-ui/issues"
  },
  "homepage": "https://muxima-ui.vercel.app/components/button",
  "peerDependencies": {
    "@angular/common": "^17.0.0 || ^18.0.0",
    "@angular/core": "^17.0.0 || ^18.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### Campos Importantes:

- **name**: `@muxima-ui/[component-name]` (scoped package)
- **version**: Seguir [Semantic Versioning](https://semver.org/)
- **description**: Descrição clara do componente
- **keywords**: Para facilitar busca no NPM
- **repository**: Link para o GitHub
- **homepage**: Link para a documentação
- **peerDependencies**: Versões do Angular suportadas
- **publishConfig.access**: "public" para pacotes scoped gratuitos

---

## 📦 Passo 2: Criar Pacote Principal (Meta-package)

Criar um pacote que instale todos os componentes de uma vez:

### packages/muxima-ui/package.json

```json
{
  "name": "@muxima-ui/components",
  "version": "1.0.0",
  "description": "Complete UI component library for Angular - Modern, accessible, and customizable",
  "author": "Aldemiro Valentim",
  "license": "MIT",
  "keywords": [
    "angular",
    "components",
    "ui-library",
    "design-system",
    "muxima-ui"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/Aldemiro20/muxima-ui.git"
  },
  "homepage": "https://muxima-ui.vercel.app",
  "peerDependencies": {
    "@angular/common": "^17.0.0 || ^18.0.0",
    "@angular/core": "^17.0.0 || ^18.0.0",
    "@angular/forms": "^17.0.0 || ^18.0.0"
  },
  "dependencies": {
    "@muxima-ui/button": "^1.0.0",
    "@muxima-ui/alert": "^1.0.0",
    "@muxima-ui/input": "^1.0.0",
    "@muxima-ui/radio-button": "^1.0.0",
    "@muxima-ui/pagination": "^1.0.0"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

---

## 🏗️ Passo 3: Build dos Pacotes

### Configurar ng-package.json para cada componente

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/packages/components/button",
  "lib": {
    "entryFile": "src/index.ts"
  }
}
```

### Build Individual
```bash
# Build um componente específico
nx build button

# Build todos os componentes
nx run-many --target=build --all
```

### Build para Produção
```bash
# Build otimizado para publicação
nx run-many --target=build --all --configuration=production
```

---

## 📤 Passo 4: Publicar no NPM

### Opção 1: Publicação Manual

```bash
# 1. Build do componente
nx build button

# 2. Navegar para o diretório de build
cd dist/packages/components/button

# 3. Publicar
npm publish --access public

# 4. Voltar para a raiz
cd ../../../../
```

### Opção 2: Script Automatizado

Criar script `tools/scripts/publish-all.sh`:

```bash
#!/bin/bash

# Build todos os pacotes
echo "🏗️  Building all packages..."
nx run-many --target=build --all --configuration=production

# Lista de pacotes para publicar
packages=(
  "packages/components/button"
  "packages/components/alert"
  "packages/components/radio-button"
  "packages/components/pagination"
  # Adicionar mais pacotes aqui
)

# Publicar cada pacote
for package in "${packages[@]}"; do
  echo "📦 Publishing $package..."
  cd "dist/$package"
  npm publish --access public
  cd -
done

echo "✅ All packages published successfully!"
```

Dar permissão de execução:
```bash
chmod +x tools/scripts/publish-all.sh
```

Executar:
```bash
./tools/scripts/publish-all.sh
```

### Opção 3: Usar NPM Scripts

Adicionar no `package.json` raiz:

```json
{
  "scripts": {
    "build:all": "nx run-many --target=build --all --configuration=production",
    "publish:button": "cd dist/packages/components/button && npm publish --access public",
    "publish:alert": "cd dist/packages/components/alert && npm publish --access public",
    "publish:radio": "cd dist/packages/components/radio-button && npm publish --access public",
    "publish:pagination": "cd dist/packages/components/pagination && npm publish --access public",
    "publish:all": "npm run build:all && npm run publish:button && npm run publish:alert && npm run publish:radio && npm run publish:pagination"
  }
}
```

Executar:
```bash
npm run publish:all
```

---

## 🔐 Passo 5: Configurar CI/CD (GitHub Actions)

Criar `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]
  workflow_dispatch:
    inputs:
      version:
        description: 'Version to publish'
        required: true
        default: 'patch'

jobs:
  publish:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build packages
        run: npm run build:all
      
      - name: Publish to NPM
        run: npm run publish:all
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Configurar NPM Token no GitHub:
1. Acesse: https://www.npmjs.com/settings/[seu-username]/tokens
2. Crie um token de **Automation**
3. Copie o token
4. No GitHub: Settings → Secrets → New repository secret
5. Nome: `NPM_TOKEN`
6. Valor: Cole o token

---

## 📚 Passo 6: Publicar Documentação

### Opção 1: Vercel (Recomendado)

Já está configurado! A documentação será automaticamente publicada em:
```
https://muxima-ui.vercel.app
```

### Opção 2: GitHub Pages

```bash
# Build da documentação
nx build docs --configuration=production

# Deploy para GitHub Pages
npx angular-cli-ghpages --dir=dist/apps/docs
```

### Opção 3: Netlify

1. Conectar repositório no Netlify
2. Build command: `nx build docs --configuration=production`
3. Publish directory: `dist/apps/docs`

---

## 📋 Passo 7: Criar README.md para cada pacote

### Exemplo: packages/components/button/README.md

```markdown
# @muxima-ui/button

Modern and accessible button component for Angular applications.

## Installation

\`\`\`bash
npm install @muxima-ui/button
\`\`\`

## Usage

\`\`\`typescript
import { Component } from '@angular/core';
import { ButtonComponent } from '@muxima-ui/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  template: \`
    <muxima-button variant="primary">
      Click me!
    </muxima-button>
  \`
})
export class AppComponent {}
\`\`\`

## Documentation

Full documentation available at: https://muxima-ui.vercel.app/components/button

## Features

- ✅ 6 variants (primary, secondary, success, warning, danger, info)
- ✅ 5 sizes (xs, sm, md, lg, xl)
- ✅ Icon support
- ✅ Loading states
- ✅ Fully accessible (ARIA)
- ✅ Keyboard navigation

## License

MIT © Aldemiro Valentim
```

---

## 🎯 Passo 8: Versionamento Semântico

Seguir [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): Novos features (compatíveis)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes

### Atualizar versão:
```bash
# Patch (1.0.0 → 1.0.1)
npm version patch

# Minor (1.0.0 → 1.1.0)
npm version minor

# Major (1.0.0 → 2.0.0)
npm version major
```

---

## 📊 Passo 9: Badges no README

Adicionar badges para dar credibilidade:

```markdown
# Muxima UI

[![NPM Version](https://img.shields.io/npm/v/@muxima-ui/components.svg)](https://www.npmjs.com/package/@muxima-ui/components)
[![NPM Downloads](https://img.shields.io/npm/dm/@muxima-ui/components.svg)](https://www.npmjs.com/package/@muxima-ui/components)
[![License](https://img.shields.io/npm/l/@muxima-ui/components.svg)](https://github.com/Aldemiro20/muxima-ui/blob/main/LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/Aldemiro20/muxima-ui.svg)](https://github.com/Aldemiro20/muxima-ui)
```

---

## ✅ Checklist Antes de Publicar

- [ ] Todos os componentes buildados sem erros
- [ ] Testes passando (se houver)
- [ ] README.md criado para cada pacote
- [ ] LICENSE adicionada
- [ ] CHANGELOG.md atualizado
- [ ] package.json configurado corretamente
- [ ] Versão atualizada
- [ ] Logado no NPM (`npm whoami`)
- [ ] Documentação publicada no Vercel
- [ ] GitHub repository público

---

## 🚀 Instalação pelos Usuários

Depois de publicado, os usuários poderão instalar:

### Pacote completo:
```bash
npm install @muxima-ui/components
```

### Componentes individuais:
```bash
npm install @muxima-ui/button
npm install @muxima-ui/alert
npm install @muxima-ui/radio-button
npm install @muxima-ui/pagination
```

---

## 📈 Monitoramento

### NPM Statistics
- Acessar: https://www.npmjs.com/package/@muxima-ui/components
- Ver downloads, versões, dependents

### GitHub Insights
- Stars, forks, issues
- Traffic e popularidade

---

## 🔄 Atualizações Futuras

### Publicar nova versão:
```bash
# 1. Fazer alterações no código
# 2. Atualizar CHANGELOG.md
# 3. Atualizar versão
npm version patch -m "Bump version to %s"

# 4. Build e publicar
npm run build:all
npm run publish:all

# 5. Push com tags
git push && git push --tags
```

---

## 📞 Suporte

- **Documentação**: https://muxima-ui.vercel.app
- **GitHub Issues**: https://github.com/Aldemiro20/muxima-ui/issues
- **NPM**: https://www.npmjs.com/~[seu-username]

---

## 🎉 Conclusão

Parabéns! Sua biblioteca agora está disponível para toda a comunidade Angular! 🚀

**Próximos passos:**
1. Divulgar no Twitter/LinkedIn
2. Criar artigo no Medium/Dev.to
3. Submeter para Angular Weekly/Newsletter
4. Adicionar exemplos no StackBlitz
5. Criar vídeo tutorial no YouTube
