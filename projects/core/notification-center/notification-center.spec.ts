import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { expectNoA11yViolations } from '../testing/axe';
import {
  MxNotification,
  MxNotificationBell,
  MxNotificationCenter,
  mxRelativeTime,
} from './notification-center';

const agora = new Date();
const antes = (min: number) => new Date(agora.getTime() - min * 60_000);

@Component({
  imports: [MxNotificationCenter, MxNotificationBell],
  template: `
    <button mxNotificationBell [count]="porLer()"></button>
    <mx-notification-center
      [items]="itens()"
      dismissible
      (markRead)="ler($event)"
      (markAllRead)="lerTodas()"
      (dismiss)="tirar($event)"
      (opened)="aberta = $event"
    />
  `,
})
class Host {
  itens = signal<MxNotification[]>([
    {
      id: 1,
      title: 'Factura FT 0201 paga',
      time: antes(5),
      category: 'Facturas',
      variant: 'success',
    },
    { id: 2, title: 'Novo cliente', time: antes(120), read: true, category: 'Clientes' },
    {
      id: 3,
      title: '3 facturas em atraso',
      time: antes(60 * 30),
      category: 'Facturas',
      variant: 'danger',
    },
  ]);
  aberta?: MxNotification;
  porLer = () => this.itens().filter((n) => !n.read).length;
  ler(n: MxNotification) {
    this.itens.update((l) => l.map((x) => (x.id === n.id ? { ...x, read: true } : x)));
  }
  lerTodas() {
    this.itens.update((l) => l.map((x) => ({ ...x, read: true })));
  }
  tirar(n: MxNotification) {
    this.itens.update((l) => l.filter((x) => x.id !== n.id));
  }
}

describe('MxNotificationCenter', () => {
  it('formata tempos relativos', () => {
    expect(mxRelativeTime(antes(0.2), agora)).toBe('agora');
    expect(mxRelativeTime(antes(5), agora)).toBe('há 5 minutos');
    expect(mxRelativeTime(antes(60 * 24), agora)).toBe('ontem');
  });

  it('mostra por ler, filtra, marca e anuncia novas', async () => {
    const announced: string[] = [];
    TestBed.configureTestingModule({
      providers: [
        { provide: LiveAnnouncer, useValue: { announce: (m: string) => announced.push(m) } },
      ],
    });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const bell = el.querySelector('[mxNotificationBell]')!;
    expect(bell.getAttribute('aria-label')).toBe('Notificações, 2 por ler');
    expect(el.querySelectorAll('.mx-notification').length).toBe(3);
    expect(el.querySelector('.mx-notification-main')!.textContent).toContain('Por ler:');
    await expectNoA11yViolations(el);

    const filtros = Array.from(
      el.querySelectorAll('.mx-notification-filters button'),
    ) as HTMLButtonElement[];
    expect(filtros.map((b) => b.textContent!.trim())).toEqual([
      'Todas',
      'Por ler (2)',
      'Facturas',
      'Clientes',
    ]);
    filtros[3].click();
    fixture.detectChanges();
    expect(el.querySelectorAll('.mx-notification').length).toBe(1);
    filtros[0].click();
    fixture.detectChanges();

    (el.querySelector('.mx-notification-main') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.aberta!.id).toBe(1);
    expect(bell.getAttribute('aria-label')).toBe('Notificações, 1 por ler');

    fixture.componentInstance.itens.update((l) => [
      { id: 4, title: 'Pagamento recebido', time: new Date() },
      ...l,
    ]);
    fixture.detectChanges();
    expect(announced).toContain('Nova notificação: Pagamento recebido');

    (el.querySelector('.mx-notification-link') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(bell.getAttribute('aria-label')).toBe('Notificações');
    expect((el.querySelector('.mx-notification-link') as HTMLButtonElement).disabled).toBe(true);
  });
});
