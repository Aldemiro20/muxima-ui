import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { expectNoA11yViolations } from '../testing/axe';
import { MxOption, MxSelect } from './select';

@Component({
  imports: [MxSelect, MxOption, ReactiveFormsModule],
  template: `
    <mx-select multiple aria-label="Províncias" [formControl]="provincias">
      <mx-option value="luanda">Luanda</mx-option>
      <mx-option value="benguela">Benguela</mx-option>
      <mx-option value="huila">Huíla</mx-option>
    </mx-select>
  `,
})
class Host {
  provincias = new FormControl<string[]>(['luanda']);
}

describe('MxSelect multiple', () => {
  it('alterna opções sem fechar e mostra o resumo', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();
    const trigger = fixture.nativeElement.querySelector('.mx-select-trigger') as HTMLButtonElement;
    expect(trigger.textContent?.trim()).toBe('Luanda');
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();
    const panel = document.querySelector('[role="listbox"]') as HTMLElement;
    expect(panel.getAttribute('aria-multiselectable')).toBe('true');
    const options = panel.querySelectorAll('[role="option"]');
    (options[1] as HTMLElement).click();
    (options[2] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.provincias.value).toEqual(['luanda', 'benguela', 'huila']);
    expect(document.querySelector('[role="listbox"]')).not.toBeNull();
    expect(trigger.textContent?.trim()).toBe('3 seleccionados');
    await expectNoA11yViolations(document.body);
    (options[0] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.provincias.value).toEqual(['benguela', 'huila']);
  });
});

@Component({
  imports: [MxSelect, MxOption],
  template: `<mx-select aria-label="Armazém" [loading]="loading">@for (a of armazens; track a) {<mx-option [value]="a">{{ a }}</mx-option>}</mx-select>`,
})
class LoadingHost {
  loading = true;
  armazens: string[] = [];
}

describe('MxSelect loading', () => {
  it('mostra o indicador no botão e no painel enquanto carrega', async () => {
    const fixture = TestBed.createComponent(LoadingHost);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('.mx-select-trigger') as HTMLButtonElement;
    expect(trigger.getAttribute('aria-busy')).toBe('true');
    trigger.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(document.querySelector('[role="listbox"]')!.getAttribute('aria-busy')).toBe('true');
    expect(document.querySelector('.mx-select-loading')!.textContent).toContain('A carregar');
    await expectNoA11yViolations(document.body);
  });
});
