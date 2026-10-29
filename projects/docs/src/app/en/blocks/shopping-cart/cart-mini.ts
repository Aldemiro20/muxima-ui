import { ChangeDetectionStrategy, Component, TemplateRef, computed, inject, signal, viewChild } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG } from '@muxima-ui/core/dialog';
import { MxDrawer } from '@muxima-ui/core/drawer';

interface Product {
  id: number;
  name: string;
  price: number;
  color: string;
}

/** A cart button at the top of the shop that opens a side panel with the items. */
@Component({
  selector: 'app-cart-mini',
  imports: [MxBadge, MxButton, MX_DIALOG],
  templateUrl: './cart-mini.html',
  styleUrl: './cart-mini.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartMini {
  private readonly drawer = inject(MxDrawer);
  private readonly panel = viewChild.required<TemplateRef<unknown>>('cartPanel');

  protected readonly products: Product[] = [
    { id: 1, name: 'Uíge coffee, 500 g', price: 4500, color: '#7a4a2a' },
    { id: 2, name: 'Clay mug', price: 3200, color: '#b8693d' },
    { id: 3, name: 'Malanje honey, 250 g', price: 3900, color: '#a8781f' },
  ];
  /** product id → quantity. */
  protected readonly cart = signal<ReadonlyMap<number, number>>(new Map([[1, 2]]));
  protected readonly lines = computed(() =>
    [...this.cart()].map(([id, qtd]) => ({ product: this.products.find((p) => p.id === id)!, qtd })),
  );
  protected readonly items = computed(() => this.lines().reduce((a, l) => a + l.qtd, 0));
  protected readonly subtotal = computed(() => this.lines().reduce((a, l) => a + l.qtd * l.product.price, 0));
  protected readonly notice = signal('');

  private readonly kz = new Intl.NumberFormat('en-US');
  protected price(v: number): string {
    return this.kz.format(v) + ' Kz';
  }

  protected open(): void {
    this.drawer.open(this.panel(), { side: 'right', size: 'sm' });
  }

  protected add(p: Product): void {
    this.change(p.id, 1);
    this.notice.set(`${p.name} added. ${this.items()} in the cart.`);
  }

  protected change(id: number, delta: number): void {
    this.cart.update((c) => {
      const m = new Map(c);
      const n = (m.get(id) ?? 0) + delta;
      if (n > 0) m.set(id, n);
      else m.delete(id);
      return m;
    });
  }

  protected remove(p: Product): void {
    this.cart.update((c) => {
      const m = new Map(c);
      m.delete(p.id);
      return m;
    });
    this.notice.set(`${p.name} removed.`);
  }
}
