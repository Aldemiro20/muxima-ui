import { Directive, input } from '@angular/core';
import { CdkMenu, CdkMenuGroup, CdkMenuItem, CdkMenuItemCheckbox, CdkMenuItemRadio, CdkMenuTrigger } from '@angular/cdk/menu';

/**
 * Menu de acções (padrão WAI-ARIA Menu Button), construído sobre o `@angular/cdk/menu`:
 * setas, Home, End, pesquisa por letra, Escape e foco devolvido ao botão.
 *
 * ```html
 * <button mxButton variant="outline" [mxMenuTriggerFor]="accoes">Acções</button>
 * <ng-template #accoes>
 *   <div mxMenu>
 *     <button mxMenuItem (mxMenuItemTriggered)="editar()">Editar</button>
 *     <button mxMenuItem variant="destructive">Eliminar</button>
 *   </div>
 * </ng-template>
 * ```
 */
@Directive({
  selector: '[mxMenuTriggerFor]',
  exportAs: 'mxMenuTrigger',
  hostDirectives: [
    {
      directive: CdkMenuTrigger,
      inputs: ['cdkMenuTriggerFor: mxMenuTriggerFor', 'cdkMenuPosition: mxMenuPosition', 'cdkMenuTriggerData: mxMenuTriggerData'],
      outputs: ['cdkMenuOpened: mxMenuOpened', 'cdkMenuClosed: mxMenuClosed'],
    },
  ],
  host: { class: 'mx-menu-trigger' },
})
export class MxMenuTrigger {}

/** Lista do menu. Usa dentro do `<ng-template>` passado ao trigger. */
@Directive({
  selector: '[mxMenu]',
  exportAs: 'mxMenu',
  hostDirectives: [CdkMenu],
  host: { class: 'mx-menu' },
})
export class MxMenu {}

/** Opção do menu. Aplica-se a um `<button>`. */
@Directive({
  selector: '[mxMenuItem]',
  exportAs: 'mxMenuItem',
  hostDirectives: [
    {
      directive: CdkMenuItem,
      inputs: ['cdkMenuItemDisabled: disabled', 'cdkMenuitemTypeaheadLabel: typeaheadLabel'],
      outputs: ['cdkMenuItemTriggered: mxMenuItemTriggered'],
    },
  ],
  host: { class: 'mx-menu-item', '[attr.data-variant]': 'variant() === "default" ? null : variant()' },
})
export class MxMenuItem {
  readonly variant = input<'default' | 'destructive'>('default');
}

/** Opção que liga e desliga (role=menuitemcheckbox). */
@Directive({
  selector: '[mxMenuItemCheckbox]',
  hostDirectives: [
    {
      directive: CdkMenuItemCheckbox,
      inputs: ['cdkMenuItemChecked: checked', 'cdkMenuItemDisabled: disabled'],
      outputs: ['cdkMenuItemTriggered: mxMenuItemTriggered'],
    },
  ],
  host: { class: 'mx-menu-item', 'data-checkable': '' },
})
export class MxMenuItemCheckbox {}

/** Opção exclusiva dentro de um `[mxMenuGroup]` (role=menuitemradio). */
@Directive({
  selector: '[mxMenuItemRadio]',
  hostDirectives: [
    {
      directive: CdkMenuItemRadio,
      inputs: ['cdkMenuItemChecked: checked', 'cdkMenuItemDisabled: disabled'],
      outputs: ['cdkMenuItemTriggered: mxMenuItemTriggered'],
    },
  ],
  host: { class: 'mx-menu-item', 'data-checkable': '', 'data-radio': '' },
})
export class MxMenuItemRadio {}

/** Agrupa opções exclusivas. */
@Directive({
  selector: '[mxMenuGroup]',
  hostDirectives: [CdkMenuGroup],
  host: { class: 'mx-menu-group' },
})
export class MxMenuGroup {}

/** Título de uma secção do menu (só visual; o grupo deve ter aria-label). */
@Directive({ selector: '[mxMenuLabel]', host: { class: 'mx-menu-label', 'aria-hidden': 'true' } })
export class MxMenuLabel {}

export const MX_MENU = [MxMenuTrigger, MxMenu, MxMenuItem, MxMenuItemCheckbox, MxMenuItemRadio, MxMenuGroup, MxMenuLabel] as const;

