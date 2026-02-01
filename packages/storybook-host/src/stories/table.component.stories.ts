import type { Meta, StoryObj } from '@storybook/angular'
import { EventEmitter } from '@angular/core';
import { TableComponent } from '@muxima-ui/table';

const meta: Meta<TableComponent> = {
  title: 'Data/Table',
  tags: ['autodocs'],
  component: TableComponent,
  parameters: {
    docs: {
      description: {
        component: `
**Table**  é um elemento de interface usado para exibir dados tabulares

#### Como instalar:

\`npm install @muxima-ui/table --registry http://massinga.minfin.gov.ao:4873/\`

#### Exemplo de uso:

\`app.module.ts\`
\`\`\`ts
import { TableComponent } from '@muxima-ui/table'

@NgModule({
  declarations: [],
  imports: [
    TableComponent,
  ],
  exports: [TableComponent],
  providers: [],
})
export class AppModule {}
\`\`\`

\`app.component.html\`
\`\`\`html
<agt-table
  [tHeaderData]="tHeaderData"
  [tBodyData]="users"
  [paginator]="false"
>
  <tr *ngFor="let item of users">
    <td data-title="Nome">{{ item.name }}</td>
    <td data-title="Data de nascimento">{{ item.date }}</td>
    <td data-title="Género">{{ item.gender }}</td>
    <td data-title="Pontuação">{{ item.score }}</td>
    <td data-title="Aprovado">Sim</td>
  </tr>
</agt-table>
\`\`\`

#### Propriedades:

| Propriedade     | Tipo     | Descrição | Obrigatório |
|----------------|---------|-----------|
| \`tHeaderData\`      | Array<{ key: string; value: string}> | Um array de objectos com chave e valor que define o cabeçalho da tabela de maneira automatica | NÃO |
| \`tBodyData\` | Array  | Lisata de dados para preencher a tabela| SIM |
| \`paginator\` | boolean  | Define se o paginator vai aparecer ou não (Valor padrão: true) | NÃO |
| \`pagination\` | Object<{ itemsPerPage: number; totalElements: number }>  | Define o calculo certo para montar a paginação | NÃO |
| \`paginatorChange\` | EventEmitter<{ page: number; size: number }>  | Função que será executada por cada ação feita na tabela/paginação | NÃO |

#### ⚠️ Atenção (Responsividade):
Para ativar a responsividade de cada coluna da tabela é necessário adicionar o atributo (data-title) com o nome descrevendo o título da coluna correspondente.

#### Como utilizar cabeçalhos personalizados
Utilize cabeçalhos personalizados somente em casos onde precisa de maior controle sobre a exibição das colunas, seja para estilização, interatividade ou para apresentar informações de forma mais intuitiva.

#### Exemplo de uso:

\`app.component.html\`
\`\`\`html
<agt-table
    [tBodyData]="users"
    [paginator]="false"
>
    <thead custom-header>
      <tr>
        <th>Nome principal</th>
        <th>Data de nascimento</th>
        <th>Genero</th>
        <th>Resultado</th>
        <th>Ação</th>
      </tr>
    </thead>
    <tr *ngFor="let item of users">
      <td data-title="Nome">{{ item.name }}</td>
      <td data-title="Data de nascimento">{{ item.date }}</td>
      <td data-title="Genero">{{ item.gender }}</td>
      <td data-title="Resultado">{{ item.score }}</td>
      <td data-title="Ação">Sim</td>
    </tr>
  </agt-table>
\`\`\`
\`\`\`


        `
      }
    }
  }
}

export default meta

type Story = StoryObj<TableComponent>

type EventPaginatorType = {
  page: number
  size: number
}

const tableUserData = [
  { id: 1, name: 'Ana', date: '05/14/1995', gender: 'Feminino', score: '8.7' },
  { id: 2, name: 'Carlos', date: '09/23/1988', gender: 'Masculino', score: '7.4' },
  { id: 3, name: 'Fernanda', date: '12/11/1992', gender: 'Feminino', score: '6.3' },
  { id: 4, name: 'Paulo', date: '01/08/1985', gender: 'Masculino', score: '9.1' },
  { id: 5, name: 'Lúcia', date: '04/17/2000', gender: 'Feminino', score: '5.9' },
  { id: 6, name: 'João', date: '07/30/1993', gender: 'Masculino', score: '8.2' },
  { id: 7, name: 'Maria', date: '02/22/1990', gender: 'Feminino', score: '7.8' },
  { id: 8, name: 'Luís', date: '10/04/1989', gender: 'Masculino', score: '9.5' },
  { id: 9, name: 'Carla', date: '03/14/1997', gender: 'Feminino', score: '6.7' },
];

export const Base: Story = {
  render: (args) => ({
    props: args,
    template: `
       <agt-table [tHeaderData]="tHeaderData" [tBodyData]="tBodyData" [paginator]="false">
          <tr *ngFor="let item of tBodyData">
            <td data-title="Nome">{{ item.name }}</td>
            <td data-title="Data de nascimento">{{ item.date }}</td>
            <td data-title="Género">{{ item.gender }}</td>
            <td data-title="Pontuação">{{ item.score }}</td>
            <td data-title="Aprovado">
              Sim
            </td>
          </tr>
      </agt-table>
    `
  }),
  args: {
    tHeaderData: [
      { key: 'name', name: 'Nome' },
      { key: 'date', name: 'Data de nascimento' },
      { key: 'gender', name: 'Gênero' },
      { key: 'score', name: 'Nota' },
      { key: 'action', name: 'Aprovado' }
    ],
    tBodyData: tableUserData,
    paginator: false,
  },
};

export const Paginator: Story = {
  render: (args) => ({
    props: args,
    template: `
       <agt-table [tHeaderData]="tHeaderData" [tBodyData]="tBodyData"  [pagination]="pagination" (paginatorChange)="paginatorChange">
          <tr *ngFor="let item of tBodyData">
            <td data-title="Nome">{{ item.name }}</td>
            <td data-title="Data de nascimento">{{ item.date }}</td>
            <td data-title="Género">{{ item.gender }}</td>
            <td data-title="Pontuação">{{ item.score }}</td>
            <td data-title="Aprovado">
              Sim
            </td>
          </tr>
      </agt-table>
    `
  }),
  args: {
    tHeaderData: [
      { key: 'name', name: 'Nome' },
      { key: 'date', name: 'Data de nascimento' },
      { key: 'gender', name: 'Gênero' },
      { key: 'score', name: 'Nota' },
      { key: 'action', name: 'Aprovado' }
    ],
    tBodyData: tableUserData,
    pagination: {
      itemsPerPage: 10,
      totalElements: 3694,
      currentPage: 0,
    },
    paginatorChange: new EventEmitter<EventPaginatorType>(),
  },
};








