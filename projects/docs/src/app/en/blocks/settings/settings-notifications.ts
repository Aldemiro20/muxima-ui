import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxSwitch } from '@muxima-ui/core/switch';

type Channel = 'email' | 'sms' | 'app';

interface NotificationEvent {
  id: string;
  name: string;
  description: string;
}

/** Notifications by event and channel, in a table of checkboxes. */
@Component({
  selector: 'app-settings-notifications',
  imports: [MxButton, MxCheckbox, MxSwitch],
  templateUrl: './settings-notifications.html',
  styleUrl: './settings-notifications.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNotifications {
  protected readonly channels: { id: Channel; name: string }[] = [
    { id: 'email', name: 'E-mail' },
    { id: 'sms', name: 'SMS' },
    { id: 'app', name: 'In the app' },
  ];
  protected readonly events: NotificationEvent[] = [
    { id: 'paid', name: 'Invoice paid', description: 'When a customer pays.' },
    { id: 'overdue', name: 'Invoice overdue', description: 'The day after the due date.' },
    { id: 'customer', name: 'New customer', description: 'When someone on the team creates one.' },
    { id: 'weekly', name: 'Weekly summary', description: 'Mondays at 8:00.' },
  ];

  private readonly initial = new Set(['paid:email', 'paid:app', 'overdue:email', 'overdue:sms', 'overdue:app', 'weekly:email']);
  protected readonly enabled = signal<ReadonlySet<string>>(new Set(this.initial));
  protected readonly quiet = signal(true);
  private readonly saved = signal<ReadonlySet<string>>(new Set(this.initial));
  private readonly quietSaved = signal(true);
  protected readonly changed = computed(
    () =>
      this.quiet() !== this.quietSaved() ||
      this.enabled().size !== this.saved().size ||
      [...this.enabled()].some((k) => !this.saved().has(k)),
  );
  protected readonly notice = signal('');

  protected on(e: string, c: Channel): boolean {
    return this.enabled().has(`${e}:${c}`);
  }

  protected toggle(e: string, c: Channel, enable: boolean): void {
    this.enabled.update((s) => {
      const n = new Set(s);
      if (enable) n.add(`${e}:${c}`);
      else n.delete(`${e}:${c}`);
      return n;
    });
    this.notice.set('');
  }

  /** Column state: all, none or some (indeterminate checkbox). */
  protected column(c: Channel): 'all' | 'none' | 'some' {
    const n = this.events.filter((e) => this.on(e.id, c)).length;
    return n === this.events.length ? 'all' : n === 0 ? 'none' : 'some';
  }

  protected toggleColumn(c: Channel): void {
    const enable = this.column(c) !== 'all';
    for (const e of this.events) this.toggle(e.id, c, enable);
  }

  protected save(event: Event): void {
    event.preventDefault();
    // here you'd send the request to the server
    this.saved.set(new Set(this.enabled()));
    this.quietSaved.set(this.quiet());
    this.notice.set('Notification preferences saved.');
  }

  protected reset(): void {
    this.enabled.set(new Set(this.saved()));
    this.quiet.set(this.quietSaved());
    this.notice.set('Changes undone.');
  }
}
