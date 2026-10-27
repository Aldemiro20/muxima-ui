import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxProgress, MxSpinner } from '@muxima-ui/core/progress';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-progress-page',
  imports: [DOC_UI, MxProgress, MxSpinner, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Progress' }]"
        title="Progress"
        lead="Barra sobre o progress nativo, determinada ou indeterminada, e um spinner para esperas curtas."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de progresso">
          <div class="stack w-320">
            <label for="prev-envio" class="small-label">A enviar facturas: 64%</label>
            <progress id="prev-envio" mxProgress value="64" max="100">64%</progress>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxProgress, MxSpinner } from '@muxima-ui/core/progress';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Barra arredondada com a parte concluída em Kwanza. O nome vem de um label ou aria-label.</p>
        <doc-structure [labels]="{ topLeft: 'Label (for)', topRight: 'Valor em %', bottomLeft: 'Calha Pedra', bottomRight: 'Altura de 8 px', bottom: 'Sem value: indeterminada' }">
          <progress mxProgress value="60" max="100" aria-label="Exemplo" class="w-180"></progress>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>O progresso não é interactivo. Os estados são o andamento da tarefa.</p>
        <doc-states>
          <doc-state name="Por começar" note="value=0"><progress mxProgress value="0" max="100" aria-label="Por começar"></progress></doc-state>
          <doc-state name="Em curso"><progress mxProgress value="45" max="100" aria-label="Em curso"></progress></doc-state>
          <doc-state name="Concluído"><progress mxProgress value="100" max="100" aria-label="Concluído"></progress></doc-state>
          <doc-state name="Indeterminado" note="Sem value."><progress mxProgress aria-label="Indeterminado"></progress></doc-state>
          <doc-state name="Spinner" note="role=status"><span mxSpinner size="sm"></span><span mxSpinner></span><span mxSpinner size="lg"></span></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Envio com progresso" note="O texto acompanha a barra, para quem não a vê.">
            <div class="stack">
              <div><button mxButton type="button" variant="outline" size="sm" (click)="start()" [disabled]="value() > 0 && value() < 100">Enviar 30 facturas</button></div>
              <label for="ex-envio" class="small-label">{{ value() >= 100 ? 'Concluído' : 'Enviadas ' + sent() + ' de 30' }}</label>
              <progress id="ex-envio" mxProgress [value]="value()" max="100"></progress>
            </div>
          </doc-example>
          <doc-example title="Tamanhos" note="4, 8 e 12 px.">
            <div class="stack">
              <progress mxProgress size="sm" value="30" max="100" aria-label="Pequeno"></progress>
              <progress mxProgress value="50" max="100" aria-label="Médio"></progress>
              <progress mxProgress size="lg" value="70" max="100" aria-label="Grande"></progress>
            </div>
          </doc-example>
          <doc-example title="Vários ficheiros" note="Uma barra por ficheiro, com o nome no label.">
            <ul class="upload-list w-full">
              @for (f of ficheiros; track f.nome) {
                <li>
                  <div class="row-between"><label [for]="'up-' + $index">{{ f.nome }}</label><span class="small-label">{{ f.valor === 100 ? 'Concluído' : f.valor + '%' }}</span></div>
                  <progress [id]="'up-' + $index" mxProgress size="sm" [value]="f.valor" max="100"></progress>
                </li>
              }
            </ul>
          </doc-example>
          <doc-example title="Indeterminado com texto" note="Quando não se sabe quanto falta.">
            <div class="stack w-full">
              <label for="prog-sync" class="small-label">A sincronizar com a AGT...</label>
              <progress id="prog-sync" mxProgress></progress>
            </div>
          </doc-example>
          <doc-example title="Spinner num carregamento de página">
            <div class="spinner-block w-full">
              <span mxSpinner size="lg" label="A carregar facturas"></span>
              <span class="small-label" aria-hidden="true">A carregar facturas...</span>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Não recebe foco.' }]"
          [aria]="[
            'progress nativo: o leitor de ecrã anuncia a percentagem.',
            'Dá sempre um nome: label com for, ou aria-label.',
            'O spinner tem role=status e o nome A carregar, que podes mudar com label.',
            'Dentro de um botão usa loading no botão, não o spinner.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selectores: <code>progress[mxProgress]</code>, <code>[mxSpinner]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Skeleton' }, { name: 'Button' }, { name: 'Toast' }]" />
      </section>
    </article>
  `,
})
export class ProgressPage {
  protected readonly ficheiros = [
    { nome: 'facturas-outubro.pdf', valor: 100 },
    { nome: 'extracto-banco.xlsx', valor: 64 },
    { nome: 'contratos.zip', valor: 12 },
  ];

  protected readonly value = signal(0);
  protected readonly sent = signal(0);

  protected start(): void {
    this.value.set(0);
    this.sent.set(0);
    const tick = setInterval(() => {
      this.sent.update((n) => n + 3);
      this.value.set(Math.round((this.sent() / 30) * 100));
      if (this.sent() >= 30) clearInterval(tick);
    }, 250);
  }

  protected readonly previewCode = `<label for="envio">A enviar facturas: 64%</label>
<progress id="envio" mxProgress value="64" max="100">64%</progress>

<span mxSpinner></span>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'mxProgress: 4, 8 ou 12 px. mxSpinner: 14, 20 ou 28 px.' },
    { kind: 'Input', name: 'label', type: 'string', default: 'A carregar', description: 'mxSpinner: nome acessível.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', description: 'Cor da parte concluída e do spinner.' },
  ];
}
