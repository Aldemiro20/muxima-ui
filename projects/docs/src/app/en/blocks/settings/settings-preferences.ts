import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxOption, MxSelect } from '@muxima-ui/core/select';
import { MxSwitch } from '@muxima-ui/core/switch';

interface Toggle {
  id: string;
  title: string;
  description: string;
  on: boolean;
}

/** Settings rows: title and description on the left, the control on the right. */
@Component({
  selector: 'app-settings-preferences',
  imports: [FormsModule, MxSwitch, MxSelect, MxOption],
  templateUrl: './settings-preferences.html',
  styleUrl: './settings-preferences.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPreferences {
  protected readonly toggles = signal<Toggle[]>([
    { id: 'email', title: 'Email notices', description: 'Paid and overdue invoices, and new customers.', on: true },
    { id: 'summary', title: 'Weekly summary', description: 'On Mondays, the previous week\'s sales.', on: false },
    { id: 'sound', title: 'Notification sounds', description: 'Only while the app is open.', on: true },
  ]);
  protected readonly language = signal('en');
  protected readonly currency = signal('USD');
  protected readonly notice = signal('');

  protected toggle(i: Toggle, on: boolean): void {
    this.toggles.update((l) => l.map((x) => (x.id === i.id ? { ...x, on } : x)));
    // replace with a request to the server
    this.notice.set(`${i.title}: ${on ? 'on' : 'off'}. Saved.`);
  }

  protected saved(o: string): void {
    this.notice.set(`${o} saved.`);
  }
}
