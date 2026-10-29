import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxTab, MxTabs } from '@muxima-ui/core/tabs';

interface Area {
  name: string;
  title: string;
  text: string;
  points: string[];
  rows: { rotulo: string; value: string }[];
}

/** Features grouped by area, one per tab, with a preview beside it. */
@Component({
  selector: 'app-feature-tabs',
  imports: [MxButton, MxTabs, MxTab],
  templateUrl: './feature-tabs.html',
  styleUrl: './feature-tabs.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureTabs {
  protected readonly areas: Area[] = [
    {
      name: 'Invoicing',
      title: 'Invoices right the first time',
      text: 'Numbering, VAT and withholdings calculated for you, ready for the tax authority.',
      points: ['Invoice, invoice-receipt and credit note', 'Sending by email and WhatsApp', 'Automatic payment reminders'],
      rows: [
        { rotulo: 'FT 2026/00241', value: '$250' },
        { rotulo: 'FR 2026/00118', value: '$84.50' },
        { rotulo: 'NC 2026/00012', value: '−$12' },
      ],
    },
    {
      name: 'Stock',
      title: 'Always know what you have',
      text: 'Stock in, out and transfers between warehouses, with low-stock alerts.',
      points: ['Several warehouses', 'Inventory with a barcode scanner', 'Alert when an item is running low'],
      rows: [
        { rotulo: 'Uíge coffee, 500 g', value: '124 pcs' },
        { rotulo: 'Cotton shirt', value: '8 pcs' },
        { rotulo: 'Clay mug', value: '0 pcs' },
      ],
    },
    {
      name: 'Reports',
      title: 'The month\'s numbers on one screen',
      text: 'Sales, VAT due and collections, by period, customer or product.',
      points: ['VAT return ready to file', 'Export to Excel and SAF-T', 'Comparison with the previous month'],
      rows: [
        { rotulo: 'October sales', value: '$18.4K' },
        { rotulo: 'VAT due', value: '$2,261' },
        { rotulo: 'To collect', value: '$4,820' },
      ],
    },
  ];
}
