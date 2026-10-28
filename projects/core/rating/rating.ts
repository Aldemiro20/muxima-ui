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

const STAR = 'M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z';

/**
 * Avaliação com estrelas. Para escolher, são botões de rádio nativos (setas mudam a nota,
 * Tab sai do grupo); em `readonly` é uma imagem com o texto "4 de 5 estrelas".
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Como correu o atendimento?</label>
 *   <mx-rating formControlName="nota" />
 * </mx-form-field>
 * <mx-rating [value]="4.5" readonly />
 * ```
 */
@Component({
  selector: 'mx-rating',
  exportAs: 'mxRating',
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxRating }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-rating',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '[attr.data-readonly]': 'readonly() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-invalid]': 'errorState() ? "" : null',
    '[attr.aria-label]': 'null',
  },
  template: `
    @if (readonly()) {
      <span class="mx-rating-stars" role="img" [attr.aria-label]="readonlyLabel()">
        @for (s of stars(); track s) {
          <span class="mx-rating-star" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path [attr.d]="star" /></svg>
            <span class="mx-rating-star-fill" [style.width.%]="fillPct(s)"><svg viewBox="0 0 24 24"><path [attr.d]="star" /></svg></span>
          </span>
        }
      </span>
    } @else {
      <div
        class="mx-rating-stars"
        role="radiogroup"
        [attr.aria-labelledby]="field?.labelId() ?? null"
        [attr.aria-label]="field?.labelId() ? null : (ariaLabel() ?? i18n().rating.label)"
        [attr.aria-describedby]="field?.describedBy() ?? null"
        [attr.aria-required]="isRequired() ? 'true' : null"
        [attr.aria-invalid]="errorState() ? 'true' : null"
        (mouseleave)="hover.set(0)"
      >
        @for (s of stars(); track s) {
          <label class="mx-rating-star" [attr.data-on]="s <= shown() ? '' : null" (mouseenter)="hover.set(isDisabled() ? 0 : s)">
            <input
              type="radio"
              class="mx-rating-input"
              [id]="s === 1 ? controlId() : null"
              [name]="name"
              [value]="s"
              [checked]="value() === s"
              [disabled]="isDisabled()"
              (change)="choose(s)"
              (click)="onClick(s)"
              (blur)="onTouched()"
            />
            <span class="mx-visually-hidden">{{ (starLabel() ?? i18n().rating.star)(s) }}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path [attr.d]="star" /></svg>
          </label>
        }
      </div>
    }
    @if (showValue() && (readonly() || value())) {
      <span class="mx-rating-value" aria-hidden="true">{{ valueText() }}</span>
    }
  `,
})
export class MxRating implements ControlValueAccessor, MxFormFieldControl {
  readonly value = model<number | null>(null);
  readonly max = input(5, { transform: numberAttribute });
  /** Só mostra a nota (aceita meias estrelas, ex.: 4,5). */
  readonly readonly = input(false, { transform: booleanAttribute });
  /** Carregar outra vez na nota escolhida limpa a avaliação. */
  readonly clearable = input(false, { transform: booleanAttribute });
  /** Mostra o número ao lado ("4,5"). */
  readonly showValue = input(false, { transform: booleanAttribute });
  /** Nome de cada estrela; por omissão "1 estrela", "2 estrelas" no idioma activo. */
  readonly starLabel = input<(n: number) => string>();
  /** Locale dos números; por omissão o do idioma activo. */
  readonly locale = input<string>();
  protected readonly i18n = injectMxMessages();
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly id = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  protected readonly star = STAR;
  protected readonly name = mxUniqueId('mx-rating');
  private readonly generatedId = mxUniqueId('mx-rating-input');
  readonly controlId = computed(() => this.id() ?? this.generatedId);
  protected readonly hover = signal(0);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly stars = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1));
  protected readonly shown = computed(() => this.hover() || this.value() || 0);
  protected readonly valueText = computed(() =>
    new Intl.NumberFormat(this.locale() ?? this.i18n().intlLocale, { maximumFractionDigits: 1 }).format(this.value() ?? 0),
  );
  protected readonly readonlyLabel = computed(() => this.i18n().rating.summary(this.valueText(), this.max()));

  private onChange: (value: number | null) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  protected fillPct(s: number): number {
    const v = this.value() ?? 0;
    return Math.max(0, Math.min(1, v - (s - 1))) * 100;
  }

  protected choose(s: number): void {
    this.set(s);
  }

  protected onClick(s: number): void {
    // um clique na nota já escolhida não dispara "change": limpa se clearable
    if (this.clearable() && this.value() === s) {
      this.set(null);
      this.hover.set(0);
    }
  }

  private set(v: number | null): void {
    this.value.set(v);
    this.onChange(v);
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
  writeValue(value: number | null): void {
    this.value.set(value ?? null);
  }
  registerOnChange(fn: (value: number | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
