# 🚀 Guia de Início Rápido - Muxima UI

Bem-vindo ao **Muxima UI**! Uma biblioteca Angular moderna e completa desenvolvida por **Aldemiro Valentim**, mais conhecido por **JokerScript**, com componentes standalone, totalmente type-safe e prontos para produção.

> 💜 **Muxima** significa "coração" em Kimbundu, refletindo a paixão e cuidado dedicados a cada componente.

---

## ✨ Características

- 🎨 **80+ Componentes** - Da básica à super avançados
- 🚀 **Standalone Components** - Zero configuração de módulos
- 💪 **TypeScript First** - 100% type-safe
- 🎯 **Tree-shakeable** - Bundle otimizado
- ♿ **Acessível** - WCAG 2.1 AA compliant
- 🌈 **Tema Personalizável** - Purple gradient por padrão
- 📱 **Responsive** - Mobile-first design
- ⚡ **Performance** - OnPush change detection
- 🧪 **Testado** - Unit tests com Jest
- 📚 **Documentação Completa** - Exemplos interativos

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter o ambiente configurado:

| Ferramenta | Versão Mínima | Verificar |
|------------|---------------|-----------|
| **Node.js** | 18.0.0 | `node --version` |
| **npm** | 9.0.0 | `npm --version` |
| **Angular CLI** | 15.0.0 | `ng version` |
| **TypeScript** | 4.8.0 | `tsc --version` |

```bash
# Verifique suas versões
node --version    # ✅ v18.0.0+
npm --version     # ✅ v9.0.0+
ng version        # ✅ Angular CLI: 15.0.0+
```

> 💡 **Recomendação**: Use Node.js LTS (Long Term Support) para melhor estabilidade.

---

## 📦 Instalação

### Opção 1: Via NPM (Recomendado)

```bash
# Instalação completa
npm install @muxima-ui/core

# Ou instale componentes individuais
npm install @muxima-ui/button @muxima-ui/input @muxima-ui/select
```

### Opção 2: Via Yarn

```bash
yarn add @muxima-ui/core
```

### Opção 3: Desenvolvimento Local (Contribuidores)

```bash
# 1. Clone o repositório
git clone https://github.com/Aldemiro20/muxima-ui.git
cd muxima-ui

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm start

# 4. Acesse a documentação interativa
# 🌐 http://localhost:4200
```

### Configuração do tsconfig.json

Adicione os path aliases no seu `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@muxima-ui/*": ["node_modules/@muxima-ui/*/src/index.ts"],
      "@agt-ui/*": ["node_modules/@agt-ui/*/src/index.ts"]
    }
  }
}
```

---

## 🎯 Quick Start - Seu Primeiro Componente

### 1️⃣ Importe o Componente

Os componentes Muxima UI são **standalone** - sem necessidade de NgModules!

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { MuximaAlertComponent } from '@muxima-ui/alert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MuximaAlertComponent],
  template: `
    <div class="container">
      <muxima-alert type="success" appearance="fill">
        🎉 Bem-vindo ao Muxima UI by JokerScript!
        <br>
        <small>Desenvolvido por Aldemiro Valentim</small>
      </muxima-alert>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 24px;
    }
  `]
})
export class AppComponent {}
```

### 2️⃣ Configure o Tema Global (Opcional)

Importe o tema no seu `styles.scss` principal:

```scss
// src/styles.scss

// Importa o tema Muxima UI (Purple Gradient)
@import '@muxima-ui/styles/theme';

// Ou customize as variáveis
:root {
  --muxima-primary: #667eea;
  --muxima-secondary: #764ba2;
  --muxima-accent: #f093fb;
  --muxima-success: #10b981;
  --muxima-warning: #f59e0b;
  --muxima-error: #ef4444;
  --muxima-info: #3b82f6;
}

// Reset básico
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
               'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #1f2937;
  background: #f9fafb;
}
```

### 3️⃣ Execute sua Aplicação

```bash
npm start
# ou
ng serve

# 🎉 Acesse: http://localhost:4200
```

**Pronto!** Seu primeiro componente Muxima UI está funcionando! 🚀

---

---

## 🧩 Exemplos Práticos

### 🎨 Button com Variantes

```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from '@agt-ui/button';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="button-showcase">
      <h2>Botões Muxima UI</h2>
      
      <!-- Variantes -->
      <button muxima-button variant="primary">Primary</button>
      <button muxima-button variant="secondary">Secondary</button>
      <button muxima-button variant="success">Success</button>
      <button muxima-button variant="danger">Danger</button>
      
      <!-- Tamanhos -->
      <button muxima-button size="sm">Pequeno</button>
      <button muxima-button size="md">Médio</button>
      <button muxima-button size="lg">Grande</button>
      
      <!-- Estados -->
      <button muxima-button [loading]="true">Carregando...</button>
      <button muxima-button [disabled]="true">Desabilitado</button>
    </div>
  `,
  styles: [`
    .button-showcase {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      padding: 24px;
    }
  `]
})
export class ButtonDemoComponent {}
```

### 📝 Form com Input e Select

```typescript
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { InputComponent } from '@agt-ui/input';
import { SelectComponent } from '@agt-ui/select';
import { CheckboxComponent } from '@agt-ui/checkbox';

@Component({
  standalone: true,
  imports: [
    FormsModule, 
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    CheckboxComponent
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <h2>Cadastro - Muxima UI by JokerScript</h2>
      
      <muxima-input
        formControlName="name"
        label="Nome Completo"
        placeholder="Digite seu nome"
        [hasError]="form.get('name')?.invalid && form.get('name')?.touched"
        errorMessage="Nome é obrigatório"
        prefixIcon="👤">
      </muxima-input>

      <muxima-input
        formControlName="email"
        type="email"
        label="Email"
        placeholder="seu@email.com"
        [hasError]="form.get('email')?.invalid && form.get('email')?.touched"
        errorMessage="Email inválido"
        prefixIcon="📧">
      </muxima-input>

      <muxima-select
        formControlName="role"
        label="Cargo"
        placeholder="Selecione seu cargo"
        [options]="roles">
      </muxima-select>

      <muxima-checkbox
        formControlName="terms"
        label="Aceito os termos"
        description="Li e concordo com os termos de uso">
      </muxima-checkbox>

      <button type="submit" [disabled]="form.invalid">
        Enviar Cadastro
      </button>
    </form>
  `,
  styles: [`
    .form-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 32px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    form > * {
      margin-bottom: 24px;
    }
    
    button[type="submit"] {
      width: 100%;
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: transform 0.2s;
    }
    
    button:hover:not(:disabled) {
      transform: translateY(-2px);
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class FormDemoComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    terms: [false, Validators.requiredTrue]
  });

  roles = [
    { label: 'Frontend Developer', value: 'frontend' },
    { label: 'Backend Developer', value: 'backend' },
    { label: 'Full Stack Developer', value: 'fullstack' },
    { label: 'DevOps Engineer', value: 'devops' }
  ];

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulário submetido por Aldemiro Valentim:', this.form.value);
      alert('Cadastro realizado com sucesso!');
    }
  }
}
```

### 🎭 Modal e Dialog

```typescript
import { Component } from '@angular/core';
import { ConfirmationDialogComponent } from '@muxima-ui/confirmation-dialog';

@Component({
  standalone: true,
  imports: [ConfirmationDialogComponent],
  template: `
    <div class="demo-container">
      <button (click)="showDialog = true">
        Abrir Confirmação
      </button>

      <muxima-confirmation-dialog
        *ngIf="showDialog"
        title="Confirmar Ação"
        message="Tem certeza que deseja prosseguir com esta ação?"
        confirmText="Sim, confirmar"
        cancelText="Cancelar"
        type="warning"
        (confirm)="onConfirm()"
        (cancel)="onCancel()">
      </muxima-confirmation-dialog>
    </div>
  `
})
export class DialogDemoComponent {
  showDialog = false;

  onConfirm() {
    console.log('Confirmado por Aldemiro Valentim');
    this.showDialog = false;
  }

  onCancel() {
    console.log('Cancelado');
    this.showDialog = false;
  }
}
```

### 📊 Progress e Loading

```typescript
import { Component, OnInit } from '@angular/core';
import { ProgressProgressComponent } from '@muxima/progress';
import { LoadingComponent } from '@muxima-ui/loading';

@Component({
  standalone: true,
  imports: [ProgressProgressComponent, LoadingComponent],
  template: `
    <div class="progress-demo">
      <h3>Processando arquivo...</h3>
      
      <muxima-progress 
        [value]="progress" 
        [max]="100"
        type="linear"
        color="gradient"
        [showLabel]="true"
        [striped]="true"
        [animated]="true">
      </muxima-progress>

      <p>{{ progress }}% completado</p>

      <muxima-loading
        *ngIf="progress < 100"
        type="spinner"
        size="md"
        color="primary">
      </muxima-loading>

      <div *ngIf="progress === 100" class="success-message">
        ✅ Processo concluído com sucesso!
      </div>
    </div>
  `,
  styles: [`
    .progress-demo {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px;
      text-align: center;
    }
    
    .success-message {
      margin-top: 24px;
      padding: 16px;
      background: #d1fae5;
      color: #065f46;
      border-radius: 8px;
      font-weight: 600;
    }
  `]
})
export class ProgressDemoComponent implements OnInit {
  progress = 0;

  ngOnInit() {
    // Simula progresso
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  }
}
```

---
---

## 🎨 Personalização e Temas

### Variáveis CSS Customizáveis

```scss
// styles.scss
:root {
  // Cores Primárias
  --muxima-primary: #667eea;
  --muxima-primary-dark: #5568d3;
  --muxima-primary-light: #8b9cf5;
  
  --muxima-secondary: #764ba2;
  --muxima-secondary-dark: #633d88;
  --muxima-secondary-light: #9466bc;
  
  // Cores Semânticas
  --muxima-success: #10b981;
  --muxima-warning: #f59e0b;
  --muxima-error: #ef4444;
  --muxima-info: #3b82f6;
  
  // Cores Neutras
  --muxima-gray-50: #f9fafb;
  --muxima-gray-100: #f3f4f6;
  --muxima-gray-200: #e5e7eb;
  --muxima-gray-300: #d1d5db;
  --muxima-gray-400: #9ca3af;
  --muxima-gray-500: #6b7280;
  --muxima-gray-600: #4b5563;
  --muxima-gray-700: #374151;
  --muxima-gray-800: #1f2937;
  --muxima-gray-900: #111827;
  
  // Tipografia
  --muxima-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
  --muxima-font-size-xs: 12px;
  --muxima-font-size-sm: 14px;
  --muxima-font-size-md: 16px;
  --muxima-font-size-lg: 18px;
  --muxima-font-size-xl: 20px;
  
  // Espaçamentos
  --muxima-spacing-xs: 4px;
  --muxima-spacing-sm: 8px;
  --muxima-spacing-md: 16px;
  --muxima-spacing-lg: 24px;
  --muxima-spacing-xl: 32px;
  
  // Border Radius
  --muxima-radius-sm: 4px;
  --muxima-radius-md: 8px;
  --muxima-radius-lg: 12px;
  --muxima-radius-xl: 16px;
  --muxima-radius-full: 9999px;
  
  // Sombras
  --muxima-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --muxima-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --muxima-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --muxima-shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

### Tema Escuro (Dark Mode)

```scss
// styles.scss
[data-theme="dark"] {
  --muxima-primary: #8b9cf5;
  --muxima-secondary: #9466bc;
  
  --muxima-gray-50: #111827;
  --muxima-gray-100: #1f2937;
  --muxima-gray-200: #374151;
  --muxima-gray-800: #f3f4f6;
  --muxima-gray-900: #f9fafb;
  
  background: #111827;
  color: #f9fafb;
}
```

```typescript
// Implementação de toggle
export class AppComponent {
  isDarkMode = false;

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    document.documentElement.setAttribute(
      'data-theme', 
      this.isDarkMode ? 'dark' : 'light'
    );
  }
}
```

### Sobrescrevendo Estilos de Componentes

```scss
// Customização específica
.my-custom-alert {
  muxima-alert {
    border-radius: 20px;
    font-weight: 600;
    box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
    
    &.success {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }
  }
}
```

---

## 🔧 Configuração Avançada

### Usando com NgModule (Aplicações Legadas)

Se você ainda não usa standalone components:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importe os componentes necessários
import { MuximaAlertComponent } from '@muxima-ui/alert';
import { InputComponent } from '@agt-ui/input';
import { SelectComponent } from '@agt-ui/select';
import { ButtonComponent } from '@agt-ui/button';

@NgModule({
  declarations: [
    AppComponent,
    // Seus componentes
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    // Componentes Muxima UI
    MuximaAlertComponent,
    InputComponent,
    SelectComponent,
    ButtonComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Lazy Loading e Code Splitting

Otimize o bundle carregando componentes sob demanda:

```typescript
// dashboard.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => 
      import('./dashboard/dashboard.component')
        .then(m => m.DashboardComponent)
  },
  {
    path: 'charts',
    loadComponent: () => 
      import('./charts/charts.component')
        .then(m => m.ChartsComponent)
  }
];
```

### SSR (Server-Side Rendering) com Angular Universal

```typescript
// app.config.server.ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

### Otimização de Performance

```typescript
// Use OnPush para melhor performance
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // ⚡ Performance boost
  template: `...`
})
export class MyComponent {}
```

---

## 🐛 Troubleshooting

### ❌ Erro: "Cannot find module '@muxima-ui/alert'"

**Causa**: Path aliases não configurados no `tsconfig.json`

**Solução**:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@muxima-ui/*": ["libs/*/src/index.ts"],
      "@agt-ui/*": ["libs/*/src/index.ts"]
    }
  }
}
```

### ❌ Estilos não aparecem

**Causa**: Tema global não importado

**Solução**:
```scss
// src/styles.scss
@import '@muxima-ui/styles/theme';
```

### ❌ Componente não renderiza

**Checklist**:
- ✅ Componente importado no array `imports`?
- ✅ Seletor correto usado no template? (ex: `muxima-alert`)
- ✅ Sem erros no console do navegador?
- ✅ Angular CLI atualizado? (`ng update`)

### ❌ Erro de tipos TypeScript

**Solução**:
```bash
# Limpe o cache e recompile
rm -rf node_modules/.cache
ng serve --rebuild
```

### ❌ Performance lenta

**Otimizações**:
1. Use `ChangeDetectionStrategy.OnPush`
2. Implemente lazy loading para rotas
3. Use trackBy em `*ngFor`
4. Ative production mode: `ng build --prod`

---

## 📚 Próximos Passos

Agora que você configurou o Muxima UI by JokerScript, explore:

### 📖 Documentação
- [Componentes Básicos](./components/INDEX.md) - Alert, Button, Input, Select
- [Componentes Avançados](./components/INDEX.md) - DataTable, Chart, Kanban
- [Componentes Super Avançados](./components/INDEX.md) - Smart Form Builder, Voice Command, Gesture Controller

### 🎨 Design System
- [Guia de Temas](./THEMING.md) - Customização completa
- [Ícones e Assets](./ICONS.md) - Biblioteca de ícones
- [Animações](./ANIMATIONS.md) - Transições suaves

### ♿ Acessibilidade
- [WCAG Guidelines](./ACCESSIBILITY.md) - Boas práticas
- [Testes A11y](./TESTING.md) - Como testar acessibilidade

### 🚀 Avançado
- [Exemplos Completos](./ADVANCED_EXAMPLES.md) - Apps reais
- [API Reference](./API.md) - Documentação técnica
- [Migration Guide](./MIGRATION.md) - Atualizações de versão

---

## 💬 Suporte e Comunidade

### Precisa de ajuda?

- 📖 [Documentação Completa](https://github.com/Aldemiro20/muxima-ui)
- 🐛 [Reportar Bug](https://github.com/Aldemiro20/muxima-ui/issues)
- 💡 [Sugestões e Features](https://github.com/Aldemiro20/muxima-ui/discussions)
- 📧 [Email de Suporte](mailto:aldemiro.valentim@jokerscript.com)
- 💼 [LinkedIn - Aldemiro Valentim](https://www.linkedin.com/in/aldemiro-valentim)
- 📸 [Instagram - @jokerscript](https://www.instagram.com/jokerscript)

### Contribua com o projeto

```bash
# Fork o repositório
git clone https://github.com/seu-usuario/muxima-ui.git

# Crie uma branch
git checkout -b feature/minha-feature

# Faça suas alterações e commit
git commit -m "feat: adiciona nova feature"

# Push e abra um Pull Request
git push origin feature/minha-feature
```

### Licença

MIT License - © 2024-2026 **Aldemiro Valentim** (JokerScript)

---

## 🌟 Showcase

Empresas e projetos usando Muxima UI:

- 🏢 **JokerScript** - Sistema interno de gestão
- 📊 **Analytics Dashboard** - Visualização de dados em tempo real
- 🛒 **E-commerce Platform** - Loja online responsiva
- 📱 **Mobile App** - PWA com Angular

> Está usando Muxima UI? [Adicione seu projeto aqui!](https://github.com/Aldemiro20/muxima-ui/discussions)

---

**Desenvolvido com 💜 Muxima (coração) por [Aldemiro Valentim](https://github.com/Aldemiro20), mais conhecido por JokerScript**

*"Código limpo, componentes elegantes, experiências incríveis"* ✨
