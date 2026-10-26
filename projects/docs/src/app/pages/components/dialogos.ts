import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MX_DIALOG_DATA, MxDialog, MxDialogRef } from '@muxima-ui/core/dialog';
import { MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-confirm-delete',
  imports: [MX_DIALOG, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Eliminar projecto?</h2>
      <p mxDialogDescription>O projecto "Portal do cliente" e os seus 14 ficheiros serão eliminados. Esta acção não pode ser desfeita.</p>
    </mx-dialog-header>
    <mx-dialog-content></mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton variant="outline" mxDialogClose>Cancelar</button>
      <button mxButton variant="destructive" [mxDialogClose]="true">Eliminar projecto</button>
    </mx-dialog-footer>
  `,
})
export class ConfirmDelete {}

@Component({
  selector: 'doc-rename-dialog',
  imports: [MX_DIALOG, MxButton, MxFormField, MxLabel, MxInput, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (ngSubmit)="ref.close(name)">
      <mx-dialog-header>
        <h2 mxDialogTitle>Mudar o nome</h2>
        <p mxDialogDescription>O novo nome aparece para toda a equipa.</p>
      </mx-dialog-header>
      <mx-dialog-content>
        <mx-form-field>
          <label mxLabel>Nome do projecto</label>
          <input mxInput name="nome" [(ngModel)]="name" required />
        </mx-form-field>
      </mx-dialog-content>
      <mx-dialog-footer>
        <button mxButton variant="outline" mxDialogClose>Cancelar</button>
        <button mxButton type="submit">Guardar</button>
      </mx-dialog-footer>
    </form>
  `,
})
export class RenameDialog {
  protected readonly ref = inject<MxDialogRef<string>>(MxDialogRef);
  protected name = inject<{ name: string }>(MX_DIALOG_DATA).name;
}

@Component({
  selector: 'doc-dialogos',
  imports: [DOC_UI, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Diálogos' }]"
        title="Diálogos"
        lead="Confirmações e pequenos fluxos que exigem a atenção do utilizador. O foco fica preso no diálogo e volta ao botão que o abriu."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de diálogo">
          <button mxButton variant="destructive" type="button" (click)="confirm()">Eliminar projecto</button>
          <span class="muted" aria-live="polite">{{ result() }}</span>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxDialog, MX_DIALOG } from '@muxima-ui/core/dialog';" />
        <p>O diálogo usa o <code>&#64;angular/cdk</code> para a camada flutuante e para prender o foco.</p>
      </section>

      <section>
        <h2>Anatomia</h2>
        <p>Cabeçalho com título e descrição, conteúdo e rodapé com as acções. A acção principal fica à direita.</p>
        <doc-anatomy
          [labels]="{
            topLeft: 'Título (aria-labelledby)',
            topRight: 'Raio de 10 px',
            bottomLeft: 'Descrição (aria-describedby)',
            bottomRight: 'Acções no rodapé',
            bottom: 'Fundo escurecido; Esc e clique fora fecham'
          }"
        >
          <div class="mini-dialog" aria-hidden="true">
            <strong>Eliminar projecto?</strong>
            <span>Esta acção não pode ser desfeita.</span>
            <span class="mini-actions"><i></i><i class="dark"></i></span>
          </div>
        </doc-anatomy>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Formulário num diálogo" [note]="'Nome actual: ' + projectName()">
            <button mxButton type="button" variant="outline" (click)="rename()">Mudar o nome</button>
          </doc-example>
          <doc-example title="Confirmação obrigatória" note="Com disableClose, só os botões fecham o diálogo.">
            <button mxButton type="button" variant="outline" (click)="mandatory()">Aceitar termos</button>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab Shift+Tab', action: 'Circulam só dentro do diálogo.' },
            { key: 'Esc', action: 'Fecha o diálogo (excepto com disableClose).' },
            { key: 'Enter', action: 'Activa o botão com foco ou envia o formulário.' }
          ]"
          [aria]="[
            'role=&quot;dialog&quot; ou &quot;alertdialog&quot; e aria-modal=&quot;true&quot;.',
            'mxDialogTitle dá o nome ao diálogo; mxDialogDescription a descrição.',
            'Ao abrir, o foco vai para o primeiro elemento focável; ao fechar, volta a quem o abriu.',
            'Usa alertdialog para confirmações destrutivas.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Botões', path: '/componentes/botoes' }, { name: 'Drawer' }, { name: 'Popover' }]" />
      </section>
    </article>
  `,
})
export class DialogosPage {
  private readonly dialog = inject(MxDialog);
  protected readonly result = signal('');
  protected readonly projectName = signal('Portal do cliente');

  protected confirm(): void {
    this.dialog
      .open<boolean>(ConfirmDelete, { role: 'alertdialog', size: 'sm' })
      .closed.subscribe((ok) => this.result.set(ok ? 'Projecto eliminado.' : 'Cancelado.'));
  }

  protected rename(): void {
    this.dialog
      .open<string>(RenameDialog, { data: { name: this.projectName() } })
      .closed.subscribe((name) => name && this.projectName.set(name));
  }

  protected mandatory(): void {
    this.dialog.open(ConfirmDelete, { role: 'alertdialog', size: 'sm', disableClose: true });
  }

  protected readonly previewCode = `// confirmar-eliminacao.ts
@Component({
  imports: [MX_DIALOG, MxButton],
  template: \`
    <mx-dialog-header>
      <h2 mxDialogTitle>Eliminar projecto?</h2>
      <p mxDialogDescription>Esta acção não pode ser desfeita.</p>
    </mx-dialog-header>
    <mx-dialog-footer>
      <button mxButton variant="outline" mxDialogClose>Cancelar</button>
      <button mxButton variant="destructive" [mxDialogClose]="true">Eliminar projecto</button>
    </mx-dialog-footer>
  \`,
})
export class ConfirmarEliminacao {}

// no componente que abre
inject(MxDialog)
  .open<boolean>(ConfirmarEliminacao, { role: 'alertdialog', size: 'sm' })
  .closed.subscribe((confirmado) => { ... });`;

  protected readonly api: ApiRow[] = [
    { kind: 'Serviço', name: 'MxDialog.open(conteúdo, opções)', type: 'MxDialogRef<R>', description: 'Abre um componente ou template.' },
    { kind: 'Input', name: 'opções.size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '400, 520 ou 720 px.' },
    { kind: 'Input', name: 'opções.role', type: "'dialog' | 'alertdialog'", default: 'dialog' },
    { kind: 'Input', name: 'opções.disableClose', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'opções.data', type: 'D', description: 'Lido com inject(MX_DIALOG_DATA).' },
    { kind: 'Output', name: 'ref.closed', type: 'Observable<R | undefined>' },
    { kind: 'Directiva', name: 'mxDialogTitle, mxDialogDescription', type: 'nome e descrição acessíveis' },
    { kind: 'Directiva', name: '[mxDialogClose]', type: 'unknown', description: 'Fecha e devolve o valor.' },
  ];
}
