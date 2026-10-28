import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  numberAttribute,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { injectMxMessages } from '@muxima-ui/core/i18n';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { CharacterCount, Placeholder } from '@tiptap/extensions';
import {
  MX_FORM_FIELD_CONTROL,
  MxFormField,
  MxFormFieldControl,
  mxUniqueId,
} from '@muxima-ui/core/form-field';

/** Botões possíveis da barra de formatação. `|` desenha um separador. */
export type MxEditorTool =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'code'
  | 'heading2'
  | 'heading3'
  | 'paragraph'
  | 'bulletList'
  | 'orderedList'
  | 'blockquote'
  | 'link'
  | 'undo'
  | 'redo'
  | '|';

export const MX_EDITOR_DEFAULT_TOOLS: MxEditorTool[] = [
  'bold',
  'italic',
  'underline',
  'strike',
  '|',
  'heading2',
  'heading3',
  '|',
  'bulletList',
  'orderedList',
  'blockquote',
  '|',
  'link',
  '|',
  'undo',
  'redo',
];

interface ToolDef {
  label: string;
  shortcut?: string;
  icon: string;
  run: (e: Editor) => void;
  active?: (e: Editor) => boolean;
  enabled?: (e: Editor) => boolean;
  toggle?: boolean;
}

const I = (d: string) =>
  `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

const TOOLS: Record<Exclude<MxEditorTool, '|'>, ToolDef> = {
  bold: {
    label: 'Negrito',
    shortcut: 'Control+B',
    icon: I('<path d="M4.5 3h4.2a2.5 2.5 0 0 1 0 5H4.5zM4.5 8h4.8a2.5 2.5 0 0 1 0 5H4.5z"/>'),
    run: (e) => e.chain().focus().toggleBold().run(),
    active: (e) => e.isActive('bold'),
    toggle: true,
  },
  italic: {
    label: 'Itálico',
    shortcut: 'Control+I',
    icon: I('<path d="M10 3H6.5M9.5 13H6M9 3l-2 10"/>'),
    run: (e) => e.chain().focus().toggleItalic().run(),
    active: (e) => e.isActive('italic'),
    toggle: true,
  },
  underline: {
    label: 'Sublinhado',
    shortcut: 'Control+U',
    icon: I('<path d="M4.5 3v4.5a3.5 3.5 0 0 0 7 0V3M4 13.5h8"/>'),
    run: (e) => e.chain().focus().toggleUnderline().run(),
    active: (e) => e.isActive('underline'),
    toggle: true,
  },
  strike: {
    label: 'Riscado',
    icon: I(
      '<path d="M3 8h10M10.5 4.5c-.5-1-1.5-1.5-2.7-1.5C6.2 3 5 3.9 5 5.2c0 .9.5 1.5 1.3 1.9M5.5 11.5c.5 1 1.6 1.5 2.9 1.5 1.7 0 2.9-.9 2.9-2.3 0-.5-.1-.9-.4-1.2"/>',
    ),
    run: (e) => e.chain().focus().toggleStrike().run(),
    active: (e) => e.isActive('strike'),
    toggle: true,
  },
  code: {
    label: 'Código',
    icon: I('<path d="M6 4.5L2.5 8 6 11.5M10 4.5L13.5 8 10 11.5"/>'),
    run: (e) => e.chain().focus().toggleCode().run(),
    active: (e) => e.isActive('code'),
    toggle: true,
  },
  heading2: {
    label: 'Título',
    icon: I(
      '<path d="M3 3.5v9M9 3.5v9M3 8h6M11.5 7.5c.3-.6.9-1 1.6-1 .9 0 1.4.6 1.4 1.3 0 1.3-3 2.4-3 4.7h3"/>',
    ),
    run: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
    active: (e) => e.isActive('heading', { level: 2 }),
    toggle: true,
  },
  heading3: {
    label: 'Subtítulo',
    icon: I(
      '<path d="M3 3.5v9M9 3.5v9M3 8h6M11.5 7c.3-.5.8-.7 1.4-.7.8 0 1.3.5 1.3 1.1 0 .7-.6 1.1-1.3 1.1.8 0 1.5.4 1.5 1.2 0 .8-.6 1.3-1.5 1.3-.6 0-1.1-.3-1.4-.8"/>',
    ),
    run: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
    active: (e) => e.isActive('heading', { level: 3 }),
    toggle: true,
  },
  paragraph: {
    label: 'Parágrafo',
    icon: I('<path d="M10 13V3M12.5 13V3M13.5 3H7.5a2.5 2.5 0 0 0 0 5H10"/>'),
    run: (e) => e.chain().focus().setParagraph().run(),
    active: (e) => e.isActive('paragraph'),
    toggle: true,
  },
  bulletList: {
    label: 'Lista',
    icon: I(
      '<path d="M6.5 4h7M6.5 8h7M6.5 12h7"/><circle cx="3" cy="4" r=".6" fill="currentColor"/><circle cx="3" cy="8" r=".6" fill="currentColor"/><circle cx="3" cy="12" r=".6" fill="currentColor"/>',
    ),
    run: (e) => e.chain().focus().toggleBulletList().run(),
    active: (e) => e.isActive('bulletList'),
    toggle: true,
  },
  orderedList: {
    label: 'Lista numerada',
    icon: I(
      '<path d="M6.5 4h7M6.5 8h7M6.5 12h7M2.5 3l1-.5V6M2.5 9.5c.2-.5.6-.7 1-.7.5 0 .9.3.9.8 0 .8-1.9 1.3-1.9 2.4h1.9"/>',
    ),
    run: (e) => e.chain().focus().toggleOrderedList().run(),
    active: (e) => e.isActive('orderedList'),
    toggle: true,
  },
  blockquote: {
    label: 'Citação',
    icon: I('<path d="M3 4.5h4v4H4.5L3 11.5zM9 4.5h4v4h-2.5L9 11.5z"/>'),
    run: (e) => e.chain().focus().toggleBlockquote().run(),
    active: (e) => e.isActive('blockquote'),
    toggle: true,
  },
  link: {
    label: 'Ligação',
    shortcut: 'Control+K',
    icon: I(
      '<path d="M6.5 9.5l3-3M7 4.5l1-1a2.8 2.8 0 0 1 4 4l-1 1M9 11.5l-1 1a2.8 2.8 0 0 1-4-4l1-1"/>',
    ),
    run: () => {},
    active: (e) => e.isActive('link'),
    toggle: true,
  },
  undo: {
    label: 'Anular',
    shortcut: 'Control+Z',
    icon: I('<path d="M5.5 3.5L2.5 6.5l3 3M2.5 6.5H10a3.5 3.5 0 0 1 0 7H7"/>'),
    run: (e) => e.chain().focus().undo().run(),
    enabled: (e) => e.can().undo(),
  },
  redo: {
    label: 'Refazer',
    shortcut: 'Control+Shift+Z',
    icon: I('<path d="M10.5 3.5l3 3-3 3M13.5 6.5H6a3.5 3.5 0 0 0 0 7h3"/>'),
    run: (e) => e.chain().focus().redo().run(),
    enabled: (e) => e.can().redo(),
  },
};

/**
 * Editor de texto com formatação, sobre o Tiptap (ProseMirror). O Tiptap é uma dependência
 * opcional: instala-o só se usares este ponto de entrada.
 *
 * ```bash
 * npm install @tiptap/core @tiptap/pm @tiptap/starter-kit @tiptap/extensions
 * ```
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Notas da factura</label>
 *   <mx-editor formControlName="notas" placeholder="Escreve aqui..." [maxLength]="2000" />
 * </mx-form-field>
 * ```
 *
 * O valor é HTML (string; vazio quando não há texto). A barra é um role=toolbar:
 * setas entre botões, Alt + F10 vai do texto para a barra e Esc volta ao texto.
 */
@Component({
  selector: 'mx-editor',
  exportAs: 'mxEditor',
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxEditor }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-editor',
    '[attr.data-invalid]': 'errorState() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.data-readonly]': 'readonly() ? "" : null',
    '[attr.aria-label]': 'null',
  },
  template: `
    @if (!readonly()) {
      <div
        class="mx-editor-toolbar"
        role="toolbar"
        #toolbar
        [attr.aria-label]="toolbarLabel() ?? msg().toolbar"
        [attr.aria-controls]="controlId()"
        (keydown)="onToolbarKey($event)"
      >
        @for (t of toolList(); track $index) {
          @if (t === '|') {
            <span class="mx-editor-sep" role="separator" aria-orientation="vertical"></span>
          } @else {
            <button
              type="button"
              class="mx-editor-tool"
              [tabIndex]="$index === focusIndex() ? 0 : -1"
              [attr.data-tool]="t"
              [attr.aria-label]="toolLabel(t)"
              [attr.aria-keyshortcuts]="tools[t].shortcut ?? null"
              [attr.aria-pressed]="tools[t].toggle ? isActive(t) : null"
              [disabled]="isDisabled() || !isEnabled(t)"
              (mousedown)="$event.preventDefault()"
              (click)="runTool(t, $index)"
            >
              <span class="mx-editor-icon" [innerHTML]="icon(t)"></span>
            </button>
          }
        }
      </div>
      @if (linkOpen()) {
        <div class="mx-editor-linkbar" role="group" [attr.aria-label]="linkLabel() ?? msg().link">
          <input
            #linkInput
            class="mx-input"
            data-size="sm"
            type="url"
            placeholder="https://"
            [attr.aria-label]="linkLabel() ?? msg().link"
            [value]="linkUrl()"
            (input)="linkUrl.set($any($event.target).value)"
            (keydown.enter)="$event.preventDefault(); applyLink()"
            (keydown.escape)="$event.preventDefault(); closeLink()"
          />
          <button type="button" class="mx-editor-text-button" (click)="applyLink()">{{ msg().apply }}</button>
          @if (linkActive()) {
            <button type="button" class="mx-editor-text-button" (click)="removeLink()">
              {{ msg().remove }}
            </button>
          }
          <button type="button" class="mx-editor-text-button" (click)="closeLink()">
            {{ msg().cancel }}
          </button>
        </div>
      }
    }
    <div
      class="mx-editor-content"
      #content
      [style.min-height]="minHeight()"
      [style.max-height]="maxHeight()"
    ></div>
    @if (maxLength()) {
      <div class="mx-editor-footer">
        <span
          class="mx-editor-count"
          [attr.data-over]="count() > maxLength()! ? '' : null"
          [attr.aria-live]="count() >= maxLength()! * 0.9 ? 'polite' : null"
        >
          {{ count() }} / {{ maxLength() }}<span class="mx-visually-hidden"> {{ msg().characters }}</span>
        </span>
      </div>
    }
  `,
})
export class MxEditor implements ControlValueAccessor, MxFormFieldControl {
  readonly value = model<string>('');
  readonly placeholder = input('');
  readonly tools = TOOLS;
  readonly toolbar = input<MxEditorTool[]>(MX_EDITOR_DEFAULT_TOOLS);
  /** Máximo de caracteres; mostra a contagem. */
  readonly maxLength = input<number | null, unknown>(null, {
    transform: (v: unknown) => (v == null || v === '' ? null : numberAttribute(v)),
  });
  readonly minHeight = input('140px');
  readonly maxHeight = input<string | null>('420px');
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly id = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  readonly toolbarLabel = input<string>();
  readonly linkLabel = input<string>();
  private readonly i18n = injectMxMessages();
  protected readonly msg = computed(() => this.i18n().editor);
  protected toolLabel(t: MxEditorTool): string {
    return t === '|' ? '' : this.msg().tools[t];
  }

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly content = viewChild.required<ElementRef<HTMLElement>>('content');
  private readonly toolbarEl = viewChild<ElementRef<HTMLElement>>('toolbar');
  private readonly linkInput = viewChild<ElementRef<HTMLInputElement>>('linkInput');
  private readonly injector = inject(Injector);

  private readonly generatedId = mxUniqueId('mx-editor');
  readonly controlId = computed(() => this.id() ?? this.generatedId);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly toolList = computed(() => this.toolbar());
  protected readonly focusIndex = signal(0);
  /** Muda a cada transacção, para os botões reflectirem o estado. */
  private readonly tick = signal(0);
  protected readonly count = signal(0);
  protected readonly linkOpen = signal(false);
  protected readonly linkUrl = signal('');
  protected readonly linkActive = signal(false);
  /** O editor do Tiptap, para comandos próprios (editor()?.chain()...). */
  readonly editor = signal<Editor | null>(null);
  private writing = false;

  private onChange: (v: string) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
    afterNextRender(() => this.create());
    inject(DestroyRef).onDestroy(() => this.editor()?.destroy());
    effect(() => {
      const e = this.editor();
      const editable = !this.isDisabled() && !this.readonly();
      if (e && e.isEditable !== editable) e.setEditable(editable);
    });
    // aria do conteúdo acompanha o form field
    effect(() => {
      const e = this.editor();
      this.tick();
      if (!e) return;
      const el = e.view.dom as HTMLElement;
      const set = (k: string, v: string | null) =>
        v == null ? el.removeAttribute(k) : el.setAttribute(k, v);
      set('aria-labelledby', this.field?.labelId() ?? null);
      set('aria-label', this.field?.labelId() ? null : (this.ariaLabel() ?? null));
      set('aria-describedby', this.field?.describedBy() ?? null);
      set('aria-invalid', this.errorState() ? 'true' : null);
      set('aria-required', this.isRequired() ? 'true' : null);
      set('aria-readonly', this.readonly() || this.isDisabled() ? 'true' : null);
    });
  }

  private create(): void {
    const editor = new Editor({
      element: this.content().nativeElement,
      content: untracked(() => this.value()) || '',
      editable: !this.isDisabled() && !this.readonly(),
      extensions: [
        StarterKit.configure({
          heading: { levels: [2, 3, 4] },
          link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
        }),
        Placeholder.configure({ placeholder: () => this.placeholder() }),
        CharacterCount.configure({ limit: null }),
      ],
      editorProps: {
        attributes: {
          id: this.controlId(),
          role: 'textbox',
          'aria-multiline': 'true',
          class: 'mx-editor-prose',
        },
        handleKeyDown: (_view, event) => {
          if (event.altKey && event.key === 'F10') {
            event.preventDefault();
            this.focusToolbar();
            return true;
          }
          if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === 'k' &&
            this.toolList().includes('link')
          ) {
            event.preventDefault();
            // dentro do texto, Ctrl + K é a ligação (não o atalho global da aplicação)
            event.stopPropagation();
            this.openLink();
            return true;
          }
          return false;
        },
      },
      onTransaction: () => this.tick.update((t) => t + 1),
      onUpdate: ({ editor: e }) => {
        this.count.set(e.storage.characterCount?.characters?.() ?? e.getText().length);
        if (this.writing) return;
        const html = e.isEmpty ? '' : e.getHTML();
        this.value.set(html);
        this.onChange(html);
      },
      onBlur: () => this.onTouched(),
    });
    this.count.set(editor.storage.characterCount?.characters?.() ?? editor.getText().length);
    this.editor.set(editor);
  }

  private readonly sanitizer = inject(DomSanitizer);
  private readonly icons = new Map<string, SafeHtml>();
  protected icon(t: Exclude<MxEditorTool, '|'>): SafeHtml {
    // os desenhos são constantes deste ficheiro, nunca texto de fora
    if (!this.icons.has(t))
      this.icons.set(t, this.sanitizer.bypassSecurityTrustHtml(TOOLS[t].icon));
    return this.icons.get(t)!;
  }
  protected isActive(t: Exclude<MxEditorTool, '|'>): boolean {
    this.tick();
    const e = this.editor();
    return !!e && !!TOOLS[t].active?.(e);
  }
  protected isEnabled(t: Exclude<MxEditorTool, '|'>): boolean {
    this.tick();
    const e = this.editor();
    return !!e && (TOOLS[t].enabled ? TOOLS[t].enabled!(e) : true);
  }
  protected runTool(t: Exclude<MxEditorTool, '|'>, index: number): void {
    this.focusIndex.set(index);
    const e = this.editor();
    if (!e) return;
    if (t === 'link') {
      this.openLink();
      return;
    }
    TOOLS[t].run(e);
  }

  // ---- ligações ----
  openLink(): void {
    const e = this.editor();
    if (!e) return;
    this.linkActive.set(e.isActive('link'));
    this.linkUrl.set(e.getAttributes('link')['href'] ?? '');
    this.linkOpen.set(true);
    afterNextRender(() => this.linkInput()?.nativeElement.focus(), { injector: this.injector });
  }
  protected applyLink(): void {
    const e = this.editor();
    const url = this.linkUrl().trim();
    if (!e) return;
    if (!url) this.removeLink();
    else {
      const href = /^(https?:|mailto:|tel:|\/|#)/i.test(url) ? url : `https://${url}`;
      e.chain().focus().extendMarkRange('link').setLink({ href }).run();
    }
    this.linkOpen.set(false);
  }
  protected removeLink(): void {
    this.editor()?.chain().focus().extendMarkRange('link').unsetLink().run();
    this.linkOpen.set(false);
  }
  protected closeLink(): void {
    this.linkOpen.set(false);
    this.editor()?.commands.focus();
  }

  // ---- barra (roving tabindex) ----
  private buttons(): HTMLButtonElement[] {
    return Array.from(
      this.toolbarEl()?.nativeElement.querySelectorAll<HTMLButtonElement>(
        '.mx-editor-tool:not(:disabled)',
      ) ?? [],
    );
  }
  focusToolbar(): void {
    const b = this.buttons();
    const current = this.toolbarEl()?.nativeElement.querySelector<HTMLButtonElement>(
      '.mx-editor-tool[tabindex="0"]:not(:disabled)',
    );
    (current ?? b[0])?.focus();
  }
  protected onToolbarKey(event: KeyboardEvent): void {
    const b = this.buttons();
    const i = b.indexOf(document.activeElement as HTMLButtonElement);
    let next = -1;
    if (event.key === 'ArrowRight') next = (i + 1) % b.length;
    else if (event.key === 'ArrowLeft') next = (i - 1 + b.length) % b.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = b.length - 1;
    else if (event.key === 'Escape') {
      event.preventDefault();
      this.editor()?.commands.focus();
      return;
    }
    if (next < 0 || !b[next]) return;
    event.preventDefault();
    const all = Array.from(
      this.toolbarEl()!.nativeElement.querySelectorAll<HTMLElement>(
        '.mx-editor-tool, .mx-editor-sep',
      ),
    );
    this.focusIndex.set(all.indexOf(b[next]));
    b[next].focus();
  }

  /** Põe o foco no texto. */
  focus(): void {
    this.editor()?.commands.focus();
  }

  // ---- MxFormFieldControl ----
  errorState(): boolean {
    if (this.invalid()) return true;
    const max = this.maxLength();
    if (max && this.count() > max) return true;
    const c = this.ngControl;
    return !!c && !!c.invalid && !!(c.touched || c.dirty);
  }
  isRequired(): boolean {
    return this.required() || !!this.ngControl?.control?.hasValidator?.(Validators.required);
  }

  // ---- ControlValueAccessor ----
  writeValue(value: string | null): void {
    const html = value ?? '';
    this.value.set(html);
    const e = this.editor();
    if (e && (e.isEmpty ? '' : e.getHTML()) !== html) {
      this.writing = true;
      e.commands.setContent(html, { emitUpdate: false });
      this.count.set(e.storage.characterCount?.characters?.() ?? e.getText().length);
      this.writing = false;
    }
  }
  registerOnChange(fn: (v: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
