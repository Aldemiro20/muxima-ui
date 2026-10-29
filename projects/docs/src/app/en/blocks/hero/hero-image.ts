import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';

/**
 * Hero with an image beside it. The "image" here is a panel drawn in HTML;
 * replace it with an <img> of your product (and an alt that says what it shows).
 */
@Component({
  selector: 'app-hero-image',
  imports: [MxButton],
  templateUrl: './hero-image.html',
  styleUrl: './hero-image.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroImage {
  protected readonly benefits = [
    'Invoices and receipts in seconds',
    'Stock updated with every sale',
    'VAT report ready at the end of the month',
  ];
  /** Sales over the last 7 days, as % of the highest. */
  protected readonly bars = [42, 58, 51, 76, 64, 88, 100];
}
