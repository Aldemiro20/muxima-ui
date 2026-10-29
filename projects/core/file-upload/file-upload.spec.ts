import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { expectNoA11yViolations } from '../testing/axe';
import { MxFileUpload, mxFileMatches, mxFormatBytes } from './file-upload';

@Component({
  imports: [MxFileUpload, MxFormField, MxLabel, MxHint, ReactiveFormsModule],
  template: `
    <mx-form-field>
      <label mxLabel>Comprovativos</label>
      <mx-file-upload [formControl]="ficheiros" accept=".pdf,image/*" [maxSize]="1000" [maxFiles]="2" multiple [progress]="progresso()" />
      <mx-hint>PDF ou imagem.</mx-hint>
    </mx-form-field>
  `,
})
class Host {
  ficheiros = new FormControl<File[]>([]);
  progresso = signal<Record<string, number>>({});
}

const file = (name: string, size: number, type: string) => new File([new Uint8Array(size)], name, { type });

describe('MxFileUpload', () => {
  it('formata tamanhos e reconhece tipos', () => {
    expect(mxFormatBytes(340_000)).toBe('340 kB');
    expect(mxFormatBytes(1_250_000)).toBe('1.3 MB');
    expect(mxFormatBytes(1_250_000, 'pt-AO')).toBe('1,3 MB');
    expect(mxFileMatches(file('a.PDF', 1, 'application/pdf'), '.pdf')).toBe(true);
    expect(mxFileMatches(file('a.png', 1, 'image/png'), 'image/*')).toBe(true);
    expect(mxFileMatches(file('a.docx', 1, 'application/msword'), '.pdf,image/*')).toBe(false);
  });

  it('aceita, rejeita com motivo, mostra progresso e remove', async () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    const upload = fixture.debugElement.query((d) => d.componentInstance instanceof MxFileUpload).componentInstance as MxFileUpload;
    upload.addFiles([file('factura.pdf', 500, 'application/pdf'), file('grande.pdf', 5000, 'application/pdf'), file('nota.docx', 10, 'application/msword')]);
    fixture.detectChanges();
    expect(fixture.componentInstance.ficheiros.value!.map((f) => f.name)).toEqual(['factura.pdf']);
    const rejections = el.querySelector('.mx-file-upload-rejections')!.textContent!;
    expect(rejections).toContain('grande.pdf: tem 5 kB, o máximo é 1 kB.');
    expect(rejections).toContain('nota.docx: tipo de ficheiro não aceite.');

    upload.addFiles([file('a.png', 10, 'image/png'), file('b.png', 10, 'image/png')]);
    fixture.detectChanges();
    expect(fixture.componentInstance.ficheiros.value!.length).toBe(2);
    expect(el.querySelector('.mx-file-upload-rejections')!.textContent).toContain('só podes juntar 2 ficheiros');

    fixture.componentInstance.progresso.set({ 'factura.pdf': 40 });
    fixture.detectChanges();
    expect(el.querySelector('progress')!.getAttribute('aria-label')).toBe('A enviar factura.pdf');

    const button = el.querySelector('.mx-file-upload-button')!;
    const name = button.getAttribute('aria-labelledby')!.split(' ').map((id) => document.getElementById(id)!.textContent!.trim()).join(' ');
    expect(name).toBe('Comprovativos escolhe no computador');
    await expectNoA11yViolations(el);

    (el.querySelector('.mx-file-upload-remove') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(fixture.componentInstance.ficheiros.value!.map((f) => f.name)).toEqual(['a.png']);
  });

  it('aceita ficheiros largados na área', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const zone = fixture.nativeElement.querySelector('.mx-file-upload-zone') as HTMLElement;
    const drop = new Event('drop', { bubbles: true, cancelable: true }) as Event & { dataTransfer: unknown };
    Object.defineProperty(drop, 'dataTransfer', { value: { files: [file('x.pdf', 10, 'application/pdf')] } });
    zone.dispatchEvent(drop);
    fixture.detectChanges();
    expect(fixture.componentInstance.ficheiros.value!.map((f) => f.name)).toEqual(['x.pdf']);
  });
});
