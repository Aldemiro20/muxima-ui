import { Component, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../testing/axe';
import { MxTour, MxTourAnchor, MxTourResult, MxTourStep } from './tour';

@Component({
  imports: [MxTourAnchor],
  template: `
    <button type="button" id="iniciar" (click)="iniciar()">Visita</button>
    <input mxTourAnchor="pesquisa" aria-label="Pesquisar" />
    <button type="button" mxTourAnchor="nova">Nova factura</button>
  `,
})
class Host {
  readonly tour = inject(MxTour);
  passos: MxTourStep[] = [
    { title: 'Bem-vindo', content: 'Dois passos.' },
    { target: 'pesquisa', title: 'Pesquisa', content: 'Procura clientes.' },
    { target: 'nova', title: 'Nova factura', content: 'Começa aqui.' },
  ];
  opcoes = {};
  resultado: MxTourResult | null = null;
  iniciar(): void {
    this.tour.start(this.passos, this.opcoes).afterClosed.then((r) => (this.resultado = r));
  }
}

const wait = (ms = 40) => new Promise((r) => setTimeout(r, ms));
async function settle(): Promise<void> {
  for (let i = 0; i < 4; i++) {
    TestBed.tick();
    await wait();
  }
}
const card = () => document.querySelector('.mx-tour-card') as HTMLElement | null;
const title = () => card()?.querySelector('.mx-tour-title')?.textContent?.trim();
const button = (name: string) =>
  Array.from(card()!.querySelectorAll('button')).find((b) => b.textContent?.trim() === name) as HTMLButtonElement;

async function open(host?: (h: Host) => void) {
  const fixture = TestBed.createComponent(Host);
  host?.(fixture.componentInstance);
  fixture.detectChanges();
  const trigger = fixture.nativeElement.querySelector('#iniciar') as HTMLButtonElement;
  trigger.focus();
  trigger.click();
  await settle();
  return { fixture, trigger };
}

describe('MxTour', () => {
  afterEach(() => TestBed.inject(MxTour).active()?.close());

  it('mostra um diálogo modal com progresso e foco, sem violações', async () => {
    await open();
    const c = card()!;
    expect(c.getAttribute('role')).toBe('dialog');
    expect(c.getAttribute('aria-modal')).toBe('true');
    expect(title()).toBe('Bem-vindo');
    expect(c.getAttribute('data-placement')).toBe('center');
    expect(c.textContent).toContain('Passo 1 de 3');
    expect(document.activeElement).toBe(c);
    const labelled = document.getElementById(c.getAttribute('aria-labelledby')!);
    expect(labelled?.textContent?.trim()).toBe('Bem-vindo');
    await expectNoA11yViolations(document.body);
  });

  it('avança e recua com os botões e as setas', async () => {
    await open();
    button('Seguinte').click();
    await settle();
    expect(title()).toBe('Pesquisa');
    expect(card()!.textContent).toContain('Passo 2 de 3');
    expect(button('Anterior')).toBeTruthy();
    card()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await settle();
    expect(title()).toBe('Nova factura');
    expect(button('Concluir')).toBeTruthy();
    card()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await settle();
    expect(title()).toBe('Pesquisa');
  });

  it('Escape fecha, devolve o foco e diz que não foi concluída', async () => {
    const { fixture, trigger } = await open();
    button('Seguinte').click();
    await settle();
    card()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await settle();
    expect(card()).toBeNull();
    expect(document.activeElement).toBe(trigger);
    expect(fixture.componentInstance.resultado).toEqual({ completed: false, index: 1 });
  });

  it('Concluir no último passo dá completed: true', async () => {
    const { fixture } = await open((h) => (h.opcoes = { startAt: 2 }));
    expect(title()).toBe('Nova factura');
    button('Concluir').click();
    await settle();
    expect(card()).toBeNull();
    expect(fixture.componentInstance.resultado).toEqual({ completed: true, index: 2 });
  });

  it('sem dismissible não há Saltar, nem fechar, e Escape não fecha', async () => {
    await open((h) => (h.opcoes = { dismissible: false }));
    expect(card()!.querySelector('.mx-tour-close')).toBeNull();
    expect(button('Saltar')).toBeUndefined();
    card()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await settle();
    expect(card()).not.toBeNull();
  });

  it('corre beforeShow antes de mostrar o passo e aceita etiquetas próprias', async () => {
    let chamado = 0;
    await open((h) => {
      h.passos = [{ title: 'One', beforeShow: () => void chamado++ }, { title: 'Two' }];
      h.opcoes = { labels: { next: 'Next', progress: (a: number, b: number) => `Step ${a} of ${b}` } };
    });
    expect(chamado).toBe(1);
    expect(card()!.textContent).toContain('Step 1 of 2');
    expect(button('Next')).toBeTruthy();
  });

  it('começar outra visita fecha a anterior', async () => {
    const { fixture } = await open();
    const tour = TestBed.inject(MxTour);
    const segunda = tour.start([{ title: 'Outra' }]);
    await settle();
    expect(fixture.componentInstance.resultado?.completed).toBe(false);
    expect(document.querySelectorAll('.mx-tour-card').length).toBe(1);
    expect(tour.active()).toBe(segunda);
  });
});
