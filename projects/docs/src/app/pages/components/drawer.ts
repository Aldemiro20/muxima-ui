import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MX_DIALOG_DATA } from '@muxima-ui/core/dialog';
import { MxDrawer, MxDrawerSide } from '@muxima-ui/core/drawer';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-detalhe-factura',
  imports: [MX_DIALOG, MxButton, MxBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>FT 2026/0142</h2>
      <p mxDialogDescription>Kianda Logística</p>
    </mx-dialog-header>
    <mx-dialog-content>
      <dl class="detail-list">
        <div><dt>Estado</dt><dd><span mxBadge variant="success">Paga</span></dd></div>
        <div><dt>Emitida</dt><dd>3 de Outubro de 2026</dd></div>
        <div><dt>Valor</dt><dd>1 250 000 Kz</dd></div>
        <div><dt>Lado</dt><dd>{{ data.side }}</dd></div>
      </dl>
    </mx-dialog-content>
    <mx-dialog-footer>
      <button mxButton type="button" variant="outline" mxDialogClose>Fechar</button>
      <button mxButton type="button" [mxDialogClose]="true">Descarregar PDF</button>
    </mx-dialog-footer>
  `,
})
class DetalheFactura {
  protected readonly data = inject<{ side: string }>(MX_DIALOG_DATA);
}

@Component({
  selector: 'doc-drawer-page',
  imports: [DOC_UI, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Drawer' }]"
        title="Drawer"
        lead="Painel modal que entra por um lado do ecrã, para detalhes e edição sem sair da página. É um Dialog: foco preso, Escape e foco devolvido."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de drawer">
          <button mxButton type="button" (click)="open('right')">Abrir detalhe</button>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxDrawer } from '@muxima-ui/core/drawer';
import { MX_DIALOG } from '@muxima-ui/core/dialog'; // título, conteúdo e rodapé" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Usa os mesmos blocos do Dialog. O conteúdo faz scroll e o rodapé fica fixo em baixo.</p>
        <doc-structure [labels]="{ topLeft: 'mxDialogTitle', topRight: 'Altura total', bottomLeft: 'mx-dialog-content com scroll', bottomRight: '320, 420 ou 560 px', bottom: 'Fundo escurecido; clique fora fecha' }">
          <div class="mini-drawer"><span></span></div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Fechado" note="O foco volta ao botão que o abriu."><button mxButton type="button" variant="outline" size="sm">Abrir</button></doc-state>
          <doc-state name="Aberto" note="Foco no primeiro elemento."><div class="mini-drawer"><span></span></div></doc-state>
          <doc-state name="Sem fecho" note="disableClose: só os botões fecham."><div class="mini-drawer"><span></span></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Lados" note="Em ecrãs pequenos, bottom é mais fácil de alcançar com o polegar.">
            <button mxButton type="button" variant="outline" (click)="open('left')">Esquerda</button>
            <button mxButton type="button" variant="outline" (click)="open('right')">Direita</button>
            <button mxButton type="button" variant="outline" (click)="open('bottom')">Em baixo</button>
          </doc-example>
          <doc-example title="Tamanhos">
            <button mxButton type="button" variant="outline" (click)="open('right', 'sm')">Pequeno</button>
            <button mxButton type="button" variant="outline" (click)="open('right', 'lg')">Grande</button>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Circula só dentro do painel.' }, { key: 'Esc', action: 'Fecha e devolve o foco.' }]"
          [aria]="[
            'role=dialog com aria-modal=true; o resto da página fica inerte.',
            'O mxDialogTitle dá o nome ao painel.',
            'Com movimento reduzido, entra sem animação.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p><code>MxDrawer.open(conteúdo, opções)</code> devolve um <code>DialogRef</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Dialog' }, { name: 'Popover' }, { name: 'Card' }]" />
      </section>
    </article>
  `,
})
export class DrawerPage {
  private readonly drawer = inject(MxDrawer);

  protected open(side: MxDrawerSide, size: 'sm' | 'md' | 'lg' = 'md'): void {
    this.drawer.open(DetalheFactura, { side, size, data: { side } });
  }

  protected readonly previewCode = `const drawer = inject(MxDrawer);
drawer.open(DetalheFactura, { side: 'right', size: 'md', data: factura });`;

  protected readonly api: ApiRow[] = [
    { kind: 'Serviço', name: 'MxDrawer.open(conteúdo, opções)', type: 'DialogRef<R>' },
    { kind: 'Input', name: 'opções.side', type: "'left' | 'right' | 'bottom'", default: 'right' },
    { kind: 'Input', name: 'opções.size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '320, 420 ou 560 px.' },
    { kind: 'Input', name: 'opções.data', type: 'D', description: 'Lido com inject(MX_DIALOG_DATA).' },
    { kind: 'Input', name: 'opções.disableClose', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'opções.ariaLabel', type: 'string', description: 'Quando não há mxDialogTitle.' },
  ];
}
