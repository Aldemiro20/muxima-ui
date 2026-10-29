import { DocLang } from '../shell/lang';
import * as en from '../en/data/site';
import * as pt from './site';

/** Navegação, catálogo e categorias no idioma pedido. */
export function siteData(lang: DocLang) {
  return lang === 'pt' ? pt : en;
}
