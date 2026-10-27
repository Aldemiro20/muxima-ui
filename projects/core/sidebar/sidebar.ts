import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
} from '@angular/core';
import { mxUniqueId } from '@muxima-ui/core/form-field';

/**
 * Navegação lateral que recolhe para só ícones. O conteúdo fica dentro de um `<nav>`;
 * recolhida, os nomes continuam lá para o leitor de ecrã e aparecem numa dica ao passar
 * o rato ou com o foco.
 *
 * ```html
 * <mx-sidebar [(collapsed)]="recolhida" aria-label="Principal">
 *   <div mxSidebarHeader>Kianda</div>
 *   <mx-sidebar-group label="Gestão">
 *     <li><a mxSidebarItem routerLink="/facturas" routerLinkActive ariaCurrentWhenActive="page">
 *       <svg mxSidebarIcon>...</svg><span mxSidebarLabel>Facturas</span>
 *     </a></li>
 *   </mx-sidebar-group>
 *   <div mxSidebarFooter>...</div>
 * </mx-sidebar>
 * <button mxSidebarToggle [sidebar]="menu">...</button>
 * ```
 *
 * O item da página actual leva aria-current="page" (o routerLinkActive faz isso com
 * ariaCurrentWhenActive).
 */
@Component({
  selector: 'mx-sidebar',
  exportAs: 'mxSidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-sidebar',
    '[id]': 'id()',
    '[attr.data-collapsed]': 'collapsed() ? "" : null',
    '[attr.data-variant]': 'variant() === "default" ? null : variant()',
    '[attr.aria-label]': 'null',
  },
  template: `
    <ng-content select="[mxSidebarHeader]" />
    <nav class="mx-sidebar-nav" [attr.aria-label]="ariaLabel()">
      <ng-content />
    </nav>
    <ng-content select="[mxSidebarFooter]" />
  `,
})
export class MxSidebar {
  readonly collapsed = model(false);
  readonly ariaLabel = input('Principal', { alias: 'aria-label' });
  /** `default` com fundo de superfície; `subtle` com o fundo do papel. */
  readonly variant = input<'default' | 'subtle'>('default');
  readonly id = input(mxUniqueId('mx-sidebar'));

  private readonly doc = inject(DOCUMENT);
  /** A dica vive no body, para não ser cortada nem deslocada por contentores da página. */
  private tipEl?: HTMLElement;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.tipEl?.remove());
  }

  toggle(): void {
    this.collapsed.update((c) => !c);
    this.hideTip();
  }

  /** Mostra a dica de um item (só com a barra recolhida). */
  showTip(el: HTMLElement): void {
    if (!this.collapsed()) return;
    const text =
      el.querySelector('.mx-sidebar-label')?.textContent?.trim() ||
      el.getAttribute('aria-label') ||
      '';
    if (!text) return;
    const r = el.getBoundingClientRect();
    if (!this.tipEl) {
      this.tipEl = this.doc.createElement('div');
      this.tipEl.className = 'mx-tooltip mx-sidebar-tip';
      this.tipEl.setAttribute('aria-hidden', 'true');
    }
    this.tipEl.textContent = text;
    this.tipEl.style.top = `${r.top + r.height / 2}px`;
    this.tipEl.style.left = `${r.right + 8}px`;
    if (!this.tipEl.isConnected) this.doc.body.appendChild(this.tipEl);
  }
  hideTip(): void {
    this.tipEl?.remove();
  }
}

/** Link ou botão da barra. Põe o texto em `mxSidebarLabel` e o ícone em `mxSidebarIcon`. */
@Directive({
  selector: 'a[mxSidebarItem], button[mxSidebarItem]',
  exportAs: 'mxSidebarItem',
  host: {
    class: 'mx-sidebar-item',
    '(mouseenter)': 'sidebar?.showTip(el)',
    '(focus)': 'sidebar?.showTip(el)',
    '(mouseleave)': 'sidebar?.hideTip()',
    '(blur)': 'sidebar?.hideTip()',
  },
})
export class MxSidebarItem {
  protected readonly sidebar = inject(MxSidebar, { optional: true });
  protected readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
}

@Directive({ selector: '[mxSidebarLabel]', host: { class: 'mx-sidebar-label' } })
export class MxSidebarLabel {}

@Directive({
  selector: '[mxSidebarIcon]',
  host: { class: 'mx-sidebar-icon', 'aria-hidden': 'true' },
})
export class MxSidebarIcon {}

/** Contagem ou estado à direita do item; recolhida, passa a ponto. */
@Directive({ selector: '[mxSidebarBadge]', host: { class: 'mx-sidebar-badge' } })
export class MxSidebarBadge {}

@Directive({ selector: '[mxSidebarHeader]', host: { class: 'mx-sidebar-header' } })
export class MxSidebarHeader {}

@Directive({ selector: '[mxSidebarFooter]', host: { class: 'mx-sidebar-footer' } })
export class MxSidebarFooter {}

/**
 * Grupo de itens com título. O título dá nome à lista (aria-labelledby); recolhida,
 * o título fica escondido só visualmente. Os itens vão em `<li>`.
 */
@Component({
  selector: 'mx-sidebar-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-sidebar-group' },
  template: `
    @if (label()) {
      <p class="mx-sidebar-group-label" [id]="labelId">{{ label() }}</p>
    }
    <ul class="mx-sidebar-list" [attr.aria-labelledby]="label() ? labelId : null">
      <ng-content />
    </ul>
  `,
})
export class MxSidebarGroup {
  readonly label = input('');
  protected readonly labelId = mxUniqueId('mx-sidebar-group');
}

/**
 * Secção que abre e fecha (botão com aria-expanded). Com a barra recolhida, carregar na
 * secção expande a barra e abre a secção.
 *
 * ```html
 * <li><mx-sidebar-section label="Relatórios" [(open)]="aberta">
 *   <svg mxSidebarIcon>...</svg>
 *   <li><a mxSidebarItem routerLink="/vendas"><span mxSidebarLabel>Vendas</span></a></li>
 * </mx-sidebar-section></li>
 * ```
 */
@Component({
  selector: 'mx-sidebar-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-sidebar-section', '[attr.data-open]': 'isOpen() ? "" : null' },
  template: `
    <button
      type="button"
      mxSidebarItem
      class="mx-sidebar-item mx-sidebar-section-trigger"
      [attr.aria-expanded]="isOpen()"
      [attr.aria-controls]="listId"
      (click)="toggle()"
    >
      <ng-content select="[mxSidebarIcon]" />
      <span class="mx-sidebar-label">{{ label() }}</span>
      <svg class="mx-sidebar-chevron" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M6 4l4 4-4 4"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <ul class="mx-sidebar-list mx-sidebar-sublist" [id]="listId" [hidden]="!isOpen()">
      <ng-content />
    </ul>
  `,
  imports: [MxSidebarItem],
})
export class MxSidebarSection {
  readonly label = input.required<string>();
  readonly open = model(false);
  readonly disabled = input(false, { transform: booleanAttribute });
  private readonly sidebar = inject(MxSidebar, { optional: true });
  protected readonly listId = mxUniqueId('mx-sidebar-section');
  /** Recolhida, a secção não mostra os filhos. */
  protected readonly isOpen = computed(() => this.open() && !this.sidebar?.collapsed());

  protected toggle(): void {
    if (this.sidebar?.collapsed()) {
      this.sidebar.collapsed.set(false);
      this.sidebar.hideTip();
      this.open.set(true);
      return;
    }
    this.open.update((o) => !o);
  }
}

/**
 * Botão que recolhe e expande a barra. Tem aria-expanded e aria-controls; o nome muda
 * entre "Recolher menu" e "Expandir menu" (ou os textos que passares).
 */
@Directive({
  selector: 'button[mxSidebarToggle]',
  exportAs: 'mxSidebarToggle',
  host: {
    class: 'mx-sidebar-toggle',
    type: 'button',
    '[attr.aria-expanded]': '!sidebar().collapsed()',
    '[attr.aria-controls]': 'sidebar().id()',
    '[attr.aria-label]': 'sidebar().collapsed() ? expandLabel() : collapseLabel()',
    '(click)': 'sidebar().toggle()',
  },
})
export class MxSidebarToggle {
  readonly sidebar = input.required<MxSidebar>();
  readonly collapseLabel = input('Recolher menu');
  readonly expandLabel = input('Expandir menu');
}

export const MX_SIDEBAR = [
  MxSidebar,
  MxSidebarItem,
  MxSidebarLabel,
  MxSidebarIcon,
  MxSidebarBadge,
  MxSidebarHeader,
  MxSidebarFooter,
  MxSidebarGroup,
  MxSidebarSection,
  MxSidebarToggle,
] as const;
