# Copy to Clipboard

Componente de cópia para clipboard com feedback visual e suporte a diferentes navegadores.

## Instalação

```bash
npm install @muxima-ui/copy-to-clipboard
```

## Uso Básico

```typescript
import { CopyToClipboardComponent } from '@muxima-ui/copy-to-clipboard';

@Component({
  standalone: true,
  imports: [CopyToClipboardComponent],
  template: `
    <muxima-copy-to-clipboard
      content="Texto para copiar"
      (copied)="onCopied($event)">
    </muxima-copy-to-clipboard>
  `
})
export class MyComponent {
  onCopied(text: string) {
    console.log('Copiado:', text);
  }
}
```

## API

### Inputs
- `content`: string - Conteúdo a ser copiado
- `label`: string - Label do botão
- `variant`: 'button' | 'icon' | 'inline' - Estilo do botão
- `size`: 'small' | 'medium' | 'large' - Tamanho
- `showFeedback`: boolean - Mostra feedback visual
- `showTooltip`: boolean - Mostra tooltip ao hover

### Outputs
- `copied`: EventEmitter<string> - Emitido quando copiado
- `error`: EventEmitter<Error> - Emitido em caso de erro

## Licença

MIT
