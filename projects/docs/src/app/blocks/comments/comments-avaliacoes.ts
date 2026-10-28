import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxChipToggle } from '@muxima-ui/core/chips';
import { MxProgress } from '@muxima-ui/core/progress';
import { MxRating } from '@muxima-ui/core/rating';

interface Avaliacao {
  id: number;
  autor: string;
  estrelas: number;
  data: string;
  quando: string;
  texto: string;
  uteis: number;
  util: boolean;
}

/**
 * Avaliações de um produto: média, distribuição e lista filtrável.
 * Os nomes e os textos são fictícios: mostra só avaliações reais dos teus clientes.
 */
@Component({
  selector: 'app-comments-avaliacoes',
  imports: [MxAvatar, MxChipToggle, MxProgress, MxRating],
  templateUrl: './comments-avaliacoes.html',
  styleUrl: './comments-avaliacoes.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsAvaliacoes {
  protected readonly avaliacoes = signal<Avaliacao[]>([
    { id: 1, autor: 'Cliente A.', estrelas: 5, data: '2026-10-20', quando: '20 out 2026', texto: 'Chegou no dia seguinte e bem embalado. O café tem um aroma forte e não é amargo.', uteis: 4, util: false },
    { id: 2, autor: 'Cliente B.', estrelas: 4, data: '2026-10-14', quando: '14 out 2026', texto: 'Muito bom. Só achei o pacote de 500 g pequeno para o preço.', uteis: 2, util: false },
    { id: 3, autor: 'Cliente C.', estrelas: 5, data: '2026-10-02', quando: '2 out 2026', texto: 'Compro todos os meses. Moído na medida certa para a cafeteira.', uteis: 1, util: false },
    { id: 4, autor: 'Cliente D.', estrelas: 2, data: '2026-09-28', quando: '28 set 2026', texto: 'O sabor é bom, mas a entrega atrasou três dias.', uteis: 0, util: false },
  ]);
  protected readonly filtro = signal(0);

  protected readonly media = computed(() => {
    const l = this.avaliacoes();
    return l.length ? l.reduce((a, x) => a + x.estrelas, 0) / l.length : 0;
  });
  protected readonly mediaTexto = computed(() =>
    this.media().toLocaleString('pt-AO', { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
  );
  protected readonly distribuicao = computed(() =>
    [5, 4, 3, 2, 1].map((n) => ({ n, total: this.avaliacoes().filter((a) => a.estrelas === n).length })),
  );
  protected readonly visiveis = computed(() =>
    this.filtro() ? this.avaliacoes().filter((a) => a.estrelas === this.filtro()) : this.avaliacoes(),
  );

  protected marcarUtil(a: Avaliacao): void {
    this.avaliacoes.update((l) =>
      l.map((x) => (x.id === a.id ? { ...x, util: !x.util, uteis: x.uteis + (x.util ? -1 : 1) } : x)),
    );
  }
}
