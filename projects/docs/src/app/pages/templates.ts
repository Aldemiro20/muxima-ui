import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';
import { DOC_UI } from '../ui/doc-ui';

type Cat = 'Todos' | 'Dashboards' | 'Gestão' | 'Autenticação' | 'Ferramentas';

interface Template {
  name: string;
  description: string;
  tag: string;
  category: Exclude<Cat, 'Todos'>;
}

const TEMPLATES: Template[] = [
  { name: 'Dashboard Empresarial', description: 'Métricas, relatórios e indicadores.', tag: 'Dashboard', category: 'Dashboards' },
  { name: 'Gestão de Clientes', description: 'CRM para equipas comerciais.', tag: 'CRM', category: 'Gestão' },
  { name: 'Recursos Humanos', description: 'Colaboradores, equipas e processos.', tag: 'RH', category: 'Gestão' },
  { name: 'Gestão Financeira', description: 'Facturas, pagamentos e orçamentos.', tag: 'Finanças', category: 'Dashboards' },
  { name: 'Autenticação', description: 'Login, recuperação e onboarding.', tag: 'Auth', category: 'Autenticação' },
  { name: 'Admin Starter', description: 'Base reutilizável para aplicações.', tag: 'Starter', category: 'Ferramentas' },
];

@Component({
  selector: 'doc-templates',
  imports: [DOC_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Blocos e Templates' }, { label: 'Templates' }]"
        title="Templates"
        lead="Interfaces empresariais completas, construídas com os componentes da Muxima UI, para acelerar a criação de aplicações reais."
      />

      <div class="chips" role="group" aria-label="Filtrar templates">
        @for (c of cats; track c) {
          <button type="button" class="chip" [attr.aria-pressed]="cat() === c" (click)="cat.set(c)">{{ c }}</button>
        }
      </div>

      <h2 class="mx-visually-hidden">Lista de templates</h2>
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
              <div class="card-foot"><span class="tag">{{ t.tag }}</span><span class="muted small">Em preparação</span></div>
            </div>
          </div>
        }
      </div>

      <doc-callout>Os templates são produtos adicionais. Os componentes essenciais continuam gratuitos e disponíveis no Core.</doc-callout>
    </article>
  `,
})
export class TemplatesPage {
  protected readonly cats: Cat[] = ['Todos', 'Dashboards', 'Gestão', 'Autenticação', 'Ferramentas'];
  protected readonly cat = signal<Cat>('Todos');
  /** Lido do endereço (?categoria=Dashboards), para as ligações da barra lateral. */
  readonly categoria = input<string | undefined>();

  constructor() {
    effect(() => {
      const c = this.categoria();
      this.cat.set(c && (this.cats as string[]).includes(c) ? (c as Cat) : 'Todos');
    });
  }
  protected readonly items = computed(() => TEMPLATES.filter((t) => this.cat() === 'Todos' || t.category === this.cat()));
}
