import { ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, computed, effect, input, signal } from '@angular/core';

/**
 * Fotografia de uma pessoa ou organização, com as iniciais como alternativa
 * quando não há imagem ou ela não carrega.
 *
 * ```html
 * <mx-avatar name="Ana Kiala" src="/fotos/ana.jpg" />
 * <mx-avatar name="Banco Mutamba" size="lg" />
 * ```
 *
 * Com `decorative`, fica escondido dos leitores de ecrã (quando o nome já está escrito ao lado).
 */
@Component({
  selector: 'mx-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-avatar',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '[attr.role]': 'decorative() ? null : "img"',
    '[attr.aria-label]': 'decorative() ? null : label()',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
  },
  template: `
    @if (status()) {
      <span class="mx-avatar-status" [attr.data-status]="status()" aria-hidden="true"></span>
    }
    @if (src() && !failed()) {
      <img [src]="src()" alt="" (error)="failed.set(true)" />
    } @else {
      <span class="mx-avatar-initials" aria-hidden="true">{{ initials() }}</span>
    }
  `,
})
export class MxAvatar {
  /** Nome da pessoa ou organização: nome acessível e fonte das iniciais. */
  readonly name = input.required<string>();
  readonly src = input<string | null | undefined>(undefined);
  /** sm 24 px, md 32 px, lg 40 px. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly decorative = input(false, { transform: booleanAttribute });
  /** Ponto de estado no canto. O estado é anunciado com o nome. */
  readonly status = input<'online' | 'away' | 'busy' | 'offline' | null>(null);

  private static readonly STATUS_TEXT = { online: 'disponível', away: 'ausente', busy: 'ocupado', offline: 'desligado' };
  protected readonly label = computed(() => {
    const s = this.status();
    return s ? `${this.name()}, ${MxAvatar.STATUS_TEXT[s]}` : this.name();
  });

  protected readonly failed = signal(false);
  protected readonly initials = computed(() => {
    const parts = this.name().trim().split(/\s+/).filter(Boolean);
    const first = parts[0]?.[0] ?? '';
    const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
    return (first + last).toUpperCase();
  });

  constructor() {
    effect(() => {
      this.src();
      this.failed.set(false);
    });
  }
}
