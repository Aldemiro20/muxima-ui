import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Marca Muxima: três corações concêntricos em linha contínua,
 * inspirados nos desenhos sona dos Tchokwe.
 */
@Component({
  selector: 'doc-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-hidden': 'true', class: 'doc-logo' },
  template: `<svg viewBox="0 0 64 64" [attr.width]="size()" [attr.height]="size()" fill="none"
      stroke="currentColor" stroke-linejoin="round" stroke-linecap="round">
      <path [attr.d]="heart" stroke-width="3.4" />
      <path [attr.d]="heart" stroke-width="5.15" transform="translate(32 34) scale(0.66) translate(-32 -34)" />
      <path [attr.d]="heart" stroke-width="10.3" transform="translate(32 34) scale(0.33) translate(-32 -34)" />
    </svg>`,
})
export class Logo {
  readonly size = input(28);
  protected readonly heart =
    'M32 55 L9.5 31.5 C4.5 25.5 7.5 13 18.5 12.5 C25 12.2 29.5 16 32 20.5 C34.5 16 39 12.2 45.5 12.5 C56.5 13 59.5 25.5 54.5 31.5 Z';
}
