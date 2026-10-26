import { Routes } from '@angular/router';
import { DocsLayout } from './shell/docs-layout';

export const routes: Routes = [
  { path: '', pathMatch: 'full', title: 'Muxima UI — Componentes Angular com coração angolano', loadComponent: () => import('./pages/home').then((m) => m.HomePage) },
  {
    path: '',
    component: DocsLayout,
    children: [
      { path: 'docs', pathMatch: 'full', redirectTo: 'docs/introducao' },
      { path: 'docs/introducao', title: 'Introdução · Muxima UI', loadComponent: () => import('./pages/introducao').then((m) => m.IntroducaoPage) },
      { path: 'docs/instalacao', title: 'Instalação · Muxima UI', loadComponent: () => import('./pages/instalacao').then((m) => m.InstalacaoPage) },
      { path: 'docs/temas', title: 'Temas · Muxima UI', loadComponent: () => import('./pages/temas').then((m) => m.TemasPage) },
      { path: 'docs/modo-escuro', title: 'Modo escuro · Muxima UI', loadComponent: () => import('./pages/modo-escuro').then((m) => m.ModoEscuroPage) },
      { path: 'componentes', title: 'Componentes · Muxima UI', loadComponent: () => import('./pages/componentes').then((m) => m.ComponentesPage) },
      { path: 'componentes/botoes', title: 'Botões · Muxima UI', loadComponent: () => import('./pages/components/botoes').then((m) => m.BotoesPage) },
      { path: 'componentes/campos-de-entrada', title: 'Campos de entrada · Muxima UI', loadComponent: () => import('./pages/components/campos').then((m) => m.CamposPage) },
      { path: 'componentes/seleccao', title: 'Selecção · Muxima UI', loadComponent: () => import('./pages/components/seleccao').then((m) => m.SeleccaoPage) },
      { path: 'componentes/dialogos', title: 'Diálogos · Muxima UI', loadComponent: () => import('./pages/components/dialogos').then((m) => m.DialogosPage) },
      { path: 'componentes/separadores', title: 'Separadores · Muxima UI', loadComponent: () => import('./pages/components/separadores').then((m) => m.SeparadoresPage) },
      { path: 'componentes/tabelas', title: 'Tabelas · Muxima UI', loadComponent: () => import('./pages/components/tabelas').then((m) => m.TabelasPage) },
      { path: 'templates', title: 'Templates · Muxima UI', loadComponent: () => import('./pages/templates').then((m) => m.TemplatesPage) },
    ],
  },
  { path: 'precos', title: 'Preços · Muxima UI', loadComponent: () => import('./pages/precos').then((m) => m.PrecosPage) },
  { path: 'consultoria', title: 'Consultoria · Muxima UI', loadComponent: () => import('./pages/consultoria').then((m) => m.ConsultoriaPage) },
  { path: 'changelog', title: 'Changelog · Muxima UI', loadComponent: () => import('./pages/changelog').then((m) => m.ChangelogPage) },
  { path: '**', redirectTo: '' },
];
