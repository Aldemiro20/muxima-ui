import { MxAvatar } from '@muxima-ui/core/avatar';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MX_MENU } from '@muxima-ui/core/menu';
import { MxSeparator } from '@muxima-ui/core/separator';
import { MxToast } from '@muxima-ui/core/toast';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';
import { Icon } from '../../../ui/icon';

@Component({
  selector: 'doc-dropdown-menu-page',
  imports: [DOC_UI, MX_MENU, MxButton, MxSeparator, Icon, MxAvatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Dropdown menu' }]"
        title="Dropdown menu"
        lead="A list of actions opened by a button, following the WAI-ARIA Menu Button pattern. Built on @angular/cdk/menu: arrows, type-ahead and Escape come included."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Menu example">
          <button mxButton type="button" variant="outline" [mxMenuTriggerFor]="actions">
            Actions <doc-icon name="chevronRight" class="rot-90" />
          </button>
          <ng-template #actions>
            <div mxMenu>
              <button mxMenuItem (mxMenuItemTriggered)="say('Edit')"><doc-icon name="file" /> Edit</button>
              <button mxMenuItem (mxMenuItemTriggered)="say('Duplicate')"><doc-icon name="copy" /> Duplicate <span class="mx-menu-shortcut">Ctrl D</span></button>
              <button mxMenuItem disabled><doc-icon name="external" /> Share (Pro)</button>
              <hr mxSeparator />
              <button mxMenuItem variant="destructive" (mxMenuItemTriggered)="say('Delete')"><doc-icon name="x" /> Delete</button>
            </div>
          </ng-template>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MX_MENU } from '@muxima-ui/core/menu';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>The menu lives in an ng-template and is only created when it opens.</p>
        <doc-structure [labels]="{ topLeft: 'Button with aria-haspopup', topRight: 'Overlay shadow', bottomLeft: '32 px option', bottomRight: '10 px radius', bottom: 'role=menu with role=menuitem' }">
          <div class="mx-menu mini-menu" aria-hidden="true"><span class="mx-menu-item">Edit</span><span class="mx-menu-item" data-variant="destructive">Delete</span></div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>States of each menu option.</p>
        <doc-states>
          <doc-state name="Default"><div class="mx-menu mini-menu"><span class="mx-menu-item">Edit</span></div></doc-state>
          <doc-state name="Hover and focus" note="Soft background; the keyboard moves focus."><div class="mx-menu mini-menu"><span class="mx-menu-item" data-mx-state="hover">Edit</span></div></doc-state>
          <doc-state name="Disabled" note="Skipped by the arrows."><div class="mx-menu mini-menu"><span class="mx-menu-item" data-disabled>Share</span></div></doc-state>
          <doc-state name="Destructive" note="variant=destructive"><div class="mx-menu mini-menu"><span class="mx-menu-item" data-variant="destructive">Delete</span></div></doc-state>
          <doc-state name="Checked" note="mxMenuItemCheckbox"><div class="mx-menu mini-menu"><span class="mx-menu-item" data-checkable data-checked>Show VAT</span></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Options that toggle" note="role=menuitemcheckbox and menuitemradio.">
            <button mxButton type="button" variant="outline" [mxMenuTriggerFor]="view">View</button>
            <ng-template #view>
              <div mxMenu>
                <button mxMenuItemCheckbox [checked]="iva()" (mxMenuItemTriggered)="iva.set(!iva())">Show VAT</button>
                <button mxMenuItemCheckbox [checked]="paid()" (mxMenuItemTriggered)="paid.set(!paid())">Include paid</button>
                <hr mxSeparator />
                <div mxMenuGroup aria-label="Density">
                  <span mxMenuLabel>Density</span>
                  <button mxMenuItemRadio [checked]="density() === 'normal'" (mxMenuItemTriggered)="density.set('normal')">Default</button>
                  <button mxMenuItemRadio [checked]="density() === 'compact'" (mxMenuItemTriggered)="density.set('compact')">Compact</button>
                </div>
              </div>
            </ng-template>
          </doc-example>
          <doc-example title="Icon-only button">
            <button mxButton type="button" variant="ghost" icon aria-label="More actions" [mxMenuTriggerFor]="more"><doc-icon name="menu" /></button>
            <ng-template #more>
              <div mxMenu>
                <button mxMenuItem>Download PDF</button>
                <button mxMenuItem>Send by email</button>
              </div>
            </ng-template>
          </doc-example>
          <doc-example title="Submenu" note="An item with [mxMenuTriggerFor] opens another menu; right arrow goes in, left arrow comes out.">
            <button mxButton type="button" variant="outline" [mxMenuTriggerFor]="fileMenu">File</button>
            <ng-template #fileMenu>
              <div mxMenu>
                <button mxMenuItem (mxMenuItemTriggered)="say('New')">New <span class="mx-menu-shortcut">Ctrl N</span></button>
                <button mxMenuItem [mxMenuTriggerFor]="exportMenu">Export as</button>
                <hr mxSeparator />
                <button mxMenuItem (mxMenuItemTriggered)="say('Print')">Print <span class="mx-menu-shortcut">Ctrl P</span></button>
              </div>
            </ng-template>
            <ng-template #exportMenu>
              <div mxMenu>
                <button mxMenuItem (mxMenuItemTriggered)="say('PDF')">PDF</button>
                <button mxMenuItem (mxMenuItemTriggered)="say('Excel')">Excel</button>
                <button mxMenuItem (mxMenuItemTriggered)="say('CSV')">CSV</button>
              </div>
            </ng-template>
          </doc-example>
          <doc-example title="User menu" note="The avatar button has its own accessible name.">
            <button type="button" class="user-trigger" aria-label="Ana Kiala's account" [mxMenuTriggerFor]="account">
              <mx-avatar name="Ana Kiala" src="exemplos/pessoa-1.svg" size="sm" decorative /> Ana Kiala
            </button>
            <ng-template #account>
              <div mxMenu>
                <span mxMenuLabel>ana&#64;kianda.co.ao</span>
                <button mxMenuItem>Profile</button>
                <button mxMenuItem>Settings</button>
                <button mxMenuItem>Billing</button>
                <hr mxSeparator />
                <button mxMenuItem variant="destructive">Sign out</button>
              </div>
            </ng-template>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Enter Space ↓', action: 'Open the menu and focus the first option.' },
            { key: '↑ ↓', action: 'Move between options.' },
            { key: 'Home End', action: 'First and last option.' },
            { key: 'Letter', action: 'Jumps to the option that starts with it.' },
            { key: 'Esc', action: 'Closes and returns focus to the button.' }
          ]"
          [aria]="[
            'Button with aria-haspopup=menu and aria-expanded.',
            'role=menu with role=menuitem, menuitemcheckbox or menuitemradio.',
            'Groups of exclusive options have role=group and aria-label.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Popover' }, { name: 'Button' }, { name: 'Command Palette' }]" />
      </section>
    </article>
  `,
})
export class DropdownMenuPage {
  private readonly toast = inject(MxToast);
  protected readonly iva = signal(true);
  protected readonly paid = signal(false);
  protected readonly density = signal<'normal' | 'compact'>('normal');

  protected say(action: string): void {
    this.toast.show(`You chose: ${action}`);
  }

  protected readonly previewCode = `<button mxButton variant="outline" [mxMenuTriggerFor]="actions">Actions</button>
<ng-template #actions>
  <div mxMenu>
    <button mxMenuItem (mxMenuItemTriggered)="edit()">Edit</button>
    <button mxMenuItem disabled>Share</button>
    <hr mxSeparator />
    <button mxMenuItem variant="destructive">Delete</button>
  </div>
</ng-template>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: '[mxMenuTriggerFor]', type: 'TemplateRef', description: 'Button that opens the menu.' },
    { kind: 'Input', name: 'mxMenuPosition', type: 'ConnectedPosition[]', description: 'Fallback positions (CDK).' },
    { kind: 'Directiva', name: '[mxMenu]', type: 'directive', description: 'The list (role=menu).' },
    { kind: 'Directiva', name: '[mxMenuItem]', type: "variant: 'default' | 'destructive'", default: 'default' },
    { kind: 'Input', name: 'disabled', type: 'boolean', default: 'false', description: 'On any option.' },
    { kind: 'Output', name: 'mxMenuItemTriggered', type: 'void', description: 'The option was chosen.' },
    { kind: 'Directiva', name: '[mxMenuItemCheckbox], [mxMenuItemRadio]', type: 'checked: boolean', description: 'Options that toggle.' },
    { kind: 'Directiva', name: '[mxMenuGroup], [mxMenuLabel]', type: 'directive', description: 'A group of exclusive options and its title.' },
  ];
}
