import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxOtp } from '@muxima-ui/core/otp';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-otp-page',
  imports: [DOC_UI, MxOtp, MxFormField, MxLabel, MxHint, MxError, MxButton, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'OTP input' }]"
        title="OTP input"
        lead="Código de uso único em caixas separadas. Por baixo há um só input nativo: colar o código e o preenchimento automático do SMS funcionam, e o leitor de ecrã ouve um campo normal."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de OTP">
          <mx-form-field>
            <label mxLabel>Código enviado para +244 9•• ••• 512</label>
            <mx-otp [formControl]="codigo" (completed)="verificar($event)" />
            <mx-hint>{{ estado() }}</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxOtp } from '@muxima-ui/core/otp';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>As caixas são só visuais. O input real está por cima, transparente, com autocomplete=one-time-code.</p>
        <doc-structure [labels]="{ topLeft: 'Caixa de 40 px', topRight: 'Caixa activa com anel', bottomLeft: '1 input real', bottomRight: 'Espaço de 8 px', bottom: 'inputmode=numeric abre o teclado de algarismos' }">
          <mx-otp [length]="4" aria-label="Exemplo" [value]="'12'" />
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"><mx-otp [length]="4" size="sm" aria-label="Vazio" /></doc-state>
          <doc-state name="Hover"><mx-otp [length]="4" size="sm" aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Foco"><mx-otp [length]="4" size="sm" aria-label="Foco" data-mx-state="focus" /></doc-state>
          <doc-state name="Preenchido"><mx-otp [length]="4" size="sm" aria-label="Preenchido" [value]="'4821'" /></doc-state>
          <doc-state name="Desactivado"><mx-otp [length]="4" size="sm" aria-label="Desactivado" disabled [value]="'48'" /></doc-state>
          <doc-state name="Erro"><mx-otp [length]="4" size="sm" aria-label="Erro" invalid [value]="'4821'" /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Validação" note="O código certo neste exemplo é 123456.">
            <div class="stack">
              <mx-form-field>
                <label mxLabel>Código de verificação</label>
                <mx-otp [formControl]="validado" />
                <mx-error>O código tem 6 algarismos.</mx-error>
              </mx-form-field>
              <div><button mxButton type="button" size="sm" (click)="validado.markAsTouched()">Verificar</button></div>
            </div>
          </doc-example>
          <doc-example title="Tamanhos e letras" note="numeric=false aceita letras (códigos de convite).">
            <div class="stack">
              <mx-otp [length]="4" size="sm" aria-label="Pequeno" />
              <mx-otp [length]="5" size="lg" [numeric]="false" aria-label="Código de convite" />
            </div>
          </doc-example>
          <doc-example title="PIN de 4 algarismos">
            <mx-form-field>
              <label mxLabel>PIN do cartão</label>
              <mx-otp [length]="4" />
              <mx-hint>Nunca partilhes o PIN.</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example title="Reenviar código" note="O botão fica desactivado durante a contagem, que é anunciada a cada 10 s.">
            <div class="stack">
              <mx-form-field>
                <label mxLabel>Código enviado por SMS</label>
                <mx-otp [length]="6" />
              </mx-form-field>
              <div class="row-inline">
                <button mxButton type="button" variant="link" size="sm" [disabled]="seconds() > 0" (click)="resend()">Reenviar código</button>
                @if (seconds() > 0) {
                  <span class="small-label">daqui a {{ seconds() }} s</span>
                }
              </div>
              <span class="mx-visually-hidden" aria-live="polite">{{ seconds() % 10 === 0 && seconds() > 0 ? 'Podes reenviar daqui a ' + seconds() + ' segundos' : '' }}</span>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Algarismos', action: 'Preenchem as caixas por ordem.' }, { key: 'Backspace', action: 'Apaga o último.' }, { key: 'Ctrl + V', action: 'Cola o código inteiro.' }]"
          [aria]="[
            'Um único input: o leitor de ecrã lê o código como um campo de texto, não seis.',
            'autocomplete=one-time-code: o telemóvel sugere o código do SMS.',
            'maxlength limita ao número de caixas; o label e o erro ficam ligados.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>mx-otp</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Input' }, { name: 'Button' }, { name: 'Alert' }]" />
      </section>
    </article>
  `,
})
export class OtpPage {
  protected readonly seconds = signal(30);
  private readonly tick = setInterval(() => this.seconds.update((s) => Math.max(0, s - 1)), 1000);
  private readonly stop = inject(DestroyRef).onDestroy(() => clearInterval(this.tick));
  protected resend(): void {
    this.seconds.set(30);
  }

  protected readonly codigo = new FormControl('');
  protected readonly validado = new FormControl('', [Validators.required, Validators.minLength(6)]);
  protected readonly estado = signal('6 algarismos. Podes colar o código.');

  protected verificar(code: string): void {
    this.estado.set(`A verificar ${code}...`);
    setTimeout(() => this.estado.set('Código verificado.'), 700);
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Código enviado por SMS</label>
  <mx-otp [length]="6" formControlName="codigo" (completed)="verificar($event)" />
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'length', type: 'number', default: '6' },
    { kind: 'Input', name: 'value', type: 'string (model)', default: "''" },
    { kind: 'Input', name: 'numeric', type: 'boolean', default: 'true', description: 'Só algarismos.' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Caixas de 32, 40 ou 48 px.' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    { kind: 'Output', name: 'completed', type: 'string', description: 'Todas as caixas preenchidas.' },
  ];
}
