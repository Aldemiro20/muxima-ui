import { Component, Input, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName?: string;
}

export type LanguagePosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

@Component({
  selector: 'muxima-language-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  @Input() languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' }
  ];
  
  @Input() selectedLanguage: string = 'en';
  @Input() position: LanguagePosition = 'bottom-right';
  @Input() showNativeName: boolean = true;
  @Input() showLanguageCode: boolean = false;

  @Output() selectedLanguageChange = new EventEmitter<string>();
  @Output() languageChange = new EventEmitter<string>();

  isOpen: boolean = false;

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectLanguage(language: Language) {
    this.selectedLanguage = language.code;
    this.selectedLanguageChange.emit(language.code);
    this.languageChange.emit(language.code);
    this.isOpen = false;
  }

  getCurrentLanguage(): Language | undefined {
    return this.languages.find(lang => lang.code === this.selectedLanguage);
  }

  get positionClass(): string {
    return `dropdown-${this.position}`;
  }
}
