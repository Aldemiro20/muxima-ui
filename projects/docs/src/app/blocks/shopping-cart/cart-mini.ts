import { ChangeDetectionStrategy, Component, TemplateRef, computed, inject, signal, viewChild } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG } from '@muxima-ui/core/dialog';
import { MxDrawer } from '@muxima-ui/core/drawer';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  cor: string;
}

/** Botão do carrinho no topo da loja, que abre um painel lateral com os artigos. */
@Component({
  selector: 'app-cart-mini',
  imports: [MxBadge, MxButton, MX_DIALOG],
  templateUrl: './cart-mini.html',
  styleUrl: './cart-mini.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartMini {
  private readonly drawer = inject(MxDrawer);
  private readonly painel = viewChild.required<TemplateRef<unknown>>('painelCarrinho');

  protected readonly produtos: Produto[] = [
    { id: 1, nome: 'Café do Uíge, 500 g', preco: 4.5, cor: '#7a4a2a' },
    { id: 2, nome: 'Caneca de barro', preco: 3.2, cor: '#b8693d' },
    { id: 3, nome: 'Mel de Malanje, 250 g', preco: 3.9, cor: '#a8781f' },
  ];
  /** id do produto → quantidade. */
  protected readonly carrinho = signal<ReadonlyMap<number, number>>(new Map([[1, 2]]));
  protected readonly linhas = computed(() =>
    [...this.carrinho()].map(([id, qtd]) => ({ produto: this.produtos.find((p) => p.id === id)!, qtd })),
  );
  protected readonly artigos = computed(() => this.linhas().reduce((a, l) => a + l.qtd, 0));
  protected readonly subtotal = computed(() => this.linhas().reduce((a, l) => a + l.qtd * l.produto.preco, 0));
  protected readonly aviso = signal('');

  private readonly usd = new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'USD' });
  protected preco(v: number): string {
    return this.usd.format(v);
  }

  protected abrir(): void {
    this.drawer.open(this.painel(), { side: 'right', size: 'sm' });
  }

  protected adicionar(p: Produto): void {
    this.mudar(p.id, 1);
    this.aviso.set(`${p.nome} adicionado. ${this.artigos()} no carrinho.`);
  }

  protected mudar(id: number, delta: number): void {
    this.carrinho.update((c) => {
      const m = new Map(c);
      const n = (m.get(id) ?? 0) + delta;
      if (n > 0) m.set(id, n);
      else m.delete(id);
      return m;
    });
  }

  protected remover(p: Produto): void {
    this.carrinho.update((c) => {
      const m = new Map(c);
      m.delete(p.id);
      return m;
    });
    this.aviso.set(`${p.nome} removido.`);
  }
}
