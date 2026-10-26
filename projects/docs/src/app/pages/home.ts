import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxButton } from '@muxima-ui/core/button';
import { Icon } from '../ui/icon';
import { Logo } from '../ui/logo';

@Component({
  selector: 'doc-home',
  imports: [RouterLink, MxButton, Icon, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="conteudo" class="page-wide">
      <section class="hero">
        <div class="hero-copy">
          <p class="pill"><doc-icon name="code" [size]="14" /> Angular · Open Source · Feita em Angola</p>
          <h1 class="hero-title">Componentes Angular com <span class="accent">coração angolano.</span></h1>
          <p class="hero-lead">
            Uma biblioteca moderna, acessível e sóbria para desenvolver aplicações empresariais. Simples de integrar. Livre
            para criar.
          </p>
          <div class="hero-actions">
            <a mxButton size="lg" routerLink="/componentes">Explorar componentes <doc-icon name="arrowRight" /></a>
            <a mxButton size="lg" variant="outline" routerLink="/docs/introducao">Ler documentação <doc-icon name="book" /></a>
          </div>
          <dl class="hero-facts">
            <div><dt>Angular 21+</dt><dd>Signals e standalone</dd></div>
            <div><dt>MIT</dt><dd>Licença gratuita</dd></div>
            <div><dt>WAI-ARIA</dt><dd>Teclado e leitores de ecrã</dd></div>
          </dl>
        </div>

        <figure class="hero-preview" aria-label="Exemplo de painel construído com Muxima UI">
          <div class="hp-side" aria-hidden="true">
            <doc-logo [size]="22" />
            <strong>Espaço de trabalho</strong>
            <ul>
              <li class="on"><doc-icon name="grid" [size]="14" /> Visão geral</li>
              <li><doc-icon name="layers" [size]="14" /> Projectos</li>
              <li><doc-icon name="users" [size]="14" /> Equipa</li>
              <li><doc-icon name="table" [size]="14" /> Relatórios</li>
              <li><doc-icon name="sliders" [size]="14" /> Definições</li>
            </ul>
          </div>
          <div class="hp-main" aria-hidden="true">
            <div class="hp-head">
              <div><strong>Visão geral</strong><span>Indicadores do teu projecto</span></div>
              <span class="hp-chip">Últimos 30 dias</span>
            </div>
            <div class="hp-stats">
              <div><span>Utilizadores</span><strong>12,4 mil</strong><em>↗ 12%</em></div>
              <div><span>Receita</span><strong>48,7 M Kz</strong><em>↗ 8%</em></div>
              <div><span>Projectos</span><strong>128</strong><em>↗ 6%</em></div>
            </div>
            <div class="hp-chart">
              <strong>Desempenho</strong>
              <svg viewBox="0 0 400 120" preserveAspectRatio="none">
                <path class="grid" d="M0 30H400M0 60H400M0 90H400" />
                <path class="line" d="M0 110 L35 98 L70 104 L105 70 L140 82 L175 58 L210 62 L245 40 L280 55 L315 22 L350 30 L385 10 L400 13" />
              </svg>
            </div>
            <div class="hp-tags"><span class="on">✓ Concluído</span><span>Em progresso</span><span>Pendente</span></div>
          </div>
        </figure>
      </section>

      <section class="features" aria-labelledby="caracteristicas">
        <h2 id="caracteristicas" class="mx-visually-hidden">Características</h2>
        <div><span class="icon-tile"><doc-icon name="box" /></span><div><h3>Componentes completos</h3><p>Formulários, diálogos, tabelas e separadores prontos para produção.</p></div></div>
        <div><span class="icon-tile"><doc-icon name="shield" /></span><div><h3>Acessibilidade</h3><p>Teclado, estados de foco e atributos ARIA.</p></div></div>
        <div><span class="icon-tile"><doc-icon name="sliders" /></span><div><h3>Temas personalizáveis</h3><p>A tua marca, uma variável CSS.</p></div></div>
        <div><span class="icon-tile"><doc-icon name="code" /></span><div><h3>Código aberto</h3><p>Gratuito para projectos pessoais e comerciais.</p></div></div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Constrói com os componentes certos</h2>
          <a routerLink="/componentes" class="text-link">Ver catálogo completo <doc-icon name="arrowRight" [size]="14" /></a>
        </div>
        <div class="grid-3">
          <a class="card card-link" routerLink="/componentes/campos-de-entrada">
            <span class="icon-tile"><doc-icon name="file" /></span>
            <h3>Campos de entrada</h3>
            <p>Label, ajuda e erro ligados automaticamente.</p>
            <span class="text-link">Explorar componente →</span>
          </a>
          <a class="card card-link" routerLink="/componentes/dialogos">
            <span class="icon-tile"><doc-icon name="grid" /></span>
            <h3>Diálogos</h3>
            <p>Foco preso, Escape e foco devolvido a quem abriu.</p>
            <span class="text-link">Explorar componente →</span>
          </a>
          <a class="card card-link" routerLink="/componentes/tabelas">
            <span class="icon-tile"><doc-icon name="table" /></span>
            <h3>Tabelas</h3>
            <p>Ordenação acessível e números alinhados.</p>
            <span class="text-link">Explorar componente →</span>
          </a>
        </div>
      </section>

      <section class="card identity">
        <div>
          <p class="eyebrow">Design com significado</p>
          <h2>Tecnologia com coração angolano.</h2>
          <p class="muted">Muxima quer dizer coração em kimbundu. O motivo inspirado nos desenhos sona vive na marca e na documentação, não nos controlos.</p>
        </div>
        <doc-logo [size]="112" class="accent" />
      </section>
    </main>
  `,
})
export class HomePage {}
