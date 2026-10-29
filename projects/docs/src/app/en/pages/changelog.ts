import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { LINKS } from '../data/site';
import { Callout } from '../../ui/doc-ui';
import { Icon } from '../../ui/icon';

interface Release {
  version: string;
  status: string;
  date: string;
  title: string;
  items: string[];
}

@Component({
  selector: 'doc-changelog',
  imports: [MxButton, Callout, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main id="conteudo" class="page-wide">
      <header class="page-head">
        <p class="eyebrow">What's new in the library</p>
        <h1 class="display">Changelog</h1>
        <p class="page-lead">Public history of changes, new features, fixes and accessibility improvements.</p>
      </header>

      <doc-callout>1.0.0 was the first public version. 1.x versions only add things: updating never forces you to change your code.</doc-callout>

      <ol class="timeline">
        @for (r of releases; track r.version) {
          <li>
            <div class="tl-meta">
              <strong>v{{ r.version }}</strong>
              <span class="tag" [class.accent]="r.status === 'In progress' || r.status === 'Released'">{{ r.status }}</span>
              <span class="muted small">{{ r.date }}</span>
            </div>
            <div class="card tl-card">
              <h2 class="card-title">{{ r.title }}</h2>
              <ul class="checks">
                @for (i of r.items; track i) {
                  <li><doc-icon name="check" /> {{ i }}</li>
                }
              </ul>
            </div>
          </li>
        }
      </ol>

      <section class="card row-card">
        <div>
          <h2 class="card-title">Transparent versions</h2>
          <p class="muted small">Every update links to its changelog, Git tag and migration notes.</p>
        </div>
        <a mxButton variant="outline" size="sm" [href]="links.repo" target="_blank" rel="noopener">See repository <doc-icon name="external" [size]="14" /></a>
      </section>
    </main>
  `,
})
export class ChangelogPage {
  protected readonly links = LINKS;
  protected readonly releases: Release[] = [
    {
      version: '1.5.0',
      status: 'In progress',
      date: 'Ready to publish',
      title: 'English and Portuguese',
      items: [
        'Languages: every component text in English and Portuguese, with provideMuximaI18n',
        'Switch language without reloading, with MxI18n.setLocale',
        'Dates, numbers and first day of the week follow the language',
        'Change any text or add another language',
        'Data grid: toolbar fields shrink on narrow screens',
      ],
    },
    {
      version: '1.4.0',
      status: 'Released',
      date: 'October 28, 2026',
      title: 'Guided tour and blocks',
      items: [
        'Tour guide: guided tour with spotlight, keyboard, focus returned and steps that prepare the screen',
        '32 copy-ready blocks in 10 categories, from hero to checkout and onboarding',
        'Every block at full screen, tablet and phone widths, with the .ts, .html and .css code',
      ],
    },
    {
      version: '1.3.0',
      status: 'Released',
      date: 'October 28, 2026',
      title: 'Advanced components',
      items: [
        'Data grid with cell-by-cell navigation, filters, selection, pinned columns and virtual scroll',
        'Kanban with drag and drop and keyboard moves',
        'Image cropper with zoom, rotation and export at the original resolution',
        'Rich text editor built on Tiptap, with an accessible toolbar',
      ],
    },
    {
      version: '1.2.0',
      status: 'Released',
      date: 'October 27, 2026',
      title: 'Navigation and content',
      items: [
        'Sidebar that collapses to icons, with groups, sections and counts',
        'Timeline with variants, pending steps, horizontal and alternating layouts',
        'Notification center and a bell button with the count',
        'Accessible carousel, with automatic rotation that can be paused',
        'Color picker with panel, opacity, swatches and contrast check',
      ],
    },
    {
      version: '1.1.0',
      status: 'Released',
      date: 'October 27, 2026',
      title: 'Forms',
      items: [
        'Date range picker, with shortcuts and a range calendar',
        'Time picker with a list of times and free typing (9, 930, 9h30)',
        'Range slider with two thumbs',
        'Chips, filters and a tag input',
        'File upload with validation, progress and per-file errors',
        'Rating and Copy to clipboard',
      ],
    },
    {
      version: '1.0.0',
      status: 'Released',
      date: 'October 27, 2026',
      title: 'First public version',
      items: [
        '33 components: forms, data, navigation, overlays and feedback',
        'Angular 21 and 22, standalone, signals and zoneless-ready',
        'The quality standard in all of them: native HTML first, WAI-ARIA, complete states, tokens only, a shared API',
        '--mx-* CSS tokens, automatic dark mode and 3:1 contrast borders',
        'Behavior and keyboard tests with axe on every component, axe on every page and end-to-end tests',
        'Docs with states, the code for every example and Ctrl+K search',
        'Replaces the @muxima-ui/* 1.0.x packages, which are now deprecated',
      ],
    },
  ];
}
