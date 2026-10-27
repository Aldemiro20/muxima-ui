import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../testing/axe';
import { MxPagination } from './pagination';

@Component({
  imports: [MxPagination],
  template: `<mx-pagination [(page)]="page" [total]="200" [pageSize]="10" />`,
})
class Host {
  page = signal(1);
}

describe('MxPagination', () => {
  function setup() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const labels = () =>
      Array.from(fixture.nativeElement.querySelectorAll('.mx-pagination-list li') as NodeListOf<HTMLElement>).map((li) => li.textContent!.trim());
    return { fixture, labels };
  }

  it('mostra as pontas, a página actual e reticências', () => {
    const { fixture, labels } = setup();
    expect(labels()).toEqual(['Anterior', '1', '2', '…', '20', 'Seguinte']);
    fixture.componentInstance.page.set(10);
    fixture.detectChanges();
    expect(labels()).toEqual(['Anterior', '1', '…', '9', '10', '11', '…', '20', 'Seguinte']);
    const current = fixture.nativeElement.querySelector('[aria-current="page"]') as HTMLElement;
    expect(current.textContent!.trim()).toBe('10');
  });

  it('desactiva Anterior na primeira página e avança com Seguinte', async () => {
    const { fixture } = setup();
    const [prev, ...rest] = fixture.nativeElement.querySelectorAll('.mx-pagination-edge') as NodeListOf<HTMLButtonElement>;
    expect(prev.disabled).toBe(true);
    rest[0].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.page()).toBe(2);
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
