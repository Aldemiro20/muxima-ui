import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  output,
  signal,
  untracked,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { mxUniqueId } from '@muxima-ui/core/form-field';
import { MX_MESSAGES_EN, injectMxMessages } from '@muxima-ui/core/i18n';

export interface MxNotification<D = unknown> {
  id: string | number;
  title: string;
  description?: string;
  time: Date;
  read?: boolean;
  /** Cor do marcador: info em Kwanza, success, warning, danger. */
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger';
  /** Agrupa por categoria nos filtros (ex.: "Facturas"). */
  category?: string;
  data?: D;
}

/** "now", "5 min ago", "yesterday", "3 days ago" e, depois de uma semana, a data (em inglês por omissão). */
export function mxRelativeTime(
  date: Date,
  now = new Date(),
  locale = 'en-US',
  nowText = MX_MESSAGES_EN.notifications.now,
): string {
  const diff = (date.getTime() - now.getTime()) / 1000;
  const abs = Math.abs(diff);
  if (abs < 45) return nowText;
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  if (abs < 3600) return rtf.format(Math.round(diff / 60), 'minute');
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
  if (abs < 7 * 86400) return rtf.format(Math.round(diff / 86400), 'day');
  return new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short' }).format(date);
}

/** Modelo para o conteúdo de cada notificação: `<ng-template mxNotificationContent let-n>`. */
@Directive({ selector: 'ng-template[mxNotificationContent]' })
export class MxNotificationContent {
  readonly template = inject(TemplateRef);
}

/**
 * Lista de notificações com por ler e lidas, filtro "Por ler", "Marcar todas como lidas"
 * e acções por notificação. Usa-se dentro de um popover, de um drawer ou numa página.
 *
 * ```html
 * <mx-notification-center [items]="notificacoes()" (opened)="abrir($event)"
 *   (markRead)="marcar($event)" (markAllRead)="marcarTodas()" (dismiss)="remover($event)" />
 * ```
 *
 * O componente não guarda estado: recebe a lista e emite o que a pessoa fez.
 * Quando chegam notificações novas por ler, anuncia-as ao leitor de ecrã.
 */
@Component({
  selector: 'mx-notification-center',
  exportAs: 'mxNotificationCenter',
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-notification-center', '[attr.aria-label]': 'null' },
  template: `
    <div class="mx-notification-head">
      <p
        class="mx-notification-title"
        role="heading"
        [attr.aria-level]="headingLevel()"
        [id]="titleId"
      >
        {{ title() ?? msg().title }}
      </p>
      @if (unread()) {
        <span class="mx-notification-count"
          >{{ unread() }}<span class="mx-visually-hidden"> {{ msg().unreadCount(unread()) }}</span></span
        >
      }
      <button
        type="button"
        class="mx-notification-link"
        [disabled]="!unread()"
        (click)="markAllRead.emit()"
      >
        {{ markAllText() ?? msg().markAll }}
      </button>
    </div>

    @if (showFilter()) {
      <div class="mx-notification-filters" role="group" [attr.aria-label]="filterLabel() ?? msg().filter">
        <button
          type="button"
          class="mx-chip mx-chip-toggle"
          data-size="sm"
          [attr.aria-pressed]="filter() === 'all'"
          (click)="filter.set('all')"
        >
          {{ msg().all }}
        </button>
        <button
          type="button"
          class="mx-chip mx-chip-toggle"
          data-size="sm"
          [attr.aria-pressed]="filter() === 'unread'"
          (click)="filter.set('unread')"
        >
          {{ msg().unread }} ({{ unread() }})
        </button>
        @for (c of categories(); track c) {
          <button
            type="button"
            class="mx-chip mx-chip-toggle"
            data-size="sm"
            [attr.aria-pressed]="filter() === c"
            (click)="filter.set(c)"
          >
            {{ c }}
          </button>
        }
      </div>
    }

    @if (visible().length) {
      <ul class="mx-notification-list" [attr.aria-labelledby]="titleId">
        @for (n of visible(); track n.id) {
          <li
            class="mx-notification"
            [attr.data-unread]="n.read ? null : ''"
            [attr.data-variant]="n.variant && n.variant !== 'default' ? n.variant : null"
          >
            <span class="mx-notification-dot" aria-hidden="true"></span>
            <button type="button" class="mx-notification-main" (click)="open(n)">
              @if (!n.read) {
                <span class="mx-visually-hidden">{{ msg().unreadPrefix }}</span>
              }
              @if (contentTpl(); as tpl) {
                <ng-container *ngTemplateOutlet="tpl.template; context: { $implicit: n }" />
              } @else {
                <span class="mx-notification-text">{{ n.title }}</span>
                @if (n.description) {
                  <span class="mx-notification-desc">{{ n.description }}</span>
                }
              }
              <time class="mx-notification-time" [attr.datetime]="n.time.toISOString()">{{
                relative(n.time)
              }}</time>
            </button>
            <div class="mx-notification-actions">
              @if (!n.read) {
                <button
                  type="button"
                  class="mx-notification-action"
                  [attr.aria-label]="msg().markRead(n.title)"
                  (click)="markRead.emit(n)"
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M3.5 8.5l3 3 6-7"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              }
              @if (dismissible()) {
                <button
                  type="button"
                  class="mx-notification-action"
                  [attr.aria-label]="msg().remove(n.title)"
                  (click)="dismissItem(n)"
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M4.5 4.5l7 7M11.5 4.5l-7 7"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              }
            </div>
          </li>
        }
      </ul>
    } @else {
      <div class="mx-notification-empty">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 2h-15l1.5-2z M10 20.5a2 2 0 0 0 4 0"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linejoin="round"
          />
        </svg>
        <p>{{ filter() === 'unread' ? (emptyUnreadText() ?? msg().emptyUnread) : (emptyText() ?? msg().empty) }}</p>
      </div>
    }
    <ng-content select="[mxNotificationFooter]" />
  `,
})
export class MxNotificationCenter<D = unknown> {
  readonly items = input.required<readonly MxNotification<D>[]>();
  readonly title = input<string>();
  /** Nível do título para o leitor de ecrã (h2 por omissão). */
  readonly headingLevel = input(2);
  readonly markAllText = input<string>();
  readonly emptyText = input<string>();
  readonly emptyUnreadText = input<string>();
  readonly filterLabel = input<string>();
  /** Mostra os filtros Todas, Por ler e as categorias. */
  readonly showFilter = input(true, { transform: booleanAttribute });
  /** Mostra o botão de remover em cada notificação. */
  readonly dismissible = input(false, { transform: booleanAttribute });
  /** Marca como lida ao abrir (emite markRead além de opened). */
  readonly markReadOnOpen = input(true, { transform: booleanAttribute });
  /** Anuncia ao leitor de ecrã quando chegam notificações por ler. */
  readonly announce = input(true, { transform: booleanAttribute });
  /** Locale das datas; por omissão o do idioma activo. */
  readonly locale = input<string>();
  private readonly i18n = injectMxMessages();
  protected readonly msg = computed(() => this.i18n().notifications);

  readonly opened = output<MxNotification<D>>();
  readonly markRead = output<MxNotification<D>>();
  readonly markAllRead = output<void>();
  readonly dismiss = output<MxNotification<D>>();

  protected readonly contentTpl = contentChild(MxNotificationContent);
  private readonly announcer = inject(LiveAnnouncer);
  protected readonly titleId = mxUniqueId('mx-notification-title');
  readonly filter = signal<string>('all');
  /** Muda a cada minuto, para "há 5 min" se actualizar. */
  private readonly now = signal(new Date());

  readonly unread = computed(() => this.items().filter((n) => !n.read).length);
  protected readonly categories = computed(() => [
    ...new Set(
      this.items()
        .map((n) => n.category)
        .filter((c): c is string => !!c),
    ),
  ]);
  protected readonly visible = computed(() => {
    const f = this.filter();
    const list = [...this.items()].sort((a, b) => b.time.getTime() - a.time.getTime());
    if (f === 'unread') return list.filter((n) => !n.read);
    if (f !== 'all') return list.filter((n) => n.category === f);
    return list;
  });

  constructor() {
    const timer = setInterval(() => this.now.set(new Date()), 60_000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
    let previous: Set<string | number> | null = null;
    effect(() => {
      const items = this.items();
      const ids = new Set(items.map((n) => n.id));
      if (previous && untracked(() => this.announce())) {
        const fresh = items.filter((n) => !n.read && !previous!.has(n.id));
        if (fresh.length)
          this.announcer.announce(
            fresh.length === 1
              ? untracked(() => this.msg().newOne(fresh[0].title))
              : untracked(() => this.msg().newMany(fresh.length)),
          );
      }
      previous = ids;
    });
  }

  protected relative(d: Date): string {
    return mxRelativeTime(d, this.now(), this.locale() ?? this.i18n().intlLocale, this.msg().now);
  }

  protected open(n: MxNotification<D>): void {
    if (!n.read && this.markReadOnOpen()) this.markRead.emit(n);
    this.opened.emit(n);
  }

  protected dismissItem(n: MxNotification<D>): void {
    this.dismiss.emit(n);
    this.announcer.announce(this.msg().removed(n.title));
  }
}

/**
 * Botão do sino com a contagem por ler. O nome inclui a contagem:
 * "Notificações, 3 por ler".
 *
 * ```html
 * <button mxNotificationBell [count]="porLer()" [mxPopoverTrigger]="painel"></button>
 * ```
 */
@Component({
  selector: 'button[mxNotificationBell]',
  exportAs: 'mxNotificationBell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-notification-bell',
    type: 'button',
    '[attr.aria-label]': 'count() ? i18n().notifications.bellCount(label() ?? i18n().notifications.title, count()) : (label() ?? i18n().notifications.title)',
  },
  template: `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 2h-15l1.5-2z"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linejoin="round"
      />
      <path
        d="M10 20.5a2 2 0 0 0 4 0"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
      />
    </svg>
    @if (count()) {
      <span class="mx-notification-bell-count" aria-hidden="true">{{
        count() > max() ? max() + '+' : count()
      }}</span>
    }
  `,
})
export class MxNotificationBell {
  readonly count = input(0);
  readonly max = input(99);
  readonly label = input<string>();
  protected readonly i18n = injectMxMessages();
}
