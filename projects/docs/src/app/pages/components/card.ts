import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxCardVariant } from '@muxima-ui/core/card';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxChoice, MxFormField, MxInput, MxLabel } from '@muxima-ui/core/form-field';
import { MxSeparator } from '@muxima-ui/core/separator';
import { MxToast } from '@muxima-ui/core/toast';
import { Icon } from '../../ui/icon';
import { RouterLink } from '@angular/router';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_CARD } from '@muxima-ui/core/card';
import { MxSkeleton } from '@muxima-ui/core/skeleton';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

@Component({
  selector: 'doc-card-page',
  imports: [DOC_UI, MX_CARD, MxButton, MxBadge, MxSkeleton, RouterLink, MxAvatar, MxSeparator, MxFormField, MxLabel, MxInput, MxChoice, MxCheckbox, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Card' }]"
        title="Card"
        lead="Superfície para agrupar conteúdo relacionado. São directivas sobre os teus elementos, por isso escolhes article, section ou a, e o nível de título certo."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de card">
          <article mxCard class="w-320">
            <header mxCardHeader>
              <h3 mxCardTitle>Facturação de Outubro</h3>
              <p mxCardDescription>142 facturas emitidas, 9 pendentes.</p>
            </header>
            <div mxCardContent><strong class="big-number">18,4 M Kz</strong></div>
            <footer mxCardFooter>
              <button mxButton type="button" size="sm">Ver detalhe</button>
              <button mxButton type="button" size="sm" variant="ghost">Exportar</button>
            </footer>
          </article>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_CARD } from '@muxima-ui/core/card';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>Cabeçalho, conteúdo e rodapé, todos opcionais. O espaçamento interior é de 20 px.</p>
        <doc-structure [labels]="{ topLeft: 'mxCardHeader', topRight: 'Raio de 10 px', bottomLeft: 'mxCardContent', bottomRight: 'mxCardFooter', bottom: 'Borda de 1 px, sem sombra' }">
          <div class="mini-dialog"><strong>Título</strong><span>Descrição</span><div class="mini-actions"><i class="dark"></i></div></div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Um cartão estático não tem estados. Um cartão clicável (a[mxCard]) tem hover e foco.</p>
        <doc-states>
          <doc-state name="Normal"><a mxCard href="#" class="mini-card"><span mxCardContent>Clientes</span></a></doc-state>
          <doc-state name="Hover" note="Borda mais escura."><a mxCard href="#" class="mini-card" data-mx-state="hover"><span mxCardContent>Clientes</span></a></doc-state>
          <doc-state name="Foco"><a mxCard href="#" class="mini-card" data-mx-state="focus"><span mxCardContent>Clientes</span></a></doc-state>
          <doc-state name="A carregar" note="Skeleton no lugar do conteúdo."><div mxCard class="mini-card" aria-busy="true"><div mxCardContent class="stack-sm"><div mxSkeleton shape="text" class="w-60"></div><div mxSkeleton shape="text" class="w-90"></div></div></div></doc-state>
          <doc-state name="Vazio"><div mxCard class="mini-card"><p mxCardContent class="muted">Sem dados</p></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Variantes</h2>
        <p>Quatro aparências para a mesma estrutura. Usa default na maioria dos casos; accent só para o que deve sobressair.</p>
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
        <h2>Exemplos</h2>
        <p>Composições comuns em aplicações de gestão.</p>
        <div class="stack-lg">
          <doc-example title="Indicadores (KPI)" note="Número grande, variação com Badge. A cor da variação vem com seta e sinal, não só com cor.">
            <div class="grid-3 w-full">
              @for (k of kpis; track k.label) {
                <section mxCard [attr.aria-label]="k.label">
                  <div mxCardContent class="kpi">
                    <p class="kpi-label">{{ k.label }}</p>
                    <p class="kpi-value">{{ k.value }}</p>
                    <span mxBadge [variant]="k.up ? 'success' : 'danger'">{{ k.up ? '↑' : '↓' }} {{ k.delta }}</span>
                    <span class="kpi-note">face a Setembro</span>
                  </div>
                </section>
              }
            </div>
          </doc-example>

          <div class="grid-2">
            <doc-example title="Com imagem" note="mxCardMedia encosta a imagem às margens do cartão.">
              <article mxCard class="w-full">
                <img mxCardMedia src="exemplos/armazem.svg" alt="Ilustração de um armazém com camião" />
                <header mxCardHeader>
                  <div class="row-between"><h3 mxCardTitle>Armazém do Lobito</h3><span mxBadge variant="success">Aberto</span></div>
                  <p mxCardDescription>Rua do Porto, 12 · 2 400 m² · 18 docas</p>
                </header>
                <footer mxCardFooter>
                  <button mxButton type="button" size="sm">Ver stock</button>
                  <button mxButton type="button" size="sm" variant="ghost">Contactos</button>
                </footer>
              </article>
            </doc-example>

            <doc-example title="Horizontal" note="orientation=&quot;horizontal&quot;; em ecrãs estreitos volta a vertical.">
              <article mxCard orientation="horizontal" class="w-full">
                <img mxCardMedia src="exemplos/reuniao.svg" alt="Ilustração de três pessoas numa reunião" />
                <header mxCardHeader>
                  <h3 mxCardTitle>Formação em facturação electrónica</h3>
                  <p mxCardDescription>Quinta-feira, 6 de Novembro · 09:00 · Talatona</p>
                </header>
                <div mxCardContent><span mxBadge variant="warning">8 vagas</span></div>
                <footer mxCardFooter><button mxButton type="button" size="sm" variant="outline">Inscrever</button></footer>
              </article>
            </doc-example>

            <doc-example title="Perfil">
              <section mxCard class="w-full" aria-labelledby="perfil-nome">
                <div mxCardContent class="profile">
                  <mx-avatar name="Joana Mbala" src="exemplos/pessoa-2.svg" size="lg" decorative />
                  <div>
                    <h3 class="profile-name" id="perfil-nome">Joana Mbala</h3>
                    <p class="muted">Directora financeira · Kianda Logística</p>
                  </div>
                </div>
                <hr mxSeparator />
                <dl mxCardContent class="detail-list">
                  <div><dt>Email</dt><dd>joana&#64;kianda.co.ao</dd></div>
                  <div><dt>Telefone</dt><dd>+244 923 000 512</dd></div>
                  <div><dt>Desde</dt><dd>Março de 2021</dd></div>
                </dl>
                <footer mxCardFooter>
                  <button mxButton type="button" size="sm">Enviar mensagem</button>
                  <button mxButton type="button" size="sm" variant="outline">Ver facturas</button>
                </footer>
              </section>
            </doc-example>

            <doc-example title="Formulário" note="O cartão agrupa o formulário; o botão principal fica no rodapé.">
              <form mxCard class="w-full" aria-labelledby="login-titulo" (submit)="$event.preventDefault(); toast.success('Sessão iniciada')">
                <header mxCardHeader>
                  <h3 mxCardTitle id="login-titulo">Iniciar sessão</h3>
                  <p mxCardDescription>Usa o email da tua empresa.</p>
                </header>
                <div mxCardContent class="stack">
                  <mx-form-field>
                    <label mxLabel>Email</label>
                    <input mxInput type="email" autocomplete="email" placeholder="nome@empresa.co.ao" />
                  </mx-form-field>
                  <mx-form-field>
                    <label mxLabel>Palavra-passe</label>
                    <input mxInput type="password" autocomplete="current-password" />
                  </mx-form-field>
                  <label mxChoice><input type="checkbox" mxCheckbox /> Manter sessão iniciada</label>
                </div>
                <footer mxCardFooter class="card-footer-split">
                  <a mxButton variant="link" size="sm" href="#" (click)="$event.preventDefault()">Esqueci a palavra-passe</a>
                  <button mxButton type="submit">Entrar</button>
                </footer>
              </form>
            </doc-example>

            <doc-example title="Lista de actividade">
              <section mxCard class="w-full" aria-labelledby="act-titulo">
                <header mxCardHeader class="row-between">
                  <h3 mxCardTitle id="act-titulo">Actividade recente</h3>
                  <a mxButton variant="link" size="sm" href="#" (click)="$event.preventDefault()">Ver tudo</a>
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

            <doc-example title="Plano em destaque" note="variant=&quot;accent&quot; para a opção recomendada.">
              <div class="grid-2 w-full">
                <section mxCard aria-labelledby="plano-basico">
                  <header mxCardHeader>
                    <h3 mxCardTitle id="plano-basico">Básico</h3>
                    <p mxCardDescription>Para começar.</p>
                  </header>
                  <div mxCardContent><p class="price">Grátis</p></div>
                  <footer mxCardFooter><button mxButton type="button" size="sm" variant="outline" class="w-full">Escolher</button></footer>
                </section>
                <section mxCard variant="accent" aria-labelledby="plano-equipa">
                  <header mxCardHeader>
                    <div class="row-between"><h3 mxCardTitle id="plano-equipa">Equipa</h3><span mxBadge>Mais escolhido</span></div>
                    <p mxCardDescription>Até 10 pessoas.</p>
                  </header>
                  <div mxCardContent><p class="price">25 000 Kz<span class="muted"> /mês</span></p></div>
                  <footer mxCardFooter><button mxButton type="button" size="sm" class="w-full">Escolher</button></footer>
                </section>
              </div>
            </doc-example>

            <doc-example title="Estado vazio" note="Diz o que falta e dá o próximo passo.">
              <section mxCard variant="subtle" class="w-full" aria-labelledby="vazio-titulo">
                <div mxCardContent class="empty-state">
                  <span class="icon-tile"><doc-icon name="file" /></span>
                  <h3 mxCardTitle id="vazio-titulo">Ainda não há facturas</h3>
                  <p mxCardDescription>Emite a primeira factura para começares a acompanhar os pagamentos.</p>
                  <button mxButton type="button" size="sm">Emitir factura</button>
                </div>
              </section>
            </doc-example>

            <doc-example title="Cartão clicável" note="O cartão inteiro é uma ligação, sem botões dentro.">
              <a mxCard routerLink="/componentes/table" class="w-full">
                <div mxCardHeader>
                  <h3 mxCardTitle>Table</h3>
                  <p mxCardDescription>Dados tabulares com ordenação acessível.</p>
                </div>
              </a>
            </doc-example>
          </div>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[{ key: 'Tab', action: 'Só o cartão clicável ou os botões lá dentro recebem foco.' }]"
          [aria]="[
            'Escolhe o elemento pela semântica: article para conteúdo independente, section com título, a para ligação.',
            'Usa o nível de título certo para a página (h2, h3...) no mxCardTitle.',
            'Não ponhas botões dentro de um cartão que já é ligação.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Badge' }, { name: 'Skeleton' }, { name: 'Separator' }]" />
      </section>
    </article>
  `,
})
export class CardPage {
  protected readonly toast = inject(MxToast);
  protected readonly variants: { value: MxCardVariant; label: string; text: string }[] = [
    { value: 'default', label: 'Default', text: 'Borda de 1 px. A escolha habitual.' },
    { value: 'subtle', label: 'Subtle', text: 'Fundo suave, sem borda. Para agrupar sem pesar.' },
    { value: 'elevated', label: 'Elevated', text: 'Sombra. Para o que flutua sobre o fundo.' },
    { value: 'accent', label: 'Accent', text: 'Borda e linha Kwanza. Para o recomendado.' },
  ];
  protected readonly kpis = [
    { label: 'Receita do mês', value: '18,4 M Kz', delta: '12%', up: true },
    { label: 'Facturas pendentes', value: '9', delta: '3', up: false },
    { label: 'Clientes activos', value: '1 284', delta: '4%', up: true },
  ];
  protected readonly activity = [
    { who: 'Ana Kiala', text: 'emitiu a factura FT 2026/0146', when: 'Há 5 minutos' },
    { who: 'Pedro Neto', text: 'registou o pagamento de Huíla Agro', when: 'Há 1 hora' },
    { who: 'Rita Sousa', text: 'adicionou o cliente Namibe Pescas', when: 'Ontem, 17:40' },
  ];

  protected readonly previewCode = `<article mxCard>
  <header mxCardHeader>
    <h3 mxCardTitle>Facturação de Outubro</h3>
    <p mxCardDescription>142 facturas emitidas, 9 pendentes.</p>
  </header>
  <div mxCardContent>18,4 M Kz</div>
  <footer mxCardFooter>
    <button mxButton type="button" size="sm">Ver detalhe</button>
  </footer>
</article>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: '[mxCard]', type: 'article | section | div | form | a | button', description: 'Superfície. Em a/button ganha hover e foco.' },
    { kind: 'Input', name: 'variant', type: "'default' | 'subtle' | 'elevated' | 'accent'", default: 'default' },
    { kind: 'Input', name: 'orientation', type: "'vertical' | 'horizontal'", default: 'vertical', description: 'Horizontal: imagem à esquerda.' },
    { kind: 'Directiva', name: '[mxCardMedia]', type: 'img | picture | div', description: 'Imagem encostada às margens (16:9).' },
    { kind: 'Directiva', name: '[mxCardHeader]', type: 'directiva', description: 'Título e descrição.' },
    { kind: 'Directiva', name: '[mxCardTitle]', type: 'h2 | h3 | ...', description: 'Título com o nível certo para a página.' },
    { kind: 'Directiva', name: '[mxCardDescription]', type: 'directiva', description: 'Texto secundário.' },
    { kind: 'Directiva', name: '[mxCardContent]', type: 'directiva' },
    { kind: 'Directiva', name: '[mxCardFooter]', type: 'directiva', description: 'Acções no fundo do cartão.' },
    { kind: 'Token CSS', name: '--mx-radius-surface', type: 'length', default: 'radius + 4px' },
  ];
}
