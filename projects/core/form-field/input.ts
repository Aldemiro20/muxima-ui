import { Directive, ElementRef, booleanAttribute, computed, inject, input } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { MX_FORM_FIELD_CONTROL, MxFormFieldControl, mxUniqueId } from './form-control';
import { MxFormField } from './form-field';

/**
 * Campo de texto sobre o `<input>` ou `<textarea>` nativo.
 * Funciona com `ngModel`, `formControl` e `formControlName` sem configuração.
 */
@Directive({
  selector: 'input[mxInput], textarea[mxInput]',
  exportAs: 'mxInput',
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxInput }],
  host: {
    class: 'mx-input',
    '[id]': 'controlId()',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '[attr.aria-invalid]': 'errorState() ? "true" : null',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-required]': 'isRequired() ? "true" : null',
  },
})
export class MxInput implements MxFormFieldControl {
  /** id do elemento. Por omissão é gerado automaticamente. */
  readonly id = input<string | undefined>(undefined);
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  /** Força o estado de erro, para validações feitas fora dos formulários Angular. */
  readonly invalid = input(false, { transform: booleanAttribute });
  /** ids extra para aria-describedby, além da ajuda e do erro do campo. */
  readonly ariaDescribedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  private readonly generatedId = mxUniqueId('mx-input');
  readonly controlId = computed(() => this.id() ?? this.generatedId);

  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly field = inject(MxFormField, { optional: true });
  private readonly element = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef).nativeElement;

  errorState(): boolean {
    if (this.invalid()) return true;
    const c = this.ngControl;
    return !!c && !!c.invalid && !!(c.touched || c.dirty);
  }

  isRequired(): boolean {
    return this.element.required || !!this.ngControl?.control?.hasValidator?.(Validators.required);
  }

  protected describedBy(): string | null {
    const ids = [this.ariaDescribedBy(), this.field?.describedBy()].filter(Boolean);
    return ids.length ? ids.join(' ') : null;
  }
}
