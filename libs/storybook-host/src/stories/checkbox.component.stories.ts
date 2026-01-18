import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '@agt-ui/checkbox';

const meta: Meta<CheckboxComponent> = {
  title: 'Form/Checkbox',
  tags: ['autodocs'],
  component: CheckboxComponent,
  parameters: {
    docs: {
      description: {
        component: `
O **Checkbox** é um componente usado para selecionar ou desmarcar opções em formulários ou listas.

#### Como instalar:

\`npm install @agt-ui/checkbox --registry http://massinga.minfin.gov.ao:4873/\`

#### Exemplo de uso:

\`app.module.ts\`
\`\`\`ts
import { CheckboxComponent } from '@agt-ui/checkbox';

@NgModule({
  declarations: [],
  imports: [
    CheckboxComponent,
  ],
  exports: [CheckboxComponent],
  providers: [],
})
export class AppModule {}
\`\`\`

#### Propriedades:

| Propriedade     | Tipo     | Descrição | Obrigatório |
|----------------|---------|-----------|-------------|
| \`checked\`    | boolean | Define se o checkbox está marcado | Não |
| \`disabled\`   | boolean | Define se o checkbox está desabilitado | Não |
| \`size\`       | string<'sm', 'md', 'lg', 'xl', '2xl'> | Define o tamanho do checkbox | Não |

#### Tamanhos disponíveis:

- \`sm\`: Pequeno
- \`md\`: Médio (padrão)
- \`lg\`: Grande
- \`xl\`: Extra Grande
- \`2xl\`: 2x Extra Grande
        `,
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Define se o checkbox está marcado.',
    },
    disabled: {
      control: 'boolean',
      description: 'Define se o checkbox está desabilitado.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Define o tamanho do checkbox.',
    },
  },
  args: {
    checked: false,
    disabled: false,
    size: 'md',
  },
};

export default meta;

type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    size: 'md',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    size: 'md',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    checked: false,
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    checked: false,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    checked: false,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    checked: false,
  },
};

export const DoubleExtraLarge: Story = {
  args: {
    size: '2xl',
    checked: false,
  },
};




