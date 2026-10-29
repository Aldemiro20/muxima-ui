import { MxSwitch } from '@muxima-ui/core/switch';
import { MxChoice, MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxTab, MxTabs } from '@muxima-ui/core/tabs';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-tabs-page',
  imports: [DOC_UI, MxTabs, MxTab, MxFormField, MxLabel, MxInput, MxChoice, MxSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Tabs' }]"
        title="Tabs"
        lead="Split related content into sections at the same level. The active tab is marked by the Kwanza line."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Tabs example" align="start">
          <mx-tabs aria-label="Account settings" class="w-full">
            <mx-tab label="Profile"><p class="tab-copy">Name, photo and contacts visible to the team.</p></mx-tab>
            <mx-tab label="Security"><p class="tab-copy">Password, active sessions and two-step authentication.</p></mx-tab>
            <mx-tab label="Billing"><p class="tab-copy">Current plan, payment method and invoices.</p></mx-tab>
          </mx-tabs>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxTabs, MxTab } from '@muxima-ui/core/tabs';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>A list of tabs and one panel per tab, linked to each other.</p>
        <doc-structure
          [labels]="{
            topLeft: 'Tab (role=tab)',
            topRight: '2 px state line',
            bottomLeft: '1 px bottom border',
            bottomRight: 'Panel (role=tabpanel)',
            bottom: 'Content is only created when the tab opens'
          }"
        >
          <div class="mini-tabs" aria-hidden="true"><span class="on">Profile</span><span>Security</span></div>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>Each tab has these states. The selected one gets the 2 px Kwanza line.</p>
        <doc-states>
          <doc-state name="Default"><div class="mx-tab-list"><span class="mx-tab">Summary</span></div></doc-state>
          <doc-state name="Hover"><div class="mx-tab-list"><span class="mx-tab" data-mx-state="hover">Summary</span></div></doc-state>
          <doc-state name="Focus" note="Ring inside the tab."><div class="mx-tab-list"><span class="mx-tab" data-mx-state="focus">Summary</span></div></doc-state>
          <doc-state name="Selected" note="aria-selected"><div class="mx-tab-list"><span class="mx-tab" data-selected>Summary</span></div></doc-state>
          <doc-state name="Disabled" note="Skipped by the arrows."><div class="mx-tab-list"><span class="mx-tab" data-disabled>Summary</span></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="Disabled tab">
            <mx-tabs aria-label="Reports" class="w-full">
              <mx-tab label="Monthly"><p class="tab-copy">Month summary.</p></mx-tab>
              <mx-tab label="Quarterly" disabled><p class="tab-copy">Unavailable.</p></mx-tab>
              <mx-tab label="Yearly"><p class="tab-copy">Year summary.</p></mx-tab>
            </mx-tabs>
          </doc-example>
          <doc-example title="Controlled" [note]="'Active index: ' + index()">
            <mx-tabs [(selectedIndex)]="index" aria-label="Steps" class="w-full">
              <mx-tab label="Details"><p class="tab-copy">Step 1 of 3.</p></mx-tab>
              <mx-tab label="Payment"><p class="tab-copy">Step 2 of 3.</p></mx-tab>
              <mx-tab label="Confirmation"><p class="tab-copy">Step 3 of 3.</p></mx-tab>
            </mx-tabs>
          </doc-example>
          <doc-example title="Inside a card">
            <section class="mx-card w-full" aria-labelledby="tabs-card-t">
              <header class="mx-card-header"><h3 class="mx-card-title" id="tabs-card-t">Customer: Banco Mutamba</h3></header>
              <div class="mx-card-content">
                <mx-tabs aria-label="Customer detail">
                  <mx-tab label="Summary"><p class="tab-copy">Balance of 4,870,500.00 Kz, 2 pending invoices.</p></mx-tab>
                  <mx-tab label="Contacts"><p class="tab-copy">Dr. Luísa Gomes · luisa&#64;mutamba.ao</p></mx-tab>
                  <mx-tab label="Notes"><p class="tab-copy">Pays by transfer at the end of the month.</p></mx-tab>
                </mx-tabs>
              </div>
            </section>
          </doc-example>
          <doc-example title="With forms" note="Each tab's content is only created when it opens.">
            <mx-tabs aria-label="Settings" class="w-full">
              <mx-tab label="Profile">
                <div class="stack tab-form">
                  <mx-form-field><label mxLabel>Name</label><input mxInput value="Ana Kiala" /></mx-form-field>
                  <mx-form-field><label mxLabel>Email</label><input mxInput type="email" value="ana&#64;kianda.co.ao" /></mx-form-field>
                </div>
              </mx-tab>
              <mx-tab label="Security">
                <div class="stack tab-form">
                  <label mxChoice><input type="checkbox" mxSwitch checked /> Two-step verification</label>
                  <label mxChoice><input type="checkbox" mxSwitch /> New sign-in alerts</label>
                </div>
              </mx-tab>
            </mx-tabs>
          </doc-example>
          <doc-example title="Many tabs" note="The list scrolls horizontally when it doesn't fit; the arrows keep working.">
            <mx-tabs aria-label="Months" class="w-full narrow-tabs">
              @for (m of months; track m) {
                <mx-tab [label]="m"><p class="tab-copy">Billing for {{ m }}.</p></mx-tab>
              }
            </mx-tabs>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Enters the active tab and then the panel.' },
            { key: '← →', action: 'Change tabs, skipping disabled ones.' },
            { key: 'Home End', action: 'First and last tab.' }
          ]"
          [aria]="[
            'WAI-ARIA Tabs pattern with automatic activation.',
            'role=&quot;tablist&quot;, &quot;tab&quot; and &quot;tabpanel&quot;, with aria-selected, aria-controls and aria-labelledby.',
            'Roving tabindex: only the active tab is in the tab order.',
            'Name the list with aria-label when there is no visible title.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Stepper' }, { name: 'Accordion' }, { name: 'Dialog', path: '/components/dialog' }]" />
      </section>
    </article>
  `,
})
export class TabsPage {
  protected readonly months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  protected readonly index = signal(0);

  protected readonly previewCode = `<mx-tabs aria-label="Account settings">
  <mx-tab label="Profile">...</mx-tab>
  <mx-tab label="Security">...</mx-tab>
  <mx-tab label="Billing">...</mx-tab>
</mx-tabs>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'selectedIndex', type: 'number', default: '0', description: 'Accepts [(selectedIndex)].' },
    { kind: 'Input', name: 'aria-label', type: 'string', description: 'Name of the tab list.' },
    { kind: 'Directiva', name: 'mx-tab', type: 'MxTab', description: 'Inputs label (required) and disabled.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Active tab line.' },
  ];
}
