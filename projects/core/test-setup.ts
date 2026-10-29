/**
 * Os testes dos componentes verificam os textos em português: cada teste arranca
 * com o idioma "pt". O idioma por omissão (inglês) é testado em i18n/i18n.spec.ts.
 */
import { TestBed } from '@angular/core/testing';
import { beforeEach } from 'vitest';
import { provideMuximaI18n } from '@muxima-ui/core/i18n';

beforeEach(() => {
  TestBed.configureTestingModule({ providers: [provideMuximaI18n({ locale: 'pt' })] });
});
