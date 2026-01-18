import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface EditorSelection {
  start: number;
  end: number;
  text: string;
}

export interface EditorHistory {
  content: string;
  selection: EditorSelection | null;
}

@Component({
  selector: 'muxima-quill-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuillEditorComponent),
      multi: true
    }
  ]
})
export class QuillEditorComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @ViewChild('editorContent', { static: false }) editorContent!: ElementRef<HTMLDivElement>;

  @Input() placeholder = 'Escreva algo incrível...';
  @Input() readOnly = false;
  @Input() height = '400px';
  @Input() showToolbar = true;
  
  @Output() contentChanged = new EventEmitter<any>();
  @Output() selectionChanged = new EventEmitter<any>();

  value = '';
  disabled = false;
  
  // Tema
  isDarkTheme = true; // Padrão: tema escuro (fundo preto)
  
  // Estatísticas
  wordCount = 0;
  charCount = 0;

  // Estados da toolbar
  isBold = false;
  isItalic = false;
  isUnderline = false;
  isStrike = false;
  currentFontSize = '16px';
  currentFontFamily = 'Arial';
  currentAlignment = 'left';
  currentFormat = 'p';

  // Lista de opções
  fontSizes = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '42px', '48px', '54px'];
  fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Georgia', 'Verdana', 'Trebuchet MS', 'Impact', 'Comic Sans MS'];
  formats = [
    { value: 'p', label: 'Parágrafo' },
    { value: 'h1', label: 'Título 1' },
    { value: 'h2', label: 'Título 2' },
    { value: 'h3', label: 'Título 3' },
    { value: 'h4', label: 'Título 4' },
    { value: 'h5', label: 'Título 5' },
    { value: 'h6', label: 'Título 6' }
  ];

  // Histórico (Undo/Redo)
  private history: EditorHistory[] = [];
  private historyIndex = -1;
  private isRestoring = false;

  // Color pickers
  showColorPicker = false;
  showBgColorPicker = false;
  currentColor = '#000000';
  currentBgColor = '#ffffff';

  // Modais
  showLinkModal = false;
  showImageModal = false;
  showTableModal = false;
  linkUrl = '';
  linkText = '';
  imageUrl = '';
  tableRows = 3;
  tableCols = 3;

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  ngAfterViewInit() {
    if (this.editorContent) {
      this.editorContent.nativeElement.innerHTML = this.value;
      this.updateStats();
      this.setupListeners();
    }
  }

  ngOnDestroy() {
    // Cleanup
  }

  setupListeners() {
    const editor = this.editorContent.nativeElement;

    // Input event
    editor.addEventListener('input', () => {
      this.onContentChange();
    });

    // Selection change
    document.addEventListener('selectionchange', () => {
      this.updateToolbarState();
    });

    // Keyboard shortcuts
    editor.addEventListener('keydown', (e: KeyboardEvent) => {
      this.handleKeyboardShortcuts(e);
    });

    // Paste event - limpar formatação indesejada
    editor.addEventListener('paste', (e: ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData?.getData('text/plain') || '';
      document.execCommand('insertText', false, text);
    });
  }

  handleKeyboardShortcuts(e: KeyboardEvent) {
    const ctrl = e.ctrlKey || e.metaKey;

    if (ctrl && e.key === 'b') {
      e.preventDefault();
      this.toggleBold();
    } else if (ctrl && e.key === 'i') {
      e.preventDefault();
      this.toggleItalic();
    } else if (ctrl && e.key === 'u') {
      e.preventDefault();
      this.toggleUnderline();
    } else if (ctrl && e.key === 'z') {
      e.preventDefault();
      this.undo();
    } else if (ctrl && e.key === 'y') {
      e.preventDefault();
      this.redo();
    } else if (ctrl && e.key === 'k') {
      e.preventDefault();
      this.openLinkModal();
    }
  }

  onContentChange() {
    if (this.isRestoring) return;

    const content = this.editorContent.nativeElement.innerHTML;
    this.value = content;
    this.onChange(content);
    this.onTouched();
    this.updateStats();
    this.saveToHistory();
    
    this.contentChanged.emit({
      html: content,
      text: this.editorContent.nativeElement.innerText,
      wordCount: this.wordCount,
      charCount: this.charCount
    });
  }

  updateStats() {
    const text = this.editorContent.nativeElement.innerText || '';
    this.charCount = text.length;
    this.wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  updateToolbarState() {
    this.isBold = document.queryCommandState('bold');
    this.isItalic = document.queryCommandState('italic');
    this.isUnderline = document.queryCommandState('underline');
    this.isStrike = document.queryCommandState('strikeThrough');
  }

  saveToHistory() {
    if (this.isRestoring) return;

    const state: EditorHistory = {
      content: this.editorContent.nativeElement.innerHTML,
      selection: this.getSelection()
    };

    // Remover histórico futuro se estiver no meio
    this.history = this.history.slice(0, this.historyIndex + 1);
    
    // Adicionar novo estado
    this.history.push(state);
    this.historyIndex++;

    // Limitar histórico a 50 itens
    if (this.history.length > 50) {
      this.history.shift();
      this.historyIndex--;
    }
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.restoreFromHistory();
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.restoreFromHistory();
    }
  }

  restoreFromHistory() {
    if (this.historyIndex >= 0 && this.historyIndex < this.history.length) {
      this.isRestoring = true;
      const state = this.history[this.historyIndex];
      this.editorContent.nativeElement.innerHTML = state.content;
      this.value = state.content;
      this.onChange(state.content);
      this.updateStats();
      this.isRestoring = false;
    }
  }

  getSelection(): EditorSelection | null {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return null;

    const range = sel.getRangeAt(0);
    return {
      start: range.startOffset,
      end: range.endOffset,
      text: sel.toString()
    };
  }

  // Comandos de formatação
  executeCommand(command: string, value?: string) {
    document.execCommand(command, false, value);
    this.editorContent.nativeElement.focus();
    this.onContentChange();
  }

  toggleBold() {
    this.executeCommand('bold');
    this.isBold = !this.isBold;
  }

  toggleItalic() {
    this.executeCommand('italic');
    this.isItalic = !this.isItalic;
  }

  toggleUnderline() {
    this.executeCommand('underline');
    this.isUnderline = !this.isUnderline;
  }

  toggleStrike() {
    this.executeCommand('strikeThrough');
    this.isStrike = !this.isStrike;
  }

  setFontSize(size: string) {
    this.currentFontSize = size;
    this.executeCommand('fontSize', '7');
    // Substituir o font size gerado pelo execCommand
    const editor = this.editorContent.nativeElement;
    const fonts = editor.querySelectorAll('font[size="7"]');
    fonts.forEach((font: any) => {
      font.removeAttribute('size');
      font.style.fontSize = size;
    });
    this.onContentChange();
  }

  setFontFamily(family: string) {
    this.currentFontFamily = family;
    this.executeCommand('fontName', family);
  }

  setFormat(format: string) {
    this.currentFormat = format;
    this.executeCommand('formatBlock', format);
  }

  setAlignment(align: string) {
    this.currentAlignment = align;
    const commands: { [key: string]: string } = {
      'left': 'justifyLeft',
      'center': 'justifyCenter',
      'right': 'justifyRight',
      'justify': 'justifyFull'
    };
    this.executeCommand(commands[align]);
  }

  setColor(color: string) {
    this.currentColor = color;
    this.executeCommand('foreColor', color);
    this.showColorPicker = false;
  }

  setBgColor(color: string) {
    this.currentBgColor = color;
    this.executeCommand('backColor', color);
    this.showBgColorPicker = false;
  }

  insertOrderedList() {
    this.executeCommand('insertOrderedList');
  }

  insertUnorderedList() {
    this.executeCommand('insertUnorderedList');
  }

  indent() {
    this.executeCommand('indent');
  }

  outdent() {
    this.executeCommand('outdent');
  }

  insertHorizontalRule() {
    this.executeCommand('insertHorizontalRule');
  }

  insertBlockquote() {
    const sel = window.getSelection();
    if (sel && sel.toString()) {
      const blockquote = document.createElement('blockquote');
      blockquote.innerHTML = sel.toString();
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(blockquote);
    }
    this.onContentChange();
  }

  insertCode() {
    const sel = window.getSelection();
    if (sel && sel.toString()) {
      const code = document.createElement('code');
      code.textContent = sel.toString();
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(code);
    }
    this.onContentChange();
  }

  insertCodeBlock() {
    const pre = document.createElement('pre');
    pre.innerHTML = '<code>// Seu código aqui</code>';
    this.editorContent.nativeElement.appendChild(pre);
    this.onContentChange();
  }

  // Modais
  openLinkModal() {
    const sel = window.getSelection();
    this.linkText = sel?.toString() || '';
    this.showLinkModal = true;
  }

  insertLink() {
    if (this.linkUrl) {
      if (this.linkText) {
        const link = `<a href="${this.linkUrl}" target="_blank">${this.linkText}</a>`;
        this.executeCommand('insertHTML', link);
      } else {
        this.executeCommand('createLink', this.linkUrl);
      }
    }
    this.closeLinkModal();
  }

  closeLinkModal() {
    this.showLinkModal = false;
    this.linkUrl = '';
    this.linkText = '';
  }

  openImageModal() {
    this.showImageModal = true;
  }

  insertImage() {
    if (this.imageUrl) {
      const img = `<img src="${this.imageUrl}" alt="Image" style="max-width: 100%; height: auto;">`;
      this.executeCommand('insertHTML', img);
    }
    this.closeImageModal();
  }

  closeImageModal() {
    this.showImageModal = false;
    this.imageUrl = '';
  }

  openTableModal() {
    this.showTableModal = true;
  }

  insertTable() {
    let tableHTML = '<table style="border-collapse: collapse; width: 100%;"><tbody>';
    
    for (let i = 0; i < this.tableRows; i++) {
      tableHTML += '<tr>';
      for (let j = 0; j < this.tableCols; j++) {
        tableHTML += '<td style="border: 1px solid #ddd; padding: 8px;">&nbsp;</td>';
      }
      tableHTML += '</tr>';
    }
    
    tableHTML += '</tbody></table><p><br></p>';
    this.executeCommand('insertHTML', tableHTML);
    this.closeTableModal();
  }

  closeTableModal() {
    this.showTableModal = false;
    this.tableRows = 3;
    this.tableCols = 3;
  }

  // Alternar Tema
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  clearFormatting() {
    this.executeCommand('removeFormat');
  }

  clearContent() {
    if (confirm('Tem certeza que deseja limpar todo o conteúdo?')) {
      this.editorContent.nativeElement.innerHTML = '';
      this.onContentChange();
    }
  }

  // ControlValueAccessor
  writeValue(value: any): void {
    this.value = value || '';
    if (this.editorContent) {
      this.editorContent.nativeElement.innerHTML = this.value;
      this.updateStats();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.readOnly = isDisabled;
  }

  // Métodos públicos
  getWordCount(): number {
    return this.wordCount;
  }

  getCharCount(): number {
    return this.charCount;
  }

  clear() {
    this.editorContent.nativeElement.innerHTML = '';
    this.onContentChange();
  }

  getHTML(): string {
    return this.editorContent.nativeElement.innerHTML;
  }

  getText(): string {
    return this.editorContent.nativeElement.innerText;
  }
}
