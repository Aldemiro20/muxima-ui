import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxButton } from '@muxima-ui/core/button';
import { MX_CARD } from '@muxima-ui/core/card';
import {
  MxNotification,
  MxNotificationBell,
  MxNotificationCenter,
  MxNotificationContent,
  mxRelativeTime,
} from '@muxima-ui/core/notification-center';
import { MX_POPOVER } from '@muxima-ui/core/popover';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

const minutes = (m: number) => new Date(Date.now() - m * 60_000);

function sample(): MxNotification[] {
  return [
    {
      id: 1,
      title: 'FT 2026/0196 paid',
      description: 'Huíla Agro paid 1,230,000.00 Kz.',
      time: minutes(4),
      category: 'Invoices',
      variant: 'success',
    },
    {
      id: 2,
      title: '3 overdue invoices',
      description: 'Total of 20.1 M Kz.',
      time: minutes(55),
      category: 'Invoices',
      variant: 'danger',
    },
    {
      id: 3,
      title: 'New customer: Uíge Café',
      time: minutes(60 * 5),
      category: 'Customers',
      read: true,
    },
    {
      id: 4,
      title: 'September report ready',
      time: minutes(60 * 26),
      category: 'Reports',
      read: true,
    },
  ];
}

@Component({
  selector: 'doc-notification-center-page',
  imports: [
    DOC_UI,
    MxNotificationCenter,
    MxNotificationBell,
    MxNotificationContent,
    MX_POPOVER,
    MX_CARD,
    MxButton,
    MxAvatar,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[
          { label: 'Components', path: '/components' },
          { label: 'Notification center' },
        ]"
        title="Notification center"
        lead="A notification list with unread and read items, filters, mark as read and remove. It pairs with a bell button that shows the count. The component keeps no state: it receives the list and tells you what the person did."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Notification center example">
          <button mxNotificationBell [count]="unread()" [mxPopoverTrigger]="panel"></button>
          <mx-popover #panel aria-label="Notifications" align="end" width="380px">
            <mx-notification-center
              [items]="items()"
              (markRead)="read($event)"
              (markAllRead)="readAll()"
            />
          </mx-popover>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code
          code="import { MxNotificationBell, MxNotificationCenter, mxRelativeTime } from '@muxima-ui/core/notification-center';"
        />
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          A title with the count and Mark all, filters, and a list where each notification is a
          button with an unread dot and actions on the right.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Title and count',
            topRight: 'Mark all',
            bottomLeft: 'Dot: unread',
            bottomRight: 'Mark read, remove',
            bottom: 'List sorted by most recent',
          }"
        >
          <div class="w-320">
            <mx-notification-center [items]="structure" [showFilter]="false" dismissible />
          </div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Bell with no notifications"
            ><button mxNotificationBell [count]="0"></button
          ></doc-state>
          <doc-state name="Bell with 3"><button mxNotificationBell [count]="3"></button></doc-state>
          <doc-state name="Bell with 120" note="Above max it shows 99+."
            ><button mxNotificationBell [count]="120"></button
          ></doc-state>
          <doc-state name="Empty list"
            ><div class="w-full"><mx-notification-center [items]="[]" [showFilter]="false" /></div
          ></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="Notifications page"
            note="dismissible shows Remove; the filters include the categories."
          >
            <div class="w-full">
              <mx-notification-center
                [items]="page()"
                dismissible
                (markRead)="readPage($event)"
                (markAllRead)="readAllPage()"
                (dismiss)="removePage($event)"
              />
            </div>
          </doc-example>
          <doc-example
            title="Real-time arrival"
            note="When an unread one arrives, it's announced to screen readers."
          >
            <div class="stack w-full">
              <div class="row-wrap">
                <button mxButton size="sm" type="button" (click)="arrive()">
                  Simulate a new notification
                </button>
                <button mxNotificationBell [count]="liveUnread()"></button>
              </div>
              <mx-notification-center
                [items]="live()"
                [showFilter]="false"
                (markRead)="readLive($event)"
                (markAllRead)="readAllLive()"
              />
            </div>
          </doc-example>
          <doc-example
            title="Custom content"
            note="ng-template mxNotificationContent receives the notification; data carries whatever you need."
          >
            <div class="w-full">
              <mx-notification-center
                [items]="people()"
                [showFilter]="false"
                title="Mentions"
                (markRead)="readPerson($event)"
                (markAllRead)="readAllPeople()"
              >
                <ng-template mxNotificationContent let-n>
                  <span class="notif-person">
                    <mx-avatar [name]="n.data.author" size="sm" decorative />
                    <span
                      ><strong>{{ n.data.author }}</strong> {{ n.title }}</span
                    >
                  </span>
                </ng-template>
              </mx-notification-center>
            </div>
          </doc-example>
          <doc-example
            title="In a dashboard card"
            note="No filters, with the footer projected into mxNotificationFooter."
          >
            <article mxCard class="w-full">
              <div mxCardContent>
                <mx-notification-center
                  [items]="card()"
                  [showFilter]="false"
                  [headingLevel]="3"
                  title="Alerts"
                  (markRead)="readCard($event)"
                  (markAllRead)="readAllCard()"
                >
                  <div mxNotificationFooter>
                    <button mxButton variant="link" size="sm" type="button">
                      See all alerts
                    </button>
                  </div>
                </mx-notification-center>
              </div>
            </article>
          </doc-example>
          <doc-example
            title="Not marked when opened"
            [note]="
              'markReadOnOpen=false: opening only emits opened. Opened: ' + (opened() || 'none')
            "
          >
            <div class="w-full">
              <mx-notification-center
                [items]="manual()"
                [markReadOnOpen]="false"
                [showFilter]="false"
                (opened)="opened.set($event.title)"
                (markRead)="readManual($event)"
                (markAllRead)="readAllManual()"
              />
            </div>
          </doc-example>
          <doc-example
            title="Relative time"
            note="mxRelativeTime(date, now, locale, nowText) returns now, 5 minutes ago, yesterday or the date."
          >
            <ul class="product-list">
              @for (t of times; track t.label) {
                <li>
                  <span>{{ t.label }}</span
                  ><span class="muted">{{ relative(t.data) }}</span>
                </li>
              }
            </ul>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            {
              key: 'Tab',
              action: 'Moves through Mark all, the filters, each notification and its actions.',
            },
            { key: 'Enter Space', action: 'Open the notification (and mark it as read).' },
          ]"
          [aria]="[
            'The bell says the count in its name: Notifications, 3 unread.',
            'Unread ones start with Unread: (hidden text); the dot and the bold are visual only.',
            'The title is a heading (level 2 by default, headingLevel changes it) and names the list.',
            'New unread notifications are announced with LiveAnnouncer.',
            'The mark and remove buttons say which notification they refer to.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Toast' }, { name: 'Popover' }, { name: 'Timeline' }]" />
      </section>
    </article>
  `,
})
export class NotificationCenterPage {
  protected readonly items = signal(sample());
  protected readonly unread = computed(() => this.items().filter((n) => !n.read).length);
  protected read(n: MxNotification): void {
    this.items.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected readAll(): void {
    this.items.update((l) => l.map((x) => ({ ...x, read: true })));
  }

  protected readonly structure = sample().slice(0, 2);

  protected readonly page = signal(sample());
  protected readPage(n: MxNotification): void {
    this.page.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected readAllPage(): void {
    this.page.update((l) => l.map((x) => ({ ...x, read: true })));
  }
  protected removePage(n: MxNotification): void {
    this.page.update((l) => l.filter((x) => x.id !== n.id));
  }

  protected readonly live = signal<MxNotification[]>([
    { id: 1, title: 'Signed in on another computer', time: minutes(30), read: true },
  ]);
  protected readonly liveUnread = computed(() => this.live().filter((n) => !n.read).length);
  private counter = 1;
  private readonly arrivals = [
    'Payment received from Banco Mutamba',
    'Lobito Portos opened the invoice',
    'New order from Namibe Pescas',
  ];
  protected arrive(): void {
    const title = this.arrivals[this.counter % this.arrivals.length];
    this.live.update((l) => [
      { id: ++this.counter, title, time: new Date(), variant: 'info' },
      ...l,
    ]);
  }
  protected readLive(n: MxNotification): void {
    this.live.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected readAllLive(): void {
    this.live.update((l) => l.map((x) => ({ ...x, read: true })));
  }

  protected readonly people = signal<MxNotification<{ author: string }>[]>([
    {
      id: 1,
      title: 'mentioned you in FT 2026/0201',
      time: minutes(12),
      data: { author: 'Pedro Neto' },
    },
    {
      id: 2,
      title: 'asked for approval for a discount',
      time: minutes(90),
      data: { author: 'Joana Mbala' },
    },
    {
      id: 3,
      title: 'replied to your comment',
      time: minutes(60 * 30),
      read: true,
      data: { author: 'Miguel Tchissola' },
    },
  ]);
  protected readPerson(n: MxNotification<{ author: string }>): void {
    this.people.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected readAllPeople(): void {
    this.people.update((l) => l.map((x) => ({ ...x, read: true })));
  }

  protected readonly card = signal<MxNotification[]>([
    { id: 1, title: 'Plan invoice limit at 90%', time: minutes(20), variant: 'warning' },
    {
      id: 2,
      title: 'Signing certificate expires in 7 days',
      time: minutes(60 * 3),
      variant: 'danger',
    },
  ]);
  protected readCard(n: MxNotification): void {
    this.card.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected readAllCard(): void {
    this.card.update((l) => l.map((x) => ({ ...x, read: true })));
  }

  protected readonly manual = signal(sample().slice(0, 2));
  protected readonly opened = signal('');
  protected readManual(n: MxNotification): void {
    this.manual.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  protected readAllManual(): void {
    this.manual.update((l) => l.map((x) => ({ ...x, read: true })));
  }

  protected readonly times = [
    { label: '20 seconds ago', data: new Date(Date.now() - 20_000) },
    { label: '5 minutes ago', data: minutes(5) },
    { label: '3 hours ago', data: minutes(180) },
    { label: '1 day ago', data: minutes(60 * 24) },
    { label: '10 days ago', data: minutes(60 * 24 * 10) },
  ];
  protected relative(d: Date): string {
    return mxRelativeTime(d, new Date(), 'en-US', 'now');
  }

  protected readonly previewCode = `<button mxNotificationBell [count]="unread()" [mxPopoverTrigger]="panel"></button>
<mx-popover #panel aria-label="Notifications" align="end" width="380px">
  <mx-notification-center [items]="notifications()"
    (markRead)="markRead($event)" (markAllRead)="markAll()" />
</mx-popover>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'items',
      type: 'MxNotification[]',
      description: '{ id, title, description?, time, read?, variant?, category?, data? }.',
    },
    { kind: 'Input', name: 'title', type: 'string', default: 'Notifications' },
    { kind: 'Input', name: 'headingLevel', type: 'number', default: '2' },
    {
      kind: 'Input',
      name: 'showFilter',
      type: 'boolean',
      default: 'true',
      description: 'All, Unread and one per category.',
    },
    {
      kind: 'Input',
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      description: 'A Remove button on each one.',
    },
    { kind: 'Input', name: 'markReadOnOpen', type: 'boolean', default: 'true' },
    {
      kind: 'Input',
      name: 'announce',
      type: 'boolean',
      default: 'true',
      description: 'Announces unread ones as they arrive.',
    },
    { kind: 'Input', name: 'markAllText, emptyText, emptyUnreadText', type: 'string' },
    { kind: 'Output', name: 'opened, markRead, dismiss', type: 'MxNotification' },
    { kind: 'Output', name: 'markAllRead', type: 'void' },
    {
      kind: 'Directiva',
      name: 'ng-template[mxNotificationContent]',
      type: 'let-n',
      description: 'Custom content for each notification.',
    },
    {
      kind: 'Componente',
      name: 'button[mxNotificationBell]',
      type: 'count, max, label',
      description: 'Bell with the count in its name.',
    },
    { kind: 'Função', name: 'mxRelativeTime(date, now?, locale?, nowText?)', type: 'string' },
  ];
}
