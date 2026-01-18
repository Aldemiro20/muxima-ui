import type { Meta, StoryObj } from '@storybook/angular';
import { RadioButtonComponent } from '@agt-ui/radio-button';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

const radioMeta: Meta<RadioButtonComponent> = {
  title: 'Form/RadioButton',
  tags: ['autodocs'],
  component: RadioButtonComponent,
  parameters: {
    docs: {
      description: {
        component: `
O **RadioButton** é um componente usado para selecionar uma única opção em um grupo de opções.

#### Como instalar:

\`npm install @agt-ui/radio-button --registry http://massinga.minfin.gov.ao:4873/\`

#### Exemplo de uso:

\`app.module.ts\`
\`\`\`ts
import { RadioButtonComponent } from '@agt-ui/radio-button';

@NgModule({
  declarations: [],
  imports: [
    RadioButtonComponent,
  ],
  exports: [RadioButtonComponent],
  providers: [],
})
export class AppModule {}
\`\`\`

#### Propriedades:

| Propriedade     | Tipo     | Descrição | Obrigatório |
|----------------|---------|-----------|-------------|
| \`selected\`   | boolean | Define se o radiobutton está selecionado | Não |
| \`disabled\`   | boolean | Define se o radiobutton está desabilitado | Não |
| \`size\`       | string<'sm', 'md', 'lg'> | Define o tamanho do radiobutton | Não |
| \`inputId\`    | string  | Define o identificador único do input, usado para associar o rótulo ao radiobutton | Não |

#### Tamanhos disponíveis:

- \`sm\`: Pequeno
- \`md\`: Médio (padrão)
- \`lg\`: Grande
        `,
      },
    },
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Define se o radiobutton está selecionado.',
    },
    disabled: {
      control: 'boolean',
      description: 'Define se o radiobutton está desabilitado.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Define o tamanho do radiobutton.',
    },
  },
  args: {
    selected: false,
    disabled: false,
    size: 'md',
  },
};

export default radioMeta;

type RadioStory = StoryObj<RadioButtonComponent>;

export const RadioDefault: RadioStory = {
  args: {
    selected: false,
    disabled: false,
    size: 'md',
    inputId: `radio-id-${Math.random().toString(36).substr(2, 9)}`,
  },
};

export const RadioSelected: RadioStory = {
  args: {
    selected: true,
    disabled: false,
    size: 'md',
    inputId: `radio-id0`,
  },
};

export const RadioDisabled: RadioStory = {
  args: {
    selected: false,
    disabled: true,
    size: 'md',
    inputId: `radio-id1`,
  },
};

export const RadioSmall: RadioStory = {
  args: {
    size: 'sm',
    selected: false,
    inputId: `inputId`,
  },
};

export const RadioMedium: RadioStory = {
  args: {
    size: 'md',
    selected: false,
    inputId: `radioid`,
  },
};

export const RadioLarge: RadioStory = {
  args: {
    size: 'lg',
    selected: false,
    inputId: `radioId`,
  },
};

// ✅ Componente auxiliar com ngModel
@Component({
  selector: 'storybook-radio-ngmodel',
  template: `
    <h4>Selecione uma opção:</h4>
    <div>
      <agt-radio-button
        name="grupo"
        inputId="radio-a"
        [value]="'A'"
        [(ngModel)]="selecionado"
      ></agt-radio-button>
      <label for="radio-a">Opção A</label>

      <agt-radio-button
        name="grupo"
        inputId="radio-b"
        [value]="'B'"
        [(ngModel)]="selecionado"
      ></agt-radio-button>
      <label for="radio-b">Opção B</label>
    </div>

    <p>Valor selecionado: {{ selecionado }}</p>
  `,
  standalone: true,
  imports: [RadioButtonComponent, FormsModule],
})
class StorybookRadioNgModelComponent {
  selecionado = 'A';
}

export const RadioNgModel: StoryObj = {
  name: 'Usando ngModel (fora do formulário)',
  render: () => ({
    template: `
        <agt-radio-button
          name="grupo"
          [value]="'A'"
          [(ngModel)]="selecionado"
        ></agt-radio-button>
    `,
    moduleMetadata: {
      imports: [RadioButtonComponent, FormsModule],
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo usando `[(ngModel)]` com radio-button .',
      },
    },
  },
};


