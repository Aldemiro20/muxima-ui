import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxSeparator } from '@muxima-ui/core/separator';

/** A single plan: what it includes on one side, the price and the action on the other. */
@Component({
  selector: 'app-pricing-single',
  imports: [MxButton, MxSeparator],
  templateUrl: './pricing-single.html',
  styleUrl: './pricing-single.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingSingle {
  protected readonly includes = [
    'Invoicing and receipts',
    'Stock and warehouses',
    'Customers and suppliers',
    'Reports and VAT return',
    'Unlimited users',
    'Daily backups',
    'Updates included',
    'Support in Portuguese and English',
  ];
}
