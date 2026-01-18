import { Component, Input, Output, EventEmitter, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  shortcut?: string;
  category?: string;
  action?: () => void;
  keywords?: string[];
}

export interface CommandCategory {
  id: string;
  label: string;
  items: CommandItem[];
}

@Component({
  selector: 'muxima-command-palette',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './command-palette.component.html',
  styleUrls: ['./command-palette.component.scss']
})
export class CommandPaletteComponent implements OnInit, OnDestroy {
  @Input() commands: CommandItem[] = [];
  @Input() placeholder = 'Digite um comando...';
  @Input() shortcut = 'Ctrl+K';
  @Input() maxResults = 10;

  @Output() commandExecuted = new EventEmitter<CommandItem>();
  @Output() closed = new EventEmitter<void>();

  isOpen = false;
  searchQuery = '';
  filteredCommands: CommandItem[] = [];
  selectedIndex = 0;
  categories: CommandCategory[] = [];

  ngOnInit() {
    this.filterCommands();
    this.groupByCategory();
  }

  ngOnDestroy() {
    this.close();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardShortcut(event: KeyboardEvent) {
    // Ctrl+K ou Cmd+K para abrir/fechar
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault();
      this.toggle();
    }

    // ESC para fechar
    if (event.key === 'Escape' && this.isOpen) {
      event.preventDefault();
      this.close();
    }

    // Navegação com setas
    if (this.isOpen) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredCommands.length - 1);
        this.scrollToSelected();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
        this.scrollToSelected();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        this.executeSelected();
      }
    }
  }

  open() {
    this.isOpen = true;
    this.searchQuery = '';
    this.selectedIndex = 0;
    this.filterCommands();
    document.body.style.overflow = 'hidden';
    
    // Focus no input após abrir
    setTimeout(() => {
      const input = document.querySelector('.command-input') as HTMLInputElement;
      input?.focus();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.searchQuery = '';
    this.selectedIndex = 0;
    document.body.style.overflow = '';
    this.closed.emit();
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  filterCommands() {
    const query = this.searchQuery.toLowerCase().trim();
    
    if (!query) {
      this.filteredCommands = this.commands.slice(0, this.maxResults);
    } else {
      // Busca fuzzy
      this.filteredCommands = this.commands
        .filter(cmd => {
          const searchableText = [
            cmd.label,
            cmd.description,
            cmd.category,
            ...(cmd.keywords || [])
          ].join(' ').toLowerCase();

          // Verifica se todas as letras da query aparecem na ordem
          let queryIndex = 0;
          for (let i = 0; i < searchableText.length && queryIndex < query.length; i++) {
            if (searchableText[i] === query[queryIndex]) {
              queryIndex++;
            }
          }
          
          return queryIndex === query.length;
        })
        .slice(0, this.maxResults);
    }

    // Resetar índice selecionado
    this.selectedIndex = Math.min(this.selectedIndex, this.filteredCommands.length - 1);
    if (this.selectedIndex < 0) this.selectedIndex = 0;

    this.groupByCategory();
  }

  groupByCategory() {
    const categoryMap = new Map<string, CommandItem[]>();

    this.filteredCommands.forEach(cmd => {
      const category = cmd.category || 'Geral';
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(cmd);
    });

    this.categories = Array.from(categoryMap.entries()).map(([id, items]) => ({
      id,
      label: id,
      items
    }));
  }

  executeCommand(command: CommandItem) {
    if (command.action) {
      command.action();
    }
    this.commandExecuted.emit(command);
    this.close();
  }

  executeSelected() {
    if (this.filteredCommands.length > 0 && this.selectedIndex >= 0) {
      this.executeCommand(this.filteredCommands[this.selectedIndex]);
    }
  }

  selectCommand(index: number) {
    this.selectedIndex = index;
  }

  scrollToSelected() {
    setTimeout(() => {
      const selected = document.querySelector('.command-item.selected');
      selected?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 0);
  }

  onOverlayClick() {
    this.close();
  }

  onSearchChange() {
    this.filterCommands();
  }

  highlightMatch(text: string): string {
    if (!this.searchQuery) return text;

    const query = this.searchQuery.toLowerCase();
    const lowerText = text.toLowerCase();
    let result = '';
    let queryIndex = 0;

    for (let i = 0; i < text.length; i++) {
      if (queryIndex < query.length && lowerText[i] === query[queryIndex]) {
        result += `<mark>${text[i]}</mark>`;
        queryIndex++;
      } else {
        result += text[i];
      }
    }

    return result;
  }

  getGlobalIndex(categoryIndex: number, itemIndex: number): number {
    let index = 0;
    for (let i = 0; i < categoryIndex; i++) {
      index += this.categories[i].items.length;
    }
    return index + itemIndex;
  }
}
