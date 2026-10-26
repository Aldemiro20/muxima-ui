import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-campos',
  imports: [DOC_UI, ReactiveFormsModule, MxFormField, MxLabel, MxInput, MxHint, MxError, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Campos de entrada' }]"
        title="Campos de entrada"
        lead="Texto, email, números e áreas de texto, com label, ajuda e mensagem de erro ligados automaticamente. Funcionam com ngModel e Reactive Forms."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de campo">
          <mx-form-field class="w-320">
            <label mxLabel>Email</label>
            <input mxInput type="email" placeholder="ola@empresa.co.ao" [formControl]="email" />
            <mx-hint>Enviamos o recibo para este endereço.</mx-hint>
            <mx-error>Introduz um email válido.</mx-error>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxFormField, MxLabel, MxInput, MxHint, MxError } from '@muxima-ui/core/form-field';" />
      </section>

      <section>
        <h2>Anatomia</h2>
        <p>O campo junta quatro peças. O label, a ajuda e o erro ficam ligados ao input por id.</p>
        <doc-anatomy
          [labels]="{
            topLeft: 'Label (for)',
            topRight: 'Foco de 2 px',
            bottomLeft: 'Borda de 1 px',
            bottomRight: 'Altura de 36 px',
            bottom: 'Ajuda e erro por baixo, ligados por aria-describedby'
          }"
        >
          <input mxInput tabindex="-1" placeholder="Nome completo" aria-label="Exemplo" class="w-180" />
        </doc-anatomy>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Validação" note="O erro só aparece depois de o utilizador sair do campo ou tentar enviar.">
            <form class="stack" [formGroup]="form" (ngSubmit)="submit()">
              <mx-form-field>
                <label mxLabel>Nome da empresa</label>
                <input mxInput formControlName="empresa" required />
                <mx-error>Indica o nome da empresa.</mx-error>
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>NIF</label>
                <input mxInput formControlName="nif" inputmode="numeric" />
                <mx-hint>9 a 14 algarismos.</mx-hint>
                <mx-error>O NIF tem de ter entre 9 e 14 algarismos.</mx-error>
              </mx-form-field>
              <div><button mxButton type="submit">Validar</button></div>
            </form>
          </doc-example>
          <doc-example title="Tamanhos">
            <div class="stack">
              <input mxInput size="sm" placeholder="Pequeno, 32 px" aria-label="Pequeno" />
              <input mxInput placeholder="Médio, 36 px" aria-label="Médio" />
              <input mxInput size="lg" placeholder="Grande, 40 px" aria-label="Grande" />
            </div>
          </doc-example>
          <doc-example title="Desactivado e só leitura">
            <div class="stack">
              <mx-form-field>
                <label mxLabel>Plano</label>
                <input mxInput value="Pro Equipa" readonly />
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>Código do cliente</label>
                <input mxInput value="AO-2026-0142" disabled />
              </mx-form-field>
            </div>
          </doc-example>
          <doc-example title="Área de texto">
            <mx-form-field class="w-full">
              <label mxLabel>Descrição do projecto</label>
              <textarea mxInput rows="3" placeholder="Conta-nos o que precisas"></textarea>
              <mx-hint>Máximo 500 caracteres.</mx-hint>
            </mx-form-field>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Move o foco para o campo.' },
            { key: 'Clique no label', action: 'Põe o foco no campo.' }
          ]"
          [aria]="[
            'O label aponta para o input com for/id, gerados automaticamente.',
            'A ajuda e o erro visível entram em aria-describedby.',
            'aria-invalid só fica activo depois de o utilizador tocar no campo.',
            'O erro tem role=&quot;alert&quot; e é anunciado quando aparece.',
            'Campos obrigatórios recebem aria-required e um asterisco no label.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Selecção', path: '/componentes/seleccao' }, { name: 'Botões', path: '/componentes/botoes' }, { name: 'Checkbox' }]" />
      </section>
    </article>
  `,
})
export class CamposPage {
  protected readonly email = new FormControl('', [Validators.email]);
  protected readonly form = new FormGroup({
    empresa: new FormControl('', Validators.required),
    nif: new FormControl('', [Validators.required, Validators.pattern(/^\d{9,14}$/)]),
  });

  protected submit(): void {
    this.form.markAllAsTouched();
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Email</label>
  <input mxInput type="email" placeholder="ola@empresa.co.ao" [formControl]="email" />
  <mx-hint>Enviamos o recibo para este endereço.</mx-hint>
  <mx-error>Introduz um email válido.</mx-error>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: 'input[mxInput], textarea[mxInput]', type: 'MxInput', description: 'Estilo e ligações ARIA do campo.' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md' },
    { kind: 'Input', name: 'invalid', type: 'boolean', default: 'false', description: 'Força o estado de erro fora dos formulários Angular.' },
    { kind: 'Input', name: 'id', type: 'string', default: 'gerado', description: 'Usado pelo for do label.' },
    { kind: 'Directiva', name: 'mx-form-field', type: 'MxFormField', description: 'Agrupa label, controlo, ajuda e erro.' },
    { kind: 'Directiva', name: 'label[mxLabel]', type: 'MxLabel' },
    { kind: 'Directiva', name: 'mx-hint, mx-error', type: 'MxHint, MxError', description: 'O erro só aparece com o campo inválido e tocado.' },
    { kind: 'Token CSS', name: '--mx-danger', type: 'color', default: '#B42318' },
  ];
}
