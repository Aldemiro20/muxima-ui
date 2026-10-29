import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import {
  MxCalendar,
  MxDateRange,
  mxDateRangeComplete,
  MxDateRangePicker,
  mxDefaultRangePresets,
} from '@muxima-ui/core/date-picker';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MX_MESSAGES_EN } from '@muxima-ui/core/i18n';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

/** Validator: the period can't be longer than `max` days. */
function maxDays(max: number) {
  return (c: AbstractControl<MxDateRange | null>): ValidationErrors | null => {
    const v = c.value;
    if (!v?.start || !v.end) return null;
    const days = Math.round((v.end.getTime() - v.start.getTime()) / 864e5) + 1;
    return days > max ? { tooLong: { days } } : null;
  };
}

@Component({
  selector: 'doc-date-range-picker-page',
  imports: [
    DOC_UI,
    MxDateRangePicker,
    MxCalendar,
    MxFormField,
    MxLabel,
    MxHint,
    MxError,
    MxButton,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Date range picker' }]"
        title="Date range picker"
        lead="A period with a start and end date, in a single field. Type each part (mm/dd/yyyy in English) or pick it in the calendar with two clicks, with optional shortcuts such as Last 7 days."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Date range picker example">
          <mx-form-field class="w-320">
            <label mxLabel>Report period</label>
            <mx-date-range-picker [(value)]="period" [presets]="presets" />
            <mx-hint>Type the dates or pick them in the calendar.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code
          code="import { MxDateRangePicker, mxDefaultRangePresets } from '@muxima-ui/core/date-picker';"
        />
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          Two text fields inside the same frame, the calendar button and the panel with shortcuts
          and calendar.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Start field',
            topRight: 'End field and button',
            bottomLeft: 'Shortcuts (optional)',
            bottomRight: 'Range calendar',
            bottom: 'The value is { start, end }',
          }"
        >
          <mx-date-range-picker class="w-280" aria-label="Example" [value]="sample" />
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Empty"><mx-date-range-picker aria-label="Empty" /></doc-state>
          <doc-state name="With period"
            ><mx-date-range-picker aria-label="With period" [value]="sample"
          /></doc-state>
          <doc-state name="Disabled"
            ><mx-date-range-picker aria-label="Disabled" [value]="sample" disabled
          /></doc-state>
          <doc-state name="Error" note="End before start, invalid text, or invalid."
            ><mx-date-range-picker aria-label="Error" [value]="inverted"
          /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Range calendar" [note]="summary(range())">
            <mx-calendar mode="range" [(range)]="range" />
          </doc-example>
          <doc-example
            title="With validation"
            note="mxDateRangeComplete requires start and end; Validators.required requires a period."
          >
            <form class="stack w-full" [formGroup]="vacation" (ngSubmit)="vacation.markAllAsTouched()">
              <mx-form-field>
                <label mxLabel>Vacation</label>
                <mx-date-range-picker formControlName="period" [min]="today" />
                <mx-hint>From today.</mx-hint>
                <mx-error>Enter the first and last day of your vacation.</mx-error>
              </mx-form-field>
              <div><button mxButton type="submit" size="sm">Request vacation</button></div>
            </form>
          </doc-example>
          <doc-example
            title="Custom shortcuts"
            note="presets takes a label and a function, so today is computed on click."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Quarter</label>
              <mx-date-range-picker [(value)]="quarter" [presets]="quarters" />
            </mx-form-field>
          </doc-example>
          <doc-example
            title="Business days and sizes"
            note="dateDisabled removes weekends from the calendar."
          >
            <div class="stack w-full">
              <mx-date-range-picker
                size="sm"
                aria-label="Period in business days"
                [dateDisabled]="isWeekend"
              />
              <mx-date-range-picker size="lg" aria-label="Large period" [value]="sample" />
            </div>
          </doc-example>
          <doc-example
            title="Filter a table"
            [note]="filteredInvoices().length + ' of ' + invoices.length + ' invoices in the period.'"
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Issued between</label>
                <mx-date-range-picker [(value)]="filterPeriod" [presets]="presets" size="sm" />
              </mx-form-field>
              <div class="mx-table-container">
                <table class="mx-table" data-density="compact">
                  <caption class="mx-visually-hidden">
                    Invoices in the chosen period
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Invoice</th>
                      <th scope="col">Issued</th>
                      <th scope="col" data-align="end">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (f of filteredInvoices(); track f.number) {
                      <tr>
                        <td>{{ f.number }}</td>
                        <td>{{ f.issued.toLocaleDateString('en-US') }}</td>
                        <td data-align="end">{{ f.amount }}</td>
                      </tr>
                    } @empty {
                      <tr>
                        <td colspan="3" class="mx-table-empty">No invoices in this period.</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </doc-example>
          <doc-example
            title="Booking with nights"
            note="startLabel and endLabel change each field's name: Stay, check-in and Stay, check-out."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Stay</label>
              <mx-date-range-picker
                [(value)]="stay"
                [min]="today"
                startLabel="checkIn"
                endLabel="check-out"
              />
              <mx-hint>{{
                nights()
                  ? nights() + (nights() === 1 ? ' night' : ' nights')
                  : 'Choose check-in and check-out.'
              }}</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example
            title="Days already booked"
            note="dateDisabled prevents booked dates from being the start or end."
          >
            <mx-calendar mode="range" [(range)]="room" [dateDisabled]="booked" />
          </doc-example>
          <doc-example
            title="Maximum period of 31 days"
            note="A custom validator joins mxDateRangeComplete."
          >
            <form class="stack w-full" [formGroup]="statement">
              <mx-form-field>
                <label mxLabel>Bank statement</label>
                <mx-date-range-picker formControlName="dates" [max]="today" />
                <mx-hint>Up to 31 days at a time.</mx-hint>
                @if (statement.controls.dates.hasError('tooLong')) {
                  <mx-error
                    >The period has {{ statement.controls.dates.getError('tooLong').days }} days; the
                    maximum is 31.</mx-error
                  >
                } @else {
                  <mx-error>Enter the start and end.</mx-error>
                }
              </mx-form-field>
            </form>
          </doc-example>
        </div>
        <doc-callout
          >For two independent fields, for example when the end is optional, use two Date pickers
          with min and max linked to each other.</doc-callout
        >
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Moves from start to end and to the calendar button.' },
            { key: 'Alt + ↓', action: 'Opens the calendar from either field.' },
            {
              key: 'Arrows, Page Up / Down',
              action: 'Move in the calendar; the range is previewed.',
            },
            { key: 'Enter Space', action: 'First marks the start, then the end, and closes.' },
            { key: 'Esc', action: 'Closes and returns focus to the button.' },
          ]"
          [aria]="[
            'Each field is announced with the label and the part: Report period, start.',
            'The range days have aria-selected; the start and end say so in their name.',
            'After the first click it announces: Choose the end date.',
            'The button says the chosen period: Change range, October 1, 2026 to October 15, 2026.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related
          [items]="[{ name: 'Date picker' }, { name: 'Time picker' }, { name: 'Popover' }]"
        />
      </section>
    </article>
  `,
})
export class DateRangePickerPage {
  protected readonly today = new Date();
  protected readonly presets = mxDefaultRangePresets(MX_MESSAGES_EN.dateRangePicker);
  protected readonly period = signal<MxDateRange | null>(null);
  protected readonly sample: MxDateRange = {
    start: new Date(2026, 9, 1),
    end: new Date(2026, 9, 15),
  };
  protected readonly inverted: MxDateRange = {
    start: new Date(2026, 9, 15),
    end: new Date(2026, 9, 1),
  };
  protected readonly range = signal<MxDateRange | null>({
    start: new Date(2026, 9, 6),
    end: new Date(2026, 9, 10),
  });
  protected readonly quarter = signal<MxDateRange | null>(null);
  protected readonly vacation = new FormGroup({
    period: new FormControl<MxDateRange | null>(null, [Validators.required, mxDateRangeComplete]),
  });
  protected readonly isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;
  protected readonly quarters = [1, 2, 3, 4].map((t) => ({
    label: `Q${t}`,
    range: () => {
      const year = new Date().getFullYear();
      return { start: new Date(year, (t - 1) * 3, 1), end: new Date(year, t * 3, 0) };
    },
  }));

  protected summary(r: MxDateRange | null): string {
    const f = (d: Date | null) => (d ? d.toLocaleDateString('en-US') : '...');
    return r?.start ? `From ${f(r.start)} to ${f(r.end)}.` : 'Choose the first day.';
  }

  protected readonly invoices = [
    { number: 'FT 2026/0201', issued: new Date(2026, 9, 26), amount: '250 000,00 Kz' },
    { number: 'FT 2026/0198', issued: new Date(2026, 9, 21), amount: '5 079 000,00 Kz' },
    { number: 'FT 2026/0193', issued: new Date(2026, 9, 6), amount: '4 651 500,00 Kz' },
    { number: 'FT 2026/0187', issued: new Date(2026, 8, 24), amount: '1 230 000,00 Kz' },
    { number: 'FT 2026/0180', issued: new Date(2026, 8, 9), amount: '845 000,00 Kz' },
  ];
  protected readonly filterPeriod = signal<MxDateRange | null>({
    start: new Date(2026, 9, 1),
    end: new Date(2026, 9, 31),
  });
  protected readonly filteredInvoices = computed(() => {
    const p = this.filterPeriod();
    if (!p?.start || !p.end) return this.invoices;
    return this.invoices.filter((f) => f.issued >= p.start! && f.issued <= p.end!);
  });
  protected readonly stay = signal<MxDateRange | null>(null);
  protected readonly nights = computed(() => {
    const e = this.stay();
    return e?.start && e.end ? Math.round((e.end.getTime() - e.start.getTime()) / 864e5) : 0;
  });
  protected readonly room = signal<MxDateRange | null>(null);
  private readonly bookings = [8, 9, 14, 15, 16, 22];
  protected readonly booked = (d: Date) =>
    d.getMonth() === 9 && this.bookings.includes(d.getDate());
  protected readonly statement = new FormGroup({
    dates: new FormControl<MxDateRange | null>(null, [mxDateRangeComplete, maxDays(31)]),
  });

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Report period</label>
  <mx-date-range-picker formControlName="period" [presets]="presets" />
</mx-form-field>

// presets = mxDefaultRangePresets(inject(MxI18n).messages().dateRangePicker);`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'value',
      type: 'MxDateRange | null (model)',
      description: '{ start, end }, dates without time. Also with Reactive Forms.',
    },
    {
      kind: 'Input',
      name: 'presets',
      type: 'MxDateRangePreset[]',
      default: '[]',
      description: 'Shortcuts: { label, range: () => ({ start, end }) }.',
    },
    { kind: 'Input', name: 'min, max', type: 'Date | null', description: 'Calendar limits.' },
    {
      kind: 'Input',
      name: 'dateDisabled',
      type: '(d: Date) => boolean',
      description: 'Days that can\'t be picked.',
    },
    {
      kind: 'Input',
      name: 'startLabel, endLabel',
      type: 'string',
      default: 'start, end (from the language)',
      description: 'Each field\'s name, joined to the label.',
    },
    { kind: 'Input', name: 'locale, placeholder, size', type: 'as in Date picker' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    {
      kind: 'Função',
      name: 'mxDefaultRangePresets()',
      type: 'MxDateRangePreset[]',
      description: 'Last 7 and 30 days, this month and last month (labels from the argument).',
    },
    {
      kind: 'Função',
      name: 'mxDateRangeComplete',
      type: 'ValidatorFn',
      description: 'rangeIncomplete error if the start or end is missing.',
    },
    {
      kind: 'Directiva',
      name: 'mx-calendar mode="range"',
      type: '[(range)], (rangeSelected)',
      description: 'The range calendar, to use on its own.',
    },
  ];
}
