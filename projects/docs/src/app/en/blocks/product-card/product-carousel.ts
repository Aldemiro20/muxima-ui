import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxCarousel, MxCarouselSlide } from '@muxima-ui/core/carousel';

interface Product {
  id: number;
  name: string;
  price: number;
  /** Background color of the sample image; replace it with an <img> of the photo. */
  color: string;
}

/** A sliding row of products, with 1 to 4 per view depending on the width. */
@Component({
  selector: 'app-product-carousel',
  imports: [MxButton, MxCarousel, MxCarouselSlide],
  templateUrl: './product-carousel.html',
  styleUrl: './product-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCarousel {
  protected readonly products: Product[] = [
    { id: 1, name: 'Uíge coffee, 500 g', price: 4.5, color: '#7a4a2a' },
    { id: 2, name: 'Clay mug', price: 3.2, color: '#b8693d' },
    { id: 3, name: 'Cloth-bound notebook', price: 2.24, color: '#1f5e63' },
    { id: 4, name: 'Printed cloth bag', price: 5.5, color: '#8c2f39' },
    { id: 5, name: 'Malanje honey, 250 g', price: 3.9, color: '#a8781f' },
    { id: 6, name: 'Straw basket', price: 7.8, color: '#6b6a3a' },
    { id: 7, name: 'Beeswax candle', price: 2.6, color: '#5a4b7a' },
  ];

  /** How many fit in view, depending on the block width. */
  protected readonly perView = signal(3);
  protected readonly added = signal<ReadonlySet<number>>(new Set());
  protected readonly notice = signal('');

  private readonly usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  protected price(v: number): string {
    return this.usd.format(v);
  }

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const fit = () => {
        const w = host.clientWidth;
        this.perView.set(w < 480 ? 1 : w < 760 ? 2 : w < 1040 ? 3 : 4);
      };
      const observer = new ResizeObserver(fit);
      observer.observe(host);
      destroy.onDestroy(() => observer.disconnect());
    });
  }

  protected add(p: Product): void {
    this.added.update((s) => new Set(s).add(p.id));
    this.notice.set(`${p.name} added to cart.`);
  }
}
