import { Injectable, Injector, TemplateRef, inject } from '@angular/core';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { createGlobalPositionStrategy } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';

export type MxDrawerSide = 'left' | 'right' | 'bottom';
export type MxDrawerSize = 'sm' | 'md' | 'lg';

const SIZES: Record<MxDrawerSize, string> = { sm: '320px', md: '420px', lg: '560px' };

export interface MxDrawerOptions<D = unknown> {
  data?: D;
  /** Lado de onde entra. Por omissão, a direita. */
  side?: MxDrawerSide;
  /** Largura (ou altura, em bottom): sm 320 px, md 420 px, lg 560 px. */
  size?: MxDrawerSize;
  disableClose?: boolean;
  ariaLabel?: string;
}

/**
 * Painel lateral modal. É um diálogo (foco preso, Escape, foco devolvido) que entra
 * por um lado do ecrã. Usa os mesmos blocos do Dialog: mxDialogTitle, mx-dialog-content...
 *
 * ```ts
 * inject(MxDrawer).open(DetalheFactura, { data: factura, side: 'right', size: 'md' });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MxDrawer {
  private readonly dialog = inject(Dialog);
  private readonly injector = inject(Injector);

  open<R = unknown, D = unknown, C = unknown>(
    content: ComponentType<C> | TemplateRef<C>,
    options: MxDrawerOptions<D> = {},
  ): DialogRef<R, C> {
    const side = options.side ?? 'right';
    const size = SIZES[options.size ?? 'md'];
    const position = createGlobalPositionStrategy(this.injector);
    if (side === 'left') position.left('0').top('0');
    else if (side === 'right') position.right('0').top('0');
    else position.bottom('0').left('0');

    const config: DialogConfig<D, DialogRef<R, C>> = {
      data: options.data,
      positionStrategy: position,
      width: side === 'bottom' ? '100vw' : size,
      maxWidth: '100vw',
      height: side === 'bottom' ? size : '100dvh',
      maxHeight: '100dvh',
      role: 'dialog',
      ariaModal: true,
      ariaLabel: options.ariaLabel ?? null,
      disableClose: options.disableClose ?? false,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
      hasBackdrop: true,
      panelClass: ['mx-drawer-panel', `mx-drawer-${side}`],
      backdropClass: 'mx-dialog-backdrop',
    };
    return this.dialog.open<R, D, C>(content, config);
  }

  closeAll(): void {
    this.dialog.closeAll();
  }
}
