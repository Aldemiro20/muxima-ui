# Muxima UI

Biblioteca de componentes para Angular 21 ou superior, com documentação em português.
Componentes acessíveis, temas por variáveis CSS e modo escuro incluído.

## Estrutura

| Pasta | Conteúdo |
| --- | --- |
| `projects/core` | Pacote `@muxima-ui/core`: 33 componentes, tokens e estilos (lista em `projects/core/README.md`) |
| `projects/docs` | Site de documentação: uma página por componente, temas, modo escuro, padrão de qualidade, templates, preços, consultoria e changelog |

## Padrão de qualidade

Cada componente segue as oito regras descritas em `/docs/padrao-de-qualidade` no site: Angular 21+, HTML nativo primeiro, WAI-ARIA e teclado, formulários, estados completos, só tokens, API pequena (`variant`, `size`, `disabled`; no máximo 6 variantes e 3 tamanhos) e testes com axe.

## Requisitos

- Node.js 20.19 ou superior (22 recomendado)
- Para `test:a11y`, o Chromium do Playwright: `npx playwright install chromium`
- npm 11 (o npm 10.9 falha a instalar este workspace com o erro `edgesOut`; usa `npx npm@11 install` se for preciso)

## Comandos

```bash
npm install          # instalar dependências
npm start            # site de documentação em http://localhost:4200 (gera antes o código dos exemplos)
npm test             # testes da biblioteca (Vitest), com axe em cada componente
npm run build:core   # gerar o pacote em dist/core
npm run build:docs   # gerar o site em dist/docs
npm run docs:examples # só regenerar o código mostrado em cada exemplo
npm run test:a11y    # axe em todas as páginas do site, claro e escuro (depois de build:docs)
```

## Usar a biblioteca numa aplicação

```bash
npm install @muxima-ui/core @angular/cdk
```

Em `angular.json`, acrescenta os estilos:

```json
"styles": ["@muxima-ui/core/styles.css", "src/styles.css"]
```

Depois importa só o que precisas:

```ts
import { MxButton } from '@muxima-ui/core/button';
import { MxFormField, MxLabel, MxInput } from '@muxima-ui/core/form-field';
```

## Tema

Todas as cores vêm de variáveis `--mx-*`. Para adaptar à tua marca:

```css
:root {
  --mx-accent: #7a1f3d;
  --mx-radius: 8px;
}
```

Modo escuro: segue o sistema por omissão; força com `<html data-theme="dark">` ou `data-theme="light"`.

## Idiomas

Português (por omissão na 1.x) e inglês. Escolhe com `provideMuximaI18n({ locale: 'en' })` e muda com `inject(MxI18n).setLocale('pt')`. Ver a página Idiomas da documentação.

## Compatibilidade

Angular 21 e 22 (`peerDependencies: >=21.0.0 <23.0.0`). Versões anteriores não são suportadas.

## Testes e publicação

- `npm run test:e2e`: testes end-to-end com Playwright (teclado, foco e acessibilidade com menus, diálogos e calendário abertos). Precisa de `npm run build:docs` antes.
- `docs/verificacao-leitores-de-ecra.md`: lista de verificação manual com NVDA, VoiceOver e TalkBack.
- `docs/publicar.md`: como publicar no npm e descontinuar os pacotes antigos.
- `CHANGELOG.md`: alterações por versão.

## Licença

MIT. Autor: Aldemiro Valentim.
