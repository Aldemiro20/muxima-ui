import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RichTextEditorComponent } from '@muxima-ui/rich-text-editor';

@Component({
  selector: 'muxima-rich-text-editor-doc',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RichTextEditorComponent],
  templateUrl: './rich-text-editor-doc.component.html',
  styleUrls: ['./rich-text-editor-doc.component.scss']
})
export class RichTextEditorDocComponent {
  basicContent = '';
  form: FormGroup;

  codeExample1 = `<muxima-rich-text-editor
  [placeholder]="'Start writing...'"
  (textChange)="onTextChange($event)">
</muxima-rich-text-editor>`;

  codeExample2 = `form = this.fb.group({
  content: ["<p>Initial content</p>", Validators.required]
});

<form [formGroup]="form">
  <muxima-rich-text-editor
    formControlName="content"
    [height]="'350px'">
  </muxima-rich-text-editor>
</form>`;

  codeExample3 = `<muxima-rich-text-editor
  [readOnly]="true"
  [showToolbar]="false">
</muxima-rich-text-editor>`;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      content: ['<p>This is initial content with <strong>bold</strong> and <em>italic</em> text.</p>', Validators.required],
      description: ['']
    });
  }

  onTextChange(content: string) {
    console.log('Content changed:', content);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      alert('Content saved! Check console for details.');
    }
  }

  resetForm() {
    this.form.reset({
      content: '<p>Content has been reset</p>',
      description: ''
    });
  }
}
