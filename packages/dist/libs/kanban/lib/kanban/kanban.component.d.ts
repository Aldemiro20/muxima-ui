import { EventEmitter } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import * as i0 from "@angular/core";
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
export declare class KanbanComponent {
    columns: KanbanColumn[];
    showLimits: boolean;
    showSearch: boolean;
    allowAddCard: boolean;
    allowAddColumn: boolean;
    compactMode: boolean;
    cardMoved: EventEmitter<{
        card: KanbanCard;
        fromColumn: string | number;
        toColumn: string | number;
        newIndex: number;
    }>;
    cardClicked: EventEmitter<KanbanCard>;
    cardDeleted: EventEmitter<KanbanCard>;
    columnAdded: EventEmitter<string>;
    cardAdded: EventEmitter<{
        columnId: string | number;
        title: string;
    }>;
    searchQuery: string;
    showAddCardForm: {
        [key: string]: boolean;
    };
    newCardTitle: {
        [key: string]: string;
    };
    showAddColumnForm: boolean;
    newColumnTitle: string;
    getColumnIds(): string[];
    drop(event: CdkDragDrop<KanbanCard[]>, columnId: string | number): void;
    getFilteredCards(cards: KanbanCard[]): KanbanCard[];
    onCardClick(card: KanbanCard): void;
    onCardDelete(card: KanbanCard, column: KanbanColumn): void;
    toggleAddCardForm(columnId: string | number): void;
    addCard(columnId: string | number): void;
    toggleAddColumnForm(): void;
    addColumn(): void;
    getPriorityClass(priority?: string): string;
    getPriorityIcon(priority?: string): string;
    isOverLimit(column: KanbanColumn): boolean;
    formatDate(date?: Date): string;
    isOverdue(date?: Date): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<KanbanComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<KanbanComponent, "muxima-kanban", never, { "columns": "columns"; "showLimits": "showLimits"; "showSearch": "showSearch"; "allowAddCard": "allowAddCard"; "allowAddColumn": "allowAddColumn"; "compactMode": "compactMode"; }, { "cardMoved": "cardMoved"; "cardClicked": "cardClicked"; "cardDeleted": "cardDeleted"; "columnAdded": "columnAdded"; "cardAdded": "cardAdded"; }, never, never, true, never>;
}
