import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxOtp } from '@muxima-ui/core/otp';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-otp-page',
  imports: [DOC_UI, MxOtp, MxFormField, MxLabel, MxHint, MxError, MxButton, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'OTP input' }]"
        title="OTP input"
        lead="A one-time code in separate boxes. Underneath there's a single native input: pasting the code and SMS autofill work, and screen readers hear a normal field."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="OTP example">
          <mx-form-field>
            <label mxLabel>Code sent to +244 9•• ••• 512</label>
            <mx-otp [formControl]="code" (completed)="verify($event)" />
            <mx-hint>{{ status() }}</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxOtp } from '@muxima-ui/core/otp';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>The boxes are only visual. The real input sits on top, transparent, with autocomplete=one-time-code.</p>
        <doc-structure [labels]="{ topLeft: '40 px box', topRight: 'Active box with ring', bottomLeft: '1 real input', bottomRight: '8 px gap', bottom: 'inputmode=numeric opens the number keypad' }">
          <mx-otp [length]="4" aria-label="Example" [value]="'12'" />
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Empty"><mx-otp [length]="4" size="sm" aria-label="Empty" /></doc-state>
          <doc-state name="Hover"><mx-otp [length]="4" size="sm" aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Focus"><mx-otp [length]="4" size="sm" aria-label="Focus" data-mx-state="focus" /></doc-state>
          <doc-state name="Filled"><mx-otp [length]="4" size="sm" aria-label="Filled" [value]="'4821'" /></doc-state>
          <doc-state name="Disabled"><mx-otp [length]="4" size="sm" aria-label="Disabled" disabled [value]="'48'" /></doc-state>
          <doc-state name="Error"><mx-otp [length]="4" size="sm" aria-label="Error" invalid [value]="'4821'" /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Validation" note="The correct code in this example is 123456.">
            <div class="stack">
              <mx-form-field>
                <label mxLabel>Verification code</label>
                <mx-otp [formControl]="validated" />
                <mx-error>The code has 6 digits.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" size="sm" (click)="validated.markAsTouched()">Verify</button></div>
            </div>
          </doc-example>
          <doc-example title="Sizes and letters" note="numeric=false accepts letters (invite codes).">
            <div class="stack">
              <mx-otp [length]="4" size="sm" aria-label="Small" />
              <mx-otp [length]="5" size="lg" [numeric]="false" aria-label="Invite code" />
            </div>
          </doc-example>
          <doc-example title="4-digit PIN">
            <mx-form-field>
              <label mxLabel>Card PIN</label>
              <mx-otp [length]="4" />
              <mx-hint>Never share your PIN.</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example title="Resend code" note="The button stays disabled during the countdown, which is announced every 10 s.">
            <div class="stack">
              <mx-form-field>
                <label mxLabel>Code sent by SMS</label>
                <mx-otp [length]="6" />
              </mx-form-field>
              <div class="row-inline">
                <button mxButton type="button" variant="link" size="sm" [disabled]="seconds() > 0" (click)="resend()">Resend code</button>
                @if (seconds() > 0) {
                  <span class="small-label">in {{ seconds() }} s</span>
                }
              </div>
              <span class="mx-visually-hidden" aria-live="polite">{{ seconds() % 10 === 0 && seconds() > 0 ? 'You can resend in ' + seconds() + ' seconds' : '' }}</span>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Digits', action: 'Fill the boxes in order.' }, { key: 'Backspace', action: 'Deletes the last one.' }, { key: 'Ctrl + V', action: 'Pastes the whole code.' }]"
          [aria]="[
            'A single input: screen readers read the code as one text field, not six.',
            'autocomplete=one-time-code: the phone suggests the code from the SMS.',
            'maxlength limits it to the number of boxes; the label and the error are linked.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>mx-otp</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Input' }, { name: 'Button' }, { name: 'Alert' }]" />
      </section>
    </article>
  `,
})
export class OtpPage {
  protected readonly seconds = signal(30);
  private readonly tick = setInterval(() => this.seconds.update((s) => Math.max(0, s - 1)), 1000);
  private readonly stop = inject(DestroyRef).onDestroy(() => clearInterval(this.tick));
  protected resend(): void {
    this.seconds.set(30);
  }

  protected readonly code = new FormControl('');
  protected readonly validated = new FormControl('', [Validators.required, Validators.minLength(6)]);
  protected readonly status = signal('6 digits. You can paste the code.');

  protected verify(code: string): void {
    this.status.set(`Verifying ${code}...`);
    setTimeout(() => this.status.set('Code verified.'), 700);
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Code sent by SMS</label>
  <mx-otp [length]="6" formControlName="code" (completed)="verify($event)" />
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'length', type: 'number', default: '6' },
    { kind: 'Input', name: 'value', type: 'string (model)', default: "''" },
    { kind: 'Input', name: 'numeric', type: 'boolean', default: 'true', description: 'Digits only.' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '32, 40 or 48 px boxes.' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    { kind: 'Output', name: 'completed', type: 'string', description: 'All boxes filled.' },
  ];
}
