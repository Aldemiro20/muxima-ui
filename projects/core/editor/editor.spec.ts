import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxEditor } from './editor';

@Component({
  imports: [MxEditor, MxFormField, MxLabel, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxLabel>Notas</label>
      <mx-editor [formControl]="notas" placeholder="Escreve" [maxLength]="20" />
    </mx-form-field>
  `,
})
class Host {
  notas = new FormControl('<p>Olá <strong>Kianda</strong></p>', Validators.required);
}

const flush = () => new Promise((r) => setTimeout(r, 0));

describe('MxEditor', () => {
  it('carrega o valor, liga o rótulo, formata pela barra e emite HTML', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    await flush();
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const prose = el.querySelector('.mx-editor-prose') as HTMLElement;
    expect(prose.getAttribute('role')).toBe('textbox');
    expect(document.getElementById(prose.getAttribute('aria-labelledby')!)!.textContent).toContain(
      'Notas',
    );
    expect(prose.innerHTML).toContain('<strong>Kianda</strong>');
    const toolbar = el.querySelector('[role="toolbar"]')!;
    expect(toolbar.querySelectorAll('[tabindex="0"]').length).toBe(1);
    expect(el.querySelector('.mx-editor-count')!.textContent).toContain('10 / 20');

    const editor = fixture.debugElement.query((d) => d.componentInstance instanceof MxEditor)
      .componentInstance as MxEditor;
    editor.editor()!.commands.selectAll();
    (el.querySelector('[data-tool="italic"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.notas.value).toContain('<em>');
    expect(el.querySelector('[data-tool="italic"]')!.getAttribute('aria-pressed')).toBe('true');

    fixture.componentInstance.notas.setValue('');
    fixture.detectChanges();
    expect(editor.editor()!.isEmpty).toBe(true);
    await expectNoA11yViolations(el);
  });
});
