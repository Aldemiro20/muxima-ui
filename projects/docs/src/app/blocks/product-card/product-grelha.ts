import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';
import { MxRating } from '@muxima-ui/core/rating';

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  precoAntes?: number;
  avaliacao: number;
  avaliacoes: number;
  /** Cor de fundo da imagem de exemplo; troca por um <img> com a fotografia. */
  cor: string;
}

/** Grelha de produtos com favorito, avaliação, preço e adicionar ao carrinho. */
@Component({
  selector: 'app-product-grelha',
  imports: [MxBadge, MxButton, MxRating],
  templateUrl: './product-grelha.html',
  styleUrl: './product-grelha.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGrelha {
  protected readonly produtos: Produto[] = [
    { id: 1, nome: 'Café do Uíge, 500 g', categoria: 'Mercearia', preco: 4500, avaliacao: 4.5, avaliacoes: 124, cor: '#7a4a2a' },
    { id: 2, nome: 'Caneca de barro', categoria: 'Casa', preco: 3200, avaliacao: 4, avaliacoes: 38, cor: '#b8693d' },
    { id: 3, nome: 'Caderno com capa de pano', categoria: 'Papelaria', preco: 2240, precoAntes: 2800, avaliacao: 5, avaliacoes: 12, cor: '#1f5e63' },
    { id: 4, nome: 'Saco de pano estampado', categoria: 'Acessórios', preco: 5500, avaliacao: 3.5, avaliacoes: 7, cor: '#8c2f39' },
  ];

  protected readonly favoritos = signal<ReadonlySet<number>>(new Set());
  protected readonly carrinho = signal<ReadonlyMap<number, number>>(new Map());
  protected readonly totalArtigos = computed(() => [...this.carrinho().values()].reduce((a, n) => a + n, 0));
  protected readonly aviso = signal('');

  private readonly kz = new Intl.NumberFormat('pt-AO');
  protected preco(v: number): string {
    return this.kz.format(v) + ' Kz';
  }
  protected desconto(p: Produto): number {
    return p.precoAntes ? Math.round((1 - p.preco / p.precoAntes) * 100) : 0;
  }

  protected alternarFavorito(p: Produto): void {
    const f = new Set(this.favoritos());
    if (f.has(p.id)) f.delete(p.id);
    else f.add(p.id);
    this.favoritos.set(f);
    this.aviso.set(f.has(p.id) ? `${p.nome} guardado nos favoritos.` : `${p.nome} retirado dos favoritos.`);
  }

  protected adicionar(p: Produto): void {
    const c = new Map(this.carrinho());
    c.set(p.id, (c.get(p.id) ?? 0) + 1);
    this.carrinho.set(c);
    this.aviso.set(`${p.nome} adicionado ao carrinho. ${this.totalArtigos()} artigos no carrinho.`);
  }
}
