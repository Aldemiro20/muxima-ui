import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageSelectorComponent } from './language-selector.component';
import { Language } from './language-selector.component';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSelectorComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default languages', () => {
    expect(component.languages.length).toBe(4);
    expect(component.languages[0].code).toBe('en');
    expect(component.languages[1].code).toBe('pt');
    expect(component.languages[2].code).toBe('es');
    expect(component.languages[3].code).toBe('fr');
  });

  it('should display current language flag and name', () => {
    component.selectedLanguage = 'en';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const button = compiled.querySelector('.language-button');
    expect(button?.textContent).toContain('🇺🇸');
    expect(button?.textContent).toContain('English');
  });

  it('should get current language correctly', () => {
    component.selectedLanguage = 'pt';
    const currentLang = component.getCurrentLanguage();
    expect(currentLang?.code).toBe('pt');
    expect(currentLang?.name).toBe('Portuguese');
    expect(currentLang?.flag).toBe('🇵🇹');
  });

  it('should toggle dropdown when button is clicked', () => {
    const button = fixture.nativeElement.querySelector('.language-button');
    expect(component.isOpen).toBeFalse();
    
    button.click();
    fixture.detectChanges();
    expect(component.isOpen).toBeTrue();
    
    button.click();
    fixture.detectChanges();
    expect(component.isOpen).toBeFalse();
  });

  it('should emit languageChange event when language is selected', () => {
    spyOn(component.languageChange, 'emit');
    
    const spanishLang = component.languages.find(l => l.code === 'es');
    if (spanishLang) {
      component.selectLanguage(spanishLang);
      
      expect(component.languageChange.emit).toHaveBeenCalledWith('es');
      expect(component.selectedLanguage).toBe('es');
    }
  });

  it('should close dropdown after selecting language', () => {
    component.isOpen = true;
    const frenchLang = component.languages.find(l => l.code === 'fr');
    if (frenchLang) {
      component.selectLanguage(frenchLang);
      expect(component.isOpen).toBeFalse();
    }
  });

  it('should apply correct position class', () => {
    component.position = 'top-left';
    fixture.detectChanges();
    const dropdown = fixture.nativeElement.querySelector('.language-dropdown');
    expect(dropdown?.classList.contains('top-left')).toBeTruthy();
  });

  it('should close dropdown when clicking outside', () => {
    component.isOpen = true;
    fixture.detectChanges();
    
    const event = new MouseEvent('click');
    Object.defineProperty(event, 'target', { value: document.body, enumerable: true });
    document.dispatchEvent(event);
    
    expect(component.isOpen).toBeFalse();
  });

  it('should accept custom languages', () => {
    const customLanguages: Language[] = [
      { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
      { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' }
    ];
    
    component.languages = customLanguages;
    fixture.detectChanges();
    
    expect(component.languages.length).toBe(2);
    expect(component.languages[0].code).toBe('de');
  });

  it('should display native names when provided', () => {
    component.selectedLanguage = 'pt';
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    component.isOpen = true;
    fixture.detectChanges();
    
    const langItems = compiled.querySelectorAll('.language-item');
    const ptItem = Array.from(langItems).find((item: any) => 
      item.textContent.includes('Português')
    );
    
    expect(ptItem).toBeTruthy();
  });

  it('should show checkmark on selected language', () => {
    component.selectedLanguage = 'en';
    component.isOpen = true;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    const langItems = compiled.querySelectorAll('.language-item');
    const selectedItem = Array.from(langItems).find((item: any) => 
      item.classList.contains('selected')
    );
    
    expect(selectedItem).toBeTruthy();
  });

  it('should handle language with no native name', () => {
    const langWithoutNative: Language[] = [
      { code: 'test', name: 'Test Language', flag: '🏴' }
    ];
    
    component.languages = langWithoutNative;
    component.selectedLanguage = 'test';
    fixture.detectChanges();
    
    const currentLang = component.getCurrentLanguage();
    expect(currentLang?.nativeName).toBeUndefined();
  });
});
