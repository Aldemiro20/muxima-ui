import { Icon } from '../../ui/icon';
import { MxButton } from '@muxima-ui/core/button';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MX_TABLE } from '@muxima-ui/core/table';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-badge-page',
  imports: [DOC_UI, MxBadge, MX_TABLE, MxButton, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Badge' }]"
        title="Badge"
        lead="Etiqueta curta para estados e categorias: paga, pendente, em atraso. Aplica-se a qualquer elemento de texto e tem seis variantes."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de badges">
          <span mxBadge>Novo</span>
          <span mxBadge variant="secondary">Rascunho</span>
          <span mxBadge variant="outline">Interno</span>
          <span mxBadge variant="success">Paga</span>
          <span mxBadge variant="warning">Pendente</span>
          <span mxBadge variant="danger">Em atraso</span>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxBadge } from '@muxima-ui/core/badge';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Texto pequeno numa caixa com o mesmo raio dos controlos.</p>
        <doc-structure [labels]="{ topLeft: 'Texto de 12 px', topRight: 'Peso 500', bottomLeft: 'Raio de 4 px', bottomRight: 'Altura de 20 px', bottom: 'Fundo a 10% da cor do estado' }">
          <span mxBadge variant="success">Paga</span>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>A badge não é interactiva: os estados são as suas variantes de significado.</p>
        <doc-states>
          <doc-state name="Default"><span mxBadge>Novo</span></doc-state>
          <doc-state name="Secondary"><span mxBadge variant="secondary">Rascunho</span></doc-state>
          <doc-state name="Outline"><span mxBadge variant="outline">Interno</span></doc-state>
          <doc-state name="Success"><span mxBadge variant="success">Paga</span></doc-state>
          <doc-state name="Warning"><span mxBadge variant="warning">Pendente</span></doc-state>
          <doc-state name="Danger"><span mxBadge variant="danger">Em atraso</span></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Numa tabela">
            <div class="mx-table-container w-full">
              <table mxTable density="compact">
                <thead><tr><th scope="col">Factura</th><th scope="col">Estado</th></tr></thead>
                <tbody>
                  <tr><td>FT 2026/0142</td><td><span mxBadge variant="success">Paga</span></td></tr>
                  <tr><td>FT 2026/0143</td><td><span mxBadge variant="warning">Pendente</span></td></tr>
                  <tr><td>FT 2026/0144</td><td><span mxBadge variant="danger">Em atraso</span></td></tr>
                </tbody>
              </table>
            </div>
          </doc-example>
          <doc-example title="Tamanhos" note="18, 20 e 24 px.">
            <span mxBadge variant="secondary" size="sm">Pequena</span>
            <span mxBadge variant="secondary">Média</span>
            <span mxBadge variant="secondary" size="lg">Grande</span>
          </doc-example>
          <doc-example title="Com ponto" note="dot: um ponto de cor antes do texto, bom para listas de estado.">
            <span mxBadge dot variant="success">Online</span>
            <span mxBadge dot variant="warning">Ausente</span>
            <span mxBadge dot variant="danger">Ocupado</span>
            <span mxBadge dot variant="outline">Desligado</span>
          </doc-example>
          <doc-example title="Com ícone">
            <span mxBadge variant="success"><doc-icon name="check" [size]="12" /> Verificado</span>
            <span mxBadge variant="secondary"><doc-icon name="lock" [size]="12" /> Privado</span>
            <span mxBadge variant="outline"><doc-icon name="sparkle" [size]="12" /> Novo</span>
          </doc-example>
          <doc-example title="Em botões e títulos" note="O número entra no nome acessível do botão.">
            <div class="stack">
              <h3 class="inline-heading">Facturas <span mxBadge variant="secondary">142</span></h3>
              <div class="row-inline">
                <button mxButton type="button" variant="outline" size="sm">Pendentes <span mxBadge size="sm" variant="warning">9</span></button>
                <button mxButton type="button" variant="outline" size="sm">Em atraso <span mxBadge size="sm" variant="danger">3</span></button>
              </div>
            </div>
          </doc-example>
          <doc-example title="Etiquetas de categoria">
            <div class="row-wrap">
              @for (t of tags; track t) {
                <span mxBadge variant="outline">{{ t }}</span>
              }
            </div>
          </doc-example>
        </div>
        <doc-callout>A cor ajuda, mas o texto tem de dizer o estado sozinho: há quem não distinga as cores.</doc-callout>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Não recebe foco: é só texto.' }]"
          [aria]="[
            'É lida como texto normal, no ponto em que aparece.',
            'O texto de cada variante tem contraste AA nos dois modos.',
            'Para uma contagem que muda (ex.: mensagens novas), anuncia a mudança com aria-live noutro elemento.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>[mxBadge]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Table' }, { name: 'Alert' }, { name: 'Avatar' }]" />
      </section>
    </article>
  `,
})
export class BadgePage {
  protected readonly tags = ['Logística', 'Banca', 'Agricultura', 'Energia', 'Seguros', 'Pescas'];

  protected readonly previewCode = `<span mxBadge>Novo</span>
<span mxBadge variant="secondary">Rascunho</span>
<span mxBadge variant="outline">Interno</span>
<span mxBadge variant="success">Paga</span>
<span mxBadge variant="warning">Pendente</span>
<span mxBadge variant="danger">Em atraso</span>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'variant', type: "'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'danger'", default: 'default' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '18, 20 ou 24 px.' },
    { kind: 'Token CSS', name: '--mx-success', type: 'color', default: '#17663F' },
    { kind: 'Token CSS', name: '--mx-warning', type: 'color', default: '#93460A' },
    { kind: 'Token CSS', name: '--mx-danger', type: 'color', default: '#B42318' },
  ];
}
