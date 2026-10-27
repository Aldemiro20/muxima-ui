import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Clipboard } from '@angular/cdk/clipboard';
import { expectNoA11yViolations } from '../testing/axe';
import { MxCopy, MxCopyButton } from './clipboard';

@Component({
  imports: [MxCopy, MxCopyButton],
  template: `
    <button type="button" mxCopy="AO06 0040 0000 1234 5678 9012 3">Copiar IBAN</button>
    <button mxCopyButton value="sk_test_123" label="Copiar chave"></button>
  `,
})
class Host {}

describe('MxCopy', () => {
  it('copia, marca data-copied e muda o nome do botão de ícone', async () => {
    const copied: string[] = [];
    TestBed.configureTestingModule({ providers: [{ provide: Clipboard, useValue: { copy: (t: string) => (copied.push(t), true) } }] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const [text, icon] = Array.from(fixture.nativeElement.querySelectorAll('button')) as HTMLButtonElement[];
    text.click();
    fixture.detectChanges();
    expect(copied).toEqual(['AO06 0040 0000 1234 5678 9012 3']);
    expect(text.hasAttribute('data-copied')).toBe(true);
    expect(icon.getAttribute('aria-label')).toBe('Copiar chave');
    icon.click();
    fixture.detectChanges();
    expect(copied[1]).toBe('sk_test_123');
    expect(icon.getAttribute('aria-label')).toBe('Copiado');
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
