import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EXAMPLE_CODE, ExampleCode } from '../data/examples.generated';
import { MxTab, MxTabs } from '@muxima-ui/core/tabs';
import { MxTable } from '@muxima-ui/core/table';
import { Icon } from './icon';
import { CATALOG } from '../data/site';

export interface Crumb {
  label: string;
  path?: string;
}

/** Migalhas, título e frase de abertura de uma página. */
@Component({
  selector: 'doc-page-header',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="crumbs" aria-label="Localização">
      <ol>
        @for (c of crumbs(); track c.label; let last = $last) {
          <li>
            @if (c.path && !last) {
              <a [routerLink]="c.path">{{ c.label }}</a>
            } @else {
              <span [attr.aria-current]="last ? 'page' : null">{{ c.label }}</span>
            }
            @if (!last) {
              <doc-icon name="chevronRight" [size]="12" />
            }
          </li>
        }
      </ol>
    </nav>
    @if (eyebrow()) {
      <p class="eyebrow">{{ eyebrow() }}</p>
    }
    <h1 class="page-title">{{ title() }}</h1>
    <p class="page-lead">{{ lead() }}</p>
  `,
})
export class PageHeader {
  readonly crumbs = input<Crumb[]>([]);
  readonly eyebrow = input<string>('');
  readonly title = input.required<string>();
  readonly lead = input<string>('');
}

/** Bloco de código com botão de copiar. */
@Component({
  selector: 'doc-code',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="code-block" [class.flush]="flush()">
      <pre tabindex="0"><code>{{ code() }}</code></pre>
      <button type="button" class="copy-button" (click)="copy()" [attr.aria-label]="copied() ? 'Copiado' : 'Copiar código'">
        <doc-icon [name]="copied() ? 'check' : 'copy'" [size]="14" />
        <span aria-hidden="true">{{ copied() ? 'Copiado' : 'Copiar' }}</span>
      </button>
      <span class="mx-visually-hidden" aria-live="polite">{{ copied() ? 'Código copiado' : '' }}</span>
    </div>
  `,
})
export class CodeBlock {
  readonly code = input.required<string>();
  /** Sem borda nem margem, para usar dentro de outro cartão. */
  readonly flush = input(false);
  protected readonly copied = signal(false);

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1600);
    } catch {
      /* sem permissão para a área de transferência: o utilizador pode seleccionar o texto */
    }
  }
}

/** Pré-visualização ao vivo com separadores "Pré-visualização" e "Código". */
@Component({
  selector: 'doc-preview',
  imports: [MxTabs, MxTab, CodeBlock],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="preview">
      <mx-tabs [aria-label]="label()">
        <mx-tab label="Pré-visualização">
          <div class="preview-stage" [class.left]="align() === 'start'"><ng-content /></div>
        </mx-tab>
        <mx-tab label="Código">
          <doc-code [code]="code()" [flush]="true" />
        </mx-tab>
      </mx-tabs>
    </div>
  `,
})
export class Preview {
  readonly code = input.required<string>();
  readonly label = input('Exemplo');
  readonly align = input<'center' | 'start'>('center');
}

export interface StructureLabels {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  bottom: string;
}

/** Desenho da estrutura: o componente ao centro e as suas medidas à volta. */
@Component({
  selector: 'doc-structure',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="structure">
      <svg class="structure-lines" viewBox="0 0 640 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M150 34 H200 L232 62" />
        <path d="M490 34 H440 L408 62" />
        <path d="M150 128 H190 L232 112" />
        <path d="M490 128 H450 L408 112" />
        <rect x="226" y="56" width="188" height="62" rx="9" class="structure-ring" />
      </svg>
      <span class="structure-label tl">{{ labels().topLeft }}</span>
      <span class="structure-label tr">{{ labels().topRight }}</span>
      <span class="structure-label bl">{{ labels().bottomLeft }}</span>
      <span class="structure-label br">{{ labels().bottomRight }}</span>
      <div class="structure-sample"><ng-content /></div>
      <figcaption class="structure-caption">{{ labels().bottom }}</figcaption>
    </figure>
  `,
})
export class Structure {
  readonly labels = input.required<StructureLabels>();
}

export interface ApiRow {
  kind: 'Input' | 'Output' | 'Token CSS' | 'Método' | 'Directiva' | 'Serviço';
  name: string;
  type: string;
  default?: string;
  description?: string;
}

/** Referência da API: inputs, outputs, valores por omissão e tokens. */
@Component({
  selector: 'doc-api-table',
  imports: [MxTable],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-table-container">
      <table mxTable density="compact">
        <thead>
          <tr>
            <th scope="col">Categoria</th>
            <th scope="col">Propriedade</th>
            <th scope="col">Tipo / valor</th>
            <th scope="col">Por omissão</th>
            <th scope="col">Descrição</th>
          </tr>
        </thead>
        <tbody>
          @for (r of rows(); track r.kind + r.name) {
            <tr>
              <td>{{ r.kind }}</td>
              <td><code class="api-name">{{ r.name }}</code></td>
              <td><code class="api-type">{{ r.type }}</code></td>
              <td>{{ r.default ?? '—' }}</td>
              <td class="api-desc">{{ r.description ?? '' }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class ApiTable {
  readonly rows = input.required<ApiRow[]>();
}

export interface RelatedItem {
  name: string;
  path?: string;
}

/** Componentes relacionados no fim de cada página. */
@Component({
  selector: 'doc-related',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="related">
      @for (r of resolved(); track r.name) {
        <div class="card related-card">
          <strong>{{ r.name }}</strong>
          @if (r.path) {
            <a [routerLink]="r.path" class="text-link" [attr.aria-label]="'Ver ' + r.name">Ver componente →</a>
          } @else {
            <span class="muted">Em preparação</span>
          }
        </div>
      }
    </div>
  `,
})
export class Related {
  readonly items = input.required<RelatedItem[]>();
  /** Liga automaticamente aos componentes já documentados no catálogo. */
  protected readonly resolved = computed(() =>
    this.items().map((r) => ({ name: r.name, path: r.path ?? CATALOG.find((c) => c.name === r.name)?.path })),
  );
}

/** Caixa de nota com a linha de estado à esquerda. */
@Component({
  selector: 'doc-callout',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="callout" role="note"><doc-icon [name]="icon()" /><div><ng-content /></div></div>`,
})
export class Callout {
  readonly icon = input('info');
}

let nextCodeId = 0;

/** Código de um exemplo: separadores HTML e TypeScript. */
@Component({
  selector: 'doc-example-code',
  imports: [MxTabs, MxTab, CodeBlock],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="example-code">
      <mx-tabs [aria-label]="'Código de ' + label()">
        <mx-tab label="HTML"><doc-code [code]="code().html" [flush]="true" /></mx-tab>
        <mx-tab label="TypeScript"><doc-code [code]="code().ts" [flush]="true" /></mx-tab>
      </mx-tabs>
    </div>
  `,
})
export class ExampleCodeView {
  readonly code = input.required<ExampleCode>();
  readonly label = input('');
}

/** Procura o código gerado para um exemplo desta página. */
function lookupCode(router: Router, title: string): ExampleCode | undefined {
  const path = router.url.split(/[?#]/)[0].replace(/^\//, '');
  return EXAMPLE_CODE[`${path}|${title}`];
}

/** Botão "Ver código" partilhado pelos exemplos e pela grelha de estados. */
@Component({
  selector: 'doc-code-toggle',
  imports: [ExampleCodeView, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="code-toggle">
      <button type="button" class="code-toggle-button" [attr.aria-expanded]="open()" [attr.aria-controls]="panelId" (click)="open.set(!open())">
        <doc-icon name="code" [size]="14" />
        {{ open() ? 'Esconder código' : 'Ver código' }}
      </button>
    </div>
    <div [id]="panelId" [hidden]="!open()">
      @if (open()) {
        <doc-example-code [code]="code()" [label]="label()" />
      }
    </div>
  `,
})
export class CodeToggle {
  readonly code = input.required<ExampleCode>();
  readonly label = input('');
  protected readonly open = signal(false);
  protected readonly panelId = `code-${nextCodeId++}`;
}

/** Cartão de exemplo com título e o seu código (HTML e TypeScript). */
@Component({
  selector: 'doc-example',
  imports: [CodeToggle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="card example-card" [attr.aria-label]="title()">
      <h3>{{ title() }}</h3>
      <div class="example-body"><ng-content /></div>
      @if (note()) {
        <p class="example-note">{{ note() }}</p>
      }
      @if (resolved(); as c) {
        <doc-code-toggle [code]="c" [label]="title()" />
      }
    </section>
  `,
})
export class Example {
  readonly title = input.required<string>();
  readonly note = input('');
  /** Código explícito; por omissão vem do ficheiro gerado a partir da página. */
  readonly code = input<ExampleCode | undefined>(undefined);
  private readonly router = inject(Router);
  protected readonly resolved = computed(() => this.code() ?? lookupCode(this.router, this.title()));
}

/** Os dois cartões de acessibilidade de cada componente. */
@Component({
  selector: 'doc-a11y',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid-2">
      <section class="card a11y-card">
        <h3>Navegação por teclado</h3>
        <dl class="keys">
          @for (k of keys(); track k.key) {
            <div>
              <dt><kbd>{{ k.key }}</kbd></dt>
              <dd>{{ k.action }}</dd>
            </div>
          }
        </dl>
      </section>
      <section class="card a11y-card">
        <h3>Semântica e ARIA</h3>
        <ul class="plain-list">
          @for (n of aria(); track n) {
            <li>{{ n }}</li>
          }
        </ul>
      </section>
    </div>
  `,
})
export class A11y {
  readonly keys = input.required<{ key: string; action: string }[]>();
  readonly aria = input.required<string[]>();
}

/**
 * Grelha de estados de um componente. Cada célula mostra um estado com o seu nome.
 * Hover, foco e activo são forçados com data-mx-state, para se verem sem interacção.
 */
@Component({
  selector: 'doc-states',
  imports: [CodeToggle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'states-block' },
  template: `
    <div class="states-grid" role="list"><ng-content /></div>
    @if (code; as c) {
      <doc-code-toggle [code]="c" label="Estados" />
    }
  `,
})
export class States {
  protected readonly code = lookupCode(inject(Router), 'Estados');
}

@Component({
  selector: 'doc-state',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'state-cell', role: 'listitem' },
  template: `
    <div class="state-sample" inert><ng-content /></div>
    <p class="state-name">{{ name() }}</p>
    @if (note()) {
      <p class="state-note">{{ note() }}</p>
    }
  `,
})
export class State {
  readonly name = input.required<string>();
  readonly note = input('');
}

export const DOC_UI = [PageHeader, CodeBlock, Preview, Structure, ApiTable, Related, Callout, Example, A11y, States, State, CodeToggle] as const;
