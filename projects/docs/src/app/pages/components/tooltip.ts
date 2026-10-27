import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxTooltip } from '@muxima-ui/core/tooltip';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';
import { Icon } from '../../ui/icon';

@Component({
  selector: 'doc-tooltip-page',
  imports: [DOC_UI, MxTooltip, MxButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Tooltip' }]"
        title="Tooltip"
        lead="Texto curto que aparece ao passar o rato ou ao focar com o teclado. Fica ligado ao elemento por aria-describedby e fecha com Escape."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de tooltip">
          <button mxButton type="button" variant="outline" icon aria-label="Copiar" mxTooltip="Copiar para a área de transferência"><doc-icon name="copy" /></button>
          <button mxButton type="button" variant="outline" mxTooltip="Envia as 9 facturas pendentes por email" mxTooltipPosition="bottom">Enviar pendentes</button>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxTooltip } from '@muxima-ui/core/tooltip';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Caixa escura com texto de 12 px, a 6 px do elemento. Muda de lado se não couber.</p>
        <doc-structure [labels]="{ topLeft: 'Texto de 12 px', topRight: 'Máx. 260 px', bottomLeft: 'Fundo Tinta', bottomRight: 'A 6 px do elemento', bottom: 'role=tooltip, ligado por aria-describedby' }">
          <span class="mx-tooltip">Copiar para a área de transferência</span>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>O tooltip só tem dois estados: escondido e visível. O que muda é o que o abre.</p>
        <doc-states>
          <doc-state name="Escondido"><button mxButton type="button" variant="outline" size="sm">Exportar</button></doc-state>
          <doc-state name="Hover" note="Aparece após 400 ms."><span class="mx-tooltip">Exporta em CSV</span></doc-state>
          <doc-state name="Foco" note="Aparece logo, com o teclado."><span class="mx-tooltip">Exporta em CSV</span></doc-state>
          <doc-state name="Desactivado" note="mxTooltipDisabled"><button mxButton type="button" variant="outline" size="sm">Exportar</button></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Posições">
            <button mxButton type="button" variant="outline" size="sm" mxTooltip="Em cima">Cima</button>
            <button mxButton type="button" variant="outline" size="sm" mxTooltip="Em baixo" mxTooltipPosition="bottom">Baixo</button>
            <button mxButton type="button" variant="outline" size="sm" mxTooltip="À esquerda" mxTooltipPosition="left">Esquerda</button>
            <button mxButton type="button" variant="outline" size="sm" mxTooltip="À direita" mxTooltipPosition="right">Direita</button>
          </doc-example>
          <doc-example title="Botões só com ícone" note="O aria-label dá o nome; o tooltip mostra-o a quem vê.">
            <button mxButton type="button" variant="ghost" icon aria-label="Editar" mxTooltip="Editar"><doc-icon name="file" /></button>
            <button mxButton type="button" variant="ghost" icon aria-label="Pesquisar" mxTooltip="Pesquisar"><doc-icon name="search" /></button>
            <button mxButton type="button" variant="ghost" icon aria-label="Definições" mxTooltip="Definições"><doc-icon name="sliders" /></button>
          </doc-example>
        </div>
        <doc-callout>Não ponhas no tooltip informação que não exista noutro lado: em ecrãs tácteis não há hover. Para conteúdo com ligações ou botões, usa um Popover.</doc-callout>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Foca o elemento e mostra o tooltip.' }, { key: 'Esc', action: 'Esconde o tooltip sem mover o foco.' }]"
          [aria]="[
            'role=tooltip, ligado ao elemento por aria-describedby enquanto está visível.',
            'Pode-se passar o rato para cima do tooltip sem ele fechar (WCAG 1.4.13).',
            'Não recebe foco nem contém elementos interactivos.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>[mxTooltip]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Popover' }, { name: 'Button' }, { name: 'Dropdown menu' }]" />
      </section>
    </article>
  `,
})
export class TooltipPage {
  protected readonly previewCode = `<button mxButton icon variant="outline" aria-label="Copiar"
        mxTooltip="Copiar para a área de transferência">
  <svg>...</svg>
</button>
<button mxButton variant="outline" mxTooltip="Envia as 9 facturas pendentes por email"
        mxTooltipPosition="bottom">Enviar pendentes</button>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'mxTooltip', type: 'string', description: 'Texto da dica.' },
    { kind: 'Input', name: 'mxTooltipPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: 'top' },
    { kind: 'Input', name: 'mxTooltipDisabled', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'mxTooltipShowDelay', type: 'number', default: '400', description: 'Espera no hover, em ms.' },
    { kind: 'Método', name: 'show(), hide()', type: 'void', description: 'Mostra ou esconde por código.' },
  ];
}
