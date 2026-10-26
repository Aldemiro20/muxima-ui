import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MX_TABLE, MxSortState, mxSortData } from '@muxima-ui/core/table';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

interface Factura {
  numero: string;
  cliente: string;
  estado: 'Paga' | 'Pendente' | 'Em atraso';
  valor: number;
}

const FACTURAS: Factura[] = [
  { numero: 'FT 2026/0142', cliente: 'Kianda Logística', estado: 'Paga', valor: 1250000 },
  { numero: 'FT 2026/0143', cliente: 'Banco Mutamba', estado: 'Pendente', valor: 4870500 },
  { numero: 'FT 2026/0144', cliente: 'Huíla Agro', estado: 'Em atraso', valor: 312000 },
  { numero: 'FT 2026/0145', cliente: 'Energia do Cuanza', estado: 'Paga', valor: 9200000 },
  { numero: 'FT 2026/0146', cliente: 'Atlântico Seguros', estado: 'Pendente', valor: 675250 },
];

@Component({
  selector: 'doc-tabelas',
  imports: [DOC_UI, MX_TABLE],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Tabelas' }]"
        title="Tabelas"
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
                  <th mxSortHeader="valor" scope="col" data-align="end">Valor (Kz)</th>
                </tr>
              </thead>
              <tbody>
                @for (f of rows(); track f.numero) {
                  <tr>
                    <td>{{ f.numero }}</td>
                    <td>{{ f.cliente }}</td>
                    <td><span class="status" [attr.data-status]="f.estado">{{ f.estado }}</span></td>
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
      </section>

      <section>
        <h2>Anatomia</h2>
        <p>Cabeçalho em fundo subtil, linhas de 44 px e números tabulares alinhados à direita.</p>
        <doc-anatomy
          [labels]="{
            topLeft: 'Cabeçalho ordenável',
            topRight: 'aria-sort',
            bottomLeft: 'Linhas de 44 px',
            bottomRight: 'Números à direita',
            bottom: 'Contentor com borda de 1 px e raio de 10 px'
          }"
        >
          <div class="mini-table" aria-hidden="true"><span></span><span></span><span></span></div>
        </doc-anatomy>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
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
          <doc-example title="Linha seleccionada" note="aria-selected marca a linha com a linha de estado.">
            <div class="mx-table-container w-full">
              <table mxTable>
                <thead><tr><th scope="col">Utilizador</th><th scope="col">Função</th></tr></thead>
                <tbody>
                  <tr><td>Ana Mendes</td><td>Administradora</td></tr>
                  <tr aria-selected="true"><td>João Kiala</td><td>Editor</td></tr>
                  <tr><td>Rita Sousa</td><td>Leitura</td></tr>
                </tbody>
              </table>
            </div>
          </doc-example>
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
        <doc-related [items]="[{ name: 'Data Table (Pro)' }, { name: 'Pagination' }, { name: 'Selecção', path: '/componentes/seleccao' }]" />
      </section>
    </article>
  `,
})
export class TabelasPage {
  protected readonly sort = signal<MxSortState>({ active: 'numero', direction: 'asc' });
  protected readonly rows = computed(() => mxSortData(FACTURAS, this.sort()));
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
        <th mxSortHeader="valor" scope="col" data-align="end">Valor (Kz)</th>
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
rows = computed(() => mxSortData(facturas, this.sort()));`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: 'table[mxTable]', type: 'MxTable' },
    { kind: 'Input', name: 'sort', type: 'MxSortState', default: '{ active: null }', description: 'Aceita [(sort)].' },
    { kind: 'Input', name: 'density', type: "'comfortable' | 'compact'", default: 'comfortable', description: '44 ou 36 px por linha.' },
    { kind: 'Directiva', name: 'th[mxSortHeader]', type: 'string', description: 'Chave da coluna; acrescenta o botão e aria-sort.' },
    { kind: 'Método', name: 'mxSortData(linhas, sort)', type: 'T[]', description: 'Ordena texto em português e números.' },
  ];
}
