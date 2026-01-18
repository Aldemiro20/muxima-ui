import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanComponent, KanbanColumn, KanbanCard } from '@muxima-ui/kanban';

@Component({
  selector: 'app-kanban-doc',
  standalone: true,
  imports: [CommonModule, KanbanComponent],
  templateUrl: './kanban-doc.component.html',
  styleUrls: ['./kanban-doc.component.scss']
})
export class KanbanDocComponent {
  // Exemplo básico
  basicColumns: KanbanColumn[] = [
    {
      id: 'todo',
      title: 'A Fazer',
      color: '#667eea',
      cards: [
        {
          id: 1,
          title: 'Implementar autenticação',
          description: 'Adicionar login com OAuth2',
          priority: 'high',
          tags: ['Backend', 'Segurança'],
          assignee: 'João Silva',
          dueDate: new Date(2026, 0, 20),
          attachments: 2,
          comments: 3
        },
        {
          id: 2,
          title: 'Criar dashboard',
          description: 'Dashboard com gráficos e métricas',
          priority: 'medium',
          tags: ['Frontend', 'UI'],
          assignee: 'Maria Santos',
          dueDate: new Date(2026, 0, 25)
        }
      ]
    },
    {
      id: 'doing',
      title: 'Em Progresso',
      color: '#f6ad55',
      limit: 3,
      cards: [
        {
          id: 3,
          title: 'API de usuários',
          description: 'CRUD completo de usuários',
          priority: 'urgent',
          tags: ['Backend', 'API'],
          assignee: 'Pedro Costa',
          comments: 5
        }
      ]
    },
    {
      id: 'review',
      title: 'Em Revisão',
      color: '#9f7aea',
      cards: [
        {
          id: 4,
          title: 'Testes unitários',
          tags: ['Testing'],
          assignee: 'Ana Lima'
        }
      ]
    },
    {
      id: 'done',
      title: 'Concluído',
      color: '#48bb78',
      cards: [
        {
          id: 5,
          title: 'Setup do projeto',
          completed: true,
          tags: ['DevOps']
        }
      ]
    }
  ];

  // Exemplo com limite
  wipColumns: KanbanColumn[] = [
    {
      id: 'backlog',
      title: 'Backlog',
      cards: [
        { id: 11, title: 'Task 1', tags: ['Feature'] },
        { id: 12, title: 'Task 2', tags: ['Bug'] },
        { id: 13, title: 'Task 3', tags: ['Feature'] }
      ]
    },
    {
      id: 'progress',
      title: 'Em Desenvolvimento',
      limit: 2,
      cards: [
        { id: 14, title: 'Task em andamento 1', priority: 'high' },
        { id: 15, title: 'Task em andamento 2', priority: 'medium' }
      ]
    },
    {
      id: 'complete',
      title: 'Completo',
      cards: []
    }
  ];

  // Exemplo compacto
  compactColumns: KanbanColumn[] = [
    {
      id: 'c1',
      title: 'Sprint 1',
      cards: [
        { id: 21, title: 'Feature A', priority: 'high' },
        { id: 22, title: 'Feature B', priority: 'low' }
      ]
    },
    {
      id: 'c2',
      title: 'Sprint 2',
      cards: [
        { id: 23, title: 'Feature C' }
      ]
    }
  ];

  onCardMoved(event: any) {
    console.log('Card movido:', event);
  }

  onCardClicked(card: KanbanCard) {
    console.log('Card clicado:', card);
    alert(`Card: ${card.title}\n${card.description || 'Sem descrição'}`);
  }

  onCardDeleted(card: KanbanCard) {
    console.log('Card deletado:', card);
  }

  onColumnAdded(title: string) {
    const newColumn: KanbanColumn = {
      id: Date.now(),
      title: title,
      cards: []
    };
    this.basicColumns.push(newColumn);
    console.log('Coluna adicionada:', newColumn);
  }

  onCardAdded(event: { columnId: string | number; title: string }) {
    const column = this.basicColumns.find(col => col.id === event.columnId);
    if (column) {
      const newCard: KanbanCard = {
        id: Date.now(),
        title: event.title
      };
      column.cards.push(newCard);
      console.log('Card adicionado:', newCard);
    }
  }
}
