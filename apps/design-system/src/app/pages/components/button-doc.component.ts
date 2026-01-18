import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../../../libs/button/src/lib/button/button.component';

@Component({
  selector: 'muxima-button-doc',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './button-doc.component.html',
  styleUrls: ['./button-doc.component.scss']
})
export class ButtonDocComponent implements OnInit {
  copied: { [key: string]: boolean } = {};
  loading = false;
  codeExamples: any = {};

  ngOnInit() {
    this.initializeCodeExamples();
  }

  initializeCodeExamples() {
    this.codeExamples = {
      basic: `<muxima-button 
  text="Clique aqui"
  variant="primary">
</muxima-button>`,
      
      variants: `<!-- Primary - Ação principal -->
<muxima-button text="Primary" variant="primary"></muxima-button>

<!-- Secondary - Ação secundária -->
<muxima-button text="Secondary" variant="secondary"></muxima-button>

<!-- Danger - Ação destrutiva -->
<muxima-button text="Danger" variant="danger"></muxima-button>

<!-- Success - Ação de sucesso -->
<muxima-button text="Success" variant="success"></muxima-button>

<!-- Warning - Aviso -->
<muxima-button text="Warning" variant="warning"></muxima-button>

<!-- Info - Informação -->
<muxima-button text="Info" variant="info"></muxima-button>`,

      modernVariants: `<!-- Gradient - Gradiente rainbow animado -->
<muxima-button text="Gradient Magic" variant="gradient"></muxima-button>

<!-- Glass - Efeito glassmorphism -->
<muxima-button text="Glass Effect" variant="glass"></muxima-button>

<!-- Outline - Moderno com borda -->
<muxima-button text="Outline Style" variant="outline"></muxima-button>

<!-- Ghost - Minimalista transparente -->
<muxima-button text="Ghost Button" variant="ghost"></muxima-button>

<!-- Neon - Cyberpunk com brilho neon -->
<muxima-button text="Neon Glow" variant="neon"></muxima-button>`,

      sizes: `<!-- Pequeno -->
<muxima-button text="Small" size="sm" variant="primary"></muxima-button>

<!-- Médio -->
<muxima-button text="Medium" size="md" variant="primary"></muxima-button>

<!-- Grande (padrão) -->
<muxima-button text="Large" size="lg" variant="primary"></muxima-button>

<!-- Extra Grande -->
<muxima-button text="XL" size="xl" variant="primary"></muxima-button>

<!-- 2X Extra Grande -->
<muxima-button text="2XL" size="2xl" variant="primary"></muxima-button>`,

      withIcons: `<!-- Ícone à esquerda -->
<muxima-button 
  text="Download" 
  icon="⬇️" 
  iconPosition="left"
  variant="primary">
</muxima-button>

<!-- Ícone à direita -->
<muxima-button 
  text="Próximo" 
  icon="→" 
  iconPosition="right"
  variant="primary">
</muxima-button>

<!-- Apenas ícone -->
<muxima-button 
  icon="🔍" 
  variant="primary">
</muxima-button>`,

      states: `<!-- Botão normal -->
<muxima-button text="Normal" variant="primary"></muxima-button>

<!-- Botão desabilitado -->
<muxima-button 
  text="Desabilitado" 
  variant="primary" 
  [disabled]="true">
</muxima-button>

<!-- Botão largura total -->
<muxima-button 
  text="Full Width" 
  variant="primary" 
  [wFull]="true">
</muxima-button>`,

      types: `<!-- Submit (padrão) -->
<muxima-button 
  text="Enviar Formulário" 
  type="submit"
  variant="primary">
</muxima-button>

<!-- Button -->
<muxima-button 
  text="Botão Simples" 
  type="button"
  variant="secondary">
</muxima-button>

<!-- Reset -->
<muxima-button 
  text="Limpar" 
  type="reset"
  variant="danger">
</muxima-button>`,

      groups: `<div style="display: flex; gap: 0.5rem;">
  <muxima-button text="Salvar" variant="primary"></muxima-button>
  <muxima-button text="Cancelar" variant="secondary"></muxima-button>
</div>

<!-- Grupo vertical -->
<div style="display: flex; flex-direction: column; gap: 0.5rem;">
  <muxima-button text="Editar" variant="primary" [wFull]="true"></muxima-button>
  <muxima-button text="Excluir" variant="danger" [wFull]="true"></muxima-button>
</div>`,

      loading: `<!-- Com estado de loading (implementar no seu componente) -->
<muxima-button 
  [text]="loading ? 'Carregando...' : 'Enviar'"
  [disabled]="loading"
  variant="primary">
</muxima-button>`,

      combinations: `<!-- Primary + Ícone + XL -->
<muxima-button 
  text="Criar Novo" 
  icon="➕" 
  size="xl" 
  variant="primary">
</muxima-button>

<!-- Secondary + Ícone Right + MD -->
<muxima-button 
  text="Ver Mais" 
  icon="→" 
  iconPosition="right"
  size="md" 
  variant="secondary">
</muxima-button>

<!-- Danger + SM + Full Width -->
<muxima-button 
  text="Deletar Tudo" 
  icon="🗑️" 
  size="sm" 
  variant="danger"
  [wFull]="true">
</muxima-button>`
    };
  }

  copyCode(example: string) {
    const exampleKey = example as keyof typeof this.codeExamples;
    navigator.clipboard.writeText(this.codeExamples[exampleKey]);
    this.copied[example] = true;
    setTimeout(() => this.copied[example] = false, 2000);
  }

  handleClick() {
    alert('Botão clicado! 🎉');
  }

  simulateLoading() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }

  get importCode() {
    return `import { ButtonComponent } from '@muxima/button';

@Component({
  standalone: true,
  imports: [ButtonComponent]
})
export class MyComponent {}`;
  }
}
