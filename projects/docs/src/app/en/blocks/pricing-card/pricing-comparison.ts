import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxTable } from '@muxima-ui/core/table';

/** true/false: included or not; text: the value (for example "5" users). */
type Value = boolean | string;

interface Row {
  name: string;
  values: [Value, Value, Value];
}

interface Group {
  name: string;
  rows: Row[];
}

/** Plan comparison in a table, with row groups. */
@Component({
  selector: 'app-pricing-comparison',
  imports: [MxTable, MxButton],
  templateUrl: './pricing-comparison.html',
  styleUrl: './pricing-comparison.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComparison {
  protected readonly plans = [
    { name: 'Basic', price: '$9.90' },
    { name: 'Professional', price: '$24.90' },
    { name: 'Business', price: '$59.90' },
  ];

  protected readonly groups: Group[] = [
    {
      name: 'Sales',
      rows: [
        { name: 'Invoices and receipts', values: [true, true, true] },
        { name: 'Credit notes', values: [true, true, true] },
        { name: 'Payment reminders', values: [false, true, true] },
        { name: 'Payment by reference', values: [false, true, true] },
      ],
    },
    {
      name: 'Management',
      rows: [
        { name: 'Users', values: ['1', '5', 'Unlimited'] },
        { name: 'Warehouses', values: ['1', '2', 'Unlimited'] },
        { name: 'VAT report', values: [false, true, true] },
        { name: 'Per-department permissions', values: [false, false, true] },
      ],
    },
    {
      name: 'Help',
      rows: [
        { name: 'Support', values: ['E-mail', 'Email and phone', 'Dedicated manager'] },
        { name: 'Team training', values: [false, false, true] },
      ],
    },
  ];

  protected type(v: Value): 'yes' | 'no' | 'text' {
    return v === true ? 'yes' : v === false ? 'no' : 'text';
  }
}
