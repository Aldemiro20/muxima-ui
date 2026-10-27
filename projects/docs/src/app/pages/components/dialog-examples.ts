import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MX_DIALOG_DATA } from '@muxima-ui/core/dialog';
import { MxChoice, MxChoiceDescription, MxFieldset } from '@muxima-ui/core/form-field';
import { MxRadio } from '@muxima-ui/core/radio';

/** Diálogo simples, para comparar os tamanhos. */
@Component({
  selector: 'doc-dialog-tamanho',
  imports: [MX_DIALOG, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Tamanho {{ data.size }}</h2>
      <p mxDialogDescription>{{ data.width }} de largura máxima.</p>
    </mx-dialog-header>
    <mx-dialog-content>
      <p>Usa sm para confirmações, md para formulários curtos e lg para conteúdo com tabelas ou duas colunas.</p>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" mxDialogClose>Fechar</button>
    </mx-dialog-footer>
  `,
})
export class DialogTamanho {
  protected readonly data = inject<{ size: string; width: string }>(MX_DIALOG_DATA);
}

/** Conteúdo longo: o corpo faz scroll e o rodapé fica visível. */
@Component({
  selector: 'doc-dialog-termos',
  imports: [MX_DIALOG, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Termos de serviço</h2>
      <p mxDialogDescription>Versão de 1 de Outubro de 2026</p>
    </mx-dialog-header>
    <mx-dialog-content class="dialog-scroll" tabindex="0" role="region" aria-label="Texto dos termos">
      @for (s of seccoes; track s) {
        <h3>{{ s }}</h3>
        <p>
          O serviço é prestado nos termos da legislação angolana. Os dados de facturação são guardados durante o
          período exigido por lei e podem ser exportados a qualquer momento pelo administrador da conta.
        </p>
      }
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="outline" [mxDialogClose]="false">Recusar</button>
      <button mxButton type="button" [mxDialogClose]="true">Aceitar</button>
    </mx-dialog-footer>
  `,
})
export class DialogTermos {
  protected readonly seccoes = ['1. Objecto', '2. Conta e acesso', '3. Pagamentos', '4. Dados pessoais', '5. Cancelamento', '6. Lei aplicável'];
}

/** Escolha dentro de um diálogo, devolvida ao fechar. */
@Component({
  selector: 'doc-dialog-plano',
  imports: [MX_DIALOG, MxButton, FormsModule, MxRadio, MxChoice, MxChoiceDescription, MxFieldset],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Mudar de plano</h2>
      <p mxDialogDescription>A mudança tem efeito no próximo ciclo de facturação.</p>
    </mx-dialog-header>
    <mx-dialog-content>
      <fieldset mxFieldset>
        <legend class="mx-visually-hidden">Planos</legend>
        @for (p of planos; track p.id) {
          <label mxChoice card>
            <input type="radio" mxRadio name="dialog-plano" [value]="p.id" [(ngModel)]="plano" />
            <span>{{ p.nome }}<span mxChoiceDescription>{{ p.desc }}</span></span>
          </label>
        }
      </fieldset>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="outline" mxDialogClose>Cancelar</button>
      <button mxButton type="button" [mxDialogClose]="plano">Confirmar</button>
    </mx-dialog-footer>
  `,
})
export class DialogPlano {
  protected plano = 'equipa';
  protected readonly planos = [
    { id: 'basico', nome: 'Básico', desc: 'Grátis, 1 utilizador' },
    { id: 'equipa', nome: 'Equipa', desc: '25 000 Kz/mês, até 10 utilizadores' },
    { id: 'empresa', nome: 'Empresa', desc: 'Sob consulta' },
  ];
}

/** Mensagem de sucesso depois de uma acção importante. */
@Component({
  selector: 'doc-dialog-sucesso',
  imports: [MX_DIALOG, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="dialog-success">
      <span class="success-mark" aria-hidden="true"></span>
      <h2 mxDialogTitle>Pagamento registado</h2>
      <p mxDialogDescription>A factura FT 2026/0144 foi marcada como paga e o recibo foi enviado ao cliente.</p>
      <div class="dialog-success-actions">
        <button mxButton type="button" variant="outline" mxDialogClose>Fechar</button>
        <button mxButton type="button" [mxDialogClose]="true">Ver recibo</button>
      </div>
    </div>
  `,
})
export class DialogSucesso {}
