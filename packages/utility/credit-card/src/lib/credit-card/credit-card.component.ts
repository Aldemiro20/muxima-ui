import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface CreditCardData {
  number: string;
  name: string;
  expiry: string;
  cvv: string;
  type?: 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown';
}

@Component({
  selector: 'muxima-credit-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreditCardComponent),
      multi: true
    }
  ]
})
export class CreditCardComponent implements ControlValueAccessor {
  @Input() showCard: boolean = true;
  @Input() disabled: boolean = false;
  @Input() labels = {
    number: 'Número do Cartão',
    name: 'Nome no Cartão',
    expiry: 'Validade',
    cvv: 'CVV'
  };
  
  @Output() cardTypeChange = new EventEmitter<string>();
  @Output() validationChange = new EventEmitter<{ field: string; valid: boolean }>();
  
  cardData: CreditCardData = {
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    type: 'unknown'
  };

  isFlipped = false;
  focusedField: string = '';
  
  private onChange: (value: CreditCardData) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: CreditCardData): void {
    if (value) {
      this.cardData = { ...value };
      this.detectCardType(this.cardData.number);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\s/g, '').replace(/\D/g, '');
    
    // Limit to 16 digits (19 for Amex)
    const maxLength = this.cardData.type === 'amex' ? 15 : 16;
    value = value.substring(0, maxLength);
    
    // Format with spaces
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formatted;
    
    this.cardData.number = value;
    this.detectCardType(value);
    this.emitValue();
    this.validateField('number');
  }

  onNameInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Allow only letters and spaces
    const value = input.value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
    input.value = value;
    
    this.cardData.name = value;
    this.emitValue();
    this.validateField('name');
  }

  onExpiryInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    input.value = value;
    this.cardData.expiry = value;
    this.emitValue();
    this.validateField('expiry');
  }

  onCvvInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const maxLength = this.cardData.type === 'amex' ? 4 : 3;
    let value = input.value.replace(/\D/g, '').substring(0, maxLength);
    
    input.value = value;
    this.cardData.cvv = value;
    this.emitValue();
    this.validateField('cvv');
  }

  onFieldFocus(field: string): void {
    this.focusedField = field;
    if (field === 'cvv') {
      this.isFlipped = true;
    } else {
      this.isFlipped = false;
    }
    this.onTouched();
  }

  onFieldBlur(): void {
    this.focusedField = '';
  }

  private detectCardType(number: string): void {
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]|^2[2-7]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/
    };

    let type: CreditCardData['type'] = 'unknown';
    
    for (const [cardType, pattern] of Object.entries(patterns)) {
      if (pattern.test(number)) {
        type = cardType as CreditCardData['type'];
        break;
      }
    }

    if (this.cardData.type !== type) {
      this.cardData.type = type;
      this.cardTypeChange.emit(type);
    }
  }

  private validateField(field: string): void {
    let valid = false;

    switch (field) {
      case 'number':
        valid = this.luhnCheck(this.cardData.number);
        break;
      case 'name':
        valid = this.cardData.name.length >= 3;
        break;
      case 'expiry':
        valid = this.validateExpiry(this.cardData.expiry);
        break;
      case 'cvv':
        const expectedLength = this.cardData.type === 'amex' ? 4 : 3;
        valid = this.cardData.cvv.length === expectedLength;
        break;
    }

    this.validationChange.emit({ field, valid });
  }

  private luhnCheck(number: string): boolean {
    if (!number || number.length < 13) return false;

    let sum = 0;
    let isEven = false;

    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  }

  private validateExpiry(expiry: string): boolean {
    if (!expiry || expiry.length !== 5) return false;

    const [month, year] = expiry.split('/').map(v => parseInt(v));
    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear() % 100;
    const currentMonth = now.getMonth() + 1;

    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;

    return true;
  }

  private emitValue(): void {
    this.onChange(this.cardData);
  }

  getCardLogo(): string {
    const logos: Record<string, string> = {
      visa: '💳',
      mastercard: '💳',
      amex: '💳',
      discover: '💳',
      unknown: '💳'
    };
    return logos[this.cardData.type || 'unknown'];
  }

  getMaskedNumber(): string {
    if (!this.cardData.number) return '•••• •••• •••• ••••';
    
    const number = this.cardData.number;
    if (number.length <= 4) {
      return number.padEnd(19, '•').match(/.{1,4}/g)?.join(' ') || '';
    }
    
    const last4 = number.slice(-4);
    const masked = '•'.repeat(Math.max(0, number.length - 4));
    return (masked + last4).match(/.{1,4}/g)?.join(' ') || '';
  }
}
