import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from '@muxima-ui/accordion';

@Component({
  selector: 'muxima-accordion-doc',
  standalone: true,
  imports: [CommonModule, AccordionComponent],
  templateUrl: './accordion-doc.component.html',
  styleUrls: ['./accordion-doc.component.scss']
})
export class AccordionDocComponent {
  // Default Accordion Items
  basicItems = [
    {
      title: 'O que é Angular?',
      content: 'Angular é um framework de desenvolvimento web mantido pelo Google. Ele permite criar aplicações web dinâmicas e complexas com facilidade, oferecendo recursos como two-way data binding, dependency injection, e uma arquitetura baseada em componentes.',
      expanded: false
    },
    {
      title: 'O que é TypeScript?',
      content: 'TypeScript é um superset do JavaScript que adiciona tipagem estática. Ele é compilado para JavaScript puro e oferece recursos avançados de desenvolvimento como interfaces, generics, decorators, e melhor suporte a IDE.',
      expanded: false
    },
    {
      title: 'O que é RxJS?',
      content: 'RxJS é uma biblioteca para programação reativa usando Observables. Ela facilita a composição de código assíncrono e baseado em eventos, permitindo transformações, combinações e controle de fluxo de dados de forma elegante.',
      expanded: false
    }
  ];

  // Settings Example
  settingsItems = [
    {
      title: 'Preferências de Conta',
      subtitle: 'Configure seu perfil e privacidade',
      content: 'Gerencie informações pessoais, senha, autenticação de dois fatores e preferências de privacidade.',
      expanded: false
    },
    {
      title: 'Notificações',
      subtitle: 'Configure alertas e emails',
      content: 'Escolha quais notificações você deseja receber por email, push e SMS.',
      expanded: false
    },
    {
      title: 'Aparência',
      subtitle: 'Personalize o tema visual',
      content: 'Selecione entre tema claro, escuro ou automático. Ajuste tamanho de fonte e densidade de informações.',
      expanded: false
    }
  ];

  // Pricing Example
  pricingItems = [
    {
      title: 'Plano Free',
      subtitle: 'R$ 0/mês - Para começar',
      content: '✓ Até 3 projetos\n✓ 1 GB de armazenamento\n✓ Suporte por email\n✓ Recursos básicos',
      expanded: true
    },
    {
      title: 'Plano Pro',
      subtitle: 'R$ 49/mês - Mais popular',
      content: '✓ Projetos ilimitados\n✓ 50 GB de armazenamento\n✓ Suporte prioritário 24/7\n✓ Recursos avançados\n✓ API access',
      expanded: false
    },
    {
      title: 'Plano Enterprise',
      subtitle: 'R$ 199/mês - Para times',
      content: '✓ Tudo do Pro\n✓ 500 GB de armazenamento\n✓ Suporte dedicado\n✓ SLA garantido\n✓ Customizações\n✓ Treinamento',
      expanded: false
    }
  ];

  // Nested Accordion
  nestedItems = [
    {
      title: 'Frontend Technologies',
      subtitle: 'Client-side development',
      children: [
        { title: 'Angular', subtitle: 'TypeScript Framework' },
        { title: 'React', subtitle: 'JavaScript Library' },
        { title: 'Vue.js', subtitle: 'Progressive Framework' }
      ]
    },
    {
      title: 'Backend Technologies',
      subtitle: 'Server-side development',
      children: [
        { title: 'Node.js', subtitle: 'JavaScript Runtime' },
        { title: 'Python', subtitle: 'Versatile Language' },
        { title: 'Java', subtitle: 'Enterprise Language' }
      ]
    }
  ];

  // Documentation Items
  docsItems = [
    {
      title: 'Getting Started',
      subtitle: 'Primeiros passos',
      children: [
        { title: 'Instalação', subtitle: 'npm install' },
        { title: 'Configuração', subtitle: 'Setup inicial' },
        { title: 'Primeiro Componente', subtitle: 'Hello World' }
      ]
    },
    {
      title: 'Components',
      subtitle: 'Biblioteca de componentes',
      children: [
        { title: 'Button', subtitle: 'Botões e ações' },
        { title: 'Input', subtitle: 'Campos de texto' },
        { title: 'Modal', subtitle: 'Diálogos e overlays' },
        { title: 'Table', subtitle: 'Tabelas de dados' }
      ]
    },
    {
      title: 'Advanced',
      subtitle: 'Recursos avançados',
      children: [
        { title: 'Theming', subtitle: 'Customização de tema' },
        { title: 'API Reference', subtitle: 'Documentação completa' },
        { title: 'Performance', subtitle: 'Otimizações' }
      ]
    }
  ];

  importCode = `import { AccordionComponent } from '@muxima-ui/accordion';

@Component({
  standalone: true,
  imports: [AccordionComponent]
})`;

  basicCode = `<agt-accordion 
  *ngFor="let item of items"
  [title]="item.title"
  [expanded]="item.expanded">
  <p>{{ item.content }}</p>
</agt-accordion>`;

  typescriptCode = `import { AccordionComponent } from '@muxima-ui/accordion';

@Component({
  standalone: true,
  imports: [AccordionComponent]
})
export class MyComponent {
  items = [
    {
      title: 'Item 1',
      content: 'Content here',
      expanded: false
    }
  ];
}`;

  htmlCodeBasic = `<agt-accordion 
  *ngFor="let item of items"
  [title]="item.title"
  [expanded]="item.expanded">
  <p>{{ item.content }}</p>
</agt-accordion>`;

  htmlCodeWithSubtitle = `<agt-accordion 
  title="Performance Otimizada"
  subtitle="Renderização eficiente e rápida"
  [expanded]="false">
  <p>Conteúdo detalhado aqui...</p>
</agt-accordion>`;

  htmlCodeNested = `<agt-accordion 
  *ngFor="let item of nestedItems"
  [title]="item.title"
  [subtitle]="item.subtitle"
  [children]="item.children">
</agt-accordion>

// No TypeScript:
nestedItems = [
  {
    title: 'Frontend',
    subtitle: 'Tecnologias client-side',
    children: [
      { title: 'Angular', subtitle: 'Framework' },
      { title: 'React', subtitle: 'Library' }
    ]
  }
];`;

  htmlCodeSettings = `<agt-accordion 
  *ngFor="let item of settingsItems"
  [title]="item.title"
  [subtitle]="item.subtitle"
  [expanded]="item.expanded">
  <p>{{ item.content }}</p>
</agt-accordion>`;

  htmlCodePricing = `<agt-accordion 
  *ngFor="let plan of pricingItems"
  [title]="plan.title"
  [subtitle]="plan.subtitle"
  [expanded]="plan.expanded">
  <div style="white-space: pre-line;">{{ plan.content }}</div>
</agt-accordion>`;

  copiedStates: { [key: string]: boolean } = {};

  copyCode(code: string, key: string = 'default') {
    navigator.clipboard.writeText(code).then(() => {
      this.copiedStates[key] = true;
      setTimeout(() => {
        this.copiedStates[key] = false;
      }, 2000);
    });
  }

  isCopied(key: string = 'default'): boolean {
    return this.copiedStates[key] || false;
  }
}
