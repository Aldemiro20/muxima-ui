import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MX_ALERT } from '@muxima-ui/core/alert';
import { MX_CARD } from '@muxima-ui/core/card';
import { MxProgress, MxSpinner } from '@muxima-ui/core/progress';
import { MxSeparator } from '@muxima-ui/core/separator';
import { MxSkeleton } from '@muxima-ui/core/skeleton';
import { expectNoA11yViolations } from '../testing/axe';
import { MxBadge } from './badge';

/** Componentes de apresentação: classes, variantes e semântica. */
@Component({
  imports: [MxBadge, MX_ALERT, MX_CARD, MxProgress, MxSpinner, MxSeparator, MxSkeleton],
  template: `
    <span mxBadge variant="success">Paga</span>
    <div mxAlert variant="danger" announce><p mxAlertTitle>Falhou</p><p>Tenta de novo.</p></div>
    <div mxAlert><p>Nota estática.</p></div>
    <article mxCard>
      <header mxCardHeader><h2 mxCardTitle>Facturação</h2><p mxCardDescription>Mês corrente</p></header>
      <div mxCardContent>Conteúdo</div>
    </article>
    <label for="p">Envio</label><progress id="p" mxProgress value="40" max="100"></progress>
    <span mxSpinner></span>
    <hr mxSeparator />
    <div mxSeparator orientation="vertical"></div>
    <div aria-busy="true"><div mxSkeleton shape="text"></div></div>
  `,
})
class Host {}

describe('Componentes de apresentação', () => {
  function setup() {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    return { fixture, q: (s: string) => fixture.nativeElement.querySelector(s) as HTMLElement };
  }

  it('aplicam classes e variantes', () => {
    const { q } = setup();
    expect(q('[mxBadge]').className).toContain('mx-badge');
    expect(q('[mxBadge]').getAttribute('data-variant')).toBe('success');
    expect(q('article').className).toContain('mx-card');
    expect(q('progress').className).toContain('mx-progress');
  });

  it('só interrompem o leitor de ecrã quando pedido', () => {
    const { fixture } = setup();
    const [urgente, nota] = fixture.nativeElement.querySelectorAll('.mx-alert');
    expect(urgente.getAttribute('role')).toBe('alert');
    expect(nota.getAttribute('role')).toBeNull();
  });

  it('dão a semântica certa a separadores, spinner e skeleton', () => {
    const { q } = setup();
    expect(q('hr').getAttribute('role')).toBeNull();
    expect(q('div.mx-separator').getAttribute('role')).toBe('separator');
    expect(q('div.mx-separator').getAttribute('aria-orientation')).toBe('vertical');
    expect(q('.mx-spinner').getAttribute('role')).toBe('status');
    expect(q('.mx-spinner').getAttribute('aria-label')).toBe('A carregar');
    expect(q('.mx-skeleton').getAttribute('aria-hidden')).toBe('true');
  });

  it('não têm violações de acessibilidade', async () => {
    const { fixture } = setup();
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
