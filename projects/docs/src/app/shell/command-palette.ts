import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MxDialogRef } from '@muxima-ui/core/dialog';
import { MxInput } from '@muxima-ui/core/form-field';
import { CATALOG, SIDEBAR, TOP_NAV } from '../data/site';
import { Icon } from '../ui/icon';

interface Entry {
  label: string;
  group: string;
  path: string;
  icon: string;
}

const ENTRIES: Entry[] = [
  ...TOP_NAV.filter((n) => n.path !== '/docs').map((n) => ({ label: n.label, group: 'Páginas', path: n.path, icon: 'arrowRight' })),
  ...SIDEBAR.slice(0, 1).flatMap((g) => g.items.map((i) => ({ label: i.label, group: 'Documentação', path: i.path, icon: i.icon }))),
  ...CATALOG.filter((c) => c.path).map((c) => ({ label: c.name, group: 'Componentes', path: c.path!, icon: c.icon })),
];

const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** Pesquisa do site (Ctrl+K). Padrão combobox com lista: setas, Enter e Escape. */
@Component({
  selector: 'doc-command-palette',
  imports: [MxInput, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="palette">
      <div class="palette-search">
        <doc-icon name="search" />
        <input
          mxInput
          class="palette-input"
          type="text"
          role="combobox"
          aria-label="Pesquisar na documentação"
          aria-autocomplete="list"
          aria-expanded="true"
          aria-controls="palette-list"
          [attr.aria-activedescendant]="results().length ? 'palette-opt-' + active() : null"
          placeholder="Pesquisar componentes e páginas..."
          autocomplete="off"
          [value]="query()"
          (input)="onInput($event)"
          (keydown)="onKeydown($event)"
        />
      </div>
      <ul id="palette-list" class="palette-list" role="listbox" aria-label="Resultados">
        @for (r of results(); track r.path + r.label; let i = $index) {
          <li
            role="option"
            class="palette-option"
            [id]="'palette-opt-' + i"
            [attr.aria-selected]="i === active()"
            (mousemove)="active.set(i)"
            (click)="go(r)"
          >
            <doc-icon [name]="r.icon" />
            <span>{{ r.label }}</span>
            <span class="palette-group">{{ r.group }}</span>
          </li>
        } @empty {
          <li class="palette-empty" role="presentation">Nada encontrado para "{{ query() }}".</li>
        }
      </ul>
      <div class="palette-footer" aria-hidden="true">
        <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
        <span><kbd>Enter</kbd> abrir</span>
        <span><kbd>Esc</kbd> fechar</span>
      </div>
    </div>
  `,
})
export class CommandPalette {
  private readonly router = inject(Router);
  private readonly ref = inject(MxDialogRef);

  protected readonly query = signal('');
  protected readonly active = signal(0);
  protected readonly results = computed(() => {
    const q = normalize(this.query().trim());
    if (!q) return ENTRIES;
    return ENTRIES.filter((e) => normalize(e.label).includes(q) || normalize(e.group).includes(q));
  });

  protected onInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.active.set(0);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const n = this.results().length;
    if (event.key === 'ArrowDown' && n) {
      event.preventDefault();
      this.active.update((i) => (i + 1) % n);
    } else if (event.key === 'ArrowUp' && n) {
      event.preventDefault();
      this.active.update((i) => (i - 1 + n) % n);
    } else if (event.key === 'Enter' && n) {
      event.preventDefault();
      this.go(this.results()[this.active()]);
    }
    queueMicrotask(() =>
      document.getElementById('palette-opt-' + this.active())?.scrollIntoView({ block: 'nearest' }),
    );
  }

  protected go(entry: Entry): void {
    this.ref.close();
    this.router.navigateByUrl(entry.path);
  }
}
