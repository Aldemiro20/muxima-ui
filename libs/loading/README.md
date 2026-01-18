# 🧭 Muxima Loading Component

Componente de carregamento elegante e profissional com múltiplas variantes e tamanhos.

## ✨ Características

- 🎨 **5 Variantes**: spinner, dots, bars, pulse, ring
- 📏 **4 Tamanhos**: sm, md, lg, xl
- 🌐 **Modo Overlay**: Full-page loading com backdrop
- 💬 **Texto Customizável**: Mensagens de loading
- 🎭 **Animações Suaves**: CSS animations otimizadas
- 🎨 **Gradiente Roxo**: #667eea → #764ba2
- 📱 **Responsivo**: Adapta-se a diferentes telas
- ⚡ **Performance**: Leve e otimizado

## 📦 Instalação

```typescript
import { LoadingComponent } from '@muxima-ui/loading';

@Component({
  standalone: true,
  imports: [LoadingComponent]
})
```

## 🚀 Uso Básico

```html
<!-- Spinner Loading -->
<muxima-loading 
  variant="spinner" 
  size="md"
  text="Carregando...">
</muxima-loading>
```

## 🎨 Variantes

### Spinner
Rotação contínua clássica, ideal para carregamentos gerais.

```html
<muxima-loading variant="spinner" text="Carregando..."></muxima-loading>
```

### Dots
Três pontos animados, perfeito para indicadores discretos.

```html
<muxima-loading variant="dots" text="Processando..."></muxima-loading>
```

### Bars
Barras animadas, ótimo para visualizações de áudio.

```html
<muxima-loading variant="bars" text="Aguarde..."></muxima-loading>
```

### Pulse
Pulsos concêntricos, ideal para sincronização.

```html
<muxima-loading variant="pulse" size="lg"></muxima-loading>
```

### Ring
Anel com gradiente rotativo, moderno e elegante.

```html
<muxima-loading variant="ring"></muxima-loading>
```

## 📏 Tamanhos

```html
<!-- Small -->
<muxima-loading variant="spinner" size="sm"></muxima-loading>

<!-- Medium (padrão) -->
<muxima-loading variant="spinner" size="md"></muxima-loading>

<!-- Large -->
<muxima-loading variant="spinner" size="lg"></muxima-loading>

<!-- Extra Large -->
<muxima-loading variant="spinner" size="xl"></muxima-loading>
```

## 🌐 Overlay Mode

Loading de tela cheia para operações importantes:

```html
<muxima-loading 
  variant="spinner" 
  size="lg"
  text="Carregando dados..."
  [overlay]="true">
</muxima-loading>
```

Com lógica:

```typescript
export class MyComponent {
  isLoading = false;

  loadData() {
    this.isLoading = true;
    // Simulate API call
    setTimeout(() => this.isLoading = false, 2000);
  }
}
```

## 🔘 Loading em Botões

```html
<button [disabled]="isLoading" (click)="submit()">
  <muxima-loading 
    *ngIf="isLoading"
    variant="spinner" 
    size="sm">
  </muxima-loading>
  <span *ngIf="!isLoading">Enviar</span>
</button>
```

## ⚙️ API

### Inputs

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `variant` | `'spinner' \| 'dots' \| 'bars' \| 'pulse' \| 'ring'` | `'spinner'` | Estilo visual do loading |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Tamanho do loading |
| `text` | `string` | `''` | Texto exibido abaixo |
| `overlay` | `boolean` | `false` | Ativa modo overlay |
| `color` | `string` | `''` | Cor customizada |

### Tipos

```typescript
export type LoadingVariant = 'spinner' | 'dots' | 'bars' | 'pulse' | 'ring';
export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';
```

## 💡 Casos de Uso

- **Spinner**: Carregamento de páginas, requisições API
- **Dots**: Indicadores discretos, chat, digitação
- **Bars**: Processamento de áudio, análise
- **Pulse**: Sincronização, tempo real
- **Ring**: Progresso circular, downloads
- **Overlay**: Operações críticas, login
- **Button**: Feedback de ações, submits

## 🎨 Cores

O componente usa o gradiente roxo padrão do Muxima:
- Primário: `#667eea` → `#764ba2`
- Texto: Com gradient clip para efeito elegante

## 📱 Responsividade

O componente se adapta automaticamente a diferentes tamanhos de tela, mantendo proporções adequadas.

## ⚡ Performance

- Animações com CSS puro (sem JavaScript)
- Otimizado para 60fps
- Sem dependências externas
- Bundle size mínimo
