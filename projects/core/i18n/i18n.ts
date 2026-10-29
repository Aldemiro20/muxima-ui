import {
  EnvironmentProviders,
  Injectable,
  InjectionToken,
  Signal,
  computed,
  inject,
  makeEnvironmentProviders,
  signal,
} from '@angular/core';
import { MxDeepPartial, MxMessages } from './messages';
import { MX_MESSAGES_EN } from './messages-en';
import { MX_MESSAGES_PT } from './messages-pt';

/** Idiomas incluídos na biblioteca. Outros podem ser registados com `messages`. */
export type MxBuiltInLocale = 'pt' | 'en';

export interface MxI18nConfig {
  /** Idioma inicial: "en" (por omissão) ou "pt". Aceita também "pt-BR", "en-GB", etc. */
  locale?: string;
  /**
   * Textos por idioma. Para "pt" e "en" basta indicar o que muda; um idioma novo
   * (ex.: "fr") parte do inglês e substitui o que indicares.
   */
  messages?: Record<string, MxDeepPartial<MxMessages>>;
}

export const MX_I18N_CONFIG = new InjectionToken<MxI18nConfig>('MX_I18N_CONFIG');

const BUILT_IN: Record<MxBuiltInLocale, MxMessages> = { pt: MX_MESSAGES_PT, en: MX_MESSAGES_EN };

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype;
}

/** Junta `patch` sobre `base`, objecto a objecto; funções, textos e números substituem. */
export function mxMergeMessages<T>(base: T, patch: MxDeepPartial<T> | undefined): T {
  if (!patch) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) continue;
    const current = out[k];
    out[k] = isPlainObject(v) && isPlainObject(current) ? mxMergeMessages(current, v) : v;
  }
  return out as T;
}

/** Dicionário incluído para o idioma ("pt-BR" usa "pt"); inglês quando não há. */
export function mxBuiltInMessages(locale: string): MxMessages {
  const base = locale.toLowerCase().split(/[-_]/)[0] as MxBuiltInLocale;
  return BUILT_IN[base] ?? MX_MESSAGES_EN;
}

/**
 * Idioma activo e os textos dos componentes. Mudar o idioma com `setLocale`
 * actualiza logo todos os componentes no ecrã.
 *
 * ```ts
 * readonly i18n = inject(MxI18n);
 * this.i18n.setLocale('en');
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MxI18n {
  private readonly config = inject(MX_I18N_CONFIG, { optional: true }) ?? {};
  private readonly custom = signal<Record<string, MxDeepPartial<MxMessages>>>(this.config.messages ?? {});
  private readonly current = signal(this.config.locale ?? 'en');

  /** Idioma activo, tal como foi indicado ("pt", "en", "en-GB"...). */
  readonly locale = this.current.asReadonly();

  /** Todos os textos do idioma activo. */
  readonly messages: Signal<MxMessages> = computed(() => {
    const locale = this.current();
    const custom = this.custom();
    const base = locale.toLowerCase().split(/[-_]/)[0];
    let m = mxBuiltInMessages(locale);
    if (base !== locale) m = mxMergeMessages(m, custom[base]);
    return mxMergeMessages(m, custom[locale]);
  });

  /** Locale para Intl (números, datas): "pt-AO", "en-US"... */
  readonly intlLocale = computed(() => this.messages().intlLocale);

  setLocale(locale: string): void {
    this.current.set(locale);
  }

  /** Acrescenta ou corrige textos de um idioma, sem perder os que já existem. */
  register(locale: string, messages: MxDeepPartial<MxMessages>): void {
    this.custom.update((c) => ({ ...c, [locale]: mxMergeMessages((c[locale] ?? {}) as MxMessages, messages as never) }));
  }
}

/**
 * Configura o idioma dos componentes.
 *
 * ```ts
 * bootstrapApplication(App, {
 *   providers: [provideMuximaI18n({ locale: 'en' })],
 * });
 * ```
 */
export function provideMuximaI18n(config: MxI18nConfig): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: MX_I18N_CONFIG, useValue: config }]);
}

/** Textos do idioma activo; usar dentro de um componente ou serviço. */
export function injectMxMessages(): Signal<MxMessages> {
  return inject(MxI18n).messages;
}
