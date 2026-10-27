import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { MX_FORM_FIELD_CONTROL, MxFormField, MxFormFieldControl, mxUniqueId } from '@muxima-ui/core/form-field';

/**
 * Código de uso único (OTP), mostrado em caixas separadas.
 *
 * Por baixo há um único `<input>` nativo com autocomplete="one-time-code": colar o código,
 * o preenchimento automático do SMS e os leitores de ecrã funcionam como num campo normal.
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Código enviado por SMS</label>
 *   <mx-otp [length]="6" formControlName="codigo" (completed)="verificar($event)" />
 * </mx-form-field>
 * ```
 */
@Component({
  selector: 'mx-otp',
  exportAs: 'mxOtp',
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxOtp }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-otp',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '[attr.data-invalid]': 'errorState() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.aria-label]': 'null',
  },
  template: `
    <div class="mx-otp-slots" aria-hidden="true">
      @for (slot of slots(); track $index; let i = $index) {
        <span class="mx-otp-slot" [attr.data-active]="focused() && i === caret() ? '' : null" [attr.data-filled]="slot ? '' : null">{{ slot }}</span>
      }
    </div>
    <input
      class="mx-otp-input"
      type="text"
      autocomplete="one-time-code"
      spellcheck="false"
      [attr.inputmode]="numeric() ? 'numeric' : 'text'"
      [attr.pattern]="numeric() ? '[0-9]*' : null"
      [id]="controlId()"
      [attr.maxlength]="length()"
      [value]="value()"
      [disabled]="isDisabled()"
      [attr.aria-invalid]="errorState() ? 'true' : null"
      [attr.aria-required]="isRequired() ? 'true' : null"
      [attr.aria-describedby]="field?.describedBy() ?? null"
      [attr.aria-label]="ariaLabel() ?? null"
      (input)="onInput($event)"
      (focus)="focused.set(true)"
      (blur)="focused.set(false); onTouched()"
      (select)="$event.preventDefault()"
    />
  `,
})
export class MxOtp implements ControlValueAccessor, MxFormFieldControl {
  readonly value = model('');
  readonly length = input(6);
  /** Só algarismos (teclado numérico em telemóveis). */
  readonly numeric = input(true, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly id = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  /** Emite o código quando todas as caixas estão preenchidas. */
  readonly completed = output<string>();

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly generatedId = mxUniqueId('mx-otp');
  readonly controlId = computed(() => this.id() ?? this.generatedId);

  protected readonly focused = signal(false);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly slots = computed(() => Array.from({ length: this.length() }, (_, i) => this.value()[i] ?? ''));
  protected readonly caret = computed(() => Math.min(this.value().length, this.length() - 1));

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  protected onInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    let v = el.value;
    if (this.numeric()) v = v.replace(/\D/g, '');
    v = v.slice(0, this.length());
    if (el.value !== v) el.value = v;
    this.value.set(v);
    this.onChange(v);
    if (v.length === this.length()) this.completed.emit(v);
  }

  errorState(): boolean {
    if (this.invalid()) return true;
    const c = this.ngControl;
    return !!c && !!c.invalid && !!(c.touched || c.dirty);
  }
  isRequired(): boolean {
    return this.required() || !!this.ngControl?.control?.hasValidator?.(Validators.required);
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
