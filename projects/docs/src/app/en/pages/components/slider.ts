import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MxFieldset, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { MxRangeSlider, MxSlider } from '@muxima-ui/core/slider';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-slider-page',
  imports: [
    DOC_UI,
    FormsModule,
    ReactiveFormsModule,
    MxSlider,
    MxRangeSlider,
    MxFormField,
    MxLabel,
    MxHint,
    MxFieldset,
    MxInput,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Slider' }]"
        title="Slider"
        lead="A number within a range, or a range with two thumbs. It's the native range input: arrows, Page Up, Page Down, Home and End work with no extra code."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Slider example">
          <mx-form-field class="w-320">
            <label mxLabel>Monthly budget</label>
            <input
              type="range"
              mxSlider
              min="0"
              max="500"
              step="10"
              [(ngModel)]="budget"
              [attr.aria-valuetext]="budget + ' dollars'"
            />
            <mx-hint>{{ budget }} USD</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxRangeSlider, MxSlider } from '@muxima-ui/core/slider';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>A bar with the filled part in Kwanza and a round thumb.</p>
        <doc-structure
          [labels]="{
            topLeft: '6 px bar',
            topRight: 'Focus on the thumb',
            bottomLeft: 'Fill',
            bottomRight: '16 px thumb',
            bottom: 'input type=range with min, max and step',
          }"
        >
          <input
            type="range"
            mxSlider
            value="60"
            tabindex="-1"
            aria-label="Example"
            class="w-180"
          />
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>Hover, focus and active are pinned here for comparison.</p>
        <doc-states>
          <doc-state name="Default"
            ><input type="range" mxSlider value="40" aria-label="Default"
          /></doc-state>
          <doc-state name="Hover"
            ><input type="range" mxSlider value="40" aria-label="Hover" data-mx-state="hover"
          /></doc-state>
          <doc-state name="Focus"
            ><input type="range" mxSlider value="40" aria-label="Focus" data-mx-state="focus"
          /></doc-state>
          <doc-state name="Active" note="While dragging."
            ><input type="range" mxSlider value="40" aria-label="Active" data-mx-state="active"
          /></doc-state>
          <doc-state name="Disabled"
            ><input type="range" mxSlider value="40" aria-label="Disabled" disabled
          /></doc-state>
          <doc-state name="Error"
            ><input type="range" mxSlider value="90" aria-label="Error" invalid
          /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="With an announced value"
            note="aria-valuetext tells screen readers the unit."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Payment terms</label>
              <input
                type="range"
                mxSlider
                min="15"
                max="90"
                step="15"
                [(ngModel)]="terms"
                [attr.aria-valuetext]="terms + ' days'"
              />
              <mx-hint>{{ terms }} days</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example title="Sizes">
            <div class="stack">
              <input type="range" mxSlider size="sm" value="30" aria-label="Small" />
              <input type="range" mxSlider value="50" aria-label="Medium" />
              <input type="range" mxSlider size="lg" value="70" aria-label="Large" />
            </div>
          </doc-example>
          <doc-example title="With tick marks" note="A native datalist draws the marks at the steps.">
            <mx-form-field class="w-full">
              <label mxLabel>Discount</label>
              <input
                type="range"
                mxSlider
                min="0"
                max="20"
                step="5"
                list="marcas-desconto"
                [(ngModel)]="discount"
                [attr.aria-valuetext]="discount + '%'"
              />
              <datalist id="marcas-desconto">
                <option value="0"></option>
                <option value="5"></option>
                <option value="10"></option>
                <option value="15"></option>
                <option value="20"></option>
              </datalist>
              <div class="tick-labels" aria-hidden="true">
                <span>0%</span><span>5%</span><span>10%</span><span>15%</span><span>20%</span>
              </div>
            </mx-form-field>
          </doc-example>
          <doc-example title="Disabled">
            <mx-form-field class="w-full">
              <label mxLabel>Sending volume (Pro plan)</label>
              <input type="range" mxSlider value="40" disabled />
            </mx-form-field>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Range slider</h2>
        <p>
          Two thumbs to choose a range (minimum and maximum). They're two native range inputs
          inside <code>mx-range-slider</code>: each thumb has its own keyboard and is announced as
          "Price, minimum, $20". The thumbs don't cross.
        </p>
        <div class="grid-2">
          <doc-example
            title="Price with visible values"
            note="format gives each value's text, on screen and to screen readers."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Price</label>
              <mx-range-slider
                [(value)]="price"
                [min]="0"
                [max]="1000"
                [step]="10"
                [format]="usd"
                showValues
              />
            </mx-form-field>
          </doc-example>
          <doc-example
            title="Minimum distance"
            [note]="
              'minGap keeps at least 2 hours: ' +
              hours()?.[0] +
              ':00 to ' +
              hours()?.[1] +
              'h.'
            "
          >
            <mx-form-field class="w-full">
              <label mxLabel>Delivery hours</label>
              <mx-range-slider
                [(value)]="hours"
                [min]="6"
                [max]="22"
                [minGap]="2"
                [format]="hoursText"
                showValues
              />
            </mx-form-field>
          </doc-example>
          <doc-example
            title="In a form"
            [note]="'Form value: ' + JSON.stringify(ages.value)"
          >
            <form class="stack w-full" [formGroup]="filter">
              <mx-form-field>
                <label mxLabel>Age</label>
                <mx-range-slider formControlName="age" [min]="18" [max]="70" showValues />
                <mx-hint>Filters employees by age.</mx-hint>
              </mx-form-field>
            </form>
          </doc-example>
          <doc-example title="Sizes and disabled">
            <div class="stack w-full">
              <mx-range-slider size="sm" aria-label="Small" [value]="[20, 60]" />
              <mx-range-slider aria-label="Medium" [value]="[30, 70]" />
              <mx-range-slider size="lg" aria-label="Large" [value]="[40, 80]" />
              <mx-range-slider aria-label="Disabled" [value]="[25, 75]" disabled />
            </div>
          </doc-example>
          <doc-example
            title="Filter products"
            [note]="productsInRange().length + ' of ' + products.length + ' products.'"
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Price</label>
                <mx-range-slider
                  [(value)]="band"
                  [min]="0"
                  [max]="500"
                  [step]="5"
                  [format]="usd"
                  showValues
                />
              </mx-form-field>
              <ul class="product-list">
                @for (p of productsInRange(); track p.name) {
                  <li>
                    <span>{{ p.name }}</span
                    ><span class="muted">{{ usd(p.price) }}</span>
                  </li>
                } @empty {
                  <li class="muted">No products in this price range.</li>
                }
              </ul>
            </div>
          </doc-example>
          <doc-example
            title="With number fields"
            note="The fields and thumbs show the same value; typing also moves the thumb."
          >
            <fieldset mxFieldset class="w-full">
              <legend>Property area (m²)</legend>
              <mx-range-slider
                aria-label="Property area"
                [(value)]="area"
                [min]="20"
                [max]="400"
                [step]="10"
              />
              <div class="row-wrap">
                <mx-form-field class="grow">
                  <label mxLabel>From</label>
                  <input
                    mxInput
                    type="number"
                    [min]="20"
                    [max]="area()![1]"
                    [value]="area()![0]"
                    (change)="setArea(0, $event)"
                  />
                </mx-form-field>
                <mx-form-field class="grow">
                  <label mxLabel>To</label>
                  <input
                    mxInput
                    type="number"
                    [min]="area()![0]"
                    [max]="400"
                    [value]="area()![1]"
                    (change)="setArea(1, $event)"
                  />
                </mx-form-field>
              </div>
            </fieldset>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Arrows', action: 'Increase or decrease by one step.' },
            { key: 'Page Up / Down', action: 'Bigger steps.' },
            { key: 'Home / End', action: 'Minimum and maximum.' },
          ]"
          [aria]="[
            'native range input: screen readers announce the value and the range.',
            'Use aria-valuetext when the number alone does not give the unit.',
            'Show the value as text too, next to the field.',
            'In the range slider, each thumb joins the field label with minimum or maximum, and aria-valuetext uses format.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>input[type=range][mxSlider]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Input' }, { name: 'Progress' }, { name: 'Select' }]" />
      </section>
    </article>
  `,
})
export class SliderPage {
  protected discount = 10;
  protected readonly price = signal<[number, number] | null>([150, 600]);
  protected readonly usd = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);
  protected readonly hours = signal<[number, number] | null>([8, 17]);
  protected readonly hoursText = (v: number) => `${v}h`;
  protected readonly filter = new FormGroup({
    age: new FormControl<[number, number] | null>([25, 45]),
  });
  protected readonly ages = this.filter.controls.age;
  protected readonly JSON = JSON;

  protected budget = 120;
  protected terms = 30;

  protected readonly band = signal<[number, number] | null>([50, 250]);
  protected readonly products = [
    { name: 'Office chair', price: 85 },
    { name: 'Desk', price: 210 },
    { name: 'Desk lamp', price: 19 },
    { name: 'Bookcase', price: 145 },
    { name: '3-seat sofa', price: 420 },
  ];
  protected readonly productsInRange = computed(() => {
    const [min, max] = this.band() ?? [0, Infinity];
    return this.products.filter((p) => p.price >= min && p.price <= max);
  });
  protected readonly area = signal<[number, number] | null>([60, 180]);
  protected setArea(i: 0 | 1, event: Event): void {
    const v = Number((event.target as HTMLInputElement).value);
    const [a, b] = this.area()!;
    this.area.set(i === 0 ? [Math.min(Math.max(v, 20), b), b] : [a, Math.max(Math.min(v, 400), a)]);
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Monthly budget</label>
  <input type="range" mxSlider min="0" max="500" step="10"
         [(ngModel)]="budget" [attr.aria-valuetext]="budget + ' dollars'" />
  <mx-hint>{{ budget }} USD</mx-hint>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: 'md',
      description: '4, 6 or 8 px bar.',
    },
    {
      kind: 'Input',
      name: 'invalid',
      type: 'boolean',
      default: 'false',
      description: 'Forces the error state.',
    },
    { kind: 'Input', name: 'id', type: 'string', default: 'generated', description: 'Input id.' },
    {
      kind: 'Componente',
      name: 'mx-range-slider',
      type: 'value: [number, number] | null (model)',
      description: 'Two thumbs. Also with ngModel and Reactive Forms.',
    },
    {
      kind: 'Input',
      name: 'min, max, step',
      type: 'number',
      default: '0, 100, 1',
      description: 'Of the range slider.',
    },
    {
      kind: 'Input',
      name: 'minGap',
      type: 'number',
      default: '0',
      description: 'Minimum distance between the thumbs.',
    },
    {
      kind: 'Input',
      name: 'format',
      type: '(v: number) => string',
      description: 'Text for each value (aria-valuetext and labels).',
    },
    {
      kind: 'Input',
      name: 'showValues',
      type: 'boolean',
      default: 'false',
      description: 'Shows both values below.',
    },
    {
      kind: 'Input',
      name: 'lowLabel, highLabel',
      type: 'string',
      default: 'minimum, maximum (from the language)',
      description: 'Each thumb\'s name.',
    },
    {
      kind: 'Token CSS',
      name: '--mx-accent',
      type: 'color',
      default: '#0F5257',
      description: 'Fill color.',
    },
  ];
}
