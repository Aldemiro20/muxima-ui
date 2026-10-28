import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxTable } from '@muxima-ui/core/table';

/** true/false: incluído ou não; texto: o valor (por exemplo "5" utilizadores). */
type Valor = boolean | string;

interface Linha {
  nome: string;
  valores: [Valor, Valor, Valor];
}

interface Grupo {
  nome: string;
  linhas: Linha[];
}

/** Comparação de planos numa tabela, com grupos de linhas. */
@Component({
  selector: 'app-pricing-comparacao',
  imports: [MxTable, MxButton],
  templateUrl: './pricing-comparacao.html',
  styleUrl: './pricing-comparacao.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingComparacao {
  protected readonly planos = [
    { nome: 'Básico', preco: '9 900 Kz' },
    { nome: 'Profissional', preco: '24 900 Kz' },
    { nome: 'Empresa', preco: '59 900 Kz' },
  ];

  protected readonly grupos: Grupo[] = [
    {
      nome: 'Vendas',
      linhas: [
        { nome: 'Facturas e recibos', valores: [true, true, true] },
        { nome: 'Notas de crédito', valores: [true, true, true] },
        { nome: 'Lembretes de cobrança', valores: [false, true, true] },
        { nome: 'Pagamento por referência', valores: [false, true, true] },
      ],
    },
    {
      nome: 'Gestão',
      linhas: [
        { nome: 'Utilizadores', valores: ['1', '5', 'Ilimitados'] },
        { nome: 'Armazéns', valores: ['1', '2', 'Ilimitados'] },
        { nome: 'Relatório de IVA', valores: [false, true, true] },
        { nome: 'Permissões por departamento', valores: [false, false, true] },
      ],
    },
    {
      nome: 'Apoio',
      linhas: [
        { nome: 'Suporte', valores: ['E-mail', 'E-mail e telefone', 'Gestor dedicado'] },
        { nome: 'Formação da equipa', valores: [false, false, true] },
      ],
    },
  ];

  protected tipo(v: Valor): 'sim' | 'nao' | 'texto' {
    return v === true ? 'sim' : v === false ? 'nao' : 'texto';
  }
}
