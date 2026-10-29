import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MxPagination } from '@muxima-ui/core/pagination';
import { MxChip } from '@muxima-ui/core/chips';
import { MxDatePicker, mxFormatDate, mxParseDate } from '@muxima-ui/core/date-picker';
import { mxColorName } from '@muxima-ui/core/color-picker';
import { expectNoA11yViolations } from '../testing/axe';
import { MX_MESSAGES_EN, MX_MESSAGES_PT, MxI18n, mxMergeMessages, provideMuximaI18n } from './index';

@Component({
  imports: [MxPagination, MxChip, MxDatePicker],
  template: `
    <mx-pagination [(page)]="page" [total]="200" [pageSize]="10" [showRange]="true" />
    <mx-chip removable>Luanda</mx-chip>
    <mx-chip removable removeLabel="Tirar">Benguela</mx-chip>
    <mx-date-picker aria-label="Data" />
  `,
})
class Host {
  page = signal(1);
}

/** Lista as chaves (com caminho) de um objecto, para comparar dicionários. */
function keys(o: object, prefix = ''): string[] {
  return Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === 'object' ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  );
}

describe('MxI18n', () => {
  const edges = (el: HTMLElement) =>
    Array.from(el.querySelectorAll('.mx-pagination-edge-label')).map((s) => s.textContent!.trim());

  it('inglês por omissão, sem configurar nada', () => {
    // test-setup.ts põe "pt" em todos os testes; aqui começa-se sem configuração
    TestBed.resetTestingModule();
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(TestBed.inject(MxI18n).locale()).toBe('en');
    expect(edges(el)).toEqual(['Previous', 'Next']);
    expect(el.querySelector('.mx-pagination-range')!.textContent!.trim()).toBe('1–10 of 200');
    expect(el.querySelector<HTMLInputElement>('mx-date-picker input')!.placeholder).toBe('mm/dd/yyyy');
  });

  it('português com provideMuximaI18n({ locale: "pt" })', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    expect(edges(fixture.nativeElement)).toEqual(['Anterior', 'Seguinte']);
    expect(fixture.nativeElement.querySelector('.mx-pagination-range').textContent.trim()).toBe('1–10 de 200');
  });

  it('inglês com provideMuximaI18n, e um input continua a ganhar ao idioma', async () => {
    TestBed.configureTestingModule({ providers: [provideMuximaI18n({ locale: 'en' })] });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(edges(el)).toEqual(['Previous', 'Next']);
    expect(el.querySelector('nav')!.getAttribute('aria-label')).toBe('Pagination');
    expect(el.querySelector('.mx-pagination-range')!.textContent!.trim()).toBe('1–10 of 200');
    const removes = el.querySelectorAll('.mx-chip-remove');
    expect(removes[0].getAttribute('aria-label')).toBe('Remove Luanda');
    expect(removes[1].getAttribute('aria-label')).toBe('Tirar Benguela');
    expect(el.querySelector<HTMLInputElement>('mx-date-picker input')!.placeholder).toBe('mm/dd/yyyy');
    await expectNoA11yViolations(el);
  });

  it('setLocale muda os componentes que já estão no ecrã', () => {
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    TestBed.inject(MxI18n).setLocale('en');
    fixture.detectChanges();
    expect(edges(fixture.nativeElement)).toEqual(['Previous', 'Next']);
    TestBed.inject(MxI18n).setLocale('pt');
    fixture.detectChanges();
    expect(edges(fixture.nativeElement)).toEqual(['Anterior', 'Seguinte']);
  });

  it('corrige textos de um idioma e regista um idioma novo a partir do inglês', () => {
    TestBed.configureTestingModule({
      providers: [
        provideMuximaI18n({
          locale: 'fr',
          messages: {
            pt: { pagination: { nextShort: 'Próxima' } },
            fr: { intlLocale: 'fr-FR', pagination: { previousShort: 'Précédent', nextShort: 'Suivant' } },
          },
        }),
      ],
    });
    const i18n = TestBed.inject(MxI18n);
    expect(i18n.messages().pagination.nextShort).toBe('Suivant');
    expect(i18n.messages().pagination.first).toBe('First page');
    expect(i18n.intlLocale()).toBe('fr-FR');
    i18n.setLocale('pt-BR');
    expect(i18n.messages().pagination.nextShort).toBe('Próxima');
    expect(i18n.messages().pagination.previousShort).toBe('Anterior');
    i18n.register('pt', { pagination: { previousShort: 'Voltar' } });
    expect(i18n.messages().pagination.previousShort).toBe('Voltar');
    expect(i18n.messages().pagination.nextShort).toBe('Próxima');
  });

  it('os dois dicionários têm as mesmas chaves', () => {
    expect(keys(MX_MESSAGES_EN).sort()).toEqual(keys(MX_MESSAGES_PT).sort());
  });

  it('mxMergeMessages não altera o original', () => {
    const merged = mxMergeMessages(MX_MESSAGES_PT, { tour: { next: 'Avançar' } });
    expect(merged.tour.next).toBe('Avançar');
    expect(merged.tour.previous).toBe('Anterior');
    expect(MX_MESSAGES_PT.tour.next).toBe('Seguinte');
  });

  it('datas escritas pela ordem de cada idioma', () => {
    const d = new Date(2026, 9, 28);
    expect(mxFormatDate(d)).toBe('10/28/2026');
    expect(mxFormatDate(d, 'dmy')).toBe('28/10/2026');
    expect(mxFormatDate(d, 'ymd')).toBe('2026-10-28');
    expect(mxParseDate('10/28/2026', 'mdy')).toEqual(d);
    expect(mxParseDate('28/10/2026', 'mdy')).toBeNull();
    expect(mxParseDate('2026-10-28', 'ymd')).toEqual(d);
  });

  it('nomes das cores nos dois idiomas', () => {
    expect(mxColorName('#1E3A8A')).toBe('dark blue');
    expect(mxColorName('#1E3A8A', MX_MESSAGES_PT.colorPicker.names)).toBe('azul escuro');
  });
});
