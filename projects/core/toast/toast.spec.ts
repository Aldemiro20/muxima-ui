import { TestBed } from '@angular/core/testing';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { expectNoA11yViolations } from '../testing/axe';
import { MxToast } from './toast';

describe('MxToast', () => {
  it('mostra, anuncia e fecha notificações', async () => {
    const announcer = TestBed.inject(LiveAnnouncer);
    const spy = vi.spyOn(announcer, 'announce').mockResolvedValue();
    const toast = TestBed.inject(MxToast);
    let undone = false;
    toast.show('Cliente eliminado', { action: { label: 'Anular', run: () => (undone = true) } });
    toast.show('Falha no envio', { variant: 'danger' });
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
});
