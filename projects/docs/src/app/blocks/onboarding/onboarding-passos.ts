import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxProgress } from '@muxima-ui/core/progress';
import { MxTour, MxTourAnchor } from '@muxima-ui/core/tour';

interface Passo {
  id: string;
  titulo: string;
  descricao: string;
  accao: string;
  feito: boolean;
}

/** Lista de primeiros passos com progresso, e uma visita guiada que explica a lista. */
@Component({
  selector: 'app-onboarding-passos',
  imports: [MxButton, MxProgress, MxTourAnchor],
  templateUrl: './onboarding-passos.html',
  styleUrl: './onboarding-passos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingPassos {
  private readonly tour = inject(MxTour);

  protected readonly passos = signal<Passo[]>([
    {
      id: 'empresa',
      titulo: 'Dados da empresa',
      descricao: 'NIF, morada e logótipo, para aparecerem nas facturas.',
      accao: 'Preencher',
      feito: true,
    },
    {
      id: 'cliente',
      titulo: 'Primeiro cliente',
      descricao: 'Importa uma lista ou cria um cliente à mão.',
      accao: 'Adicionar cliente',
      feito: false,
    },
    {
      id: 'factura',
      titulo: 'Primeira factura',
      descricao: 'Emite e envia por e-mail ou WhatsApp.',
      accao: 'Criar factura',
      feito: false,
    },
    {
      id: 'banco',
      titulo: 'Dados bancários',
      descricao: 'O IBAN aparece na factura para o cliente pagar.',
      accao: 'Adicionar IBAN',
      feito: false,
    },
    {
      id: 'equipa',
      titulo: 'Convidar a equipa',
      descricao: 'Dá acesso a quem trabalha contigo.',
      accao: 'Convidar',
      feito: false,
    },
  ]);
  protected readonly feitos = computed(() => this.passos().filter((p) => p.feito).length);
  protected readonly percentagem = computed(() =>
    Math.round((this.feitos() / this.passos().length) * 100),
  );
  protected readonly proximo = computed(() => this.passos().find((p) => !p.feito));
  protected readonly escondida = signal(false);
  protected readonly aviso = signal('');

  protected concluir(p: Passo): void {
    // no teu projecto, a acção abre o ecrã certo; aqui marca-se logo como feito
    this.passos.update((l) => l.map((x) => (x.id === p.id ? { ...x, feito: true } : x)));
    const falta = this.passos().length - this.feitos();
    this.aviso.set(
      falta ? `${p.titulo}: feito. Faltam ${falta}.` : 'Tudo pronto. Já podes facturar.',
    );
  }

  protected recomecar(): void {
    this.passos.update((l) => l.map((x, i) => ({ ...x, feito: i === 0 })));
    this.escondida.set(false);
    this.aviso.set('');
  }

  protected explicar(): void {
    this.tour.start([
      {
        target: 'ob-passos-progresso',
        title: 'O teu progresso',
        content: 'Mostra quantos passos já fizeste.',
      },
      {
        target: 'ob-passos-proximo',
        title: 'Próximo passo',
        content: 'Começa sempre pelo primeiro que falta.',
      },
      {
        target: 'ob-passos-esconder',
        title: 'Esconder a lista',
        content: 'Quando não precisares dela, esconde-a. Volta no menu Ajuda.',
      },
    ]);
  }
}
