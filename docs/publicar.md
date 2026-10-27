# Publicar uma versão no npm

A publicação é feita à mão por quem tem a conta npm da organização `@muxima-ui`. Tudo o resto está preparado.

## Antes de publicar

1. Enviar o branch `v2` para o GitHub e torná-lo o branch por omissão (Settings > General >
   Default branch). A página do pacote no npm aponta para o repositório, por isso quem chegar
   lá tem de ver o README novo e não o da versão antiga.

   ```bash
   git push -u origin v2
   ```

   Esperar que o CI fique verde.
2. Localmente, com npm 11:

   ```bash
   npx npm@11 ci
   npm test
   npm run build:core
   npm run build:docs
   npm run test:a11y
   npm run test:e2e
   ```

3. Confirmar a versão em `projects/core/package.json` e em `projects/core/src/public-api.ts` (`MUXIMA_VERSION`).
4. Mudar a data da versão em `CHANGELOG.md` (de "por publicar" para a data do dia) e na página Changelog do site (`projects/docs/src/app/pages/changelog.ts`).
5. Ver o que vai ser publicado:

   ```bash
   cd dist/core
   npm pack --dry-run
   ```

   Devem aparecer `fesm2022/`, `types/`, `styles/`, `README.md` e `package.json`, com cerca de 140 kB.

## Publicar

```bash
npm login                       # com a conta da organização; a autenticação de 2 factores pede o código
cd dist/core
npm publish --access public     # acrescenta --otp=123456 se o npm pedir
```

Para uma versão de teste antes da final:

```bash
npm version 1.0.0-rc.1 --no-git-tag-version   # dentro de projects/core
npm run build:core && cd dist/core && npm publish --tag next --access public
```

## Depois de publicar

1. Criar a etiqueta git e enviá-la:

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. Descontinuar os pacotes antigos (mostra o aviso a quem os instalar, sem os apagar):

   ```bash
   ./scripts/descontinuar-pacotes-antigos.sh          # mostra os comandos
   ./scripts/descontinuar-pacotes-antigos.sh --run    # executa
   ```

3. Confirmar no npm: `npm view @muxima-ui/core` e `npm view @muxima-ui/button deprecated`.
4. Publicar o site a partir de `dist/docs/browser`. Enquanto não houver domínio, um
   subdomínio gratuito (Cloudflare Pages, Vercel ou Netlify) serve; ao comprar o domínio,
   basta associá-lo ao mesmo projecto. Lembra-te de configurar o encaminhamento de todas as
   rotas para `index.html` (o site é uma SPA).

## Quando sair uma versão nova (1.1, 1.2...)

1. Subir a versão em `projects/core/package.json` e `MUXIMA_VERSION`, actualizar o CHANGELOG.
2. Passos de "Antes de publicar" e "Publicar".
3. No script de descontinuação, passar os pacotes antigos que ganharam substituto de
   `PENDENTE` para `NOVO` e correr `./scripts/descontinuar-pacotes-antigos.sh --run`.
