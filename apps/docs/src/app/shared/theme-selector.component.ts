import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'muxima-theme-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-selector">
      <button 
        class="theme-toggle" 
        (click)="isOpen = !isOpen"
        title="Alterar Tema">
        🎨
      </button>
      
      <div class="theme-dropdown" [class.open]="isOpen">
        <div class="theme-dropdown-header">
          <span>Escolher Tema</span>
          <button class="close-btn" (click)="isOpen = false">✕</button>
        </div>
        
        <div class="theme-options">
          <button
            *ngFor="let theme of themeService.themes"
            class="theme-option"
            [class.active]="currentTheme === theme.id"
            (click)="selectTheme(theme)">
            <div class="theme-preview">
              <span class="theme-dot" [style.background]="theme.primary"></span>
              <span class="theme-dot" [style.background]="theme.secondary"></span>
              <span class="theme-dot" [style.background]="theme.accent"></span>
            </div>
            <div class="theme-info">
              <span class="theme-icon">{{ theme.icon }}</span>
              <span class="theme-name">{{ theme.name }}</span>
            </div>
            <span class="checkmark" *ngIf="currentTheme === theme.id">✓</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .theme-selector {
      position: relative;
    }

    .theme-toggle {
      width: 42px;
      height: 42px;
      border-radius: 10px;
      border: 2px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
      cursor: pointer;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    }

    .theme-toggle:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }

    .theme-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 320px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      z-index: 1000;
    }

    .theme-dropdown.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .theme-dropdown-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid #e5e7eb;
    }

    .theme-dropdown-header span {
      font-weight: 600;
      color: #1f2937;
      font-size: 14px;
    }

    .close-btn {
      width: 24px;
      height: 24px;
      border: none;
      background: transparent;
      cursor: pointer;
      color: #6b7280;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transition: all 0.2s ease;
    }

    .close-btn:hover {
      background: #f3f4f6;
      color: #1f2937;
    }

    .theme-options {
      padding: 8px;
      max-height: 400px;
      overflow-y: auto;
    }

    .theme-option {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border: 2px solid transparent;
      background: transparent;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
    }

    .theme-option:hover {
      background: #f9fafb;
      border-color: #e5e7eb;
    }

    .theme-option.active {
      background: #f0f9ff;
      border-color: var(--muxima-primary);
    }

    .theme-preview {
      display: flex;
      gap: 4px;
    }

    .theme-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .theme-info {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .theme-icon {
      font-size: 18px;
    }

    .theme-name {
      font-size: 14px;
      font-weight: 500;
      color: #374151;
    }

    .checkmark {
      color: var(--muxima-primary);
      font-weight: 700;
      font-size: 16px;
    }

    /* Scrollbar */
    .theme-options::-webkit-scrollbar {
      width: 6px;
    }

    .theme-options::-webkit-scrollbar-track {
      background: #f3f4f6;
      border-radius: 10px;
    }

    .theme-options::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 10px;
    }

    .theme-options::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }
  `]
})
export class ThemeSelectorComponent {
  isOpen = false;
  currentTheme = 'purple';

  constructor(public themeService: ThemeService) {
    this.themeService.currentTheme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  selectTheme(theme: any): void {
    this.themeService.applyTheme(theme);
    this.isOpen = false;
  }
}
