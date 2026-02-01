import { ButtonComponent } from '@muxima-ui/button';
import { moduleMetadata, type Meta, type StoryFn } from '@storybook/angular';
import { DialogComponent, DialogService } from '@muxima-ui/dialog';
import { Component } from '@angular/core';

@Component({
  selector: 'agt-dialog1',
  template: `
    <agt-dialog
      id='modal1'
      title="Confirmar"
      subtitle="Escolha os critérios abaixo para afinar a sua pesquisa"
    >
      <p>Conteúdo da modal</p>
    </agt-dialog>

    <div style="display: flex; gap: 8px; margin-top: 16px;">
      <agt-button (click)="openDialog()" text="Abrir modal"  />
    </div>
  `,
})
class DialogBaseComponent {
  constructor(public dialogService: DialogService) {}

  openDialog() {
    this.dialogService.open('modal1');
  }
}

const meta: Meta<DialogBaseComponent> = {
  title: 'Overlay/Dialog',
  component: DialogBaseComponent,
  decorators: [
    moduleMetadata({
      declarations: [DialogBaseComponent],
      imports: [DialogComponent, ButtonComponent],
    }),
  ],
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
O **Dialog** é um elemento da interface do usuário que aparece sobre a tela principal de um aplicativo ou site para exibir informações ou solicitar uma ação do usuário. Enquanto a modal está aberta, geralmente o fundo fica escurecido (backdrop) para dar foco a ela, e a interação com o restante da interface pode ser bloqueada.

#### Como instalar:

\`npm install @muxima-ui/dialog --registry http://massinga.minfin.gov.ao:4873/\`

#### Exemplo de uso:

\`app.module.ts\`
\`\`\`ts
import { DialogComponent } from '@muxima-ui/dialog'

@NgModule({
  declarations: [],
  imports: [
    DialogComponent,
  ],
  exports: [DialogComponent],
  providers: [],
})
export class AppModule {}
\`\`\`

\`app.component.html\`
\`\`\`html
<button (click)="openDialog()">Abrir Dialog</button>

<agt-dialog id='modal1' title="Confirmar">
  <p>Conteúdo</p>
</agt-dialog>
\`\`\`

\`app.component.ts\`
\`\`\`typescript
export class AppComponent {
  constructor(public dialogService: DialogService) {}

  openDialog() {
    this.dialogService.open('modal1');
  }
}
\`\`\`

#### Propriedades:

| Propriedade     | Tipo     | Descrição | Obrigatório |
|----------------|---------|-----------|
| \`id\`      | string | Define a referência do componente | SIM |
| \`title\` | string  | Define o titulo da modal | SIM |
| \`subtitle\` | string  | Define o sub-titulo da modal | NÃO |
| \`icon\` | url  | Caminho para o Icon do cabeçalho da modal | NÃO |

#### Controle de Tamanho do Dialog:

É possível personalizar a altura e largura da modal utilizando variáveis CSS. o componente aceita  as seguintes variáveis para controle do tamanho:
- **--modal-max-width**: Define a largura máxima da modal.
- **--modal-min-height**: Define a altura mínima da modal.

#### Exemplo de uso:

\`app.component.html\`
\`\`\`html

<agt-dialog id='modal1' title="Confirmar" style="--modal-max-width: 500px; --modal-min-height: 800px">
  <p>Conteúdo</p>
</agt-dialog>
\`\`\`

        `
      },
      source: {
        code: `
          <agt-dialog id="modal1" title="Confirmar" subtitle="Escolha os critérios abaixo para afinar a sua pesquisa">
            <p>Conteúdo da modal</p>
          </agt-dialog>
        `
      }
    }
  },
  argTypes: {},
  args: {},
};

export default meta;

const Template: StoryFn<DialogBaseComponent> = () => ({
  props: {},
});

export const Base = Template.bind({})




