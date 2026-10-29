import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxEditor } from '@muxima-ui/core/editor';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-editor-page',
  imports: [DOC_UI, MxEditor, MxFormField, MxLabel, MxHint, MxError, MxButton, ReactiveFormsModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Rich text editor' }]"
        title="Rich text editor"
        lead="Text with bold, headings, lists, quotes and links, built on Tiptap (ProseMirror). The bar is an accessible toolbar, the field works with forms and the value is HTML."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Editor example">
          <mx-form-field class="w-full">
            <label mxLabel>Invoice notes</label>
            <mx-editor
              [(value)]="notes"
              placeholder="Payment terms, remarks..."
              [maxLength]="500"
            />
            <mx-hint>Appears in the PDF below the lines.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code
          code="npm install @tiptap/core @tiptap/pm @tiptap/starter-kit @tiptap/extensions"
        />
        <doc-code code="import { MxEditor } from '@muxima-ui/core/editor';" />
        <doc-callout
          >Tiptap is an optional dependency of the package: only those who use the editor install it, and the rest
          of the library doesn't grow because of it.</doc-callout
        >
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          Formatting bar (role=toolbar), the text (role=textbox, multiline) and, with maxLength, the
          count.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Bar: arrows between buttons',
            topRight: 'aria-pressed on the active one',
            bottomLeft: 'Editable text',
            bottomRight: 'Count',
            bottom: 'The value is HTML',
          }"
        >
          <mx-editor
            class="w-320"
            aria-label="Example"
            [toolbar]="['bold', 'italic', '|', 'bulletList', 'link']"
            value="<p>Payment within <strong>30 days</strong>.</p>"
            [maxLength]="200"
            minHeight="60px"
          />
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Empty"
            ><mx-editor
              class="w-full"
              aria-label="Empty"
              placeholder="Type here"
              minHeight="60px"
              [toolbar]="['bold', 'italic']"
          /></doc-state>
          <doc-state name="Read-only"
            ><mx-editor
              class="w-full"
              aria-label="Read-only"
              readonly
              value="<p>Formatted <em>text</em>.</p>"
              minHeight="40px"
          /></doc-state>
          <doc-state name="Disabled"
            ><mx-editor
              class="w-full"
              aria-label="Disabled"
              disabled
              value="<p>No editing.</p>"
              minHeight="60px"
              [toolbar]="['bold', 'italic']"
          /></doc-state>
          <doc-state name="Error"
            ><mx-editor
              class="w-full"
              aria-label="Error"
              invalid
              minHeight="60px"
              [toolbar]="['bold', 'italic']"
          /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="Reduced bar"
            note="toolbar picks the buttons and their order; | draws a separator."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Comment</label>
              <mx-editor
                [toolbar]="['bold', 'italic', '|', 'link']"
                placeholder="Write a comment"
                minHeight="80px"
              />
            </mx-form-field>
          </doc-example>

          <doc-example
            title="In a form"
            note="Validators.required and maxLength: above the limit, the count and the field show an error."
          >
            <form
              class="stack w-full"
              [formGroup]="proposal"
              (ngSubmit)="proposal.markAllAsTouched()"
            >
              <mx-form-field>
                <label mxLabel>Proposal summary</label>
                <mx-editor
                  formControlName="summary"
                  [maxLength]="160"
                  minHeight="100px"
                  placeholder="Two or three sentences"
                />
                <mx-error>Write the summary, up to 160 characters.</mx-error>
              </mx-form-field>
              <div><button mxButton size="sm" type="submit">Save proposal</button></div>
            </form>
          </doc-example>

          <doc-example
            title="Output HTML"
            note="The value is HTML (an empty string when there's no text)."
          >
            <div class="stack w-full">
              <mx-editor
                aria-label="Text with HTML"
                [(value)]="html"
                minHeight="100px"
                [toolbar]="[
                  'bold',
                  'italic',
                  'underline',
                  '|',
                  'heading2',
                  'bulletList',
                  'orderedList',
                  '|',
                  'link',
                ]"
              />
              <pre
                class="editor-html"
                tabindex="0"
                aria-label="Generated HTML"
              ><code>{{ html() || '(empty)' }}</code></pre>
            </div>
          </doc-example>

          <doc-example
            title="Custom commands"
            note="editor() gives the Tiptap Editor: editor()?.chain().focus().insertContent(...).run()."
          >
            <div class="stack w-full">
              <mx-editor
                #email
                aria-label="Email body"
                [(value)]="body"
                minHeight="100px"
                [toolbar]="['bold', 'italic', '|', 'bulletList', '|', 'undo', 'redo']"
              />
              <div class="row-wrap">
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  (click)="email.editor()?.chain()?.focus()?.insertContent(signature)?.run()"
                >
                  Insert signature
                </button>
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  (click)="email.editor()?.chain()?.focus()?.insertContent(paymentDetails)?.run()"
                >
                  Insert payment details
                </button>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Read-only"
            note="readonly shows the formatted text without a bar or editing (for example, to review)."
          >
            <mx-editor
              class="w-full"
              aria-label="Accepted terms"
              readonly
              [value]="terms"
              minHeight="0"
            />
          </doc-example>

          <doc-example
            title="Headings and quotes"
            note="heading2, heading3, paragraph and blockquote for longer texts."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Knowledge base article</label>
              <mx-editor
                [toolbar]="[
                  'heading2',
                  'heading3',
                  'paragraph',
                  '|',
                  'bold',
                  'italic',
                  'code',
                  '|',
                  'blockquote',
                  'bulletList',
                  'orderedList',
                  '|',
                  'undo',
                  'redo',
                ]"
                [value]="article"
                minHeight="160px"
              />
            </mx-form-field>
          </doc-example>

          <doc-example
            title="With ngModel"
            note="Also works with template forms: [(ngModel)] and required."
          >
            <form class="stack w-full" #f="ngForm">
              <mx-form-field>
                <label mxLabel>Message to the customer</label>
                <mx-editor
                  name="message"
                  [(ngModel)]="message"
                  required
                  minHeight="80px"
                  [toolbar]="['bold', 'italic', '|', 'bulletList', 'link']"
                />
                <mx-error>Write the message.</mx-error>
              </mx-form-field>
              <p class="muted small">Form {{ f.valid ? 'valid' : 'invalid' }}.</p>
            </form>
          </doc-example>

          <doc-example
            title="Words and reading time"
            [note]="words(longText()) + ' words, about ' + readingTime(longText()) + ' min read.'"
          >
            <mx-form-field class="w-full">
              <label mxLabel>Blog post</label>
              <mx-editor
                [(value)]="longText"
                minHeight="120px"
                [toolbar]="['heading2', 'bold', 'italic', '|', 'bulletList', 'blockquote']"
              />
            </mx-form-field>
          </doc-example>

          <doc-example
            title="Draft saved automatically"
            [note]="savedAt() ? 'Draft saved at ' + savedAt() + '.' : 'Type: it saves 1 s after you stop.'"
          >
            <mx-form-field class="w-full">
              <label mxLabel>Reply to the request</label>
              <mx-editor
                [(value)]="draft"
                minHeight="100px"
                placeholder="The reply is saved as you type"
                [toolbar]="['bold', 'italic', '|', 'bulletList', '|', 'undo', 'redo']"
              />
            </mx-form-field>
          </doc-example>

          <doc-example
            title="Edit and see the result"
            note="The editor's HTML shown with [innerHTML], which Angular sanitizes of scripts."
          >
            <div class="editor-split w-full">
              <mx-editor
                aria-label="Announcement text"
                [(value)]="announcement"
                minHeight="120px"
                [toolbar]="['heading3', 'bold', 'italic', '|', 'bulletList', 'link']"
              />
              <div class="editor-output" role="region" aria-label="Result">
                <div [innerHTML]="announcement()"></div>
              </div>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Alt + F10', action: 'From the text, goes to the formatting bar.' },
            { key: '← → Home End', action: 'Between the bar buttons (only one is in the Tab order).' },
            { key: 'Esc', action: 'From the bar, returns to the text.' },
            { key: 'Ctrl + B, I, U', action: 'Bold, italic, underline.' },
            { key: 'Ctrl + K', action: 'Opens the link field.' },
            { key: 'Ctrl + Z / Shift + Z', action: 'Undo and redo.' },
          ]"
          [aria]="[
            'The text is role=textbox with aria-multiline and the form field label.',
            'The bar is role=toolbar with aria-controls pointing to the text.',
            'The format buttons have aria-pressed and the shortcut in aria-keyshortcuts.',
            'The count is announced when it reaches 90% of the limit.',
            'The errors of the form field and help arrive through aria-describedby.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Textarea' }, { name: 'Input' }, { name: 'Chips' }]" />
      </section>
    </article>
  `,
})
export class EditorPage {
  protected readonly notes = signal(
    '<p>Payment within <strong>30 days</strong> by transfer to the IBAN shown.</p>',
  );
  protected readonly proposal = new FormGroup({ summary: new FormControl('', Validators.required) });
  protected readonly html = signal('<p>Hello <strong>Kianda</strong>!</p>');
  protected readonly body = signal('<p>Good morning,</p><p>Please find this month\'s invoice attached.</p>');
  protected readonly signature =
    '<p>Best regards,<br>Ana Kiala<br>Kianda Management</p>';
  protected readonly paymentDetails =
    '<ul><li>Entity: 00123</li><li>Reference: 231 456 789</li><li>Amount: 250,000.00 Kz</li></ul>';
  protected readonly terms =
    '<h3>Terms</h3><p>Payment is due <strong>30 days</strong> after issue.</p><ul><li>Late interest of 1% per month.</li><li>Complaints within 8 days.</li></ul>';
  protected readonly article =
    '<h2>How to issue a credit note</h2><p>Open the invoice and choose <strong>Create credit note</strong>.</p><blockquote><p>A credit note fully or partly cancels an invoice that was already issued.</p></blockquote>';

  protected readonly message = signal('');

  protected readonly longText = signal(
    '<h2>What\'s new in October</h2><p>This month brought <strong>credit notes</strong> and SAF-T export. We also improved customer search and the VAT reports.</p>',
  );
  protected words(html: string): number {
    const text = html.replace(/<[^>]+>/g, ' ').trim();
    return text ? text.split(/\s+/).length : 0;
  }
  protected readingTime(html: string): number {
    return Math.max(1, Math.round(this.words(html) / 200));
  }

  protected readonly draft = signal('');
  protected readonly savedAt = signal('');

  protected readonly announcement = signal(
    '<h3>November promotion</h3><p>Yearly plans with <strong>20% off</strong>:</p><ul><li>Invoicing</li><li>Stock</li></ul>',
  );

  constructor() {
    // saves the draft 1 s after the last change
    effect((onCleanup) => {
      const text = this.draft();
      if (!text) return;
      const t = setTimeout(
        () => this.savedAt.set(new Date().toLocaleTimeString('en-US')),
        1000,
      );
      onCleanup(() => clearTimeout(t));
    });
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Invoice notes</label>
  <mx-editor formControlName="notes" placeholder="Payment terms..." [maxLength]="500" />
  <mx-hint>Appears in the PDF below the lines.</mx-hint>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'value',
      type: 'string (model)',
      description: 'HTML. Also with ngModel and Reactive Forms.',
    },
    { kind: 'Input', name: 'placeholder', type: 'string' },
    {
      kind: 'Input',
      name: 'toolbar',
      type: 'MxEditorTool[]',
      description:
        "bold, italic, underline, strike, code, heading2, heading3, paragraph, bulletList, orderedList, blockquote, link, undo, redo and '|'.",
    },
    {
      kind: 'Input',
      name: 'maxLength',
      type: 'number | null',
      default: 'null',
      description: 'Shows the count; above it the field shows an error.',
    },
    { kind: 'Input', name: 'minHeight, maxHeight', type: 'string', default: '140px, 420px' },
    {
      kind: 'Input',
      name: 'readonly, disabled, required, invalid',
      type: 'boolean',
      default: 'false',
    },
    {
      kind: 'Input',
      name: 'toolbarLabel, linkLabel',
      type: 'string',
      default: 'Formatting, Link address (from the language)',
    },
    {
      kind: 'Propriedade',
      name: 'editor()',
      type: 'Editor | null',
      description: 'The Tiptap editor, for custom commands.',
    },
    { kind: 'Método', name: 'focus(), focusToolbar(), openLink()', type: 'void' },
    {
      kind: 'Função',
      name: 'MX_EDITOR_DEFAULT_TOOLS',
      type: 'MxEditorTool[]',
      description: 'The default bar.',
    },
  ];
}
