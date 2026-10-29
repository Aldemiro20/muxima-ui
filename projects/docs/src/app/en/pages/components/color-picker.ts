import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxColorPanel, MxColorPicker, mxColorName, mxContrast } from '@muxima-ui/core/color-picker';
import { MX_MESSAGES_EN } from '@muxima-ui/core/i18n';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxChoice, MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxProgress } from '@muxima-ui/core/progress';
import { MxSwitch } from '@muxima-ui/core/switch';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-color-picker-page',
  imports: [
    DOC_UI,
    MxChoice,
    MxSwitch,
    MxCheckbox,
    MxProgress,
    MxColorPicker,
    MxColorPanel,
    MxFormField,
    MxLabel,
    MxHint,
    MxError,
    MxButton,
    MxBadge,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Color picker' }]"
        title="Color picker"
        lead="Choose a color by typing the hex (or rgb()) or in a panel with a saturation and brightness area, hue, opacity, swatches and an eyedropper. All with the keyboard, and every color has a name for screen readers."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Color picker example">
          <mx-form-field class="w-280">
            <label mxLabel>Brand color</label>
            <mx-color-picker [(value)]="brand" [swatches]="suggestions" />
            <mx-hint>{{ brand() ? name(brand()!) : 'No color' }}</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code
          code="import { MxColorPicker, MxColorPanel, mxColorName, mxContrast } from '@muxima-ui/core/color-picker';"
        />
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          The field has the swatch (a button that opens the panel) and the text. The panel brings together area, hue,
          opacity, hex and swatches.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Area: saturation and brightness',
            topRight: 'Hue (range input)',
            bottomLeft: 'Hex field',
            bottomRight: 'Swatches',
            bottom: 'The value is a hex',
          }"
        >
          <mx-color-panel [value]="'#1F6F78'" [swatches]="suggestions" />
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Empty"><mx-color-picker aria-label="Empty" /></doc-state>
          <doc-state name="With color"
            ><mx-color-picker aria-label="With color" [value]="'#1F6F78'"
          /></doc-state>
          <doc-state name="With opacity"
            ><mx-color-picker aria-label="With opacity" [value]="'#1F6F7880'" alpha
          /></doc-state>
          <doc-state name="Disabled"
            ><mx-color-picker aria-label="Disabled" [value]="'#1F6F78'" disabled
          /></doc-state>
          <doc-state name="Error"><mx-color-picker aria-label="Error" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="Panel on its own"
            [note]="'Value: ' + panel() + ' (' + name(panel()!) + ')'"
          >
            <div class="row-wrap">
              <mx-color-panel [(value)]="panel" />
              <button
                mxButton
                type="button"
                [style.background]="panel()"
                [style.color]="textOn(panel()!)"
              >
                Sample button
              </button>
            </div>
          </doc-example>
          <doc-example
            title="With opacity"
            [note]="'alpha returns 8 digits below 100%: ' + shadow()"
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Shadow color</label>
                <mx-color-picker [(value)]="shadow" alpha />
              </mx-form-field>
              <div class="color-shadow-demo" [style.box-shadow]="'0 12px 28px ' + shadow()">
                Card with shadow
              </div>
            </div>
          </doc-example>
          <doc-example
            title="Fixed palette"
            note="swatchesOnly shows only the swatches; each says its name and hex."
          >
            <div class="stack">
              <mx-color-panel [(value)]="tag" [swatches]="palette" swatchesOnly />
              <p>
                Label:
                <span
                  mxBadge
                  [style.background]="tag()"
                  [style.color]="textOn(tag()!)"
                  >Urgent</span
                >
              </p>
            </div>
          </doc-example>
          <doc-example
            title="Check contrast"
            [note]="
              'Contrast ' +
              contrast() +
              ':1 — ' +
              (contrastOk() ? 'passes AA for normal text.' : 'does not reach 4.5:1 (AA).')
            "
          >
            <div class="stack w-full">
              <div class="row-wrap">
                <mx-form-field class="grow">
                  <label mxLabel>Text</label>
                  <mx-color-picker [(value)]="text" size="sm" />
                </mx-form-field>
                <mx-form-field class="grow">
                  <label mxLabel>Background</label>
                  <mx-color-picker [(value)]="background" size="sm" />
                </mx-form-field>
              </div>
              <p class="color-contrast-demo" [style.color]="text()" [style.background]="background()">
                Invoice FT 2026/0201 · $250.00
              </p>
            </div>
          </doc-example>
          <doc-example
            title="In a form"
            note="Validators.required and a format error when the text isn't a color."
          >
            <form
              class="stack w-full"
              [formGroup]="category"
              (ngSubmit)="category.markAllAsTouched()"
            >
              <mx-form-field>
                <label mxLabel>Category color</label>
                <mx-color-picker formControlName="color" />
                <mx-hint>Hex (#1F6F78) or rgb(31, 111, 120).</mx-hint>
                <mx-error>Choose or type a valid color.</mx-error>
              </mx-form-field>
              <div><button mxButton size="sm" type="submit">Save</button></div>
            </form>
          </doc-example>
          <doc-example
            title="Live theme"
            note="The chosen color becomes --mx-accent only inside the card: switch, checkbox and progress follow it."
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Accent color</label>
                <mx-color-picker [(value)]="accent" [swatches]="suggestions" />
              </mx-form-field>
              <div
                class="color-theme-demo"
                [style.--mx-accent]="accent()"
                [style.--mx-on-accent]="textOn(accent()!)"
                [style.--mx-accent-soft]="
                  'color-mix(in oklab, ' + accent() + ' 12%, var(--mx-surface))'
                "
              >
                <label mxChoice
                  ><input type="checkbox" mxSwitch checked /> Automatic reminders</label
                >
                <label mxChoice><input type="checkbox" mxCheckbox checked /> Send a copy</label>
                <progress mxProgress value="64" max="100" aria-label="Plan invoices used">
                  64%
                </progress>
              </div>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Alt + ↓', action: 'In the field, opens the panel.' },
            { key: '← →', action: 'In the area, saturation; with Shift, 10% steps.' },
            { key: '↑ ↓', action: 'In the area, brightness; Page Up and Page Down, 10% steps.' },
            { key: 'Home End', action: 'In the area, minimum and maximum saturation.' },
            { key: 'Arrows', action: 'On hue and opacity (native range input).' },
            { key: 'Esc', action: 'Closes the panel and returns to the swatch button.' },
          ]"
          [aria]="[
            'The area is a slider with aria-valuetext: Saturation 75%, brightness 47%, dark teal.',
            'The hue says the degrees and the color name: 186 degrees, teal.',
            'Each swatch is a button with the name and hex, and aria-pressed on the chosen one.',
            'The field button says the current color: Change color, red, #B42318.',
            'You can always type the color, without using the panel.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Input' }, { name: 'Slider' }, { name: 'Popover' }]" />
      </section>
    </article>
  `,
})
export class ColorPickerPage {
  protected readonly brand = signal<string | null>('#1F6F78');
  protected readonly suggestions = [
    '#1F6F78',
    '#0F5257',
    '#17663F',
    '#93460A',
    '#B42318',
    '#4A2C6F',
    '#1F3A93',
    '#3A3631',
  ];
  protected readonly panel = signal<string | null>('#4A2C6F');
  protected readonly shadow = signal<string | null>('#0F525740');
  protected readonly tag = signal<string | null>('#B42318');
  protected readonly palette = [
    { color: '#B42318', label: 'Urgent' },
    { color: '#93460A', label: 'Warning' },
    { color: '#17663F', label: 'Done' },
    { color: '#1F3A93', label: 'Information' },
    { color: '#4A2C6F', label: 'Internal' },
    { color: '#3A3631', label: 'Archive' },
  ];
  protected readonly text = signal<string | null>('#FFFFFF');
  protected readonly background = signal<string | null>('#1F6F78');
  protected readonly contrast = computed(() =>
    mxContrast(this.text() ?? '#000000', this.background() ?? '#FFFFFF').toLocaleString('en-US', {
      maximumFractionDigits: 1,
    }),
  );
  protected readonly contrastOk = computed(
    () => mxContrast(this.text() ?? '#000000', this.background() ?? '#FFFFFF') >= 4.5,
  );
  protected readonly category = new FormGroup({
    color: new FormControl<string | null>(null, Validators.required),
  });
  protected readonly accent = signal<string | null>('#93460A');

  protected name(hex: string): string {
    return mxColorName(hex, MX_MESSAGES_EN.colorPicker.names);
  }
  /** Black or white, whichever contrasts more with the color. */
  protected textOn(hex: string): string {
    return mxContrast(hex, '#FFFFFF') >= mxContrast(hex, '#1A1816') ? '#FFFFFF' : '#1A1816';
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Brand color</label>
  <mx-color-picker formControlName="color" [swatches]="suggestions" />
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Componente',
      name: 'mx-color-picker',
      type: 'value: string | null (model)',
      description: 'Field with a panel. Also with ngModel and Reactive Forms.',
    },
    {
      kind: 'Input',
      name: 'alpha',
      type: 'boolean',
      default: 'false',
      description: 'Opacity; 8-digit hex below 100%.',
    },
    { kind: 'Input', name: 'swatches', type: '(string | { color, label })[]', default: '[]' },
    { kind: 'Input', name: 'placeholder', type: 'string', default: '#RRGGBB' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    {
      kind: 'Componente',
      name: 'mx-color-panel',
      type: 'value, alpha, swatches, showInput, swatchesOnly, disabled',
      description: 'The panel, to use on its own.',
    },
    {
      kind: 'Output',
      name: 'committed',
      type: 'string',
      description: 'In the panel: on release, picking a swatch or finishing typing.',
    },
    {
      kind: 'Função',
      name: 'mxParseColor(text)',
      type: 'string | null',
      description: '3, 4, 6 or 8-digit hex, rgb() and rgba().',
    },
    {
      kind: 'Função',
      name: 'mxColorName(hex)',
      type: 'string',
      description: 'Approximate name, in Portuguese by default; pass names for another language.',
    },
    {
      kind: 'Função',
      name: 'mxContrast(a, b)',
      type: 'number',
      description: 'WCAG contrast from 1 to 21.',
    },
    { kind: 'Função', name: 'mxHexToHsva, mxHsvaToHex, mxHexToRgba', type: 'conversions' },
  ];
}
