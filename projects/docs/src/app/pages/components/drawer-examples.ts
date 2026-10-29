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
import { Icon } from '../../ui/icon';

/** Confirmação usada quando se tenta fechar um formulário com alterações. */
@Component({
  selector: 'doc-descartar',
  imports: [MX_DIALOG, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Descartar alterações?</h2>
      <p mxDialogDescription>As alterações ao cliente ainda não foram guardadas.</p>
    </mx-dialog-header>
    <mx-dialog-footer>
      <button mxButton type="button" variant="outline" [mxDialogClose]="false">Continuar a editar</button>
      <button mxButton type="button" variant="destructive" [mxDialogClose]="true">Descartar</button>
    </mx-dialog-footer>
  `,
})
class Descartar {}

/** 1. Formulário de edição com confirmação ao fechar. */
@Component({
  selector: 'doc-editar-cliente',
  imports: [MX_DIALOG, MxButton, ReactiveFormsModule, MxFormField, MxLabel, MxInput, MxHint, MxError],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form class="drawer-form" [formGroup]="form" (ngSubmit)="save()">
      <mx-dialog-header>
        <h2 mxDialogTitle>Editar cliente</h2>
        <p mxDialogDescription>Kianda Logística · NIF 5417039842</p>
      </mx-dialog-header>
      <mx-dialog-content class="stack">
        <mx-form-field>
          <label mxLabel>Nome da empresa</label>
          <input mxInput formControlName="nome" required />
          <mx-error>Indica o nome da empresa.</mx-error>
        </mx-form-field>
        <mx-form-field>
          <label mxLabel>Email de facturação</label>
          <input mxInput type="email" formControlName="email" required />
          <mx-error>Introduz um email válido.</mx-error>
        </mx-form-field>
        <mx-form-field>
          <label mxLabel>Telefone</label>
          <input mxInput type="tel" formControlName="telefone" />
          <mx-hint>Com indicativo: +244.</mx-hint>
        </mx-form-field>
        <mx-form-field>
          <label mxLabel>Morada</label>
          <textarea mxInput rows="3" formControlName="morada"></textarea>
        </mx-form-field>
      </mx-dialog-content>
      <mx-dialog-footer>
        <button mxButton type="button" variant="outline" (click)="tryClose()">Cancelar</button>
        <button mxButton type="submit" [loading]="saving()">Guardar</button>
      </mx-dialog-footer>
    </form>
  `,
})
export class EditarCliente {
  private readonly ref = inject(MxDialogRef);
  private readonly dialog = inject(MxDialog);
  protected readonly saving = signal(false);
  protected readonly form = new FormGroup({
    nome: new FormControl('Kianda Logística', { nonNullable: true, validators: Validators.required }),
    email: new FormControl('facturas@kianda.co.ao', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    telefone: new FormControl('+244 923 000 111', { nonNullable: true }),
    morada: new FormControl('Rua Rainha Ginga, 27, Luanda', { nonNullable: true }),
  });

  constructor() {
    // Escape e clique fora passam por aqui (o drawer abre com disableClose)
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
      .open<boolean>(Descartar, { role: 'alertdialog', size: 'sm' })
      .closed.subscribe((discard) => discard && this.ref.close());
  }

  protected save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    setTimeout(() => this.ref.close(this.form.getRawValue().nome), 900);
  }
}

/** 2. Filtros. */
@Component({
  selector: 'doc-filtros',
  imports: [MX_DIALOG, MxButton, FormsModule, MxCheckbox, MxRadio, MxChoice, MxFieldset, MxSlider, MxFormField, MxLabel, MxHint, MxSeparator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Filtros</h2>
      <p mxDialogDescription>{{ count() }} filtros activos</p>
    </mx-dialog-header>
    <mx-dialog-content class="stack-lg">
      <fieldset mxFieldset>
        <legend>Estado da factura</legend>
        @for (e of estados; track e) {
          <label mxChoice><input type="checkbox" mxCheckbox [checked]="sel().includes(e)" (change)="toggle(e)" /> {{ e }}</label>
        }
      </fieldset>
      <hr mxSeparator />
      <fieldset mxFieldset>
        <legend>Período</legend>
        @for (p of periodos; track p) {
          <label mxChoice><input type="radio" mxRadio name="periodo" [value]="p" [(ngModel)]="periodo" /> {{ p }}</label>
        }
      </fieldset>
      <hr mxSeparator />
      <mx-form-field>
        <label mxLabel>Valor mínimo</label>
        <input type="range" mxSlider min="0" max="5000" step="250" [(ngModel)]="minimo" [attr.aria-valuetext]="minimo + ' dólares'" />
        <mx-hint>{{ minimo }} US$</mx-hint>
      </mx-form-field>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="ghost" (click)="clear()">Limpar</button>
      <button mxButton type="button" [mxDialogClose]="count()">Aplicar</button>
    </mx-dialog-footer>
  `,
})
export class Filtros {
  protected readonly estados = ['Paga', 'Pendente', 'Em atraso', 'Anulada'];
  protected readonly periodos = ['Este mês', 'Últimos 3 meses', 'Este ano'];
  protected readonly sel = signal<string[]>(['Pendente', 'Em atraso']);
  protected periodo = 'Este mês';
  protected minimo = 0;
  protected readonly count = computed(() => this.sel().length + 1);

  protected toggle(e: string): void {
    this.sel.update((s) => (s.includes(e) ? s.filter((x) => x !== e) : [...s, e]));
  }
  protected clear(): void {
    this.sel.set([]);
    this.periodo = 'Este mês';
    this.minimo = 0;
  }
}

/** 3. Navegação em ecrãs pequenos. */
@Component({
  selector: 'doc-menu-movel',
  imports: [MX_DIALOG, RouterLink, RouterLinkActive, Icon, MxAvatar, MxSeparator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Menu</h2>
    </mx-dialog-header>
    <mx-dialog-content>
      <nav aria-label="Principal">
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
export class MenuMovel {
  protected readonly ref = inject(MxDialogRef);
  protected readonly links = [
    { label: 'Início', path: '/', icon: 'grid' },
    { label: 'Componentes', path: '/pt/componentes', icon: 'box' },
    { label: 'Drawer', path: '/pt/componentes/drawer', icon: 'drawer' },
    { label: 'Templates', path: '/pt/templates', icon: 'layers' },
    { label: 'Preços', path: '/pt/precos', icon: 'tag' },
  ];
}

/** 4. Detalhe com separadores. */
@Component({
  selector: 'doc-detalhe-cliente',
  imports: [MX_DIALOG, MxButton, MxTabs, MxTab, MX_TABLE, MxBadge, MxAvatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <div class="person">
        <mx-avatar name="Banco Mutamba" size="lg" decorative />
        <div>
          <h2 mxDialogTitle>Banco Mutamba</h2>
          <p mxDialogDescription>Cliente desde 2022 · Luanda</p>
        </div>
      </div>
    </mx-dialog-header>
    <mx-dialog-content>
      <mx-tabs aria-label="Detalhe do cliente">
        <mx-tab label="Resumo">
          <dl class="detail-list">
            <div><dt>Saldo</dt><dd>4 870,50 US$</dd></div>
            <div><dt>Facturas</dt><dd>38 emitidas, 2 pendentes</dd></div>
            <div><dt>Gestor</dt><dd>Pedro Neto</dd></div>
            <div><dt>Estado</dt><dd><span mxBadge variant="warning">Pagamento pendente</span></dd></div>
          </dl>
        </mx-tab>
        <mx-tab label="Facturas">
          <div class="mx-table-container">
            <table mxTable density="compact">
              <thead><tr><th scope="col">Factura</th><th scope="col">Estado</th><th scope="col" data-align="end">Valor (US$)</th></tr></thead>
              <tbody>
                <tr><td>FT 2026/0143</td><td><span mxBadge variant="warning">Pendente</span></td><td data-align="end">4 870 500,00</td></tr>
                <tr><td>FT 2026/0118</td><td><span mxBadge variant="success">Paga</span></td><td data-align="end">2 100 000,00</td></tr>
                <tr><td>FT 2026/0097</td><td><span mxBadge variant="success">Paga</span></td><td data-align="end">980 000,00</td></tr>
              </tbody>
            </table>
          </div>
        </mx-tab>
        <mx-tab label="Notas">
          <p class="muted">Pagamentos feitos por transferência no fim do mês. Contactar a Dra. Luísa para acertos.</p>
        </mx-tab>
      </mx-tabs>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="outline" mxDialogClose>Fechar</button>
      <button mxButton type="button" [mxDialogClose]="true">Nova factura</button>
    </mx-dialog-footer>
  `,
})
export class DetalheCliente {}

/** 5. Folha de acções em baixo. */
@Component({
  selector: 'doc-accoes-folha',
  imports: [MX_DIALOG, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>FT 2026/0142</h2>
      <p mxDialogDescription>Escolhe uma acção</p>
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
export class AccoesFolha {
  protected readonly actions = [
    { label: 'Descarregar PDF', icon: 'file', danger: false },
    { label: 'Enviar por email', icon: 'message', danger: false },
    { label: 'Duplicar', icon: 'copy', danger: false },
    { label: 'Anular factura', icon: 'x', danger: true },
  ];
}

/** 6. Notificações. */
@Component({
  selector: 'doc-notificacoes',
  imports: [MX_DIALOG, MxButton, MxBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <div class="row-between">
        <h2 mxDialogTitle>Notificações</h2>
        @if (unread() > 0) {
          <span mxBadge>{{ unread() }} por ler</span>
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
              <p class="muted">{{ n.when }}@if (!n.read) { <span class="mx-visually-hidden">, por ler</span> }</p>
            </div>
          </li>
        }
      </ul>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="ghost" [disabled]="unread() === 0" (click)="markAll()">Marcar todas como lidas</button>
    </mx-dialog-footer>
  `,
})
export class Notificacoes {
  protected readonly data = inject<unknown>(MX_DIALOG_DATA, { optional: true });
  protected readonly items = signal([
    { id: 1, tag: 'Erro', variant: 'danger' as const, text: 'Falhou o envio de 3 facturas para a AGT.', when: 'Há 10 minutos', read: false },
    { id: 2, tag: 'Pago', variant: 'success' as const, text: 'Huíla Agro pagou a FT 2026/0144.', when: 'Há 1 hora', read: false },
    { id: 3, tag: 'Prazo', variant: 'warning' as const, text: 'FT 2026/0139 vence em 3 dias.', when: 'Ontem', read: true },
  ]);
  protected readonly unread = computed(() => this.items().filter((n) => !n.read).length);
  protected markAll(): void {
    this.items.update((list) => list.map((n) => ({ ...n, read: true })));
  }
}
