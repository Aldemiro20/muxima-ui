# 📁 Muxima UI - Estrutura Profissional

## 🏗️ Visão Geral da Estrutura

```
muxima-ui/
├── 📱 apps/
│   ├── docs/                      # Documentação (Vercel)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── components/     # Componentes da doc
│   │   │   │   ├── pages/          # Páginas da doc
│   │   │   │   ├── layouts/        # Layouts
│   │   │   │   └── shared/         # Utilitários compartilhados
│   │   │   ├── assets/
│   │   │   │   ├── images/
│   │   │   │   ├── icons/
│   │   │   │   └── styles/
│   │   │   └── environments/
│   │   ├── public/                 # Assets públicos
│   │   ├── project.json
│   │   └── package.json
│   │
│   └── playground/                 # Desenvolvimento/testes
│       └── ...
│
├── 📚 packages/                   # Bibliotecas publicáveis (NPM)
│   ├── core/                      # @muxima-ui/core
│   │   ├── src/
│   │   │   ├── lib/
│   │   │   │   ├── animations/
│   │   │   │   ├── common/
│   │   │   │   ├── directives/
│   │   │   │   ├── pipes/
│   │   │   │   ├── services/
│   │   │   │   ├── tokens/
│   │   │   │   ├── types/
│   │   │   │   └── utils/
│   │   │   ├── index.ts
│   │   │   └── public-api.ts
│   │   ├── README.md
│   │   ├── package.json
│   │   ├── ng-package.json
│   │   └── CHANGELOG.md
│   │
│   ├── components/                # @muxima-ui/components
│   │   ├── button/
│   │   ├── input/
│   │   ├── card/
│   │   └── ...
│   │
│   ├── form/                      # @muxima-ui/form
│   │   ├── autocomplete/
│   │   ├── checkbox/
│   │   ├── datepicker/
│   │   └── ...
│   │
│   ├── data/                      # @muxima-ui/data
│   │   ├── table/
│   │   ├── pagination/
│   │   ├── tree-view/
│   │   └── ...
│   │
│   ├── overlay/                   # @muxima-ui/overlay
│   │   ├── dialog/
│   │   ├── modal/
│   │   ├── drawer/
│   │   ├── tooltip/
│   │   └── ...
│   │
│   ├── media/                     # @muxima-ui/media
│   │   ├── video-player/
│   │   ├── image-cropper/
│   │   ├── carousel/
│   │   └── ...
│   │
│   ├── advanced/                  # @muxima-ui/advanced
│   │   ├── chart/
│   │   ├── kanban/
│   │   ├── gantt-chart/
│   │   ├── rich-text-editor/
│   │   └── ...
│   │
│   └── styles/                    # @muxima-ui/styles
│       ├── themes/
│       ├── mixins/
│       ├── variables/
│       └── utilities/
│
├── 📖 docs/                       # Documentação Markdown
│   ├── guides/
│   │   ├── getting-started.md
│   │   ├── installation.md
│   │   ├── theming.md
│   │   ├── customization.md
│   │   └── migration.md
│   │
│   ├── components/
│   │   ├── button.md
│   │   ├── input.md
│   │   └── ...
│   │
│   ├── api/
│   │   └── ...
│   │
│   └── examples/
│       └── ...
│
├── 🛠️ tools/
│   ├── scripts/
│   │   ├── build-all.ts
│   │   ├── publish.ts
│   │   ├── generate-docs.ts
│   │   └── version-bump.ts
│   │
│   ├── generators/               # Nx generators customizados
│   │   ├── component/
│   │   └── package/
│   │
│   └── schematics/               # Angular schematics
│       └── ng-add/
│
├── 🧪 e2e/                        # Testes E2E
│   └── ...
│
├── 📄 Arquivos Root
├── .github/                       # GitHub configs
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── publish.yml
│   │   ├── docs-deploy.yml
│   │   └── release.yml
│   │
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CONTRIBUTING.md
│
├── .husky/                        # Git hooks
├── .vscode/                       # VS Code settings
├── dist/                          # Build output
├── node_modules/
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── .npmrc
├── .prettierrc
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── nx.json
├── package.json
├── tsconfig.base.json
└── vercel.json                    # Vercel config
```

## 📦 Estrutura de Pacote Individual

```
packages/components/button/
├── src/
│   ├── lib/
│   │   ├── button.component.ts
│   │   ├── button.component.html
│   │   ├── button.component.scss
│   │   ├── button.component.spec.ts
│   │   ├── button.types.ts
│   │   └── button.module.ts (se não standalone)
│   │
│   ├── index.ts                   # Barrel export
│   └── public-api.ts              # Public API surface
│
├── styles/                        # Styles específicos
│   ├── _button.scss
│   └── _button-theme.scss
│
├── README.md                      # Documentação do componente
├── CHANGELOG.md                   # Histórico de versões
├── package.json                   # Package config
├── ng-package.json                # Angular package config
├── tsconfig.json
├── tsconfig.lib.json
├── tsconfig.lib.prod.json
└── tsconfig.spec.json
```

## 🎯 Estrutura da Documentação (Vercel)

```
apps/docs/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   ├── components/
│   │   │   │   ├── button/
│   │   │   │   ├── input/
│   │   │   │   └── ...
│   │   │   ├── guides/
│   │   │   ├── templates/
│   │   │   └── examples/
│   │   │
│   │   ├── layouts/
│   │   │   ├── main-layout/
│   │   │   ├── doc-layout/
│   │   │   └── example-layout/
│   │   │
│   │   ├── components/
│   │   │   ├── header/
│   │   │   ├── sidebar/
│   │   │   ├── code-preview/
│   │   │   ├── api-table/
│   │   │   └── component-demo/
│   │   │
│   │   ├── shared/
│   │   │   ├── services/
│   │   │   ├── pipes/
│   │   │   └── directives/
│   │   │
│   │   └── app.routes.ts
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   ├── fonts/
│   │   └── styles/
│   │       ├── themes/
│   │       └── global.scss
│   │
│   └── environments/
│       ├── environment.ts
│       └── environment.prod.ts
│
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
└── vercel.json
```

## 📚 Agrupamento por Categoria

### Core Package (`@muxima-ui/core`)
- Utilitários compartilhados
- Serviços base
- Diretivas comuns
- Pipes
- Tokens de injeção
- Animações
- Types e interfaces

### Components Package (`@muxima-ui/components`)
**Basic Components:**
- Button
- Badge
- Chip
- Avatar
- Card
- Skeleton
- Loading
- Progress

### Form Package (`@muxima-ui/form`)
**Form Controls:**
- Input
- Textarea
- Select
- Autocomplete
- Checkbox
- Radio Button
- Toggle
- Slider
- Slider Range
- Datepicker
- Time Picker
- Date Range Picker
- Color Picker
- OTP Input
- Search Bar

### Data Package (`@muxima-ui/data`)
**Data Display:**
- Table
- Data Table
- Pagination
- Tree View
- Timeline
- Stats Card

### Overlay Package (`@muxima-ui/overlay`)
**Overlays:**
- Dialog
- Modal
- Drawer
- Dropdown
- Tooltip
- Toast
- Notification Center
- Command Palette

### Navigation Package (`@muxima-ui/navigation`)
**Navigation:**
- Navbar
- Sidebar
- Breadcrumb
- Tabs
- Stepper
- Tour Guide
- Menu

### Media Package (`@muxima-ui/media`)
**Media:**
- Video Player
- Image Cropper
- Carousel
- Document Viewer

### Advanced Package (`@muxima-ui/advanced`)
**Complex Components:**
- Chart
- Kanban
- Gantt Chart
- Calendar
- Rich Text Editor
- Quill Editor
- Code Diff Viewer
- Smart Form Builder
- Shopping Cart
- File Manager
- Comments

### Utility Package (`@muxima-ui/utility`)
**Utilities:**
- Copy to Clipboard
- Signature Pad
- Drag Drop Zone
- File Upload
- Virtual Keyboard
- Voice Command
- Gesture Controller
- Error Boundary
- Confirmation Dialog
- Language Selector
- User Profile Menu

## 🚀 Benefícios da Nova Estrutura

### Para NPM:
✅ Pacotes independentes e versionados separadamente
✅ Instalação granular (`npm install @muxima-ui/button`)
✅ Tree-shaking eficiente
✅ Menor bundle size
✅ Melhor cache do NPM

### Para Documentação (Vercel):
✅ Deploy otimizado e rápido
✅ SEO friendly
✅ Code splitting automático
✅ Preview deployments para PRs
✅ Analytics integrado

### Para Desenvolvimento:
✅ Monorepo organizado com Nx
✅ Cache inteligente de builds
✅ Builds incrementais
✅ Testes isolados
✅ Fácil manutenção

### Para Usuários:
✅ Instalação flexível
✅ Documentação centralizada
✅ Exemplos interativos
✅ API reference clara
✅ TypeScript support completo

## 📝 Convenções de Nomenclatura

### Pacotes NPM:
```
@muxima-ui/core
@muxima-ui/components
@muxima-ui/form
@muxima-ui/data
@muxima-ui/overlay
@muxima-ui/media
@muxima-ui/advanced
```

### Imports:
```typescript
import { MuxButton } from '@muxima-ui/components/button';
import { MuxInput } from '@muxima-ui/form/input';
import { MuxTable } from '@muxima-ui/data/table';
```

### Componentes:
```typescript
// Selector: muxima-button, mux-button
// Class: MuxButtonComponent, MuxButton
// Type: MuxButtonType
// Interface: MuxButtonConfig
```

## 🔄 Fluxo de Trabalho

### Desenvolvimento:
1. Desenvolver em `packages/[category]/[component]`
2. Testar em `apps/playground`
3. Documentar em `apps/docs`
4. Build e publicar individualmente

### CI/CD:
1. GitHub Actions roda testes
2. Build automático de todos os pacotes
3. Publish no NPM (com tags)
4. Deploy docs na Vercel
5. Release notes automático

## 📊 Comparação com Outras Libs

### Angular Material:
```
@angular/material/button
@angular/material/input
```

### PrimeNG:
```
primeng/button
primeng/inputtext
```

### Muxima UI (Nova Estrutura):
```
@muxima-ui/components/button
@muxima-ui/form/input
```

## 🎯 Roadmap de Migração

1. ✅ Definir nova estrutura
2. ⏳ Criar pacotes base (core, components, etc.)
3. ⏳ Migrar componentes existentes
4. ⏳ Configurar builds individuais
5. ⏳ Setup documentação Vercel
6. ⏳ Configurar CI/CD
7. ⏳ Publicar primeira versão no NPM
8. ⏳ Deploy documentação
