# 📊 Progress Component

Componente de progresso com suporte a barras lineares e circulares, com gradientes elegantes e animações suaves.

---

## 📦 Importação

```typescript
import { ProgressProgressComponent } from '@muxima/progress';

@Component({
  standalone: true,
  imports: [ProgressProgressComponent],
  // ...
})
```

---

## 🎯 Uso Básico

### Linear

```typescript
@Component({
  template: `
    <muxima-progress 
      [value]="75" 
      [max]="100" 
      type="linear"
      color="primary"
      [showLabel]="true">
    </muxima-progress>
  `
})
```

### Circular

```typescript
@Component({
  template: `
    <muxima-progress 
      [value]="60" 
      [max]="100"
      type="circular"
      color="success"
      size="md"
      [showLabel]="true">
    </muxima-progress>
  `
})
```

---

## 📋 API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
|-------------|------|--------|-----------|
| `value` | `number` | `0` | Valor atual do progresso |
| `max` | `number` | `100` | Valor máximo |
| `type` | `'linear' \| 'circular'` | `'linear'` | Tipo de visualização |
| `color` | `'primary' \| 'success' \| 'warning' \| 'error'` | `'primary'` | Cor do indicador |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho do componente |
| `showLabel` | `boolean` | `false` | Exibe porcentagem |
| `striped` | `boolean` | `false` | Adiciona listras (apenas linear) |
| `animated` | `boolean` | `false` | Anima as listras (apenas linear) |

### Outputs

Nenhum output disponível.

### Propriedades Computadas

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `percentage` | `number` | Porcentagem calculada (0-100) |
| `strokeDashoffset` | `number` | Offset do stroke SVG (circular) |

---

## 🎨 Variantes

### Cores

```html
<!-- Primary (Azul → Índigo → Roxo) -->
<muxima-progress [value]="75" color="primary"></muxima-progress>

<!-- Success (Verde) -->
<muxima-progress [value]="100" color="success"></muxima-progress>

<!-- Warning (Amarelo) -->
<muxima-progress [value]="50" color="warning"></muxima-progress>

<!-- Error (Vermelho) -->
<muxima-progress [value]="30" color="error"></muxima-progress>
```

### Tamanhos (Linear)

```html
<!-- Pequeno -->
<muxima-progress [value]="75" size="sm"></muxima-progress>

<!-- Médio (padrão) -->
<muxima-progress [value]="75" size="md"></muxima-progress>

<!-- Grande -->
<muxima-progress [value]="75" size="lg"></muxima-progress>
```

### Tamanhos (Circular)

```html
<!-- Pequeno (4rem) -->
<muxima-progress [value]="75" type="circular" size="sm"></muxima-progress>

<!-- Médio (6rem) -->
<muxima-progress [value]="75" type="circular" size="md"></muxima-progress>

<!-- Grande (8rem) -->
<muxima-progress [value]="75" type="circular" size="lg"></muxima-progress>
```

---

## 💡 Exemplos

### Progress com Label

```typescript
@Component({
  template: `
    <muxima-progress 
      [value]="progress" 
      [showLabel]="true"
      color="primary">
    </muxima-progress>
  `
})
export class MyComponent {
  progress = 65;
}
```

### Progress Animado com Listras

```typescript
@Component({
  template: `
    <muxima-progress 
      [value]="progress" 
      [striped]="true"
      [animated]="true"
      color="success"
      [showLabel]="true">
    </muxima-progress>
  `
})
export class MyComponent {
  progress = 45;
}
```

### Upload de Arquivo

```typescript
@Component({
  template: `
    <div class="upload-container">
      <h3>Upload em progresso...</h3>
      <muxima-progress 
        [value]="uploadProgress" 
        [max]="100"
        color="primary"
        [showLabel]="true"
        [striped]="true"
        [animated]="true">
      </muxima-progress>
      <p>{{ uploadProgress }}% concluído</p>
    </div>
  `
})
export class UploadComponent implements OnInit {
  uploadProgress = 0;

  ngOnInit() {
    // Simula upload
    const interval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        clearInterval(interval);
      }
    }, 500);
  }
}
```

### Múltiplas Barras de Progresso

```typescript
@Component({
  template: `
    <div class="progress-group">
      <div class="progress-item">
        <label>CPU</label>
        <muxima-progress 
          [value]="cpuUsage" 
          [color]="getCpuColor()"
          [showLabel]="true">
        </muxima-progress>
      </div>

      <div class="progress-item">
        <label>RAM</label>
        <muxima-progress 
          [value]="ramUsage" 
          [color]="getRamColor()"
          [showLabel]="true">
        </muxima-progress>
      </div>

      <div class="progress-item">
        <label>Disco</label>
        <muxima-progress 
          [value]="diskUsage" 
          [color]="getDiskColor()"
          [showLabel]="true">
        </muxima-progress>
      </div>
    </div>
  `,
  styles: [`
    .progress-group {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .progress-item {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    label {
      font-weight: 600;
      color: #374151;
    }
  `]
})
export class SystemMonitorComponent {
  cpuUsage = 45;
  ramUsage = 78;
  diskUsage = 92;

  getCpuColor() {
    return this.cpuUsage > 80 ? 'error' : 
           this.cpuUsage > 60 ? 'warning' : 'success';
  }

  getRamColor() {
    return this.ramUsage > 80 ? 'error' : 
           this.ramUsage > 60 ? 'warning' : 'success';
  }

  getDiskColor() {
    return this.diskUsage > 80 ? 'error' : 
           this.diskUsage > 60 ? 'warning' : 'success';
  }
}
```

### Progress Circular com Status

```typescript
@Component({
  template: `
    <div class="circular-progress-card">
      <muxima-progress 
        [value]="completionRate" 
        type="circular"
        size="lg"
        [color]="getStatusColor()"
        [showLabel]="true">
      </muxima-progress>
      <h3>{{ statusMessage }}</h3>
      <p>{{ completionRate }}% das tarefas concluídas</p>
    </div>
  `,
  styles: [`
    .circular-progress-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding: 2rem;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class TaskProgressComponent {
  completionRate = 75;

  get statusMessage(): string {
    if (this.completionRate === 100) return 'Completo!';
    if (this.completionRate >= 75) return 'Quase lá...';
    if (this.completionRate >= 50) return 'Meio caminho';
    return 'Iniciando...';
  }

  getStatusColor() {
    if (this.completionRate === 100) return 'success';
    if (this.completionRate >= 50) return 'primary';
    return 'warning';
  }
}
```

### Progress Indeterminado (Loading)

```typescript
@Component({
  template: `
    <muxima-progress 
      [value]="100" 
      [striped]="true"
      [animated]="true"
      color="primary">
    </muxima-progress>
  `
})
export class LoadingComponent {}
```

---

## 🎨 Personalização

### CSS Classes

```scss
// Linear
.muxima-progress-linear {
  // Container da barra linear
}

.muxima-progress-bar {
  // Barra de progresso
}

.muxima-progress-label {
  // Label de porcentagem
}

// Circular
.muxima-progress-circular {
  // Container do progresso circular
}

.muxima-progress-circle-bg {
  // Círculo de fundo
}

.muxima-progress-circle-bar {
  // Círculo de progresso
}

.muxima-progress-circular-label {
  // Label central
}
```

### Exemplo de Customização

```scss
// custom-progress.scss
muxima-progress {
  // Customizar barra linear
  .muxima-progress-linear {
    border-radius: 16px;
    height: 1.5rem;
  }

  .muxima-progress-bar {
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  }

  // Customizar circular
  .muxima-progress-circular-label {
    font-size: 1.5rem;
    font-weight: 800;
  }
}
```

---

## ✨ Recursos Visuais

### Gradientes

- **Primary**: Azul → Índigo → Roxo (#3B82F6 → #6366F1 → #8B5CF6)
- **Success**: Verde claro → Verde médio → Verde escuro
- **Warning**: Amarelo → Amarelo claro → Amarelo médio
- **Error**: Vermelho → Rosa claro → Rosa médio

### Animações

- **Shimmer**: Efeito de brilho que percorre a barra
- **Listras**: Animação contínua das listras diagonais
- **Transições**: Suaves com `cubic-bezier(0.4, 0, 0.2, 1)`

### Sombras

- **Linear**: Sombra interna no track + sombra colorida na barra
- **Circular**: Drop-shadow no SVG para efeito 3D

---

## ♿ Acessibilidade

- **Role**: `progressbar`
- **ARIA**: `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Label**: `aria-label` descritivo
- **Screen Reader**: Porcentagem anunciada

---

## 🎭 Boas Práticas

### ✅ Faça

- Use cores apropriadas para o contexto (success para completo, error para falha)
- Mostre label para progresso determinado
- Use `striped` e `animated` para processos indeterminados
- Combine com texto descritivo

### ❌ Evite

- Progress sem contexto (adicione label ou descrição)
- Múltiplos progress circular na mesma tela (use linear)
- Animações em excess (pode causar distração)

---

## 🔗 Componentes Relacionados

- [Loading](./LOADING.md) - Para indicadores de carregamento
- [Stepper](./STEPPER.md) - Para progresso em etapas
- [Badge](./BADGE.md) - Para indicadores de status

---

## 📝 Changelog

### v1.0.0
- ✨ Linear e circular progress
- 🎨 4 cores com gradientes vibrantes
- ✨ Animação shimmer
- ✨ Listras animadas
- 📏 3 tamanhos configuráveis
- 🏷️ Labels opcionais
