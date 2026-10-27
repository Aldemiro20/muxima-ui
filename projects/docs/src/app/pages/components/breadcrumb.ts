import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxBreadcrumb } from '@muxima-ui/core/breadcrumb';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-breadcrumb-page',
  imports: [DOC_UI, MxBreadcrumb, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Breadcrumb' }]"
        title="Breadcrumb"
        lead="Mostra onde a página está na hierarquia e permite subir de nível. É uma nav com uma lista ordenada; os separadores são desenhados em CSS."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de breadcrumb">
          <nav mxBreadcrumb aria-label="Exemplo de localização">
            <ol>
              <li><a routerLink="/componentes">Clientes</a></li>
              <li><a routerLink="/componentes">Kianda Logística</a></li>
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
