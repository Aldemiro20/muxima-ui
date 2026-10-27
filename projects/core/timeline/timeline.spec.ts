import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../testing/axe';
import { MX_TIMELINE } from './timeline';

@Component({
  imports: [MX_TIMELINE],
  template: `
    <ol mxTimeline aria-label="Histórico da factura">
      <li mxTimelineItem variant="success">
        <p mxTimelineTitle>Paga</p>
        <time mxTimelineTime datetime="2026-10-27">27 out</time>
      </li>
      <li mxTimelineItem pending><p mxTimelineTitle>Arquivada</p></li>
    </ol>
  `,
})
class Host {}

describe('MxTimeline', () => {
  it('usa a lista nativa e marca variantes e passos pendentes', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const items = el.querySelectorAll('li.mx-timeline-item');
    expect(el.querySelector('ol')!.classList).toContain('mx-timeline');
    expect(items[0].getAttribute('data-variant')).toBe('success');
    expect(items[1].hasAttribute('data-pending')).toBe(true);
    expect(el.querySelector('time')!.classList).toContain('mx-timeline-time');
    await expectNoA11yViolations(el);
  });
});
