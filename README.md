# 🎨 Muxima UI

<div align="center">

**A modern, professional Angular component library**

[![npm](https://img.shields.io/badge/npm-@muxima--ui-red)](https://www.npmjs.com/org/muxima-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Angular](https://img.shields.io/badge/Angular-18+-red)](https://angular.io)
[![Published](https://img.shields.io/badge/Status-Published-success)](https://www.npmjs.com/org/muxima-ui)

[📚 Documentation](https://muxima-ui.vercel.app) · [🐛 Report Bug](https://github.com/Aldemiro20/muxima-ui/issues) · [✨ Request Feature](https://github.com/Aldemiro20/muxima-ui/issues)

</div>

---

## 🎉 Now Available on NPM!

**Muxima UI components are now published and ready to use!**

```bash
npm install @muxima-ui/kanban
npm install @muxima-ui/comments
npm install @muxima-ui/shopping-cart
npm install @muxima-ui/quill-editor
```

👉 **[See all published packages](PUBLISHED_PACKAGES.md)**

---

## ✨ Features

- 🎯 **70+ Components** - Comprehensive UI component library
- 📦 **NPM Published** - Install directly from NPM
- 🌍 **Public Access** - Free and open source
- 🎨 **Themeable** - Fully customizable design system
- 📱 **Responsive** - Mobile-first approach
- ♿ **Accessible** - WCAG compliant
- 💪 **TypeScript** - Full type safety
- 🔧 **Standalone** - Angular 18+ standalone components
- 📖 **Well Documented** - Comprehensive documentation

## 📦 Published Packages

### Advanced Components

| Package | Description | Size | Install |
|---------|-------------|------|---------|
| `@muxima-ui/kanban` | Kanban board with drag & drop | 27 kB | `npm i @muxima-ui/kanban` |
| `@muxima-ui/comments` | Comments system with replies | 32 kB | `npm i @muxima-ui/comments` |
| `@muxima-ui/shopping-cart` | Shopping cart component | 17 kB | `npm i @muxima-ui/shopping-cart` |
| `@muxima-ui/quill-editor` | Rich text WYSIWYG editor | 100 kB | `npm i @muxima-ui/quill-editor` |

**[📖 Full installation guide →](PUBLISHED_PACKAGES.md)**

## 🚀 Quick Start

### 1. Install a Component

```bash
npm install @muxima-ui/kanban
```

### 2. Import in Your Angular App

```typescript
import { Component } from '@angular/core';
import { KanbanComponent } from '@muxima-ui/kanban';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [KanbanComponent],
  template: `
    <muxima-kanban [boards]="boards"></muxima-kanban>
  `
})
export class AppComponent {
  boards = [/* your boards */];
}
```

### 3. Start Using! 🎉

That's it! No complex setup required.

---

## 📦 Legacy Installation (For Development)

### Quick Install

```bash
npm install @muxima-ui/core @muxima-ui/components
```

### Individual Packages

```bash
# Core (Required)
npm install @muxima-ui/core

# Categories
npm install @muxima-ui/components  # Basic components
npm install @muxima-ui/form        # Form controls
npm install @muxima-ui/data        # Data display
npm install @muxima-ui/overlay     # Modals & overlays
npm install @muxima-ui/media       # Media components
npm install @muxima-ui/advanced    # Complex components
npm install @muxima-ui/navigation  # Navigation
npm install @muxima-ui/utility     # Utilities
```

## 🚀 Quick Start

```typescript
import { Component } from '@angular/core';
import { MuxButtonComponent } from '@muxima-ui/components/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MuxButtonComponent],
  template: `
    <muxima-button variant="primary">
      Click me
    </muxima-button>
  `
})
export class AppComponent {}
```

## � Rodando o Projeto

### Instalar dependências
```bash
npm install
```

### Iniciar servidor de desenvolvimento
```bash
npm run dev
```

Abra [http://localhost:4200](http://localhost:4200) no seu navegador.

### Comandos principais

```bash
npm run dev          # Iniciar documentação
npm run build        # Build da documentação
npm run build:all    # Build de todos os pacotes
npm test             # Rodar testes
npm run lint         # Lint do código
npm run storybook    # Iniciar Storybook
```

📖 **[Ver guia completo](./GETTING_STARTED.md)**

## �📚 Package Overview

| Package | Description | Components |
|---------|-------------|------------|
| `@muxima-ui/core` | Core utilities & services | Foundation |
| `@muxima-ui/components` | Basic UI components | Button, Card, Badge, Avatar, etc. |
| `@muxima-ui/form` | Form controls | Input, Select, Checkbox, Datepicker, etc. |
| `@muxima-ui/data` | Data display | Table, Pagination, Tree View, etc. |
| `@muxima-ui/overlay` | Overlays & modals | Dialog, Modal, Tooltip, Toast, etc. |
| `@muxima-ui/media` | Media components | Video Player, Carousel, Image Cropper |
| `@muxima-ui/advanced` | Complex components | Charts, Kanban, Gantt, Rich Editor |
| `@muxima-ui/navigation` | Navigation | Navbar, Sidebar, Tabs, Breadcrumb |
| `@muxima-ui/utility` | Utilities | Clipboard, File Upload, Signature Pad |

## 🎨 Theming

```scss
@import '@muxima-ui/styles/themes/default';
```

## 📖 Documentation

Visit [muxima-ui.vercel.app](https://muxima-ui.vercel.app) for complete documentation.

## 🔧 Development

```bash
# Install
npm install

# Start dev server
npm run dev

# Build all packages
npm run build:all

# Test
npm test
```

## 🚀 Deploy na Vercel

Para fazer deploy da documentação na Vercel:

```bash
# 1. Configure o projeto na Vercel
#    Build Command: npm run build:docs
#    Output Directory: dist/apps/docs

# 2. Deploy automático a cada push para main
git push origin main
```

📖 **[Ver guia completo de deploy](./VERCEL_DEPLOY.md)**

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT License - see [LICENSE](LICENSE)

## 🔗 Links

- [Documentation](https://muxima-ui.vercel.app)
- [NPM](https://www.npmjs.com/org/muxima-ui)
- [GitHub](https://github.com/Aldemiro20/muxima-ui)

---

<div align="center">

Made with ❤️ by [Aldemiro Valentim](https://github.com/Aldemiro20)

</div>
