import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxProgress } from '@muxima-ui/core/progress';
import { MxTour, MxTourAnchor } from '@muxima-ui/core/tour';

interface Step {
  id: string;
  title: string;
  descricao: string;
  action: string;
  done: boolean;
}

/** A getting-started checklist with progress, and a guided tour that explains the list. */
@Component({
  selector: 'app-onboarding-steps',
  imports: [MxButton, MxProgress, MxTourAnchor],
  templateUrl: './onboarding-steps.html',
  styleUrl: './onboarding-steps.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingSteps {
  private readonly tour = inject(MxTour);

  protected readonly steps = signal<Step[]>([
    {
      id: 'company',
      title: 'Company details',
      descricao: 'Tax ID, address and logo, to appear on invoices.',
      action: 'Fill in',
      done: true,
    },
    {
      id: 'customer',
      title: 'First customer',
      descricao: 'Import a list or create a customer by hand.',
      action: 'Add customer',
      done: false,
    },
    {
      id: 'invoice',
      title: 'First invoice',
      descricao: 'Issue it and send by email or WhatsApp.',
      action: 'Create invoice',
      done: false,
    },
    {
      id: 'bank',
      title: 'Bank details',
      descricao: 'The IBAN appears on the invoice so the customer can pay.',
      action: 'Add IBAN',
      done: false,
    },
    {
      id: 'team',
      title: 'Invite the team',
      descricao: 'Give access to the people you work with.',
      action: 'Invite',
      done: false,
    },
  ]);
  protected readonly doneCount = computed(() => this.steps().filter((p) => p.done).length);
  protected readonly percent = computed(() =>
    Math.round((this.doneCount() / this.steps().length) * 100),
  );
  protected readonly next = computed(() => this.steps().find((p) => !p.done));
  protected readonly hidden = signal(false);
  protected readonly notice = signal('');

  protected complete(p: Step): void {
    // in your project, the action opens the right screen; here it is marked done at once
    this.steps.update((l) => l.map((x) => (x.id === p.id ? { ...x, done: true } : x)));
    const left = this.steps().length - this.doneCount();
    this.notice.set(
      left ? `${p.title}: done. ${left} left.` : 'All set. You can start invoicing.',
    );
  }

  protected recomecar(): void {
    this.steps.update((l) => l.map((x, i) => ({ ...x, done: i === 0 })));
    this.hidden.set(false);
    this.notice.set('');
  }

  protected explain(): void {
    this.tour.start([
      {
        target: 'ob-steps-progress',
        title: 'Your progress',
        content: 'Shows how many steps you\'ve done.',
      },
      {
        target: 'ob-steps-next',
        title: 'Next step',
        content: 'Always starts with the first one left.',
      },
      {
        target: 'ob-steps-hide',
        title: 'Hide the list',
        content: 'When you don\'t need it, hide it. It comes back from the Help menu.',
      },
    ]);
  }
}
