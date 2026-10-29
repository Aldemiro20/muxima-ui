import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DOC_UI } from '../../ui/doc-ui';

interface Rule {
  title: string;
  text: string;
  checks: string[];
}

@Component({
  selector: 'doc-padrao',
  imports: [DOC_UI],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Get started' }, { label: 'Quality standard' }]"
        title="Quality standard"
        lead="A component only enters Muxima UI when it meets this list. It's what turns many components into components you can trust."
      />

      <section>
        <h2>The eight rules</h2>
        <ol class="rules">
          @for (r of rules; track r.title; let i = $index) {
            <li class="card rule">
              <span class="rule-number" aria-hidden="true">{{ i + 1 }}</span>
              <div>
                <h3>{{ r.title }}</h3>
                <p>{{ r.text }}</p>
                <ul class="plain-list">
                  @for (c of r.checks; track c) {
                    <li>{{ c }}</li>
                  }
                </ul>
              </div>
            </li>
          }
        </ol>
      </section>

      <section>
        <h2>How it's checked</h2>
        <p>Every component has behavior and keyboard tests, and an axe test on the component itself. The whole site passes axe, page by page, in light and dark mode:</p>
        <doc-code code="npm test            # behavior, keyboard and axe per component
npm run build:docs
npm run test:a11y   # axe on every example page, light and dark" />
      </section>
    </article>
  `,
})
export class PadraoPage {
  protected readonly rules: Rule[] = [
    {
      title: 'Current Angular',
      text: 'Angular 21 and 22. No legacy APIs.',
      checks: ['Inputs with input(), model() and output()', '@if and @for control flow', 'ChangeDetectionStrategy.OnPush and zoneless-ready'],
    },
    {
      title: 'Native HTML first',
      text: 'Directives on real elements (button[mxButton], input[mxInput]) instead of wrapping the element in a component.',
      checks: ['type, disabled, routerLink, aria-* and forms work with no extra code', 'A component only when HTML has no equivalent (Select, Tabs, Avatar)'],
    },
    {
      title: 'Accessibility',
      text: 'WAI-ARIA patterns and full keyboard navigation, with @angular/cdk (a11y, overlay, dialog).',
      checks: ['dialog, tabs, menu, listbox and combobox following WAI-ARIA', 'Focus trapped in modals and returned on close', 'AA contrast in light and dark mode, and 3:1 on control borders'],
    },
    {
      title: 'Forms',
      text: 'Every field works with ngModel and Reactive Forms.',
      checks: ['ControlValueAccessor (or Angular\'s native accessor for inputs)', 'Error state tied to the control, once touched', 'aria-describedby for the help text and the error message'],
    },
    {
      title: 'Complete states',
      text: 'Default, hover, focus, active, disabled, loading, error and empty, where they apply.',
      checks: ['Every page has a States section with an example of each', 'data-mx-state shows hover, focus and active without interaction'],
    },
    {
      title: 'Tokens only',
      text: 'No hand-written colors in the components\' CSS: everything comes from --mx-*.',
      checks: ['Automatic dark mode', 'The brand changes with --mx-accent and --mx-radius'],
    },
    {
      title: 'A small, predictable API',
      text: 'The same names in every component.',
      checks: ['variant, size and disabled mean the same everywhere', 'At most 6 variants and 3 sizes (sm, md, lg)', 'English component names, like any library: Button, Select, Dialog'],
    },
    {
      title: 'Tests',
      text: 'Behavior and keyboard in every component, plus automatic accessibility checks.',
      checks: ['axe test on every component (npm test)', 'axe test on every example page (npm run test:a11y)'],
    },
  ];
}
