import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MxButton } from '@muxima-ui/core/button';
import { MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { DOC_UI } from '../ui/doc-ui';
import { Icon } from '../ui/icon';

const HEX = /^#[0-9a-fA-F]{6}$/;

@Component({
  selector: 'doc-temas',
  imports: [DOC_UI, FormsModule, RouterLink, MxButton, MxFormField, MxLabel, MxInput, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Começar' }, { label: 'Temas' }]"
        title="Temas"
        lead="Personaliza a Muxima UI com a identidade do teu projecto. Ajusta a cor de marca e o raio e copia o CSS gerado."
      />

      <div class="theme-grid">
        <div class="stack-lg">
          <section class="card" aria-labelledby="personalizacao">
            <h2 id="personalizacao" class="card-title">Personalização</h2>
            <p class="muted small">Define os tokens globais da biblioteca.</p>

            <div class="field-block">
              <mx-form-field>
                <label mxLabel>Cor de marca</label>
                <div class="color-row">
                  <input type="color" class="color-swatch" [value]="accent()" (input)="setAccent($event)" aria-label="Escolher cor" />
                  <input mxInput class="mono" [ngModel]="accentText()" (ngModelChange)="onHex($event)" [invalid]="!validHex()" maxlength="7" />
                  @if (accent().toLowerCase() === '#0f5257') {
                    <span class="tag">Kwanza</span>
                  }
                </div>
              </mx-form-field>
            </div>

            <fieldset class="field-block">
              <legend class="mx-label">Raio dos componentes</legend>
              <div class="segmented" role="group" aria-label="Raio dos componentes">
                @for (r of radii; track r) {
                  <button type="button" [attr.aria-pressed]="radius() === r" (click)="radius.set(r)">{{ r }} px</button>
                }
              </div>
            </fieldset>

            <fieldset class="field-block">
              <legend class="mx-label">Modo de apresentação</legend>
              <div class="segmented narrow" role="group" aria-label="Modo de apresentação">
                <button type="button" [attr.aria-pressed]="mode() === 'light'" (click)="mode.set('light')"><doc-icon name="sun" [size]="14" /> Claro</button>
                <button type="button" [attr.aria-pressed]="mode() === 'dark'" (click)="mode.set('dark')"><doc-icon name="moon" [size]="14" /> Escuro</button>
              </div>
            </fieldset>
          </section>

          <section aria-labelledby="css-gerado">
            <div class="section-head tight">
              <h2 id="css-gerado">CSS gerado</h2>
              <button mxButton variant="outline" size="sm" type="button" (click)="reset()">Repor Kwanza</button>
            </div>
            <doc-code [code]="css()" />
          </section>
        </div>

        <div class="stack-lg">
          <section class="card theme-preview mx-theme" [attr.data-theme]="mode()" [style]="previewStyle()" aria-labelledby="pre-vis">
            <div class="section-head tight">
              <h2 id="pre-vis" class="card-title">Pré-visualização</h2>
              <span class="tag accent">Tema activo</span>
            </div>
            <div class="row-wrap">
              <button mxButton type="button">Botão principal</button>
              <button mxButton type="button" variant="outline">Secundário</button>
              <a mxButton variant="link" routerLink="/pt/componentes/button">Ver detalhes <doc-icon name="arrowRight" [size]="14" /></a>
            </div>
            <mx-form-field>
              <label mxLabel>Email</label>
              <input mxInput value="ola@empresa.co.ao" />
            </mx-form-field>
            <div class="row-wrap">
              <span class="tag outline"><i class="dot"></i> Activo</span>
              <span class="tag outline">Pendente</span>
              <span class="tag outline">Desactivado</span>
            </div>
            <div class="sample-card">
              <strong>Card de exemplo</strong>
              <span>Os tokens alteram a interface sem afectar a consistência dos componentes.</span>
            </div>
          </section>

          <section class="card" aria-labelledby="paleta">
            <h2 id="paleta" class="card-title">Paleta de referência</h2>
            <ul class="palette-swatches">
              @for (c of palette; track c.name) {
                <li><span class="swatch" [style.background]="c.hex"></span><strong>{{ c.name }}</strong><code>{{ c.hex }}</code></li>
              }
            </ul>
          </section>

          <doc-callout icon="sliders">Um único token, <code>--mx-accent</code>, adapta a biblioteca à marca de qualquer projecto.</doc-callout>
        </div>
      </div>
    </article>
  `,
})
export class TemasPage {
  protected readonly radii = [4, 6, 8, 10];
  protected readonly accent = signal('#0F5257');
  protected readonly accentText = signal('#0F5257');
  protected readonly radius = signal(6);
  protected readonly mode = signal<'light' | 'dark'>('light');
  protected readonly validHex = computed(() => HEX.test(this.accentText()));

  protected readonly palette = [
    { name: 'Papel', hex: '#FAFAF9' },
    { name: 'Pedra', hex: '#E7E5E2' },
    { name: 'Cinza', hex: '#6B6762' },
    { name: 'Tinta', hex: '#1C1B1A' },
    { name: 'Kwanza', hex: '#0F5257' },
    { name: 'Erro', hex: '#B42318' },
  ];

  protected readonly previewStyle = computed(() => {
    const isDefault = this.accent().toLowerCase() === '#0f5257';
    // No modo escuro, a cor por omissão é a variante clara do Kwanza; uma cor personalizada é usada tal como está.
    const accent = isDefault && this.mode() === 'dark' ? '' : `--mx-accent: ${this.accent()};`;
    return `${accent} --mx-radius: ${this.radius()}px;`;
  });

  protected readonly css = computed(
    () => `/* Tema Muxima UI */
:root {
  --mx-accent: ${this.accent().toUpperCase()};
  --mx-radius: ${this.radius()}px;
}`,
  );

  protected setAccent(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.accent.set(v);
    this.accentText.set(v.toUpperCase());
  }

  protected onHex(v: string): void {
    this.accentText.set(v);
    if (HEX.test(v)) this.accent.set(v);
  }

  protected reset(): void {
    this.accent.set('#0F5257');
    this.accentText.set('#0F5257');
    this.radius.set(6);
  }
}
