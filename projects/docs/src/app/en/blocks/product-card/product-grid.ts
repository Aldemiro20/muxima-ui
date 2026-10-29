import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxRating } from '@muxima-ui/core/rating';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  priceBefore?: number;
  avaliacao: number;
  avaliacoes: number;
  /** Background color of the sample image; replace it with an <img> of the photo. */
  color: string;
}

/** Product grid with favorite, rating, price and add to cart. */
@Component({
  selector: 'app-product-grid',
  imports: [MxBadge, MxButton, MxRating],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGrid {
  protected readonly products: Product[] = [
    { id: 1, name: 'Uíge coffee, 500 g', category: 'Groceries', price: 4.5, avaliacao: 4.5, avaliacoes: 124, color: '#7a4a2a' },
    { id: 2, name: 'Clay mug', category: 'Home', price: 3.2, avaliacao: 4, avaliacoes: 38, color: '#b8693d' },
    { id: 3, name: 'Cloth-bound notebook', category: 'Stationery', price: 2.24, priceBefore: 2.8, avaliacao: 5, avaliacoes: 12, color: '#1f5e63' },
    { id: 4, name: 'Printed cloth bag', category: 'Accessories', price: 5.5, avaliacao: 3.5, avaliacoes: 7, color: '#8c2f39' },
  ];

  protected readonly favorites = signal<ReadonlySet<number>>(new Set());
  protected readonly cart = signal<ReadonlyMap<number, number>>(new Map());
  protected readonly totalItems = computed(() => [...this.cart().values()].reduce((a, n) => a + n, 0));
  protected readonly notice = signal('');

  private readonly usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  protected price(v: number): string {
    return this.usd.format(v);
  }
  protected discount(p: Product): number {
    return p.priceBefore ? Math.round((1 - p.price / p.priceBefore) * 100) : 0;
  }

  protected toggleFavorite(p: Product): void {
    const f = new Set(this.favorites());
    if (f.has(p.id)) f.delete(p.id);
    else f.add(p.id);
    this.favorites.set(f);
    this.notice.set(f.has(p.id) ? `${p.name} saved to favorites.` : `${p.name} removed from favorites.`);
  }

  protected add(p: Product): void {
    const c = new Map(this.cart());
    c.set(p.id, (c.get(p.id) ?? 0) + 1);
    this.cart.set(c);
    this.notice.set(`${p.name} added to cart. ${this.totalItems()} items in the cart.`);
  }
}
