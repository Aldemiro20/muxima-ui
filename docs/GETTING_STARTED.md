# 🚀 Guia de Início Rápido - Muxima UI

Bem-vindo ao **Muxima UI**! Este guia vai te ajudar a configurar e usar os componentes da biblioteca em poucos minutos.

---

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter:

- **Node.js** 18.x ou superior
- **Angular** 15.x ou superior
- **npm** ou **yarn**

Verifique suas versões:

```bash
node --version  # Deve ser >= 18.0.0
ng version      # Deve ser >= 15.0.0
```

---

## 📦 Instalação

### Opção 1: Via NPM (Em breve)

```bash
npm install @muxima-ui/core
```

### Opção 2: Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/muxima-ui.git
cd muxima-ui

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start

# Acesse http://localhost:4200
```

---

## 🎯 Primeiro Componente

### 1. Importe o componente

Os componentes Muxima UI são **standalone**, então você pode importá-los diretamente:

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { MuximaAlertComponent } from '@muxima-ui/alert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MuximaAlertComponent],
  template: `
    <muxima-alert type="success" appearance="fill">
      🎉 Bem-vindo ao Muxima UI!
    </muxima-alert>
  `
})
export class AppComponent {}
```

### 2. Configure o tema (Opcional)

Importe o arquivo de estilos globais no seu `styles.scss`:

```scss
// styles.scss
@use '@muxima-ui/styles/theme' as muxima;

// Ou importe variáveis específicas
@import '@muxima-ui/styles/_theme.scss';
```

### 3. Execute sua aplicação

```bash
npm start
```

Pronto! Seu primeiro componente Muxima UI está funcionando! 🎉

---

## 🧩 Exemplos Básicos

### Alert com Ícone

```typescript
import { MuximaAlertComponent } from '@muxima-ui/alert';

@Component({
  template: `
    <muxima-alert 
      type="warning" 
      appearance="border"
      [closable]="true"
      (close)="handleClose()">
      ⚠️ Atenção: Esta ação não pode ser desfeita!
    </muxima-alert>
  `
})
export class MyComponent {
  handleClose() {
    console.log('Alert fechado');
  }
}
```

### Avatar com Status

```typescript
import { AvatarAvatarComponent } from '@muxima/avatar';

@Component({
  template: `
    <muxima-avatar
      [src]="user.avatar"
      [name]="user.name"
      size="lg"
      status="online"
      [showBadge]="true"
      [badgeCount]="5">
    </muxima-avatar>
  `
})
export class MyComponent {
  user = {
    name: 'João Silva',
    avatar: 'path/to/avatar.jpg'
  };
}
```

### Progress Bar Animado

```typescript
import { ProgressProgressComponent } from '@muxima/progress';

@Component({
  template: `
    <muxima-progress 
      [value]="progress" 
      [max]="100" 
      type="linear"
      color="primary"
      [showLabel]="true"
      [striped]="true"
      [animated]="true">
    </muxima-progress>

    <button (click)="incrementProgress()">Aumentar Progresso</button>
  `
})
export class MyComponent {
  progress = 0;

  incrementProgress() {
    this.progress = Math.min(this.progress + 10, 100);
  }
}
```

### Toggle com Two-Way Binding

```typescript
import { ToggleToggleComponent } from '@muxima/toggle';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [ToggleToggleComponent, FormsModule],
  template: `
    <muxima-toggle
      [(checked)]="isDarkMode"
      label="Modo Escuro"
      color="primary"
      (checkedChange)="onThemeChange($event)">
    </muxima-toggle>

    <p>Modo atual: {{ isDarkMode ? 'Escuro' : 'Claro' }}</p>
  `
})
export class MyComponent {
  isDarkMode = false;

  onThemeChange(enabled: boolean) {
    console.log('Tema alterado:', enabled ? 'Escuro' : 'Claro');
  }
}
```

---

## 🎨 Personalização Básica

### Sobrescrevendo Variáveis do Tema

```scss
// styles.scss
@use '@muxima-ui/styles/theme' with (
  $primary: #1e40af,
  $accent: #ec4899,
  $border-radius-md: 12px
);
```

### Customizando um Componente Específico

```scss
// my-component.scss
muxima-alert {
  // Sobrescreve estilos específicos
  .muxima-alert-content {
    font-weight: 600;
    letter-spacing: 0.025em;
  }
}
```

---

## 🔧 Configuração Avançada

### Usando em NgModule (Tradicional)

Se você ainda não usa standalone components:

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MuximaAlertComponent } from '@muxima-ui/alert';
import { AvatarAvatarComponent } from '@muxima/avatar';

@NgModule({
  imports: [
    BrowserModule,
    MuximaAlertComponent,
    AvatarAvatarComponent
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

### Lazy Loading de Componentes

```typescript
// feature.routes.ts
export const routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard.component').then(m => m.DashboardComponent)
  }
];

// dashboard.component.ts
import { ProgressProgressComponent } from '@muxima/progress';

@Component({
  standalone: true,
  imports: [ProgressProgressComponent],
  template: `<muxima-progress [value]="75"></muxima-progress>`
})
export class DashboardComponent {}
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module '@muxima-ui/alert'"

**Solução**: Verifique se o path alias está configurado no `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@muxima-ui/alert": ["libs/alert/src/index.ts"],
      "@muxima/*": ["libs/*/src/index.ts"]
    }
  }
}
```

### Estilos não aplicados

**Solução**: Importe o arquivo de tema no `styles.scss` principal:

```scss
@import '@muxima-ui/styles/_theme.scss';
```

### Componentes não aparecem

**Solução**: Certifique-se de:
1. Importar o componente no array `imports`
2. Usar o seletor correto (ex: `muxima-alert`, não `alert`)
3. Verificar se há erros no console do navegador

---

## 📚 Próximos Passos

Agora que você já configurou o Muxima UI, explore:

- 📖 [Documentação de Componentes](./components/)
- 🎨 [Guia de Temas](./THEMING.md)
- ♿ [Acessibilidade](./ACCESSIBILITY.md)
- 🚀 [Exemplos Avançados](./ADVANCED_EXAMPLES.md)

---

## 💬 Suporte

Precisa de ajuda? 

- 📖 [Documentação Completa](./README.md)
- 🐛 [Reportar Bug](https://github.com/seu-usuario/muxima-ui/issues)
- 💡 [Sugestões](https://github.com/seu-usuario/muxima-ui/discussions)

---

**Feito com 🫶 Muxima (coração)**
