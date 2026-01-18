import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from '@muxima-ui/tooltip';

@Component({
  selector: 'app-tooltip-doc',
  standalone: true,
  imports: [CommonModule, TooltipComponent],
  templateUrl: './tooltip-doc.component.html',
  styleUrls: ['./tooltip-doc.component.scss']
})
export class TooltipDocComponent {
  copiedStates: { [key: string]: boolean } = {};
  
  copyCode(code: string) {
    navigator.clipboard.writeText(code);
    this.copiedStates[code] = true;
    setTimeout(() => {
      this.copiedStates[code] = false;
    }, 2000);
  }

  get importCode(): string {
    return `import { TooltipComponent } from '@muxima-ui/tooltip';`;
  }

  getCodeExample(type: string): string {
    const examples: { [key: string]: string } = {
      basic: `<muxima-tooltip text="Este é um tooltip simples">
  <button>Passe o mouse aqui</button>
</muxima-tooltip>`,
      
      positions: `<!-- Top (padrão) -->
<muxima-tooltip text="Tooltip no topo" position="top">
  <button>Top</button>
</muxima-tooltip>

<!-- Bottom -->
<muxima-tooltip text="Tooltip embaixo" position="bottom">
  <button>Bottom</button>
</muxima-tooltip>

<!-- Left -->
<muxima-tooltip text="Tooltip à esquerda" position="left">
  <button>Left</button>
</muxima-tooltip>

<!-- Right -->
<muxima-tooltip text="Tooltip à direita" position="right">
  <button>Right</button>
</muxima-tooltip>`,
      
      variants: `<!-- Dark (padrão) -->
<muxima-tooltip text="Dark tooltip" variant="dark">
  <button>Dark</button>
</muxima-tooltip>

<!-- Light -->
<muxima-tooltip text="Light tooltip" variant="light">
  <button>Light</button>
</muxima-tooltip>

<!-- Primary -->
<muxima-tooltip text="Primary tooltip" variant="primary">
  <button>Primary</button>
</muxima-tooltip>

<!-- Success -->
<muxima-tooltip text="Success tooltip" variant="success">
  <button>Success</button>
</muxima-tooltip>

<!-- Warning -->
<muxima-tooltip text="Warning tooltip" variant="warning">
  <button>Warning</button>
</muxima-tooltip>

<!-- Error -->
<muxima-tooltip text="Error tooltip" variant="error">
  <button>Error</button>
</muxima-tooltip>`,
      
      sizes: `<!-- Small -->
<muxima-tooltip text="Small tooltip" size="sm">
  <button>Small</button>
</muxima-tooltip>

<!-- Medium (padrão) -->
<muxima-tooltip text="Medium tooltip" size="md">
  <button>Medium</button>
</muxima-tooltip>

<!-- Large -->
<muxima-tooltip text="Large tooltip" size="lg">
  <button>Large</button>
</muxima-tooltip>`,
      
      advanced: `<!-- Sem seta -->
<muxima-tooltip 
  text="Tooltip sem seta" 
  [showArrow]="false">
  <button>Sem Seta</button>
</muxima-tooltip>

<!-- Delay customizado -->
<muxima-tooltip 
  text="Tooltip com delay" 
  [delay]="1000">
  <button>Delay 1s</button>
</muxima-tooltip>

<!-- Largura máxima -->
<muxima-tooltip 
  text="Este é um tooltip com texto longo que será quebrado em múltiplas linhas" 
  maxWidth="200px">
  <button>Texto Longo</button>
</muxima-tooltip>

<!-- Desabilitado -->
<muxima-tooltip 
  text="Não vai aparecer" 
  [disabled]="true">
  <button disabled>Desabilitado</button>
</muxima-tooltip>`
    };
    return examples[type] || '';
  }
}

