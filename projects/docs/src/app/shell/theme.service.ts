import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

/** Modo claro/escuro do site. Respeita o sistema até o utilizador escolher. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  readonly mode = signal<ThemeMode>(this.initial());

  toggle(): void {
    this.set(this.mode() === 'dark' ? 'light' : 'dark');
  }

  set(mode: ThemeMode): void {
    this.mode.set(mode);
    this.doc.documentElement.setAttribute('data-theme', mode);
    try {
      localStorage.setItem('muxima-theme', mode);
    } catch {
      /* armazenamento indisponível: o modo vale só nesta visita */
    }
  }

  private initial(): ThemeMode {
    const attr = this.doc.documentElement.getAttribute('data-theme');
    if (attr === 'light' || attr === 'dark') return attr;
    return this.doc.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
