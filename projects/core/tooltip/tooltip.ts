import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  ConnectedPosition,
  OverlayRef,
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { mxUniqueId } from '@muxima-ui/core/form-field';

export type MxTooltipPosition = 'top' | 'bottom' | 'left' | 'right';

const POSITIONS: Record<MxTooltipPosition, ConnectedPosition[]> = {
  top: [
    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -6 },
    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 6 },
  ],
  bottom: [
    { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 6 },
    { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -6 },
  ],
  left: [
    { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -6 },
    { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 6 },
  ],
  right: [
    { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 6 },
    { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -6 },
  ],
};

/** Painel da dica. Criado pelo MxTooltip; não se usa directamente. */
@Component({
  selector: 'mx-tooltip-panel',
  template: `{{ text() }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-tooltip',
    role: 'tooltip',
    '[id]': 'id()',
    '(mouseenter)': 'hover.set(true)',
    '(mouseleave)': 'hover.set(false); leave()',
  },
})
export class MxTooltipPanel {
  readonly text = signal('');
  readonly id = signal('');
  readonly hover = signal(false);
  leave: () => void = () => {};
}

/**
 * Dica curta que aparece ao passar o rato ou ao focar com o teclado.
 * O texto fica ligado ao elemento por aria-describedby; Escape fecha.
 *
 * ```html
 * <button mxButton icon aria-label="Copiar" mxTooltip="Copiar para a área de transferência">...</button>
 * ```
 *
 * A dica só complementa: nunca ponhas nela informação que não exista noutro lado,
 * porque em ecrãs tácteis não há hover.
 */
@Directive({
  selector: '[mxTooltip]',
  exportAs: 'mxTooltip',
  host: {
    '[attr.aria-describedby]': 'describedBy()',
    '(mouseenter)': 'scheduleShow()',
    '(mouseleave)': 'scheduleHide()',
    '(focusin)': 'show()',
    '(focusout)': 'hide()',
    '(keydown.escape)': 'hide()',
  },
})
export class MxTooltip {
  /** Texto da dica. */
  readonly text = input.required<string>({ alias: 'mxTooltip' });
  readonly position = input<MxTooltipPosition>('top', { alias: 'mxTooltipPosition' });
  readonly disabled = input(false, { alias: 'mxTooltipDisabled', transform: booleanAttribute });
  /** Espera antes de mostrar, em ms (só no hover; no foco é imediato). */
  readonly showDelay = input(400, { alias: 'mxTooltipShowDelay' });
  /** ids já existentes em aria-describedby, que se mantêm. */
  readonly ariaDescribedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  private readonly injector = inject(Injector);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly tooltipId = mxUniqueId('mx-tooltip');
  private overlayRef?: OverlayRef;
  private panel?: MxTooltipPanel;
  private showTimer?: ReturnType<typeof setTimeout>;
  private hideTimer?: ReturnType<typeof setTimeout>;
  private readonly visible = signal(false);
  private readonly onDocKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this.visible()) this.hide();
  };

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.clearTimers();
      document.removeEventListener('keydown', this.onDocKey, true);
      this.overlayRef?.dispose();
    });
  }

  protected describedBy(): string | null {
    // A dica é sempre descrita, mesmo antes de aparecer: o id só aponta para o painel quando existe.
    const ids = [this.ariaDescribedBy(), this.visible() ? this.tooltipId : null].filter(Boolean);
    return ids.length ? ids.join(' ') : null;
  }

  protected scheduleShow(): void {
    clearTimeout(this.hideTimer);
    if (this.visible()) return;
    clearTimeout(this.showTimer);
    this.showTimer = setTimeout(() => this.show(), this.showDelay());
  }

  protected scheduleHide(): void {
    clearTimeout(this.showTimer);
    // pequena margem para o ponteiro passar para a dica (WCAG 1.4.13)
    this.hideTimer = setTimeout(() => {
      if (!this.panel?.hover()) this.hide();
    }, 120);
  }

  show(): void {
    this.clearTimers();
    if (this.disabled() || !this.text() || this.visible()) return;
    if (!this.overlayRef) {
      this.overlayRef = createOverlayRef(this.injector, {
        positionStrategy: createFlexibleConnectedPositionStrategy(this.injector, this.host)
          .withPositions(POSITIONS[this.position()])
          .withPush(true)
          .withViewportMargin(8),
        scrollStrategy: createRepositionScrollStrategy(this.injector),
        panelClass: 'mx-tooltip-pane',
      });
    }
    const ref = this.overlayRef.attach(new ComponentPortal(MxTooltipPanel));
    this.panel = ref.instance;
    this.panel.text.set(this.text());
    this.panel.id.set(this.tooltipId);
    this.panel.leave = () => this.scheduleHide();
    ref.changeDetectorRef.detectChanges();
    this.visible.set(true);
    document.addEventListener('keydown', this.onDocKey, true);
  }

  hide(): void {
    this.clearTimers();
    if (!this.visible()) return;
    this.overlayRef?.detach();
    this.panel = undefined;
    this.visible.set(false);
    document.removeEventListener('keydown', this.onDocKey, true);
  }

  private clearTimers(): void {
    clearTimeout(this.showTimer);
    clearTimeout(this.hideTimer);
  }
}
