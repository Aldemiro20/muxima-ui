import { ChangeDetectionStrategy, Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxSeparator } from '@muxima-ui/core/separator';

interface Linha {
  id: number;
  nome: string;
  detalhe: string;
  /** Preço unitário com IVA, em dólares. */
  preco: number;
  quantidade: number;
  cor: string;
}

/** IVA em Angola: 14%. Os preços mostrados já o incluem. */
const IVA = 0.14;

/** Carrinho de compras com quantidades, remover e totais com IVA. */
@Component({
  selector: 'app-cart-pagina',
  imports: [MxButton, MxSeparator],
  templateUrl: './cart-pagina.html',
  styleUrl: './cart-pagina.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPagina {
  protected readonly linhas = signal<Linha[]>([
    { id: 1, nome: 'Camisa de pano', detalhe: 'Tamanho M', preco: 18.5, quantidade: 1, cor: '#1f5e63' },
    { id: 2, nome: 'Café do Uíge, 500 g', detalhe: 'Moído', preco: 4.5, quantidade: 2, cor: '#7a4a2a' },
    { id: 3, nome: 'Caneca de barro', detalhe: 'Natural', preco: 3.2, quantidade: 1, cor: '#b8693d' },
  ]);
  protected readonly aviso = signal('');
  private readonly titulo = viewChild.required<ElementRef<HTMLElement>>('titulo');

  protected readonly artigos = computed(() => this.linhas().reduce((a, l) => a + l.quantidade, 0));
  protected readonly total = computed(() => this.linhas().reduce((a, l) => a + l.preco * l.quantidade, 0));
  protected readonly entrega = computed(() => (this.total() >= 50 || !this.total() ? 0 : 2.5));
  protected readonly iva = computed(() => this.total() - this.total() / (1 + IVA));
  protected readonly aPagar = computed(() => this.total() + this.entrega());

  private readonly fmt = new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'USD' });
  protected kz(v: number): string {
    return this.fmt.format(v);
  }

  protected mudar(l: Linha, delta: number): void {
    const q = Math.min(20, Math.max(1, l.quantidade + delta));
    this.linhas.update((ls) => ls.map((x) => (x.id === l.id ? { ...x, quantidade: q } : x)));
    this.aviso.set(`${l.nome}: ${q}. Total ${this.kz(this.aPagar())}.`);
  }

  protected remover(l: Linha): void {
    this.linhas.update((ls) => ls.filter((x) => x.id !== l.id));
    this.aviso.set(`${l.nome} removido do carrinho.`);
    // o botão desapareceu: o foco vai para o título do carrinho
    this.titulo().nativeElement.focus();
  }
}
