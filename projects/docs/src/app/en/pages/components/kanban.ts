import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_KANBAN, MxKanbanColumn, MxKanbanMove } from '@muxima-ui/core/kanban';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

interface Task {
  id: number;
  title: string;
  person?: string;
  priority?: 'High' | 'Medium' | 'Low';
  due?: string;
}

function initialBoard(): MxKanbanColumn<Task>[] {
  return [
    {
      id: 'todo',
      title: 'To do',
      items: [
        {
          id: 1,
          title: 'Issue November invoices',
          person: 'Ana Kiala',
          priority: 'High',
          due: 'Oct 30',
        },
        {
          id: 2,
          title: 'Review the Lobito Portos contract',
          person: 'Pedro Neto',
          priority: 'Medium',
          due: 'Nov 4',
        },
        {
          id: 3,
          title: 'Update Banco Mutamba\'s details',
          person: 'Joana Mbala',
          priority: 'Low',
        },
      ],
    },
    {
      id: 'doing',
      title: 'In progress',
      limit: 3,
      items: [
        {
          id: 4,
          title: 'October VAT report',
          person: 'Ana Kiala',
          priority: 'High',
          due: 'Oct 31',
        },
        { id: 5, title: 'Collect 3 overdue invoices', person: 'Pedro Neto', priority: 'High' },
      ],
    },
    {
      id: 'revisao',
      title: 'In review',
      items: [
        { id: 6, title: 'Proposal for Uíge Café', person: 'Joana Mbala', priority: 'Medium' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      items: [{ id: 7, title: 'Import customers from CSV', person: 'Pedro Neto' }],
    },
  ];
}

@Component({
  selector: 'doc-kanban-page',
  imports: [DOC_UI, MX_KANBAN, MxAvatar, MxBadge, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Kanban' }]"
        title="Kanban"
        lead="Cards in columns to track work: drag with the mouse or a finger and move with the keyboard. Every step is announced to screen readers, and columns can have a card limit."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Kanban example">
          <mx-kanban
            class="w-full"
            [(columns)]="board"
            aria-label="Team tasks"
            (moved)="logMove($event)"
          >
            <ng-template mxKanbanCard let-t>
              <div class="kanban-card">
                <p class="kanban-card-title">{{ t.title }}</p>
                <div class="kanban-card-meta">
                  @if (t.priority) {
                    <span
                      mxBadge
                      size="sm"
                      [variant]="
                        t.priority === 'High'
                          ? 'danger'
                          : t.priority === 'Medium'
                            ? 'warning'
                            : 'secondary'
                      "
                      >{{ t.priority }}</span
                    >
                  }
                  @if (t.due) {
                    <span class="muted small">until {{ t.due }}</span>
                  }
                  @if (t.person) {
                    <mx-avatar class="kanban-avatar" [name]="t.person" size="sm" />
                  }
                </div>
              </div>
            </ng-template>
          </mx-kanban>
          <p class="muted small">
            {{ last() || 'Drag a card, or focus it and press Space.' }}
          </p>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code
          code="import { MX_KANBAN, MxKanbanColumn, MxKanbanMove } from '@muxima-ui/core/kanban';"
        />
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          Each column is a section with a title and count and a list of cards. A card picked up
          with the keyboard tilts and gets an outline.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Title and count',
            topRight: 'Limit (3 / 3)',
            bottomLeft: 'Card (li)',
            bottomRight: 'Empty column',
            bottom: 'Lists linked with cdk drag-drop',
          }"
        >
          <mx-kanban class="w-full" [columns]="structure" aria-label="Example" />
        </doc-structure>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="stack-lg">
          <doc-example
            title="Simple, with the card name"
            note="Without a template, it shows itemLabel(item). itemKey says which field is unique."
          >
            <mx-kanban
              class="w-full"
              [(columns)]="simple"
              itemKey="id"
              [itemLabel]="taskName"
              aria-label="Simple tasks"
            />
          </doc-example>

          <doc-example
            title="Adding cards"
            note="mxKanbanColumnFooter puts a button at the end of each column."
          >
            <mx-kanban class="w-full" [(columns)]="withAdd" aria-label="Ideas">
              <ng-template mxKanbanColumnFooter let-col>
                <button
                  mxButton
                  variant="ghost"
                  size="sm"
                  type="button"
                  (click)="add(col.id)"
                >
                  + Add<span class="mx-visually-hidden"> to {{ col.title }}</span>
                </button>
              </ng-template>
            </mx-kanban>
          </doc-example>

          <doc-example
            title="Sales pipeline"
            [note]="'Total under negotiation: ' + pipelineTotal()"
          >
            <mx-kanban
              class="w-full"
              [(columns)]="pipeline"
              [itemLabel]="dealName"
              aria-label="Sales pipeline"
            >
              <ng-template mxKanbanCard let-n>
                <div class="kanban-card">
                  <p class="kanban-card-title">{{ n.customer }}</p>
                  <p class="kanban-card-value">{{ usd(n.value) }}</p>
                </div>
              </ng-template>
            </mx-kanban>
          </doc-example>

          <doc-example
            title="Move log"
            note="(moved) gives the card, the columns and the positions: this is where you save to the server."
          >
            <div class="stack w-full">
              <mx-kanban
                class="w-full"
                [(columns)]="logBoard"
                [itemLabel]="taskName"
                aria-label="Tasks with a log"
                (moved)="history.set([describe($event), ...history()].slice(0, 4))"
              />
              <ul class="product-list w-full">
                @for (h of history(); track $index) {
                  <li>{{ h }}</li>
                } @empty {
                  <li class="muted">No moves yet.</li>
                }
              </ul>
            </div>
          </doc-example>

          <doc-example
            title="Undo the last move"
            [note]="
              previousMoves().length
                ? previousMoves().length + ' move(s) to undo.'
                : 'Each (moved) saves the move; undo does the reverse.'
            "
          >
            <div class="stack w-full">
              <mx-kanban
                class="w-full"
                [(columns)]="undoBoard"
                (moved)="previousMoves.set([...previousMoves().slice(-9), $event])"
                [itemLabel]="taskName"
                aria-label="Tasks with undo"
              />
              <div>
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  [disabled]="!previousMoves().length"
                  (click)="undoLast()"
                >
                  Undo
                </button>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Actions inside the card"
            note="The card's buttons are in the Tab order; Space on a button doesn't pick up the card."
          >
            <mx-kanban
              class="w-full"
              [(columns)]="withActions"
              [itemLabel]="taskName"
              aria-label="Support requests"
            >
              <ng-template mxKanbanCard let-t let-col="column">
                <div class="kanban-card">
                  <p class="kanban-card-title">{{ t.title }}</p>
                  <div class="kanban-card-meta">
                    @if (col.id !== 'resolved') {
                      <button
                        mxButton
                        size="sm"
                        variant="outline"
                        type="button"
                        (click)="resolve(t)"
                      >
                        Resolve<span class="mx-visually-hidden"> {{ t.title }}</span>
                      </button>
                    }
                    <button
                      mxButton
                      size="sm"
                      variant="ghost"
                      type="button"
                      (click)="archive(t)"
                    >
                      Archive<span class="mx-visually-hidden"> {{ t.title }}</span>
                    </button>
                  </div>
                </div>
              </ng-template>
            </mx-kanban>
          </doc-example>

          <doc-example
            title="Per-column limit"
            note="limit: 2 on In production. When full, the column accepts no more and that's announced."
          >
            <mx-kanban
              class="w-full"
              [(columns)]="production"
              [itemLabel]="taskName"
              aria-label="Orders"
              emptyText="No orders"
            />
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Goes from card to card (and to the buttons inside them).' },
            {
              key: '↑ ↓ ← →',
              action: 'Without picking up: changes card, in the column or to the next column.',
            },
            { key: 'Space Enter', action: 'Picks up the card; again, drops it.' },
            { key: '↑ ↓', action: 'Picked up: moves up or down in the column.' },
            { key: '← →', action: 'Picked up: moves to the next column.' },
            { key: 'Esc', action: 'Cancels and returns the card to where it came from.' },
          ]"
          [aria]="[
            'Each column is a group with a title (heading) and a list with that name.',
            'The count says what it means: 2 cards, maximum 3.',
            'Each card has the keyboard instructions in aria-describedby.',
            'Pick up, move, drop, cancel and full column are announced: In progress, position 2 of 3.',
            'Dragging with the mouse or a finger is not the only way: the keyboard does everything.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Card' }, { name: 'Data grid' }, { name: 'Badge' }]" />
      </section>
    </article>
  `,
})
export class KanbanPage {
  protected readonly board = signal(initialBoard());
  protected readonly last = signal('');
  protected logMove(m: MxKanbanMove<Task>): void {
    const cols = this.board();
    this.last.set(
      `${m.item.title}: ${cols.find((c) => c.id === m.from)!.title} → ${cols.find((c) => c.id === m.to)!.title}.`,
    );
  }

  protected readonly structure: MxKanbanColumn<Task>[] = [
    { id: 'a', title: 'To do', items: [{ id: 1, title: 'Issue invoices' }] },
    {
      id: 'b',
      title: 'In progress',
      limit: 3,
      items: [
        { id: 2, title: 'Report' },
        { id: 3, title: 'Collections' },
        { id: 4, title: 'Proposal' },
      ],
    },
    { id: 'c', title: 'Done', items: [] },
  ];

  protected readonly taskName = (t: Task) => t.title;
  protected readonly simple = signal<MxKanbanColumn<Task>[]>([
    {
      id: 'a',
      title: 'Today',
      items: [
        { id: 1, title: 'Call Huíla Agro' },
        { id: 2, title: 'Send proposal' },
      ],
    },
    { id: 'b', title: 'This week', items: [{ id: 3, title: 'Close the month' }] },
    { id: 'c', title: 'Later', items: [] },
  ]);

  private nextId = 100;
  protected readonly withAdd = signal<MxKanbanColumn<Task>[]>([
    { id: 'new', title: 'New', items: [{ id: 50, title: 'Recurring invoices' }] },
    { id: 'review', title: 'Under review', items: [] },
  ]);
  protected add(colId: string): void {
    const id = ++this.nextId;
    this.withAdd.update((cols) =>
      cols.map((c) =>
        c.id === colId ? { ...c, items: [...c.items, { id, title: `Idea ${id - 100}` }] } : c,
      ),
    );
  }

  protected readonly usd = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
  protected readonly dealName = (n: { customer: string }) => n.customer;
  protected readonly pipeline = signal<
    MxKanbanColumn<{ id: number; customer: string; value: number }>[]
  >([
    {
      id: 'contact',
      title: 'Contact',
      items: [
        { id: 1, customer: 'Namibe Pescas', value: 1200 },
        { id: 2, customer: 'Uíge Café', value: 450 },
      ],
    },
    {
      id: 'proposal',
      title: 'Proposal',
      items: [{ id: 3, customer: 'Lobito Portos', value: 8900 }],
    },
    {
      id: 'negociacao',
      title: 'Negotiation',
      items: [{ id: 4, customer: 'Energia do Cuanza', value: 15400 }],
    },
    { id: 'won', title: 'Won', items: [] },
  ]);
  protected readonly pipelineTotal = computed(() =>
    this.usd(
      this.pipeline()
        .filter((c) => c.id !== 'won')
        .flatMap((c) => c.items)
        .reduce((a, n) => a + n.value, 0),
    ),
  );

  protected readonly logBoard = signal<MxKanbanColumn<Task>[]>([
    {
      id: 'a',
      title: 'To do',
      items: [
        { id: 1, title: 'Review prices' },
        { id: 2, title: 'New logo' },
      ],
    },
    { id: 'b', title: 'Done', items: [] },
  ]);
  protected readonly history = signal<string[]>([]);
  protected describe(m: MxKanbanMove<Task>): string {
    return `${m.item.title}: ${m.from} (${m.fromIndex + 1}) → ${m.to} (${m.toIndex + 1})`;
  }

  protected readonly undoBoard = signal<MxKanbanColumn<Task>[]>([
    {
      id: 'a',
      title: 'To do',
      items: [
        { id: 1, title: 'Request a quote' },
        { id: 2, title: 'Book a meeting' },
      ],
    },
    { id: 'b', title: 'In progress', items: [{ id: 3, title: 'Review stock' }] },
    { id: 'c', title: 'Done', items: [] },
  ]);
  protected readonly previousMoves = signal<MxKanbanMove<Task>[]>([]);
  protected undoLast(): void {
    const m = this.previousMoves()[this.previousMoves().length - 1];
    if (!m) return;
    this.undoBoard.update((cols) => {
      // take the card from where it landed and return it to where it came from
      const withoutCard = cols.map((c) =>
        c.id === m.to ? { ...c, items: c.items.filter((i) => i.id !== m.item.id) } : c,
      );
      return withoutCard.map((c) =>
        c.id === m.from
          ? {
              ...c,
              items: [...c.items.slice(0, m.fromIndex), m.item, ...c.items.slice(m.fromIndex)],
            }
          : c,
      );
    });
    this.previousMoves.update((h) => h.slice(0, -1));
  }

  protected readonly withActions = signal<MxKanbanColumn<Task>[]>([
    {
      id: 'open',
      title: 'Open',
      items: [
        { id: 1, title: 'Invoice without a tax ID' },
        { id: 2, title: 'Error exporting SAF-T' },
      ],
    },
    { id: 'resolved', title: 'Resolved', items: [{ id: 3, title: 'Change password' }] },
  ]);
  protected resolve(t: Task): void {
    this.withActions.update((cols) =>
      cols.map((c) =>
        c.id === 'resolved'
          ? { ...c, items: [t, ...c.items] }
          : { ...c, items: c.items.filter((i) => i.id !== t.id) },
      ),
    );
  }
  protected archive(t: Task): void {
    this.withActions.update((cols) =>
      cols.map((c) => ({ ...c, items: c.items.filter((i) => i.id !== t.id) })),
    );
  }

  protected readonly production = signal<MxKanbanColumn<Task>[]>([
    {
      id: 'queue',
      title: 'Queued',
      items: [
        { id: 1, title: 'Order 1041' },
        { id: 2, title: 'Order 1042' },
      ],
    },
    {
      id: 'production',
      title: 'In production',
      limit: 2,
      items: [
        { id: 3, title: 'Order 1038' },
        { id: 4, title: 'Order 1039' },
      ],
    },
    { id: 'delivered', title: 'Delivered', items: [] },
  ]);

  protected readonly previewCode = `<mx-kanban [(columns)]="board" aria-label="Team tasks" (moved)="save($event)">
  <ng-template mxKanbanCard let-task>
    <p>{{ task.title }}</p>
    <span mxBadge size="sm">{{ task.priority }}</span>
  </ng-template>
</mx-kanban>

board = signal<MxKanbanColumn<Task>[]>([
  { id: 'todo', title: 'To do', items: [...] },
  { id: 'doing', title: 'In progress', limit: 3, items: [...] },
]);`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'columns',
      type: 'MxKanbanColumn<T>[] (model)',
      description: '{ id, title, items, limit? }. Changes as you move.',
    },
    { kind: 'Input', name: 'itemKey', type: 'string | (item) => unknown', default: 'id' },
    {
      kind: 'Input',
      name: 'itemLabel',
      type: '(item) => string',
      description: 'Card name in announcements (and without a template).',
    },
    { kind: 'Input', name: 'aria-label', type: 'string', default: 'Board (from the language)' },
    {
      kind: 'Input',
      name: 'headingLevel',
      type: 'number',
      default: '3',
      description: 'Heading level of the column titles.',
    },
    { kind: 'Input', name: 'emptyText, helpText', type: 'string' },
    {
      kind: 'Output',
      name: 'moved',
      type: 'MxKanbanMove<T>',
      description: '{ item, from, to, fromIndex, toIndex }.',
    },
    {
      kind: 'Directiva',
      name: 'ng-template[mxKanbanCard]',
      type: 'let-item, let-column',
      description: 'Card content.',
    },
    {
      kind: 'Directiva',
      name: 'ng-template[mxKanbanColumnFooter]',
      type: 'let-column',
      description: 'End of each column.',
    },
  ];
}
