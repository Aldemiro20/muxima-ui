import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { LINKS } from '../data/site';
import { Callout } from '../ui/doc-ui';
import { Icon } from '../ui/icon';

interface Release {
  version: string;
  status: string;
  date: string;
  title: string;
  items: string[];
}

@Component({
  selector: 'doc-changelog',
  imports: [MxButton, Callout, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="conteudo" class="page-wide">
      <header class="page-head">
        <p class="eyebrow">Novidades da biblioteca</p>
        <h1 class="display">Changelog</h1>
        <p class="page-lead">Histórico público das alterações, novas funcionalidades, correcções e melhorias de acessibilidade.</p>
      </header>

      <doc-callout>A versão 1.0.0 será a primeira versão pública. Até lá, as versões 0.x podem mudar sem aviso.</doc-callout>

      <ol class="timeline">
        @for (r of releases; track r.version) {
          <li>
            <div class="tl-meta">
              <strong>v{{ r.version }}</strong>
              <span class="tag" [class.accent]="r.status === 'Em curso'">{{ r.status }}</span>
              <span class="muted small">{{ r.date }}</span>
            </div>
            <div class="card tl-card">
              <h2 class="card-title">{{ r.title }}</h2>
              <ul class="checks">
                @for (i of r.items; track i) {
                  <li><doc-icon name="check" /> {{ i }}</li>
                }
              </ul>
            </div>
          </li>
        }
      </ol>

      <section class="card row-card">
        <div>
          <h2 class="card-title">Transparência nas versões</h2>
          <p class="muted small">Cada actualização liga ao respectivo changelog, tag Git e notas de migração.</p>
        </div>
        <a mxButton variant="outline" size="sm" [href]="links.repo" target="_blank" rel="noopener">Ver repositório <doc-icon name="external" [size]="14" /></a>
      </section>
    </main>
  `,
})
export class ChangelogPage {
  protected readonly links = LINKS;
  protected readonly releases: Release[] = [
    {
      version: '1.0.0',
      status: 'Em curso',
      date: 'Pronta a publicar',
      title: 'Primeira versão pública',
      items: [
        '33 componentes: formulários, dados, navegação, sobreposições e feedback',
        'Angular 21 e 22, standalone, signals e compatível com zoneless',
        'Padrão de qualidade em todos: HTML nativo primeiro, WAI-ARIA, estados completos, só tokens, API comum',
        'Tokens CSS --mx-*, modo escuro automático e contornos com contraste 3:1',
        'Testes de comportamento e teclado com axe em cada componente, axe em todas as páginas e testes end-to-end',
        'Documentação com estados, código de cada exemplo e pesquisa Ctrl+K',
        'Substitui os pacotes @muxima-ui/* 1.0.x, que passam a descontinuados',
      ],
    },
    {
      version: '1.1.0',
      status: 'Planeado',
      date: 'Depois do lançamento',
      title: 'Próximos passos',
      items: [
        'Correcções da verificação com leitores de ecrã (NVDA, VoiceOver, TalkBack)',
        'Primeiro template Pro: Dashboard Empresarial',
        'Comando npx muxima add para copiar templates para o teu projecto',
      ],
    },
  ];
}
