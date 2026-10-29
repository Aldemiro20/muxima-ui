import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxInput } from '@muxima-ui/core/form-field';
import { MX_MENU } from '@muxima-ui/core/menu';
import { MxSeparator } from '@muxima-ui/core/separator';

/** An app bar: search, notifications and the account menu. */
@Component({
  selector: 'app-navbar-app',
  imports: [MxAvatar, MxInput, MX_MENU, MxSeparator],
  templateUrl: './navbar-app.html',
  styleUrl: './navbar-app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarApp {
  protected readonly user = { name: 'Ana Kiala', email: 'ana@kianda.ao' };
  protected readonly unread = signal(3);
  protected readonly search = signal('');
  protected readonly lastAction = signal('');

  protected runSearch(event: Event): void {
    event.preventDefault();
    this.lastAction.set(this.search() ? `Search: ${this.search()}` : '');
  }
}
