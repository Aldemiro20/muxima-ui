import { Icon } from '../../../ui/icon';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxInput, MxInputAddon, MxInputGroup, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-input-page',
  imports: [DOC_UI, ReactiveFormsModule, MxFormField, MxLabel, MxInput, MxHint, MxError, MxButton, MxInputGroup, MxInputAddon, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Input' }]"
        title="Input"
        lead="Text, email, numbers and text areas, with label, help and error message wired up automatically. They work with ngModel and Reactive Forms."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Field example">
          <mx-form-field class="w-320">
            <label mxLabel>Email</label>
            <input mxInput type="email" placeholder="hello@company.co.ao" [formControl]="email" />
            <mx-hint>We'll send the receipt to this address.</mx-hint>
            <mx-error>Enter a valid email.</mx-error>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxFormField, MxLabel, MxInput, MxHint, MxError } from '@muxima-ui/core/form-field';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>The field brings four pieces together. The label, help and error are linked to the input by id.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Label (for)',
            topRight: '2 px focus',
            bottomLeft: '1 px border',
            bottomRight: '36 px tall',
            bottom: 'Help and error below, linked by aria-describedby'
          }"
        >
          <input mxInput tabindex="-1" placeholder="Full name" aria-label="Example" class="w-180" />
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>The error only appears after the user touches the field; here it's forced with invalid.</p>
        <doc-states>
          <doc-state name="Empty" note="Shows the placeholder."><input mxInput placeholder="Full name" aria-label="Empty" /></doc-state>
          <doc-state name="Default"><input mxInput value="Ana Kiala" aria-label="Default" /></doc-state>
          <doc-state name="Hover" note="Darker border."><input mxInput value="Ana Kiala" aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Focus" note="Kwanza border and ring."><input mxInput value="Ana Kiala" aria-label="Focus" data-mx-state="focus" /></doc-state>
          <doc-state name="Disabled" note="disabled"><input mxInput value="Ana Kiala" aria-label="Disabled" disabled /></doc-state>
          <doc-state name="Read-only" note="readonly"><input mxInput value="AO-2026-0142" aria-label="Read-only" readonly /></doc-state>
          <doc-state name="Error" note="aria-invalid and a linked message."><mx-form-field><label mxLabel>Email</label><input mxInput value="ana@" invalid /><mx-error>Invalid email.</mx-error></mx-form-field></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Validation" note="The error only appears after the user leaves the field or tries to submit.">
            <form class="stack" [formGroup]="form" (ngSubmit)="submit()">
              <mx-form-field>
                <label mxLabel>Company name</label>
                <input mxInput formControlName="company" required />
                <mx-error>Enter the company name.</mx-error>
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>NIF</label>
                <input mxInput formControlName="nif" inputmode="numeric" />
                <mx-hint>9 to 14 digits.</mx-hint>
                <mx-error>The tax ID must have between 9 and 14 digits.</mx-error>
              </mx-form-field>
              <div><button mxButton type="submit">Validate</button></div>
            </form>
          </doc-example>
          <doc-example title="Sizes">
            <div class="stack">
              <input mxInput size="sm" placeholder="Small, 32 px" aria-label="Small" />
              <input mxInput placeholder="Medium, 36 px" aria-label="Medium" />
              <input mxInput size="lg" placeholder="Large, 40 px" aria-label="Large" />
            </div>
          </doc-example>
          <doc-example title="Disabled and read-only">
            <div class="stack">
              <mx-form-field>
                <label mxLabel>Plan</label>
                <input mxInput value="Pro Team" readonly />
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>Customer code</label>
                <input mxInput value="AO-2026-0142" disabled />
              </mx-form-field>
            </div>
          </doc-example>
          <doc-example title="Text area">
            <mx-form-field class="w-full">
              <label mxLabel>Project description</label>
              <textarea mxInput rows="3" placeholder="Tell us what you need"></textarea>
              <mx-hint>500 characters maximum.</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example title="Prefix and suffix" note="mxInputGroup and mxInputAddon. The unit is also in the label.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Amount in dollars</label>
                <div mxInputGroup>
                  <span mxInputAddon>US$</span>
                  <input mxInput inputmode="decimal" value="1,250" />
                  <span mxInputAddon>,00</span>
                </div>
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>Phone</label>
                <div mxInputGroup>
                  <span mxInputAddon>+244</span>
                  <input mxInput type="tel" autocomplete="tel-national" placeholder="923 000 000" />
                </div>
              </mx-form-field>
            </div>
          </doc-example>
          <doc-example title="Search with icon and clear">
            <mx-form-field class="w-full">
              <label mxLabel class="mx-visually-hidden">Search customers</label>
              <div mxInputGroup>
                <span mxInputAddon aria-hidden="true"><doc-icon name="search" [size]="16" /></span>
                <input mxInput type="search" placeholder="Search customers" [value]="search()" (input)="search.set($any($event.target).value)" />
                @if (search()) {
                  <button mxInputAddon type="button" aria-label="Clear search" (click)="search.set('')"><doc-icon name="x" [size]="16" /></button>
                }
              </div>
            </mx-form-field>
          </doc-example>
          <doc-example title="Password with show" note="The button says what it does and its state (aria-pressed).">
            <mx-form-field class="w-full">
              <label mxLabel>Password</label>
              <div mxInputGroup>
                <input mxInput [type]="showPass() ? 'text' : 'password'" autocomplete="new-password" value="kianda2026" />
                <button mxInputAddon type="button" [attr.aria-pressed]="showPass()" (click)="showPass.set(!showPass())">{{ showPass() ? 'Hide' : 'Show' }}</button>
              </div>
              <mx-hint>At least 8 characters.</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example title="Two-column form" note="On narrow screens it becomes one column.">
            <div class="form-2col w-full">
              <mx-form-field><label mxLabel>Name</label><input mxInput autocomplete="given-name" /></mx-form-field>
              <mx-form-field><label mxLabel>Last name</label><input mxInput autocomplete="family-name" /></mx-form-field>
              <mx-form-field class="span-2"><label mxLabel>Email</label><input mxInput type="email" autocomplete="email" /></mx-form-field>
              <mx-form-field><label mxLabel>NIF</label><input mxInput inputmode="numeric" /></mx-form-field>
              <mx-form-field><label mxLabel>Province</label><input mxInput value="Luanda" /></mx-form-field>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Moves focus to the field.' },
            { key: 'Click the label', action: 'Puts focus in the field.' }
          ]"
          [aria]="[
            'The label points to the input with for/id, generated automatically.',
            'The help and the visible error go into aria-describedby.',
            'aria-invalid only becomes active after the user touches the field.',
            'The error has role=&quot;alert&quot; and is announced when it appears.',
            'Required fields get aria-required and an asterisk in the label.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Select', path: '/components/select' }, { name: 'Button', path: '/components/button' }, { name: 'Checkbox' }]" />
      </section>
    </article>
  `,
})
export class InputPage {
  protected readonly search = signal('');
  protected readonly showPass = signal(false);

  protected readonly email = new FormControl('', [Validators.email]);
  protected readonly form = new FormGroup({
    company: new FormControl('', Validators.required),
    nif: new FormControl('', [Validators.required, Validators.pattern(/^\d{9,14}$/)]),
  });

  protected submit(): void {
    this.form.markAllAsTouched();
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Email</label>
  <input mxInput type="email" placeholder="hello@company.co.ao" [formControl]="email" />
  <mx-hint>We'll send the receipt to this address.</mx-hint>
  <mx-error>Enter a valid email.</mx-error>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: 'input[mxInput], textarea[mxInput]', type: 'MxInput', description: 'Field styling and ARIA links.' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md' },
    { kind: 'Input', name: 'invalid', type: 'boolean', default: 'false', description: 'Forces the error state outside Angular forms.' },
    { kind: 'Input', name: 'id', type: 'string', default: 'generated', description: 'Used by the label\'s for.' },
    { kind: 'Directiva', name: 'mx-form-field', type: 'MxFormField', description: 'Groups label, control, help and error.' },
    { kind: 'Directiva', name: 'label[mxLabel]', type: 'MxLabel' },
    { kind: 'Directiva', name: 'mx-hint, mx-error', type: 'MxHint, MxError', description: 'The error only appears when the field is invalid and touched.' },
    { kind: 'Token CSS', name: '--mx-danger', type: 'color', default: '#B42318' },
  ];
}
