import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxSlider } from '@muxima-ui/core/slider';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-slider-page',
  imports: [DOC_UI, FormsModule, MxSlider, MxFormField, MxLabel, MxHint],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Slider' }]"
        title="Slider"
        lead="Um valor numérico dentro de um intervalo. É o input range nativo: setas, Page Up, Page Down, Home e End funcionam sem código extra."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de slider">
          <mx-form-field class="w-320">
            <label mxLabel>Orçamento mensal</label>
            <input type="range" mxSlider min="0" max="500" step="10" [(ngModel)]="orcamento" [attr.aria-valuetext]="orcamento + ' mil kwanzas'" />
            <mx-hint>{{ orcamento }} mil Kz</mx-hint>
          </mx-form-field>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxSlider } from '@muxima-ui/core/slider';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Barra com a parte preenchida em Kwanza e um botão circular.</p>
        <doc-structure [labels]="{ topLeft: 'Barra de 6 px', topRight: 'Foco no botão', bottomLeft: 'Preenchimento', bottomRight: 'Botão de 16 px', bottom: 'input type=range com min, max e step' }">
          <input type="range" mxSlider value="60" tabindex="-1" aria-label="Exemplo" class="w-180" />
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Hover, foco e activo aparecem aqui fixos para comparação.</p>
        <doc-states>
          <doc-state name="Normal"><input type="range" mxSlider value="40" aria-label="Normal" /></doc-state>
          <doc-state name="Hover"><input type="range" mxSlider value="40" aria-label="Hover" data-mx-state="hover" /></doc-state>
          <doc-state name="Foco"><input type="range" mxSlider value="40" aria-label="Foco" data-mx-state="focus" /></doc-state>
          <doc-state name="Activo" note="Enquanto é arrastado."><input type="range" mxSlider value="40" aria-label="Activo" data-mx-state="active" /></doc-state>
          <doc-state name="Desactivado"><input type="range" mxSlider value="40" aria-label="Desactivado" disabled /></doc-state>
          <doc-state name="Erro"><input type="range" mxSlider value="90" aria-label="Erro" invalid /></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Com valor anunciado" note="aria-valuetext diz a unidade ao leitor de ecrã.">
            <mx-form-field class="w-full">
              <label mxLabel>Prazo de pagamento</label>
              <input type="range" mxSlider min="15" max="90" step="15" [(ngModel)]="prazo" [attr.aria-valuetext]="prazo + ' dias'" />
              <mx-hint>{{ prazo }} dias</mx-hint>
            </mx-form-field>
          </doc-example>
          <doc-example title="Tamanhos">
            <div class="stack">
              <input type="range" mxSlider size="sm" value="30" aria-label="Pequeno" />
              <input type="range" mxSlider value="50" aria-label="Médio" />
              <input type="range" mxSlider size="lg" value="70" aria-label="Grande" />
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Setas', action: 'Aumentam ou diminuem um passo.' },
            { key: 'Page Up / Down', action: 'Passos maiores.' },
            { key: 'Home / End', action: 'Mínimo e máximo.' }
          ]"
          [aria]="[
            'input range nativo: o leitor de ecrã anuncia o valor e o intervalo.',
            'Usa aria-valuetext quando o número sozinho não diz a unidade.',
            'Mostra o valor também em texto, junto ao campo.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <p>Selector: <code>input[type=range][mxSlider]</code>.</p>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Input' }, { name: 'Progress' }, { name: 'Select' }]" />
      </section>
    </article>
  `,
})
export class SliderPage {
  protected orcamento = 120;
  protected prazo = 30;

  protected readonly previewCode = `<mx-form-field>
  <label mxLabel>Orçamento mensal</label>
  <input type="range" mxSlider min="0" max="500" step="10"
         [(ngModel)]="orcamento" [attr.aria-valuetext]="orcamento + ' mil kwanzas'" />
  <mx-hint>{{ orcamento }} mil Kz</mx-hint>
</mx-form-field>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Input', name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: 'Barra de 4, 6 ou 8 px.' },
    { kind: 'Input', name: 'invalid', type: 'boolean', default: 'false', description: 'Força o estado de erro.' },
    { kind: 'Input', name: 'id', type: 'string', default: 'gerado', description: 'id do input.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Cor do preenchimento.' },
  ];
}
