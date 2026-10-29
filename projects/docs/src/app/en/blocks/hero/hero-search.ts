import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxInput } from '@muxima-ui/core/form-field';

interface Article {
  title: string;
  topic: string;
}

/** Sample articles; in your project they come from the server search. */
const ARTICLES: Article[] = [
  { title: 'How to issue an invoice-receipt', topic: 'Invoices' },
  { title: 'Void an invoice with a credit note', topic: 'Invoices' },
  { title: 'Send invoices by WhatsApp', topic: 'Invoices' },
  { title: 'VAT rates and exemptions', topic: 'VAT' },
  { title: 'Export SAF-T for the tax authority', topic: 'VAT' },
  { title: 'Invite people to the team', topic: 'Account' },
  { title: 'Change the plan or the payment method', topic: 'Account' },
];

/** A help center opening: search, popular topics and results. */
@Component({
  selector: 'app-hero-search',
  imports: [MxButton, MxInput],
  templateUrl: './hero-search.html',
  styleUrl: './hero-search.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSearch {
  protected readonly topics = ['Invoices', 'VAT', 'Account'];
  protected readonly text = signal('');
  /** What was searched (on submit or when choosing a topic). */
  protected readonly searched = signal('');

  protected readonly results = computed(() => {
    const q = normalize(this.searched());
    if (!q) return [];
    return ARTICLES.filter((a) => normalize(`${a.title} ${a.topic}`).includes(q));
  });

  protected runSearch(event: Event): void {
    event.preventDefault();
    this.searched.set(this.text().trim());
  }

  protected chooseTopic(topic: string): void {
    this.text.set(topic);
    this.searched.set(topic);
  }
}

function normalize(t: string): string {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}
