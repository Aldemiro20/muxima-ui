import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxOption, MxSelect } from '@muxima-ui/core/select';
import { RouterLink } from '@angular/router';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-multi-select-page',
  imports: [DOC_UI, RouterLink, MxSelect, MxOption, MxFormField, MxLabel, MxHint, MxError, MxButton, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Multi-select' }]"
        title="Multi-select"
        lead="Several choices from a list. It's the same Select with the multiple attribute: the value becomes a list and the panel stays open while you choose."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Multi-select example">
          <mx-form-field class="w-320">
            <label mxLabel>Delivery provinces</label>
            <mx-select multiple placeholder="Choose one or more" [(ngModel)]="provinces">
              @for (p of list; track p) {
                <mx-option [value]="p">{{ p }}</mx-option>
              }
            </mx-select>
            <mx-hint>{{ provinces.length }} chosen.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxSelect, MxOption } from '@muxima-ui/core/select';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>Each option has a checkbox. The button shows up to two names; from three on, the count.</p>
        <doc-structure [labels]="{ topLeft: 'Choice summary', topRight: '2 px focus', bottomLeft: '12 px box', bottomRight: 'Panel open', bottom: 'listbox with aria-multiselectable=true' }">
          <mx-select multiple class="w-180" aria-label="Example" [value]="['a', 'b']"><mx-option value="a">Luanda</mx-option><mx-option value="b">Benguela</mx-option></mx-select>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Empty"><mx-select multiple placeholder="Choose" aria-label="Empty"><mx-option value="a">Luanda</mx-option></mx-select></doc-state>
          <doc-state name="Two choices"><mx-select multiple aria-label="Two" [value]="['a', 'b']"><mx-option value="a">Luanda</mx-option><mx-option value="b">Huíla</mx-option></mx-select></doc-state>
          <doc-state name="Three or more"><mx-select multiple aria-label="Three" [value]="['a', 'b', 'c']"><mx-option value="a">Luanda</mx-option><mx-option value="b">Huíla</mx-option><mx-option value="c">Namibe</mx-option></mx-select></doc-state>
          <doc-state name="Focus"><mx-select multiple aria-label="Focus" data-mx-state="focus" [value]="['a']"><mx-option value="a">Luanda</mx-option></mx-select></doc-state>
          <doc-state name="Disabled"><mx-select multiple aria-label="Disabled" disabled [value]="['a']"><mx-option value="a">Luanda</mx-option></mx-select></doc-state>
          <doc-state name="Error"><mx-select multiple aria-label="Error" invalid placeholder="Choose at least one" /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Required, with Reactive Forms" note="Validators.required fails with an empty list.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Permissions</label>
                <mx-select multiple placeholder="Choose the permissions" [formControl]="permissions">
                  <mx-option value="read">Read invoices</mx-option>
                  <mx-option value="issue">Issue invoices</mx-option>
                  <mx-option value="void">Void invoices</mx-option>
                  <mx-option value="admin" disabled>Administer (owner only)</mx-option>
                </mx-select>
                <mx-error>Choose at least one permission.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" size="sm" (click)="permissions.markAsTouched()">Validate</button></div>
            </div>
          </doc-example>
          <doc-example title="Preselected, with ngModel" [note]="'Value: ' + languages.join(', ')">
            <mx-form-field class="w-full">
              <label mxLabel>Invoice languages</label>
              <mx-select multiple [(ngModel)]="languages">
                <mx-option value="pt">Portuguese</mx-option>
                <mx-option value="en">English</mx-option>
                <mx-option value="fr">French</mx-option>
                <mx-option value="umb">Umbundu</mx-option>
                <mx-option value="kmb">Kimbundu</mx-option>
              </mx-select>
            </mx-form-field>
          </doc-example>
          <doc-example title="With select-all buttons" note="Actions alongside, for lists where you choose almost everything.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Warehouses</label>
                <mx-select multiple [(ngModel)]="warehouses">
                  @for (a of allWarehouses; track a) {
                    <mx-option [value]="a">{{ a }}</mx-option>
                  }
                </mx-select>
              </mx-form-field>
              <div class="row-inline">
                <button mxButton type="button" variant="link" size="sm" (click)="warehouses = [...allWarehouses]">Select all</button>
                <button mxButton type="button" variant="link" size="sm" (click)="warehouses = []">Clear</button>
              </div>
            </div>
          </doc-example>
          <doc-example title="Sizes and disabled">
            <div class="stack w-full">
              <mx-select multiple size="sm" aria-label="Small" [value]="['a']"><mx-option value="a">Luanda</mx-option><mx-option value="b">Huíla</mx-option></mx-select>
              <mx-select multiple size="lg" aria-label="Large" [value]="['a', 'b']"><mx-option value="a">Luanda</mx-option><mx-option value="b">Huíla</mx-option></mx-select>
              <mx-select multiple disabled aria-label="Disabled" [value]="['a']"><mx-option value="a">Luanda</mx-option></mx-select>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Enter Space', action: 'Open the panel; inside it, check or uncheck the option.' },
            { key: '↑ ↓ Home End', action: 'Move between options.' },
            { key: 'Letter', action: 'Jumps to the option that starts with it.' },
            { key: 'Esc Tab', action: 'Close the panel.' }
          ]"
          [aria]="[
            'listbox with aria-multiselectable=true; each option has aria-selected.',
            'The panel does not close on choice, so you can check several in a row.',
            'The button announces the choice summary.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>The same inputs as <a class="text-link" routerLink="/components/select">Select</a>, plus:</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Select' }, { name: 'Checkbox' }, { name: 'Combobox' }]" />
      </section>
    </article>
  `,
})
export class MultiSelectPage {
  protected languages: string[] = ['pt', 'en'];
  protected readonly allWarehouses = ['Talatona', 'Viana', 'Lobito', 'Lubango', 'Namibe'];
  protected warehouses: string[] = ['Talatona'];

  protected readonly list = ['Luanda', 'Benguela', 'Huambo', 'Huíla', 'Namibe', 'Cabinda'];
  protected provinces: string[] = ['Luanda'];
  protected readonly permissions = new FormControl<string[]>([], Validators.required);

  protected readonly previewCode = `<mx-select multiple placeholder="Choose one or more" [(ngModel)]="provinces">
  <mx-option value="Luanda">Luanda</mx-option>
  <mx-option value="Benguela">Benguela</mx-option>
</mx-select>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'multiple', type: 'boolean', default: 'false', description: 'Multiple choice.' },
    { kind: 'Input', name: 'value', type: 'T[] (model)', default: '[]', description: 'List of the chosen values.' },
  ];
}
