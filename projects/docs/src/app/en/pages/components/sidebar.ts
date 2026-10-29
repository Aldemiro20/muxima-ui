import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MxDialogRef } from '@muxima-ui/core/dialog';
import { MxDrawer } from '@muxima-ui/core/drawer';
import { MX_SIDEBAR } from '@muxima-ui/core/sidebar';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';
import { Icon } from '../../../ui/icon';

const MENU = [
  { id: 'home', label: 'Overview', icon: 'grid' },
  { id: 'invoices', label: 'Invoices', icon: 'file', badge: 3 },
  { id: 'customers', label: 'Customers', icon: 'users' },
  { id: 'reports', label: 'Reports', icon: 'chart' },
];

/** Navigation on phones: the same list inside a drawer. */
@Component({
  selector: 'doc-mobile-sidebar',
  imports: [MX_DIALOG, MX_SIDEBAR, Icon, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header><h2 mxDialogTitle>Kianda Management</h2></mx-dialog-header>
    <mx-dialog-content>
      <mx-sidebar class="sidebar-in-drawer" aria-label="App menu">
        <mx-sidebar-group>
          @for (i of menu; track i.id) {
            <li>
              <button mxSidebarItem type="button" (click)="ref.close(i.id)">
                <doc-icon mxSidebarIcon [name]="i.icon" [size]="18" />
                <span mxSidebarLabel>{{ i.label }}</span>
              </button>
            </li>
          }
        </mx-sidebar-group>
      </mx-sidebar>
    </mx-dialog-content>
    <mx-dialog-footer
      ><button mxButton variant="outline" type="button" mxDialogClose>
        Close
      </button></mx-dialog-footer
    >
  `,
})
class MobileSidebar {
  protected readonly menu = MENU;
  protected readonly ref = inject(MxDialogRef);
}

@Component({
  selector: 'doc-sidebar-page',
  imports: [DOC_UI, MX_SIDEBAR, Icon, MxAvatar, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Sidebar' }]"
        title="Sidebar"
        lead="The app's side navigation, with groups, expandable sections and counts. It collapses to icons only: the names are still there for screen readers and appear in a hint on hover or focus."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Sidebar example">
          <div class="app-frame">
            <mx-sidebar
              #menuA="mxSidebar"
              [(collapsed)]="collapsed"
              aria-label="App navigation"
            >
              <div mxSidebarHeader>
                <button mxSidebarToggle [sidebar]="menuA">
                  <doc-icon name="menu" [size]="18" />
                </button>
                <strong class="sidebar-brand">Kianda</strong>
              </div>
              <mx-sidebar-group label="Management">
                @for (i of menu; track i.id) {
                  <li>
                    <button
                      mxSidebarItem
                      type="button"
                      [attr.aria-current]="active() === i.id ? 'page' : null"
                      (click)="active.set(i.id)"
                    >
                      <doc-icon mxSidebarIcon [name]="i.icon" [size]="18" />
                      <span mxSidebarLabel>{{ i.label }}</span>
                      @if (i.badge) {
                        <span mxSidebarBadge
                          >{{ i.badge }}<span class="mx-visually-hidden"> unpaid</span></span
                        >
                      }
                    </button>
                  </li>
                }
              </mx-sidebar-group>
            </mx-sidebar>
            <div class="app-frame-content">
              <p class="muted small">Open page</p>
              <p class="app-frame-title">{{ name(active()) }}</p>
            </div>
          </div>
        </doc-preview>
        <doc-callout
          >In the examples the items are buttons that change a signal. In an app, use links with
          routerLink, routerLinkActive and ariaCurrentWhenActive="page".</doc-callout
        >
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MX_SIDEBAR } from '@muxima-ui/core/sidebar';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>Header, a nav with groups of items, and a footer. Collapsed, it's 60 px wide.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Header',
            topRight: 'Active item (aria-current)',
            bottomLeft: 'Group with title',
            bottomRight: 'Count',
            bottom: 'mx-sidebar > nav > ul',
          }"
        >
          <div class="app-frame app-frame-sm">
            <mx-sidebar aria-label="Example">
              <mx-sidebar-group label="Management">
                <li>
                  <button mxSidebarItem type="button" aria-current="page">
                    <doc-icon mxSidebarIcon name="file" [size]="18" /><span mxSidebarLabel
                      >Invoices</span
                    ><span mxSidebarBadge>3</span>
                  </button>
                </li>
                <li>
                  <button mxSidebarItem type="button">
                    <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                      >Customers</span
                    >
                  </button>
                </li>
              </mx-sidebar-group>
            </mx-sidebar>
          </div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Default"
            ><div class="state-sidebar">
              <button mxSidebarItem type="button">
                <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                  >Customers</span
                >
              </button>
            </div></doc-state
          >
          <doc-state name="Hover"
            ><div class="state-sidebar">
              <button mxSidebarItem type="button" data-mx-state="hover">
                <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                  >Customers</span
                >
              </button>
            </div></doc-state
          >
          <doc-state name="Focus"
            ><div class="state-sidebar">
              <button mxSidebarItem type="button" data-mx-state="focus">
                <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                  >Customers</span
                >
              </button>
            </div></doc-state
          >
          <doc-state name="Active" note="aria-current=page."
            ><div class="state-sidebar">
              <button mxSidebarItem type="button" aria-current="page">
                <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                  >Customers</span
                >
              </button>
            </div></doc-state
          >
          <doc-state name="With count"
            ><div class="state-sidebar">
              <button mxSidebarItem type="button">
                <doc-icon mxSidebarIcon name="file" [size]="18" /><span mxSidebarLabel
                  >Invoices</span
                ><span mxSidebarBadge>3</span>
              </button>
            </div></doc-state
          >
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="Collapsed"
            note="Hover or use Tab: the hint shows the name, which screen readers already read."
          >
            <div class="app-frame app-frame-sm">
              <mx-sidebar [collapsed]="true" aria-label="Collapsed navigation">
                <mx-sidebar-group label="Management">
                  @for (i of menu; track i.id) {
                    <li>
                      <button
                        mxSidebarItem
                        type="button"
                        [attr.aria-current]="activeB() === i.id ? 'page' : null"
                        (click)="activeB.set(i.id)"
                      >
                        <doc-icon mxSidebarIcon [name]="i.icon" [size]="18" />
                        <span mxSidebarLabel>{{ i.label }}</span>
                        @if (i.badge) {
                          <span mxSidebarBadge
                            >{{ i.badge }}<span class="mx-visually-hidden"> unpaid</span></span
                          >
                        }
                      </button>
                    </li>
                  }
                </mx-sidebar-group>
              </mx-sidebar>
            </div>
          </doc-example>
          <doc-example
            title="Groups and an expandable section"
            note="mx-sidebar-section opens with aria-expanded; when collapsed, it opens the bar."
          >
            <div class="app-frame app-frame-tall">
              <mx-sidebar aria-label="Administration">
                <mx-sidebar-group label="Sales">
                  <li>
                    <button mxSidebarItem type="button" aria-current="page">
                      <doc-icon mxSidebarIcon name="file" [size]="18" /><span mxSidebarLabel
                        >Invoices</span
                      >
                    </button>
                  </li>
                  <li>
                    <button mxSidebarItem type="button">
                      <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                        >Customers</span
                      >
                    </button>
                  </li>
                  <li>
                    <mx-sidebar-section label="Reports" [(open)]="reportsOpen">
                      <doc-icon mxSidebarIcon name="chart" [size]="18" />
                      <li>
                        <button mxSidebarItem type="button">
                          <span mxSidebarLabel>Sales by month</span>
                        </button>
                      </li>
                      <li>
                        <button mxSidebarItem type="button">
                          <span mxSidebarLabel>Overdue customers</span>
                        </button>
                      </li>
                      <li>
                        <button mxSidebarItem type="button"><span mxSidebarLabel>IVA</span></button>
                      </li>
                    </mx-sidebar-section>
                  </li>
                </mx-sidebar-group>
                <mx-sidebar-group label="Account">
                  <li>
                    <button mxSidebarItem type="button">
                      <doc-icon mxSidebarIcon name="sliders" [size]="18" /><span mxSidebarLabel
                        >Settings</span
                      >
                    </button>
                  </li>
                </mx-sidebar-group>
              </mx-sidebar>
            </div>
          </doc-example>
          <doc-example
            title="With account in the footer"
            note='variant="subtle" uses the paper background; mxSidebarFooter sits at the bottom.'
          >
            <div class="app-frame app-frame-tall">
              <mx-sidebar #menuC="mxSidebar" variant="subtle" aria-label="Navigation with account">
                <div mxSidebarHeader>
                  <doc-icon name="sparkle" [size]="20" /><strong class="sidebar-brand"
                    >Kianda</strong
                  >
                </div>
                <mx-sidebar-group>
                  @for (i of menu; track i.id) {
                    <li>
                      <button
                        mxSidebarItem
                        type="button"
                        [attr.aria-current]="i.id === 'customers' ? 'page' : null"
                      >
                        <doc-icon mxSidebarIcon [name]="i.icon" [size]="18" /><span
                          mxSidebarLabel
                          >{{ i.label }}</span
                        >
                      </button>
                    </li>
                  }
                </mx-sidebar-group>
                <div mxSidebarFooter>
                  <mx-avatar name="Ana Kiala" size="sm" decorative />
                  <span class="sidebar-user"
                    ><strong>Ana Kiala</strong><span class="muted small">Administrator</span></span
                  >
                </div>
              </mx-sidebar>
            </div>
          </doc-example>
          <doc-example
            title="Button outside the bar"
            note="mxSidebarToggle can sit at the top of the page; aria-controls points to the bar."
          >
            <div class="stack w-full">
              <div class="row-wrap">
                <button
                  mxButton
                  variant="outline"
                  size="sm"
                  mxSidebarToggle
                  [sidebar]="menuD"
                  collapseLabel="Hide names"
                  expandLabel="Show names"
                >
                  <doc-icon name="menu" [size]="16" />
                  {{ menuD.collapsed() ? 'Show names' : 'Hide names' }}
                </button>
              </div>
              <div class="app-frame app-frame-sm">
                <mx-sidebar #menuD="mxSidebar" aria-label="Secondary">
                  <mx-sidebar-group>
                    @for (i of menu; track i.id) {
                      <li>
                        <button mxSidebarItem type="button">
                          <doc-icon mxSidebarIcon [name]="i.icon" [size]="18" /><span
                            mxSidebarLabel
                            >{{ i.label }}</span
                          >
                        </button>
                      </li>
                    }
                  </mx-sidebar-group>
                </mx-sidebar>
              </div>
            </div>
          </doc-example>
          <doc-example
            title="On phones"
            [note]="'Opens the same navigation in a drawer. Chosen: ' + name(mobile())"
          >
            <button mxButton variant="outline" type="button" (click)="openMobile()">
              <doc-icon name="menu" [size]="16" /> Open menu
            </button>
          </doc-example>
          <doc-example
            title="Custom width"
            note="The --mx-sidebar-width and --mx-sidebar-collapsed-width variables change the widths."
          >
            <div class="app-frame app-frame-sm">
              <mx-sidebar class="sidebar-wide" aria-label="Documents">
                <mx-sidebar-group label="Folders">
                  <li>
                    <button mxSidebarItem type="button" aria-current="page">
                      <doc-icon mxSidebarIcon name="folder" [size]="18" /><span mxSidebarLabel
                        >Contracts signed in 2026</span
                      ><span mxSidebarBadge>12</span>
                    </button>
                  </li>
                  <li>
                    <button mxSidebarItem type="button">
                      <doc-icon mxSidebarIcon name="folder" [size]="18" /><span mxSidebarLabel
                        >Proposals awaiting reply</span
                      ><span mxSidebarBadge>4</span>
                    </button>
                  </li>
                </mx-sidebar-group>
              </mx-sidebar>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Moves through the items in order; the bar does not trap focus.' },
            { key: 'Enter Space', action: 'Open the item or the section.' },
          ]"
          [aria]="[
            'The content is in a named nav (aria-label, Main by default).',
            'Each group is a list named by its title (aria-labelledby).',
            'The item of the current page has aria-current=page.',
            'Collapsed, the names are only visually hidden; the hint is decorative (aria-hidden).',
            'The collapse button has aria-expanded and aria-controls, and its name changes: Collapse menu, Expand menu.',
            'Add what the count means (3 unpaid) as hidden text.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Drawer' }, { name: 'Tabs' }, { name: 'Breadcrumb' }]" />
      </section>
    </article>
  `,
})
export class SidebarPage {
  private readonly drawer = inject(MxDrawer);
  protected readonly menu = MENU;
  protected readonly collapsed = signal(false);
  protected readonly active = signal('invoices');
  protected readonly activeB = signal('home');
  protected readonly reportsOpen = signal(true);
  protected readonly mobile = signal('home');

  protected name(id: string): string {
    return MENU.find((i) => i.id === id)?.label ?? '';
  }
  protected openMobile(): void {
    this.drawer
      .open<string>(MobileSidebar, { side: 'left', size: 'sm', ariaLabel: 'Navigation' })
      .closed.subscribe((id) => id && this.mobile.set(id));
  }

  protected readonly previewCode = `<mx-sidebar #menu="mxSidebar" [(collapsed)]="collapsed" aria-label="Main">
  <div mxSidebarHeader>
    <button mxSidebarToggle [sidebar]="menu"><svg>...</svg></button>
    <strong>Kianda</strong>
  </div>
  <mx-sidebar-group label="Management">
    <li>
      <a mxSidebarItem routerLink="/invoices" routerLinkActive ariaCurrentWhenActive="page">
        <svg mxSidebarIcon>...</svg>
        <span mxSidebarLabel>Invoices</span>
        <span mxSidebarBadge>3<span class="mx-visually-hidden"> unpaid</span></span>
      </a>
    </li>
  </mx-sidebar-group>
</mx-sidebar>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Componente',
      name: 'mx-sidebar',
      type: '[(collapsed)], variant, aria-label, id',
      description: 'The bar; the content goes in a nav.',
    },
    { kind: 'Input', name: 'collapsed', type: 'boolean (model)', default: 'false' },
    { kind: 'Input', name: 'variant', type: "'default' | 'subtle'", default: 'default' },
    {
      kind: 'Input',
      name: 'aria-label',
      type: 'string',
      default: 'Main (from the language)',
      description: 'Nav name.',
    },
    { kind: 'Método', name: 'toggle()', type: 'void', description: 'Collapses or expands.' },
    {
      kind: 'Directiva',
      name: 'a[mxSidebarItem], button[mxSidebarItem]',
      type: 'item',
      description: 'With mxSidebarIcon, mxSidebarLabel and mxSidebarBadge.',
    },
    {
      kind: 'Componente',
      name: 'mx-sidebar-group',
      type: 'label',
      description: 'A list with a title; items go in li.',
    },
    {
      kind: 'Componente',
      name: 'mx-sidebar-section',
      type: 'label, [(open)]',
      description: 'A sub-list that opens and closes.',
    },
    {
      kind: 'Directiva',
      name: 'button[mxSidebarToggle]',
      type: 'sidebar, collapseLabel, expandLabel',
      description: 'Collapse button.',
    },
    {
      kind: 'Directiva',
      name: 'mxSidebarHeader, mxSidebarFooter',
      type: 'style',
      description: 'Top and bottom of the bar.',
    },
    {
      kind: 'Token CSS',
      name: '--mx-sidebar-width, --mx-sidebar-collapsed-width',
      type: 'length',
      default: '248px, 60px',
    },
  ];
}
