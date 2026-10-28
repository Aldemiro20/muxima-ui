import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  model,
  numberAttribute,
  signal,
  viewChild,
} from '@angular/core';
import { injectMxMessages } from '@muxima-ui/core/i18n';

/** Um diapositivo. O carrossel dá-lhe o nome "2 de 5" e tira do teclado os que não se vêem. */
@Component({
  selector: 'mx-carousel-slide',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-carousel-slide',
    role: 'group',
    '[attr.aria-roledescription]': 'carousel.i18n().carousel.slide',
    '[attr.aria-label]': 'label() || carousel.slideLabel(index())',
    '[attr.inert]': 'carousel.isVisible(index()) ? null : ""',
    '[attr.aria-hidden]': 'carousel.isVisible(index()) ? null : "true"',
  },
  template: `<ng-content />`,
})
export class MxCarouselSlide {
  /** Nome próprio do diapositivo; por omissão "2 de 5". */
  readonly label = input('');
  protected readonly carousel = inject(forwardRef(() => MxCarousel));
  readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  protected readonly index = computed(() => this.carousel.slides().indexOf(this));
}

/**
 * Carrossel acessível (padrão WAI-ARIA Carousel): botões anterior e seguinte, indicadores,
 * deslizar com o dedo (scroll nativo com snap) e, opcionalmente, rotação automática com
 * botão de pausa. A rotação pára com o rato ou o foco dentro e não arranca com
 * "reduzir movimento" activo.
 *
 * ```html
 * <mx-carousel aria-label="Novidades" [perView]="1" [autoplay]="6000">
 *   <mx-carousel-slide>...</mx-carousel-slide>
 *   <mx-carousel-slide>...</mx-carousel-slide>
 * </mx-carousel>
 * ```
 */
@Component({
  selector: 'mx-carousel',
  exportAs: 'mxCarousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-carousel',
    role: 'region',
    '[attr.aria-roledescription]': 'i18n().carousel.carousel',
    '[attr.data-indicators]': 'indicators() ? "" : null',
    '[style.--mx-carousel-per-view]': 'perView()',
    '[style.--mx-carousel-gap.px]': 'gap()',
    '(mouseenter)': 'hovering.set(true)',
    '(mouseleave)': 'hovering.set(false)',
    '(focusin)': 'focused.set(true)',
    '(focusout)': 'onFocusOut($event)',
  },
  template: `
    @if (autoplay()) {
      <button
        type="button"
        class="mx-carousel-play"
        [attr.aria-label]="
          playing() ? i18n().carousel.pause : i18n().carousel.play
        "
        (click)="togglePlay()"
      >
        @if (playing()) {
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M5.5 3.5v9M10.5 3.5v9"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            />
          </svg>
        } @else {
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M5 3.5l7 4.5-7 4.5z" fill="currentColor" />
          </svg>
        }
      </button>
    }
    <div class="mx-carousel-viewport" #viewport (scroll)="onScroll()">
      <div class="mx-carousel-track" [attr.aria-live]="running() ? 'off' : 'polite'">
        <ng-content />
      </div>
    </div>
    @if (controls() || indicators()) {
      <div class="mx-carousel-nav">
        @if (controls()) {
          <button
            type="button"
            class="mx-carousel-button mx-carousel-prev"
            [disabled]="!loop() && index() === 0"
            [attr.aria-label]="prevLabel() ?? i18n().carousel.previous"
            (click)="prev()"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M10 4L6 8l4 4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        }
        @if (indicators()) {
          <div class="mx-carousel-dots" role="group" [attr.aria-label]="i18n().carousel.choose">
            @for (p of pages(); track p) {
              <button
                type="button"
                class="mx-carousel-dot"
                [attr.aria-label]="i18n().carousel.goTo(p + 1)"
                [attr.aria-current]="p === index() ? 'true' : null"
                (click)="go(p)"
              ></button>
            }
          </div>
        }
        @if (controls()) {
          <button
            type="button"
            class="mx-carousel-button mx-carousel-next"
            [disabled]="!loop() && index() >= lastIndex()"
            [attr.aria-label]="nextLabel() ?? i18n().carousel.next"
            (click)="next()"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M6 4l4 4-4 4"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        }
      </div>
    }
  `,
})
export class MxCarousel {
  /** Índice do primeiro diapositivo visível. */
  readonly index = model(0);
  /** Diapositivos visíveis de cada vez. */
  readonly perView = input(1, { transform: numberAttribute });
  /** Espaço entre diapositivos, em px. */
  readonly gap = input(16, { transform: numberAttribute });
  /** Ms entre diapositivos; 0 = sem rotação automática. */
  readonly autoplay = input(0, { transform: numberAttribute });
  /** Depois do último volta ao primeiro. */
  readonly loop = input(false, { transform: booleanAttribute });
  readonly indicators = input(true, { transform: booleanAttribute });
  /** Botões anterior e seguinte. Sem eles, dá à pessoa outra forma de mudar ([(index)]). */
  readonly controls = input(true, { transform: booleanAttribute });
  readonly prevLabel = input<string>();
  readonly nextLabel = input<string>();
  readonly i18n = injectMxMessages();

  readonly slides = contentChildren(MxCarouselSlide);
  private readonly viewport = viewChild.required<ElementRef<HTMLElement>>('viewport');
  private readonly reducedMotion =
    typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

  protected readonly hovering = signal(false);
  protected readonly focused = signal(false);
  /** Rotação ligada pela pessoa (botão de pausa). */
  readonly playing = signal(true);
  /** A rodar agora: ligada, sem rato nem foco dentro, e sem reduzir movimento. */
  protected readonly running = computed(
    () =>
      !!this.autoplay() &&
      this.playing() &&
      !this.hovering() &&
      !this.focused() &&
      !this.reducedMotion,
  );
  protected readonly lastIndex = computed(() => Math.max(0, this.slides().length - this.perView()));
  protected readonly pages = computed(() =>
    Array.from({ length: this.lastIndex() + 1 }, (_, i) => i),
  );
  private scrollFrame = 0;
  private scrolling = false;
  /** O índice mudou porque a pessoa deslizou: não volta a mexer no scroll. */
  private fromScroll = false;
  private readonly injector = inject(Injector);

  constructor() {
    if (this.reducedMotion) this.playing.set(false);
    effect((onCleanup) => {
      if (!this.running()) return;
      const t = setInterval(() => this.next(true), this.autoplay());
      onCleanup(() => clearInterval(t));
    });
    // o índice pode mudar por [(index)]: alinha o scroll
    effect(() => {
      const i = this.index();
      if (this.fromScroll) {
        this.fromScroll = false;
        return;
      }
      if (!this.scrolling)
        afterNextRender(() => this.scrollTo(i, false), { injector: this.injector });
    });
    inject(DestroyRef).onDestroy(() => cancelAnimationFrame(this.scrollFrame));
  }

  slideLabel(i: number): string {
    return this.i18n().carousel.position(i + 1, this.slides().length);
  }
  isVisible(i: number): boolean {
    const start = this.index();
    return i >= start && i < start + this.perView();
  }

  go(i: number): void {
    const target = Math.min(Math.max(i, 0), this.lastIndex());
    this.index.set(target);
    this.scrollTo(target, true);
  }
  next(auto = false): void {
    if (this.index() >= this.lastIndex()) {
      if (this.loop() || auto) this.go(0);
      return;
    }
    this.go(this.index() + 1);
  }
  prev(): void {
    if (this.index() === 0) {
      if (this.loop()) this.go(this.lastIndex());
      return;
    }
    this.go(this.index() - 1);
  }
  togglePlay(): void {
    this.playing.update((p) => !p);
  }

  protected onFocusOut(event: FocusEvent): void {
    const host = this.viewport().nativeElement.parentElement!;
    if (!host.contains(event.relatedTarget as Node)) this.focused.set(false);
  }

  private scrollTo(i: number, smooth: boolean): void {
    const vp = this.viewport().nativeElement;
    const slide = this.slides()[i]?.el;
    if (!slide) return;
    this.scrolling = true;
    const first = this.slides()[0].el;
    const left = slide.offsetLeft - first.offsetLeft;
    if (typeof vp.scrollTo === 'function')
      vp.scrollTo({ left, behavior: smooth && !this.reducedMotion ? 'smooth' : 'auto' });
    else vp.scrollLeft = left;
    setTimeout(() => (this.scrolling = false), smooth ? 450 : 0);
  }

  protected onScroll(): void {
    if (this.scrolling) return;
    cancelAnimationFrame(this.scrollFrame);
    this.scrollFrame = requestAnimationFrame(() => {
      const vp = this.viewport().nativeElement;
      const slides = this.slides();
      if (!slides.length) return;
      const step =
        slides.length > 1 ? slides[1].el.offsetLeft - slides[0].el.offsetLeft : vp.clientWidth;
      const i = Math.min(Math.round(vp.scrollLeft / step), this.lastIndex());
      if (i !== this.index()) {
        this.fromScroll = true;
        this.index.set(i);
      }
    });
  }
}
