import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';

/**
 * Hero com imagem ao lado. A "imagem" aqui é um painel desenhado em HTML;
 * troca-a por um <img> com o teu produto (e um alt que diga o que mostra).
 */
@Component({
  selector: 'app-hero-imagem',
  imports: [MxButton],
  templateUrl: './hero-imagem.html',
  styleUrl: './hero-imagem.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroImagem {
  protected readonly vantagens = [
    'Facturas e recibos em segundos',
    'Stock actualizado em cada venda',
    'Relatório de IVA pronto no fim do mês',
  ];
  /** Vendas dos últimos 7 dias, em % da maior. */
  protected readonly barras = [42, 58, 51, 76, 64, 88, 100];
}
