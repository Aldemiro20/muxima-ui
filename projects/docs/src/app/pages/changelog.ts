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

      <doc-callout>A 1.0.0 foi a primeira versão pública. As versões 1.x só acrescentam: actualizar não obriga a mudar o teu código.</doc-callout>

      <ol class="timeline">
        @for (r of releases; track r.version) {
          <li>
            <div class="tl-meta">
              <strong>v{{ r.version }}</strong>
              <span class="tag" [class.accent]="r.status === 'Em curso' || r.status === 'Publicada'">{{ r.status }}</span>
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
      version: '1.3.0',
      status: 'Planeado',
      date: 'A seguir à 1.2',
      title: 'Componentes avançados',
      items: ['Data grid: colunas redimensionáveis e fixas, filtros, selecção e scroll virtual', 'Kanban com arrastar e largar', 'Image cropper', 'Rich text editor'],
    },
    {
      version: '1.2.0',
      status: 'Em curso',
      date: 'Pronta a publicar',
      title: 'Navegação e conteúdo',
      items: [
        'Sidebar que recolhe para ícones, com grupos, secções e contagens',
        'Timeline com variantes, passos pendentes, horizontal e alternada',
        'Notification center e botão de sino com a contagem',
        'Carousel acessível, com rotação automática que se pode parar',
        'Color picker com painel, opacidade, amostras e verificação de contraste',
      ],
    },
    {
      version: '1.1.0',
      status: 'Publicada',
      date: '27 de outubro de 2026',
      title: 'Formulários',
      items: [
        'Date range picker, com atalhos e calendário em intervalo',
        'Time picker com lista de horas e escrita livre (9, 930, 9h30)',
        'Range slider com dois cursores',
        'Chips, filtros e campo de etiquetas',
        'File upload com validação, progresso e erros por ficheiro',
        'Rating e Copy to clipboard',
      ],
    },
    {
      version: '1.0.0',
      status: 'Publicada',
      date: '27 de outubro de 2026',
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
  ];
}
