import type { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from '@agt-ui/accordion';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
       component: `
O **Accordion** é um componente colapsável para organização de conteúdos em blocos expansíveis, com suporte a ícone (template ou URL), título, subtítulo, filhos dinâmicos e controle de estado.

> ⚠️ **Nota:** Para que o componente funcione corretamente, é necessário importar o \`BrowserAnimationsModule\` do \`@angular/platform-browser/animations\` no seu \`AppModule\` ou no módulo correspondente.

### 🚀 Instalação

\`\`\`bash
npm install @agt-ui/accordion --registry http://massinga.minfin.gov.ao:4873/
\`\`\`

### ✅ Importação

\`\`\`ts
import { AccordionComponent } from '@agt-ui/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserAnimationsModule, AccordionComponent],
  exports: [AccordionComponent],
})
export class AppModule {}
\`\`\`

### 📦 Uso Básico

\`\`\`html
<agt-accordion 
  title="Uso de créditos"
  subtitle="Configure como os créditos podem ser utilizados entre os impostos"
  iconUrl="https://cdn-icons-png.flaticon.com/512/1040/1040214.png">
  <p>Conteúdo interno</p>
</agt-accordion>
\`\`\`

### 📚 Propriedades

| Propriedade    | Tipo              | Descrição                                                                 | Obrigatório |
|----------------|-------------------|---------------------------------------------------------------------------|-------------|
| \`title\`      | string            | Título exibido no cabeçalho do accordion                                 | Sim         |
| \`subtitle\`   | string            | Subtítulo exibido abaixo do título (opcional)                            | Não         |
| \`icon\`       | TemplateRef<void> | Template de ícone customizado à esquerda do título (opcional)            | Não         |
| \`iconUrl\`    | string            | URL de imagem exibida como ícone à esquerda                              | Não         |
| \`children\`   | any[]             | Lista de objetos para accordions aninhados (accordionTree)               | Não         |

### 🧩 Accordion Dinâmico

Para listas dinâmicas e aninhamento, basta passar um array para a propriedade \`children\`:

\`\`\`html
<agt-accordion
  *ngFor="let item of accordionTree"
  [title]="item.title"
  [subtitle]="item.subtitle"
  [children]="item.children"
  [iconUrl]="item.iconUrl">
</agt-accordion>
\`\`\`

<!-- AQUI: estrutura do objeto -->

### 🧬 Estrutura esperada do objeto \`accordionTree\`

A estrutura do array usado na propriedade \`children\` deve seguir o formato abaixo:

\`\`\`ts
[
  {
    title: 'Título principal',
    subtitle: 'Subtítulo opcional',
    iconUrl: 'https://exemplo.com/icone.png',
    children: [
      {
        title: 'Subitem 1',
        subtitle: 'Subtítulo do subitem',
        children: [
          {
            title: 'Subitem 1.1',
            children: []
          }
        ]
      },
      {
        title: 'Subitem 2',
        children: []
      }
    ]
  }
]
\`\`\`

Essa estrutura permite criar accordions aninhados de forma recursiva, com título, subtítulo, ícone (opcional) e filhos em múltiplos níveis.


`

      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título principal do accordion',
    },
    subtitle: {
      control: 'text',
      description: 'Texto de subtítulo abaixo do título',
    },
    iconUrl: {
      control: 'text',
      description: 'URL do ícone exibido ao lado esquerdo',
    },
   
 
    children: {
      control: false,
      description: 'Lista de filhos para acordeão aninhado',
    },
    
  },
  args: {
    title: 'Accordion',
    subtitle: '',
  
    iconUrl: '',
    
  }
};

export default meta;

type Story = StoryObj<AccordionComponent>;

export const Default: Story = {
  args: {
    title: 'Accordion Básico',
    subtitle: 'Exemplo de accordion com título e subtítulo',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1040/1040214.png',
  },
  render: (args) => ({
    props: args,
    template: `
      <agt-accordion [title]="title" [subtitle]="subtitle" [iconUrl]="iconUrl">
        <p style="padding: 20px;">Conteúdo interno do accordion</p>
      </agt-accordion>
    `,
     moduleMetadata: {
      imports: [CommonModule, BrowserAnimationsModule, AccordionComponent],
    },
  }),
};

export const OnlyTitle: Story = {
  args: {
    title: 'Apenas Título',
  },
  render: (args) => ({
    props: args,
    template: `
      <agt-accordion [title]="title">
        <p style="padding: 20px;">Accordion sem subtítulo nem ícone</p>
      </agt-accordion>
    `,
     moduleMetadata: {
      imports: [CommonModule, BrowserAnimationsModule, AccordionComponent],
    },
  }),
  
};


export const NestedAccordion: Story = {
  args: {
    title: 'Accordion Principal',
    subtitle: 'Accordion com filhos',
    children: [
      {
        title: 'Subitem 1',
        subtitle: 'Primeiro subitem',
        children: [
          { title: 'Subitem 1.1', subtitle: 'Nível 3' }
        ]
      },
      {
        title: 'Subitem 2',
        subtitle: 'Segundo subitem',
        children: []
      }
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <agt-accordion [title]="title" [subtitle]="subtitle" [children]="children">
      </agt-accordion>
    `,
     moduleMetadata: {
      imports: [CommonModule, BrowserAnimationsModule, AccordionComponent],
    },
  }),
};

export const WithDynamicList: Story = {
  render: () => ({
    props: {
      accordionTree: [
        {
          title: 'Gestão de Usuários e Administração de Permissões em Ambientes Corporativos',
          subtitle: 'Controle completo de acesso por níveis e funções organizacionais',
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/847/847969.png',
          children: [
            {
              title: 'Perfis de Acesso e Gerenciamento de Níveis Hierárquicos de Permissão',
              children: [
                {
                  title: 'Administrador com Acesso Total às Funcionalidades do Sistema',
                  children: []
                },
                {
                  title: 'Usuário Padrão com Permissões Restritas para Operações Básicas',
                  children: []
                }
              ]
            },
            {
              title: 'Gerenciar Contas e Configurações Individuais de Usuários Ativos no Sistema',
              children: []
            }
          ]
        },
        {
          title: 'Relatórios e Estatísticas de Uso com Exportação de Dados em Diversos Formatos',
          subtitle: 'Visualização detalhada de métricas operacionais e exportações customizadas',
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/3064/3064197.png',
          children: [
            {
              title: 'Relatórios Mensais com Análise Comparativa e Indicadores Chave de Desempenho (KPIs)',
              subtitle: 'Visualize e compare desempenho mês a mês',
           
              children: [
                {
                  title: 'Janeiro - Relatório Completo de Atividades e Indicadores do Primeiro Mês do Ano',
                  subtitle: 'Resumo analítico de dados e tendências',
                
                  children: []
                }
              ]
            },
            {
              title: 'Exportar Dados em CSV, Excel ou PDF para Compartilhamento com Equipes',
              subtitle: 'Download estruturado das informações filtradas',
            
              children: []
            }
          ]
        }
      ]
    },
    template: `
      <div class="background">
        <agt-accordion
          *ngFor="let item of accordionTree"
          [title]="item.title"
          [subtitle]="item.subtitle"
          [children]="item.children"
          [iconUrl]="item.iconUrl">
        </agt-accordion>
      </div>
    `,
    moduleMetadata: {
      imports: [CommonModule, BrowserAnimationsModule, AccordionComponent],
    },
  }),
  parameters: {
    docs: {
      description: {
        story: 'Accordion renderizado dinamicamente a partir de um array de objetos, com suporte a múltiplos níveis e ícones por URL.',
      },
    },
  },
};
