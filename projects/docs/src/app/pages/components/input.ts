import { Icon } from '../../ui/icon';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxInput, MxInputAddon, MxInputGroup, MxLabel } from '@muxima-ui/core/form-field';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-input-page',
  imports: [DOC_UI, ReactiveFormsModule, MxFormField, MxLabel, MxInput, MxHint, MxError, MxButton, MxInputGroup, MxInputAddon, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Input' }]"
        title="Input"
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
        <h2>Estrutura</h2>
        <p>O campo junta quatro peças. O label, a ajuda e o erro ficam ligados ao input por id.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Label (for)',
            topRight: 'Foco de 2 px',
            bottomLeft: 'Borda de 1 px',
            bottomRight: 'Altura de 36 px',
            bottom: 'Ajuda e erro por baixo, ligados por aria-describedby'
          }"
        >
          <input mxInput tabindex="-1" placeholder="Nome completo" aria-label="Exemplo" class="w-180" />
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>O erro só aparece depois de o utilizador tocar no campo; aqui está forçado com invalid.</p>
        <doc-states>
          <doc-state name="Vazio" note="Mostra o placeholder."><input mxInput placeholder="Nome completo" aria-label="Vazio" /></doc-state>
          <doc-state name="Normal"><input mxInput value="Ana Kiala" aria-label="Normal" /></doc-state>
          <doc-state name="Hover" note="Borda mais escura."><input mxInput value="Ana Kiala" aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Foco" note="Borda e anel Kwanza."><input mxInput value="Ana Kiala" aria-label="Foco" data-mx-state="focus" /></doc-state>
          <doc-state name="Desactivado" note="disabled"><input mxInput value="Ana Kiala" aria-label="Desactivado" disabled /></doc-state>
          <doc-state name="Só leitura" note="readonly"><input mxInput value="AO-2026-0142" aria-label="Só leitura" readonly /></doc-state>
          <doc-state name="Erro" note="aria-invalid e mensagem ligada."><mx-form-field><label mxLabel>Email</label><input mxInput value="ana@" invalid /><mx-error>Email inválido.</mx-error></mx-form-field></doc-state>
        </doc-states>
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
          <doc-example title="Prefixo e sufixo" note="mxInputGroup e mxInputAddon. A unidade também está no label.">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Valor em kwanzas</label>
                <div mxInputGroup>
                  <span mxInputAddon>Kz</span>
                  <input mxInput inputmode="decimal" value="1 250 000" />
                  <span mxInputAddon>,00</span>
                </div>
              </mx-form-field>
              <mx-form-field>
                <label mxLabel>Telefone</label>
                <div mxInputGroup>
                  <span mxInputAddon>+244</span>
                  <input mxInput type="tel" autocomplete="tel-national" placeholder="923 000 000" />
                </div>
              </mx-form-field>
            </div>
          </doc-example>
          <doc-example title="Pesquisa com ícone e limpar">
            <mx-form-field class="w-full">
              <label mxLabel class="mx-visually-hidden">Pesquisar clientes</label>
              <div mxInputGroup>
                <span mxInputAddon aria-hidden="true"><doc-icon name="search" [size]="16" /></span>
                <input mxInput type="search" placeholder="Pesquisar clientes" [value]="search()" (input)="search.set($any($event.target).value)" />
                @if (search()) {
                  <button mxInputAddon type="button" aria-label="Limpar pesquisa" (click)="search.set('')"><doc-icon name="x" [size]="16" /></button>
                }
              </div>
            </mx-form-field>
          </doc-example>
          <doc-example title="Palavra-passe com mostrar" note="O botão diz o que faz e o estado (aria-pressed).">
            <mx-form-field class="w-full">
              <label mxLabel>Palavra-passe</label>
              <div mxInputGroup>
                <input mxInput [type]="showPass() ? 'text' : 'password'" autocomplete="new-password" value="kianda2026" />
                <button mxInputAddon type="button" [attr.aria-pressed]="showPass()" (click)="showPass.set(!showPass())">{{ showPass() ? 'Esconder' : 'Mostrar' }}</button>
              </div>
              <mx-hint>Pelo menos 8 caracteres.</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example title="Formulário em duas colunas" note="Em ecrãs estreitos passa a uma coluna.">
            <div class="form-2col w-full">
              <mx-form-field><label mxLabel>Nome</label><input mxInput autocomplete="given-name" /></mx-form-field>
              <mx-form-field><label mxLabel>Apelido</label><input mxInput autocomplete="family-name" /></mx-form-field>
              <mx-form-field class="span-2"><label mxLabel>Email</label><input mxInput type="email" autocomplete="email" /></mx-form-field>
              <mx-form-field><label mxLabel>NIF</label><input mxInput inputmode="numeric" /></mx-form-field>
              <mx-form-field><label mxLabel>Província</label><input mxInput value="Luanda" /></mx-form-field>
            </div>
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
        <doc-related [items]="[{ name: 'Select', path: '/componentes/select' }, { name: 'Button', path: '/componentes/button' }, { name: 'Checkbox' }]" />
      </section>
    </article>
  `,
})
export class InputPage {
  protected readonly search = signal('');
  protected readonly showPass = signal(false);

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
