import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  EnvironmentInjector,
  Injectable,
  ViewEncapsulation,
  createComponent,
  inject,
  signal,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';

export type MxToastVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';
export type MxToastPosition = 'bottom-right' | 'bottom-left' | 'bottom-center' | 'top-right' | 'top-left' | 'top-center';

export interface MxToastOptions {
  description?: string;
  /** Tipo da notificação: define a cor do fundo, da borda e do ícone. */
  variant?: MxToastVariant;
  /** Tempo em ms até desaparecer. Pára enquanto o rato ou o foco estão na notificação. 0 = não desaparece. */
  duration?: number;
  /** Botão de acção, por exemplo "Anular". */
  action?: { label: string; run: () => void };
  /** Mostra um indicador de espera e não desaparece sozinha (até ser actualizada). */
  loading?: boolean;
}

export interface MxToastItem {
  id: number;
  title: string;
  description?: string;
  variant: MxToastVariant;
  duration: number;
  loading: boolean;
  action?: { label: string; run: () => void };
}

/** Pilha de notificações. Criada uma vez pelo MxToast; não se usa directamente. */
@Component({
  selector: 'mx-toaster',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-toaster', '[attr.data-position]': 'position()' },
  template: `
    <section aria-label="Notificações" class="mx-toaster-region">
      <ol class="mx-toaster-list">
        @for (t of toasts(); track t.id) {
          <li
            class="mx-toast"
            [attr.data-variant]="t.variant === 'default' ? null : t.variant"
            [attr.aria-busy]="t.loading ? 'true' : null"
            (mouseenter)="pause(t.id)"
            (mouseleave)="resume(t.id)"
            (focusin)="pause(t.id)"
            (focusout)="resume(t.id)"
          >
            @if (t.loading) {
              <span class="mx-toast-icon mx-spinner" aria-hidden="true"></span>
            } @else if (t.variant !== 'default') {
              <span class="mx-toast-icon" aria-hidden="true"></span>
            }
            <div class="mx-toast-text">
              <p class="mx-toast-title">{{ t.title }}</p>
              @if (t.description) {
                <p class="mx-toast-description">{{ t.description }}</p>
              }
            </div>
            @if (t.action) {
              <button type="button" class="mx-toast-action" (click)="act(t)">{{ t.action.label }}</button>
            }
            <button type="button" class="mx-toast-close" aria-label="Fechar notificação" (click)="dismiss(t.id)">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
            </button>
          </li>
        }
      </ol>
    </section>
  `,
})
export class MxToaster {
  readonly toasts = signal<MxToastItem[]>([]);
  readonly position = signal<MxToastPosition>('bottom-right');
  private readonly timers = new Map<number, { handle?: ReturnType<typeof setTimeout>; remaining: number; started: number }>();

  add(t: MxToastItem): void {
    this.toasts.update((list) => [...list, t].slice(-5));
    this.startTimer(t);
  }

  replace(t: MxToastItem): void {
    this.clearTimer(t.id);
    this.toasts.update((list) => list.map((x) => (x.id === t.id ? t : x)));
    this.startTimer(t);
  }

  get(id: number): MxToastItem | undefined {
    return this.toasts().find((t) => t.id === id);
  }

  dismiss(id: number): void {
    this.clearTimer(id);
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  clear(): void {
    this.toasts().forEach((t) => this.clearTimer(t.id));
    this.toasts.set([]);
  }

  protected act(t: MxToastItem): void {
    t.action?.run();
    this.dismiss(t.id);
  }

  protected pause(id: number): void {
    const timer = this.timers.get(id);
    if (!timer?.handle) return;
    clearTimeout(timer.handle);
    timer.handle = undefined;
    timer.remaining -= Date.now() - timer.started;
  }

  protected resume(id: number): void {
    const timer = this.timers.get(id);
    if (!timer || timer.handle) return;
    timer.started = Date.now();
    timer.handle = setTimeout(() => this.dismiss(id), Math.max(timer.remaining, 1000));
  }

  private startTimer(t: MxToastItem): void {
    if (t.duration > 0 && !t.loading) {
      this.timers.set(t.id, { remaining: t.duration, started: 0 });
      this.resume(t.id);
    }
  }

  private clearTimer(id: number): void {
    const timer = this.timers.get(id);
    if (timer?.handle) clearTimeout(timer.handle);
    this.timers.delete(id);
  }
}

/**
 * Notificações temporárias. Cada tipo tem a sua cor (fundo, borda e ícone): info em Kwanza,
 * success em verde, warning em âmbar e danger em vermelho. O texto é anunciado pelo leitor de
 * ecrã (de imediato em danger) e a contagem pára com o rato ou o foco na notificação.
 *
 * ```ts
 * const toast = inject(MxToast);
 * toast.show('Factura enviada', { variant: 'success', description: 'FT 2026/0142 para Kianda Logística.' });
 * toast.show('Falha no envio', { variant: 'danger', description: 'Verifica a ligação.' });
 * toast.promise(enviar(), { loading: 'A enviar...', success: 'Enviado', error: 'Não foi possível enviar' });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MxToast {
  private readonly appRef = inject(ApplicationRef);
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly announcer = inject(LiveAnnouncer);
  private toaster?: MxToaster;
  private nextId = 1;
  private positionValue: MxToastPosition = 'bottom-right';

  show(title: string, options: MxToastOptions = {}): number {
    const item = this.build(this.nextId++, title, options);
    this.ensureToaster().add(item);
    this.announce(item);
    return item.id;
  }

  /** Atalhos com o tipo já definido. */
  info(title: string, options: Omit<MxToastOptions, 'variant'> = {}): number {
    return this.show(title, { ...options, variant: 'info' });
  }
  success(title: string, options: Omit<MxToastOptions, 'variant'> = {}): number {
    return this.show(title, { ...options, variant: 'success' });
  }
  warning(title: string, options: Omit<MxToastOptions, 'variant'> = {}): number {
    return this.show(title, { ...options, variant: 'warning' });
  }
  error(title: string, options: Omit<MxToastOptions, 'variant'> = {}): number {
    return this.show(title, { ...options, variant: 'danger' });
  }

  /** Muda uma notificação já visível (por exemplo, de "a enviar" para "enviado"). */
  update(id: number, title: string, options: MxToastOptions = {}): void {
    const toaster = this.ensureToaster();
    if (!toaster.get(id)) {
      this.show(title, options);
      return;
    }
    const item = this.build(id, title, options);
    toaster.replace(item);
    this.announce(item);
  }

  /** Mostra "a carregar" enquanto a promessa corre e depois sucesso ou erro. */
  async promise<T>(
    work: Promise<T>,
    messages: { loading: string; success: string | ((value: T) => string); error: string | ((err: unknown) => string) },
  ): Promise<T> {
    const id = this.show(messages.loading, { loading: true });
    try {
      const value = await work;
      this.update(id, typeof messages.success === 'function' ? messages.success(value) : messages.success, { variant: 'success' });
      return value;
    } catch (err) {
      this.update(id, typeof messages.error === 'function' ? messages.error(err) : messages.error, { variant: 'danger' });
      throw err;
    }
  }

  dismiss(id: number): void {
    this.toaster?.dismiss(id);
  }

  /** Fecha todas as notificações. */
  clear(): void {
    this.toaster?.clear();
  }

  /** Canto do ecrã onde aparecem as notificações. */
  setPosition(position: MxToastPosition): void {
    this.positionValue = position;
    this.toaster?.position.set(position);
  }

  private build(id: number, title: string, options: MxToastOptions): MxToastItem {
    const loading = options.loading ?? false;
    return {
      id,
      title,
      description: options.description,
      variant: options.variant ?? 'default',
      loading,
      // com acção, mais tempo para a usar; a carregar, fica até ser actualizada
      duration: loading ? 0 : (options.duration ?? (options.action ? 10000 : 5000)),
      action: options.action,
    };
  }

  private announce(item: MxToastItem): void {
    const text = [item.title, item.description, item.action ? `Acção disponível: ${item.action.label}` : '']
      .filter(Boolean)
      .join('. ');
    this.announcer.announce(text, item.variant === 'danger' ? 'assertive' : 'polite');
  }

  private ensureToaster(): MxToaster {
    if (this.toaster) return this.toaster;
    const ref = createComponent(MxToaster, { environmentInjector: this.envInjector });
    this.appRef.attachView(ref.hostView);
    document.body.appendChild(ref.location.nativeElement);
    this.toaster = ref.instance;
    this.toaster.position.set(this.positionValue);
    return this.toaster;
  }
}
