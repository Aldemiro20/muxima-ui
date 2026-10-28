import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxSeparator } from '@muxima-ui/core/separator';

/** Um só plano: o que inclui de um lado, o preço e a acção do outro. */
@Component({
  selector: 'app-pricing-unico',
  imports: [MxButton, MxSeparator],
  templateUrl: './pricing-unico.html',
  styleUrl: './pricing-unico.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingUnico {
  protected readonly inclui = [
    'Facturação e recibos',
    'Stock e armazéns',
    'Clientes e fornecedores',
    'Relatórios e mapa de IVA',
    'Utilizadores ilimitados',
    'Cópias de segurança diárias',
    'Actualizações incluídas',
    'Suporte em português',
  ];
}
