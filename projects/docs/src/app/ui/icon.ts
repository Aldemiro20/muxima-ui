import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/** Ícones de linha da documentação (24 px, traço 1,75). */
const ICONS: Record<string, string> = {
  message: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-5 4V5.5z"/>',
  terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7.5 9.5l2.5 2.5-2.5 2.5M12.5 15h4"/>',
  sliders: '<path d="M4 8h9M17 8h3M15 5.5v5M4 16h3M11 16h9M9 13.5v5"/>',
  moon: '<path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.5 6.5 0 0 0 10 10z"/>',
  box: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/>',
  file: '<path d="M6.5 3h7l4 4v13.5a.5.5 0 0 1-.5.5h-10.5a.5.5 0 0 1-.5-.5V3.5a.5.5 0 0 1 .5-.5z"/><path d="M13.5 3v4h4"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 10v10"/>',
  layers: '<path d="M12 3.5l8.5 4.5L12 12.5 3.5 8 12 3.5z"/><path d="M3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5"/>',
  grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
  shield: '<path d="M12 3l7 3v5.5c0 4.3-2.9 7.8-7 9.5-4.1-1.7-7-5.2-7-9.5V6l7-3z"/><path d="M9 12l2 2 4-4"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.6a3.5 3.5 0 0 1 0 6.8M21 20c0-2.6-1.6-4.8-4-5.6"/>',
  code: '<path d="M8.5 8l-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
  arrowRight: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  copy: '<rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2"/><path d="M15.5 8.5V6A2 2 0 0 0 13.5 4H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>',
  chevronRight: '<path d="M9.5 6l6 6-6 6"/>',
  sparkle: '<path d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9L12 3.5z"/><path d="M18.5 16v4M16.5 18h4"/>',
  tabs: '<rect x="3" y="5" width="18" height="15" rx="2"/><path d="M3 10h18M9.5 5v5"/>',
  x: '<path d="M6 6l12 12M18 6L6 18"/>',
  book: '<path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5v-13zM20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5v-13z"/>',
  monitor: '<rect x="3" y="4" width="18" height="12.5" rx="2"/><path d="M8.5 20h7M12 16.5V20"/>',
  folder: '<path d="M3.5 6.5A1.5 1.5 0 0 1 5 5h4.5l2 2.5H19a1.5 1.5 0 0 1 1.5 1.5v9A1.5 1.5 0 0 1 19 19.5H5A1.5 1.5 0 0 1 3.5 18V6.5z"/>',
  chart: '<path d="M4 20V4M4 20h16"/><path d="M7.5 15l3.5-4 3 2.5 5-6"/>',
  lock: '<rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3"/>',
  keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7.5 14h9"/>',
  spark: '<path d="M4 12h3l2-6 4 12 2-6h5"/>',
};

@Component({
  selector: 'doc-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'doc-icon' },
  template: `<svg
    viewBox="0 0 24 24"
    [attr.width]="size()"
    [attr.height]="size()"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    [innerHTML]="svg()"
  ></svg>`,
})
export class Icon {
  readonly name = input.required<string>();
  readonly size = input(16);
  private readonly sanitizer = inject(DomSanitizer);
  // Os desenhos são constantes deste ficheiro, nunca texto vindo do utilizador.
  protected readonly svg = computed(() => this.sanitizer.bypassSecurityTrustHtml(ICONS[this.name()] ?? ''));
}
