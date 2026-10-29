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

type Entrega = 'loja' | 'casa';

/** Finalizar compra em três passos (dados, entrega, pagamento) e confirmação. */
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
  protected readonly passos = ['Dados', 'Entrega', 'Pagamento'];
  /** 0 a 2: passos; 3: concluído. */
  protected readonly passo = signal(0);
  private readonly tituloPasso = viewChild<ElementRef<HTMLElement>>('tituloPasso');

  protected readonly dados = new FormGroup({
    nome: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
  });
  protected readonly entrega = signal<Entrega>('casa');
  protected readonly morada = new FormControl('', { nonNullable: true, validators: [Validators.required] });
  /** Telemóvel angolano: 9 dígitos a começar por 9. */
  protected readonly telefone = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^9\d{2}\s?\d{3}\s?\d{3}$/)],
  });

  protected readonly artigos = 30.7;
  protected readonly custoEntrega = computed(() => (this.entrega() === 'casa' ? 2.5 : 0));
  protected readonly total = computed(() => this.artigos + this.custoEntrega());
  protected readonly aEnviar = signal(false);

  private readonly usd = new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'USD' });
  protected preco(v: number): string {
    return this.usd.format(v);
  }

  protected estado(i: number): 'complete' | 'current' | 'upcoming' {
    return i < this.passo() ? 'complete' : i === this.passo() ? 'current' : 'upcoming';
  }

  protected continuar(event: Event): void {
    event.preventDefault();
    const p = this.passo();
    if (p === 0 && this.dados.invalid) return this.dados.markAllAsTouched();
    if (p === 1 && this.entrega() === 'casa' && this.morada.invalid) return this.morada.markAsTouched();
    if (p === 2) {
      if (this.telefone.invalid) return this.telefone.markAsTouched();
      this.aEnviar.set(true);
      // troca por: pedir o pagamento ao teu fornecedor
      setTimeout(() => {
        this.aEnviar.set(false);
        this.irPara(3);
      }, 700);
      return;
    }
    this.irPara(p + 1);
  }

  protected voltar(): void {
    this.irPara(this.passo() - 1);
  }

  protected recomecar(): void {
    this.dados.reset();
    this.morada.reset();
    this.telefone.reset();
    this.entrega.set('casa');
    this.irPara(0);
  }

  /** Muda de passo e põe o foco no título, para o leitor de ecrã anunciar onde estás. */
  private irPara(p: number): void {
    this.passo.set(p);
    setTimeout(() => this.tituloPasso()?.nativeElement.focus());
  }
}
