import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxProgress, MxSpinner } from '@muxima-ui/core/progress';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-progress-page',
  imports: [DOC_UI, MxProgress, MxSpinner, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Progress' }]"
        title="Progress"
        lead="A bar on top of the native progress, determinate or indeterminate, and a spinner for short waits."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Progress example">
          <div class="stack w-320">
            <label for="prev-envio" class="small-label">Sending invoices: 64%</label>
            <progress id="prev-envio" mxProgress value="64" max="100">64%</progress>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxProgress, MxSpinner } from '@muxima-ui/core/progress';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>Rounded bar with the completed part in Kwanza. The name comes from a label or aria-label.</p>
        <doc-structure [labels]="{ topLeft: 'Label (for)', topRight: 'Value in %', bottomLeft: 'Stone track', bottomRight: '8 px tall', bottom: 'No value: indeterminate' }">
          <progress mxProgress value="60" max="100" aria-label="Example" class="w-180"></progress>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>Progress isn't interactive. The states are the task's progress.</p>
        <doc-states>
          <doc-state name="Not started" note="value=0"><progress mxProgress value="0" max="100" aria-label="Not started"></progress></doc-state>
          <doc-state name="In progress"><progress mxProgress value="45" max="100" aria-label="In progress"></progress></doc-state>
          <doc-state name="Done"><progress mxProgress value="100" max="100" aria-label="Done"></progress></doc-state>
          <doc-state name="Indeterminate" note="No value."><progress mxProgress aria-label="Indeterminate"></progress></doc-state>
          <doc-state name="Spinner" note="role=status"><span mxSpinner size="sm"></span><span mxSpinner></span><span mxSpinner size="lg"></span></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Upload with progress" note="The text follows the bar, for those who can't see it.">
            <div class="stack">
              <div><button mxButton type="button" variant="outline" size="sm" (click)="start()" [disabled]="value() > 0 && value() < 100">Send 30 invoices</button></div>
              <label for="ex-envio" class="small-label">{{ value() >= 100 ? 'Done' : 'Sent ' + sent() + ' of 30' }}</label>
              <progress id="ex-envio" mxProgress [value]="value()" max="100"></progress>
            </div>
          </doc-example>
          <doc-example title="Sizes" note="4, 8 and 12 px.">
            <div class="stack">
              <progress mxProgress size="sm" value="30" max="100" aria-label="Small"></progress>
              <progress mxProgress value="50" max="100" aria-label="Medium"></progress>
              <progress mxProgress size="lg" value="70" max="100" aria-label="Large"></progress>
            </div>
          </doc-example>
          <doc-example title="Several files" note="One bar per file, with the name in the label.">
            <ul class="upload-list w-full">
              @for (f of files; track f.name) {
                <li>
                  <div class="row-between"><label [for]="'up-' + $index">{{ f.name }}</label><span class="small-label">{{ f.value === 100 ? 'Done' : f.value + '%' }}</span></div>
                  <progress [id]="'up-' + $index" mxProgress size="sm" [value]="f.value" max="100"></progress>
                </li>
              }
            </ul>
          </doc-example>
          <doc-example title="Indeterminate with text" note="When you don't know how much is left.">
            <div class="stack w-full">
              <label for="prog-sync" class="small-label">Syncing with the tax authority...</label>
              <progress id="prog-sync" mxProgress></progress>
            </div>
          </doc-example>
          <doc-example title="Spinner while a page loads">
            <div class="spinner-block w-full">
              <span mxSpinner size="lg" label="Loading invoices"></span>
              <span class="small-label" aria-hidden="true">Loading invoices...</span>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Does not receive focus.' }]"
          [aria]="[
            'native progress: screen readers announce the percentage.',
            'Always give it a name: a label with for, or aria-label.',
            'The spinner has role=status and the name Loading, which you can change with label.',
            'Inside a button, use loading on the button, not the spinner.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selectors: <code>progress[mxProgress]</code>, <code>[mxSpinner]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Skeleton' }, { name: 'Button' }, { name: 'Toast' }]" />
      </section>
    </article>
  `,
})
export class ProgressPage {
  protected readonly files = [
    { name: 'invoices-october.pdf', value: 100 },
    { name: 'bank-statement.xlsx', value: 64 },
    { name: 'contracts.zip', value: 12 },
  ];

  protected readonly value = signal(0);
  protected readonly sent = signal(0);

  protected start(): void {
    this.value.set(0);
    this.sent.set(0);
    const tick = setInterval(() => {
      this.sent.update((n) => n + 3);
      this.value.set(Math.round((this.sent() / 30) * 100));
      if (this.sent() >= 30) clearInterval(tick);
    }, 250);
  }

  protected readonly previewCode = `<label for="upload">Sending invoices: 64%</label>
<progress id="upload" mxProgress value="64" max="100">64%</progress>

<span mxSpinner></span>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'mxProgress: 4, 8 or 12 px. mxSpinner: 14, 20 or 28 px.' },
    { kind: 'Input', name: 'label', type: 'string', default: 'Loading', description: 'mxSpinner: accessible name.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', description: 'Color of the completed part and the spinner.' },
  ];
}
