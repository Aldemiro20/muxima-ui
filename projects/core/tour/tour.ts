import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Directive,
  ElementRef,
  Injectable,
  InjectionToken,
  Injector,
  NgZone,
  TemplateRef,
  ViewEncapsulation,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { MX_MESSAGES_EN, MxI18n } from '@muxima-ui/core/i18n';
import { NgTemplateOutlet } from '@angular/common';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import {
  OverlayRef,
  createGlobalPositionStrategy,
  createNoopScrollStrategy,
  createOverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MxButton } from '@muxima-ui/core/button';
import { mxUniqueId } from '@muxima-ui/core/form-field';

/** Onde fica o cartão em relação ao elemento destacado. */
export type MxTourPlacement = 'auto' | 'top' | 'bottom' | 'start' | 'end';

/** Nome de um `mxTourAnchor`, um elemento, ou um ElementRef. */
export type MxTourTarget = string | Element | ElementRef<Element>;

/** Contexto do modelo de conteúdo de um passo. */
export interface MxTourStepContext {
  $implicit: MxTourStep;
  index: number;
  tour: MxTourRef;
}

/** Um passo da visita guiada. */
export interface MxTourStep {
  /** Elemento a destacar. Sem alvo (ou se não existir), o cartão aparece ao centro. */
  target?: MxTourTarget | null;
  title: string;
  /** Texto do passo. */
  content?: string;
  /** Conteúdo rico, em vez de `content`. */
  template?: TemplateRef<MxTourStepContext>;
  placement?: MxTourPlacement;
  /** Espaço à volta do elemento destacado, em px. Por omissão 6. */
  padding?: number;
  /** Corre antes de mostrar o passo (ex.: abrir um separador). Pode devolver uma Promise. */
  beforeShow?: () => void | Promise<unknown>;
}

export interface MxTourLabels {
  next: string;
  previous: string;
  done: string;
  skip: string;
  close: string;
  /** Texto do progresso, por exemplo "Passo 2 de 5". */
  progress: (current: number, total: number) => string;
}

export interface MxTourOptions {
  /** Passo inicial (base 0). */
  startAt?: number;
  labels?: Partial<MxTourLabels>;
  /** false: sem Saltar, sem botão de fechar e sem Escape (a visita tem de ser feita até ao fim). */
  dismissible?: boolean;
  /** Mostra os pontos de progresso. Por omissão true. */
  showDots?: boolean;
}

/** Como terminou a visita. */
export interface MxTourResult {
  /** true se chegou ao fim com Concluir. */
  completed: boolean;
  /** Último passo mostrado (base 0). */
  index: number;
}

/** Referência a uma visita em curso. */
export class MxTourRef {
  /** Passo actual (base 0). */
  readonly index = signal(0);
  /** Resolve quando a visita fecha. */
  readonly afterClosed: Promise<MxTourResult>;
  readonly labels: MxTourLabels;
  readonly dismissible: boolean;
  readonly showDots: boolean;
  private resolve!: (r: MxTourResult) => void;
  private done = false;

  constructor(
    readonly steps: readonly MxTourStep[],
    options: MxTourOptions,
    private readonly onClose: (r: MxTourResult) => void,
    defaults: MxTourLabels = MX_MESSAGES_EN.tour,
  ) {
    this.labels = { ...defaults, ...options.labels };
    this.dismissible = options.dismissible ?? true;
    this.showDots = options.showDots ?? true;
    this.index.set(Math.min(Math.max(options.startAt ?? 0, 0), Math.max(steps.length - 1, 0)));
    this.afterClosed = new Promise((r) => (this.resolve = r));
  }

  get isOpen(): boolean {
    return !this.done;
  }
  get isLast(): boolean {
    return this.index() === this.steps.length - 1;
  }

  next(): void {
    if (this.isLast) this.close(true);
    else this.goTo(this.index() + 1);
  }
  previous(): void {
    this.goTo(this.index() - 1);
  }
  goTo(index: number): void {
    if (this.done || index < 0 || index >= this.steps.length) return;
    this.index.set(index);
  }
  /** Fecha a visita; `completed` diz se foi até ao fim. */
  close(completed = false): void {
    if (this.done) return;
    this.done = true;
    const result = { completed, index: this.index() };
    this.onClose(result);
    this.resolve(result);
  }
}

const MX_TOUR_REF = new InjectionToken<MxTourRef>('MX_TOUR_REF');

interface Box {
  top: number;
  left: number;
  width: number;
  height: number;
}

/** requestAnimationFrame, ou um setTimeout onde não exista (testes, SSR). */
const nextFrame = (cb: () => void): number =>
  typeof requestAnimationFrame === 'function' ? requestAnimationFrame(cb) : (setTimeout(cb, 16) as unknown as number);
const cancelFrame = (id: number): void =>
  typeof cancelAnimationFrame === 'function' ? cancelAnimationFrame(id) : clearTimeout(id);

const GAP = 12;
const MARGIN = 12;

/** Painel da visita: o destaque, o fundo escurecido e o cartão do passo. Uso interno. */
@Component({
  selector: 'mx-tour-panel',
  imports: [NgTemplateOutlet, CdkTrapFocus, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'mx-tour-layer' },
  template: `
    @if (spot(); as s) {
      <div
        class="mx-tour-spotlight"
        aria-hidden="true"
        [style.top.px]="s.top"
        [style.left.px]="s.left"
        [style.width.px]="s.width"
        [style.height.px]="s.height"
      ></div>
    } @else {
      <div class="mx-tour-dim" aria-hidden="true"></div>
    }
    @if (step(); as st) {
      <div
        #card
        class="mx-tour-card"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        cdkTrapFocus
        [attr.aria-labelledby]="titleId"
        [attr.aria-describedby]="progressId + ' ' + bodyId"
        [attr.data-placement]="spot() ? placement() : 'center'"
        [style.top.px]="spot() ? pos().top : null"
        [style.left.px]="spot() ? pos().left : null"
        [style.visibility]="ready() ? null : 'hidden'"
        (keydown)="onKeydown($event)"
      >
        <div class="mx-tour-head">
          <p class="mx-tour-progress" [id]="progressId">
            {{ ref.labels.progress(ref.index() + 1, ref.steps.length) }}
          </p>
          @if (ref.dismissible) {
            <button
              type="button"
              class="mx-tour-close"
              [attr.aria-label]="ref.labels.close"
              (click)="ref.close(false)"
            >
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 4l8 8M12 4l-8 8"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          }
        </div>
        <h2 class="mx-tour-title" [id]="titleId">{{ st.title }}</h2>
        <div class="mx-tour-body" [id]="bodyId">
          @if (st.template) {
            <ng-container
              *ngTemplateOutlet="st.template; context: { $implicit: st, index: ref.index(), tour: ref }"
            />
          } @else if (st.content) {
            <p>{{ st.content }}</p>
          }
        </div>
        <div class="mx-tour-foot">
          @if (ref.showDots && ref.steps.length > 1) {
            <span class="mx-tour-dots" aria-hidden="true">
              @for (s of ref.steps; track $index) {
                <span class="mx-tour-dot" [attr.data-active]="$index === ref.index() ? '' : null"></span>
              }
            </span>
          }
          <span class="mx-tour-actions">
            @if (ref.dismissible && !ref.isLast) {
              <button mxButton variant="ghost" size="sm" type="button" (click)="ref.close(false)">
                {{ ref.labels.skip }}
              </button>
            }
            @if (ref.index() > 0) {
              <button mxButton variant="outline" size="sm" type="button" (click)="ref.previous()">
                {{ ref.labels.previous }}
              </button>
            }
            <button mxButton size="sm" type="button" (click)="ref.next()">
              {{ ref.isLast ? ref.labels.done : ref.labels.next }}
            </button>
          </span>
        </div>
      </div>
    }
  `,
})
export class MxTourPanel {
  protected readonly ref = inject(MX_TOUR_REF);
  private readonly tour = inject(MxTour);

  protected readonly titleId = mxUniqueId('mx-tour-title');
  protected readonly bodyId = mxUniqueId('mx-tour-body');
  protected readonly progressId = mxUniqueId('mx-tour-progress');

  private readonly card = viewChild<ElementRef<HTMLElement>>('card');
  private readonly zone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);

  /** Passo que está desenhado (muda depois de beforeShow). */
  protected readonly step = signal<MxTourStep | null>(null);
  private readonly target = signal<Element | null>(null);
  protected readonly spot = signal<Box | null>(null);
  protected readonly pos = signal({ top: 0, left: 0 });
  protected readonly placement = signal<Exclude<MxTourPlacement, 'auto'>>('bottom');
  protected readonly ready = signal(false);

  private frame = 0;
  private resizeObserver?: ResizeObserver;
  private showToken = 0;

  constructor() {
    const destroy = inject(DestroyRef);
    // mostra o passo sempre que o índice muda
    effect(() => {
      const i = this.ref.index();
      untracked(() => void this.show(i));
    });

    afterNextRender(() => {
      const schedule = () => this.schedule();
      this.zone.runOutsideAngular(() => {
        window.addEventListener('scroll', schedule, { capture: true, passive: true });
        window.addEventListener('resize', schedule, { passive: true });
      });
      if (typeof ResizeObserver !== 'undefined') this.resizeObserver = new ResizeObserver(schedule);
      destroy.onDestroy(() => {
        window.removeEventListener('scroll', schedule, { capture: true });
        window.removeEventListener('resize', schedule);
        this.resizeObserver?.disconnect();
        cancelFrame(this.frame);
      });
    });
  }

  private async show(index: number): Promise<void> {
    const token = ++this.showToken;
    const st = this.ref.steps[index];
    if (!st) return;
    // só se esconde antes do primeiro passo (para o posicionar); depois, esconder
    // o cartão tirava-lhe o foco a meio da visita
    if (!this.step()) this.ready.set(false);
    try {
      await st.beforeShow?.();
    } catch {
      // um beforeShow que falha não deve prender a visita
    }
    // espera um frame para o DOM reflectir o que beforeShow mudou
    await new Promise<void>((r) => nextFrame(r));
    if (token !== this.showToken || !this.ref.isOpen) return;

    // o alvo pode só aparecer depois de beforeShow (ex.: conteúdo de um separador)
    let el = this.tour.resolve(st.target);
    for (let i = 0; !el && st.target && i < 5; i++) {
      await new Promise<void>((r) => nextFrame(r));
      if (token !== this.showToken || !this.ref.isOpen) return;
      el = this.tour.resolve(st.target);
    }
    this.resizeObserver?.disconnect();
    this.target.set(el);
    if (el) {
      this.resizeObserver?.observe(el);
      const r = el.getBoundingClientRect();
      const fora = r.top < 0 || r.bottom > window.innerHeight || r.left < 0 || r.right > window.innerWidth;
      if (fora) {
        const reduzir = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        el.scrollIntoView?.({ block: 'center', inline: 'nearest', behavior: reduzir ? 'auto' : 'smooth' });
      }
    }
    this.step.set(st);
    // desenha já o cartão para o medir, posicionar e dar-lhe o foco
    this.cdr.detectChanges();
    const card = this.card()?.nativeElement;
    if (card) this.resizeObserver?.observe(card);
    this.update();
    this.ready.set(true);
    this.cdr.detectChanges();
    card?.focus({ preventScroll: true });
  }

  private schedule(): void {
    cancelFrame(this.frame);
    this.frame = nextFrame(() => this.zone.run(() => this.update()));
  }

  private update(): void {
    const st = this.step();
    const el = this.target();
    const r = el?.getBoundingClientRect();
    if (!st || !r || (r.width === 0 && r.height === 0)) {
      this.spot.set(null);
      return;
    }
    const pad = st.padding ?? 6;
    const spot: Box = { top: r.top - pad, left: r.left - pad, width: r.width + pad * 2, height: r.height + pad * 2 };
    this.spot.set(spot);

    const card = this.card()?.nativeElement;
    const cw = card?.offsetWidth ?? 320;
    const ch = card?.offsetHeight ?? 160;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const rtl = getComputedStyle(document.documentElement).direction === 'rtl';
    const side = (p: Exclude<MxTourPlacement, 'auto'>): Exclude<MxTourPlacement, 'auto'> =>
      rtl && (p === 'start' || p === 'end') ? (p === 'start' ? 'end' : 'start') : p;

    const fits: Record<Exclude<MxTourPlacement, 'auto'>, boolean> = {
      bottom: spot.top + spot.height + GAP + ch <= vh - MARGIN,
      top: spot.top - GAP - ch >= MARGIN,
      end: spot.left + spot.width + GAP + cw <= vw - MARGIN,
      start: spot.left - GAP - cw >= MARGIN,
    };
    const wanted = st.placement && st.placement !== 'auto' ? side(st.placement) : null;
    const order: Exclude<MxTourPlacement, 'auto'>[] = wanted
      ? [wanted, 'bottom', 'top', 'end', 'start']
      : ['bottom', 'top', 'end', 'start'];
    const p = order.find((o) => fits[o]) ?? 'bottom';

    let top: number;
    let left: number;
    if (p === 'bottom' || p === 'top') {
      top = p === 'bottom' ? spot.top + spot.height + GAP : spot.top - GAP - ch;
      left = spot.left + spot.width / 2 - cw / 2;
    } else {
      left = p === 'end' ? spot.left + spot.width + GAP : spot.left - GAP - cw;
      top = spot.top + spot.height / 2 - ch / 2;
    }
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), Math.max(min, max));
    this.placement.set(rtl && (p === 'start' || p === 'end') ? (p === 'start' ? 'end' : 'start') : p);
    this.pos.set({ top: clamp(top, MARGIN, vh - ch - MARGIN), left: clamp(left, MARGIN, vw - cw - MARGIN) });
  }

  protected onKeydown(event: KeyboardEvent): void {
    const t = event.target as HTMLElement;
    const editavel = t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName);
    if (event.key === 'Escape' && this.ref.dismissible) {
      event.preventDefault();
      event.stopPropagation();
      this.ref.close(false);
    } else if (!editavel && event.key === 'ArrowRight' && !this.ref.isLast) {
      event.preventDefault();
      this.ref.next();
    } else if (!editavel && event.key === 'ArrowLeft' && this.ref.index() > 0) {
      event.preventDefault();
      this.ref.previous();
    }
  }
}

/**
 * Visita guiada: destaca elementos da página, um passo de cada vez, com um cartão
 * que explica cada um. O cartão é um diálogo modal: o foco fica nele, Escape fecha
 * e, no fim, o foco volta para onde estava.
 *
 * ```html
 * <input mxInput mxTourAnchor="pesquisa" aria-label="Pesquisar" />
 * <button mxButton mxTourAnchor="nova">Nova factura</button>
 * ```
 *
 * ```ts
 * private readonly tour = inject(MxTour);
 * mostrar() {
 *   this.tour.start([
 *     { title: 'Bem-vindo', content: 'Mostramos o essencial em 2 passos.' },
 *     { target: 'pesquisa', title: 'Pesquisa', content: 'Procura clientes e facturas.' },
 *     { target: 'nova', title: 'Nova factura', content: 'Começa aqui.' },
 *   ]).afterClosed.then((r) => r.completed && guardarQueViu());
 * }
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MxTour {
  private readonly injector = inject(Injector);
  private readonly i18n = inject(MxI18n);
  private readonly anchors = new Map<string, Element>();
  private overlayRef?: OverlayRef;
  /** A visita em curso, ou null. */
  readonly active = signal<MxTourRef | null>(null);
  readonly isOpen = computed(() => !!this.active());

  /** Começa uma visita. Se já houver uma aberta, fecha-a primeiro. */
  start(steps: readonly MxTourStep[], options: MxTourOptions = {}): MxTourRef {
    this.active()?.close(false);
    const before = document.activeElement as HTMLElement | null;
    const ref = new MxTourRef(
      steps,
      options,
      () => {
        this.overlayRef?.dispose();
        this.overlayRef = undefined;
        this.active.set(null);
        if (before && before.isConnected) before.focus({ preventScroll: true });
      },
      this.i18n.messages().tour,
    );
    if (!steps.length) {
      ref.close(true);
      return ref;
    }
    this.overlayRef = createOverlayRef(this.injector, {
      positionStrategy: createGlobalPositionStrategy(this.injector).top('0').left('0'),
      scrollStrategy: createNoopScrollStrategy(),
      width: '100%',
      height: '100%',
      panelClass: 'mx-tour-pane',
    });
    const injector = Injector.create({
      providers: [{ provide: MX_TOUR_REF, useValue: ref }],
      parent: this.injector,
    });
    this.overlayRef.attach(new ComponentPortal(MxTourPanel, null, injector));
    this.active.set(ref);
    return ref;
  }

  /** Regista um elemento com um nome (usado por `mxTourAnchor`). */
  register(name: string, element: Element): void {
    this.anchors.set(name, element);
  }
  unregister(name: string, element: Element): void {
    if (this.anchors.get(name) === element) this.anchors.delete(name);
  }

  /** Encontra o elemento de um alvo: nome de âncora, selector CSS, elemento ou ElementRef. */
  resolve(target: MxTourTarget | null | undefined): Element | null {
    if (!target) return null;
    if (target instanceof ElementRef) return target.nativeElement;
    if (typeof target !== 'string') return target;
    return this.anchors.get(target) ?? safeQuery(target);
  }
}

function safeQuery(selector: string): Element | null {
  try {
    return document.querySelector(selector);
  } catch {
    return null;
  }
}

/** Dá um nome a um elemento para ser alvo de um passo: `mxTourAnchor="pesquisa"`. */
@Directive({ selector: '[mxTourAnchor]', exportAs: 'mxTourAnchor' })
export class MxTourAnchor {
  readonly name = input.required<string>({ alias: 'mxTourAnchor' });
  private readonly tour = inject(MxTour);
  private readonly el = inject<ElementRef<Element>>(ElementRef).nativeElement;

  constructor() {
    effect((onCleanup) => {
      const name = this.name();
      this.tour.register(name, this.el);
      onCleanup(() => this.tour.unregister(name, this.el));
    });
  }
}
