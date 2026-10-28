import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { MxAvatar } from '@muxima-ui/core/avatar';
import { MxButton } from '@muxima-ui/core/button';
import { MxInput } from '@muxima-ui/core/form-field';
import { MX_SIDEBAR } from '@muxima-ui/core/sidebar';

interface Item {
  id: string;
  nome: string;
  /** Caminho SVG (viewBox 0 0 16 16). */
  icone: string;
  contagem?: number;
}

/** Estrutura de uma aplicação: barra lateral que recolhe e barra de topo com pesquisa. */
@Component({
  selector: 'app-navbar-lateral',
  imports: [MxAvatar, MxButton, MxInput, MX_SIDEBAR],
  templateUrl: './navbar-lateral.html',
  styleUrl: './navbar-lateral.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarLateral {
  protected readonly gestao: Item[] = [
    { id: 'inicio', nome: 'Início', icone: 'M2.5 7.5L8 3l5.5 4.5V13H10V9.5H6V13H2.5z' },
    { id: 'facturas', nome: 'Facturas', icone: 'M4 2h6l2.5 2.5V14H4zM6.5 7h4M6.5 9.5h4', contagem: 3 },
    { id: 'clientes', nome: 'Clientes', icone: 'M8 7.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM3 13.5c.5-2.5 2.5-4 5-4s4.5 1.5 5 4' },
    { id: 'stock', nome: 'Stock', icone: 'M2.5 5L8 2.5 13.5 5v6L8 13.5 2.5 11zM2.5 5L8 7.5 13.5 5M8 7.5v6' },
  ];
  protected readonly conta: Item[] = [
    { id: 'relatorios', nome: 'Relatórios', icone: 'M3 13V8M7 13V3.5M11 13V6.5M2 13.5h12' },
    { id: 'definicoes', nome: 'Definições', icone: 'M8 10a2 2 0 100-4 2 2 0 000 4zM8 1.8v1.7M8 12.5v1.7M1.8 8h1.7M12.5 8h1.7M3.6 3.6l1.2 1.2M11.2 11.2l1.2 1.2M3.6 12.4l1.2-1.2M11.2 4.8l1.2-1.2' },
  ];
  protected readonly activo = signal('facturas');
  protected readonly recolhida = signal(false);
  constructor() {
    // em ecrãs estreitos a barra começa recolhida, só com os ícones
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    afterNextRender(() => this.recolhida.set(host.clientWidth < 640));
  }

  protected readonly titulo = computed(
    () => [...this.gestao, ...this.conta].find((i) => i.id === this.activo())?.nome ?? '',
  );
}
