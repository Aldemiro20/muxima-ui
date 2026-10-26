import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxTab, MxTabs } from '@muxima-ui/core/tabs';
import { MxTable } from '@muxima-ui/core/table';
import { Icon } from './icon';

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
      <pre><code>{{ code() }}</code></pre>
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

export interface AnatomyLabels {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  bottom: string;
}

/** Desenho de anatomia: o componente ao centro e as suas medidas à volta. */
@Component({
  selector: 'doc-anatomy',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="anatomy">
      <svg class="anatomy-lines" viewBox="0 0 640 180" preserveAspectRatio="none" aria-hidden="true">
        <path d="M150 34 H200 L232 62" />
        <path d="M490 34 H440 L408 62" />
        <path d="M150 128 H190 L232 112" />
        <path d="M490 128 H450 L408 112" />
        <rect x="226" y="56" width="188" height="62" rx="9" class="anatomy-ring" />
      </svg>
      <span class="anatomy-label tl">{{ labels().topLeft }}</span>
      <span class="anatomy-label tr">{{ labels().topRight }}</span>
      <span class="anatomy-label bl">{{ labels().bottomLeft }}</span>
      <span class="anatomy-label br">{{ labels().bottomRight }}</span>
      <div class="anatomy-sample"><ng-content /></div>
      <figcaption class="anatomy-caption">{{ labels().bottom }}</figcaption>
    </figure>
  `,
})
export class Anatomy {
  readonly labels = input.required<AnatomyLabels>();
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
      @for (r of items(); track r.name) {
        <div class="card related-card">
          <strong>{{ r.name }}</strong>
          @if (r.path) {
            <a [routerLink]="r.path" class="text-link">Ver componente →</a>
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

/** Cartão de exemplo com título. */
@Component({
  selector: 'doc-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="card example-card" [attr.aria-label]="title()">
      <h3>{{ title() }}</h3>
      <div class="example-body"><ng-content /></div>
      @if (note()) {
        <p class="example-note">{{ note() }}</p>
      }
    </section>
  `,
})
export class Example {
  readonly title = input.required<string>();
  readonly note = input('');
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

export const DOC_UI = [PageHeader, CodeBlock, Preview, Anatomy, ApiTable, Related, Callout, Example, A11y] as const;
