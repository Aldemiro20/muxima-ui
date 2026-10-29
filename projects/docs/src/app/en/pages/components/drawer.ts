import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MX_DIALOG_DATA } from '@muxima-ui/core/dialog';
import { MxDrawer, MxDrawerSide } from '@muxima-ui/core/drawer';
import { MxToast } from '@muxima-ui/core/toast';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';
import { Icon } from '../../../ui/icon';
import { ActionSheet, CustomerDetail, EditCustomer, FiltersPanel, MobileMenu, NotificationsPanel } from './drawer-examples';

@Component({
  selector: 'doc-invoice-detail',
  imports: [MX_DIALOG, MxButton, MxBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>FT 2026/0142</h2>
      <p mxDialogDescription>Kianda Logistics</p>
    </mx-dialog-header>
    <mx-dialog-content>
      <dl class="detail-list">
        <div><dt>Status</dt><dd><span mxBadge variant="success">Paid</span></dd></div>
        <div><dt>Issued</dt><dd>October 3, 2026</dd></div>
        <div><dt>Amount</dt><dd>$1,250</dd></div>
        <div><dt>Side</dt><dd>{{ data.side }}</dd></div>
      </dl>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="outline" mxDialogClose>Close</button>
      <button mxButton type="button" [mxDialogClose]="true">Download PDF</button>
    </mx-dialog-footer>
  `,
})
class InvoiceDetail {
  protected readonly data = inject<{ side: string }>(MX_DIALOG_DATA);
}

@Component({
  selector: 'doc-drawer-page',
  imports: [DOC_UI, MxButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Drawer' }]"
        title="Drawer"
        lead="A modal panel that slides in from one side of the screen, for details and editing without leaving the page. It's a Dialog: focus trapped, Escape, and focus returned."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Drawer example">
          <button mxButton type="button" (click)="open('right')">Open detail</button>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxDrawer } from '@muxima-ui/core/drawer';
import { MX_DIALOG } from '@muxima-ui/core/dialog'; // title, content and footer" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>It uses the same building blocks as Dialog. The content scrolls and the footer stays at the bottom.</p>
        <doc-structure [labels]="{ topLeft: 'mxDialogTitle', topRight: 'Full height', bottomLeft: 'mx-dialog-content with scroll', bottomRight: '320, 420 or 560 px', bottom: 'Dimmed backdrop; clicking outside closes' }">
          <div class="mini-drawer"><span></span></div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <doc-states>
          <doc-state name="Closed" note="Focus returns to the button that opened it."><button mxButton type="button" variant="outline" size="sm">Open</button></doc-state>
          <doc-state name="Open" note="Focus on the first element."><div class="mini-drawer"><span></span></div></doc-state>
          <doc-state name="Can't dismiss" note="disableClose: only the buttons close it."><div class="mini-drawer"><span></span></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <p>Real cases. Each button opens a different drawer; try it with the keyboard too.</p>
        <div class="grid-2">
          <doc-example title="Edit with confirmation" note="Opens with disableClose: with unsaved changes, Escape, clicking outside and Cancel ask for confirmation.">
            <button mxButton type="button" (click)="edit()">Edit customer</button>
          </doc-example>
          <doc-example title="Filters" note="Slides in from the left; Apply returns the result to the opener.">
            <button mxButton type="button" variant="outline" (click)="filters()"><doc-icon name="sliders" /> Filters</button>
          </doc-example>
          <doc-example title="Navigation on phones" note="The app menu on narrow screens; it closes when you pick a page.">
            <button mxButton type="button" variant="outline" icon aria-label="Open menu" (click)="menu()"><doc-icon name="menu" /></button>
          </doc-example>
          <doc-example title="Detail with tabs" note="size lg: room for a table inside the panel.">
            <button mxButton type="button" variant="outline" (click)="detail()">See Banco Mutamba</button>
          </doc-example>
          <doc-example title="Action sheet" note="side bottom: actions within thumb reach on phones.">
            <button mxButton type="button" variant="outline" (click)="sheet()">Invoice actions</button>
          </doc-example>
          <doc-example title="Notifications" note="size sm, on the right: a short list with read and unread state.">
            <button mxButton type="button" variant="outline" (click)="notifications()"><doc-icon name="bell" /> Notifications</button>
          </doc-example>
          <doc-example title="Sides">
            <button mxButton type="button" variant="outline" size="sm" (click)="open('left')">Left</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="open('right')">Right</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="open('bottom')">Bottom</button>
          </doc-example>
          <doc-example title="Sizes" note="sm 320 px, md 420 px, lg 560 px.">
            <button mxButton type="button" variant="outline" size="sm" (click)="open('right', 'sm')">Small</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="open('right', 'md')">Medium</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="open('right', 'lg')">Large</button>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Cycles only inside the panel.' }, { key: 'Esc', action: 'Closes and returns focus.' }]"
          [aria]="[
            'role=dialog with aria-modal=true; the rest of the page is inert.',
            'mxDialogTitle names the panel.',
            'With reduced motion, it appears without animation.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p><code>MxDrawer.open(content, options)</code> returns a <code>DialogRef</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Dialog' }, { name: 'Popover' }, { name: 'Card' }]" />
      </section>
    </article>
  `,
})
export class DrawerPage {
  private readonly drawer = inject(MxDrawer);

  private readonly toast = inject(MxToast);

  protected open(side: MxDrawerSide, size: 'sm' | 'md' | 'lg' = 'md'): void {
    this.drawer.open(InvoiceDetail, { side, size, data: { side } });
  }

  protected edit(): void {
    this.drawer.open<string>(EditCustomer, { disableClose: true }).closed.subscribe((name) => {
      if (name) this.toast.success('Customer saved', { description: name });
    });
  }
  protected filters(): void {
    this.drawer.open<number>(FiltersPanel, { side: 'left', size: 'sm' }).closed.subscribe((n) => {
      if (n != null) this.toast.info(`${n} filters applied`);
    });
  }
  protected menu(): void {
    this.drawer.open(MobileMenu, { side: 'left', size: 'sm' });
  }
  protected detail(): void {
    this.drawer.open<boolean>(CustomerDetail, { size: 'lg' }).closed.subscribe((isNew) => {
      if (isNew) this.toast.show('New invoice for Banco Mutamba');
    });
  }
  protected sheet(): void {
    this.drawer.open<string>(ActionSheet, { side: 'bottom', size: 'sm' }).closed.subscribe((a) => {
      if (a === 'Void invoice') this.toast.error('Invoice FT 2026/0142 voided');
      else if (a) this.toast.success(a);
    });
  }
  protected notifications(): void {
    this.drawer.open(NotificationsPanel, { size: 'sm' });
  }

  protected readonly previewCode = `const drawer = inject(MxDrawer);
drawer.open(InvoiceDetail, { side: 'right', size: 'md', data: invoice });`;

  protected readonly api: ApiRow[] = [
    { kind: 'Serviço', name: 'MxDrawer.open(content, options)', type: 'DialogRef<R>' },
    { kind: 'Input', name: 'options.side', type: "'left' | 'right' | 'bottom'", default: 'right', description: 'bottom: up to 640 px wide, centered.' },
    { kind: 'Input', name: 'options.size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '320, 420 or 560 px.' },
    { kind: 'Input', name: 'options.data', type: 'D', description: 'Read with inject(MX_DIALOG_DATA).' },
    { kind: 'Input', name: 'options.disableClose', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'options.ariaLabel', type: 'string', description: 'When there\'s no mxDialogTitle.' },
  ];
}
