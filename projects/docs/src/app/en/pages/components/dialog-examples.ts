import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MX_DIALOG_DATA } from '@muxima-ui/core/dialog';
import { MxChoice, MxChoiceDescription, MxFieldset } from '@muxima-ui/core/form-field';
import { MxRadio } from '@muxima-ui/core/radio';

/** Simple dialog, to compare the sizes. */
@Component({
  selector: 'doc-size-dialog',
  imports: [MX_DIALOG, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Size {{ data.size }}</h2>
      <p mxDialogDescription>{{ data.width }} maximum width.</p>
    </mx-dialog-header>
    <mx-dialog-content>
      <p>Use sm for confirmations, md for short forms and lg for content with tables or two columns.</p>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" mxDialogClose>Close</button>
    </mx-dialog-footer>
  `,
})
export class SizeDialog {
  protected readonly data = inject<{ size: string; width: string }>(MX_DIALOG_DATA);
}

/** Long content: the body scrolls and the footer stays visible. */
@Component({
  selector: 'doc-terms-dialog',
  imports: [MX_DIALOG, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Terms of service</h2>
      <p mxDialogDescription>Version of October 1, 2026</p>
    </mx-dialog-header>
    <mx-dialog-content class="dialog-scroll" tabindex="0" role="region" aria-label="Terms text">
      @for (s of sections; track s) {
        <h3>{{ s }}</h3>
        <p>
          The service is provided under Angolan law. Billing data is kept for the
          period required by law and can be exported at any time by the account administrator.
        </p>
      }
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="outline" [mxDialogClose]="false">Decline</button>
      <button mxButton type="button" [mxDialogClose]="true">Accept</button>
    </mx-dialog-footer>
  `,
})
export class TermsDialog {
  protected readonly sections = ['1. Purpose', '2. Account and access', '3. Payments', '4. Personal data', '5. Cancellation', '6. Governing law'];
}

/** A choice inside a dialog, returned on close. */
@Component({
  selector: 'doc-plan-dialog',
  imports: [MX_DIALOG, MxButton, FormsModule, MxRadio, MxChoice, MxChoiceDescription, MxFieldset],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Change plan</h2>
      <p mxDialogDescription>The change takes effect in the next billing cycle.</p>
    </mx-dialog-header>
    <mx-dialog-content>
      <fieldset mxFieldset>
        <legend class="mx-visually-hidden">Plans</legend>
        @for (p of plans; track p.id) {
          <label mxChoice card>
            <input type="radio" mxRadio name="dialog-plan" [value]="p.id" [(ngModel)]="plan" />
            <span>{{ p.name }}<span mxChoiceDescription>{{ p.desc }}</span></span>
          </label>
        }
      </fieldset>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="outline" mxDialogClose>Cancel</button>
      <button mxButton type="button" [mxDialogClose]="plan">Confirm</button>
    </mx-dialog-footer>
  `,
})
export class PlanDialog {
  protected plan = 'team';
  protected readonly plans = [
    { id: 'basic', name: 'Basic', desc: 'Free, 1 user' },
    { id: 'team', name: 'Team', desc: '$25/month, up to 10 users' },
    { id: 'business', name: 'Business', desc: 'Contact us' },
  ];
}

/** Success message after an important action. */
@Component({
  selector: 'doc-success-dialog',
  imports: [MX_DIALOG, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dialog-success">
      <span class="success-mark" aria-hidden="true"></span>
      <h2 mxDialogTitle>Payment recorded</h2>
      <p mxDialogDescription>Invoice FT 2026/0144 was marked as paid and the receipt was sent to the customer.</p>
      <div class="dialog-success-actions">
        <button mxButton type="button" variant="outline" mxDialogClose>Close</button>
        <button mxButton type="button" [mxDialogClose]="true">See receipt</button>
      </div>
    </div>
  `,
})
export class SuccessDialog {}
