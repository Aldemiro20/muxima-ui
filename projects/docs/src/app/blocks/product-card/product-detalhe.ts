import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxRating } from '@muxima-ui/core/rating';

/** Página de um produto: imagens, tamanho, quantidade e adicionar ao carrinho. */
@Component({
  selector: 'app-product-detalhe',
  imports: [MxButton, MxRating],
  templateUrl: './product-detalhe.html',
  styleUrl: './product-detalhe.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetalhe {
  /** Imagens de exemplo (cores); troca por URLs de fotografias. */
  protected readonly imagens = [
    { cor: '#1f5e63', alt: 'Camisa de pano, de frente' },
    { cor: '#2a7a80', alt: 'Camisa de pano, de costas' },
    { cor: '#164548', alt: 'Pormenor do padrão do tecido' },
  ];
  protected readonly imagem = signal(0);

  protected readonly tamanhos = [
    { valor: 'S', disponivel: true },
    { valor: 'M', disponivel: true },
    { valor: 'L', disponivel: true },
    { valor: 'XL', disponivel: false },
  ];
  protected readonly tamanho = signal<string | null>(null);
  protected readonly quantidade = signal(1);
  protected readonly erro = signal('');
  protected readonly aviso = signal('');

  private readonly precoUnitario = 18500;
  private readonly kz = new Intl.NumberFormat('pt-AO');
  protected readonly preco = this.kz.format(this.precoUnitario) + ' Kz';
  protected readonly total = computed(() => this.kz.format(this.precoUnitario * this.quantidade()) + ' Kz');

  protected mudarQuantidade(delta: number): void {
    this.quantidade.update((q) => Math.min(10, Math.max(1, q + delta)));
  }
  protected escreverQuantidade(texto: string): void {
    const n = Number(texto);
    if (Number.isInteger(n)) this.quantidade.set(Math.min(10, Math.max(1, n)));
  }

  protected adicionar(): void {
    if (!this.tamanho()) {
      this.erro.set('Escolhe um tamanho.');
      return;
    }
    this.erro.set('');
    this.aviso.set(`Adicionado ao carrinho: ${this.quantidade()} × camisa de pano, tamanho ${this.tamanho()}.`);
  }
}
