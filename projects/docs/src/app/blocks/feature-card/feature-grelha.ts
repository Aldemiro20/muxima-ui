import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxCard, MxCardDescription, MxCardHeader, MxCardTitle } from '@muxima-ui/core/card';

interface Funcionalidade {
  titulo: string;
  texto: string;
  /** Caminho SVG de 16 × 16, desenhado com traço. */
  icone: string;
}

/** Grelha de funcionalidades: 1, 2 ou 3 colunas conforme o espaço. */
@Component({
  selector: 'app-feature-grelha',
  imports: [MxCard, MxCardHeader, MxCardTitle, MxCardDescription],
  templateUrl: './feature-grelha.html',
  styleUrl: './feature-grelha.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureGrelha {
  protected readonly funcionalidades: Funcionalidade[] = [
    {
      titulo: 'Facturação',
      texto: 'Facturas, recibos e notas de crédito com numeração automática e envio por e-mail.',
      icone: 'M4 1.5h6l3 3v10H4zM10 1.5v3h3M6 8h5M6 11h5',
    },
    {
      titulo: 'Stock',
      texto: 'Entradas, saídas e alertas quando um artigo está a acabar, em vários armazéns.',
      icone: 'M2 5l6-3 6 3v6l-6 3-6-3zM2 5l6 3 6-3M8 8v6',
    },
    {
      titulo: 'Clientes',
      texto: 'Histórico de compras, contactos e saldo em dívida de cada cliente.',
      icone: 'M6 7a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.5 14c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4M11 2.5a2.5 2.5 0 010 4.5M12.5 10c1.3.5 2 1.8 2 4',
    },
    {
      titulo: 'Relatórios',
      texto: 'Vendas por mês, por produto e por vendedor, e o mapa de IVA pronto a entregar.',
      icone: 'M2 14h12M4 11V8M7 11V4M10 11V6M13 11V2',
    },
    {
      titulo: 'Equipa',
      texto: 'Permissões por pessoa: quem vende, quem vê os relatórios e quem aprova.',
      icone: 'M8 1.5l5.5 2v4c0 3.5-2.5 6-5.5 7-3-1-5.5-3.5-5.5-7v-4zM5.5 8l2 2 3-3.5',
    },
    {
      titulo: 'Em qualquer lado',
      texto: 'No computador, no tablet ou no telemóvel, com os dados sempre sincronizados.',
      icone: 'M5 1.5h6a1 1 0 011 1v11a1 1 0 01-1 1H5a1 1 0 01-1-1v-11a1 1 0 011-1zM7 12.5h2',
    },
  ];
}
