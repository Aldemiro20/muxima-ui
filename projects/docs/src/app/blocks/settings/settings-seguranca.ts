import { ChangeDetectionStrategy, Component, TemplateRef, inject, signal, viewChild } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MX_DIALOG, MxDialog } from '@muxima-ui/core/dialog';
import { MxSwitch } from '@muxima-ui/core/switch';

interface Sessao {
  id: number;
  dispositivo: string;
  local: string;
  quando: string;
  actual?: boolean;
}

/** Segurança da conta: dois passos, sessões abertas e eliminar a conta. */
@Component({
  selector: 'app-settings-seguranca',
  imports: [MxBadge, MxButton, MxSwitch, MX_DIALOG],
  templateUrl: './settings-seguranca.html',
  styleUrl: './settings-seguranca.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSeguranca {
  private readonly dialog = inject(MxDialog);
  private readonly confirmacao = viewChild.required<TemplateRef<unknown>>('confirmarEliminar');

  protected readonly doisPassos = signal(true);
  protected readonly sessoes = signal<Sessao[]>([
    { id: 1, dispositivo: 'Chrome em Windows', local: 'Luanda', quando: 'Agora', actual: true },
    { id: 2, dispositivo: 'Safari em iPhone', local: 'Luanda', quando: 'Há 2 horas' },
    { id: 3, dispositivo: 'Firefox em Linux', local: 'Benguela', quando: 'Há 5 dias' },
  ]);
  protected readonly aviso = signal('');

  protected alternarDoisPassos(ligado: boolean): void {
    this.doisPassos.set(ligado);
    this.aviso.set(ligado ? 'Verificação em dois passos ligada.' : 'Verificação em dois passos desligada.');
  }

  protected terminar(s: Sessao): void {
    this.sessoes.update((l) => l.filter((x) => x.id !== s.id));
    this.aviso.set(`Sessão terminada: ${s.dispositivo}, ${s.local}.`);
  }

  protected terminarOutras(): void {
    const n = this.sessoes().filter((s) => !s.actual).length;
    this.sessoes.update((l) => l.filter((s) => s.actual));
    this.aviso.set(n === 1 ? '1 sessão terminada.' : `${n} sessões terminadas.`);
  }

  protected eliminarConta(): void {
    const ref = this.dialog.open<boolean>(this.confirmacao(), { size: 'sm', role: 'alertdialog' });
    ref.closed.subscribe((sim) => {
      // aqui farias o pedido ao servidor e terminarias a sessão
      if (sim) this.aviso.set('Pedido de eliminação enviado. Vais receber um e-mail para confirmar.');
    });
  }
}
