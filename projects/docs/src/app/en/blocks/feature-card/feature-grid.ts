import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxCard, MxCardDescription, MxCardHeader, MxCardTitle } from '@muxima-ui/core/card';

interface Feature {
  title: string;
  text: string;
  /** A 16 × 16 SVG path, drawn with a stroke. */
  icon: string;
}

/** Feature grid: 1, 2 or 3 columns depending on the space. */
@Component({
  selector: 'app-feature-grid',
  imports: [MxCard, MxCardHeader, MxCardTitle, MxCardDescription],
  templateUrl: './feature-grid.html',
  styleUrl: './feature-grid.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGrid {
  protected readonly features: Feature[] = [
    {
      title: 'Invoicing',
      text: 'Invoices, receipts and credit notes with automatic numbering and email delivery.',
      icon: 'M4 1.5h6l3 3v10H4zM10 1.5v3h3M6 8h5M6 11h5',
    },
    {
      title: 'Stock',
      text: 'Stock in and out, and alerts when an item is running low, across several warehouses.',
      icon: 'M2 5l6-3 6 3v6l-6 3-6-3zM2 5l6 3 6-3M8 8v6',
    },
    {
      title: 'Customers',
      text: 'Purchase history, contacts and outstanding balance for each customer.',
      icon: 'M6 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.5 14c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4M11 2.5a2.5 2.5 0 010 4.5M12.5 10c1.3.5 2 1.8 2 4',
    },
    {
      title: 'Reports',
      text: 'Sales by month, product and salesperson, and the VAT return ready to file.',
      icon: 'M2 14h12M4 11V8M7 11V4M10 11V6M13 11V2',
    },
    {
      title: 'Team',
      text: 'Per-person permissions: who sells, who sees the reports and who approves.',
      icon: 'M8 1.5l5.5 2v4c0 3.5-2.5 6-5.5 7-3-1-5.5-3.5-5.5-7v-4zM5.5 8l2 2 3-3.5',
    },
    {
      title: 'Anywhere',
      text: 'On the computer, tablet or phone, with your data always in sync.',
      icon: 'M5 1.5h6a1 1 0 011 1v11a1 1 0 01-1 1H5a1 1 0 01-1-1v-11a1 1 0 011-1zM7 12.5h2',
    },
  ];
}
