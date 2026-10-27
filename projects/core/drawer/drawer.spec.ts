import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MX_DIALOG } from '@muxima-ui/core/dialog';
import { expectNoA11yViolations } from '../testing/axe';
import { MxDrawer } from './drawer';

@Component({
  imports: [MX_DIALOG],
  template: `
    <mx-dialog-header><h2 mxDialogTitle>Detalhe da factura</h2></mx-dialog-header>
    <mx-dialog-content>FT 2026/0142</mx-dialog-content>
    <mx-dialog-footer><button type="button" mxDialogClose>Fechar</button></mx-dialog-footer>
  `,
})
class Detalhe {}

const flush = () => new Promise((r) => setTimeout(r, 0));

describe('MxDrawer', () => {
  afterEach(() => TestBed.inject(MxDrawer).closeAll());

  it('abre um diálogo modal encostado ao lado pedido', async () => {
    TestBed.inject(MxDrawer).open(Detalhe, { side: 'left' });
    await flush();
    TestBed.tick();
    const container = document.querySelector('.cdk-dialog-container') as HTMLElement;
    expect(container.getAttribute('role')).toBe('dialog');
    expect(container.getAttribute('aria-modal')).toBe('true');
    expect(document.querySelector('.mx-drawer-panel.mx-drawer-left')).not.toBeNull();
    const title = document.getElementById(container.getAttribute('aria-labelledby')!);
    expect(title?.textContent).toBe('Detalhe da factura');
    await expectNoA11yViolations(document.querySelector('.cdk-overlay-container')!);
  });
});
