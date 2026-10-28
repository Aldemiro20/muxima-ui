import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxInput } from '@muxima-ui/core/form-field';
import { MxTour, MxTourAnchor, MxTourStep } from '@muxima-ui/core/tour';

/** Painel com convite para uma visita guiada pelas partes principais do ecrã. */
@Component({
  selector: 'app-onboarding-visita',
  imports: [MxBadge, MxButton, MxInput, MxTourAnchor],
  templateUrl: './onboarding-visita.html',
  styleUrl: './onboarding-visita.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingVisita {
  private readonly tour = inject(MxTour);

  protected readonly menu = ['Início', 'Facturas', 'Clientes', 'Relatórios'];
  protected readonly activo = signal('Início');
  protected readonly convite = signal(true);
  protected readonly estado = signal('');
  /** Passo onde a visita parou, para continuar a partir daí. */
  private parou = 0;

  private readonly passos: MxTourStep[] = [
    {
      title: 'Bem-vindo à Kianda',
      content: 'Em cinco passos mostramos onde está tudo. Podes saltar quando quiseres.',
    },
    {
      target: 'ob-menu',
      title: 'Menu',
      content: 'Facturas, clientes e relatórios, sempre à mão.',
      placement: 'end',
    },
    {
      target: 'ob-pesquisa',
      title: 'Pesquisa',
      content: 'Encontra um cliente ou uma factura pelo nome, número ou valor.',
    },
    {
      target: 'ob-nova',
      title: 'Nova factura',
      content: 'O ponto de partida do dia a dia. Os dados do cliente preenchem-se sozinhos.',
    },
    {
      target: 'ob-resumo',
      title: 'Resumo',
      content: 'O que tens por receber, o que está em atraso e o que recebeste este mês.',
    },
    {
      target: 'ob-ajuda',
      title: 'Ajuda',
      content: 'Podes repetir esta visita aqui, sempre que quiseres.',
    },
  ];

  protected comecar(): void {
    this.convite.set(false);
    this.estado.set('');
    this.tour
      .start(this.passos, { startAt: this.parou })
      .afterClosed.then((r) => {
        this.parou = r.completed ? 0 : r.index;
        this.estado.set(
          r.completed
            ? 'Visita concluída. Podes repeti-la no botão Ajuda.'
            : `Visita interrompida no passo ${r.index + 1}. O botão Ajuda continua daí.`,
        );
      });
  }

  protected dispensar(): void {
    this.convite.set(false);
    this.estado.set('Podes fazer a visita quando quiseres, no botão Ajuda.');
  }
}
