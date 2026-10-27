import { InjectionToken, Signal } from '@angular/core';

/**
 * Contrato que um controlo (MxInput, MxSelect) cumpre para poder viver dentro de
 * um `<mx-form-field>`. O campo usa-o para ligar o label, as mensagens e o estado de erro.
 */
export interface MxFormFieldControl {
  /** id do elemento focável, usado pelo `for` do label. */
  readonly controlId: Signal<string>;
  /** true quando o controlo é inválido e o utilizador já interagiu com ele. */
  errorState(): boolean;
  /** true quando o controlo é obrigatório. */
  isRequired(): boolean;
}

export const MX_FORM_FIELD_CONTROL = new InjectionToken<MxFormFieldControl>('MX_FORM_FIELD_CONTROL');

let nextId = 0;
/** Gera ids estáveis e únicos para ligar elementos por aria-*. */
export function mxUniqueId(prefix: string): string {
  return `${prefix}-${nextId++}`;
}

/** Normaliza texto para pesquisa: sem acentos e em minúsculas ("Huíla" → "huila"). */
export function mxNormalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}
