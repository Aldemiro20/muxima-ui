import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { expectNoA11yViolations } from '../testing/axe';
import { MX_KANBAN, MxKanbanColumn, MxKanbanMove } from './kanban';

interface Tarefa {
  id: number;
  titulo: string;
}

@Component({
  imports: [MX_KANBAN],
  template: `
    <mx-kanban [(columns)]="quadro" aria-label="Tarefas" (moved)="movido = $event">
      <ng-template mxKanbanCard let-t>{{ t.titulo }}</ng-template>
    </mx-kanban>
  `,
})
class Host {
  movido?: MxKanbanMove<Tarefa>;
  quadro = signal<MxKanbanColumn<Tarefa>[]>([
    {
      id: 'fazer',
      title: 'Por fazer',
      items: [
        { id: 1, titulo: 'Emitir facturas' },
        { id: 2, titulo: 'Ligar ao banco' },
      ],
    },
    { id: 'curso', title: 'Em curso', items: [{ id: 3, titulo: 'Relatório' }], limit: 2 },
    { id: 'feito', title: 'Feito', items: [] },
  ]);
}

const flush = () => new Promise((r) => setTimeout(r, 0));
const key = (el: Element, k: string) =>
  el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));

describe('MxKanban', () => {
  it('move cartões com o teclado, anuncia, respeita o limite e cancela', async () => {
    const announced: string[] = [];
    TestBed.configureTestingModule({
      providers: [
        { provide: LiveAnnouncer, useValue: { announce: (m: string) => announced.push(m) } },
      ],
    });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('ul[aria-labelledby]').length).toBe(3);
    await expectNoA11yViolations(el);

    const card = () => document.activeElement as HTMLElement;
    (el.querySelector('[data-kanban="0:0"]') as HTMLElement).focus();
    key(card(), ' ');
    fixture.detectChanges();
    expect(announced.at(-1)).toBe('Emitir facturas agarrado. Por fazer, posição 1 de 2.');
    key(card(), 'ArrowRight');
    fixture.detectChanges();
    await flush();
    expect(announced.at(-1)).toBe('Em curso, posição 1 de 2');
    key(card(), 'ArrowRight');
    fixture.detectChanges();
    await flush();
    key(card(), ' ');
    fixture.detectChanges();
    await flush();
    expect(fixture.componentInstance.quadro()[2].items.map((t) => t.titulo)).toEqual([
      'Emitir facturas',
    ]);
    expect(fixture.componentInstance.movido).toMatchObject({
      from: 'fazer',
      to: 'feito',
      fromIndex: 0,
      toIndex: 0,
    });

    // limite: "Em curso" tem 1 de 2; leva lá um, depois o seguinte é recusado
    (el.querySelector('[data-kanban="0:0"]') as HTMLElement).focus();
    key(card(), 'Enter');
    key(card(), 'ArrowRight');
    fixture.detectChanges();
    await flush();
    key(card(), 'Escape');
    fixture.detectChanges();
    await flush();
    expect(fixture.componentInstance.quadro()[0].items.map((t) => t.titulo)).toEqual([
      'Ligar ao banco',
    ]);
    expect(announced.at(-1)).toContain('Movimento cancelado');
  });
});
