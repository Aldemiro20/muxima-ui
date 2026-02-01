# Rich Text Editor Component

A powerful WYSIWYG rich text editor component for Angular applications with full formatting capabilities.

## Features

- ✍️ Full WYSIWYG editing experience
- 🎨 Rich text formatting (bold, italic, underline, colors)
- 📝 Multiple heading levels (H1-H6)
- 📋 Lists (ordered, unordered, checklist)
- 🔗 Links and images support
- 💻 Code blocks with syntax highlighting
- 📊 Tables and blockquotes
- 🎯 ControlValueAccessor for reactive forms
- ⌨️ Keyboard shortcuts
- 📱 Responsive toolbar

## Installation

```bash
npm install @muxima-ui/rich-text-editor
```

**Note**: This component is designed to work with Quill.js. Install Quill separately:

```bash
npm install quill
```

Add Quill CSS to your `angular.json`:

```json
"styles": [
  "node_modules/quill/dist/quill.snow.css",
  "src/styles.scss"
]
```

## Usage

### Basic Example

```typescript
import { Component } from '@angular/core';
import { RichTextEditorComponent } from '@muxima-ui/rich-text-editor';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [RichTextEditorComponent],
  template: `
    <muxima-rich-text-editor
      [placeholder]="'Start writing...'"
      (textChange)="onTextChange($event)">
    </muxima-rich-text-editor>
  `
})
export class DemoComponent {
  onTextChange(content: string) {
    console.log('Content:', content);
  }
}
```

### With Reactive Forms

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorComponent } from '@muxima-ui/rich-text-editor';

@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [ReactiveFormsModule, RichTextEditorComponent],
  template: `
    <form [formGroup]="form">
      <muxima-rich-text-editor
        formControlName="content"
        [height]="'400px'">
      </muxima-rich-text-editor>
      <button (click)="submit()">Submit</button>
    </form>
  `
})
export class FormDemoComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      content: ['<p>Initial content</p>']
    });
  }

  submit() {
    console.log(this.form.value.content);
  }
}
```

### Custom Toolbar

```typescript
import { EditorConfig } from '@muxima-ui/rich-text-editor';

editorConfig: EditorConfig = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'header': [1, 2, 3, false] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ],
  placeholder: 'Write your content here...',
  theme: 'snow'
};
```

```html
<muxima-rich-text-editor [config]="editorConfig"></muxima-rich-text-editor>
```

### Read-Only Mode

```html
<muxima-rich-text-editor
  [readOnly]="true"
  [showToolbar]="false">
</muxima-rich-text-editor>
```

### Character Counter

```html
<muxima-rich-text-editor
  [showCharacterCount]="true"
  [maxLength]="5000">
</muxima-rich-text-editor>
```

## API

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `placeholder` | `string` | `'Write something...'` | Placeholder text |
| `height` | `string` | `'300px'` | Editor height |
| `config` | `EditorConfig` | Default config | Editor configuration |
| `disabled` | `boolean` | `false` | Disable editing |
| `readOnly` | `boolean` | `false` | Read-only mode |
| `showToolbar` | `boolean` | `true` | Show/hide toolbar |
| `showCharacterCount` | `boolean` | `true` | Show character counter |
| `maxLength` | `number` | - | Maximum character length |

### Outputs

| Event | Payload | Description |
|-------|---------|-------------|
| `textChange` | `string` | Emitted when content changes (HTML) |
| `selectionChange` | `{range: Range, oldRange: Range}` | Emitted when selection changes |
| `editorCreated` | `any` | Emitted when editor is initialized |

### EditorConfig Interface

```typescript
interface EditorConfig {
  toolbar?: any[];
  placeholder?: string;
  readOnly?: boolean;
  theme?: 'snow' | 'bubble';
  formats?: string[];
}
```

### Public Methods

```typescript
// Get HTML content
getContent(): string

// Set content
setContent(html: string): void

// Get plain text
getText(): string

// Get content length
getLength(): number

// Focus editor
focus(): void

// Blur editor
blur(): void
```

## Toolbar Options

### Text Formatting

```typescript
['bold', 'italic', 'underline', 'strike']
```

### Headers

```typescript
[{ 'header': [1, 2, 3, 4, 5, 6, false] }]
```

### Colors

```typescript
[{ 'color': [] }, { 'background': [] }]
```

### Lists

```typescript
[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }]
```

### Alignment

```typescript
[{ 'align': [] }]
```

### Media

```typescript
['link', 'image', 'video']
```

### Advanced

```typescript
['blockquote', 'code-block']
[{ 'script': 'sub' }, { 'script': 'super' }]
[{ 'indent': '-1' }, { 'indent': '+1' }]
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+B` | Bold |
| `Ctrl+I` | Italic |
| `Ctrl+U` | Underline |
| `Ctrl+K` | Insert link |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+Shift+7` | Ordered list |
| `Ctrl+Shift+8` | Bullet list |

## Examples

### Blog Editor

```html
<div class="blog-editor">
  <input type="text" placeholder="Title" [(ngModel)]="title">
  <muxima-rich-text-editor
    [height]="'500px'"
    [placeholder]="'Write your blog post...'"
    [(ngModel)]="content">
  </muxima-rich-text-editor>
  <button (click)="publish()">Publish</button>
</div>
```

### Comment System

```html
<div class="comments">
  <muxima-rich-text-editor
    [height]="'150px'"
    [placeholder]="'Add a comment...'"
    [showToolbar]="false"
    [(ngModel)]="comment">
  </muxima-rich-text-editor>
  <button (click)="postComment()">Post</button>
</div>
```

### Email Composer

```typescript
editorConfig: EditorConfig = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ],
  placeholder: 'Compose your email...'
};
```

## Styling

Customize the editor appearance:

```css
muxima-rich-text-editor {
  --editor-border-color: #e2e8f0;
  --editor-border-radius: 8px;
  --editor-toolbar-bg: #f8fafc;
  --editor-bg: #ffffff;
  --editor-text-color: #1e293b;
  --editor-focus-color: #667eea;
}
```

## Content Sanitization

Always sanitize HTML content from the editor before storing or displaying:

```typescript
import { DomSanitizer } from '@angular/platform-browser';

constructor(private sanitizer: DomSanitizer) {}

getSafeHtml(html: string) {
  return this.sanitizer.sanitize(SecurityContext.HTML, html);
}
```

## Image Upload

To handle image uploads, configure the image handler:

```typescript
// Custom image handler example
const imageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();
  
  input.onchange = async () => {
    const file = input.files?.[0];
    if (file) {
      const imageUrl = await this.uploadImage(file);
      // Insert image into editor
    }
  };
};
```

## Best Practices

1. **Validate Input**: Always validate and sanitize user input
2. **Set Max Length**: Prevent excessive content with `maxLength`
3. **Save Drafts**: Auto-save content periodically
4. **Mobile Support**: Test on mobile devices
5. **Accessibility**: Ensure keyboard navigation works

## Accessibility

- ARIA labels for toolbar buttons
- Keyboard shortcuts
- Screen reader support
- Focus management

## License

MIT
