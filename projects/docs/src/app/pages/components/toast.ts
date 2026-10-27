import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxToast, MxToastPosition } from '@muxima-ui/core/toast';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-toast-page',
  imports: [DOC_UI, MxButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Toast' }]"
        title="Toast"
        lead="Aviso temporário no canto do ecrã depois de uma acção. Cada tipo tem a sua cor no fundo, na borda e no ícone: erro em vermelho, aviso em âmbar, sucesso em verde e informação em Kwanza."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de toast">
          <button mxButton type="button" variant="outline" (click)="toast.success('Factura enviada', { description: 'FT 2026/0142 para Kianda Logística.' })">Sucesso</button>
          <button mxButton type="button" variant="outline" (click)="toast.error('Falha no envio', { description: 'O servidor não respondeu. Tenta de novo.' })">Erro</button>
          <button mxButton type="button" variant="outline" (click)="toast.warning('Faltam 3 dias', { description: 'A factura FT 2026/0139 vence a 30 de Outubro.' })">Aviso</button>
          <button mxButton type="button" variant="outline" (click)="toast.info('Nova versão disponível', { description: 'Actualiza a página para ver as novidades.' })">Informação</button>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxToast } from '@muxima-ui/core/toast';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Ícone do tipo, título, descrição opcional, uma acção opcional e o botão de fechar.</p>
        <doc-structure [labels]="{ topLeft: 'Ícone do tipo', topRight: 'Botão fechar', bottomLeft: 'Fundo a 9% da cor', bottomRight: 'Borda a 40% da cor', bottom: 'No máximo 5 em simultâneo' }">
          <div class="mx-toast static-toast" data-variant="danger"><span class="mx-toast-icon" aria-hidden="true"></span><div class="mx-toast-text"><p class="mx-toast-title">Falha no envio</p></div></div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Os cinco tipos e o estado a carregar. A cor nunca é a única pista: cada tipo tem um ícone próprio e o título diz o que aconteceu.</p>
        <div class="toast-gallery">
          @for (v of variants; track v.name) {
            <div class="toast-gallery-item">
              <div class="mx-toast static-toast" [attr.data-variant]="v.variant" [attr.aria-busy]="v.loading ? 'true' : null">
                @if (v.loading) {
                  <span class="mx-toast-icon mx-spinner" aria-hidden="true"></span>
                } @else if (v.variant) {
                  <span class="mx-toast-icon" aria-hidden="true"></span>
                }
                <div class="mx-toast-text">
                  <p class="mx-toast-title">{{ v.title }}</p>
                  <p class="mx-toast-description">{{ v.description }}</p>
                </div>
              </div>
              <p class="state-name">{{ v.name }}</p>
              <p class="state-note">{{ v.note }}</p>
            </div>
          }
        </div>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Erro com nova tentativa" note="Em erro o leitor de ecrã anuncia de imediato. A acção dá mais tempo (10 s).">
            <button mxButton type="button" variant="outline" size="sm" (click)="failWithRetry()">Sincronizar facturas</button>
          </doc-example>
          <doc-example title="A carregar e depois o resultado" note="toast.promise() usa a mesma notificação: começa a carregar e muda para sucesso ou erro.">
            <button mxButton type="button" variant="outline" size="sm" (click)="send(true)">Enviar (vai correr bem)</button>
            <button mxButton type="button" variant="outline" size="sm" (click)="send(false)">Enviar (vai falhar)</button>
          </doc-example>
          <doc-example title="Anular uma acção" note="Padrão para eliminações: a acção acontece logo e pode ser desfeita.">
            <button mxButton type="button" variant="outline" size="sm" (click)="undo()">Arquivar projecto</button>
          </doc-example>
          <doc-example title="Persistente" note="duration: 0. Só fecha com o botão ou com clear().">
            <button mxButton type="button" variant="outline" size="sm" (click)="toast.warning('Sem ligação à internet', { description: 'As alterações ficam guardadas e são enviadas quando voltar a ligação.', duration: 0 })">Simular sem ligação</button>
            <button mxButton type="button" variant="ghost" size="sm" (click)="toast.clear()">Fechar todas</button>
          </doc-example>
          <doc-example title="Posição" [note]="'Actual: ' + position()">
            @for (p of positions; track p.value) {
              <button mxButton type="button" size="sm" [variant]="position() === p.value ? 'default' : 'outline'" [attr.aria-pressed]="position() === p.value" (click)="setPosition(p.value)">{{ p.label }}</button>
            }
          </doc-example>
          <doc-example title="Só texto" note="Sem tipo: neutro, para confirmações simples.">
            <button mxButton type="button" variant="outline" size="sm" (click)="toast.show('Alterações guardadas')">Guardar</button>
          </doc-example>
        </div>
        <doc-callout>Não uses toasts para erros que impedem continuar ou para informação que a pessoa precisa de guardar: usa um Alert na página ou um Dialog.</doc-callout>
      </section>

      <section>
        <h2>Quando usar cada tipo</h2>
        <div class="mx-table-container">
          <table class="mx-table" data-density="compact">
            <thead><tr><th scope="col">Tipo</th><th scope="col">Cor</th><th scope="col">Quando</th><th scope="col">Anúncio</th></tr></thead>
            <tbody>
              <tr><td><code>danger</code></td><td>Vermelho (--mx-danger)</td><td>A acção falhou.</td><td>Imediato</td></tr>
              <tr><td><code>warning</code></td><td>Âmbar (--mx-warning)</td><td>Correu, mas há algo a ter em conta.</td><td>Educado</td></tr>
              <tr><td><code>success</code></td><td>Verde (--mx-success)</td><td>A acção terminou bem.</td><td>Educado</td></tr>
              <tr><td><code>info</code></td><td>Kwanza (--mx-accent)</td><td>Novidade que não resulta de uma acção.</td><td>Educado</td></tr>
              <tr><td><code>default</code></td><td>Neutro</td><td>Confirmação simples.</td><td>Educado</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Chega à acção e ao botão fechar.' }, { key: 'Enter', action: 'Activa a acção ou fecha.' }]"
          [aria]="[
            'O texto é anunciado por uma região aria-live: educada, ou imediata em danger.',
            'A cor não é a única pista: cada tipo tem ícone e o título descreve o resultado.',
            'A contagem pára com o rato ou o foco na notificação (WCAG 2.2.1).',
            'Enquanto carrega, a notificação tem aria-busy e não desaparece sozinha.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Alert' }, { name: 'Dialog' }, { name: 'Progress' }]" />
      </section>
    </article>
  `,
})
export class ToastPage {
  protected readonly toast = inject(MxToast);
  protected readonly position = signal<MxToastPosition>('bottom-right');
  protected readonly positions: { value: MxToastPosition; label: string }[] = [
    { value: 'top-left', label: 'Cima, esquerda' },
    { value: 'top-center', label: 'Cima, centro' },
    { value: 'top-right', label: 'Cima, direita' },
    { value: 'bottom-left', label: 'Baixo, esquerda' },
    { value: 'bottom-center', label: 'Baixo, centro' },
    { value: 'bottom-right', label: 'Baixo, direita' },
  ];
  protected readonly variants = [
    { name: 'Danger', variant: 'danger', title: 'Falha no envio', description: 'O servidor não respondeu.', note: 'Erro: vermelho, anúncio imediato.', loading: false },
    { name: 'Warning', variant: 'warning', title: 'Faltam 3 dias', description: 'FT 2026/0139 vence a 30/10.', note: 'Aviso: âmbar.', loading: false },
    { name: 'Success', variant: 'success', title: 'Factura enviada', description: 'Para Kianda Logística.', note: 'Sucesso: verde.', loading: false },
    { name: 'Info', variant: 'info', title: 'Nova versão', description: 'Actualiza para ver as novidades.', note: 'Informação: Kwanza.', loading: false },
    { name: 'Default', variant: null, title: 'Alterações guardadas', description: 'Há 2 segundos.', note: 'Neutro, sem ícone.', loading: false },
    { name: 'A carregar', variant: null, title: 'A enviar 30 facturas', description: 'Não feches a página.', note: 'loading: true; não desaparece.', loading: true },
  ];

  protected setPosition(p: MxToastPosition): void {
    this.position.set(p);
    this.toast.setPosition(p);
    this.toast.show('As notificações aparecem aqui');
  }

  protected failWithRetry(): void {
    this.toast.error('Não foi possível sincronizar', {
      description: '12 facturas ficaram por enviar.',
      action: { label: 'Tentar de novo', run: () => this.send(true) },
    });
  }

  protected send(ok: boolean): void {
    const work = new Promise<number>((resolve, reject) => setTimeout(() => (ok ? resolve(30) : reject(new Error('timeout'))), 1600));
    this.toast
      .promise(work, {
        loading: 'A enviar 30 facturas...',
        success: (n) => `${n} facturas enviadas`,
        error: 'O envio falhou: o servidor não respondeu',
      })
      .catch(() => undefined);
  }

  protected undo(): void {
    this.toast.show('Projecto arquivado', {
      action: { label: 'Anular', run: () => this.toast.success('Projecto reposto') },
    });
  }

  protected readonly previewCode = `const toast = inject(MxToast);

toast.success('Factura enviada', { description: 'FT 2026/0142 para Kianda Logística.' });
toast.error('Falha no envio', {
  description: 'O servidor não respondeu.',
  action: { label: 'Tentar de novo', run: () => reenviar() },
});
toast.warning('Faltam 3 dias');
toast.info('Nova versão disponível');

// a carregar e depois o resultado, na mesma notificação
toast.promise(enviar(), {
  loading: 'A enviar...',
  success: (n) => n + ' facturas enviadas',
  error: 'O envio falhou',
});`;

  protected readonly api: ApiRow[] = [
    { kind: 'Serviço', name: 'show(título, opções)', type: 'number', description: 'Mostra e devolve o id.' },
    { kind: 'Serviço', name: 'success(), error(), warning(), info()', type: 'number', description: 'Atalhos com o tipo definido.' },
    { kind: 'Serviço', name: 'promise(promessa, mensagens)', type: 'Promise<T>', description: 'A carregar, depois sucesso ou erro.' },
    { kind: 'Serviço', name: 'update(id, título, opções)', type: 'void', description: 'Muda uma notificação visível.' },
    { kind: 'Serviço', name: 'dismiss(id), clear()', type: 'void' },
    { kind: 'Serviço', name: 'setPosition(posição)', type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'", default: 'bottom-right' },
    { kind: 'Input', name: 'opções.variant', type: "'default' | 'info' | 'success' | 'warning' | 'danger'", default: 'default' },
    { kind: 'Input', name: 'opções.description', type: 'string' },
    { kind: 'Input', name: 'opções.duration', type: 'number', default: '5000 (10000 com acção)', description: '0 = não desaparece.' },
    { kind: 'Input', name: 'opções.action', type: '{ label, run }' },
    { kind: 'Input', name: 'opções.loading', type: 'boolean', default: 'false', description: 'Indicador de espera; fica até update().' },
    { kind: 'Token CSS', name: '--mx-danger, --mx-warning, --mx-success, --mx-accent', type: 'color', description: 'Cor de cada tipo.' },
  ];
}
