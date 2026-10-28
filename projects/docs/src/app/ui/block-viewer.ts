import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MxTab, MxTabs } from '@muxima-ui/core/tabs';
import { BlockCategory, BlockVariant } from '../blocks/registry';
import { BLOCK_CODE } from '../data/blocks.generated';
import { CATALOG } from '../data/site';
import { ThemeService } from '../shell/theme.service';
import { CodeBlock } from './doc-ui';
import { Icon } from './icon';

const WIDTHS = [
  { label: 'Ecrã inteiro', value: '100%' },
  { label: 'Tablet', value: '768px' },
  { label: 'Telemóvel', value: '375px' },
];

/**
 * Um bloco: pré-visualização num iframe (para as larguras e o modo escuro serem reais)
 * e o código dos três ficheiros para copiar.
 */
@Component({
  selector: 'doc-block-viewer',
  imports: [MxTabs, MxTab, CodeBlock, RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="block-viewer" [attr.aria-labelledby]="variant().id + '-titulo'">
      <div class="block-head">
        <div class="block-head-text">
          <h2 [id]="variant().id + '-titulo'">{{ variant().title }}</h2>
          <p>{{ variant().description }}</p>
        </div>
        <div class="block-tools">
          <div class="chips" role="group" [attr.aria-label]="'Largura da pré-visualização: ' + variant().title">
            @for (w of widths; track w.value) {
              <button type="button" class="chip" [attr.aria-pressed]="width() === w.value" (click)="width.set(w.value)">
                {{ w.label }}
              </button>
            }
          </div>
          <a class="text-link small block-open" [href]="'/blocos/ver/' + variant().id" target="_blank" rel="noopener">
            Abrir numa página<span class="mx-visually-hidden">: {{ variant().title }} (abre num separador novo)</span>
            <doc-icon name="external" [size]="12" />
          </a>
        </div>
      </div>

      <mx-tabs [aria-label]="'Bloco ' + variant().title">
        <mx-tab label="Pré-visualização">
          <div class="block-stage">
            <iframe
              #frame
              class="block-frame"
              [style.width]="width()"
              [style.height.px]="height()"
              [src]="src()"
              [title]="'Pré-visualização do bloco ' + category().name + ': ' + variant().title"
              (load)="syncTheme()"
            ></iframe>
          </div>
        </mx-tab>
        <mx-tab label="Código">
          <div class="example-code">
            <mx-tabs [aria-label]="'Ficheiros do bloco ' + variant().title">
              <mx-tab [label]="variant().id + '.ts'"><doc-code [code]="code().ts" [flush]="true" /></mx-tab>
              <mx-tab [label]="variant().id + '.html'"><doc-code [code]="code().html" [flush]="true" /></mx-tab>
              <mx-tab [label]="variant().id + '.css'"><doc-code [code]="code().css" [flush]="true" /></mx-tab>
            </mx-tabs>
          </div>
        </mx-tab>
      </mx-tabs>

      <p class="block-uses">
        <span class="muted">Usa:</span>
        @for (u of uses(); track u.name; let last = $last) {
          @if (u.path) {
            <a class="text-link" [routerLink]="u.path">{{ u.name }}</a>
          } @else {
            <span>{{ u.name }}</span>
          }
          @if (!last) {
            <span aria-hidden="true">·</span>
          }
        }
      </p>
    </section>
  `,
})
export class BlockViewer {
  readonly category = input.required<BlockCategory>();
  readonly variant = input.required<BlockVariant>();

  protected readonly widths = WIDTHS;
  protected readonly width = signal('100%');
  protected readonly height = signal(420);
  private readonly frame = viewChild.required<ElementRef<HTMLIFrameElement>>('frame');
  private readonly theme = inject(ThemeService);
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly src = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(`/blocos/ver/${this.variant().id}`),
  );
  protected readonly code = computed(() => BLOCK_CODE[this.variant().id] ?? { ts: '', html: '', css: '' });
  protected readonly uses = computed(() =>
    this.variant().uses.map((name) => ({ name, path: CATALOG.find((c) => c.name === name)?.path })),
  );

  constructor() {
    // a página do bloco envia a sua altura sempre que muda
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== location.origin || e.source !== this.frame().nativeElement.contentWindow) return;
      if (e.data?.type === 'mx-block-height' && typeof e.data.height === 'number') {
        this.height.set(Math.max(120, Math.ceil(e.data.height)));
      }
    };
    window.addEventListener('message', onMessage);
    inject(DestroyRef).onDestroy(() => window.removeEventListener('message', onMessage));
    effect(() => {
      this.theme.mode();
      this.syncTheme();
    });
  }

  /** O iframe segue o modo claro/escuro do site. */
  protected syncTheme(): void {
    const doc = this.frame().nativeElement.contentDocument;
    doc?.documentElement.setAttribute('data-theme', this.theme.mode());
  }
}
