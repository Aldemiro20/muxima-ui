import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MxButton } from './button';
import { expectNoA11yViolations } from '../testing/axe';

@Component({
  imports: [MxButton],
  template: `
    <button mxButton type="button" [variant]="variant()" [loading]="loading()" (click)="clicks = clicks + 1">Guardar</button>
    <a mxButton href="#" [disabled]="true">Link</a>
  `,
})
class Host {
  variant = signal<'default' | 'outline'>('default');
  loading = signal(false);
  clicks = 0;
}

describe('MxButton', () => {
  function setup() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const link = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;
    return { fixture, button, link };
  }

  it('aplica a classe e a variante no elemento nativo', () => {
    const { fixture, button } = setup();
    expect(button.classList).toContain('mx-button');
    expect(button.getAttribute('data-variant')).toBe('default');
    fixture.componentInstance.variant.set('outline');
    fixture.detectChanges();
    expect(button.getAttribute('data-variant')).toBe('outline');
  });

  it('mantém o type definido pelo programador', () => {
    const { button } = setup();
    expect(button.type).toBe('button');
  });

  it('a carregar: desactiva, marca aria-busy e mostra o indicador', () => {
    const { fixture, button } = setup();
    fixture.componentInstance.loading.set(true);
    fixture.detectChanges();
    expect(button.disabled).toBe(true);
    expect(button.getAttribute('aria-busy')).toBe('true');
    expect(button.querySelector('.mx-spinner')).not.toBeNull();
  });

  it('link desactivado: aria-disabled, fora da tabulação e sem navegar', () => {
    const { link } = setup();
    expect(link.getAttribute('aria-disabled')).toBe('true');
    expect(link.getAttribute('tabindex')).toBe('-1');
    const event = new MouseEvent('click', { cancelable: true, bubbles: true });
    link.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });
  it('não tem violações de acessibilidade', async () => {
    const { fixture } = setup();
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
