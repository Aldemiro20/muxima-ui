import {
  ChangeDetectionStrategy,
  Injector,
  afterNextRender,
  Component,
  Directive,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
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
import { injectMxMessages } from '@muxima-ui/core/i18n';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { MX_FORM_FIELD_CONTROL, MxFormField, MxFormFieldControl, mxUniqueId } from '@muxima-ui/core/form-field';

/**
 * Etiqueta curta, opcionalmente com botão para remover.
 *
 * ```html
 * <mx-chip>Luanda</mx-chip>
 * <mx-chip removable (removed)="tirar('Luanda')">Luanda</mx-chip>
 * ```
 *
 * O botão de remover chama-se "Remover Luanda" (o texto do chip). Em listas, põe os chips num
 * `<ul>` com `<li>`, para o leitor de ecrã dizer quantos são.
 */
@Component({
  selector: 'mx-chip',
  exportAs: 'mxChip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-chip',
    '[attr.data-variant]': 'variant() === "default" ? null : variant()',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '[attr.data-disabled]': 'disabled() ? "" : null',
  },
  template: `
    <span class="mx-chip-label" #label><ng-content /></span>
    @if (removable()) {
      <button type="button" class="mx-chip-remove" [disabled]="disabled()" [attr.aria-label]="(removeLabel() ?? msg().remove) + ' ' + text()" (click)="removed.emit()">
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
      </button>
    }
  `,
})
export class MxChip {
  readonly removable = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly variant = input<'default' | 'outline' | 'accent'>('default');
  readonly size = input<'sm' | 'md'>('md');
  /** Verbo do botão de remover, seguido do texto do chip. */
  readonly removeLabel = input<string>();
  readonly removed = output<void>();
  protected readonly msg = computed(() => this.i18n().chips);
  private readonly i18n = injectMxMessages();

  private readonly label = viewChild.required<ElementRef<HTMLElement>>('label');
  protected readonly text = signal('');

  constructor() {
    afterRenderEffect({ read: () => this.text.set(this.label().nativeElement.textContent?.trim() ?? '') });
  }

  /** Põe o foco no botão de remover (usado pelo MxTagInput). */
  focusRemove(): void {
    this.label().nativeElement.parentElement?.querySelector<HTMLButtonElement>('.mx-chip-remove')?.focus();
  }
}

/**
 * Chip que liga e desliga, para filtros. É um `<button>` com aria-pressed.
 *
 * ```html
 * <div role="group" aria-label="Estado">
 *   <button mxChipToggle [(selected)]="soPagas">Pagas</button>
 * </div>
 * ```
 */
@Directive({
  selector: 'button[mxChipToggle]',
  exportAs: 'mxChipToggle',
  host: {
    class: 'mx-chip mx-chip-toggle',
    type: 'button',
    '[attr.aria-pressed]': 'selected()',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '(click)': 'selected.set(!selected())',
  },
})
export class MxChipToggle {
  readonly selected = model(false);
  readonly size = input<'sm' | 'md'>('md');
}

/**
 * Campo de etiquetas: escreve-se e Enter (ou vírgula) acrescenta; Backspace no campo vazio
 * vai para a última etiqueta. O valor é `string[]`.
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Destinatários</label>
 *   <mx-tag-input formControlName="emails" placeholder="Escreve e carrega Enter" />
 * </mx-form-field>
 * ```
 *
 * Cada etiqueta acrescentada ou removida é anunciada pelo leitor de ecrã.
 */
@Component({
  selector: 'mx-tag-input',
  exportAs: 'mxTagInput',
  imports: [MxChip],
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxTagInput }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-tag-input',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '[attr.data-invalid]': 'errorState() ? "" : null',
    '[attr.data-disabled]': 'isDisabled() ? "" : null',
    '[attr.aria-label]': 'null',
    '(click)': 'focusInput($event)',
  },
  template: `
    @if (tags().length) {
      <ul class="mx-tag-input-list" [attr.aria-label]="listLabel() ?? msg().list">
        @for (t of tags(); track t; let i = $index) {
          <li>
            <mx-chip size="sm" [removable]="!isDisabled()" (removed)="remove(i)" (keydown)="onChipKey($event, i)">{{ t }}</mx-chip>
          </li>
        }
      </ul>
    }
    <input
      #input
      class="mx-tag-input-field"
      type="text"
      autocomplete="off"
      [id]="controlId()"
      [placeholder]="tags().length ? '' : placeholder()"
      [disabled]="isDisabled()"
      [value]="draft()"
      [attr.aria-invalid]="errorState() ? 'true' : null"
      [attr.aria-required]="isRequired() ? 'true' : null"
      [attr.aria-describedby]="describedBy()"
      [attr.aria-label]="ariaLabel() ?? null"
      (input)="draft.set($any($event.target).value)"
      (keydown)="onKeydown($event)"
      (blur)="onBlur()"
      (paste)="onPaste($event)"
    />
    <span class="mx-visually-hidden" [id]="helpId">{{ helpText() ?? msg().help }}</span>
  `,
})
export class MxTagInput implements ControlValueAccessor, MxFormFieldControl {
  readonly value = model<string[]>([]);
  readonly placeholder = input('');
  /** Teclas que acrescentam a etiqueta, além de Enter. */
  readonly separators = input<string[]>([',', ';']);
  readonly maxTags = input(Infinity, { transform: numberAttribute });
  readonly allowDuplicates = input(false, { transform: booleanAttribute });
  /** Valida cada etiqueta antes de a acrescentar (ex.: email). Devolve a mensagem de erro ou null. */
  readonly validate = input<(tag: string) => string | null>(() => null);
  /** Nome da lista para o leitor de ecrã. */
  readonly listLabel = input<string>();
  readonly helpText = input<string>();
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly id = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  /** Emite a etiqueta rejeitada por `validate`, duplicada ou acima do máximo. */
  readonly rejected = output<{ tag: string; reason: string }>();

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly announcer = inject(LiveAnnouncer);
  private readonly i18n = injectMxMessages();
  protected readonly msg = computed(() => this.i18n().chips);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly input = viewChild.required<ElementRef<HTMLInputElement>>('input');
  private readonly injector = inject(Injector);

  private readonly generatedId = mxUniqueId('mx-tag-input');
  readonly controlId = computed(() => this.id() ?? this.generatedId);
  protected readonly helpId = mxUniqueId('mx-tag-help');
  protected readonly draft = signal('');
  protected readonly tags = computed(() => this.value() ?? []);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());
  protected readonly describedBy = computed(() => [this.field?.describedBy(), this.helpId].filter(Boolean).join(' '));

  private onChange: (value: string[]) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  /** Acrescenta uma etiqueta. Devolve false se foi rejeitada. */
  add(raw: string): boolean {
    const tag = raw.trim();
    if (!tag) return false;
    const reject = (reason: string) => {
      this.rejected.emit({ tag, reason });
      this.announcer.announce(reason, 'assertive');
      return false;
    };
    if (this.tags().length >= this.maxTags()) return reject(this.msg().max(this.maxTags()));
    if (!this.allowDuplicates() && this.tags().some((t) => t.toLocaleLowerCase() === tag.toLocaleLowerCase())) return reject(this.msg().duplicate(tag));
    const error = this.validate()(tag);
    if (error) return reject(error);
    this.update([...this.tags(), tag]);
    this.announcer.announce(this.msg().added(tag));
    return true;
  }

  remove(index: number): void {
    const tag = this.tags()[index];
    this.update(this.tags().filter((_, i) => i !== index));
    this.announcer.announce(this.msg().removed(tag));
    // o foco passa para a etiqueta seguinte, ou para o campo
    afterNextRender(() => {
      const chips = this.host.querySelectorAll<HTMLElement>('.mx-chip-remove');
      (chips[Math.min(index, chips.length - 1)] ?? this.input().nativeElement).focus();
    }, { injector: this.injector });
  }

  private update(tags: string[]): void {
    this.value.set(tags);
    this.onChange(tags);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const el = event.target as HTMLInputElement;
    if (event.key === 'Enter' || this.separators().includes(event.key)) {
      if (!this.draft().trim()) {
        if (event.key !== 'Enter') event.preventDefault();
        return;
      }
      event.preventDefault();
      if (this.add(this.draft())) this.clearDraft();
    } else if (event.key === 'Backspace' && !el.value && this.tags().length) {
      event.preventDefault();
      this.host.querySelectorAll<HTMLElement>('.mx-chip-remove')[this.tags().length - 1]?.focus();
    }
  }

  private clearDraft(): void {
    this.draft.set('');
    // o binding [value] pode não ter visto o texto escrito: limpa o elemento
    this.input().nativeElement.value = '';
  }

  protected onChipKey(event: KeyboardEvent, index: number): void {
    const removes = this.host.querySelectorAll<HTMLElement>('.mx-chip-remove');
    if (event.key === 'Backspace' || event.key === 'Delete') {
      event.preventDefault();
      this.remove(index);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      removes[Math.max(index - 1, 0)]?.focus();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      (removes[index + 1] ?? this.input().nativeElement).focus();
    }
  }

  protected onPaste(event: ClipboardEvent): void {
    const text = event.clipboardData?.getData('text') ?? '';
    const parts = text.split(new RegExp(`[\\n${this.separators().map((s) => '\\' + s).join('')}]`)).filter((p) => p.trim());
    if (parts.length > 1) {
      event.preventDefault();
      parts.forEach((p) => this.add(p));
    }
  }

  protected onBlur(): void {
    if (this.draft().trim() && this.add(this.draft())) this.clearDraft();
    this.onTouched();
  }

  protected focusInput(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('button, input')) this.input().nativeElement.focus();
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
  writeValue(value: string[] | null): void {
    this.value.set(value ?? []);
  }
  registerOnChange(fn: (value: string[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
