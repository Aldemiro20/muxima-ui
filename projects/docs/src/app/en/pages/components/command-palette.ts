import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MX_COMMAND, MxCommandItem, MxCommandPalette } from '@muxima-ui/core/command';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';
import { Icon } from '../../../ui/icon';

const COMMANDS: MxCommandItem<string>[] = [
  {
    label: 'New invoice',
    group: 'Actions',
    hint: 'N F',
    keywords: ['issue', 'create'],
    data: 'file',
  },
  { label: 'New customer', group: 'Actions', hint: 'N C', data: 'users' },
  { label: 'Export report', group: 'Actions', keywords: ['csv', 'excel'], data: 'external' },
  { label: 'Customers', group: 'Pages', data: 'users' },
  { label: 'Invoices', group: 'Pages', data: 'table' },
  {
    label: 'Settings',
    group: 'Pages',
    keywords: ['configuration', 'preferences'],
    data: 'sliders',
  },
];

@Component({
  selector: 'doc-command-palette-page',
  imports: [DOC_UI, MX_COMMAND, MxButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Command Palette' }]"
        title="Command Palette"
        lead="Keyboard search for actions and pages, like this site's Ctrl+K. Use it inside a dialog with MxCommandPalette or directly on the page with mx-command."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Command palette example">
          <button mxButton type="button" variant="outline" (click)="open()">
            Open commands <kbd class="kbd-inline">Ctrl K</kbd>
          </button>
          @if (last()) {
            <p class="small-label">Chosen: {{ last() }}</p>
          }
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MX_COMMAND, MxCommandPalette } from '@muxima-ui/core/command';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          A search field and a grouped list. Focus stays in the field; the arrows change the active
          option.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'input role=combobox',
            topRight: 'Optional shortcut',
            bottomLeft: 'Groups with titles',
            bottomRight: 'Active option with a bar',
            bottom: 'In a modal dialog with MxCommandPalette',
          }"
        >
          <div class="mini-dialog">
            <strong>Search...</strong><span>Actions</span><span>Pages</span>
          </div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Option"
            ><div class="mx-command mini-command">
              <div class="mx-command-item">New invoice</div>
            </div></doc-state
          >
          <doc-state name="Active" note="Arrows or mouse."
            ><div class="mx-command mini-command">
              <div class="mx-command-item" data-active>New invoice</div>
            </div></doc-state
          >
          <doc-state name="Disabled"
            ><div class="mx-command mini-command">
              <div class="mx-command-item" data-disabled>Void (no permission)</div>
            </div></doc-state
          >
          <doc-state name="No results"
            ><div class="mx-command mini-command">
              <div class="mx-command-empty">Nothing found for "xyz"</div>
            </div></doc-state
          >
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="On the page, with icons"
            [note]="
              last()
                ? 'Chosen: ' + last()
                : 'Type issue or csv: keywords count too.'
            "
          >
            <div class="mx-card w-full">
              <mx-command
                [items]="commands"
                (selected)="last.set($event.label)"
                aria-label="Search commands"
                placeholder="Search actions and pages"
              >
                <ng-template mxCommandItem let-item>
                  <doc-icon [name]="item.data" />
                  <span>{{ item.label }}</span>
                </ng-template>
              </mx-command>
            </div>
          </doc-example>
          <doc-example
            title="Disabled items and shortcuts"
            note="hint shows the shortcut; disabled stays visible but can't be chosen."
          >
            <div class="mx-card w-full">
              <mx-command
                [items]="withShortcuts"
                aria-label="Commands with shortcuts"
                placeholder="Search commands"
                (selected)="last.set($event.label)"
              />
            </div>
          </doc-example>
          <doc-example
            title="Without groups"
            note="A simple list, for example to choose a customer."
          >
            <div class="mx-card w-full">
              <mx-command
                [items]="customers"
                aria-label="Choose customer"
                placeholder="Search customer"
                (selected)="last.set($event.label)"
              />
            </div>
          </doc-example>
        </div>
        <h3>Global shortcut</h3>
        <p>
          Ctrl + K on this page opens the site search. In your app, bind the shortcut in the
          root component and decide what each command does in <code>run</code>:
        </p>
        <doc-code [code]="shortcut" />
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: '↑ ↓', action: 'Change the active option (wrapping around).' },
            { key: 'Enter', action: 'Runs the active option.' },
            { key: 'Esc', action: 'Closes the dialog and returns focus.' },
            { key: 'Ctrl + K', action: 'A common shortcut to open it; define it in your app.' },
          ]"
          [aria]="[
            'A field with role=combobox; the list is a listbox with groups (role=group).',
            'aria-activedescendant points to the active option without taking focus from the field.',
            'The number of results is announced as you type.',
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
          [items]="[{ name: 'Combobox' }, { name: 'Dialog' }, { name: 'Dropdown menu' }]"
        />
      </section>
    </article>
  `,
})
export class CommandPalettePage {
  protected readonly withShortcuts: MxCommandItem[] = [
    { label: 'Save', group: 'File', hint: 'Ctrl S' },
    { label: 'Print', group: 'File', hint: 'Ctrl P' },
    { label: 'Void invoice', group: 'Invoice', hint: 'No permission', disabled: true },
    { label: 'Duplicate invoice', group: 'Invoice', hint: 'Ctrl D' },
  ];
  protected readonly customers: MxCommandItem[] = [
    'Kianda Logistics',
    'Banco Mutamba',
    'Huíla Agro',
    'Energia do Cuanza',
    'Atlântico Seguros',
  ].map((label) => ({ label }));
  protected readonly shortcut = `@Component({
  host: { '(document:keydown)': 'onKey($event)' },
})
export class App {
  private readonly palette = inject(MxCommandPalette);

  onKey(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.palette.open(COMMANDS).closed.subscribe((item) => item && this.run(item));
    }
  }

  run(item: MxCommandItem) {
    // navigate, open a dialog...
  }
}`;

  private readonly palette = inject(MxCommandPalette);
  protected readonly commands = COMMANDS;
  protected readonly last = signal('');

  protected open(): void {
    this.palette
      .open(COMMANDS, { placeholder: 'Search actions and pages', label: 'Commands' })
      .closed.subscribe((item) => {
        if (item) this.last.set(item.label);
      });
  }

  protected readonly previewCode = `const palette = inject(MxCommandPalette);

palette.open([
  { label: 'New invoice', group: 'Actions', keywords: ['issue'] },
  { label: 'Customers', group: 'Pages', data: '/customers' },
]).closed.subscribe((item) => item && run(item));`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Serviço',
      name: 'MxCommandPalette.open(items, options)',
      type: 'DialogRef<MxCommandItem>',
      description: 'Opens in a dialog; closes with the chosen item.',
    },
    {
      kind: 'Input',
      name: 'items',
      type: 'MxCommandItem[]',
      description: 'label, group, keywords, hint, disabled, data.',
    },
    { kind: 'Input', name: 'placeholder', type: 'string', default: 'Search...' },
    { kind: 'Input', name: 'aria-label', type: 'string', default: 'Search' },
    { kind: 'Output', name: 'selected', type: 'MxCommandItem' },
    {
      kind: 'Directiva',
      name: 'ng-template[mxCommandItem]',
      type: 'let-item',
      description: 'Custom rendering for each item (e.g. with an icon).',
    },
  ];
}
