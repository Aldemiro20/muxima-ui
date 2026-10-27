import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../testing/axe';
import { MxTooltip } from './tooltip';

@Component({
  imports: [MxTooltip],
  template: `<button type="button" aria-label="Copiar" mxTooltip="Copiar para a área de transferência">C</button>`,
})
class Host {}

describe('MxTooltip', () => {
  afterEach(() => document.querySelectorAll('.cdk-overlay-container').forEach((c) => (c.innerHTML = '')));

  it('aparece no foco, fica ligado por aria-describedby e fecha com Escape', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    fixture.detectChanges();
    const tip = document.querySelector('[role="tooltip"]') as HTMLElement;
    expect(tip.textContent).toContain('Copiar para a área');
    expect(button.getAttribute('aria-describedby')).toBe(tip.id);
    await expectNoA11yViolations(document.body);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(document.querySelector('[role="tooltip"]')).toBeNull();
    expect(button.getAttribute('aria-describedby')).toBeNull();
  });
});
