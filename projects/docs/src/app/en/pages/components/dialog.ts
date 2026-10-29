import { PlanDialog, SuccessDialog, SizeDialog, TermsDialog } from './dialog-examples';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MX_DIALOG_DATA, MxDialog, MxDialogRef } from '@muxima-ui/core/dialog';
import { MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-confirm-delete',
  imports: [MX_DIALOG, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Delete project?</h2>
      <p mxDialogDescription>The project "Customer portal" and its 14 files will be deleted. This action can't be undone.</p>
    </mx-dialog-header>
    <mx-dialog-content></mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton variant="outline" mxDialogClose>Cancel</button>
      <button mxButton variant="destructive" [mxDialogClose]="true">Delete project</button>
    </mx-dialog-footer>
  `,
})
export class ConfirmDelete {}

@Component({
  selector: 'doc-rename-dialog',
  imports: [MX_DIALOG, MxButton, MxFormField, MxLabel, MxInput, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (ngSubmit)="ref.close(name)">
      <mx-dialog-header>
        <h2 mxDialogTitle>Rename</h2>
        <p mxDialogDescription>The new name is shown to the whole team.</p>
      </mx-dialog-header>
      <mx-dialog-content>
        <mx-form-field>
          <label mxLabel>Project name</label>
          <input mxInput name="name" [(ngModel)]="name" required />
        </mx-form-field>
      </mx-dialog-content>
      <mx-dialog-footer>
        <button mxButton variant="outline" mxDialogClose>Cancel</button>
        <button mxButton type="submit">Save</button>
      </mx-dialog-footer>
    </form>
  `,
})
export class RenameDialog {
  protected readonly ref = inject<MxDialogRef<string>>(MxDialogRef);
  protected name = inject<{ name: string }>(MX_DIALOG_DATA).name;
}

@Component({
  selector: 'doc-dialog-page',
  imports: [DOC_UI, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Dialog' }]"
        title="Dialog"
        lead="Confirmations and small flows that need the user's attention. Focus is trapped in the dialog and returns to the button that opened it."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Dialog example">
          <button mxButton variant="destructive" type="button" (click)="confirm()">Delete project</button>
          <span class="muted" aria-live="polite">{{ result() }}</span>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxDialog, MX_DIALOG } from '@muxima-ui/core/dialog';" />
        <p>The dialog uses <code>&#64;angular/cdk</code> for the floating layer and to trap focus.</p>
      </section>

      <section>
        <h2>Structure</h2>
        <p>A header with title and description, content, and a footer with the actions. The main action is on the right.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Title (aria-labelledby)',
            topRight: '10 px radius',
            bottomLeft: 'Description (aria-describedby)',
            bottomRight: 'Actions in the footer',
            bottom: 'Dimmed backdrop; Esc and clicking outside close it'
          }"
        >
          <div class="mini-dialog" aria-hidden="true">
            <strong>Delete project?</strong>
            <span>This action can't be undone.</span>
            <span class="mini-actions"><i></i><i class="dark"></i></span>
          </div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>A dialog is open or closed; the states that matter are those of the buttons and fields inside, and the alert mode.</p>
        <doc-states>
          <doc-state name="Closed" note="Focus returns to the button that opened it."><button mxButton type="button" variant="outline">Open dialog</button></doc-state>
          <doc-state name="Open" note="Focus trapped in the panel; Esc closes."><div class="mini-dialog"><strong>Title</strong><span>Short description.</span><div class="mini-actions"><i></i><i class="dark"></i></div></div></doc-state>
          <doc-state name="Action in progress" note="Confirm button with loading."><button mxButton type="button" loading>Deleting</button></doc-state>
          <doc-state name="Can't dismiss" note="disableClose: only the buttons close it."><button mxButton type="button" variant="destructive">Delete</button></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Form in a dialog" [note]="'Current name: ' + projectName()">
            <button mxButton type="button" variant="outline" (click)="rename()">Rename</button>
          </doc-example>
          <doc-example title="Required confirmation" note="With disableClose, only the buttons close the dialog.">
            <button mxButton type="button" variant="outline" (click)="mandatory()">Accept terms</button>
          </doc-example>
          <doc-example title="Sizes" note="sm 400 px, md 520 px, lg 720 px.">
            <button mxButton type="button" variant="outline" size="sm" (click)="size('sm', '400 px')">Small</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="size('md', '520 px')">Medium</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="size('lg', '720 px')">Large</button>
          </doc-example>
          <doc-example title="Long content" note="The body scrolls; the title and buttons stay visible.">
            <button mxButton type="button" variant="outline" (click)="terms()">Read the terms</button>
          </doc-example>
          <doc-example title="Choice in a dialog" [note]="'Plan: ' + plan()">
            <button mxButton type="button" variant="outline" (click)="choosePlan()">Change plan</button>
          </doc-example>
          <doc-example title="Success confirmation" note="For results the person should see before moving on.">
            <button mxButton type="button" variant="outline" (click)="success()">Record payment</button>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab Shift+Tab', action: 'Cycle only inside the dialog.' },
            { key: 'Esc', action: 'Closes the dialog (except with disableClose).' },
            { key: 'Enter', action: 'Activates the focused button or submits the form.' }
          ]"
          [aria]="[
            'role=&quot;dialog&quot; or &quot;alertdialog&quot; and aria-modal=&quot;true&quot;.',
            'mxDialogTitle names the dialog; mxDialogDescription describes it.',
            'On open, focus goes to the first focusable element; on close, it returns to the opener.',
            'Use alertdialog for destructive confirmations.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Button', path: '/components/button' }, { name: 'Drawer' }, { name: 'Popover' }]" />
      </section>
    </article>
  `,
})
export class DialogPage {
  protected readonly plan = signal('team');
  protected size(size: 'sm' | 'md' | 'lg', width: string): void {
    this.dialog.open(SizeDialog, { size, data: { size, width } });
  }
  protected terms(): void {
    this.dialog.open<boolean>(TermsDialog, { size: 'md' }).closed.subscribe((ok) => this.result.set(ok ? 'Terms accepted.' : ''));
  }
  protected choosePlan(): void {
    this.dialog.open<string>(PlanDialog).closed.subscribe((p) => p && this.plan.set(p));
  }
  protected success(): void {
    this.dialog.open(SuccessDialog, { size: 'sm' });
  }

  private readonly dialog = inject(MxDialog);
  protected readonly result = signal('');
  protected readonly projectName = signal('Customer portal');

  protected confirm(): void {
    this.dialog
      .open<boolean>(ConfirmDelete, { role: 'alertdialog', size: 'sm' })
      .closed.subscribe((ok) => this.result.set(ok ? 'Project deleted.' : 'Cancelled.'));
  }

  protected rename(): void {
    this.dialog
      .open<string>(RenameDialog, { data: { name: this.projectName() } })
      .closed.subscribe((name) => name && this.projectName.set(name));
  }

  protected mandatory(): void {
    this.dialog.open(ConfirmDelete, { role: 'alertdialog', size: 'sm', disableClose: true });
  }

  protected readonly previewCode = `// confirm-delete.ts
@Component({
  imports: [MX_DIALOG, MxButton],
  template: \`
    <mx-dialog-header>
      <h2 mxDialogTitle>Delete project?</h2>
      <p mxDialogDescription>This action can't be undone.</p>
    </mx-dialog-header>
    <mx-dialog-footer>
      <button mxButton variant="outline" mxDialogClose>Cancel</button>
      <button mxButton variant="destructive" [mxDialogClose]="true">Delete project</button>
    </mx-dialog-footer>
  \`,
})
export class ConfirmDelete {}

// in the component that opens it
inject(MxDialog)
  .open<boolean>(ConfirmDelete, { role: 'alertdialog', size: 'sm' })
  .closed.subscribe((confirmed) => { ... });`;

  protected readonly api: ApiRow[] = [
    { kind: 'Serviço', name: 'MxDialog.open(content, options)', type: 'MxDialogRef<R>', description: 'Opens a component or template.' },
    { kind: 'Input', name: 'options.size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '400, 520 or 720 px.' },
    { kind: 'Input', name: 'options.role', type: "'dialog' | 'alertdialog'", default: 'dialog' },
    { kind: 'Input', name: 'options.disableClose', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'options.data', type: 'D', description: 'Read with inject(MX_DIALOG_DATA).' },
    { kind: 'Output', name: 'ref.closed', type: 'Observable<R | undefined>' },
    { kind: 'Directiva', name: 'mxDialogTitle, mxDialogDescription', type: 'accessible name and description' },
    { kind: 'Directiva', name: '[mxDialogClose]', type: 'unknown', description: 'Closes and returns the value.' },
  ];
}
