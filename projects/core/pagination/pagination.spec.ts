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

@Component({
  imports: [MxPagination],
  template: `
    <mx-pagination variant="simple" [(page)]="page" [total]="95" [pageSize]="10" aria-label="Simples" />
    <mx-pagination variant="compact" [(page)]="page" [total]="95" [pageSize]="10" aria-label="Compacta" />
    <mx-pagination [(page)]="page2" [(pageSize)]="size" [pageSizeOptions]="[10, 25, 50]" showRange [total]="236" aria-label="Com linhas" />
  `,
})
class VariantsHost {
  page = signal(3);
  page2 = signal(3);
  size = signal(10);
}

describe('MxPagination variantes', () => {
  it('simple e compact mostram a página actual e saltam para as pontas', async () => {
    const fixture = TestBed.createComponent(VariantsHost);
    fixture.detectChanges();
    const [simple, compact] = fixture.nativeElement.querySelectorAll('mx-pagination') as NodeListOf<HTMLElement>;
    expect(simple.textContent).toContain('Página 3 de 10');
    expect(simple.querySelectorAll('.mx-pagination-button').length).toBe(2);
    const last = compact.querySelector('[aria-label="Última página"]') as HTMLButtonElement;
    last.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.page()).toBe(10);
    expect(simple.textContent).toContain('Página 10 de 10');
    await expectNoA11yViolations(fixture.nativeElement);
  });

  it('linhas por página mudam o tamanho, mantêm o primeiro item e mostram o intervalo', () => {
    const fixture = TestBed.createComponent(VariantsHost);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelectorAll('mx-pagination')[2] as HTMLElement;
    expect(el.querySelector('.mx-pagination-range')!.textContent).toContain('21–30 de 236');
    const select = el.querySelector('select') as HTMLSelectElement;
    expect((el.querySelector('label') as HTMLLabelElement).htmlFor).toBe(select.id);
    select.value = '25';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(fixture.componentInstance.size()).toBe(25);
    expect(fixture.componentInstance.page2()).toBe(1);
    expect(el.querySelector('.mx-pagination-range')!.textContent).toContain('1–25 de 236');
  });
});
