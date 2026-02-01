import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AccordionItem {
  title: string;
  content: string;
  icon?: string;
  expanded: boolean;
  badge?: string;
  description?: string;
}

@Component({
  selector: 'muxima-accordion-doc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-doc.component.html',
  styleUrls: ['./accordion-doc.component.scss']
})
export class AccordionDocComponent {
  // Basic Accordion
  basicItems: AccordionItem[] = [
    {
      title: 'O que é Angular?',
      content: 'Angular é um framework de desenvolvimento web mantido pelo Google. Ele permite criar aplicações web dinâmicas e complexas com facilidade, oferecendo recursos como two-way data binding, dependency injection, e uma arquitetura baseada em componentes.',
      icon: '🅰️',
      expanded: false
    },
    {
      title: 'O que é TypeScript?',
      content: 'TypeScript é um superset do JavaScript que adiciona tipagem estática. Ele é compilado para JavaScript puro e oferece recursos avançados de desenvolvimento como interfaces, generics, decorators, e melhor suporte a IDE.',
      icon: '📘',
      expanded: false
    },
    {
      title: 'O que é RxJS?',
      content: 'RxJS é uma biblioteca para programação reativa usando Observables. Ela facilita a composição de código assíncrono e baseado em eventos, permitindo transformações, combinações e controle de fluxo de dados de forma elegante.',
      icon: '🔄',
      expanded: false
    },
    {
      title: 'O que é Nx Monorepo?',
      content: 'Nx é uma ferramenta poderosa para gerenciar monorepos. Oferece geração de código, análise de dependências, cache inteligente e integração com diversas ferramentas do ecossistema JavaScript.',
      icon: '⚡',
      expanded: false
    }
  ];

  // FAQ Accordion
  faqItems: AccordionItem[] = [
    {
      title: 'Como instalar o componente?',
      content: 'Instale via npm usando o comando: npm install @muxima-ui/accordion. Após a instalação, importe o módulo no seu componente Angular e adicione-o aos imports.',
      icon: '📦',
      expanded: false
    },
    {
      title: 'Posso usar múltiplos acordeões na mesma página?',
      content: 'Sim! Você pode ter quantos acordeões quiser na mesma página. Cada instância funciona de forma independente, permitindo criar layouts complexos e organizados.',
      icon: '📚',
      expanded: false
    },
    {
      title: 'O componente é responsivo?',
      content: 'Completamente responsivo e otimizado para mobile. O accordion se adapta automaticamente a diferentes tamanhos de tela, garantindo uma experiência consistente em todos os dispositivos.',
      icon: '📱',
      expanded: false
    },
    {
      title: 'Suporta animações personalizadas?',
      content: 'Sim! O componente possui animações suaves de expansão e colapso. Você pode customizar a duração, timing function e efeitos através de CSS ou propriedades do componente.',
      icon: '✨',
      expanded: false
    },
    {
      title: 'É acessível (a11y)?',
      content: 'Totalmente acessível! Inclui suporte a navegação por teclado (Enter/Space), atributos ARIA apropriados, e foco visual claro para usuários de leitores de tela.',
      icon: '♿',
      expanded: false
    }
  ];

  // Features Accordion
  featuresItems: AccordionItem[] = [
    {
      title: 'Performance Otimizada',
      description: 'Renderização eficiente e rápida',
      content: 'Utilizamos técnicas avançadas de otimização como change detection OnPush, virtual scrolling quando necessário, e lazy loading de conteúdo para garantir a melhor performance possível.',
      icon: '⚡',
      badge: 'Novo',
      expanded: false
    },
    {
      title: 'Temas Personalizáveis',
      description: 'Adapte o visual às suas necessidades',
      content: 'Sistema completo de temas com CSS variables, permitindo customização total de cores, espaçamentos, bordas e animações. Suporte a modo claro e escuro out-of-the-box.',
      icon: '🎨',
      badge: 'Popular',
      expanded: false
    },
    {
      title: 'TypeScript First',
      description: 'Type-safety em todo o código',
      content: 'Desenvolvido 100% em TypeScript com tipagens completas. Autocomplete inteligente, detecção de erros em tempo de desenvolvimento, e documentação inline via JSDoc.',
      icon: '💎',
      expanded: false
    },
    {
      title: 'Testes Abrangentes',
      description: '100% de cobertura de código',
      content: 'Cada componente possui testes unitários completos com Jest, testes de integração, e testes E2E. Garantimos qualidade e confiabilidade em cada release.',
      icon: '🧪',
      expanded: false
    }
  ];

  // Pricing Accordion
  pricingItems: AccordionItem[] = [
    {
      title: 'Plano Free',
      description: 'Para projetos pessoais',
      content: 'Acesso completo aos componentes básicos, atualizações mensais, suporte via comunidade, documentação completa, e exemplos de código. Perfeito para começar!',
      icon: '🆓',
      badge: 'Grátis',
      expanded: false
    },
    {
      title: 'Plano Pro',
      description: 'Para equipes e empresas',
      content: 'Todos os benefícios do Free, mais: componentes premium, temas exclusivos, suporte prioritário via email, atualizações semanais, e acesso antecipado a novos recursos.',
      icon: '⭐',
      badge: '$49/mês',
      expanded: false
    },
    {
      title: 'Plano Enterprise',
      description: 'Para grandes organizações',
      content: 'Tudo do Pro, mais: suporte 24/7, customizações sob demanda, treinamento da equipe, SLA garantido, código-fonte completo, e licença perpétua para uso interno.',
      icon: '🏢',
      badge: 'Contato',
      expanded: false
    }
  ];

  toggleItem(items: AccordionItem[], index: number, allowMultiple = false) {
    if (!allowMultiple) {
      items.forEach((item, i) => {
        if (i !== index) item.expanded = false;
      });
    }
    items[index].expanded = !items[index].expanded;
  }

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

  get importCode(): string {
    return `import { AccordionComponent } from '@muxima-ui/accordion';

@Component({
  standalone: true,
  imports: [AccordionComponent],
  // ...
})`;
  }

  get basicCode(): string {
    return `<div class="accordion">
  <div class="accordion-item" *ngFor="let item of items; let i = index">
    <button class="accordion-header" (click)="toggleItem(i)">
      <span class="accordion-icon">{{ item.icon }}</span>
      <span class="accordion-title">{{ item.title }}</span>
      <span class="accordion-arrow" [class.expanded]="item.expanded">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
        </svg>
      </span>
    </button>
    <div class="accordion-content" [class.expanded]="item.expanded">
      <div class="accordion-content-inner">
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</div>`;
  }

  get featuresCode(): string {
    return `<div class="accordion accordion-features">
  <div class="accordion-item" *ngFor="let item of items; let i = index">
    <button class="accordion-header" (click)="toggleItem(i)">
      <div class="accordion-header-left">
        <span class="accordion-icon">{{ item.icon }}</span>
        <div class="accordion-header-text">
          <span class="accordion-title">{{ item.title }}</span>
          <span class="accordion-description">{{ item.description }}</span>
        </div>
      </div>
      <div class="accordion-header-right">
        <span class="accordion-badge" *ngIf="item.badge">{{ item.badge }}</span>
        <span class="accordion-arrow" [class.expanded]="item.expanded">▼</span>
      </div>
    </button>
    <div class="accordion-content" [class.expanded]="item.expanded">
      <div class="accordion-content-inner">
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</div>`;
  }

  get multipleCode(): string {
    return `<div class="accordion">
  <div class="accordion-item" *ngFor="let item of items; let i = index">
    <button class="accordion-header" (click)="toggleItem(items, i, true)">
      <span>{{ item.title }}</span>
    </button>
    <div class="accordion-content" [class.expanded]="item.expanded">
      <div class="accordion-content-inner">
        <p>{{ item.content }}</p>
      </div>
    </div>
  </div>
</div>`;
  }
}
