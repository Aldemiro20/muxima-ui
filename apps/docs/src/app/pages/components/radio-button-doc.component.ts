import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from '@muxima-ui/radio-button';

@Component({
  selector: 'app-radio-button-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, RadioButtonComponent],
  templateUrl: './radio-button-doc.component.html',
  styleUrls: ['./radio-button-doc.component.scss']
})
export class RadioButtonDocComponent {
  // Basic
  selectedBasic = 'option2';
  
  // Sizes
  selectedSize = 'md';
  
  // Colors
  selectedColor = 'success';
  
  // Variants
  selectedCard = 'pro';
  selectedButton = 'monthly';
  selectedTile = 'laptop';
  
  // With Icons
  selectedPayment = 'card';
  selectedShipping = 'express';
  
  // Advanced
  selectedPlan = 'enterprise';
  selectedNotification = 'email';
  
  // Disabled
  selectedDisabled = 'option2';

  getCodeExample(type: string): string {
    const examples: { [key: string]: string } = {
      install: `npm install @muxima-ui/radio-button`,
      
      import: `// Importe o componente e FormsModule
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from '@muxima-ui/radio-button';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [FormsModule, RadioButtonComponent],
  template: \\\`
    <muxima-radio-button
      [(ngModel)]="selectedValue"
      value="option1"
      name="my-group"
      label="Minha Opção">
    </muxima-radio-button>
  \\\`
})
export class MyComponent {
  selectedValue = 'option1';
}`,
      
      basic: `<!-- Uso Básico com ngModel -->
<div class="radio-group">
  <muxima-radio-button 
    [(ngModel)]="selected" 
    [value]="'option1'"
    name="basic-group"
    label="Opção 1">
  </muxima-radio-button>
  
  <muxima-radio-button 
    [(ngModel)]="selected" 
    [value]="'option2'"
    name="basic-group"
    label="Opção 2">
  </muxima-radio-button>
  
  <muxima-radio-button 
    [(ngModel)]="selected" 
    [value]="'option3'"
    name="basic-group"
    label="Opção 3">
  </muxima-radio-button>
</div>

<!-- Valor selecionado: {{ selected }} -->`,

      basicTs: `export class MyComponent {
  selected = 'option1'; // Valor inicial
  
  // Reagir a mudanças
  onRadioChange(value: any) {
    console.log('Selecionado:', value);
  }
}`,

      sizes: `<!-- Tamanhos: xs, sm, md (padrão), lg, xl -->
<muxima-radio-button 
  [(ngModel)]="size" 
  [value]="'xs'"
  size="xs" 
  label="Extra Small">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="size" 
  [value]="'sm'"
  size="sm" 
  label="Small">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="size" 
  [value]="'md'"
  size="md" 
  label="Medium (padrão)">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="size" 
  [value]="'lg'"
  size="lg" 
  label="Large">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="size" 
  [value]="'xl'"
  size="xl" 
  label="Extra Large">
</muxima-radio-button>`,

      colors: `<!-- 7 Cores Disponíveis -->
<muxima-radio-button 
  [(ngModel)]="color" 
  [value]="'primary'"
  color="primary" 
  label="Primary">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="color" 
  [value]="'success'"
  color="success" 
  label="Success">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="color" 
  [value]="'warning'"
  color="warning" 
  label="Warning">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="color" 
  [value]="'danger'"
  color="danger" 
  label="Danger">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="color" 
  [value]="'info'"
  color="info" 
  label="Info">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="color" 
  [value]="'purple'"
  color="purple" 
  label="Purple">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="color" 
  [value]="'pink'"
  color="pink" 
  label="Pink">
</muxima-radio-button>`,

      description: `<!-- Radio Button com Descrição -->
<muxima-radio-button 
  [(ngModel)]="plan" 
  [value]="'basic'"
  name="plan-group"
  label="Plano Básico"
  description="Ideal para usuários individuais e pequenos projetos">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="plan" 
  [value]="'pro'"
  name="plan-group"
  label="Plano Pro"
  description="Para profissionais e pequenas equipes">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="plan" 
  [value]="'enterprise'"
  name="plan-group"
  label="Plano Enterprise"
  description="Soluções completas para grandes empresas">
</muxima-radio-button>`,

      card: `<!-- Variant Card: Ideal para Pricing -->
<muxima-radio-button 
  [(ngModel)]="selectedPlan" 
  [value]="'free'"
  name="pricing-group"
  variant="card"
  label="Free"
  price="$0/mês"
  description="Perfeito para começar"
  icon="📦"
  color="info">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="selectedPlan" 
  [value]="'pro'"
  name="pricing-group"
  variant="card"
  label="Pro"
  price="$29/mês"
  description="Para profissionais"
  icon="⭐"
  badge="Popular"
  color="primary"
  [glow]="true">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="selectedPlan" 
  [value]="'enterprise'"
  name="pricing-group"
  variant="card"
  label="Enterprise"
  price="$99/mês"
  description="Para grandes equipes"
  icon="👑"
  badge="Novo"
  color="purple"
  [showCheckIcon]="true">
</muxima-radio-button>`,

      button: `<!-- Variant Button: Segmented Control -->
<muxima-radio-button 
  [(ngModel)]="billing" 
  [value]="'monthly'"
  name="billing-group"
  variant="button"
  label="Mensal"
  color="primary">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="billing" 
  [value]="'yearly'"
  name="billing-group"
  variant="button"
  label="Anual"
  badge="20% OFF"
  color="success">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="billing" 
  [value]="'lifetime'"
  name="billing-group"
  variant="button"
  label="Vitalício"
  color="purple">
</muxima-radio-button>`,

      tile: `<!-- Variant Tile: Icon Grid -->
<muxima-radio-button 
  [(ngModel)]="device" 
  [value]="'laptop'"
  name="device-group"
  variant="tile"
  icon="💻"
  label="Laptop"
  color="primary">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="device" 
  [value]="'desktop'"
  name="device-group"
  variant="tile"
  icon="🖥️"
  label="Desktop"
  color="info">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="device" 
  [value]="'tablet'"
  name="device-group"
  variant="tile"
  icon="📱"
  label="Tablet"
  color="success">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="device" 
  [value]="'phone'"
  name="device-group"
  variant="tile"
  icon="📞"
  label="Phone"
  color="warning">
</muxima-radio-button>`,

      advanced: `<!-- Recursos Avançados: Badge + Icon + Price + Glow -->
<muxima-radio-button 
  [(ngModel)]="premiumPlan" 
  [value]="'premium'"
  name="premium-group"
  label="Premium Plan"
  subtitle="$99/mês"
  description="Todos os recursos incluídos"
  icon="👑"
  badge="Novo"
  color="purple"
  [glow]="true"
  [showCheckIcon]="true">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="premiumPlan" 
  [value]="'ultimate'"
  name="premium-group"
  label="Ultimate Plan"
  subtitle="$199/mês"
  description="Suporte prioritário 24/7"
  icon="💎"
  badge="Top"
  color="pink"
  [glow]="true"
  [showCheckIcon]="true">
</muxima-radio-button>`,

      disabled: `<!-- Estado Desabilitado -->
<muxima-radio-button 
  [(ngModel)]="status" 
  [value]="'active'"
  name="status-group"
  label="Opção Ativa"
  description="Esta opção está disponível">
</muxima-radio-button>

<muxima-radio-button 
  [(ngModel)]="status" 
  [value]="'disabled'"
  name="status-group"
  label="Opção Desabilitada"
  description="Esta opção não está disponível"
  [disabled]="true">
</muxima-radio-button>`,

      error: `<!-- Estado de Erro com Helper Text -->
<muxima-radio-button 
  [value]="'option1'"
  name="error-group"
  label="Selecione uma opção"
  description="Campo obrigatório"
  [error]="true"
  helperText="Por favor, selecione uma das opções disponíveis">
</muxima-radio-button>`,

      states: `<!-- Estados: Desabilitado e Erro -->

<!-- Estado Desabilitado -->
<div class="radio-group">
  <muxima-radio-button 
    [(ngModel)]="selectedStatus"
    value="active"
    name="status-group"
    label="Opção Ativa"
    description="Esta opção pode ser selecionada">
  </muxima-radio-button>
  
  <muxima-radio-button 
    [(ngModel)]="selectedStatus"
    value="disabled"
    name="status-group"
    label="Opção Desabilitada"
    description="Esta opção não pode ser selecionada"
    [disabled]="true">
  </muxima-radio-button>
</div>

<!-- Estado de Erro -->
<muxima-radio-button 
  value="required"
  name="error-group"
  label="Selecione uma opção"
  description="Este campo é obrigatório"
  [error]="true"
  helperText="Por favor, selecione uma opção para continuar">
</muxima-radio-button>`,

      scss: `/* ===================================
   Custom Radio Button Styles
   =================================== */

/* Grid layout para cards de pricing */
.custom-radio-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

/* Hover effects com ::ng-deep */
.custom-radio-group ::ng-deep muxima-radio-button label {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-radio-group ::ng-deep muxima-radio-button label:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* Responsive: mobile */
@media (max-width: 768px) {
  .custom-radio-group {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

/* ===================================
   Custom Theme Colors
   =================================== */
.custom-theme {
  /* Cor primária customizada */
  --muxima-primary: #FF6B6B;
  --muxima-primary-dark: #EE5A52;
  --muxima-primary-light: #FFE5E5;
  
  /* Cor de sucesso customizada */
  --muxima-success: #51CF66;
  --muxima-success-dark: #40C057;
  --muxima-success-light: #D3F9D8;
}

/* Aplicar tema customizado */
.custom-theme ::ng-deep muxima-radio-button {
  /* Seus estilos personalizados aqui */
}`
    };

    return examples[type] || '';
  }
}
