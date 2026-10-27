import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../testing/axe';
import { MX_MENU } from './menu';

@Component({
  imports: [MX_MENU],
  template: `
    <button type="button" [mxMenuTriggerFor]="menu">Acções</button>
    <ng-template #menu>
      <div mxMenu>
        <button mxMenuItem (mxMenuItemTriggered)="last = 'editar'">Editar</button>
        <button mxMenuItem variant="destructive" (mxMenuItemTriggered)="last = 'eliminar'">Eliminar</button>
      </div>
    </ng-template>
  `,
})
class Host {
  last = '';
}

describe('MxMenu', () => {
  it('abre um menu com itens e executa a opção escolhida', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const trigger = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    expect(trigger.getAttribute('aria-haspopup')).toBe('menu');
    trigger.click();
    fixture.detectChanges();
    const menu = document.querySelector('[role="menu"]') as HTMLElement;
    expect(menu.classList).toContain('mx-menu');
    const items = menu.querySelectorAll('[role="menuitem"]');
    expect(items.length).toBe(2);
    expect(items[1].getAttribute('data-variant')).toBe('destructive');
    await expectNoA11yViolations(document.body);
    (items[1] as HTMLElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.last).toBe('eliminar');
    expect(document.querySelector('[role="menu"]')).toBeNull();
  });
});
