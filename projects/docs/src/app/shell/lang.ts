import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MxI18n } from '@muxima-ui/core/i18n';
import { filter } from 'rxjs';
import { BLOCK_IDS } from '../en/blocks/block-ids';

export type DocLang = 'en' | 'pt';

/** Idioma de um endereço: tudo o que está em /pt é português; o resto é inglês. */
export function langOf(url: string): DocLang {
  return /^\/pt(?:[/?#]|$)/.test(url) ? 'pt' : 'en';
}

/** Segmentos de endereço que mudam de um idioma para o outro (inglês -> português). */
const SEGMENTS: Record<string, string> = {
  components: 'componentes',
  blocks: 'blocos',
  view: 'ver',
  pricing: 'precos',
  consulting: 'consultoria',
  introduction: 'introducao',
  installation: 'instalacao',
  theming: 'temas',
  'dark-mode': 'modo-escuro',
  languages: 'idiomas',
  'quality-standard': 'padrao-de-qualidade',
};
const SEGMENTS_PT = Object.fromEntries(Object.entries(SEGMENTS).map(([en, pt]) => [pt, en]));


/** O mesmo endereço no outro idioma: /components/button <-> /pt/componentes/button. */
export function translatePath(url: string, to: DocLang): string {
  const [path, rest = ''] = url.split(/(?=[?#])/);
  const from = langOf(path);
  if (from === to) return url;
  const parts = path.replace(/^\/pt(?=\/|$)/, '').split('/').filter(Boolean);
  const map = to === 'pt' ? SEGMENTS : SEGMENTS_PT;
  const out = parts.map((p) => {
    const block = BLOCK_IDS.find((b) => (to === 'pt' ? b.en === p : b.pt === p));
    if (block) return to === 'pt' ? block.pt : block.en;
    return map[p] ?? p;
  });
  const joined = '/' + out.join('/');
  const query = to === 'pt' ? rest.replace('category=', 'categoria=') : rest.replace('categoria=', 'category=');
  return (to === 'pt' ? (joined === '/' ? '/pt' : '/pt' + joined) : joined) + query;
}

/** Idioma da página actual. Muda também o lang do documento e o idioma dos componentes. */
@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly router = inject(Router);
  readonly lang = signal<DocLang>(langOf(inject(DOCUMENT).location.pathname));
  /** Prefixo dos endereços: "" em inglês, "/pt" em português. */
  readonly prefix = computed(() => (this.lang() === 'pt' ? '/pt' : ''));

  constructor() {
    const document = inject(DOCUMENT);
    const i18n = inject(MxI18n);
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.lang.set(langOf((e as NavigationEnd).urlAfterRedirects)));
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang === 'pt' ? 'pt-AO' : 'en';
      i18n.setLocale(lang);
    });
  }

  /** Endereço actual no outro idioma. */
  switchUrl(to: DocLang): string {
    return translatePath(this.router.url, to);
  }
}
