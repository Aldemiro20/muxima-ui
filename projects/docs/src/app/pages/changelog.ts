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
      status: 'Planeado',
      date: 'Data por anunciar',
      title: 'Versão de lançamento',
      items: [
        'Catálogo base completo (cerca de 35 componentes)',
        'Revisão de acessibilidade de todos os componentes',
        'Publicação no npm como @muxima-ui/core',
        'Site de documentação em domínio próprio',
      ],
    },
    {
      version: '0.1.0',
      status: 'Em curso',
      date: 'Outubro de 2026',
      title: 'Nova base da biblioteca',
      items: [
        'Angular 21 e 22, standalone e signals',
        'Sistema de temas com tokens CSS e modo escuro',
        'Button, Form field e Input, Select, Dialog, Tabs e Table',
        'Testes de comportamento e de teclado',
        'Nova documentação com pesquisa Ctrl+K',
      ],
    },
  ];
}
