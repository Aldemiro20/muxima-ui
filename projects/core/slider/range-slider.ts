import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  numberAttribute,
  signal,
} from '@angular/core';
import { injectMxMessages } from '@muxima-ui/core/i18n';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { MX_FORM_FIELD_CONTROL, MxFormField, MxFormFieldControl, mxUniqueId } from '@muxima-ui/core/form-field';

/**
 * Intervalo com dois cursores (mínimo e máximo), feito com dois `<input type="range">`
 * nativos: cada cursor tem o seu teclado e é anunciado como "Preço, mínimo, 20 US$".
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Preço</label>
 *   <mx-range-slider formControlName="preco" [min]="0" [max]="100000" [step]="1000" [format]="kz" />
 * </mx-form-field>
 * ```
 *
 * O valor é `[mínimo, máximo]`. Os cursores não se cruzam: ficam a pelo menos `minGap` um do outro.
 */
@Component({
  selector: 'mx-range-slider',
  exportAs: 'mxRangeSlider',
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxRangeSlider }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-range-slider',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-invalid]': 'errorState() ? "" : null',
    '[attr.aria-label]': 'null',
    '[style.--mx-range-from]': 'fromPct() + "%"',
    '[style.--mx-range-to]': 'toPct() + "%"',
  },
  template: `
    <div class="mx-range-slider-track" aria-hidden="true"><div class="mx-range-slider-fill"></div></div>
    <input
      type="range"
      class="mx-range-slider-input"
      [id]="controlId()"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [value]="low()"
      [disabled]="isDisabled()"
      [attr.aria-labelledby]="labelledBy(lowId)"
      [attr.aria-valuetext]="format()(low())"
      [attr.aria-describedby]="field?.describedBy() ?? null"
      [attr.aria-invalid]="errorState() ? 'true' : null"
      (input)="onInput(0, $event)"
      (blur)="onTouched()"
    />
    <input
      type="range"
      class="mx-range-slider-input"
      [min]="min()"
      [max]="max()"
      [step]="step()"
      [value]="high()"
      [disabled]="isDisabled()"
      [attr.aria-labelledby]="labelledBy(highId)"
      [attr.aria-valuetext]="format()(high())"
      [attr.aria-describedby]="field?.describedBy() ?? null"
      [attr.aria-invalid]="errorState() ? 'true' : null"
      (input)="onInput(1, $event)"
      (blur)="onTouched()"
    />
    <span class="mx-visually-hidden" [id]="lowId">{{ lowLabel() ?? i18n().rangeSlider.low }}</span>
    <span class="mx-visually-hidden" [id]="highId">{{ highLabel() ?? i18n().rangeSlider.high }}</span>
    @if (!field?.labelId()) {
      <span class="mx-visually-hidden" [id]="nameId">{{ ariaLabel() }}</span>
    }
    @if (showValues()) {
      <div class="mx-range-slider-values" aria-hidden="true">
        <span>{{ format()(low()) }}</span>
        <span>{{ format()(high()) }}</span>
      </div>
    }
  `,
})
export class MxRangeSlider implements ControlValueAccessor, MxFormFieldControl {
  readonly value = model<[number, number] | null>(null);
  readonly min = input(0, { transform: numberAttribute });
  readonly max = input(100, { transform: numberAttribute });
  readonly step = input(1, { transform: numberAttribute });
  /** Distância mínima entre os dois cursores. */
  readonly minGap = input(0, { transform: numberAttribute });
  /** Texto de cada valor, para o leitor de ecrã e as etiquetas. */
  readonly format = input<(v: number) => string>((v) => String(v));
  /** Mostra os dois valores por baixo da barra. */
  readonly showValues = input(false, { transform: booleanAttribute });
  readonly lowLabel = input<string>();
  readonly highLabel = input<string>();
  protected readonly i18n = injectMxMessages();
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly id = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly generatedId = mxUniqueId('mx-range');
  readonly controlId = computed(() => this.id() ?? this.generatedId);
  protected readonly lowId = mxUniqueId('mx-range-low');
  protected readonly highId = mxUniqueId('mx-range-high');
  protected readonly nameId = mxUniqueId('mx-range-name');
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  protected readonly low = computed(() => this.value()?.[0] ?? this.min());
  protected readonly high = computed(() => this.value()?.[1] ?? this.max());
  private pct(v: number): number {
    const span = this.max() - this.min();
    return span > 0 ? ((v - this.min()) / span) * 100 : 0;
  }
  protected readonly fromPct = computed(() => this.pct(this.low()));
  protected readonly toPct = computed(() => this.pct(this.high()));

  private onChange: (value: [number, number] | null) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  protected labelledBy(partId: string): string {
    return `${this.field?.labelId() ?? this.nameId} ${partId}`;
  }

  protected onInput(which: 0 | 1, event: Event): void {
    const el = event.target as HTMLInputElement;
    let v = Number(el.value);
    const gap = this.minGap();
    if (which === 0) v = Math.min(v, this.high() - gap);
    else v = Math.max(v, this.low() + gap);
    // o input nativo pode ter passado o outro cursor: repõe a posição
    el.value = String(v);
    const next: [number, number] = which === 0 ? [v, this.high()] : [this.low(), v];
    this.value.set(next);
    this.onChange(next);
  }

  // ---- MxFormFieldControl ----
  errorState(): boolean {
    if (this.invalid()) return true;
    const c = this.ngControl;
    return !!c && !!c.invalid && !!(c.touched || c.dirty);
  }
  isRequired(): boolean {
    return this.required() || !!this.ngControl?.control?.hasValidator?.(Validators.required);
  }

  // ---- ControlValueAccessor ----
  writeValue(value: [number, number] | null): void {
    this.value.set(value ? [value[0], value[1]] : null);
  }
  registerOnChange(fn: (value: [number, number] | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
