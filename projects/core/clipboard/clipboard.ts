import { ChangeDetectionStrategy, Component, DestroyRef, Directive, ViewEncapsulation, inject, input, output, signal } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Clipboard } from '@angular/cdk/clipboard';
import { injectMxMessages } from '@muxima-ui/core/i18n';

/**
 * Copia texto para a área de transferência quando o elemento é clicado.
 * Durante 2 s o elemento fica com data-copied, e "Copiado" é anunciado ao leitor de ecrã.
 *
 * ```html
 * <button mxButton variant="outline" [mxCopy]="iban">Copiar IBAN</button>
 * ```
 */
@Directive({
  selector: '[mxCopy]',
  exportAs: 'mxCopy',
  host: {
    '(click)': 'copy()',
    '[attr.data-copied]': 'copied() ? "" : null',
  },
})
export class MxCopy {
  readonly text = input.required<string>({ alias: 'mxCopy' });
  /** Mensagem anunciada ao copiar. */
  readonly copiedMessage = input<string | undefined>(undefined, { alias: 'mxCopyMessage' });
  private readonly i18n = injectMxMessages();
  readonly copiedChange = output<boolean>({ alias: 'mxCopied' });

  private readonly clipboard = inject(Clipboard);
  private readonly announcer = inject(LiveAnnouncer);
  readonly copied = signal(false);
  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  /** Copia; devolve false se o navegador recusar. */
  copy(): boolean {
    const ok = this.clipboard.copy(this.text());
    this.copiedChange.emit(ok);
    const t = this.i18n().clipboard;
    this.announcer.announce(ok ? (this.copiedMessage() ?? t.copied) : t.failed, ok ? 'polite' : 'assertive');
    if (ok) {
      this.copied.set(true);
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.copied.set(false), 2000);
    }
    return ok;
  }
}

/**
 * Botão de ícone que copia um valor. O nome acessível muda para "Copiado" durante 2 s.
 *
 * ```html
 * <button mxCopyButton [value]="chave" label="Copiar chave da API"></button>
 * ```
 */
@Component({
  selector: 'button[mxCopyButton]',
  exportAs: 'mxCopyButton',
  hostDirectives: [{ directive: MxCopy, inputs: ['mxCopy: value'], outputs: ['mxCopied'] }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-copy-button',
    type: 'button',
    '[attr.aria-label]': 'copy.copied() ? (copiedLabel() ?? i18n().clipboard.copied) : (label() ?? i18n().clipboard.copy)',
    '[attr.data-size]': 'size() === "md" ? null : size()',
  },
  template: `
    @if (copy.copied()) {
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
    } @else {
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3" />
        <path d="M10.5 3.5v-.5A1.5 1.5 0 0 0 9 1.5H4A1.5 1.5 0 0 0 2.5 3v5A1.5 1.5 0 0 0 4 9.5h.5" stroke="currentColor" stroke-width="1.3" />
      </svg>
    }
    <ng-content />
  `,
})
export class MxCopyButton {
  protected readonly copy = inject(MxCopy, { self: true });
  protected readonly i18n = injectMxMessages();
  readonly label = input<string>();
  readonly copiedLabel = input<string>();
  readonly size = input<'sm' | 'md'>('md');
}
