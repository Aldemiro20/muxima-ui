import type { Meta, StoryObj } from '@storybook/angular'
import { ButtonComponent } from '@agt-ui/button';

const meta: Meta<ButtonComponent> = {
  title: 'Form/Button',
  tags: ['autodocs'],
  component: ButtonComponent,
  parameters: {
    docs: {
      description: {
        component: `
O **Button** é um elemento usado para criar botões interativos em uma página web. Ele pode ser clicado para executar ações como enviar formulários, chamar funções Javascript, ou interagir com o usuário de outras formas.

#### Como instalar:

\`npm install @agt-ui/button --registry http://massinga.minfin.gov.ao:4873/\`

#### Exemplo de uso:

\`app.module.ts\`
\`\`\`ts
import { ButtonComponent } from '@agt-ui/button'

@NgModule({
  declarations: [],
  imports: [
    ButtonComponent,
  ],
  exports: [ButtonComponent],
  providers: [],
})
export class AppModule {}
\`\`\`

#### Propriedades:

| Propriedade     | Tipo     | Descrição | Obrigatório |
|----------------|---------|-----------|
| \`text\`      | string | Define a descrição do botão | NÃO |
| \`icon\` | URL  | Caminho relacionado ao ícone que pretende exibir | NÃO |
| \`iconPosition\` | left ou right | Define a posição do ícone, por padrão é left | NÃO |
| \`wfull\` | boolean  | Define que o botão ocupe 100% da largura | NÃO |
| \`size\` | string<sm, md, lg, xl, 2xl>  | Define o tamanho do botão | NÃO |
| \`variant\` | string<primary, secondary, danger>  | Define a cor do botão | NÃO |

\`\`\`
        `
      }
    }
  },
  argTypes: {},
  args: {}
}

export default meta

type Story = StoryObj<ButtonComponent>

export const Primary: Story = {
  args: {
    text: 'Button',
    disabled: false,
    size: 'md'
  }
}

export const Small: Story = {
  args: {
    size: 'sm',
    text: 'Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    text: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    text: 'Button',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    text: 'Button',
  },
};

export const Big: Story = {
  args: {
    size: '2xl',
    text: 'Button',
  },
};

export const WithIconLeft: Story = {
  render: (args) => ({
    props: args,
    template: `
        <agt-button [text]="'Enviar documento'" [icon]="'https://img.icons8.com/?size=100&id=132&format=png&color=ffffff'" [type]="'submit'">
    `
  }),
  args: {
    ...Medium.args,
  },
};

export const WithIconRight: Story = {
  render: (args) => ({
    props: args,
    template: `
        <agt-button [text]="'Enviar documento'" [icon]="'https://img.icons8.com/?size=100&id=132&format=png&color=ffffff'" [type]="'submit'" [iconPosition]="'right'">
    `
  }),
  args: {
    ...Medium.args,
  },
};

export const ButtonIcon: Story = {
  render: (args) => ({
    props: args,
    template: `
        <agt-button [icon]="'https://img.icons8.com/?size=100&id=132&format=png&color=ffffff'" [type]="'submit'" [iconPosition]="'right'">
    `
  }),
  args: {
    ...Medium.args,
  },
};

export const Secondary: Story = {
  args: {
    text: 'Confirmar',
    disabled: false,
    size: 'md',
    variant: 'secondary'
  }
}

export const Danger: Story = {
  args: {
    text: 'Sim, eliminar',
    disabled: false,
    size: 'md',
    variant: 'danger'
  }
}




