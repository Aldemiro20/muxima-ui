import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_CARD } from '@muxima-ui/core/card';
import { MxSkeleton } from '@muxima-ui/core/skeleton';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-card-page',
  imports: [DOC_UI, MX_CARD, MxButton, MxBadge, MxSkeleton, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Card' }]"
        title="Card"
        lead="Superfície para agrupar conteúdo relacionado. São directivas sobre os teus elementos, por isso escolhes article, section ou a, e o nível de título certo."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de card">
          <article mxCard class="w-320">
            <header mxCardHeader>
              <h3 mxCardTitle>Facturação de Outubro</h3>
              <p mxCardDescription>142 facturas emitidas, 9 pendentes.</p>
            </header>
            <div mxCardContent><strong class="big-number">18,4 M Kz</strong></div>
            <footer mxCardFooter>
              <button mxButton type="button" size="sm">Ver detalhe</button>
              <button mxButton type="button" size="sm" variant="ghost">Exportar</button>
            </footer>
          </article>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_CARD } from '@muxima-ui/core/card';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Cabeçalho, conteúdo e rodapé, todos opcionais. O espaçamento interior é de 20 px.</p>
        <doc-structure [labels]="{ topLeft: 'mxCardHeader', topRight: 'Raio de 10 px', bottomLeft: 'mxCardContent', bottomRight: 'mxCardFooter', bottom: 'Borda de 1 px, sem sombra' }">
          <div class="mini-dialog"><strong>Título</strong><span>Descrição</span><div class="mini-actions"><i class="dark"></i></div></div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Um cartão estático não tem estados. Um cartão clicável (a[mxCard]) tem hover e foco.</p>
        <doc-states>
          <doc-state name="Normal"><a mxCard href="#" class="mini-card"><span mxCardContent>Clientes</span></a></doc-state>
          <doc-state name="Hover" note="Borda mais escura."><a mxCard href="#" class="mini-card" data-mx-state="hover"><span mxCardContent>Clientes</span></a></doc-state>
          <doc-state name="Foco"><a mxCard href="#" class="mini-card" data-mx-state="focus"><span mxCardContent>Clientes</span></a></doc-state>
          <doc-state name="A carregar" note="Skeleton no lugar do conteúdo."><div mxCard class="mini-card" aria-busy="true"><div mxCardContent class="stack-sm"><div mxSkeleton shape="text" class="w-60"></div><div mxSkeleton shape="text" class="w-90"></div></div></div></doc-state>
          <doc-state name="Vazio"><div mxCard class="mini-card"><p mxCardContent class="muted">Sem dados</p></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Cartão clicável" note="O cartão inteiro é uma ligação, sem botões dentro.">
            <a mxCard routerLink="/componentes/table" class="w-full">
              <div mxCardHeader>
                <h3 mxCardTitle>Table</h3>
                <p mxCardDescription>Dados tabulares com ordenação acessível.</p>
              </div>
            </a>
          </doc-example>
          <doc-example title="Com estado">
            <section mxCard class="w-full" aria-labelledby="card-plano">
              <div mxCardHeader>
                <div class="row-between"><h3 mxCardTitle id="card-plano">Plano Pro Equipa</h3><span mxBadge variant="success">Activo</span></div>
                <p mxCardDescription>Renova a 12 de Novembro de 2026.</p>
              </div>
              <footer mxCardFooter><button mxButton type="button" size="sm" variant="outline">Gerir plano</button></footer>
            </section>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Só o cartão clicável ou os botões lá dentro recebem foco.' }]"
          [aria]="[
            'Escolhe o elemento pela semântica: article para conteúdo independente, section com título, a para ligação.',
            'Usa o nível de título certo para a página (h2, h3...) no mxCardTitle.',
            'Não ponhas botões dentro de um cartão que já é ligação.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Badge' }, { name: 'Skeleton' }, { name: 'Separator' }]" />
      </section>
    </article>
  `,
})
export class CardPage {
  protected readonly previewCode = `<article mxCard>
  <header mxCardHeader>
    <h3 mxCardTitle>Facturação de Outubro</h3>
    <p mxCardDescription>142 facturas emitidas, 9 pendentes.</p>
  </header>
  <div mxCardContent>18,4 M Kz</div>
  <footer mxCardFooter>
    <button mxButton type="button" size="sm">Ver detalhe</button>
  </footer>
</article>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: '[mxCard]', type: 'article | section | div | a | button', description: 'Superfície. Em a/button ganha hover e foco.' },
    { kind: 'Directiva', name: '[mxCardHeader]', type: 'directiva', description: 'Título e descrição.' },
    { kind: 'Directiva', name: '[mxCardTitle]', type: 'h2 | h3 | ...', description: 'Título com o nível certo para a página.' },
    { kind: 'Directiva', name: '[mxCardDescription]', type: 'directiva', description: 'Texto secundário.' },
    { kind: 'Directiva', name: '[mxCardContent]', type: 'directiva' },
    { kind: 'Directiva', name: '[mxCardFooter]', type: 'directiva', description: 'Acções no fundo do cartão.' },
    { kind: 'Token CSS', name: '--mx-radius-surface', type: 'length', default: 'radius + 4px' },
  ];
}
