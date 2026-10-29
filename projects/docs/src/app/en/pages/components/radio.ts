import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxChoice, MxChoiceDescription, MxError, MxFieldset, MxFormField } from '@muxima-ui/core/form-field';
import { MxRadio } from '@muxima-ui/core/radio';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-radio-page',
  imports: [DOC_UI, FormsModule, ReactiveFormsModule, MxRadio, MxChoice, MxFieldset, MxFormField, MxError, MxButton, MxChoiceDescription],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Radio' }]"
        title="Radio"
        lead="One choice among a few options, all visible. It's built on the native radio input, so the arrows change the option as in any browser form."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Radio example">
          <fieldset mxFieldset>
            <legend>Invoice frequency</legend>
            <label mxChoice><input type="radio" mxRadio name="prev" value="monthly" [(ngModel)]="period" /> Monthly</label>
            <label mxChoice><input type="radio" mxRadio name="prev" value="quarterly" [(ngModel)]="period" /> Quarterly</label>
            <label mxChoice><input type="radio" mxRadio name="prev" value="yearly" [(ngModel)]="period" /> Yearly, with 2 months free</label>
          </fieldset>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxRadio } from '@muxima-ui/core/radio';
import { MxChoice, MxFieldset } from '@muxima-ui/core/form-field';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>Buttons in the same group share the name attribute and sit inside a fieldset with a legend.</p>
        <doc-structure [labels]="{ topLeft: '16 px circle', topRight: '2 px focus', bottomLeft: '6 px dot', bottomRight: '8 px gap', bottom: 'The same name on every option in the group' }">
          <label mxChoice><input type="radio" mxRadio checked tabindex="-1" name="struct" /> Monthly</label>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>Hover and focus are pinned here for comparison.</p>
        <doc-states>
          <doc-state name="Default"><input type="radio" mxRadio name="s1" aria-label="Default" /></doc-state>
          <doc-state name="Hover"><input type="radio" mxRadio name="s2" aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Focus"><input type="radio" mxRadio name="s3" aria-label="Focus" data-mx-state="focus" /></doc-state>
          <doc-state name="Selected" note="checked"><input type="radio" mxRadio name="s4" aria-label="Selected" checked /></doc-state>
          <doc-state name="Disabled" note="disabled"><input type="radio" mxRadio name="s5" aria-label="Disabled" disabled /><input type="radio" mxRadio name="s6" aria-label="Disabled and selected" disabled checked /></doc-state>
          <doc-state name="Error" note="No option chosen."><input type="radio" mxRadio name="s7" aria-label="Error" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Required, with Reactive Forms">
            <div class="stack">
              <mx-form-field>
                <fieldset mxFieldset>
                  <legend>Payment method</legend>
                  <label mxChoice><input type="radio" mxRadio name="pag" value="reference" [formControl]="payment" /> Payment by reference</label>
                  <label mxChoice><input type="radio" mxRadio name="pag" value="transferencia" [formControl]="payment" /> Bank transfer</label>
                  <label mxChoice><input type="radio" mxRadio name="pag" value="multicaixa" [formControl]="payment" /> Multicaixa Express</label>
                </fieldset>
                <mx-error>Choose a payment method.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" (click)="payment.markAsTouched()">Continue</button></div>
            </div>
          </doc-example>
          <doc-example title="Inline and sizes" note="Inline only for 2 or 3 short options.">
            <div class="stack">
              <fieldset mxFieldset orientation="horizontal">
                <legend>Customer type</legend>
                <label mxChoice><input type="radio" mxRadio name="type" checked /> Individual</label>
                <label mxChoice><input type="radio" mxRadio name="type" /> Company</label>
              </fieldset>
              <fieldset mxFieldset orientation="horizontal">
                <legend>Sizes</legend>
                <label mxChoice><input type="radio" mxRadio name="tam" size="sm" checked /> Small</label>
                <label mxChoice><input type="radio" mxRadio name="tam" /> Medium</label>
                <label mxChoice><input type="radio" mxRadio name="tam" size="lg" /> Large</label>
              </fieldset>
            </div>
          </doc-example>
          <doc-example title="With description">
            <fieldset mxFieldset>
              <legend>Shipping</legend>
              <label mxChoice><input type="radio" mxRadio name="shipping" checked /><span>Default<span mxChoiceDescription>3 to 5 business days · free</span></span></label>
              <label mxChoice><input type="radio" mxRadio name="shipping" /><span>Express<span mxChoiceDescription>24 hours in Luanda · 5,000 Kz</span></span></label>
              <label mxChoice><input type="radio" mxRadio name="shipping" /><span>Pick up in store<span mxChoiceDescription>Talatona, from tomorrow</span></span></label>
            </fieldset>
          </doc-example>
          <doc-example title="As cards" [note]="'Chosen: ' + plan">
            <fieldset mxFieldset class="w-full">
              <legend>Plan</legend>
              @for (p of plans; track p.id) {
                <label mxChoice card>
                  <input type="radio" mxRadio name="plano-card" [value]="p.id" [(ngModel)]="plan" />
                  <span>{{ p.name }}<span mxChoiceDescription>{{ p.desc }}</span></span>
                </label>
              }
            </fieldset>
          </doc-example>
          <doc-example title="Disabled option" note="Explain why, in the text itself.">
            <fieldset mxFieldset>
              <legend>Invoice currency</legend>
              <label mxChoice><input type="radio" mxRadio name="currency" checked /> Kwanza (AOA)</label>
              <label mxChoice><input type="radio" mxRadio name="currency" /> Dollar (USD)</label>
              <label mxChoice><input type="radio" mxRadio name="currency" disabled /> Euro (EUR), available in December</label>
            </fieldset>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Enters the group at the selected option.' },
            { key: 'Arrows', action: 'Change and select the option.' },
            { key: 'Space', action: 'Selects the focused option.' }
          ]"
          [aria]="[
            'Native radio inputs with the same name form a group: only one is in the tab order.',
            'The fieldset and legend name the group.',
            'The group error goes into the aria-describedby of each option.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>input[type=radio][mxRadio]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Checkbox' }, { name: 'Select' }, { name: 'Switch' }]" />
      </section>
    </article>
  `,
})
export class RadioPage {
  protected plan = 'team';
  protected readonly plans = [
    { id: 'basic', name: 'Basic', desc: 'Free, 1 user' },
    { id: 'team', name: 'Team', desc: '25,000 Kz/month, up to 10 users' },
    { id: 'business', name: 'Company', desc: 'Contact us, unlimited users' },
  ];

  protected period = 'monthly';
  protected readonly payment = new FormControl<string | null>(null, Validators.required);

  protected readonly previewCode = `<fieldset mxFieldset>
  <legend>Invoice frequency</legend>
  <label mxChoice><input type="radio" mxRadio name="period" value="monthly" [(ngModel)]="period" /> Monthly</label>
  <label mxChoice><input type="radio" mxRadio name="period" value="quarterly" [(ngModel)]="period" /> Quarterly</label>
  <label mxChoice><input type="radio" mxRadio name="period" value="yearly" [(ngModel)]="period" /> Yearly</label>
</fieldset>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '14, 16 or 20 px.' },
    { kind: 'Input', name: 'invalid', type: 'boolean', default: 'false', description: 'Forces the error state.' },
    { kind: 'Input', name: 'id', type: 'string', default: 'generated', description: 'Input id.' },
    { kind: 'Directiva', name: 'fieldset[mxFieldset]', type: "orientation: 'vertical' | 'horizontal'", default: 'vertical', description: 'Group with a legend.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Selected option color.' },
  ];
}
