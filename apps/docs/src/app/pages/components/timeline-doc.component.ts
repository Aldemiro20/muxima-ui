import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimelineTimelineComponent, TimelineItem } from '@muxima-ui/timeline';


@Component({
  selector: 'muxima-timeline-doc',
  standalone: true,
  imports: [CommonModule, TimelineTimelineComponent],
  templateUrl: './timeline-doc.component.html',
  styleUrls: ['./timeline-doc.component.scss']
})
export class TimelineDocComponent {
  basicItems: TimelineItem[] = [
    {
      title: 'Projeto Iniciado',
      description: 'InÃ­cio do desenvolvimento da biblioteca Muxima UI',
      date: '01 Jan 2026',
      time: '09:00',
      status: 'completed',
      color: 'green'
    },
    {
      title: 'Componentes Base',
      description: 'CriaÃ§Ã£o dos componentes principais: Button, Card, Badge',
      date: '05 Jan 2026',
      time: '14:30',
      status: 'completed',
      color: 'green'
    },
    {
      title: 'DocumentaÃ§Ã£o',
      description: 'Desenvolvimento da documentaÃ§Ã£o interativa',
      date: '13 Jan 2026',
      time: '10:15',
      status: 'current',
      color: 'blue'
    },
    {
      title: 'Release 1.0',
      description: 'Primeira versÃ£o estÃ¡vel da biblioteca',
      date: '20 Jan 2026',
      status: 'upcoming',
      color: 'gray'
    }
  ];

  statusItems: TimelineItem[] = [
    {
      title: 'Build Completo',
      description: 'Todos os testes passaram com sucesso',
      date: 'Hoje',
      time: '08:30',
      icon: 'âœ…',
      status: 'completed'
    },
    {
      title: 'Deploy em Progresso',
      description: 'Fazendo deploy para produÃ§Ã£o',
      date: 'Hoje',
      time: '09:00',
      icon: 'ðŸš€',
      status: 'current'
    },
    {
      title: 'Monitoramento',
      description: 'Verificar mÃ©tricas e performance',
      date: 'Hoje',
      time: '09:30',
      icon: 'ðŸ“Š',
      status: 'upcoming'
    },
    {
      title: 'Erro Detectado',
      description: 'Problema na configuraÃ§Ã£o do servidor',
      date: 'Hoje',
      time: '09:15',
      icon: 'âŒ',
      status: 'error'
    }
  ];

  orderItems: TimelineItem[] = [
    {
      title: 'Pedido Confirmado',
      description: 'Seu pedido #12345 foi confirmado',
      date: '13 Jan',
      time: '10:00',
      icon: 'ðŸ“¦',
      status: 'completed',
      color: 'green'
    },
    {
      title: 'Em PreparaÃ§Ã£o',
      description: 'Separando produtos',
      date: '13 Jan',
      time: '11:30',
      icon: 'ðŸ“‹',
      status: 'completed',
      color: 'green'
    },
    {
      title: 'Em Transporte',
      description: 'Saiu para entrega',
      date: '13 Jan',
      time: '14:00',
      icon: 'ðŸšš',
      status: 'current',
      color: 'blue'
    },
    {
      title: 'Entregue',
      description: 'PrevisÃ£o de entrega',
      date: '14 Jan',
      icon: 'ðŸ ',
      status: 'upcoming',
      color: 'gray'
    }
  ];

  copyCode(code: string): void {
    navigator.clipboard.writeText(code);
  }

  get importCode(): string {
    return `import { TimelineTimelineComponent, TimelineItem } from '@muxima-ui/timeline';

@Component({
  imports: [TimelineTimelineComponent]
})`;
  }

  get basicCode(): string {
    return `<muxima-timeline [items]="timelineItems"></muxima-timeline>

// Component
timelineItems: TimelineItem[] = [
  {
    title: 'Projeto Iniciado',
    description: 'InÃ­cio do desenvolvimento',
    date: '01 Jan 2026',
    status: 'completed',
    color: 'green'
  }
];`;
  }

  get verticalCode(): string {
    return `<muxima-timeline 
  [items]="items" 
  mode="vertical"
  align="left">
</muxima-timeline>`;
  }

  get statusCode(): string {
    return `<muxima-timeline [items]="items"></muxima-timeline>

// Items with different status
items: TimelineItem[] = [
  { title: 'Done', status: 'completed', color: 'green' },
  { title: 'Current', status: 'current', color: 'blue' },
  { title: 'Next', status: 'upcoming', color: 'gray' },
  { title: 'Error', status: 'error', color: 'red' }
];`;
  }
}
