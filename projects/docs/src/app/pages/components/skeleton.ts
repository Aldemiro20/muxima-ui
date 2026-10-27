import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MX_CARD } from '@muxima-ui/core/card';
import { MxSkeleton } from '@muxima-ui/core/skeleton';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-skeleton-page',
  imports: [DOC_UI, MxSkeleton, MX_CARD, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Skeleton' }]"
        title="Skeleton"
        lead="Ocupa o lugar do conteúdo enquanto carrega, com a mesma forma, para a página não saltar quando os dados chegam."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de skeleton">
          <div class="person w-320" aria-busy="true">
            <div mxSkeleton shape="circle" class="sq-40"></div>
            <div class="stack-sm grow">
              <div mxSkeleton shape="text" class="w-60"></div>
              <div mxSkeleton shape="text" class="w-90"></div>
            </div>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxSkeleton } from '@muxima-ui/core/skeleton';" />
      </section>

      <section>
        <h2>Estados</h2>
        <p>Três formas. A largura e a altura vêm do teu CSS, à medida do conteúdo que substituem.</p>
        <doc-states>
          <doc-state name="Texto" note="shape=text, 0,8 em de altura."><div mxSkeleton shape="text" class="w-90"></div></doc-state>
          <doc-state name="Círculo" note="shape=circle"><div mxSkeleton shape="circle" class="sq-40"></div></doc-state>
          <doc-state name="Bloco" note="shape=block"><div mxSkeleton class="w-90 h-48"></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Carregar um cartão">
            <div class="stack">
              <div><button mxButton type="button" variant="outline" size="sm" (click)="reload()">Recarregar</button></div>
              <span class="mx-visually-hidden" aria-live="polite">{{ loading() ? 'A carregar resumo' : 'Resumo carregado' }}</span>
              <article mxCard [attr.aria-busy]="loading() || null">
                @if (loading()) {
                  <div mxCardHeader class="stack-sm">
                    <div mxSkeleton shape="text" class="w-60"></div>
                    <div mxSkeleton shape="text" class="w-90"></div>
                  </div>
                  <div mxCardContent><div mxSkeleton class="w-90 h-48"></div></div>
                } @else {
                  <header mxCardHeader>
                    <h3 mxCardTitle>Resumo do mês</h3>
                    <p mxCardDescription>142 facturas, 9 pendentes.</p>
                  </header>
                  <div mxCardContent><strong class="big-number">18,4 M Kz</strong></div>
                }
              </article>
            </div>
          </doc-example>
          <doc-example title="Lista" note="Linhas com avatar e texto, com a forma da lista real.">
            <ul class="member-list w-full" aria-busy="true" aria-label="A carregar membros">
              @for (i of [1, 2, 3]; track i) {
                <li>
                  <div mxSkeleton shape="circle" class="sq-32"></div>
                  <div class="stack-sm grow"><div mxSkeleton shape="text" class="w-60"></div><div mxSkeleton shape="text" class="w-40"></div></div>
                </li>
              }
            </ul>
          </doc-example>
          <doc-example title="Artigo">
            <div class="stack-sm w-full" aria-busy="true">
              <div mxSkeleton class="w-full h-120"></div>
              <div mxSkeleton shape="text" class="w-70 h-20"></div>
              <div mxSkeleton shape="text" class="w-full"></div>
              <div mxSkeleton shape="text" class="w-full"></div>
              <div mxSkeleton shape="text" class="w-60"></div>
            </div>
          </doc-example>
          <doc-example title="Indicadores">
            <div class="grid-3 w-full" aria-busy="true">
              @for (i of [1, 2, 3]; track i) {
                <div class="mx-card"><div class="mx-card-content stack-sm"><div mxSkeleton shape="text" class="w-60"></div><div mxSkeleton class="w-40 h-28"></div></div></div>
              }
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Não recebe foco.' }]"
          [aria]="[
            'Cada bloco tem aria-hidden: o leitor de ecrã não lê formas vazias.',
            'Marca o contentor com aria-busy=true enquanto carrega.',
            'Anuncia o início e o fim do carregamento numa região aria-live.',
            'Com movimento reduzido, a pulsação pára.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>[mxSkeleton]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Progress' }, { name: 'Card' }, { name: 'Table' }]" />
      </section>
    </article>
  `,
})
export class SkeletonPage {
  protected readonly loading = signal(true);
  constructor() {
    setTimeout(() => this.loading.set(false), 1800);
  }
  protected reload(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1800);
  }

  protected readonly previewCode = `<div aria-busy="true">
  <div mxSkeleton shape="circle" style="width:40px;height:40px"></div>
  <div mxSkeleton shape="text" style="width:60%"></div>
  <div mxSkeleton shape="text" style="width:90%"></div>
</div>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'shape', type: "'block' | 'text' | 'circle'", default: 'block' },
    { kind: 'Token CSS', name: '--mx-subtle, --mx-stone', type: 'color', description: 'Cores da pulsação.' },
  ];
}
