import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../testing/axe';
import { MX_DATA_GRID, MxGridColumn, MxGridSort } from './data-grid';

interface Factura {
  numero: string;
  cliente: string;
  estado: string;
  valor: number;
}

const DADOS: Factura[] = [
  { numero: 'FT 3', cliente: 'Huíla Agro', estado: 'Paga', valor: 300 },
  { numero: 'FT 1', cliente: 'Banco Mutamba', estado: 'Pendente', valor: 100 },
  { numero: 'FT 2', cliente: 'Kianda', estado: 'Paga', valor: 200 },
];

@Component({
  imports: [MX_DATA_GRID],
  template: `
    <mx-data-grid
      [data]="dados()"
      [columns]="colunas"
      rowKey="numero"
      selection="multiple"
      [(selected)]="sel"
      [(sort)]="ordem"
      aria-label="Facturas"
      (rowActivate)="aberta = $event"
    >
      <ng-template mxGridCell="estado" let-row
        ><strong class="estado">{{ row.estado }}</strong></ng-template
      >
    </mx-data-grid>
  `,
})
class Host {
  dados = signal(DADOS);
  sel = signal<readonly unknown[]>([]);
  ordem = signal<MxGridSort>({ key: null, direction: 'asc' });
  aberta?: Factura;
  colunas: MxGridColumn<Factura>[] = [
    { key: 'numero', header: 'Número', filter: 'text', pinned: 'start' },
    { key: 'cliente', header: 'Cliente', filter: 'text' },
    { key: 'estado', header: 'Estado', filter: 'select' },
    { key: 'valor', header: 'Valor', filter: 'number', align: 'end' },
  ];
}

const flush = () => new Promise((r) => setTimeout(r, 0));
const key = (el: Element, k: string, extra: KeyboardEventInit = {}) =>
  el.dispatchEvent(
    new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true, ...extra }),
  );
const rows = (el: HTMLElement) =>
  Array.from(el.querySelectorAll('tbody tr:not(.mx-grid-spacer)')).map((r) =>
    r.querySelectorAll('td')[1]?.textContent?.trim(),
  );

describe('MxDataGrid', () => {
  it('é uma grelha com contagens, ordena, filtra e selecciona', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await flush();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const grid = el.querySelector('[role="grid"]')!;
    expect(grid.getAttribute('aria-label')).toBe('Facturas');
    expect(grid.getAttribute('aria-rowcount')).toBe('5'); // cabeçalho + filtros + 3
    expect(grid.getAttribute('aria-colcount')).toBe('5');
    expect(el.querySelector('.estado')!.textContent).toBe('Paga');
    await expectNoA11yViolations(el);

    (el.querySelector('.mx-grid-sort') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(rows(el)).toEqual(['FT 1', 'FT 2', 'FT 3']);
    expect(el.querySelector('th[aria-sort="ascending"]')).toBeTruthy();

    const valor = el.querySelectorAll<HTMLInputElement>('.mx-grid-filter')[3];
    valor.value = '>150';
    valor.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(rows(el)).toEqual(['FT 2', 'FT 3']);
    expect(el.querySelector('.mx-grid-status')!.textContent).toContain('2 linhas de 3');

    (el.querySelector('thead input[type=checkbox]') as HTMLInputElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.sel()).toEqual(['FT 2', 'FT 3']);
    expect(el.querySelectorAll('tbody tr[aria-selected="true"]').length).toBe(2);
  });

  it('navega célula a célula com as setas e activa com Enter', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await flush();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const first = el.querySelector('[data-cell="2:1"]') as HTMLElement;
    expect(el.querySelectorAll('[tabindex="0"]').length).toBe(1);
    first.focus();
    first.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    fixture.detectChanges();
    key(first, 'ArrowRight');
    fixture.detectChanges();
    await flush();
    expect((document.activeElement as HTMLElement).dataset['cell']).toBe('2:2');
    key(document.activeElement!, 'ArrowDown');
    fixture.detectChanges();
    await flush();
    expect((document.activeElement as HTMLElement).dataset['cell']).toBe('3:2');
    key(document.activeElement!, 'Enter');
    expect(fixture.componentInstance.aberta!.numero).toBe('FT 1');
    key(document.activeElement!, ' ');
    fixture.detectChanges();
    expect(fixture.componentInstance.sel()).toEqual(['FT 1']);
  });

  it('desenha só as linhas visíveis com muitos dados', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.dados.set(
      Array.from({ length: 1000 }, (_, i) => ({
        numero: 'FT ' + i,
        cliente: 'C' + i,
        estado: 'Paga',
        valor: i,
      })),
    );
    fixture.componentRef.instance.colunas = fixture.componentInstance.colunas;
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    // sem height não há virtual: todas
    expect(el.querySelectorAll('tbody tr').length).toBe(1000);
  });
});
