import {  type Meta, type StoryObj } from '@storybook/angular'
import { InputComponent } from '@agt-ui/input';

const meta: Meta<InputComponent> = {
  title: 'Form/Input',
  component: InputComponent,
  parameters: {
    docs: {
      description: {
        component: `
O **Input**  é um elemento que encapsula um campo de entrada em aplicações web ou mobile. É utilizado para capturar dados do usuário, como textos, números, senhas, e-mails, entre outros.

#### Como instalar:

\`npm install @agt-ui/input --registry http://massinga.minfin.gov.ao:4873/\`

#### Exemplo de uso:

\`app.module.ts\`
\`\`\`ts
import { InputComponent } from '@agt-ui/input'

@NgModule({
  declarations: [],
  imports: [
    InputComponent,
  ],
  exports: [InputComponent],
  providers: [],
})
export class AppModule {}
\`\`\`

\`\`\`
        `
      }
    }
  },
  argTypes: {},
  args: {},
  tags: ['autodocs']
}

export default meta

type Story = StoryObj<InputComponent>

export const Base: Story = {
  args: {
    type: 'text',
  },
  render: (args) => ({
    props: args,
    template: `
        <div style="width: 500px;">
          <agt-input placeholder="Nome do usuário"></agt-input>
        </div>
    `
  }),
};

export const Disabled: Story = {
  args: {
    type: 'text',
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
        <div style="width: 500px;">
          <agt-input placeholder="Nome do usuário" disabled="true"></agt-input>
        </div>
    `
  }),
};

export const Error: Story = {
  args: {
    type: 'text',
    hasError: true
  },
  render: (args) => ({
    props: args,
    template: `
        <div style="width: 500px;">
          <agt-input placeholder="Nome do usuário" hasError="true"></agt-input>
        </div>
    `
  }),
};

export const ErrorMessage: Story = {
  args: {
    type: 'text',
    hasError: true,
    errorMessage: 'Erro'
  },
  render: (args) => ({
    props: args,
    template: `
        <div style="width: 500px;">
          <agt-input placeholder="Nome do usuário" hasError="true" errorMessage="Nome inválido"></agt-input>
        </div>
    `
  }),
};









