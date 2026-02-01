import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent, Language } from '@muxima-ui/language-selector';

@Component({
  selector: 'app-language-selector-doc',
  standalone: true,
  imports: [CommonModule, LanguageSelectorComponent],
  templateUrl: './language-selector-doc.component.html',
  styleUrls: ['./language-selector-doc.component.scss']
})
export class LanguageSelectorDocComponent {
  selectedLanguage = 'en';

  // Default languages
  defaultLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' }
  ];

  // Extended language list
  allLanguages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
    { code: 'pt-br', name: 'Portuguese (Brazil)', flag: '🇧🇷', nativeName: 'Português (Brasil)' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' }
  ];

  onLanguageChange(languageCode: string): void {
    this.selectedLanguage = languageCode;
    console.log('Language changed to:', languageCode);
    
    // Simulate i18n integration
    // this.translateService.use(languageCode);
    // localStorage.setItem('selectedLanguage', languageCode);
  }

  codeExamples = {
    basic: `<muxima-language-selector
  [(selectedLanguage)]="selectedLanguage"
  (languageChange)="onLanguageChange($event)">
</muxima-language-selector>

selectedLanguage = 'en';

onLanguageChange(languageCode: string): void {
  console.log('Language changed to:', languageCode);
}`,
    customLanguages: `<muxima-language-selector
  [(selectedLanguage)]="selectedLanguage"
  [languages]="customLanguages"
  [position]="'bottom-left'"
  (languageChange)="onLanguageChange($event)">
</muxima-language-selector>

customLanguages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'pt-br', name: 'Portuguese (Brazil)', flag: '🇧🇷', nativeName: 'Português (Brasil)' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' }
];`,
    positions: `<!-- Bottom Right (default) -->
<muxima-language-selector [position]="'bottom-right'">
</muxima-language-selector>

<!-- Bottom Left -->
<muxima-language-selector [position]="'bottom-left'">
</muxima-language-selector>

<!-- Top Right -->
<muxima-language-selector [position]="'top-right'">
</muxima-language-selector>

<!-- Top Left -->
<muxima-language-selector [position]="'top-left'">
</muxima-language-selector>`,
    ngxTranslate: `import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@Component({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
    
    // Load from localStorage
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    translate.use(savedLang);
  }

  onLanguageChange(languageCode: string): void {
    this.translate.use(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
  }
}`
  };
}
