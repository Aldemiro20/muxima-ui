import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxTooltip } from '@muxima-ui/core/tooltip';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';
import { Icon } from '../../../ui/icon';

@Component({
  selector: 'doc-tooltip-page',
  imports: [DOC_UI, MxTooltip, MxButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Tooltip' }]"
        title="Tooltip"
        lead="Short text that appears on hover or keyboard focus. It's linked to the element by aria-describedby and closes with Escape."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Tooltip example">
          <button mxButton type="button" variant="outline" icon aria-label="Copy" mxTooltip="Copy to clipboard"><doc-icon name="copy" /></button>
          <button mxButton type="button" variant="outline" mxTooltip="Sends the 9 pending invoices by email" mxTooltipPosition="bottom">Send pending</button>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxTooltip } from '@muxima-ui/core/tooltip';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>A dark box with 12 px text, 6 px from the element. It switches sides if it doesn't fit.</p>
        <doc-structure [labels]="{ topLeft: '12 px text', topRight: 'Max. 260 px', bottomLeft: 'Ink background', bottomRight: '6 px from the element', bottom: 'role=tooltip, linked by aria-describedby' }">
          <span class="mx-tooltip">Copy to clipboard</span>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>The tooltip has only two states: hidden and visible. What changes is what opens it.</p>
        <doc-states>
          <doc-state name="Hidden"><button mxButton type="button" variant="outline" size="sm">Export</button></doc-state>
          <doc-state name="Hover" note="Appears after 400 ms."><span class="mx-tooltip">Exports to CSV</span></doc-state>
          <doc-state name="Focus" note="Appears right away, with the keyboard."><span class="mx-tooltip">Exports to CSV</span></doc-state>
          <doc-state name="Disabled" note="mxTooltipDisabled"><button mxButton type="button" variant="outline" size="sm">Export</button></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Positions">
            <button mxButton type="button" variant="outline" size="sm" mxTooltip="Top">Top</button>
            <button mxButton type="button" variant="outline" size="sm" mxTooltip="Bottom" mxTooltipPosition="bottom">Bottom</button>
            <button mxButton type="button" variant="outline" size="sm" mxTooltip="Left" mxTooltipPosition="left">Left</button>
            <button mxButton type="button" variant="outline" size="sm" mxTooltip="Right" mxTooltipPosition="right">Right</button>
          </doc-example>
          <doc-example title="Icon-only buttons" note="aria-label gives the name; the tooltip shows it to sighted users.">
            <button mxButton type="button" variant="ghost" icon aria-label="Edit" mxTooltip="Edit"><doc-icon name="file" /></button>
            <button mxButton type="button" variant="ghost" icon aria-label="Search" mxTooltip="Search"><doc-icon name="search" /></button>
            <button mxButton type="button" variant="ghost" icon aria-label="Settings" mxTooltip="Settings"><doc-icon name="sliders" /></button>
          </doc-example>
          <doc-example title="On abbreviated text" note="The element receives focus (tabindex=0) so the tooltip also appears with the keyboard.">
            <p class="tooltip-text">Amount subject to <abbr tabindex="0" mxTooltip="Value Added Tax, 14%">VAT</abbr> and <abbr tabindex="0" mxTooltip="Tax Identification Number">TIN</abbr> required.</p>
          </doc-example>
          <doc-example title="Keyboard shortcut">
            <button mxButton type="button" variant="outline" mxTooltip="Save (Ctrl + S)">Save</button>
            <button mxButton type="button" variant="outline" mxTooltip="Search (Ctrl + K)">Search</button>
          </doc-example>
          <doc-example title="On a disabled button" note="A disabled button doesn't receive focus: wrap it in a focusable element and explain why.">
            <span tabindex="0" class="tooltip-wrap" mxTooltip="Only the administrator can delete the account.">
              <button mxButton type="button" variant="destructive" disabled>Delete account</button>
            </span>
          </doc-example>
          <doc-example title="Hover delay" note="mxTooltipShowDelay in ms; with the keyboard it always appears immediately.">
            <button mxButton type="button" variant="outline" size="sm" mxTooltip="Appears right away" [mxTooltipShowDelay]="0">No delay</button>
            <button mxButton type="button" variant="outline" size="sm" mxTooltip="Appears after 1 second" [mxTooltipShowDelay]="1000">1 second</button>
          </doc-example>
        </div>
        <doc-callout>Don't put information in a tooltip that doesn't exist anywhere else: touch screens have no hover. For content with links or buttons, use a Popover.</doc-callout>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Focuses the element and shows the tooltip.' }, { key: 'Esc', action: 'Hides the tooltip without moving focus.' }]"
          [aria]="[
            'role=tooltip, linked to the element by aria-describedby while visible.',
            'You can move the pointer onto the tooltip without it closing (WCAG 1.4.13).',
            'Does not receive focus or contain interactive elements.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>[mxTooltip]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Popover' }, { name: 'Button' }, { name: 'Dropdown menu' }]" />
      </section>
    </article>
  `,
})
export class TooltipPage {
  protected readonly previewCode = `<button mxButton icon variant="outline" aria-label="Copy"
        mxTooltip="Copy to clipboard">
  <svg>...</svg>
</button>
<button mxButton variant="outline" mxTooltip="Sends the 9 pending invoices by email"
        mxTooltipPosition="bottom">Send pending</button>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'mxTooltip', type: 'string', description: 'Tooltip text.' },
    { kind: 'Input', name: 'mxTooltipPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: 'top' },
    { kind: 'Input', name: 'mxTooltipDisabled', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'mxTooltipShowDelay', type: 'number', default: '400', description: 'Hover delay, in ms.' },
    { kind: 'Método', name: 'show(), hide()', type: 'void', description: 'Shows or hides it from code.' },
  ];
}
