import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Theme {
  id: string;
  name: string;
  icon: string;
  primary: string;
  secondary: string;
  accent: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<string>('purple');
  currentTheme$ = this.currentThemeSubject.asObservable();

  themes: Theme[] = [
    {
      id: 'purple',
      name: 'Purple Gradient',
      icon: '💜',
      primary: '#667eea',
      secondary: '#764ba2',
      accent: '#8b9df8'
    },
    {
      id: 'ocean',
      name: 'Ocean Blue',
      icon: '🌊',
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#38bdf8'
    },
    {
      id: 'forest',
      name: 'Forest Green',
      icon: '🌲',
      primary: '#10b981',
      secondary: '#059669',
      accent: '#34d399'
    },
    {
      id: 'sunset',
      name: 'Sunset Orange',
      icon: '🌅',
      primary: '#f59e0b',
      secondary: '#ef4444',
      accent: '#fbbf24'
    },
    {
      id: 'night',
      name: 'Midnight',
      icon: '🌙',
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#a78bfa'
    },
    {
      id: 'rose',
      name: 'Rose Pink',
      icon: '🌹',
      primary: '#ec4899',
      secondary: '#f43f5e',
      accent: '#fb7185'
    }
  ];

  constructor() {
    // Carregar tema salvo do localStorage
    const savedTheme = localStorage.getItem('muxima-theme');
    if (savedTheme) {
      const theme = this.themes.find(t => t.id === savedTheme);
      if (theme) {
        this.applyTheme(theme);
      }
    }
  }

  getCurrentTheme(): string {
    return this.currentThemeSubject.value;
  }

  applyTheme(theme: Theme): void {
    this.currentThemeSubject.next(theme.id);
    const root = document.documentElement;
    
    // Aplicar cores do tema
    root.style.setProperty('--muxima-primary', theme.primary);
    root.style.setProperty('--muxima-secondary', theme.secondary);
    root.style.setProperty('--muxima-accent', theme.accent);
    
    // Calcular variações de cores
    root.style.setProperty('--muxima-primary-light', this.lightenColor(theme.primary, 20));
    root.style.setProperty('--muxima-primary-dark', this.darkenColor(theme.primary, 20));
    root.style.setProperty('--muxima-secondary-light', this.lightenColor(theme.secondary, 20));
    root.style.setProperty('--muxima-secondary-dark', this.darkenColor(theme.secondary, 20));
    
    // Atualizar gradiente
    root.style.setProperty('--muxima-gradient', `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`);
    
    // Salvar no localStorage
    localStorage.setItem('muxima-theme', theme.id);
    
    // Adicionar classe do tema no body
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add(`theme-${theme.id}`);
  }

  getThemeById(id: string): Theme | undefined {
    return this.themes.find(t => t.id === id);
  }

  private lightenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    ).toString(16).slice(1);
  }

  private darkenColor(color: string, percent: number): string {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return '#' + (
      0x1000000 +
      (R > 0 ? R : 0) * 0x10000 +
      (G > 0 ? G : 0) * 0x100 +
      (B > 0 ? B : 0)
    ).toString(16).slice(1);
  }
}
