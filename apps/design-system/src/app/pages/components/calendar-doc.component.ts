import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent, CalendarEvent } from '@muxima-ui/calendar';

@Component({
  selector: 'app-calendar-doc',
  standalone: true,
  imports: [CommonModule, CalendarComponent],
  templateUrl: './calendar-doc.component.html',
  styleUrls: ['./calendar-doc.component.scss']
})
export class CalendarDocComponent {
  events: CalendarEvent[] = [
    // Eventos de hoje
    {
      id: 1,
      title: '☕ Stand-up Diário',
      start: new Date(2026, 0, 20, 9, 0),
      end: new Date(2026, 0, 20, 9, 15),
      color: '#667eea',
      category: 'Reunião',
      description: 'Daily meeting com a equipe de desenvolvimento'
    },
    {
      id: 2,
      title: '💼 Reunião de Projeto',
      start: new Date(2026, 0, 20, 10, 0),
      end: new Date(2026, 0, 20, 11, 30),
      color: '#667eea',
      category: 'Trabalho',
      location: 'Sala de Conferência A'
    },
    {
      id: 3,
      title: '🍽️ Almoço com Cliente',
      start: new Date(2026, 0, 20, 12, 0),
      end: new Date(2026, 0, 20, 13, 30),
      color: '#f6ad55',
      category: 'Negócios',
      location: 'Restaurante Premium'
    },
    {
      id: 4,
      title: '🎯 Sprint Planning',
      start: new Date(2026, 0, 20, 14, 0),
      end: new Date(2026, 0, 20, 16, 0),
      color: '#667eea',
      category: 'Planejamento',
      attendees: ['João', 'Maria', 'Carlos']
    },
    // Eventos de amanhã
    {
      id: 5,
      title: '📚 Workshop Angular',
      start: new Date(2026, 0, 21),
      end: new Date(2026, 0, 21, 23, 59),
      allDay: true,
      color: '#48bb78',
      category: 'Treinamento',
      description: 'Workshop completo sobre Angular 18'
    },
    {
      id: 6,
      title: '🏋️ Academia',
      start: new Date(2026, 0, 21, 7, 0),
      end: new Date(2026, 0, 21, 8, 0),
      color: '#f56565',
      category: 'Pessoal'
    },
    // Próxima semana
    {
      id: 7,
      title: '🎉 Aniversário João',
      start: new Date(2026, 0, 22),
      end: new Date(2026, 0, 22, 23, 59),
      allDay: true,
      color: '#ed64a6',
      category: 'Pessoal'
    },
    {
      id: 8,
      title: '📊 Review Semanal',
      start: new Date(2026, 0, 23, 15, 0),
      end: new Date(2026, 0, 23, 16, 0),
      color: '#667eea',
      category: 'Reunião'
    },
    {
      id: 9,
      title: '🚀 Deploy Produção',
      start: new Date(2026, 0, 24, 18, 0),
      end: new Date(2026, 0, 24, 19, 0),
      color: '#f6ad55',
      category: 'Desenvolvimento',
      description: 'Deploy da versão 2.0 em produção'
    },
    {
      id: 10,
      title: '🎓 Palestra Tech',
      start: new Date(2026, 0, 25, 10, 0),
      end: new Date(2026, 0, 25, 12, 0),
      color: '#4299e1',
      category: 'Evento',
      location: 'Auditório Principal'
    },
    {
      id: 11,
      title: '✈️ Viagem de Negócios',
      start: new Date(2026, 0, 27),
      end: new Date(2026, 0, 29, 23, 59),
      allDay: true,
      color: '#805ad5',
      category: 'Viagem',
      description: 'Reuniões com clientes em São Paulo'
    },
    {
      id: 12,
      title: '🎮 Game Night',
      start: new Date(2026, 0, 26, 19, 0),
      end: new Date(2026, 0, 26, 22, 0),
      color: '#ed8936',
      category: 'Lazer'
    },
    // Eventos recorrentes
    {
      id: 13,
      title: '🧘 Yoga',
      start: new Date(2026, 0, 22, 6, 30),
      end: new Date(2026, 0, 22, 7, 30),
      color: '#38b2ac',
      category: 'Saúde',
      recurring: 'weekly'
    },
    {
      id: 14,
      title: '📞 Call com Time',
      start: new Date(2026, 0, 21, 16, 0),
      end: new Date(2026, 0, 21, 17, 0),
      color: '#667eea',
      category: 'Reunião',
      recurring: 'daily'
    }
  ];

  // Função para adicionar novo evento
  addEvent() {
    const newEvent: CalendarEvent = {
      id: this.events.length + 1,
      title: '📝 Novo Evento',
      start: new Date(2026, 0, 20, 15, 0),
      end: new Date(2026, 0, 20, 16, 0),
      color: '#667eea',
      category: 'Novo'
    };
    this.events = [...this.events, newEvent];
    console.log('Evento adicionado:', newEvent);
  }

  // Função chamada ao clicar em um evento
  onEventClick(event: CalendarEvent) {
    console.log('Evento clicado:', event);
    alert(`Evento: ${event.title}\nHorário: ${event.start.toLocaleString()}`);
  }

  // Função chamada ao clicar em uma data
  onDateClick(date: Date) {
    const title = prompt('Título do evento:');
    if (title) {
      const newEvent: CalendarEvent = {
        id: this.events.length + 1,
        title: title,
        start: date,
        end: new Date(date.getTime() + 60 * 60 * 1000), // +1 hora
        color: '#667eea',
        category: 'Novo'
      };
      this.events = [...this.events, newEvent];
      console.log('Evento criado:', newEvent);
    }
  }
}
