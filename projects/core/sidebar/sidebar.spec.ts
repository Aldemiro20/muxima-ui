import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../testing/axe';
import { MX_SIDEBAR } from './sidebar';

@Component({
  imports: [MX_SIDEBAR],
  template: `
    <button mxSidebarToggle [sidebar]="menu">≡</button>
    <mx-sidebar #menu="mxSidebar" [(collapsed)]="recolhida" aria-label="Principal">
      <div mxSidebarHeader>Kianda</div>
      <mx-sidebar-group label="Gestão">
        <li>
          <a mxSidebarItem href="#f" aria-current="page"
            ><span mxSidebarLabel>Facturas</span><span mxSidebarBadge>3</span></a
          >
        </li>
        <li>
          <a mxSidebarItem href="#c"><span mxSidebarLabel>Clientes</span></a>
        </li>
        <li>
          <mx-sidebar-section label="Relatórios" [(open)]="relatorios">
            <li>
              <a mxSidebarItem href="#v"><span mxSidebarLabel>Vendas</span></a>
            </li>
          </mx-sidebar-section>
        </li>
      </mx-sidebar-group>
    </mx-sidebar>
  `,
})
class Host {
  recolhida = signal(false);
  relatorios = signal(false);
}

describe('MxSidebar', () => {
  it('recolhe com o botão, mantém os nomes e mostra a dica', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const toggle = el.querySelector('[mxSidebarToggle]') as HTMLButtonElement;
    const sidebar = el.querySelector('mx-sidebar')!;
    expect(el.querySelector('nav')!.getAttribute('aria-label')).toBe('Principal');
    expect(toggle.getAttribute('aria-controls')).toBe(sidebar.id);
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Recolher menu');
    const list = el.querySelector('ul.mx-sidebar-list')!;
    expect(document.getElementById(list.getAttribute('aria-labelledby')!)!.textContent).toBe(
      'Gestão',
    );
    await expectNoA11yViolations(el);

    toggle.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.recolhida()).toBe(true);
    expect(sidebar.hasAttribute('data-collapsed')).toBe(true);
    expect(toggle.getAttribute('aria-label')).toBe('Expandir menu');
    const item = el.querySelector('[mxSidebarItem]') as HTMLElement;
    item.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(document.querySelector('.mx-sidebar-tip')!.textContent!.trim()).toBe('Facturas');
    item.dispatchEvent(new Event('mouseleave'));
    expect(document.querySelector('.mx-sidebar-tip')).toBeNull();
    await expectNoA11yViolations(el);
  });

  it('a secção abre e fecha; recolhida, expande a barra', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const trigger = el.querySelector('.mx-sidebar-section-trigger') as HTMLButtonElement;
    const sub = el.querySelector('.mx-sidebar-sublist') as HTMLElement;
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(sub.hidden).toBe(true);
    trigger.click();
    fixture.detectChanges();
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(sub.hidden).toBe(false);
    fixture.componentInstance.recolhida.set(true);
    fixture.detectChanges();
    expect(sub.hidden).toBe(true);
    trigger.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.recolhida()).toBe(false);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
  });
});
