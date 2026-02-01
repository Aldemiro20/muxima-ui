# 🚀 Como Rodar o Projeto Muxima UI

## 📋 Pré-requisitos

- **Node.js**: v18 ou superior
- **npm**: v9 ou superior
- **Git**: Para controle de versão

## ⚡ Início Rápido

### 1. Instalar Dependências

```bash
npm install
```

### 2. Rodar o Projeto

```bash
# Iniciar servidor de desenvolvimento da documentação
npm run dev
```

O projeto estará disponível em: **http://localhost:4200**

## 📝 Comandos Disponíveis

### Desenvolvimento

```bash
# Iniciar documentação (apps/docs)
npm run dev

# OU usando Nx diretamente
npx nx serve docs

# Com porta customizada
npx nx serve docs --port 3000
```

### Build

```bash
# Build da documentação
npm run build

# Build de todos os pacotes
npm run build:all

# Build apenas pacotes afetados por mudanças
npm run build:affected
```

### Testes

```bash
# Rodar todos os testes
npm test

# Rodar testes de um pacote específico
npx nx test button

# Rodar apenas testes afetados
npm run test:affected

# Testes com coverage
npx nx test --all --coverage
```

### Lint

```bash
# Lint de todos os pacotes
npm run lint

# Lint de um pacote específico
npx nx lint button

# Lint com auto-fix
npm run lint:fix
```

### Formatação

```bash
# Formatar todo o código
npm run format

# Verificar formatação
npm run format:check
```

### Storybook

```bash
# Iniciar Storybook
npm run storybook

# Build do Storybook
npm run build-storybook
```

## 🎯 Desenvolvendo Componentes

### Navegar para um componente específico

```bash
# Componentes básicos
cd packages/components/button

# Formulários
cd packages/form/input

# Componentes avançados
cd packages/advanced/video-player
```

### Testar um componente

```bash
# Rodar teste de um componente específico
npx nx test button

# Watch mode
npx nx test button --watch
```

### Build de um componente

```bash
# Build de um pacote específico
npx nx build button
```

## 📦 Estrutura de Pacotes

```
packages/
├── core/           → @muxima-ui/core
├── components/     → @muxima-ui/components/*
├── form/           → @muxima-ui/form/*
├── data/           → @muxima-ui/data/*
├── overlay/        → @muxima-ui/overlay/*
├── media/          → @muxima-ui/media/*
├── advanced/       → @muxima-ui/advanced/*
├── navigation/     → @muxima-ui/navigation/*
└── utility/        → @muxima-ui/utility/*
```

## 🔧 Comandos Nx Úteis

### Visualizar Grafo de Dependências

```bash
# Visualizar grafo completo do projeto
npm run graph

# Grafo de pacotes afetados
npm run affected:graph
```

### Executar em Múltiplos Pacotes

```bash
# Executar target em todos os pacotes
npx nx run-many --target=build --all

# Com paralelização
npx nx run-many --target=test --all --parallel=3

# Apenas pacotes afetados
npx nx affected --target=lint
```

### Limpar Cache

```bash
# Limpar cache do Nx
npm run clean:cache

# OU
npx nx reset
```

## 🐛 Troubleshooting

### Erro: "Cannot find module '@muxima-ui/...'"

**Solução:**
```bash
# Limpar e reinstalar
npm run clean
npm install

# Rebuild dos pacotes
npm run build:all
```

### Erro: "Port 4200 is already in use"

**Solução:**
```bash
# Usar porta diferente
npx nx serve docs --port 4300

# OU matar processo na porta 4200
# Windows:
netstat -ano | findstr :4200
taskkill /PID <PID> /F

# Linux/Mac:
lsof -ti:4200 | xargs kill -9
```

### Erro de TypeScript/Build

**Solução:**
```bash
# Limpar cache e node_modules
rm -rf node_modules dist .nx
npm install
npm run build:all
```

### Storybook não inicia

**Solução:**
```bash
# Verificar se há conflito de porta
npx nx run storybook-host:storybook --port 6007

# Limpar cache do Storybook
rm -rf node_modules/.cache
```

## 📚 Documentação Adicional

- [STRUCTURE.md](./STRUCTURE.md) - Arquitetura completa do projeto
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Guia de contribuição
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Guia de migração

## 🔗 Links Úteis

- **Documentação Online**: https://muxima-ui.vercel.app
- **Repository**: https://github.com/Aldemiro20/muxima-ui
- **NPM**: https://www.npmjs.com/org/muxima-ui

## 💡 Dicas

### Performance

```bash
# Usar cache do Nx para builds mais rápidos
npx nx build button --skip-nx-cache=false

# Builds incrementais
npx nx affected --target=build --base=main
```

### Debug

```bash
# Modo verbose
npx nx serve docs --verbose

# Verificar configuração
npx nx show project docs
```

### Hot Reload

O projeto já vem configurado com hot reload. Qualquer mudança nos arquivos será automaticamente recarregada no browser.

## 🎨 Ambientes

### Development (Padrão)

```bash
npm run dev
# OU
npx nx serve docs --configuration=development
```

### Production

```bash
# Build de produção
npx nx build docs --configuration=production

# Preview do build
npx nx serve docs --configuration=production
```

## 🚢 Deploy

### Vercel (Documentação)

```bash
# Deploy automático via GitHub
git push origin main

# OU deploy manual
npm run build
vercel --prod
```

### NPM (Pacotes)

```bash
# Build de produção de todos os pacotes
npm run build:all

# Publicar (para maintainers)
npm run publish:all
```

---

## ❓ Precisa de Ajuda?

- Abra uma [issue](https://github.com/Aldemiro20/muxima-ui/issues)
- Consulte a [documentação](https://muxima-ui.vercel.app)
- Entre em contato com os [maintainers](https://github.com/Aldemiro20)

---

**Última atualização:** Fevereiro 2026
