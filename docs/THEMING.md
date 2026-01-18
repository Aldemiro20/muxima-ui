# 🎨 Guia de Temas - Muxima UI

Este guia explica como personalizar o tema da biblioteca Muxima UI e criar seus próprios temas customizados.

---

## 🎯 Visão Geral

O sistema de temas do Muxima UI é baseado em:

- **SCSS Variables**: Variáveis centralizadas em `_theme.scss`
- **CSS Custom Properties**: Para alterações dinâmicas em runtime
- **Gradientes**: Paleta vibrante com transições de cores
- **Tokens de Design**: Espaçamentos, tipografia, sombras, etc.

---

## 📦 Estrutura do Tema

```
libs/styles/
└── _theme.scss          # Arquivo central de temas
```

---

## 🎨 Paleta de Cores Padrão

### Brand Colors

```scss
// Primary (Azul → Índigo → Roxo)
$primary: #2563eb;
$primary-50: #eff6ff;
$primary-100: #dbeafe;
$primary-600: #2563eb;
$primary-900: #1e3a8a;

// Accent (Magenta)
$accent: #d946ef;
$accent-100: #fce7f3;
$accent-600: #d946ef;
$accent-900: #701a75;

// Warning/Warn (Amarelo/Laranja)
$warn: #f59e42;
$warn-50: #fff7ed;
$warn-600: #f59e42;
$warn-900: #78350f;
```

### Semantic Colors

```scss
// Success (Verde)
$success: #22c55e;
$success-100: #dcfce7;
$success-600: #16a34a;

// Error (Vermelho)
$error: #dc2626;
$error-100: #fee2e2;
$error-600: #dc2626;

// Info (Herda Primary)
$info: $primary;

// Warning (Herda Warn)
$warning: $warn;
```

### Grayscale

```scss
$gray-50: #f9fafb;
$gray-100: #f3f4f6;
$gray-200: #e5e7eb;
$gray-300: #d1d5db;
$gray-500: #6b7280;
$gray-700: #374151;
$gray-900: #111827;
```

---

## 🛠️ Usando o Tema

### Opção 1: Importar em Componentes (Recomendado)

```scss
// component.scss
@use '../../../../../libs/styles/_theme.scss' as *;

.my-component {
  background-color: $primary-600;
  color: $text-default;
  border-radius: $border-radius-md;
  padding: $space-4;
  box-shadow: $shadow-md;
}
```

### Opção 2: Importar Globalmente

```scss
// styles.scss (raiz do projeto)
@import 'libs/styles/_theme.scss';

body {
  background-color: $bg-default;
  color: $text-default;
  font-family: $font-family-base;
}
```

---

## 🎯 Customizando o Tema

### Método 1: Sobrescrever Variáveis

Crie seu próprio arquivo de tema:

```scss
// custom-theme.scss
@use 'libs/styles/_theme.scss' with (
  // Cores principais
  $primary: #1e40af,
  $accent: #ec4899,
  
  // Tamanhos
  $border-radius-md: 12px,
  $space-4: 1.5rem,
  
  // Tipografia
  $font-family-base: 'Poppins, sans-serif',
  $font-size-md: 1.125rem
);
```

### Método 2: Criar Tema do Zero

```scss
// brand-theme.scss

// 🎨 CORES
$brand-primary: #6366f1;
$brand-secondary: #8b5cf6;
$brand-success: #10b981;
$brand-error: #ef4444;

// 🧱 FUNDOS
$bg-default: #ffffff;
$bg-muted: #f3f4f6;

// ✍️ TEXTO
$text-default: #1f2937;
$text-muted: #6b7280;

// 🧩 BORDAS
$border-color: #e5e7eb;
$border-radius: 8px;

// 📏 ESPAÇAMENTOS
$spacing-unit: 0.25rem;
$space-1: $spacing-unit;
$space-2: $spacing-unit * 2;
$space-4: $spacing-unit * 4;
$space-8: $spacing-unit * 8;

// 🔤 TIPOGRAFIA
$font-base: 'Inter', sans-serif;
$font-heading: 'Montserrat', sans-serif;
$font-mono: 'Fira Code', monospace;

// ☁️ SOMBRAS
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);

// Exporte para uso
:export {
  brandPrimary: $brand-primary;
  brandSecondary: $brand-secondary;
  // ...
}
```

---

## 🌈 Criando Gradientes Customizados

### Gradientes Lineares

```scss
// custom-gradients.scss
$gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
$gradient-success: linear-gradient(135deg, #10b981 0%, #34d399 100%);
$gradient-sunset: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
$gradient-ocean: linear-gradient(135deg, #667eea 0%, #00b4d8 100%);
```

### Aplicando em Componentes

```scss
.card-gradient {
  background: $gradient-primary;
  color: white;
  
  &:hover {
    background: $gradient-sunset;
    transition: background 0.3s ease;
  }
}
```

---

## 🌓 Modo Escuro (Dark Mode)

### Definindo Variáveis

```scss
// dark-theme.scss
$dark-bg-default: #1f2937;
$dark-bg-muted: #111827;
$dark-text-default: #f9fafb;
$dark-text-muted: #9ca3af;
$dark-border-color: #374151;

// Aplicar via classe
.dark-mode {
  --bg-default: #{$dark-bg-default};
  --bg-muted: #{$dark-bg-muted};
  --text-default: #{$dark-text-default};
  --text-muted: #{$dark-text-muted};
  --border-color: #{$dark-border-color};
}
```

### Usando com Angular

```typescript
// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = false;

  toggleTheme() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-mode', this.isDark);
  }

  getCurrentTheme() {
    return this.isDark ? 'dark' : 'light';
  }
}
```

```typescript
// app.component.ts
@Component({
  template: `
    <muxima-toggle
      [(checked)]="isDarkMode"
      (checkedChange)="onThemeToggle()"
      label="Modo Escuro">
    </muxima-toggle>
  `
})
export class AppComponent {
  isDarkMode = false;

  constructor(private theme: ThemeService) {}

  onThemeToggle() {
    this.theme.toggleTheme();
  }
}
```

---

## 🎨 CSS Custom Properties (Runtime)

### Definindo Variáveis CSS

```scss
// styles.scss
:root {
  // Cores
  --mux-color-primary: #{$primary-600};
  --mux-color-accent: #{$accent-600};
  --mux-color-success: #{$success-600};
  --mux-color-error: #{$error-600};
  
  // Espaçamentos
  --mux-space-1: #{$space-1};
  --mux-space-4: #{$space-4};
  --mux-space-8: #{$space-8};
  
  // Tipografia
  --mux-font-base: #{$font-family-base};
  --mux-font-size-md: #{$font-size-md};
  
  // Bordas
  --mux-border-radius: #{$border-radius-md};
  --mux-border-color: #{$border-color};
  
  // Sombras
  --mux-shadow-md: #{$shadow-md};
  --mux-shadow-lg: #{$shadow-lg};
}
```

### Usando em Componentes

```scss
.custom-button {
  background-color: var(--mux-color-primary);
  color: white;
  padding: var(--mux-space-4);
  border-radius: var(--mux-border-radius);
  box-shadow: var(--mux-shadow-md);
  font-family: var(--mux-font-base);
  
  &:hover {
    box-shadow: var(--mux-shadow-lg);
  }
}
```

### Alterando Dinamicamente

```typescript
// dynamic-theme.service.ts
export class DynamicThemeService {
  updatePrimaryColor(color: string) {
    document.documentElement.style.setProperty('--mux-color-primary', color);
  }

  updateSpacing(multiplier: number) {
    const baseSpace = 0.25; // rem
    document.documentElement.style.setProperty(
      '--mux-space-4', 
      `${baseSpace * 4 * multiplier}rem`
    );
  }

  resetTheme() {
    document.documentElement.removeAttribute('style');
  }
}
```

---

## 🎭 Temas Pré-definidos

### Tema Claro (Padrão)

```scss
@mixin light-theme {
  --bg-default: #ffffff;
  --bg-muted: #f3f4f6;
  --text-default: #1f2937;
  --text-muted: #6b7280;
  --border-color: #e5e7eb;
}

body {
  @include light-theme;
}
```

### Tema Escuro

```scss
@mixin dark-theme {
  --bg-default: #1f2937;
  --bg-muted: #111827;
  --text-default: #f9fafb;
  --text-muted: #9ca3af;
  --border-color: #374151;
}

body.dark-mode {
  @include dark-theme;
}
```

### Tema Angolano (African Pattern)

```scss
@mixin african-theme {
  --primary: #D4AF37; // Dourado
  --accent: #FF8C00;  // Laranja
  --pattern-overlay: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    rgba(255, 255, 255, 0.1) 10px,
    rgba(255, 255, 255, 0.1) 20px
  );
}

body.african-theme {
  @include african-theme;
}
```

---

## 🔧 Ferramentas de Desenvolvimento

### Theme Switcher Component

```typescript
@Component({
  selector: 'muxima-theme-switcher',
  template: `
    <div class="theme-switcher">
      <button 
        *ngFor="let theme of themes"
        (click)="applyTheme(theme.id)"
        [class.active]="currentTheme === theme.id">
        {{ theme.name }}
      </button>
    </div>
  `,
  styles: [`
    .theme-switcher {
      display: flex;
      gap: 0.5rem;
      padding: 1rem;
      background: var(--bg-muted);
      border-radius: 0.5rem;
    }

    button {
      padding: 0.5rem 1rem;
      border: 2px solid var(--border-color);
      border-radius: 0.25rem;
      background: var(--bg-default);
      cursor: pointer;
      transition: all 0.2s;

      &.active {
        border-color: var(--mux-color-primary);
        background: var(--mux-color-primary);
        color: white;
      }

      &:hover:not(.active) {
        border-color: var(--mux-color-primary);
      }
    }
  `]
})
export class ThemeSwitcherComponent {
  themes = [
    { id: 'light', name: 'Claro' },
    { id: 'dark', name: 'Escuro' },
    { id: 'african', name: 'Africano' }
  ];

  currentTheme = 'light';

  applyTheme(themeId: string) {
    document.body.className = themeId === 'light' ? '' : `${themeId}-theme`;
    this.currentTheme = themeId;
  }
}
```

---

## 📚 Referências

- [SCSS Documentation](https://sass-lang.com/documentation)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Material Design Color System](https://material.io/design/color)
- [Tailwind CSS Colors](https://tailwindcss.com/docs/customizing-colors)

---

## 💡 Dicas

1. **Consistência**: Use sempre as variáveis do tema, evite valores hardcoded
2. **Gradientes**: Combine cores próximas para transições suaves
3. **Contraste**: Teste acessibilidade com ferramentas como [WebAIM](https://webaim.org/resources/contrastchecker/)
4. **Performance**: Prefira CSS variables para mudanças dinâmicas
5. **Documentação**: Mantenha um guia visual dos seus tokens

---

**Feito com 🫶 Muxima (coração)**
