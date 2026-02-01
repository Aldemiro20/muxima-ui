import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreditCardComponent, CreditCardData } from '@muxima-ui/credit-card';

@Component({
  selector: 'app-credit-card-doc',
  standalone: true,
  imports: [CommonModule, FormsModule, CreditCardComponent],
  templateUrl: './credit-card-doc.component.html',
  styleUrls: ['./credit-card-doc.component.scss']
})
export class CreditCardDocComponent {
  // Exemplo 1: Card básico
  basicCard: CreditCardData = {
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    type: 'unknown'
  };

  // Exemplo 2: Card sem visual
  formOnlyCard: CreditCardData = {
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  };

  // Exemplo 3: Card pré-preenchido
  filledCard: CreditCardData = {
    number: '4532015112830366',
    name: 'JOÃO SILVA',
    expiry: '12/28',
    cvv: '123',
    type: 'visa'
  };

  // Exemplo 4: Validação
  validationCard: CreditCardData = {
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  };

  validationStatus = {
    number: null as boolean | null,
    name: null as boolean | null,
    expiry: null as boolean | null,
    cvv: null as boolean | null
  };

  detectedCardType: string = 'unknown';

  onCardTypeChange(type: string): void {
    console.log('Tipo de cartão detectado:', type);
    this.detectedCardType = type;
  }

  onValidationChange(validation: { field: string; valid: boolean }): void {
    console.log('Validação:', validation);
    this.validationStatus[validation.field as keyof typeof this.validationStatus] = validation.valid;
  }

  submitPayment(cardData: CreditCardData): void {
    console.log('Processando pagamento:', cardData);
    alert(`💳 Processando pagamento com cartão ${cardData.type?.toUpperCase()}`);
  }

  typescriptCode = `import { CreditCardComponent, CreditCardData } from '@muxima-ui/credit-card';

export class CheckoutComponent {
  cardData: CreditCardData = {
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    type: 'unknown'
  };

  onCardTypeChange(type: string) {
    console.log('Tipo detectado:', type);
    // Visa, Mastercard, Amex, Discover
  }

  onValidationChange(validation: { field: string; valid: boolean }) {
    console.log('Campo validado:', validation);
  }

  async processPayment() {
    if (this.isCardValid()) {
      const response = await this.paymentService.charge({
        card: this.cardData,
        amount: this.total
      });
      
      if (response.success) {
        this.router.navigate(['/success']);
      }
    }
  }

  isCardValid(): boolean {
    return this.cardData.number.length === 16 &&
           this.cardData.name.length >= 3 &&
           this.cardData.expiry.length === 5 &&
           this.cardData.cvv.length >= 3;
  }
}`;

  htmlCode = `<!-- Card completo com visual -->
<muxima-credit-card
  [(ngModel)]="cardData"
  [showCard]="true"
  (cardTypeChange)="onCardTypeChange($event)"
  (validationChange)="onValidationChange($event)">
</muxima-credit-card>

<!-- Apenas formulário -->
<muxima-credit-card
  [(ngModel)]="cardData"
  [showCard]="false">
</muxima-credit-card>

<!-- Desabilitado -->
<muxima-credit-card
  [cardData]="savedCard"
  [disabled]="true"
  [showCard]="true">
</muxima-credit-card>`;

  securityCode = `// Boas práticas de segurança

// 1. NUNCA salve CVV
const cardToSave = {
  number: cardData.number,
  name: cardData.name,
  expiry: cardData.expiry,
  // CVV NÃO deve ser salvo!
};

// 2. Use tokenização
const token = await this.paymentService.tokenize(cardData);
await this.api.processPayment({ token, amount });

// 3. Validação no backend
// Sempre valide no servidor, não confie apenas no frontend

// 4. Use HTTPS
// Obrigatório para dados de cartão

// 5. PCI DSS Compliance
// Siga as normas PCI se processar pagamentos`;

  customLabelsCode = `// Labels personalizados
<muxima-credit-card
  [labels]="{
    number: 'Card Number',
    name: 'Cardholder Name',
    expiry: 'MM/YY',
    cvv: 'Security Code'
  }">
</muxima-credit-card>`;
}
