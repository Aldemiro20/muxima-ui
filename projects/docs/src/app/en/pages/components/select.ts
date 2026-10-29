import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxOption, MxSelect } from '@muxima-ui/core/select';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

interface Plan {
  id: string;
  name: string;
}

@Component({
  selector: 'doc-select-page',
  imports: [DOC_UI, FormsModule, ReactiveFormsModule, MxFormField, MxLabel, MxHint, MxError, MxSelect, MxOption, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Select' }]"
        title="Select"
        lead="Choose one option from a list. It opens with the keyboard, searches by first letter and works with ngModel and Reactive Forms."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Select example">
          <mx-form-field class="w-280">
            <label mxLabel>Province</label>
            <mx-select placeholder="Choose a province" [(ngModel)]="province">
              @for (p of provinces; track p) {
                <mx-option [value]="p">{{ p }}</mx-option>
              }
            </mx-select>
            <mx-hint>Selected: {{ province ?? 'none' }}</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxSelect, MxOption } from '@muxima-ui/core/select';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>A button with the combobox role opens the list in a floating layer, without leaving the field.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Current value',
            topRight: '2 px focus',
            bottomLeft: '6 px radius',
            bottomRight: 'List indicator',
            bottom: 'The list opens below and flips up if there is no room'
          }"
        >
          <mx-select class="w-180" placeholder="Luanda" aria-label="Select example" />
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>With no options, the panel shows the emptyText.</p>
        <doc-states>
          <doc-state name="Empty" note="Shows the placeholder."><mx-select placeholder="Choose the sector" aria-label="Empty" /></doc-state>
          <doc-state name="Default"><mx-select aria-label="Default" [value]="'aoa'"><mx-option value="aoa">Kwanza (AOA)</mx-option></mx-select></doc-state>
          <doc-state name="Hover"><mx-select aria-label="Hover" data-mx-state="hover" [value]="'aoa'"><mx-option value="aoa">Kwanza (AOA)</mx-option></mx-select></doc-state>
          <doc-state name="Focus"><mx-select aria-label="Focus" data-mx-state="focus" [value]="'aoa'"><mx-option value="aoa">Kwanza (AOA)</mx-option></mx-select></doc-state>
          <doc-state name="Loading" note="loading"><mx-select aria-label="Loading" loading placeholder="Warehouse" /></doc-state>
          <doc-state name="Disabled" note="disabled"><mx-select aria-label="Disabled" disabled [value]="'aoa'"><mx-option value="aoa">Kwanza (AOA)</mx-option></mx-select></doc-state>
          <doc-state name="Error" note="invalid, or an invalid control."><mx-form-field><label mxLabel>Sector</label><mx-select invalid placeholder="Choose the sector" /><mx-error>Choose a sector.</mx-error></mx-form-field></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Required, with Reactive Forms">
            <div class="stack">
              <mx-form-field>
                <label mxLabel>Sector</label>
                <mx-select placeholder="Choose the sector" [formControl]="sector">
                  <mx-option value="banking">Banking and insurance</mx-option>
                  <mx-option value="energy">Energy and oil</mx-option>
                  <mx-option value="telecom">Telecommunications</mx-option>
                  <mx-option value="government">Public administration</mx-option>
                </mx-select>
                <mx-error>Choose a sector to continue.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" (click)="sector.markAsTouched()">Validate</button></div>
            </div>
          </doc-example>
          <doc-example title="Disabled option">
            <mx-form-field class="w-full">
              <label mxLabel>Currency</label>
              <mx-select [(ngModel)]="currency">
                <mx-option value="AOA">Kwanza (AOA)</mx-option>
                <mx-option value="USD">Dollar (USD)</mx-option>
                <mx-option value="EUR" disabled>Euro (EUR), unavailable</mx-option>
              </mx-select>
            </mx-form-field>
          </doc-example>
          <doc-example title="Values that are objects" note="compareWith compares by id.">
            <mx-form-field class="w-full">
              <label mxLabel>Plan</label>
              <mx-select [(ngModel)]="plan" [compareWith]="byId">
                @for (p of plans; track p.id) {
                  <mx-option [value]="p">{{ p.name }}</mx-option>
                }
              </mx-select>
            </mx-form-field>
          </doc-example>
          <doc-example title="Disabled">
            <mx-form-field class="w-full">
              <label mxLabel>Region</label>
              <mx-select placeholder="Unavailable on this plan" disabled />
            </mx-form-field>
          </doc-example>
          <doc-example title="Sizes" note="32, 36 and 40 px, like Input.">
            <div class="stack w-full">
              <mx-select size="sm" aria-label="Small" [value]="'aoa'"><mx-option value="aoa">Kwanza (AOA)</mx-option></mx-select>
              <mx-select aria-label="Medium" [value]="'aoa'"><mx-option value="aoa">Kwanza (AOA)</mx-option></mx-select>
              <mx-select size="lg" aria-label="Large" [value]="'aoa'"><mx-option value="aoa">Kwanza (AOA)</mx-option></mx-select>
            </div>
          </doc-example>
          <doc-example title="Filters in a bar" [note]="'Showing: ' + summary()">
            <div class="filter-bar w-full">
              <mx-select size="sm" aria-label="Status" [(value)]="fStatus">
                <mx-option value="all">All statuses</mx-option>
                <mx-option value="paid">Paid</mx-option>
                <mx-option value="pending">Pending</mx-option>
              </mx-select>
              <mx-select size="sm" aria-label="Period" [(value)]="fPeriod">
                <mx-option value="mes">This month</mx-option>
                <mx-option value="quarter">This quarter</mx-option>
                <mx-option value="year">This year</mx-option>
              </mx-select>
            </div>
          </doc-example>
          <doc-example title="Empty list" note="With no options, the panel shows emptyText.">
            <mx-form-field class="w-full">
              <label mxLabel>Warehouse</label>
              <mx-select placeholder="Choose a warehouse" emptyText="You haven't created any warehouses yet." />
            </mx-form-field>
          </doc-example>
          <doc-example title="Dependent options" note="The second list changes with the first.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Province</label>
                <mx-select [value]="prov()" (valueChange)="setProv($any($event))">
                  @for (p of provDep; track p) {
                    <mx-option [value]="p">{{ p }}</mx-option>
                  }
                </mx-select>
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>Municipality</label>
                <mx-select placeholder="Choose the municipality" [(value)]="mun">
                  @for (m of municipalities(); track m) {
                    <mx-option [value]="m">{{ m }}</mx-option>
                  }
                </mx-select>
              </mx-form-field>
            </div>
          </doc-example>
          <doc-example title="Options from the server" note="loading shows the indicator on the button and panel until the options arrive.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Warehouse</label>
                <mx-select placeholder="Choose a warehouse" [loading]="loadingArm()" (opened)="loadArm()" [(value)]="warehouse">
                  @for (a of warehouses(); track a) {
                    <mx-option [value]="a">{{ a }}</mx-option>
                  }
                </mx-select>
                <mx-hint>The options arrive 1 second after opening.</mx-hint>
              </mx-form-field>
              <div><button mxButton type="button" variant="ghost" size="sm" (click)="resetArm()">Start over</button></div>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: '↓ ↑ Enter Space', action: 'Open the list with the current option active.' },
            { key: '↓ ↑', action: 'Move between options, skipping disabled ones.' },
            { key: 'Home End', action: 'First and last option.' },
            { key: 'Letter', action: 'Jumps to the option that starts with that letter.' },
            { key: 'Enter Space', action: 'Choose the active option and close the list.' },
            { key: 'Esc', action: 'Closes without changing the value.' }
          ]"
          [aria]="[
            'WAI-ARIA select-only combobox pattern: focus stays on the button and the active option is indicated by aria-activedescendant.',
            'aria-expanded and aria-controls show the list state.',
            'The list has role=&quot;listbox&quot; and the name of the label; each option has role=&quot;option&quot; and aria-selected.',
            'Disabled options have aria-disabled and cannot be chosen.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Input', path: '/components/input' }, { name: 'Combobox' }, { name: 'Multi-select' }]" />
      </section>
    </article>
  `,
})
export class SelectPage {
  protected readonly warehouses = signal<string[]>([]);
  protected readonly loadingArm = signal(false);
  protected readonly warehouse = signal<unknown>(null);
  protected loadArm(): void {
    if (this.warehouses().length || this.loadingArm()) return;
    this.loadingArm.set(true);
    setTimeout(() => {
      this.warehouses.set(['Talatona', 'Viana', 'Lobito', 'Lubango']);
      this.loadingArm.set(false);
    }, 1000);
  }
  protected resetArm(): void {
    this.warehouses.set([]);
    this.warehouse.set(null);
  }

  protected readonly fStatus = signal<unknown>('all');
  protected readonly fPeriod = signal<unknown>('mes');
  protected readonly summary = computed(() => `${this.fStatus()}, ${this.fPeriod()}`);
  protected readonly provDep = ['Luanda', 'Benguela', 'Huíla'];
  private readonly MUNICIPALITIES: Record<string, string[]> = {
    Luanda: ['Belas', 'Cacuaco', 'Cazenga', 'Talatona', 'Viana'],
    Benguela: ['Benguela', 'Lobito', 'Catumbela'],
    Huíla: ['Lubango', 'Matala', 'Chibia'],
  };
  protected readonly prov = signal('Luanda');
  protected readonly mun = signal<unknown>(null);
  protected readonly municipalities = computed(() => this.MUNICIPALITIES[this.prov()] ?? []);
  protected setProv(p: string): void {
    this.prov.set(p);
    this.mun.set(null);
  }

  protected readonly provinces = ['Bengo', 'Benguela', 'Bié', 'Cabinda', 'Cuanza Norte', 'Cuanza Sul', 'Huambo', 'Huíla', 'Luanda', 'Malanje', 'Namibe', 'Uíge', 'Zaire'];
  protected province: string | null = 'Luanda';
  protected currency = 'AOA';
  protected readonly plans: Plan[] = [
    { id: 'free', name: 'Open Source' },
    { id: 'pro', name: 'Pro' },
    { id: 'ent', name: 'Enterprise' },
  ];
  protected plan: Plan = { id: 'pro', name: 'Pro' };
  protected readonly sector = new FormControl<string | null>(null, Validators.required);
  protected readonly byId = (a: Plan | null, b: Plan | null) => a?.id === b?.id;

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Province</label>
  <mx-select placeholder="Choose a province" [(ngModel)]="province">
    @for (p of provinces; track p) {
      <mx-option [value]="p">{{ p }}</mx-option>
    }
  </mx-select>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'value', type: 'T | null', default: 'null', description: 'Accepts [(value)], ngModel and formControl.' },
    { kind: 'Input', name: 'loading', type: 'boolean', default: 'false', description: 'Indicator on the button and panel, with aria-busy.' },
    { kind: 'Input', name: 'loadingText', type: 'string', default: 'Loading... (from the language)' },
    { kind: 'Input', name: 'placeholder', type: 'string', default: "'Select' (from the language)" },
    { kind: 'Input', name: 'disabled', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'required', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'compareWith', type: '(a, b) => boolean', default: 'Object.is' },
    { kind: 'Output', name: 'opened, closed', type: 'void' },
    { kind: 'Directiva', name: 'mx-option', type: 'MxOption', description: 'Inputs value (required) and disabled.' },
  ];
}
