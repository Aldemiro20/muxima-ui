import { MxAvatar } from '@muxima-ui/core/avatar';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MxButton } from '@muxima-ui/core/button';
import { MX_MENU } from '@muxima-ui/core/menu';
import { MxSeparator } from '@muxima-ui/core/separator';
import { MxToast } from '@muxima-ui/core/toast';
import { ApiRow, DOC_UI } from '../../ui/doc-ui';
import { Icon } from '../../ui/icon';

@Component({
  selector: 'doc-dropdown-menu-page',
  imports: [DOC_UI, MX_MENU, MxButton, MxSeparator, Icon, MxAvatar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="doc-page">
      <doc-page-header
        [crumbs]="[{ label: 'Componentes', path: '/componentes' }, { label: 'Dropdown menu' }]"
        title="Dropdown menu"
        lead="Lista de acções aberta por um botão, segundo o padrão WAI-ARIA Menu Button. Construído sobre o @angular/cdk/menu: setas, pesquisa por letra e Escape vêm incluídos."
      />

      <section>
        <h2>Pré-visualização</h2>
        <doc-preview [code]="previewCode" label="Exemplo de menu">
          <button mxButton type="button" variant="outline" [mxMenuTriggerFor]="accoes">
            Acções <doc-icon name="chevronRight" class="rot-90" />
          </button>
          <ng-template #accoes>
            <div mxMenu>
              <button mxMenuItem (mxMenuItemTriggered)="say('Editar')"><doc-icon name="file" /> Editar</button>
              <button mxMenuItem (mxMenuItemTriggered)="say('Duplicar')"><doc-icon name="copy" /> Duplicar <span class="mx-menu-shortcut">Ctrl D</span></button>
              <button mxMenuItem disabled><doc-icon name="external" /> Partilhar (Pro)</button>
              <hr mxSeparator />
              <button mxMenuItem variant="destructive" (mxMenuItemTriggered)="say('Eliminar')"><doc-icon name="x" /> Eliminar</button>
            </div>
          </ng-template>
        </doc-preview>
      </section>

      <section>
        <h2>Instalação</h2>
        <doc-code code="import { MX_MENU } from '@muxima-ui/core/menu';" />
      </section>

      <section>
        <h2>Estrutura</h2>
        <p>O menu vive num ng-template e só é criado quando abre.</p>
        <doc-structure [labels]="{ topLeft: 'Botão com aria-haspopup', topRight: 'Sombra de sobreposição', bottomLeft: 'Opção de 32 px', bottomRight: 'Raio de 10 px', bottom: 'role=menu com role=menuitem' }">
          <div class="mx-menu mini-menu" aria-hidden="true"><span class="mx-menu-item">Editar</span><span class="mx-menu-item" data-variant="destructive">Eliminar</span></div>
        </doc-structure>
      </section>

      <section>
        <h2>Estados</h2>
        <p>Estados de cada opção do menu.</p>
        <doc-states>
          <doc-state name="Normal"><div class="mx-menu mini-menu"><span class="mx-menu-item">Editar</span></div></doc-state>
          <doc-state name="Hover e foco" note="Fundo suave; o teclado move o foco."><div class="mx-menu mini-menu"><span class="mx-menu-item" data-mx-state="hover">Editar</span></div></doc-state>
          <doc-state name="Desactivado" note="Saltado pelas setas."><div class="mx-menu mini-menu"><span class="mx-menu-item" data-disabled>Partilhar</span></div></doc-state>
          <doc-state name="Destrutivo" note="variant=destructive"><div class="mx-menu mini-menu"><span class="mx-menu-item" data-variant="destructive">Eliminar</span></div></doc-state>
          <doc-state name="Marcado" note="mxMenuItemCheckbox"><div class="mx-menu mini-menu"><span class="mx-menu-item" data-checkable data-checked>Mostrar IVA</span></div></doc-state>
        </doc-states>
      </section>

      <section>
        <h2>Exemplos</h2>
        <div class="grid-2">
          <doc-example title="Opções que se ligam e desligam" note="role=menuitemcheckbox e menuitemradio.">
            <button mxButton type="button" variant="outline" [mxMenuTriggerFor]="vista">Vista</button>
            <ng-template #vista>
              <div mxMenu>
                <button mxMenuItemCheckbox [checked]="iva()" (mxMenuItemTriggered)="iva.set(!iva())">Mostrar IVA</button>
                <button mxMenuItemCheckbox [checked]="pagas()" (mxMenuItemTriggered)="pagas.set(!pagas())">Incluir pagas</button>
                <hr mxSeparator />
                <div mxMenuGroup aria-label="Densidade">
                  <span mxMenuLabel>Densidade</span>
                  <button mxMenuItemRadio [checked]="densidade() === 'normal'" (mxMenuItemTriggered)="densidade.set('normal')">Normal</button>
                  <button mxMenuItemRadio [checked]="densidade() === 'compacta'" (mxMenuItemTriggered)="densidade.set('compacta')">Compacta</button>
                </div>
              </div>
            </ng-template>
          </doc-example>
          <doc-example title="Botão só com ícone">
            <button mxButton type="button" variant="ghost" icon aria-label="Mais acções" [mxMenuTriggerFor]="mais"><doc-icon name="menu" /></button>
            <ng-template #mais>
              <div mxMenu>
                <button mxMenuItem>Descarregar PDF</button>
                <button mxMenuItem>Enviar por email</button>
              </div>
            </ng-template>
          </doc-example>
          <doc-example title="Submenu" note="Um item com [mxMenuTriggerFor] abre outro menu; seta para a direita entra, para a esquerda sai.">
            <button mxButton type="button" variant="outline" [mxMenuTriggerFor]="ficheiro">Ficheiro</button>
            <ng-template #ficheiro>
              <div mxMenu>
                <button mxMenuItem (mxMenuItemTriggered)="say('Novo')">Novo <span class="mx-menu-shortcut">Ctrl N</span></button>
                <button mxMenuItem [mxMenuTriggerFor]="exportar">Exportar como</button>
                <hr mxSeparator />
                <button mxMenuItem (mxMenuItemTriggered)="say('Imprimir')">Imprimir <span class="mx-menu-shortcut">Ctrl P</span></button>
              </div>
            </ng-template>
            <ng-template #exportar>
              <div mxMenu>
                <button mxMenuItem (mxMenuItemTriggered)="say('PDF')">PDF</button>
                <button mxMenuItem (mxMenuItemTriggered)="say('Excel')">Excel</button>
                <button mxMenuItem (mxMenuItemTriggered)="say('CSV')">CSV</button>
              </div>
            </ng-template>
          </doc-example>
          <doc-example title="Menu de utilizador" note="O botão com avatar tem nome acessível próprio.">
            <button type="button" class="user-trigger" aria-label="Conta de Ana Kiala" [mxMenuTriggerFor]="conta">
              <mx-avatar name="Ana Kiala" src="exemplos/pessoa-1.svg" size="sm" decorative /> Ana Kiala
            </button>
            <ng-template #conta>
              <div mxMenu>
                <span mxMenuLabel>ana&#64;kianda.co.ao</span>
                <button mxMenuItem>Perfil</button>
                <button mxMenuItem>Definições</button>
                <button mxMenuItem>Facturação</button>
                <hr mxSeparator />
                <button mxMenuItem variant="destructive">Terminar sessão</button>
              </div>
            </ng-template>
          </doc-example>
        </div>
      </section>

      <section>
        <h2>Acessibilidade</h2>
        <doc-a11y
          [keys]="[
            { key: 'Enter Espaço ↓', action: 'Abrem o menu e focam a primeira opção.' },
            { key: '↑ ↓', action: 'Movem entre opções.' },
            { key: 'Home End', action: 'Primeira e última opção.' },
            { key: 'Letra', action: 'Salta para a opção que começa por ela.' },
            { key: 'Esc', action: 'Fecha e devolve o foco ao botão.' }
          ]"
          [aria]="[
            'Botão com aria-haspopup=menu e aria-expanded.',
            'role=menu com role=menuitem, menuitemcheckbox ou menuitemradio.',
            'Os grupos de opções exclusivas têm role=group e aria-label.'
          ]"
        />
      </section>

      <section>
        <h2>Referência da API</h2>
        <doc-api-table [rows]="api" />
      </section>

      <section>
        <h2>Componentes relacionados</h2>
        <doc-related [items]="[{ name: 'Popover' }, { name: 'Button' }, { name: 'Command Palette' }]" />
      </section>
    </article>
  `,
})
export class DropdownMenuPage {
  private readonly toast = inject(MxToast);
  protected readonly iva = signal(true);
  protected readonly pagas = signal(false);
  protected readonly densidade = signal<'normal' | 'compacta'>('normal');

  protected say(accao: string): void {
    this.toast.show(`Escolheste: ${accao}`);
  }

  protected readonly previewCode = `<button mxButton variant="outline" [mxMenuTriggerFor]="accoes">Acções</button>
<ng-template #accoes>
  <div mxMenu>
    <button mxMenuItem (mxMenuItemTriggered)="editar()">Editar</button>
    <button mxMenuItem disabled>Partilhar</button>
    <hr mxSeparator />
    <button mxMenuItem variant="destructive">Eliminar</button>
  </div>
</ng-template>`;

  protected readonly api: ApiRow[] = [
    { kind: 'Directiva', name: '[mxMenuTriggerFor]', type: 'TemplateRef', description: 'Botão que abre o menu.' },
    { kind: 'Input', name: 'mxMenuPosition', type: 'ConnectedPosition[]', description: 'Posições alternativas (CDK).' },
    { kind: 'Directiva', name: '[mxMenu]', type: 'directiva', description: 'A lista (role=menu).' },
    { kind: 'Directiva', name: '[mxMenuItem]', type: "variant: 'default' | 'destructive'", default: 'default' },
    { kind: 'Input', name: 'disabled', type: 'boolean', default: 'false', description: 'Em qualquer opção.' },
    { kind: 'Output', name: 'mxMenuItemTriggered', type: 'void', description: 'A opção foi escolhida.' },
    { kind: 'Directiva', name: '[mxMenuItemCheckbox], [mxMenuItemRadio]', type: 'checked: boolean', description: 'Opções que se ligam e desligam.' },
    { kind: 'Directiva', name: '[mxMenuGroup], [mxMenuLabel]', type: 'directiva', description: 'Grupo de opções exclusivas e o seu título.' },
  ];
}
