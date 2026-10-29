import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MX_DIALOG, MX_DIALOG_DATA, MxDialog, MxDialogRef } from '@muxima-ui/core/dialog';
import { MxChoice, MxError, MxFieldset, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { MxRadio } from '@muxima-ui/core/radio';
import { MxSeparator } from '@muxima-ui/core/separator';
import { MxSlider } from '@muxima-ui/core/slider';
import { MX_TABLE } from '@muxima-ui/core/table';
import { MxTab, MxTabs } from '@muxima-ui/core/tabs';
import { Icon } from '../../../ui/icon';

/** Confirmation used when you try to close a form with changes. */
@Component({
  selector: 'doc-discard',
  imports: [MX_DIALOG, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Discard changes?</h2>
      <p mxDialogDescription>Your changes to the customer haven't been saved yet.</p>
    </mx-dialog-header>
    <mx-dialog-footer>
      <button mxButton type="button" variant="outline" [mxDialogClose]="false">Keep editing</button>
      <button mxButton type="button" variant="destructive" [mxDialogClose]="true">Discard</button>
    </mx-dialog-footer>
  `,
})
class DiscardDialog {}

/** 1. Edit form with a confirmation on close. */
@Component({
  selector: 'doc-edit-customer',
  imports: [MX_DIALOG, MxButton, ReactiveFormsModule, MxFormField, MxLabel, MxInput, MxHint, MxError],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="drawer-form" [formGroup]="form" (ngSubmit)="save()">
      <mx-dialog-header>
        <h2 mxDialogTitle>Edit customer</h2>
        <p mxDialogDescription>Kianda Logistics · Tax ID 5417039842</p>
      </mx-dialog-header>
      <mx-dialog-content class="stack">
        <mx-form-field>
          <label mxLabel>Company name</label>
          <input mxInput formControlName="name" required />
          <mx-error>Enter the company name.</mx-error>
        </mx-form-field>
        <mx-form-field>
          <label mxLabel>Billing email</label>
          <input mxInput type="email" formControlName="email" required />
          <mx-error>Enter a valid email.</mx-error>
        </mx-form-field>
        <mx-form-field>
          <label mxLabel>Phone</label>
          <input mxInput type="tel" formControlName="phone" />
          <mx-hint>With country code: +244.</mx-hint>
        </mx-form-field>
        <mx-form-field>
          <label mxLabel>Address</label>
          <textarea mxInput rows="3" formControlName="address"></textarea>
        </mx-form-field>
      </mx-dialog-content>
      <mx-dialog-footer>
        <button mxButton type="button" variant="outline" (click)="tryClose()">Cancel</button>
        <button mxButton type="submit" [loading]="saving()">Save</button>
      </mx-dialog-footer>
    </form>
  `,
})
export class EditCustomer {
  private readonly ref = inject(MxDialogRef);
  private readonly dialog = inject(MxDialog);
  protected readonly saving = signal(false);
  protected readonly form = new FormGroup({
    name: new FormControl('Kianda Logistics', { nonNullable: true, validators: Validators.required }),
    email: new FormControl('facturas@kianda.co.ao', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    phone: new FormControl('+244 923 000 111', { nonNullable: true }),
    address: new FormControl('27 Rua Rainha Ginga, Luanda', { nonNullable: true }),
  });

  constructor() {
    // Escape and clicking outside come through here (the drawer opens with disableClose)
    this.ref.backdropClick.subscribe(() => this.tryClose());
    this.ref.keydownEvents.subscribe((e) => {
      if (e.key === 'Escape') this.tryClose();
    });
  }

  protected tryClose(): void {
    if (!this.form.dirty) {
      this.ref.close();
      return;
    }
    this.dialog
      .open<boolean>(DiscardDialog, { role: 'alertdialog', size: 'sm' })
      .closed.subscribe((discard) => discard && this.ref.close());
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    setTimeout(() => this.ref.close(this.form.getRawValue().name), 900);
  }
}

/** 2. Filters. */
@Component({
  selector: 'doc-filters',
  imports: [MX_DIALOG, MxButton, FormsModule, MxCheckbox, MxRadio, MxChoice, MxFieldset, MxSlider, MxFormField, MxLabel, MxHint, MxSeparator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Filters</h2>
      <p mxDialogDescription>{{ count() }} active filters</p>
    </mx-dialog-header>
    <mx-dialog-content class="stack-lg">
      <fieldset mxFieldset>
        <legend>Invoice status</legend>
        @for (e of statuses; track e) {
          <label mxChoice><input type="checkbox" mxCheckbox [checked]="sel().includes(e)" (change)="toggle(e)" /> {{ e }}</label>
        }
      </fieldset>
      <hr mxSeparator />
      <fieldset mxFieldset>
        <legend>Period</legend>
        @for (p of periods; track p) {
          <label mxChoice><input type="radio" mxRadio name="period" [value]="p" [(ngModel)]="period" /> {{ p }}</label>
        }
      </fieldset>
      <hr mxSeparator />
      <mx-form-field>
        <label mxLabel>Minimum amount</label>
        <input type="range" mxSlider min="0" max="5000" step="250" [(ngModel)]="minimum" [attr.aria-valuetext]="minimum + ' thousand kwanzas'" />
        <mx-hint>{{ minimum }} thousand Kz</mx-hint>
      </mx-form-field>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="ghost" (click)="clear()">Clear</button>
      <button mxButton type="button" [mxDialogClose]="count()">Apply</button>
    </mx-dialog-footer>
  `,
})
export class FiltersPanel {
  protected readonly statuses = ['Paid', 'Pending', 'Overdue', 'Voided'];
  protected readonly periods = ['This month', 'Last 3 months', 'This year'];
  protected readonly sel = signal<string[]>(['Pending', 'Overdue']);
  protected period = 'This month';
  protected minimum = 0;
  protected readonly count = computed(() => this.sel().length + 1);

  protected toggle(e: string): void {
    this.sel.update((s) => (s.includes(e) ? s.filter((x) => x !== e) : [...s, e]));
  }
  protected clear(): void {
    this.sel.set([]);
    this.period = 'This month';
    this.minimum = 0;
  }
}

/** 3. Navigation on small screens. */
@Component({
  selector: 'doc-mobile-menu',
  imports: [MX_DIALOG, RouterLink, RouterLinkActive, Icon, MxAvatar, MxSeparator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Menu</h2>
    </mx-dialog-header>
    <mx-dialog-content>
      <nav aria-label="Main">
        <ul class="drawer-nav">
          @for (l of links; track l.path) {
            <li>
              <a [routerLink]="l.path" routerLinkActive="active" ariaCurrentWhenActive="page" (click)="ref.close()">
                <doc-icon [name]="l.icon" /> {{ l.label }}
              </a>
            </li>
          }
        </ul>
      </nav>
      <hr mxSeparator class="drawer-sep" />
      <div class="person">
        <mx-avatar name="Ana Kiala" src="exemplos/pessoa-1.svg" decorative />
        <div><strong>Ana Kiala</strong><span class="muted">ana&#64;kianda.co.ao</span></div>
      </div>
    </mx-dialog-content>
  `,
})
export class MobileMenu {
  protected readonly ref = inject(MxDialogRef);
  protected readonly links = [
    { label: 'Home', path: '/', icon: 'grid' },
    { label: 'Components', path: '/components', icon: 'box' },
    { label: 'Drawer', path: '/components/drawer', icon: 'drawer' },
    { label: 'Templates', path: '/templates', icon: 'layers' },
    { label: 'Pricing', path: '/pricing', icon: 'tag' },
  ];
}

/** 4. Detail with tabs. */
@Component({
  selector: 'doc-customer-detail',
  imports: [MX_DIALOG, MxButton, MxTabs, MxTab, MX_TABLE, MxBadge, MxAvatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <div class="person">
        <mx-avatar name="Banco Mutamba" size="lg" decorative />
        <div>
          <h2 mxDialogTitle>Banco Mutamba</h2>
          <p mxDialogDescription>Customer since 2022 · Luanda</p>
        </div>
      </div>
    </mx-dialog-header>
    <mx-dialog-content>
      <mx-tabs aria-label="Customer detail">
        <mx-tab label="Summary">
          <dl class="detail-list">
            <div><dt>Balance</dt><dd>4 870 500,00 Kz</dd></div>
            <div><dt>Invoices</dt><dd>38 issued, 2 pending</dd></div>
            <div><dt>Account manager</dt><dd>Pedro Neto</dd></div>
            <div><dt>Status</dt><dd><span mxBadge variant="warning">Payment pending</span></dd></div>
          </dl>
        </mx-tab>
        <mx-tab label="Invoices">
          <div class="mx-table-container">
            <table mxTable density="compact">
              <thead><tr><th scope="col">Invoice</th><th scope="col">Status</th><th scope="col" data-align="end">Amount (Kz)</th></tr></thead>
              <tbody>
                <tr><td>FT 2026/0143</td><td><span mxBadge variant="warning">Pending</span></td><td data-align="end">4 870 500,00</td></tr>
                <tr><td>FT 2026/0118</td><td><span mxBadge variant="success">Paid</span></td><td data-align="end">2 100 000,00</td></tr>
                <tr><td>FT 2026/0097</td><td><span mxBadge variant="success">Paid</span></td><td data-align="end">980 000,00</td></tr>
              </tbody>
            </table>
          </div>
        </mx-tab>
        <mx-tab label="Notes">
          <p class="muted">Payments made by transfer at the end of the month. Contact Dr. Luísa for adjustments.</p>
        </mx-tab>
      </mx-tabs>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="outline" mxDialogClose>Close</button>
      <button mxButton type="button" [mxDialogClose]="true">New invoice</button>
    </mx-dialog-footer>
  `,
})
export class CustomerDetail {}

/** 5. Action sheet at the bottom. */
@Component({
  selector: 'doc-action-sheet',
  imports: [MX_DIALOG, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>FT 2026/0142</h2>
      <p mxDialogDescription>Choose an action</p>
    </mx-dialog-header>
    <mx-dialog-content>
      <ul class="sheet-actions">
        @for (a of actions; track a.label) {
          <li>
            <button type="button" [class.danger]="a.danger" [mxDialogClose]="a.label"><doc-icon [name]="a.icon" /> {{ a.label }}</button>
          </li>
        }
      </ul>
    </mx-dialog-content>
  `,
})
export class ActionSheet {
  protected readonly actions = [
    { label: 'Download PDF', icon: 'file', danger: false },
    { label: 'Send by email', icon: 'message', danger: false },
    { label: 'Duplicate', icon: 'copy', danger: false },
    { label: 'Void invoice', icon: 'x', danger: true },
  ];
}

/** 6. Notifications. */
@Component({
  selector: 'doc-notifications',
  imports: [MX_DIALOG, MxButton, MxBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <div class="row-between">
        <h2 mxDialogTitle>Notifications</h2>
        @if (unread() > 0) {
          <span mxBadge>{{ unread() }} unread</span>
        }
      </div>
    </mx-dialog-header>
    <mx-dialog-content>
      <ul class="notif-list">
        @for (n of items(); track n.id) {
          <li [class.unread]="!n.read">
            <span mxBadge size="sm" [variant]="n.variant">{{ n.tag }}</span>
            <div>
              <p>{{ n.text }}</p>
              <p class="muted">{{ n.when }}@if (!n.read) { <span class="mx-visually-hidden">, unread</span> }</p>
            </div>
          </li>
        }
      </ul>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="ghost" [disabled]="unread() === 0" (click)="markAll()">Mark all as read</button>
    </mx-dialog-footer>
  `,
})
export class NotificationsPanel {
  protected readonly data = inject<unknown>(MX_DIALOG_DATA, { optional: true });
  protected readonly items = signal([
    { id: 1, tag: 'Error', variant: 'danger' as const, text: 'Sending 3 invoices to the tax authority failed.', when: '10 minutes ago', read: false },
    { id: 2, tag: 'Paid', variant: 'success' as const, text: 'Huíla Agro paid FT 2026/0144.', when: '1 hour ago', read: false },
    { id: 3, tag: 'Deadline', variant: 'warning' as const, text: 'FT 2026/0139 is due in 3 days.', when: 'Yesterday', read: true },
  ]);
  protected readonly unread = computed(() => this.items().filter((n) => !n.read).length);
  protected markAll(): void {
    this.items.update((list) => list.map((n) => ({ ...n, read: true })));
  }
}
