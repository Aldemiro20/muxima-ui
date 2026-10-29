import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxTab, MxTabs } from '@muxima-ui/core/tabs';

interface Area {
  nome: string;
  titulo: string;
  texto: string;
  pontos: string[];
  linhas: { rotulo: string; valor: string }[];
}

/** Funcionalidades agrupadas por área, uma por separador, com uma pré-visualização ao lado. */
@Component({
  selector: 'app-feature-separadores',
  imports: [MxButton, MxTabs, MxTab],
  templateUrl: './feature-separadores.html',
  styleUrl: './feature-separadores.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureSeparadores {
  protected readonly areas: Area[] = [
    {
      nome: 'Facturação',
      titulo: 'Facturas certas à primeira',
      texto: 'Numeração, IVA e retenções calculados por ti, prontos para a AGT.',
      pontos: ['Factura, factura-recibo e nota de crédito', 'Envio por e-mail e WhatsApp', 'Lembretes de cobrança automáticos'],
      linhas: [
        { rotulo: 'FT 2026/00241', valor: '250 US$' },
        { rotulo: 'FR 2026/00118', valor: '84,50 US$' },
        { rotulo: 'NC 2026/00012', valor: '−12 US$' },
      ],
    },
    {
      nome: 'Stock',
      titulo: 'Sabes sempre o que tens',
      texto: 'Entradas, saídas e transferências entre armazéns, com alertas de mínimo.',
      pontos: ['Vários armazéns', 'Inventário com leitor de código de barras', 'Aviso quando um artigo está a acabar'],
      linhas: [
        { rotulo: 'Café do Uíge, 500 g', valor: '124 un.' },
        { rotulo: 'Camisa de pano', valor: '8 un.' },
        { rotulo: 'Caneca de barro', valor: '0 un.' },
      ],
    },
    {
      nome: 'Relatórios',
      titulo: 'Os números do mês num ecrã',
      texto: 'Vendas, IVA a entregar e cobranças, por período, cliente ou produto.',
      pontos: ['Mapa de IVA pronto a entregar', 'Exportação para Excel e SAF-T', 'Comparação com o mês anterior'],
      linhas: [
        { rotulo: 'Vendas de Outubro', valor: '18,4 mil US$' },
        { rotulo: 'IVA a entregar', valor: '2 261 US$' },
        { rotulo: 'Por cobrar', valor: '4 820 US$' },
      ],
    },
  ];
}
