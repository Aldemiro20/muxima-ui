# 🚀 Guia de Deploy na Vercel

Este guia mostra como fazer o deploy do Muxima UI na Vercel.

## 📋 Pré-requisitos

- Conta no GitHub
- Conta na Vercel (https://vercel.com)
- Repositório `muxima-ui` no GitHub

## 🔧 Configuração

### 1. Preparar o Repositório

Certifique-se de que todas as mudanças estão commitadas:

```bash
git add .
git commit -m "feat: prepare for Vercel deployment"
git push origin main
```

### 2. Importar Projeto na Vercel

1. **Acesse:** https://vercel.com
2. **Login** com sua conta GitHub
3. **Clique em:** "Add New Project" ou "Import Project"
4. **Selecione:** o repositório `muxima-ui`

### 3. Configurar Build Settings

Na tela de configuração do projeto, use estas configurações:

#### Framework Preset
```
Other
```

#### Build & Development Settings

**Build Command:**
```bash
npm run build:docs
```

**Output Directory:**
```
dist/apps/docs
```

**Install Command:**
```bash
npm install
```

**Development Command:**
```bash
npm run dev
```

#### Root Directory
```
./
```

### 4. Variáveis de Ambiente (Opcional)

Se você precisar adicionar variáveis de ambiente:

1. Vá em **Settings** → **Environment Variables**
2. Adicione as variáveis necessárias (ex: API keys)

### 5. Deploy

1. **Clique em:** "Deploy"
2. **Aguarde:** O processo de build (leva ~3-5 minutos)
3. **Acesse:** O URL fornecido pela Vercel

## 📁 Estrutura de Deploy

O Vercel irá:

1. ✅ Instalar dependências (`npm install`)
2. ✅ Executar build (`nx build docs --configuration=production`)
3. ✅ Servir os arquivos de `dist/apps/docs`

## 🔄 Deploys Automáticos

Após a configuração inicial, cada push para `main` acionará um novo deploy automaticamente:

- **Push para `main`** → Deploy em Produção
- **Pull Request** → Deploy de Preview
- **Push para outras branches** → Deploy de Preview (se configurado)

## 🌐 Domínio Customizado

Para adicionar um domínio customizado:

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio
3. Configure os DNS records conforme instruções da Vercel

### Exemplo de Configuração DNS:

```
Type: CNAME
Name: docs (ou www)
Value: cname.vercel-dns.com
```

## ⚙️ Configurações Avançadas

### Headers de Segurança

O arquivo `vercel.json` já está configurado com:

- ✅ Content Security Policy
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Referrer-Policy
- ✅ Permissions-Policy

### Redirects

Configurado para redirecionar `/` para `/getting-started`

### Rewrites

Configurado para SPA (Single Page Application)

## 🐛 Troubleshooting

### Build Falha

Se o build falhar:

1. **Verifique os logs** na Vercel
2. **Teste localmente:**
   ```bash
   npm run build:docs
   ```
3. **Verifique se há erros** de TypeScript ou Angular

### 404 em Rotas

Se você receber 404 em rotas:

- ✅ O `vercel.json` já está configurado com rewrites
- Certifique-se de que `useHash: false` no `RouterModule`

### Build Muito Lento

Para acelerar o build:

1. **Use build cache** (já habilitado por padrão)
2. **Considere builds incrementais** do Nx

## 📊 Monitoramento

A Vercel fornece:

- **Analytics:** Visualizações, tempo de carregamento
- **Logs:** Logs de build e runtime
- **Metrics:** Performance da aplicação

Acesse em: **Project** → **Analytics**

## 🔄 Rollback

Para reverter para uma versão anterior:

1. Vá em **Deployments**
2. Selecione o deployment desejado
3. Clique em **"Promote to Production"**

## 📚 Recursos Adicionais

- [Documentação Vercel](https://vercel.com/docs)
- [Deploy Angular Apps](https://vercel.com/guides/deploying-angular-with-vercel)
- [Nx on Vercel](https://nx.dev/recipes/deployment/deploy-nextjs-to-vercel)

## ✅ Checklist de Deploy

- [ ] Código commitado e pushed para GitHub
- [ ] Projeto importado na Vercel
- [ ] Build command configurado: `npm run build:docs`
- [ ] Output directory configurado: `dist/apps/docs`
- [ ] Deploy executado com sucesso
- [ ] URL funcionando corretamente
- [ ] Todas as rotas acessíveis
- [ ] Componentes carregando corretamente

## 🎉 Pronto!

Seu projeto Muxima UI agora está ao vivo na Vercel!

**URL padrão:** `https://muxima-ui.vercel.app` (ou similar)

Para qualquer problema, consulte os logs na Vercel ou abra uma issue no GitHub.
