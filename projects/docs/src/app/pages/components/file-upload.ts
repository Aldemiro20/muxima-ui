import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxButton } from '@muxima-ui/core/button';
import { MxFileUpload } from '@muxima-ui/core/file-upload';
import { MxError, MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxToast } from '@muxima-ui/core/toast';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-file-upload-page',
  imports: [DOC_UI, MxFileUpload, MxFormField, MxLabel, MxHint, MxError, MxButton, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'File upload' }]"
        title="File upload"
        lead="Juntar ficheiros a arrastar ou com o seletor do sistema. Valida tipo, tamanho e número, e mostra a lista com tamanho, progresso de envio e botão de remover."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de file upload">
          <mx-form-field class="w-full">
            <label mxLabel>Comprovativos de pagamento</label>
            <mx-file-upload [(value)]="comprovativos" accept=".pdf,image/*" [maxSize]="5000000" multiple description="PDF ou imagem, até 5 MB cada." />
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxFileUpload } from '@muxima-ui/core/file-upload';" />
        <doc-callout>O componente não envia nada: o valor é File[] e o envio para o servidor (HttpClient com reportProgress) fica do teu lado. Passa a percentagem em [progress] e os erros em [errors], pelo nome do ficheiro.</doc-callout>
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Área para largar ficheiros com um botão de texto, e a lista dos ficheiros por baixo.</p>
        <doc-structure [labels]="{ topLeft: 'Área de largar', topRight: 'Botão: abre o seletor nativo', bottomLeft: 'Nome e tamanho', bottomRight: 'Remover', bottom: 'O valor é File[]' }">
          <mx-file-upload class="w-320" description="PDF até 5 MB" [value]="exemplo" />
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <doc-states>
          <doc-state name="Vazio"><mx-file-upload class="w-full" description="PDF até 5 MB" /></doc-state>
          <doc-state name="Com ficheiros"><mx-file-upload class="w-full" [value]="exemplo" /></doc-state>
          <doc-state name="A enviar"><mx-file-upload class="w-full" [value]="exemplo" [progress]="{ 'factura-0142.pdf': 45 }" /></doc-state>
          <doc-state name="Erro no envio"><mx-file-upload class="w-full" [value]="exemplo" [errors]="{ 'factura-0142.pdf': 'Falhou: tenta outra vez' }" /></doc-state>
          <doc-state name="Inválido"><mx-file-upload class="w-full" invalid /></doc-state>
          <doc-state name="Desactivado"><mx-file-upload class="w-full" disabled /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Envio com progresso" note="Simula o envio: a percentagem de cada ficheiro chega por [progress].">
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Documentos do cliente</label>
                <mx-file-upload [(value)]="documentos" [progress]="progresso()" [errors]="falhas()" multiple description="Qualquer tipo, até 10 MB." [maxSize]="10000000" />
              </mx-form-field>
              <div><button mxButton type="button" size="sm" [disabled]="!documentos().length || aEnviar()" (click)="enviar()">Enviar</button></div>
            </div>
          </doc-example>
          <doc-example title="Um só ficheiro" note="Sem multiple, um ficheiro novo substitui o anterior.">
            <mx-form-field class="w-full">
              <label mxLabel>Fotografia de perfil</label>
              <mx-file-upload [(value)]="foto" accept="image/png,image/jpeg" [maxSize]="2000000" dropText="Arrasta a fotografia ou" buttonText="escolhe uma imagem" description="PNG ou JPG, até 2 MB." />
            </mx-form-field>
          </doc-example>
          <doc-example title="Obrigatório num formulário" note="Validators.required: o erro aparece depois de tentar submeter.">
            <form class="stack w-full" [formGroup]="candidatura" (ngSubmit)="submeter()">
              <mx-form-field>
                <label mxLabel>Currículo</label>
                <mx-file-upload formControlName="cv" accept=".pdf" [maxSize]="3000000" description="PDF até 3 MB." />
                <mx-error>Junta o currículo em PDF.</mx-error>
              </mx-form-field>
              <div><button mxButton type="submit" size="sm">Candidatar</button></div>
            </form>
          </doc-example>
          <doc-example title="Limite de ficheiros" note="maxFiles: os ficheiros a mais são rejeitados com o motivo.">
            <mx-form-field class="w-full">
              <label mxLabel>Fotografias do imóvel</label>
              <mx-file-upload [(value)]="imovel" accept="image/*" multiple [maxFiles]="3" description="Até 3 imagens." />
              <mx-hint>A primeira é a capa do anúncio.</mx-hint>
            </mx-form-field>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Vai para o botão que abre o seletor e depois para cada Remover.' },
            { key: 'Enter Espaço', action: 'Abre o seletor de ficheiros do sistema.' }
          ]"
          [aria]="[
            'Arrastar é um atalho: o botão faz o mesmo, com teclado e leitor de ecrã.',
            'O botão é anunciado com o rótulo do campo: Comprovativos de pagamento, escolhe no computador.',
            'Ficheiros juntados, removidos e rejeitados são anunciados, e os motivos ficam escritos na página.',
            'Cada envio em curso tem uma barra de progresso com o nome do ficheiro.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Progress' }, { name: 'Input' }, { name: 'Toast' }]" />
      </section>
    </article>
  `,
})
export class FileUploadPage {
  private readonly toast = inject(MxToast);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly comprovativos = signal<File[]>([]);
  protected readonly exemplo = [new File([new Uint8Array(248_000)], 'factura-0142.pdf', { type: 'application/pdf' })];
  protected readonly documentos = signal<File[]>([]);
  protected readonly progresso = signal<Record<string, number>>({});
  protected readonly falhas = signal<Record<string, string>>({});
  protected readonly aEnviar = signal(false);
  protected readonly foto = signal<File[]>([]);
  protected readonly imovel = signal<File[]>([]);
  protected readonly candidatura = new FormGroup({ cv: new FormControl<File[]>([], Validators.required) });

  protected enviar(): void {
    this.aEnviar.set(true);
    this.falhas.set({});
    const nomes = this.documentos().map((f) => f.name);
    let pct = 0;
    const timer = setInterval(() => {
      pct += 20;
      this.progresso.set(Object.fromEntries(nomes.map((n) => [n, Math.min(pct, 100)])));
      if (pct >= 100) {
        clearInterval(timer);
        this.aEnviar.set(false);
        this.toast.success('Documentos enviados', { description: `${nomes.length} ficheiro${nomes.length === 1 ? '' : 's'}.` });
      }
    }, 400);
    this.destroyRef.onDestroy(() => clearInterval(timer));
  }

  protected submeter(): void {
    this.candidatura.markAllAsTouched();
    if (this.candidatura.valid) this.toast.success('Candidatura enviada');
  }

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Comprovativos de pagamento</label>
  <mx-file-upload formControlName="comprovativos" accept=".pdf,image/*"
                  [maxSize]="5_000_000" multiple
                  description="PDF ou imagem, até 5 MB cada." />
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'value', type: 'File[] (model)', description: 'Também com ngModel e Reactive Forms.' },
    { kind: 'Input', name: 'accept', type: 'string', description: 'Como no input nativo: ".pdf,image/*".' },
    { kind: 'Input', name: 'multiple', type: 'boolean', default: 'false', description: 'Sem multiple, um ficheiro novo substitui o anterior.' },
    { kind: 'Input', name: 'maxSize', type: 'number (bytes)', default: 'sem limite' },
    { kind: 'Input', name: 'maxFiles', type: 'number', default: 'sem limite' },
    { kind: 'Input', name: 'progress', type: 'Record<nome, %>', description: 'Percentagem de envio por ficheiro.' },
    { kind: 'Input', name: 'errors', type: 'Record<nome, texto>', description: 'Erro de envio por ficheiro.' },
    { kind: 'Input', name: 'description, dropText, buttonText', type: 'string', description: 'Textos da área.' },
    { kind: 'Input', name: 'disabled, required, invalid', type: 'boolean', default: 'false' },
    { kind: 'Output', name: 'rejected', type: 'MxFileRejection[]', description: 'Ficheiros recusados, com motivo type, size ou count.' },
    { kind: 'Método', name: 'browse(), addFiles(lista), remove(índice)', type: 'MxFileUpload' },
    { kind: 'Função', name: 'mxFormatBytes(bytes)', type: 'string', description: '"1,3 MB", "340 kB".' },
  ];
}
