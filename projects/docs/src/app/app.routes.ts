import { Routes } from '@angular/router';
import { EN_BARE, EN_LAYOUT, EN_PLAIN } from './routes-en';
import { PT_BARE, PT_LAYOUT, PT_PLAIN } from './routes-pt';
import { DocsLayout } from './shell/docs-layout';

/** Endereços antigos (antes do site em inglês), que eram em português: passam para /pt. */
const LEGACY: Routes = [
  ...['introducao', 'instalacao', 'temas', 'modo-escuro', 'idiomas', 'padrao-de-qualidade'].map((p) => ({
    path: `docs/${p}`,
    redirectTo: `/pt/docs/${p}`,
  })),
  { path: 'componentes', pathMatch: 'full', redirectTo: '/pt/componentes' },
  { path: 'componentes/:slug', redirectTo: '/pt/componentes/:slug' },
  { path: 'blocos', pathMatch: 'full', redirectTo: '/pt/blocos' },
  { path: 'blocos/ver/:id', redirectTo: '/pt/blocos/ver/:id' },
  { path: 'blocos/:categoria', redirectTo: '/pt/blocos/:categoria' },
  { path: 'precos', redirectTo: '/pt/precos' },
  { path: 'consultoria', redirectTo: '/pt/consultoria' },
];

/**
 * Inglês na raiz (/components/button) e português em /pt (/pt/componentes/button).
 * As rotas de cada idioma estão em routes-en.ts e routes-pt.ts.
 */
export const routes: Routes = [
  ...EN_BARE,
  {
    path: 'pt',
    children: [
      ...PT_BARE,
      ...PT_PLAIN,
      { path: '', component: DocsLayout, children: PT_LAYOUT },
      { path: '**', redirectTo: '' },
    ],
  },
  ...LEGACY,
  ...EN_PLAIN,
  { path: '', component: DocsLayout, children: EN_LAYOUT },
  { path: '**', redirectTo: '' },
];
