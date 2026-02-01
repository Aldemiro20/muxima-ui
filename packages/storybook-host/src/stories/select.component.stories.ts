import {  type Meta, type StoryObj } from '@storybook/angular'
import { SelectComponent } from '@muxima-ui/select';

const meta: Meta<SelectComponent> = {
  title: 'Form/Select',
  component: SelectComponent,
  parameters: {
    docs: {
      description: {
        component: `
O **Select**  é um elemento de interface usado para permitir que o usuário escolha uma opção dentro de uma lista pré-definida. Ele pode ter diferentes implementações dependendo do contexto:

#### Como instalar:

\`npm install @muxima-ui/select --registry http://massinga.minfin.gov.ao:4873/\`

#### Exemplo de uso:

\`app.module.ts\`
\`\`\`ts
import { SelectComponent } from '@muxima-ui/select'

@NgModule({
  declarations: [],
  imports: [
    SelectComponent,
  ],
  exports: [SelectComponent],
  providers: [],
})
export class AppModule {}
\`\`\`

\`app.component.html\`
\`\`\`html
<form [formGroup]="exampleForm" (ngSubmit)="onSubmit()">
    <div style="margin-top: 24px; max-width: 500px;">
       <agt-select
        formControlName="category"
        [options]="categories"
        [hasFilter]="true"
        [placeholder]="'Selecione a categoria'"
        [optionLabel]="'name'"
        [optionValue]="'tech'"
      />
    </div>

    <button type="submit" [disabled]="exampleForm.invalid">Enviar</button>
</form>
\`\`\`

\`app.component.ts\`
\`\`\`typescript
export class AppComponent {
  exampleForm = new FormGroup({
    category: new FormControl()
  })

  categories = [
    { name: 'Tecnologia nova para aplicações mobile', tech: 'tech' },
    { name: 'Saúde', tech: 'health' },
    { name: 'Educação', tech: 'education' },
    { name: 'Javascript', tech: 'js' },
    { name: 'C#', tech: 'c' },
    { name: 'Ruby on Rails', tech: 'ruby' },
    { name: 'Html', tech: 'html' },
    { name: 'React Native', tech: 'rn' },
    { name: 'Node.js', tech: 'node' },
  ];


  onSubmit(): void {
    if (this.exampleForm.valid) {
      console.log('Formulário enviado', this.exampleForm.value);
    }
}
\`\`\`

#### Propriedades:

| Propriedade     | Tipo     | Descrição | Obrigatório |
|----------------|---------|-----------|
| \`options\`      | Array | Define as a lista de opções | SIM |
| \`hasFilter\` | boolean  | Habilita o filtro | NÃO |
| \`optionLabel\` | string  | Informa qual das propriedades do array será exibida como descrição | SIM |
| \`optionValue\` | string  | nforma qual das propriedades do array será referencia ao valor a ser enviado | SIM |
| \`placeholder\` | string  | Define o placeholder para o select | NÃO |
| \`hasError\` | boolean  | Informa se existe algum erro | NÃO |
| \`errorMessage\` | string  | Mensagem de erro | NÃO |
| \`disabled\` | boolean  | Habilita o select | NÃO |
\`\`\`

        `
      }
    }
  },
  argTypes: {},
  args: {},
  tags: ['autodocs']
}

const categories = [
  { name: 'Tecnologia nova para aplicações mobile', tech: 'tech' },
  { name: 'Saúde', tech: 'health' },
  { name: 'Educação', tech: 'education' },
  { name: 'Javascript', tech: 'js' },
  { name: 'C#', tech: 'c' },
  { name: 'Ruby on Rails', tech: 'ruby' },
  { name: 'Html', tech: 'html' },
  { name: 'React Native', tech: 'rn' },
  { name: 'Node.js', tech: 'node' },
];

export default meta

type Story = StoryObj<SelectComponent>

export const Base: Story = {
  args: {
    options: categories,
    optionLabel: 'name',
    optionValue: 'tech'
  },
};

export const Filter: Story = {
  args: {
    options: categories,
    hasFilter: true,
    optionLabel: 'name',
    optionValue: 'tech'
  },
};

export const Error: Story = {
  args: {
    options: categories,
    hasError: true,
    optionLabel: 'name',
    optionValue: 'tech'
  },
};

export const ErrorMessage: Story = {
  args: {
    options: categories,
    hasError: true,
    optionLabel: 'name',
    optionValue: 'tech',
    errorMessage: 'Por favor selecione uma opção'
  },
};

export const Disabled: Story = {
  args: {
    options: categories,
    disabled: true,
  },
};











