import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent, LoadingVariant, LoadingSize } from '@muxima-ui/loading';

@Component({
  selector: 'app-loading-doc',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './loading-doc.component.html',
  styleUrls: ['./loading-doc.component.scss']
})
export class LoadingDocComponent {
  selectedVariant: LoadingVariant = 'spinner';
  selectedSize: LoadingSize = 'md';
  showOverlay = false;
  loadingText = 'Carregando...';

  variants: LoadingVariant[] = ['spinner', 'dots', 'bars', 'pulse', 'ring'];
  sizes: LoadingSize[] = ['sm', 'md', 'lg', 'xl'];

  showLoading(variant: LoadingVariant): void {
    this.selectedVariant = variant;
    this.showOverlay = true;
    setTimeout(() => {
      this.showOverlay = false;
    }, 3000);
  }

  getCodeExample(type: string): string {
    const examples: Record<string, string> = {
      import: `import { LoadingComponent } from '@muxima-ui/loading';

@Component({{ '{' }}
  standalone: true,
  imports: [LoadingComponent]
{{ '}' }})`,
      spinner: `<!-- Spinner Loading -->
<muxima-loading 
  variant="spinner" 
  size="md"
  text="Carregando...">
</muxima-loading>`,
      dots: `<!-- Dots Loading -->
<muxima-loading 
  variant="dots" 
  size="md"
  text="Processando...">
</muxima-loading>`,
      bars: `<!-- Bars Loading -->
<muxima-loading 
  variant="bars" 
  size="md"
  text="Aguarde...">
</muxima-loading>`,
      pulse: `<!-- Pulse Loading -->
<muxima-loading 
  variant="pulse" 
  size="lg"
  text="Sincronizando...">
</muxima-loading>`,
      ring: `<!-- Ring Loading -->
<muxima-loading 
  variant="ring" 
  size="md">
</muxima-loading>`,
      overlay: `<!-- Full Page Overlay -->
<muxima-loading 
  variant="spinner" 
  size="lg"
  text="Carregando dados..."
  [overlay]="true">
</muxima-loading>

<!-- Component Logic -->
export class MyComponent {{ '{' }}
  isLoading = false;

  loadData() {{ '{' }}
    this.isLoading = true;
    // Simulate API call
    setTimeout(() => this.isLoading = false, 2000);
  {{ '}' }}
{{ '}' }}`,
      sizes: `<!-- Small -->
<muxima-loading variant="spinner" size="sm"></muxima-loading>

<!-- Medium (default) -->
<muxima-loading variant="spinner" size="md"></muxima-loading>

<!-- Large -->
<muxima-loading variant="spinner" size="lg"></muxima-loading>

<!-- Extra Large -->
<muxima-loading variant="spinner" size="xl"></muxima-loading>`,
      button: `<button 
  [disabled]="isLoading"
  (click)="submit()">
  <muxima-loading 
    *ngIf="isLoading"
    variant="spinner" 
    size="sm">
  </muxima-loading>
  <span *ngIf="!isLoading">Enviar</span>
</button>`
    };
    return examples[type] || '';
  }
}
