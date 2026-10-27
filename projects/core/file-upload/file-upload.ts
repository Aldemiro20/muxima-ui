import {
  ChangeDetectionStrategy,
  Injector,
  afterNextRender,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  numberAttribute,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { MX_FORM_FIELD_CONTROL, MxFormField, MxFormFieldControl, mxUniqueId } from '@muxima-ui/core/form-field';

export interface MxFileRejection {
  file: File;
  reason: 'type' | 'size' | 'count';
  message: string;
}

/** "1,2 MB", "340 kB". */
export function mxFormatBytes(bytes: number, locale = 'pt-AO'): string {
  const units = ['B', 'kB', 'MB', 'GB'];
  let v = bytes;
  let u = 0;
  while (v >= 1000 && u < units.length - 1) {
    v /= 1000;
    u++;
  }
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: u ? 1 : 0 }).format(v)} ${units[u]}`;
}

/** true se o ficheiro corresponde a `accept` (".pdf,image/*"). */
export function mxFileMatches(file: File, accept: string): boolean {
  if (!accept.trim()) return true;
  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();
  return accept
    .split(',')
    .map((a) => a.trim().toLowerCase())
    .filter(Boolean)
    .some((a) => (a.startsWith('.') ? name.endsWith(a) : a.endsWith('/*') ? type.startsWith(a.slice(0, -1)) : type === a));
}

/**
 * Envio de ficheiros: arrastar para a área ou carregar no botão (que abre o seletor nativo).
 * Valida tipo, tamanho e número, mostra a lista com tamanho, progresso e botão de remover.
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Comprovativos</label>
 *   <mx-file-upload formControlName="ficheiros" accept=".pdf,image/*" [maxSize]="5_000_000" multiple />
 *   <mx-hint>PDF ou imagem, até 5 MB cada.</mx-hint>
 * </mx-form-field>
 * ```
 *
 * O valor é `File[]`. O envio para o servidor fica do teu lado: passa a percentagem de cada
 * ficheiro em `[progress]` (pelo nome) e os erros em `[errors]`.
 */
@Component({
  selector: 'mx-file-upload',
  exportAs: 'mxFileUpload',
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxFileUpload }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-file-upload',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-invalid]': 'errorState() ? "" : null',
    '[attr.aria-label]': 'null',
  },
  template: `
    <div
      class="mx-file-upload-zone"
      [attr.data-dragging]="dragging() ? '' : null"
      (dragenter)="onDragEnter($event)"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)"
    >
      <svg class="mx-file-upload-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 15V4M7.5 8.5L12 4l4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
      </svg>
      <p class="mx-file-upload-text">
        <span aria-hidden="true">{{ dropText() }}</span>
        <button
          type="button"
          class="mx-file-upload-button"
          [id]="controlId()"
          [disabled]="isDisabled()"
          [attr.aria-describedby]="describedBy()"
          [attr.aria-labelledby]="field?.labelId() ? field!.labelId() + ' ' + controlId() : null"
          (click)="browse()"
        >
          {{ buttonText() }}
        </button>
      </p>
      @if (description()) {
        <p class="mx-file-upload-desc" [id]="descId">{{ description() }}</p>
      }
      <input
        #input
        type="file"
        class="mx-visually-hidden"
        tabindex="-1"
        aria-hidden="true"
        [accept]="accept()"
        [multiple]="multiple()"
        [disabled]="isDisabled()"
        (change)="onPick($event)"
      />
    </div>

    @if (rejections().length) {
      <ul class="mx-file-upload-rejections">
        @for (r of rejections(); track $index) {
          <li>{{ r.message }}</li>
        }
      </ul>
    }

    @if (files().length) {
      <ul class="mx-file-upload-list" [attr.aria-label]="listLabel()">
        @for (f of files(); track f; let i = $index) {
          <li class="mx-file-upload-item" [attr.data-error]="errors()[f.name] ? '' : null">
            <svg class="mx-file-upload-file-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 1.75h5l3 3v9.5H4z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
              <path d="M9 1.75v3h3" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round" />
            </svg>
            <div class="mx-file-upload-info">
              <span class="mx-file-upload-name">{{ f.name }}</span>
              <span class="mx-file-upload-meta">
                {{ size(f.size) }}
                @if (errors()[f.name]; as e) {
                  · <span class="mx-file-upload-error">{{ e }}</span>
                } @else if (progress()[f.name] !== undefined) {
                  · {{ progress()[f.name] >= 100 ? doneText() : progress()[f.name] + '%' }}
                }
              </span>
              @if (progress()[f.name] !== undefined && progress()[f.name] < 100 && !errors()[f.name]) {
                <progress class="mx-file-upload-progress" max="100" [value]="progress()[f.name]" [attr.aria-label]="'A enviar ' + f.name"></progress>
              }
            </div>
            <button type="button" class="mx-file-upload-remove" [disabled]="isDisabled()" [attr.aria-label]="removeText() + ' ' + f.name" (click)="remove(i)">
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
            </button>
          </li>
        }
      </ul>
    }
  `,
})
export class MxFileUpload implements ControlValueAccessor, MxFormFieldControl {
  readonly value = model<File[]>([]);
  /** Tipos aceites, como no input nativo: ".pdf,image/*". */
  readonly accept = input('');
  readonly multiple = input(false, { transform: booleanAttribute });
  /** Tamanho máximo de cada ficheiro, em bytes. */
  readonly maxSize = input(Infinity, { transform: numberAttribute });
  readonly maxFiles = input(Infinity, { transform: numberAttribute });
  /** Percentagem de envio por nome de ficheiro. */
  readonly progress = input<Record<string, number>>({});
  /** Erro de envio por nome de ficheiro. */
  readonly errors = input<Record<string, string>>({});
  readonly dropText = input('Arrasta os ficheiros para aqui ou');
  readonly buttonText = input('escolhe no computador');
  /** Linha de ajuda dentro da área (ex.: "PDF até 5 MB"). */
  readonly description = input('');
  readonly listLabel = input('Ficheiros escolhidos');
  readonly removeText = input('Remover');
  readonly doneText = input('Enviado');
  readonly locale = input('pt-AO');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly id = input<string | undefined>(undefined);
  readonly rejected = output<MxFileRejection[]>();

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly announcer = inject(LiveAnnouncer);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  private readonly injector = inject(Injector);

  private readonly generatedId = mxUniqueId('mx-file-upload');
  readonly controlId = computed(() => this.id() ?? this.generatedId);
  protected readonly descId = mxUniqueId('mx-file-upload-desc');
  protected readonly files = computed(() => this.value() ?? []);
  protected readonly dragging = signal(false);
  protected readonly rejections = signal<MxFileRejection[]>([]);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly describedBy = computed(
    () => [this.description() ? this.descId : null, this.field?.describedBy()].filter(Boolean).join(' ') || null,
  );
  private dragDepth = 0;

  private onChange: (value: File[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  protected size(bytes: number): string {
    return mxFormatBytes(bytes, this.locale());
  }

  /** Abre o seletor de ficheiros do sistema. */
  browse(): void {
    if (!this.isDisabled()) this.input().nativeElement.click();
  }

  /** Acrescenta ficheiros, com as mesmas validações do arrastar e do seletor. */
  addFiles(list: Iterable<File>): void {
    const incoming = Array.from(list);
    const accepted: File[] = [];
    const rejected: MxFileRejection[] = [];
    const current = this.multiple() ? this.files() : [];
    for (const file of incoming) {
      if (!mxFileMatches(file, this.accept())) {
        rejected.push({ file, reason: 'type', message: `${file.name}: tipo de ficheiro não aceite.` });
      } else if (file.size > this.maxSize()) {
        rejected.push({ file, reason: 'size', message: `${file.name}: tem ${this.size(file.size)}, o máximo é ${this.size(this.maxSize())}.` });
      } else if (current.length + accepted.length >= (this.multiple() ? this.maxFiles() : 1)) {
        rejected.push({ file, reason: 'count', message: `${file.name}: só podes juntar ${this.multiple() ? this.maxFiles() : 1} ficheiro${this.maxFiles() === 1 || !this.multiple() ? '' : 's'}.` });
      } else {
        accepted.push(file);
      }
    }
    this.rejections.set(rejected);
    if (rejected.length) this.rejected.emit(rejected);
    if (accepted.length) this.update([...current, ...accepted]);
    const parts = [];
    if (accepted.length) parts.push(accepted.length === 1 ? `${accepted[0].name} juntado.` : `${accepted.length} ficheiros juntados.`);
    parts.push(...rejected.map((r) => r.message));
    if (parts.length) this.announcer.announce(parts.join(' '), rejected.length ? 'assertive' : 'polite');
    this.onTouched();
  }

  remove(index: number): void {
    const file = this.files()[index];
    this.update(this.files().filter((_, i) => i !== index));
    this.announcer.announce(`${file.name} removido.`);
    afterNextRender(() => {
      const removes = this.host.querySelectorAll<HTMLElement>('.mx-file-upload-remove');
      (removes[Math.min(index, removes.length - 1)] ?? this.host.querySelector<HTMLElement>('.mx-file-upload-button'))?.focus();
    }, { injector: this.injector });
  }

  private update(files: File[]): void {
    this.value.set(files);
    this.onChange(files);
  }

  protected onPick(event: Event): void {
    const el = event.target as HTMLInputElement;
    if (el.files?.length) this.addFiles(el.files);
    // permite escolher o mesmo ficheiro outra vez
    el.value = '';
  }

  protected onDragEnter(event: DragEvent): void {
    if (this.isDisabled()) return;
    event.preventDefault();
    this.dragDepth++;
    this.dragging.set(true);
  }
  protected onDragOver(event: DragEvent): void {
    if (this.isDisabled()) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
  }
  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    if (--this.dragDepth <= 0) {
      this.dragDepth = 0;
      this.dragging.set(false);
    }
  }
  protected onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragDepth = 0;
    this.dragging.set(false);
    if (this.isDisabled() || !event.dataTransfer?.files.length) return;
    this.addFiles(event.dataTransfer.files);
  }

  // ---- MxFormFieldControl ----
  errorState(): boolean {
    if (this.invalid()) return true;
    const c = this.ngControl;
    return !!c && !!c.invalid && !!(c.touched || c.dirty);
  }
  isRequired(): boolean {
    return this.required() || !!this.ngControl?.control?.hasValidator?.(Validators.required);
  }

  // ---- ControlValueAccessor ----
  writeValue(value: File[] | null): void {
    this.value.set(value ?? []);
    this.rejections.set([]);
  }
  registerOnChange(fn: (value: File[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
