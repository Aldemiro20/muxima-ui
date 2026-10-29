import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxChoice, MxChoiceDescription, MxFieldset, MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { MxRadio } from '@muxima-ui/core/radio';

interface Delivery {
  id: string;
  name: string;
  descricao: string;
  price: number;
}

/** Sample discount codes: in your project, validate them on the server. */
const CODIGOS: Record<string, number> = { KIANDA10: 0.1 };

/** Order summary with delivery, discount code and total to pay. */
@Component({
  selector: 'app-cart-summary',
  imports: [MxButton, MxFormField, MxLabel, MxInput, MxFieldset, MxChoice, MxChoiceDescription, MxRadio],
  templateUrl: './cart-summary.html',
  styleUrl: './cart-summary.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSummary {
  protected readonly items = [
    { name: 'Cotton shirt', quantity: 1, price: 18500 },
    { name: 'Uíge coffee, 500 g', quantity: 2, price: 4500 },
  ];
  protected readonly deliveries: Delivery[] = [
    { id: 'shop', name: 'Pick up in store', descricao: 'Talatona, from tomorrow', price: 0 },
    { id: 'home', name: 'Home delivery', descricao: 'Luanda, within 24 hours', price: 2500 },
  ];
  protected readonly delivery = signal('home');

  protected readonly code = signal('');
  protected readonly discount = signal(0);
  protected readonly codeError = signal('');
  protected readonly appliedCode = signal('');

  protected readonly subtotal = this.items.reduce((a, i) => a + i.price * i.quantity, 0);
  protected readonly deliveryAmount = computed(() => this.deliveries.find((e) => e.id === this.delivery())?.price ?? 0);
  protected readonly discountAmount = computed(() => Math.round(this.subtotal * this.discount()));
  protected readonly total = computed(() => this.subtotal - this.discountAmount() + this.deliveryAmount());

  private readonly fmt = new Intl.NumberFormat('en-US');
  protected kz(v: number): string {
    return this.fmt.format(v) + ' Kz';
  }

  protected apply(event: Event): void {
    event.preventDefault();
    const c = this.code().trim().toUpperCase();
    if (!c) {
      this.codeError.set('Enter the code.');
    } else if (CODIGOS[c] === undefined) {
      this.codeError.set(`The code ${c} doesn't exist or has expired.`);
    } else {
      this.codeError.set('');
      this.discount.set(CODIGOS[c]);
      this.appliedCode.set(c);
      this.code.set('');
    }
  }

  protected removeCode(): void {
    this.discount.set(0);
    this.appliedCode.set('');
  }
}
