import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MxInput } from '@muxima-ui/core/form-field';

interface Artigo {
  titulo: string;
  tema: string;
}

/** Artigos de exemplo; no teu projecto vêm da pesquisa do servidor. */
const ARTIGOS: Artigo[] = [
  { titulo: 'Como emitir uma factura-recibo', tema: 'Facturas' },
  { titulo: 'Anular uma factura com nota de crédito', tema: 'Facturas' },
  { titulo: 'Enviar facturas por WhatsApp', tema: 'Facturas' },
  { titulo: 'Taxas de IVA e isenções', tema: 'IVA' },
  { titulo: 'Exportar o SAF-T para a AGT', tema: 'IVA' },
  { titulo: 'Convidar pessoas para a equipa', tema: 'Conta' },
  { titulo: 'Mudar o plano ou o método de pagamento', tema: 'Conta' },
];

/** Abertura de um centro de ajuda: pesquisa, temas populares e resultados. */
@Component({
  selector: 'app-hero-pesquisa',
  imports: [MxButton, MxInput],
  templateUrl: './hero-pesquisa.html',
  styleUrl: './hero-pesquisa.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroPesquisa {
  protected readonly temas = ['Facturas', 'IVA', 'Conta'];
  protected readonly texto = signal('');
  /** O que foi pesquisado (ao submeter ou ao escolher um tema). */
  protected readonly pesquisado = signal('');

  protected readonly resultados = computed(() => {
    const q = normalizar(this.pesquisado());
    if (!q) return [];
    return ARTIGOS.filter((a) => normalizar(`${a.titulo} ${a.tema}`).includes(q));
  });

  protected pesquisar(event: Event): void {
    event.preventDefault();
    this.pesquisado.set(this.texto().trim());
  }

  protected escolherTema(tema: string): void {
    this.texto.set(tema);
    this.pesquisado.set(tema);
  }
}

function normalizar(t: string): string {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}
