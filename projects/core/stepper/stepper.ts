import { ChangeDetectionStrategy, Component, Directive, ViewEncapsulation, input } from '@angular/core';

export type MxStepState = 'complete' | 'current' | 'upcoming';

/**
 * Indicador de etapas de um fluxo (ex.: Dados, Pagamento, Confirmação).
 * Mostra o progresso; a navegação entre etapas fica a cargo da tua aplicação.
 *
 * ```html
 * <ol mxStepper aria-label="Progresso da encomenda">
 *   <li mxStep state="complete">Dados</li>
 *   <li mxStep state="current">Pagamento</li>
 *   <li mxStep>Confirmação</li>
 * </ol>
 * ```
 *
 * A etapa actual recebe aria-current="step" e as concluídas são anunciadas como tal.
 */
@Directive({
  selector: 'ol[mxStepper]',
  host: { class: 'mx-stepper', '[attr.data-orientation]': 'orientation()' },
})
export class MxStepper {
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
}

/** Uma etapa da lista. */
@Component({
  selector: 'li[mxStep]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-step',
    '[attr.data-state]': 'state()',
    '[attr.aria-current]': 'state() === "current" ? "step" : null',
  },
  template: `
    <span class="mx-step-marker" aria-hidden="true"></span>
    <span class="mx-step-label">
      <ng-content />
      @if (state() === 'complete') {
        <span class="mx-visually-hidden"> ({{ completeText() }})</span>
      }
    </span>
  `,
})
export class MxStep {
  readonly state = input<MxStepState>('upcoming');
  /** Texto lido nas etapas concluídas. */
  readonly completeText = input('concluído');
}

export const MX_STEPPER = [MxStepper, MxStep] as const;
