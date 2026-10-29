import { MxButton } from '@muxima-ui/core/button';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxError, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-textarea-page',
  imports: [DOC_UI, ReactiveFormsModule, MxFormField, MxLabel, MxHint, MxError, MxInput, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Textarea' }]"
        title="Textarea"
        lead="Long text: descriptions, notes, messages. It uses the same directive as Input on the native textarea and can grow with the text."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Textarea example">
          <mx-form-field class="w-320">
            <label mxLabel>Notes</label>
            <textarea mxInput autosize rows="3" placeholder="Tell us your preferred delivery time"></textarea>
            <mx-hint>Grows with the text up to 320 px.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxFormField, MxLabel, MxInput, MxHint, MxError } from '@muxima-ui/core/form-field';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>Same as Input, with an 88 px minimum height and vertical resizing.</p>
        <doc-structure [labels]="{ topLeft: 'Label (for)', topRight: '2 px focus', bottomLeft: '1 px border', bottomRight: '88 px minimum', bottom: 'autosize: the height follows the text' }">
          <textarea mxInput tabindex="-1" rows="2" aria-label="Example" class="w-180">Long text</textarea>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>Hover and focus are pinned here for comparison.</p>
        <doc-states>
          <doc-state name="Empty" note="Shows the placeholder."><textarea mxInput rows="2" placeholder="Type here" aria-label="Empty"></textarea></doc-state>
          <doc-state name="Default"><textarea mxInput rows="2" aria-label="Default">Deliver in the morning.</textarea></doc-state>
          <doc-state name="Hover"><textarea mxInput rows="2" aria-label="Hover" data-mx-state="hover">Deliver in the morning.</textarea></doc-state>
          <doc-state name="Focus"><textarea mxInput rows="2" aria-label="Focus" data-mx-state="focus">Deliver in the morning.</textarea></doc-state>
          <doc-state name="Disabled"><textarea mxInput rows="2" aria-label="Disabled" disabled>Deliver in the morning.</textarea></doc-state>
          <doc-state name="Error"><textarea mxInput rows="2" aria-label="Error" invalid>Ok</textarea></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Character counter" note="The counter is a hint (mx-hint), so screen readers read it with the field.">
            <mx-form-field class="w-full">
              <label mxLabel>Project description</label>
              <textarea mxInput rows="4" [formControl]="description" [attr.maxlength]="max"></textarea>
              <mx-hint>{{ remaining() }} characters left</mx-hint>
              <mx-error>Write at least 20 characters.</mx-error>
            </mx-form-field>
          </doc-example>
          <doc-example title="Automatic height">
            <mx-form-field class="w-full">
              <label mxLabel>Message</label>
              <textarea mxInput autosize rows="2" placeholder="Type several lines to see the field grow"></textarea>
            </mx-form-field>
          </doc-example>
          <doc-example title="Read-only and disabled">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Customer notes</label>
                <textarea mxInput rows="2" readonly>Deliver to reception, between 8 am and 12 pm.</textarea>
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>Internal notes</label>
                <textarea mxInput rows="2" disabled>Available on the Pro plan.</textarea>
              </mx-form-field>
            </div>
          </doc-example>
          <doc-example title="Comment with actions" note="Ctrl + Enter sends; Enter adds a line.">
            <form class="stack w-full" (submit)="$event.preventDefault(); sendComment()">
              <mx-form-field>
                <label mxLabel>Comment</label>
                <textarea mxInput autosize rows="2" placeholder="Write a comment" [value]="comment()" (input)="comment.set($any($event.target).value)" (keydown.control.enter)="sendComment()"></textarea>
              </mx-form-field>
              <div class="row-end">
                <button mxButton type="button" variant="ghost" size="sm" (click)="comment.set('')">Cancel</button>
                <button mxButton type="submit" size="sm" [disabled]="!comment().trim()">Comment</button>
              </div>
              @if (sent()) {
                <p class="small-label" aria-live="polite">Comment sent.</p>
              }
            </form>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Moves into and out of the field.' }, { key: 'Enter', action: 'New line (does not submit the form).' }]"
          [aria]="[
            'native textarea with a label linked by for/id.',
            'Help and error in aria-describedby; aria-invalid once touched.',
            'Avoid hard limits without warning: show the counter as a hint.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>textarea[mxInput]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Input' }, { name: 'Select' }, { name: 'Button' }]" />
      </section>
    </article>
  `,
})
export class TextareaPage {
  protected readonly comment = signal('');
  protected readonly sent = signal(false);
  protected sendComment(): void {
    if (!this.comment().trim()) return;
    this.comment.set('');
    this.sent.set(true);
  }

  protected readonly max = 280;
  protected readonly description = new FormControl('', [Validators.required, Validators.minLength(20)]);
  private readonly text = signal('');
  protected readonly remaining = computed(() => this.max - this.text().length);

  constructor() {
    this.description.valueChanges.subscribe((v) => this.text.set(v ?? ''));
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Notes</label>
  <textarea mxInput autosize rows="3"></textarea>
  <mx-hint>Grows with the text up to 320 px.</mx-hint>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'autosize', type: 'boolean', default: 'false', description: 'Height follows the text (field-sizing), up to 320 px.' },
    { kind: 'Input', name: 'invalid', type: 'boolean', default: 'false', description: 'Forces the error state.' },
    { kind: 'Input', name: 'id', type: 'string', default: 'generated', description: 'Textarea id.' },
    { kind: 'Token CSS', name: '--mx-radius', type: 'length', default: '6px' },
  ];
}
