import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';

type Network = 'Visa' | 'Mastercard' | null;

/** Digits only. */
const digitos = (v: string) => v.replace(/\D/g, '');

/** Visa starts with 4; Mastercard with 51–55 or 2221–2720. */
function network(number: string): Network {
  const d = digitos(number);
  if (/^4/.test(d)) return 'Visa';
  const four = Number(d.slice(0, 4));
  if (/^5[1-5]/.test(d) || (four >= 2221 && four <= 2720)) return 'Mastercard';
  return null;
}

/** Luhn algorithm: catches most typing mistakes in the number. */
function luhn(number: string): boolean {
  const d = digitos(number);
  let sum = 0;
  for (let i = 0; i < d.length; i++) {
    let n = Number(d[d.length - 1 - i]);
    if (i % 2 === 1) n = n * 2 > 9 ? n * 2 - 9 : n * 2;
    sum += n;
  }
  return d.length >= 13 && sum % 10 === 0;
}

function validNumber(c: AbstractControl): ValidationErrors | null {
  return !c.value || luhn(c.value) ? null : { number: true };
}

/** MM/YY, not expired. */
function validExpiry(c: AbstractControl): ValidationErrors | null {
  const m = String(c.value ?? '').match(/^(\d{2})\/(\d{2})$/);
  if (!c.value) return null;
  if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) return { format: true };
  const end = new Date(2000 + Number(m[2]), Number(m[1]), 1);
  return end <= new Date() ? { expired: true } : null;
}

/**
 * Card form with a preview. It is only the interface: in production, the card
 * number must not go through your server. Use your payment provider's secure
 * fields (iframe) and apply this look to them.
 */
@Component({
  selector: 'app-payment-card',
  imports: [ReactiveFormsModule, MxButton, MxFormField, MxLabel, MxInput, MxHint, MxError],
  templateUrl: './payment-card.html',
  styleUrl: './payment-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCard {
  protected readonly amount = '33 200,00 Kz';
  protected readonly form = new FormGroup({
    number: new FormControl('', { nonNullable: true, validators: [Validators.required, validNumber] }),
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    expiry: new FormControl('', { nonNullable: true, validators: [Validators.required, validExpiry] }),
    cvc: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{3,4}$/)] }),
  });

  private readonly values = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });
  protected readonly network = computed(() => network(this.values().number ?? ''));
  protected readonly cardNumber = computed(() => {
    const d = digitos(this.values().number ?? '').padEnd(16, '•');
    return d.replace(/(.{4})/g, '$1 ').trim();
  });
  protected readonly cardName = computed(() => (this.values().name || 'Name on card').toUpperCase());
  protected readonly cardExpiry = computed(() => this.values().expiry || 'MM/YY');

  protected readonly paying = signal(false);
  protected readonly status = signal('');

  /** Writes the number in groups of 4. */
  protected formatNumber(input: HTMLInputElement): void {
    const d = digitos(input.value).slice(0, 19);
    const v = d.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.form.controls.number.setValue(v);
  }

  /** Adds the slash after the month: 0428 → 04/28. */
  protected formatExpiry(input: HTMLInputElement): void {
    const d = digitos(input.value).slice(0, 4);
    this.form.controls.expiry.setValue(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
  }

  protected pay(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.status.set('Check the card details.');
      return;
    }
    this.paying.set(true);
    this.status.set('');
    // replace with: confirm the payment with your provider
    setTimeout(() => {
      this.paying.set(false);
      this.status.set(`Payment of ${this.amount} approved. We emailed you the receipt.`);
      this.form.reset();
    }, 900);
  }
}
