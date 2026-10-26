import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  Injectable,
  TemplateRef,
  afterNextRender,
  inject,
  input,
} from '@angular/core';
import { mxUniqueId } from '@muxima-ui/core/form-field';

export type MxDialogSize = 'sm' | 'md' | 'lg';

const WIDTHS: Record<MxDialogSize, string> = { sm: '400px', md: '520px', lg: '720px' };

export interface MxDialogOptions<D = unknown> {
  /** Dados disponíveis no componente aberto com `inject(DIALOG_DATA)`. */
  data?: D;
  /** Largura máxima: sm 400 px, md 520 px (por omissão), lg 720 px. */
  size?: MxDialogSize;
  /** Impede fechar com Escape ou clique fora (para acções que exigem uma decisão). */
  disableClose?: boolean;
  /** `alertdialog` para confirmações destrutivas; `dialog` nos restantes casos. */
  role?: 'dialog' | 'alertdialog';
  /** Nome acessível, quando o diálogo não tem `mxDialogTitle`. */
  ariaLabel?: string;
}

/**
 * Abre diálogos modais acessíveis: foco preso dentro do diálogo,
 * Escape para fechar e foco devolvido ao elemento que o abriu.
 *
 * ```ts
 * const ref = inject(MxDialog).open(ConfirmarEliminacao, { role: 'alertdialog', size: 'sm' });
 * ref.closed.subscribe((confirmado) => ...);
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MxDialog {
  private readonly cdkDialog = inject(Dialog);

  open<R = unknown, D = unknown, C = unknown>(
    content: ComponentType<C> | TemplateRef<C>,
    options: MxDialogOptions<D> = {},
  ): DialogRef<R, C> {
    const config: DialogConfig<D, DialogRef<R, C>> = {
      data: options.data,
      width: WIDTHS[options.size ?? 'md'],
      maxWidth: '100vw',
      disableClose: options.disableClose ?? false,
      role: options.role ?? 'dialog',
      ariaLabel: options.ariaLabel ?? null,
      ariaModal: true,
      autoFocus: 'first-tabbable',
      restoreFocus: true,
      hasBackdrop: true,
      panelClass: 'mx-dialog-panel',
      backdropClass: 'mx-dialog-backdrop',
    };
    return this.cdkDialog.open<R, D, C>(content, config);
  }

  closeAll(): void {
    this.cdkDialog.closeAll();
  }
}

/** Título do diálogo. Passa a ser o nome acessível do diálogo. */
@Directive({
  selector: '[mxDialogTitle]',
  host: { class: 'mx-dialog-title', '[id]': 'id()' },
})
export class MxDialogTitle {
  readonly id = input(mxUniqueId('mx-dialog-title'));
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => {
      const container = this.el.closest('.cdk-dialog-container');
      if (container && !container.getAttribute('aria-label')) {
        container.setAttribute('aria-labelledby', this.id());
      }
    });
  }
}

/** Descrição curta do diálogo, anunciada ao abrir. */
@Directive({
  selector: '[mxDialogDescription]',
  host: { class: 'mx-dialog-description', '[id]': 'id()' },
})
export class MxDialogDescription {
  readonly id = input(mxUniqueId('mx-dialog-desc'));
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    afterNextRender(() => {
      this.el.closest('.cdk-dialog-container')?.setAttribute('aria-describedby', this.id());
    });
  }
}

@Directive({ selector: 'mx-dialog-header, [mxDialogHeader]', host: { class: 'mx-dialog-header' } })
export class MxDialogHeader {}

@Directive({ selector: 'mx-dialog-content, [mxDialogContent]', host: { class: 'mx-dialog-content' } })
export class MxDialogContent {}

@Directive({ selector: 'mx-dialog-footer, [mxDialogFooter]', host: { class: 'mx-dialog-footer' } })
export class MxDialogFooter {}

/**
 * Fecha o diálogo onde está, devolvendo opcionalmente um resultado.
 * `<button mxButton variant="outline" mxDialogClose>Cancelar</button>`
 * `<button mxButton [mxDialogClose]="true">Confirmar</button>`
 */
@Directive({
  selector: '[mxDialogClose]',
  host: { '(click)': 'close()', '[attr.type]': '"button"' },
})
export class MxDialogClose {
  readonly result = input<unknown>(undefined, { alias: 'mxDialogClose' });
  private readonly ref = inject(DialogRef, { optional: true });

  protected close(): void {
    this.ref?.close(this.result() === '' ? undefined : this.result());
  }
}

/** Todas as peças do diálogo, para importar de uma vez. */
export const MX_DIALOG = [
  MxDialogTitle,
  MxDialogDescription,
  MxDialogHeader,
  MxDialogContent,
  MxDialogFooter,
  MxDialogClose,
] as const;

export { DialogRef as MxDialogRef, DIALOG_DATA as MX_DIALOG_DATA } from '@angular/cdk/dialog';
