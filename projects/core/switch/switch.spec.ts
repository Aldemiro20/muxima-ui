import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MxChoice } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxSwitch } from './switch';

@Component({
  imports: [MxSwitch, MxChoice, FormsModule],
  template: `<label mxChoice><input type="checkbox" mxSwitch [(ngModel)]="ligado" /> Notificações</label>`,
})
class Host {
  ligado = false;
}

describe('MxSwitch', () => {
  it('tem role switch e muda o valor', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await fixture.whenStable();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('role')).toBe('switch');
    input.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.ligado).toBe(true);
    await expectNoA11yViolations(fixture.nativeElement);
  });
});
