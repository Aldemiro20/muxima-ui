import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CopyToClipboardComponent } from '@muxima-ui/copy-to-clipboard';

@Component({
  selector: 'app-copy-to-clipboard-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyToClipboardComponent],
  templateUrl: './copy-to-clipboard-doc.component.html',
  styleUrls: ['./copy-to-clipboard-doc.component.scss']
})
export class CopyToClipboardDocComponent {
  // Example contents
  simpleText = 'Texto simples para copiar';
  codeSnippet = `import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  template: '<h1>Hello World</h1>'
})
export class ExampleComponent {}`;

  longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
nisi ut aliquip ex ea commodo consequat.`;

  url = 'https://github.com/Aldemiro20/muxima-ui';
  email = 'contato@muxima-ui.com.br';
  apiKey = 'mux_live_abc123def456ghi789jkl012mno345';

  // Interactive controls
  selectedSize: 'small' | 'medium' | 'large' = 'medium';
  selectedVariant: 'button' | 'icon' | 'inline' = 'button';
  showFeedback = true;
  showTooltip = true;
  customLabel = 'Copiar Código';
  customContent = 'Conteúdo personalizado';

  // Copy handlers
  onCopied(text: string) {
    console.log('✓ Copiado com sucesso:', text.substring(0, 50) + '...');
  }

  onError(error: Error) {
    console.error('✗ Erro ao copiar:', error);
  }

  // Code examples
  codeExamples = {
    basic: `<muxima-copy-to-clipboard
  content="Texto para copiar">
</muxima-copy-to-clipboard>`,

    withEvents: `<muxima-copy-to-clipboard
  content="Meu texto"
  (copied)="onCopied($event)"
  (error)="onError($event)">
</muxima-copy-to-clipboard>`,

    icon: `<muxima-copy-to-clipboard
  content="Texto"
  variant="icon"
  size="small">
</muxima-copy-to-clipboard>`,

    inline: `<p>
  Email: {{ email }}
  <muxima-copy-to-clipboard
    [content]="email"
    variant="inline"
    label="copiar">
  </muxima-copy-to-clipboard>
</p>`,

    custom: `<muxima-copy-to-clipboard
  [content]="codeSnippet"
  label="Copiar Código"
  successMessage="Código copiado!"
  [showTooltip]="true"
  [feedbackDuration]="3000">
</muxima-copy-to-clipboard>`,

    typescript: `import { CopyToClipboardComponent } from '@muxima-ui/copy-to-clipboard';

@Component({
  standalone: true,
  imports: [CopyToClipboardComponent],
  template: \`
    <muxima-copy-to-clipboard
      [content]="myContent"
      (copied)="handleCopy($event)">
    </muxima-copy-to-clipboard>
  \`
})
export class MyComponent {
  myContent = 'Texto para copiar';

  handleCopy(text: string) {
    console.log('Copiado:', text);
  }
}`
  };
}
