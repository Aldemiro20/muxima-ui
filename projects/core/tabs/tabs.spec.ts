import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MxTab, MxTabs } from './tabs';
import { expectNoA11yViolations } from '../testing/axe';

@Component({
  imports: [MxTabs, MxTab],
  template: `
    <mx-tabs [(selectedIndex)]="index" aria-label="Exemplo">
      <mx-tab label="Um"><p class="c1">Conteúdo 1</p></mx-tab>
      <mx-tab label="Dois" disabled><p>Conteúdo 2</p></mx-tab>
      <mx-tab label="Três"><p class="c3">Conteúdo 3</p></mx-tab>
    </mx-tabs>
  `,
})
class Host {
  index = signal(0);
}

describe('MxTabs', () => {
  function setup() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const tabs = () => Array.from(el.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    return { fixture, el, tabs };
  }

  it('expõe tablist, tabs e tabpanel ligados entre si', () => {
    const { el, tabs } = setup();
    expect(el.querySelector('[role="tablist"]')!.getAttribute('aria-label')).toBe('Exemplo');
    const [first] = tabs();
    expect(first.getAttribute('aria-selected')).toBe('true');
    const panel = document.getElementById(first.getAttribute('aria-controls')!)!;
    expect(panel.getAttribute('role')).toBe('tabpanel');
    expect(panel.getAttribute('aria-labelledby')).toBe(first.id);
    expect(panel.querySelector('.c1')).not.toBeNull();
  });

  it('usa tabindex itinerante: só o activo é tabulável', () => {
    const { tabs } = setup();
    expect(tabs().map((t) => t.tabIndex)).toEqual([0, -1, -1]);
  });

  it('setas mudam de separador e saltam os desactivados', () => {
    const { fixture, el, tabs } = setup();
    tabs()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(2);
    expect(tabs()[2].getAttribute('aria-selected')).toBe('true');
    expect(el.querySelector('.c3')).not.toBeNull();
    expect(el.querySelector('.c1')).toBeNull();
  });

  it('Home e End vão ao primeiro e ao último', () => {
    const { fixture, tabs } = setup();
    tabs()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(2);
    tabs()[2].dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.index()).toBe(0);
  });
  it('não tem violações de acessibilidade', async () => {
    const { fixture } = setup();
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
