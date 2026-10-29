import { ChangeDetectionStrategy, Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import {
  MxChoice,
  MxChoiceDescription,
  MxError,
  MxFieldset,
  MxFormField,
  MxHint,
  MxInput,
  MxLabel,
} from '@muxima-ui/core/form-field';
import { MxRadio } from '@muxima-ui/core/radio';
import { MX_STEPPER } from '@muxima-ui/core/stepper';

type Delivery = 'store' | 'home';

/** Checkout in three steps (details, delivery, payment) and confirmation. */
@Component({
  selector: 'app-payment-checkout',
  imports: [
    ReactiveFormsModule,
    MxButton,
    MX_STEPPER,
    MxFormField,
    MxLabel,
    MxInput,
    MxHint,
    MxError,
    MxFieldset,
    MxChoice,
    MxChoiceDescription,
    MxRadio,
  ],
  templateUrl: './payment-checkout.html',
  styleUrl: './payment-checkout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCheckout {
  protected readonly steps = ['Details', 'Delivery', 'Payment'];
  /** 0 to 2: steps; 3: done. */
  protected readonly step = signal(0);
  private readonly stepTitle = viewChild<ElementRef<HTMLElement>>('stepTitle');

  protected readonly details = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });
  protected readonly delivery = signal<Delivery>('home');
  protected readonly address = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  /** Angolan mobile: 9 digits starting with 9. */
  protected readonly phone = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^9\d{2}\s?\d{3}\s?\d{3}$/)],
  });

  protected readonly items = 30700;
  protected readonly deliveryCost = computed(() => (this.delivery() === 'home' ? 2500 : 0));
  protected readonly total = computed(() => this.items + this.deliveryCost());
  protected readonly sending = signal(false);

  private readonly kz = new Intl.NumberFormat('en-US');
  protected price(v: number): string {
    return this.kz.format(v) + ' Kz';
  }

  protected status(i: number): 'complete' | 'current' | 'upcoming' {
    return i < this.step() ? 'complete' : i === this.step() ? 'current' : 'upcoming';
  }

  protected next(event: Event): void {
    event.preventDefault();
    const p = this.step();
    if (p === 0 && this.details.invalid) return this.details.markAllAsTouched();
    if (p === 1 && this.delivery() === 'home' && this.address.invalid) return this.address.markAsTouched();
    if (p === 2) {
      if (this.phone.invalid) return this.phone.markAsTouched();
      this.sending.set(true);
      // replace with: request the payment from your provider
      setTimeout(() => {
        this.sending.set(false);
        this.goTo(3);
      }, 700);
      return;
    }
    this.goTo(p + 1);
  }

  protected back(): void {
    this.goTo(this.step() - 1);
  }

  protected recomecar(): void {
    this.details.reset();
    this.address.reset();
    this.phone.reset();
    this.delivery.set('home');
    this.goTo(0);
  }

  /** Changes step and moves focus to the title, so the screen reader announces where you are. */
  private goTo(p: number): void {
    this.step.set(p);
    setTimeout(() => this.stepTitle()?.nativeElement.focus());
  }
}
