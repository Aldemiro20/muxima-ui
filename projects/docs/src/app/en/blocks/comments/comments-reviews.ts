import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxChipToggle } from '@muxima-ui/core/chips';
import { MxProgress } from '@muxima-ui/core/progress';
import { MxRating } from '@muxima-ui/core/rating';

interface Avaliacao {
  id: number;
  author: string;
  stars: number;
  data: string;
  when: string;
  text: string;
  helpful: number;
  isHelpful: boolean;
}

/**
 * A product's reviews: average, distribution and a filterable list.
 * The names and texts are fictional: only show real reviews from your customers.
 */
@Component({
  selector: 'app-comments-reviews',
  imports: [MxAvatar, MxChipToggle, MxProgress, MxRating],
  templateUrl: './comments-reviews.html',
  styleUrl: './comments-reviews.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsReviews {
  protected readonly reviews = signal<Avaliacao[]>([
    { id: 1, author: 'Customer A.', stars: 5, data: '2026-10-20', when: 'Oct 20, 2026', text: 'Arrived the next day, well packed. The coffee has a strong aroma and isn\'t bitter.', helpful: 4, isHelpful: false },
    { id: 2, author: 'Customer B.', stars: 4, data: '2026-10-14', when: 'Oct 14, 2026', text: 'Very good. I just found the 500 g pack small for the price.', helpful: 2, isHelpful: false },
    { id: 3, author: 'Customer C.', stars: 5, data: '2026-10-02', when: 'Oct 2, 2026', text: 'I buy it every month. Ground just right for the coffee maker.', helpful: 1, isHelpful: false },
    { id: 4, author: 'Customer D.', stars: 2, data: '2026-09-28', when: 'Sep 28, 2026', text: 'The taste is good, but delivery was three days late.', helpful: 0, isHelpful: false },
  ]);
  protected readonly filter = signal(0);

  protected readonly average = computed(() => {
    const l = this.reviews();
    return l.length ? l.reduce((a, x) => a + x.stars, 0) / l.length : 0;
  });
  protected readonly averageText = computed(() =>
    this.average().toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  );
  protected readonly distribution = computed(() =>
    [5, 4, 3, 2, 1].map((n) => ({ n, total: this.reviews().filter((a) => a.stars === n).length })),
  );
  protected readonly visiveis = computed(() =>
    this.filter() ? this.reviews().filter((a) => a.stars === this.filter()) : this.reviews(),
  );

  protected markHelpful(a: Avaliacao): void {
    this.reviews.update((l) =>
      l.map((x) => (x.id === a.id ? { ...x, isHelpful: !x.isHelpful, helpful: x.helpful + (x.isHelpful ? -1 : 1) } : x)),
    );
  }
}
