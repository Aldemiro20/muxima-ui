import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MxFormField, MxHint, MxLabel } from '@muxima-ui/core/form-field';
import { MxRangeSlider, MxSlider } from '@muxima-ui/core/slider';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-slider-page',
  imports: [DOC_UI, FormsModule, ReactiveFormsModule, MxSlider, MxRangeSlider, MxFormField, MxLabel, MxHint],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Slider' }]"
        title="Slider"
        lead="Um valor numérico dentro de um intervalo, ou um intervalo com dois cursores. É o input range nativo: setas, Page Up, Page Down, Home e End funcionam sem código extra."
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
        <doc-code code="import { MxRangeSlider, MxSlider } from '@muxima-ui/core/slider';" />
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
          <doc-example title="Com marcas" note="Um datalist nativo desenha as marcas nos passos.">
            <mx-form-field class="w-full">
              <label mxLabel>Desconto</label>
              <input type="range" mxSlider min="0" max="20" step="5" list="marcas-desconto" [(ngModel)]="desconto" [attr.aria-valuetext]="desconto + '%'" />
              <datalist id="marcas-desconto"><option value="0"></option><option value="5"></option><option value="10"></option><option value="15"></option><option value="20"></option></datalist>
              <div class="tick-labels" aria-hidden="true"><span>0%</span><span>5%</span><span>10%</span><span>15%</span><span>20%</span></div>
            </mx-form-field>
          </doc-example>
          <doc-example title="Desactivado">
            <mx-form-field class="w-full">
              <label mxLabel>Volume de envios (plano Pro)</label>
              <input type="range" mxSlider value="40" disabled />
            </mx-form-field>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Range slider</h2>
        <p>Dois cursores para escolher um intervalo (mínimo e máximo). São dois input range nativos dentro de <code>mx-range-slider</code>: cada cursor tem o seu teclado e é anunciado como "Preço, mínimo, 20 000 Kz". Os cursores não se cruzam.</p>
        <div class="grid-2">
          <doc-example title="Preço com valores visíveis" note="format dá o texto de cada valor, ao ecrã e ao leitor de ecrã.">
            <mx-form-field class="w-full">
              <label mxLabel>Preço</label>
              <mx-range-slider [(value)]="preco" [min]="0" [max]="1000000" [step]="10000" [format]="kz" showValues />
            </mx-form-field>
          </doc-example>
          <doc-example title="Distância mínima" [note]="'minGap mantém pelo menos 2 horas: ' + horario()?.[0] + 'h às ' + horario()?.[1] + 'h.'">
            <mx-form-field class="w-full">
              <label mxLabel>Horário de entregas</label>
              <mx-range-slider [(value)]="horario" [min]="6" [max]="22" [minGap]="2" [format]="horas" showValues />
            </mx-form-field>
          </doc-example>
          <doc-example title="Num formulário" [note]="'Valor do formulário: ' + JSON.stringify(idades.value)">
            <form class="stack w-full" [formGroup]="filtro">
              <mx-form-field>
                <label mxLabel>Idade</label>
                <mx-range-slider formControlName="idade" [min]="18" [max]="70" showValues />
                <mx-hint>Filtra os colaboradores por idade.</mx-hint>
              </mx-form-field>
            </form>
          </doc-example>
          <doc-example title="Tamanhos e desactivado">
            <div class="stack w-full">
              <mx-range-slider size="sm" aria-label="Pequeno" [value]="[20, 60]" />
              <mx-range-slider aria-label="Médio" [value]="[30, 70]" />
              <mx-range-slider size="lg" aria-label="Grande" [value]="[40, 80]" />
              <mx-range-slider aria-label="Desactivado" [value]="[25, 75]" disabled />
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
            'Mostra o valor também em texto, junto ao campo.',
            'No range slider, cada cursor junta o rótulo do campo a mínimo ou máximo, e aria-valuetext usa o format.'
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
  protected desconto = 10;
  protected readonly preco = signal<[number, number] | null>([150000, 600000]);
  protected readonly kz = (v: number) => new Intl.NumberFormat('pt-AO').format(v) + ' Kz';
  protected readonly horario = signal<[number, number] | null>([8, 17]);
  protected readonly horas = (v: number) => `${v}h`;
  protected readonly filtro = new FormGroup({ idade: new FormControl<[number, number] | null>([25, 45]) });
  protected readonly idades = this.filtro.controls.idade;
  protected readonly JSON = JSON;

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
    { kind: 'Componente', name: 'mx-range-slider', type: 'value: [number, number] | null (model)', description: 'Dois cursores. Também com ngModel e Reactive Forms.' },
    { kind: 'Input', name: 'min, max, step', type: 'number', default: '0, 100, 1', description: 'Do range slider.' },
    { kind: 'Input', name: 'minGap', type: 'number', default: '0', description: 'Distância mínima entre os cursores.' },
    { kind: 'Input', name: 'format', type: '(v: number) => string', description: 'Texto de cada valor (aria-valuetext e etiquetas).' },
    { kind: 'Input', name: 'showValues', type: 'boolean', default: 'false', description: 'Mostra os dois valores por baixo.' },
    { kind: 'Input', name: 'lowLabel, highLabel', type: 'string', default: 'mínimo, máximo', description: 'Nome de cada cursor.' },
    { kind: 'Token CSS', name: '--mx-accent', type: 'color', default: '#0F5257', description: 'Cor do preenchimento.' },
  ];
}
