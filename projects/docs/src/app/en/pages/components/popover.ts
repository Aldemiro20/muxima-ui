import { Icon } from '../../../ui/icon';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxChoice, MxFieldset, MxFormField, MxInput, MxInputAddon, MxInputGroup, MxLabel } from '@muxima-ui/core/form-field';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MX_POPOVER } from '@muxima-ui/core/popover';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-popover-page',
  imports: [DOC_UI, MX_POPOVER, MxButton, MxFormField, MxLabel, MxInput, MxCheckbox, MxChoice, MxFieldset, FormsModule, MxInputGroup, MxInputAddon, MxAvatar, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Popover' }]"
        title="Popover"
        lead="A non-modal floating panel next to a button, for filters, details or small forms. Unlike the Tooltip, it can hold fields and buttons."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Popover example">
          <button mxButton type="button" variant="outline" [mxPopoverTrigger]="filters">Filters</button>
          <mx-popover #filters aria-label="Filters" width="280px">
            <div class="stack">
              <fieldset mxFieldset>
                <legend>Status</legend>
                <label mxChoice><input type="checkbox" mxCheckbox checked /> Paid</label>
                <label mxChoice><input type="checkbox" mxCheckbox checked /> Pending</label>
                <label mxChoice><input type="checkbox" mxCheckbox /> Overdue</label>
              </fieldset>
              <div class="row-end">
                <button mxButton type="button" size="sm" variant="ghost" (click)="filters.close()">Cancel</button>
                <button mxButton type="button" size="sm" (click)="filters.close()">Apply</button>
              </div>
            </div>
          </mx-popover>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MX_POPOVER } from '@muxima-ui/core/popover';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>A surface with border, shadow and 16 px padding, 6 px from the button.</p>
        <doc-structure [labels]="{ topLeft: 'Button with aria-expanded', topRight: 'Overlay shadow', bottomLeft: '16 px padding', bottomRight: '10 px radius', bottom: 'role=dialog, non-modal' }">
          <div class="mini-dialog"><strong>Filters</strong><span>3 options</span></div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>The states live on the button that opens the popover.</p>
        <doc-states>
          <doc-state name="Closed" note="aria-expanded=false"><button mxButton type="button" variant="outline" size="sm">Filters</button></doc-state>
          <doc-state name="Hover"><button mxButton type="button" variant="outline" size="sm" data-mx-state="hover">Filters</button></doc-state>
          <doc-state name="Focus"><button mxButton type="button" variant="outline" size="sm" data-mx-state="focus">Filters</button></doc-state>
          <doc-state name="Open" note="aria-expanded=true; focus in the panel."><div class="mx-popover mini-popover">Panel open</div></doc-state>
          <doc-state name="Disabled"><button mxButton type="button" variant="outline" size="sm" disabled>Filters</button></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Small form" note="Focus goes to the first field.">
            <button mxButton type="button" variant="outline" [mxPopoverTrigger]="rename">Rename</button>
            <mx-popover #rename aria-labelledby="renomear-titulo">
              <form class="stack" (submit)="$event.preventDefault(); rename.close()">
                <p class="popover-title" id="renomear-titulo">Rename project</p>
                <mx-form-field>
                  <label mxLabel>Name</label>
                  <input mxInput name="name" [(ngModel)]="name" />
                </mx-form-field>
                <div class="row-end"><button mxButton type="submit" size="sm">Save</button></div>
              </form>
            </mx-popover>
          </doc-example>
          <doc-example title="Aligned to the end" note="align=&quot;end&quot; for buttons against the right edge.">
            <div class="row-end w-full">
              <button mxButton type="button" variant="outline" [mxPopoverTrigger]="info">Details</button>
              <mx-popover #info align="end" aria-label="Invoice details">
                <p class="popover-title">FT 2026/0142</p>
                <p class="muted">Issued on October 3. Due on November 2.</p>
              </mx-popover>
            </div>
          </doc-example>
          <doc-example title="Contextual help" note="A ? button next to the label opens the explanation.">
            <mx-form-field class="w-full">
              <div class="label-row">
                <label mxLabel>VAT regime</label>
                <button type="button" class="help-button" aria-label="Help about the VAT regime" [mxPopoverTrigger]="help">?</button>
              </div>
              <input mxInput value="General regime" />
            </mx-form-field>
            <mx-popover #help aria-labelledby="ajuda-iva" width="280px">
              <p class="popover-title" id="ajuda-iva">VAT regime</p>
              <p class="muted">Companies with annual revenue above $350,000 are in the general regime. The others can opt for the simplified regime.</p>
            </mx-popover>
          </doc-example>
          <doc-example title="Share link">
            <button mxButton type="button" variant="outline" [mxPopoverTrigger]="share"><doc-icon name="external" /> Share</button>
            <mx-popover #share aria-labelledby="partilha-t" width="320px">
              <p class="popover-title" id="partilha-t">Share report</p>
              <div class="stack">
                <div mxInputGroup>
                  <input mxInput readonly value="https://muxima.ao/r/2026-10" aria-label="Report link" />
                  <button mxInputAddon type="button" (click)="copied.set(true)">{{ copied() ? 'Copied' : 'Copy' }}</button>
                </div>
                <label mxChoice><input type="checkbox" mxCheckbox checked /> Anyone with the link</label>
              </div>
            </mx-popover>
          </doc-example>
          <doc-example title="Person card">
            <button mxButton type="button" variant="link" [mxPopoverTrigger]="person">Joana Mbala</button>
            <mx-popover #person aria-label="Joana Mbala" width="280px">
              <div class="person">
                <mx-avatar name="Joana Mbala" src="exemplos/pessoa-2.svg" status="online" decorative />
                <div><strong>Joana Mbala</strong><span class="muted">Chief financial officer</span></div>
              </div>
              <div class="row-inline popover-actions">
                <button mxButton type="button" size="sm">Message</button>
                <button mxButton type="button" size="sm" variant="outline">Profile</button>
              </div>
            </mx-popover>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Enter Space', action: 'Open and close from the button.' },
            { key: 'Tab', action: 'Moves through the panel content.' },
            { key: 'Esc', action: 'Closes and returns focus to the button.' }
          ]"
          [aria]="[
            'The button has aria-haspopup=dialog, aria-expanded and aria-controls.',
            'The panel is a non-modal role=dialog, named by aria-label or aria-labelledby.',
            'Clicking outside closes it without stealing focus from what was clicked.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Tooltip' }, { name: 'Dropdown menu' }, { name: 'Dialog' }]" />
      </section>
    </article>
  `,
})
export class PopoverPage {
  protected readonly copied = signal(false);

  protected name = 'Customer portal';
  protected readonly previewCode = `<button mxButton variant="outline" [mxPopoverTrigger]="filters">Filters</button>
<mx-popover #filters aria-label="Filters">
  ... fields ...
  <button mxButton size="sm" (click)="filters.close()">Apply</button>
</mx-popover>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: '[mxPopoverTrigger]', type: 'MxPopover', description: 'Button that opens the given popover.' },
    { kind: 'Input', name: 'align', type: "'start' | 'center' | 'end'", default: 'start', description: 'Alignment with the button.' },
    { kind: 'Input', name: 'width', type: 'string', description: 'Panel width (e.g. 280px).' },
    { kind: 'Input', name: 'aria-label / aria-labelledby', type: 'string', description: 'Panel name.' },
    { kind: 'Output', name: 'opened, closed', type: 'void' },
    { kind: 'Método', name: 'close()', type: 'void', description: 'Closes and returns focus.' },
  ];
}
