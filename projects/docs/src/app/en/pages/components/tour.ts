import { ChangeDetectionStrategy, Component, ElementRef, TemplateRef, inject, signal, viewChild } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxInput } from '@muxima-ui/core/form-field';
import { MxTab, MxTabs } from '@muxima-ui/core/tabs';
import { MxTour, MxTourAnchor, MxTourStepContext } from '@muxima-ui/core/tour';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-tour-page',
  imports: [DOC_UI, MxTourAnchor, MxButton, MxInput, MxBadge, MxTabs, MxTab],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Tour guide' }]"
        title="Tour guide"
        lead="A guided tour to introduce a screen: it highlights one element at a time and explains it in a card with Back, Next and Skip. It works with the keyboard and screen readers, and at the end focus returns to where it was."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Tour guide example">
          <div class="tour-demo w-full">
            <div class="tour-bar">
              <input
                mxInput
                size="sm"
                type="search"
                class="tour-search"
                placeholder="Search customers and invoices"
                aria-label="Search"
                mxTourAnchor="demo-pesquisa"
              />
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="demo-filtros">
                Filters
              </button>
              <button mxButton size="sm" type="button" mxTourAnchor="demo-nova">New invoice</button>
            </div>
            <div class="tour-stats" mxTourAnchor="demo-resumo">
              <div><span class="muted small">To be received</span><strong>$4,820</strong></div>
              <div><span class="muted small">Overdue</span><strong>3 invoices</strong></div>
            </div>
            <button mxButton variant="ghost" size="sm" type="button" (click)="mainTour()">
              Start the tour
            </button>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxTour, MxTourAnchor } from '@muxima-ui/core/tour';" />
        <doc-callout
          >mxTourAnchor gives an element a name; MxTour.start() takes the steps. A step without a
          target appears in the center of the screen, good for a welcome.</doc-callout
        >
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          The step's element is highlighted with an outline, the rest of the screen dims, and the
          card appears next to it, wherever there's room.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Progress (Step 2 of 4)',
            topRight: 'Close',
            bottomLeft: 'Progress dots',
            bottomRight: 'Skip, Back, Next',
            bottom: 'role=dialog, aria-modal=true',
          }"
        >
          <div class="mx-tour-card tour-static" aria-hidden="true">
            <div class="mx-tour-head">
              <p class="mx-tour-progress">Step 2 of 4</p>
            </div>
            <p class="mx-tour-title">Filters</p>
            <div class="mx-tour-body"><p>Shows only the invoices you care about.</p></div>
            <div class="mx-tour-foot">
              <span class="mx-tour-dots"
                ><span class="mx-tour-dot"></span><span class="mx-tour-dot" data-active></span
                ><span class="mx-tour-dot"></span><span class="mx-tour-dot"></span
              ></span>
              <span class="mx-tour-actions">
                <span class="tour-fake-btn">Skip</span>
                <span class="tour-fake-btn primary">Next</span>
              </span>
            </div>
          </div>
        </doc-structure>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="Rich content"
            note="template instead of content: lists, shortcuts or an image inside the step."
          >
            <div class="row-wrap">
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="rico-atalhos">
                Shortcuts
              </button>
              <button mxButton size="sm" type="button" (click)="richTour()">See the tour</button>
            </div>
            <ng-template #shortcutsStep>
              <p>Use the keyboard to go faster:</p>
              <ul class="tour-keys">
                <li><kbd>Ctrl</kbd> + <kbd>K</kbd> search</li>
                <li><kbd>N</kbd> new invoice</li>
                <li><kbd>?</kbd> this help</li>
              </ul>
            </ng-template>
          </doc-example>

          <doc-example
            title="Switching tabs"
            note="beforeShow opens the right tab before highlighting what's inside it."
          >
            <div class="stack w-full">
              <mx-tabs [(selectedIndex)]="tab" aria-label="Settings" class="w-full">
                <mx-tab label="Profile">
                  <p class="tab-copy" mxTourAnchor="sep-perfil">Name, photo and contacts.</p>
                </mx-tab>
                <mx-tab label="Security">
                  <p class="tab-copy" mxTourAnchor="sep-seguranca">
                    Password and two-step verification.
                  </p>
                </mx-tab>
                <mx-tab label="Billing">
                  <p class="tab-copy" mxTourAnchor="sep-facturacao">Plan and payment method.</p>
                </mx-tab>
              </mx-tabs>
              <div>
                <button mxButton size="sm" type="button" (click)="tourTabs()">
                  See the tour
                </button>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Show only once"
            [note]="
              seen()
                ? 'Saved: you have seen the tour. Reset clears the mark.'
                : 'afterClosed says whether it reached the end; that is when you save that it was seen.'
            "
          >
            <div class="row-wrap">
              <span mxBadge [variant]="seen() ? 'success' : 'secondary'" mxTourAnchor="uma-estado">{{
                seen() ? 'Seen' : 'Not seen'
              }}</span>
              @if (seen()) {
                <button mxButton size="sm" variant="outline" type="button" (click)="resetSeen()">
                  Reset
                </button>
              } @else {
                <button mxButton size="sm" type="button" (click)="tourOnce()">
                  See the tour
                </button>
              }
            </div>
          </doc-example>

          <doc-example
            title="Resume where it stopped"
            [note]="
              stoppedAt() !== null
                ? 'You skipped at step ' + (stoppedAt()! + 1) + '. startAt continues from there.'
                : 'Skip halfway and then continue.'
            "
          >
            <div class="row-wrap">
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="ret-a">
                Customers
              </button>
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="ret-b">
                Invoices
              </button>
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="ret-c">
                Reports
              </button>
              <button mxButton size="sm" type="button" (click)="tourResume()">
                {{ stoppedAt() !== null ? 'Continue' : 'See the tour' }}
              </button>
            </div>
          </doc-example>

          <doc-example
            title="Card position"
            note="placement: top, bottom, start or end; if it doesn't fit, it picks another side."
          >
            <div class="row-wrap">
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="pos-a">
                Above
              </button>
              <button mxButton size="sm" variant="outline" type="button" mxTourAnchor="pos-b">
                Beside
              </button>
              <button mxButton size="sm" type="button" (click)="tourPlacements()">See the tour</button>
            </div>
          </doc-example>

          <doc-example
            title="No skipping, and in another language"
            note="dismissible: false removes Skip, Close and Escape; labels changes the texts."
          >
            <div class="row-wrap">
              <span class="muted small" mxTourAnchor="en-termos">Termos de utilização</span>
              <button mxButton size="sm" type="button" (click)="tourInPortuguese()">Começar a visita</button>
            </div>
          </doc-example>

          <doc-example
            title="Target by reference"
            note="target accepts a name, a CSS selector, an element or an ElementRef."
          >
            <div class="row-wrap">
              <button #helpRef mxButton size="sm" variant="outline" type="button">Help</button>
              <button mxButton size="sm" type="button" (click)="tourByReference()">See the tour</button>
            </div>
          </doc-example>

          <doc-example
            title="Result"
            [note]="result() || 'afterClosed returns { completed, index }.'"
          >
            <div class="row-wrap">
              <span class="muted small" mxTourAnchor="res-a">First step</span>
              <span class="muted small" mxTourAnchor="res-b">Second step</span>
              <button mxButton size="sm" type="button" (click)="tourResult()">See the tour</button>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Moves through the buttons of the card; focus does not leave it.' },
            { key: '→ ←', action: 'Next and previous step.' },
            { key: 'Enter Space', action: 'Activate the focused button.' },
            { key: 'Esc', action: 'Closes the tour (except with dismissible: false).' },
          ]"
          [aria]="[
            'The card is role=dialog with aria-modal=true, named by the title and described by the progress and text.',
            'On each step focus goes to the card: screen readers read the title, Step 2 of 4 and the text.',
            'On close, focus returns to the element that had it before (the button that started the tour).',
            'An element off screen is scrolled into view; with reduced motion, without animation.',
            'In high contrast, the highlight is an outline in the system color.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Popover' }, { name: 'Dialog' }, { name: 'Stepper' }]" />
      </section>
    </article>
  `,
})
export class TourPage {
  private readonly tour = inject(MxTour);

  protected mainTour(): void {
    this.tour.start([
      {
        title: 'Welcome to invoices',
        content: 'In four steps we show the essentials of this screen.',
      },
      {
        target: 'demo-pesquisa',
        title: 'Search',
        content: 'Search by customer, number or amount.',
      },
      {
        target: 'demo-filtros',
        title: 'Filters',
        content: 'Shows only the invoices you care about.',
      },
      {
        target: 'demo-nova',
        title: 'New invoice',
        content: 'Start here. The customer details fill in automatically.',
      },
      {
        target: 'demo-resumo',
        title: 'Summary',
        content: 'What you\'re owed and what\'s overdue.',
      },
    ]);
  }

  private readonly shortcutsStep = viewChild.required<TemplateRef<MxTourStepContext>>('shortcutsStep');
  protected richTour(): void {
    this.tour.start([
      { target: 'rico-atalhos', title: 'Keyboard shortcuts', template: this.shortcutsStep() },
    ]);
  }

  protected readonly tab = signal(0);
  protected tourTabs(): void {
    this.tour.start([
      {
        target: 'sep-perfil',
        title: 'Profile',
        content: 'How others see you.',
        beforeShow: () => this.tab.set(0),
      },
      {
        target: 'sep-seguranca',
        title: 'Security',
        content: 'Turn on two-step verification.',
        beforeShow: () => this.tab.set(1),
      },
      {
        target: 'sep-facturacao',
        title: 'Billing',
        content: 'Change plans whenever you like.',
        beforeShow: () => this.tab.set(2),
      },
    ]);
  }

  protected readonly seen = signal(readSeen());
  protected tourOnce(): void {
    this.tour
      .start([
        { title: 'New', content: 'You can now send invoices by WhatsApp.' },
        { target: 'uma-estado', title: 'Status', content: 'At the end, this changes to Seen.' },
      ])
      .afterClosed.then((r) => {
        if (r.completed) {
          saveSeen(true);
          this.seen.set(true);
        }
      });
  }
  protected resetSeen(): void {
    saveSeen(false);
    this.seen.set(false);
  }

  protected readonly stoppedAt = signal<number | null>(null);
  protected tourResume(): void {
    this.tour
      .start(
        [
          { target: 'ret-a', title: 'Customers', content: 'The list of all customers.' },
          { target: 'ret-b', title: 'Invoices', content: 'Issued, paid and unpaid.' },
          { target: 'ret-c', title: 'Reports', content: 'VAT, sales and collections.' },
        ],
        { startAt: this.stoppedAt() ?? 0 },
      )
      .afterClosed.then((r) => this.stoppedAt.set(r.completed ? null : r.index));
  }

  protected tourPlacements(): void {
    this.tour.start([
      { target: 'pos-a', title: 'Above', content: 'placement: top', placement: 'top' },
      { target: 'pos-b', title: 'Beside', content: 'placement: end', placement: 'end' },
    ]);
  }

  protected tourInPortuguese(): void {
    this.tour.start(
      [
        { title: 'Bem-vindo', content: 'Dois passos rápidos antes de começares.' },
        { target: 'en-termos', title: 'Termos', content: 'Lê os termos de utilização.' },
      ],
      {
        dismissible: false,
        labels: {
          next: 'Seguinte',
          previous: 'Anterior',
          done: 'Percebi',
          progress: (current, total) => `Passo ${current} de ${total}`,
        },
      },
    );
  }

  private readonly helpRef = viewChild.required('helpRef', { read: ElementRef });
  protected tourByReference(): void {
    this.tour.start([
      { target: this.helpRef(), title: 'Help', content: 'This target came from a viewChild.' },
    ]);
  }

  protected readonly result = signal('');
  protected tourResult(): void {
    this.tour
      .start([
        { target: 'res-a', title: 'One', content: 'First step.' },
        { target: 'res-b', title: 'Two', content: 'Second step.' },
      ])
      .afterClosed.then((r) =>
        this.result.set(
          r.completed ? 'Completed.' : `Closed at step ${r.index + 1}, not completed.`,
        ),
      );
  }

  protected readonly previewCode = `<input mxInput aria-label="Search" mxTourAnchor="search" />
<button mxButton mxTourAnchor="new">New invoice</button>
<button mxButton variant="ghost" (click)="startTour()">Start the tour</button>

private readonly tour = inject(MxTour);
startTour() {
  this.tour.start([
    { title: 'Welcome to invoices', content: 'In two steps we show the essentials.' },
    { target: 'search', title: 'Search', content: 'Search by customer, number or amount.' },
    { target: 'new', title: 'New invoice', content: 'Start here.' },
  ]);
}`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Método',
      name: 'MxTour.start(steps, options?)',
      type: 'MxTourRef',
      description: 'Starts the tour; closes any open one.',
    },
    {
      kind: 'Propriedade',
      name: 'MxTour.active()',
      type: 'MxTourRef | null',
      description: 'The tour in progress.',
    },
    {
      kind: 'Directiva',
      name: '[mxTourAnchor]',
      type: 'string',
      description: 'Gives an element a name to use in target.',
    },
    {
      kind: 'Input',
      name: 'MxTourStep',
      type: 'target, title, content, template, placement, padding, beforeShow',
      description: 'Without a target, the card sits in the center.',
    },
    {
      kind: 'Input',
      name: 'MxTourOptions',
      type: 'startAt, labels, dismissible, showDots',
    },
    {
      kind: 'Método',
      name: 'MxTourRef: next(), previous(), goTo(i), close(completed?)',
      type: 'void',
    },
    {
      kind: 'Propriedade',
      name: 'MxTourRef.index, afterClosed',
      type: 'Signal<number>, Promise<MxTourResult>',
      description: 'MxTourResult = { completed, index }.',
    },
  ];
}

const KEY = 'muxima-docs-tour-vista';
function readSeen(): boolean {
  try {
    return localStorage.getItem(KEY) === '1';
  } catch {
    return false;
  }
}
function saveSeen(v: boolean): void {
  try {
    if (v) localStorage.setItem(KEY, '1');
    else localStorage.removeItem(KEY);
  } catch {
    // no storage: the tour shows up again, which is fine
  }
}
