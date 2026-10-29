import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxRating } from '@muxima-ui/core/rating';

/** A product page: images, size, quantity and add to cart. */
@Component({
  selector: 'app-product-detail',
  imports: [MxButton, MxRating],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetail {
  /** Sample images (colors); replace them with photo URLs. */
  protected readonly images = [
    { color: '#1f5e63', alt: 'Cotton shirt, front' },
    { color: '#2a7a80', alt: 'Cotton shirt, back' },
    { color: '#164548', alt: 'Detail of the fabric pattern' },
  ];
  protected readonly image = signal(0);

  protected readonly sizes = [
    { value: 'S', available: true },
    { value: 'M', available: true },
    { value: 'L', available: true },
    { value: 'XL', available: false },
  ];
  protected readonly size = signal<string | null>(null);
  protected readonly quantity = signal(1);
  protected readonly error = signal('');
  protected readonly notice = signal('');

  private readonly unitPrice = 18.5;
  private readonly usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  protected readonly price = this.usd.format(this.unitPrice);
  protected readonly total = computed(() => this.usd.format(this.unitPrice * this.quantity()));

  protected changeQuantity(delta: number): void {
    this.quantity.update((q) => Math.min(10, Math.max(1, q + delta)));
  }
  protected typeQuantity(text: string): void {
    const n = Number(text);
    if (Number.isInteger(n)) this.quantity.set(Math.min(10, Math.max(1, n)));
  }

  protected add(): void {
    if (!this.size()) {
      this.error.set('Choose a size.');
      return;
    }
    this.error.set('');
    this.notice.set(`Added to cart: ${this.quantity()} × cotton shirt, size ${this.size()}.`);
  }
}
