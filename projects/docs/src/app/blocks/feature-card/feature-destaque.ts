import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';

/** Uma funcionalidade em destaque: texto, vantagens e uma ilustração ao lado. */
@Component({
  selector: 'app-feature-destaque',
  imports: [MxBadge, MxButton],
  templateUrl: './feature-destaque.html',
  styleUrl: './feature-destaque.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureDestaque {
  protected readonly vantagens = [
    { titulo: 'Lembretes automáticos', texto: 'O cliente recebe um aviso 3 dias antes e no dia do vencimento.' },
    { titulo: 'Pagamento por referência', texto: 'Cada factura leva a sua referência; quando é paga, fica marcada sozinha.' },
    { titulo: 'Saldo de cada cliente', texto: 'Vês quem deve, quanto e há quanto tempo, numa só lista.' },
  ];
  protected readonly linhas = [
    { cliente: 'Huíla Agro', valor: '350 000 Kz', estado: 'Paga' },
    { cliente: 'Lobito Portos', valor: '1 240 000 Kz', estado: 'Lembrete enviado' },
    { cliente: 'Uíge Café', valor: '87 500 Kz', estado: 'Paga' },
  ];
}
