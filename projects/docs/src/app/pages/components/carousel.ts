import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_CARD } from '@muxima-ui/core/card';
import { MxCarousel, MxCarouselSlide } from '@muxima-ui/core/carousel';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

/** Imagem de exemplo em SVG (sem pedidos à rede). */
function imagem(cor: string, texto: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240"><rect width="400" height="240" fill="${cor}"/><circle cx="320" cy="60" r="90" fill="#ffffff" fill-opacity=".12"/><text x="28" y="212" font-family="sans-serif" font-size="26" fill="#ffffff">${texto}</text></svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

@Component({
  selector: 'doc-carousel-page',
  imports: [DOC_UI, MxCarousel, MxCarouselSlide, MX_CARD, MxButton, MxBadge],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/pt/componentes' }, { label: 'Carousel' }]"
        title="Carousel"
        lead="Conteúdo que passa em diapositivos: destaques, galerias, produtos. Segue o padrão WAI-ARIA Carousel, desliza com o dedo e só roda sozinho com botão de pausa."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de carousel">
          <mx-carousel aria-label="Novidades" class="w-full">
            @for (d of destaques; track d.titulo) {
              <mx-carousel-slide>
                <div class="slide-banner" [style.background]="d.cor">
                  <span class="slide-kicker">{{ d.kicker }}</span>
                  <p class="slide-title">{{ d.titulo }}</p>
                  <a mxButton size="sm" variant="secondary" href="#"
                    >Saber mais<span class="mx-visually-hidden"> sobre {{ d.titulo }}</span></a
                  >
                </div>
              </mx-carousel-slide>
            }
          </mx-carousel>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxCarousel, MxCarouselSlide } from '@muxima-ui/core/carousel';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>
          Uma faixa com scroll horizontal e snap, os botões anterior e seguinte e os indicadores por
          baixo.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Região: carrossel',
            topRight: 'Diapositivo: 1 de 3',
            bottomLeft: 'Anterior',
            bottomRight: 'Indicadores e seguinte',
            bottom: 'Os que não se vêem ficam inert',
          }"
        >
          <mx-carousel aria-label="Exemplo" class="w-320">
            @for (d of destaques; track d.titulo) {
              <mx-carousel-slide
                ><div class="slide-banner slide-banner-sm" [style.background]="d.cor">
                  <p class="slide-title">{{ d.kicker }}</p>
                </div></mx-carousel-slide
              >
            }
          </mx-carousel>
        </doc-structure>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example
            title="Vários por vista"
            note='perView="2"; os botões avançam um de cada vez.'
          >
            <mx-carousel aria-label="Produtos em destaque" [perView]="2" [gap]="12" class="w-full">
              @for (p of produtos; track p.nome) {
                <mx-carousel-slide>
                  <article mxCard class="slide-card">
                    <div mxCardContent>
                      <span mxBadge variant="secondary" size="sm">{{ p.categoria }}</span>
                      <h3 class="slide-card-title">{{ p.nome }}</h3>
                      <p class="muted small">{{ p.preco }}</p>
                    </div>
                  </article>
                </mx-carousel-slide>
              }
            </mx-carousel>
          </doc-example>
          <doc-example
            title="Rotação automática"
            note="autoplay em ms e loop; pára com o rato ou o foco, e não arranca com reduzir movimento."
          >
            <mx-carousel aria-label="Dicas" [autoplay]="5000" loop class="w-full">
              @for (d of dicas; track d) {
                <mx-carousel-slide>
                  <div class="slide-tip">
                    <p>{{ d }}</p>
                  </div>
                </mx-carousel-slide>
              }
            </mx-carousel>
          </doc-example>
          <doc-example
            title="Galeria de imagens"
            note="Cada imagem tem alt; o nome do diapositivo pode ser próprio (label)."
          >
            <mx-carousel aria-label="Fotografias do imóvel" class="w-full">
              @for (f of fotos; track f.alt) {
                <mx-carousel-slide [label]="f.alt">
                  <img class="slide-img" [src]="f.src" [alt]="f.alt" />
                </mx-carousel-slide>
              }
            </mx-carousel>
          </doc-example>
          <doc-example
            title="Passos de boas-vindas"
            [note]="
              '[(index)] liga o carrossel a botões próprios. Passo ' +
              (passo() + 1) +
              ' de ' +
              boasVindas.length +
              '.'
            "
          >
            <div class="stack w-full">
              <mx-carousel
                aria-label="Boas-vindas"
                [(index)]="passo"
                [indicators]="false"
                [controls]="false"
                class="w-full"
              >
                @for (b of boasVindas; track b.titulo) {
                  <mx-carousel-slide>
                    <div class="slide-tip">
                      <p class="slide-card-title">{{ b.titulo }}</p>
                      <p class="muted small">{{ b.texto }}</p>
                    </div>
                  </mx-carousel-slide>
                }
              </mx-carousel>
              <div class="row-wrap">
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  [disabled]="passo() === 0"
                  (click)="passo.set(passo() - 1)"
                >
                  Voltar
                </button>
                @if (passo() < boasVindas.length - 1) {
                  <button mxButton size="sm" type="button" (click)="passo.set(passo() + 1)">
                    Continuar
                  </button>
                } @else {
                  <button mxButton size="sm" type="button" (click)="passo.set(0)">Começar</button>
                }
              </div>
            </div>
          </doc-example>
          <doc-example
            title="Sem indicadores, em ciclo"
            note="indicators=false e loop: depois do último volta ao primeiro."
          >
            <mx-carousel
              aria-label="Parceiros"
              [indicators]="false"
              loop
              [perView]="3"
              [gap]="8"
              class="w-full"
            >
              @for (p of parceiros; track p) {
                <mx-carousel-slide
                  ><div class="slide-logo">{{ p }}</div></mx-carousel-slide
                >
              }
            </mx-carousel>
          </doc-example>
          <doc-example
            title="Textos dos botões"
            note="prevLabel e nextLabel mudam o nome dos botões, por exemplo para outra língua."
          >
            <mx-carousel
              aria-label="Highlights"
              prevLabel="Previous slide"
              nextLabel="Next slide"
              class="w-full"
            >
              @for (d of destaques; track d.titulo) {
                <mx-carousel-slide
                  ><div class="slide-banner slide-banner-sm" [style.background]="d.cor">
                    <p class="slide-title">{{ d.kicker }}</p>
                  </div></mx-carousel-slide
                >
              }
            </mx-carousel>
          </doc-example>
        </div>
        <doc-callout
          >Usa um carrossel para conteúdo que pode ficar escondido. Se tudo é importante, uma grelha
          ou uma lista é mais rápida de ler.</doc-callout
        >
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            {
              key: 'Tab',
              action:
                'Botão de pausa (se houver), conteúdo visível, anterior, indicadores e seguinte.',
            },
            { key: 'Enter Espaço', action: 'Mudam de diapositivo ou param a rotação.' },
            { key: 'Deslizar', action: 'No ecrã táctil, com snap a cada diapositivo.' },
          ]"
          [aria]="[
            'O carrossel é uma região com aria-roledescription=carrossel e o nome que lhe deres.',
            'Cada diapositivo é um grupo com aria-roledescription=diapositivo e o nome 2 de 5.',
            'Os diapositivos fora de vista ficam inert: o Tab não entra neles.',
            'Sem rotação, a mudança é anunciada (aria-live=polite); a rodar, fica em silêncio.',
            'A rotação pára com o rato ou o foco dentro, e o botão de pausa vem primeiro.',
            'Com reduzir movimento activo, não roda sozinho e não anima o scroll.',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Card' }, { name: 'Tabs' }, { name: 'Stepper' }]" />
      </section>
    </article>
  `,
})
export class CarouselPage {
  protected readonly destaques = [
    {
      kicker: 'Novo',
      titulo: 'Facturação electrónica em todas as províncias',
      cor: 'linear-gradient(135deg, #0F5257, #1F8A8A)',
    },
    {
      kicker: 'Webinar',
      titulo: 'Fecho de ano fiscal sem surpresas',
      cor: 'linear-gradient(135deg, #4A2C6F, #7A4E9F)',
    },
    {
      kicker: 'Dica',
      titulo: 'Lembretes automáticos reduzem atrasos',
      cor: 'linear-gradient(135deg, #8A3B12, #C2621E)',
    },
  ];
  protected readonly produtos = [
    { nome: 'Cadeira ergonómica', categoria: 'Escritório', preco: '85 000 Kz' },
    { nome: 'Secretária 140 cm', categoria: 'Escritório', preco: '210 000 Kz' },
    { nome: 'Candeeiro LED', categoria: 'Iluminação', preco: '18 500 Kz' },
    { nome: 'Estante modular', categoria: 'Arrumação', preco: '145 000 Kz' },
    { nome: 'Quadro branco', categoria: 'Reuniões', preco: '32 000 Kz' },
  ];
  protected readonly dicas = [
    'Usa Ctrl + K para pesquisar em qualquer página.',
    'Marca as facturas pagas a partir da lista, sem abrir cada uma.',
    'Exporta para CSV e abre no Excel com um clique.',
  ];
  protected readonly fotos = [
    { alt: 'Sala com janelas grandes', src: imagem('#2F4858', 'Sala') },
    { alt: 'Cozinha equipada', src: imagem('#33658A', 'Cozinha') },
    { alt: 'Quarto principal com varanda', src: imagem('#86BBD8', 'Quarto') },
    { alt: 'Vista do prédio a partir da rua', src: imagem('#758E4F', 'Fachada') },
  ];
  protected readonly boasVindas = [
    { titulo: 'Bem-vindo à Kianda', texto: 'Em três passos tens a tua empresa pronta a facturar.' },
    { titulo: 'Junta os teus clientes', texto: 'Importa um CSV ou cria-os à medida que facturas.' },
    {
      titulo: 'Emite a primeira factura',
      texto: 'Escolhe o cliente, o valor e a data de vencimento.',
    },
  ];
  protected readonly passo = signal(0);
  protected readonly parceiros = [
    'Kianda',
    'Mutamba',
    'Huíla Agro',
    'Cuanza',
    'Atlântico',
    'Lobito',
  ];

  protected readonly previewCode = `<mx-carousel aria-label="Novidades">
  @for (d of destaques; track d.titulo) {
    <mx-carousel-slide>
      <div class="banner">
        <p>{{ d.titulo }}</p>
        <a mxButton href="/novidades">Saber mais<span class="mx-visually-hidden"> sobre {{ d.titulo }}</span></a>
      </div>
    </mx-carousel-slide>
  }
</mx-carousel>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'index',
      type: 'number (model)',
      default: '0',
      description: 'Primeiro diapositivo visível.',
    },
    { kind: 'Input', name: 'perView', type: 'number', default: '1' },
    { kind: 'Input', name: 'gap', type: 'number (px)', default: '16' },
    {
      kind: 'Input',
      name: 'autoplay',
      type: 'number (ms)',
      default: '0',
      description: '0 = sem rotação automática.',
    },
    { kind: 'Input', name: 'loop', type: 'boolean', default: 'false' },
    { kind: 'Input', name: 'indicators', type: 'boolean', default: 'true' },
    {
      kind: 'Input',
      name: 'controls',
      type: 'boolean',
      default: 'true',
      description: 'Botões anterior e seguinte.',
    },
    {
      kind: 'Input',
      name: 'prevLabel, nextLabel',
      type: 'string',
      default: 'Diapositivo anterior, Diapositivo seguinte',
    },
    { kind: 'Método', name: 'go(i), next(), prev(), togglePlay()', type: 'void' },
    {
      kind: 'Componente',
      name: 'mx-carousel-slide',
      type: 'label',
      description: 'Nome próprio; por omissão 2 de 5.',
    },
  ];
}
