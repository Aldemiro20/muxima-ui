import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, forwardRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface EditorConfig {
  toolbar?: string[] | string[][];
  placeholder?: string;
  readOnly?: boolean;
  theme?: 'snow' | 'bubble';
  formats?: string[];
  bounds?: HTMLElement | string;
  debug?: 'error' | 'warn' | 'log' | boolean;
}

@Component({
  selector: 'muxima-rich-text-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RichTextEditorComponent),
      multi: true
    }
  ]
})
export class RichTextEditorComponent implements AfterViewInit, ControlValueAccessor, OnDestroy {
  @ViewChild('editor') editorElement!: ElementRef;

  @Input() config: EditorConfig = {};
  @Input() height: string = '300px';
  @Input() placeholder: string = 'Write something...';
  @Input() readOnly: boolean = false;
  @Input() showToolbar: boolean = true;

  @Output() textChange = new EventEmitter<string>();
  @Output() selectionChange = new EventEmitter<any>();
  @Output() editorCreated = new EventEmitter<any>();

  private quill: any = null;
  private defaultToolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['link', 'image', 'video']
  ];

  // ControlValueAccessor
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  disabled = false;

  ngAfterViewInit() {
    // Note: In a real implementation, you would load Quill dynamically
    // For now, this is a placeholder structure
    this.initializeEditor();
  }

  ngOnDestroy() {
    if (this.quill) {
      this.quill = null;
    }
  }

  private initializeEditor() {
    // Placeholder for Quill initialization
    // In production, you would:
    // 1. Load Quill from CDN or npm
    // 2. Initialize: this.quill = new Quill(this.editorElement.nativeElement, config)
    // 3. Set up event listeners
    
    const editorConfig = {
      theme: this.config.theme || 'snow',
      placeholder: this.config.placeholder || this.placeholder,
      readOnly: this.config.readOnly || this.readOnly,
      modules: {
        toolbar: this.showToolbar ? (this.config.toolbar || this.defaultToolbarOptions) : false
      }
    };

    // Simulate editor initialization
    console.log('Editor config:', editorConfig);
    
    // Emit creation event
    setTimeout(() => {
      this.editorCreated.emit({ editor: this.quill, config: editorConfig });
    }, 100);
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (this.quill) {
      if (value) {
        this.quill.root.innerHTML = value;
      } else {
        this.quill.setText('');
      }
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
    if (this.quill) {
      this.quill.enable(!isDisabled);
    }
  }

  // Public methods
  getContent(): string {
    return this.quill ? this.quill.root.innerHTML : '';
  }

  setContent(content: string): void {
    if (this.quill) {
      this.quill.root.innerHTML = content;
    }
  }

  getText(): string {
    return this.quill ? this.quill.getText() : '';
  }

  getLength(): number {
    return this.quill ? this.quill.getLength() : 0;
  }

  focus(): void {
    if (this.quill) {
      this.quill.focus();
    }
  }

  blur(): void {
    if (this.quill) {
      this.quill.blur();
    }
  }
}
