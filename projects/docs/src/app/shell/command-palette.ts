import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MX_COMMAND, MxCommandItem } from '@muxima-ui/core/command';
import { MxDialogRef } from '@muxima-ui/core/dialog';
import { BLOCKS } from '../blocks/registry';
import { CATALOG, SIDEBAR, TOP_NAV } from '../data/site';
import { Icon } from '../ui/icon';

interface Target {
  path: string;
  icon: string;
}

const ITEMS: MxCommandItem<Target>[] = [
  ...TOP_NAV.filter((n) => n.path !== '/docs').map((n) => ({ label: n.label, group: 'Páginas', data: { path: n.path, icon: 'arrowRight' } })),
  ...SIDEBAR.slice(0, 1).flatMap((g) => g.items.map((i) => ({ label: i.label, group: 'Documentação', data: { path: i.path, icon: i.icon } }))),
  ...CATALOG.filter((c) => c.path).map((c) => ({
    label: c.name,
    group: 'Componentes',
    keywords: [c.description, c.category],
    data: { path: c.path!, icon: c.icon },
  })),
  ...BLOCKS.map((b) => ({
    label: b.name,
    group: 'Blocos',
    keywords: [b.description, 'bloco', ...b.variants.map((v) => v.title)],
    data: { path: `/blocos/${b.slug}`, icon: b.icon },
  })),
];

/** Pesquisa do site (Ctrl+K), feita com o mx-command da própria biblioteca. */
@Component({
  selector: 'doc-command-palette',
  imports: [MX_COMMAND, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-command [items]="items" placeholder="Pesquisar componentes, blocos e páginas..." aria-label="Pesquisar na documentação" (selected)="go($event)">
      <ng-template mxCommandItem let-item>
        <doc-icon [name]="item.data.icon" />
        <span>{{ item.label }}</span>
      </ng-template>
    </mx-command>
    <div class="palette-footer" aria-hidden="true">
      <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
      <span><kbd>Enter</kbd> abrir</span>
      <span><kbd>Esc</kbd> fechar</span>
    </div>
  `,
})
export class CommandPalette {
  private readonly router = inject(Router);
  private readonly ref = inject(MxDialogRef);
  protected readonly items = ITEMS;

  protected go(item: MxCommandItem<Target>): void {
    this.ref.close();
    this.router.navigateByUrl(item.data!.path);
  }
}
