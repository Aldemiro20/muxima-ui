import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxBadge, MxBadgeVariant } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxInput, mxNormalize } from '@muxima-ui/core/form-field';
import { MX_MENU } from '@muxima-ui/core/menu';
import { MxPagination } from '@muxima-ui/core/pagination';
import { MxOption, MxSelect } from '@muxima-ui/core/select';
import { MxSeparator } from '@muxima-ui/core/separator';
import { MxSkeleton } from '@muxima-ui/core/skeleton';
import { MX_TABLE, MxSortState, mxSortData } from '@muxima-ui/core/table';
import { MxToast } from '@muxima-ui/core/toast';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';
import { Icon } from '../../ui/icon';

interface Factura {
  numero: string;
  cliente: string;
  estado: 'Paga' | 'Pendente' | 'Em atraso';
  valor: number;
}

const CLIENTES = ['Kianda Logística', 'Banco Mutamba', 'Huíla Agro', 'Energia do Cuanza', 'Atlântico Seguros', 'Lobito Portos', 'Namibe Pescas', 'Uíge Café'];
const ESTADOS: Factura['estado'][] = ['Paga', 'Pendente', 'Em atraso', 'Paga', 'Paga', 'Pendente'];
const MUITAS: (Factura & { data: string })[] = Array.from({ length: 23 }, (_, i) => ({
  numero: `FT 2026/${String(120 + i).padStart(4, '0')}`,
  cliente: CLIENTES[(i * 3) % CLIENTES.length],
  estado: ESTADOS[i % ESTADOS.length],
  valor: 150 + ((i * 7919) % 50) * 98.5,
  data: `${String((i % 28) + 1).padStart(2, '0')}/10/2026`,
}));

const FACTURAS: Factura[] = [
  { numero: 'FT 2026/0142', cliente: 'Kianda Logística', estado: 'Paga', valor: 1250000 },
  { numero: 'FT 2026/0143', cliente: 'Banco Mutamba', estado: 'Pendente', valor: 4870500 },
  { numero: 'FT 2026/0144', cliente: 'Huíla Agro', estado: 'Em atraso', valor: 312000 },
  { numero: 'FT 2026/0145', cliente: 'Energia do Cuanza', estado: 'Paga', valor: 9200000 },
  { numero: 'FT 2026/0146', cliente: 'Atlântico Seguros', estado: 'Pendente', valor: 675250 },
];

@Component({
  selector: 'doc-table-page',
  imports: [DOC_UI, MX_TABLE, MxBadge, MxButton, MxCheckbox, MxInput, MxSelect, MxOption, MxPagination, MX_MENU, MxSeparator, MxSkeleton, MxAvatar, Icon, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Table' }]"
        title="Table"
        lead="Dados tabulares sobre o table nativo, com números alinhados, ordenação acessível e duas densidades."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de tabela" align="start">
          <div class="mx-table-container w-full">
            <table mxTable [(sort)]="sort">
              <caption>Facturas emitidas em Outubro de 2026 (dados de exemplo).</caption>
              <thead>
                <tr>
                  <th mxSortHeader="numero" scope="col">Factura</th>
                  <th mxSortHeader="cliente" scope="col">Cliente</th>
                  <th mxSortHeader="estado" scope="col">Estado</th>
                  <th mxSortHeader="valor" scope="col" data-align="end">Valor (US$)</th>
                </tr>
              </thead>
              <tbody>
                @for (f of rows(); track f.numero) {
                  <tr>
                    <td>{{ f.numero }}</td>
                    <td>{{ f.cliente }}</td>
                    <td><span mxBadge [variant]="badge(f.estado)">{{ f.estado }}</span></td>
                    <td data-align="end">{{ fmt(f.valor) }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_TABLE, mxSortData } from '@muxima-ui/core/table';" />
        <doc-callout
          >Table é HTML simples com estilo: tu escreves as linhas e as células. Serve quando o
          utilizador só lê os dados. Se precisa de trabalhar com eles (filtrar, seleccionar, ajustar
          colunas, percorrer milhares de linhas), usa a
          <a routerLink="/pt/componentes/data-grid">Data grid</a>.</doc-callout
        >
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Cabeçalho em fundo subtil, linhas de 44 px e números tabulares alinhados à direita.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Cabeçalho ordenável',
            topRight: 'aria-sort',
            bottomLeft: 'Linhas de 44 px',
            bottomRight: 'Números à direita',
            bottom: 'Contentor com borda de 1 px e raio de 10 px'
          }"
        >
          <div class="mini-table" aria-hidden="true"><span></span><span></span><span></span></div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Os estados da tabela vivem nas linhas e no cabeçalho. Usa a célula mx-table-empty quando não houver dados.</p>
        <doc-states>
          <doc-state name="Normal"><div class="mx-table-container"><table mxTable density="compact"><thead><tr><th scope="col">Cliente</th></tr></thead><tbody><tr><td>Huíla Agro</td></tr></tbody></table></div></doc-state>
          <doc-state name="Hover" note="Fundo suave na linha."><div class="mx-table-container"><table mxTable density="compact"><thead><tr><th scope="col">Cliente</th></tr></thead><tbody><tr data-mx-state="hover"><td>Huíla Agro</td></tr></tbody></table></div></doc-state>
          <doc-state name="Seleccionada" note="aria-selected=&quot;true&quot;"><div class="mx-table-container"><table mxTable density="compact"><thead><tr><th scope="col">Cliente</th></tr></thead><tbody><tr aria-selected="true"><td>Huíla Agro</td></tr></tbody></table></div></doc-state>
          <doc-state name="Ordenada" note="aria-sort e ícone Kwanza."><div class="mx-table-container"><table mxTable density="compact"><thead><tr> <th scope="col" aria-sort="ascending"><span class="mx-sort-button">Cliente <svg class="mx-sort-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 12V4M5 7l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span></th></tr></thead><tbody><tr><td>Huíla Agro</td></tr></tbody></table></div></doc-state>
          <doc-state name="A carregar" note="aria-busy=&quot;true&quot; no table."><div class="mx-table-container"><table mxTable density="compact" aria-busy="true"><thead><tr><th scope="col">Cliente</th></tr></thead><tbody><tr><td>Huíla Agro</td></tr></tbody></table></div></doc-state>
          <doc-state name="Vazio" note="Célula mx-table-empty."><div class="mx-table-container"><table mxTable density="compact"><thead><tr><th scope="col">Cliente</th></tr></thead><tbody><tr><td class="mx-table-empty">Sem resultados</td></tr></tbody></table></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Paginação</h2>
        <p>A tabela não pagina sozinha: corta as linhas com <code>slice</code> e junta o componente Pagination no rodapé. Escolhe a variante pelo espaço e pelo tipo de navegação.</p>
        <div class="stack-lg">
          <doc-example title="Numerada, com intervalo" note="variant default + showRange. A escolha habitual em listas de gestão.">
            <div class="mx-table-container w-full">
              <table mxTable density="compact">
                  <thead><tr><th scope="col">Factura</th><th scope="col">Cliente</th><th scope="col">Estado</th><th scope="col" data-align="end">Valor (US$)</th></tr></thead>
                  <tbody>
                    @for (f of pageOf(p1(), 5); track f.numero) {
                      <tr><td>{{ f.numero }}</td><td>{{ f.cliente }}</td><td><span mxBadge [variant]="badge(f.estado)">{{ f.estado }}</span></td><td data-align="end">{{ fmt(f.valor) }}</td></tr>
                    }
                  </tbody>
                </table>
              <div class="mx-table-footer">
                <mx-pagination [(page)]="p1" [total]="lista.length" [pageSize]="5" showRange aria-label="Páginas, numerada" />
              </div>
            </div>
          </doc-example>

          <doc-example title="Linhas por página" note="pageSizeOptions deixa escolher quantas linhas ver; ao mudar, o primeiro item visível mantém-se.">
            <div class="mx-table-container w-full">
              <table mxTable density="compact">
                  <thead><tr><th scope="col">Factura</th><th scope="col">Cliente</th><th scope="col">Estado</th><th scope="col" data-align="end">Valor (US$)</th></tr></thead>
                  <tbody>
                    @for (f of pageOf(p2(), size2()); track f.numero) {
                      <tr><td>{{ f.numero }}</td><td>{{ f.cliente }}</td><td><span mxBadge [variant]="badge(f.estado)">{{ f.estado }}</span></td><td data-align="end">{{ fmt(f.valor) }}</td></tr>
                    }
                  </tbody>
                </table>
              <div class="mx-table-footer">
                <mx-pagination [(page)]="p2" [(pageSize)]="size2" [pageSizeOptions]="[5, 10, 20]" showRange [total]="lista.length" aria-label="Páginas, com linhas por página" />
              </div>
            </div>
          </doc-example>

          <div class="grid-2">
            <doc-example title="Simples" note="variant simple: Anterior, Página X de Y, Seguinte. Bom para telemóvel.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact">
                  <thead><tr><th scope="col">Factura</th><th scope="col">Cliente</th><th scope="col">Estado</th><th scope="col" data-align="end">Valor (US$)</th></tr></thead>
                  <tbody>
                    @for (f of pageOf(p3(), 4); track f.numero) {
                      <tr><td>{{ f.numero }}</td><td>{{ f.cliente }}</td><td><span mxBadge [variant]="badge(f.estado)">{{ f.estado }}</span></td><td data-align="end">{{ fmt(f.valor) }}</td></tr>
                    }
                  </tbody>
                </table>
                <div class="mx-table-footer footer-center">
                  <mx-pagination variant="simple" [(page)]="p3" [total]="lista.length" [pageSize]="4" aria-label="Páginas, simples" />
                </div>
              </div>
            </doc-example>

            <doc-example title="Compacta, na barra" note="variant compact: só ícones, ao lado da pesquisa ou do título.">
              <div class="mx-table-container w-full">
                <div class="mx-table-toolbar">
                  <strong>Facturas</strong>
                  <span class="grow"></span>
                  <mx-pagination variant="compact" [(page)]="p4" [total]="lista.length" [pageSize]="4" aria-label="Páginas, compacta" />
                </div>
                <table mxTable density="compact">
                  <thead><tr><th scope="col">Factura</th><th scope="col">Cliente</th><th scope="col">Estado</th><th scope="col" data-align="end">Valor (US$)</th></tr></thead>
                  <tbody>
                    @for (f of pageOf(p4(), 4); track f.numero) {
                      <tr><td>{{ f.numero }}</td><td>{{ f.cliente }}</td><td><span mxBadge [variant]="badge(f.estado)">{{ f.estado }}</span></td><td data-align="end">{{ fmt(f.valor) }}</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </doc-example>

            <doc-example title="Mostrar mais" note="Sem páginas: acrescenta linhas ao fim. O foco fica no botão e a contagem é anunciada.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact">
                  <thead><tr><th scope="col">Factura</th><th scope="col">Cliente</th><th scope="col">Estado</th><th scope="col" data-align="end">Valor (US$)</th></tr></thead>
                  <tbody>
                    @for (f of lista.slice(0, shown()); track f.numero) {
                      <tr><td>{{ f.numero }}</td><td>{{ f.cliente }}</td><td><span mxBadge [variant]="badge(f.estado)">{{ f.estado }}</span></td><td data-align="end">{{ fmt(f.valor) }}</td></tr>
                    }
                  </tbody>
                </table>
                <div class="mx-table-footer">
                  <span aria-live="polite">{{ shown() }} de {{ lista.length }} facturas</span>
                  @if (shown() < lista.length) {
                    <button mxButton type="button" size="sm" variant="outline" (click)="showMore()">Mostrar mais {{ nextBatch() }}</button>
                  }
                </div>
              </div>
            </doc-example>

            <doc-example title="Cabeçalho fixo com paginação" note="stickyHeader + 10 linhas por página: o cabeçalho fica visível dentro da página.">
              <div class="mx-table-container w-full" style="max-height: 260px" tabindex="0" role="region" aria-label="Facturas com cabeçalho fixo">
                <table mxTable density="compact" stickyHeader>
                  <thead><tr><th scope="col">Factura</th><th scope="col">Cliente</th><th scope="col" data-align="end">Valor (US$)</th></tr></thead>
                  <tbody>
                    @for (f of pageOf(p6(), 10); track f.numero) {
                      <tr><td>{{ f.numero }}</td><td>{{ f.cliente }}</td><td data-align="end">{{ fmt(f.valor) }}</td></tr>
                    }
                  </tbody>
                </table>
              </div>
              <div class="footer-plain">
                <mx-pagination [(page)]="p6" [total]="lista.length" [pageSize]="10" showRange aria-label="Páginas, cabeçalho fixo" />
              </div>
            </doc-example>
          </div>
        </div>
      </section>

      <section>
        <h2>Exemplos</h2>
        <p>Casos reais de aplicações de gestão. Todos usam o table nativo com mxTable e outros componentes da Muxima.</p>
        <div class="stack-lg">
          <doc-example title="Selecção de linhas e acções em lote" note="A caixa do cabeçalho fica no estado intermédio quando só parte está seleccionada; a barra mostra as acções em lote.">
            <div class="mx-table-container w-full">
              @if (selectedCount() > 0) {
                <div class="mx-table-toolbar" data-selection>
                  <strong>{{ selectedCount() }} {{ selectedCount() === 1 ? 'seleccionada' : 'seleccionadas' }}</strong>
                  <span class="grow"></span>
                  <button mxButton type="button" size="sm" variant="outline" (click)="toast.success(selectedCount() + ' facturas exportadas')">Exportar</button>
                  <button mxButton type="button" size="sm" variant="destructive" (click)="removeSelected()">Eliminar</button>
                </div>
              } @else {
                <div class="mx-table-toolbar"><span class="muted">Selecciona facturas para agir em lote.</span></div>
              }
              <table mxTable>
                <caption class="mx-visually-hidden">Facturas, com selecção</caption>
                <thead>
                  <tr>
                    <th scope="col" class="mx-table-check">
                      <input type="checkbox" mxCheckbox aria-label="Seleccionar todas" [checked]="allSelected()" [indeterminate]="someSelected()" (change)="toggleAll()" />
                    </th>
                    <th scope="col">Factura</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Estado</th>
                    <th scope="col" data-align="end">Valor (US$)</th>
                  </tr>
                </thead>
                <tbody>
                  @for (f of selectable(); track f.numero) {
                    <tr [attr.aria-selected]="selected().has(f.numero)">
                      <td class="mx-table-check">
                        <input type="checkbox" mxCheckbox [attr.aria-label]="'Seleccionar ' + f.numero" [checked]="selected().has(f.numero)" (change)="toggle(f.numero)" />
                      </td>
                      <td>{{ f.numero }}</td>
                      <td>{{ f.cliente }}</td>
                      <td><span mxBadge [variant]="badge(f.estado)">{{ f.estado }}</span></td>
                      <td data-align="end">{{ fmt(f.valor) }}</td>
                    </tr>
                  } @empty {
                    <tr><td class="mx-table-empty" colspan="5">Não há facturas. <button mxButton type="button" variant="link" size="sm" (click)="restore()">Repor exemplo</button></td></tr>
                  }
                </tbody>
              </table>
            </div>
          </doc-example>

          <doc-example title="Pesquisa, filtro e paginação" note="A pesquisa ignora acentos. Sem resultados, a tabela mostra o estado vazio com uma saída.">
            <div class="mx-table-container w-full">
              <div class="mx-table-toolbar">
                <input mxInput size="sm" type="search" class="w-240" placeholder="Pesquisar cliente ou factura" aria-label="Pesquisar facturas" [value]="query()" (input)="onQuery($event)" />
                <mx-select size="sm" class="w-180" aria-label="Filtrar por estado" [value]="estado()" (valueChange)="onEstado($event)">
                  <mx-option value="">Todos os estados</mx-option>
                  <mx-option value="Paga">Paga</mx-option>
                  <mx-option value="Pendente">Pendente</mx-option>
                  <mx-option value="Em atraso">Em atraso</mx-option>
                </mx-select>
              </div>
              <table mxTable [(sort)]="sort2">
                <caption class="mx-visually-hidden">Facturas filtradas</caption>
                <thead>
                  <tr>
                    <th mxSortHeader="numero" scope="col">Factura</th>
                    <th mxSortHeader="cliente" scope="col">Cliente</th>
                    <th mxSortHeader="data" scope="col">Emitida</th>
                    <th scope="col">Estado</th>
                    <th mxSortHeader="valor" scope="col" data-align="end">Valor (US$)</th>
                  </tr>
                </thead>
                <tbody>
                  @for (f of pageRows(); track f.numero) {
                    <tr>
                      <td>{{ f.numero }}</td>
                      <td>{{ f.cliente }}</td>
                      <td>{{ f.data }}</td>
                      <td><span mxBadge [variant]="badge(f.estado)">{{ f.estado }}</span></td>
                      <td data-align="end">{{ fmt(f.valor) }}</td>
                    </tr>
                  } @empty {
                    <tr>
                      <td class="mx-table-empty" colspan="5">
                        Nenhuma factura corresponde a "{{ query() }}".
                        <button mxButton type="button" variant="link" size="sm" (click)="resetFilters()">Limpar filtros</button>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
              <div class="mx-table-footer">
                <span aria-live="polite">{{ filtered().length }} facturas</span>
                @if (filtered().length > pageSize) {
                  <mx-pagination [(page)]="page" [total]="filtered().length" [pageSize]="pageSize" aria-label="Páginas de facturas" />
                }
              </div>
            </div>
          </doc-example>

          <div class="grid-2">
            <doc-example title="Acções por linha" note="Um menu por linha; o botão diz a que linha pertence.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact">
                  <thead><tr><th scope="col">Utilizador</th><th scope="col">Função</th><th scope="col" class="mx-table-actions"><span class="mx-visually-hidden">Acções</span></th></tr></thead>
                  <tbody>
                    @for (u of users; track u.nome) {
                      <tr>
                        <td>
                          <div class="person person-sm"><mx-avatar [name]="u.nome" size="sm" decorative /><span>{{ u.nome }}</span></div>
                        </td>
                        <td><span mxBadge variant="secondary">{{ u.funcao }}</span></td>
                        <td class="mx-table-actions">
                          <button mxButton type="button" variant="ghost" size="sm" icon [attr.aria-label]="'Acções para ' + u.nome" [mxMenuTriggerFor]="rowMenu" [mxMenuTriggerData]="{ $implicit: u.nome }">
                            <doc-icon name="menu" />
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
              <ng-template #rowMenu let-nome>
                <div mxMenu>
                  <button mxMenuItem (mxMenuItemTriggered)="toast.show('Editar ' + nome)">Editar</button>
                  <button mxMenuItem (mxMenuItemTriggered)="toast.show('Convite reenviado a ' + nome)">Reenviar convite</button>
                  <hr mxSeparator />
                  <button mxMenuItem variant="destructive" (mxMenuItemTriggered)="toast.error(nome + ' removido da equipa')">Remover</button>
                </div>
              </ng-template>
            </doc-example>

            <doc-example title="Totais" note="tfoot para a soma; números tabulares alinhados à direita.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact">
                  <thead><tr><th scope="col">Província</th><th scope="col" data-align="end">Clientes</th><th scope="col" data-align="end">Receita (US$)</th></tr></thead>
                  <tbody>
                    @for (r of provincias; track r.nome) {
                      <tr><td>{{ r.nome }}</td><td data-align="end">{{ r.clientes }}</td><td data-align="end">{{ fmt(r.receita) }}</td></tr>
                    }
                  </tbody>
                  <tfoot>
                    <tr><th scope="row">Total</th><td data-align="end">{{ totalClientes }}</td><td data-align="end">{{ fmt(totalReceita) }}</td></tr>
                  </tfoot>
                </table>
              </div>
            </doc-example>

            <doc-example title="A carregar" note="aria-busy na tabela e linhas Skeleton com a forma das colunas.">
              <div class="stack w-full">
                <div><button mxButton type="button" variant="outline" size="sm" (click)="reload()" [loading]="loading()">Recarregar</button></div>
                <div class="mx-table-container">
                  <table mxTable density="compact" [attr.aria-busy]="loading() || null">
                    <thead><tr><th scope="col">Cliente</th><th scope="col" data-align="end">Saldo (US$)</th></tr></thead>
                    <tbody>
                      @if (loading()) {
                        @for (i of [1, 2, 3]; track i) {
                          <tr><td><div mxSkeleton shape="text" class="w-60"></div></td><td data-align="end"><div mxSkeleton shape="text" class="w-60 ml-auto"></div></td></tr>
                        }
                      } @else {
                        <tr><td>Kianda Logística</td><td data-align="end">{{ fmt(250) }}</td></tr>
                        <tr><td>Banco Mutamba</td><td data-align="end">{{ fmt(1870.5) }}</td></tr>
                        <tr><td>Huíla Agro</td><td data-align="end">{{ fmt(0) }}</td></tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </doc-example>

            <doc-example title="Cabeçalho fixo" note="stickyHeader e uma altura máxima no contentor: o cabeçalho fica visível ao fazer scroll.">
              <div class="mx-table-container w-full" style="max-height: 236px" tabindex="0" role="region" aria-label="Movimentos, com scroll">
                <table mxTable density="compact" stickyHeader>
                  <thead><tr><th scope="col">Data</th><th scope="col">Movimento</th><th scope="col" data-align="end">Valor (US$)</th></tr></thead>
                  <tbody>
                    @for (m of movimentos; track m.id) {
                      <tr><td>{{ m.data }}</td><td>{{ m.desc }}</td><td data-align="end">{{ fmt(m.valor) }}</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </doc-example>

            <doc-example title="Variante striped" note="Linhas alternadas, para tabelas largas.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact" variant="striped">
                  <thead><tr><th scope="col">Produto</th><th scope="col" data-align="end">Stock</th></tr></thead>
                  <tbody>
                    @for (p of produtos; track p.nome) {
                      <tr><td>{{ p.nome }}</td><td data-align="end">{{ p.stock }}</td></tr>
                    }
                  </tbody>
                </table>
              </div>
            </doc-example>

            <doc-example title="Variante bordered" note="Linhas entre colunas, para grelhas de números.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact" variant="bordered">
                  <thead><tr><th scope="col">Trimestre</th><th scope="col" data-align="end">2025</th><th scope="col" data-align="end">2026</th></tr></thead>
                  <tbody>
                    <tr><th scope="row">T1</th><td data-align="end">12,4 M</td><td data-align="end">15,1 M</td></tr>
                    <tr><th scope="row">T2</th><td data-align="end">13,0 M</td><td data-align="end">16,8 M</td></tr>
                    <tr><th scope="row">T3</th><td data-align="end">14,2 M</td><td data-align="end">18,4 M</td></tr>
                  </tbody>
                </table>
              </div>
            </doc-example>

            <doc-example title="Densidade compacta" note="36 px por linha, para ecrãs com muitos dados.">
              <div class="mx-table-container w-full">
                <table mxTable density="compact">
                  <thead><tr><th scope="col">Província</th><th scope="col" data-align="end">Clientes</th></tr></thead>
                  <tbody>
                    <tr><td>Luanda</td><td data-align="end">1 284</td></tr>
                    <tr><td>Benguela</td><td data-align="end">312</td></tr>
                    <tr><td>Huíla</td><td data-align="end">198</td></tr>
                  </tbody>
                </table>
              </div>
            </doc-example>

            <doc-example title="Muitas colunas" note="O contentor faz scroll horizontal em ecrãs estreitos; a tabela não se deforma.">
              <div class="mx-table-container w-full" tabindex="0" role="region" aria-label="Contactos, com scroll horizontal">
                <table mxTable density="compact" class="min-w-640 nowrap">
                  <thead><tr><th scope="col">Nome</th><th scope="col">Empresa</th><th scope="col">Email</th><th scope="col">Telefone</th><th scope="col">Província</th></tr></thead>
                  <tbody>
                    <tr><td>Ana Kiala</td><td>Kianda Logística</td><td>ana&#64;kianda.co.ao</td><td>+244 923 000 111</td><td>Luanda</td></tr>
                    <tr><td>Pedro Neto</td><td>Huíla Agro</td><td>pedro&#64;huila-agro.ao</td><td>+244 924 000 222</td><td>Huíla</td></tr>
                  </tbody>
                </table>
              </div>
            </doc-example>
          </div>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Passa pelos botões de ordenação do cabeçalho.' },
            { key: 'Enter Espaço', action: 'Alternam: ascendente, descendente, sem ordem.' }
          ]"
          [aria]="[
            'É um table HTML: linhas, colunas e cabeçalhos são anunciados sem configuração.',
            'Usa scope=&quot;col&quot; nos cabeçalhos e um caption para descrever a tabela.',
            'aria-sort indica a coluna ordenada e o sentido.',
            'A ordenação de texto respeita acentos portugueses.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Data grid' }, { name: 'Pagination' }, { name: 'Select', path: '/pt/componentes/select' }]" />
      </section>
    </article>
  `,
})
export class TablePage {
  protected readonly toast = inject(MxToast);

  protected badge(estado: Factura['estado']): MxBadgeVariant {
    return estado === 'Paga' ? 'success' : estado === 'Pendente' ? 'warning' : 'danger';
  }

  // Selecção
  protected readonly selectable = signal<Factura[]>([...FACTURAS]);
  protected readonly selected = signal(new Set<string>(['FT 2026/0143']));
  protected readonly selectedCount = computed(() => this.selected().size);
  protected readonly allSelected = computed(() => this.selectable().length > 0 && this.selected().size === this.selectable().length);
  protected readonly someSelected = computed(() => this.selected().size > 0 && !this.allSelected());
  protected toggle(numero: string): void {
    const next = new Set(this.selected());
    if (next.has(numero)) next.delete(numero);
    else next.add(numero);
    this.selected.set(next);
  }
  protected toggleAll(): void {
    this.selected.set(this.allSelected() ? new Set() : new Set(this.selectable().map((f) => f.numero)));
  }
  protected removeSelected(): void {
    const n = this.selected().size;
    this.selectable.update((rows) => rows.filter((r) => !this.selected().has(r.numero)));
    this.selected.set(new Set());
    this.toast.error(`${n} ${n === 1 ? 'factura eliminada' : 'facturas eliminadas'}`, { action: { label: 'Anular', run: () => this.restore() } });
  }
  protected restore(): void {
    this.selectable.set([...FACTURAS]);
  }

  // Pesquisa, filtro e paginação
  protected readonly pageSize = 6;
  protected readonly query = signal('');
  protected readonly estado = signal<string>('');
  protected readonly page = signal(1);
  protected readonly sort2 = signal<MxSortState>({ active: 'numero', direction: 'desc' });
  protected readonly filtered = computed(() => {
    const q = mxNormalize(this.query().trim());
    const e = this.estado();
    const rows = MUITAS.filter((f) => (!q || mxNormalize(`${f.cliente} ${f.numero}`).includes(q)) && (!e || f.estado === e));
    return mxSortData(rows, this.sort2(), (row, key) => (key === 'data' ? row.data.split('/').reverse().join('') : (row as unknown as Record<string, unknown>)[key]), 'pt');
  });
  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });
  protected onQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.page.set(1);
  }
  protected onEstado(value: unknown): void {
    this.estado.set((value as string) ?? '');
    this.page.set(1);
  }
  protected resetFilters(): void {
    this.query.set('');
    this.estado.set('');
    this.page.set(1);
  }

  // Variantes de paginação
  protected readonly lista = MUITAS;
  protected readonly p1 = signal(1);
  protected readonly p2 = signal(1);
  protected readonly size2 = signal(5);
  protected readonly p3 = signal(1);
  protected readonly p4 = signal(1);
  protected readonly p6 = signal(1);
  protected readonly shown = signal(5);
  protected readonly nextBatch = computed(() => Math.min(5, MUITAS.length - this.shown()));
  protected pageOf(page: number, size: number) {
    return MUITAS.slice((page - 1) * size, page * size);
  }
  protected showMore(): void {
    this.shown.update((n) => Math.min(n + 5, MUITAS.length));
  }

  // Outros exemplos
  protected readonly users = [
    { nome: 'Ana Kiala', funcao: 'Administradora' },
    { nome: 'João Mbala', funcao: 'Editor' },
    { nome: 'Rita Sousa', funcao: 'Leitura' },
  ];
  protected readonly provincias = [
    { nome: 'Luanda', clientes: 1284, receita: 48700 },
    { nome: 'Benguela', clientes: 312, receita: 9800 },
    { nome: 'Huíla', clientes: 198, receita: 6100 },
  ];
  protected readonly totalClientes = this.provincias.reduce((a, r) => a + r.clientes, 0);
  protected readonly totalReceita = this.provincias.reduce((a, r) => a + r.receita, 0);
  protected readonly produtos = [
    { nome: 'Papel A4 (caixa)', stock: 120 },
    { nome: 'Toner preto', stock: 14 },
    { nome: 'Cadeira de escritório', stock: 8 },
    { nome: 'Monitor 24"', stock: 22 },
    { nome: 'Teclado', stock: 41 },
  ];
  protected readonly movimentos = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    data: `${String(27 - i).padStart(2, '0')}/10/2026`,
    desc: ['Pagamento recebido', 'Transferência', 'Taxa bancária', 'Factura liquidada'][i % 4],
    valor: [250, -120, -1.5, 980][i % 4],
  }));
  protected readonly loading = signal(false);
  protected reload(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1500);
  }
  protected readonly sort = signal<MxSortState>({ active: 'numero', direction: 'asc' });
  protected readonly rows = computed(() => mxSortData(FACTURAS, this.sort(), undefined, 'pt'));
  private readonly nf = new Intl.NumberFormat('pt-AO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  protected fmt(v: number): string {
    return this.nf.format(v);
  }

  protected readonly previewCode = `<div class="mx-table-container">
  <table mxTable [(sort)]="sort">
    <thead>
      <tr>
        <th mxSortHeader="numero" scope="col">Factura</th>
        <th mxSortHeader="cliente" scope="col">Cliente</th>
        <th mxSortHeader="valor" scope="col" data-align="end">Valor (US$)</th>
      </tr>
    </thead>
    <tbody>
      @for (f of rows(); track f.numero) {
        <tr><td>{{ f.numero }}</td><td>{{ f.cliente }}</td><td data-align="end">{{ f.valor }}</td></tr>
      }
    </tbody>
  </table>
</div>

// no componente
sort = signal<MxSortState>({ active: 'numero', direction: 'asc' });
rows = computed(() => mxSortData(facturas, this.sort(), undefined, 'pt'));`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: 'table[mxTable]', type: 'MxTable' },
    { kind: 'Input', name: 'sort', type: 'MxSortState', default: '{ active: null }', description: 'Aceita [(sort)].' },
    { kind: 'Input', name: 'density', type: "'comfortable' | 'compact'", default: 'comfortable', description: '44 ou 36 px por linha.' },
    { kind: 'Input', name: 'variant', type: "'default' | 'striped' | 'bordered'", default: 'default', description: 'Linhas alternadas ou linhas entre colunas.' },
    { kind: 'Input', name: 'stickyHeader', type: 'boolean', default: 'false', description: 'Cabeçalho fixo; dá max-height ao contentor.' },
    { kind: 'Directiva', name: 'th[mxSortHeader]', type: 'string', description: 'Chave da coluna; acrescenta o botão e aria-sort.' },
    { kind: 'Token CSS', name: '.mx-table-toolbar, .mx-table-footer', type: 'classes', description: 'Barra de pesquisa ou acções em lote, e rodapé com contagem e paginação.' },
    { kind: 'Token CSS', name: '.mx-table-check, .mx-table-actions, .mx-table-empty', type: 'classes', description: 'Coluna de selecção, coluna de acções e célula de estado vazio.' },
    { kind: 'Método', name: 'mxSortData(linhas, sort, accessor?, locale?)', type: 'T[]', description: 'Ordena texto segundo o locale (inglês por omissão; passa \'pt\') e números.' },
  ];
}
