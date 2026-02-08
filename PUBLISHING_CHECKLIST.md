# ✅ Checklist de Publicação - Muxima UI

## 📋 Fase 1: Preparação (Uma vez apenas)

### Conta NPM
- [ ] Criar conta em https://www.npmjs.com/signup
- [ ] Verificar email
- [ ] Ativar 2FA (recomendado)
- [ ] Fazer login: `npm login`
- [ ] Verificar: `npm whoami`

### Repositório GitHub
- [ ] Repositório público
- [ ] README.md atualizado
- [ ] LICENSE adicionada (MIT)
- [ ] .gitignore configurado

### Documentação Vercel
- [ ] Site publicado em https://muxima-ui.vercel.app
- [ ] Todas as páginas funcionando
- [ ] Links corretos

---

## 📦 Fase 2: Preparar Componentes

### Para CADA componente que vai publicar:

#### Progress Component
- [x] ✅ Código funcional
- [x] ✅ package.json criado
- [ ] README.md criado
- [ ] CHANGELOG.md criado
- [ ] Testes (opcional)
- [ ] Build sem erros: `nx build progress`

#### Radio Button Component
- [x] ✅ Código funcional
- [x] ✅ package.json existente
- [ ] README.md criado
- [ ] CHANGELOG.md criado
- [ ] Testes (opcional)
- [ ] Build sem erros: `nx build radio-button`

#### Pagination Component
- [x] ✅ Código funcional
- [x] ✅ package.json criado
- [ ] README.md criado
- [ ] CHANGELOG.md criado
- [ ] Testes (opcional)
- [ ] Build sem erros: `nx build pagination`

#### Button Component
- [ ] Código funcional
- [ ] package.json criado
- [ ] README.md criado
- [ ] CHANGELOG.md criado
- [ ] Testes (opcional)
- [ ] Build sem erros: `nx build button`

#### Alert Component
- [ ] Código funcional
- [ ] package.json criado
- [ ] README.md criado
- [ ] CHANGELOG.md criado
- [ ] Testes (opcional)
- [ ] Build sem erros: `nx build alert`

---

## 🏗️ Fase 3: Build

- [ ] Limpar builds anteriores: `rm -rf dist`
- [ ] Build todos os componentes: `npm run build:all`
- [ ] Verificar se `dist/` foi criado
- [ ] Verificar conteúdo dos pacotes em `dist/packages/`
- [ ] Nenhum erro de compilação

---

## 📤 Fase 4: Publicação

### Primeira Publicação (v1.0.0)

#### Progress
- [ ] Navegar: `cd dist/packages/components/progress`
- [ ] Verificar package.json
- [ ] Publicar: `npm publish --access public`
- [ ] Verificar: `npm info @muxima-ui/progress`
- [ ] Voltar: `cd ../../../../`

#### Radio Button
- [ ] Navegar: `cd dist/packages/form/radio-button`
- [ ] Verificar package.json
- [ ] Publicar: `npm publish --access public`
- [ ] Verificar: `npm info @muxima-ui/radio-button`
- [ ] Voltar: `cd ../../../../`

#### Pagination
- [ ] Navegar: `cd dist/packages/data/pagination`
- [ ] Verificar package.json
- [ ] Publicar: `npm publish --access public`
- [ ] Verificar: `npm info @muxima-ui/pagination`
- [ ] Voltar: `cd ../../../../`

### OU usar Script Automático
- [ ] Windows: `.\tools\scripts\publish-all.ps1`
- [ ] Linux/Mac: `./tools/scripts/publish-all.sh`

---

## ✅ Fase 5: Verificação

### No NPM
- [ ] Acessar: https://www.npmjs.com/~[seu-username]
- [ ] Ver todos os pacotes publicados
- [ ] Verificar descrição e keywords
- [ ] Verificar links (homepage, repository)

### Testar Instalação
```bash
# Criar projeto teste
npx @angular/cli new test-muxima --standalone
cd test-muxima

# Instalar componente
npm install @muxima-ui/progress

# Testar import
# src/app/app.component.ts
```

- [ ] Componente instala sem erros
- [ ] Import funciona
- [ ] Componente renderiza

---

## 🎉 Fase 6: Divulgação

### GitHub
- [ ] Criar release v1.0.0
- [ ] Adicionar changelog
- [ ] Criar tag
- [ ] Atualizar README com badges:
  ```markdown
  [![NPM](https://img.shields.io/npm/v/@muxima-ui/progress.svg)](https://npmjs.com/package/@muxima-ui/progress)
  [![Downloads](https://img.shields.io/npm/dm/@muxima-ui/progress.svg)](https://npmjs.com/package/@muxima-ui/progress)
  [![License](https://img.shields.io/npm/l/@muxima-ui/progress.svg)](https://github.com/Aldemiro20/muxima-ui/blob/main/LICENSE)
  ```

### Redes Sociais
- [ ] Tweet/X anunciando lançamento
- [ ] Post no LinkedIn
- [ ] Post no Dev.to
- [ ] Artigo no Medium (opcional)
- [ ] Post no Reddit r/angular
- [ ] Post no Discord Angular

### Comunidade
- [ ] Submeter para Angular Weekly
- [ ] Submeter para This Week in Angular
- [ ] Adicionar no awesome-angular
- [ ] Criar exemplos no StackBlitz

---

## 📊 Fase 7: Monitoramento

### Primeira Semana
- [ ] Verificar downloads diários
- [ ] Responder issues/questions
- [ ] Coletar feedback
- [ ] Atualizar documentação se necessário

### Primeiro Mês
- [ ] Análise de estatísticas NPM
- [ ] Identificar bugs reportados
- [ ] Planejar próxima versão (v1.1.0)
- [ ] Adicionar mais componentes

---

## 🔄 Atualizações Futuras

### Para cada nova versão:

#### Bug Fix (1.0.0 → 1.0.1)
- [ ] Corrigir bug
- [ ] Atualizar CHANGELOG.md
- [ ] `npm version patch`
- [ ] Build: `npm run build:all`
- [ ] Publicar: `npm publish`
- [ ] Git: `git push && git push --tags`

#### New Feature (1.0.0 → 1.1.0)
- [ ] Desenvolver feature
- [ ] Atualizar docs
- [ ] Atualizar CHANGELOG.md
- [ ] `npm version minor`
- [ ] Build: `npm run build:all`
- [ ] Publicar: `npm publish`
- [ ] Git: `git push && git push --tags`

#### Breaking Change (1.0.0 → 2.0.0)
- [ ] Documentar breaking changes
- [ ] Atualizar MIGRATION_GUIDE.md
- [ ] Atualizar CHANGELOG.md
- [ ] `npm version major`
- [ ] Build: `npm run build:all`
- [ ] Publicar: `npm publish`
- [ ] Git: `git push && git push --tags`
- [ ] Anunciar nas redes sociais

---

## 📈 Métricas de Sucesso

### Objetivos Mês 1
- [ ] 100+ downloads totais
- [ ] 10+ estrelas no GitHub
- [ ] 0 bugs críticos
- [ ] 3+ componentes publicados

### Objetivos Mês 3
- [ ] 500+ downloads totais
- [ ] 50+ estrelas no GitHub
- [ ] 10+ componentes publicados
- [ ] 1 contribuidor externo

### Objetivos Mês 6
- [ ] 2000+ downloads totais
- [ ] 200+ estrelas no GitHub
- [ ] 20+ componentes publicados
- [ ] 5+ contribuidores externos
- [ ] Artigo/tutorial publicado

---

## 🆘 Troubleshooting Comum

### ❌ "You must be logged in to publish packages"
**Solução:** `npm login`

### ❌ "Package name already exists"
**Solução:** Usar @muxima-ui/ scope

### ❌ "You do not have permission to publish"
**Solução:** Adicionar `"publishConfig": { "access": "public" }`

### ❌ "401 Unauthorized"
**Solução:** 
```bash
npm logout
npm login
```

### ❌ "403 Forbidden"
**Solução:** Verificar se está no scope correto e tem `access: public`

### ❌ Build errors
**Solução:** 
```bash
nx reset
rm -rf node_modules
npm ci
npm run build:all
```

---

## 📞 Recursos Úteis

- **NPM Docs**: https://docs.npmjs.com/
- **Semantic Versioning**: https://semver.org/
- **Angular Package Format**: https://angular.io/guide/angular-package-format
- **Nx Docs**: https://nx.dev/
- **GitHub Actions**: https://docs.github.com/en/actions

---

## 🎯 Status Atual

**Data:** ___/___/2026

**Componentes Prontos para Publicar:**
- [x] Progress (1.0.0) - package.json ✅
- [x] Radio Button (1.0.0) - package.json ✅
- [x] Pagination (1.0.0) - package.json ✅

**Próximos Componentes:**
- [ ] Button
- [ ] Alert
- [ ] Badge
- [ ] Card

**Total de Pacotes Publicados:** 0 / 3

---

**Última Atualização:** {{ Data }}  
**Por:** Aldemiro Valentim

---

## 🚀 COMEÇAR AGORA!

```bash
# 1. Login
npm login

# 2. Build
npm run build:all

# 3. Publicar
.\tools\scripts\publish-all.ps1

# 4. Celebrar! 🎉
```

**Boa sorte! 🚀**
