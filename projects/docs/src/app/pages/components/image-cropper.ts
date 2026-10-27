import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxFileUpload } from '@muxima-ui/core/file-upload';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { MxCropArea, MxImageCropper } from '@muxima-ui/core/image-cropper';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';

/** Fotografia de exemplo desenhada no navegador (sem pedidos à rede). */
function fotografia(largura = 960, altura = 640): string {
  const c = document.createElement('canvas');
  c.width = largura;
  c.height = altura;
  const g = c.getContext('2d');
  if (!g) return '';
  const ceu = g.createLinearGradient(0, 0, 0, altura);
  ceu.addColorStop(0, '#F2B66D');
  ceu.addColorStop(0.55, '#E07A4F');
  ceu.addColorStop(1, '#5B2A3C');
  g.fillStyle = ceu;
  g.fillRect(0, 0, largura, altura);
  g.fillStyle = '#FFE3A3';
  g.beginPath();
  g.arc(largura * 0.68, altura * 0.42, altura * 0.12, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#2E1B2B';
  g.beginPath();
  g.moveTo(0, altura * 0.78);
  for (let x = 0; x <= largura; x += 40) g.lineTo(x, altura * (0.72 + Math.sin(x / 90) * 0.04));
  g.lineTo(largura, altura);
  g.lineTo(0, altura);
  g.fill();
  // embondeiro
  g.fillStyle = '#1B1020';
  g.fillRect(largura * 0.24, altura * 0.46, largura * 0.05, altura * 0.3);
  g.beginPath();
  g.ellipse(largura * 0.265, altura * 0.44, largura * 0.11, altura * 0.06, 0, 0, Math.PI * 2);
  g.fill();
  return c.toDataURL('image/png');
}

@Component({
  selector: 'doc-image-cropper-page',
  imports: [DOC_UI, MxImageCropper, MxButton, MxFileUpload, MxFormField, MxLabel],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Image cropper' }]"
        title="Image cropper"
        lead="Recortar uma imagem antes de a enviar: fotografia de perfil, logótipo, capa. Arrasta-se a área, redimensiona-se pelos cantos, faz-se zoom e roda-se. Tudo também com teclado, e o resultado sai na resolução original."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de image cropper">
          <div class="cropper-demo">
            <mx-image-cropper
              #perfil
              class="cropper-main"
              [src]="foto"
              [aspectRatio]="1"
              round
              alt="Pôr do sol com um embondeiro"
            />
            <div class="cropper-result">
              @if (resultado()) {
                <img
                  class="cropper-avatar"
                  [src]="resultado()"
                  alt="Fotografia de perfil recortada"
                />
              } @else {
                <div class="cropper-avatar cropper-avatar-empty" aria-hidden="true"></div>
              }
              <button mxButton size="sm" type="button" (click)="resultado.set(perfil.toDataURL())">
                Usar recorte
              </button>
            </div>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MxImageCropper } from '@muxima-ui/core/image-cropper';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>
          Um palco com a imagem, a área de recorte (com grelha de terços e oito puxadores) e, por
          baixo, zoom, rodar e repor.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Área de recorte (foco)',
            topRight: 'Puxadores',
            bottomLeft: 'Zoom (input range)',
            bottomRight: 'Rodar e repor',
            bottom: 'Fora da área fica escurecido',
          }"
        >
          <mx-image-cropper class="w-320" [src]="foto" height="200px" alt="Exemplo" />
        </doc-structure>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example
            title="A partir de um ficheiro"
            note="O File do File upload vai directo para src; o URL temporário é libertado sozinho."
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Logótipo da empresa</label>
                <mx-file-upload [(value)]="ficheiros" accept="image/*" description="PNG ou JPG." />
              </mx-form-field>
              @if (ficheiros().length) {
                <mx-image-cropper
                  [src]="ficheiros()[0]"
                  [aspectRatio]="1"
                  height="240px"
                  alt="Logótipo escolhido"
                />
              }
            </div>
          </doc-example>

          <doc-example title="Proporções" [note]="'aspectRatio = ' + proporcaoNome()">
            <div class="stack w-full">
              <div class="row-wrap" role="group" aria-label="Proporção">
                @for (p of proporcoes; track p.nome) {
                  <button
                    type="button"
                    class="mx-chip mx-chip-toggle"
                    data-size="sm"
                    [attr.aria-pressed]="proporcao() === p.valor"
                    (click)="proporcao.set(p.valor)"
                  >
                    {{ p.nome }}
                  </button>
                }
              </div>
              <mx-image-cropper
                [src]="foto"
                [aspectRatio]="proporcao()"
                height="240px"
                alt="Pôr do sol"
              />
            </div>
          </doc-example>

          <doc-example
            title="Área em píxeis"
            note="areaChange dá a área na imagem original, para recortar no servidor."
          >
            <div class="stack w-full">
              <mx-image-cropper
                [src]="foto"
                [aspectRatio]="16 / 9"
                height="220px"
                alt="Pôr do sol"
                (areaChange)="area.set($event)"
              />
              @if (area(); as a) {
                <p class="muted small mono">
                  x {{ a.x }}, y {{ a.y }}, {{ a.width }} × {{ a.height }} px, rotação
                  {{ a.rotation }}°
                </p>
              }
            </div>
          </doc-example>

          <doc-example
            title="Controlos próprios"
            note="controls=false e [(zoom)] / [(rotation)] ligados aos teus botões."
          >
            <div class="stack w-full">
              <mx-image-cropper
                #livre
                [src]="foto"
                [controls]="false"
                [(zoom)]="zoom"
                [(rotation)]="rotacao"
                height="220px"
                alt="Pôr do sol"
              />
              <div class="row-wrap">
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  [disabled]="zoom() <= 1"
                  (click)="livre.setZoom(zoom() - 0.25)"
                >
                  Afastar
                </button>
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  [disabled]="zoom() >= 4"
                  (click)="livre.setZoom(zoom() + 0.25)"
                >
                  Aproximar
                </button>
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  (click)="livre.rotate(90)"
                >
                  Rodar 90°
                </button>
                <span class="muted small">{{ round(zoom() * 100) }}% · {{ rotacao() }}°</span>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Guardar em JPEG"
            [note]="
              tamanho() || 'toBlob(tipo, qualidade) devolve o ficheiro; com round é sempre PNG.'
            "
          >
            <div class="stack w-full">
              <mx-image-cropper
                #capa
                [src]="foto"
                [aspectRatio]="3"
                height="200px"
                alt="Pôr do sol"
              />
              <div>
                <button mxButton size="sm" type="button" (click)="guardar(capa)">
                  Gerar capa em JPEG
                </button>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Retrato 4:5 com mínimo"
            note="minSize impede uma área demasiado pequena (aqui 120 px no ecrã)."
          >
            <mx-image-cropper
              class="w-full"
              [src]="foto"
              [aspectRatio]="4 / 5"
              [minSize]="120"
              height="260px"
              alt="Pôr do sol"
            />
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Área de recorte, zoom, rodar e repor.' },
            { key: '← → ↑ ↓', action: 'Movem a área 1 px (com Shift, 10 px).' },
            { key: 'Alt + setas', action: 'Mudam o tamanho da área.' },
            { key: 'Setas no zoom', action: 'Input range nativo.' },
          ]"
          [aria]="[
            'A área é um grupo com aria-roledescription=área de recorte e o tamanho no nome: 480 por 480 píxeis.',
            'A instrução de teclado está em aria-describedby.',
            'Depois de mover, é anunciado o tamanho e a posição (aria-live), sem repetir a cada píxel.',
            'Os botões de rodar têm nome: Rodar para a esquerda, Rodar para a direita.',
            'A imagem tem alt; o recorte final deve ter o seu próprio alt onde for usado.',
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'File upload' }, { name: 'Avatar' }, { name: 'Dialog' }]" />
      </section>
    </article>
  `,
})
export class ImageCropperPage {
  protected readonly foto = fotografia();
  protected readonly resultado = signal('');
  protected readonly ficheiros = signal<File[]>([]);
  protected readonly proporcoes = [
    { nome: '1:1', valor: 1 },
    { nome: '16:9', valor: 16 / 9 },
    { nome: '4:3', valor: 4 / 3 },
    { nome: 'Livre', valor: null },
  ];
  protected readonly proporcao = signal<number | null>(1);
  protected proporcaoNome(): string {
    return this.proporcoes.find((p) => p.valor === this.proporcao())?.nome ?? '';
  }
  protected readonly area = signal<MxCropArea | null>(null);
  protected readonly zoom = signal(1);
  protected readonly rotacao = signal(0);
  protected round(n: number): number {
    return Math.round(n);
  }
  protected readonly tamanho = signal('');
  protected async guardar(c: MxImageCropper): Promise<void> {
    const blob = await c.toBlob('image/jpeg', 0.82);
    if (blob) this.tamanho.set(`Capa gerada: JPEG de ${Math.round(blob.size / 1000)} kB.`);
  }

  protected readonly previewCode = `<mx-image-cropper #perfil [src]="ficheiro" [aspectRatio]="1" round alt="Fotografia" />
<button mxButton (click)="perfil.toBlob().then(enviar)">Usar recorte</button>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'src',
      type: 'string | File | Blob | null',
      description: 'URL ou ficheiro.',
    },
    { kind: 'Input', name: 'alt', type: 'string', default: 'Imagem a recortar' },
    {
      kind: 'Input',
      name: 'aspectRatio',
      type: 'number | null',
      default: 'null',
      description: 'Largura / altura; null = livre.',
    },
    {
      kind: 'Input',
      name: 'round',
      type: 'boolean',
      default: 'false',
      description: 'Máscara redonda; exporta PNG com cantos transparentes.',
    },
    {
      kind: 'Input',
      name: 'controls',
      type: 'boolean',
      default: 'true',
      description: 'Zoom, rodar e repor.',
    },
    { kind: 'Input', name: 'height', type: 'string', default: '320px' },
    {
      kind: 'Input',
      name: 'minSize',
      type: 'number',
      default: '40',
      description: 'Tamanho mínimo da área no ecrã, em px.',
    },
    { kind: 'Input', name: 'zoom, rotation', type: 'number (model)', default: '1, 0' },
    {
      kind: 'Output',
      name: 'areaChange',
      type: 'MxCropArea',
      description: '{ x, y, width, height, rotation } na imagem original.',
    },
    { kind: 'Método', name: 'toBlob(tipo?, qualidade?)', type: 'Promise<Blob | null>' },
    {
      kind: 'Método',
      name: 'toDataURL(tipo?, qualidade?), toCanvas()',
      type: 'string, HTMLCanvasElement',
    },
    { kind: 'Método', name: 'setZoom(z), rotate(graus), reset()', type: 'void' },
    {
      kind: 'Função',
      name: 'mxResizeRect, mxClampRect, mxCenteredRect',
      type: 'contas do recorte',
    },
  ];
}
