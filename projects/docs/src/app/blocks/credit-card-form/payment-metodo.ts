import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxCopyButton } from '@muxima-ui/core/clipboard';
import { MxChoice, MxChoiceDescription, MxError, MxFieldset, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { MxRadio } from '@muxima-ui/core/radio';

type Metodo = 'telemovel' | 'referencia' | 'cartao';

/**
 * Escolha do método de pagamento, com os campos de cada um. Os nomes dos métodos são
 * exemplos: usa os que o teu fornecedor de pagamentos disponibiliza.
 */
@Component({
  selector: 'app-payment-metodo',
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
  templateUrl: './payment-metodo.html',
  styleUrl: './payment-metodo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMetodo {
  protected readonly valor = '33 200,00 Kz';
  protected readonly metodos: { id: Metodo; nome: string; descricao: string }[] = [
    { id: 'telemovel', nome: 'Pagamento por telemóvel', descricao: 'Confirmas na aplicação do teu banco.' },
    { id: 'referencia', nome: 'Referência', descricao: 'Pagas num ATM ou no homebanking, até 48 horas.' },
    { id: 'cartao', nome: 'Cartão Visa ou Mastercard', descricao: 'Abre a página segura do banco.' },
  ];
  protected readonly metodo = signal<Metodo>('telemovel');

  /** Telemóvel angolano: 9 dígitos a começar por 9. */
  protected readonly telefone = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^9\d{2}\s?\d{3}\s?\d{3}$/)],
  });

  protected readonly referencia = signal<{ entidade: string; numero: string } | null>(null);
  protected readonly aEnviar = signal(false);
  protected readonly estado = signal('');

  protected escolher(m: Metodo): void {
    this.metodo.set(m);
    this.estado.set('');
  }

  protected pagarTelemovel(event: Event): void {
    event.preventDefault();
    if (this.telefone.invalid) {
      this.telefone.markAsTouched();
      return;
    }
    this.aEnviar.set(true);
    // troca por: pedir o pagamento ao teu fornecedor
    setTimeout(() => {
      this.aEnviar.set(false);
      this.estado.set(`Enviámos o pedido para ${this.telefone.value}. Confirma no telemóvel nos próximos 5 minutos.`);
    }, 800);
  }

  protected gerarReferencia(): void {
    // no teu projecto, a referência vem do servidor
    this.referencia.set({ entidade: '00123', numero: '231 456 789' });
    this.estado.set('Referência gerada. Tens 48 horas para pagar.');
  }
}
