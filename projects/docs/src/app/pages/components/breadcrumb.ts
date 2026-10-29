import { Icon } from '../../ui/icon';
import { MX_MENU } from '@muxima-ui/core/menu';
import { MxButton } from '@muxima-ui/core/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxBreadcrumb } from '@muxima-ui/core/breadcrumb';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-breadcrumb-page',
  imports: [DOC_UI, MxBreadcrumb, RouterLink, MxButton, MX_MENU, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Breadcrumb' }]"
        title="Breadcrumb"
        lead="Mostra onde a página está na hierarquia e permite subir de nível. É uma nav com uma lista ordenada; os separadores são desenhados em CSS."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de breadcrumb">
          <nav mxBreadcrumb aria-label="Exemplo de localização">
            <ol>
              <li><a routerLink="/pt/componentes">Clientes</a></li>
              <li><a routerLink="/pt/componentes">Kianda Logística</a></li>
              <li><span aria-current="page">Facturas</span></li>
            </ol>
          </nav>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxBreadcrumb } from '@muxima-ui/core/breadcrumb';" />
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Ligação"><nav mxBreadcrumb aria-label="Ligação"><ol><li><a href="#">Clientes</a></li></ol></nav></doc-state>
          <doc-state name="Hover"><nav mxBreadcrumb aria-label="Hover"><ol><li><a href="#" data-mx-state="hover">Clientes</a></li></ol></nav></doc-state>
          <doc-state name="Foco"><nav mxBreadcrumb aria-label="Foco"><ol><li><a href="#" data-mx-state="focus">Clientes</a></li></ol></nav></doc-state>
          <doc-state name="Página actual" note="aria-current=page"><nav mxBreadcrumb aria-label="Actual"><ol><li><span aria-current="page">Facturas</span></li></ol></nav></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Com ícone de início" note="O ícone tem texto escondido: Início.">
            <nav mxBreadcrumb aria-label="Localização com ícone">
              <ol>
                <li><a routerLink="/"><doc-icon name="grid" [size]="14" /><span class="mx-visually-hidden">Início</span></a></li>
                <li><a routerLink="/pt/componentes">Clientes</a></li>
                <li><span aria-current="page">Kianda Logística</span></li>
              </ol>
            </nav>
          </doc-example>
          <doc-example title="Caminho longo, recolhido" note="Os níveis do meio ficam num menu, para caber em ecrãs estreitos.">
            <nav mxBreadcrumb aria-label="Localização recolhida">
              <ol>
                <li><a routerLink="/">Início</a></li>
                <li>
                  <button type="button" class="crumb-more" aria-label="Mostrar níveis escondidos" [mxMenuTriggerFor]="niveis">…</button>
                  <ng-template #niveis>
                    <div mxMenu>
                      <a mxMenuItem routerLink="/pt/componentes">Clientes</a>
                      <a mxMenuItem routerLink="/pt/componentes">Empresas</a>
                      <a mxMenuItem routerLink="/pt/componentes">Kianda Logística</a>
                    </div>
                  </ng-template>
                </li>
                <li><a routerLink="/pt/componentes">Facturas</a></li>
                <li><span aria-current="page">FT 2026/0142</span></li>
              </ol>
            </nav>
          </doc-example>
          <doc-example title="No cabeçalho de uma página">
            <div class="page-head-demo w-full">
              <nav mxBreadcrumb aria-label="Localização da página">
                <ol>
                  <li><a routerLink="/">Início</a></li>
                  <li><a routerLink="/pt/componentes">Facturas</a></li>
                  <li><span aria-current="page">Nova factura</span></li>
                </ol>
              </nav>
              <div class="row-between"><h3>Nova factura</h3><button mxButton type="button" size="sm">Emitir</button></div>
            </div>
          </doc-example>
          <doc-example title="Só voltar, em telemóvel" note="Em ecrãs estreitos mostra só o nível acima.">
            <nav mxBreadcrumb aria-label="Voltar">
              <ol>
                <li><a routerLink="/pt/componentes" class="crumb-back"><doc-icon name="chevronRight" [size]="14" class="flip" /> Facturas</a></li>
              </ol>
            </nav>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Passa pelas ligações; a página actual não é ligação.' }]"
          [aria]="[
            'nav com o nome Localização (muda com aria-label se houver várias na página).',
            'Lista ordenada: o leitor de ecrã diz quantos níveis há.',
            'O último nível tem aria-current=page.',
            'Os separadores são CSS e não são lidos.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>nav[mxBreadcrumb]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Tabs' }, { name: 'Pagination' }, { name: 'Separator' }]" />
      </section>
    </article>
  `,
})
export class BreadcrumbPage {
  protected readonly previewCode = `<nav mxBreadcrumb>
  <ol>
    <li><a routerLink="/clientes">Clientes</a></li>
    <li><a routerLink="/clientes/42">Kianda Logística</a></li>
    <li><span aria-current="page">Facturas</span></li>
  </ol>
</nav>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'aria-label', type: 'string', default: 'Localização', description: 'Nome da navegação.' },
    { kind: 'Token CSS', name: '--mx-muted', type: 'color', description: 'Cor das ligações.' },
    { kind: 'Token CSS', name: '--mx-stone-strong', type: 'color', description: 'Cor dos separadores.' },
  ];
}
