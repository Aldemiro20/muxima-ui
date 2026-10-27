import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MxBreadcrumb } from '@muxima-ui/core/breadcrumb';
import { expectNoA11yViolations } from '../testing/axe';
import { MX_ACCORDION } from './accordion';

@Component({
  imports: [MX_ACCORDION, MxBreadcrumb],
  template: `
    <nav mxBreadcrumb><ol><li><a href="/clientes">Clientes</a></li><li><span aria-current="page">Facturas</span></li></ol></nav>
    <div mxAccordion [multiple]="multiple()">
      <details mxAccordionItem open><summary mxAccordionTrigger>Pagamentos</summary><div mxAccordionContent>Por referência.</div></details>
      <details mxAccordionItem><summary mxAccordionTrigger>Facturas</summary><div mxAccordionContent>Em PDF.</div></details>
    </div>
  `,
})
class Host {
  multiple = signal(false);
}

describe('MxAccordion e MxBreadcrumb', () => {
  it('agrupa os details com o mesmo name, salvo em multiple', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const [a, b] = fixture.nativeElement.querySelectorAll('details') as NodeListOf<HTMLDetailsElement>;
    expect(a.getAttribute('name')).toBeTruthy();
    expect(a.getAttribute('name')).toBe(b.getAttribute('name'));
    fixture.componentInstance.multiple.set(true);
    fixture.detectChanges();
    expect(a.getAttribute('name')).toBeNull();
  });

  it('dá nome à navegação das migalhas e não tem violações', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav').getAttribute('aria-label')).toBe('Localização');
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
