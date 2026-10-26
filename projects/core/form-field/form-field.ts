import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ViewEncapsulation,
  computed,
  contentChild,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import { MX_FORM_FIELD_CONTROL, mxUniqueId } from './form-control';

/** Texto de ajuda por baixo do controlo. */
@Directive({
  selector: 'mx-hint, [mxHint]',
  host: {
    class: 'mx-hint',
    '[id]': 'id()',
  },
})
export class MxHint {
  readonly id = input(mxUniqueId('mx-hint'));
}

/**
 * Mensagem de erro. Só aparece quando o controlo é inválido e o utilizador
 * já lhe tocou, e é anunciada pelos leitores de ecrã.
 */
@Directive({
  selector: 'mx-error, [mxError]',
  host: {
    class: 'mx-error',
    role: 'alert',
    '[id]': 'id()',
    '[attr.hidden]': 'field?.showsError() ? null : ""',
  },
})
export class MxError {
  readonly id = input(mxUniqueId('mx-error'));
  protected readonly field = inject(MxFormField, { optional: true });
}

/** Label ligado automaticamente ao controlo do campo. */
@Directive({
  selector: 'label[mxLabel]',
  host: {
    class: 'mx-label',
    '[id]': 'id()',
    '[attr.for]': 'field?.controlId() ?? null',
    '[attr.data-required]': 'field?.isRequired() ? "" : null',
  },
})
export class MxLabel {
  readonly id = input(mxUniqueId('mx-label'));
  protected readonly field = inject(MxFormField, { optional: true });
}

/**
 * Agrupa label, controlo, ajuda e erro, e liga-os entre si com
 * `for`, `aria-describedby` e `aria-invalid`.
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Email</label>
 *   <input mxInput type="email" [formControl]="email" required />
 *   <mx-hint>Enviamos o recibo para este endereço.</mx-hint>
 *   <mx-error>Introduz um email válido.</mx-error>
 * </mx-form-field>
 * ```
 */
@Component({
  selector: 'mx-form-field',
  exportAs: 'mxFormField',
  template: `<ng-content />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'mx-form-field' },
})
export class MxFormField {
  private readonly control = contentChild(MX_FORM_FIELD_CONTROL);
  private readonly hints = contentChildren(MxHint);
  private readonly errors = contentChildren(MxError);
  private readonly label = contentChild(MxLabel);

  /** id do label, para controlos que precisam de aria-labelledby (ex.: a lista do Select). */
  readonly labelId = computed(() => this.label()?.id() ?? null);

  readonly controlId = computed(() => this.control()?.controlId() ?? null);

  showsError(): boolean {
    return this.control()?.errorState() ?? false;
  }

  isRequired(): boolean {
    return this.control()?.isRequired() ?? false;
  }

  /** ids que o controlo deve anunciar em aria-describedby. */
  describedBy(): string | null {
    const ids = this.hints().map((h) => h.id());
    if (this.showsError()) ids.push(...this.errors().map((e) => e.id()));
    return ids.length ? ids.join(' ') : null;
  }
}
