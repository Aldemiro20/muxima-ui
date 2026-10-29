import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  DestroyRef,
  ElementRef,
  Type,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { findBlock } from '../blocks/registry';

/**
 * A page with only one block, without the site header. It's what appears in the preview iframe
 * and in "Open in a page". It sends its height to the site so the iframe
 * always matches the content size.
 */
@Component({
  selector: 'doc-bloco-ver',
  imports: [NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block-page' },
  encapsulation: ViewEncapsulation.None,
  // without the site styles: only the background and font an app would have
  styles: `
    html:has(.block-page) {
      background: var(--mx-paper);
      color: var(--mx-ink);
    }
    body:has(.block-page) {
      margin: 0;
    }
    /* flow-root: as margens do bloco ficam dentro, e a altura medida é a real */
    .block-page {
      display: flow-root;
    }
    .block-missing {
      padding: 24px;
      font-family: var(--mx-font-sans);
    }
  `,
  template: `
    <main id="conteudo">
      <h1 class="mx-visually-hidden">{{ heading() }}</h1>
      @if (component(); as c) {
        <ng-container *ngComponentOutlet="c" />
      } @else if (!found()) {
        <p class="block-missing">This block doesn't exist.</p>
      }
    </main>
  `,
})
export class BlocoVerPage {
  readonly id = input.required<string>();
  protected readonly found = computed(() => findBlock(this.id()));
  protected readonly heading = computed(() => {
    const f = this.found();
    return f ? `Block ${f.category.name}: ${f.variant.title}` : 'Block not found';
  });
  protected readonly component = signal<Type<unknown> | null>(null);

  constructor() {
    const title = inject(Title);
    effect(() => {
      const f = this.found();
      title.setTitle(`${this.heading()} · Muxima UI`);
      this.component.set(null);
      f?.variant.load().then((c) => this.component.set(c));
    });

    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      if (window.parent === window) return;
      const send = () =>
        window.parent.postMessage({ type: 'mx-block-height', height: host.getBoundingClientRect().height }, location.origin);
      const observer = new ResizeObserver(send);
      observer.observe(host);
      send();
      destroy.onDestroy(() => observer.disconnect());
    });
  }
}
