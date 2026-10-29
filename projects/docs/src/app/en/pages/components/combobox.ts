import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxCombobox } from '@muxima-ui/core/combobox';
import { MxError, MxFormField, MxHint, MxLabel, mxNormalize } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

interface Customer {
  id: number;
  name: string;
  nif: string;
}

const PROVINCIAS = ['Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuando', 'Cuanza Norte', 'Cuanza Sul', 'Cubango', 'Cunene', 'Huambo', 'Huíla', 'Icolo e Bengo', 'Luanda', 'Lunda Norte', 'Lunda Sul', 'Malanje', 'Moxico', 'Moxico Leste', 'Namibe', 'Uíge', 'Zaire'];

@Component({
  selector: 'doc-combobox-page',
  imports: [DOC_UI, MxCombobox, MxFormField, MxLabel, MxHint, MxError, MxButton, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Combobox' }]"
        title="Combobox"
        lead="Type to filter and choose from a long list. It follows the WAI-ARIA combobox-with-list pattern, and the search ignores accents: huila finds Huíla."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Combobox example">
          <mx-form-field class="w-320">
            <label mxLabel>Province</label>
            <mx-combobox [options]="provinces" [(ngModel)]="province" placeholder="Type to search" />
            <mx-hint>21 provinces.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxCombobox } from '@muxima-ui/core/combobox';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>An input with the combobox role and a floating list. The value is the chosen option, not the typed text.</p>
        <doc-structure [labels]="{ topLeft: 'input role=combobox', topRight: '2 px focus', bottomLeft: 'role=listbox list', bottomRight: '36 px tall', bottom: 'aria-activedescendant points to the active option' }">
          <div class="mx-input w-180 fake-input">Hu|</div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Empty"><mx-combobox [options]="provinces" aria-label="Empty" /></doc-state>
          <doc-state name="With value"><mx-combobox [options]="provinces" [value]="'Luanda'" aria-label="With value" /></doc-state>
          <doc-state name="Hover"><mx-combobox [options]="provinces" [value]="'Luanda'" aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Focus"><mx-combobox [options]="provinces" [value]="'Luanda'" aria-label="Focus" data-mx-state="focus" /></doc-state>
          <doc-state name="Searching" note="loading"><mx-combobox [options]="provinces" [value]="'Hu'" aria-label="Searching" loading /></doc-state>
          <doc-state name="Disabled"><mx-combobox [options]="provinces" [value]="'Luanda'" aria-label="Disabled" disabled /></doc-state>
          <doc-state name="Error"><mx-combobox [options]="provinces" aria-label="Error" invalid /></doc-state>
          <doc-state name="No results" note="emptyText in the list."><div class="mx-select-panel static-panel"><div class="mx-select-empty">No results</div></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Objects, with Reactive Forms" note="displayWith says which text to show; the value is the object.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Customer</label>
                <mx-combobox [options]="customers" [displayWith]="customerName" [formControl]="customer" placeholder="Customer name" />
                <mx-error>Choose a customer from the list.</mx-error>
              </mx-form-field>
              <p class="small-label">Value: {{ customer.value ? 'NIF ' + customer.value.nif : 'none' }}</p>
              <div><button mxButton type="button" size="sm" (click)="customer.markAsTouched()">Validate</button></div>
            </div>
          </doc-example>
          <doc-example title="Server-side search" note="(search) emits the text and loading shows that results are on their way.">
            <mx-form-field class="w-full">
              <label mxLabel>Product</label>
              <mx-combobox [options]="remote()" placeholder="Type at least 2 letters" [loading]="searching()" (search)="query($event)" [(ngModel)]="product" />
              <mx-hint>{{ product ? 'Chosen: ' + product : 'Results arrive 400 ms later.' }}</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example title="Sizes">
            <div class="stack w-full">
              <mx-combobox size="sm" [options]="provinces" aria-label="Small" />
              <mx-combobox [options]="provinces" aria-label="Medium" />
              <mx-combobox size="lg" [options]="provinces" aria-label="Large" />
            </div>
          </doc-example>
          <doc-example title="Disabled and required">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Origin province</label>
                <mx-combobox [options]="provinces" [value]="'Luanda'" disabled />
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>Destination province</label>
                <mx-combobox [options]="provinces" required [formControl]="destination" />
                <mx-error>Choose the destination province.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" size="sm" (click)="destination.markAsTouched()">Validate</button></div>
            </div>
          </doc-example>
        </div>
        <doc-callout>For short lists (up to 10 options) use Select. Combobox pays off when there's a lot to choose from.</doc-callout>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: '↓', action: 'Opens the list or moves down one option.' },
            { key: '↑', action: 'Moves up one option.' },
            { key: 'Enter', action: 'Chooses the active option.' },
            { key: 'Esc', action: 'Closes the list; again clears the field.' },
            { key: 'Alt + ↓ / ↑', action: 'Opens or closes without moving.' }
          ]"
          [aria]="[
            'input with role=combobox, aria-autocomplete=list, aria-expanded and aria-controls.',
            'Focus stays in the input; aria-activedescendant indicates the active option.',
            'The label, help and error are linked as in any field.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>mx-combobox</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Select' }, { name: 'Multi-select' }, { name: 'Command Palette' }]" />
      </section>
    </article>
  `,
})
export class ComboboxPage {
  private readonly PRODUCTS = ['Rice 25 kg', 'Sugar 1 kg', 'Vegetable oil 5 L', 'Corn flour 25 kg', 'Beans 1 kg', 'Cassava flour (fuba de bombó)', 'Spaghetti', 'Powdered milk'];
  protected readonly remote = signal<string[]>([]);
  protected readonly searching = signal(false);
  protected product: string | null = null;
  protected readonly destination = new FormControl<string | null>(null, Validators.required);
  private timer?: ReturnType<typeof setTimeout>;
  protected query(text: string): void {
    clearTimeout(this.timer);
    if (text.trim().length < 2) {
      this.remote.set([]);
      return;
    }
    this.searching.set(true);
    this.timer = setTimeout(() => {
      const q = mxNormalize(text);
      this.remote.set(this.PRODUCTS.filter((p) => mxNormalize(p).includes(q)));
      this.searching.set(false);
    }, 400);
  }

  protected readonly provinces = PROVINCIAS;
  protected province: string | null = null;
  protected readonly customers: Customer[] = [
    { id: 1, name: 'Kianda Logistics', nif: '5417039842' },
    { id: 2, name: 'Banco Mutamba', nif: '5000123456' },
    { id: 3, name: 'Huíla Agro', nif: '5480001123' },
    { id: 4, name: 'Energia do Cuanza', nif: '5401298877' },
  ];
  protected readonly customer = new FormControl<Customer | null>(null, Validators.required);
  protected readonly customerName = (c: Customer) => c.name;

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Province</label>
  <mx-combobox [options]="provinces" [(ngModel)]="province" />
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'options', type: 'T[]', description: 'Required. List of options.' },
    { kind: 'Input', name: 'value', type: 'T | null (model)', description: 'Chosen option. Also with ngModel and Reactive Forms.' },
    { kind: 'Input', name: 'displayWith', type: '(o: T) => string', default: 'String(o)' },
    { kind: 'Input', name: 'compareWith', type: '(a, b) => boolean', default: 'Object.is' },
    { kind: 'Input', name: 'placeholder', type: 'string', default: 'Search' },
    { kind: 'Input', name: 'emptyText', type: 'string', default: 'No results' },
    { kind: 'Input', name: 'loading', type: 'boolean', default: 'false', description: 'Indicator in the field and the list, with aria-busy.' },
    { kind: 'Input', name: 'loadingText', type: 'string', default: 'Searching... (from the language)' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    { kind: 'Output', name: 'search', type: 'string', description: 'Typed text, for server-side search.' },
  ];
}
