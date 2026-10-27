import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxToast } from '@muxima-ui/core/toast';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-toast-page',
  imports: [DOC_UI, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Toast' }]"
        title="Toast"
        lead="Aviso temporário no canto do ecrã depois de uma acção. O texto é lido pelo leitor de ecrã e a contagem pára enquanto o rato ou o foco estão na notificação."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de toast">
          <button mxButton type="button" (click)="success()">Enviar factura</button>
          <button mxButton type="button" variant="outline" (click)="undo()">Eliminar cliente</button>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxToast } from '@muxima-ui/core/toast';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Título, descrição opcional, uma acção opcional e o botão de fechar. A linha à esquerda indica a variante.</p>
        <doc-structure [labels]="{ topLeft: 'Título de 14 px', topRight: 'Botão fechar', bottomLeft: 'Linha de estado de 3 px', bottomRight: 'Acção opcional', bottom: 'Máximo 4 em simultâneo, no canto inferior direito' }">
          <div class="mx-toast static-toast" data-variant="success"><div class="mx-toast-text"><p class="mx-toast-title">Factura enviada</p></div></div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Quatro variantes. A acção e o botão de fechar têm hover e foco como os outros botões.</p>
        <doc-states>
          @for (v of variants; track v.name) {
            <doc-state [name]="v.name" [note]="v.note">
              <div class="mx-toast static-toast" [attr.data-variant]="v.variant">
                <div class="mx-toast-text"><p class="mx-toast-title">{{ v.title }}</p></div>
              </div>
            </doc-state>
          }
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Variantes">
            <button mxButton type="button" variant="outline" size="sm" (click)="toast.show('Alterações guardadas')">Default</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="success()">Success</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="toast.show('Faltam 3 dias para o prazo', { variant: 'warning' })">Warning</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="toast.show('Falha no envio', { variant: 'danger', description: 'Verifica a ligação e tenta de novo.' })">Danger</button>
          </doc-example>
          <doc-example title="Com acção de anular" note="Com acção, fica 10 segundos em vez de 5.">
            <button mxButton type="button" variant="outline" size="sm" (click)="undo()">Arquivar projecto</button>
          </doc-example>
        </div>
        <doc-callout>Não uses toasts para erros que impedem continuar ou para informação que a pessoa precisa de guardar: usa um Alert na página ou um Dialog.</doc-callout>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Chega à acção e ao botão fechar.' }, { key: 'Enter', action: 'Activa a acção ou fecha.' }]"
          [aria]="[
            'O texto é anunciado por uma região aria-live: educada, ou imediata em danger.',
            'A contagem pára com o rato ou o foco na notificação (WCAG 2.2.1).',
            'As notificações ficam numa região com o nome Notificações.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p><code>MxToast.show(título, opções)</code> devolve o id da notificação.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Alert' }, { name: 'Dialog' }, { name: 'Progress' }]" />
      </section>
    </article>
  `,
})
export class ToastPage {
  protected readonly toast = inject(MxToast);
  protected readonly variants = [
    { name: 'Default', variant: null, title: 'Guardado', note: '' },
    { name: 'Success', variant: 'success', title: 'Factura enviada', note: '' },
    { name: 'Warning', variant: 'warning', title: 'Faltam 3 dias', note: '' },
    { name: 'Danger', variant: 'danger', title: 'Falha no envio', note: 'Anunciado de imediato.' },
  ];

  protected success(): void {
    this.toast.show('Factura enviada', { variant: 'success', description: 'FT 2026/0142 para Kianda Logística.' });
  }

  protected undo(): void {
    this.toast.show('Cliente eliminado', {
      action: { label: 'Anular', run: () => this.toast.show('Cliente reposto', { variant: 'success' }) },
    });
  }

  protected readonly previewCode = `const toast = inject(MxToast);

toast.show('Factura enviada', {
  variant: 'success',
  description: 'FT 2026/0142 para Kianda Logística.',
});

toast.show('Cliente eliminado', {
  action: { label: 'Anular', run: () => repor() },
});`;

  protected readonly api: ApiRow[] = [
    { kind: 'Serviço', name: 'MxToast.show(título, opções)', type: 'number', description: 'Mostra e devolve o id.' },
    { kind: 'Serviço', name: 'MxToast.dismiss(id)', type: 'void' },
    { kind: 'Input', name: 'opções.variant', type: "'default' | 'success' | 'warning' | 'danger'", default: 'default' },
    { kind: 'Input', name: 'opções.description', type: 'string' },
    { kind: 'Input', name: 'opções.duration', type: 'number', default: '5000 (10000 com acção)', description: '0 = não desaparece.' },
    { kind: 'Input', name: 'opções.action', type: '{ label, run }', description: 'Botão de acção.' },
  ];
}
