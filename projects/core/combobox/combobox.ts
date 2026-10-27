import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { ControlValueAccessor, NgControl, Validators } from '@angular/forms';
import { MX_FORM_FIELD_CONTROL, MxFormField, MxFormFieldControl, mxNormalize, mxUniqueId } from '@muxima-ui/core/form-field';

const POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom' },
];

/**
 * Campo de texto que filtra uma lista enquanto se escreve (padrão WAI-ARIA
 * "combobox com lista"). A pesquisa ignora acentos e maiúsculas.
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Cliente</label>
 *   <mx-combobox [options]="clientes" [displayWith]="nome" formControlName="cliente" />
 * </mx-form-field>
 * ```
 */
@Component({
  selector: 'mx-combobox',
  exportAs: 'mxCombobox',
  imports: [CdkOverlayOrigin, CdkConnectedOverlay],
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxCombobox }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'mx-combobox',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '[attr.aria-label]': 'null',
  },
  template: `
    <div class="mx-combobox-field" cdkOverlayOrigin #origin="cdkOverlayOrigin">
      <input
        class="mx-input mx-combobox-input"
        type="text"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        [id]="controlId()"
        [attr.data-size]="size() === 'md' ? null : size()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-controls]="isOpen() ? listId : null"
        [attr.aria-activedescendant]="isOpen() && active() >= 0 ? optionId(active()) : null"
        [attr.aria-invalid]="errorState() ? 'true' : null"
        [attr.aria-required]="isRequired() ? 'true' : null"
        [attr.aria-describedby]="field?.describedBy() ?? null"
        [attr.aria-label]="ariaLabel() ?? null"
        [attr.aria-busy]="loading() ? 'true' : null"
        [placeholder]="placeholder()"
        [disabled]="isDisabled()"
        [value]="text()"
        (input)="onInput($event)"
        (keydown)="onKeydown($event)"
        (click)="open()"
        (blur)="onBlur()"
      />
      @if (loading()) {
        <span class="mx-spinner mx-select-spinner mx-combobox-chevron" aria-hidden="true"></span>
      } @else {
        <svg class="mx-select-chevron mx-combobox-chevron" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      }
    </div>

    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="isOpen()"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayWidth]="panelWidth()"
      (overlayOutsideClick)="onOutside($event)"
      (detach)="close()"
    >
      <ul class="mx-select-panel" role="listbox" [attr.aria-busy]="loading() ? 'true' : null" [id]="listId" [attr.aria-labelledby]="field?.labelId() ?? null" [attr.aria-label]="field?.labelId() ? null : (ariaLabel() ?? placeholder())">
        @if (loading()) {
          <li class="mx-select-empty mx-select-loading" role="option" aria-disabled="true" aria-selected="false"><span class="mx-spinner mx-select-spinner" aria-hidden="true"></span>{{ loadingText() }}</li>
        }
        @for (o of filtered(); track $index; let i = $index) {
          <li
            class="mx-option"
            role="option"
            [id]="optionId(i)"
            [attr.aria-selected]="isSelected(o)"
            [attr.data-active]="i === active() ? '' : null"
            (mousedown)="$event.preventDefault()"
            (mousemove)="active.set(i)"
            (click)="choose(o)"
          >
            {{ label(o) }}
          </li>
        } @empty {
          @if (!loading()) {
            <li class="mx-select-empty" role="option" aria-disabled="true" aria-selected="false">{{ emptyText() }}</li>
          }
        }
      </ul>
    </ng-template>
  `,
})
export class MxCombobox<T = unknown> implements ControlValueAccessor, MxFormFieldControl {
  /** Opção escolhida (não o texto escrito). */
  readonly value = model<T | null>(null);
  readonly options = input.required<readonly T[]>();
  /** Texto de cada opção. Por omissão, String(opção). */
  readonly displayWith = input<(option: T) => string>((o) => String(o ?? ''));
  readonly compareWith = input<(a: T | null, b: T | null) => boolean>((a, b) => Object.is(a, b));
  readonly placeholder = input('Pesquisar');
  readonly emptyText = input('Sem resultados');
  /** Resultados a chegar (pesquisa no servidor): mostra um indicador no campo e na lista. */
  readonly loading = input(false, { transform: booleanAttribute });
  readonly loadingText = input('A pesquisar...');
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly id = input<string | undefined>(undefined);
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' });
  /** Emite o texto escrito, para pesquisas no servidor. */
  readonly search = output<string>();

  protected readonly field = inject(MxFormField, { optional: true });
  private readonly ngControl = inject(NgControl, { self: true, optional: true });
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected readonly positions = POSITIONS;
  protected readonly listId = mxUniqueId('mx-combobox-list');
  private readonly generatedId = mxUniqueId('mx-combobox');
  readonly controlId = computed(() => this.id() ?? this.generatedId);

  protected readonly isOpen = signal(false);
  protected readonly panelWidth = signal(0);
  protected readonly active = signal(-1);
  protected readonly query = signal<string | null>(null);
  private readonly formDisabled = signal(false);
  protected readonly isDisabled = computed(() => this.disabled() || this.formDisabled());

  /** Texto no campo: o que se escreve, ou o nome da opção escolhida. */
  protected readonly text = computed(() => this.query() ?? (this.value() != null ? this.label(this.value() as T) : ''));

  protected readonly filtered = computed(() => {
    const q = mxNormalize((this.query() ?? '').trim());
    const all = this.options();
    return q ? all.filter((o) => mxNormalize(this.label(o)).includes(q)) : all;
  });

  private onChange: (value: T | null) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  protected label(o: T): string {
    return this.displayWith()(o);
  }
  protected optionId(i: number): string {
    return `${this.listId}-${i}`;
  }
  protected isSelected(o: T): boolean {
    return this.compareWith()(o, this.value());
  }

  open(): void {
    if (this.isDisabled() || this.isOpen()) return;
    this.panelWidth.set(this.host.getBoundingClientRect().width);
    this.isOpen.set(true);
    const index = this.filtered().findIndex((o) => this.isSelected(o));
    this.active.set(index);
  }

  close(): void {
    if (!this.isOpen()) return;
    this.isOpen.set(false);
    this.active.set(-1);
  }

  protected choose(o: T): void {
    this.value.set(o);
    this.onChange(o);
    this.query.set(null);
    this.close();
  }

  protected onInput(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this.query.set(text);
    this.search.emit(text);
    this.open();
    this.active.set(this.filtered().length ? 0 : -1);
    if (!text && this.value() != null) {
      this.value.set(null);
      this.onChange(null);
    }
  }

  protected onKeydown(event: KeyboardEvent): void {
    const n = this.filtered().length;
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (!this.isOpen() || event.altKey) {
          this.open();
          if (this.active() < 0 && n) this.active.set(0);
          return;
        }
        if (n) this.active.set(Math.min(this.active() + 1, n - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (event.altKey) {
          this.close();
          return;
        }
        if (this.isOpen() && n) this.active.set(Math.max(this.active() - 1, 0));
        break;
      case 'Enter':
        if (this.isOpen() && this.active() >= 0 && n) {
          event.preventDefault();
          this.choose(this.filtered()[this.active()]);
        }
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        } else if (this.text()) {
          // segundo Escape limpa o campo
          event.preventDefault();
          this.query.set('');
          this.value.set(null);
          this.onChange(null);
        }
        break;
      case 'Tab':
        this.close();
        break;
      default:
        return;
    }
    queueMicrotask(() => document.getElementById(this.optionId(this.active()))?.scrollIntoView?.({ block: 'nearest' }));
  }

  protected onOutside(event: MouseEvent): void {
    if (!this.host.contains(event.target as Node)) this.close();
  }

  protected onBlur(): void {
    // texto que não corresponde a uma opção é descartado
    if (!this.isOpen()) this.query.set(null);
    this.onTouched();
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
  writeValue(value: T | null): void {
    this.value.set(value ?? null);
    this.query.set(null);
  }
  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.formDisabled.set(isDisabled);
  }
}
