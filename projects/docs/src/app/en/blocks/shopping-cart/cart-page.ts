import { ChangeDetectionStrategy, Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxSeparator } from '@muxima-ui/core/separator';

interface Line {
  id: number;
  name: string;
  detail: string;
  /** Unit price with VAT, in Kz. */
  price: number;
  quantity: number;
  color: string;
}

/** VAT in Angola: 14%. The prices shown already include it. */
const IVA = 0.14;

/** Shopping cart with quantities, remove and totals with VAT. */
@Component({
  selector: 'app-cart-page',
  imports: [MxButton, MxSeparator],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage {
  protected readonly lines = signal<Line[]>([
    { id: 1, name: 'Cotton shirt', detail: 'Size M', price: 18500, quantity: 1, color: '#1f5e63' },
    { id: 2, name: 'Uíge coffee, 500 g', detail: 'Ground', price: 4500, quantity: 2, color: '#7a4a2a' },
    { id: 3, name: 'Clay mug', detail: 'Natural', price: 3200, quantity: 1, color: '#b8693d' },
  ]);
  protected readonly notice = signal('');
  private readonly title = viewChild.required<ElementRef<HTMLElement>>('title');

  protected readonly items = computed(() => this.lines().reduce((a, l) => a + l.quantity, 0));
  protected readonly total = computed(() => this.lines().reduce((a, l) => a + l.price * l.quantity, 0));
  protected readonly delivery = computed(() => (this.total() >= 50000 || !this.total() ? 0 : 2500));
  protected readonly vat = computed(() => this.total() - this.total() / (1 + IVA));
  protected readonly toPay = computed(() => this.total() + this.delivery());

  private readonly fmt = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  protected kz(v: number): string {
    return this.fmt.format(v) + ' Kz';
  }

  protected change(l: Line, delta: number): void {
    const q = Math.min(20, Math.max(1, l.quantity + delta));
    this.lines.update((ls) => ls.map((x) => (x.id === l.id ? { ...x, quantity: q } : x)));
    this.notice.set(`${l.name}: ${q}. Total ${this.kz(this.toPay())}.`);
  }

  protected remove(l: Line): void {
    this.lines.update((ls) => ls.filter((x) => x.id !== l.id));
    this.notice.set(`${l.name} removed from the cart.`);
    // the button is gone: focus goes to the cart title
    this.title().nativeElement.focus();
  }
}
