import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxCopyButton } from '@muxima-ui/core/clipboard';
import { MxChoice, MxChoiceDescription, MxError, MxFieldset, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { MxRadio } from '@muxima-ui/core/radio';

type Method = 'phone' | 'reference' | 'card';

/**
 * Payment method choice, with the fields for each one. The method names are
 * examples: use the ones your payment provider offers.
 */
@Component({
  selector: 'app-payment-method',
  imports: [
    ReactiveFormsModule,
    MxButton,
    MxCopyButton,
    MxFieldset,
    MxChoice,
    MxChoiceDescription,
    MxRadio,
    MxFormField,
    MxLabel,
    MxInput,
    MxHint,
    MxError,
  ],
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethod {
  protected readonly amount = '$33.20';
  protected readonly metodos: { id: Method; name: string; descricao: string }[] = [
    { id: 'phone', name: 'Mobile payment', descricao: 'You confirm in your bank\'s app.' },
    { id: 'reference', name: 'Reference', descricao: 'Pay at an ATM or via online banking, within 48 hours.' },
    { id: 'card', name: 'Visa or Mastercard card', descricao: 'Opens the bank\'s secure page.' },
  ];
  protected readonly method = signal<Method>('phone');

  /** Angolan mobile: 9 digits starting with 9. */
  protected readonly phone = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^9\d{2}\s?\d{3}\s?\d{3}$/)],
  });

  protected readonly reference = signal<{ entity: string; number: string } | null>(null);
  protected readonly sending = signal(false);
  protected readonly status = signal('');

  protected choose(m: Method): void {
    this.method.set(m);
    this.status.set('');
  }

  protected payByPhone(event: Event): void {
    event.preventDefault();
    if (this.phone.invalid) {
      this.phone.markAsTouched();
      return;
    }
    this.sending.set(true);
    // replace with: request the payment from your provider
    setTimeout(() => {
      this.sending.set(false);
      this.status.set(`We sent the request to ${this.phone.value}. Confirm on your phone within 5 minutes.`);
    }, 800);
  }

  protected generateReference(): void {
    // in your project, the reference comes from the server
    this.reference.set({ entity: '00123', number: '231 456 789' });
    this.status.set('Reference generated. You have 48 hours to pay.');
  }
}
