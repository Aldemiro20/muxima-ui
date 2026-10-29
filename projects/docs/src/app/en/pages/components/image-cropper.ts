import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxFileUpload } from '@muxima-ui/core/file-upload';
import { MxFormField, MxLabel } from '@muxima-ui/core/form-field';
import { MxCropArea, MxImageCropper } from '@muxima-ui/core/image-cropper';
import { ApiRow, DOC_UI } from '../../../ui/doc-ui';

/** Sample photo drawn in the browser (no network requests). */
function samplePhoto(width = 960, height = 640): string {
  const c = document.createElement('canvas');
  c.width = width;
  c.height = height;
  const g = c.getContext('2d');
  if (!g) return '';
  const sky = g.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#F2B66D');
  sky.addColorStop(0.55, '#E07A4F');
  sky.addColorStop(1, '#5B2A3C');
  g.fillStyle = sky;
  g.fillRect(0, 0, width, height);
  g.fillStyle = '#FFE3A3';
  g.beginPath();
  g.arc(width * 0.68, height * 0.42, height * 0.12, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#2E1B2B';
  g.beginPath();
  g.moveTo(0, height * 0.78);
  for (let x = 0; x <= width; x += 40) g.lineTo(x, height * (0.72 + Math.sin(x / 90) * 0.04));
  g.lineTo(width, height);
  g.lineTo(0, height);
  g.fill();
  // embondeiro
  g.fillStyle = '#1B1020';
  g.fillRect(width * 0.24, height * 0.46, width * 0.05, height * 0.3);
  g.beginPath();
  g.ellipse(width * 0.265, height * 0.44, width * 0.11, height * 0.06, 0, 0, Math.PI * 2);
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
        [crumbs]="[{ label: 'Components', path: '/components' }, { label: 'Image cropper' }]"
        title="Image cropper"
        lead="Crop an image before uploading it: profile photo, logo, cover. Drag the area, resize it by the corners, zoom and rotate. All with the keyboard too, and the result comes out at the original resolution."
      />

      <section>
        <h2>Preview</h2>
        <doc-preview [code]="previewCode" label="Image cropper example">
          <div class="cropper-demo">
            <mx-image-cropper
              #profile
              class="cropper-main"
              [src]="photo"
              [aspectRatio]="1"
              round
              alt="Sunset with a baobab tree"
            />
            <div class="cropper-result">
              @if (result()) {
                <img
                  class="cropper-avatar"
                  [src]="result()"
                  alt="Cropped profile photo"
                />
              } @else {
                <div class="cropper-avatar cropper-avatar-empty" aria-hidden="true"></div>
              }
              <button mxButton size="sm" type="button" (click)="result.set(profile.toDataURL())">
                Use crop
              </button>
            </div>
          </div>
        </doc-preview>
      </section>

      <section>
        <h2>Installation</h2>
        <doc-code code="import { MxImageCropper } from '@muxima-ui/core/image-cropper';" />
      </section>

      <section>
        <h2>Structure</h2>
        <p>
          A stage with the image, the crop area (with a rule-of-thirds grid and eight handles) and,
          below it, zoom, rotate and reset.
        </p>
        <doc-structure
          [labels]="{
            topLeft: 'Crop area (focus)',
            topRight: 'Handles',
            bottomLeft: 'Zoom (range input)',
            bottomRight: 'Rotate and reset',
            bottom: 'Outside the area is dimmed',
          }"
        >
          <mx-image-cropper class="w-320" [src]="photo" height="200px" alt="Example" />
        </doc-structure>
      </section>

      <section>
        <h2>Examples</h2>
        <div class="grid-2">
          <doc-example
            title="From a file"
            note="The File from File upload goes straight into src; the temporary URL is released automatically."
          >
            <div class="stack w-full">
              <mx-form-field>
                <label mxLabel>Company logo</label>
                <mx-file-upload [(value)]="files" accept="image/*" description="PNG or JPG." />
              </mx-form-field>
              @if (files().length) {
                <mx-image-cropper
                  [src]="files()[0]"
                  [aspectRatio]="1"
                  height="240px"
                  alt="Chosen logo"
                />
              }
            </div>
          </doc-example>

          <doc-example title="Aspect ratios" [note]="'aspectRatio = ' + ratioName()">
            <div class="stack w-full">
              <div class="row-wrap" role="group" aria-label="Aspect ratio">
                @for (p of ratios; track p.name) {
                  <button
                    type="button"
                    class="mx-chip mx-chip-toggle"
                    data-size="sm"
                    [attr.aria-pressed]="ratio() === p.value"
                    (click)="ratio.set(p.value)"
                  >
                    {{ p.name }}
                  </button>
                }
              </div>
              <mx-image-cropper
                [src]="photo"
                [aspectRatio]="ratio()"
                height="240px"
                alt="Sunset"
              />
            </div>
          </doc-example>

          <doc-example
            title="Area in pixels"
            note="areaChange gives the area in the original image, to crop on the server."
          >
            <div class="stack w-full">
              <mx-image-cropper
                [src]="photo"
                [aspectRatio]="16 / 9"
                height="220px"
                alt="Sunset"
                (areaChange)="area.set($event)"
              />
              @if (area(); as a) {
                <p class="muted small mono">
                  x {{ a.x }}, y {{ a.y }}, {{ a.width }} × {{ a.height }} px, rotation
                  {{ a.rotation }}°
                </p>
              }
            </div>
          </doc-example>

          <doc-example
            title="Custom controls"
            note="controls=false and [(zoom)] / [(rotation)] bound to your own buttons."
          >
            <div class="stack w-full">
              <mx-image-cropper
                #free
                [src]="photo"
                [controls]="false"
                [(zoom)]="zoom"
                [(rotation)]="rotation"
                height="220px"
                alt="Sunset"
              />
              <div class="row-wrap">
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  [disabled]="zoom() <= 1"
                  (click)="free.setZoom(zoom() - 0.25)"
                >
                  Zoom out
                </button>
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  [disabled]="zoom() >= 4"
                  (click)="free.setZoom(zoom() + 0.25)"
                >
                  Zoom in
                </button>
                <button
                  mxButton
                  size="sm"
                  variant="outline"
                  type="button"
                  (click)="free.rotate(90)"
                >
                  Rotate 90°
                </button>
                <span class="muted small">{{ round(zoom() * 100) }}% · {{ rotation() }}°</span>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Save as JPEG"
            [note]="
              size() || 'toBlob(type, quality) returns the file; with round it is always PNG.'
            "
          >
            <div class="stack w-full">
              <mx-image-cropper
                #cover
                [src]="photo"
                [aspectRatio]="3"
                height="200px"
                alt="Sunset"
              />
              <div>
                <button mxButton size="sm" type="button" (click)="save(cover)">
                  Generate JPEG cover
                </button>
              </div>
            </div>
          </doc-example>

          <doc-example
            title="4:5 portrait with a minimum"
            note="minSize prevents an area that's too small (here 120 px on screen)."
          >
            <mx-image-cropper
              class="w-full"
              [src]="photo"
              [aspectRatio]="4 / 5"
              [minSize]="120"
              height="260px"
              alt="Sunset"
            />
          </doc-example>

          <doc-example
            title="Live preview"
            note="On each areaChange, toDataURL (once per frame) shows the avatar in three sizes."
          >
            <div class="stack w-full">
              <mx-image-cropper
                #live
                [src]="photo"
                [aspectRatio]="1"
                round
                height="220px"
                alt="Sunset"
                (areaChange)="preview(live)"
              />
              <div class="cropper-sizes" role="group" aria-label="Avatar preview">
                @for (t of [72, 48, 32]; track t) {
                  @if (avatar()) {
                    <img
                      class="cropper-size"
                      [src]="avatar()"
                      [style.width.px]="t"
                      [style.height.px]="t"
                      [alt]="'Avatar at ' + t + ' pixels'"
                    />
                  }
                }
              </div>
            </div>
          </doc-example>

          <doc-example
            title="Fixed final size"
            [note]="
              banner() ||
              'toCanvas() and then resize: the cover always comes out at 1200 × 300 pixels.'
            "
          >
            <div class="stack w-full">
              <mx-image-cropper
                #band
                [src]="photo"
                [aspectRatio]="4"
                height="200px"
                alt="Sunset"
              />
              <div>
                <button mxButton size="sm" type="button" (click)="makeBanner(band)">
                  Generate 1200 × 300 banner
                </button>
              </div>
              @if (bannerUrl()) {
                <img class="cropper-banner" [src]="bannerUrl()" alt="Generated banner" />
              }
            </div>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Accessibility</h2>
        <doc-a11y
          [keys]="[
            { key: 'Tab', action: 'Crop area, zoom, rotate and reset.' },
            { key: '← → ↑ ↓', action: 'Move the area 1 px (10 px with Shift).' },
            { key: 'Alt + arrows', action: 'Resize the area.' },
            { key: 'Arrows on zoom', action: 'Native range input.' },
          ]"
          [aria]="[
            'The area is a group with aria-roledescription=crop area and the size in its name: 480 by 480 pixels.',
            'The keyboard instructions are in aria-describedby.',
            'After a move, the size and position are announced (aria-live), without repeating on every pixel.',
            'The rotate buttons have names: Rotate left, Rotate right.',
            'The image has alt text; the final crop should have its own alt wherever it is used.',
          ]"
        />
      </section>

      <section>
        <h2>API reference</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Related components</h2>
        <doc-related [items]="[{ name: 'File upload' }, { name: 'Avatar' }, { name: 'Dialog' }]" />
      </section>
    </article>
  `,
})
export class ImageCropperPage {
  protected readonly photo = samplePhoto();
  protected readonly result = signal('');
  protected readonly files = signal<File[]>([]);
  protected readonly ratios = [
    { name: '1:1', value: 1 },
    { name: '16:9', value: 16 / 9 },
    { name: '4:3', value: 4 / 3 },
    { name: 'Free', value: null },
  ];
  protected readonly ratio = signal<number | null>(1);
  protected ratioName(): string {
    return this.ratios.find((p) => p.value === this.ratio())?.name ?? '';
  }
  protected readonly area = signal<MxCropArea | null>(null);
  protected readonly zoom = signal(1);
  protected readonly rotation = signal(0);
  protected round(n: number): number {
    return Math.round(n);
  }
  protected readonly size = signal('');
  protected async save(c: MxImageCropper): Promise<void> {
    const blob = await c.toBlob('image/jpeg', 0.82);
    if (blob) this.size.set(`Cover generated: ${Math.round(blob.size / 1000)} kB JPEG.`);
  }

  protected readonly avatar = signal('');
  private frame = 0;
  protected preview(c: MxImageCropper): void {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.avatar.set(c.toDataURL()));
  }

  protected readonly banner = signal('');
  protected readonly bannerUrl = signal('');
  protected makeBanner(c: MxImageCropper): void {
    const source = c.toCanvas();
    const target = document.createElement('canvas');
    target.width = 1200;
    target.height = 300;
    target.getContext('2d')?.drawImage(source, 0, 0, 1200, 300);
    this.bannerUrl.set(target.toDataURL('image/jpeg', 0.85));
    this.banner.set(
      `${source.width} × ${source.height} px crop resized to 1200 × 300 px.`,
    );
  }

  protected readonly previewCode = `<mx-image-cropper #profile [src]="file" [aspectRatio]="1" round alt="Photo" />
<button mxButton (click)="profile.toBlob().then(upload)">Use crop</button>`;

  protected readonly api: ApiRow[] = [
    {
      kind: 'Input',
      name: 'src',
      type: 'string | File | Blob | null',
      description: 'URL or file.',
    },
    { kind: 'Input', name: 'alt', type: 'string', default: 'Image to crop' },
    {
      kind: 'Input',
      name: 'aspectRatio',
      type: 'number | null',
      default: 'null',
      description: 'Width / height; null = free.',
    },
    {
      kind: 'Input',
      name: 'round',
      type: 'boolean',
      default: 'false',
      description: 'Round mask; exports PNG with transparent corners.',
    },
    {
      kind: 'Input',
      name: 'controls',
      type: 'boolean',
      default: 'true',
      description: 'Zoom, rotate and reset.',
    },
    { kind: 'Input', name: 'height', type: 'string', default: '320px' },
    {
      kind: 'Input',
      name: 'minSize',
      type: 'number',
      default: '40',
      description: 'Minimum area size on screen, in px.',
    },
    { kind: 'Input', name: 'zoom, rotation', type: 'number (model)', default: '1, 0' },
    {
      kind: 'Output',
      name: 'areaChange',
      type: 'MxCropArea',
      description: '{ x, y, width, height, rotation } in the original image.',
    },
    { kind: 'Método', name: 'toBlob(type?, quality?)', type: 'Promise<Blob | null>' },
    {
      kind: 'Método',
      name: 'toDataURL(type?, quality?), toCanvas()',
      type: 'string, HTMLCanvasElement',
    },
    { kind: 'Método', name: 'setZoom(z), rotate(degrees), reset()', type: 'void' },
    {
      kind: 'Função',
      name: 'mxResizeRect, mxClampRect, mxCenteredRect',
      type: 'crop math',
    },
  ];
}
