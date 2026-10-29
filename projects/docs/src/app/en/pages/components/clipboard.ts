import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxCopy, MxCopyButton } from '@muxima-ui/core/clipboard';
import { MxFormField, MxHint, MxInput, MxInputGroup, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';
import { MxToast } from '@muxima-ui/core/toast';

@Component({
  selector: 'doc-clipboard-page',
  imports: [
    DOC_UI,
    MxCopy,
    MxCopyButton,
    MxButton,
    MxFormField,
    MxLabel,
    MxHint,
    MxInput,
    MxInputGroup,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Copy to clipboard' }]"
        title="Copy to clipboard"
        lead="Copy a value with one click: IBAN, payment reference, API key. The mxCopy directive works on any button; mxCopyButton is the ready-made icon button."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Copy example">
          <mx-form-field class="w-320">
            <label mxLabel>IBAN</label>
            <div mxInputGroup>
              <input mxInput readonly [value]="iban" />
              <button mxCopyButton [value]="iban" label="Copy IBAN"></button>
            </div>
            <mx-hint>Banco Mutamba, checking account.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxCopy, MxCopyButton } from '@muxima-ui/core/clipboard';" />
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Default"
            ><button mxCopyButton value="x" label="Copy"></button
          ></doc-state>
          <doc-state name="Hover"
            ><button mxCopyButton value="x" label="Copy" data-mx-state="hover"></button
          ></doc-state>
          <doc-state name="Focus"
            ><button mxCopyButton value="x" label="Copy" data-mx-state="focus"></button
          ></doc-state>
          <doc-state name="Copied" note="For 2 s after the click: try it."
            ><button mxCopyButton value="x" label="Copy">Copy</button></doc-state
          >
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="On any button"
            note="mxCopy gives the button data-copied for 2 s; #c=mxCopy reads the state."
          >
            <button mxButton variant="outline" [mxCopy]="reference" #c="mxCopy">
              {{ c.copied() ? 'Copied' : 'Copy reference' }}
            </button>
          </doc-example>
          <doc-example title="API key" note="Button with icon and text.">
            <div class="copy-row">
              <code class="copy-code">{{ apiKey }}</code>
              <button mxCopyButton [value]="apiKey" label="Copy API key" size="sm">
                Copy
              </button>
            </div>
          </doc-example>
          <doc-example
            title="Payment details"
            note="One row per value; each button's name says what it copies."
          >
            <dl class="copy-list">
              @for (d of payment; track d.name) {
                <div>
                  <dt>{{ d.name }}</dt>
                  <dd>
                    <span>{{ d.value }}</span
                    ><button
                      mxCopyButton
                      size="sm"
                      [value]="d.value"
                      [label]="'Copy ' + d.name"
                    ></button>
                  </dd>
                </div>
              }
            </dl>
          </doc-example>
          <doc-example title="Share link" note="In an input group with the button at the end.">
            <mx-form-field class="w-full">
              <label mxLabel>Invoice link</label>
              <div mxInputGroup>
                <input mxInput readonly [value]="link" />
                <button mxCopyButton [value]="link" label="Copy link"></button>
              </div>
            </mx-form-field>
          </doc-example>
          <doc-example
            title="Invite code"
            note="(mxCopied) shows a toast; if the browser refuses, the code stays visible."
          >
            <div class="invite">
              <span class="invite-code">{{ invite }}</span>
              <button mxButton type="button" [mxCopy]="invite" (mxCopied)="copied($event)">
                Copy code
              </button>
            </div>
          </doc-example>
          <doc-example
            title="Code block"
            note="The button sits in the corner, outside the selectable text."
          >
            <div class="code-copy w-full">
              <pre tabindex="0"><code>{{ command }}</code></pre>
              <button mxCopyButton size="sm" [value]="command" label="Copy command"></button>
            </div>
          </doc-example>
          <doc-example
            title="Copy a table to Excel"
            note="Copies with tabs: it pastes straight into a spreadsheet."
          >
            <div class="stack w-full">
              <div class="mx-table-container">
                <table class="mx-table" data-density="compact">
                  <caption class="mx-visually-hidden">
                    Month summary
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Status</th>
                      <th scope="col" data-align="end">Invoices</th>
                      <th scope="col" data-align="end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (l of monthSummary; track l[0]) {
                      <tr>
                        <td>{{ l[0] }}</td>
                        <td data-align="end">{{ l[1] }}</td>
                        <td data-align="end">{{ l[2] }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
              <div>
                <button
                  mxButton
                  type="button"
                  variant="outline"
                  size="sm"
                  [mxCopy]="summaryTsv"
                  mxCopyMessage="Table copied"
                  #t="mxCopy"
                >
                  {{ t.copied() ? 'Table copied' : 'Copy table' }}
                </button>
              </div>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Enter Space', action: 'Copy (they are buttons).' }]"
          [aria]="[
            'Copied is announced to screen readers, without moving focus.',
            'The icon button has a name (label) and changes to Copied for 2 s.',
            'If the browser refuses, Could not copy is announced; the value stays visible to select.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Button' }, { name: 'Input' }, { name: 'Toast' }]" />
      </section>
    </article>
  `,
})
export class ClipboardPage {
  protected readonly iban = 'AO06 0040 0000 1234 5678 9012 3';
  protected readonly reference = '231 456 789';
  protected readonly apiKey = 'mx_test_4f9a2c7e1b';
  protected readonly link = 'https://kianda.ao/f/FT-2026-0142';
  protected readonly payment = [
    { name: 'Entity', value: '00123' },
    { name: 'Reference', value: '231 456 789' },
    { name: 'Amount', value: '120,000.00 Kz' },
  ];

  private readonly toast = inject(MxToast);
  protected readonly invite = 'KIANDA-7Q4M';
  protected copied(ok: boolean): void {
    if (ok)
      this.toast.success('Code copied', { description: 'Send it to whoever you want to invite.' });
    else
      this.toast.error('Could not copy', {
        description: 'Select the code and copy it by hand.',
      });
  }
  protected readonly command = 'npm install @muxima-ui/core @angular/cdk';
  protected readonly monthSummary = [
    ['Paid', '32', '58 400 000,00 Kz'],
    ['Pending', '16', '45 400 000,00 Kz'],
    ['Overdue', '8', '20 100 000,00 Kz'],
  ];
  protected readonly summaryTsv = [['Status', 'Invoices', 'Amount'], ...this.monthSummary]
    .map((l) => l.join('\t'))
    .join('\n');

  protected readonly previewCode = `<div mxInputGroup>
  <input mxInput readonly [value]="iban" />
  <button mxCopyButton [value]="iban" label="Copy IBAN"></button>
</div>

<button mxButton variant="outline" [mxCopy]="reference">Copy reference</button>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Directiva',
      name: '[mxCopy]',
      type: 'string',
      description: 'Text to copy when the element is clicked.',
    },
    {
      kind: 'Input',
      name: 'mxCopyMessage',
      type: 'string',
      default: 'Copied',
      description: 'Announced message.',
    },
    {
      kind: 'Output',
      name: 'mxCopied',
      type: 'boolean',
      description: 'true if it copied, false if the browser refused.',
    },
    {
      kind: 'Propriedade',
      name: 'copied()',
      type: 'signal<boolean>',
      description: 'true for 2 s (exportAs mxCopy).',
    },
    {
      kind: 'Componente',
      name: 'button[mxCopyButton]',
      type: 'value, label, copiedLabel, size',
      description: 'Ready-made icon button.',
    },
  ];
}
