import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MxDialogRef } from '@muxima-ui/core/dialog';
import { MxDrawer } from '@muxima-ui/core/drawer';
import { MX_SIDEBAR } from '@muxima-ui/core/sidebar';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';
import { Icon } from '../../ui/icon';

const MENU = [
  { id: 'inicio', label: 'Visão geral', icon: 'grid' },
  { id: 'facturas', label: 'Facturas', icon: 'file', badge: 3 },
  { id: 'clientes', label: 'Clientes', icon: 'users' },
  { id: 'relatorios', label: 'Relatórios', icon: 'chart' },
];

/** Navegação em telemóvel: a mesma lista dentro de um drawer. */
@Component({
  selector: 'doc-sidebar-movel',
  imports: [MX_DIALOG, MX_SIDEBAR, Icon, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-dialog-header><h2 mxDialogTitle>Kianda Gestão</h2></mx-dialog-header>
    <mx-dialog-content>
      <mx-sidebar class="sidebar-in-drawer" aria-label="Menu da aplicação">
        <mx-sidebar-group>
          @for (i of menu; track i.id) {
            <li>
              <button mxSidebarItem type="button" (click)="ref.close(i.id)">
                <doc-icon mxSidebarIcon [name]="i.icon" [size]="18" />
                <span mxSidebarLabel>{{ i.label }}</span>
              </button>
            </li>
          }
        </mx-sidebar-group>
      </mx-sidebar>
    </mx-dialog-content>
    <mx-dialog-footer
      ><button mxButton variant="outline" type="button" mxDialogClose>
        Fechar
      </button></mx-dialog-footer
    >
  `,
})
class SidebarMovel {
  protected readonly menu = MENU;
  protected readonly ref = inject(MxDialogRef);
}

@Component({
  selector: 'doc-sidebar-page',
  imports: [DOC_UI, MX_SIDEBAR, Icon, MxAvatar, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Sidebar' }]"
        title="Sidebar"
        lead="Navegação lateral da aplicação, com grupos, secções que abrem e contagens. Recolhe para só ícones: os nomes continuam lá para o leitor de ecrã e aparecem numa dica com o rato ou o foco."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de sidebar">
          <div class="app-frame">
            <mx-sidebar
              #menuA="mxSidebar"
              [(collapsed)]="recolhida"
              aria-label="Navegação da aplicação"
            >
              <div mxSidebarHeader>
                <button mxSidebarToggle [sidebar]="menuA">
                  <doc-icon name="menu" [size]="18" />
                </button>
                <strong class="sidebar-brand">Kianda</strong>
              </div>
              <mx-sidebar-group label="Gestão">
                @for (i of menu; track i.id) {
                  <li>
                    <button
                      mxSidebarItem
                      type="button"
                      [attr.aria-current]="activo() === i.id ? 'page' : null"
                      (click)="activo.set(i.id)"
                    >
                      <doc-icon mxSidebarIcon [name]="i.icon" [size]="18" />
                      <span mxSidebarLabel>{{ i.label }}</span>
                      @if (i.badge) {
                        <span mxSidebarBadge
                          >{{ i.badge }}<span class="mx-visually-hidden"> por pagar</span></span
                        >
                      }
                    </button>
                  </li>
                }
              </mx-sidebar-group>
            </mx-sidebar>
            <div class="app-frame-content">
              <p class="muted small">Página aberta</p>
              <p class="app-frame-title">{{ nome(activo()) }}</p>
            </div>
          </div>
        </doc-preview>
        <doc-callout
          >Nos exemplos os itens são botões que mudam um signal. Numa aplicação, usa links com
          routerLink, routerLinkActive e ariaCurrentWhenActive="page".</doc-callout
        >
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_SIDEBAR } from '@muxima-ui/core/sidebar';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Cabeçalho, nav com grupos de itens e rodapé. Recolhida, fica com 60 px de largura.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Cabeçalho',
            topRight: 'Item activo (aria-current)',
            bottomLeft: 'Grupo com título',
            bottomRight: 'Contagem',
            bottom: 'mx-sidebar > nav > ul',
          }"
        >
          <div class="app-frame app-frame-sm">
            <mx-sidebar aria-label="Exemplo">
              <mx-sidebar-group label="Gestão">
                <li>
                  <button mxSidebarItem type="button" aria-current="page">
                    <doc-icon mxSidebarIcon name="file" [size]="18" /><span mxSidebarLabel
                      >Facturas</span
                    ><span mxSidebarBadge>3</span>
                  </button>
                </li>
                <li>
                  <button mxSidebarItem type="button">
                    <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                      >Clientes</span
                    >
                  </button>
                </li>
              </mx-sidebar-group>
            </mx-sidebar>
          </div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Normal"
            ><div class="state-sidebar">
              <button mxSidebarItem type="button">
                <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                  >Clientes</span
                >
              </button>
            </div></doc-state
          >
          <doc-state name="Hover"
            ><div class="state-sidebar">
              <button mxSidebarItem type="button" data-mx-state="hover">
                <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                  >Clientes</span
                >
              </button>
            </div></doc-state
          >
          <doc-state name="Foco"
            ><div class="state-sidebar">
              <button mxSidebarItem type="button" data-mx-state="focus">
                <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                  >Clientes</span
                >
              </button>
            </div></doc-state
          >
          <doc-state name="Activo" note="aria-current=page."
            ><div class="state-sidebar">
              <button mxSidebarItem type="button" aria-current="page">
                <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                  >Clientes</span
                >
              </button>
            </div></doc-state
          >
          <doc-state name="Com contagem"
            ><div class="state-sidebar">
              <button mxSidebarItem type="button">
                <doc-icon mxSidebarIcon name="file" [size]="18" /><span mxSidebarLabel
                  >Facturas</span
                ><span mxSidebarBadge>3</span>
              </button>
            </div></doc-state
          >
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example
            title="Recolhida"
            note="Passa o rato ou usa Tab: a dica mostra o nome, que o leitor de ecrã já lê."
          >
            <div class="app-frame app-frame-sm">
              <mx-sidebar [collapsed]="true" aria-label="Navegação recolhida">
                <mx-sidebar-group label="Gestão">
                  @for (i of menu; track i.id) {
                    <li>
                      <button
                        mxSidebarItem
                        type="button"
                        [attr.aria-current]="activoB() === i.id ? 'page' : null"
                        (click)="activoB.set(i.id)"
                      >
                        <doc-icon mxSidebarIcon [name]="i.icon" [size]="18" />
                        <span mxSidebarLabel>{{ i.label }}</span>
                        @if (i.badge) {
                          <span mxSidebarBadge
                            >{{ i.badge }}<span class="mx-visually-hidden"> por pagar</span></span
                          >
                        }
                      </button>
                    </li>
                  }
                </mx-sidebar-group>
              </mx-sidebar>
            </div>
          </doc-example>
          <doc-example
            title="Grupos e secção que abre"
            note="mx-sidebar-section abre com aria-expanded; recolhida, abre a barra."
          >
            <div class="app-frame app-frame-tall">
              <mx-sidebar aria-label="Administração">
                <mx-sidebar-group label="Vendas">
                  <li>
                    <button mxSidebarItem type="button" aria-current="page">
                      <doc-icon mxSidebarIcon name="file" [size]="18" /><span mxSidebarLabel
                        >Facturas</span
                      >
                    </button>
                  </li>
                  <li>
                    <button mxSidebarItem type="button">
                      <doc-icon mxSidebarIcon name="users" [size]="18" /><span mxSidebarLabel
                        >Clientes</span
                      >
                    </button>
                  </li>
                  <li>
                    <mx-sidebar-section label="Relatórios" [(open)]="relatoriosAbertos">
                      <doc-icon mxSidebarIcon name="chart" [size]="18" />
                      <li>
                        <button mxSidebarItem type="button">
                          <span mxSidebarLabel>Vendas por mês</span>
                        </button>
                      </li>
                      <li>
                        <button mxSidebarItem type="button">
                          <span mxSidebarLabel>Clientes em atraso</span>
                        </button>
                      </li>
                      <li>
                        <button mxSidebarItem type="button"><span mxSidebarLabel>IVA</span></button>
                      </li>
                    </mx-sidebar-section>
                  </li>
                </mx-sidebar-group>
                <mx-sidebar-group label="Conta">
                  <li>
                    <button mxSidebarItem type="button">
                      <doc-icon mxSidebarIcon name="sliders" [size]="18" /><span mxSidebarLabel
                        >Definições</span
                      >
                    </button>
                  </li>
                </mx-sidebar-group>
              </mx-sidebar>
            </div>
          </doc-example>
          <doc-example
            title="Com conta no rodapé"
            note='variant="subtle" usa o fundo do papel; mxSidebarFooter fica em baixo.'
          >
            <div class="app-frame app-frame-tall">
              <mx-sidebar #menuC="mxSidebar" variant="subtle" aria-label="Navegação com conta">
                <div mxSidebarHeader>
                  <doc-icon name="sparkle" [size]="20" /><strong class="sidebar-brand"
                    >Kianda</strong
                  >
                </div>
                <mx-sidebar-group>
                  @for (i of menu; track i.id) {
                    <li>
                      <button
                        mxSidebarItem
                        type="button"
                        [attr.aria-current]="i.id === 'clientes' ? 'page' : null"
                      >
                        <doc-icon mxSidebarIcon [name]="i.icon" [size]="18" /><span
                          mxSidebarLabel
                          >{{ i.label }}</span
                        >
                      </button>
                    </li>
                  }
                </mx-sidebar-group>
                <div mxSidebarFooter>
                  <mx-avatar name="Ana Kiala" size="sm" decorative />
                  <span class="sidebar-user"
                    ><strong>Ana Kiala</strong><span class="muted small">Administradora</span></span
                  >
                </div>
              </mx-sidebar>
            </div>
          </doc-example>
          <doc-example
            title="Botão fora da barra"
            note="mxSidebarToggle pode estar no topo da página; aria-controls aponta para a barra."
          >
            <div class="stack w-full">
              <div class="row-wrap">
                <button
                  mxButton
                  variant="outline"
                  size="sm"
                  mxSidebarToggle
                  [sidebar]="menuD"
                  collapseLabel="Esconder nomes"
                  expandLabel="Mostrar nomes"
                >
                  <doc-icon name="menu" [size]="16" />
                  {{ menuD.collapsed() ? 'Mostrar nomes' : 'Esconder nomes' }}
                </button>
              </div>
              <div class="app-frame app-frame-sm">
                <mx-sidebar #menuD="mxSidebar" aria-label="Secundária">
                  <mx-sidebar-group>
                    @for (i of menu; track i.id) {
                      <li>
                        <button mxSidebarItem type="button">
                          <doc-icon mxSidebarIcon [name]="i.icon" [size]="18" /><span
                            mxSidebarLabel
                            >{{ i.label }}</span
                          >
                        </button>
                      </li>
                    }
                  </mx-sidebar-group>
                </mx-sidebar>
              </div>
            </div>
          </doc-example>
          <doc-example
            title="Em telemóvel"
            [note]="'Abre a mesma navegação num drawer. Escolhido: ' + nome(movel())"
          >
            <button mxButton variant="outline" type="button" (click)="abrirMovel()">
              <doc-icon name="menu" [size]="16" /> Abrir menu
            </button>
          </doc-example>
          <doc-example
            title="Largura personalizada"
            note="As variáveis --mx-sidebar-width e --mx-sidebar-collapsed-width mudam as larguras."
          >
            <div class="app-frame app-frame-sm">
              <mx-sidebar class="sidebar-wide" aria-label="Documentos">
                <mx-sidebar-group label="Pastas">
                  <li>
                    <button mxSidebarItem type="button" aria-current="page">
                      <doc-icon mxSidebarIcon name="folder" [size]="18" /><span mxSidebarLabel
                        >Contratos assinados em 2026</span
                      ><span mxSidebarBadge>12</span>
                    </button>
                  </li>
                  <li>
                    <button mxSidebarItem type="button">
                      <doc-icon mxSidebarIcon name="folder" [size]="18" /><span mxSidebarLabel
                        >Propostas por responder</span
                      ><span mxSidebarBadge>4</span>
                    </button>
                  </li>
                </mx-sidebar-group>
              </mx-sidebar>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Passa pelos itens pela ordem; a barra não prende o foco.' },
            { key: 'Enter Espaço', action: 'Abrem o item ou a secção.' },
          ]"
          [aria]="[
            'O conteúdo fica num nav com nome (aria-label, por omissão Principal).',
            'Cada grupo é uma lista com o título como nome (aria-labelledby).',
            'O item da página actual tem aria-current=page.',
            'Recolhida, os nomes ficam escondidos só visualmente; a dica é decorativa (aria-hidden).',
            'O botão de recolher tem aria-expanded e aria-controls, e o nome muda: Recolher menu, Expandir menu.',
            'Junta à contagem o que ela significa (3 por pagar), em texto escondido.',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Drawer' }, { name: 'Tabs' }, { name: 'Breadcrumb' }]" />
      </section>
    </article>
  `,
})
export class SidebarPage {
  private readonly drawer = inject(MxDrawer);
  protected readonly menu = MENU;
  protected readonly recolhida = signal(false);
  protected readonly activo = signal('facturas');
  protected readonly activoB = signal('inicio');
  protected readonly relatoriosAbertos = signal(true);
  protected readonly movel = signal('inicio');

  protected nome(id: string): string {
    return MENU.find((i) => i.id === id)?.label ?? '';
  }
  protected abrirMovel(): void {
    this.drawer
      .open<string>(SidebarMovel, { side: 'left', size: 'sm', ariaLabel: 'Navegação' })
      .closed.subscribe((id) => id && this.movel.set(id));
  }

  protected readonly previewCode = `<mx-sidebar #menu="mxSidebar" [(collapsed)]="recolhida" aria-label="Principal">
  <div mxSidebarHeader>
    <button mxSidebarToggle [sidebar]="menu"><svg>...</svg></button>
    <strong>Kianda</strong>
  </div>
  <mx-sidebar-group label="Gestão">
    <li>
      <a mxSidebarItem routerLink="/facturas" routerLinkActive ariaCurrentWhenActive="page">
        <svg mxSidebarIcon>...</svg>
        <span mxSidebarLabel>Facturas</span>
        <span mxSidebarBadge>3<span class="mx-visually-hidden"> por pagar</span></span>
      </a>
    </li>
  </mx-sidebar-group>
</mx-sidebar>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Componente',
      name: 'mx-sidebar',
      type: '[(collapsed)], variant, aria-label, id',
      description: 'A barra; o conteúdo vai num nav.',
    },
    { kind: 'Input', name: 'collapsed', type: 'boolean (model)', default: 'false' },
    { kind: 'Input', name: 'variant', type: "'default' | 'subtle'", default: 'default' },
    {
      kind: 'Input',
      name: 'aria-label',
      type: 'string',
      default: 'Principal',
      description: 'Nome do nav.',
    },
    { kind: 'Método', name: 'toggle()', type: 'void', description: 'Recolhe ou expande.' },
    {
      kind: 'Directiva',
      name: 'a[mxSidebarItem], button[mxSidebarItem]',
      type: 'item',
      description: 'Com mxSidebarIcon, mxSidebarLabel e mxSidebarBadge.',
    },
    {
      kind: 'Componente',
      name: 'mx-sidebar-group',
      type: 'label',
      description: 'Lista com título; os itens vão em li.',
    },
    {
      kind: 'Componente',
      name: 'mx-sidebar-section',
      type: 'label, [(open)]',
      description: 'Sub-lista que abre e fecha.',
    },
    {
      kind: 'Directiva',
      name: 'button[mxSidebarToggle]',
      type: 'sidebar, collapseLabel, expandLabel',
      description: 'Botão de recolher.',
    },
    {
      kind: 'Directiva',
      name: 'mxSidebarHeader, mxSidebarFooter',
      type: 'estilo',
      description: 'Topo e base da barra.',
    },
    {
      kind: 'Token CSS',
      name: '--mx-sidebar-width, --mx-sidebar-collapsed-width',
      type: 'length',
      default: '248px, 60px',
    },
  ];
}
