import { MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MX_STEPPER, MxStepState } from '@muxima-ui/core/stepper';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-stepper-page',
  imports: [DOC_UI, MX_STEPPER, MxButton, MxFormField, MxLabel, MxInput],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Stepper' }]"
        title="Stepper"
        lead="Mostra em que passo de um fluxo a pessoa está. É uma lista ordenada; a etapa actual tem aria-current=step e as concluídas são anunciadas."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de stepper" align="start">
          <div class="stack w-full">
            <ol mxStepper aria-label="Progresso do registo">
              @for (s of steps; track s; let i = $index) {
                <li mxStep [state]="state(i)">{{ s }}</li>
              }
            </ol>
            <div class="row-end">
              <button mxButton type="button" variant="outline" size="sm" [disabled]="current() === 0" (click)="current.set(current() - 1)">Anterior</button>
              <button mxButton type="button" size="sm" [disabled]="current() === steps.length" (click)="current.set(current() + 1)">{{ current() >= steps.length - 1 ? 'Concluir' : 'Seguinte' }}</button>
            </div>
            <p class="mx-visually-hidden" aria-live="polite">{{ live() }}</p>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_STEPPER } from '@muxima-ui/core/stepper';" />
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Por fazer" note="upcoming"><ol mxStepper aria-label="Por fazer"><li mxStep>Pagamento</li></ol></doc-state>
          <doc-state name="Actual" note="current, aria-current=step"><ol mxStepper aria-label="Actual"><li mxStep state="current">Pagamento</li></ol></doc-state>
          <doc-state name="Concluída" note="complete"><ol mxStepper aria-label="Concluída"><li mxStep state="complete">Pagamento</li></ol></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Vertical">
            <ol mxStepper orientation="vertical" aria-label="Estado da encomenda">
              <li mxStep state="complete">Encomenda recebida</li>
              <li mxStep state="complete">Pagamento confirmado</li>
              <li mxStep state="current">Em preparação</li>
              <li mxStep>Entregue</li>
            </ol>
          </doc-example>
          <doc-example title="Formulário em passos" note="O conteúdo muda por baixo do stepper; o título do passo recebe o foco.">
            <div class="stack w-full">
              <ol mxStepper aria-label="Nova factura">
                @for (s of fSteps; track s; let i = $index) {
                  <li mxStep [state]="i < f() ? 'complete' : i === f() ? 'current' : 'upcoming'">{{ s }}</li>
                }
              </ol>
              <div class="step-panel">
                <h4 tabindex="-1" #stepTitle>{{ fSteps[f()] }}</h4>
                @switch (f()) {
                  @case (0) { <mx-form-field><label mxLabel>Cliente</label><input mxInput value="Kianda Logística" /></mx-form-field> }
                  @case (1) { <mx-form-field><label mxLabel>Valor (US$)</label><input mxInput inputmode="decimal" value="1 250" /></mx-form-field> }
                  @case (2) { <p class="muted">Confirma os dados e emite a factura.</p> }
                }
              </div>
              <div class="row-end">
                <button mxButton type="button" variant="outline" size="sm" [disabled]="f() === 0" (click)="go(f() - 1, stepTitle)">Anterior</button>
                <button mxButton type="button" size="sm" (click)="go(f() + 1, stepTitle)" [disabled]="f() === fSteps.length - 1">Seguinte</button>
              </div>
            </div>
          </doc-example>
          <doc-example title="Só números, compacto">
            <ol mxStepper aria-label="Progresso" class="w-full">
              <li mxStep state="complete"><span class="mx-visually-hidden">Carrinho</span></li>
              <li mxStep state="complete"><span class="mx-visually-hidden">Morada</span></li>
              <li mxStep state="current"><span class="mx-visually-hidden">Pagamento</span></li>
              <li mxStep><span class="mx-visually-hidden">Confirmação</span></li>
            </ol>
          </doc-example>
          <doc-example title="Vertical com descrições">
            <ol mxStepper orientation="vertical" aria-label="Abertura de conta">
              <li mxStep state="complete">Dados da empresa <span class="step-desc">NIF validado na AGT</span></li>
              <li mxStep state="current">Documentos <span class="step-desc">Alvará e certidão comercial</span></li>
              <li mxStep>Assinatura <span class="step-desc">Assinatura digital do gerente</span></li>
            </ol>
          </doc-example>
        </div>
        <doc-callout>Em ecrãs estreitos, o stepper horizontal só mostra o nome da etapa actual; as outras ficam só com o número, mas continuam a ser lidas pelo leitor de ecrã.</doc-callout>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Não é interactivo: a navegação faz-se com os botões do fluxo.' }]"
          [aria]="[
            'ol com aria-label: o leitor de ecrã diz quantas etapas há.',
            'A etapa actual tem aria-current=step.',
            'As concluídas acrescentam (concluído) só para leitores de ecrã.',
            'Ao mudar de etapa, anuncia a mudança ou move o foco para o título do passo.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Progress' }, { name: 'Tabs' }, { name: 'Breadcrumb' }]" />
      </section>
    </article>
  `,
})
export class StepperPage {
  protected readonly fSteps = ['Cliente', 'Valores', 'Confirmação'];
  protected readonly f = signal(0);
  protected go(i: number, title: HTMLElement): void {
    this.f.set(i);
    setTimeout(() => title.focus());
  }

  protected readonly steps = ['Empresa', 'Contacto', 'Plano', 'Confirmação'];
  protected readonly current = signal(1);
  protected readonly live = computed(() =>
    this.current() >= this.steps.length ? 'Registo concluído' : `Passo ${this.current() + 1} de ${this.steps.length}: ${this.steps[this.current()]}`,
  );
  protected state(i: number): MxStepState {
    return i < this.current() ? 'complete' : i === this.current() ? 'current' : 'upcoming';
  }

  protected readonly previewCode = `<ol mxStepper aria-label="Progresso do registo">
  <li mxStep state="complete">Empresa</li>
  <li mxStep state="current">Contacto</li>
  <li mxStep>Plano</li>
  <li mxStep>Confirmação</li>
</ol>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: 'ol[mxStepper]', type: "orientation: 'horizontal' | 'vertical'", default: 'horizontal' },
    { kind: 'Directiva', name: 'li[mxStep]', type: "state: 'complete' | 'current' | 'upcoming'", default: 'upcoming' },
    { kind: 'Input', name: 'completeText', type: 'string', default: 'concluído', description: 'Texto lido nas etapas concluídas.' },
  ];
}
