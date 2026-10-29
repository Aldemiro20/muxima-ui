import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { DOC_UI } from '../../ui/doc-ui';

type Cat = 'All' | 'Dashboards' | 'Management' | 'Authentication' | 'Tools';

interface Template {
  name: string;
  description: string;
  tag: string;
  category: Exclude<Cat, 'All'>;
}

const TEMPLATES: Template[] = [
  { name: 'Business Dashboard', description: 'Metrics, reports and indicators.', tag: 'Dashboard', category: 'Dashboards' },
  { name: 'Customer Management', description: 'CRM for sales teams.', tag: 'CRM', category: 'Management' },
  { name: 'Human Resources', description: 'Employees, teams and processes.', tag: 'RH', category: 'Management' },
  { name: 'Financial Management', description: 'Invoices, payments and budgets.', tag: 'Finance', category: 'Dashboards' },
  { name: 'Authentication', description: 'Login, recovery and onboarding.', tag: 'Auth', category: 'Authentication' },
  { name: 'Admin Starter', description: 'A reusable base for applications.', tag: 'Starter', category: 'Tools' },
];

@Component({
  selector: 'doc-templates',
  imports: [DOC_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Templates' }]"
        title="Templates"
        lead="Complete business interfaces, built with Muxima UI components, to speed up building real applications."
      />

      <div class="chips" role="group" aria-label="Filter templates">
        @for (c of cats; track c) {
          <button type="button" class="chip" [attr.aria-pressed]="cat() === c" (click)="cat.set(c)">{{ c }}</button>
        }
      </div>

      <h2 class="mx-visually-hidden">Template list</h2>
      <div class="grid-3">
        @for (t of items(); track t.name) {
          <div class="card template-card">
            <div class="template-thumb" aria-hidden="true">
              <div class="tt-side"><i class="on"></i><i></i><i></i></div>
              <div class="tt-main">
                <i class="tt-title"></i>
                <div class="tt-stats"><b></b><b></b><b></b></div>
                <svg viewBox="0 0 200 60" preserveAspectRatio="none"><path d="M0 54 L22 50 L44 44 L66 47 L88 34 L110 38 L132 26 L154 22 L176 14 L200 10" /></svg>
              </div>
            </div>
            <div class="template-body">
              <div class="template-title"><h3>{{ t.name }}</h3><span class="tag pro">Pro</span></div>
              <p>{{ t.description }}</p>
              <div class="card-foot"><span class="tag">{{ t.tag }}</span><span class="muted small">Coming soon</span></div>
            </div>
          </div>
        }
      </div>

      <doc-callout>Templates are add-on products. The essential components stay free and available in Core.</doc-callout>
    </article>
  `,
})
export class TemplatesPage {
  protected readonly cats: Cat[] = ['All', 'Dashboards', 'Management', 'Authentication', 'Tools'];
  protected readonly cat = signal<Cat>('All');
  /** Read from the address (?category=Dashboards), for the sidebar links. */
  readonly category = input<string | undefined>();

  constructor() {
    effect(() => {
      const c = this.category();
      this.cat.set(c && (this.cats as string[]).includes(c) ? (c as Cat) : 'All');
    });
  }
  protected readonly items = computed(() => TEMPLATES.filter((t) => this.cat() === 'All' || t.category === this.cat()));
}
