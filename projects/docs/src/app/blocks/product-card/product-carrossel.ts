import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxCarousel, MxCarouselSlide } from '@muxima-ui/core/carousel';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  /** Cor de fundo da imagem de exemplo; troca por um <img> com a fotografia. */
  cor: string;
}

/** Fila de produtos que desliza, com 1 a 4 por vista conforme a largura. */
@Component({
  selector: 'app-product-carrossel',
  imports: [MxButton, MxCarousel, MxCarouselSlide],
  templateUrl: './product-carrossel.html',
  styleUrl: './product-carrossel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCarrossel {
  protected readonly produtos: Produto[] = [
    { id: 1, nome: 'Café do Uíge, 500 g', preco: 4.5, cor: '#7a4a2a' },
    { id: 2, nome: 'Caneca de barro', preco: 3.2, cor: '#b8693d' },
    { id: 3, nome: 'Caderno com capa de pano', preco: 2.24, cor: '#1f5e63' },
    { id: 4, nome: 'Saco de pano estampado', preco: 5.5, cor: '#8c2f39' },
    { id: 5, nome: 'Mel de Malanje, 250 g', preco: 3.9, cor: '#a8781f' },
    { id: 6, nome: 'Cesto de palha', preco: 7.8, cor: '#6b6a3a' },
    { id: 7, nome: 'Vela de cera de abelha', preco: 2.6, cor: '#5a4b7a' },
  ];

  /** Quantos cabem à vista, conforme a largura do bloco. */
  protected readonly porVista = signal(3);
  protected readonly adicionados = signal<ReadonlySet<number>>(new Set());
  protected readonly aviso = signal('');

  private readonly usd = new Intl.NumberFormat('pt-AO', { style: 'currency', currency: 'USD' });
  protected preco(v: number): string {
    return this.usd.format(v);
  }

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroy = inject(DestroyRef);
    afterNextRender(() => {
      const ajustar = () => {
        const w = host.clientWidth;
        this.porVista.set(w < 480 ? 1 : w < 760 ? 2 : w < 1040 ? 3 : 4);
      };
      const observer = new ResizeObserver(ajustar);
      observer.observe(host);
      destroy.onDestroy(() => observer.disconnect());
    });
  }

  protected adicionar(p: Produto): void {
    this.adicionados.update((s) => new Set(s).add(p.id));
    this.aviso.set(`${p.nome} adicionado ao carrinho.`);
  }
}
