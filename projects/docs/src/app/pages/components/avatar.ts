import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-avatar-page',
  imports: [DOC_UI, MxAvatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Avatar' }]"
        title="Avatar"
        lead="Fotografia de uma pessoa ou organização. Sem imagem, ou se a imagem falhar, mostra as iniciais do primeiro e do último nome."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de avatares">
          <mx-avatar name="Ana Kiala" src="exemplos/pessoa-1.svg" />
          <mx-avatar name="Joana Mbala" src="exemplos/pessoa-2.svg" />
          <mx-avatar name="Banco Mutamba" />
          <mx-avatar name="Rita Sousa" src="exemplos/nao-existe.png" />
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxAvatar } from '@muxima-ui/core/avatar';" />
      </section>

      <section>
        <h2>Estados</h2>
        <p>O avatar não é interactivo; os estados dizem respeito à imagem.</p>
        <doc-states>
          <doc-state name="Com imagem"><mx-avatar name="Ana Kiala" src="exemplos/pessoa-1.svg" /></doc-state>
          <doc-state name="Sem imagem" note="Iniciais."><mx-avatar name="Banco Mutamba" /></doc-state>
          <doc-state name="Imagem falhou" note="Volta às iniciais."><mx-avatar name="Rita Sousa" src="exemplos/nao-existe.png" /></doc-state>
          <doc-state name="Tamanhos" note="24, 32 e 40 px."><mx-avatar name="Ana Kiala" size="sm" /><mx-avatar name="Ana Kiala" /><mx-avatar name="Ana Kiala" size="lg" /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Com o nome ao lado" note="decorative: o nome já está escrito, não é preciso repetir.">
            <div class="person">
              <mx-avatar name="Joana Mbala" src="exemplos/pessoa-2.svg" decorative />
              <div><strong>Joana Mbala</strong><span class="muted">Directora financeira</span></div>
            </div>
          </doc-example>
          <doc-example title="Grupo">
            <div class="avatar-group" role="group" aria-label="Equipa do projecto">
              <mx-avatar name="Ana Kiala" src="exemplos/pessoa-1.svg" />
              <mx-avatar name="Joana Mbala" src="exemplos/pessoa-2.svg" />
              <mx-avatar name="Pedro Neto" />
              <span class="avatar-more" role="img" aria-label="Mais 4 pessoas">+4</span>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Não recebe foco. Se for clicável, envolve-o num botão ou ligação.' }]"
          [aria]="[
            'role=img com o nome como aria-label: lê-se uma vez, com ou sem fotografia.',
            'A imagem interna tem alt vazio para não repetir o nome.',
            'Com decorative fica escondido, para quando o nome já está escrito ao lado.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>mx-avatar</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Badge' }, { name: 'Dropdown menu' }, { name: 'Card' }]" />
      </section>
    </article>
  `,
})
export class AvatarPage {
  protected readonly previewCode = `<mx-avatar name="Ana Kiala" src="/fotos/ana.jpg" />
<mx-avatar name="Banco Mutamba" />`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'name', type: 'string', description: 'Obrigatório. Nome acessível e fonte das iniciais.' },
    { kind: 'Input', name: 'src', type: 'string', description: 'Endereço da imagem.' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '24, 32 ou 40 px.' },
    { kind: 'Input', name: 'decorative', type: 'boolean', default: 'false', description: 'Esconde dos leitores de ecrã.' },
  ];
}
