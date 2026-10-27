import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxSeparator } from '@muxima-ui/core/separator';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-separator-page',
  imports: [DOC_UI, MxSeparator],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Separator' }]"
        title="Separator"
        lead="Linha de 1 px para separar grupos de conteúdo, na horizontal ou na vertical. Em hr usa a semântica nativa."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de separator" align="start">
          <div class="sep-demo">
            <p><strong>Muxima UI</strong></p>
            <p class="muted">Componentes Angular acessíveis.</p>
            <hr mxSeparator />
            <div class="row-inline">
              <span>Documentação</span>
              <div mxSeparator orientation="vertical" decorative></div>
              <span>Componentes</span>
              <div mxSeparator orientation="vertical" decorative></div>
              <span>Changelog</span>
            </div>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxSeparator } from '@muxima-ui/core/separator';" />
      </section>

      <section>
        <h2>Estados</h2>
        <p>Não é interactivo. Varia na orientação e em ser semântico ou decorativo.</p>
        <doc-states>
          <doc-state name="Horizontal" note="hr nativo"><hr mxSeparator /></doc-state>
          <doc-state name="Vertical" note="role=separator"><div class="row-inline"><span>A</span><div mxSeparator orientation="vertical"></div><span>B</span></div></doc-state>
          <doc-state name="Decorativo" note="Escondido do leitor de ecrã."><div class="row-inline"><span>A</span><div mxSeparator orientation="vertical" decorative></div><span>B</span></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Não recebe foco.' }]"
          [aria]="[
            'Em hr, o leitor de ecrã anuncia separador sem atributos extra.',
            'Noutro elemento recebe role=separator e aria-orientation quando é vertical.',
            'Usa decorative quando a linha só serve a apresentação, como entre ligações de um menu.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>[mxSeparator]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Card' }, { name: 'Dropdown menu' }, { name: 'Breadcrumb' }]" />
      </section>
    </article>
  `,
})
export class SeparatorPage {
  protected readonly previewCode = `<hr mxSeparator />
<div mxSeparator orientation="vertical" decorative></div>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal' },
    { kind: 'Input', name: 'decorative', type: 'boolean', default: 'false', description: 'Esconde dos leitores de ecrã.' },
    { kind: 'Token CSS', name: '--mx-stone', type: 'color', description: 'Cor da linha.' },
  ];
}
