import { MxBadge } from '@muxima-ui/core/badge';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MxButton } from '@muxima-ui/core/button';
import { MxInput } from '@muxima-ui/core/form-field';
import { DOC_UI, ApiRow } from '../../../ui/doc-ui';
import { Icon } from '../../../ui/icon';

@Component({
  selector: 'doc-button-page',
  imports: [DOC_UI, MxButton, MxInput, FormsModule, RouterLink, Icon, MxBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Button' }]"
        title="Button"
        lead="Run actions, confirm decisions and navigate. They come in three sizes and six variants, always with the same focus ring."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Button example">
          <button mxButton type="button">Primary button <doc-icon name="arrowRight" /></button>
          <button mxButton type="button" variant="outline">Secondary button</button>
          <button mxButton type="button" variant="link">Text button</button>
          <button mxButton type="button" disabled>Disabled</button>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <p>Install the package and import the button in the Angular component where you'll use it.</p>
        <doc-code code="npm install @muxima-ui/core @angular/cdk" />
        <doc-code code="import { MxButton } from '@muxima-ui/core/button';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>Every button shares a predictable visual system: radius, height, border and spacing.</p>
        <doc-structure
          [labels]="{
            topLeft: '1 px border',
            topRight: '2 px focus',
            bottomLeft: '6 px radius',
            bottomRight: '36 px tall',
            bottom: 'Horizontal padding: 16 px'
          }"
        >
          <button mxButton type="button" tabindex="-1">Save changes</button>
        </doc-structure>
      </section>

      <section>
        <h2>States</h2>
        <p>Hover, focus and active are pinned here for comparison. In the app they appear with the mouse and keyboard.</p>
        <doc-states>
          <doc-state name="Default"><button mxButton type="button">Save</button></doc-state>
          <doc-state name="Hover" note="Darker background."><button mxButton type="button" data-mx-state="hover">Save</button></doc-state>
          <doc-state name="Focus" note="2 px ring, keyboard only."><button mxButton type="button" data-mx-state="focus">Save</button></doc-state>
          <doc-state name="Active" note="While pressed."><button mxButton type="button" data-mx-state="active">Save</button></doc-state>
          <doc-state name="Disabled" note="disabled"><button mxButton type="button" disabled>Save</button></doc-state>
          <doc-state name="Loading" note="loading: aria-busy and clicks blocked."><button mxButton type="button" loading>Saving</button></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <p>One example per use case. Behavior and visuals stay consistent.</p>
        <div class="grid-2">
          <doc-example title="Variants">
            <button mxButton type="button">Primary</button>
            <button mxButton type="button" variant="secondary">Secondary</button>
            <button mxButton type="button" variant="outline">Outline</button>
            <button mxButton type="button" variant="ghost">Ghost</button>
            <button mxButton type="button" variant="destructive">Delete</button>
            <button mxButton type="button" variant="link">Link</button>
          </doc-example>
          <doc-example title="Sizes" note="32, 36 and 40 px tall">
            <button mxButton type="button" size="sm">Small</button>
            <button mxButton type="button">Medium</button>
            <button mxButton type="button" size="lg">Large</button>
          </doc-example>
          <doc-example title="With an icon">
            <button mxButton type="button"><doc-icon name="check" /> Confirm</button>
            <button mxButton type="button" variant="outline"><doc-icon name="arrowRight" /> Continue</button>
            <button mxButton type="button" variant="outline" icon aria-label="Copy"><doc-icon name="copy" /></button>
          </doc-example>
          <doc-example title="Loading and disabled" note="Click Save to see the loading state.">
            <button mxButton type="button" [loading]="saving()" (click)="save()">
              {{ saving() ? 'Saving...' : 'Save' }}
            </button>
            <button mxButton type="button" disabled>Unavailable</button>
          </doc-example>
          <doc-example title="In a form" [note]="sent() ? 'Form submitted: ' + name : ''">
            <form class="inline-form" (ngSubmit)="sent.set(true)">
              <input mxInput name="name" [(ngModel)]="name" placeholder="Full name" aria-label="Full name" />
              <button mxButton type="submit">Send</button>
            </form>
          </doc-example>
          <doc-example title="As a link" note="Use the same directive on an a with routerLink.">
            <a mxButton variant="outline" routerLink="/components">See catalog</a>
            <a mxButton variant="link" routerLink="/pricing">See pricing</a>
          </doc-example>
          <doc-example title="Button group" note="Related actions side by side, in a named role=group.">
            <div class="button-group" role="group" aria-label="Formatting">
              <button mxButton type="button" variant="outline" size="sm" [attr.aria-pressed]="align() === 'left'" (click)="align.set('left')">Left</button>
              <button mxButton type="button" variant="outline" size="sm" [attr.aria-pressed]="align() === 'center'" (click)="align.set('center')">Center</button>
              <button mxButton type="button" variant="outline" size="sm" [attr.aria-pressed]="align() === 'right'" (click)="align.set('right')">Right</button>
            </div>
          </doc-example>
          <doc-example title="Full width" note="In narrow forms and on phones.">
            <div class="stack w-full">
              <button mxButton type="button" size="lg" class="w-full">Continue to payment</button>
              <button mxButton type="button" variant="ghost" class="w-full">Back</button>
            </div>
          </doc-example>
          <doc-example title="With a counter" note="The number is part of the accessible name.">
            <button mxButton type="button" variant="outline">Pending <span mxBadge size="sm" variant="warning">9</span></button>
            <button mxButton type="button" variant="ghost">Messages <span mxBadge size="sm">3</span></button>
          </doc-example>
          <doc-example title="Order in a footer" note="Secondary on the left, primary on the right; the destructive one is never the default primary.">
            <div class="row-end w-full">
              <button mxButton type="button" variant="ghost">Cancel</button>
              <button mxButton type="button" variant="outline">Save draft</button>
              <button mxButton type="button">Publish</button>
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Moves focus to the button.' },
            { key: 'Enter', action: 'Activates the button.' },
            { key: 'Space', action: 'Activates the button.' }
          ]"
          [aria]="[
            'Uses the native button or a element: screen readers announce it as a button or link.',
            'Disabled: disabled on button; aria-disabled and out of the tab order on a.',
            'Loading: aria-busy=&quot;true&quot; and new clicks blocked.',
            'Icon-only buttons need aria-label.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>button[mxButton]</code>, <code>a[mxButton]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Dialog', path: '/components/dialog' }, { name: 'Input', path: '/components/input' }, { name: 'Dropdown menu' }]" />
      </section>
    </article>
  `,
})
export class ButtonPage {
  protected readonly align = signal<'left' | 'center' | 'right'>('left');

  protected readonly saving = signal(false);
  protected readonly sent = signal(false);
  protected name = '';

  protected save(): void {
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 1500);
  }

  protected readonly previewCode = `<button mxButton type="button">
  Primary button <svg>...</svg>
</button>
<button mxButton type="button" variant="outline">Secondary button</button>
<button mxButton type="button" variant="link">Text button</button>
<button mxButton type="button" disabled>Disabled</button>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'variant', type: "'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link'", default: 'default', description: 'Button appearance.' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '32, 36 or 40 px tall.' },
    { kind: 'Input', name: 'icon', type: 'boolean', default: 'false', description: 'Square icon-only button; requires aria-label.' },
    { kind: 'Input', name: 'loading', type: 'boolean', default: 'false', description: 'Shows the indicator and blocks clicks.' },
    { kind: 'Input', name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button or link.' },
    { kind: 'Token CSS', name: '--mx-radius', type: 'length', default: '6px' },
    { kind: 'Token CSS', name: '--mx-control-height', type: 'length', default: '36px' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Color of the focus ring and the link variant.' },
  ];
}
