import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MxOption, MxSelect } from '@muxima-ui/core/select';
import { MxSwitch } from '@muxima-ui/core/switch';

interface Interruptor {
  id: string;
  titulo: string;
  descricao: string;
  ligado: boolean;
}

/** Linhas de definições: título e descrição à esquerda, o controlo à direita. */
@Component({
  selector: 'app-settings-preferencias',
  imports: [FormsModule, MxSwitch, MxSelect, MxOption],
  templateUrl: './settings-preferencias.html',
  styleUrl: './settings-preferencias.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPreferencias {
  protected readonly interruptores = signal<Interruptor[]>([
    { id: 'email', titulo: 'Avisos por e-mail', descricao: 'Facturas pagas, em atraso e novos clientes.', ligado: true },
    { id: 'resumo', titulo: 'Resumo semanal', descricao: 'Às segundas-feiras, as vendas da semana anterior.', ligado: false },
    { id: 'som', titulo: 'Som nas notificações', descricao: 'Só enquanto a aplicação está aberta.', ligado: true },
  ]);
  protected readonly idioma = signal('pt-AO');
  protected readonly moeda = signal('AOA');
  protected readonly aviso = signal('');

  protected alternar(i: Interruptor, ligado: boolean): void {
    this.interruptores.update((l) => l.map((x) => (x.id === i.id ? { ...x, ligado } : x)));
    // troca por um pedido ao servidor
    this.aviso.set(`${i.titulo}: ${ligado ? 'ligado' : 'desligado'}. Guardado.`);
  }

  protected guardado(o: string): void {
    this.aviso.set(`${o} guardado.`);
  }
}
