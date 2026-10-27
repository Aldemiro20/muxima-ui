import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../testing/axe';
import { MxCarousel, MxCarouselSlide } from './carousel';

@Component({
  imports: [MxCarousel, MxCarouselSlide],
  template: `
    <mx-carousel aria-label="Novidades" [(index)]="i" [autoplay]="autoplay()">
      @for (s of ['Um', 'Dois', 'Três']; track s) {
        <mx-carousel-slide
          ><p>{{ s }}</p>
          <a href="#">Ver</a></mx-carousel-slide
        >
      }
    </mx-carousel>
  `,
})
class Host {
  i = signal(0);
  autoplay = signal(0);
}

describe('MxCarousel', () => {
  it('nomeia região e diapositivos, navega e tira do teclado os escondidos', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const host = el.querySelector('mx-carousel')!;
    expect(host.getAttribute('role')).toBe('region');
    expect(host.getAttribute('aria-roledescription')).toBe('carrossel');
    const slides = el.querySelectorAll('mx-carousel-slide');
    expect(slides[1].getAttribute('aria-label')).toBe('2 de 3');
    expect(slides[0].hasAttribute('inert')).toBe(false);
    expect(slides[1].hasAttribute('inert')).toBe(true);
    const prev = el.querySelector('.mx-carousel-prev') as HTMLButtonElement;
    const next = el.querySelector('.mx-carousel-next') as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
    await expectNoA11yViolations(el);

    next.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.i()).toBe(1);
    expect(slides[1].hasAttribute('inert')).toBe(false);
    expect(el.querySelectorAll('.mx-carousel-dot')[1].getAttribute('aria-current')).toBe('true');
    (el.querySelectorAll('.mx-carousel-dot')[2] as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(next.disabled).toBe(true);
    expect(el.querySelector('.mx-carousel-track')!.getAttribute('aria-live')).toBe('polite');
  });

  it('com rotação automática tem botão de pausa e aria-live off', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.autoplay.set(5000);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const play = el.querySelector('.mx-carousel-play') as HTMLButtonElement;
    expect(play.getAttribute('aria-label')).toBe('Parar a rotação automática');
    expect(el.querySelector('.mx-carousel-track')!.getAttribute('aria-live')).toBe('off');
    play.click();
    fixture.detectChanges();
    expect(play.getAttribute('aria-label')).toBe('Iniciar a rotação automática');
    expect(el.querySelector('.mx-carousel-track')!.getAttribute('aria-live')).toBe('polite');
  });
});
