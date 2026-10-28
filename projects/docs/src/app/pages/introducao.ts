import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DOC_UI } from '../ui/doc-ui';
import { Icon } from '../ui/icon';
import { Logo } from '../ui/logo';

@Component({
  selector: 'doc-introducao',
  imports: [DOC_UI, RouterLink, Icon, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Começar' }, { label: 'Introdução' }]"
        eyebrow="Documentação / Introdução"
        title="Constrói com confiança."
        lead="A Muxima UI é uma biblioteca de componentes Angular criada para interfaces claras, acessíveis e preparadas para aplicações empresariais."
      />

      <h2 class="mx-visually-hidden">Guias</h2>
      <div class="grid-3">
        @for (c of cards; track c.title) {
          <a class="card card-link" [routerLink]="c.path">
            <span class="icon-tile"><doc-icon [name]="c.icon" /></span>
            <h3>{{ c.title }}</h3>
            <p>{{ c.text }}</p>
            <span class="text-link">Abrir guia →</span>
          </a>
        }
      </div>

      <section>
        <h2>Instalação rápida</h2>
        <p>Começa com o pacote principal e importa a folha de estilos uma vez.</p>
        <doc-code code="npm install @muxima-ui/core @angular/cdk" />
      </section>

      <section>
        <h2>Princípios da biblioteca</h2>
        <div class="grid-3">
          <div class="card"><span class="icon-tile"><doc-icon name="layers" /></span><h3>Simplicidade</h3><p>Tinta, papel e uma única cor de marca.</p></div>
          <div class="card"><span class="icon-tile"><doc-icon name="sliders" /></span><h3>Consistência</h3><p>Alturas, raios e estados de foco previsíveis.</p></div>
          <div class="card"><span class="icon-tile"><doc-icon name="shield" /></span><h3>Identidade</h3><p>Inspiração angolana sem decoração excessiva.</p></div>
        </div>
      </section>

      <div class="card note-card">
        <doc-logo [size]="44" class="accent" />
        <div>
          <strong>Documentação em português</strong>
          <p class="muted">A edição em inglês entra no roadmap para levar a biblioteca ao mercado internacional.</p>
        </div>
      </div>
    </article>
  `,
})
export class IntroducaoPage {
  protected readonly cards = [
    { title: 'Instalação', text: 'Instala a biblioteca e importa o primeiro componente.', icon: 'terminal', path: '/docs/instalacao' },
    { title: 'Temas', text: 'Personaliza a cor de marca e o raio dos controlos.', icon: 'sliders', path: '/docs/temas' },
    { title: 'Componentes', text: 'Pré-visualizações, exemplos e referência da API.', icon: 'grid', path: '/componentes' },
    { title: 'Modo escuro', text: 'Inverte papel e tinta, mantendo os tokens.', icon: 'moon', path: '/docs/modo-escuro' },
    { title: 'Acessibilidade', text: 'Teclado, foco e ARIA em todos os componentes.', icon: 'shield', path: '/componentes/button' },
    { title: 'Blocos', text: 'Secções prontas a copiar: hero, preços, carrinho, pagamento.', icon: 'layers', path: '/blocos' },
  ];
}
