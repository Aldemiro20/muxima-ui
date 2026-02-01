import { Component, OnInit } from '@angular/core';
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
export class RadioButtonDocComponent implements OnInit {
  copiedStates: { [key: string]: boolean } = {};

  // CÃ³digos de exemplo
  importCode = `npm install @muxima-ui/radio-button`;
  basicCode = `<muxima-radio-button 
  [value]="'option1'" 
  [(ngModel)]="selectedOption"
  label="OpÃ§Ã£o 1">
</muxima-radio-button>`;

  // Estados dos exemplos
  selectedBasic = 'option1';
  selectedSize = 'medium';
  selectedColor = 'primary';
  selectedPayment = 'credit';
  selectedPlan = 'pro';
  selectedNotification = 'email';
  selectedDisabled = 'disabled2';

  ngOnInit() {}

  copyCode(code: string) {
    navigator.clipboard.writeText(code);
    this.copiedStates[code] = true;
    setTimeout(() => {
      this.copiedStates[code] = false;
    }, 2000);
  }

  getCodeExample(type: string): string {
    const examples: { [key: string]: string } = {
      basic: `<!-- Uso bÃ¡sico -->
<muxima-radio-button 
  [value]="'option1'" 
  [(ngModel)]="selectedOption"
  label="OpÃ§Ã£o 1">
</muxima-radio-button>

<muxima-radio-button 
  [value]="'option2'" 
  [(ngModel)]="selectedOption"
  label="OpÃ§Ã£o 2">
</muxima-radio-button>`,

      withDescription: `<!-- Com descriÃ§Ã£o -->
<muxima-radio-button 
  [value]="'basic'" 
  [(ngModel)]="selectedPlan"
  label="Plano BÃ¡sico"
  description="Ideal para iniciantes">
</muxima-radio-button>`,

      sizes: `<!-- Tamanhos -->
<muxima-radio-button size="sm" label="Pequeno"></muxima-radio-button>
<muxima-radio-button size="md" label="MÃ©dio"></muxima-radio-button>
<muxima-radio-button size="lg" label="Grande"></muxima-radio-button>`,

      colors: `<!-- Cores -->
<muxima-radio-button color="primary" label="Primary"></muxima-radio-button>
<muxima-radio-button color="success" label="Success"></muxima-radio-button>
<muxima-radio-button color="warning" label="Warning"></muxima-radio-button>
<muxima-radio-button color="danger" label="Danger"></muxima-radio-button>
<muxima-radio-button color="info" label="Info"></muxima-radio-button>`,

      disabled: `<!-- Desabilitado -->
<muxima-radio-button 
  [disabled]="true" 
  label="OpÃ§Ã£o Desabilitada">
</muxima-radio-button>`,

      required: `<!-- Campo obrigatÃ³rio -->
<muxima-radio-button 
  [required]="true" 
  label="OpÃ§Ã£o ObrigatÃ³ria">
</muxima-radio-button>`,

      forms: `<!-- Com Reactive Forms -->
import { FormControl } from '@angular/forms';

export class MyComponent {
  paymentMethod = new FormControl('credit');
}

<muxima-radio-button 
  [value]="'credit'" 
  [formControl]="paymentMethod"
  label="CartÃ£o de CrÃ©dito">
</muxima-radio-button>`
    };

    return examples[type] || '';
  }
}

