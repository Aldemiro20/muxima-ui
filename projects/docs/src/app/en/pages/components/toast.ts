import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxToast, MxToastPosition } from '@muxima-ui/core/toast';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-toast-page',
  imports: [DOC_UI, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Toast' }]"
        title="Toast"
        lead="A temporary notice in the corner of the screen after an action. Each type has its own color on the background, border and icon: error in red, warning in amber, success in green and information in Kwanza."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Toast example">
          <button mxButton type="button" variant="outline" (click)="toast.success('Invoice sent', { description: 'FT 2026/0142 to Kianda Logistics.' })">Success</button>
          <button mxButton type="button" variant="outline" (click)="toast.error('Sending failed', { description: 'The server did not respond. Try again.' })">Error</button>
          <button mxButton type="button" variant="outline" (click)="toast.warning('3 days left', { description: 'Invoice FT 2026/0139 is due on October 30.' })">Warning</button>
          <button mxButton type="button" variant="outline" (click)="toast.info('New version available', { description: 'Reload the page to see what is new.' })">Information</button>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxToast } from '@muxima-ui/core/toast';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>Type icon, title, optional description, an optional action and the close button.</p>
        <doc-structure [labels]="{ topLeft: 'Type icon', topRight: 'Close button', bottomLeft: 'Background at 9% of the color', bottomRight: 'Border at 40% of the color', bottom: 'At most 5 at a time' }">
          <div class="mx-toast static-toast" data-variant="danger"><span class="mx-toast-icon" aria-hidden="true"></span><div class="mx-toast-text"><p class="mx-toast-title">Sending failed</p></div></div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>The five types and the loading state. Color is never the only cue: each type has its own icon and the title says what happened.</p>
        <div class="toast-gallery">
          @for (v of variants; track v.name) {
            <div class="toast-gallery-item">
              <div class="mx-toast static-toast" [attr.data-variant]="v.variant" [attr.aria-busy]="v.loading ? 'true' : null">
                @if (v.loading) {
                  <span class="mx-toast-icon mx-spinner" aria-hidden="true"></span>
                } @else if (v.variant) {
                  <span class="mx-toast-icon" aria-hidden="true"></span>
                }
                <div class="mx-toast-text">
                  <p class="mx-toast-title">{{ v.title }}</p>
                  <p class="mx-toast-description">{{ v.description }}</p>
                </div>
              </div>
              <p class="state-name">{{ v.name }}</p>
              <p class="state-note">{{ v.note }}</p>
            </div>
          }
        </div>
        <doc-code-toggle [code]="galleryCode" label="States" />
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Error with retry" note="On error, screen readers announce it immediately. The action gives more time (10 s).">
            <button mxButton type="button" variant="outline" size="sm" (click)="failWithRetry()">Sync invoices</button>
          </doc-example>
          <doc-example title="Loading, then the result" note="toast.promise() uses the same notification: it starts loading and changes to success or error.">
            <button mxButton type="button" variant="outline" size="sm" (click)="send(true)">Send (will succeed)</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="send(false)">Send (will fail)</button>
          </doc-example>
          <doc-example title="Undo an action" note="A pattern for deletions: the action happens right away and can be undone.">
            <button mxButton type="button" variant="outline" size="sm" (click)="undo()">Archive project</button>
          </doc-example>
          <doc-example title="Persistent" note="duration: 0. It only closes with the button or clear().">
            <button mxButton type="button" variant="outline" size="sm" (click)="toast.warning('No internet connection', { description: 'Your changes are saved and will be sent when the connection is back.', duration: 0 })">Simulate offline</button>
            <button mxButton type="button" variant="ghost" size="sm" (click)="toast.clear()">Close all</button>
          </doc-example>
          <doc-example title="Position" [note]="'Current: ' + position()">
            @for (p of positions; track p.value) {
              <button mxButton type="button" size="sm" [variant]="position() === p.value ? 'default' : 'outline'" [attr.aria-pressed]="position() === p.value" (click)="setPosition(p.value)">{{ p.label }}</button>
            }
          </doc-example>
          <doc-example title="Text only" note="No type: neutral, for simple confirmations.">
            <button mxButton type="button" variant="outline" size="sm" (click)="toast.show('Changes saved')">Save</button>
          </doc-example>
        </div>
        <doc-callout>Don't use toasts for errors that block progress or for information the person needs to keep: use an Alert on the page or a Dialog.</doc-callout>
      </section>

      <section>
        <h2>When to use each type</h2>
        <div class="mx-table-container">
          <table class="mx-table" data-density="compact">
            <thead><tr><th scope="col">Type</th><th scope="col">Color</th><th scope="col">When</th><th scope="col">Announcement</th></tr></thead>
            <tbody>
              <tr><td><code>danger</code></td><td>Red (--mx-danger)</td><td>The action failed.</td><td>Immediate</td></tr>
              <tr><td><code>warning</code></td><td>Amber (--mx-warning)</td><td>It worked, but there's something to keep in mind.</td><td>Polite</td></tr>
              <tr><td><code>success</code></td><td>Green (--mx-success)</td><td>The action finished successfully.</td><td>Polite</td></tr>
              <tr><td><code>info</code></td><td>Kwanza (--mx-accent)</td><td>News that doesn't come from an action.</td><td>Polite</td></tr>
              <tr><td><code>default</code></td><td>Neutral</td><td>A simple confirmation.</td><td>Polite</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Reaches the action and the close button.' }, { key: 'Enter', action: 'Activates the action or closes.' }]"
          [aria]="[
            'The text is announced through an aria-live region: polite, or immediate for danger.',
            'Color is not the only cue: each type has an icon and the title describes the result.',
            'The countdown pauses with the mouse or focus on the notification (WCAG 2.2.1).',
            'While loading, the notification has aria-busy and does not disappear on its own.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Alert' }, { name: 'Dialog' }, { name: 'Progress' }]" />
      </section>
    </article>
  `,
})
export class ToastPage {
  protected readonly toast = inject(MxToast);
  protected readonly position = signal<MxToastPosition>('bottom-right');
  protected readonly positions: { value: MxToastPosition; label: string }[] = [
    { value: 'top-left', label: 'Top, left' },
    { value: 'top-center', label: 'Top, center' },
    { value: 'top-right', label: 'Top, right' },
    { value: 'bottom-left', label: 'Bottom, left' },
    { value: 'bottom-center', label: 'Bottom, center' },
    { value: 'bottom-right', label: 'Bottom, right' },
  ];
  protected readonly variants = [
    { name: 'Danger', variant: 'danger', title: 'Sending failed', description: 'The server didn\'t respond.', note: 'Error: red, immediate announcement.', loading: false },
    { name: 'Warning', variant: 'warning', title: '3 days left', description: 'FT 2026/0139 is due on 10/30.', note: 'Warning: amber.', loading: false },
    { name: 'Success', variant: 'success', title: 'Invoice sent', description: 'To Kianda Logistics.', note: 'Success: green.', loading: false },
    { name: 'Info', variant: 'info', title: 'New version', description: 'Reload to see what\'s new.', note: 'Information: Kwanza.', loading: false },
    { name: 'Default', variant: null, title: 'Changes saved', description: '2 seconds ago.', note: 'Neutral, no icon.', loading: false },
    { name: 'Loading', variant: null, title: 'Sending 30 invoices', description: 'Don\'t close the page.', note: 'loading: true; it doesn\'t disappear.', loading: true },
  ];

  protected readonly galleryCode = {
    html: `<!-- The Toast isn't written in the template: it's opened through the MxToast service. -->`,
    ts: `import { Component, inject } from '@angular/core';
import { MxToast } from '@muxima-ui/core/toast';

@Component({ selector: 'app-example', template: '' })
export class Example {
  private readonly toast = inject(MxToast);

  showAll(): void {
    this.toast.error('Sending failed', { description: 'The server did not respond.' });
    this.toast.warning('3 days left', { description: 'FT 2026/0139 is due on 10/30.' });
    this.toast.success('Invoice sent', { description: 'To Kianda Logistics.' });
    this.toast.info('New version', { description: 'Reload to see what is new.' });
    this.toast.show('Changes saved', { description: '2 seconds ago.' });
    this.toast.show('Sending 30 invoices', { description: 'Do not close the page.', loading: true });
  }
}`,
  };

  protected setPosition(p: MxToastPosition): void {
    this.position.set(p);
    this.toast.setPosition(p);
    this.toast.show('Notifications appear here');
  }

  protected failWithRetry(): void {
    this.toast.error('Couldn\'t sync', {
      description: '12 invoices weren\'t sent.',
      action: { label: 'Try again', run: () => this.send(true) },
    });
  }

  protected send(ok: boolean): void {
    const work = new Promise<number>((resolve, reject) => setTimeout(() => (ok ? resolve(30) : reject(new Error('timeout'))), 1600));
    this.toast
      .promise(work, {
        loading: 'Sending 30 invoices...',
        success: (n) => `${n} invoices sent`,
        error: 'Sending failed: the server didn\'t respond',
      })
      .catch(() => undefined);
  }

  protected undo(): void {
    this.toast.show('Project archived', {
      action: { label: 'Undo', run: () => this.toast.success('Project restored') },
    });
  }

  protected readonly previewCode = `const toast = inject(MxToast);

toast.success('Invoice sent', { description: 'FT 2026/0142 to Kianda Logistics.' });
toast.error('Sending failed', {
  description: 'The server did not respond.',
  action: { label: 'Try again', run: () => resend() },
});
toast.warning('3 days left');
toast.info('New version available');

// loading, then the result, in the same notification
toast.promise(send(), {
  loading: 'Sending...',
  success: (n) => n + ' invoices sent',
  error: 'Sending failed',
});`;

  protected readonly api: ApiRow[] = [
    { kind: 'Serviço', name: 'show(title, options)', type: 'number', description: 'Shows it and returns the id.' },
    { kind: 'Serviço', name: 'success(), error(), warning(), info()', type: 'number', description: 'Shortcuts with the type set.' },
    { kind: 'Serviço', name: 'promise(promise, messages)', type: 'Promise<T>', description: 'Loading, then success or error.' },
    { kind: 'Serviço', name: 'update(id, title, options)', type: 'void', description: 'Changes a visible notification.' },
    { kind: 'Serviço', name: 'dismiss(id), clear()', type: 'void' },
    { kind: 'Serviço', name: 'setPosition(position)', type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'", default: 'bottom-right' },
    { kind: 'Input', name: 'options.variant', type: "'default' | 'info' | 'success' | 'warning' | 'danger'", default: 'default' },
    { kind: 'Input', name: 'options.description', type: 'string' },
    { kind: 'Input', name: 'options.duration', type: 'number', default: '5000 (10000 with an action)', description: '0 = doesn\'t disappear.' },
    { kind: 'Input', name: 'options.action', type: '{ label, run }' },
    { kind: 'Input', name: 'options.loading', type: 'boolean', default: 'false', description: 'Waiting indicator; stays until update().' },
    { kind: 'Token CSS', name: '--mx-danger, --mx-warning, --mx-success, --mx-accent', type: 'color', description: 'Color of each type.' },
  ];
}
