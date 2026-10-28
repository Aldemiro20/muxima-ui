import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxBadge } from '@muxima-ui/core/badge';
import { MxButton } from '@muxima-ui/core/button';

interface Plano {
  nome: string;
  descricao: string;
  /** Preço mensal em Kz. */
  mensal: number;
  inclui: string[];
  recomendado?: boolean;
}

/** Três planos com pagamento mensal ou anual (dois meses grátis no anual). */
@Component({
  selector: 'app-pricing-planos',
  imports: [MxBadge, MxButton],
  templateUrl: './pricing-planos.html',
  styleUrl: './pricing-planos.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPlanos {
  protected readonly periodo = signal<'mensal' | 'anual'>('anual');

  protected readonly planos: Plano[] = [
    {
      nome: 'Básico',
      descricao: 'Para quem está a começar.',
      mensal: 9900,
      inclui: ['1 utilizador', 'Facturas e recibos ilimitados', 'Até 200 clientes', 'Suporte por e-mail'],
    },
    {
      nome: 'Profissional',
      descricao: 'Para equipas que vendem todos os dias.',
      mensal: 24900,
      recomendado: true,
      inclui: ['5 utilizadores', 'Tudo o que tem o Básico', 'Stock em 2 armazéns', 'Lembretes de cobrança', 'Relatório de IVA'],
    },
    {
      nome: 'Empresa',
      descricao: 'Para várias lojas e departamentos.',
      mensal: 59900,
      inclui: ['Utilizadores ilimitados', 'Tudo o que tem o Profissional', 'Armazéns ilimitados', 'Permissões por departamento', 'Gestor de conta dedicado'],
    },
  ];

  private readonly kz = new Intl.NumberFormat('pt-AO');

  /** Preço por mês a mostrar: no anual, 10 meses a dividir por 12. */
  protected precoMes(p: Plano): string {
    const v = this.periodo() === 'anual' ? Math.round((p.mensal * 10) / 12 / 100) * 100 : p.mensal;
    return this.kz.format(v) + ' Kz';
  }
  protected precoAno(p: Plano): string {
    return this.kz.format(p.mensal * 10) + ' Kz';
  }

  protected readonly aviso = computed(() =>
    this.periodo() === 'anual' ? 'Preços com pagamento anual: dois meses grátis.' : 'Preços com pagamento mensal.',
  );
}
