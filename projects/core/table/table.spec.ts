import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MX_TABLE, MxSortState, mxSortData } from './table';
import { expectNoA11yViolations } from '../testing/axe';

@Component({
  imports: [MX_TABLE],
  template: `
    <table mxTable [(sort)]="sort">
      <thead><tr><th mxSortHeader="nome">Nome</th><th mxSortHeader="valor">Valor</th></tr></thead>
      <tbody></tbody>
    </table>
  `,
})
class Host {
  sort = signal<MxSortState>({ active: null, direction: 'asc' });
}

describe('MxTable', () => {
  it('ordena ao clicar e mantém aria-sort', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const th = fixture.nativeElement.querySelector('th') as HTMLElement;
    const btn = th.querySelector('button')!;
    expect(th.getAttribute('aria-sort')).toBe('none');
    btn.click();
    fixture.detectChanges();
    expect(th.getAttribute('aria-sort')).toBe('ascending');
    btn.click();
    fixture.detectChanges();
    expect(th.getAttribute('aria-sort')).toBe('descending');
    btn.click();
    fixture.detectChanges();
    expect(th.getAttribute('aria-sort')).toBe('none');
    expect(fixture.componentInstance.sort().active).toBeNull();
  });

  it('mxSortData ordena texto em português e números', () => {
    const rows = [{ nome: 'Úige', v: 10 }, { nome: 'Benguela', v: 2 }, { nome: 'cabinda', v: 30 }];
    expect(mxSortData(rows, { active: 'nome', direction: 'asc' }).map((r) => r.nome)).toEqual(['Benguela', 'cabinda', 'Úige']);
    expect(mxSortData(rows, { active: 'v', direction: 'desc' }).map((r) => r.v)).toEqual([30, 10, 2]);
  });
  it('não tem violações de acessibilidade', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
