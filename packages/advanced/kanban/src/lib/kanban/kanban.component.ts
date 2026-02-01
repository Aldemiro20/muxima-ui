import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface KanbanCard {
  id: string | number;
  title: string;
  description?: string;
  assignee?: string;
  avatar?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  tags?: string[];
  dueDate?: Date;
  attachments?: number;
  comments?: number;
  completed?: boolean;
}

export interface KanbanColumn {
  id: string | number;
  title: string;
  color?: string;
  cards: KanbanCard[];
  limit?: number;
}

@Component({
  selector: 'muxima-kanban',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})
export class KanbanComponent {
  @Input() columns: KanbanColumn[] = [];
  @Input() showLimits = true;
  @Input() showSearch = true;
  @Input() allowAddCard = true;
  @Input() allowAddColumn = true;
  @Input() compactMode = false;

  @Output() cardMoved = new EventEmitter<{ card: KanbanCard; fromColumn: string | number; toColumn: string | number; newIndex: number }>();
  @Output() cardClicked = new EventEmitter<KanbanCard>();
  @Output() cardDeleted = new EventEmitter<KanbanCard>();
  @Output() columnAdded = new EventEmitter<string>();
  @Output() cardAdded = new EventEmitter<{ columnId: string | number; title: string }>();

  searchQuery = '';
  showAddCardForm: { [key: string]: boolean } = {};
  newCardTitle: { [key: string]: string } = {};
  showAddColumnForm = false;
  newColumnTitle = '';

  getColumnIds(): string[] {
    return this.columns.map(col => `column-${col.id}`);
  }

  drop(event: CdkDragDrop<KanbanCard[]>, columnId: string | number) {
    const column = this.columns.find(col => col.id === columnId);
    
    if (event.previousContainer === event.container) {
      // Reordenar dentro da mesma coluna
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Mover entre colunas
      const card = event.previousContainer.data[event.previousIndex];
      
      // Verificar limite da coluna
      if (column?.limit && event.container.data.length >= column.limit) {
        alert(`Esta coluna atingiu o limite de ${column.limit} cards!`);
        return;
      }

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Emitir evento de movimentação
      const fromColumnId = event.previousContainer.id.replace('column-', '');
      this.cardMoved.emit({
        card,
        fromColumn: fromColumnId,
        toColumn: columnId,
        newIndex: event.currentIndex
      });
    }
  }

  getFilteredCards(cards: KanbanCard[]): KanbanCard[] {
    if (!this.searchQuery) return cards;
    
    const query = this.searchQuery.toLowerCase();
    return cards.filter(card => 
      card.title.toLowerCase().includes(query) ||
      card.description?.toLowerCase().includes(query) ||
      card.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }

  onCardClick(card: KanbanCard) {
    this.cardClicked.emit(card);
  }

  onCardDelete(card: KanbanCard, column: KanbanColumn) {
    const index = column.cards.indexOf(card);
    if (index > -1) {
      column.cards.splice(index, 1);
      this.cardDeleted.emit(card);
    }
  }

  toggleAddCardForm(columnId: string | number) {
    this.showAddCardForm[columnId] = !this.showAddCardForm[columnId];
    if (!this.showAddCardForm[columnId]) {
      this.newCardTitle[columnId] = '';
    }
  }

  addCard(columnId: string | number) {
    const title = this.newCardTitle[columnId]?.trim();
    if (!title) return;

    this.cardAdded.emit({ columnId, title });
    this.newCardTitle[columnId] = '';
    this.showAddCardForm[columnId] = false;
  }

  toggleAddColumnForm() {
    this.showAddColumnForm = !this.showAddColumnForm;
    if (!this.showAddColumnForm) {
      this.newColumnTitle = '';
    }
  }

  addColumn() {
    const title = this.newColumnTitle.trim();
    if (!title) return;

    this.columnAdded.emit(title);
    this.newColumnTitle = '';
    this.showAddColumnForm = false;
  }

  getPriorityClass(priority?: string): string {
    switch (priority) {
      case 'urgent': return 'priority-urgent';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  }

  getPriorityIcon(priority?: string): string {
    switch (priority) {
      case 'urgent': return '🔥';
      case 'high': return '⬆️';
      case 'medium': return '➡️';
      case 'low': return '⬇️';
      default: return '';
    }
  }

  isOverLimit(column: KanbanColumn): boolean {
    return !!column.limit && column.cards.length >= column.limit;
  }

  formatDate(date?: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (d.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (d.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    }
    
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  isOverdue(date?: Date): boolean {
    if (!date) return false;
    return new Date(date) < new Date();
  }
}
