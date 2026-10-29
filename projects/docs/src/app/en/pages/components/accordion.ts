import { MxSwitch } from '@muxima-ui/core/switch';
import { MxChoice } from '@muxima-ui/core/form-field';
import { MxButton } from '@muxima-ui/core/button';
import { MxBadge } from '@muxima-ui/core/badge';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MX_ACCORDION } from '@muxima-ui/core/accordion';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-accordion-page',
  imports: [DOC_UI, MX_ACCORDION, MxBadge, MxButton, MxChoice, MxSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Accordion' }]"
        title="Accordion"
        lead="Sections that open and close, built on native details and summary. The keyboard, the announced state and the browser's find work without JavaScript."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Accordion example" align="start">
          <div mxAccordion class="w-full">
            @for (q of faq; track q.q; let first = $first) {
              <details mxAccordionItem [open]="first">
                <summary mxAccordionTrigger>{{ q.q }}</summary>
                <div mxAccordionContent>{{ q.a }}</div>
              </details>
            }
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MX_ACCORDION } from '@muxima-ui/core/accordion';" />
      </section>

      <section>
        <h2>States</h2>
        <p>Hover and focus are pinned here for comparison.</p>
        <doc-states>
          <doc-state name="Closed"><div mxAccordion class="w-full"><details mxAccordionItem><summary mxAccordionTrigger>Payments</summary><div mxAccordionContent>...</div></details></div></doc-state>
          <doc-state name="Hover"><div mxAccordion class="w-full"><details mxAccordionItem><summary mxAccordionTrigger data-mx-state="hover">Payments</summary><div mxAccordionContent>...</div></details></div></doc-state>
          <doc-state name="Focus"><div mxAccordion class="w-full"><details mxAccordionItem><summary mxAccordionTrigger data-mx-state="focus">Payments</summary><div mxAccordionContent>...</div></details></div></doc-state>
          <doc-state name="Open" note="open"><div mxAccordion class="w-full"><details mxAccordionItem open><summary mxAccordionTrigger>Payments</summary><div mxAccordionContent>By reference.</div></details></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Several open" note="multiple: each section opens and closes on its own.">
            <div mxAccordion multiple class="w-full">
              <details mxAccordionItem open><summary mxAccordionTrigger>Company details</summary><div mxAccordionContent>Tax ID, address and contacts.</div></details>
              <details mxAccordionItem open><summary mxAccordionTrigger>Billing</summary><div mxAccordionContent>Series, currency and payment terms.</div></details>
              <details mxAccordionItem><summary mxAccordionTrigger>Users</summary><div mxAccordionContent>Invitations and permissions.</div></details>
            </div>
          </doc-example>
          <doc-example title="Settings in a card">
            <section class="mx-card w-full" aria-labelledby="acc-def">
              <header class="mx-card-header"><h3 class="mx-card-title" id="acc-def">Account settings</h3></header>
              <div class="mx-card-content">
                <div mxAccordion multiple>
                  <details mxAccordionItem>
                    <summary mxAccordionTrigger>Notifications</summary>
                    <div mxAccordionContent class="stack-sm">
                      <label mxChoice><input type="checkbox" mxSwitch checked /> Daily summary</label>
                      <label mxChoice><input type="checkbox" mxSwitch /> SMS alerts</label>
                    </div>
                  </details>
                  <details mxAccordionItem>
                    <summary mxAccordionTrigger>Billing</summary>
                    <div mxAccordionContent>Series FT 2026, currency USD, 30-day terms.</div>
                  </details>
                </div>
              </div>
            </section>
          </doc-example>
          <doc-example title="With a count in the title">
            <div mxAccordion class="w-full">
              @for (g of groups; track g.name) {
                <details mxAccordionItem>
                  <summary mxAccordionTrigger>{{ g.name }} <span mxBadge size="sm" variant="secondary">{{ g.items.length }}</span></summary>
                  <ul mxAccordionContent class="acc-list">
                    @for (i of g.items; track i) {
                      <li>{{ i }}</li>
                    }
                  </ul>
                </details>
              }
            </div>
          </doc-example>
          <doc-example title="Open and controlled" [note]="open() ? 'The section is open.' : 'The section is closed.'">
            <div class="stack w-full">
              <div><button mxButton type="button" variant="outline" size="sm" (click)="open.set(!open())">{{ open() ? 'Close' : 'Open' }} from the app</button></div>
              <div mxAccordion>
                <details mxAccordionItem [open]="open()" (toggle)="open.set($any($event.target).open)">
                  <summary mxAccordionTrigger>Shipping details</summary>
                  <div mxAccordionContent>Kianda Transport, expected delivery on October 30.</div>
                </details>
              </div>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Moves through the section titles.' }, { key: 'Enter Space', action: 'Open or close the section.' }]"
          [aria]="[
            'summary is announced as a button with the expanded or collapsed state.',
            'By default only one section opens at a time, with the native name attribute.',
            'Ctrl+F finds text in closed sections and opens them.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Tabs' }, { name: 'Card' }, { name: 'Stepper' }]" />
      </section>
    </article>
  `,
})
export class AccordionPage {
  protected readonly open = signal(false);
  protected readonly groups = [
    { name: 'Pending', items: ['FT 2026/0143', 'FT 2026/0146'] },
    { name: 'Overdue', items: ['FT 2026/0144'] },
    { name: 'Paid', items: ['FT 2026/0142', 'FT 2026/0145', 'FT 2026/0141'] },
  ];

  protected readonly faq = [
    { q: 'How do I pay for the subscription?', a: 'By payment reference, bank transfer or Multicaixa Express. The invoice arrives by email.' },
    { q: 'Can I use Muxima UI in commercial projects?', a: 'Yes. The core is MIT; the Pro templates have their own license.' },
    { q: 'Which Angular versions are supported?', a: 'Angular 21 and 22.' },
  ];

  protected readonly previewCode = `<div mxAccordion>
  <details mxAccordionItem open>
    <summary mxAccordionTrigger>How do I pay for the subscription?</summary>
    <div mxAccordionContent>By payment reference, transfer or Multicaixa Express.</div>
  </details>
</div>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: '[mxAccordion]', type: 'multiple: boolean', default: 'false', description: 'With multiple, several sections can be open.' },
    { kind: 'Directiva', name: 'details[mxAccordionItem]', type: 'open', description: 'Native open attribute to start open.' },
    { kind: 'Directiva', name: 'summary[mxAccordionTrigger]', type: 'directive', description: 'Clickable title.' },
    { kind: 'Directiva', name: '[mxAccordionContent]', type: 'directive' },
  ];
}
