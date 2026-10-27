import { TestBed } from '@angular/core/testing';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { expectNoA11yViolations } from '../testing/axe';
import { MxToast } from './toast';

const flush = () => new Promise((r) => setTimeout(r, 0));

describe('MxToast', () => {
  let toast: MxToast;
  let spy: ReturnType<typeof vi.spyOn>;
  beforeEach(() => {
    spy = vi.spyOn(TestBed.inject(LiveAnnouncer), 'announce').mockResolvedValue();
    toast = TestBed.inject(MxToast);
    toast.clear();
  });

  it('mostra, anuncia e fecha notificações', async () => {
    let undone = false;
    toast.show('Cliente eliminado', { action: { label: 'Anular', run: () => (undone = true) } });
    toast.error('Falha no envio');
    TestBed.tick();
    const items = document.querySelectorAll('.mx-toast');
    expect(items.length).toBe(2);
    expect(spy).toHaveBeenCalledWith('Cliente eliminado. Acção disponível: Anular', 'polite');
    expect(spy).toHaveBeenCalledWith('Falha no envio', 'assertive');
    await expectNoA11yViolations(document.querySelector('.mx-toaster')!);
    (items[0].querySelector('.mx-toast-action') as HTMLElement).click();
    TestBed.tick();
    expect(undone).toBe(true);
    (document.querySelector('.mx-toast-close') as HTMLElement).click();
    TestBed.tick();
    expect(document.querySelectorAll('.mx-toast').length).toBe(0);
  });

  it('marca o tipo para a cor e mostra o ícone', () => {
    toast.success('Pago');
    toast.warning('Prazo');
    toast.info('Novidade');
    toast.show('Simples');
    TestBed.tick();
    const variants = Array.from(document.querySelectorAll('.mx-toast')).map((t) => t.getAttribute('data-variant'));
    expect(variants).toEqual(['success', 'warning', 'info', null]);
    expect(document.querySelectorAll('.mx-toast-icon').length).toBe(3);
  });

  it('promise: mostra a carregar e depois sucesso ou erro na mesma notificação', async () => {
    await toast.promise(Promise.resolve(3), { loading: 'A enviar', success: (n) => `${n} enviadas`, error: 'Falhou' });
    TestBed.tick();
    let items = document.querySelectorAll('.mx-toast');
    expect(items.length).toBe(1);
    expect(items[0].getAttribute('data-variant')).toBe('success');
    expect(items[0].textContent).toContain('3 enviadas');

    toast.clear();
    await toast.promise(Promise.reject(new Error('x')), { loading: 'A enviar', success: 'Ok', error: 'Não foi possível enviar' }).catch(() => {});
    await flush();
    TestBed.tick();
    items = document.querySelectorAll('.mx-toast');
    expect(items[0].getAttribute('data-variant')).toBe('danger');
    expect(items[0].getAttribute('aria-busy')).toBeNull();
  });

  it('muda de posição', () => {
    toast.show('Olá');
    toast.setPosition('top-center');
    TestBed.tick();
    expect(document.querySelector('.mx-toaster')!.getAttribute('data-position')).toBe('top-center');
    toast.setPosition('bottom-right');
  });
});
