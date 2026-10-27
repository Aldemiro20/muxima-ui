import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../testing/axe';
import { MX_POPOVER } from './popover';

@Component({
  imports: [MX_POPOVER],
  template: `
    <button type="button" [mxPopoverTrigger]="pop">Filtros</button>
    <mx-popover #pop aria-label="Filtros">
      <label>Estado <input /></label>
    </mx-popover>
  `,
})
class Host {}

const flush = () => new Promise((r) => setTimeout(r, 0));

describe('MxPopover', () => {
  it('abre, move o foco para dentro e devolve-o ao fechar com Escape', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    trigger.click();
    fixture.detectChanges();
    await flush();
    TestBed.tick();
    const panel = document.querySelector('.mx-popover') as HTMLElement;
    expect(panel.getAttribute('role')).toBe('dialog');
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(trigger.getAttribute('aria-controls')).toBe(panel.id);
    await expectNoA11yViolations(document.body);
    panel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    fixture.detectChanges();
    expect(document.querySelector('.mx-popover')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
});
