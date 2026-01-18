import {  type Meta, type StoryObj } from '@storybook/angular'
import { FileUploadComponent } from '@agt-ui/file-upload';

const meta: Meta<FileUploadComponent> = {
  title: 'File/FileUpload',
  component: FileUploadComponent,
  parameters: {
    docs: {
      description: {
        component: `
O **File Upload**  é um elemento da interface que permite aos usuários selecionar/arrastar e colar arquivos para um sistema, seja para armazenamento local ou upload para um servidor.

#### Como instalar:

\`npm install @agt-ui/file-upload --registry http://massinga.minfin.gov.ao:4873/\`

#### Exemplo de uso:

\`app.module.ts\`
\`\`\`ts
import { FileUploadComponent } from '@agt-ui/file-upload'

@NgModule({
  declarations: [],
  imports: [
    FileUploadComponent,
  ],
  exports: [FileUploadComponent],
  providers: [],
})
export class AppModule {}
\`\`\`

\`app.component.html\`
\`\`\`html
<agt-file-upload
  [accept]="'.pdf'"
  (filesSelected)="fileSelected($event)"
  [maxMegabyte]="8"
/>
\`\`\`

\`app.component.ts\`
\`\`\`typescript
export class AppComponent {
  fileSelected(event) {
    console.log(event)
  }
}
\`\`\`

#### Propriedades:

| Propriedade     | Tipo     | Descrição | Obrigatório |
|----------------|---------|-----------|
| \`[accept]\`      | string | Define os tipos de arquivos que podem ser carregados | NÃO |
| \`[maxMegabyte]\` | number  | Define o tamanho máximo de Mb para cada upload | SIM |
| \`[placeholder]\` | string  | Define a descrição do componente de upload | NÃO |
| \`[isMultiple]\` | boolean  | Define se é possível carregar multiplos ficheiros | NÃO |
| \`(filesSelected)\` | function  | Função responsável por capturar o evento de upload e fornecer os dados do documento selecionado | NÃO |


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

type Story = StoryObj<FileUploadComponent>

export const Base: Story = {
  args: {
    accept: ".pdf",
    maxMegabyte: 8,
    isMultiple: true,
    placeholder: 'Clique para carregar o comprovativo'
  },
};

export const Secondary: Story = {
  args: {
    accept: ".pdf",
    maxMegabyte: 8,
    isMultiple: false,
    placeholder: 'Clique para carregar o comprovativo'
  },
};











