import { MxBadge } from '@muxima-ui/core/badge';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

@Component({
  selector: 'doc-avatar-page',
  imports: [DOC_UI, MxAvatar, MxBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Avatar' }]"
        title="Avatar"
        lead="A photo of a person or organization. Without an image, or if the image fails, it shows the initials of the first and last name."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Avatar example">
          <mx-avatar name="Ana Kiala" src="exemplos/pessoa-1.svg" />
          <mx-avatar name="Joana Mbala" src="exemplos/pessoa-2.svg" />
          <mx-avatar name="Banco Mutamba" />
          <mx-avatar name="Rita Sousa" src="exemplos/nao-existe.png" />
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxAvatar } from '@muxima-ui/core/avatar';" />
      </section>

      <section>
        <h2>States</h2>
        <p>The avatar isn't interactive; the states are about the image.</p>
        <doc-states>
          <doc-state name="With image"><mx-avatar name="Ana Kiala" src="exemplos/pessoa-1.svg" /></doc-state>
          <doc-state name="No image" note="Initials."><mx-avatar name="Banco Mutamba" /></doc-state>
          <doc-state name="Image failed" note="Falls back to the initials."><mx-avatar name="Rita Sousa" src="exemplos/nao-existe.png" /></doc-state>
          <doc-state name="Sizes" note="24, 32 and 40 px."><mx-avatar name="Ana Kiala" size="sm" /><mx-avatar name="Ana Kiala" /><mx-avatar name="Ana Kiala" size="lg" /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example title="With the name beside it" note="decorative: the name is already written, no need to repeat it.">
            <div class="person">
              <mx-avatar name="Joana Mbala" src="exemplos/pessoa-2.svg" decorative />
              <div><strong>Joana Mbala</strong><span class="muted">Chief financial officer</span></div>
            </div>
          </doc-example>
          <doc-example title="Group">
            <div class="avatar-group" role="group" aria-label="Project team">
              <mx-avatar name="Ana Kiala" src="exemplos/pessoa-1.svg" />
              <mx-avatar name="Joana Mbala" src="exemplos/pessoa-2.svg" />
              <mx-avatar name="Aldemiro Valentim" />
              <span class="avatar-more" role="img" aria-label="4 more people">+4</span>
            </div>
          </doc-example>
          <doc-example title="With status" note="status adds the status to the name that is read: Ana Kiala, available.">
            <mx-avatar name="Ana Kiala" src="exemplos/pessoa-1.svg" status="online" size="lg" />
            <mx-avatar name="Joana Mbala" src="exemplos/pessoa-2.svg" status="away" size="lg" />
            <mx-avatar name="Aldemiro Valentim" status="busy" size="lg" />
            <mx-avatar name="Rita Sousa" status="offline" size="lg" />
          </doc-example>
          <doc-example title="Member list">
            <ul class="member-list w-full">
              @for (m of members; track m.nome) {
                <li>
                  <mx-avatar [name]="m.nome" [src]="m.foto" [status]="m.status" decorative />
                  <div><strong>{{ m.nome }}</strong><span class="muted">{{ m.funcao }}</span></div>
                  <span mxBadge dot [variant]="m.status === 'online' ? 'success' : 'outline'">{{ m.status === 'online' ? 'Available' : 'Offline' }}</span>
                </li>
              }
            </ul>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[{ key: '—', action: 'Does not receive focus. If it is clickable, wrap it in a button or link.' }]"
          [aria]="[
            'role=img with the name as aria-label: read once, with or without a photo.',
            'The inner image has an empty alt so the name is not repeated.',
            'With decorative it is hidden, for when the name is already written next to it.'
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <p>Selector: <code>mx-avatar</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'Badge' }, { name: 'Dropdown menu' }, { name: 'Card' }]" />
      </section>
    </article>
  `,
})
export class AvatarPage {
  protected readonly members = [
    { nome: 'Ana Kiala', funcao: 'Administrator', foto: 'exemplos/pessoa-1.svg', status: 'online' as const },
    { nome: 'Joana Mbala', funcao: 'Chief financial officer', foto: 'exemplos/pessoa-2.svg', status: 'online' as const },
    { nome: 'Aldemiro Valentim', funcao: 'Accountant', foto: null, status: 'offline' as const },
  ];

  protected readonly previewCode = `<mx-avatar name="Ana Kiala" src="/photos/ana.jpg" />
<mx-avatar name="Banco Mutamba" />`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'name', type: 'string', description: 'Required. Accessible name and source of the initials.' },
    { kind: 'Input', name: 'src', type: 'string', description: 'Image URL.' },
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '24, 32 or 40 px.' },
    { kind: 'Input', name: 'decorative', type: 'boolean', default: 'false', description: 'Hides it from screen readers.' },
  ];
}
