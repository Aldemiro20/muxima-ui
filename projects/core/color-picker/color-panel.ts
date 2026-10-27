import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  effect,
  input,
  model,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { mxUniqueId } from '@muxima-ui/core/form-field';
import { MxHsva, mxColorName, mxHexToHsva, mxHsvaToHex, mxParseColor } from './color';

/** Amostra pronta: só a cor, ou cor e nome. */
export type MxColorSwatch = string | { color: string; label: string };

interface EyeDropperLike {
  open(): Promise<{ sRGBHex: string }>;
}

/**
 * Editor de cor: área de saturação e brilho, matiz, opacidade opcional, campo hex,
 * amostras e conta-gotas (quando o navegador o tem). O valor é um hex ("#1F6F78",
 * ou "#1F6F7880" com opacidade).
 *
 * ```html
 * <mx-color-panel [(value)]="cor" [swatches]="marca" />
 * ```
 *
 * Teclado na área: ← → mudam a saturação, ↑ ↓ o brilho (Shift para passos de 10).
 * A matiz e a opacidade são input range nativos.
 */
@Component({
  selector: 'mx-color-panel',
  exportAs: 'mxColorPanel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-color-panel',
    '[attr.data-disabled]': 'disabled() ? "" : null',
    '[attr.data-swatches-only]': 'swatchesOnly() ? "" : null',
    '[style.--mx-color-hue]': 'hsva().h',
    '[style.--mx-color-current]': 'hex()',
    '[style.--mx-color-opaque]': 'opaque()',
  },
  template: `
    @if (!swatchesOnly()) {
      <div class="mx-color-area" #area (pointerdown)="onAreaDown($event)">
        <div
          class="mx-color-area-thumb"
          role="slider"
          [attr.tabindex]="disabled() ? -1 : 0"
          [attr.aria-label]="areaLabel()"
          aria-valuemin="0"
          aria-valuemax="100"
          [attr.aria-valuenow]="pct(hsva().s)"
          [attr.aria-valuetext]="areaText()"
          [attr.aria-disabled]="disabled() ? 'true' : null"
          [style.left.%]="hsva().s * 100"
          [style.top.%]="(1 - hsva().v) * 100"
          (keydown)="onAreaKey($event)"
        ></div>
      </div>

      <div class="mx-color-sliders">
        <div class="mx-color-preview" aria-hidden="true"><span></span></div>
        <div class="mx-color-ranges">
          <input
            type="range"
            class="mx-color-range mx-color-hue"
            min="0"
            max="359"
            [value]="round(hsva().h)"
            [disabled]="disabled()"
            [attr.aria-label]="hueLabel()"
            [attr.aria-valuetext]="round(hsva().h) + ' graus, ' + hueName()"
            (input)="setHue($event)"
          />
          @if (alpha()) {
            <input
              type="range"
              class="mx-color-range mx-color-alpha"
              min="0"
              max="100"
              [value]="pct(hsva().a)"
              [disabled]="disabled()"
              [attr.aria-label]="alphaLabel()"
              [attr.aria-valuetext]="pct(hsva().a) + '%'"
              (input)="setAlpha($event)"
            />
          }
        </div>
        @if (eyeDropper) {
          <button
            type="button"
            class="mx-color-tool"
            [disabled]="disabled()"
            aria-label="Escolher uma cor do ecrã"
            (click)="pickFromScreen()"
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10.5 2.5l3 3-1.5 1.5-.8-.8-5.7 5.7H3.5v-2l5.7-5.7-.8-.8z"
                stroke="currentColor"
                stroke-width="1.3"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        }
      </div>
    }

    @if (showInput() && !swatchesOnly()) {
      <div class="mx-color-input-row">
        <label class="mx-color-input-label" [for]="inputId">Hex</label>
        <input
          class="mx-input mx-color-hex"
          data-size="sm"
          [id]="inputId"
          spellcheck="false"
          autocomplete="off"
          [disabled]="disabled()"
          [value]="draft() ?? hex()"
          [attr.aria-invalid]="draftInvalid() ? 'true' : null"
          (input)="onHexInput($event)"
          (blur)="draft.set(null)"
        />
      </div>
    }

    @if (swatchList().length) {
      <div class="mx-color-swatches" role="group" [attr.aria-label]="swatchesLabel()">
        @for (s of swatchList(); track s.color) {
          <button
            type="button"
            class="mx-color-swatch"
            [style.--mx-swatch]="s.color"
            [attr.aria-label]="s.label"
            [attr.aria-pressed]="s.color === hex()"
            [disabled]="disabled()"
            (click)="setHex(s.color)"
          ></button>
        }
      </div>
    }
  `,
})
export class MxColorPanel {
  readonly value = model<string | null>('#1F6F78');
  /** Mostra o controlo de opacidade e devolve hex de 8 dígitos quando < 100%. */
  readonly alpha = input(false, { transform: booleanAttribute });
  readonly swatches = input<MxColorSwatch[]>([]);
  readonly showInput = input(true, { transform: booleanAttribute });
  /** Só as amostras: uma paleta fechada, sem área nem matiz. */
  readonly swatchesOnly = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly areaLabel = input('Saturação e brilho');
  readonly hueLabel = input('Matiz');
  readonly alphaLabel = input('Opacidade');
  readonly swatchesLabel = input('Cores sugeridas');
  /** Emite ao largar o rato, escolher amostra ou terminar de escrever (para guardar). */
  readonly committed = output<string>();

  private readonly area = viewChild.required<ElementRef<HTMLElement>>('area');
  protected readonly inputId = mxUniqueId('mx-color-hex');
  protected readonly eyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;

  /** HSVA interno: guarda a matiz quando a cor é cinzenta (o hex não a tem). */
  protected readonly hsva = signal<MxHsva>(mxHexToHsva('#1F6F78'));
  protected readonly hex = computed(() => mxHsvaToHex(this.hsva()));
  protected readonly opaque = computed(() => mxHsvaToHex({ ...this.hsva(), a: 1 }));
  protected readonly draft = signal<string | null>(null);
  protected readonly draftInvalid = computed(() => !!this.draft() && !mxParseColor(this.draft()!));
  protected readonly hueName = computed(() =>
    mxColorName(mxHsvaToHex({ h: this.hsva().h, s: 1, v: 1, a: 1 })),
  );
  protected readonly areaText = computed(() => {
    const c = this.hsva();
    return `Saturação ${this.pct(c.s)}%, brilho ${this.pct(c.v)}%, ${mxColorName(this.hex())}`;
  });
  protected readonly swatchList = computed(() =>
    this.swatches().map((s) => {
      const color = mxParseColor(typeof s === 'string' ? s : s.color) ?? '#000000';
      const label =
        typeof s === 'string' ? `${mxColorName(color)}, ${color}` : `${s.label}, ${color}`;
      return { color, label };
    }),
  );

  constructor() {
    // valor de fora -> HSVA (sem perder a matiz quando é a mesma cor)
    effect(() => {
      const v = mxParseColor(this.value() ?? '');
      if (!v) return;
      if (untracked(() => this.hex()) === v) return;
      const next = mxHexToHsva(v);
      const prev = untracked(() => this.hsva());
      this.hsva.set(next.s === 0 || next.v === 0 ? { ...next, h: prev.h } : next);
    });
  }

  protected round(n: number): number {
    return Math.round(n);
  }
  protected pct(n: number): number {
    return Math.round(n * 100);
  }

  private update(next: Partial<MxHsva>, commit = false): void {
    this.hsva.update((c) => ({ ...c, ...next }));
    const hex = this.alpha() ? this.hex() : mxHsvaToHex({ ...this.hsva(), a: 1 });
    this.value.set(hex);
    if (commit) this.committed.emit(hex);
  }

  setHex(hex: string): void {
    const v = mxParseColor(hex);
    if (!v) return;
    const next = mxHexToHsva(v);
    this.hsva.set(next.s === 0 || next.v === 0 ? { ...next, h: this.hsva().h } : next);
    this.value.set(this.alpha() ? v : mxHsvaToHex({ ...this.hsva(), a: 1 }));
    this.committed.emit(this.value()!);
  }

  protected setHue(e: Event): void {
    this.update({ h: Number((e.target as HTMLInputElement).value) });
  }
  protected setAlpha(e: Event): void {
    this.update({ a: Number((e.target as HTMLInputElement).value) / 100 });
  }

  protected onHexInput(e: Event): void {
    const text = (e.target as HTMLInputElement).value;
    this.draft.set(text);
    const v = mxParseColor(text);
    if (v) this.setHex(v);
  }

  protected onAreaKey(e: KeyboardEvent): void {
    if (this.disabled()) return;
    const step = e.shiftKey ? 0.1 : 0.01;
    const c = this.hsva();
    const moves: Record<string, Partial<MxHsva>> = {
      ArrowRight: { s: Math.min(1, c.s + step) },
      ArrowLeft: { s: Math.max(0, c.s - step) },
      ArrowUp: { v: Math.min(1, c.v + step) },
      ArrowDown: { v: Math.max(0, c.v - step) },
      PageUp: { v: Math.min(1, c.v + 0.1) },
      PageDown: { v: Math.max(0, c.v - 0.1) },
      Home: { s: 0 },
      End: { s: 1 },
    };
    const m = moves[e.key];
    if (m) {
      e.preventDefault();
      this.update(m, true);
    }
  }

  protected onAreaDown(e: PointerEvent): void {
    if (this.disabled() || e.button !== 0) return;
    e.preventDefault();
    const el = this.area().nativeElement;
    el.querySelector<HTMLElement>('.mx-color-area-thumb')?.focus();
    const rect = el.getBoundingClientRect();
    const move = (ev: PointerEvent) =>
      this.update({
        s: Math.min(Math.max((ev.clientX - rect.left) / rect.width, 0), 1),
        v: 1 - Math.min(Math.max((ev.clientY - rect.top) / rect.height, 0), 1),
      });
    move(e);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      this.committed.emit(this.value()!);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  }

  protected async pickFromScreen(): Promise<void> {
    try {
      const Ctor = (window as unknown as { EyeDropper: new () => EyeDropperLike }).EyeDropper;
      const r = await new Ctor().open();
      this.setHex(r.sRGBHex);
    } catch {
      // a pessoa cancelou
    }
  }
}
