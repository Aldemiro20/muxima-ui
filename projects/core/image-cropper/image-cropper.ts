import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  numberAttribute,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { mxUniqueId } from '@muxima-ui/core/form-field';
import { MxCropHandle, MxRect, mxCenteredRect, mxClampRect, mxResizeRect } from './crop-math';

/** Área recortada em píxeis da imagem original, com a rotação aplicada antes. */
export interface MxCropArea extends MxRect {
  rotation: number;
}

const HANDLES: MxCropHandle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];

/**
 * Recortar uma imagem antes de a enviar: arrastar a área, redimensionar pelos cantos,
 * zoom e rodar. Com teclado: setas movem a área, Alt + setas mudam o tamanho (Shift para
 * passos maiores); cada mudança é anunciada.
 *
 * ```html
 * <mx-image-cropper #c [src]="ficheiro" [aspectRatio]="1" round />
 * <button mxButton (click)="c.toBlob().then(enviar)">Guardar</button>
 * ```
 *
 * `src` aceita um URL ou um File. `toBlob()` devolve a imagem recortada na resolução original.
 */
@Component({
  selector: 'mx-image-cropper',
  exportAs: 'mxImageCropper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-image-cropper',
    '[attr.data-round]': 'round() ? "" : null',
    '[attr.aria-label]': 'null',
  },
  template: `
    <div class="mx-cropper-stage" #stage [style.height]="height()">
      @if (url()) {
        <img
          #img
          class="mx-cropper-image"
          [src]="url()"
          [alt]="alt()"
          draggable="false"
          [style.width.px]="natural().w"
          [style.height.px]="natural().h"
          [style.transform]="
            'translate(-50%, -50%) rotate(' + rotation() + 'deg) scale(' + scale() + ')'
          "
          (load)="onLoad()"
        />
      }
      @if (ready()) {
        <div
          class="mx-cropper-box"
          role="group"
          tabindex="0"
          aria-roledescription="área de recorte"
          [attr.aria-label]="boxLabel()"
          [attr.aria-describedby]="helpId"
          [style.left.px]="box().x"
          [style.top.px]="box().y"
          [style.width.px]="box().width"
          [style.height.px]="box().height"
          (pointerdown)="startMove($event)"
          (keydown)="onKeydown($event)"
        >
          <span class="mx-cropper-grid" aria-hidden="true"></span>
          @for (h of handles; track h) {
            <span
              class="mx-cropper-handle"
              [attr.data-handle]="h"
              aria-hidden="true"
              (pointerdown)="startResize($event, h)"
            ></span>
          }
        </div>
      }
    </div>
    <p class="mx-visually-hidden" [id]="helpId">{{ helpText() }}</p>
    @if (controls()) {
      <div class="mx-cropper-controls">
        <label class="mx-cropper-zoom">
          <span>{{ zoomText() }}</span>
          <input
            type="range"
            class="mx-slider"
            min="1"
            max="4"
            step="0.05"
            [value]="zoom()"
            [disabled]="!ready()"
            [attr.aria-valuetext]="zoomPct() + '%'"
            (input)="setZoom($any($event.target).valueAsNumber)"
          />
        </label>
        <button
          type="button"
          class="mx-cropper-button"
          [disabled]="!ready()"
          [attr.aria-label]="rotateLeftText()"
          (click)="rotate(-90)"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M3.5 6.5a5 5 0 1 1 .8 5.2M3.5 2.5v4h4"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          class="mx-cropper-button"
          [disabled]="!ready()"
          [attr.aria-label]="rotateRightText()"
          (click)="rotate(90)"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M12.5 6.5a5 5 0 1 0-.8 5.2M12.5 2.5v4h-4"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          class="mx-cropper-button mx-cropper-reset"
          [disabled]="!ready()"
          (click)="reset()"
        >
          {{ resetText() }}
        </button>
      </div>
    }
    <span class="mx-visually-hidden" aria-live="polite">{{ live() }}</span>
  `,
})
export class MxImageCropper {
  readonly src = input<string | File | Blob | null>(null);
  readonly alt = input('Imagem a recortar');
  /** Largura / altura da área (1 = quadrado, 16/9...). null = livre. */
  readonly aspectRatio = input<number | null>(null);
  /** Máscara redonda (fotografias de perfil). toBlob devolve PNG com cantos transparentes. */
  readonly round = input(false, { transform: booleanAttribute });
  readonly controls = input(true, { transform: booleanAttribute });
  readonly height = input('320px');
  /** Tamanho mínimo da área no ecrã, em px. */
  readonly minSize = input(40, { transform: numberAttribute });
  readonly zoom = model(1);
  readonly rotation = model(0);
  readonly helpText = input(
    'Setas movem a área. Alt e setas mudam o tamanho. Shift dá passos maiores.',
  );
  readonly zoomText = input('Zoom');
  readonly rotateLeftText = input('Rodar para a esquerda');
  readonly rotateRightText = input('Rodar para a direita');
  readonly resetText = input('Repor');
  /** Área recortada em píxeis da imagem original. */
  readonly areaChange = output<MxCropArea>();

  private readonly stage = viewChild.required<ElementRef<HTMLElement>>('stage');
  private readonly img = viewChild<ElementRef<HTMLImageElement>>('img');
  private readonly announcer = inject(LiveAnnouncer);
  protected readonly helpId = mxUniqueId('mx-cropper-help');
  protected readonly handles = HANDLES;

  protected readonly url = signal<string | null>(null);
  protected readonly natural = signal({ w: 0, h: 0 });
  private readonly stageSize = signal({ w: 0, h: 0 });
  protected readonly ready = signal(false);
  readonly box = signal<MxRect>({ x: 0, y: 0, width: 0, height: 0 });
  protected readonly live = signal('');
  private objectUrl: string | null = null;
  private liveTimer?: ReturnType<typeof setTimeout>;

  /** Escala que faz a imagem caber no palco, vezes o zoom. */
  private readonly fit = computed(() => {
    const { w, h } = this.natural();
    const s = this.stageSize();
    if (!w || !h || !s.w || !s.h) return 1;
    const turned = Math.abs(this.rotation()) % 180 === 90;
    const iw = turned ? h : w;
    const ih = turned ? w : h;
    return Math.min(s.w / iw, s.h / ih);
  });
  protected readonly scale = computed(() => this.fit() * this.zoom());
  protected readonly zoomPct = computed(() => Math.round(this.zoom() * 100));

  /** Rectângulo da imagem no palco (onde a área pode estar). */
  private readonly bounds = computed<MxRect>(() => {
    const { w, h } = this.natural();
    const s = this.stageSize();
    const turned = Math.abs(this.rotation()) % 180 === 90;
    const iw = (turned ? h : w) * this.scale();
    const ih = (turned ? w : h) * this.scale();
    const bw = Math.min(iw, s.w);
    const bh = Math.min(ih, s.h);
    return { x: (s.w - bw) / 2, y: (s.h - bh) / 2, width: bw, height: bh };
  });

  /** Área em píxeis da imagem (rodada). */
  readonly area = computed<MxCropArea>(() => {
    const b = this.box();
    const s = this.stageSize();
    const k = 1 / this.scale();
    const turned = Math.abs(this.rotation()) % 180 === 90;
    const iw = (turned ? this.natural().h : this.natural().w) * this.scale();
    const ih = (turned ? this.natural().w : this.natural().h) * this.scale();
    const ox = (s.w - iw) / 2;
    const oy = (s.h - ih) / 2;
    return {
      x: Math.round((b.x - ox) * k),
      y: Math.round((b.y - oy) * k),
      width: Math.round(b.width * k),
      height: Math.round(b.height * k),
      rotation: this.rotation(),
    };
  });

  protected readonly boxLabel = computed(() => {
    const a = this.area();
    return `${a.width} por ${a.height} píxeis`;
  });

  constructor() {
    effect(() => {
      const src = this.src();
      this.ready.set(false);
      if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
      if (!src) {
        this.url.set(null);
        return;
      }
      if (typeof src === 'string') this.url.set(src);
      else {
        this.objectUrl = URL.createObjectURL(src);
        this.url.set(this.objectUrl);
      }
    });
    // mantém a área dentro da imagem quando o zoom ou a rotação mudam
    effect(() => {
      const b = this.bounds();
      if (!this.ready()) return;
      const current = untracked(() => this.box());
      const next = mxClampRect(current, b);
      if (
        next.x !== current.x ||
        next.y !== current.y ||
        next.width !== current.width ||
        next.height !== current.height
      ) {
        untracked(() => this.box.set(next));
      }
    });
    effect(() => {
      if (this.ready()) this.areaChange.emit(this.area());
    });
    const ro =
      typeof ResizeObserver === 'function' ? new ResizeObserver(() => this.measure()) : null;
    queueMicrotask(() => ro?.observe(this.stage().nativeElement));
    inject(DestroyRef).onDestroy(() => {
      ro?.disconnect();
      if (this.objectUrl) URL.revokeObjectURL(this.objectUrl);
      clearTimeout(this.liveTimer);
    });
  }

  private measure(): void {
    const r = this.stage().nativeElement.getBoundingClientRect();
    this.stageSize.set({ w: r.width, h: r.height });
  }

  protected onLoad(): void {
    const el = this.img()!.nativeElement;
    this.natural.set({ w: el.naturalWidth, h: el.naturalHeight });
    this.measure();
    this.ready.set(true);
    this.reset();
  }

  /** Volta ao zoom 1, sem rotação, área centrada. */
  reset(): void {
    this.zoom.set(1);
    this.rotation.set(0);
    queueMicrotask(() => this.box.set(mxCenteredRect(this.bounds(), this.aspectRatio())));
  }
  setZoom(z: number): void {
    const prev = this.box();
    this.zoom.set(Math.min(Math.max(z, 1), 4));
    this.box.set(mxClampRect(prev, this.bounds()));
  }
  rotate(deg: number): void {
    this.rotation.update((r) => (r + deg + 360) % 360);
    this.box.set(mxCenteredRect(this.bounds(), this.aspectRatio()));
    this.say(`Rodada ${this.rotation()} graus`);
  }

  private say(text: string): void {
    clearTimeout(this.liveTimer);
    this.liveTimer = setTimeout(() => this.live.set(text), 250);
  }

  protected onKeydown(e: KeyboardEvent): void {
    const step = e.shiftKey ? 10 : 1;
    const d: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const m = d[e.key];
    if (!m) return;
    e.preventDefault();
    const b = this.box();
    if (e.altKey) {
      // Alt: muda o tamanho a partir do canto inferior direito
      this.box.set(
        mxResizeRect(
          b,
          'se',
          m[0],
          m[1] || (this.aspectRatio() ? m[0] / this.aspectRatio()! : 0),
          this.bounds(),
          this.aspectRatio(),
          this.minSize(),
        ),
      );
    } else {
      this.box.set(mxClampRect({ ...b, x: b.x + m[0], y: b.y + m[1] }, this.bounds()));
    }
    const a = this.area();
    this.say(`${a.width} por ${a.height} píxeis, a ${a.x} da esquerda e ${a.y} do topo`);
  }

  private drag(e: PointerEvent, apply: (dx: number, dy: number, start: MxRect) => MxRect): void {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    const start = this.box();
    const sx = e.clientX;
    const sy = e.clientY;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture?.(e.pointerId);
    const move = (ev: PointerEvent) => this.box.set(apply(ev.clientX - sx, ev.clientY - sy, start));
    const up = () => {
      target.removeEventListener('pointermove', move);
      target.removeEventListener('pointerup', up);
    };
    target.addEventListener('pointermove', move);
    target.addEventListener('pointerup', up);
  }
  protected startMove(e: PointerEvent): void {
    (e.currentTarget as HTMLElement).focus();
    this.drag(e, (dx, dy, s) => mxClampRect({ ...s, x: s.x + dx, y: s.y + dy }, this.bounds()));
  }
  protected startResize(e: PointerEvent, h: MxCropHandle): void {
    this.drag(e, (dx, dy, s) =>
      mxResizeRect(s, h, dx, dy, this.bounds(), this.aspectRatio(), this.minSize()),
    );
  }

  /** Desenha o recorte num canvas na resolução original. */
  toCanvas(): HTMLCanvasElement {
    const img = this.img()?.nativeElement;
    const canvas = document.createElement('canvas');
    if (!img || !this.ready()) return canvas;
    const b = this.box();
    const s = this.stageSize();
    const k = 1 / this.scale();
    canvas.width = Math.max(1, Math.round(b.width * k));
    canvas.height = Math.max(1, Math.round(b.height * k));
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;
    if (this.round()) {
      ctx.beginPath();
      ctx.ellipse(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        canvas.height / 2,
        0,
        0,
        Math.PI * 2,
      );
      ctx.clip();
    }
    ctx.scale(k, k);
    ctx.translate(-b.x, -b.y);
    ctx.translate(s.w / 2, s.h / 2);
    ctx.rotate((this.rotation() * Math.PI) / 180);
    ctx.scale(this.scale(), this.scale());
    ctx.drawImage(img, -this.natural().w / 2, -this.natural().h / 2);
    return canvas;
  }
  /** Recorte como Blob (PNG por omissão; com `round` é sempre PNG). */
  toBlob(type = 'image/png', quality = 0.92): Promise<Blob | null> {
    const canvas = this.toCanvas();
    return new Promise((resolve) =>
      canvas.toBlob(resolve, this.round() ? 'image/png' : type, quality),
    );
  }
  toDataURL(type = 'image/png', quality = 0.92): string {
    return this.toCanvas().toDataURL(this.round() ? 'image/png' : type, quality);
  }
}
