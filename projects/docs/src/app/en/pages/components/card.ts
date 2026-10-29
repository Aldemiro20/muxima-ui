import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxCardVariant } from '@muxima-ui/core/card';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxChoice, MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { MxSeparator } from '@muxima-ui/core/separator';
import { MxToast } from '@muxima-ui/core/toast';
import { Icon } from '../../../ui/icon';
import { RouterLink } from '@angular/router';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_CARD } from '@muxima-ui/core/card';
import { MxSkeleton } from '@muxima-ui/core/skeleton';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-card-page',
  imports: [DOC_UI, MX_CARD, MxButton, MxBadge, MxSkeleton, RouterLink, MxAvatar, MxSeparator, MxFormField, MxLabel, MxInput, MxChoice, MxCheckbox, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Card' }]"
        title="Card"
        lead="A surface that groups related content. They're directives on your own elements, so you pick article, section or a, and the right heading level."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Card example">
          <article mxCard class="w-320">
            <header mxCardHeader>
              <h3 mxCardTitle>October invoicing</h3>
              <p mxCardDescription>142 invoices issued, 9 pending.</p>
            </header>
            <div mxCardContent><strong class="big-number">18,4 M Kz</strong></div>
            <footer mxCardFooter>
              <button mxButton type="button" size="sm">See details</button>
              <button mxButton type="button" size="sm" variant="ghost">Export</button>
            </footer>
          </article>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MX_CARD } from '@muxima-ui/core/card';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>Header, content and footer, all optional. The inner padding is 20 px.</p>
        <doc-structure [labels]="{ topLeft: 'mxCardHeader', topRight: '10 px radius', bottomLeft: 'mxCardContent', bottomRight: 'mxCardFooter', bottom: '1 px border, no shadow' }">
          <div class="mini-dialog"><strong>Title</strong><span>Description</span><div class="mini-actions"><i class="dark"></i></div></div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>A static card has no states. A clickable card (a[mxCard]) has hover and focus.</p>
        <doc-states>
          <doc-state name="Default"><a mxCard href="#" class="mini-card"><span mxCardContent>Customers</span></a></doc-state>
          <doc-state name="Hover" note="Darker border."><a mxCard href="#" class="mini-card" data-mx-state="hover"><span mxCardContent>Customers</span></a></doc-state>
          <doc-state name="Focus"><a mxCard href="#" class="mini-card" data-mx-state="focus"><span mxCardContent>Customers</span></a></doc-state>
          <doc-state name="Loading" note="Skeleton in place of the content."><div mxCard class="mini-card" aria-busy="true"><div mxCardContent class="stack-sm"><div mxSkeleton shape="text" class="w-60"></div><div mxSkeleton shape="text" class="w-90"></div></div></div></doc-state>
          <doc-state name="Empty"><div mxCard class="mini-card"><p mxCardContent class="muted">No data</p></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Variants</h2>
        <p>Four looks for the same structure. Use default in most cases; accent only for what should stand out.</p>
        <div class="grid-4">
          @for (v of variants; track v.value) {
            <section mxCard [variant]="v.value" [attr.aria-labelledby]="'var-' + v.value">
              <header mxCardHeader>
                <h3 mxCardTitle [id]="'var-' + v.value">{{ v.label }}</h3>
                <p mxCardDescription>{{ v.text }}</p>
              </header>
            </section>
          }
        </div>
      </section>

      <section>
        <h2>Examples</h2>
        <p>Common layouts in business apps.</p>
        <div class="stack-lg">
          <doc-example title="Indicators (KPI)" note="A big number, change shown with a Badge. The change comes with an arrow and a sign, not color alone.">
            <div class="grid-3 w-full">
              @for (k of kpis; track k.label) {
                <section mxCard [attr.aria-label]="k.label">
                  <div mxCardContent class="kpi">
                    <p class="kpi-label">{{ k.label }}</p>
                    <p class="kpi-value">{{ k.value }}</p>
                    <span mxBadge [variant]="k.up ? 'success' : 'danger'">{{ k.up ? '↑' : '↓' }} {{ k.delta }}</span>
                    <span class="kpi-note">vs September</span>
                  </div>
                </section>
              }
            </div>
          </doc-example>

          <div class="grid-2">
            <doc-example title="With image" note="mxCardMedia takes the image edge to edge.">
              <article mxCard class="w-full">
                <img mxCardMedia src="exemplos/armazem.svg" alt="Illustration of a warehouse with a truck" />
                <header mxCardHeader>
                  <div class="row-between"><h3 mxCardTitle>Lobito warehouse</h3><span mxBadge variant="success">Open</span></div>
                  <p mxCardDescription>12 Rua do Porto · 2,400 m² · 18 docks</p>
                </header>
                <footer mxCardFooter>
                  <button mxButton type="button" size="sm">See stock</button>
                  <button mxButton type="button" size="sm" variant="ghost">Contacts</button>
                </footer>
              </article>
            </doc-example>

            <doc-example title="Horizontal" note="orientation=&quot;horizontal&quot;; on narrow screens it goes back to vertical.">
              <article mxCard orientation="horizontal" class="w-full">
                <img mxCardMedia src="exemplos/meeting.svg" alt="Illustration of three people in a meeting" />
                <header mxCardHeader>
                  <h3 mxCardTitle>E-invoicing training</h3>
                  <p mxCardDescription>Thursday, November 6 · 09:00 · Talatona</p>
                </header>
                <div mxCardContent><span mxBadge variant="warning">8 seats left</span></div>
                <footer mxCardFooter><button mxButton type="button" size="sm" variant="outline">Sign up</button></footer>
              </article>
            </doc-example>

            <doc-example title="Profile">
              <section mxCard class="w-full" aria-labelledby="perfil-nome">
                <div mxCardContent class="profile">
                  <mx-avatar name="Joana Mbala" src="exemplos/pessoa-2.svg" size="lg" decorative />
                  <div>
                    <h3 class="profile-name" id="perfil-nome">Joana Mbala</h3>
                    <p class="muted">Chief financial officer · Kianda Logistics</p>
                  </div>
                </div>
                <hr mxSeparator />
                <dl mxCardContent class="detail-list">
                  <div><dt>Email</dt><dd>joana&#64;kianda.co.ao</dd></div>
                  <div><dt>Phone</dt><dd>+244 923 000 512</dd></div>
                  <div><dt>Since</dt><dd>March 2021</dd></div>
                </dl>
                <footer mxCardFooter>
                  <button mxButton type="button" size="sm">Send message</button>
                  <button mxButton type="button" size="sm" variant="outline">See invoices</button>
                </footer>
              </section>
            </doc-example>

            <doc-example title="Form" note="The card groups the form; the main button sits in the footer.">
              <form mxCard class="w-full" aria-labelledby="login-titulo" (submit)="$event.preventDefault(); toast.success('Signed in')">
                <header mxCardHeader>
                  <h3 mxCardTitle id="login-titulo">Sign in</h3>
                  <p mxCardDescription>Use your company email.</p>
                </header>
                <div mxCardContent class="stack">
                  <mx-form-field>
                    <label mxLabel>Email</label>
                    <input mxInput type="email" autocomplete="email" placeholder="name@company.co.ao" />
                  </mx-form-field>
                  <mx-form-field>
                    <label mxLabel>Password</label>
                    <input mxInput type="password" autocomplete="current-password" />
                  </mx-form-field>
                  <label mxChoice><input type="checkbox" mxCheckbox /> Keep me signed in</label>
                </div>
                <footer mxCardFooter class="card-footer-split">
                  <a mxButton variant="link" size="sm" href="#" (click)="$event.preventDefault()">Forgot password</a>
                  <button mxButton type="submit">Sign in</button>
                </footer>
              </form>
            </doc-example>

            <doc-example title="Activity list">
              <section mxCard class="w-full" aria-labelledby="act-titulo">
                <header mxCardHeader class="row-between">
                  <h3 mxCardTitle id="act-titulo">Recent activity</h3>
                  <a mxButton variant="link" size="sm" href="#" (click)="$event.preventDefault()">See all</a>
                </header>
                <ul mxCardContent class="activity">
                  @for (a of activity; track a.text) {
                    <li>
                      <mx-avatar [name]="a.who" size="sm" decorative />
                      <div><p><strong>{{ a.who }}</strong> {{ a.text }}</p><p class="muted">{{ a.when }}</p></div>
                    </li>
                  }
                </ul>
              </section>
            </doc-example>

            <doc-example title="Featured plan" note="variant=&quot;accent&quot; for the recommended option.">
              <div class="grid-2 w-full">
                <section mxCard aria-labelledby="plano-basico">
                  <header mxCardHeader>
                    <h3 mxCardTitle id="plano-basico">Basic</h3>
                    <p mxCardDescription>To get started.</p>
                  </header>
                  <div mxCardContent><p class="price">Free</p></div>
                  <footer mxCardFooter><button mxButton type="button" size="sm" variant="outline" class="w-full">Choose</button></footer>
                </section>
                <section mxCard variant="accent" aria-labelledby="plano-equipa">
                  <header mxCardHeader>
                    <div class="row-between"><h3 mxCardTitle id="plano-equipa">Team</h3><span mxBadge>Most popular</span></div>
                    <p mxCardDescription>Up to 10 people.</p>
                  </header>
                  <div mxCardContent><p class="price">25 000 Kz<span class="muted"> /mês</span></p></div>
                  <footer mxCardFooter><button mxButton type="button" size="sm" class="w-full">Choose</button></footer>
                </section>
              </div>
            </doc-example>

            <doc-example title="Empty state" note="Says what's missing and gives the next step.">
              <section mxCard variant="subtle" class="w-full" aria-labelledby="vazio-titulo">
                <div mxCardContent class="empty-state">
                  <span class="icon-tile"><doc-icon name="file" /></span>
                  <h3 mxCardTitle id="vazio-titulo">No invoices yet</h3>
                  <p mxCardDescription>Issue your first invoice to start tracking payments.</p>
                  <button mxButton type="button" size="sm">Issue invoice</button>
                </div>
              </section>
            </doc-example>

            <doc-example title="Clickable card" note="The whole card is a link, with no buttons inside.">
              <a mxCard routerLink="/components/table" class="w-full">
                <div mxCardHeader>
                  <h3 mxCardTitle>Table</h3>
                  <p mxCardDescription>Tabular data with accessible sorting.</p>
                </div>
              </a>
            </doc-example>
          </div>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Only the clickable card or the buttons inside receive focus.' }]"
          [aria]="[
            'Pick the element by its semantics: article for standalone content, section with a heading, a for a link.',
            'Use the right heading level for the page (h2, h3...) in mxCardTitle.',
            'Do not put buttons inside a card that is already a link.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Badge' }, { name: 'Skeleton' }, { name: 'Separator' }]" />
      </section>
    </article>
  `,
})
export class CardPage {
  protected readonly toast = inject(MxToast);
  protected readonly variants: { value: MxCardVariant; label: string; text: string }[] = [
    { value: 'default', label: 'Default', text: '1 px border. The usual choice.' },
    { value: 'subtle', label: 'Subtle', text: 'Soft background, no border. To group without weight.' },
    { value: 'elevated', label: 'Elevated', text: 'Shadow. For what floats above the background.' },
    { value: 'accent', label: 'Accent', text: 'Kwanza border and line. For the recommended option.' },
  ];
  protected readonly kpis = [
    { label: 'Monthly revenue', value: '18,4 M Kz', delta: '12%', up: true },
    { label: 'Pending invoices', value: '9', delta: '3', up: false },
    { label: 'Active customers', value: '1 284', delta: '4%', up: true },
  ];
  protected readonly activity = [
    { who: 'Ana Kiala', text: 'issued invoice FT 2026/0146', when: '5 minutes ago' },
    { who: 'Pedro Neto', text: 'recorded the payment from Huíla Agro', when: '1 hour ago' },
    { who: 'Rita Sousa', text: 'added the customer Namibe Pescas', when: 'Yesterday, 17:40' },
  ];

  protected readonly previewCode = `<article mxCard>
  <header mxCardHeader>
    <h3 mxCardTitle>October invoicing</h3>
    <p mxCardDescription>142 invoices issued, 9 pending.</p>
  </header>
  <div mxCardContent>18.4 M Kz</div>
  <footer mxCardFooter>
    <button mxButton type="button" size="sm">See details</button>
  </footer>
</article>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: '[mxCard]', type: 'article | section | div | form | a | button', description: 'Surface. On a/button it gets hover and focus.' },
    { kind: 'Input', name: 'variant', type: "'default' | 'subtle' | 'elevated' | 'accent'", default: 'default' },
    { kind: 'Input', name: 'orientation', type: "'vertical' | 'horizontal'", default: 'vertical', description: 'Horizontal: image on the left.' },
    { kind: 'Directiva', name: '[mxCardMedia]', type: 'img | picture | div', description: 'Edge-to-edge image (16:9).' },
    { kind: 'Directiva', name: '[mxCardHeader]', type: 'directive', description: 'Title and description.' },
    { kind: 'Directiva', name: '[mxCardTitle]', type: 'h2 | h3 | ...', description: 'Title with the right level for the page.' },
    { kind: 'Directiva', name: '[mxCardDescription]', type: 'directive', description: 'Secondary text.' },
    { kind: 'Directiva', name: '[mxCardContent]', type: 'directive' },
    { kind: 'Directiva', name: '[mxCardFooter]', type: 'directive', description: 'Actions at the bottom of the card.' },
    { kind: 'Token CSS', name: '--mx-radius-surface', type: 'length', default: 'radius + 4px' },
  ];
}
