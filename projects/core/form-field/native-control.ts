import { Directive, ElementRef, booleanAttribute, computed, inject, input } from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { MxFormFieldControl, mxUniqueId } from './form-control';
import { MxFormField } from './form-field';

/**
 * Base das directivas aplicadas a controlos nativos (input, textarea).
 * Trata do id, do estado de erro ligado ao Reactive Forms, de aria-invalid,
 * aria-required e aria-describedby, para que todos os campos se comportem igual.
 */
@Directive({
  host: {
    '[id]': 'controlId()',
    '[attr.aria-invalid]': 'errorState() ? "true" : null',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-required]': 'isRequired() && !nativeRequiredSupported ? "true" : null',
  },
})
export abstract class MxNativeControl implements MxFormFieldControl {
  /** id do elemento. Por omissão é gerado automaticamente. */
  readonly id = input<string | undefined>(undefined);
  /** Força o estado de erro, para validações feitas fora dos formulários Angular. */
  readonly invalid = input(false, { transform: booleanAttribute });
  /** ids extra para aria-describedby, além da ajuda e do erro do campo. */
  readonly ariaDescribedBy = input<string | undefined>(undefined, { alias: 'aria-describedby' });

  private readonly generatedId = mxUniqueId('mx-control');
  readonly controlId = computed(() => this.id() ?? this.generatedId);

  protected readonly ngControl = inject(NgControl, { self: true, optional: true });
  protected readonly field = inject(MxFormField, { optional: true });
  protected readonly element = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef).nativeElement;
  /** Com o atributo required nativo o leitor de ecrã já anuncia "obrigatório". */
  protected get nativeRequiredSupported(): boolean {
    return this.element.required;
  }

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
