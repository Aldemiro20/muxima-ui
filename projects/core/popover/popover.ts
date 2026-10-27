import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  afterNextRender,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { InteractivityChecker } from '@angular/cdk/a11y';
import {
  ConnectedPosition,
  OverlayRef,
  createFlexibleConnectedPositionStrategy,
  createOverlayRef,
  createRepositionScrollStrategy,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { mxUniqueId } from '@muxima-ui/core/form-field';

export type MxPopoverAlign = 'start' | 'center' | 'end';

/**
 * Conteúdo flutuante não modal, aberto por um botão com `[mxPopoverTrigger]`.
 *
 * ```html
 * <button mxButton variant="outline" [mxPopoverTrigger]="filtros">Filtros</button>
 * <mx-popover #filtros aria-label="Filtros">
 *   ... campos ...
 * </mx-popover>
 * ```
 *
 * Ao abrir, o foco passa para o primeiro elemento focável; Escape ou clique fora
 * fecham e o foco volta ao botão.
 */
@Component({
  selector: 'mx-popover',
  exportAs: 'mxPopover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // o nome vai para o painel; o elemento mx-popover não deve ter atributos aria
  host: { '[attr.aria-label]': 'null', '[attr.aria-labelledby]': 'null' },
  template: `
    <ng-template #panel>
      <div
        class="mx-popover"
        role="dialog"
        tabindex="-1"
        [id]="panelId"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-labelledby]="ariaLabelledBy() ?? null"
        [style.width]="width()"
        (keydown.escape)="close()"
      >
        <ng-content />
      </div>
    </ng-template>
  `,
})
export class MxPopover {
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly ariaLabelledBy = input<string | undefined>(undefined, { alias: 'aria-labelledby' });
  /** Alinhamento com o botão. */
  readonly align = input<MxPopoverAlign>('start');
  readonly width = input<string | undefined>(undefined);
  readonly opened = output<void>();
  readonly closed = output<void>();

  readonly panelId = mxUniqueId('mx-popover');
  readonly template = viewChild.required<TemplateRef<unknown>>('panel');
  readonly isOpen = signal(false);

  /** Definido pelo trigger que abriu o popover. */
  trigger?: MxPopoverTrigger;

  close(): void {
    this.trigger?.close();
  }
}

/** Botão que abre um `<mx-popover>`. */
@Directive({
  selector: '[mxPopoverTrigger]',
  exportAs: 'mxPopoverTrigger',
  host: {
    'aria-haspopup': 'dialog',
    '[attr.aria-expanded]': 'popover().isOpen()',
    '[attr.aria-controls]': 'popover().isOpen() ? popover().panelId : null',
    '(click)': 'toggle()',
  },
})
export class MxPopoverTrigger {
  readonly popover = input.required<MxPopover>({ alias: 'mxPopoverTrigger' });

  private readonly injector = inject(Injector);
  private readonly vcr = inject(ViewContainerRef);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly checker = inject(InteractivityChecker);
  private overlayRef?: OverlayRef;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.overlayRef?.dispose());
  }

  toggle(): void {
    if (this.popover().isOpen()) this.close();
    else this.open();
  }

  open(): void {
    const pop = this.popover();
    if (pop.isOpen()) return;
    const x = pop.align();
    const positions: ConnectedPosition[] = [
      { originX: x, originY: 'bottom', overlayX: x, overlayY: 'top', offsetY: 6 },
      { originX: x, originY: 'top', overlayX: x, overlayY: 'bottom', offsetY: -6 },
    ];
    this.overlayRef ??= createOverlayRef(this.injector, {
      positionStrategy: createFlexibleConnectedPositionStrategy(this.injector, this.host)
        .withPositions(positions)
        .withPush(true)
        .withViewportMargin(8),
      scrollStrategy: createRepositionScrollStrategy(this.injector),
    });
    this.overlayRef.outsidePointerEvents().subscribe((e) => {
      if (!this.host.contains(e.target as Node)) this.close(false);
    });
    this.overlayRef.attach(new TemplatePortal(pop.template(), this.vcr));
    pop.trigger = this;
    pop.isOpen.set(true);
    pop.opened.emit();
    afterNextRender(() => this.focusFirst(), { injector: this.injector });
  }

  close(restoreFocus = true): void {
    const pop = this.popover();
    if (!pop.isOpen()) return;
    this.overlayRef?.detach();
    // outsidePointerEvents é recriado em cada abertura
    this.overlayRef?.dispose();
    this.overlayRef = undefined;
    pop.isOpen.set(false);
    pop.closed.emit();
    if (restoreFocus) this.host.focus();
  }

  private focusFirst(): void {
    const panel = this.overlayRef?.overlayElement.querySelector<HTMLElement>('.mx-popover');
    if (!panel) return;
    const first = Array.from(panel.querySelectorAll<HTMLElement>('*')).find(
      (el) => this.checker.isFocusable(el) && this.checker.isTabbable(el),
    );
    (first ?? panel).focus();
  }
}

export const MX_POPOVER = [MxPopover, MxPopoverTrigger] as const;
