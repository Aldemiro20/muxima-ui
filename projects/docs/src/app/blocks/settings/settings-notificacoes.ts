import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxCheckbox } from '@muxima-ui/core/checkbox';
import { MxSwitch } from '@muxima-ui/core/switch';

type Canal = 'email' | 'sms' | 'app';

interface Evento {
  id: string;
  nome: string;
  descricao: string;
}

/** Notificações por acontecimento e por canal, numa tabela de caixas. */
@Component({
  selector: 'app-settings-notificacoes',
  imports: [MxButton, MxCheckbox, MxSwitch],
  templateUrl: './settings-notificacoes.html',
  styleUrl: './settings-notificacoes.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNotificacoes {
  protected readonly canais: { id: Canal; nome: string }[] = [
    { id: 'email', nome: 'E-mail' },
    { id: 'sms', nome: 'SMS' },
    { id: 'app', nome: 'Na aplicação' },
  ];
  protected readonly eventos: Evento[] = [
    { id: 'paga', nome: 'Factura paga', descricao: 'Quando um cliente paga.' },
    { id: 'atraso', nome: 'Factura em atraso', descricao: 'No dia seguinte ao vencimento.' },
    { id: 'cliente', nome: 'Novo cliente', descricao: 'Quando alguém da equipa cria um.' },
    { id: 'semanal', nome: 'Resumo semanal', descricao: 'Às segundas, às 8h.' },
  ];

  private readonly inicial = new Set(['paga:email', 'paga:app', 'atraso:email', 'atraso:sms', 'atraso:app', 'semanal:email']);
  protected readonly ligadas = signal<ReadonlySet<string>>(new Set(this.inicial));
  protected readonly silencio = signal(true);
  private readonly guardado = signal<ReadonlySet<string>>(new Set(this.inicial));
  private readonly silencioGuardado = signal(true);
  protected readonly mudou = computed(
    () =>
      this.silencio() !== this.silencioGuardado() ||
      this.ligadas().size !== this.guardado().size ||
      [...this.ligadas()].some((k) => !this.guardado().has(k)),
  );
  protected readonly aviso = signal('');

  protected ligada(e: string, c: Canal): boolean {
    return this.ligadas().has(`${e}:${c}`);
  }

  protected alternar(e: string, c: Canal, ligar: boolean): void {
    this.ligadas.update((s) => {
      const n = new Set(s);
      if (ligar) n.add(`${e}:${c}`);
      else n.delete(`${e}:${c}`);
      return n;
    });
    this.aviso.set('');
  }

  /** Estado da coluna: todas, nenhuma ou algumas (caixa intermédia). */
  protected coluna(c: Canal): 'todas' | 'nenhuma' | 'algumas' {
    const n = this.eventos.filter((e) => this.ligada(e.id, c)).length;
    return n === this.eventos.length ? 'todas' : n === 0 ? 'nenhuma' : 'algumas';
  }

  protected alternarColuna(c: Canal): void {
    const ligar = this.coluna(c) !== 'todas';
    for (const e of this.eventos) this.alternar(e.id, c, ligar);
  }

  protected guardar(event: Event): void {
    event.preventDefault();
    // aqui farias o pedido ao servidor
    this.guardado.set(new Set(this.ligadas()));
    this.silencioGuardado.set(this.silencio());
    this.aviso.set('Preferências de notificação guardadas.');
  }

  protected repor(): void {
    this.ligadas.set(new Set(this.guardado()));
    this.silencio.set(this.silencioGuardado());
    this.aviso.set('Alterações desfeitas.');
  }
}
