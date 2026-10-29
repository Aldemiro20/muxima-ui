import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MxButton } from '@muxima-ui/core/button';
import { Icon } from '../../ui/icon';
import { Logo } from '../../ui/logo';

@Component({
  selector: 'doc-home',
  imports: [RouterLink, MxButton, Icon, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="conteudo" class="page-wide">
      <section class="hero">
        <div class="hero-copy">
          <p class="pill"><doc-icon name="code" [size]="14" /> Angular · Open Source · Made in Angola</p>
          <h1 class="hero-title">Angular components with <span class="accent">an Angolan heart.</span></h1>
          <p class="hero-lead">
            A modern, accessible and understated library for building business applications. Simple to integrate. Free
            to create.
          </p>
          <div class="hero-actions">
            <a mxButton size="lg" routerLink="/components">Explore components <doc-icon name="arrowRight" /></a>
            <a mxButton size="lg" variant="outline" routerLink="/docs/introduction">Read the docs <doc-icon name="book" /></a>
          </div>
          <dl class="hero-facts">
            <div><dt>Angular 21+</dt><dd>Signals and standalone</dd></div>
            <div><dt>MIT</dt><dd>Free license</dd></div>
            <div><dt>WAI-ARIA</dt><dd>Keyboard and screen readers</dd></div>
          </dl>
        </div>

        <figure class="hero-preview" aria-label="Example dashboard built with Muxima UI">
          <div class="hp-side" aria-hidden="true">
            <doc-logo [size]="22" />
            <strong>Workspace</strong>
            <ul>
              <li class="on"><doc-icon name="grid" [size]="14" /> Overview</li>
              <li><doc-icon name="layers" [size]="14" /> Projects</li>
              <li><doc-icon name="users" [size]="14" /> Team</li>
              <li><doc-icon name="table" [size]="14" /> Reports</li>
              <li><doc-icon name="sliders" [size]="14" /> Settings</li>
            </ul>
          </div>
          <div class="hp-main" aria-hidden="true">
            <div class="hp-head">
              <div><strong>Overview</strong><span>Your project at a glance</span></div>
              <span class="hp-chip">Last 30 days</span>
            </div>
            <div class="hp-stats">
              <div><span>Users</span><strong>12.4k</strong><em>↗ 12%</em></div>
              <div><span>Revenue</span><strong>$48.7K</strong><em>↗ 8%</em></div>
              <div><span>Projects</span><strong>128</strong><em>↗ 6%</em></div>
            </div>
            <div class="hp-chart">
              <strong>Performance</strong>
              <svg viewBox="0 0 400 120" preserveAspectRatio="none">
                <path class="grid" d="M0 30H400M0 60H400M0 90H400" />
                <path class="line" d="M0 110 L35 98 L70 104 L105 70 L140 82 L175 58 L210 62 L245 40 L280 55 L315 22 L350 30 L385 10 L400 13" />
              </svg>
            </div>
            <div class="hp-tags"><span class="on">✓ Done</span><span>In progress</span><span>Pending</span></div>
          </div>
        </figure>
      </section>

      <section class="features" aria-labelledby="caracteristicas">
        <h2 id="caracteristicas" class="mx-visually-hidden">Features</h2>
        <div><span class="icon-tile"><doc-icon name="box" /></span><div><h3>Complete components</h3><p>Forms, dialogs, tables and tabs ready for production.</p></div></div>
        <div><span class="icon-tile"><doc-icon name="shield" /></span><div><h3>Accessibility</h3><p>Keyboard, focus states and ARIA attributes.</p></div></div>
        <div><span class="icon-tile"><doc-icon name="sliders" /></span><div><h3>Customizable themes</h3><p>Your brand, one CSS variable.</p></div></div>
        <div><span class="icon-tile"><doc-icon name="code" /></span><div><h3>Open source</h3><p>Free for personal and commercial projects.</p></div></div>
      </section>

      <section class="section">
        <div class="section-head">
          <h2>Build with the right components</h2>
          <a routerLink="/components" class="text-link">See the full catalog <doc-icon name="arrowRight" [size]="14" /></a>
        </div>
        <div class="grid-3">
          <a class="card card-link" routerLink="/components/input">
            <span class="icon-tile"><doc-icon name="file" /></span>
            <h3>Input</h3>
            <p>Label, help and error wired up automatically.</p>
            <span class="text-link">Explore component →</span>
          </a>
          <a class="card card-link" routerLink="/components/dialog">
            <span class="icon-tile"><doc-icon name="grid" /></span>
            <h3>Dialog</h3>
            <p>Focus trapped, Escape, and focus returned to the opener.</p>
            <span class="text-link">Explore component →</span>
          </a>
          <a class="card card-link" routerLink="/components/table">
            <span class="icon-tile"><doc-icon name="table" /></span>
            <h3>Table</h3>
            <p>Accessible sorting and aligned numbers.</p>
            <span class="text-link">Explore component →</span>
          </a>
        </div>
      </section>

      <section class="card identity">
        <div>
          <p class="eyebrow">Design with meaning</p>
          <h2>Technology with an Angolan heart.</h2>
          <p class="muted">Muxima means heart in Kimbundu. The motif inspired by sona drawings lives in the brand and the docs, not in the controls.</p>
        </div>
        <doc-logo [size]="112" class="accent" />
      </section>
    </main>
  `,
})
export class HomePage {}
