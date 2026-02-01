import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TourGuideComponent, TourStep } from '@muxima-ui/tour-guide';

@Component({
  selector: 'app-tour-guide-doc',
  standalone: true,
  imports: [CommonModule, TourGuideComponent],
  templateUrl: './tour-guide-doc.component.html',
  styleUrls: ['./tour-guide-doc.component.scss']
})
export class TourGuideDocComponent {
  @ViewChild('basicTour') basicTour?: TourGuideComponent;
  @ViewChild('onboardingTour') onboardingTour?: TourGuideComponent;
  @ViewChild('featureTour') featureTour?: TourGuideComponent;

  // 1. Tour Básico - Boas-vindas simples
  basicSteps: TourStep[] = [
    {
      id: '1',
      target: '#welcome-step',
      title: '👋 Bem-vindo ao Muxima UI!',
      content: 'Este é um tour interativo que vai te guiar pelos principais recursos.',
      placement: 'bottom'
    },
    {
      id: '2',
      target: '#navigation-step',
      title: '🧭 Navegação',
      content: 'Use o menu lateral para navegar entre os componentes.',
      placement: 'right'
    },
    {
      id: '3',
      target: '#theme-step',
      title: '🎨 Personalização',
      content: 'Customize a aparência dos componentes de acordo com seu projeto.',
      placement: 'top'
    }
  ];

  // 2. Onboarding Completo - Tour para novos usuários
  onboardingSteps: TourStep[] = [
    {
      id: 'onb-1',
      target: '#onb-dashboard',
      title: '📊 Dashboard',
      content: 'Aqui você vê todos os seus projetos e estatísticas em tempo real.',
      placement: 'bottom'
    },
    {
      id: 'onb-2',
      target: '#onb-create',
      title: '➕ Criar Projeto',
      content: 'Clique aqui para criar um novo projeto do zero.',
      placement: 'right'
    },
    {
      id: 'onb-3',
      target: '#onb-library',
      title: '📚 Biblioteca',
      content: 'Acesse templates prontos e exemplos de código.',
      placement: 'left'
    },
    {
      id: 'onb-4',
      target: '#onb-team',
      title: '👥 Colaboração',
      content: 'Convide membros da equipe e trabalhe em conjunto.',
      placement: 'bottom'
    },
    {
      id: 'onb-5',
      target: '#onb-settings',
      title: '⚙️ Configurações',
      content: 'Ajuste preferências, notificações e integrações.',
      placement: 'left'
    }
  ];

  // 3. Tour de Funcionalidades - Recursos específicos
  featureSteps: TourStep[] = [
    {
      id: 'feat-1',
      target: '#feat-search',
      title: '🔍 Busca Avançada',
      content: 'Use atalhos como Ctrl+K para busca rápida em qualquer lugar.',
      placement: 'bottom'
    },
    {
      id: 'feat-2',
      target: '#feat-shortcuts',
      title: '⌨️ Atalhos de Teclado',
      content: 'Pressione "?" para ver todos os atalhos disponíveis.',
      placement: 'right'
    },
    {
      id: 'feat-3',
      target: '#feat-export',
      title: '📤 Exportação',
      content: 'Exporte seus projetos em múltiplos formatos: JSON, CSV, PDF.',
      placement: 'top'
    },
    {
      id: 'feat-4',
      target: '#feat-notifications',
      title: '🔔 Notificações',
      content: 'Receba alertas em tempo real sobre atualizações importantes.',
      placement: 'left'
    }
  ];

  // 4. Tour de Ferramentas - Ferramentas do editor
  toolsSteps: TourStep[] = [
    {
      id: 'tool-1',
      target: '#tool-palette',
      title: '🎨 Paleta de Cores',
      content: 'Escolha cores do seu brand para aplicar automaticamente.',
      placement: 'right'
    },
    {
      id: 'tool-2',
      target: '#tool-components',
      title: '🧩 Componentes',
      content: 'Arraste e solte componentes prontos no canvas.',
      placement: 'bottom'
    },
    {
      id: 'tool-3',
      target: '#tool-preview',
      title: '👁️ Preview',
      content: 'Visualize seu projeto em diferentes dispositivos.',
      placement: 'left'
    }
  ];

  // 5. Tour Rápido - Tour curto para usuários experientes
  quickSteps: TourStep[] = [
    {
      id: 'quick-1',
      target: '#quick-new',
      title: '⚡ Início Rápido',
      content: 'Novo projeto → Selecione template → Comece a editar!',
      placement: 'bottom'
    },
    {
      id: 'quick-2',
      target: '#quick-shortcuts',
      title: '🚀 Produtividade',
      content: 'Ctrl+S salva, Ctrl+D duplica, Ctrl+Z desfaz.',
      placement: 'right'
    }
  ];

  // 6. Tour de Colaboração - Recursos de equipe
  collaborationSteps: TourStep[] = [
    {
      id: 'collab-1',
      target: '#collab-share',
      title: '🔗 Compartilhar',
      content: 'Gere links de compartilhamento com permissões personalizadas.',
      placement: 'bottom'
    },
    {
      id: 'collab-2',
      target: '#collab-comments',
      title: '💬 Comentários',
      content: 'Deixe comentários em qualquer elemento do projeto.',
      placement: 'right'
    },
    {
      id: 'collab-3',
      target: '#collab-versions',
      title: '📜 Histórico',
      content: 'Veja todas as versões e restaure quando necessário.',
      placement: 'left'
    },
    {
      id: 'collab-4',
      target: '#collab-live',
      title: '🟢 Edição ao Vivo',
      content: 'Veja cursores de outros usuários editando em tempo real.',
      placement: 'top'
    }
  ];

  // 7. Tour de Integração - APIs e conectores
  integrationSteps: TourStep[] = [
    {
      id: 'int-1',
      target: '#int-api',
      title: '🔌 API REST',
      content: 'Conecte com qualquer API REST para dados dinâmicos.',
      placement: 'bottom'
    },
    {
      id: 'int-2',
      target: '#int-database',
      title: '🗄️ Banco de Dados',
      content: 'Integração direta com PostgreSQL, MongoDB e Firebase.',
      placement: 'right'
    },
    {
      id: 'int-3',
      target: '#int-webhooks',
      title: '🪝 Webhooks',
      content: 'Configure webhooks para automações e notificações.',
      placement: 'left'
    }
  ];

  // 8. Tour de Deploy - Publicação e CI/CD
  deploySteps: TourStep[] = [
    {
      id: 'deploy-1',
      target: '#deploy-build',
      title: '🏗️ Build',
      content: 'Configure o processo de build com otimizações automáticas.',
      placement: 'bottom'
    },
    {
      id: 'deploy-2',
      target: '#deploy-env',
      title: '🌍 Ambientes',
      content: 'Gerencie Dev, Staging e Produção com variáveis diferentes.',
      placement: 'right'
    },
    {
      id: 'deploy-3',
      target: '#deploy-publish',
      title: '🚀 Publicar',
      content: 'Deploy com um clique para Vercel, Netlify ou AWS.',
      placement: 'top'
    },
    {
      id: 'deploy-4',
      target: '#deploy-monitor',
      title: '📈 Monitoramento',
      content: 'Acompanhe performance, erros e analytics em tempo real.',
      placement: 'left'
    }
  ];

  // 9. Tour de Acessibilidade - Recursos de A11y
  accessibilitySteps: TourStep[] = [
    {
      id: 'a11y-1',
      target: '#a11y-checker',
      title: '♿ Verificador A11y',
      content: 'Análise automática de acessibilidade com sugestões de correção.',
      placement: 'bottom'
    },
    {
      id: 'a11y-2',
      target: '#a11y-keyboard',
      title: '⌨️ Navegação por Teclado',
      content: 'Teste a navegação completa usando apenas o teclado.',
      placement: 'right'
    },
    {
      id: 'a11y-3',
      target: '#a11y-screen-reader',
      title: '📢 Screen Reader',
      content: 'Preview de como leitores de tela interpretam seu conteúdo.',
      placement: 'left'
    }
  ];

  // 10. Tour Avançado - Recursos para desenvolvedores
  advancedSteps: TourStep[] = [
    {
      id: 'adv-1',
      target: '#adv-custom-code',
      title: '💻 Código Customizado',
      content: 'Adicione JavaScript, CSS e HTML personalizados.',
      placement: 'bottom'
    },
    {
      id: 'adv-2',
      target: '#adv-plugins',
      title: '🔧 Plugins',
      content: 'Instale plugins da comunidade ou crie os seus próprios.',
      placement: 'right'
    },
    {
      id: 'adv-3',
      target: '#adv-devtools',
      title: '🛠️ DevTools',
      content: 'Console, debugger e inspector integrados.',
      placement: 'left'
    },
    {
      id: 'adv-4',
      target: '#adv-version-control',
      title: '🔀 Git Integration',
      content: 'Controle de versão integrado com GitHub, GitLab e Bitbucket.',
      placement: 'top'
    },
    {
      id: 'adv-5',
      target: '#adv-testing',
      title: '🧪 Testing',
      content: 'Execute testes unitários e E2E diretamente na plataforma.',
      placement: 'bottom'
    }
  ];

  typescriptCode = `import { TourGuideComponent, TourStep } from '@muxima-ui/tour-guide';

steps: TourStep[] = [
  {
    id: '1',
    target: '#welcome',
    title: 'Bem-vindo!',
    content: 'Este é o início do tour.',
    placement: 'bottom',
    showProgress: true
  }
];

@ViewChild('tourGuide') tourGuide?: TourGuideComponent;

startTour() {
  this.tourGuide?.start();
}

onTourComplete() {
  console.log('Tour completed!');
}`;

  htmlCode = `<muxima-tour-guide
  #tourGuide
  [steps]="steps"
  [isActive]="showTour"
  [showProgress]="true"
  [allowClose]="true"
  (tourComplete)="onTourComplete()"
  (tourSkip)="onTourSkip()">
</muxima-tour-guide>

<button (click)="startTour()">Iniciar Tour</button>`;

  // Métodos para controlar os tours
  startBasicTour() {
    this.basicTour?.start();
  }

  startOnboardingTour() {
    this.onboardingTour?.start();
  }

  startFeatureTour() {
    this.featureTour?.start();
  }

  onTourComplete() {
    console.log('Tour completed!');
    alert('🎉 Tour concluído com sucesso!');
  }

  onTourSkip() {
    console.log('Tour skipped');
  }
}
