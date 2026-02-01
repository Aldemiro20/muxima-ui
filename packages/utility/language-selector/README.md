# Language Selector Component

Seletor de idiomas elegante com bandeiras, i18n e dropdown customizável.

## Características

- 🌍 **Bandeiras**: Emojis de bandeiras para identificação visual
- 🎯 **i18n Ready**: Suporte completo para internacionalização
- 🎨 **Nomes Nativos**: Exibe nome do idioma na língua nativa
- ✅ **Seleção Visual**: Checkmark no idioma selecionado
- 📍 **4 Posições**: Bottom/Top, Right/Left
- 🎨 **Tema Roxo**: Gradiente #667eea → #764ba2
- 📱 **Responsivo**: Adaptação automática para mobile

## Instalação

```typescript
import { LanguageSelectorComponent, Language } from '@muxima-ui/language-selector';

@Component({
  standalone: true,
  imports: [LanguageSelectorComponent],
  // ...
})
```

## Uso Básico

```typescript
// Component
languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' }
];

selectedLanguage = 'en';

onLanguageChange(language: Language) {
  console.log('Language changed:', language);
  // Update i18n service
  this.translateService.use(language.code);
}
```

```html
<muxima-language-selector
  [languages]="languages"
  [selectedLanguage]="selectedLanguage"
  (languageChange)="onLanguageChange($event)">
</muxima-language-selector>
```

## Props

### @Input

| Propriedade | Tipo | Padrão | Descrição |
|------------|------|--------|-----------|
| `languages` | Language[] | [en, pt, es, fr] | Array de idiomas disponíveis |
| `selectedLanguage` | string | 'en' | Código do idioma selecionado |
| `position` | 'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left' | 'bottom-right' | Posição do dropdown |
| `showNativeName` | boolean | true | Exibe nome nativo do idioma |
| `showLanguageCode` | boolean | false | Exibe código do idioma (en, pt, etc) |

### @Output

| Evento | Tipo | Descrição |
|--------|------|-----------|
| `languageChange` | EventEmitter<string> | Emitido quando um idioma é selecionado, retorna o código do idioma |
| `selectedLanguageChange` | EventEmitter<string> | Emitido para two-way binding, retorna o código do idioma |

## Interface Language

```typescript
export interface Language {
  code: string;           // ISO 639-1 code (en, pt, es)
  name: string;           // English name
  flag: string;           // Emoji flag
  nativeName?: string;    // Native language name (optional)
}
```

## Idiomas Padrão

```typescript
[
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' }
]
```

## Idiomas Customizados

```typescript
customLanguages: Language[] = [
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' }
];
```

## Com @ngx-translate

```typescript
import { TranslateService } from '@ngx-translate/core';

constructor(private translate: TranslateService) {
  this.translate.setDefaultLang('en');
}

onLanguageChange(language: Language) {
  this.translate.use(language.code);
  localStorage.setItem('selectedLanguage', language.code);
}
```

## Posições

```html
<!-- Bottom Right (Default) -->
<muxima-language-selector position="bottom-right"></muxima-language-selector>

<!-- Bottom Left -->
<muxima-language-selector position="bottom-left"></muxima-language-selector>

<!-- Top Right -->
<muxima-language-selector position="top-right"></muxima-language-selector>

<!-- Top Left -->
<muxima-language-selector position="top-left"></muxima-language-selector>
```

## Exibir Código do Idioma

```html
<muxima-language-selector
  [languages]="languages"
  [showLanguageCode]="true">
</muxima-language-selector>
<!-- Displays: 🇺🇸 English (en) -->
```

## Sem Nome Nativo

```html
<muxima-language-selector
  [languages]="languages"
  [showNativeName]="false">
</muxima-language-selector>
<!-- Displays only: 🇺🇸 -->
```

## Casos de Uso

- **Sites Multilíngues**: Permitir usuários alterarem idioma da interface
- **Plataformas Globais**: Suporte a múltiplas regiões e línguas
- **E-learning**: Cursos em diferentes idiomas
- **E-commerce Internacional**: Vendas em múltiplos países
- **Documentação**: Docs técnicas em várias línguas

## Integração com i18n

### Angular i18n

```typescript
import { LOCALE_ID } from '@angular/core';

providers: [
  { provide: LOCALE_ID, useValue: 'pt-BR' }
]
```

### ngx-translate

```typescript
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

imports: [
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  })
]
```

## Boas Práticas

- ✅ Limite a 8-12 idiomas para melhor UX
- ✅ Sempre mostre nome nativo (familiar para usuários)
- ✅ Persista seleção em localStorage ou cookies
- ✅ Use códigos ISO 639-1 padrão (en, pt, es)
- ✅ Carregue traduções dinamicamente (lazy loading)
- ✅ Detecte idioma do navegador como padrão
- ✅ Teste RTL para idiomas como Árabe/Hebraico
- ✅ Use bandeiras de países, não de regiões

## Bandeiras Comuns

| Código | Bandeira | Idioma |
|--------|----------|--------|
| en | 🇺🇸 | English (US) |
| en-gb | 🇬🇧 | English (UK) |
| pt | 🇵🇹 | Português (PT) |
| pt-br | 🇧🇷 | Português (BR) |
| es | 🇪🇸 | Español |
| fr | 🇫🇷 | Français |
| de | 🇩🇪 | Deutsch |
| it | 🇮🇹 | Italiano |
| zh | 🇨🇳 | 中文 |
| ja | 🇯🇵 | 日本語 |
| ko | 🇰🇷 | 한국어 |
| ru | 🇷🇺 | Русский |
| ar | 🇸🇦 | العربية |
