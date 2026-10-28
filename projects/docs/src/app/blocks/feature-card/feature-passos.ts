import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';

/** "Como funciona": passos numerados numa lista ordenada. */
@Component({
  selector: 'app-feature-passos',
  imports: [MxButton],
  templateUrl: './feature-passos.html',
  styleUrl: './feature-passos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturePassos {
  protected readonly passos = [
    {
      titulo: 'Cria a conta',
      texto: 'Só precisas do NIF da empresa e de um e-mail. Demora dois minutos.',
    },
    {
      titulo: 'Importa os teus dados',
      texto: 'Clientes e artigos a partir de uma folha de cálculo, ou um a um.',
    },
    {
      titulo: 'Emite a primeira factura',
      texto: 'Escolhe o cliente, junta os artigos e envia. O resto é automático.',
    },
  ];
}
