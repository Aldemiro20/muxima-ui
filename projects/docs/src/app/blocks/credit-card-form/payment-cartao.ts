import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';

type Rede = 'Visa' | 'Mastercard' | null;

/** Só os dígitos. */
const digitos = (v: string) => v.replace(/\D/g, '');

/** Visa começa por 4; Mastercard por 51–55 ou 2221–2720. */
function rede(numero: string): Rede {
  const d = digitos(numero);
  if (/^4/.test(d)) return 'Visa';
  const quatro = Number(d.slice(0, 4));
  if (/^5[1-5]/.test(d) || (quatro >= 2221 && quatro <= 2720)) return 'Mastercard';
  return null;
}

/** Algoritmo de Luhn: apanha a maioria dos erros ao escrever o número. */
function luhn(numero: string): boolean {
  const d = digitos(numero);
  let soma = 0;
  for (let i = 0; i < d.length; i++) {
    let n = Number(d[d.length - 1 - i]);
    if (i % 2 === 1) n = n * 2 > 9 ? n * 2 - 9 : n * 2;
    soma += n;
  }
  return d.length >= 13 && soma % 10 === 0;
}

function numeroValido(c: AbstractControl): ValidationErrors | null {
  return !c.value || luhn(c.value) ? null : { numero: true };
}

/** MM/AA, não expirado. */
function validadeValida(c: AbstractControl): ValidationErrors | null {
  const m = String(c.value ?? '').match(/^(\d{2})\/(\d{2})$/);
  if (!c.value) return null;
  if (!m || Number(m[1]) < 1 || Number(m[1]) > 12) return { formato: true };
  const fim = new Date(2000 + Number(m[2]), Number(m[1]), 1);
  return fim <= new Date() ? { expirado: true } : null;
}

/**
 * Formulário de cartão com pré-visualização. É só a interface: em produção, o número
 * do cartão não deve passar pelo teu servidor. Usa os campos seguros (iframe) do teu
 * fornecedor de pagamentos e aplica-lhes este aspecto.
 */
@Component({
  selector: 'app-payment-cartao',
  imports: [ReactiveFormsModule, MxButton, MxFormField, MxLabel, MxInput, MxHint, MxError],
  templateUrl: './payment-cartao.html',
  styleUrl: './payment-cartao.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentCartao {
  protected readonly valor = '33 200,00 Kz';
  protected readonly form = new FormGroup({
    numero: new FormControl('', { nonNullable: true, validators: [Validators.required, numeroValido] }),
    nome: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    validade: new FormControl('', { nonNullable: true, validators: [Validators.required, validadeValida] }),
    cvc: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{3,4}$/)] }),
  });

  private readonly valores = toSignal(this.form.valueChanges, { initialValue: this.form.getRawValue() });
  protected readonly rede = computed(() => rede(this.valores().numero ?? ''));
  protected readonly numeroCartao = computed(() => {
    const d = digitos(this.valores().numero ?? '').padEnd(16, '•');
    return d.replace(/(.{4})/g, '$1 ').trim();
  });
  protected readonly nomeCartao = computed(() => (this.valores().nome || 'Nome no cartão').toUpperCase());
  protected readonly validadeCartao = computed(() => this.valores().validade || 'MM/AA');

  protected readonly aPagar = signal(false);
  protected readonly estado = signal('');

  /** Escreve o número em grupos de 4. */
  protected formatarNumero(input: HTMLInputElement): void {
    const d = digitos(input.value).slice(0, 19);
    const v = d.replace(/(\d{4})(?=\d)/g, '$1 ');
    this.form.controls.numero.setValue(v);
  }

  /** Põe a barra depois do mês: 0428 → 04/28. */
  protected formatarValidade(input: HTMLInputElement): void {
    const d = digitos(input.value).slice(0, 4);
    this.form.controls.validade.setValue(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
  }

  protected pagar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.estado.set('Verifica os dados do cartão.');
      return;
    }
    this.aPagar.set(true);
    this.estado.set('');
    // troca por: confirmar o pagamento com o teu fornecedor
    setTimeout(() => {
      this.aPagar.set(false);
      this.estado.set(`Pagamento de ${this.valor} aprovado. Enviámos o recibo por e-mail.`);
      this.form.reset();
    }, 900);
  }
}
