import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { DOC_UI } from '../../ui/doc-ui';
import { LINKS } from '../data/site';

type Cat = 'All' | 'Dashboards' | 'Commerce' | 'Management' | 'Authentication' | 'Tools';

interface Template {
  name: string;
  description: string;
  tag: string;
  /** Screenshot of the template (in public/templates). */
  image?: string;
  /** Folder of the live demo (in LINKS.demos). */
  demo?: string;
  category: Exclude<Cat, 'All'>;
}

const TEMPLATES: Template[] = [
  { name: 'Business Dashboard', image: 'templates/business-dashboard-en.webp', demo: 'business-dashboard/', description: 'Invoicing, collections and reports, in English and Portuguese.', tag: 'Dashboard', category: 'Dashboards' },
  { name: 'Online Store', image: 'templates/online-store-en.webp', demo: 'online-store/', description: 'Store with catalog, cart and checkout, and admin for orders, products, coupons and shipping, in English and Portuguese.', tag: 'Store', category: 'Commerce' },
  { name: 'School Management', image: 'templates/school-management-en.webp', demo: 'school-management/', description: 'Students and guardians, attendance, grades and grade sheets, timetables and fees, in English and Portuguese.', tag: 'School', category: 'Management' },
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
            @if (t.image) {
              <img class="template-shot" [src]="t.image" [alt]="'Screenshot of the ' + t.name + ' template'" width="1200" height="750" loading="lazy" decoding="async" />
            } @else {
              <div class="template-thumb" aria-hidden="true">
                <div class="tt-side"><i class="on"></i><i></i><i></i></div>
                <div class="tt-main">
                  <i class="tt-title"></i>
                  <div class="tt-stats"><b></b><b></b><b></b></div>
                  <svg viewBox="0 0 200 60" preserveAspectRatio="none"><path d="M0 54 L22 50 L44 44 L66 47 L88 34 L110 38 L132 26 L154 22 L176 14 L200 10" /></svg>
                </div>
              </div>
            }
            <div class="template-body">
              <div class="template-title"><h3>{{ t.name }}</h3><span class="tag pro">Pro</span></div>
              <p>{{ t.description }}</p>
              <div class="card-foot">
                <span class="tag">{{ t.tag }}</span>
                @if (t.demo) {
                  <span class="tag available">Available</span>
                } @else {
                  <span class="muted small">Coming soon</span>
                }
              </div>
              @if (t.demo) {
                <a class="template-demo" [href]="links.demos + '/' + t.demo" target="_blank" rel="noopener" [attr.aria-label]="'View the ' + t.name + ' demo'">View demo <span aria-hidden="true">↗</span></a>
              }
            </div>
          </div>
        }
      </div>

      <doc-callout>Templates are add-on products. The essential components stay free and available in Core.</doc-callout>
    </article>
  `,
})
export class TemplatesPage {
  protected readonly links = LINKS;
  protected readonly cats: Cat[] = ['All', 'Dashboards', 'Commerce', 'Management', 'Authentication', 'Tools'];
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
