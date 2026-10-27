import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../testing/axe';
import { MxCommand, MxCommandItem, MxCommandPalette } from './command';

@Component({
  imports: [MxCommand],
  template: `<mx-command [items]="items" (selected)="chosen = $event" aria-label="Pesquisar comandos" />`,
})
class Host {
  items: MxCommandItem[] = [
    { label: 'Nova factura', group: 'Acções', keywords: ['emitir'] },
    { label: 'Novo cliente', group: 'Acções' },
    { label: 'Clientes', group: 'Páginas' },
    { label: 'Relatórios', group: 'Páginas' },
  ];
  chosen?: MxCommandItem;
}

const key = (el: HTMLElement, k: string) => el.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
const flush = () => new Promise((r) => setTimeout(r, 0));

describe('MxCommand', () => {
  it('agrupa, filtra por palavras-chave e escolhe com o teclado', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('[role="group"]').length).toBe(2);
    await expectNoA11yViolations(el);
    const input = el.querySelector('input') as HTMLInputElement;
    input.value = 'emitir';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(Array.from(el.querySelectorAll('[role="option"]')).map((o) => o.textContent!.trim())).toEqual(['Nova factura']);
    input.value = 'rel';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    key(input, 'Enter');
    expect(fixture.componentInstance.chosen?.label).toBe('Relatórios');
  });

  it('MxCommandPalette devolve o item escolhido ao fechar', async () => {
    const ref = TestBed.inject(MxCommandPalette).open([{ label: 'Clientes' }, { label: 'Facturas' }]);
    let result: MxCommandItem | undefined;
    ref.closed.subscribe((r) => (result = r));
    await flush();
    TestBed.tick();
    const input = document.querySelector('.mx-command-input') as HTMLInputElement;
    key(input, 'ArrowDown');
    TestBed.tick();
    key(input, 'Enter');
    await flush();
    expect(result?.label).toBe('Facturas');
  });
});
