import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxInput } from '@muxima-ui/core/form-field';
import { MxTour, MxTourAnchor, MxTourStep } from '@muxima-ui/core/tour';

/** Dashboard with an invitation to a guided tour of the main parts of the screen. */
@Component({
  selector: 'app-onboarding-tour',
  imports: [MxBadge, MxButton, MxInput, MxTourAnchor],
  templateUrl: './onboarding-tour.html',
  styleUrl: './onboarding-tour.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingTour {
  private readonly tour = inject(MxTour);

  protected readonly menu = ['Home', 'Invoices', 'Customers', 'Reports'];
  protected readonly active = signal('Home');
  protected readonly invite = signal(true);
  protected readonly status = signal('');
  /** Step where the tour stopped, to continue from there. */
  private stoppedAt = 0;

  private readonly steps: MxTourStep[] = [
    {
      title: 'Welcome to Kianda',
      content: 'In five steps we show you where everything is. You can skip whenever you like.',
    },
    {
      target: 'ob-menu',
      title: 'Menu',
      content: 'Invoices, customers and reports, always at hand.',
      placement: 'end',
    },
    {
      target: 'ob-search',
      title: 'Search',
      content: 'Find a customer or an invoice by name, number or amount.',
    },
    {
      target: 'ob-new',
      title: 'New invoice',
      content: 'The starting point of your day. Customer details fill themselves in.',
    },
    {
      target: 'ob-summary',
      title: 'Summary',
      content: 'What you\'re owed, what\'s overdue and what you received this month.',
    },
    {
      target: 'ob-help',
      title: 'Help',
      content: 'You can repeat this tour here, whenever you like.',
    },
  ];

  protected start(): void {
    this.invite.set(false);
    this.status.set('');
    this.tour
      .start(this.steps, { startAt: this.stoppedAt })
      .afterClosed.then((r) => {
        this.stoppedAt = r.completed ? 0 : r.index;
        this.status.set(
          r.completed
            ? 'Tour complete. You can repeat it from the Help button.'
            : `Tour stopped at step ${r.index + 1}. The Help button continues from there.`,
        );
      });
  }

  protected dismiss(): void {
    this.invite.set(false);
    this.status.set('You can take the tour whenever you like, from the Help button.');
  }
}
