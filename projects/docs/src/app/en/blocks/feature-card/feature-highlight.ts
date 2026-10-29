import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';

/** A highlighted feature: text, benefits and an illustration beside it. */
@Component({
  selector: 'app-feature-highlight',
  imports: [MxBadge, MxButton],
  templateUrl: './feature-highlight.html',
  styleUrl: './feature-highlight.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureHighlight {
  protected readonly benefits = [
    { title: 'Automatic reminders', text: 'The customer gets a notice 3 days before and on the due date.' },
    { title: 'Payment by reference', text: 'Each invoice carries its own reference; when it\'s paid, it\'s marked automatically.' },
    { title: 'Each customer\'s balance', text: 'See who owes, how much and for how long, in a single list.' },
  ];
  protected readonly rows = [
    { customer: 'Huíla Agro', amount: '350 000 Kz', status: 'Paid' },
    { customer: 'Lobito Portos', amount: '1 240 000 Kz', status: 'Reminder sent' },
    { customer: 'Uíge Café', amount: '87 500 Kz', status: 'Paid' },
  ];
}
