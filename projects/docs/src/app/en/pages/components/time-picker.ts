import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import {
  MxError,
  MxFieldset,
  MxFormField,
  MxHint,
  MxInput,
  MxLabel,
} from '@muxima-ui/core/form-field';
import { MxTimePicker, mxTimeToMinutes } from '@muxima-ui/core/time-picker';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-time-picker-page',
  imports: [
    DOC_UI,
    MxTimePicker,
    MxFormField,
    MxLabel,
    MxHint,
    MxError,
    MxInput,
    MxButton,
    FormsModule,
    ReactiveFormsModule,
    MxFieldset,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Time picker' }]"
        title="Time picker"
        lead="A time field where you type the way you speak (9, 930, 9h30) or pick from a list with the interval you set. The value is always HH:mm, in 24-hour time."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Time picker example">
          <mx-form-field class="w-280">
            <label mxLabel>Meeting time</label>
            <mx-time-picker [(value)]="time" [step]="15" min="08:00" max="18:00" />
            <mx-hint>Between 8:00 and 18:00.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxTimePicker } from '@muxima-ui/core/time-picker';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>A text field with the combobox role and a list of times that opens below.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Free text: 9, 930, 9h30',
            topRight: 'Clock icon',
            bottomLeft: 'role=listbox list',
            bottomRight: 'Times every step',
            bottom: 'The value is an HH:mm string',
          }"
        >
          <mx-time-picker class="w-180" aria-label="Example" value="09:30" />
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Empty"><mx-time-picker aria-label="Empty" /></doc-state>
          <doc-state name="With time"
            ><mx-time-picker aria-label="With time" value="09:30"
          /></doc-state>
          <doc-state name="Hover"
            ><mx-time-picker aria-label="Hover" value="09:30" data-mx-state="hover"
          /></doc-state>
          <doc-state name="Focus"
            ><mx-time-picker aria-label="Focus" value="09:30" data-mx-state="focus"
          /></doc-state>
          <doc-state name="Disabled"
            ><mx-time-picker aria-label="Disabled" value="09:30" disabled
          /></doc-state>
          <doc-state name="Error" note="Invalid time or outside min and max."
            ><mx-time-picker aria-label="Error" value="21:00" max="18:00"
          /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="Type freely"
            [note]="'Value: ' + (free() ?? 'none') + '. Try 9, 1430 or 9h15.'"
          >
            <mx-form-field class="w-full">
              <label mxLabel>Arrival time</label>
              <mx-time-picker [(value)]="free" [step]="30" />
            </mx-form-field>
          </doc-example>
          <doc-example title="Start and end" note="The second field's minimum is the first one's time.">
            <fieldset mxFieldset orientation="horizontal" class="w-full">
              <legend>Opening hours</legend>
              <mx-form-field class="grow">
                <label mxLabel>Opens</label>
                <mx-time-picker [(value)]="opens" [step]="30" [max]="closes()" />
              </mx-form-field>
              <mx-form-field class="grow">
                <label mxLabel>Closes</label>
                <mx-time-picker [(value)]="closes" [step]="30" [min]="opens()" />
              </mx-form-field>
            </fieldset>
          </doc-example>
          <doc-example
            title="With validation"
            note="Validators.required and min/max show the error after touching the field."
          >
            <form
              class="stack w-full"
              [formGroup]="marcacao"
              (ngSubmit)="marcacao.markAllAsTouched()"
            >
              <mx-form-field>
                <label mxLabel>Appointment time</label>
                <mx-time-picker formControlName="time" [step]="20" min="08:00" max="16:40" />
                <mx-hint>Every 20 minutes, from 8:00 to 16:40.</mx-hint>
                <mx-error>Choose a time between 8:00 and 16:40.</mx-error>
              </mx-form-field>
              <div><button mxButton type="submit" size="sm">Book</button></div>
            </form>
          </doc-example>
          <doc-example title="Sizes">
            <div class="stack w-full">
              <mx-time-picker size="sm" aria-label="Small" value="09:00" />
              <mx-time-picker aria-label="Medium" value="09:00" />
              <mx-time-picker size="lg" aria-label="Large" value="09:00" />
            </div>
          </doc-example>
          <doc-example
            title="Native alternative"
            note="input type=time with mxInput: no list, with the browser picker."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Shift start</label>
              <input mxInput type="time" step="900" [(ngModel)]="shift" />
            </mx-form-field>
          </doc-example>
          <doc-example
            title="Date and time"
            note="Combine a Date picker and a Time picker in the same fieldset."
          >
            <fieldset mxFieldset orientation="horizontal" class="w-full">
              <legend>Scheduled send</legend>
              <mx-form-field class="grow">
                <label mxLabel>Time</label>
                <mx-time-picker [(value)]="sendAt" [step]="60" />
              </mx-form-field>
              <mx-form-field class="grow">
                <label mxLabel>Date and time (native)</label>
                <input mxInput type="datetime-local" value="2026-11-02T08:00" />
              </mx-form-field>
            </fieldset>
          </doc-example>
          <doc-example
            title="Computed duration"
            note="mxTimeToMinutes converts HH:mm to minutes for calculations."
          >
            <div class="stack w-full">
              <fieldset mxFieldset orientation="horizontal">
                <legend>Team meeting</legend>
                <mx-form-field class="grow">
                  <label mxLabel>Home</label>
                  <mx-time-picker [(value)]="start" [step]="15" />
                </mx-form-field>
                <mx-form-field class="grow">
                  <label mxLabel>End</label>
                  <mx-time-picker [(value)]="end" [step]="15" [min]="start()" />
                </mx-form-field>
              </fieldset>
              <p class="muted" aria-live="polite">{{ duration() }}</p>
            </div>
          </doc-example>
          <doc-example
            title="Now button"
            note="Rounds the current time to the 5-minute step."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Delivery time</label>
              <div class="row-wrap">
                <mx-time-picker class="grow" [(value)]="delivery" [step]="5" />
                <button mxButton type="button" variant="outline" (click)="now()">Now</button>
              </div>
            </mx-form-field>
          </doc-example>
          <doc-example
            title="Hours by weekday"
            note="Size sm in a table; each field has the day and the part in its name."
          >
            <div class="mx-table-container w-full">
              <table class="mx-table" data-density="compact">
                <caption class="mx-visually-hidden">
                  Business hours
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Day</th>
                    <th scope="col">Opens</th>
                    <th scope="col">Closes</th>
                  </tr>
                </thead>
                <tbody>
                  @for (d of week; track d.day) {
                    <tr>
                      <th scope="row">{{ d.day }}</th>
                      <td>
                        <mx-time-picker
                          size="sm"
                          [step]="30"
                          [(value)]="d.opens"
                          [aria-label]="d.day + ', opens'"
                        />
                      </td>
                      <td>
                        <mx-time-picker
                          size="sm"
                          [step]="30"
                          [(value)]="d.closes"
                          [min]="d.opens()"
                          [aria-label]="d.day + ', closes'"
                        />
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            {
              key: '↓ / Alt + ↓',
              action: 'Opens the list at the chosen time, or the one closest to the current time.',
            },
            { key: '↑ ↓', action: 'Previous and next time in the list.' },
            { key: 'Page Up / Down', action: 'Jumps 8 entries in the list.' },
            { key: 'Enter', action: 'Picks and closes.' },
            { key: 'Esc', action: 'Closes without changing.' },
            { key: 'Digits', action: 'Type the time directly; the list follows.' },
          ]"
          [aria]="[
            'WAI-ARIA combobox-with-list pattern: role=combobox, aria-expanded and aria-activedescendant.',
            'The chosen time has aria-selected in the list.',
            'A time outside min and max gives the field aria-invalid and shows the form field error.',
            'You can always type, without opening the list.',
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
          [items]="[{ name: 'Date picker' }, { name: 'Date range picker' }, { name: 'Combobox' }]"
        />
      </section>
    </article>
  `,
})
export class TimePickerPage {
  protected readonly time = signal<string | null>('10:00');
  protected readonly free = signal<string | null>(null);
  protected readonly opens = signal<string | null>('08:00');
  protected readonly closes = signal<string | null>('17:00');
  protected readonly sendAt = signal<string | null>('08:00');
  protected shift = '07:45';
  protected readonly marcacao = new FormGroup({
    time: new FormControl<string | null>(null, Validators.required),
  });

  protected readonly start = signal<string | null>('09:00');
  protected readonly end = signal<string | null>('10:30');
  protected readonly duration = computed(() => {
    const a = this.start();
    const b = this.end();
    if (!a || !b) return 'Choose the start and end.';
    const min = mxTimeToMinutes(b) - mxTimeToMinutes(a);
    if (min <= 0) return 'The end must be after the start.';
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `Duration: ${h ? h + ' h' : ''}${h && m ? ' ' : ''}${m ? m + ' min' : ''}.`;
  });
  protected readonly delivery = signal<string | null>(null);
  protected now(): void {
    const d = new Date();
    const min = Math.round((d.getHours() * 60 + d.getMinutes()) / 5) * 5;
    this.delivery.set(
      `${String(Math.floor(min / 60) % 24).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`,
    );
  }
  protected readonly week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => ({
    day,
    opens: signal<string | null>('08:00'),
    closes: signal<string | null>(day === 'Friday' ? '15:00' : '17:00'),
  }));

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Meeting time</label>
  <mx-time-picker formControlName="time" [step]="15" min="08:00" max="18:00" />
  <mx-hint>Between 8:00 and 18:00.</mx-hint>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'value',
      type: 'string | null (model)',
      description: 'HH:mm. Also with ngModel and Reactive Forms.',
    },
    {
      kind: 'Input',
      name: 'step',
      type: 'number',
      default: '30',
      description: 'Minutes between the times in the list.',
    },
    {
      kind: 'Input',
      name: 'min, max',
      type: 'string | null',
      description: 'First and last time, HH:mm.',
    },
    { kind: 'Input', name: 'placeholder', type: 'string', default: 'hh:mm' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    {
      kind: 'Método',
      name: 'mxParseTime(text)',
      type: 'string | null',
      description: 'Converts 9, 930, 9h30 to HH:mm.',
    },
    {
      kind: 'Método',
      name: 'mxTimeToMinutes(time)',
      type: 'number',
      description: 'Minutes since midnight.',
    },
  ];
}
