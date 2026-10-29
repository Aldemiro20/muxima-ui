import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DATA_GRID, MxGridColumn, MxGridSort } from '@muxima-ui/core/data-grid';
import { MxInput } from '@muxima-ui/core/form-field';
import { MX_MENU } from '@muxima-ui/core/menu';
import { MxPagination } from '@muxima-ui/core/pagination';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

interface Factura {
  numero: string;
  cliente: string;
  provincia: string;
  estado: 'Paga' | 'Pendente' | 'Em atraso';
  emitida: Date;
  valor: number;
}

/** Facturas de exemplo, sempre as mesmas para o mesmo n. */
function gerarFacturas(n: number): Factura[] {
  const clientes = [
    'Kianda Logística',
    'Banco Mutamba',
    'Huíla Agro',
    'Energia do Cuanza',
    'Atlântico Seguros',
    'Lobito Portos',
    'Namibe Pescas',
    'Uíge Café',
  ];
  const provincias = [
    'Luanda',
    'Luanda',
    'Huíla',
    'Cuanza Sul',
    'Benguela',
    'Benguela',
    'Namibe',
    'Uíge',
  ];
  const estados: Factura['estado'][] = ['Paga', 'Paga', 'Pendente', 'Em atraso'];
  return Array.from({ length: n }, (_, i) => ({
    numero: `FT 2026/${String(n - i).padStart(5, '0')}`,
    cliente: clientes[(i * 7) % 8],
    provincia: provincias[(i * 7) % 8],
    estado: estados[(i * 3 + Math.floor(i / 5)) % 4],
    emitida: new Date(2026, 9, 27 - (i % 300)),
    valor: 50000 + ((i * 7919) % 400) * 12500,
  }));
}

const kz = (v: number) =>
  new Intl.NumberFormat('pt-AO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v) +
  ' Kz';
const corEstado = (e: string) =>
  e === 'Paga' ? 'success' : e === 'Pendente' ? 'warning' : 'danger';

@Component({
  selector: 'doc-data-grid-page',
  imports: [DOC_UI, MX_DATA_GRID, MxBadge, MxButton, MxInput, MX_MENU, MxPagination, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Data grid' }]"
        title="Data grid"
        lead="Tabela de dados para trabalho a sério: ordenação, filtros por coluna, pesquisa, selecção, colunas redimensionáveis, fixas e escondíveis, e scroll virtual para milhares de linhas. Navega-se célula a célula com as setas, como numa folha de cálculo."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de data grid">
          <mx-data-grid
            class="w-full"
            [data]="facturas"
            [columns]="colunas"
            rowKey="numero"
            selection="multiple"
            [(selected)]="escolhidas"
            height="420px"
            aria-label="Facturas"
          >
            <ng-template mxGridCell="estado" let-row>
              <span mxBadge size="sm" [variant]="cor(row.estado)">{{ row.estado }}</span>
            </ng-template>
          </mx-data-grid>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_DATA_GRID, MxGridColumn } from '@muxima-ui/core/data-grid';" />
        <doc-callout
          >Se o utilizador só lê os dados, a <a routerLink="/pt/componentes/table">Table</a> chega e é
          mais leve: é HTML simples com estilo. Usa a Data grid quando ele trabalha com os dados:
          filtra, selecciona, ajusta colunas ou percorre milhares de linhas.</doc-callout
        >
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>
          Barra (pesquisa e menu de colunas), cabeçalho fixo com ordenação e filtros, linhas e o
          rodapé com a contagem.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Ordenar (aria-sort)',
            topRight: 'Arrastar para redimensionar',
            bottomLeft: 'Coluna fixa',
            bottomRight: 'Contagem anunciada',
            bottom: 'table role=grid com aria-rowcount',
          }"
        >
          <mx-data-grid
            class="w-full"
            [data]="poucas"
            [columns]="colunasCurtas"
            rowKey="numero"
            [columnMenu]="false"
            aria-label="Exemplo"
          >
            <ng-template mxGridCell="estado" let-row
              ><span mxBadge size="sm" [variant]="cor(row.estado)">{{
                row.estado
              }}</span></ng-template
            >
          </mx-data-grid>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"
            ><mx-data-grid
              class="w-full"
              [data]="[]"
              [columns]="colunasCurtas"
              rowKey="numero"
              [columnMenu]="false"
              aria-label="Vazio"
          /></doc-state>
          <doc-state name="A carregar"
            ><mx-data-grid
              class="w-full"
              [data]="[]"
              [columns]="colunasCurtas"
              rowKey="numero"
              [columnMenu]="false"
              loading
              aria-label="A carregar"
          /></doc-state>
          <doc-state name="Compacta"
            ><mx-data-grid
              class="w-full"
              [data]="poucas"
              [columns]="colunasCurtas"
              rowKey="numero"
              [columnMenu]="false"
              density="compact"
              aria-label="Compacta"
          /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="stack-lg">
          <doc-example
            title="10 000 linhas com scroll virtual"
            note="Só se desenham as linhas à vista; aria-rowcount diz o total ao leitor de ecrã."
          >
            <mx-data-grid
              class="w-full"
              [data]="muitas"
              [columns]="colunasCurtas"
              rowKey="numero"
              height="360px"
              density="compact"
              aria-label="Facturas do ano"
            >
              <ng-template mxGridCell="estado" let-row
                ><span mxBadge size="sm" [variant]="cor(row.estado)">{{
                  row.estado
                }}</span></ng-template
              >
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Pesquisa e exportação na barra"
            [note]="
              'A exportação usa grid.rows(): as linhas filtradas e ordenadas (' +
              grid.rows().length +
              ').'
            "
          >
            <mx-data-grid
              #grid
              class="w-full"
              [data]="facturas"
              [columns]="colunasCurtas"
              rowKey="numero"
              [query]="pesquisa()"
              height="320px"
              aria-label="Facturas com pesquisa"
            >
              <div mxGridToolbar>
                <input
                  mxInput
                  type="search"
                  size="sm"
                  class="grid-search"
                  placeholder="Pesquisar em todas as colunas"
                  aria-label="Pesquisar facturas"
                  [value]="pesquisa()"
                  (input)="pesquisa.set($any($event.target).value)"
                />
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  (click)="exportar(grid.rows())"
                >
                  Exportar CSV
                </button>
              </div>
              <ng-template mxGridCell="estado" let-row
                ><span mxBadge size="sm" [variant]="cor(row.estado)">{{
                  row.estado
                }}</span></ng-template
              >
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Colunas fixas e acções por linha"
            note="pinned fixa o número à esquerda e as acções à direita; desliza para os lados."
          >
            <mx-data-grid
              class="w-full"
              [data]="poucas"
              [columns]="colunasLargas"
              rowKey="numero"
              labelKey="numero"
              aria-label="Facturas com muitas colunas"
            >
              <ng-template mxGridCell="estado" let-row
                ><span mxBadge size="sm" [variant]="cor(row.estado)">{{
                  row.estado
                }}</span></ng-template
              >
              <ng-template mxGridCell="accoes" let-row>
                <button
                  mxButton
                  variant="ghost"
                  size="sm"
                  type="button"
                  [mxMenuTriggerFor]="menuLinha"
                  [attr.aria-label]="'Acções para ' + row.numero"
                >
                  ⋯
                </button>
                <ng-template #menuLinha>
                  <div mxMenu>
                    <button
                      mxMenuItem
                      type="button"
                      (mxMenuItemTriggered)="ultimaAccao.set('Abrir ' + row.numero)"
                    >
                      Abrir
                    </button>
                    <button
                      mxMenuItem
                      type="button"
                      (mxMenuItemTriggered)="ultimaAccao.set('Lembrete para ' + row.cliente)"
                    >
                      Enviar lembrete
                    </button>
                  </div>
                </ng-template>
              </ng-template>
            </mx-data-grid>
            <p class="muted small">{{ ultimaAccao() || 'Nenhuma acção ainda.' }}</p>
          </doc-example>

          <doc-example
            title="Selecção única e abrir com Enter"
            [note]="
              aberta()
                ? 'Aberta: ' + aberta()
                : 'Enter ou duplo clique numa linha emite rowActivate.'
            "
          >
            <mx-data-grid
              class="w-full"
              [data]="poucas"
              [columns]="colunasCurtas"
              rowKey="numero"
              selection="single"
              [(selected)]="unica"
              [columnMenu]="false"
              aria-label="Escolher uma factura"
              (rowActivate)="aberta.set($event.numero)"
            >
              <ng-template mxGridCell="estado" let-row
                ><span mxBadge size="sm" [variant]="cor(row.estado)">{{
                  row.estado
                }}</span></ng-template
              >
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Dados do servidor"
            note="manual: a grelha não ordena nem filtra; [(sort)] e [(filters)] mudam o pedido. A paginação vai no rodapé (mxGridFooter)."
          >
            <mx-data-grid
              class="w-full"
              [data]="paginaServidor()"
              [columns]="colunasServidor"
              rowKey="numero"
              manual
              [totalRows]="totalServidor()"
              [loading]="aCarregar()"
              [(sort)]="ordemServidor"
              [(filters)]="filtrosServidor"
              [columnMenu]="false"
              aria-label="Facturas do servidor"
            >
              <ng-template mxGridCell="estado" let-row
                ><span mxBadge size="sm" [variant]="cor(row.estado)">{{
                  row.estado
                }}</span></ng-template
              >
              <mx-pagination
                mxGridFooter
                variant="compact"
                [(page)]="paginaActual"
                [pageSize]="10"
                [total]="totalServidor()"
                aria-label="Páginas de facturas"
              />
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Filtros já aplicados"
            [note]="'filters = ' + json(filtrosIniciais())"
          >
            <div class="stack w-full">
              <mx-data-grid
                class="w-full"
                [data]="facturas"
                [columns]="colunasFiltro"
                rowKey="numero"
                [(filters)]="filtrosIniciais"
                height="300px"
                [columnMenu]="false"
                aria-label="Facturas grandes em atraso"
              >
                <ng-template mxGridCell="estado" let-row
                  ><span mxBadge size="sm" [variant]="cor(row.estado)">{{
                    row.estado
                  }}</span></ng-template
                >
              </mx-data-grid>
              <p class="muted small">
                No filtro de número: 100, &gt;100, &gt;=100, &lt;100, &lt;=100 ou um intervalo
                10-20.
              </p>
              <div>
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  (click)="filtrosIniciais.set({})"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Acções em massa"
            [note]="
              emMassa().length
                ? emMassa().length + ' seleccionadas'
                : 'Selecciona linhas para aparecerem as acções.'
            "
          >
            <mx-data-grid
              class="w-full"
              [data]="lote()"
              [columns]="colunasCurtas"
              rowKey="numero"
              selection="multiple"
              [(selected)]="emMassa"
              [columnMenu]="false"
              aria-label="Facturas por cobrar"
            >
              <div mxGridToolbar class="row-wrap">
                @if (emMassa().length) {
                  <button mxButton size="sm" type="button" (click)="marcarPagas()">
                    Marcar como pagas ({{ emMassa().length }})
                  </button>
                  <button
                    mxButton
                    size="sm"
                    variant="ghost"
                    type="button"
                    (click)="emMassa.set([])"
                  >
                    Cancelar selecção
                  </button>
                } @else {
                  <span class="muted small">{{ porPagar() }} facturas por pagar</span>
                }
              </div>
              <ng-template mxGridCell="estado" let-row
                ><span mxBadge size="sm" [variant]="cor(row.estado)">{{
                  row.estado
                }}</span></ng-template
              >
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Totais no rodapé"
            note="O total lê grid.rows(), por isso segue os filtros: experimenta filtrar o Estado."
          >
            <mx-data-grid
              #totais
              class="w-full"
              [data]="facturas"
              [columns]="colunasTotais"
              rowKey="numero"
              height="300px"
              [columnMenu]="false"
              aria-label="Facturas com totais"
            >
              <ng-template mxGridCell="estado" let-row
                ><span mxBadge size="sm" [variant]="cor(row.estado)">{{
                  row.estado
                }}</span></ng-template
              >
              <span mxGridFooter class="grid-total"
                >Total <strong>{{ kz(soma(totais.rows())) }}</strong></span
              >
            </mx-data-grid>
          </doc-example>

          <doc-example
            title="Ordem inicial e colunas escondidas"
            [note]="
              'sort = ' +
              (ordem().key ?? 'nenhuma') +
              ' ' +
              ordem().direction +
              '. Província e IVA estão escondidas: abre Colunas.'
            "
          >
            <mx-data-grid
              class="w-full"
              [data]="facturas"
              [columns]="colunasEscondidas"
              rowKey="numero"
              [(sort)]="ordem"
              height="300px"
              aria-label="Maiores facturas primeiro"
            >
              <ng-template mxGridCell="estado" let-row
                ><span mxBadge size="sm" [variant]="cor(row.estado)">{{
                  row.estado
                }}</span></ng-template
              >
            </mx-data-grid>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            {
              key: 'Tab',
              action: 'Entra na grelha (uma célula) e sai dela; não passa por todas as células.',
            },
            { key: '← → ↑ ↓', action: 'Célula a célula, incluindo cabeçalho e filtros.' },
            {
              key: 'Home End',
              action: 'Início e fim da linha; com Ctrl, primeira e última célula.',
            },
            { key: 'Page Up / Down', action: 'Uma página de linhas (com scroll virtual também).' },
            { key: 'Enter', action: 'No cabeçalho ordena; numa linha emite rowActivate.' },
            { key: 'Espaço', action: 'Selecciona a linha; Ctrl + A selecciona todas.' },
            { key: 'Alt + ← →', action: 'No cabeçalho, muda a largura da coluna.' },
          ]"
          [aria]="[
            'table com role=grid, aria-rowcount e aria-colcount com o total real, mesmo com scroll virtual.',
            'Cada linha tem aria-rowindex e, com selecção, aria-selected.',
            'O cabeçalho ordenável tem aria-sort; a mudança é anunciada.',
            'Os filtros têm nome (Filtrar Cliente); nos campos de texto, as setas esquerda e direita editam o texto.',
            'A contagem de linhas e seleccionadas está numa região aria-live.',
            'As caixas de selecção dizem a linha: Seleccionar FT 2026/00200.',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related
          [items]="[{ name: 'Table' }, { name: 'Pagination' }, { name: 'Dropdown menu' }]"
        />
      </section>
    </article>
  `,
})
export class DataGridPage {
  protected readonly facturas = gerarFacturas(240);
  protected readonly poucas = gerarFacturas(6);
  protected readonly muitas = gerarFacturas(10000);
  protected readonly escolhidas = signal<readonly unknown[]>([]);
  protected readonly pesquisa = signal('');
  protected readonly ultimaAccao = signal('');
  protected readonly unica = signal<readonly unknown[]>([]);
  protected readonly aberta = signal('');
  protected cor(e: string): 'success' | 'warning' | 'danger' {
    return corEstado(e);
  }

  protected readonly colunas: MxGridColumn<Factura>[] = [
    {
      key: 'numero',
      header: 'Número',
      width: 150,
      filter: 'text',
      pinned: 'start',
      hideable: false,
    },
    { key: 'cliente', header: 'Cliente', width: 200, filter: 'text' },
    { key: 'provincia', header: 'Província', width: 140, filter: 'select' },
    { key: 'estado', header: 'Estado', width: 130, filter: 'select' },
    { key: 'emitida', header: 'Emitida', width: 120 },
    {
      key: 'valor',
      header: 'Valor',
      width: 170,
      align: 'end',
      filter: 'number',
      format: (v: number) => kz(v),
    },
  ];
  protected readonly colunasCurtas: MxGridColumn<Factura>[] = [
    { key: 'numero', header: 'Número', width: 150 },
    { key: 'cliente', header: 'Cliente', width: 200 },
    { key: 'estado', header: 'Estado', width: 130 },
    { key: 'valor', header: 'Valor', width: 170, align: 'end', format: (v: number) => kz(v) },
  ];
  protected readonly colunasLargas: MxGridColumn<Factura>[] = [
    { key: 'numero', header: 'Número', width: 150, pinned: 'start' },
    { key: 'cliente', header: 'Cliente', width: 220 },
    { key: 'provincia', header: 'Província', width: 160 },
    { key: 'estado', header: 'Estado', width: 140 },
    { key: 'emitida', header: 'Emitida', width: 140 },
    {
      key: 'vence',
      header: 'Vencimento',
      width: 140,
      value: (f) => new Date(f.emitida.getTime() + 30 * 864e5),
    },
    { key: 'valor', header: 'Valor', width: 180, align: 'end', format: (v: number) => kz(v) },
    {
      key: 'iva',
      header: 'IVA (14%)',
      width: 160,
      align: 'end',
      value: (f) => f.valor * 0.14,
      format: (v: number) => kz(v),
    },
    {
      key: 'accoes',
      header: 'Acções',
      width: 90,
      pinned: 'end',
      sortable: false,
      resizable: false,
      hideable: false,
      align: 'center',
    },
  ];

  protected readonly kz = kz;
  protected json(v: unknown): string {
    return JSON.stringify(v);
  }

  protected readonly colunasFiltro: MxGridColumn<Factura>[] = [
    { key: 'numero', header: 'Número', width: 150 },
    { key: 'cliente', header: 'Cliente', width: 200, filter: 'text' },
    { key: 'estado', header: 'Estado', width: 140, filter: 'select' },
    {
      key: 'valor',
      header: 'Valor',
      width: 170,
      align: 'end',
      filter: 'number',
      format: (v: number) => kz(v),
    },
  ];
  protected readonly filtrosIniciais = signal<Record<string, string>>({
    estado: 'Em atraso',
    valor: '>3000000',
  });

  protected readonly lote = signal(gerarFacturas(12));
  protected readonly emMassa = signal<readonly unknown[]>([]);
  protected porPagar(): number {
    return this.lote().filter((f) => f.estado !== 'Paga').length;
  }
  protected marcarPagas(): void {
    const escolhidas = new Set(this.emMassa());
    this.lote.update((l) =>
      l.map((f) => (escolhidas.has(f.numero) ? { ...f, estado: 'Paga' as const } : f)),
    );
    this.emMassa.set([]);
  }

  protected readonly colunasTotais: MxGridColumn<Factura>[] = [
    { key: 'numero', header: 'Número', width: 150 },
    { key: 'cliente', header: 'Cliente', width: 200, filter: 'text' },
    { key: 'estado', header: 'Estado', width: 140, filter: 'select' },
    { key: 'valor', header: 'Valor', width: 170, align: 'end', format: (v: number) => kz(v) },
  ];
  protected soma(linhas: readonly Factura[]): number {
    return linhas.reduce((t, f) => t + f.valor, 0);
  }

  protected readonly ordem = signal<MxGridSort>({ key: 'valor', direction: 'desc' });
  protected readonly colunasEscondidas: MxGridColumn<Factura>[] = [
    { key: 'numero', header: 'Número', width: 150, hideable: false },
    { key: 'cliente', header: 'Cliente', width: 200 },
    { key: 'provincia', header: 'Província', width: 140, hidden: true },
    { key: 'estado', header: 'Estado', width: 140 },
    { key: 'valor', header: 'Valor', width: 170, align: 'end', format: (v: number) => kz(v) },
    {
      key: 'iva',
      header: 'IVA (14%)',
      width: 160,
      align: 'end',
      hidden: true,
      value: (f) => f.valor * 0.14,
      format: (v: number) => kz(v),
    },
  ];

  protected exportar(linhas: readonly Factura[]): void {
    const csv = [
      'Número;Cliente;Estado;Valor',
      ...linhas.map((f) => [f.numero, f.cliente, f.estado, f.valor.toFixed(2)].join(';')),
    ].join('\n');
    const url = URL.createObjectURL(new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' }));
    Object.assign(document.createElement('a'), { href: url, download: 'facturas.csv' }).click();
    URL.revokeObjectURL(url);
  }

  // ---- servidor simulado ----
  private readonly todasServidor = gerarFacturas(87);
  protected readonly colunasServidor: MxGridColumn<Factura>[] = [
    { key: 'numero', header: 'Número', width: 150 },
    { key: 'cliente', header: 'Cliente', width: 200, filter: 'text' },
    {
      key: 'estado',
      header: 'Estado',
      width: 130,
      filter: 'select',
      filterOptions: ['Paga', 'Pendente', 'Em atraso'],
    },
    { key: 'valor', header: 'Valor', width: 170, align: 'end', format: (v: number) => kz(v) },
  ];
  protected readonly ordemServidor = signal<MxGridSort>({ key: null, direction: 'asc' });
  protected readonly filtrosServidor = signal<Record<string, string>>({});
  protected readonly paginaActual = signal(1);
  protected readonly paginaServidor = signal<Factura[]>([]);
  protected readonly totalServidor = signal(0);
  protected readonly aCarregar = signal(false);

  constructor() {
    // cada mudança de ordem, filtro ou página "pede" ao servidor
    effect((onCleanup) => {
      const pedido = {
        ordem: this.ordemServidor(),
        filtros: this.filtrosServidor(),
        pagina: this.paginaActual(),
      };
      this.aCarregar.set(true);
      const t = setTimeout(() => {
        const r = this.responder(pedido.ordem, pedido.filtros, pedido.pagina);
        this.paginaServidor.set(r.linhas);
        this.totalServidor.set(r.total);
        this.aCarregar.set(false);
      }, 350);
      onCleanup(() => clearTimeout(t));
    });
  }

  /** O que o servidor faria: filtrar, ordenar e devolver uma página. */
  private responder(
    ordem: MxGridSort,
    filtros: Record<string, string>,
    pagina: number,
  ): { linhas: Factura[]; total: number } {
    let l = this.todasServidor.filter(
      (f) =>
        (!filtros['cliente'] ||
          f.cliente.toLowerCase().includes(filtros['cliente'].toLowerCase())) &&
        (!filtros['estado'] || f.estado === filtros['estado']),
    );
    if (ordem.key) {
      const k = ordem.key as keyof Factura;
      l = [...l].sort(
        (a, b) => (a[k] < b[k] ? -1 : a[k] > b[k] ? 1 : 0) * (ordem.direction === 'asc' ? 1 : -1),
      );
    }
    return { linhas: l.slice((pagina - 1) * 10, pagina * 10), total: l.length };
  }

  protected readonly previewCode = `<mx-data-grid [data]="facturas" [columns]="colunas" rowKey="numero"
  selection="multiple" [(selected)]="escolhidas" height="420px" aria-label="Facturas">
  <ng-template mxGridCell="estado" let-row>
    <span mxBadge [variant]="cor(row.estado)">{{ row.estado }}</span>
  </ng-template>
</mx-data-grid>

colunas: MxGridColumn<Factura>[] = [
  { key: 'numero', header: 'Número', filter: 'text', pinned: 'start' },
  { key: 'cliente', header: 'Cliente', filter: 'text' },
  { key: 'estado', header: 'Estado', filter: 'select' },
  { key: 'valor', header: 'Valor', align: 'end', filter: 'number', format: kz },
];`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'data, columns',
      type: 'T[], MxGridColumn<T>[]',
      description: 'As linhas e as colunas.',
    },
    { kind: 'Input', name: 'rowKey', type: 'string | (row) => unknown', default: 'id' },
    { kind: 'Input', name: 'selection', type: "'none' | 'single' | 'multiple'", default: 'none' },
    {
      kind: 'Input',
      name: 'selected',
      type: 'unknown[] (model)',
      description: 'Chaves das linhas seleccionadas.',
    },
    { kind: 'Input', name: 'sort, filters', type: 'MxGridSort, Record<string, string> (model)' },
    {
      kind: 'Input',
      name: 'query',
      type: 'string',
      description: 'Pesquisa em todas as colunas visíveis.',
    },
    {
      kind: 'Input',
      name: 'manual, totalRows',
      type: 'boolean, number',
      description: 'Dados do servidor.',
    },
    {
      kind: 'Input',
      name: 'height, maxHeight',
      type: 'string',
      description: 'Necessário para o scroll virtual.',
    },
    {
      kind: 'Input',
      name: 'virtual',
      type: "boolean | 'auto'",
      default: 'auto',
      description: 'auto: a partir de 100 linhas.',
    },
    { kind: 'Input', name: 'rowHeight', type: 'number', default: '40' },
    { kind: 'Input', name: 'density', type: "'comfortable' | 'compact'", default: 'comfortable' },
    { kind: 'Input', name: 'loading, columnMenu, labelKey', type: 'boolean, boolean, string' },
    {
      kind: 'Output',
      name: 'rowActivate',
      type: 'T',
      description: 'Enter ou duplo clique numa linha.',
    },
    {
      kind: 'Propriedade',
      name: 'rows()',
      type: 'T[]',
      description: 'Linhas filtradas e ordenadas (para exportar).',
    },
    {
      kind: 'Directiva',
      name: 'ng-template[mxGridCell]',
      type: 'let-row, let-value',
      description: 'Conteúdo próprio de uma coluna.',
    },
    {
      kind: 'Directiva',
      name: '[mxGridToolbar], [mxGridFooter]',
      type: 'projecção',
      description: 'Barra por cima e rodapé.',
    },
    {
      kind: 'Input',
      name: 'MxGridColumn',
      type: 'key, header, value, format, width, minWidth, sortable, filter, filterOptions, align, pinned, resizable, hidden, hideable',
    },
  ];
}
