import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxChoice, MxChoiceDescription, MxFieldset, MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { MxRadio } from '@muxima-ui/core/radio';

interface Entrega {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
}

/** Códigos de desconto de exemplo: no teu projecto, valida-os no servidor. */
const CODIGOS: Record<string, number> = { KIANDA10: 0.1 };

/** Resumo do pedido com entrega, código de desconto e total a pagar. */
@Component({
  selector: 'app-cart-resumo',
  imports: [MxButton, MxFormField, MxLabel, MxInput, MxFieldset, MxChoice, MxChoiceDescription, MxRadio],
  templateUrl: './cart-resumo.html',
  styleUrl: './cart-resumo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartResumo {
  protected readonly artigos = [
    { nome: 'Camisa de pano', quantidade: 1, preco: 18.5 },
    { nome: 'Café do Uíge, 500 g', quantidade: 2, preco: 4.5 },
  ];
  protected readonly entregas: Entrega[] = [
    { id: 'loja', nome: 'Levantar na loja', descricao: 'Talatona, a partir de amanhã', preco: 0 },
    { id: 'casa', nome: 'Entrega em casa', descricao: 'Luanda, em 24 horas', preco: 2.5 },
  ];
  protected readonly entrega = signal('casa');

  protected readonly codigo = signal('');
  protected readonly desconto = signal(0);
  protected readonly erroCodigo = signal('');
  protected readonly codigoAplicado = signal('');

  protected readonly subtotal = this.artigos.reduce((a, i) => a + i.preco * i.quantidade, 0);
  protected readonly valorEntrega = computed(() => this.entregas.find((e) => e.id === this.entrega())?.preco ?? 0);
  protected readonly valorDesconto = computed(() => Math.round(this.subtotal * this.desconto()));
  protected readonly total = computed(() => this.subtotal - this.valorDesconto() + this.valorEntrega());

  private readonly fmt = new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'USD' });
  protected kz(v: number): string {
    return this.fmt.format(v);
  }

  protected aplicar(event: Event): void {
    event.preventDefault();
    const c = this.codigo().trim().toUpperCase();
    if (!c) {
      this.erroCodigo.set('Escreve o código.');
    } else if (CODIGOS[c] === undefined) {
      this.erroCodigo.set(`O código ${c} não existe ou já expirou.`);
    } else {
      this.erroCodigo.set('');
      this.desconto.set(CODIGOS[c]);
      this.codigoAplicado.set(c);
      this.codigo.set('');
    }
  }

  protected tirarCodigo(): void {
    this.desconto.set(0);
    this.codigoAplicado.set('');
  }
}
