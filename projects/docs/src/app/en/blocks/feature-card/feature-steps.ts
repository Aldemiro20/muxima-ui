import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';

/** "How it works": numbered steps in an ordered list. */
@Component({
  selector: 'app-feature-steps',
  imports: [MxButton],
  templateUrl: './feature-steps.html',
  styleUrl: './feature-steps.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureSteps {
  protected readonly steps = [
    {
      title: 'Create your account',
      text: 'You only need your company\'s tax ID and an email. It takes two minutes.',
    },
    {
      title: 'Import your data',
      text: 'Customers and items from a spreadsheet, or one by one.',
    },
    {
      title: 'Issue your first invoice',
      text: 'Choose the customer, add the items and send. The rest is automatic.',
    },
  ];
}
