import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxFileUpload } from '@muxima-ui/core/file-upload';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxToast } from '@muxima-ui/core/toast';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-file-upload-page',
  imports: [
    DOC_UI,
    MxFileUpload,
    MxFormField,
    MxLabel,
    MxHint,
    MxError,
    MxButton,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'File upload' }]"
        title="File upload"
        lead="Add files by dragging or with the system file picker. It validates type, size and count, and shows the list with size, upload progress and a remove button."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="File upload example">
          <mx-form-field class="w-full">
            <label mxLabel>Payment receipts</label>
            <mx-file-upload
              [(value)]="receipts"
              accept=".pdf,image/*"
              [maxSize]="5000000"
              multiple
              description="PDF or image, up to 5 MB each."
            />
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxFileUpload } from '@muxima-ui/core/file-upload';" />
        <doc-callout
          >The component doesn't upload anything: the value is File[] and uploading to the server (HttpClient with
          reportProgress) is up to you. Pass the percentage in [progress] and the errors in
          [errors], by file name.</doc-callout
        >
      </section>

      <section>
        <h2>Structure</h2>
        <p>A drop area with a text button, and the file list below it.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Drop area',
            topRight: 'Button: opens the native picker',
            bottomLeft: 'Name and size',
            bottomRight: 'Remove',
            bottom: 'The value is File[]',
          }"
        >
          <mx-file-upload class="w-320" description="PDF up to 5 MB" [value]="sample" />
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Empty"
            ><mx-file-upload class="w-full" description="PDF up to 5 MB"
          /></doc-state>
          <doc-state name="With files"
            ><mx-file-upload class="w-full" [value]="sample"
          /></doc-state>
          <doc-state name="Uploading"
            ><mx-file-upload
              class="w-full"
              [value]="sample"
              [progress]="{ 'invoice-0142.pdf': 45 }"
          /></doc-state>
          <doc-state name="Upload error"
            ><mx-file-upload
              class="w-full"
              [value]="sample"
              [errors]="{ 'invoice-0142.pdf': 'Failed: try again' }"
          /></doc-state>
          <doc-state name="Invalid"><mx-file-upload class="w-full" invalid /></doc-state>
          <doc-state name="Disabled"><mx-file-upload class="w-full" disabled /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="Upload with progress"
            note="Simulates the upload: each file's percentage arrives through [progress]."
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Customer documents</label>
                <mx-file-upload
                  [(value)]="documents"
                  [progress]="progress()"
                  [errors]="failures()"
                  multiple
                  description="Any type, up to 10 MB."
                  [maxSize]="10000000"
                />
              </mx-form-field>
              <div>
                <button
                  mxButton
                  type="button"
                  size="sm"
                  [disabled]="!documents().length || uploading()"
                  (click)="upload()"
                >
                  Send
                </button>
              </div>
            </div>
          </doc-example>
          <doc-example
            title="A single file"
            note="Without multiple, a new file replaces the previous one."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Profile photo</label>
              <mx-file-upload
                [(value)]="photo"
                accept="image/png,image/jpeg"
                [maxSize]="2000000"
                dropText="Drag the photo or"
                buttonText="choose an image"
                description="PNG or JPG, up to 2 MB."
              />
            </mx-form-field>
          </doc-example>
          <doc-example
            title="Required in a form"
            note="Validators.required: the error appears after trying to submit."
          >
            <form class="stack w-full" [formGroup]="application" (ngSubmit)="submit()">
              <mx-form-field>
                <label mxLabel>Résumé</label>
                <mx-file-upload
                  formControlName="cv"
                  accept=".pdf"
                  [maxSize]="3000000"
                  description="PDF up to 3 MB."
                />
                <mx-error>Attach your résumé as a PDF.</mx-error>
              </mx-form-field>
              <div><button mxButton type="submit" size="sm">Apply</button></div>
            </form>
          </doc-example>
          <doc-example
            title="File limit"
            note="maxFiles: extra files are rejected with the reason."
          >
            <mx-form-field class="w-full">
              <label mxLabel>Property photos</label>
              <mx-file-upload
                [(value)]="property"
                accept="image/*"
                multiple
                [maxFiles]="3"
                description="Up to 3 images."
              />
              <mx-hint>The first one is the listing cover.</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example
            title="Gallery with preview"
            note="Thumbnails with URL.createObjectURL, released when the image is removed."
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Product photos</label>
                <mx-file-upload
                  [value]="gallery()"
                  (valueChange)="changeGallery($event)"
                  accept="image/*"
                  multiple
                  [maxFiles]="6"
                  description="Up to 6 images."
                />
              </mx-form-field>
              @if (thumbnails().length) {
                <ul class="thumb-grid" aria-label="Preview">
                  @for (m of thumbnails(); track m.url) {
                    <li><img [src]="m.url" [alt]="m.name" /></li>
                  }
                </ul>
              }
            </div>
          </doc-example>
          <doc-example
            title="Import CSV"
            note="file.text() reads the file in the browser, without uploading it."
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Customer list</label>
                <mx-file-upload
                  [(value)]="csv"
                  accept=".csv,text/csv"
                  dropText="Drag the CSV file or"
                  buttonText="choose a file"
                  description="First row with the column names."
                  (valueChange)="readCsv($event)"
                />
              </mx-form-field>
              <p class="muted" aria-live="polite">{{ csvSummary() }}</p>
              @if (csvRows().length) {
                <div class="mx-table-container">
                  <table class="mx-table" data-density="compact">
                    <caption class="mx-visually-hidden">
                      First rows of the file
                    </caption>
                    <thead>
                      <tr>
                        @for (c of csvRows()[0]; track $index) {
                          <th scope="col">{{ c }}</th>
                        }
                      </tr>
                    </thead>
                    <tbody>
                      @for (l of csvRows().slice(1, 4); track $index) {
                        <tr>
                          @for (c of l; track $index) {
                            <td>{{ c }}</td>
                          }
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              }
            </div>
          </doc-example>
          <doc-example
            title="Upload failure and retry"
            note="[errors] marks the file; Try again resends only the failed ones."
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Case attachments</label>
                <mx-file-upload
                  [(value)]="attachments"
                  [progress]="attachmentProgress()"
                  [errors]="attachmentErrors()"
                  multiple
                />
              </mx-form-field>
              <div class="row-wrap">
                <button
                  mxButton
                  type="button"
                  size="sm"
                  [disabled]="!attachments().length"
                  (click)="uploadAttachments()"
                >
                  Send
                </button>
                @if (hasErrors()) {
                  <button
                    mxButton
                    type="button"
                    size="sm"
                    variant="outline"
                    (click)="uploadAttachments(true)"
                  >
                    Try again
                  </button>
                }
              </div>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            {
              key: 'Tab',
              action: 'Goes to the button that opens the picker and then to each Remove.',
            },
            { key: 'Enter Space', action: 'Opens the system file picker.' },
          ]"
          [aria]="[
            'Dragging is a shortcut: the button does the same, with keyboard and screen reader.',
            'The button is announced with the field label: Payment receipts, browse your computer.',
            'Added, removed and rejected files are announced, and the reasons are written on the page.',
            'Each upload in progress has a progress bar with the file name.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Progress' }, { name: 'Input' }, { name: 'Toast' }]" />
      </section>
    </article>
  `,
})
export class FileUploadPage {
  private readonly toast = inject(MxToast);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly receipts = signal<File[]>([]);
  protected readonly sample = [
    new File([new Uint8Array(248_000)], 'invoice-0142.pdf', { type: 'application/pdf' }),
  ];
  protected readonly documents = signal<File[]>([]);
  protected readonly progress = signal<Record<string, number>>({});
  protected readonly failures = signal<Record<string, string>>({});
  protected readonly uploading = signal(false);
  protected readonly photo = signal<File[]>([]);
  protected readonly property = signal<File[]>([]);
  protected readonly application = new FormGroup({
    cv: new FormControl<File[]>([], Validators.required),
  });

  protected upload(): void {
    this.uploading.set(true);
    this.failures.set({});
    const names = this.documents().map((f) => f.name);
    let pct = 0;
    const timer = setInterval(() => {
      pct += 20;
      this.progress.set(Object.fromEntries(names.map((n) => [n, Math.min(pct, 100)])));
      if (pct >= 100) {
        clearInterval(timer);
        this.uploading.set(false);
        this.toast.success('Documents uploaded', {
          description: `${names.length} file${names.length === 1 ? '' : 's'}.`,
        });
      }
    }, 400);
    this.destroyRef.onDestroy(() => clearInterval(timer));
  }

  protected submit(): void {
    this.application.markAllAsTouched();
    if (this.application.valid) this.toast.success('Application sent');
  }

  protected readonly gallery = signal<File[]>([]);
  protected readonly thumbnails = signal<{ name: string; url: string }[]>([]);
  protected changeGallery(files: File[]): void {
    const previous = this.thumbnails();
    // release the URLs of removed images
    previous
      .filter((m) => !files.some((f) => f.name === m.name))
      .forEach((m) => URL.revokeObjectURL(m.url));
    this.gallery.set(files);
    this.thumbnails.set(
      files.map(
        (f) =>
          previous.find((m) => m.name === f.name) ?? { name: f.name, url: URL.createObjectURL(f) },
      ),
    );
  }
  protected readonly csv = signal<File[]>([]);
  protected readonly csvRows = signal<string[][]>([]);
  protected readonly csvSummary = computed(() =>
    this.csvRows().length
      ? `${this.csvRows().length - 1} rows read; showing the first 3.`
      : 'Choose a CSV to see the first rows.',
  );
  protected async readCsv(files: File[]): Promise<void> {
    if (!files.length) {
      this.csvRows.set([]);
      return;
    }
    const text = await files[0].text();
    const sep = text.includes(';') ? ';' : ',';
    this.csvRows.set(
      text
        .trim()
        .split(/\r?\n/)
        .map((l) => l.split(sep)),
    );
  }
  protected readonly attachments = signal<File[]>([]);
  protected readonly attachmentProgress = signal<Record<string, number>>({});
  protected readonly attachmentErrors = signal<Record<string, string>>({});
  protected readonly hasErrors = computed(() => Object.keys(this.attachmentErrors()).length > 0);
  protected uploadAttachments(onlyFailed = false): void {
    const targets = this.attachments().filter((f) => !onlyFailed || this.attachmentErrors()[f.name]);
    this.attachmentErrors.set({});
    let pct = 0;
    const timer = setInterval(() => {
      pct += 25;
      this.attachmentProgress.update((p) => ({
        ...p,
        ...Object.fromEntries(targets.map((f) => [f.name, Math.min(pct, 100)])),
      }));
      if (pct >= 50 && !onlyFailed) {
        // on the first upload, the second file fails
        clearInterval(timer);
        const failed = targets[1] ?? targets[0];
        this.attachmentErrors.set({ [failed.name]: 'Connection lost' });
        this.attachmentProgress.update((p) => ({
          ...p,
          ...Object.fromEntries(targets.filter((f) => f !== failed).map((f) => [f.name, 100])),
        }));
      } else if (pct >= 100) {
        clearInterval(timer);
      }
    }, 400);
    this.destroyRef.onDestroy(() => clearInterval(timer));
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Payment receipts</label>
  <mx-file-upload formControlName="receipts" accept=".pdf,image/*"
                  [maxSize]="5_000_000" multiple
                  description="PDF or image, up to 5 MB each." />
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'value',
      type: 'File[] (model)',
      description: 'Also with ngModel and Reactive Forms.',
    },
    {
      kind: 'Input',
      name: 'accept',
      type: 'string',
      description: 'As on the native input: ".pdf,image/*".',
    },
    {
      kind: 'Input',
      name: 'multiple',
      type: 'boolean',
      default: 'false',
      description: 'Without multiple, a new file replaces the previous one.',
    },
    { kind: 'Input', name: 'maxSize', type: 'number (bytes)', default: 'no limit' },
    { kind: 'Input', name: 'maxFiles', type: 'number', default: 'no limit' },
    {
      kind: 'Input',
      name: 'progress',
      type: 'Record<name, %>',
      description: 'Upload percentage per file.',
    },
    {
      kind: 'Input',
      name: 'errors',
      type: 'Record<name, text>',
      description: 'Upload error per file.',
    },
    {
      kind: 'Input',
      name: 'description, dropText, buttonText',
      type: 'string',
      description: 'Area texts.',
    },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    {
      kind: 'Output',
      name: 'rejected',
      type: 'MxFileRejection[]',
      description: 'Rejected files, with reason type, size or count.',
    },
    { kind: 'Método', name: 'browse(), addFiles(list), remove(index)', type: 'MxFileUpload' },
    {
      kind: 'Função',
      name: 'mxFormatBytes(bytes)',
      type: 'string',
      description: '"1,3 MB", "340 kB".',
    },
  ];
}
