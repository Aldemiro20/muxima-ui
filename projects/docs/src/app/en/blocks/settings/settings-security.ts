import { ChangeDetectionStrategy, Component, TemplateRef, inject, signal, viewChild } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MxDialog } from '@muxima-ui/core/dialog';
import { MxSwitch } from '@muxima-ui/core/switch';

interface Sessao {
  id: number;
  device: string;
  place: string;
  when: string;
  current?: boolean;
}

/** Account security: two-step verification, open sessions and account deletion. */
@Component({
  selector: 'app-settings-security',
  imports: [MxBadge, MxButton, MxSwitch, MX_DIALOG],
  templateUrl: './settings-security.html',
  styleUrl: './settings-security.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSecurity {
  private readonly dialog = inject(MxDialog);
  private readonly confirmacao = viewChild.required<TemplateRef<unknown>>('confirmDelete');

  protected readonly twoStep = signal(true);
  protected readonly sessions = signal<Sessao[]>([
    { id: 1, device: 'Chrome on Windows', place: 'Luanda', when: 'Now', current: true },
    { id: 2, device: 'Safari on iPhone', place: 'Luanda', when: '2 hours ago' },
    { id: 3, device: 'Firefox on Linux', place: 'Benguela', when: '5 days ago' },
  ]);
  protected readonly notice = signal('');

  protected toggleTwoStep(on: boolean): void {
    this.twoStep.set(on);
    this.notice.set(on ? 'Two-step verification on.' : 'Two-step verification off.');
  }

  protected end(s: Sessao): void {
    this.sessions.update((l) => l.filter((x) => x.id !== s.id));
    this.notice.set(`Session ended: ${s.device}, ${s.place}.`);
  }

  protected endOthers(): void {
    const n = this.sessions().filter((s) => !s.current).length;
    this.sessions.update((l) => l.filter((s) => s.current));
    this.notice.set(n === 1 ? '1 session ended.' : `${n} sessions ended.`);
  }

  protected deleteAccount(): void {
    const ref = this.dialog.open<boolean>(this.confirmacao(), { size: 'sm', role: 'alertdialog' });
    ref.closed.subscribe((confirmed) => {
      // here you'd send the request to the server and end the session
      if (confirmed) this.notice.set('Deletion request sent. You\'ll get an email to confirm.');
    });
  }
}
