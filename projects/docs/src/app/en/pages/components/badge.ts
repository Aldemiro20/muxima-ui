import { Icon } from '../../../ui/icon';
import { MxButton } from '@muxima-ui/core/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MX_TABLE } from '@muxima-ui/core/table';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-badge-page',
  imports: [DOC_UI, MxBadge, MX_TABLE, MxButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Badge' }]"
        title="Badge"
        lead="A short label for states and categories: paid, pending, overdue. It applies to any text element and has six variants."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Badge example">
          <span mxBadge>New</span>
          <span mxBadge variant="secondary">Draft</span>
          <span mxBadge variant="outline">Internal</span>
          <span mxBadge variant="success">Paid</span>
          <span mxBadge variant="warning">Pending</span>
          <span mxBadge variant="danger">Overdue</span>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxBadge } from '@muxima-ui/core/badge';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>Small text in a box with the same radius as the controls.</p>
        <doc-structure [labels]="{ topLeft: '12 px text', topRight: 'Weight 500', bottomLeft: '4 px radius', bottomRight: '20 px tall', bottom: 'Background at 10% of the state color' }">
          <span mxBadge variant="success">Paid</span>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>The badge isn't interactive: its states are its meaning variants.</p>
        <doc-states>
          <doc-state name="Default"><span mxBadge>New</span></doc-state>
          <doc-state name="Secondary"><span mxBadge variant="secondary">Draft</span></doc-state>
          <doc-state name="Outline"><span mxBadge variant="outline">Internal</span></doc-state>
          <doc-state name="Success"><span mxBadge variant="success">Paid</span></doc-state>
          <doc-state name="Warning"><span mxBadge variant="warning">Pending</span></doc-state>
          <doc-state name="Danger"><span mxBadge variant="danger">Overdue</span></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="In a table">
            <div class="mx-table-container w-full">
              <table mxTable density="compact">
                <thead><tr><th scope="col">Invoice</th><th scope="col">Status</th></tr></thead>
                <tbody>
                  <tr><td>FT 2026/0142</td><td><span mxBadge variant="success">Paid</span></td></tr>
                  <tr><td>FT 2026/0143</td><td><span mxBadge variant="warning">Pending</span></td></tr>
                  <tr><td>FT 2026/0144</td><td><span mxBadge variant="danger">Overdue</span></td></tr>
                </tbody>
              </table>
            </div>
          </doc-example>
          <doc-example title="Sizes" note="18, 20 and 24 px.">
            <span mxBadge variant="secondary" size="sm">Small</span>
            <span mxBadge variant="secondary">Medium</span>
            <span mxBadge variant="secondary" size="lg">Large</span>
          </doc-example>
          <doc-example title="With a dot" note="dot: a colored dot before the text, good for status lists.">
            <span mxBadge dot variant="success">Online</span>
            <span mxBadge dot variant="warning">Away</span>
            <span mxBadge dot variant="danger">Busy</span>
            <span mxBadge dot variant="outline">Offline</span>
          </doc-example>
          <doc-example title="With an icon">
            <span mxBadge variant="success"><doc-icon name="check" [size]="12" /> Verified</span>
            <span mxBadge variant="secondary"><doc-icon name="lock" [size]="12" /> Private</span>
            <span mxBadge variant="outline"><doc-icon name="sparkle" [size]="12" /> New</span>
          </doc-example>
          <doc-example title="In buttons and headings" note="The number is part of the button's accessible name.">
            <div class="stack">
              <h3 class="inline-heading">Invoices <span mxBadge variant="secondary">142</span></h3>
              <div class="row-inline">
                <button mxButton type="button" variant="outline" size="sm">Pending <span mxBadge size="sm" variant="warning">9</span></button>
                <button mxButton type="button" variant="outline" size="sm">Overdue <span mxBadge size="sm" variant="danger">3</span></button>
              </div>
            </div>
          </doc-example>
          <doc-example title="Category labels">
            <div class="row-wrap">
              @for (t of tags; track t) {
                <span mxBadge variant="outline">{{ t }}</span>
              }
            </div>
          </doc-example>
        </div>
        <doc-callout>Color helps, but the text must state the status on its own: some people can't tell colors apart.</doc-callout>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Does not receive focus: it is just text.' }]"
          [aria]="[
            'It is read as normal text, where it appears.',
            'The text of each variant has AA contrast in both modes.',
            'For a count that changes (e.g. new messages), announce the change with aria-live on another element.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>[mxBadge]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Table' }, { name: 'Alert' }, { name: 'Avatar' }]" />
      </section>
    </article>
  `,
})
export class BadgePage {
  protected readonly tags = ['Logistics', 'Banking', 'Agriculture', 'Energy', 'Insurance', 'Fisheries'];

  protected readonly previewCode = `<span mxBadge>New</span>
<span mxBadge variant="secondary">Draft</span>
<span mxBadge variant="outline">Internal</span>
<span mxBadge variant="success">Paid</span>
<span mxBadge variant="warning">Pending</span>
<span mxBadge variant="danger">Overdue</span>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'variant', type: "'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger'", default: 'default' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '18, 20 or 24 px.' },
    { kind: 'Token CSS', name: '--mx-success', type: 'color', default: '#17663F' },
    { kind: 'Token CSS', name: '--mx-warning', type: 'color', default: '#93460A' },
    { kind: 'Token CSS', name: '--mx-danger', type: 'color', default: '#B42318' },
  ];
}
