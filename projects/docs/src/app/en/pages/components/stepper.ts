import { MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MX_STEPPER, MxStepState } from '@muxima-ui/core/stepper';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-stepper-page',
  imports: [DOC_UI, MX_STEPPER, MxButton, MxFormField, MxLabel, MxInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Stepper' }]"
        title="Stepper"
        lead="Shows which step of a flow the person is on. It's an ordered list; the current step has aria-current=step and the completed ones are announced."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Stepper example" align="start">
          <div class="stack w-full">
            <ol mxStepper aria-label="Sign-up progress">
              @for (s of steps; track s; let i = $index) {
                <li mxStep [state]="state(i)">{{ s }}</li>
              }
            </ol>
            <div class="row-end">
              <button mxButton type="button" variant="outline" size="sm" [disabled]="current() === 0" (click)="current.set(current() - 1)">Back</button>
              <button mxButton type="button" size="sm" [disabled]="current() === steps.length" (click)="current.set(current() + 1)">{{ current() >= steps.length - 1 ? 'Finish' : 'Next' }}</button>
            </div>
            <p class="mx-visually-hidden" aria-live="polite">{{ live() }}</p>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MX_STEPPER } from '@muxima-ui/core/stepper';" />
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="To do" note="upcoming"><ol mxStepper aria-label="To do"><li mxStep>Payment</li></ol></doc-state>
          <doc-state name="Current" note="current, aria-current=step"><ol mxStepper aria-label="Current"><li mxStep state="current">Payment</li></ol></doc-state>
          <doc-state name="Completed" note="complete"><ol mxStepper aria-label="Completed"><li mxStep state="complete">Payment</li></ol></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Vertical">
            <ol mxStepper orientation="vertical" aria-label="Order status">
              <li mxStep state="complete">Order received</li>
              <li mxStep state="complete">Payment confirmed</li>
              <li mxStep state="current">Being prepared</li>
              <li mxStep>Delivered</li>
            </ol>
          </doc-example>
          <doc-example title="Multi-step form" note="The content changes below the stepper; the step title receives focus.">
            <div class="stack w-full">
              <ol mxStepper aria-label="New invoice">
                @for (s of fSteps; track s; let i = $index) {
                  <li mxStep [state]="i < f() ? 'complete' : i === f() ? 'current' : 'upcoming'">{{ s }}</li>
                }
              </ol>
              <div class="step-panel">
                <h4 tabindex="-1" #stepTitle>{{ fSteps[f()] }}</h4>
                @switch (f()) {
                  @case (0) { <mx-form-field><label mxLabel>Customer</label><input mxInput value="Kianda Logistics" /></mx-form-field> }
                  @case (1) { <mx-form-field><label mxLabel>Amount (Kz)</label><input mxInput inputmode="decimal" value="1 250 000" /></mx-form-field> }
                  @case (2) { <p class="muted">Confirm the details and issue the invoice.</p> }
                }
              </div>
              <div class="row-end">
                <button mxButton type="button" variant="outline" size="sm" [disabled]="f() === 0" (click)="go(f() - 1, stepTitle)">Back</button>
                <button mxButton type="button" size="sm" (click)="go(f() + 1, stepTitle)" [disabled]="f() === fSteps.length - 1">Next</button>
              </div>
            </div>
          </doc-example>
          <doc-example title="Numbers only, compact">
            <ol mxStepper aria-label="Progress" class="w-full">
              <li mxStep state="complete"><span class="mx-visually-hidden">Cart</span></li>
              <li mxStep state="complete"><span class="mx-visually-hidden">Address</span></li>
              <li mxStep state="current"><span class="mx-visually-hidden">Payment</span></li>
              <li mxStep><span class="mx-visually-hidden">Confirmation</span></li>
            </ol>
          </doc-example>
          <doc-example title="Vertical with descriptions">
            <ol mxStepper orientation="vertical" aria-label="Account opening">
              <li mxStep state="complete">Company details <span class="step-desc">Tax ID validated with the tax authority</span></li>
              <li mxStep state="current">Documents <span class="step-desc">Business license and registration certificate</span></li>
              <li mxStep>Signature <span class="step-desc">Manager's digital signature</span></li>
            </ol>
          </doc-example>
        </div>
        <doc-callout>On narrow screens, the horizontal stepper only shows the current step's name; the others keep just the number, but screen readers still read them.</doc-callout>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Not interactive: navigation happens through the buttons of the flow.' }]"
          [aria]="[
            'ol with aria-label: screen readers say how many steps there are.',
            'The current step has aria-current=step.',
            'Completed steps add (completed) for screen readers only.',
            'When the step changes, announce it or move focus to the step title.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Progress' }, { name: 'Tabs' }, { name: 'Breadcrumb' }]" />
      </section>
    </article>
  `,
})
export class StepperPage {
  protected readonly fSteps = ['Customer', 'Amounts', 'Confirmation'];
  protected readonly f = signal(0);
  protected go(i: number, title: HTMLElement): void {
    this.f.set(i);
    setTimeout(() => title.focus());
  }

  protected readonly steps = ['Company', 'Contact', 'Plan', 'Confirmation'];
  protected readonly current = signal(1);
  protected readonly live = computed(() =>
    this.current() >= this.steps.length ? 'Sign-up complete' : `Step ${this.current() + 1} of ${this.steps.length}: ${this.steps[this.current()]}`,
  );
  protected state(i: number): MxStepState {
    return i < this.current() ? 'complete' : i === this.current() ? 'current' : 'upcoming';
  }

  protected readonly previewCode = `<ol mxStepper aria-label="Sign-up progress">
  <li mxStep state="complete">Company</li>
  <li mxStep state="current">Contact</li>
  <li mxStep>Plan</li>
  <li mxStep>Confirmation</li>
</ol>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: 'ol[mxStepper]', type: "orientation: 'horizontal' | 'vertical'", default: 'horizontal' },
    { kind: 'Directiva', name: 'li[mxStep]', type: "state: 'complete' | 'current' | 'upcoming'", default: 'upcoming' },
    { kind: 'Input', name: 'completeText', type: 'string', default: 'completed', description: 'Text read on completed steps.' },
  ];
}
