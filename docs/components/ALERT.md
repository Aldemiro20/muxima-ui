# 🚨 Alert Component

Componente para exibir mensagens de notificação, alertas e feedback ao usuário com múltiplos estilos e tipos.

---

## 📦 Importação

```typescript
import { MuximaAlertComponent } from '@muxima-ui/alert';

@Component({
  standalone: true,
  imports: [MuximaAlertComponent],
  // ...
})
```

---

## 🎯 Uso Básico

```typescript
@Component({
  template: `
    <muxima-alert type="info" appearance="fill">
      Esta é uma mensagem informativa
    </muxima-alert>
  `
})
export class MyComponent {}
```

---

## 📋 API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `type` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Tipo semântico do alerta |
| `appearance` | `'border' \| 'fill' \| 'outline' \| 'soft'` | `'fill'` | Estilo visual do alerta |
| `closable` | `boolean` | `false` | Se o alerta pode ser fechado |
| `icon` | `string` | - | Ícone customizado (FontAwesome, Material, etc.) |
| `title` | `string` | - | Título do alerta (opcional) |

### Outputs

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `close` | `EventEmitter<void>` | Emitido quando o alerta é fechado |

---

## 🎨 Variantes

### Tipos

```html
<!-- Info (Azul) -->
<muxima-alert type="info">Informação importante</muxima-alert>

<!-- Success (Verde) -->
<muxima-alert type="success">Operação realizada com sucesso!</muxima-alert>

<!-- Warning (Amarelo) -->
<muxima-alert type="warning">Atenção: revise os dados</muxima-alert>

<!-- Error (Vermelho) -->
<muxima-alert type="error">Erro ao processar requisição</muxima-alert>
```

### Aparências

```html
<!-- Fill: Fundo sólido -->
<muxima-alert type="success" appearance="fill">
  Salvo com sucesso
</muxima-alert>

<!-- Border: Apenas borda colorida -->
<muxima-alert type="info" appearance="border">
  Novidade disponível
</muxima-alert>

<!-- Outline: Borda grossa com fundo transparente -->
<muxima-alert type="warning" appearance="outline">
  Cuidado com esta ação
</muxima-alert>

<!-- Soft: Fundo suave com texto colorido -->
<muxima-alert type="error" appearance="soft">
  Falha na validação
</muxima-alert>
```

---

## 💡 Exemplos

### Alert com Título

```typescript
@Component({
  template: `
    <muxima-alert 
      type="warning" 
      appearance="fill"
      title="Atenção">
      Por favor, revise os campos obrigatórios antes de continuar.
    </muxima-alert>
  `
})
```

### Alert Fechável

```typescript
@Component({
  template: `
    <muxima-alert 
      type="success" 
      [closable]="true"
      (close)="onAlertClose()">
      Perfil atualizado com sucesso!
    </muxima-alert>
  `
})
export class MyComponent {
  onAlertClose() {
    console.log('Alert fechado pelo usuário');
  }
}
```

### Alert com Ícone Customizado

```typescript
@Component({
  template: `
    <muxima-alert 
      type="info" 
      appearance="soft"
      icon="🔔">
      Você tem 3 novas notificações
    </muxima-alert>
  `
})
```

### Alert Dinâmico

```typescript
@Component({
  template: `
    <muxima-alert 
      *ngIf="showAlert"
      [type]="alertType" 
      [appearance]="alertAppearance"
      [closable]="true"
      (close)="showAlert = false">
      {{ alertMessage }}
    </muxima-alert>

    <button (click)="triggerAlert('success')">Sucesso</button>
    <button (click)="triggerAlert('error')">Erro</button>
  `
})
export class MyComponent {
  showAlert = false;
  alertType: 'info' | 'success' | 'warning' | 'error' = 'info';
  alertAppearance: 'border' | 'fill' | 'outline' | 'soft' = 'fill';
  alertMessage = '';

  triggerAlert(type: typeof this.alertType) {
    this.alertType = type;
    this.alertMessage = type === 'success' 
      ? 'Operação realizada!' 
      : 'Algo deu errado!';
    this.showAlert = true;

    // Auto-fechar após 5 segundos
    setTimeout(() => this.showAlert = false, 5000);
  }
}
```

### Lista de Alertas

```typescript
@Component({
  template: `
    <div class="alerts-container">
      <muxima-alert 
        *ngFor="let alert of alerts; trackBy: trackByFn"
        [type]="alert.type"
        [closable]="true"
        (close)="removeAlert(alert.id)">
        {{ alert.message }}
      </muxima-alert>
    </div>
  `
})
export class MyComponent {
  alerts = [
    { id: 1, type: 'info', message: 'Nova versão disponível' },
    { id: 2, type: 'warning', message: 'Sessão expira em 5 minutos' },
    { id: 3, type: 'success', message: 'Backup concluído' }
  ];

  trackByFn(index: number, alert: any) {
    return alert.id;
  }

  removeAlert(id: number) {
    this.alerts = this.alerts.filter(a => a.id !== id);
  }
}
```

---

## 🎨 Personalização

### CSS Classes

O componente expõe as seguintes classes para customização:

```scss
.muxima-alert {
  // Container principal
}

.muxima-alert-icon {
  // Ícone do alerta
}

.muxima-alert-content {
  // Área de conteúdo
}

.muxima-alert-title {
  // Título (se presente)
}

.muxima-alert-close {
  // Botão de fechar
}
```

### Exemplo de Customização

```scss
// custom-alert.scss
muxima-alert {
  &.custom-style {
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .muxima-alert-content {
      font-weight: 600;
      letter-spacing: 0.025em;
    }

    .muxima-alert-close {
      &:hover {
        transform: rotate(90deg);
        transition: transform 0.3s ease;
      }
    }
  }
}
```

---

## ♿ Acessibilidade

- **Role**: `alert` para notificações importantes
- **ARIA**: `aria-live="polite"` para leitores de tela
- **Teclado**: Botão de fechar acessível via `Tab` e `Enter`/`Space`
- **Contraste**: Todos os tipos atendem WCAG 2.1 AA

---

## 🎭 Boas Práticas

### ✅ Faça

- Use `type` apropriado para o contexto (`success` para confirmação, `error` para falhas)
- Mantenha mensagens concisas e acionáveis
- Use `closable` para alertas não críticos
- Considere auto-fechar alertas informativos após alguns segundos

### ❌ Evite

- Múltiplos alertas simultâneos (pilhe ou agrupe)
- Mensagens muito longas (use modal se necessário)
- Alertas para informações triviais
- Usar `error` para mensagens não críticas

---

## 🔗 Componentes Relacionados

- [Toast](./TOAST.md) - Para notificações temporárias
- [Modal](./MODAL.md) - Para feedback que requer ação
- [Badge](./BADGE.md) - Para indicadores de status

---

## 📝 Changelog

### v1.0.0
- ✨ Implementação inicial
- 🎨 4 tipos semânticos (info, success, warning, error)
- 🎨 4 aparências (border, fill, outline, soft)
- ✅ Suporte a título e ícone customizado
- 🔒 Opção de fechamento manual
