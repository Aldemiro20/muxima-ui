import { Icon } from '../../ui/icon';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxChoice, MxFieldset, MxFormField, MxInput, MxInputAddon, MxInputGroup, MxLabel } from '@muxima-ui/core/form-field';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MX_POPOVER } from '@muxima-ui/core/popover';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-popover-page',
  imports: [DOC_UI, MX_POPOVER, MxButton, MxFormField, MxLabel, MxInput, MxCheckbox, MxChoice, MxFieldset, FormsModule, MxInputGroup, MxInputAddon, MxAvatar, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Popover' }]"
        title="Popover"
        lead="Painel flutuante não modal junto a um botão, para filtros, detalhes ou pequenos formulários. Pode ter campos e botões, ao contrário do Tooltip."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de popover">
          <button mxButton type="button" variant="outline" [mxPopoverTrigger]="filtros">Filtros</button>
          <mx-popover #filtros aria-label="Filtros" width="280px">
            <div class="stack">
              <fieldset mxFieldset>
                <legend>Estado</legend>
                <label mxChoice><input type="checkbox" mxCheckbox checked /> Paga</label>
                <label mxChoice><input type="checkbox" mxCheckbox checked /> Pendente</label>
                <label mxChoice><input type="checkbox" mxCheckbox /> Em atraso</label>
              </fieldset>
              <div class="row-end">
                <button mxButton type="button" size="sm" variant="ghost" (click)="filtros.close()">Cancelar</button>
                <button mxButton type="button" size="sm" (click)="filtros.close()">Aplicar</button>
              </div>
            </div>
          </mx-popover>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_POPOVER } from '@muxima-ui/core/popover';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Superfície com borda, sombra e 16 px de espaço interior, a 6 px do botão.</p>
        <doc-structure [labels]="{ topLeft: 'Botão com aria-expanded', topRight: 'Sombra de sobreposição', bottomLeft: 'Espaço de 16 px', bottomRight: 'Raio de 10 px', bottom: 'role=dialog, não modal' }">
          <div class="mini-dialog"><strong>Filtros</strong><span>3 opções</span></div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Os estados vivem no botão que abre o popover.</p>
        <doc-states>
          <doc-state name="Fechado" note="aria-expanded=false"><button mxButton type="button" variant="outline" size="sm">Filtros</button></doc-state>
          <doc-state name="Hover"><button mxButton type="button" variant="outline" size="sm" data-mx-state="hover">Filtros</button></doc-state>
          <doc-state name="Foco"><button mxButton type="button" variant="outline" size="sm" data-mx-state="focus">Filtros</button></doc-state>
          <doc-state name="Aberto" note="aria-expanded=true; foco no painel."><div class="mx-popover mini-popover">Painel aberto</div></doc-state>
          <doc-state name="Desactivado"><button mxButton type="button" variant="outline" size="sm" disabled>Filtros</button></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Pequeno formulário" note="O foco vai para o primeiro campo.">
            <button mxButton type="button" variant="outline" [mxPopoverTrigger]="renomear">Renomear</button>
            <mx-popover #renomear aria-labelledby="renomear-titulo">
              <form class="stack" (submit)="$event.preventDefault(); renomear.close()">
                <p class="popover-title" id="renomear-titulo">Renomear projecto</p>
                <mx-form-field>
                  <label mxLabel>Nome</label>
                  <input mxInput name="nome" [(ngModel)]="nome" />
                </mx-form-field>
                <div class="row-end"><button mxButton type="submit" size="sm">Guardar</button></div>
              </form>
            </mx-popover>
          </doc-example>
          <doc-example title="Alinhado ao fim" note="align=&quot;end&quot; para botões encostados à direita.">
            <div class="row-end w-full">
              <button mxButton type="button" variant="outline" [mxPopoverTrigger]="info">Detalhes</button>
              <mx-popover #info align="end" aria-label="Detalhes da factura">
                <p class="popover-title">FT 2026/0142</p>
                <p class="muted">Emitida a 3 de Outubro. Vence a 2 de Novembro.</p>
              </mx-popover>
            </div>
          </doc-example>
          <doc-example title="Ajuda contextual" note="Um botão ? ao lado do label abre a explicação.">
            <mx-form-field class="w-full">
              <div class="label-row">
                <label mxLabel>Regime de IVA</label>
                <button type="button" class="help-button" aria-label="Ajuda sobre o regime de IVA" [mxPopoverTrigger]="ajuda">?</button>
              </div>
              <input mxInput value="Regime geral" />
            </mx-form-field>
            <mx-popover #ajuda aria-labelledby="ajuda-iva" width="280px">
              <p class="popover-title" id="ajuda-iva">Regime de IVA</p>
              <p class="muted">Empresas com facturação anual acima de 350 milhões de Kz estão no regime geral. As restantes podem optar pelo regime simplificado.</p>
            </mx-popover>
          </doc-example>
          <doc-example title="Partilhar ligação">
            <button mxButton type="button" variant="outline" [mxPopoverTrigger]="partilha"><doc-icon name="external" /> Partilhar</button>
            <mx-popover #partilha aria-labelledby="partilha-t" width="320px">
              <p class="popover-title" id="partilha-t">Partilhar relatório</p>
              <div class="stack">
                <div mxInputGroup>
                  <input mxInput readonly value="https://muxima.ao/r/2026-10" aria-label="Ligação do relatório" />
                  <button mxInputAddon type="button" (click)="copied.set(true)">{{ copied() ? 'Copiado' : 'Copiar' }}</button>
                </div>
                <label mxChoice><input type="checkbox" mxCheckbox checked /> Qualquer pessoa com a ligação</label>
              </div>
            </mx-popover>
          </doc-example>
          <doc-example title="Cartão de pessoa">
            <button mxButton type="button" variant="link" [mxPopoverTrigger]="pessoa">Joana Mbala</button>
            <mx-popover #pessoa aria-label="Joana Mbala" width="280px">
              <div class="person">
                <mx-avatar name="Joana Mbala" src="exemplos/pessoa-2.svg" status="online" decorative />
                <div><strong>Joana Mbala</strong><span class="muted">Directora financeira</span></div>
              </div>
              <div class="row-inline popover-actions">
                <button mxButton type="button" size="sm">Mensagem</button>
                <button mxButton type="button" size="sm" variant="outline">Perfil</button>
              </div>
            </mx-popover>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Enter Espaço', action: 'Abrem e fecham a partir do botão.' },
            { key: 'Tab', action: 'Percorre o conteúdo do painel.' },
            { key: 'Esc', action: 'Fecha e devolve o foco ao botão.' }
          ]"
          [aria]="[
            'O botão tem aria-haspopup=dialog, aria-expanded e aria-controls.',
            'O painel é role=dialog não modal, com nome por aria-label ou aria-labelledby.',
            'Clique fora fecha sem roubar o foco do que foi clicado.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Tooltip' }, { name: 'Dropdown menu' }, { name: 'Dialog' }]" />
      </section>
    </article>
  `,
})
export class PopoverPage {
  protected readonly copied = signal(false);

  protected nome = 'Portal do cliente';
  protected readonly previewCode = `<button mxButton variant="outline" [mxPopoverTrigger]="filtros">Filtros</button>
<mx-popover #filtros aria-label="Filtros">
  ... campos ...
  <button mxButton size="sm" (click)="filtros.close()">Aplicar</button>
</mx-popover>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: '[mxPopoverTrigger]', type: 'MxPopover', description: 'Botão que abre o popover indicado.' },
    { kind: 'Input', name: 'align', type: "'start' | 'center' | 'end'", default: 'start', description: 'Alinhamento com o botão.' },
    { kind: 'Input', name: 'width', type: 'string', description: 'Largura do painel (ex.: 280px).' },
    { kind: 'Input', name: 'aria-label / aria-labelledby', type: 'string', description: 'Nome do painel.' },
    { kind: 'Output', name: 'opened, closed', type: 'void' },
    { kind: 'Método', name: 'close()', type: 'void', description: 'Fecha e devolve o foco.' },
  ];
}
