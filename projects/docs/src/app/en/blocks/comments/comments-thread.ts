import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxButton } from '@muxima-ui/core/button';
import { MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';

interface Comment {
  id: number;
  author: string;
  /** ISO date, for the <time datetime>. */
  data: string;
  when: string;
  text: string;
  likes: number;
  liked: boolean;
  replies: Comment[];
}

const LIMIT = 500;

/** A thread: comments with replies, likes and a new comment. */
@Component({
  selector: 'app-comments-thread',
  imports: [NgTemplateOutlet, MxAvatar, MxButton, MxFormField, MxLabel, MxInput, MxHint],
  templateUrl: './comments-thread.html',
  styleUrl: './comments-thread.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsThread {
  protected readonly limit = LIMIT;
  protected readonly eu = 'Ana Kiala';
  protected readonly comments = signal<Comment[]>([
    {
      id: 1,
      author: 'Pedro Neto',
      data: '2026-10-27T09:12',
      when: '3 hours ago',
      text: 'Can we send the proposal to Lobito Portos yet? We just need to confirm the delivery time.',
      likes: 2,
      liked: false,
      replies: [
        {
          id: 2,
          author: 'Joana Mbala',
          data: '2026-10-27T10:05',
          when: '2 hours ago',
          text: 'The warehouse confirmed 15 days. I updated the document.',
          likes: 1,
          liked: true,
          replies: [],
        },
      ],
    },
    {
      id: 3,
      author: 'Ana Kiala',
      data: '2026-10-27T11:30',
      when: '40 minutes ago',
      text: 'Perfect. I\'ll send it this afternoon, with the 5% discount we agreed on.',
      likes: 0,
      liked: false,
      replies: [],
    },
  ]);

  protected readonly draft = signal('');
  protected readonly replyingTo = signal<number | null>(null);
  protected readonly replyText = signal('');
  protected readonly notice = signal('');
  private nextId = 100;

  protected toggleLike(c: Comment): void {
    this.update(c.id, (x) => ({ ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) }));
  }

  protected comment(event: Event): void {
    event.preventDefault();
    const text = this.draft().trim();
    if (!text) return;
    this.comments.update((l) => [...l, this.create(text)]);
    this.draft.set('');
    this.notice.set('Comment posted.');
  }

  protected reply(event: Event, c: Comment): void {
    event.preventDefault();
    const text = this.replyText().trim();
    if (!text) return;
    this.update(c.id, (x) => ({ ...x, replies: [...x.replies, this.create(text)] }));
    this.replyText.set('');
    this.replyingTo.set(null);
    this.notice.set(`Reply to ${c.author} posted.`);
  }

  private create(text: string): Comment {
    return { id: ++this.nextId, author: this.eu, data: new Date().toISOString(), when: 'Now', text, likes: 0, liked: false, replies: [] };
  }

  /** Changes a comment (or reply) by id, without touching the others. */
  private update(id: number, fn: (c: Comment) => Comment): void {
    const change = (l: Comment[]): Comment[] =>
      l.map((c) => (c.id === id ? fn(c) : { ...c, replies: change(c.replies) }));
    this.comments.update(change);
  }
}
