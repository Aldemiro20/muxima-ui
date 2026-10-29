import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxChoice, MxChoiceDescription, MxError, MxFieldset, MxFormField } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-checkbox-page',
  imports: [DOC_UI, ReactiveFormsModule, MxCheckbox, MxChoice, MxFieldset, MxFormField, MxError, MxButton, MxChoiceDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Checkbox' }]"
        title="Checkbox"
        lead="A checkbox on top of the native input, for independent choices. It supports the indeterminate state and works with ngModel and Reactive Forms without setup."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Checkbox example">
          <fieldset mxFieldset>
            <legend>Notifications</legend>
            <label mxChoice><input type="checkbox" mxCheckbox checked /> Invoices issued</label>
            <label mxChoice><input type="checkbox" mxCheckbox /> Payments received</label>
            <label mxChoice><input type="checkbox" mxCheckbox disabled /> Weekly report (Pro)</label>
          </fieldset>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxChoice, MxFieldset } from '@muxima-ui/core/form-field';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>The label wraps the box and the text: clicking the text checks it too. The fieldset gives the group a title.</p>
        <doc-structure [labels]="{ topLeft: '16 px box', topRight: '2 px focus', bottomLeft: '4 px radius', bottomRight: '8 px gap', bottom: 'label[mxChoice] wraps the input and the text' }">
          <label mxChoice><input type="checkbox" mxCheckbox checked tabindex="-1" /> I accept the terms</label>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>Hover and focus are pinned here for comparison.</p>
        <doc-states>
          <doc-state name="Default"><input type="checkbox" mxCheckbox aria-label="Default" /></doc-state>
          <doc-state name="Hover"><input type="checkbox" mxCheckbox aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Focus"><input type="checkbox" mxCheckbox aria-label="Focus" data-mx-state="focus" /></doc-state>
          <doc-state name="Checked" note="checked"><input type="checkbox" mxCheckbox aria-label="Checked" checked /></doc-state>
          <doc-state name="Indeterminate" note="indeterminate"><input type="checkbox" mxCheckbox aria-label="Indeterminate" indeterminate /></doc-state>
          <doc-state name="Disabled" note="disabled"><input type="checkbox" mxCheckbox aria-label="Disabled" disabled /><input type="checkbox" mxCheckbox aria-label="Disabled and checked" disabled checked /></doc-state>
          <doc-state name="Error" note="invalid, or an invalid control."><input type="checkbox" mxCheckbox aria-label="Error" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Required, with Reactive Forms" note="The error appears after trying to continue.">
            <div class="stack">
              <mx-form-field>
                <label mxChoice><input type="checkbox" mxCheckbox [formControl]="terms" /> I have read and accept the terms of service</label>
                <mx-error>You must accept the terms to continue.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" (click)="terms.markAsTouched()">Continue</button></div>
            </div>
          </doc-example>
          <doc-example title="Select all" note="The indeterminate state means only part is selected.">
            <fieldset mxFieldset>
              <legend class="mx-visually-hidden">Provinces</legend>
              <label mxChoice>
                <input type="checkbox" mxCheckbox [checked]="allChecked()" [indeterminate]="someChecked()" (change)="toggleAll()" />
                All provinces
              </label>
              @for (p of provinces; track p; let i = $index) {
                <label mxChoice class="indent">
                  <input type="checkbox" mxCheckbox [checked]="checked()[i]" (change)="toggle(i)" /> {{ p }}
                </label>
              }
            </fieldset>
          </doc-example>
          <doc-example title="Sizes" note="14, 16 and 20 px.">
            <label mxChoice><input type="checkbox" mxCheckbox size="sm" checked /> Small</label>
            <label mxChoice><input type="checkbox" mxCheckbox checked /> Medium</label>
            <label mxChoice><input type="checkbox" mxCheckbox size="lg" checked /> Large</label>
          </doc-example>
          <doc-example title="Inline">
            <fieldset mxFieldset orientation="horizontal">
              <legend>Service days</legend>
              <label mxChoice><input type="checkbox" mxCheckbox checked /> Mon</label>
              <label mxChoice><input type="checkbox" mxCheckbox checked /> Tue</label>
              <label mxChoice><input type="checkbox" mxCheckbox checked /> Wed</label>
              <label mxChoice><input type="checkbox" mxCheckbox /> Sat</label>
            </fieldset>
          </doc-example>
          <doc-example title="With description" note="mxChoiceDescription below the title.">
            <fieldset mxFieldset>
              <legend>Permissions</legend>
              <label mxChoice><input type="checkbox" mxCheckbox checked /><span>Issue invoices<span mxChoiceDescription>Create and send invoices to customers.</span></span></label>
              <label mxChoice><input type="checkbox" mxCheckbox /><span>Void invoices<span mxChoiceDescription>Requires a reason; stays in the history.</span></span></label>
              <label mxChoice><input type="checkbox" mxCheckbox disabled /><span>Manage users<span mxChoiceDescription>Account administrator only.</span></span></label>
            </fieldset>
          </doc-example>
          <doc-example title="As cards" note="card: the whole area is clickable and the chosen one gets a Kwanza border.">
            <fieldset mxFieldset class="w-full">
              <legend>Modules to enable</legend>
              <label mxChoice card><input type="checkbox" mxCheckbox checked /><span>Invoicing<span mxChoiceDescription>Invoices, receipts and credit notes.</span></span></label>
              <label mxChoice card><input type="checkbox" mxCheckbox /><span>Stock<span mxChoiceDescription>Warehouses, stock in and out.</span></span></label>
              <label mxChoice card><input type="checkbox" mxCheckbox /><span>Human resources<span mxChoiceDescription>Payroll processing.</span></span></label>
            </fieldset>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Moves focus to the box.' }, { key: 'Space', action: 'Checks or unchecks.' }]"
          [aria]="[
            'It is a native input type=checkbox: screen readers announce checked, unchecked or mixed.',
            'The wrapping label gives the accessible name without ids.',
            'Group with fieldset and legend to announce the group title.',
            'The error goes into aria-describedby and aria-invalid once the field has been touched.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>input[type=checkbox][mxCheckbox]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Radio' }, { name: 'Switch' }, { name: 'Multi-select' }]" />
      </section>
    </article>
  `,
})
export class CheckboxPage {
  protected readonly terms = new FormControl(false, Validators.requiredTrue);
  protected readonly provinces = ['Luanda', 'Benguela', 'Huíla'];
  protected readonly checked = signal([true, false, false]);
  protected readonly allChecked = computed(() => this.checked().every(Boolean));
  protected readonly someChecked = computed(() => this.checked().some(Boolean) && !this.allChecked());

  protected toggle(i: number): void {
    this.checked.update((m) => m.map((v, j) => (j === i ? !v : v)));
  }
  protected toggleAll(): void {
    const next = !this.allChecked();
    this.checked.update((m) => m.map(() => next));
  }

  protected readonly previewCode = `<fieldset mxFieldset>
  <legend>Notifications</legend>
  <label mxChoice><input type="checkbox" mxCheckbox checked /> Invoices issued</label>
  <label mxChoice><input type="checkbox" mxCheckbox /> Payments received</label>
  <label mxChoice><input type="checkbox" mxCheckbox disabled /> Weekly report (Pro)</label>
</fieldset>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '14, 16 or 20 px.' },
    { kind: 'Input', name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate (mixed) state.' },
    { kind: 'Input', name: 'invalid', type: 'boolean', default: 'false', description: 'Forces the error state.' },
    { kind: 'Input', name: 'id', type: 'string', default: 'generated', description: 'Input id.' },
    { kind: 'Directiva', name: 'label[mxChoice]', type: 'directive', description: 'Label that wraps the control and the text.' },
    { kind: 'Directiva', name: 'fieldset[mxFieldset]', type: "orientation: 'vertical' | 'horizontal'", default: 'vertical', description: 'Group with a legend.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Color when checked.' },
  ];
}
