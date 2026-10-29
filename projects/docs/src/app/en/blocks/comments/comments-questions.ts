import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';

interface Question {
  id: number;
  text: string;
  author: string;
  when: string;
  answer?: { text: string; when: string };
  helpful: number;
  isHelpful: boolean;
}

const MINIMUM = 10;

/** A product's questions and answers: search, helpful, seller reply and a new question. */
@Component({
  selector: 'app-comments-questions',
  imports: [MxBadge, MxButton, MxFormField, MxLabel, MxInput, MxHint, MxError],
  templateUrl: './comments-questions.html',
  styleUrl: './comments-questions.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsQuestions {
  /** Fictional examples. */
  protected readonly questions = signal<Question[]>([
    {
      id: 1,
      text: 'Is the coffee ground fine enough for an espresso machine?',
      author: 'Nádia',
      when: '3 days ago',
      answer: { text: 'Yes, the fine grind works for espresso. For a moka pot, choose medium.', when: '2 days ago' },
      helpful: 14,
      isHelpful: false,
    },
    {
      id: 2,
      text: 'Do you deliver to Lobito?',
      author: 'Hélder',
      when: '1 week ago',
      answer: { text: 'We do, in 3 to 5 business days, at the same price as Luanda.', when: '6 days ago' },
      helpful: 9,
      isHelpful: false,
    },
    {
      id: 3,
      text: 'How long does it keep once opened?',
      author: 'Isabel',
      when: '2 weeks ago',
      helpful: 2,
      isHelpful: false,
    },
  ]);
  protected readonly filter = signal('');
  protected readonly visiveis = computed(() => {
    const q = this.filter().trim().toLowerCase();
    return [...this.questions()]
      .filter((p) => !q || `${p.text} ${p.answer?.text ?? ''}`.toLowerCase().includes(q))
      .sort((a, b) => b.helpful - a.helpful);
  });

  protected readonly minimum = MINIMUM;
  protected readonly draft = signal('');
  protected readonly error = signal('');
  protected readonly notice = signal('');
  private nextId = 100;

  protected toggleHelpful(p: Question): void {
    this.questions.update((l) =>
      l.map((x) => (x.id === p.id ? { ...x, isHelpful: !x.isHelpful, helpful: x.helpful + (x.isHelpful ? -1 : 1) } : x)),
    );
  }

  protected ask(event: Event): void {
    event.preventDefault();
    const text = this.draft().trim();
    if (text.length < MINIMUM) {
      this.error.set(`Write the question with at least ${MINIMUM} characters.`);
      return;
    }
    this.questions.update((l) => [
      { id: ++this.nextId, text, author: 'Tu', when: 'now', helpful: 0, isHelpful: false },
      ...l,
    ]);
    this.draft.set('');
    this.error.set('');
    this.filter.set('');
    this.notice.set('Question sent. We\'ll let you know when the seller replies.');
  }
}
