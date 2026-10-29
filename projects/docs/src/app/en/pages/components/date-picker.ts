import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxCalendar, MxDatePicker } from '@muxima-ui/core/date-picker';
import { MxError, MxFieldset, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-date-picker-page',
  imports: [DOC_UI, MxDatePicker, MxCalendar, MxFormField, MxLabel, MxHint, MxError, MxButton, ReactiveFormsModule, MxFieldset],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Date picker' }]"
        title="Date picker"
        lead="A date field where you can type the date or pick it from a calendar. The calendar is an accessible grid; the week starts on the language's first day (Sunday in English)."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Date picker example">
          <mx-form-field class="w-320">
            <label mxLabel>Due date</label>
            <mx-date-picker [formControl]="dueDate" [min]="today" />
            <mx-hint>mm/dd/yyyy. Can't be before today.</mx-hint>
            <mx-error>Enter a valid date, from today onwards.</mx-error>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxDatePicker, MxCalendar } from '@muxima-ui/core/date-picker';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>A text input, a button that opens the calendar, and the calendar in a non-modal panel.</p>
        <doc-structure [labels]="{ topLeft: 'Text mm/dd/yyyy', topRight: 'Calendar button', bottomLeft: 'role=grid grid', bottomRight: '34 px day', bottom: 'The value is a Date without time' }">
          <mx-date-picker class="w-180" aria-label="Example" [value]="sample" />
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Empty"><mx-date-picker aria-label="Empty" /></doc-state>
          <doc-state name="With date"><mx-date-picker aria-label="With date" [value]="sample" /></doc-state>
          <doc-state name="Hover"><mx-date-picker aria-label="Hover" [value]="sample" data-mx-state="hover" /></doc-state>
          <doc-state name="Focus"><mx-date-picker aria-label="Focus" [value]="sample" data-mx-state="focus" /></doc-state>
          <doc-state name="Disabled"><mx-date-picker aria-label="Disabled" [value]="sample" disabled /></doc-state>
          <doc-state name="Error" note="Invalid format or out of range."><mx-date-picker aria-label="Error" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Calendar on its own" [note]="'Chosen: ' + (day() ? day()!.toLocaleDateString('en-US') : 'none') + '. Weekends unavailable.'">
            <mx-calendar [(value)]="day" [dateDisabled]="isWeekend" />
          </doc-example>
          <doc-example title="Allowed range" note="min and max limit both typing and the calendar.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Meeting date</label>
                <mx-date-picker [formControl]="meeting" [min]="today" [max]="in30Days" />
                <mx-hint>Within the next 30 days.</mx-hint>
                <mx-error>Choose a date within the next 30 days.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" size="sm" (click)="meeting.markAsTouched()">Validate</button></div>
            </div>
          </doc-example>
          <doc-example title="From / to period" note="Two fields; the second one's minimum is the first one's date.">
            <fieldset mxFieldset orientation="horizontal" class="w-full">
              <legend>Report period</legend>
              <mx-form-field class="grow">
                <label mxLabel>From</label>
                <mx-date-picker [(value)]="from" [max]="to()" />
              </mx-form-field>
              <mx-form-field class="grow">
                <label mxLabel>To</label>
                <mx-date-picker [(value)]="to" [min]="from()" />
              </mx-form-field>
            </fieldset>
          </doc-example>
          <doc-example title="Prefilled and read-only" note="disabled shows the date but doesn't let you change it.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Issue date</label>
                <mx-date-picker [value]="sample" />
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>Registration date</label>
                <mx-date-picker [value]="registered" disabled />
              </mx-form-field>
            </div>
          </doc-example>
          <doc-example title="Sizes">
            <div class="stack w-full">
              <mx-date-picker size="sm" aria-label="Small" [value]="sample" />
              <mx-date-picker aria-label="Medium" [value]="sample" />
              <mx-date-picker size="lg" aria-label="Large" [value]="sample" />
            </div>
          </doc-example>
        </div>
        <doc-callout>For a date the person knows by heart, like a date of birth, three fields or the native input type=date are faster than a calendar.</doc-callout>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Alt + ↓', action: 'Opens the calendar from the field.' },
            { key: '← → ↑ ↓', action: 'Previous and next day, previous and next week.' },
            { key: 'Home End', action: 'Start and end of the week.' },
            { key: 'Page Up / Down', action: 'Previous and next month.' },
            { key: 'Shift + Page Up / Down', action: 'Previous and next year.' },
            { key: 'Enter Space', action: 'Picks the day and closes.' },
            { key: 'Esc', action: 'Closes and returns focus to the button.' }
          ]"
          [aria]="[
            'The button says the chosen date: Change date, Friday, November 13, 2026.',
            'The calendar is a dialog with a grid (role=grid); the month is announced when it changes.',
            'Each day has its full name; today has aria-current=date and the chosen one aria-selected.',
            'You can always type the date, without using the calendar.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Date range picker' }, { name: 'Time picker' }, { name: 'Popover' }]" />
      </section>
    </article>
  `,
})
export class DatePickerPage {
  protected readonly from = signal<Date | null>(new Date(2026, 9, 1));
  protected readonly to = signal<Date | null>(new Date(2026, 9, 31));
  protected readonly registered = new Date(2021, 2, 15);

  protected readonly today = new Date();
  protected readonly in30Days = new Date(Date.now() + 30 * 86400000);
  protected readonly sample = new Date(2026, 10, 13);
  protected readonly dueDate = new FormControl<Date | null>(null);
  protected readonly meeting = new FormControl<Date | null>(null, Validators.required);
  protected readonly day = signal<Date | null>(null);
  protected readonly isWeekend = (d: Date) => d.getDay() === 0 || d.getDay() === 6;

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Due date</label>
  <mx-date-picker formControlName="dueDate" [min]="today" />
  <mx-hint>mm/dd/yyyy</mx-hint>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'value', type: 'Date | null (model)', description: 'Also with ngModel and Reactive Forms.' },
    { kind: 'Input', name: 'min, max', type: 'Date | null', description: 'Range limits.' },
    { kind: 'Input', name: 'dateDisabled', type: '(d: Date) => boolean', description: 'Days that can\'t be picked.' },
    { kind: 'Input', name: 'locale', type: 'string', default: 'from the language', description: 'Month and day names.' },
    { kind: 'Input', name: 'placeholder', type: 'string', default: 'mm/dd/yyyy' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    { kind: 'Directiva', name: 'mx-calendar', type: 'value, min, max, dateDisabled, locale, firstDayOfWeek', description: 'The calendar, to use on its own.' },
    { kind: 'Método', name: 'mxParseDate(text, order), mxFormatDate(date, order)', type: 'functions', description: "Converts typed dates. The order is 'dmy' (default), 'mdy' or 'ymd'." },
  ];
}
