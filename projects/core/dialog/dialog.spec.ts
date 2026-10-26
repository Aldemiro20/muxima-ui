import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MxDialog } from './dialog';

@Component({
  imports: [MX_DIALOG, MxButton],
  template: `
    <mx-dialog-header>
      <h2 mxDialogTitle>Eliminar projecto</h2>
      <p mxDialogDescription>Esta acção não pode ser desfeita.</p>
    </mx-dialog-header>
    <mx-dialog-footer>
      <button mxButton variant="outline" mxDialogClose>Cancelar</button>
      <button mxButton variant="destructive" [mxDialogClose]="true">Eliminar</button>
    </mx-dialog-footer>
  `,
})
class Confirmar {}

const flush = () => new Promise((r) => setTimeout(r, 0));

describe('MxDialog', () => {
  afterEach(() => TestBed.inject(MxDialog).closeAll());

  it('abre um diálogo modal com nome e descrição acessíveis', async () => {
    TestBed.inject(MxDialog).open(Confirmar, { role: 'alertdialog' });
    await flush();
    TestBed.tick();
    const container = document.querySelector('.cdk-dialog-container') as HTMLElement;
    expect(container.getAttribute('role')).toBe('alertdialog');
    expect(container.getAttribute('aria-modal')).toBe('true');
    const title = document.getElementById(container.getAttribute('aria-labelledby')!);
    expect(title?.textContent).toBe('Eliminar projecto');
    const desc = document.getElementById(container.getAttribute('aria-describedby')!);
    expect(desc?.textContent).toContain('não pode ser desfeita');
  });

  it('devolve o resultado do botão que o fecha', async () => {
    const ref = TestBed.inject(MxDialog).open<boolean>(Confirmar);
    let result: boolean | undefined;
    ref.closed.subscribe((r) => (result = r));
    await flush();
    TestBed.tick();
    const buttons = document.querySelectorAll<HTMLButtonElement>('.mx-dialog-footer button');
    buttons[1].click();
    expect(result).toBe(true);
  });

  it('fecha com Escape', async () => {
    const ref = TestBed.inject(MxDialog).open(Confirmar);
    let closed = false;
    ref.closed.subscribe(() => (closed = true));
    await flush();
    document.querySelector('.cdk-dialog-container')!.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', keyCode: 27, bubbles: true } as KeyboardEventInit),
    );
    await flush();
    expect(closed).toBe(true);
  });
});
