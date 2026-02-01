import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, HostListener } from '@angular/core';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { FormsModule } from '@angular/forms';

class CommandPaletteComponent {
    constructor() {
        this.commands = [];
        this.placeholder = 'Digite um comando...';
        this.shortcut = 'Ctrl+K';
        this.maxResults = 10;
        this.commandExecuted = new EventEmitter();
        this.closed = new EventEmitter();
        this.isOpen = false;
        this.searchQuery = '';
        this.filteredCommands = [];
        this.selectedIndex = 0;
        this.categories = [];
    }
    ngOnInit() {
        this.filterCommands();
        this.groupByCategory();
    }
    ngOnDestroy() {
        this.close();
    }
    handleKeyboardShortcut(event) {
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
            }
            else if (event.key === 'ArrowUp') {
                event.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.scrollToSelected();
            }
            else if (event.key === 'Enter') {
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
            const input = document.querySelector('.command-input');
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
        }
        else {
            this.open();
        }
    }
    filterCommands() {
        const query = this.searchQuery.toLowerCase().trim();
        if (!query) {
            this.filteredCommands = this.commands.slice(0, this.maxResults);
        }
        else {
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
        if (this.selectedIndex < 0)
            this.selectedIndex = 0;
        this.groupByCategory();
    }
    groupByCategory() {
        const categoryMap = new Map();
        this.filteredCommands.forEach(cmd => {
            const category = cmd.category || 'Geral';
            if (!categoryMap.has(category)) {
                categoryMap.set(category, []);
            }
            categoryMap.get(category).push(cmd);
        });
        this.categories = Array.from(categoryMap.entries()).map(([id, items]) => ({
            id,
            label: id,
            items
        }));
    }
    executeCommand(command) {
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
    selectCommand(index) {
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
    highlightMatch(text) {
        if (!this.searchQuery)
            return text;
        const query = this.searchQuery.toLowerCase();
        const lowerText = text.toLowerCase();
        let result = '';
        let queryIndex = 0;
        for (let i = 0; i < text.length; i++) {
            if (queryIndex < query.length && lowerText[i] === query[queryIndex]) {
                result += `<mark>${text[i]}</mark>`;
                queryIndex++;
            }
            else {
                result += text[i];
            }
        }
        return result;
    }
    getGlobalIndex(categoryIndex, itemIndex) {
        let index = 0;
        for (let i = 0; i < categoryIndex; i++) {
            index += this.categories[i].items.length;
        }
        return index + itemIndex;
    }
}
CommandPaletteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CommandPaletteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CommandPaletteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.10", type: CommandPaletteComponent, isStandalone: true, selector: "muxima-command-palette", inputs: { commands: "commands", placeholder: "placeholder", shortcut: "shortcut", maxResults: "maxResults" }, outputs: { commandExecuted: "commandExecuted", closed: "closed" }, host: { listeners: { "document:keydown": "handleKeyboardShortcut($event)" } }, ngImport: i0, template: "<div class=\"command-palette-wrapper\" *ngIf=\"isOpen\">\r\n  <!-- Overlay -->\r\n  <div class=\"command-overlay\" (click)=\"onOverlayClick()\"></div>\r\n\r\n  <!-- Palette -->\r\n  <div class=\"command-palette\">\r\n    <!-- Search Input -->\r\n    <div class=\"command-search\">\r\n      <svg class=\"search-icon\" viewBox=\"0 0 24 24\" width=\"20\" height=\"20\">\r\n        <path fill=\"currentColor\" d=\"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z\" />\r\n      </svg>\r\n      <input\r\n        type=\"text\"\r\n        class=\"command-input\"\r\n        [(ngModel)]=\"searchQuery\"\r\n        (ngModelChange)=\"onSearchChange()\"\r\n        [placeholder]=\"placeholder\"\r\n        autofocus>\r\n      <kbd class=\"shortcut-hint\">ESC</kbd>\r\n    </div>\r\n\r\n    <!-- Results -->\r\n    <div class=\"command-results\" *ngIf=\"filteredCommands.length > 0\">\r\n      <div *ngFor=\"let category of categories\" class=\"command-category\">\r\n        <div class=\"category-label\">{{ category.label }}</div>\r\n        \r\n        <div\r\n          *ngFor=\"let command of category.items; let i = index\"\r\n          class=\"command-item\"\r\n          [class.selected]=\"getGlobalIndex(categories.indexOf(category), i) === selectedIndex\"\r\n          (click)=\"executeCommand(command)\"\r\n          (mouseenter)=\"selectCommand(getGlobalIndex(categories.indexOf(category), i))\">\r\n          \r\n          <div class=\"command-icon\" *ngIf=\"command.icon\">{{ command.icon }}</div>\r\n          \r\n          <div class=\"command-content\">\r\n            <div class=\"command-label\" [innerHTML]=\"highlightMatch(command.label)\"></div>\r\n            <div class=\"command-description\" *ngIf=\"command.description\">{{ command.description }}</div>\r\n          </div>\r\n\r\n          <kbd class=\"command-shortcut\" *ngIf=\"command.shortcut\">{{ command.shortcut }}</kbd>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- No Results -->\r\n    <div class=\"command-empty\" *ngIf=\"filteredCommands.length === 0 && searchQuery\">\r\n      <svg viewBox=\"0 0 24 24\" width=\"48\" height=\"48\">\r\n        <path fill=\"currentColor\" d=\"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z\" />\r\n      </svg>\r\n      <p>Nenhum comando encontrado</p>\r\n    </div>\r\n\r\n    <!-- Footer -->\r\n    <div class=\"command-footer\">\r\n      <div class=\"footer-hint\">\r\n        <kbd>\u2191</kbd><kbd>\u2193</kbd> navegar\r\n        <kbd>\u21B5</kbd> selecionar\r\n        <kbd>ESC</kbd> fechar\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".command-palette-wrapper{position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding-top:15vh;animation:fadeIn .15s ease}.command-overlay{position:absolute;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px)}.command-palette{position:relative;width:100%;max-width:640px;background:#1a202c;border-radius:12px;box-shadow:0 24px 48px #00000080,0 0 0 1px #667eea4d;overflow:hidden;animation:slideUp .2s ease}.command-search{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.1);background:linear-gradient(135deg,rgba(102,126,234,.1) 0%,rgba(118,75,162,.1) 100%)}.command-search .search-icon{color:#667eea;flex-shrink:0}.command-search .command-input{flex:1;background:transparent;border:none;color:#f7fafc;font-size:16px;outline:none}.command-search .command-input::placeholder{color:#a0aec0}.command-search .shortcut-hint{background:rgba(255,255,255,.05);color:#a0aec0;padding:4px 8px;border-radius:4px;font-size:12px;font-family:Monaco,monospace;border:1px solid rgba(255,255,255,.1)}.command-results{max-height:400px;overflow-y:auto}.command-results::-webkit-scrollbar{width:8px}.command-results::-webkit-scrollbar-track{background:transparent}.command-results::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:4px}.command-category .category-label{padding:12px 20px 8px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#667eea}.command-item{display:flex;align-items:center;gap:12px;padding:12px 20px;cursor:pointer;transition:all .15s ease}.command-item:hover,.command-item.selected{background:linear-gradient(135deg,rgba(102,126,234,.15) 0%,rgba(118,75,162,.15) 100%)}.command-item:hover .command-icon,.command-item.selected .command-icon{transform:scale(1.1)}.command-item .command-icon{font-size:20px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:8px;flex-shrink:0;transition:transform .2s ease}.command-item .command-content{flex:1;min-width:0}.command-item .command-content .command-label{color:#f7fafc;font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.command-item .command-content .command-label ::ng-deep mark{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:2px 4px;border-radius:3px;font-weight:600}.command-item .command-content .command-description{color:#a0aec0;font-size:12px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.command-item .command-shortcut{background:rgba(255,255,255,.05);color:#a0aec0;padding:4px 8px;border-radius:4px;font-size:11px;font-family:Monaco,monospace;border:1px solid rgba(255,255,255,.1);flex-shrink:0}.command-empty{padding:60px 20px;text-align:center;color:#a0aec0}.command-empty svg{opacity:.3;margin-bottom:16px}.command-empty p{font-size:14px}.command-footer{padding:12px 20px;border-top:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.2)}.command-footer .footer-hint{display:flex;align-items:center;gap:12px;font-size:12px;color:#a0aec0}.command-footer .footer-hint kbd{background:rgba(255,255,255,.05);padding:3px 6px;border-radius:3px;font-family:Monaco,monospace;font-size:11px;border:1px solid rgba(255,255,255,.1)}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideUp{0%{opacity:0;transform:translateY(20px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}@media (max-width: 768px){.command-palette-wrapper{padding:16px;padding-top:10vh}.command-palette{max-width:100%}}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.10", ngImport: i0, type: CommandPaletteComponent, decorators: [{
            type: Component,
            args: [{ selector: 'muxima-command-palette', standalone: true, imports: [CommonModule, FormsModule], template: "<div class=\"command-palette-wrapper\" *ngIf=\"isOpen\">\r\n  <!-- Overlay -->\r\n  <div class=\"command-overlay\" (click)=\"onOverlayClick()\"></div>\r\n\r\n  <!-- Palette -->\r\n  <div class=\"command-palette\">\r\n    <!-- Search Input -->\r\n    <div class=\"command-search\">\r\n      <svg class=\"search-icon\" viewBox=\"0 0 24 24\" width=\"20\" height=\"20\">\r\n        <path fill=\"currentColor\" d=\"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z\" />\r\n      </svg>\r\n      <input\r\n        type=\"text\"\r\n        class=\"command-input\"\r\n        [(ngModel)]=\"searchQuery\"\r\n        (ngModelChange)=\"onSearchChange()\"\r\n        [placeholder]=\"placeholder\"\r\n        autofocus>\r\n      <kbd class=\"shortcut-hint\">ESC</kbd>\r\n    </div>\r\n\r\n    <!-- Results -->\r\n    <div class=\"command-results\" *ngIf=\"filteredCommands.length > 0\">\r\n      <div *ngFor=\"let category of categories\" class=\"command-category\">\r\n        <div class=\"category-label\">{{ category.label }}</div>\r\n        \r\n        <div\r\n          *ngFor=\"let command of category.items; let i = index\"\r\n          class=\"command-item\"\r\n          [class.selected]=\"getGlobalIndex(categories.indexOf(category), i) === selectedIndex\"\r\n          (click)=\"executeCommand(command)\"\r\n          (mouseenter)=\"selectCommand(getGlobalIndex(categories.indexOf(category), i))\">\r\n          \r\n          <div class=\"command-icon\" *ngIf=\"command.icon\">{{ command.icon }}</div>\r\n          \r\n          <div class=\"command-content\">\r\n            <div class=\"command-label\" [innerHTML]=\"highlightMatch(command.label)\"></div>\r\n            <div class=\"command-description\" *ngIf=\"command.description\">{{ command.description }}</div>\r\n          </div>\r\n\r\n          <kbd class=\"command-shortcut\" *ngIf=\"command.shortcut\">{{ command.shortcut }}</kbd>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <!-- No Results -->\r\n    <div class=\"command-empty\" *ngIf=\"filteredCommands.length === 0 && searchQuery\">\r\n      <svg viewBox=\"0 0 24 24\" width=\"48\" height=\"48\">\r\n        <path fill=\"currentColor\" d=\"M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z\" />\r\n      </svg>\r\n      <p>Nenhum comando encontrado</p>\r\n    </div>\r\n\r\n    <!-- Footer -->\r\n    <div class=\"command-footer\">\r\n      <div class=\"footer-hint\">\r\n        <kbd>\u2191</kbd><kbd>\u2193</kbd> navegar\r\n        <kbd>\u21B5</kbd> selecionar\r\n        <kbd>ESC</kbd> fechar\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".command-palette-wrapper{position:fixed;inset:0;z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding-top:15vh;animation:fadeIn .15s ease}.command-overlay{position:absolute;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px)}.command-palette{position:relative;width:100%;max-width:640px;background:#1a202c;border-radius:12px;box-shadow:0 24px 48px #00000080,0 0 0 1px #667eea4d;overflow:hidden;animation:slideUp .2s ease}.command-search{display:flex;align-items:center;gap:12px;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.1);background:linear-gradient(135deg,rgba(102,126,234,.1) 0%,rgba(118,75,162,.1) 100%)}.command-search .search-icon{color:#667eea;flex-shrink:0}.command-search .command-input{flex:1;background:transparent;border:none;color:#f7fafc;font-size:16px;outline:none}.command-search .command-input::placeholder{color:#a0aec0}.command-search .shortcut-hint{background:rgba(255,255,255,.05);color:#a0aec0;padding:4px 8px;border-radius:4px;font-size:12px;font-family:Monaco,monospace;border:1px solid rgba(255,255,255,.1)}.command-results{max-height:400px;overflow-y:auto}.command-results::-webkit-scrollbar{width:8px}.command-results::-webkit-scrollbar-track{background:transparent}.command-results::-webkit-scrollbar-thumb{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:4px}.command-category .category-label{padding:12px 20px 8px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.5px;color:#667eea}.command-item{display:flex;align-items:center;gap:12px;padding:12px 20px;cursor:pointer;transition:all .15s ease}.command-item:hover,.command-item.selected{background:linear-gradient(135deg,rgba(102,126,234,.15) 0%,rgba(118,75,162,.15) 100%)}.command-item:hover .command-icon,.command-item.selected .command-icon{transform:scale(1.1)}.command-item .command-icon{font-size:20px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:8px;flex-shrink:0;transition:transform .2s ease}.command-item .command-content{flex:1;min-width:0}.command-item .command-content .command-label{color:#f7fafc;font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.command-item .command-content .command-label ::ng-deep mark{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;padding:2px 4px;border-radius:3px;font-weight:600}.command-item .command-content .command-description{color:#a0aec0;font-size:12px;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.command-item .command-shortcut{background:rgba(255,255,255,.05);color:#a0aec0;padding:4px 8px;border-radius:4px;font-size:11px;font-family:Monaco,monospace;border:1px solid rgba(255,255,255,.1);flex-shrink:0}.command-empty{padding:60px 20px;text-align:center;color:#a0aec0}.command-empty svg{opacity:.3;margin-bottom:16px}.command-empty p{font-size:14px}.command-footer{padding:12px 20px;border-top:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.2)}.command-footer .footer-hint{display:flex;align-items:center;gap:12px;font-size:12px;color:#a0aec0}.command-footer .footer-hint kbd{background:rgba(255,255,255,.05);padding:3px 6px;border-radius:3px;font-family:Monaco,monospace;font-size:11px;border:1px solid rgba(255,255,255,.1)}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes slideUp{0%{opacity:0;transform:translateY(20px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}@media (max-width: 768px){.command-palette-wrapper{padding:16px;padding-top:10vh}.command-palette{max-width:100%}}\n"] }]
        }], propDecorators: { commands: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], shortcut: [{
                type: Input
            }], maxResults: [{
                type: Input
            }], commandExecuted: [{
                type: Output
            }], closed: [{
                type: Output
            }], handleKeyboardShortcut: [{
                type: HostListener,
                args: ['document:keydown', ['$event']]
            }] } });

/**
 * Generated bundle index. Do not edit.
 */

export { CommandPaletteComponent };
//# sourceMappingURL=muxima-ui-command-palette.mjs.map
