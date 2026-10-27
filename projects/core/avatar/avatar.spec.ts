import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { expectNoA11yViolations } from '../testing/axe';
import { MxAvatar } from './avatar';

@Component({
  imports: [MxAvatar],
  template: `<mx-avatar [name]="name()" [src]="src()" />`,
})
class Host {
  name = signal('Ana Maria Kiala');
  src = signal<string | null>(null);
}

describe('MxAvatar', () => {
  it('mostra as iniciais do primeiro e último nome e anuncia o nome', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('mx-avatar') as HTMLElement;
    expect(el.textContent?.trim()).toBe('AK');
    expect(el.getAttribute('role')).toBe('img');
    expect(el.getAttribute('aria-label')).toBe('Ana Maria Kiala');
    await expectNoA11yViolations(fixture.nativeElement);
  });

  it('volta às iniciais quando a imagem falha', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.componentInstance.src.set('/nao-existe.png');
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img') as HTMLImageElement;
    img.dispatchEvent(new Event('error'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('img')).toBeNull();
    expect(fixture.nativeElement.textContent.trim()).toBe('AK');
  });
});
