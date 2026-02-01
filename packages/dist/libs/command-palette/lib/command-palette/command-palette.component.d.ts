import { EventEmitter, OnInit, OnDestroy } from '@angular/core';
import * as i0 from "@angular/core";
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
export declare class CommandPaletteComponent implements OnInit, OnDestroy {
    commands: CommandItem[];
    placeholder: string;
    shortcut: string;
    maxResults: number;
    commandExecuted: EventEmitter<CommandItem>;
    closed: EventEmitter<void>;
    isOpen: boolean;
    searchQuery: string;
    filteredCommands: CommandItem[];
    selectedIndex: number;
    categories: CommandCategory[];
    ngOnInit(): void;
    ngOnDestroy(): void;
    handleKeyboardShortcut(event: KeyboardEvent): void;
    open(): void;
    close(): void;
    toggle(): void;
    filterCommands(): void;
    groupByCategory(): void;
    executeCommand(command: CommandItem): void;
    executeSelected(): void;
    selectCommand(index: number): void;
    scrollToSelected(): void;
    onOverlayClick(): void;
    onSearchChange(): void;
    highlightMatch(text: string): string;
    getGlobalIndex(categoryIndex: number, itemIndex: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<CommandPaletteComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CommandPaletteComponent, "muxima-command-palette", never, { "commands": "commands"; "placeholder": "placeholder"; "shortcut": "shortcut"; "maxResults": "maxResults"; }, { "commandExecuted": "commandExecuted"; "closed": "closed"; }, never, never, true, never>;
}
