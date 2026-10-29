import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MX_COMMAND, MxCommandItem } from '@muxima-ui/core/command';
import { MxDialogRef } from '@muxima-ui/core/dialog';
import { BLOCKS as BLOCKS_PT } from '../blocks/registry';
import { BLOCKS as BLOCKS_EN } from '../en/blocks/registry';
import { siteData } from '../data/site-data';
import { Icon } from '../ui/icon';
import { DocLang, LangService } from './lang';
import { UI_TEXT, injectUiText } from './ui-text';

interface Target {
  path: string;
  icon: string;
}

function items(lang: DocLang): MxCommandItem<Target>[] {
  const t = UI_TEXT[lang];
  const { TOP_NAV, SIDEBAR, CATALOG } = siteData(lang);
  const blocks = lang === 'pt' ? BLOCKS_PT : BLOCKS_EN;
  const blocksPath = lang === 'pt' ? '/pt/blocos/' : '/blocks/';
  return [
    ...TOP_NAV.filter((n) => !n.path.endsWith('/docs')).map((n) => ({
      label: n.label,
      group: t.groupPages,
      data: { path: n.path, icon: 'arrowRight' },
    })),
    ...SIDEBAR.slice(0, 1).flatMap((g) =>
      g.items.map((i) => ({ label: i.label, group: t.groupDocs, data: { path: i.path, icon: i.icon } })),
    ),
    ...CATALOG.filter((c) => c.path).map((c) => ({
      label: c.name,
      group: t.groupComponents,
      keywords: [c.description, c.category],
      data: { path: c.path!, icon: c.icon },
    })),
    ...blocks.map((b) => ({
      label: b.name,
      group: t.groupBlocks,
      keywords: [b.description, t.blockKeyword, ...b.variants.map((v) => v.title)],
      data: { path: blocksPath + b.slug, icon: b.icon },
    })),
  ];
}

/** Pesquisa do site (Ctrl+K), feita com o mx-command da própria biblioteca. */
@Component({
  selector: 'doc-command-palette',
  imports: [MX_COMMAND, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mx-command [items]="items()" [placeholder]="t().searchPlaceholder" [aria-label]="t().searchLabel" (selected)="go($event)">
      <ng-template mxCommandItem let-item>
        <doc-icon [name]="item.data.icon" />
        <span>{{ item.label }}</span>
      </ng-template>
    </mx-command>
    <div class="palette-footer" aria-hidden="true">
      <span><kbd>↑</kbd><kbd>↓</kbd> {{ t().searchNav }}</span>
      <span><kbd>Enter</kbd> {{ t().searchOpen }}</span>
      <span><kbd>Esc</kbd> {{ t().searchClose }}</span>
    </div>
  `,
})
export class CommandPalette {
  private readonly router = inject(Router);
  private readonly ref = inject(MxDialogRef);
  private readonly lang = inject(LangService);
  protected readonly t = injectUiText();
  protected readonly items = computed(() => items(this.lang.lang()));

  protected go(item: MxCommandItem<Target>): void {
    this.ref.close();
    this.router.navigateByUrl(item.data!.path);
  }
}
