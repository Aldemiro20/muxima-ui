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

export type MxToastVariant = 'default' | 'success' | 'warning' | 'danger';

export interface MxToastOptions {
  description?: string;
  variant?: MxToastVariant;
  /** Tempo em ms até desaparecer. Pára enquanto o rato ou o foco estão na notificação. 0 = não desaparece. */
  duration?: number;
  /** Botão de acção, por exemplo "Anular". */
  action?: { label: string; run: () => void };
}

export interface MxToastItem extends Required<Pick<MxToastOptions, 'variant' | 'duration'>> {
  id: number;
  title: string;
  description?: string;
  action?: { label: string; run: () => void };
}

/** Pilha de notificações. Criada uma vez pelo MxToast; não se usa directamente. */
@Component({
  selector: 'mx-toaster',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-toaster' },
  template: `
    <section aria-label="Notificações" class="mx-toaster-region">
      <ol class="mx-toaster-list">
        @for (t of toasts(); track t.id) {
          <li
            class="mx-toast"
            [attr.data-variant]="t.variant === 'default' ? null : t.variant"
            (mouseenter)="pause(t)"
            (mouseleave)="resume(t)"
            (focusin)="pause(t)"
            (focusout)="resume(t)"
          >
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
  private readonly timers = new Map<number, { handle?: ReturnType<typeof setTimeout>; remaining: number; started: number }>();

  add(t: MxToastItem): void {
    this.toasts.update((list) => [...list, t].slice(-4));
    if (t.duration > 0) {
      this.timers.set(t.id, { remaining: t.duration, started: 0 });
      this.resume(t);
    }
  }

  dismiss(id: number): void {
    const timer = this.timers.get(id);
    if (timer?.handle) clearTimeout(timer.handle);
    this.timers.delete(id);
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  protected act(t: MxToastItem): void {
    t.action?.run();
    this.dismiss(t.id);
  }

  protected pause(t: MxToastItem): void {
    const timer = this.timers.get(t.id);
    if (!timer?.handle) return;
    clearTimeout(timer.handle);
    timer.handle = undefined;
    timer.remaining -= Date.now() - timer.started;
  }

  protected resume(t: MxToastItem): void {
    const timer = this.timers.get(t.id);
    if (!timer || timer.handle) return;
    timer.started = Date.now();
    timer.handle = setTimeout(() => this.dismiss(t.id), Math.max(timer.remaining, 1000));
  }
}

/**
 * Notificações temporárias. O texto é anunciado pelo leitor de ecrã (educado,
 * ou imediato em `danger`) e a contagem pára enquanto o rato ou o foco estão na notificação.
 *
 * ```ts
 * const toast = inject(MxToast);
 * toast.show('Factura enviada', { variant: 'success', description: 'FT 2026/0142 para Kianda Logística.' });
 * toast.show('Cliente eliminado', { action: { label: 'Anular', run: () => repor() } });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MxToast {
  private readonly appRef = inject(ApplicationRef);
  private readonly envInjector = inject(EnvironmentInjector);
  private readonly announcer = inject(LiveAnnouncer);
  private toaster?: MxToaster;
  private nextId = 1;

  show(title: string, options: MxToastOptions = {}): number {
    const toaster = this.ensureToaster();
    const variant = options.variant ?? 'default';
    const item: MxToastItem = {
      id: this.nextId++,
      title,
      description: options.description,
      variant,
      // com acção, mais tempo para a usar
      duration: options.duration ?? (options.action ? 10000 : 5000),
      action: options.action,
    };
    toaster.add(item);
    const text = [title, options.description, options.action ? `Acção disponível: ${options.action.label}` : '']
      .filter(Boolean)
      .join('. ');
    this.announcer.announce(text, variant === 'danger' ? 'assertive' : 'polite');
    return item.id;
  }

  dismiss(id: number): void {
    this.toaster?.dismiss(id);
  }

  private ensureToaster(): MxToaster {
    if (this.toaster) return this.toaster;
    const ref = createComponent(MxToaster, { environmentInjector: this.envInjector });
    this.appRef.attachView(ref.hostView);
    document.body.appendChild(ref.location.nativeElement);
    this.toaster = ref.instance;
    return this.toaster;
  }
}
