import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MX_ALERT } from '@muxima-ui/core/alert';
import { MxButton } from '@muxima-ui/core/button';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-alert-page',
  imports: [DOC_UI, MX_ALERT, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Alert' }]"
        title="Alert"
        lead="A highlighted message inside the page: information, success, warning or error. By default it doesn't interrupt screen readers; it only announces when you ask it to."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Alert example" align="start">
          <div mxAlert variant="warning" class="w-full">
            <p mxAlertTitle>Your session expires in 5 minutes</p>
            <p>Save your work so you don't lose changes.</p>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MX_ALERT } from '@muxima-ui/core/alert';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>Icon on the left, title and text on the right. The color comes from the state's token.</p>
        <doc-structure [labels]="{ topLeft: '16 px icon', topRight: 'Border at 30%', bottomLeft: 'Background at 6%', bottomRight: '10 px radius', bottom: 'Optional title with mxAlertTitle' }">
          <div mxAlert variant="success" class="w-180"><p>Saved.</p></div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>Four meaning variants. The icon changes with the variant, so it doesn't rely on color alone.</p>
        <doc-states>
          <doc-state name="Info"><div mxAlert class="w-full"><p>New version available.</p></div></doc-state>
          <doc-state name="Success"><div mxAlert variant="success" class="w-full"><p>Payment confirmed.</p></div></doc-state>
          <doc-state name="Warning"><div mxAlert variant="warning" class="w-full"><p>3 days left.</p></div></doc-state>
          <doc-state name="Danger"><div mxAlert variant="danger" class="w-full"><p>Sending failed.</p></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="After an action" note="With announce, screen readers read the message when it appears.">
            <div class="stack">
              <div><button mxButton type="button" variant="outline" (click)="send()">Send invoices</button></div>
              @if (result() === 'error') {
                <div mxAlert variant="danger" announce>
                  <p mxAlertTitle>Couldn't send</p>
                  <p>Check your connection and try again.</p>
                </div>
              }
            </div>
          </doc-example>
          <doc-example title="With an action">
            <div mxAlert class="w-full">
              <p mxAlertTitle>Turn on two-step verification</p>
              <p>Protects your account even if your password is discovered.</p>
              <div class="alert-actions"><button mxButton type="button" size="sm" variant="outline">Turn on</button></div>
            </div>
          </doc-example>
          <doc-example title="Variants" note="Each has its own icon, so it doesn't rely on color.">
            <div class="stack w-full">
              <div mxAlert><p mxAlertTitle>Information</p><p>The tax authority updated the invoicing rules.</p></div>
              <div mxAlert variant="success"><p mxAlertTitle>All up to date</p><p>Every October invoice has been paid.</p></div>
              <div mxAlert variant="warning"><p mxAlertTitle>Warning</p><p>The digital certificate expires in 12 days.</p></div>
              <div mxAlert variant="danger"><p mxAlertTitle>Error</p><p>Couldn't connect to the bank.</p></div>
            </div>
          </doc-example>
          <doc-example title="With a close button" note="mxAlertClose; hiding the alert is up to the app.">
            <div class="stack w-full">
              @if (showInfo()) {
                <div mxAlert>
                  <p mxAlertTitle>New</p>
                  <p>You can now export invoices to CSV.</p>
                  <button mxAlertClose (click)="showInfo.set(false)"></button>
                </div>
              } @else {
                <div><button mxButton type="button" variant="outline" size="sm" (click)="showInfo.set(true)">Show again</button></div>
              }
            </div>
          </doc-example>
          <doc-example title="Form error summary" note="Lists the fields with errors, with links to each one.">
            <div mxAlert variant="danger" class="w-full" tabindex="-1">
              <p mxAlertTitle>Fix 2 fields to continue</p>
              <ul class="alert-list">
                <li><a href="#campo-nif" (click)="$event.preventDefault()">The tax ID must have 10 digits</a></li>
                <li><a href="#campo-email" (click)="$event.preventDefault()">The email isn't valid</a></li>
              </ul>
            </div>
          </doc-example>
          <doc-example title="Compact, text only" note="No title, for short messages next to a field.">
            <div mxAlert variant="warning" class="w-full"><p>This customer has 3 overdue invoices.</p></div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Only the buttons or links inside receive focus.' }]"
          [aria]="[
            'Without announce: it is normal content, read in page order.',
            'With announce: role=alert, read as soon as it is inserted. Use it only for responses to an action.',
            'Each variant has its own icon, so it does not rely on color.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>[mxAlert]</code>, <code>[mxAlertTitle]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Toast' }, { name: 'Dialog' }, { name: 'Badge' }]" />
      </section>
    </article>
  `,
})
export class AlertPage {
  protected readonly showInfo = signal(true);

  protected readonly result = signal<'error' | null>(null);
  protected send(): void {
    this.result.set(null);
    setTimeout(() => this.result.set('error'), 300);
  }

  protected readonly previewCode = `<div mxAlert variant="warning">
  <p mxAlertTitle>Your session expires in 5 minutes</p>
  <p>Save your work so you don't lose changes.</p>
</div>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'variant', type: "'info' | 'success' | 'warning' | 'danger'", default: 'info' },
    { kind: 'Input', name: 'announce', type: 'boolean', default: 'false', description: 'role=alert: read when it appears.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', description: 'Info variant color.' },
    { kind: 'Token CSS', name: '--mx-success, --mx-warning, --mx-danger', type: 'color' },
  ];
}
