import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxChoice, MxChoiceDescription, MxFieldset } from '@muxima-ui/core/form-field';
import { MxSwitch } from '@muxima-ui/core/switch';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-switch-page',
  imports: [DOC_UI, FormsModule, MxSwitch, MxChoice, MxFieldset, MxChoiceDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Switch' }]"
        title="Switch"
        lead="Turns a preference on and off with immediate effect. It's a native checkbox with the switch role, so it works with forms and is announced as a switch."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Switch example">
          <fieldset mxFieldset>
            <legend>Preferences</legend>
            <label mxChoice><input type="checkbox" mxSwitch [(ngModel)]="email" /> Email notifications</label>
            <label mxChoice><input type="checkbox" mxSwitch [(ngModel)]="sms" /> SMS alerts</label>
          </fieldset>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxSwitch } from '@muxima-ui/core/switch';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>A rounded track and a sliding knob. The Kwanza color means on.</p>
        <doc-structure [labels]="{ topLeft: '36 × 20 px track', topRight: '2 px focus', bottomLeft: '16 px knob', bottomRight: '8 px gap', bottom: 'input type=checkbox with role=switch' }">
          <label mxChoice><input type="checkbox" mxSwitch checked tabindex="-1" /> Dark mode</label>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>Hover and focus are pinned here for comparison.</p>
        <doc-states>
          <doc-state name="Off"><input type="checkbox" mxSwitch aria-label="Off" /></doc-state>
          <doc-state name="Hover"><input type="checkbox" mxSwitch aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Focus"><input type="checkbox" mxSwitch aria-label="Focus" data-mx-state="focus" /></doc-state>
          <doc-state name="On" note="checked"><input type="checkbox" mxSwitch aria-label="On" checked /></doc-state>
          <doc-state name="Disabled" note="disabled"><input type="checkbox" mxSwitch aria-label="Disabled" disabled /><input type="checkbox" mxSwitch aria-label="Disabled and on" disabled checked /></doc-state>
          <doc-state name="Saving" note="Disabled while saving to the server."><input type="checkbox" mxSwitch aria-label="Saving" checked disabled aria-busy="true" /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Immediate save" [note]="saving() ? 'Saving...' : 'Saved: ' + (twoFactor ? 'on' : 'off')">
            <label mxChoice>
              <input type="checkbox" mxSwitch [(ngModel)]="twoFactor" [disabled]="saving()" [attr.aria-busy]="saving() || null" (change)="save()" />
              Two-step verification
            </label>
          </doc-example>
          <doc-example title="Sizes" note="28, 36 and 44 px wide.">
            <label mxChoice><input type="checkbox" mxSwitch size="sm" checked /> Small</label>
            <label mxChoice><input type="checkbox" mxSwitch checked /> Medium</label>
            <label mxChoice><input type="checkbox" mxSwitch size="lg" checked /> Large</label>
          </doc-example>
          <doc-example title="Preference list" note="Text on the left, switch on the right; the label wraps everything.">
            <div class="pref-list w-full">
              @for (p of prefs; track p.id) {
                <label mxChoice class="pref-row">
                  <span>{{ p.title }}<span mxChoiceDescription>{{ p.desc }}</span></span>
                  <input type="checkbox" mxSwitch [checked]="p.on" />
                </label>
              }
            </div>
          </doc-example>
          <doc-example title="Disabled with a reason">
            <label mxChoice>
              <input type="checkbox" mxSwitch disabled aria-describedby="sw-motivo" />
              <span>Automatic invoicing<span mxChoiceDescription id="sw-motivo">Available after you set up the invoice series.</span></span>
            </label>
          </doc-example>
        </div>
        <doc-callout>Use the switch when the change takes effect right away. In a form that only counts on submit, use a Checkbox.</doc-callout>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Moves focus to the switch.' }, { key: 'Space', action: 'Turns it on or off.' }]"
          [aria]="[
            'role=switch: screen readers announce on or off instead of checked.',
            'The wrapping label gives the accessible name.',
            'While saving, use disabled and aria-busy so repeated clicks are ignored.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>input[type=checkbox][mxSwitch]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Checkbox' }, { name: 'Radio' }, { name: 'Toast' }]" />
      </section>
    </article>
  `,
})
export class SwitchPage {
  protected readonly prefs = [
    { id: 'email', title: 'Daily email summary', desc: 'At 8 am, with the previous day\'s invoices.', on: true },
    { id: 'sms', title: 'Payment alerts by SMS', desc: 'When a customer pays.', on: false },
    { id: 'dark', title: 'Dark mode', desc: 'Follows the system when off.', on: false },
  ];

  protected email = true;
  protected sms = false;
  protected twoFactor = false;
  protected readonly saving = signal(false);

  protected save(): void {
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 900);
  }

  protected readonly previewCode = `<label mxChoice>
  <input type="checkbox" mxSwitch [(ngModel)]="email" /> Email notifications
</label>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '28×16, 36×20 or 44×24 px.' },
    { kind: 'Input', name: 'invalid', type: 'boolean', default: 'false', description: 'Forces the error state.' },
    { kind: 'Input', name: 'id', type: 'string', default: 'generated', description: 'Input id.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Color when on.' },
  ];
}
