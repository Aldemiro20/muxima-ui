import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOCKS } from '../blocks/registry';
import { DOC_UI } from '../ui/doc-ui';
import { Icon } from '../ui/icon';

@Component({
  selector: 'doc-blocos',
  imports: [DOC_UI, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Documentação', path: '/docs/introducao' }, { label: 'Blocos' }]"
        title="Blocos"
        lead="Secções de página feitas com os componentes da Muxima UI: hero, preços, cartões de produto, carrinho, definições, comentários e pagamento. Vês cada um em ecrã inteiro, tablet e telemóvel, e copias o código para o teu projecto."
      />

      <h2 class="mx-visually-hidden">Lista de blocos</h2>
      <div class="grid-3">
        @for (b of blocks; track b.slug) {
          <a class="card card-link catalog-card" [routerLink]="'/blocos/' + b.slug">
            <span class="icon-tile"><doc-icon [name]="b.icon" /></span>
            <h3>{{ b.name }}</h3>
            <p>{{ b.description }}</p>
            <div class="card-foot">
              <span class="tag">{{ b.variants.length }} {{ b.variants.length === 1 ? 'variante' : 'variantes' }}</span>
              <span class="text-link">Ver blocos →</span>
            </div>
          </a>
        }
      </div>

      <section class="stack">
        <h2>Como usar</h2>
        <ol class="steps-list">
          <li>Instala a biblioteca e importa o <code>muxima.css</code>, como na <a class="text-link" routerLink="/docs/instalacao">Instalação</a>.</li>
          <li>Em cada bloco, abre <strong>Código</strong> e copia os três ficheiros (.ts, .html e .css) para uma pasta do teu projecto.</li>
          <li>Usa o componente onde quiseres (<code>&lt;app-hero-centrado /&gt;</code>) e troca os textos, os preços e os dados pelos teus.</li>
        </ol>
      </section>

      <doc-callout icon="shield"
        >Os blocos não entram no pacote npm: o código passa a ser teu e mudas o que quiseres. Usam só
        componentes da biblioteca e as variáveis <code>--mx-*</code>, por isso seguem o teu tema e o
        modo escuro, e cumprem o mesmo padrão de acessibilidade.</doc-callout
      >
    </article>
  `,
})
export class BlocosPage {
  protected readonly blocks = BLOCKS;
}
