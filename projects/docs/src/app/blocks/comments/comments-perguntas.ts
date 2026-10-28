import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxError, MxFormField, MxHint, MxInput, MxLabel } from '@muxima-ui/core/form-field';

interface Pergunta {
  id: number;
  texto: string;
  autor: string;
  quando: string;
  resposta?: { texto: string; quando: string };
  uteis: number;
  util: boolean;
}

const MINIMO = 10;

/** Perguntas e respostas de um produto: pesquisa, útil, resposta do vendedor e nova pergunta. */
@Component({
  selector: 'app-comments-perguntas',
  imports: [MxBadge, MxButton, MxFormField, MxLabel, MxInput, MxHint, MxError],
  templateUrl: './comments-perguntas.html',
  styleUrl: './comments-perguntas.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsPerguntas {
  /** Exemplos fictícios. */
  protected readonly perguntas = signal<Pergunta[]>([
    {
      id: 1,
      texto: 'O café é moído fino o suficiente para máquina de expresso?',
      autor: 'Nádia',
      quando: 'há 3 dias',
      resposta: { texto: 'Sim, a moagem fina serve para expresso. Para cafeteira italiana, escolhe a média.', quando: 'há 2 dias' },
      uteis: 14,
      util: false,
    },
    {
      id: 2,
      texto: 'Fazem entregas no Lobito?',
      autor: 'Hélder',
      quando: 'há 1 semana',
      resposta: { texto: 'Fazemos, em 3 a 5 dias úteis, pelo mesmo preço de Luanda.', quando: 'há 6 dias' },
      uteis: 9,
      util: false,
    },
    {
      id: 3,
      texto: 'Qual é a validade depois de aberto?',
      autor: 'Isabel',
      quando: 'há 2 semanas',
      uteis: 2,
      util: false,
    },
  ]);
  protected readonly filtro = signal('');
  protected readonly visiveis = computed(() => {
    const q = this.filtro().trim().toLowerCase();
    return [...this.perguntas()]
      .filter((p) => !q || `${p.texto} ${p.resposta?.texto ?? ''}`.toLowerCase().includes(q))
      .sort((a, b) => b.uteis - a.uteis);
  });

  protected readonly minimo = MINIMO;
  protected readonly nova = signal('');
  protected readonly erro = signal('');
  protected readonly aviso = signal('');
  private proximo = 100;

  protected alternarUtil(p: Pergunta): void {
    this.perguntas.update((l) =>
      l.map((x) => (x.id === p.id ? { ...x, util: !x.util, uteis: x.uteis + (x.util ? -1 : 1) } : x)),
    );
  }

  protected perguntar(event: Event): void {
    event.preventDefault();
    const texto = this.nova().trim();
    if (texto.length < MINIMO) {
      this.erro.set(`Escreve a pergunta com pelo menos ${MINIMO} caracteres.`);
      return;
    }
    this.perguntas.update((l) => [
      { id: ++this.proximo, texto, autor: 'Tu', quando: 'agora', uteis: 0, util: false },
      ...l,
    ]);
    this.nova.set('');
    this.erro.set('');
    this.filtro.set('');
    this.aviso.set('Pergunta enviada. Avisamos-te quando o vendedor responder.');
  }
}
