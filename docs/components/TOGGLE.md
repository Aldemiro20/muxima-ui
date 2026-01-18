# 🎯 Toggle Component

Interruptor (switch) elegante com gradientes vibrantes, animações suaves e múltiplas variantes de cores e tamanhos.

---

## 📦 Importação

```typescript
import { ToggleToggleComponent } from '@muxima/toggle';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)]

@Component({
  standalone: true,
  imports: [ToggleToggleComponent, FormsModule],
  // ...
})
```

---

## 🎯 Uso Básico

```typescript
@Component({
  template: `
    <muxima-toggle
      [(checked)]="isEnabled"
      label="Habilitar notificações">
    </muxima-toggle>
  `
})
export class MyComponent {
  isEnabled = false;
}
```

---

## 📋 API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `checked` | `boolean` | `false` | Estado do toggle (on/off) |
| `disabled` | `boolean` | `false` | Se o toggle está desabilitado |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho do componente |
| `color` | `'primary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Cor quando ativo |
| `label` | `string` | - | Texto do label (opcional) |

### Outputs

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `checkedChange` | `EventEmitter<boolean>` | Emitido quando o estado muda |

### ControlValueAccessor

O componente implementa `ControlValueAccessor`, permitindo uso com:
- `[(ngModel)]` - Two-way binding
- `formControl` - Reactive Forms
- `formControlName` - Formulários template-driven

---

## 🎨 Variantes

### Cores

```html
<!-- Primary (Azul → Índigo → Roxo) -->
<muxima-toggle [(checked)]="value" color="primary" label="Primary"></muxima-toggle>

<!-- Success (Verde) -->
<muxima-toggle [(checked)]="value" color="success" label="Success"></muxima-toggle>

<!-- Warning (Amarelo) -->
<muxima-toggle [(checked)]="value" color="warning" label="Warning"></muxima-toggle>

<!-- Error (Vermelho) -->
<muxima-toggle [(checked)]="value" color="error" label="Error"></muxima-toggle>
```

### Tamanhos

```html
<!-- Pequeno -->
<muxima-toggle [(checked)]="value" size="sm" label="Pequeno"></muxima-toggle>

<!-- Médio (padrão) -->
<muxima-toggle [(checked)]="value" size="md" label="Médio"></muxima-toggle>

<!-- Grande -->
<muxima-toggle [(checked)]="value" size="lg" label="Grande"></muxima-toggle>
```

---

## 💡 Exemplos

### Two-Way Binding

```typescript
@Component({
  template: `
    <muxima-toggle
      [(checked)]="notifications"
      label="Receber notificações"
      color="primary">
    </muxima-toggle>

    <p *ngIf="notifications">Notificações habilitadas ✓</p>
  `
})
export class SettingsComponent {
  notifications = true;
}
```

### Com Evento Custom

```typescript
@Component({
  template: `
    <muxima-toggle
      [checked]="darkMode"
      (checkedChange)="onThemeChange($event)"
      label="Modo Escuro"
      color="primary">
    </muxima-toggle>
  `
})
export class ThemeComponent {
  darkMode = false;

  onThemeChange(enabled: boolean) {
    this.darkMode = enabled;
    document.body.classList.toggle('dark-mode', enabled);
    localStorage.setItem('theme', enabled ? 'dark' : 'light');
  }
}
```

### Formulários Reativos

```typescript
@Component({
  template: `
    <form [formGroup]="settingsForm">
      <muxima-toggle
        formControlName="emailNotifications"
        label="Notificações por email"
        color="primary">
      </muxima-toggle>

      <muxima-toggle
        formControlName="smsNotifications"
        label="Notificações por SMS"
        color="success">
      </muxima-toggle>

      <button (click)="saveSettings()">Salvar</button>
    </form>
  `
})
export class UserSettingsComponent implements OnInit {
  settingsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.settingsForm = this.fb.group({
      emailNotifications: [true],
      smsNotifications: [false]
    });
  }

  saveSettings() {
    console.log('Settings:', this.settingsForm.value);
    // API call para salvar
  }
}
```

### Toggle Desabilitado

```typescript
@Component({
  template: `
    <muxima-toggle
      [checked]="isPremium"
      [disabled]="!hasPermission"
      label="Recurso Premium"
      color="primary">
    </muxima-toggle>

    <p *ngIf="!hasPermission">
      Você precisa de permissão de administrador
    </p>
  `
})
export class FeatureComponent {
  isPremium = false;
  hasPermission = false;
}
```

### Múltiplos Toggles

```typescript
@Component({
  template: `
    <div class="settings-group">
      <h3>Preferências de Notificação</h3>

      <div class="toggle-item">
        <muxima-toggle
          [(checked)]="settings.push"
          label="Notificações Push"
          color="primary">
        </muxima-toggle>
      </div>

      <div class="toggle-item">
        <muxima-toggle
          [(checked)]="settings.email"
          label="Email diário"
          color="success">
        </muxima-toggle>
      </div>

      <div class="toggle-item">
        <muxima-toggle
          [(checked)]="settings.sms"
          label="SMS urgentes"
          color="warning">
        </muxima-toggle>
      </div>

      <div class="toggle-item">
        <muxima-toggle
          [(checked)]="settings.marketing"
          label="Marketing"
          color="error">
        </muxima-toggle>
      </div>
    </div>
  `,
  styles: [`
    .settings-group {
      padding: 1.5rem;
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    h3 {
      margin-bottom: 1rem;
      color: #1f2937;
    }

    .toggle-item {
      padding: 0.75rem 0;
      border-bottom: 1px solid #e5e7eb;

      &:last-child {
        border-bottom: none;
      }
    }
  `]
})
export class NotificationSettingsComponent {
  settings = {
    push: true,
    email: true,
    sms: false,
    marketing: false
  };
}
```

### Toggle com Confirmação

```typescript
@Component({
  template: `
    <muxima-toggle
      [checked]="isDangerousAction"
      (checkedChange)="confirmToggle($event)"
      label="Modo de desenvolvimento (perigoso)"
      color="error">
    </muxima-toggle>
  `
})
export class DangerousSettingComponent {
  isDangerousAction = false;

  confirmToggle(newValue: boolean) {
    if (newValue) {
      const confirmed = confirm(
        'Tem certeza? Esta ação pode causar problemas.'
      );
      
      if (confirmed) {
        this.isDangerousAction = true;
      } else {
        // Reverte o toggle
        this.isDangerousAction = false;
      }
    } else {
      this.isDangerousAction = false;
    }
  }
}
```

---

## 🎨 Personalização

### CSS Classes

```scss
.muxima-toggle-container {
  // Container principal
}

.muxima-toggle-switch {
  // Track do toggle
}

.muxima-toggle-thumb {
  // Botão deslizante (bolinha)
}

.muxima-toggle-label {
  // Texto do label
}

.muxima-toggle-checked {
  // Estado ativo
}

.muxima-toggle-disabled {
  // Estado desabilitado
}
```

### Exemplo de Customização

```scss
// custom-toggle.scss
muxima-toggle {
  .muxima-toggle-switch {
    // Track customizado
    border: 2px solid currentColor;
  }

  .muxima-toggle-thumb {
    // Thumb com ícone
    &::after {
      content: '✓';
      display: flex;
      align-items: center;
      justify-content: center;
      color: #10b981;
      font-weight: bold;
    }
  }

  .muxima-toggle-label {
    font-family: 'Poppins', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}
```

---

## ✨ Recursos Visuais

### Gradientes

- **Primary**: Azul → Índigo → Roxo
- **Success**: Verde claro → Verde médio → Verde escuro
- **Warning**: Amarelo → Amarelo claro → Amarelo médio
- **Error**: Vermelho → Rosa claro → Rosa médio

### Animações

- **Slide**: Thumb desliza suavemente com `cubic-bezier(0.4, 0, 0.2, 1)`
- **Hover**: Ring de foco colorido ao passar o mouse
- **Active**: Escala reduzida ao clicar (0.95x)
- **Lift**: Elevação sutil ao hover (translateY(-1px))

### Sombras

- **Track**: Sombra interna para profundidade
- **Thumb**: Múltiplas camadas de sombra para efeito 3D
- **Checked**: Sombra colorida correspondente ao estado

---

## ♿ Acessibilidade

- **Role**: `switch`
- **ARIA**: `aria-checked`, `aria-label`, `aria-disabled`
- **Teclado**: 
  - `Tab` para focar
  - `Space` ou `Enter` para alternar
  - `Esc` para cancelar (em confirmações)
- **Contraste**: Todos os estados atendem WCAG 2.1 AA
- **Screen Reader**: Estado anunciado claramente

---

## 🎭 Boas Práticas

### ✅ Faça

- Use labels descritivos e claros
- Cores apropriadas para o contexto (success para ações positivas)
- Disable quando ação não estiver disponível
- Forneça feedback visual ao interagir
- Agrupe toggles relacionados

### ❌ Evite

- Muitos toggles em sequência (considere checkbox)
- Ações destrutivas sem confirmação
- Labels ambíguos ("Sim/Não", use "Habilitar X")
- Toggle sem label (use sempre)

---

## 🔗 Componentes Relacionados

- [Checkbox](./CHECKBOX.md) - Para seleções múltiplas
- [Radio Button](./RADIO_BUTTON.md) - Para opções exclusivas
- [Switch (alias)](./TOGGLE.md) - Mesmo componente

---

## 📝 Changelog

### v1.0.0
- ✨ Implementação inicial
- 🎨 4 cores com gradientes
- 📏 3 tamanhos (sm, md, lg)
- ✨ ControlValueAccessor
- ♿ Totalmente acessível
- ✨ Animações suaves e sombras 3D
- 🎨 Hover states elaborados
