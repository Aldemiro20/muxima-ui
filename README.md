# 🎨 Muxima UI

<div align="center">

**A modern, professional Angular component library**

[![npm](https://img.shields.io/badge/npm-@muxima--ui-red)](https://www.npmjs.com/org/muxima-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Angular-15%2B-red)](https://angular.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)](https://www.typescriptlang.org/)

[📚 Documentation](https://muxima-ui.up.railway.app) · [🐛 Report Bug](https://github.com/Aldemiro20/muxima-ui/issues) · [✨ Request Feature](https://github.com/Aldemiro20/muxima-ui/issues) · [💬 Discussions](https://github.com/Aldemiro20/muxima-ui/discussions)

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Requirements](#-requirements)
- [Packages](#-packages)
- [Theming](#-theming)
- [Local Development](#-local-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Usage Terms & License](#-usage-terms--license)
- [Support](#-support)

---

## ✨ Features

- 🎯 **68+ components** across 9 categories, published individually to NPM
- 📦 **Install only what you need** — each component is its own package
- 🔧 **Standalone** — built with Angular standalone components (no NgModules required)
- 🎨 **Themeable** — CSS custom properties for full design-system customization
- 📱 **Responsive** — mobile-first by default
- ♿ **Accessible** — components follow WCAG guidance
- 💪 **TypeScript** — fully typed, strict-mode APIs
- ⚡ **Tree-shakeable** — no dead weight in your bundle
- 🔄 **Forward-compatible** — tested against Angular 15 through 18+

## 🚀 Quick Start

### Install

Each component ships as its own package — install only what you use:

```bash
npm install @muxima-ui/button
npm install @muxima-ui/dialog
npm install @muxima-ui/kanban
# ...or any other package from the table below
```

### Use it

```typescript
import { Component } from '@angular/core';
import { MuxButtonComponent } from '@muxima-ui/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MuxButtonComponent],
  template: `
    <muxima-button variant="primary" size="large">
      Get Started
    </muxima-button>
  `,
})
export class AppComponent {}
```

That's it — no extra module wiring required.

## 📋 Requirements

| Dependency | Version |
|---|---|
| **Angular** | ≥ 15.0.0 (tested on 15, 16, 17, 18) |
| **TypeScript** | ≥ 5.0.0 |
| **Node.js** | ≥ 18.0.0 |
| **npm** | ≥ 9.0.0 |

## 📦 Packages

68 components, published under the [`@muxima-ui`](https://www.npmjs.com/org/muxima-ui) NPM org and grouped by category below.

<details>
<summary><strong>🧩 Basic components (12)</strong></summary>

| Package | Description |
|---|---|
| [`@muxima-ui/accordion`](https://www.npmjs.com/package/@muxima-ui/accordion) | Collapsible content panels |
| [`@muxima-ui/alert`](https://www.npmjs.com/package/@muxima-ui/alert) | Contextual feedback messages |
| [`@muxima-ui/avatar`](https://www.npmjs.com/package/@muxima-ui/avatar) | User profile pictures |
| [`@muxima-ui/badge`](https://www.npmjs.com/package/@muxima-ui/badge) | Small status descriptors |
| [`@muxima-ui/button`](https://www.npmjs.com/package/@muxima-ui/button) | Buttons with variants and sizes |
| [`@muxima-ui/card`](https://www.npmjs.com/package/@muxima-ui/card) | Container component |
| [`@muxima-ui/feature-card`](https://www.npmjs.com/package/@muxima-ui/feature-card) | Feature showcase card |
| [`@muxima-ui/pricing-card`](https://www.npmjs.com/package/@muxima-ui/pricing-card) | Pricing display card |
| [`@muxima-ui/chip`](https://www.npmjs.com/package/@muxima-ui/chip) | Compact, dismissible elements |
| [`@muxima-ui/hero`](https://www.npmjs.com/package/@muxima-ui/hero) | Hero/landing section |
| [`@muxima-ui/loading`](https://www.npmjs.com/package/@muxima-ui/loading) | Loading spinners |
| [`@muxima-ui/progress`](https://www.npmjs.com/package/@muxima-ui/progress) | Linear, circular and semi-circular progress bars |

</details>

<details>
<summary><strong>📝 Form controls (14)</strong></summary>

| Package | Description |
|---|---|
| [`@muxima-ui/autocomplete`](https://www.npmjs.com/package/@muxima-ui/autocomplete) | Searchable input with suggestions |
| [`@muxima-ui/checkbox`](https://www.npmjs.com/package/@muxima-ui/checkbox) | Checkbox input |
| [`@muxima-ui/color-picker`](https://www.npmjs.com/package/@muxima-ui/color-picker) | Color selection |
| [`@muxima-ui/date-range-picker`](https://www.npmjs.com/package/@muxima-ui/date-range-picker) | Date range selection |
| [`@muxima-ui/datepicker`](https://www.npmjs.com/package/@muxima-ui/datepicker) | Single date selection |
| [`@muxima-ui/input`](https://www.npmjs.com/package/@muxima-ui/input) | Text input with validation |
| [`@muxima-ui/multi-select`](https://www.npmjs.com/package/@muxima-ui/multi-select) | Multiple-selection dropdown |
| [`@muxima-ui/otp-input`](https://www.npmjs.com/package/@muxima-ui/otp-input) | OTP / PIN input |
| [`@muxima-ui/radio-button`](https://www.npmjs.com/package/@muxima-ui/radio-button) | Radio button input |
| [`@muxima-ui/search-box`](https://www.npmjs.com/package/@muxima-ui/search-box) | Search input field |
| [`@muxima-ui/select`](https://www.npmjs.com/package/@muxima-ui/select) | Dropdown selection |
| [`@muxima-ui/slider`](https://www.npmjs.com/package/@muxima-ui/slider) | Range slider |
| [`@muxima-ui/slider-range`](https://www.npmjs.com/package/@muxima-ui/slider-range) | Dual-handle range slider |
| [`@muxima-ui/toggle`](https://www.npmjs.com/package/@muxima-ui/toggle) | Toggle switch |

</details>

<details>
<summary><strong>📊 Data display (4)</strong></summary>

| Package | Description |
|---|---|
| [`@muxima-ui/pagination`](https://www.npmjs.com/package/@muxima-ui/pagination) | Page navigation |
| [`@muxima-ui/product-card`](https://www.npmjs.com/package/@muxima-ui/product-card) | Product display card |
| [`@muxima-ui/table`](https://www.npmjs.com/package/@muxima-ui/table) | Data table |
| [`@muxima-ui/timeline`](https://www.npmjs.com/package/@muxima-ui/timeline) | Timeline visualization |

</details>

<details>
<summary><strong>🎭 Overlays (10)</strong></summary>

| Package | Description |
|---|---|
| [`@muxima-ui/command-palette`](https://www.npmjs.com/package/@muxima-ui/command-palette) | Ctrl+K style command menu |
| [`@muxima-ui/confirmation-dialog`](https://www.npmjs.com/package/@muxima-ui/confirmation-dialog) | Confirmation dialog |
| [`@muxima-ui/dialog`](https://www.npmjs.com/package/@muxima-ui/dialog) | Dialog component |
| [`@muxima-ui/drawer`](https://www.npmjs.com/package/@muxima-ui/drawer) | Side drawer |
| [`@muxima-ui/dropdown`](https://www.npmjs.com/package/@muxima-ui/dropdown) | Dropdown menu |
| [`@muxima-ui/loading-interceptor`](https://www.npmjs.com/package/@muxima-ui/loading-interceptor) | HTTP loading interceptor with animated overlay |
| [`@muxima-ui/modal`](https://www.npmjs.com/package/@muxima-ui/modal) | Modal dialog |
| [`@muxima-ui/notification-center`](https://www.npmjs.com/package/@muxima-ui/notification-center) | Notification center |
| [`@muxima-ui/toast`](https://www.npmjs.com/package/@muxima-ui/toast) | Toast notifications |
| [`@muxima-ui/tooltip`](https://www.npmjs.com/package/@muxima-ui/tooltip) | Tooltips |

</details>

<details>
<summary><strong>🧭 Navigation (6)</strong></summary>

| Package | Description |
|---|---|
| [`@muxima-ui/breadcrumb`](https://www.npmjs.com/package/@muxima-ui/breadcrumb) | Breadcrumb navigation |
| [`@muxima-ui/navbar`](https://www.npmjs.com/package/@muxima-ui/navbar) | Navigation bar |
| [`@muxima-ui/sidebar`](https://www.npmjs.com/package/@muxima-ui/sidebar) | Side navigation |
| [`@muxima-ui/stepper`](https://www.npmjs.com/package/@muxima-ui/stepper) | Step-by-step / wizard navigation |
| [`@muxima-ui/tabs`](https://www.npmjs.com/package/@muxima-ui/tabs) | Tabbed interface |
| [`@muxima-ui/tour-guide`](https://www.npmjs.com/package/@muxima-ui/tour-guide) | Guided product tours |

</details>

<details>
<summary><strong>🎬 Media (3)</strong></summary>

| Package | Description |
|---|---|
| [`@muxima-ui/carousel`](https://www.npmjs.com/package/@muxima-ui/carousel) | Image carousel |
| [`@muxima-ui/image-cropper`](https://www.npmjs.com/package/@muxima-ui/image-cropper) | Image cropping tool |
| [`@muxima-ui/video-player`](https://www.npmjs.com/package/@muxima-ui/video-player) | Video player |

</details>

<details>
<summary><strong>🚀 Advanced (9)</strong></summary>

| Package | Description |
|---|---|
| [`@muxima-ui/calendar`](https://www.npmjs.com/package/@muxima-ui/calendar) | Calendar view |
| [`@muxima-ui/code-diff-viewer`](https://www.npmjs.com/package/@muxima-ui/code-diff-viewer) | Side-by-side code diff viewer |
| [`@muxima-ui/comments`](https://www.npmjs.com/package/@muxima-ui/comments) | Comments with replies, reactions and mentions |
| [`@muxima-ui/file-manager`](https://www.npmjs.com/package/@muxima-ui/file-manager) | File manager UI |
| [`@muxima-ui/gantt-chart`](https://www.npmjs.com/package/@muxima-ui/gantt-chart) | Project timeline / Gantt chart |
| [`@muxima-ui/kanban`](https://www.npmjs.com/package/@muxima-ui/kanban) | Kanban board with drag & drop |
| [`@muxima-ui/quill-editor`](https://www.npmjs.com/package/@muxima-ui/quill-editor) | Rich text (WYSIWYG) editor |
| [`@muxima-ui/shopping-cart`](https://www.npmjs.com/package/@muxima-ui/shopping-cart) | Shopping cart with checkout flow |
| [`@muxima-ui/smart-form-builder`](https://www.npmjs.com/package/@muxima-ui/smart-form-builder) | Dynamic form generation |

</details>

<details>
<summary><strong>🛠️ Utility (9)</strong></summary>

| Package | Description |
|---|---|
| [`@muxima-ui/copy-to-clipboard`](https://www.npmjs.com/package/@muxima-ui/copy-to-clipboard) | Copy-to-clipboard button/directive |
| [`@muxima-ui/credit-card`](https://www.npmjs.com/package/@muxima-ui/credit-card) | Credit card input with formatting |
| [`@muxima-ui/error-boundary`](https://www.npmjs.com/package/@muxima-ui/error-boundary) | Component-level error boundary |
| [`@muxima-ui/file-upload`](https://www.npmjs.com/package/@muxima-ui/file-upload) | File upload with drag & drop |
| [`@muxima-ui/gesture-controller`](https://www.npmjs.com/package/@muxima-ui/gesture-controller) | Touch/gesture detection |
| [`@muxima-ui/settings-item`](https://www.npmjs.com/package/@muxima-ui/settings-item) | Settings menu item |
| [`@muxima-ui/signature-pad`](https://www.npmjs.com/package/@muxima-ui/signature-pad) | Signature capture pad |
| [`@muxima-ui/virtual-keyboard`](https://www.npmjs.com/package/@muxima-ui/virtual-keyboard) | On-screen virtual keyboard |
| [`@muxima-ui/voice-command`](https://www.npmjs.com/package/@muxima-ui/voice-command) | Voice command input |

</details>

<details>
<summary><strong>⭐ Standalone (1)</strong></summary>

| Package | Description |
|---|---|
| [`@muxima-ui/star-rating`](https://www.npmjs.com/package/@muxima-ui/star-rating) | Star rating display/input |

</details>

## 🎨 Theming

Every component uses CSS custom properties, so you can restyle the whole library without touching component internals:

```css
:root {
  --muxima-primary: #667eea;
  --muxima-secondary: #764ba2;
  --muxima-success: #10b981;
  --muxima-warning: #f59e0b;
  --muxima-error: #ef4444;
  --muxima-info: #3b82f6;
}
```

See the [theming guide](docs/THEMING.md) for the full token list.

## 🛠 Local Development

This is an [Nx](https://nx.dev) monorepo. The `docs` app (an Angular SPA) is the interactive documentation/demo site for every package.

```bash
# Clone and install
git clone https://github.com/Aldemiro20/muxima-ui.git
cd muxima-ui
npm install

# Run the docs site (http://localhost:4200)
npm run dev
```

| Command | Description |
|---|---|
| `npm run dev` | Serve the docs app with live reload |
| `npm run build` | Production build of the docs app |
| `npm run build:all` | Build every publishable package |
| `npm run test` | Run all tests |
| `npm run lint` | Lint the whole workspace |
| `npm run storybook` | Launch Storybook |

See [docs/GETTING_STARTED.md](docs/GETTING_STARTED.md) for the full walkthrough.

## 🚢 Deployment

The docs app is a static Angular SPA (client-side routing), deployable to any static host:

- **Vercel** — configured via [`vercel.json`](vercel.json) (`outputDirectory: dist/apps/docs`, SPA rewrite to `index.html`).
- **Railway** — configured via [`railway.json`](railway.json). Build runs `npm run build`; the app is served with `serve -s dist/apps/docs` so deep links fall back to `index.html` instead of 404ing.

Both configs live at the repo root and are picked up automatically by their respective platforms — no manual dashboard setup beyond connecting the repo.

## 🤝 Contributing

Contributions are welcome. Before opening a pull request, please make sure you meet these conditions:

1. **Discuss first for anything non-trivial.** Bug fixes and small improvements can go straight to a PR; new components or breaking changes should start as a [GitHub issue](https://github.com/Aldemiro20/muxima-ui/issues) so we can align on the approach.
2. **Node ≥ 18 and npm ≥ 9** — match the [Requirements](#-requirements) above.
3. **Follow the existing code style** — TypeScript strict mode, standalone Angular components, BEM-style SCSS with a `mux-` prefix. See [CONTRIBUTING.md](CONTRIBUTING.md#coding-guidelines) for the full guide.
4. **Use [Conventional Commits](https://www.conventionalcommits.org/)** — `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, etc.
5. **Tests and lint must pass** — run `nx test <package>` and `nx lint <package>` for anything you touch before opening the PR.
6. **Update documentation** for any user-facing change (README, `docs/`, or the demo page for the affected component).
7. **One logical change per PR** — keep pull requests focused and reviewable.
8. By contributing, **you agree your contribution is licensed under the project's MIT License** (see below).

Full details — coding guidelines, naming conventions, commit format, and the PR checklist — are in **[CONTRIBUTING.md](CONTRIBUTING.md)**.

## 📄 Usage Terms & License

Muxima UI is released under the **[MIT License](LICENSE)**. In short:

- ✅ Free for personal, commercial, and internal use.
- ✅ You may use, copy, modify, merge, publish, distribute, sublicense and sell copies of the software.
- ✅ No attribution required (though a star or a mention is always appreciated ⭐).
- ⚠️ The software is provided **"as is", without warranty of any kind**. The authors are not liable for any claim or damages arising from its use — review components before using them in production, especially anything touching payments, authentication, or user data (e.g. `@muxima-ui/credit-card`).
- ⚠️ The copyright notice and license text must be retained in copies or substantial portions of the software.
- ⚠️ "Muxima UI" and related branding are not covered by the MIT grant — don't use the project name/logo to imply endorsement of a derivative or fork without permission.

## 💬 Support

- 📖 [Documentation](https://muxima-ui.up.railway.app)
- 🐛 [Issue Tracker](https://github.com/Aldemiro20/muxima-ui/issues)
- 💡 [Discussions](https://github.com/Aldemiro20/muxima-ui/discussions)
- 🔗 [NPM Organization](https://www.npmjs.com/org/muxima-ui)

---

<div align="center">

**Built with ❤️ for the Angular community** — by [Aldemiro Valentim](https://github.com/Aldemiro20)

[⬆ back to top](#-muxima-ui)

</div>
