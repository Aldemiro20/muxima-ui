import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';

/**
 * A site's navigation bar. On narrow screens the links move into a
 * menu that opens with the Menu button (Escape closes it and returns focus to the button).
 */
@Component({
  selector: 'app-navbar-site',
  imports: [MxButton],
  templateUrl: './navbar-site.html',
  styleUrl: './navbar-site.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(keydown.escape)': 'close(true)' },
})
export class NavbarSite {
  protected readonly links = [
    { text: 'Product', href: '#product' },
    { text: 'Pricing', href: '#pricing', current: true },
    { text: 'Customers', href: '#customers' },
    { text: 'Help', href: '#help' },
  ];
  protected readonly open = signal(false);
  private readonly button = viewChild.required<ElementRef<HTMLButtonElement>>('menuButton');

  protected close(returnFocus = false): void {
    if (!this.open()) return;
    this.open.set(false);
    if (returnFocus) this.button().nativeElement.focus();
  }
}
