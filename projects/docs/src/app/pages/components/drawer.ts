import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MX_DIALOG_DATA } from '@muxima-ui/core/dialog';
import { MxDrawer, MxDrawerSide } from '@muxima-ui/core/drawer';
import { MxToast } from '@muxima-ui/core/toast';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';
import { Icon } from '../../ui/icon';
import { AccoesFolha, DetalheCliente, EditarCliente, Filtros, MenuMovel, Notificacoes } from './drawer-examples';

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
        <div><dt>Valor</dt><dd>1 250 US$</dd></div>
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
  imports: [DOC_UI, MxButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Drawer' }]"
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
        <p>Casos reais. Cada botão abre um drawer diferente; experimenta também com o teclado.</p>
        <div class="grid-2">
          <doc-example title="Editar com confirmação" note="Abre com disableClose: com alterações por guardar, Escape, clique fora e Cancelar pedem confirmação.">
            <button mxButton type="button" (click)="editar()">Editar cliente</button>
          </doc-example>
          <doc-example title="Filtros" note="Entra pela esquerda; Aplicar devolve o resultado a quem abriu.">
            <button mxButton type="button" variant="outline" (click)="filtros()"><doc-icon name="sliders" /> Filtros</button>
          </doc-example>
          <doc-example title="Navegação em telemóvel" note="Menu da aplicação em ecrãs estreitos; fecha ao escolher uma página.">
            <button mxButton type="button" variant="outline" icon aria-label="Abrir menu" (click)="menu()"><doc-icon name="menu" /></button>
          </doc-example>
          <doc-example title="Detalhe com separadores" note="size lg: espaço para uma tabela dentro do painel.">
            <button mxButton type="button" variant="outline" (click)="detalhe()">Ver Banco Mutamba</button>
          </doc-example>
          <doc-example title="Folha de acções" note="side bottom: acções à mão do polegar em telemóvel.">
            <button mxButton type="button" variant="outline" (click)="folha()">Acções da factura</button>
          </doc-example>
          <doc-example title="Notificações" note="size sm, à direita: lista curta com estado lido e por ler.">
            <button mxButton type="button" variant="outline" (click)="notificacoes()"><doc-icon name="bell" /> Notificações</button>
          </doc-example>
          <doc-example title="Lados">
            <button mxButton type="button" variant="outline" size="sm" (click)="open('left')">Esquerda</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="open('right')">Direita</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="open('bottom')">Em baixo</button>
          </doc-example>
          <doc-example title="Tamanhos" note="sm 320 px, md 420 px, lg 560 px.">
            <button mxButton type="button" variant="outline" size="sm" (click)="open('right', 'sm')">Pequeno</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="open('right', 'md')">Médio</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="open('right', 'lg')">Grande</button>
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

  private readonly toast = inject(MxToast);

  protected open(side: MxDrawerSide, size: 'sm' | 'md' | 'lg' = 'md'): void {
    this.drawer.open(DetalheFactura, { side, size, data: { side } });
  }

  protected editar(): void {
    this.drawer.open<string>(EditarCliente, { disableClose: true }).closed.subscribe((nome) => {
      if (nome) this.toast.success('Cliente guardado', { description: nome });
    });
  }
  protected filtros(): void {
    this.drawer.open<number>(Filtros, { side: 'left', size: 'sm' }).closed.subscribe((n) => {
      if (n != null) this.toast.info(`${n} filtros aplicados`);
    });
  }
  protected menu(): void {
    this.drawer.open(MenuMovel, { side: 'left', size: 'sm' });
  }
  protected detalhe(): void {
    this.drawer.open<boolean>(DetalheCliente, { size: 'lg' }).closed.subscribe((nova) => {
      if (nova) this.toast.show('Nova factura para Banco Mutamba');
    });
  }
  protected folha(): void {
    this.drawer.open<string>(AccoesFolha, { side: 'bottom', size: 'sm' }).closed.subscribe((a) => {
      if (a === 'Anular factura') this.toast.error('Factura FT 2026/0142 anulada');
      else if (a) this.toast.success(a);
    });
  }
  protected notificacoes(): void {
    this.drawer.open(Notificacoes, { size: 'sm' });
  }

  protected readonly previewCode = `const drawer = inject(MxDrawer);
drawer.open(DetalheFactura, { side: 'right', size: 'md', data: factura });`;

  protected readonly api: ApiRow[] = [
    { kind: 'Serviço', name: 'MxDrawer.open(conteúdo, opções)', type: 'DialogRef<R>' },
    { kind: 'Input', name: 'opções.side', type: "'left' | 'right' | 'bottom'", default: 'right', description: 'bottom: até 640 px de largura, centrado.' },
    { kind: 'Input', name: 'opções.size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '320, 420 ou 560 px.' },
    { kind: 'Input', name: 'opções.data', type: 'D', description: 'Lido com inject(MX_DIALOG_DATA).' },
    { kind: 'Input', name: 'opções.disableClose', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'opções.ariaLabel', type: 'string', description: 'Quando não há mxDialogTitle.' },
  ];
}
