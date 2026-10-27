import { DestroyRef, Directive, OnInit, afterEveryRender, inject, input } from '@angular/core';
import { MX_FORM_FIELD_CONTROL, MxNativeControl } from '@muxima-ui/core/form-field';

/**
 * Cursor de intervalo sobre o `<input type="range">` nativo: setas, Page Up/Down,
 * Home e End funcionam como no navegador, e o valor é anunciado pelo leitor de ecrã.
 *
 * ```html
 * <mx-form-field>
 *   <label mxLabel>Orçamento (mil Kz)</label>
 *   <input type="range" mxSlider min="0" max="500" step="10" formControlName="orcamento" />
 * </mx-form-field>
 * ```
 */
@Directive({
  selector: 'input[type=range][mxSlider]',
  exportAs: 'mxSlider',
  providers: [{ provide: MX_FORM_FIELD_CONTROL, useExisting: MxSlider }],
  host: {
    class: 'mx-slider',
    '[attr.data-size]': 'size() === "md" ? null : size()',
    '(input)': 'paint()',
  },
})
export class MxSlider extends MxNativeControl implements OnInit {
  /** Espessura da barra: sm 4 px, md 6 px, lg 8 px. */
  readonly size = input<'sm' | 'md' | 'lg'>('md');

  constructor() {
    super();
    // O valor pode mudar por formulário ou atributo sem evento "input": repinta após cada render.
    afterEveryRender({ write: () => this.paint() });
  }

  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    // setValue/patchValue escrevem no input sem evento nem render: repinta quando o valor muda.
    const sub = this.ngControl?.valueChanges?.subscribe(() => this.paint());
    if (sub) this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  protected paint(): void {
    const el = this.element as HTMLInputElement;
    const min = Number(el.min || 0);
    const max = Number(el.max || 100);
    const pct = max > min ? ((Number(el.value) - min) / (max - min)) * 100 : 0;
    el.style.setProperty('--mx-slider-fill', `${pct}%`);
  }
}
