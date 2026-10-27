import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxPagination } from '@muxima-ui/core/pagination';
import { MX_TABLE } from '@muxima-ui/core/table';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

const CLIENTES = Array.from({ length: 47 }, (_, i) => ({ id: i + 1, nome: `Cliente ${String(i + 1).padStart(2, '0')}` }));

@Component({
  selector: 'doc-pagination-page',
  imports: [DOC_UI, MxPagination, MX_TABLE],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Pagination' }]"
        title="Pagination"
        lead="Navegação entre páginas de resultados, com a página actual marcada e reticências quando há muitas páginas."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de paginação">
          <mx-pagination [(page)]="page" [total]="236" [pageSize]="20" />
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxPagination } from '@muxima-ui/core/pagination';" />
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Normal"><span class="mx-pagination-button">4</span></doc-state>
          <doc-state name="Hover"><span class="mx-pagination-button" data-mx-state="hover">4</span></doc-state>
          <doc-state name="Foco"><span class="mx-pagination-button" data-mx-state="focus">4</span></doc-state>
          <doc-state name="Actual" note="aria-current=page"><span class="mx-pagination-button" aria-current="page">4</span></doc-state>
          <doc-state name="Desactivado" note="Anterior na primeira página."><button type="button" class="mx-pagination-button" disabled>Anterior</button></doc-state>
          <doc-state name="Uma só página" note="Anterior e seguinte desactivados."><mx-pagination [total]="8" [pageSize]="10" aria-label="Uma página" /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Com uma tabela" note="Anuncia a mudança de página numa região aria-live.">
            <div class="stack w-full">
              <div class="mx-table-container">
                <table mxTable density="compact">
                  <caption>Clientes {{ from() }} a {{ to() }} de 47</caption>
                  <thead><tr><th scope="col">N.º</th><th scope="col">Nome</th></tr></thead>
                  <tbody>
                    @for (c of rows(); track c.id) {
                      <tr><td>{{ c.id }}</td><td>{{ c.nome }}</td></tr>
                    }
                  </tbody>
                </table>
              </div>
              <span class="mx-visually-hidden" aria-live="polite">Página {{ tablePage() }}, clientes {{ from() }} a {{ to() }}</span>
              <mx-pagination [(page)]="tablePage" [total]="47" [pageSize]="5" aria-label="Páginas de clientes" />
            </div>
          </doc-example>
          <doc-example title="Simples" note="variant=&quot;simple&quot;: Anterior, Página X de Y, Seguinte.">
            <mx-pagination variant="simple" [(page)]="page3" [total]="120" [pageSize]="10" aria-label="Exemplo simples" />
          </doc-example>
          <doc-example title="Compacta" note="variant=&quot;compact&quot;: primeira, anterior, seguinte e última, só com ícones.">
            <mx-pagination variant="compact" [(page)]="page3" [total]="120" [pageSize]="10" aria-label="Exemplo compacto" />
          </doc-example>
          <doc-example title="Linhas por página e intervalo" note="pageSizeOptions e showRange; [(pageSize)] devolve a escolha.">
            <mx-pagination class="w-full" [(page)]="page4" [(pageSize)]="size4" [pageSizeOptions]="[10, 25, 50]" showRange [total]="236" aria-label="Exemplo com linhas por página" />
          </doc-example>
          <doc-example title="Mais páginas à volta" note="siblings=2">
            <mx-pagination [(page)]="page2" [total]="500" [pageSize]="10" [siblings]="2" aria-label="Exemplo com mais páginas" />
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Passa por anterior, páginas e seguinte.' }, { key: 'Enter Espaço', action: 'Vai para a página.' }]"
          [aria]="[
            'nav com o nome Paginação; muda com aria-label quando há várias.',
            'Cada botão diz Página N; a actual tem aria-current=page.',
            'As reticências não são lidas.',
            'Depois de mudar de página, move o foco ou anuncia o novo conteúdo.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>mx-pagination</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Table' }, { name: 'Breadcrumb' }, { name: 'Select' }]" />
      </section>
    </article>
  `,
})
export class PaginationPage {
  protected readonly page = signal(3);
  protected readonly page2 = signal(25);
  protected readonly page3 = signal(4);
  protected readonly page4 = signal(2);
  protected readonly size4 = signal(25);
  protected readonly tablePage = signal(1);
  protected readonly from = computed(() => (this.tablePage() - 1) * 5 + 1);
  protected readonly to = computed(() => Math.min(this.tablePage() * 5, 47));
  protected readonly rows = computed(() => CLIENTES.slice(this.from() - 1, this.to()));

  protected readonly previewCode = `<mx-pagination [(page)]="pagina" [total]="236" [pageSize]="20" />`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'page', type: 'number (model)', default: '1', description: 'Página actual, a começar em 1.' },
    { kind: 'Input', name: 'total', type: 'number', description: 'Obrigatório. Número de itens.' },
    { kind: 'Input', name: 'pageSize', type: 'number (model)', default: '10', description: 'Aceita [(pageSize)].' },
    { kind: 'Input', name: 'variant', type: "'default' | 'simple' | 'compact'", default: 'default', description: 'Números; Página X de Y; só ícones.' },
    { kind: 'Input', name: 'pageSizeOptions', type: 'number[]', default: '[]', description: 'Mostra a escolha Linhas por página.' },
    { kind: 'Input', name: 'showRange', type: 'boolean', default: 'false', description: 'Mostra 21–40 de 236.' },
    { kind: 'Input', name: 'siblings', type: 'number', default: '1', description: 'Páginas de cada lado da actual.' },
    { kind: 'Input', name: 'aria-label', type: 'string', default: 'Paginação' },
  ];
}
