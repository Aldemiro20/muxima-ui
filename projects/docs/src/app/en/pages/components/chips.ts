import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxChip, MxChipToggle, MxTagInput } from '@muxima-ui/core/chips';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';
import { MxButton } from '@muxima-ui/core/button';

@Component({
  selector: 'doc-chips-page',
  imports: [
    DOC_UI,
    MxChip,
    MxChipToggle,
    MxTagInput,
    MxFormField,
    MxLabel,
    MxHint,
    MxError,
    ReactiveFormsModule,
    MxButton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Chips' }]"
        title="Chips"
        lead="Short labels to show choices, filter lists or type several entries in one field. Three pieces: mx-chip, the mxChipToggle button for filters, and the mx-tag-input field."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Tag input example">
          <mx-form-field class="w-320">
            <label mxLabel>Recipients</label>
            <mx-tag-input
              [(value)]="destinatarios"
              [validate]="email"
              placeholder="Type an email and press Enter"
            />
            <mx-hint>Enter or comma adds it.</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code
          code="import { MxChip, MxChipToggle, MxTagInput } from '@muxima-ui/core/chips';"
        />
      </section>

      <section>
        <h2>Structure</h2>
        <p>Short text in a rounded shape, with an optional remove button.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Text',
            topRight: 'Remove (optional)',
            bottomLeft: '28 px tall',
            bottomRight: '20 px button',
            bottom: 'The button is named Remove + text',
          }"
        >
          <mx-chip removable>Luanda</mx-chip>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Default"><mx-chip>Luanda</mx-chip></doc-state>
          <doc-state name="Removable"><mx-chip removable>Luanda</mx-chip></doc-state>
          <doc-state name="Filter off"><button mxChipToggle>Paid</button></doc-state>
          <doc-state name="Filter hover"
            ><button mxChipToggle data-mx-state="hover">Paid</button></doc-state
          >
          <doc-state name="Filter on"
            ><button mxChipToggle [selected]="true">Paid</button></doc-state
          >
          <doc-state name="Focus"
            ><button mxChipToggle data-mx-state="focus">Paid</button></doc-state
          >
          <doc-state name="Disabled"><button mxChipToggle disabled>Paid</button></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Variants and sizes">
            <div class="row-wrap">
              <mx-chip>Default</mx-chip>
              <mx-chip variant="outline">Outline</mx-chip>
              <mx-chip variant="accent">Accent</mx-chip>
              <mx-chip size="sm">Small</mx-chip>
              <mx-chip size="sm" variant="accent">Small accent</mx-chip>
            </div>
          </doc-example>
          <doc-example
            title="Removable list"
            [note]="
              provinces().length
                ? provinces().length + ' provinces chosen.'
                : 'No provinces. Reload the page to reset.'
            "
          >
            <ul class="chip-list" aria-label="Chosen provinces">
              @for (p of provinces(); track p) {
                <li>
                  <mx-chip removable (removed)="remove(p)">{{ p }}</mx-chip>
                </li>
              }
            </ul>
          </doc-example>
          <doc-example title="Filters" [note]="'Showing: ' + activeFilters()">
            <div class="row-wrap" role="group" aria-label="Invoice status">
              @for (f of filters; track f.name) {
                <button mxChipToggle [(selected)]="f.on">{{ f.name }}</button>
              }
            </div>
          </doc-example>
          <doc-example
            title="Tags in a form"
            note="maxTags, duplicates ignored, and the form field error."
          >
            <form class="stack w-full" [formGroup]="article">
              <mx-form-field>
                <label mxLabel>Article tags</label>
                <mx-tag-input
                  formControlName="tags"
                  [maxTags]="5"
                  listLabel="Article tags"
                  placeholder="E.g. invoicing"
                />
                <mx-hint>Up to 5. You can paste several separated by commas.</mx-hint>
                <mx-error>Add at least one tag.</mx-error>
              </mx-form-field>
            </form>
          </doc-example>
          <doc-example
            title="Active filters"
            [note]="
              active().length ? 'Remove a filter or clear them all.' : 'No filters: showing everything.'
            "
          >
            <div class="stack w-full">
              @if (active().length) {
                <div class="row-wrap">
                  <ul class="chip-list" aria-label="Active filters">
                    @for (f of active(); track f.field) {
                      <li>
                        <mx-chip
                          variant="accent"
                          removable
                          [removeLabel]="'Remove filter'"
                          (removed)="removeFilter(f.field)"
                          >{{ f.field }}: {{ f.value }}</mx-chip
                        >
                      </li>
                    }
                  </ul>
                  <button mxButton variant="link" size="sm" type="button" (click)="clearFilters()">
                    Clear all
                  </button>
                </div>
              } @else {
                <button mxButton variant="outline" size="sm" type="button" (click)="resetFilters()">
                  Reset sample filters
                </button>
              }
            </div>
          </doc-example>
          <doc-example
            title="One choice at a time"
            [note]="
              'Period: ' +
              period() +
              '. The chip classes on a plain button, with aria-pressed managed by the page.'
            "
          >
            <div class="row-wrap" role="group" aria-label="Chart period">
              @for (p of periodos; track p) {
                <button
                  type="button"
                  class="mx-chip mx-chip-toggle"
                  [attr.aria-pressed]="period() === p"
                  (click)="period.set(p)"
                >
                  {{ p }}
                </button>
              }
            </div>
          </doc-example>
          <doc-example
            title="Suggestions"
            note="Buttons that call add() on the field; used ones disappear."
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Skills</label>
                <mx-tag-input #skillInput [(value)]="skills" listLabel="Skills" />
              </mx-form-field>
              <div class="row-wrap" role="group" aria-label="Skill suggestions">
                @for (s of unusedSuggestions(); track s) {
                  <button
                    type="button"
                    class="mx-chip mx-chip-toggle"
                    data-size="sm"
                    (click)="skillInput.add(s)"
                  >
                    + {{ s }}
                  </button>
                }
              </div>
            </div>
          </doc-example>
          <doc-example
            title="Limit and rejection reason"
            [note]="rejection() || emailsCc().length + ' of 3 addresses.'"
          >
            <mx-form-field class="w-full">
              <label mxLabel>Cc</label>
              <mx-tag-input
                [(value)]="emailsCc"
                [maxTags]="3"
                [validate]="email"
                (rejected)="rejection.set($event.reason)"
                (valueChange)="rejection.set('')"
              />
              <mx-hint>Up to 3 emails.</mx-hint>
            </mx-form-field>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Enter , ;', action: 'Add the typed tag.' },
            { key: 'Backspace', action: 'In the empty field, goes to the last tag.' },
            { key: '← →', action: 'Move between tags; right of the last one returns to the field.' },
            {
              key: 'Backspace Delete',
              action: 'On a tag, removes it and focus moves to the next one.',
            },
            { key: 'Space Enter', action: 'On a filter, toggles it.' },
          ]"
          [aria]="[
            'The remove button is named Remove Luanda, with the chip text.',
            'The filter is a button with aria-pressed; group them with role=group and a name.',
            'Tags sit in a list, and each one added, removed or rejected is announced.',
            'The field explains the keys in a description (aria-describedby).',
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
          [items]="[{ name: 'Badge' }, { name: 'Multi-select' }, { name: 'Combobox' }]"
        />
      </section>
    </article>
  `,
})
export class ChipsPage {
  protected readonly destinatarios = signal<string[]>(['ana@kianda.ao']);
  protected readonly email = (t: string) =>
    /^\S+@\S+\.\S+$/.test(t) ? null : `${t} is not a valid email.`;
  protected readonly provinces = signal(['Luanda', 'Benguela', 'Huíla', 'Cabinda']);
  protected readonly filters = [
    { name: 'Paid', on: signal(true) },
    { name: 'Pending', on: signal(true) },
    { name: 'Overdue', on: signal(false) },
    { name: 'Drafts', on: signal(false) },
  ];
  protected readonly activeFilters = computed(
    () =>
      this.filters
        .filter((f) => f.on())
        .map((f) => f.name)
        .join(', ') || 'nothing',
  );
  protected readonly article = new FormGroup({
    tags: new FormControl<string[]>(['invoicing', 'IVA'], Validators.required),
  });

  protected remove(p: string): void {
    this.provinces.update((l) => l.filter((x) => x !== p));
  }

  private readonly initialFilters = [
    { field: 'Status', value: 'Pending' },
    { field: 'Province', value: 'Luanda' },
    { field: 'Amount', value: 'above $100' },
  ];
  protected readonly active = signal(this.initialFilters);
  protected removeFilter(field: string): void {
    this.active.update((l) => l.filter((f) => f.field !== field));
  }
  protected clearFilters(): void {
    this.active.set([]);
  }
  protected resetFilters(): void {
    this.active.set(this.initialFilters);
  }
  protected readonly periodos = ['7 days', '30 days', '3 months', '12 months'];
  protected readonly period = signal('30 days');
  protected readonly skills = signal<string[]>(['Angular']);
  private readonly suggestions = ['TypeScript', 'Accessibility', 'RxJS', 'Testing', 'Design systems'];
  protected readonly unusedSuggestions = computed(() =>
    this.suggestions.filter((s) => !this.skills().includes(s)),
  );
  protected readonly emailsCc = signal<string[]>([]);
  protected readonly rejection = signal('');

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Recipients</label>
  <mx-tag-input formControlName="emails" [validate]="email" />
</mx-form-field>

// email = (t: string) => /^\\S+@\\S+\\.\\S+$/.test(t) ? null : t + ' is not a valid email.';`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Componente',
      name: 'mx-chip',
      type: 'removable, variant, size, disabled, removeLabel',
      description: '(removed) when the button is pressed.',
    },
    {
      kind: 'Input',
      name: 'variant',
      type: "'default' | 'outline' | 'accent'",
      default: 'default',
    },
    {
      kind: 'Directiva',
      name: 'button[mxChipToggle]',
      type: '[(selected)]: boolean',
      description: 'Filter with aria-pressed.',
    },
    {
      kind: 'Componente',
      name: 'mx-tag-input',
      type: 'value: string[] (model)',
      description: 'Also with ngModel and Reactive Forms.',
    },
    {
      kind: 'Input',
      name: 'separators',
      type: 'string[]',
      default: "[',', ';']",
      description: 'Keys that add, besides Enter.',
    },
    { kind: 'Input', name: 'maxTags', type: 'number', default: 'no limit' },
    {
      kind: 'Input',
      name: 'allowDuplicates',
      type: 'boolean',
      default: 'false',
      description: 'Compares case-insensitively.',
    },
    {
      kind: 'Input',
      name: 'validate',
      type: '(tag) => string | null',
      description: 'Returns the error message, announced to screen readers.',
    },
    {
      kind: 'Input',
      name: 'listLabel, helpText',
      type: 'string',
      description: 'List name and keyboard instructions.',
    },
    {
      kind: 'Output',
      name: 'rejected',
      type: '{ tag, reason }',
      description: 'Invalid tag, duplicate, or over the maximum.',
    },
    {
      kind: 'Método',
      name: 'add(text), remove(index)',
      type: 'MxTagInput',
      description: 'To add from code.',
    },
  ];
}
